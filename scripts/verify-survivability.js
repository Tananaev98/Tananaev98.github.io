/* eslint-disable no-console */
/** Verify strongest-hit survival after survivability retune. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = { eremei: 12, dunya: 9, daryana: 7, luka: 5 };
const CHECKPOINTS = [1, 15, 26, 30, 45, 60, 75, 90, 105, 120, 135, 141];

function createStorage() {
    const storage = new Map();
    return {
        getItem(key) { return storage.has(key) ? storage.get(key) : null; },
        setItem(key, value) { storage.set(key, String(value)); },
        removeItem(key) { storage.delete(key); }
    };
}

const apiCtx = vm.createContext({ console, localStorage: createStorage() });
vm.runInContext(
    fs.readFileSync(path.join(ROOT, 'saveData.js'), 'utf8') + `
globalThis.api = {
    getDefaultGameState, getHeroUpgradeCost, getLevelZlataReward,
    calculateBossAttackDamage, applyHeroPermanentStatUpgrade
};`,
    apiCtx,
    { filename: 'saveData.js' }
);
const api = apiCtx.api;

function loadLevel(levelNumber) {
    const ctx = vm.createContext({ console });
    vm.runInContext(
        fs.readFileSync(path.join(ROOT, 'lvlData', `gameData${levelNumber}.js`), 'utf8') + `
globalThis.levelApi = { bossCombatConfig, bossAbilities };`,
        ctx,
        { filename: `gameData${levelNumber}.js` }
    );
    return ctx.levelApi;
}

function focusedMap() {
    const map = new Map();
    let heroLevel = 1;
    let zlata = 0;
    for (let level = 1; level <= 141; level++) {
        map.set(level, heroLevel);
        zlata += api.getLevelZlataReward(level);
        while (heroLevel < 200 && zlata >= api.getHeroUpgradeCost(heroLevel)) {
            zlata -= api.getHeroUpgradeCost(heroLevel);
            heroLevel++;
        }
    }
    return map;
}

function buildHero(heroKey, targetLevel) {
    const hero = { ...api.getDefaultGameState()[heroKey] };
    for (let level = 1; level < targetLevel; level++) api.applyHeroPermanentStatUpgrade(hero);
    hero.level = targetLevel;
    return hero;
}

function strongestRaw(levelNumber) {
    const data = loadLevel(levelNumber);
    const phase = data.bossCombatConfig.phases.reduce((a, b) => (b.damage > a.damage ? b : a));
    let max = 0;
    for (const attack of data.bossAbilities) {
        const profile = data.bossCombatConfig.bosses[attack.boss];
        const raw = api.calculateBossAttackDamage(
            attack.customDamage,
            profile.damageMultiplier,
            phase.damage,
            data.bossCombatConfig.damageMultiplier
        );
        if (raw > max) max = raw;
    }
    return max;
}

const focused = focusedMap();
const rows = [];
for (const level of CHECKPOINTS) {
    const raw = strongestRaw(level);
    const heroLevel = focused.get(level);
    const row = { level, heroLevel, raw };
    for (const heroKey of Object.keys(TARGETS)) {
        const hero = buildHero(heroKey, heroLevel);
        const taken = Math.floor(raw * (1 - hero.startCastleDamageReduction));
        const hits = Math.ceil(hero.castleHP / taken);
        row[heroKey] = hits;
        row[`${heroKey}Hp`] = hero.castleHP;
        const delta = Math.abs(hits - TARGETS[heroKey]);
        if (delta > 2) {
            console.error(`FAIL ${heroKey} L${level}: hits=${hits} target=${TARGETS[heroKey]}`);
            process.exitCode = 1;
        }
    }
    rows.push(row);
}

console.table(rows.map(r => ({
    L: r.level,
    hLv: r.heroLevel,
    raw: r.raw,
    E: r.eremei,
    Du: r.dunya,
    Da: r.daryana,
    Lu: r.luka
})));
console.log('Targets: E12 / Du9 / Da7 / Lu5 (tolerance ±2)');
