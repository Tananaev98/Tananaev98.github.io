// worker_threads-воркер: считает admin-balance-panel.html's runAll() для СВОЕГО
// подмножества героев на СОБСТВЕННОМ реальном потоке ОС (в отличие от нескольких
// скрытых iframe в одной вкладке браузера — там всё равно один JS-поток на всех, см.
// обсуждение в задаче). Каждый воркер = отдельный jsdom-инстанс admin-balance-panel.html
// + отдельные jsdom-инстансы level.html на каждого своего героя — полностью независимо
// от других воркеров, без единого разделяемого объекта.
const { parentPort, workerData } = require('node:worker_threads');
const { loadPanelWindow, attachNodeEngines } = require('./panel-harness');

async function main() {
    const { heroKeys, port, workerIndex, attemptsPerStrategy } = workerData;
    const { dom, expose } = await loadPanelWindow(port, attemptsPerStrategy);
    const { closeAll } = attachNodeEngines(expose, port, heroKeys);

    const post = (payload) => parentPort.postMessage(payload);
    post({ type: 'log', workerIndex, message: `старт (герои: ${heroKeys.join(', ')})` });

    const heartbeat = setInterval(() => {
        try {
            const doc = dom.window.document;
            const statusLine = doc.getElementById('statusLine');
            const progressBar = doc.getElementById('progressBar');
            post({
                type: 'progress',
                workerIndex,
                status: statusLine ? statusLine.textContent : '',
                done: progressBar ? Number(progressBar.value) : 0,
                total: progressBar ? Number(progressBar.max) : 0
            });
        } catch (e) { /* окно ещё не готово к чтению — пропускаем этот тик */ }
    }, 3000);

    try {
        await expose.runAll();
        const snapshot = expose.lastRunSnapshot;
        if (!snapshot) throw new Error('runAll() завершился без lastRunSnapshot');
        post({
            type: 'done',
            workerIndex,
            snapshot: {
                stoppedEarly: snapshot.stoppedEarly,
                heroes: snapshot.heroes,
                dpsResults: snapshot.dpsResults,
                survivalResults: snapshot.survivalResults,
                dpsUpgradedResults: snapshot.dpsUpgradedResults,
                dpsCeilingResults: snapshot.dpsCeilingResults,
                survivalUpgradedResults: snapshot.survivalUpgradedResults,
                // Сырые dpsSamples "с апгрейдами" по каждой строке — нужны, чтобы посчитать
                // правило 13 CLAUDE.md (шанс обогнать Луку) ПОСЛЕ слияния воркеров в run.js:
                // здесь, внутри одного воркера, Лука почти всегда достаётся ДРУГОМУ воркеру
                // (см. computeWinRateVsLuka в admin-balance-panel.html), сравнивать не с чем.
                dpsSamplesByHero: snapshot.dpsSamplesByHero
            }
        });
    } catch (error) {
        post({ type: 'error', workerIndex, message: error.message, stack: error.stack });
    } finally {
        clearInterval(heartbeat);
        closeAll();
        try { dom.window.close(); } catch (e) { /* уже закрыто */ }
    }
}

main().catch((error) => {
    parentPort.postMessage({ type: 'error', workerIndex: workerData.workerIndex, message: error.message, stack: error.stack });
});
