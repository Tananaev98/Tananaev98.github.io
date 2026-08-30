#!/usr/bin/env node
// Точечная диагностика поверх обычного прогона (не дублирует ни одной формулы — зовёт ту
// же runOneUpgradedAttempt, что и runAll, см. panel-harness.js): для выбранных строк
// диапазона гоняет БОЛЬШУЮ выборку независимых заходов "с апгрейдами" для двух героев и
// считает РЕАЛЬНУЮ (не аналитическую) долю заходов, где DPS героя A превышает СРЕДНИЙ DPS
// героя B на той же строке — то есть "как часто удачный герой A обгоняет типичного героя
// B", а не выдуманное распределение поверх готовых mean/min/max.
'use strict';

const path = require('node:path');
const { startStaticServer } = require('./static-server');
const { ROOT, loadPanelWindow, attachNodeEngines } = require('./panel-harness');

function parseArgs(argv) {
    const args = { heroA: 'elisey', heroB: 'luka', samples: 200, rows: [1, 35, 79, 119, 159, 175, 200] };
    for (const raw of argv) {
        const m1 = raw.match(/^--heroA=(.+)$/); if (m1) args.heroA = m1[1];
        const m2 = raw.match(/^--heroB=(.+)$/); if (m2) args.heroB = m2[1];
        const m3 = raw.match(/^--samples=(\d+)$/); if (m3) args.samples = Number(m3[1]);
        const m4 = raw.match(/^--rows=(.+)$/); if (m4) args.rows = m4[1].split(',').map(Number);
    }
    return args;
}

// heroLevel -> ближайший campaignLevel/бустрап через ProgressionEngine.campaignToHeroLevel
// не нужен здесь: диагностика идёт по герою-уровню напрямую (та же логика, что и
// OVERGRIND_HERO_LEVELS в runAll) — герой строится на конкретном герое-уровне, а боевые
// данные всегда берутся с "фарм"-уровня (последний уровень кампании), как и остальные
// строки после 141 в отчёте.
async function sampleAttempts(expose, probe, heroKey, heroLevel, campaignLevelForCombat, count, label) {
    const permanentHero = expose.ProgressionEngine.buildHeroAtLevel(heroKey, heroLevel);
    const levelData = await expose.SurvivalEngine.loadLevelData(campaignLevelForCombat);
    const bossHpCache = new Map();
    const strategies = expose.STRATEGIES;
    const samples = [];
    for (let i = 0; i < count; i++) {
        const strategy = strategies[i % strategies.length];
        const random = Math.random; // независимые заходы, не детерминированный сид построчно
        const result = await expose.runOneUpgradedAttempt(probe, permanentHero, levelData, strategy, random, campaignLevelForCombat, bossHpCache);
        samples.push(result.dps);
        if ((i + 1) % 10 === 0) process.stdout.write(`  ${label} hl=${heroLevel}: ${i + 1}/${count}\n`);
    }
    return samples;
}

function mean(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const { server, port } = await startStaticServer(ROOT);
    try {
        const { dom, expose } = await loadPanelWindow(port);
        const { closeAll } = attachNodeEngines(expose, port, null);
        try {
            await expose.ProgressionEngine.init();
            const CAMPAIGN_FINAL_LEVEL = expose.CAMPAIGN_FINAL_LEVEL;

            const probeA = await expose.CombatEngine.loadHero(args.heroA);
            const probeB = await expose.CombatEngine.loadHero(args.heroB);

            console.log(`heroA=${args.heroA}  heroB=${args.heroB}  samples/row=${args.samples}`);
            console.log('heroLvl | A_mean | B_mean | A_max | A>B_mean rate | A>B_median rate');

            for (const heroLevel of args.rows) {
                const samplesA = await sampleAttempts(expose, probeA, args.heroA, heroLevel, CAMPAIGN_FINAL_LEVEL, args.samples, 'A');
                const samplesB = await sampleAttempts(expose, probeB, args.heroB, heroLevel, CAMPAIGN_FINAL_LEVEL, args.samples, 'B');

                const meanA = mean(samplesA);
                const meanB = mean(samplesB);
                const maxA = Math.max(...samplesA);
                const sortedB = [...samplesB].sort((a, b) => a - b);
                const medianB = sortedB[Math.floor(sortedB.length / 2)];

                const beatMeanRate = samplesA.filter((v) => v > meanB).length / samplesA.length;
                const beatMedianRate = samplesA.filter((v) => v > medianB).length / samplesA.length;

                console.log(
                    `${String(heroLevel).padStart(7)} | ${meanA.toFixed(0).padStart(6)} | ${meanB.toFixed(0).padStart(6)} | ` +
                    `${maxA.toFixed(0).padStart(6)} | ${(beatMeanRate * 100).toFixed(1).padStart(6)}% | ${(beatMedianRate * 100).toFixed(1).padStart(6)}%`
                );
            }
        } finally {
            closeAll();
            try { dom.window.close(); } catch (e) { /* noop */ }
        }
    } finally {
        server.close();
    }
}

main().catch((err) => {
    console.error('ОШИБКА:', err.message);
    console.error(err.stack);
    process.exitCode = 1;
});
