// Модель времени комбо боссов — зеркало game.js (getBossAttackScheduleOffsets / getBossAttackSpeed / executeBossEvent).
// Движок исполняет данные уровня БЕЗ ограничителей: интервал выстрела = max(minShotDelay, ..., shotDelayMs), пауза между
// атаками комбо = max(интервал, shotGapsMs), скорость = customSpeed × профиль × фаза × разброс, без потолков и округлений.
// Константы флангов/быстрой атаки/перекрёстного огня ниже — НЕ движка, а правил создания уровня (раздел 5, 5.1): их
// проверяет scripts/combat-data-inventory.js по данным.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// ---- Источник истины по движению атак — game.js (2026-09-20, разбор журнала боя: у lateRush реальный полёт был 0.69 от расчётного,
// у всех боссов скорость крутится по speedVariance, а travelProgress считается от START_Y, а не от точки появления). Модель НЕ
// переписывает эти формулы: она извлекает resolveAttackStyleMultiplier и константы прямо из game.js.
const GAME_SRC = fs.readFileSync(path.join(ROOT, 'game.js'), 'utf8');
function extractFunction(src, name) {
    const i = src.indexOf('function ' + name + '(');
    if (i < 0) throw new Error('combo-model: в game.js нет функции ' + name + ' — модель должна брать движение оттуда');
    let d = 0, j = src.indexOf('{', i);
    for (let k = j; k < src.length; k++) { if (src[k] === '{') d++; else if (src[k] === '}') { d--; if (d === 0) return src.slice(i, k + 1); } }
    throw new Error('combo-model: не закрыта функция ' + name);
}
function extractNumber(name) {
    const m = new RegExp('\\b' + name + '\\s*:\\s*(-?[\\d.]+)').exec(GAME_SRC);
    if (!m) throw new Error('combo-model: в game.js нет константы ' + name);
    return Number(m[1]);
}
const resolveStyle = new Function('return ' + extractFunction(GAME_SRC, 'resolveAttackStyleMultiplier'))();
const START_Y = extractNumber('START_Y');
const TARGET_Y_GAME = extractNumber('TARGET_Y');
const BASE_SPEED_GAME = extractNumber('BASE_SPEED');
// Время полёта атаки от yPos до линии героя: интегрирование по РЕАЛЬНОЙ функции стиля из game.js (шаг 2 мс, как кадры игры).
function flightMs(yPos, pctPerSec, style, styleParams) {
    const st = { hasPausedMidFlight: false, pauseUntil: 0, hasTriggeredRush: false };
    let y = yPos, t = 0; const dt = 2;
    while (y < TARGET_Y_GAME && t < 30000) {
        const progress = Math.max(0, Math.min(1, (y - START_Y) / (TARGET_Y_GAME - START_Y)));
        const m = style ? resolveStyle(st, style, progress, styleParams, t).multiplier : 1;
        y += pctPerSec * m * dt / 1000; t += dt;
    }
    return t;
}
// Боковой разброс цели (%): weave качается ±amplitude, drift уходит к центру на shift — игроку нужно запас по x
function lateralSlop(style, styleParams) {
    if (style === 'weave') return styleParams.weave.amplitude;
    if (style === 'drift') return styleParams.drift.shift;
    return 0;
}
const TARGET_Y = 78;
const BASE_SPEED = 120;
const ENEMY_BASE_SPEED = 0.020;
const FAST_BOSS_ATTACK_SPEED = 18;
const BOSS_LEFT_FLANK_MAX_X = 28;
const BOSS_RIGHT_FLANK_MIN_X = 72;
const MIN_FAST_CROSSFIRE_GAP_MS = 720;

function loadLevel(n) {
    const src = fs.readFileSync(process.env.GD_REJECTED ? path.join(ROOT, 'scripts', 'level-builder', 'rejected', `gameData${n}.js`) : path.join(ROOT, 'lvlData', `gameData${n}.js`), 'utf8');
    const sb = {};
    new vm.Script(src + `
        this.bossCombatConfig = bossCombatConfig; this.ENEMY_TYPES = ENEMY_TYPES;
        this.bossAbilities = bossAbilities; this.bossAbilitiesDop = bossAbilitiesDop;
        this.mBossDelayAb = mBossDelayAb;`).runInContext(vm.createContext(sb));
    return sb;
}

const sideOf = (a) => (a.xPos <= BOSS_LEFT_FLANK_MAX_X ? 'left' : a.xPos >= BOSS_RIGHT_FLANK_MIN_X ? 'right' : 'center');

function projectedSpeed(a, phase, profile) {
    return a.customSpeed * profile.speedMultiplier * phase.speed * Math.max(...profile.speedVariance);
}

function schedule(indices, abilities, shotDelay, phase, profile, shotGapsMs = []) {
    const offsets = [];
    let cur = 0;
    indices.forEach((idx, i) => {
        if (i > 0) cur += Math.max(shotDelay, Number(shotGapsMs[i - 1]) || 0);
        offsets.push(cur);
    });
    return offsets;
}

// abilities — способности ЭТОГО босса; возвращает разбор комбо в фазе phaseIdx.
// combo (необязательно) — сама запись bossAbilitiesDop: учитываются её shotDelayMs и shotGapsMs, как в game.js.
function analyze(level, boss, abilities, indices, phaseIdx = 0, combo = null, opts = {}) {
    const cfg = level.bossCombatConfig;
    const profile = cfg.bosses[boss];
    const phase = cfg.phases[phaseIdx];
    const bossDelay = level.mBossDelayAb.find((b) => b.boss === boss).bossDelayAb;
    const shotDelay = Math.max(cfg.minShotDelay, bossDelay * profile.cadence * phase.cadence, Number(combo && combo.shotDelayMs) || 0);
    const offsets = schedule(indices, abilities, shotDelay, phase, profile, (combo && combo.shotGapsMs) || []);
    const style = profile.movementStyle || null;
    const var5 = profile.speedVariance || [1];
    const arrivals = [];
    const speeds = [];
    indices.forEach((idx, i) => {
        const a = abilities[idx];
        // rot — вращение speedVariance: реальная скорость i-й атаки = variance[(rot + i) % n] (game.js getBossAttackSpeed);
        // без rot берётся середина (1.0) — только для унаследованных проверок, честность считается по ВСЕМ rot (analyzeWorst).
        const variation = opts.rot === undefined ? 1 : var5[(opts.rot + i) % var5.length];
        const pps = level.ENEMY_TYPES[a.type || (boss + boss.slice(-1))].baseSpeed * a.customSpeed * profile.speedMultiplier * phase.speed * variation * BASE_SPEED_GAME;
        arrivals.push(offsets[i] + flightMs(a.yPos, pps, style, cfg.movementStyles));
        speeds.push(a.customSpeed);
    });
    const spread = Math.max(...arrivals) - Math.min(...arrivals);
    const slowCount = speeds.filter((s) => s <= 8).length;
    const hasFast = speeds.some((s) => s >= 12);
    return { arrivals, offsets, speeds, spread, slowCount, hasFast, shotDelay, first: Math.min(...arrivals), lateral: lateralSlop(style, cfg.movementStyles), rot: opts.rot };
}
// Все 5 вращений speedVariance (каждая волна босса сдвигает счётчик) — честность обязана держаться в худшем из них.
function analyzeAllRot(level, boss, abilities, indices, phaseIdx, combo) {
    const n = (level.bossCombatConfig.bosses[boss].speedVariance || [1]).length;
    return Array.from({ length: n }, (_, rot) => analyze(level, boss, abilities, indices, phaseIdx, combo, { rot }));
}

// Допустимость комбо из 2+ способностей по разделу 9.1 (давление по времени).
function verdict(r) {
    if (r.speeds.length < 2) return { ok: true };
    if (r.slowCount >= 2 && !r.hasFast) return { ok: false, why: '2+ медленных без быстрого' };
    const limit = r.slowCount === 1 && r.hasFast ? 1600 : 1000;
    if (r.spread > limit) return { ok: false, why: `разброс ${Math.round(r.spread)}мс > ${limit}` };
    if (r.spread < 40) return { ok: false, why: `разброс ${Math.round(r.spread)}мс < 40 (слипшиеся атаки)` };
    return { ok: true };
}

// Правило «не одновременно с двух сторон» (2026-09-19, жалоба на Охотника ур.4): две атаки, разнесённые по полю
// (dx ≥ CROSS_MIN_DX), не должны прилетать одна за другой ближе CROSS_MIN_GAP_MS — во ВСЕХ фазах (в ф3 интервалы
// сжимаются). Модель «идеального игрока» такое проходит (телеграф виден заранее), но глазами человека это две
// одновременные атаки с противоположных краёв — нечестно, а не сложно.
const CROSS_MIN_DX = 45;
const CROSS_MIN_GAP_MS = 150;
function crossViolations(xs, arrivals) {
    const o = xs.map((x, i) => ({ x, t: arrivals[i] })).sort((a, b) => a.t - b.t);
    const bad = [];
    for (let i = 1; i < o.length; i++) {
        const g = o[i].t - o[i - 1].t;
        if (Math.abs(o[i].x - o[i - 1].x) >= CROSS_MIN_DX && g < CROSS_MIN_GAP_MS) bad.push({ from: o[i - 1].x, to: o[i].x, gap: Math.round(g) });
    }
    return bad;
}

module.exports = { BASE_SPEED_GAME, analyzeAllRot, flightMs, crossViolations, CROSS_MIN_DX, CROSS_MIN_GAP_MS, loadLevel, analyze, verdict, sideOf, schedule, projectedSpeed, ROOT, FAST_BOSS_ATTACK_SPEED, MIN_FAST_CROSSFIRE_GAP_MS };
