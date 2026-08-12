/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');

const gameSource = fs.readFileSync('game.js', 'utf8');
const blockStart = gameSource.indexOf('function getDaryanaMissingHpPerPercent() {');
const blockEnd = gameSource.indexOf('\nfunction resetHeroFeatureCombatState', blockStart);

assert.ok(blockStart >= 0 && blockEnd > blockStart, 'Could not locate Daryana execute-damage block in game.js');

const missingHpSource = gameSource.slice(blockStart, blockEnd);
let activeHeroObject = { name: 'daryana', missingHpDamagePerPercent: 0.015 };
const createApi = new Function(
    'getActiveHeroObject',
    `${missingHpSource}
    return { getDaryanaMissingHpPerPercent, getDaryanaMissingHpMultiplier };`
        .replace(/activeHeroObject/g, 'getActiveHeroObject()')
);
const api = createApi(() => activeHeroObject);

function target(hp, maxHP) {
    return { hp, maxHP };
}

// Полное HP цели — недостающих процентов нет, бонуса нет.
assert.equal(api.getDaryanaMissingHpMultiplier(target(100, 100)), 1);

// Каждый недостающий 1% HP добавляет 1.5% урона: 50% недостачи -> +75%.
assert.equal(api.getDaryanaMissingHpMultiplier(target(50, 100)), 1.75);

// 90% недостачи -> +135%.
assert.ok(Math.abs(api.getDaryanaMissingHpMultiplier(target(10, 100)) - 2.35) < 1e-9);

// Цель при смерти (0 HP) -> максимум +150%, без деления на ноль и без ухода за предел.
assert.equal(api.getDaryanaMissingHpMultiplier(target(0, 100)), 2.5);

// HP выше maxHP (не должно происходить в игре, но не обязано ломать формулу) —
// недостающая доля не уходит в отрицательные значения, бонуса нет.
assert.equal(api.getDaryanaMissingHpMultiplier(target(120, 100)), 1);

// Без цели или без валидного maxHP — множитель безопасно равен 1, а не NaN.
assert.equal(api.getDaryanaMissingHpMultiplier(null), 1);
assert.equal(api.getDaryanaMissingHpMultiplier(target(50, 0)), 1);
assert.equal(api.getDaryanaMissingHpMultiplier(target(50, undefined)), 1);

// Способность привязана к активному герою: у другого героя множитель всегда 1
// независимо от HP цели.
activeHeroObject = { name: 'luka' };
assert.equal(api.getDaryanaMissingHpMultiplier(target(10, 100)), 1);

// Без явного missingHpDamagePerPercent (герой без поля) прирост считается нулевым,
// не NaN, даже если это Дарьяна.
activeHeroObject = { name: 'daryana' };
assert.equal(api.getDaryanaMissingHpMultiplier(target(10, 100)), 1);

assert.match(
    gameSource,
    /damage \*= getDaryanaMissingHpMultiplier\(target\);/,
    'calculateDamage must apply the execute-damage multiplier'
);
assert.match(
    gameSource,
    /function calculateDamage\(isBoss, target\)/,
    'calculateDamage must accept the current target so the live-HP mechanic has something to read'
);
assert.match(
    gameSource,
    /calculateDamage\(isBoss, enemy\)/,
    'damageEnemy must pass the enemy being hit through to calculateDamage'
);
assert.ok(
    !gameSource.includes('daryanaWarmupStacks'),
    'Old per-hit warmup stack state should be fully removed, not left dangling alongside the new mechanic'
);

console.log('Daryana execute-damage smoke test passed: missing-HP scaling, clamping and hero gating are correct.');
