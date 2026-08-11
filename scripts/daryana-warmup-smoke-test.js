/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');

const gameSource = fs.readFileSync('game.js', 'utf8');
const blockStart = gameSource.indexOf('let daryanaWarmupStacks = 0;');
const blockEnd = gameSource.indexOf('\nfunction resetHeroFeatureCombatState', blockStart);

assert.ok(blockStart >= 0 && blockEnd > blockStart, 'Could not locate Daryana warmup block in game.js');

const warmupSource = gameSource.slice(blockStart, blockEnd);
let activeHeroObject = { name: 'daryana', warmupDamagePerHit: 0.015 };
const createWarmupApi = new Function(
    'getActiveHeroObject',
    `${warmupSource}
    return { resetDaryanaWarmup, getDaryanaWarmupPerHit, getDaryanaWarmupMultiplier, registerDaryanaWarmupHit, getStacks: () => daryanaWarmupStacks };`
        .replace(/activeHeroObject/g, 'getActiveHeroObject()')
);
const api = createWarmupApi(() => activeHeroObject);

// Первый удар по свежей цели идёт без бонуса.
api.resetDaryanaWarmup();
assert.equal(api.getStacks(), 0);
assert.equal(api.getDaryanaWarmupMultiplier(), 1);

// Каждый следующий удар усиливает следующий на 1.5%, применяется ДО инкремента.
const observedMultipliers = [];
for (let hit = 0; hit < 5; hit++) {
    observedMultipliers.push(api.getDaryanaWarmupMultiplier());
    api.registerDaryanaWarmupHit();
}
assert.deepEqual(observedMultipliers, [1, 1.015, 1.03, 1.045, 1.06]);
assert.equal(api.getStacks(), 5);

// Смена цели (новый босс) сбрасывает прогрев.
api.resetDaryanaWarmup();
assert.equal(api.getStacks(), 0);
assert.equal(api.getDaryanaWarmupMultiplier(), 1);

// Способность привязана к активному герою: у другого героя множитель всегда 1,
// а счётчик попаданий по нему не растёт.
activeHeroObject = { name: 'luka' };
for (let hit = 0; hit < 3; hit++) {
    api.registerDaryanaWarmupHit();
}
assert.equal(api.getDaryanaWarmupMultiplier(), 1);
assert.equal(api.getStacks(), 0);

// Без явного warmupDamagePerHit (герой без поля) прирост считается нулевым, не NaN.
activeHeroObject = { name: 'daryana' };
api.registerDaryanaWarmupHit();
assert.equal(api.getDaryanaWarmupMultiplier(), 1);

assert.match(gameSource, /damage \*= getDaryanaWarmupMultiplier\(\);\s*\n\s*registerDaryanaWarmupHit\(\);/);
assert.match(gameSource, /resetDaryanaWarmup\(\); \/\/ Новая цель/);
assert.match(gameSource, /resetHeroFeatureCombatState\(\) \{\s*\n\s*eremeiCatchBackUntilMs = 0;\s*\n\s*resetDaryanaWarmup\(\);/);

console.log('Daryana warmup smoke test passed: per-hit ramp, target-change reset and hero gating are correct.');
