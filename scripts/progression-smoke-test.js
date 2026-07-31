/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const storage = new Map();
const context = vm.createContext({
    console,
    localStorage: {
        getItem(key) {
            return storage.has(key) ? storage.get(key) : null;
        },
        setItem(key, value) {
            storage.set(key, String(value));
        },
        removeItem(key) {
            storage.delete(key);
        }
    }
});

const source = fs.readFileSync('saveData.js', 'utf8') + `
globalThis.progressionApi = {
    get state() { return gameState; },
    get heroMaxLevel() { return HERO_MAX_LEVEL; },
    getHeroUpgradeCost,
    getLevelZlataReward,
    getLevelZlataPayout,
    getHeroInvestedZlata,
    getBossDamageProgressionMultiplier,
    calculateBossAttackDamage,
    getHeroDefenseCap,
    getDefaultGameState,
    applyHeroPermanentStatUpgrade,
    getAllHeroUpgradeRefund,
    resetAllHeroUpgrades,
    migrateGameState,
    heroUp
};`;

vm.runInContext(source, context, { filename: 'saveData.js' });

const api = context.progressionApi;
assert.equal(api.heroMaxLevel, 200);
assert.equal(api.getLevelZlataReward(1), 30);
assert.equal(api.getLevelZlataPayout(1, 3, 5), 18);
assert.equal(api.getLevelZlataPayout(1, 5, 5), 30);
assert.equal(api.getBossDamageProgressionMultiplier(1), 1);
assert.ok(api.getBossDamageProgressionMultiplier(141) > 6.5);
assert.ok(api.getBossDamageProgressionMultiplier(141) < 6.7);
assert.equal(api.calculateBossAttackDamage(28, 1, 1, 1, 1), 28);

const legacyState = JSON.parse(JSON.stringify(api.state));
legacyState.schemaVersion = 3;
legacyState.eremei.level = 10;
legacyState.eremei.balanceRevision = 3;
delete legacyState.eremei.investedZlata;
const migratedLegacyState = api.migrateGameState(legacyState);
assert.equal(migratedLegacyState.eremei.investedZlata, api.getHeroInvestedZlata(10));
assert.equal(migratedLegacyState.eremei.balanceRevision, 6);
assert.equal(migratedLegacyState.eremei.permanentGrowthProfile, 'guardian');
assert.ok(Math.abs(
    migratedLegacyState.eremei.startGlobalDamage - (132 * Math.pow(1.042, 3))
) < 1e-9);
assert.ok(Math.abs(migratedLegacyState.eremei.startGlobalCritChance - 0.054) < 1e-9);
assert.ok(Math.abs(migratedLegacyState.eremei.startGlobalCritMultiplier - 2.3) < 1e-9);
assert.equal(migratedLegacyState.eremei.upSpecif, 2);

function buildHeroAtLevel(heroKey, targetLevel) {
    const hero = { ...api.getDefaultGameState()[heroKey] };
    for (let level = 1; level < targetLevel; level++) {
        api.applyHeroPermanentStatUpgrade(hero);
    }
    hero.level = targetLevel;
    return hero;
}

for (const level of [1, 40, 80, 120, 160, 200]) {
    const eremei = buildHeroAtLevel('eremei', level);
    const dunya = buildHeroAtLevel('dunya', level);
    const luka = buildHeroAtLevel('luka', level);
    const effectiveHp = hero => hero.castleHP / (1 - hero.startCastleDamageReduction);

    assert.ok(effectiveHp(eremei) > effectiveHp(dunya));
    assert.ok(effectiveHp(dunya) > effectiveHp(luka));
    assert.ok(eremei.startSHOT_INTERVAL > dunya.startSHOT_INTERVAL);
    assert.ok(dunya.startSHOT_INTERVAL > luka.startSHOT_INTERVAL);
    assert.ok(eremei.startGlobalWoundChance <= dunya.startGlobalWoundChance);
    assert.ok(dunya.startGlobalWoundChance < luka.startGlobalWoundChance);
    assert.ok(eremei.startCastleDamageReduction <= api.getHeroDefenseCap(eremei));
    assert.ok(dunya.startCastleDamageReduction <= api.getHeroDefenseCap(dunya));
    assert.ok(luka.startCastleDamageReduction <= api.getHeroDefenseCap(luka));
}

assert.equal(api.getHeroDefenseCap(buildHeroAtLevel('eremei', 200)), 0.60);
assert.equal(api.getHeroDefenseCap(buildHeroAtLevel('dunya', 200)), 0.50);
assert.equal(api.getHeroDefenseCap(buildHeroAtLevel('luka', 200)), 0.40);
const defaultDunya = api.getDefaultGameState().dunya;
assert.equal(defaultDunya.doubleAttackChance, 0.10);
assert.equal(defaultDunya.tripleAttackChance, 0.03);
assert.equal(defaultDunya.jackpotAttackChance, 0.01);
assert.equal(defaultDunya.jackpotAttackMultiplier, 8);
assert.equal(buildHeroAtLevel('luka', 1).startSHOT_INTERVAL, 800);
assert.ok(
    (1000 / buildHeroAtLevel('luka', 200).startSHOT_INTERVAL)
    / (1000 / buildHeroAtLevel('eremei', 200).startSHOT_INTERVAL)
    > 1.65
);

// Прокачка не зависит от прогресса кампании.
api.state.zlata = 100;
api.heroUp('eremei', false);
api.heroUp('eremei', false);
api.heroUp('dunya', false);
assert.equal(api.state.eremei.level, 3);
assert.equal(api.state.dunya.level, 2);
assert.equal(api.getAllHeroUpgradeRefund(), 31);

const firstReset = api.resetAllHeroUpgrades();
assert.equal(firstReset.success, true);
assert.equal(firstReset.refund, 31);
assert.equal(api.state.zlata, 100);
assert.equal(api.state.eremei.level, 1);
assert.equal(api.state.dunya.level, 1);

// Все награды кампании вкладываются в одного выбранного героя.
let campaignIncome = 0;
api.state.zlata = 0;
for (let level = 1; level <= 141; level++) {
    const reward = api.getLevelZlataReward(level);
    campaignIncome += reward;
    api.state.zlata += reward;

    while (
        api.state.eremei.level < api.heroMaxLevel
        && api.state.zlata >= api.state.eremei.zlataUp
    ) {
        api.heroUp('eremei', false);
    }
}

assert.equal(api.state.eremei.level, 160);
assert.equal(api.state.dunya.level, 1);
assert.equal(api.state.luka.level, 1);

const investedBeforeReset = api.getHeroInvestedZlata(api.state.eremei.level);
const remainingBeforeReset = api.state.zlata;
const finalReset = api.resetAllHeroUpgrades();
assert.equal(finalReset.refund, investedBeforeReset);
assert.equal(api.state.zlata, campaignIncome);
assert.equal(api.state.zlata, investedBeforeReset + remainingBeforeReset);

console.log('Progression smoke test passed: free allocation, level 200 cap and full refund work.');
