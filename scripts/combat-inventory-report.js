// Static inventory of the current 74 completed levels; not a playtest or fun score.
// Run from any directory: node scripts/combat-inventory-report.js
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { loadRuntime } = require('./combat-runtime-harness');
const root = path.resolve(__dirname, '..');
const roles = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
const levels = [];
const seenGeometry = new Map();
const seenStructure = new Map();
const ideas = fs.readFileSync(path.join(root, 'description/игра №2 доп материалы/идеи по уровням.txt'), 'utf8');
const titles = new Map([...ideas.matchAll(/^Уровень\s+(\d+)[^\r\n]*/gm)].map(m => [Number(m[1]), m[0].trim()]));
for (let number = 1; number <= 74; number++) {
    const runtime = loadRuntime(number);
    runtime.window.Math.random = () => 0.5;
    const sandbox = {};
    vm.runInNewContext(fs.readFileSync(path.join(root, `lvlData/gameData${number}.js`), 'utf8') +
        '\n;this.data = {bossCombatConfig, ENEMY_TYPES, bossAbilities, bossAbilitiesDop, mBossDelayAb};', sandbox,
        { timeout: 1000 });
    const { bossCombatConfig: c, ENEMY_TYPES: e, bossAbilities: a, bossAbilitiesDop: d, mBossDelayAb: m } = sandbox.data;
    const bosses = roles.map(role => {
        const profile = c.bosses[role];
        const attacks = a.filter(x => x.boss === role);
        const combos = d.filter(x => x.boss === role);
        assert(profile && combos.length && attacks.length, `Missing data: ${number}/${role}`);
        combos.forEach(combo => combo.indexAbilities.forEach(i => assert(attacks[i], `Invalid index: ${number}/${role}/${i}`)));
        const kind = combo => c.attackChains && combo.isChain ? 'C' : combo.indexAbilities.some(i => attacks[i].barricadeHits) ? 'B' : 'N';
        const structure = combos.map(combo => kind(combo) + combo.indexAbilities.length).sort().join(',');
        // Exact spatial/speed payload; ignores names, images, damage and timing.
        // A match alone does NOT mean identical fights: movement and cadence may differ.
        const geometry = JSON.stringify(combos.map(combo => [kind(combo), combo.indexAbilities.map(i => {
            const x = attacks[i];
            return [x.xPos, x.yPos, x.customSpeed, x.waveAmplitude ?? null, x.waveFrequency ?? null,
                x.barricadeHits ?? null, x.barricadePauseMs ?? null, x.barricadeRushSpeedMultiplier ?? null];
        })]).sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y))));
        const firstGeometry = seenGeometry.get(geometry) || null;
        const firstStructure = seenStructure.get(structure) || null;
        if (!firstGeometry) seenGeometry.set(geometry, `${number}/${role}`);
        if (!firstStructure) seenStructure.set(structure, `${number}/${role}`);
        const delay = m.find(x => x.boss === role);
        assert(delay, `Missing delay: ${number}/${role}`);
        const intervals = c.phases.map((phase, index) => {
            runtime.api.setBoss(role, index);
            return Math.round(runtime.api.waveDelay());
        });
        return { role, name: e[role].dispName, movement: profile.movementStyle, structure,
            firstGeometry, firstStructure, intervals,
            identity: profile.combatIdentity || null,
            signatures: combos.filter(c => c.signature).length,
            chains: combos.filter(x => kind(x) === 'C').length,
            barricades: combos.filter(x => kind(x) === 'B').length,
            maxCombo: Math.max(...combos.map(x => x.indexAbilities.length)) };
    });
    levels.push({ number, title: titles.get(number) || `Уровень ${number}`, bosses });
    runtime.close();
}
const out = path.join(root, 'description/игра №2 доп материалы');
const lines = [
    '# Измерения боевого разнообразия уровней 1–74', '',
    'Сгенерировано scripts/combat-inventory-report.js по текущим рабочим файлам. Статический анализ, не оценка удовольствия и не замер длительности боя.', '',
    'N — обычная серия, C — включённая цепь, B — серия с баррикадой; число — количество атак. Порядок серий в отпечатке отсортирован. Движок учитывает вступление, доступность по фазе, возврат фирменного приёма и занятость поля.', '',
    'Интервалы I/II/III получены вызовом настоящего getBossWaveDelay в game.js при jitter=1, до запуска серии. Это базовый период волн, а не время без угроз. Пауза после конкретной серии и ожидание освобождения поля могут увеличить интервал. Время убийства здесь не моделируется.', '',
    'Повтор геометрии — точное совпадение всех серий по координатам, базовым скоростям, параметрам wave и баррикад, без урона, ритма и movementStyle. Ссылка указывает первое совпадение, включая предыдущего противника того же уровня. Структурный повтор слабее: совпадают только типы и длины серий.', '',
    '| Уровень | Противник | Движение | Серии | Интервалы I/II/III, мс | Первая такая геометрия | Первая такая структура |',
    '|---|---|---|---|---|---|---|'
];
for (const l of levels) for (const b of l.bosses) lines.push(`| ${l.number} | ${b.name} | ${b.movement} | ${b.structure} | ${b.intervals.join('/')} | ${b.firstGeometry || 'новая'} | ${b.firstStructure || 'новая'} |`);
fs.writeFileSync(path.join(out, 'инвентаризация боёв 1-74 - измерения.md'), lines.join('\n') + '\n');
fs.writeFileSync(path.join(out, 'инвентаризация боёв 1-74 - данные.json'), JSON.stringify(levels, null, 2) + '\n');
console.log(JSON.stringify({ levels: levels.length, bosses: levels.flatMap(l => l.bosses).length,
    exactGeometryRepeats: levels.flatMap(l => l.bosses).filter(b => b.firstGeometry).length,
    structureRepeats: levels.flatMap(l => l.bosses).filter(b => b.firstStructure).length }));
for (const l of levels) console.log(`${l.number}: geometry=${l.bosses.filter(b => b.firstGeometry).length}/5 structure=${l.bosses.filter(b => b.firstStructure).length}/5 waves=${l.bosses.map(b => b.intervals[0]).join(',')} ${l.title}`);
