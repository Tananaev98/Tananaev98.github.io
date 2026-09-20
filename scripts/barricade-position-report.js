// Проверка разнообразия позиций баррикад (раздел 16.6 lvlData/Правила создания
// уровня.txt). Падает с кодом 1, если у какого-либо уровня баррикады
// стоят «по шаблону»: одна и та же точка у всех ролей, все на одной стороне
// от босса, xPos ровно 50, либо роль повторяет xPos своей же баррикады с
// предыдущего уровня с баррикадами.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BOSS_CX = 50;
const SPRITE_W = 6; // ширина атаки (size '6%'), xPos — ЛЕВЫЙ край спрайта

function load(n) {
    const file = path.join(ROOT, 'lvlData', `gameData${n}.js`);
    if (!fs.existsSync(file)) return null;
    const src = fs.readFileSync(file, 'utf8');
    if (!src.includes('barricadeHits')) return null;
    const sb = {};
    new vm.Script(src + '\nthis.bossAbilities = bossAbilities; this.bossAbilitiesDop = bossAbilitiesDop;')
        .runInContext(vm.createContext(sb));
    const list = [];
    for (const combo of sb.bossAbilitiesDop) {
        if (!combo.barricade) continue;
        for (const idx of combo.indexAbilities) {
            const a = sb.bossAbilities.filter((x) => x.boss === combo.boss)[idx];
            if (a) list.push({ boss: combo.boss, xPos: a.xPos, yPos: a.yPos });
        }
    }
    return list;
}

const side = (x) => (x + SPRITE_W / 2 <= BOSS_CX ? 'left' : 'right');
const problems = [];
const prevByRole = {};

for (let n = 1; n <= 141; n++) {
    let list;
    try { list = load(n); } catch (e) { continue; }
    if (!list || !list.length) continue;
    const line = list.map((b) => `${b.boss}@${b.xPos}/${b.yPos}(${side(b.xPos)})`).join('  ');
    console.log(`L${n}: ${line}`);
    const xs = new Set(list.map((b) => b.xPos));
    const sides = new Set(list.map((b) => side(b.xPos)));
    const pairs = new Set(list.map((b) => `${b.xPos}/${b.yPos}`));
    if (list.length >= 3 && xs.size < Math.min(list.length, 4)) problems.push(`L${n}: слишком мало разных xPos (${xs.size} на ${list.length} баррикад)`);
    if (list.length >= 3 && sides.size < 2) problems.push(`L${n}: все баррикады с одной стороны от босса`);
    if (pairs.size < list.length) problems.push(`L${n}: две баррикады с одинаковыми xPos/yPos`);
    for (const b of list) {
        if (b.xPos === 50) problems.push(`L${n} ${b.boss}: xPos ровно 50 (левый край в центре — всегда уходит вправо от босса)`);
        if (prevByRole[b.boss] && prevByRole[b.boss].x === b.xPos) problems.push(`L${n} ${b.boss}: тот же xPos ${b.xPos}, что и на уровне ${prevByRole[b.boss].n}`);
        prevByRole[b.boss] = { x: b.xPos, n };
    }
}

if (problems.length) {
    console.error('\nПРОБЛЕМЫ:\n - ' + problems.join('\n - '));
    process.exit(1);
}
console.log('\nBarricade position report passed.');
