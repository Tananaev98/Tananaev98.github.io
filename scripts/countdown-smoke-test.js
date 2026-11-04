// Exercise the actual game loop and pause/resume functions without running a live game.
const assert = require('node:assert');
const { loadRuntime } = require('./combat-runtime-harness');
const runtime = loadRuntime(41), w = runtime.window;
try {
    Object.defineProperty(w.document, 'hidden', { value: false, configurable: true });
    w.eval(`
        this.countdownTicks = [];
        showCenterText = text => countdownTicks.push(Number(text));
        this.countdownTest = {
            frame: gameLoop, pause: pauseGame, resume: resumeGame,
            prepare() {
                isGameOver = false; isGamePaused = true; isAutoPausedForVisibility = false;
                bossAlive = false; activeEnemies = []; currentBoss = null; spawnEnabled = false;
                timeNextBoss = 12; activeGameTimeMs = 0; timeSec2 = 0;
                lastTimeSec2 = -1; lastFrameTime = null;
            },
            elapsed() { return activeGameTimeMs; }
        };
    `);
    const clock = w.countdownTest;
    clock.prepare();
    clock.frame(0); clock.frame(5000);
    assert.equal(w.countdownTicks.length, 0, 'loading/start modal must remain paused');
    clock.resume(); clock.frame(5000);
    assert.equal(w.countdownTicks.join(','), '12', 'full countdown on first active frame');
    for (let ms = 5100; ms <= 6000; ms += 100) clock.frame(ms);
    assert.equal(w.countdownTicks.join(','), '12,11', 'next tick after one active second');
    clock.pause(); clock.frame(16000);
    assert.equal(clock.elapsed(), 1000, 'pause must not advance the clock');
    clock.resume(); clock.frame(16000);
    for (let ms = 16100; ms <= 17000; ms += 100) clock.frame(ms);
    assert.equal(w.countdownTicks.join(','), '12,11,10', 'resume must preserve countdown');
    console.log('Countdown: first frame, one-second ticks, start modal and pause/resume — PASS');
} finally { runtime.close(); }
