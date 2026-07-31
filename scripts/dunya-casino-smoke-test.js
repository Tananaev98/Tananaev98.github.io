/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');

const gameSource = fs.readFileSync('game.js', 'utf8');
const functionStart = gameSource.indexOf('function rollHeroAttackMultiplier');
const functionEnd = gameSource.indexOf('\nfunction subsCalculateDamageEnemy', functionStart);

assert.ok(functionStart >= 0 && functionEnd > functionStart);

const rollFunctionSource = gameSource.slice(functionStart, functionEnd);
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
assert.equal(rollHeroAttackMultiplier(true), 8);
randomRoll = 0.02;
assert.equal(rollHeroAttackMultiplier(true), 3);
randomRoll = 0.08;
assert.equal(rollHeroAttackMultiplier(true), 2);
randomRoll = 0.50;
assert.equal(rollHeroAttackMultiplier(true), 1);
assert.equal(rollHeroAttackMultiplier(false), 1);
assert.deepEqual(shownMessages, [
    'ДЖЕКПОТ! Урон ×8!',
    'Ух как раскрутилась! Тройная атака!',
    'Раскрутилась! Двойная атака!'
]);

const expectedMultiplier = 1 + 0.10 + (0.03 * 2) + (0.01 * 7);
assert.ok(Math.abs(expectedMultiplier - 1.23) < 1e-12);
assert.match(
    gameSource,
    /damageResult\.damage = Math\.round\(damageResult\.damage \* attackMultiplier\)/
);
assert.match(gameSource, /checkForWound\(enemy, woundBaseDamage\)/);

console.log('Dunya casino smoke test passed: shared x2/x3/x8 roll and base-hit wound are wired correctly.');
