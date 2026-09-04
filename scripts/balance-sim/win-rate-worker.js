// worker_threads-воркер для win-rate-vs-luka.js — считает для ОДНОГО героя (heroA) серию
// независимых заходов "с апгрейдами" на нескольких герой-уровнях и сравнивает с таким же
// числом независимых заходов Луки на той же строке (тот же реальный runOneUpgradedAttempt,
// что и runAll/win-rate-diagnostic.js — не дублирует формулы). Один воркер = один
// настоящий поток ОС, как и в scripts/balance-sim/worker.js.
const { parentPort, workerData } = require('node:worker_threads');
const { loadPanelWindow, attachNodeEngines } = require('./panel-harness');

async function sampleAttempts(expose, probe, heroKey, heroLevel, campaignLevelForCombat, count) {
    const permanentHero = expose.ProgressionEngine.buildHeroAtLevel(heroKey, heroLevel);
    const levelData = await expose.SurvivalEngine.loadLevelData(campaignLevelForCombat);
    const bossHpCache = new Map();
    const strategies = expose.STRATEGIES;
    const samples = [];
    for (let i = 0; i < count; i++) {
        const strategy = strategies[i % strategies.length];
        const result = await expose.runOneUpgradedAttempt(probe, permanentHero, levelData, strategy, Math.random, campaignLevelForCombat, bossHpCache);
        samples.push(result.dps);
    }
    return samples;
}

function mean(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }

async function main() {
    const { heroA, port, samples, rows, workerIndex } = workerData;
    const post = (payload) => parentPort.postMessage(payload);
    const { dom, expose } = await loadPanelWindow(port);
    const { closeAll } = attachNodeEngines(expose, port, null);
    try {
        await expose.ProgressionEngine.init();
        const CAMPAIGN_FINAL_LEVEL = expose.CAMPAIGN_FINAL_LEVEL;
        const probeA = await expose.CombatEngine.loadHero(heroA);
        const probeLuka = await expose.CombatEngine.loadHero('luka');

        const rowResults = [];
        for (const heroLevel of rows) {
            const samplesA = await sampleAttempts(expose, probeA, heroA, heroLevel, CAMPAIGN_FINAL_LEVEL, samples);
            const samplesLuka = await sampleAttempts(expose, probeLuka, 'luka', heroLevel, CAMPAIGN_FINAL_LEVEL, samples);

            const meanA = mean(samplesA);
            const meanLuka = mean(samplesLuka);
            const sortedLuka = [...samplesLuka].sort((a, b) => a - b);
            const medianLuka = sortedLuka[Math.floor(sortedLuka.length / 2)];

            const beatMeanRate = samplesA.filter((v) => v > meanLuka).length / samplesA.length;
            const beatMedianRate = samplesA.filter((v) => v > medianLuka).length / samplesA.length;

            rowResults.push({ heroLevel, meanA, meanLuka, beatMeanRate, beatMedianRate });
            post({ type: 'progress', workerIndex, heroA, heroLevel, meanA: Math.round(meanA), meanLuka: Math.round(meanLuka), beatMeanRate, beatMedianRate });
        }
        post({ type: 'done', workerIndex, heroA, rowResults });
    } catch (error) {
        post({ type: 'error', workerIndex, heroA, message: error.message, stack: error.stack });
    } finally {
        closeAll();
        try { dom.window.close(); } catch (e) { /* noop */ }
    }
}

main().catch((error) => {
    parentPort.postMessage({ type: 'error', workerIndex: workerData.workerIndex, heroA: workerData.heroA, message: error.message, stack: error.stack });
});
