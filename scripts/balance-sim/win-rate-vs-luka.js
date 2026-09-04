#!/usr/bin/env node
// Параллельная версия win-rate-diagnostic.js: один воркер (настоящий поток ОС) на
// каждого героя из --heroes, сравнивает его с Лукой на тех же герой-уровнях.
// Пример: node scripts/balance-sim/win-rate-vs-luka.js --heroes=eremei,daryana,dunya,tikhon,elisey --samples=150
'use strict';

const path = require('node:path');
const { Worker } = require('node:worker_threads');
const { startStaticServer } = require('./static-server');
const { ROOT } = require('./panel-harness');

function parseArgs(argv) {
    const args = { heroes: ['elisey'], samples: 150, rows: [1, 35, 79, 119, 159, 180, 200] };
    for (const raw of argv) {
        const m1 = raw.match(/^--heroes=(.+)$/); if (m1) args.heroes = m1[1].split(',').map((s) => s.trim());
        const m2 = raw.match(/^--samples=(\d+)$/); if (m2) args.samples = Number(m2[1]);
        const m3 = raw.match(/^--rows=(.+)$/); if (m3) args.rows = m3[1].split(',').map(Number);
    }
    return args;
}

function runWorker(workerIndex, heroA, port, samples, rows) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'win-rate-worker.js'), {
            workerData: { heroA, port, samples, rows, workerIndex }
        });
        worker.on('message', (msg) => {
            if (msg.type === 'progress') {
                console.log(
                    `[${msg.heroA}] hl=${String(msg.heroLevel).padStart(3)}  A=${String(msg.meanA).padStart(6)}  Luka=${String(msg.meanLuka).padStart(6)}  ` +
                    `beat_mean=${(msg.beatMeanRate * 100).toFixed(1).padStart(5)}%  beat_median=${(msg.beatMedianRate * 100).toFixed(1).padStart(5)}%`
                );
            } else if (msg.type === 'done') {
                resolve(msg.rowResults);
            } else if (msg.type === 'error') {
                reject(new Error(`[${msg.heroA}] ${msg.message}\n${msg.stack || ''}`));
            }
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Воркер ${heroA} завершился с кодом ${code}`));
        });
    });
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    console.log(`Герои: ${args.heroes.join(', ')} (каждый — свой поток)`);
    console.log(`samples/row=${args.samples}  rows=${args.rows.join(',')}`);

    const { server, port } = await startStaticServer(ROOT);
    try {
        const results = await Promise.all(
            args.heroes.map((h, i) => runWorker(i, h, port, args.samples, args.rows))
        );

        console.log('\n=== ИТОГ ===');
        args.heroes.forEach((h, i) => {
            console.log(`\n${h}:`);
            for (const r of results[i]) {
                console.log(
                    `  hl=${String(r.heroLevel).padStart(3)}  ${h}=${Math.round(r.meanA).toString().padStart(6)}  Luka=${Math.round(r.meanLuka).toString().padStart(6)}  ` +
                    `beat_mean=${(r.beatMeanRate * 100).toFixed(1).padStart(5)}%  beat_median=${(r.beatMedianRate * 100).toFixed(1).padStart(5)}%`
                );
            }
            const avgBeatMean = results[i].reduce((a, r) => a + r.beatMeanRate, 0) / results[i].length;
            console.log(`  среднее beat_mean по строкам: ${(avgBeatMean * 100).toFixed(1)}%`);
        });
    } finally {
        server.close();
    }
}

main().catch((err) => {
    console.error('ОШИБКА:', err.message);
    console.error(err.stack);
    process.exitCode = 1;
});
