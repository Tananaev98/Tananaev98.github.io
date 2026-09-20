// One-time migration. --write is explicit; existing combatIdentity makes reruns a no-op.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { designs, attackSlots } = require('./combat-designs');
const root = path.resolve(__dirname, '..');
const write = process.argv.includes('--write');
function arrayEnd(source, name) {
    const start = source.indexOf('[', source.indexOf(`const ${name} =`));
    let depth = 0, quote = '', comment = '';
    for (let i = start; i < source.length; i++) {
        const c = source[i], next = source[i + 1];
        if (comment === '//') { if (c === '\n') comment = ''; continue; }
        if (comment === '/*') { if (c === '*' && next === '/') { comment = ''; i++; } continue; }
        if (quote) { if (c === '\\') i++; else if (c === quote) quote = ''; continue; }
        if (c === '/' && (next === '/' || next === '*')) { comment = c + next; i++; continue; }
        if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
        if (c === '[') depth++;
        if (c === ']' && --depth === 0) return { start, end: i };
    }
    throw Error(`Missing ${name}`);
}
const serialize = value => JSON.stringify(value).replace(/"([a-zA-Z]\w*)":/g, '$1: ');
// These are different decisions, not nine names for a single alternation.
// Slots: 0/1 approach, 2 high fast crossing, 3 slow decoy, 4/5 return.
const patterns = {
    sweep: [[0,1,2], [0,1,4], [5,2,1,4]],
    bite: [[0,4], [0,4,2], [5,1,5,2]],
    hook: [[0,1,5], [0,1,4], [2,5,1,4]],
    pulse: [[0,4,2,5], [0,4,5], [2,5,0,4]],
    bait: [[3,2], [3,2,4], [3,5,2,4]],
    fork: [[0,2,5], [0,2,1], [4,2,5,1]],
    echo: [[0,4,1], [0,4,2], [5,2,5,1]],
    squeeze: [[0,2,1,5], [0,2,4], [1,5,0,2]],
    chase: [[3,4,0], [3,4,2], [5,1,5,2,0]]
};
const document = ['# Исправления боёв 1–74', '',
    'Авторские решения: образ, приём, ошибка привычки, честный ответ. Оценка интереса требует игры с людьми; ниже — проверяемый замысел.', '',
    'Сохранены здоровье, урон, движения и геометрия цепей/баррикад. Новые обычные атаки используют минимальный исходный урон своего босса. Вступление знакомит с короткой атакой и основным приёмом; продолжения открываются на второй и третьей HP-фазах. Случайный выбор сохраняется, фирменный приём возвращается в пределах четырёх доступных волн.', '',
    '| Уровень / противник | Образ | Приём | Ошибка привычки | Честный ответ |',
    '|---|---|---|---|---|'];
let changed = 0;
for (const [level, entries] of Object.entries(designs)) {
    const file = path.join(root, `lvlData/gameData${level}.js`);
    let source = fs.readFileSync(file, 'utf8');
    const box = {};
    vm.runInNewContext(source + '\nthis.d={bossCombatConfig,bossAbilities,bossAbilitiesDop,ENEMY_TYPES,mBossDelayAb};', box);
    const d = box.d;
    entries.forEach((entry, i) => document.push(`| ${level} / ${d.ENEMY_TYPES['enem' + (i+1)].dispName} | ${entry.image} | ${entry.trick} | ${entry.habit} | Видимый телеграф; быстрые атаки сверху, медленная приманка остаётся отбиваемой; продолжение имеет собственное предупреждение. |`));
    if (source.includes('combatIdentity:')) continue;
    const additions = [], combos = [];
    entries.forEach((entry, i) => {
        const boss = 'enem' + (i + 1), attacks = d.bossAbilities.filter(a => a.boss === boss);
        const original = d.bossAbilitiesDop.filter(c => c.boss === boss);
        const regular = original.filter(c => !c.isChain && !c.indexAbilities.some(j => attacks[j].barricadeHits));
        const special = original.filter(c => !regular.includes(c));
        const offset = attacks.length, x = entry.x;
        const damage = Math.min(...attacks.filter(a => !a.barricadeHits).map(a => a.customDamage));
        const slots = attackSlots(entry);
        slots.forEach(([xPos,yPos,customSpeed]) => additions.push({boss, type: attacks[0].type, xPos,yPos,customHP:1,customDamage:damage,customSpeed}));
        // Keep the original small motifs, replace the three late generic routines.
        const retained = regular.slice(0, Math.max(3, regular.length - 3)).map(c => ({...c}));
        const opener = retained.reduce((a,b) => a.indexAbilities.length <= b.indexAbilities.length ? a : b);
        opener.openingOrder = 0;
        combos.push(...retained);
        patterns[entry.kind].forEach((indices, variant) => {
            const combo = {boss, indexAbilities: indices.map(j => offset+j), signature:true,
                minPhase:variant+1, shotDelayMs:360,
                recoveryMs:variant === 2 ? 950 : 650, label:entry.image + [' — знакомство',' — иной конец',' — завершение'][variant]};
            if (variant === 0) combo.openingOrder = 1;
            if (entry.kind === 'pulse') combo.shotGapsMs = [360, 900, 360];
            combos.push(combo);
        });
        combos.push(...special);
        const key = new RegExp(`(${boss}:\\s*\\{)`);
        source = source.replace(key, `$1 combatIdentity: ${JSON.stringify(entry.image)}, combatTrick: ${JSON.stringify(entry.trick)}, signatureEvery: 4,`);
        if (entry.waveMs) {
            const profile = d.bossCombatConfig.bosses[boss];
            const old = d.mBossDelayAb.find(a => a.boss === boss).bossDelayAbDop;
            // At most 15% shorter; geometry is the main change, not raw pressure.
            const target = Math.max(old * .85, Math.min(old * 1.15, entry.waveMs / (profile.cadence * d.bossCombatConfig.levelCadence)));
            source = source.replace(new RegExp(`(boss: ['"]${boss}['"],\\s*bossDelayAb:\\s*\\d+,\\s*bossDelayAbDop:\\s*)\\d+`), `$1${Math.round(target)}`);
        }
    });
    const ab = arrayEnd(source, 'bossAbilities');
    // A leading comma is legal only when the old final entry has none.
    const before = source.slice(ab.start+1, ab.end).replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g,'').trim();
    const prefix = before.endsWith(',') ? '' : ',';
    source = source.slice(0,ab.end) + prefix + '\n    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.\n'
        + additions.map(a => '    '+serialize(a)).join(',\n') + '\n' + source.slice(ab.end);
    const co = arrayEnd(source,'bossAbilitiesDop');
    source = source.slice(0,co.start) + '[\n' + combos.map(c => '    '+serialize(c)).join(',\n') + '\n]' + source.slice(co.end+1);
    vm.runInNewContext(source, {}, {timeout:1000});
    if (write) fs.writeFileSync(file,source);
    changed++;
}
if (write && changed) fs.writeFileSync(path.join(root, 'description/игра №2 доп материалы/исправления боёв 1-74.md'), document.join('\n')+'\n');
console.log(`${write ? 'Updated' : 'Would update'} ${changed} levels`);
