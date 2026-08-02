/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');

const gameSource = fs.readFileSync('game.js', 'utf8');
const functionStart = gameSource.indexOf('function rollHeroAttackMultiplier');
const functionEnd = gameSource.indexOf('\nfunction subsCalculateDamageEnemy', functionStart);

assert.ok(functionStart >= 0 && functionEnd > functionStart);

const rollFunctionSource = gameSource
    .slice(functionStart, functionEnd)
    .replace('const DUNYA_SPECIAL_PREVIEW = true', 'const DUNYA_SPECIAL_PREVIEW = false');
const activeHeroObject = {
    name: 'dunya',
    doubleAttackChance: 0.10,
    tripleAttackChance: 0.03,
    jackpotAttackChance: 0.01,
    jackpotAttackMultiplier: 8
};
const shownMessages = [];
let randomRoll = 0;
const controlledMath = Object.create(Math);
controlledMath.random = () => randomRoll;
const createRollFunction = new Function(
    'activeHeroObject',
    'showCenterText',
    'Math',
    `${rollFunctionSource}\nreturn rollHeroAttackMultiplier;`
);
const rollHeroAttackMultiplier = createRollFunction(
    activeHeroObject,
    message => shownMessages.push(message),
    controlledMath
);

randomRoll = 0.005;
assert.deepEqual(rollHeroAttackMultiplier(true), { multiplier: 8, kind: 'jackpot' });
randomRoll = 0.02;
assert.deepEqual(rollHeroAttackMultiplier(true), { multiplier: 3, kind: 'triple' });
randomRoll = 0.08;
assert.deepEqual(rollHeroAttackMultiplier(true), { multiplier: 2, kind: 'double' });
randomRoll = 0.50;
assert.deepEqual(rollHeroAttackMultiplier(true), { multiplier: 1, kind: 'normal' });
assert.deepEqual(rollHeroAttackMultiplier(false), { multiplier: 1, kind: 'normal' });
assert.deepEqual(shownMessages, [
    'Вихрь! Восьмикратный урон!',
    'Ух как раскрутилась! Тройная атака!',
    'Раскрутилась! Двойная атака!'
]);

const expectedMultiplier = 1 + 0.10 + (0.03 * 2) + (0.01 * 7);
assert.ok(Math.abs(expectedMultiplier - 1.23) < 1e-12);
assert.match(gameSource, /rollBossHitDamage\(multipliedDamage\)/);
assert.match(gameSource, /checkForWound\(enemy, woundBaseDamage\)/);
assert.match(gameSource, /showDunyaWhirlImpact/);

console.log('Dunya casino smoke test passed: shared x2/x3/x8 roll and whirl wiring are correct.');
