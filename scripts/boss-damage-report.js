/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const CAMPAIGN_FINAL_LEVEL = 141;
const HERO_MAX_LEVEL = 200;
const HERO_KEYS = ['eremei', 'dunya', 'luka'];
const HERO_NAMES = {
    eremei: 'Eremey',
    dunya: 'Dunya',
    luka: 'Luka'
};
const CHECKPOINTS = [1, 15, 30, 45, 60, 75, 90, 105, 120, 135, 141];
const STRONGEST_BOSS_BASE_DAMAGE = 28;
const ACTUAL_LEVEL_NUMBERS = fs.readdirSync('lvlData')
    .map(filename => filename.match(/^gameData(\d+)\.js$/))
    .filter(Boolean)
    .map(match => Number(match[1]))
    .filter(levelNumber => levelNumber >= 1 && levelNumber <= CAMPAIGN_FINAL_LEVEL)
    .sort((left, right) => left - right);

function createStorage() {
    const storage = new Map();
    return {
        getItem(key) {
            return storage.has(key) ? storage.get(key) : null;
        },
        setItem(key, value) {
            storage.set(key, String(value));
        },
        removeItem(key) {
            storage.delete(key);
        }
    };
}

function loadProgressionApi() {
    const context = vm.createContext({
        console,
        localStorage: createStorage()
    });
    const source = fs.readFileSync('saveData.js', 'utf8') + `
globalThis.bossDamageReportApi = {
    getDefaultGameState,
    getHeroUpgradeCost,
    getLevelZlataReward,
    getBossDamageProgressionMultiplier,
    calculateBossAttackDamage,
    applyHeroPermanentStatUpgrade
};`;

    vm.runInContext(source, context, { filename: 'saveData.js' });
    return context.bossDamageReportApi;
}

function loadLevelData(levelNumber) {
    const filename = `lvlData/gameData${levelNumber}.js`;
    const context = vm.createContext({ console });
    const source = fs.readFileSync(filename, 'utf8') + `
globalThis.levelApi = {
    lvlNumber,
    bossCombatConfig,
    ENEMY_TYPES,
    bossAbilities,
    bossAbilitiesDop
};`;

    vm.runInContext(source, context, { filename });
    return context.levelApi;
}

const api = loadProgressionApi();
const gameSource = fs.readFileSync('game.js', 'utf8');
assert.match(
    gameSource,
    /const damage = calculateBossAttackDamage\([\s\S]*?lvlNumber\s*\);/
);

function buildHeroAtLevel(heroKey, targetLevel) {
    const normalizedLevel = Math.min(
        HERO_MAX_LEVEL,
        Math.max(1, Math.floor(targetLevel))
    );
    const hero = { ...api.getDefaultGameState()[heroKey] };

    for (let level = 1; level < normalizedLevel; level++) {
        api.applyHeroPermanentStatUpgrade(hero);
    }

    hero.level = normalizedLevel;
    return hero;
}

function buildFocusedHeroProgression() {
    const beforeLevel = new Map();
    let heroLevel = 1;
    let zlata = 0;

    for (let level = 1; level <= CAMPAIGN_FINAL_LEVEL; level++) {
        beforeLevel.set(level, heroLevel);
        zlata += api.getLevelZlataReward(level);

        while (
            heroLevel < HERO_MAX_LEVEL
            && zlata >= api.getHeroUpgradeCost(heroLevel)
        ) {
            zlata -= api.getHeroUpgradeCost(heroLevel);
            heroLevel++;
        }
    }

    return beforeLevel;
}

function getDamageTaken(rawDamage, hero) {
    return Math.floor(rawDamage * (1 - hero.startCastleDamageReduction));
}

function getSurvival(rawDamage, hero) {
    const taken = getDamageTaken(rawDamage, hero);
    return {
        taken,
        hpFraction: taken / hero.castleHP,
        remainingFraction: Math.max(0, (hero.castleHP - taken) / hero.castleHP),
        hitsToDefeat: taken > 0 ? Math.ceil(hero.castleHP / taken) : Infinity
    };
}

const focusedProgression = buildFocusedHeroProgression();

function getProjectedMaximumRawHit(levelNumber) {
    const legacyMultiplier = levelNumber === 1 ? 1 : 1 + (levelNumber * 0.05);
    const configuredDamage = STRONGEST_BOSS_BASE_DAMAGE * legacyMultiplier;

    // A product of 2.0 is the hard cap for boss, phase and level multipliers together.
    return api.calculateBossAttackDamage(
        configuredDamage,
        2,
        1,
        1,
        levelNumber
    );
}

function getActualLevelMaximum(levelNumber) {
    const levelData = loadLevelData(levelNumber);
    const finalPhase = levelData.bossCombatConfig.phases.reduce(
        (strongest, phase) => phase.damage > strongest.damage ? phase : strongest
    );
    let maximum = null;

    for (const attack of levelData.bossAbilities) {
        const profile = levelData.bossCombatConfig.bosses[attack.boss];
        assert.ok(profile, `Missing boss combat profile for ${attack.boss} on level ${levelNumber}`);
        const rawDamage = api.calculateBossAttackDamage(
            attack.customDamage,
            profile.damageMultiplier,
            finalPhase.damage,
            levelData.bossCombatConfig.damageMultiplier,
            levelNumber
        );

        if (!maximum || rawDamage > maximum.rawDamage) {
            maximum = { boss: attack.boss, rawDamage };
        }
    }

    assert.ok(maximum, `No boss attacks found on level ${levelNumber}`);
    return { ...maximum, levelData, finalPhase };
}

function getMaximumActualCombo(threat, hero) {
    const { levelData, finalPhase } = threat;
    let maximum = null;

    for (const combo of levelData.bossAbilitiesDop) {
        const profile = levelData.bossCombatConfig.bosses[combo.boss];
        const abilities = levelData.bossAbilities.filter(
            ability => ability.boss === combo.boss
        );
        const attacks = combo.indexAbilities
            .map(index => abilities[index])
            .filter(Boolean);
        const taken = attacks.reduce((total, attack) => {
            const rawDamage = api.calculateBossAttackDamage(
                attack.customDamage,
                profile.damageMultiplier,
                finalPhase.damage,
                levelData.bossCombatConfig.damageMultiplier,
                levelData.lvlNumber
            );
            return total + getDamageTaken(rawDamage, hero);
        }, 0);

        if (!maximum || taken > maximum.taken) {
            maximum = {
                boss: combo.boss,
                hits: attacks.length,
                taken
            };
        }
    }

    assert.ok(maximum, `No boss combos found on level ${levelData.lvlNumber}`);
    return maximum;
}

const projectedRows = [];
const allProjectedSurvival = [];

for (let campaignLevel = 1; campaignLevel <= CAMPAIGN_FINAL_LEVEL; campaignLevel++) {
    const heroLevel = focusedProgression.get(campaignLevel);
    const rawDamage = getProjectedMaximumRawHit(campaignLevel);

    for (const heroKey of HERO_KEYS) {
        const hero = buildHeroAtLevel(heroKey, heroLevel);
        const survival = getSurvival(rawDamage, hero);
        const result = {
            campaignLevel,
            heroLevel,
            heroKey,
            hero,
            rawDamage,
            ...survival
        };

        allProjectedSurvival.push(result);
        if (CHECKPOINTS.includes(campaignLevel)) projectedRows.push(result);
    }
}

for (const result of allProjectedSurvival) {
    assert.ok(
        result.taken < result.hero.castleHP,
        `${HERO_NAMES[result.heroKey]} is one-shot on campaign level ${result.campaignLevel}`
    );
}

const lukaResults = allProjectedSurvival.filter(result => result.heroKey === 'luka');
const dunyaResults = allProjectedSurvival.filter(result => result.heroKey === 'dunya');
const eremeiResults = allProjectedSurvival.filter(result => result.heroKey === 'eremei');
const maxFraction = results => Math.max(...results.map(result => result.hpFraction));
const maxHitsToDefeat = results => Math.max(...results.map(result => result.hitsToDefeat));

// Luka always keeps at least 25% HP after the strongest allowed single boss hit.
assert.ok(maxFraction(lukaResults) <= 0.75);
// The middle archetype keeps a meaningfully larger safety margin than Luka.
assert.ok(maxFraction(dunyaResults) <= 0.48);
// Eremey remains the tank, but even he cannot absorb more than seven maximum hits.
assert.ok(maxHitsToDefeat(eremeiResults) <= 7);

const actualLevelRows = [];
for (const campaignLevel of ACTUAL_LEVEL_NUMBERS) {
    const heroLevel = focusedProgression.get(campaignLevel);
    const maximum = getActualLevelMaximum(campaignLevel);

    for (const heroKey of HERO_KEYS) {
        const hero = buildHeroAtLevel(heroKey, heroLevel);
        const survival = getSurvival(maximum.rawDamage, hero);
        const maximumCombo = getMaximumActualCombo(maximum, hero);
        assert.ok(
            survival.taken < hero.castleHP,
            `${HERO_NAMES[heroKey]} is one-shot by actual level ${campaignLevel} attack`
        );
        if (heroKey === 'eremei') {
            assert.ok(
                maximumCombo.taken / hero.castleHP >= 0.35,
                `Eremey can ignore too many complete combos on level ${campaignLevel}`
            );
        }
        actualLevelRows.push({
            campaignLevel,
            heroLevel,
            boss: maximum.boss,
            hero: HERO_NAMES[heroKey],
            rawHit: maximum.rawDamage,
            hp: hero.castleHP,
            defense: `${(hero.startCastleDamageReduction * 100).toFixed(1)}%`,
            hpLost: `${(survival.hpFraction * 100).toFixed(1)}%`,
            hitsToDefeat: survival.hitsToDefeat,
            maxCombo: `${maximumCombo.hits} hits / ${(
                maximumCombo.taken / hero.castleHP * 100
            ).toFixed(1)}% HP`,
            combosToDefeat: maximumCombo.taken > 0
                ? Math.ceil(hero.castleHP / maximumCombo.taken)
                : Infinity
        });
    }
}

console.log(`\nActual boss data, ${ACTUAL_LEVEL_NUMBERS.length} available levels (strongest phase and projectile):`);
console.table(actualLevelRows);

console.log('\nProjected maximum full-strength hit through campaign level 141:');
console.table(projectedRows.map(result => ({
    campaignLevel: result.campaignLevel,
    heroLevel: result.heroLevel,
    hero: HERO_NAMES[result.heroKey],
    rawHit: result.rawDamage,
    hp: result.hero.castleHP,
    defense: `${(result.hero.startCastleDamageReduction * 100).toFixed(1)}%`,
    hpLost: `${(result.hpFraction * 100).toFixed(1)}%`,
    hpLeft: `${(result.remainingFraction * 100).toFixed(1)}%`,
    hitsToDefeat: result.hitsToDefeat
})));

console.log('\nWorst projected single-hit share:');
console.table(HERO_KEYS.map(heroKey => {
    const results = allProjectedSurvival.filter(result => result.heroKey === heroKey);
    const worst = results.reduce(
        (current, result) => result.hpFraction > current.hpFraction ? result : current
    );
    return {
        hero: HERO_NAMES[heroKey],
        campaignLevel: worst.campaignLevel,
        heroLevel: worst.heroLevel,
        hpLost: `${(worst.hpFraction * 100).toFixed(1)}%`,
        hpLeft: `${(worst.remainingFraction * 100).toFixed(1)}%`,
        maximumHitsToDefeat: maxHitsToDefeat(results)
    };
}));

console.log('Boss damage report passed: no comparable hero is one-shot; Eremey remains bounded at seven maximum hits.');
