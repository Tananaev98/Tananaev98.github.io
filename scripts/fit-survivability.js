/* eslint-disable no-console */
/**
 * Подгонка постоянной живучести героев под цели:
 * eremei 12 / dunya 9 / daryana 7 / luka 5 сильнейших ударов на каждом уровне кампании.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const CAMPAIGN_FINAL_LEVEL = 141;
const HERO_MAX_LEVEL = 200;
const HERO_KEYS = ['eremei', 'dunya', 'daryana', 'luka'];
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

function loadApi() {
    const context = vm.createContext({
        console,
        localStorage: createStorage()
    });
    const source = fs.readFileSync(path.join(ROOT, 'saveData.js'), 'utf8') + `
globalThis.fitApi = {
    getDefaultGameState,
    getHeroUpgradeCost,
    getLevelZlataReward,
    calculateBossAttackDamage,
    applyHeroPermanentStatUpgrade,
    getHeroDefenseCap,
    HERO_PERMANENT_GROWTH_PROFILES,
    CAMPAIGN_FINAL_LEVEL,
    HERO_MAX_LEVEL
};`;
    vm.runInContext(source, context, { filename: 'saveData.js' });
    return context.fitApi;
}

function loadLevelData(levelNumber) {
    const filename = path.join(ROOT, 'lvlData', `gameData${levelNumber}.js`);
    const context = vm.createContext({ console });
    const source = fs.readFileSync(filename, 'utf8') + `
globalThis.levelApi = {
    lvlNumber,
    bossCombatConfig,
    ENEMY_TYPES,
    bossAbilities
};`;
    vm.runInContext(source, context, { filename });
    return context.levelApi;
}

const api = loadApi();

function buildFocusedMap() {
    const map = new Map();
    let heroLevel = 1;
    let zlata = 0;
    for (let level = 1; level <= CAMPAIGN_FINAL_LEVEL; level++) {
        map.set(level, heroLevel);
        zlata += api.getLevelZlataReward(level);
        while (heroLevel < HERO_MAX_LEVEL && zlata >= api.getHeroUpgradeCost(heroLevel)) {
            zlata -= api.getHeroUpgradeCost(heroLevel);
            heroLevel++;
        }
    }
    return map;
}

const focused = buildFocusedMap();

function getStrongestRaw(levelNumber) {
    const levelData = loadLevelData(levelNumber);
    const finalPhase = levelData.bossCombatConfig.phases.reduce(
        (best, phase) => (phase.damage > best.damage ? phase : best)
    );
    let maximum = 0;
    for (const attack of levelData.bossAbilities) {
        const profile = levelData.bossCombatConfig.bosses[attack.boss];
        const raw = api.calculateBossAttackDamage(
            attack.customDamage,
            profile.damageMultiplier,
            finalPhase.damage,
            levelData.bossCombatConfig.damageMultiplier,
            levelNumber
        );
        if (raw > maximum) maximum = raw;
    }
    return maximum;
}

const strongestByLevel = new Map();
for (const level of CHECKPOINTS) {
    strongestByLevel.set(level, getStrongestRaw(level));
}

function cloneHero(heroKey) {
    return JSON.parse(JSON.stringify(api.getDefaultGameState()[heroKey]));
}

function buildHero(heroKey, targetLevel, overrides) {
    const hero = { ...cloneHero(heroKey), ...overrides };
    // Keep caps from overrides
    if (overrides.castleHpCap != null) hero.castleHpCap = overrides.castleHpCap;
    if (overrides.castleHP != null) hero.castleHP = overrides.castleHP;
    if (overrides.startCastleDamageReduction != null) {
        hero.startCastleDamageReduction = overrides.startCastleDamageReduction;
    }
    for (let level = 1; level < targetLevel; level++) {
        // Monkey-patch growth for this hero via temporary profile swap
        api.applyHeroPermanentStatUpgrade(hero);
    }
    hero.level = targetLevel;
    return hero;
}

/**
 * Apply custom growth by temporarily replacing profile fields on the hero object
 * through a patched getHeroPermanentGrowth — easier: mutate HERO_PERMANENT_GROWTH_PROFILES
 * is frozen. So we reimplement HP/def branch locally for fitting.
 */
function simulateHeroGrowth(baseHero, targetLevel, growth) {
    const hero = JSON.parse(JSON.stringify(baseHero));
    hero.castleHP = baseHero.castleHP;
    hero.castleHpCap = baseHero.castleHpCap;
    hero.startCastleDamageReduction = baseHero.startCastleDamageReduction;
    hero.upSpecif = 1;

    for (let level = 1; level < targetLevel; level++) {
        if (hero.upSpecif === 1) {
            hero.upSpecif = 2;
        } else if (hero.upSpecif === 2) {
            hero.upSpecif = 3;
        } else if (hero.upSpecif === 3) {
            hero.upSpecif = 4;
        } else {
            const castleHpCapped = hero.castleHP >= hero.castleHpCap;
            const defenseCapped = hero.startCastleDamageReduction >= growth.defenseCap;
            if (!castleHpCapped) {
                hero.castleHP = Math.min(
                    hero.castleHpCap,
                    hero.castleHP + Math.floor(hero.castleHP * (growth.castleHpMultiplier - 1))
                );
            }
            if (!defenseCapped) {
                hero.startCastleDamageReduction = Math.min(
                    growth.defenseCap,
                    hero.startCastleDamageReduction + growth.defenseIncrease
                );
            }
            if (castleHpCapped && !defenseCapped) {
                hero.startCastleDamageReduction = Math.min(
                    growth.defenseCap,
                    hero.startCastleDamageReduction + growth.defenseIncrease
                );
            } else if (defenseCapped && !castleHpCapped) {
                hero.castleHP = Math.min(
                    hero.castleHpCap,
                    hero.castleHP + Math.floor(hero.castleHP * (growth.castleHpMultiplier - 1))
                );
            }
            hero.upSpecif = 1;
        }
    }
    hero.level = targetLevel;
    return hero;
}

function hitsToDefeat(hero, raw) {
    const defense = Math.min(
        Number(hero.startCastleDamageReduction) || 0,
        Number(growthDefenseCap(hero)) || 0.6
    );
    // use hero's own defense as stored (already capped during growth)
    const def = Math.min(0.6, Number(hero.startCastleDamageReduction) || 0);
    const taken = Math.floor(raw * (1 - def));
    if (taken <= 0) return Infinity;
    return Math.ceil(hero.castleHP / taken);
}

function growthDefenseCap() { return 0.6; }

function scoreConfig(heroKey, config) {
    const base = cloneHero(heroKey);
    base.castleHP = config.castleHP;
    base.castleHpCap = config.castleHpCap;
    base.startCastleDamageReduction = config.startCastleDamageReduction;
    let error = 0;
    const rows = [];
    for (const level of CHECKPOINTS) {
        const heroLevel = focused.get(level);
        const hero = simulateHeroGrowth(base, heroLevel, config.growth);
        const raw = strongestByLevel.get(level);
        const hits = hitsToDefeat(hero, raw);
        const target = TARGETS[heroKey];
        const diff = hits - target;
        error += diff * diff;
        rows.push({ level, heroLevel, hp: hero.castleHP, def: hero.startCastleDamageReduction, raw, hits, target });
    }
    return { error, rows };
}

function fitHero(heroKey) {
    const target = TARGETS[heroKey];
    const startDef = cloneHero(heroKey).startCastleDamageReduction;
    let best = null;

    // Search space
    const hpMultis = [];
    for (let m = 1.035; m <= 1.065; m += 0.001) hpMultis.push(Number(m.toFixed(3)));
    const startHps = [];
    for (let hp = 80; hp <= 420; hp += 4) startHps.push(hp);
    const defenseCaps = [startDef, startDef + 0.02, startDef + 0.04, startDef + 0.06, Math.min(0.25, startDef + 0.08)];
    const defenseIncreases = [0, 0.001, 0.002, 0.003, 0.004, 0.005];

    for (const castleHpMultiplier of hpMultis) {
        for (const castleHP of startHps) {
            for (const defenseCap of defenseCaps) {
                for (const defenseIncrease of defenseIncreases) {
                    if (defenseIncrease === 0 && defenseCap !== startDef) continue;
                    const config = {
                        castleHP,
                        castleHpCap: 20000,
                        startCastleDamageReduction: Math.min(defenseCap, startDef),
                        growth: {
                            castleHpMultiplier,
                            defenseIncrease,
                            defenseCap
                        }
                    };
                    // If start def equals cap and increase 0, frozen defense
                    const result = scoreConfig(heroKey, config);
                    if (!best || result.error < best.error) {
                        best = { ...result, config, heroKey, target };
                    }
                }
            }
        }
    }
    return best;
}

console.log('Strongest raw hits at checkpoints:');
for (const level of CHECKPOINTS) {
    console.log(`  L${level}: raw=${strongestByLevel.get(level)} heroLv=${focused.get(level)}`);
}

const fits = {};
for (const heroKey of HERO_KEYS) {
    console.log(`\nFitting ${heroKey} (target ${TARGETS[heroKey]})...`);
    const best = fitHero(heroKey);
    fits[heroKey] = best;
    console.log('config', best.config);
    console.log('error', best.error);
    console.table(best.rows.map(r => ({
        L: r.level,
        hLv: r.heroLevel,
        hp: r.hp,
        def: Number(r.def.toFixed(3)),
        raw: r.raw,
        hits: r.hits,
        tgt: r.target,
        d: r.hits - r.target
    })));
}

console.log('\n=== SUMMARY ===');
for (const heroKey of HERO_KEYS) {
    const f = fits[heroKey];
    const c = f.config;
    console.log(
        `${heroKey}: HP=${c.castleHP} cap=${c.castleHpCap} def0=${c.startCastleDamageReduction.toFixed(3)} ` +
        `hpMult=${c.growth.castleHpMultiplier} defInc=${c.growth.defenseIncrease} defCap=${c.growth.defenseCap.toFixed(3)} ` +
        `err=${f.error}`
    );
}
