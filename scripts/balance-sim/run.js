#!/usr/bin/env node
// Быстрая Node-версия полного прогона admin-balance-panel.html — считает те же самые
// формулы через тот же самый реальный код (game.js/saveData.js как чёрный ящик, см.
// panel-harness.js), просто не в браузере, а в нескольких настоящих потоках ОС
// (worker_threads), по одному потоку на группу героев. Итоговый .xls — байт-в-байт той
// же структуры (те же листы/колонки), что и «Экспорт в Excel» в браузерной панели,
// собран той же функцией ExcelExport.buildWorkbook.
//
// Запуск из корня проекта: node scripts/balance-sim/run.js [--workers=N] [--heroes=a,b,c]
// [--attempts-per-strategy=N] — последний флаг только для фокусных сравнений (2-4 героя),
// поднимает число попыток/строку выше дефолтных 50 (5 стратегий × 10), чтобы придавить
// статистический шум на отдельных строках; для полного прогона всего ростера запрещён
// предохранителем (см. main()) — там и так не быстро, а шум CLAUDE.md разрешает принимать.
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { Worker } = require('node:worker_threads');
const { startStaticServer } = require('./static-server');
const { ROOT, loadPanelWindow, attachNodeEngines } = require('./panel-harness');

function parseArgs(argv) {
    const args = { workers: null, heroes: null, attemptsPerStrategy: null };
    for (const raw of argv) {
        const workersMatch = raw.match(/^--workers=(\d+)$/);
        if (workersMatch) args.workers = Number(workersMatch[1]);
        const heroesMatch = raw.match(/^--heroes=(.+)$/);
        if (heroesMatch) args.heroes = heroesMatch[1].split(',').map((s) => s.trim()).filter(Boolean);
        // По прямому запросу пользователя: для ФОКУСНЫХ сравнений (--heroes с малым числом
        // героев) можно поднять число попыток/строку выше дефолтных 10 (=50 попыток/строку,
        // см. panel-harness.js/readPanelSourceWithoutAutoRun), чтобы придавить статистический
        // шум ±6-7pp на строку. НЕ использовать на полном прогоне всего ростера — время растёт
        // пропорционально, 150 строк × 8 героев и так не быстрый прогон.
        const attemptsMatch = raw.match(/^--attempts-per-strategy=(\d+)$/);
        if (attemptsMatch) args.attemptsPerStrategy = Number(attemptsMatch[1]);
    }
    return args;
}

async function discoverAllHeroKeys(port) {
    // Отдельный, независимый от воркеров jsdom-инстанс главного потока — только чтобы
    // узнать полный список героев и сохранить их ИСХОДНЫЙ порядок (тот же, что дал бы
    // ProgressionEngine.discoverHeroes() в непараллельном прогоне) перед разбиением на
    // воркеров. Не используется для самого боя.
    const { dom, expose } = await loadPanelWindow(port);
    const { closeAll } = attachNodeEngines(expose, port, null);
    try {
        await expose.ProgressionEngine.init();
        return expose.ProgressionEngine.discoverHeroes();
    } finally {
        closeAll();
        try { dom.window.close(); } catch (e) { /* noop */ }
    }
}

function partitionHeroesRoundRobin(heroKeys, workerCount) {
    const buckets = Array.from({ length: workerCount }, () => []);
    heroKeys.forEach((key, index) => buckets[index % workerCount].push(key));
    return buckets.filter((bucket) => bucket.length > 0);
}

function runWorker(workerIndex, heroKeys, port, attemptsPerStrategy) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'worker.js'), {
            workerData: { heroKeys, port, workerIndex, attemptsPerStrategy }
        });
        worker.on('message', (msg) => {
            if (msg.type === 'log') {
                console.log(`[воркер ${msg.workerIndex}] ${msg.message}`);
            } else if (msg.type === 'progress') {
                console.log(`[воркер ${msg.workerIndex}] ${msg.status} (${msg.done}/${msg.total})`);
            } else if (msg.type === 'done') {
                resolve(msg.snapshot);
            } else if (msg.type === 'error') {
                reject(new Error(`Воркер ${msg.workerIndex}: ${msg.message}\n${msg.stack || ''}`));
            }
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Воркер ${workerIndex} завершился с кодом ${code}`));
        });
    });
}

function mergeSnapshots(orderedHeroDescriptors, partialSnapshots) {
    const dpsResults = {};
    const survivalResults = {};
    const dpsUpgradedResults = {};
    const dpsCeilingResults = {};
    const survivalUpgradedResults = {};
    // Правило 13 CLAUDE.md (шанс обогнать Луку) — каждый воркер видел только своих
    // героев, поэтому его сырые dpsSamples нужно собрать здесь ПЕРЕД сравнением с Лукой
    // (см. вызов computeWinRateVsLuka в buildAndWriteExcel ниже).
    const dpsSamplesByHero = {};
    let stoppedEarly = false;

    for (const snapshot of partialSnapshots) {
        Object.assign(dpsResults, snapshot.dpsResults);
        Object.assign(survivalResults, snapshot.survivalResults);
        Object.assign(dpsUpgradedResults, snapshot.dpsUpgradedResults);
        Object.assign(dpsCeilingResults, snapshot.dpsCeilingResults);
        Object.assign(survivalUpgradedResults, snapshot.survivalUpgradedResults);
        Object.assign(dpsSamplesByHero, snapshot.dpsSamplesByHero);
        if (snapshot.stoppedEarly) stoppedEarly = true;
    }

    return {
        generatedAt: new Date(),
        stoppedEarly,
        heroes: orderedHeroDescriptors,
        dpsResults, survivalResults, dpsUpgradedResults, dpsCeilingResults, survivalUpgradedResults,
        dpsSamplesByHero
    };
}

async function buildAndWriteExcel(port, mergedSnapshot) {
    const { dom, expose } = await loadPanelWindow(port);
    const { closeAll } = attachNodeEngines(expose, port, null);
    try {
        // buildFullRangeRowDescriptors (использует ExcelExport.buildDpsSheet и др.) читает
        // ProgressionEngine.campaignToHeroLevel — нужно реально инициализировать
        // ProgressionEngine на ЭТОМ окне, даже если сам бой (CombatEngine) тут не нужен.
        await expose.ProgressionEngine.init();
        const { ExcelExport } = expose;
        const heroes = mergedSnapshot.heroes;
        // Правило 13 CLAUDE.md: теперь, когда все воркеры слиты, Лука наконец в тех же
        // данных, что и остальные герои — считаем реальную долю заходов "с апгрейдами",
        // где герой превысил средний ДПС Луки (та же функция, что пыталась это сделать
        // внутри каждого воркера и там молча пропускала — см. её комментарий).
        expose.computeWinRateVsLuka(heroes, mergedSnapshot.dpsUpgradedResults, mergedSnapshot.dpsSamplesByHero);
        const sheets = [
            ExcelExport.buildSummarySheet(mergedSnapshot),
            ExcelExport.buildDpsSheet('DPS без апгрейдов', heroes, mergedSnapshot.dpsResults),
            ExcelExport.buildSurvivalSheet('Живучесть без апгрейдов', heroes, mergedSnapshot.survivalResults),
            ExcelExport.buildDpsUpgradedSheet(heroes, mergedSnapshot.dpsUpgradedResults, mergedSnapshot.dpsCeilingResults),
            ExcelExport.buildSurvivalUpgradedSheet(heroes, mergedSnapshot.survivalUpgradedResults),
            ExcelExport.buildBalanceAnalyticsSheet(mergedSnapshot)
        ];
        const xml = ExcelExport.buildWorkbook(sheets);

        const d = mergedSnapshot.generatedAt;
        const pad = (n) => String(n).padStart(2, '0');
        const filename = `balance-report_${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_` +
            `${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}.xls`;
        const exportDir = path.join(ROOT, 'DataExport');
        fs.mkdirSync(exportDir, { recursive: true });
        const outPath = path.join(exportDir, filename);
        fs.writeFileSync(outPath, xml, 'utf8');
        return outPath;
    } finally {
        closeAll();
        try { dom.window.close(); } catch (e) { /* noop */ }
    }
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const startedAt = Date.now();

    console.log('Запускаю локальный статический сервер...');
    const { server, port } = await startStaticServer(ROOT);
    console.log(`Сервер на http://127.0.0.1:${port}`);

    try {
        console.log('Узнаю список героев...');
        let heroDescriptors = await discoverAllHeroKeys(port);
        if (args.heroes) {
            const allowed = new Set(args.heroes);
            heroDescriptors = heroDescriptors.filter((h) => allowed.has(h.key));
            console.log(`--heroes ограничил прогон до: ${heroDescriptors.map((h) => h.key).join(', ')}`);
        }
        console.log(`Героев: ${heroDescriptors.length} (${heroDescriptors.map((h) => h.dispName).join(', ')})`);

        if (args.attemptsPerStrategy) {
            // Предохранитель: раньше жёстко блокировал >4 героев (чтобы случайно не улететь
            // на десятки минут при фокусной калибровке). По прямому запросу пользователя —
            // допустим и полный прогон всего ростера на повышенной выборке, если пользователь
            // осознанно согласился ждать (15-20 мин), просто ограничиваем ПРОИЗВЕДЕНИЕ героев
            // × попыток, а не голое число героев — оценка времени калибрована по реальному
            // замеру полного 8-героя прогона в этой сессии (8×40=320 единиц за 260с ⇒
            // ~0.81с/единицу; первая прикидка 1.9 была завышена почти вдвое и ложно
            // блокировала легитимный 150-попыточный прогон, см. чат).
            const budgetUnits = heroDescriptors.length * args.attemptsPerStrategy;
            const estimatedSeconds = budgetUnits * 0.85;
            if (estimatedSeconds > 1500) {
                throw new Error(
                    `--attempts-per-strategy=${args.attemptsPerStrategy} для ${heroDescriptors.length} ` +
                    `героев — оценочное время ~${Math.round(estimatedSeconds / 60)} мин, это за ` +
                    `предохранителем (макс. ~25 мин). Снизьте --attempts-per-strategy или ограничьте ` +
                    `--heroes.`
                );
            }
            console.log(`Попыток на стратегию: ${args.attemptsPerStrategy} (дефолт 10) — ` +
                `${args.attemptsPerStrategy * 5} попыток/строку вместо обычных 50, для подавления шума ` +
                `(оценочное время ~${Math.round(estimatedSeconds / 60)} мин).`);
        }

        const cpuCount = os.cpus().length;
        const workerCount = Math.max(1, Math.min(
            args.workers || cpuCount,
            heroDescriptors.length,
            cpuCount
        ));
        console.log(`Ядер ОС: ${cpuCount}. Воркеров: ${workerCount}.`);

        const heroKeyBuckets = partitionHeroesRoundRobin(heroDescriptors.map((h) => h.key), workerCount);
        console.log('Разбиение героев по воркерам:', heroKeyBuckets.map((b) => `[${b.join(', ')}]`).join('  '));

        const partialSnapshots = await Promise.all(
            heroKeyBuckets.map((bucket, index) => runWorker(index, bucket, port, args.attemptsPerStrategy))
        );

        const mergedSnapshot = mergeSnapshots(heroDescriptors, partialSnapshots);

        console.log('Собираю итоговый Excel-отчёт...');
        const outPath = await buildAndWriteExcel(port, mergedSnapshot);

        const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
        console.log(`Готово за ${elapsedSec} сек. Отчёт: ${outPath}`);
        if (mergedSnapshot.stoppedEarly) {
            console.warn('Внимание: как минимум один воркер сообщил stoppedEarly=true — данные частичные.');
        }
    } finally {
        server.close();
    }
}

main().catch((error) => {
    console.error('ОШИБКА:', error.message);
    if (error.stack) console.error(error.stack);
    process.exitCode = 1;
});
