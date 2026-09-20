#!/usr/bin/env node
// СТОРОЖ ДВИЖКА (правила, часть А8): в боевом коде game.js запрещены зашитые числа и потолки. Всё, что влияет на бой,
// берётся из данных уровня (gameData). Сторож находит числовые литералы внутри боевых функций и падает, если литерал
// не входит в короткий список допустимых («нейтральные» 0/1/-1, 100 — проценты, 1000 — мс↔с) и строка не помечена
// комментарием `guard:allow` (только для чисто визуальных/текстовых значений, не влияющих на бой).
// Запуск: node scripts/engine-hardcode-guard.js   (код выхода 1 при нарушении)
'use strict';
const fs = require('fs');
const path = require('path');
const SRC = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8').replace(/\r\n/g, '\n');

// боевые функции, где зашитые числа запрещены
const GUARDED = [
    'startBossEvents', 'getBossWaveDelay', 'scheduleNextBossWave', 'getComboDanger', 'selectBossCombo', 'canScheduleBossCombo',
    'getBossAttackSpeed', 'getBossAttackScheduleOffsets', 'executeBossEvent', 'linkNextChainMember', 'resolveChainMember',
    'update' // Enemy.update — движение атак (стили движения из bossCombatConfig.movementStyles)
];
const ALLOWED = new Set(['0', '1', '-1', '100', '1000']);
// запрещённые имена (следы удалённых ограничителей)
const BANNED_NAMES = ['capBossAttackSpeed', 'MIN_FAST_CROSSFIRE_GAP_MS', 'FAST_BOSS_ATTACK_SPEED', 'BOSS_LEFT_FLANK_MAX_X', 'BOSS_RIGHT_FLANK_MIN_X',
    'CHAIN_MAX_HEAD_SPEED', 'CHAIN_MAX_SPAWN_Y', 'CHAIN_MIN_SPAWN_GAP_PERCENT', 'ATTACK_CHAIN_MIN_LENGTH', 'ATTACK_CHAIN_MAX_LENGTH',
    'BARRICADE_MAX_CONCURRENT', 'BARRICADE_MIN_SPAWN_GAP_MS', 'getProjectedBossAttackSpeed'];

function functionBody(name) {
    const m = new RegExp(`(?:^|\\n)[ \\t]*(?:function )?${name}[ \\t]*\\([^{]*\\{`).exec(SRC);
    if (!m) return null;
    const open = SRC.indexOf('{', SRC.indexOf(')', m.index));
    let depth = 0;
    for (let i = open; i < SRC.length; i++) {
        const c = SRC[i];
        if (c === '/' && SRC[i + 1] === '/') { while (i < SRC.length && SRC[i] !== '\n') i++; continue; }
        if (c === '/' && SRC[i + 1] === '*') { i = SRC.indexOf('*/', i) + 1; continue; }
        if (c === "'" || c === '"') { const q = c; i++; while (i < SRC.length && SRC[i] !== q) { if (SRC[i] === '\\') i++; i++; } continue; }
        if (c === '`') { i++; while (i < SRC.length && SRC[i] !== '`') { if (SRC[i] === '\\') i++; else if (SRC[i] === '$' && SRC[i + 1] === '{') { let d = 1; i += 2; while (i < SRC.length && d) { if (SRC[i] === '{') d++; else if (SRC[i] === '}') d--; i++; } continue; } i++; } continue; }
        if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) return { text: SRC.slice(m.index, i + 1), startLine: SRC.slice(0, m.index).split('\n').length }; }
    }
    return null;
}

const problems = [];
for (const name of GUARDED) {
    const fn = functionBody(name);
    if (!fn) { problems.push(`функция ${name} не найдена (список GUARDED устарел)`); continue; }
    fn.text.split('\n').forEach((line, i) => {
        if (/guard:allow/.test(line)) return;
        // убрать комментарии и строки/шаблоны
        const code = line.replace(/\/\/.*$/, '').replace(/'(?:[^'\\]|\\.)*'/g, "''").replace(/"(?:[^"\\]|\\.)*"/g, '""').replace(/`(?:[^`\\]|\\.)*`/g, '``');
        for (const m of code.matchAll(/(?<![\w.$])-?\d+(?:\.\d+)?(?![\w])/g)) {
            if (!ALLOWED.has(m[0])) problems.push(`game.js:${fn.startLine + i} (${name}): зашитое число ${m[0]} — вынести в данные уровня`);
        }
    });
}
for (const n of BANNED_NAMES) if (new RegExp(`\\b${n}\\b`).test(SRC)) problems.push(`game.js: вернулось имя удалённого ограничителя ${n}`);

if (problems.length) { console.log('СТОРОЖ ДВИЖКА: НАРУШЕНИЯ'); problems.forEach(p => console.log('  ! ' + p)); process.exit(1); }
console.log(`СТОРОЖ ДВИЖКА: пройден (${GUARDED.length} боевых функций без зашитых чисел, следов старых ограничителей нет)`);
