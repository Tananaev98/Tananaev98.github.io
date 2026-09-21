#!/usr/bin/env node
// ЕДИНЫЙ ИНСТРУМЕНТ ИНВЕНТАРЯ И ПРОВЕРКИ ДАННЫХ БОЯ (часть А, А3/А5 lvlData/Правила создания уровня.txt).
// Все проверки уровней — проектирование (шаг 3), проверка после записи, сверка с планом, перепроверки —
// выполняются СТРОГО по этому инструменту. Собственных выборок/агрегаций в разовых скриптах не делать.
//
// Использование (из корня проекта):
//   node scripts/combat-data-inventory.js                 сводка по всем уровням: охват полей, ограничения, повторы
//   node scripts/combat-data-inventory.js --level=N       полный разбор уровня N (все поля механики + расчёт прилётов)
//   node scripts/combat-data-inventory.js --check=N       проверка уровня N: ограничения, честность, повторы против ВСЕХ
//                                                          остальных уровней (код выхода 1 при любом нарушении)
//   node scripts/combat-data-inventory.js --pressure=N    метрики давления (А7) и сравнение с базой scripts/baseline
//   node scripts/combat-data-inventory.js --json=путь     выгрузка всех данных в JSON
//   --to=N  ограничить набор уровней 1..N (по умолчанию 1..74 — готовые уровни; 75+ заглушки)
//
// Цифры баланса (урон, HP, customHP/customDamage, множители урона) сюда НЕ входят (CLAUDE.md/план п.1.4):
// они только классифицированы как исключённые. Любое незнакомое поле в структурах боя роняет проверку,
// чтобы новая переменная не выпала из инвентаря молча.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const model = require('./combo-model');

const ROOT = path.join(__dirname, '..');
const ROLES = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
const CHAINS_FROM = 41;      // цепи — только с этого уровня
const BARRICADES_FROM = 66;  // баррикады — только с этого уровня
const GAP_BUCKET_MS = 150;
const READY_LEVELS = 74;     // готовые уровни; 75+ — заглушки (копии), в инвентарь не входят, пока не созданы (--to=N расширяет)

// ---------- классификация полей: M — механика (учитывается), X — исключено (цифры баланса/косметика)
const SCHEMA = {
    'config': { M: ['levelCadence', 'minWaveDelay', 'minShotDelay', 'minTelegraphMs', 'phases', 'bosses', 'attackChains',
        'waveJitter', 'busyRetryMs', 'defaultRecoveryMs', 'selection', 'movementStyles'],
        X: ['scaleLongComboDamage', 'scaleShortComboDamage', 'damageMultiplier', 'musicMood'] },
    'phase': { M: ['minHp', 'cadence', 'speed', 'telegraphMultiplier', 'surpriseChance', 'maxActiveAttacks', 'excludedDangerousCombos'],
        X: ['phase', 'damage'] },
    'boss': { M: ['movementStyle', 'cadence', 'telegraphMs', 'speedMultiplier', 'speedVariance', 'signatureEvery'],
        X: ['damageMultiplier', 'healthMultiplier', 'combatIdentity', 'combatTrick', 'phaseMessages', 'appearMessage'] },
    'attack': { M: ['boss', 'type', 'xPos', 'yPos', 'customSpeed', 'waveAmplitude', 'waveFrequency', 'wavePhase',
        'barricadeHits', 'barricadePauseMs', 'barricadeRushSpeedMultiplier'], X: ['customHP', 'customDamage'] },
    'combo': { M: ['boss', 'indexAbilities', 'openingOrder', 'signature', 'minPhase', 'shotDelayMs', 'recoveryMs',
        'shotGapsMs', 'isChain', 'barricade'], X: ['label', 'damageMultiplier'] },
    'delay': { M: ['boss', 'bossDelayAb', 'bossDelayAbDop', 'firstWaveDelayMs'], X: [] },
    'enemyType': { M: [], X: ['name', 'image', 'baseHP', 'baseSpeed', 'baseDamage', 'spawnWeight', 'baseExp', 'size', 'dispName', 'deathAnimation', 'xPos'] }
};

function loadFull(n, srcOverride) {
    const src = srcOverride !== undefined ? srcOverride : fs.readFileSync(path.join(ROOT, 'lvlData', `gameData${n}.js`), 'utf8');
    const sb = {};
    new vm.Script(src + `
        this.__d = { bossCombatConfig, ENEMY_TYPES, bossAbilities, bossAbilitiesDop, mBossDelayAb, timeNextBoss, bossInterval };`)
        .runInContext(vm.createContext(sb));
    return sb.__d;
}
const existingLevels = () => fs.readdirSync(path.join(ROOT, 'lvlData')).map(f => /^gameData(\d+)\.js$/.exec(f)).filter(Boolean)
    .map(m => Number(m[1])).sort((a, b) => a - b);

const sideOf = (a) => (a.xPos <= 28 ? 'Л' : a.xPos >= 72 ? 'П' : 'Ц');
const speedClass = (s) => (s <= 8 ? 'м' : s >= 18 ? 'б' : 'с'); // медленная / средняя / быстрая (базовая скорость)
const f = (x) => (x === undefined ? '-' : x);

// ---------- сбор данных
function collect(n, problems, srcOverride) {
    const d = loadFull(n, srcOverride); const c = d.bossCombatConfig;
    const unknown = (kind, keys, where) => keys.forEach(k => {
        const s = SCHEMA[kind]; if (!s.M.includes(k) && !s.X.includes(k)) problems.push(`поле не классифицировано: ${kind}.${k} (${where}) — добавить в SCHEMA`);
    });
    unknown('config', Object.keys(c), `уровень ${n}`);
    c.phases.forEach((p, i) => unknown('phase', Object.keys(p), `уровень ${n} фаза ${i + 1}`));
    Object.entries(c.bosses).forEach(([r, b]) => unknown('boss', Object.keys(b), `уровень ${n} ${r}`));
    d.bossAbilities.forEach(a => unknown('attack', Object.keys(a), `уровень ${n}`));
    d.bossAbilitiesDop.forEach(a => unknown('combo', Object.keys(a), `уровень ${n}`));
    d.mBossDelayAb.forEach(a => unknown('delay', Object.keys(a), `уровень ${n}`));
    Object.values(d.ENEMY_TYPES).forEach(e => unknown('enemyType', Object.keys(e), `уровень ${n}`));

    const lv = { bossCombatConfig: c, mBossDelayAb: d.mBossDelayAb, ENEMY_TYPES: d.ENEMY_TYPES };
    const level = {
        n, timeNextBoss: d.timeNextBoss, bossInterval: d.bossInterval,
        levelCadence: c.levelCadence, minWaveDelay: c.minWaveDelay, minShotDelay: c.minShotDelay, minTelegraphMs: c.minTelegraphMs,
        attackChains: !!c.attackChains, selection: c.selection,
        minTelegraphMs: c.minTelegraphMs,
        phases: c.phases.map(p => ({ minHp: p.minHp, cadence: p.cadence, speed: p.speed, telegraphMultiplier: p.telegraphMultiplier,
            surpriseChance: p.surpriseChance, maxActiveAttacks: p.maxActiveAttacks, excludedDangerousCombos: p.excludedDangerousCombos || 0 })),
        bosses: []
    };
    for (const role of ROLES) {
        const prof = c.bosses[role]; const attacks = d.bossAbilities.filter(a => a.boss === role);
        const delay = d.mBossDelayAb.find(x => x.boss === role);
        const boss = { role, name: (d.ENEMY_TYPES[role] || {}).dispName, profile: { movementStyle: prof.movementStyle, cadence: prof.cadence, telegraphMs: prof.telegraphMs,
            speedMultiplier: prof.speedMultiplier, speedVariance: prof.speedVariance, signatureEvery: prof.signatureEvery, minFastSideSwitchMs: prof.minFastSideSwitchMs },
            bossDelayAb: delay.bossDelayAb, bossDelayAbDop: delay.bossDelayAbDop, attacks, combos: [] };
        d.bossAbilitiesDop.filter(x => x.boss === role).forEach((combo, ci) => {
            const kinds = combo.indexAbilities.map(i => attacks[i] && attacks[i].barricadeHits ? 'B' : 'N');
            const kind = (c.attackChains && combo.isChain) ? 'C' : kinds.includes('B') ? 'B' : 'N';
            const phases = [0, 1, 2].map(ph => {
                const r = model.analyze(lv, role, attacks, combo.indexAbilities, ph, combo);
                const arr = r.arrivals.map(Math.round);
                const order = combo.indexAbilities.map((_, i) => i).sort((a, b) => arr[a] - arr[b] || a - b);
                const gaps = order.slice(1).map((k, j) => arr[k] - arr[order[j]]);
                const rots = model.analyzeAllRot(lv, role, attacks, combo.indexAbilities, ph, combo).map(q => ({ arrivals: q.arrivals.map(Math.round), offsets: q.offsets, lateral: q.lateral }));
                return { arrivals: arr, offsets: r.offsets, order: order.map(i => i + 1).join(''), spread: Math.round(r.spread),
                    gaps, verdict: model.verdict(r), shotDelay: Math.round(r.shotDelay), rots };
            });
            boss.combos.push({ index: ci, indices: combo.indexAbilities, kind, minPhase: combo.minPhase || 1, signature: !!combo.signature,
                openingOrder: combo.openingOrder, shotDelayMs: combo.shotDelayMs, recoveryMs: combo.recoveryMs, shotGapsMs: combo.shotGapsMs,
                isChain: !!combo.isChain, sides: combo.indexAbilities.map(i => sideOf(attacks[i])).join(''),
                speeds: combo.indexAbilities.map(i => attacks[i].customSpeed), classes: combo.indexAbilities.map(i => speedClass(attacks[i].customSpeed)).join(''),
                phases });
        });
        level.bosses.push(boss);
    }
    return level;
}

// «Решение игрока» — отпечаток комбо: стороны, порядок прилёта, классы скоростей, интервалы (в корзинах) в фазах 1 и 3.
// Совпадение отпечатка = игрок принимает то же решение в том же порядке (повтор опыта, даже если координаты другие).
function fingerprint(cb) {
    const ph = [cb.phases[0], cb.phases[2]].map(p => `${p.order}|${p.gaps.map(g => Math.round(g / GAP_BUCKET_MS)).join(',')}`).join('#');
    return `${cb.kind}|${cb.sides}|${cb.classes}|${ph}`;
}

// ---------- ограничения и честность
// Движок исполняет данные БЕЗ ограничителей (правила А8): всё, что раньше молча навязывал game.js (потолки скорости по
// высоте старта, растяжка перекрёстного огня, границы цепей), теперь обязан соблюдать сам уровень — и проверяется здесь.
const RULE = { fastSpeed: 18, leftFlank: 28, rightFlank: 72, crossfireMs: 720, chainMinLen: 3, chainMaxLen: 7, chainMaxHeadSpeed: 18, chainMaxSpawnY: 26, chainMinGapPercent: 12, targetYSpeedBase: 0.020 * 120 };
function dataRules(L) {
    const P = [];
    L.bosses.forEach(b => {
        const sm = b.profile.speedMultiplier, mv = Math.max(...b.profile.speedVariance);
        const proj = (a, p) => a.customSpeed * sm * L.phases[p].speed * mv;
        const sideOfA = (a) => (a.xPos <= RULE.leftFlank ? 'L' : a.xPos >= RULE.rightFlank ? 'R' : 'C');
        b.attacks.forEach((a, i) => [0, 1, 2].forEach(p => {
            const v = proj(a, p); const cap = a.yPos > 12 ? 15 : a.yPos > 10 ? 18 : 31;
            if (v > cap) P.push(`${b.role} атака ${i} ф${p + 1}: итоговая скорость ${v.toFixed(1)} при старте y=${a.yPos} выше допустимых ${cap} (раздел 5; движок больше не режет скорость)`);
            if (a.customSpeed <= 10 && v > 11.5) P.push(`${b.role} атака ${i} ф${p + 1}: «медленная» атака разгоняется до ${v.toFixed(1)} (>11.5)`);
        }));
        // 16.3: баррикады — не более одной комбинации на босса; (память выбора + 1) × minWaveDelay ≥ 7000 мс
        const barr = b.combos.filter(cb => cb.kind === 'B').length;
        if (barr > 1) P.push(`${b.role}: комбинаций с баррикадой ${barr} (>1, раздел 16.3)`);
        if (barr && (L.selection.historyLength + 1) * L.minWaveDelay < 7000) P.push(`${b.role}: (${L.selection.historyLength}+1)×minWaveDelay ${L.minWaveDelay} < 7000 мс — баррикады могут идти чаще раза в 7 с (раздел 16.3)`);
        b.combos.forEach(cb => cb.phases.forEach((ph, p) => {
            // 5.1: быстрые атаки с противоположных флангов — не ближе 720 мс по моментам появления
            let lastL = -Infinity, lastR = -Infinity;
            cb.indices.forEach((k, i) => {
                const a = b.attacks[k]; const side = sideOfA(a); if (side === 'C' || proj(a, p) < RULE.fastSpeed) return;
                const opp = side === 'L' ? lastR : lastL;
                if (Number.isFinite(opp) && ph.offsets[i] - opp < RULE.crossfireMs) P.push(`${b.role} комбо ${cb.index} ф${p + 1}: быстрые атаки противоположных флангов через ${ph.offsets[i] - opp} мс (<${RULE.crossfireMs}, раздел 5.1)`);
                if (side === 'L') lastL = ph.offsets[i]; else lastR = ph.offsets[i];
            });
            // (правило «разница прилёта ≥150 мс» заменено моделью живого игрока — sequentialSlack в разделе 6: честность считается по времени, а не по порогу)
            // 13.7: цепь
            if (cb.kind === 'C') {
                const ys = cb.indices.map(k => b.attacks[k].yPos), ss = cb.indices.map((k, i) => proj(b.attacks[k], p));
                if (cb.indices.length < RULE.chainMinLen || cb.indices.length > RULE.chainMaxLen) P.push(`${b.role} цепь ${cb.index}: длина ${cb.indices.length} вне ${RULE.chainMinLen}-${RULE.chainMaxLen}`);
                if (ys.some(y => y > RULE.chainMaxSpawnY)) P.push(`${b.role} цепь ${cb.index}: звено стартует ниже y=${RULE.chainMaxSpawnY}`);
                if (ss[0] > RULE.chainMaxHeadSpeed) P.push(`${b.role} цепь ${cb.index} ф${p + 1}: скорость головы ${ss[0].toFixed(1)} > ${RULE.chainMaxHeadSpeed}`);
                for (let i = 1; i < ss.length; i++) if (ss[i] > ss[i - 1] + 1e-9) { P.push(`${b.role} цепь ${cb.index} ф${p + 1}: звено ${i + 1} быстрее предыдущего`); break; }
                const minGapMs = RULE.chainMinGapPercent / (RULE.targetYSpeedBase * RULE.chainMaxHeadSpeed) * 1000;
                if (ph.shotDelay < minGapMs - 1e-6) P.push(`${b.role} цепь ${cb.index} ф${p + 1}: шаг появления звеньев ${ph.shotDelay} мс < ${Math.round(minGapMs)} мс (звенья «кучей»)`);
            }
        }));
    });
    return P;
}
function constraints(L) {
    const P = dataRules(L);
    const barricades = L.bosses.some(b => b.attacks.some(a => a.barricadeHits !== undefined));
    if (L.attackChains && L.n < CHAINS_FROM) P.push(`цепи (attackChains) на уровне ${L.n} < ${CHAINS_FROM}`);
    if (L.bosses.some(b => b.combos.some(c => c.isChain)) && L.n < CHAINS_FROM) P.push(`isChain-комбо на уровне ${L.n} < ${CHAINS_FROM}`);
    if (barricades && L.n < BARRICADES_FROM) P.push(`баррикады на уровне ${L.n} < ${BARRICADES_FROM}`);
    for (const b of L.bosses) {
        b.attacks.forEach((a, i) => {
            if (a.barricadeHits === undefined && a.customHP !== 1) P.push(`${b.role} атака ${i}: customHP=${a.customHP} (должен быть 1, кроме баррикад)`);
            if (a.customSpeed >= 20 && a.yPos > 10) P.push(`${b.role} атака ${i}: скорость ${a.customSpeed} стартует на y=${a.yPos} (>10)`);
            else if (a.customSpeed >= 16 && a.yPos > 12) P.push(`${b.role} атака ${i}: скорость ${a.customSpeed} стартует на y=${a.yPos} (>12)`);
        });
        b.combos.forEach(cb => {
            if (cb.indices.length < 2 || cb.kind !== 'N') return;
            cb.phases.forEach((p, ph) => { if (!p.verdict.ok) P.push(`${b.role} комбо ${cb.index} [${cb.indices}] фаза ${ph + 1}: 9.1 — ${p.verdict.why}`); });
        });
        if (b.attacks.length && !b.combos.length) P.push(`${b.role}: нет комбо`);
        if (!b.combos.some(c => c.signature)) P.push(`${b.role}: нет фирменного (signature) комбо`);
    }
    return P;
}

// ---------- повторы против ВСЕХ остальных уровней
function repeatsFor(L, others) {
    const R = [];
    const same = (k, v, get) => { const hit = others.filter(o => get(o) === v).map(o => o.n); if (hit.length) R.push(`${k}=${JSON.stringify(v)} уже на уровнях ${hit.join(',')}`); };
    for (const k of ['levelCadence', 'minWaveDelay', 'minShotDelay', 'minTelegraphMs']) same(`уровень.${k}`, L[k], o => o[k]);
    L.phases.forEach((p, i) => ['minHp', 'cadence', 'speed', 'telegraphMultiplier', 'surpriseChance'].forEach(k => { if (k === 'minHp' && i === 2) return; /* Ф3.minHp всегда 0 — структурная константа */ same(`фаза${i + 1}.${k}`, p[k], o => o.phases[i][k]); }));
    same('maxActiveAttacks (тройка)', L.phases.map(p => p.maxActiveAttacks).join('/'), o => o.phases.map(p => p.maxActiveAttacks).join('/'));
    same('timeNextBoss/bossInterval', `${L.timeNextBoss}/${L.bossInterval}`, o => `${o.timeNextBoss}/${o.bossInterval}`);
    same('movementStyle (пять ролей)', L.bosses.map(b => b.profile.movementStyle).join(','), o => o.bosses.map(b => b.profile.movementStyle).join(','));
    for (const b of L.bosses) {
        const ob = (o) => o.bosses.find(x => x.role === b.role);
        for (const k of ['cadence', 'telegraphMs', 'speedMultiplier']) same(`${b.role}.${k}`, b.profile[k], o => ob(o).profile[k]);
        same(`${b.role}.bossDelayAb`, b.bossDelayAb, o => ob(o).bossDelayAb);
        same(`${b.role}.bossDelayAbDop`, b.bossDelayAbDop, o => ob(o).bossDelayAbDop);
        same(`${b.role}.структура комбо`, b.combos.map(c => c.kind + c.indices.length).sort().join(','), o => ob(o).combos.map(c => c.kind + c.indices.length).sort().join(','));
        // геометрия: тройка (x,y,speed) и волна не должна встречаться у той же роли на других уровнях
        const key = (a) => `${a.xPos}/${a.yPos}/${a.customSpeed}/${f(a.waveAmplitude)}/${f(a.waveFrequency)}`;
        const seen = new Map(); others.forEach(o => ob(o).attacks.forEach(a => { if (!seen.has(key(a))) seen.set(key(a), o.n); }));
        const dup = b.attacks.filter(a => seen.has(key(a)));
        if (dup.length) R.push(`${b.role}: ${dup.length} из ${b.attacks.length} атак повторяют геометрию x/y/скорость(/волна) этой роли на других уровнях (напр. ${key(dup[0])} на ${seen.get(key(dup[0]))})`);
    }
    return R;
}
function solutionRepeats(L, others) {
    const R = [];
    const map = new Map();
    others.forEach(o => o.bosses.forEach(b => b.combos.forEach(cb => { if (cb.indices.length >= 3) { const k = fingerprint(cb); if (!map.has(k)) map.set(k, `${o.n}/${b.role}`); } })));
    for (const b of L.bosses) b.combos.forEach(cb => {
        if (cb.indices.length < 3) return; const k = fingerprint(cb);
        if (map.has(k)) R.push({ boss: b.role, combo: cb.index, len: cb.indices.length, with: map.get(k), fp: k });
    });
    return R;
}


// ---------- давление (часть А7): метрики по данным + реальный движок для паузы между волнами
function pressureOf(n, srcOverride) {
    const { loadRuntime } = require('./combat-runtime-harness');
    const rt = loadRuntime(n, srcOverride); const a = rt.api; rt.window.Math.random = () => 0.5;
    const lv = { bossCombatConfig: a.config, mBossDelayAb: a.delays, ENEMY_TYPES: loadFull(n, srcOverride).ENEMY_TYPES };
    const out = {};
    for (const role of ROLES) {
        const at = a.abilities.filter(x => x.boss === role); const cs = a.combos.filter(x => x.boss === role);
        const avgLen = cs.reduce((t, c) => t + c.indexAbilities.length, 0) / cs.length;
        const slow = at.filter(x => x.customSpeed <= 8).length / at.length;
        const ph = [0, 1, 2].map(p => {
            a.setBoss(role, p); const wd = Math.round(a.waveDelay());
            let dec = 0, viol = 0, nc = 0;
            for (const c of cs) {
                const an = model.analyze(lv, role, at, c.indexAbilities, p, c); nc++;
                const idx = c.indexAbilities; let d = 0;
                for (let i = 0; i < idx.length; i++) for (let j = i + 1; j < idx.length; j++)
                    if (Math.abs(at[idx[i]].xPos - at[idx[j]].xPos) >= 15 && Math.abs(an.arrivals[i] - an.arrivals[j]) <= 700) d++;
                dec += d;
                idx.forEach((k, i) => { if (at[k].customSpeed <= 8 && !at[k].barricadeHits) { const cover = idx.some((k2, j) => j !== i && Math.abs(at[k2].xPos - at[k].xPos) >= 15 && Math.abs(an.arrivals[i] - an.arrivals[j]) <= 700); if (!cover) viol++; } });
            }
            return { waveDelay: wd, apm: avgLen * 60000 / (wd + 2500), decisions: dec / nc, slowViol: viol };
        });
        out[role] = { avgLen, slow, ph };
    }
    rt.close(); return out;
}
const baselineFile = (n) => path.join(__dirname, 'baseline', `gameData${n}.js`);
function pressureReport(n) {
    const cur = pressureOf(n); const bf = baselineFile(n);
    const base = fs.existsSync(bf) ? pressureOf(n, fs.readFileSync(bf, 'utf8')) : null;
    const rows = []; const bad = [];
    for (const role of ROLES) {
        const c = cur[role], b = base && base[role];
        const f1 = (x) => x.toFixed(1);
        rows.push(`  ${role}: длина комбо ${b ? f1(b.avgLen) + '→' : ''}${f1(c.avgLen)} | медленных ${b ? Math.round(b.slow * 100) + '→' : ''}${Math.round(c.slow * 100)}% | ` +
            [0, 2].map(p => `ф${p + 1}: пауза ${b ? b.ph[p].waveDelay + '→' : ''}${c.ph[p].waveDelay}мс, атак/мин ${b ? f1(b.ph[p].apm) + '→' : ''}${f1(c.ph[p].apm)}, решений/комбо ${b ? f1(b.ph[p].decisions) + '→' : ''}${f1(c.ph[p].decisions)}`).join(' | ') + ` | медленных без прикрытия ф1/ф3: ${c.ph[0].slowViol}/${c.ph[2].slowViol}`);
        if (b) { if (c.avgLen < b.avgLen - 1e-9) bad.push(`${role}: средняя длина комбо ${f1(c.avgLen)} < прежней ${f1(b.avgLen)} (А7.3)`);
            for (const p of [0, 2]) if (c.ph[p].apm < b.ph[p].apm - 1e-9) bad.push(`${role} ф${p + 1}: атак/мин ${f1(c.ph[p].apm)} < прежних ${f1(b.ph[p].apm)} (А7.3)`); }
        // А7.6 (2026-09-21, жалоба на Долбуна ур.13): потолок давления — у игрока должно оставаться окно, чтобы бить босса, а не только защищаться.
        if (n >= 11) { if (c.ph[0].apm > 46) bad.push(`${role} ф1: атак/мин ${f1(c.ph[0].apm)} > 46 — нет окон для атаки по боссу (А7.6)`);
            if (c.ph[2].apm > 54) bad.push(`${role} ф3: атак/мин ${f1(c.ph[2].apm)} > 54 — нет окон для атаки по боссу (А7.6)`);
            if (c.ph[2].waveDelay < 2400) bad.push(`${role} ф3: пауза между комбо ${c.ph[2].waveDelay} мс < 2400 (А7.6)`); }
        for (const p of [0, 1, 2]) if (c.ph[p].slowViol) { bad.push(`${role} ф${p + 1}: медленных атак без прикрытия — ${c.ph[p].slowViol} (А7.4)`); break; }
    }
    return { rows, bad, hasBase: !!base };
}


// ---------- ЗАПАС ВРЕМЕНИ ИГРОКА (часть А9): модель идеального игрока — scripts/player-model.js
const { PLAYER, comboSlack, worstSequentialSlack, SEQ_MIN_MS } = require('./player-model');
function slackReport(L) {
    const rows = []; const all = [];
    for (const b of L.bosses) {
        const per = [0, 1, 2].map(p => {
            const tele = Math.max(L.minTelegraphMs, b.profile.telegraphMs * L.phases[p].telegraphMultiplier);
            const vals = b.combos.filter(cb => cb.indices.length >= 2 && cb.minPhase <= p + 1).map(cb => comboSlack(cb.indices.map(k => b.attacks[k]), cb.phases[p].arrivals, cb.phases[p].offsets, tele));
            vals.sort((a, c) => a - c);
            const med = vals.length ? vals[Math.floor(vals.length / 2)] : null;
            all.push(...vals.map(v => ({ role: b.role, p, v })));
            return { min: vals[0], med, max: vals[vals.length - 1], neg: vals.filter(v => v < 0).length, n: vals.length };
        });
        rows.push({ role: b.role, per });
    }
    return { rows, all };
}


// Пороги А9 (правила, часть А9): возможность и «не слишком легко» по запасу времени идеального игрока
// А9 (пересмотр 2026-09-20): мера — запас ЖИВОГО игрока (player-model.js worstSequentialSlack: курсор 110 %/с, реакция 300 мс, 100 мс на смену
// цели, порядок прилёта, худшее из 5 вращений speedVariance, реальная физика стилей из game.js). Старая мера («всезнающий» игрок, номинальные
// скорости, без стилей) завышала запас на 300-600 мс (журнал боя: атаки lateRush летели на 30 % быстрее расчёта) и пропускала невозможные комбо.
// Пороги пересчитаны под честную меру: самое тугое комбо каждой фазы — на грани (запас 60-600/350/250), медиана — не «пустая».
const SLACK_RULE = { possibleMin: SEQ_MIN_MS, medianMax: [750, 600, 500], minMax: [600, 350, 250] };
function slackChecks(L) {
    const rows = [], bad = [];
    for (const b of L.bosses) {
        const per = [0, 1, 2].map(p => {
            const tele = Math.max(L.minTelegraphMs, b.profile.telegraphMs * L.phases[p].telegraphMultiplier);
            const list = b.combos.filter(cb => cb.indices.length >= 2 && cb.minPhase <= p + 1)
                .map(cb => ({ cb, v: worstSequentialSlack(cb.indices.map(k => b.attacks[k]), cb.phases[p].rots, tele) }));
            list.filter(x => x.v < SLACK_RULE.possibleMin).forEach(x => bad.push(`${b.role} комбо ${x.cb.index} ф${p + 1}: живой игрок (порядок прилёта, худшее из 5 вращений скоростей) имеет запас ${x.v} мс < ${SLACK_RULE.possibleMin} — не успеет`));
            const v = list.map(x => x.v).sort((x, y) => x - y);
            return { min: v[0], med: v[Math.floor(v.length / 2)], n: v.length };
        });
        rows.push(`  ${b.role}: ` + per.map((q, p) => `ф${p + 1}: мин ${q.min} / медиана ${q.med} мс`).join(' | '));
        per.forEach((q, p) => {
            if (q.min > SLACK_RULE.minMax[p]) bad.push(`${b.role} ф${p + 1}: самое тугое комбо имеет запас ${q.min} мс > ${SLACK_RULE.minMax[p]} — слишком легко (А9.3)`);
            if (q.med > SLACK_RULE.medianMax[p]) bad.push(`${b.role} ф${p + 1}: медианный запас ${q.med} мс > ${SLACK_RULE.medianMax[p]} — слишком легко (А9.3)`);
        });
    }
    return { rows, bad };
}


// ---------- ИНДИВИДУАЛЬНОСТЬ БОССОВ УРОВНЯ (часть А10): боссы не должны быть копиями друг друга
const INDIV = { maxSameSpeedShare: 0.55, minProfileDistance: 0.25, flightBands: [1200, 2000] };
function individuality(L) {
    const rows = [], bad = [];
    const prof = L.bosses.map(b => {
        const sp = b.attacks.map(a => a.customSpeed); const n = sp.length; const cnt = {};
        sp.forEach(v => (cnt[v] = (cnt[v] || 0) + 1));
        const top = Math.max(...Object.values(cnt)) / n;
        // профиль = доли атак по времени полёта (фаза 1, от появления до прилёта): короткие / средние / долгие
        const fl = {}; b.combos.forEach(c => c.indices.forEach((k, i) => { const p = c.phases[0]; const v = p.arrivals[i] - p.offsets[i]; fl[k] = fl[k] === undefined ? v : Math.min(fl[k], v); }));
        const fv = Object.values(fl); const [lo, hi] = INDIV.flightBands;
        const share = [fv.filter(v => v <= lo).length / fv.length, fv.filter(v => v > lo && v <= hi).length / fv.length, fv.filter(v => v > hi).length / fv.length];
        return { role: b.role, top, share, seqs: new Set(b.combos.filter(cb => cb.kind === 'N' && cb.indices.length >= 3).map(cb => cb.sides)) };
    });
    prof.forEach(p => {
        rows.push(`  ${p.role}: самая частая скорость ${(p.top * 100).toFixed(0)}% атак; полёт ≤${INDIV.flightBands[0]} / до ${INDIV.flightBands[1]} / дольше: ${p.share.map(x => (x * 100).toFixed(0) + '%').join(' / ')}`);
        if (p.top > INDIV.maxSameSpeedShare) bad.push(`${p.role}: ${(p.top * 100).toFixed(0)}% атак одной скорости (>${Math.round(INDIV.maxSameSpeedShare * 100)}%) — нет своего темпа (А10.2)`);
    });
    for (let i = 0; i < prof.length; i++) for (let j = i + 1; j < prof.length; j++) {
        const shared = [...prof[i].seqs].filter(x => prof[j].seqs.has(x));
        if (shared.length) bad.push(`${prof[i].role} и ${prof[j].role}: одинаковые последовательности сторон в комбо ≥3 атак: ${shared.join(', ')} (А10.1)`);
        const d = prof[i].share.reduce((t, v, k) => t + Math.abs(v - prof[j].share[k]), 0);
        if (d < INDIV.minProfileDistance) bad.push(`${prof[i].role} и ${prof[j].role}: профили времени полёта почти совпадают (расстояние ${d.toFixed(2)} < ${INDIV.minProfileDistance}) (А10.3)`);
    }
    return { rows, bad };
}

// ---------- вывод
function printLevel(L) {
    console.log(`\n=== УРОВЕНЬ ${L.n} ===  timeNextBoss=${L.timeNextBoss} bossInterval=${L.bossInterval} levelCadence=${L.levelCadence} minWaveDelay=${L.minWaveDelay} minShotDelay=${L.minShotDelay} minTelegraphMs=${L.minTelegraphMs} attackChains=${L.attackChains}`);
    L.phases.forEach((p, i) => console.log(`  фаза ${i + 1}: minHp=${p.minHp} cadence=${p.cadence} speed=${p.speed} telegraphMult=${p.telegraphMultiplier} surprise=${p.surpriseChance} maxActive=${p.maxActiveAttacks} excludedDangerous=${p.excludedDangerousCombos}`));
    for (const b of L.bosses) {
        const p = b.profile;
        console.log(`\n  ${b.role} «${b.name}» стиль=${p.movementStyle} cadence=${p.cadence} telegraphMs=${p.telegraphMs} speedMult=${p.speedMultiplier} variance=[${p.speedVariance}] signatureEvery=${f(p.signatureEvery)} minFastSideSwitchMs=${f(p.minFastSideSwitchMs)} bossDelayAb=${b.bossDelayAb} bossDelayAbDop=${b.bossDelayAbDop}`);
        console.log(`    атак: ${b.attacks.length}, комбо: ${b.combos.length}`);
        for (const cb of b.combos) {
            const att = cb.indices.map(i => { const a = b.attacks[i]; return `${a.xPos}/${a.yPos}/${a.customSpeed}${a.waveAmplitude !== undefined ? `/w${a.waveAmplitude}-${a.waveFrequency}` : ''}${a.barricadeHits ? `/бар${a.barricadeHits}` : ''}`; }).join(' ');
            console.log(`    [${cb.index}] ${cb.kind}${cb.signature ? ' сигн' : ''} minФаза=${cb.minPhase}${cb.openingOrder !== undefined ? ` открывает=${cb.openingOrder}` : ''}${cb.shotDelayMs ? ` shotDelayMs=${cb.shotDelayMs}` : ''}${cb.recoveryMs ? ` recoveryMs=${cb.recoveryMs}` : ''}${cb.shotGapsMs ? ` gaps=[${cb.shotGapsMs}]` : ''} | ${att} | стороны ${cb.sides} классы ${cb.classes}`);
            console.log('        ' + cb.phases.map((p, i) => `ф${i + 1}: прилёт [${p.arrivals}] порядок ${p.order} разброс ${p.spread}${p.verdict.ok ? '' : ' ✗' + p.verdict.why}`).join(' | '));
        }
    }
}

function main() {
    const args = Object.fromEntries(process.argv.slice(2).map(a => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
    const limit = args.to ? Number(args.to) : READY_LEVELS;
    const nums = existingLevels().filter(n => n <= limit);
    const problems = []; const levels = nums.map(n => collect(n, problems));
    const byN = new Map(levels.map(l => [l.n, l]));

    if (args.json && args.json !== true) { fs.writeFileSync(args.json, JSON.stringify(levels, null, 1)); console.log('записано', args.json); }

    if (args.level) { const L = byN.get(Number(args.level)); if (!L) { console.error('нет такого уровня'); process.exit(2); } printLevel(L); }

    if (args.slack) {
        const n = Number(args.slack); const L = byN.get(n); const bf = baselineFile(n);
        const show = (title, Lx) => { const r = slackReport(Lx); console.log(title);
            r.rows.forEach(x => console.log(`  ${x.role}: ` + x.per.map((q, p) => `ф${p + 1}: запас мин ${q.min} / медиана ${q.med} мс (комбо ${q.n}, невозможных ${q.neg})`).join(' | '))); };
        show(`ЗАПАС ВРЕМЕНИ ИГРОКА, уровень ${n} (курсор ${PLAYER.cursorSpeed}%/с, реакция ${PLAYER.reactionMs} мс)`, L);
        if (args.verbose) for (const b of L.bosses) {
            console.log(`  ${b.role}:`);
            b.combos.forEach(cb => { if (cb.indices.length < 2) return;
                const v = [0, 1, 2].map(p => { const tele = Math.max(L.minTelegraphMs, b.profile.telegraphMs * L.phases[p].telegraphMultiplier); return comboSlack(cb.indices.map(k => b.attacks[k]), cb.phases[p].arrivals, cb.phases[p].offsets, tele); });
                console.log(`    [${cb.index}] ${cb.kind}${cb.signature ? ' сигн' : ''} дл.${cb.indices.length} minФаза ${cb.minPhase}: запас ф1 ${v[0]}, ф2 ${v[1]}, ф3 ${v[2]} мс | стороны ${cb.sides}`); });
        }
        if (fs.existsSync(bf)) { const pr = []; show('  база (до переработки):', collect(n, pr, fs.readFileSync(bf, 'utf8'))); }
        process.exit(0);
    }

    if (args.pressure) {
        const n = Number(args.pressure); const rp = pressureReport(n);
        console.log(`ДАВЛЕНИЕ УРОВНЯ ${n}${rp.hasBase ? ' (база: снимок до переработки)' : ' (базы нет)'}`); rp.rows.forEach(x => console.log(x));
        console.log(rp.bad.length ? 'НАРУШЕНИЯ А7:' : 'Нарушений А7 нет'); rp.bad.forEach(x => console.log('  ! ' + x));
        process.exit(rp.bad.length ? 1 : 0);
    }

    if (args.check) {
        const n = Number(args.check); const L = byN.get(n); if (!L) { console.error('нет такого уровня'); process.exit(2); }
        const others = levels.filter(l => l.n !== n);
        const C = constraints(L), Rp = repeatsFor(L, others), S = solutionRepeats(L, others);
        console.log(`ПРОВЕРКА УРОВНЯ ${n} против ${others.length} остальных уровней`);
        console.log(`\n1) Классификация полей: ${problems.length ? problems.length + ' проблем' : 'все поля известны'}`); problems.forEach(p => console.log('   ! ' + p));
        console.log(`\n2) Ограничения и честность: ${C.length ? C.length + ' нарушений' : 'нарушений нет'}`); C.forEach(p => console.log('   ! ' + p));
        console.log(`\n3) Повторы данных против всех остальных уровней: ${Rp.length ? Rp.length : 'повторов нет'}`); Rp.forEach(p => console.log('   ! ' + p));
        console.log(`\n4) Повторы «решения игрока» (комбо ≥3 атак с тем же отпечатком: стороны, классы скоростей, порядок и интервалы прилёта в ф1 и ф3): ${S.length ? S.length : 'нет'}`);
        S.forEach(s => console.log(`   ! ${s.boss} комбо ${s.combo} (${s.len} атак) повторяет решение ${s.with}   [${s.fp}]`));
        const PR = pressureReport(n);
        console.log(`
5) Давление и медленные атаки (А7): ${PR.bad.length ? PR.bad.length + ' нарушений' : 'нарушений нет'}`); PR.rows.forEach(x => console.log(x)); PR.bad.forEach(x => console.log('   ! ' + x));
        const SL = slackChecks(L);
        console.log(`\n6) Запас времени игрока (А9): ${SL.bad.length ? SL.bad.length + ' нарушений' : 'нарушений нет'}`); SL.rows.forEach(x => console.log(x)); SL.bad.forEach(x => console.log('   ! ' + x));
        const IN = individuality(L);
        console.log(`\n7) Индивидуальность боссов (А10): ${IN.bad.length ? IN.bad.length + ' нарушений' : 'нарушений нет'}`); IN.rows.forEach(x => console.log(x)); IN.bad.forEach(x => console.log('   ! ' + x));
        const total = problems.length + C.length + Rp.length + S.length + PR.bad.length + SL.bad.length + IN.bad.length;
        console.log(`\nИТОГ: ${total ? 'НЕ ПРОЙДЕНО (' + total + ')' : 'ПРОЙДЕНО'}`);
        process.exit(total ? 1 : 0);
    }

    if (!args.level && !args.check && !args.json) {
        console.log(`ИНВЕНТАРЬ БОЯ: ${levels.length} уровней (${nums[0]}..${nums[nums.length - 1]}), ${levels.length * 5} боссов`);
        console.log(`\nОХВАТ ПОЛЕЙ: неклассифицированных полей ${problems.length}`); problems.slice(0, 20).forEach(p => console.log('  ! ' + p));
        let cV = 0; console.log('\nОГРАНИЧЕНИЯ И ЧЕСТНОСТЬ (по уровням):');
        levels.forEach(L => { const C = constraints(L); cV += C.length; if (C.length) { console.log(` уровень ${L.n}: ${C.length}`); C.slice(0, 3).forEach(p => console.log('   ! ' + p)); } });
        console.log(` всего нарушений: ${cV}`);
        let rv = 0, sv = 0, worst = [];
        levels.forEach((L, i) => { const others = levels.filter(l => l.n !== L.n); const r = repeatsFor(L, others).length, s = solutionRepeats(L, others).length; rv += r; sv += s; worst.push([L.n, r, s]); });
        console.log(`\nПОВТОРЫ ПРОТИВ ВСЕХ ОСТАЛЬНЫХ УРОВНЕЙ: данных ${rv}, решений игрока ${sv}`);
        console.log(' уровень: повторы данных / повторы решений'); console.log(' ' + worst.map(w => `${w[0]}:${w[1]}/${w[2]}`).join('  '));
    }
    if (!args.check) process.exit(problems.length ? 1 : 0);
}
main();
