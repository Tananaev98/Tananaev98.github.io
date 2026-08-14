/* eslint-disable no-console */
/** Admin-panel-style survival medians (random pool, strongest phase). */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const HERO_KEYS = ['eremei', 'dunya', 'daryana', 'luka'];
const TARGETS = { eremei: 12, dunya: 9, daryana: 7, luka: 5 };
const CHECKPOINTS = [1, 15, 26, 30, 45, 60, 75, 90, 105, 120, 135, 141];
const RUNS = 300;

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
    calculateBossAttackDamage, applyHeroPermanentStatUpgrade, getHeroDefenseCap
};`,
    apiCtx,
    { filename: 'saveData.js' }
);
const api = apiCtx.api;

function loadLevel(levelNumber) {
    const ctx = vm.createContext({ console });
    vm.runInContext(
        fs.readFileSync(path.join(ROOT, 'lvlData', `gameData${levelNumber}.js`), 'utf8') + `
globalThis.levelApi = { lvlNumber, bossCombatConfig, bossAbilities };`,
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
    hero.defenseCap = api.getHeroDefenseCap(hero);
    return hero;
}

function mulberry32(seed) {
    let value = seed >>> 0;
    return function random() {
        value += 0x6D2B79F5;
        let result = value;
        result = Math.imul(result ^ (result >>> 15), result | 1);
        result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
        return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
}

function hashSeed(text, extra) {
    let hash = 2166136261 ^ extra;
    for (let i = 0; i < text.length; i++) {
        hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
    }
    return hash >>> 0;
}

function simulateRun(levelData, hero, maxAttacks, random) {
    const finalPhase = levelData.bossCombatConfig.phases.reduce(
        (strongest, phase) => (phase.damage > strongest.damage ? phase : strongest)
    );
    const pool = levelData.bossAbilities.filter((attack) => levelData.bossCombatConfig.bosses[attack.boss]);
    let hp = hero.castleHP;
    const defense = Math.min(hero.defenseCap ?? 0.9, hero.startCastleDamageReduction);
    for (let i = 0; i < maxAttacks; i++) {
        const attack = pool[Math.floor(random() * pool.length)];
        const profile = levelData.bossCombatConfig.bosses[attack.boss];
        const rawDamage = api.calculateBossAttackDamage(
            attack.customDamage,
            profile.damageMultiplier,
            finalPhase.damage,
            levelData.bossCombatConfig.damageMultiplier,
            levelData.lvlNumber
        );
        const taken = Math.floor(rawDamage * (1 - defense));
        hp -= taken;
        if (hp <= 0) return i + 1;
    }
    return Infinity;
}

const focused = focusedMap();
const table = [];

for (const level of CHECKPOINTS) {
    const levelData = loadLevel(level);
    const heroLevel = focused.get(level);
    const row = { L: level, hLv: heroLevel };
    for (const heroKey of HERO_KEYS) {
        const hero = buildHero(heroKey, heroLevel);
        const random = mulberry32(hashSeed(heroKey, level));
        const samples = [];
        for (let i = 0; i < RUNS; i++) {
            samples.push(simulateRun(levelData, hero, 40, random));
        }
        samples.sort((a, b) => a - b);
        const median = samples[Math.floor(samples.length / 2)];
        row[heroKey] = median === Infinity ? '40+' : median;
        row[`${heroKey}T`] = TARGETS[heroKey];
    }
    table.push(row);
}

console.log('Admin-panel style median hits-to-defeat (random attack pool, strongest phase):');
console.table(table.map(r => ({
    L: r.L,
    hLv: r.hLv,
    E: `${r.eremei} (t${r.eremeiT})`,
    Du: `${r.dunya} (t${r.dunyaT})`,
    Da: `${r.daryana} (t${r.daryanaT})`,
    Lu: `${r.luka} (t${r.lukaT})`
})));
