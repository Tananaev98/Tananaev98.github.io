// Headless access to the actual game, not a second set of combat formulas.
// Presentation is stubbed only for trajectory checks; Enemy.update is the live implementation.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM, VirtualConsole } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(ROOT, name), 'utf8');
const baseSources = ['difficulty.js', 'saveData.js', 'game.js'].map(read);
function loadRuntime(number, levelSource) {
    const errors = [];
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('error', (...args) => errors.push(args.map(String).join(' ')));
    const dom = new JSDOM('<!doctype html><div class="main_menu_image"></div><div id="enemies"></div>', {
        url: `http://localhost/level.html?level=${number}&admin=1`,
        runScripts: 'outside-only', virtualConsole
    });
    const w = dom.window;
    let now = 10000, id = 0;
    const timers = new Map();
    w.setTimeout = (fn, ms = 0) => { timers.set(++id, { fn, at: now + Math.max(0, ms) }); return id; };
    w.clearTimeout = key => timers.delete(key);
    w.requestAnimationFrame = () => 0;
    w.cancelAnimationFrame = () => {};
    w.performance.now = () => now;
    w.Date.now = () => now;
    const source = baseSources[0] + '\n' + (levelSource || read(`lvlData/gameData${number}.js`))
        + '\n' + baseSources[1] + '\n' + baseSources[2] + `
        gameField = document.querySelector('.main_menu_image');
        enemiesContainer = document.getElementById('enemies');
        Object.defineProperties(gameField, {clientWidth: {value: 1000}, clientHeight: {value: 1000}});
        this.api = {
            config: bossCombatConfig, abilities: bossAbilities, combos: bossAbilitiesDop,
            enemies: ENEMY_TYPES, delays: mBossDelayAb, state: gameState,
            phase: getBossPhase, waveDelay: getBossWaveDelay,
            select: selectBossCombo, canSchedule: canScheduleBossCombo,
            schedule: getBossAttackScheduleOffsets, speed: getBossAttackSpeed, execute: executeBossEvent,
            reset: resetBossSequence, start: startBossEvents, stop: stopBossEvents,
            update: Enemy.prototype.update,
            link: linkNextChainMember, resolve: resolveChainMember,
            spawn: spawnEnemyWithParams, impact: applyHeroImpactDamage,
            pause: pauseBossEventTimers, resume: resumeBossEventTimers,
            health: calculateBossMaxHealth, damage: calculateBossAttackDamage,
            comboDamage: getBossComboDamageMultiplier,
            setBoss(role, phaseIndex = 0) {
                bossAliveName = role; bossAlive = true; isGameOver = false; isGamePaused = false;
                const p = bossCombatConfig.phases[phaseIndex];
                currentBoss = new Enemy(role, 50);
                currentBoss.maxHP = 1000;
                currentBoss.hp = Math.max(0.01, p.minHp) * 1000;
                const delay = mBossDelayAb.find(d => d.boss === role);
                bossDelayAb = delay.bossDelayAb; bossDelayAbDop = delay.bossDelayAbDop;
                bossComboHistory = []; bossWaveCounter = 0; resetBossSequence();
                activeEnemies = [];
            },
            setPhase(i) {currentBoss.hp = Math.max(0.01, bossCombatConfig.phases[i].minHp) * currentBoss.maxHP;},
            setWave(i) {bossWaveCounter = i;},
            setActive(a) {activeEnemies = a;},
            status() { return {pending: bossPendingAttacks, history: [...bossComboHistory],
                wave: bossWaveCounter, sinceSignature: bossWavesSinceSignature,
                enemies: activeEnemies, tasks: bossAttackTimers.size};},
            constants: {baseSpeed: ANIMATION_PARAMS.BASE_SPEED, targetY: GAME_CONFIG.TARGET_Y}
        };`;
    // The game exposes pause functions as a pair; fail visibly if their names change.
    vm.runInContext(source, dom.getInternalVMContext(), { timeout: 10000 });
    function advance(ms) {
        const end = now + ms;
        let guard = 0;
        while (true) {
            let nextKey, next;
            for (const [k, t] of timers) if (t.at <= end && (!next || t.at < next.at)) { nextKey = k; next = t; }
            if (!next) break;
            if (++guard > 100000) throw new Error('Runaway task queue');
            now = next.at; timers.delete(nextKey); next.fn();
        }
        now = end;
    }
    function flight(attack, speed, style) {
        // Geometry in percent on a 100x100 presentation stub. No movement formula here.
        const start = now;
        const p = {
            isCustom: true, isBoss: false, isWounded: false, isBarricade: !!attack.barricadeHits,
            x: attack.xPos, y: attack.yPos, pixelY: attack.yPos, fieldWidth: 100, fieldHeight: 100,
            movementOriginX: attack.xPos, movementStyle: style,
            baseSpeedPixelsPerSecond: w.api.enemies[attack.type].baseSpeed * speed * w.api.constants.baseSpeed,
            swayTime: 0, swaySpeed: 3, tiltTime: 0, tiltSpeed: 3,
            waveAmplitude: attack.waveAmplitude ?? 6, waveFrequency: attack.waveFrequency ?? 1.2,
            wavePhase: attack.wavePhase ?? 0, pauseUntil: 0, hitStopUntil: 0,
            barricadeHoldUntil: start + (attack.barricadePauseMs || 0),
            barricadeRushSpeedMultiplier: attack.barricadeRushSpeedMultiplier || 1,
            element: { classList: { add() {}, remove() {} } },
            updateWound: () => false, resolveAwayFromBoss() {}, applyPositionTransform() {},
            clampHorizontal: x => Math.max(0.5, Math.min(93.5, x))
        };
        let elapsed = 0;
        while (elapsed < 30000) {
            elapsed += 1000 / 120; now = start + elapsed;
            if (w.api.update.call(p, 1000 / 120)) break;
        }
        now = start;
        return elapsed;
    }
    return { api: w.api, window: w, dom, errors, advance, flight, close: () => dom.window.close() };
}
module.exports = { loadRuntime, ROOT };
