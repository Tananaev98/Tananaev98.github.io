/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const CAMPAIGN_FINAL_LEVEL = 141;
const HERO_MAX_LEVEL = 200;
const HERO_KEYS = ['eremei', 'dunya', 'luka'];
const HERO_NAMES = { eremei: 'Eremey', dunya: 'Dunya', luka: 'Luka' };
const STRATEGIES = ['random', 'offense', 'survival', 'hybrid'];
const STRATEGY_NAMES = {
    random: 'Random',
    offense: 'Offense',
    survival: 'Survival',
    hybrid: 'Hybrid'
};
const TEMPORARY_UPGRADE_BASE_SHARE = 0.20;
const DEFAULT_UPGRADE_CHOICES = 11;
const SCAN_RUNS = 1500;
const DETAIL_RUNS = 30000;
const PAIR_RUNS = 10000;
const PAIR_CHECKPOINTS = [1, 15, 60, 105, 141];
const WOUND_DURATION_SECONDS = 5;
const WOUND_TICK_SECONDS = 0.3;
const WOUND_DAMAGE_SHARE_PER_TICK = 0.1;

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
    const context = vm.createContext({ console, localStorage: createStorage() });
    const source = fs.readFileSync('saveData.js', 'utf8') + `
globalThis.temporaryUpgradeApi = {
    getDefaultGameState,
    getHeroUpgradeCost,
    getLevelZlataReward,
    getHeroDefenseCap,
    calculateBossAttackDamage,
    applyHeroPermanentStatUpgrade
};`;

    vm.runInContext(source, context, { filename: 'saveData.js' });
    return context.temporaryUpgradeApi;
}

function loadLevelExperience(levelNumber) {
    const filename = `lvlData/gameData${levelNumber}.js`;
    if (!fs.existsSync(filename)) return null;

    const context = vm.createContext({ console });
    const source = fs.readFileSync(filename, 'utf8') + `
globalThis.levelExperienceApi = { lvlNumber, bossM, ENEMY_TYPES };`;
    vm.runInContext(source, context, { filename });
    return context.levelExperienceApi;
}

const api = loadProgressionApi();

function buildHeroAtLevel(heroKey, targetLevel) {
    const hero = { ...api.getDefaultGameState()[heroKey] };
    const normalizedLevel = Math.min(HERO_MAX_LEVEL, Math.max(1, targetLevel));

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

    for (let campaignLevel = 1; campaignLevel <= CAMPAIGN_FINAL_LEVEL; campaignLevel++) {
        beforeLevel.set(campaignLevel, heroLevel);
        zlata += api.getLevelZlataReward(campaignLevel);

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

function countUpgradeChoices(levelNumber) {
    const levelData = loadLevelExperience(levelNumber);
    if (!levelData) return DEFAULT_UPGRADE_CHOICES;

    let experience = 0;
    let threshold = 100;
    let choices = 0;
    const rewardedBosses = levelData.bossM.slice(0, -1);

    for (const bossKey of rewardedBosses) {
        experience += Math.round(levelData.ENEMY_TYPES[bossKey].baseExp);
        while (experience >= threshold) {
            experience -= threshold;
            threshold = Math.round(threshold * 1.1);
            choices++;
        }
    }

    return choices;
}

const focusedProgression = buildFocusedHeroProgression();
const upgradeChoicesByLevel = new Map();
for (let level = 1; level <= CAMPAIGN_FINAL_LEVEL; level++) {
    upgradeChoicesByLevel.set(level, countUpgradeChoices(level));
}

function createTemporaryState(heroKey, permanentHero) {
    return {
        heroKey,
        damage: permanentHero.startGlobalDamage,
        critChance: permanentHero.startGlobalCritChance,
        critMultiplier: permanentHero.startGlobalCritMultiplier,
        woundChance: permanentHero.startGlobalWoundChance,
        interval: permanentHero.startSHOT_INTERVAL,
        hp: permanentHero.castleHP,
        defense: permanentHero.startCastleDamageReduction,
        defenseCap: api.getHeroDefenseCap(permanentHero),
        startDamage: permanentHero.startGlobalDamage,
        startCritChance: permanentHero.startGlobalCritChance,
        startCritMultiplier: permanentHero.startGlobalCritMultiplier,
        startWoundChance: permanentHero.startGlobalWoundChance,
        startInterval: permanentHero.startSHOT_INTERVAL,
        startHp: permanentHero.castleHP,
        startDefense: permanentHero.startCastleDamageReduction
    };
}

function expectedDps(hero) {
    let effectiveCritChance = hero.critChance;
    if (hero.heroKey === 'luka') {
        const guaranteedShare = 1 / 5;
        effectiveCritChance = guaranteedShare + ((1 - guaranteedShare) * hero.critChance);
    }
    if (hero.heroKey === 'eremei') {
        effectiveCritChance += 0.10 * 0.45;
        effectiveCritChance = Math.min(1, effectiveCritChance);
    }

    const critFactor = 1 + (effectiveCritChance * (hero.critMultiplier - 1));
    const attackMultiplierFeature = hero.heroKey === 'dunya' ? 1.23 : 1;
    const hitsPerSecond = 1000 / hero.interval;
    const baseAverageHitDamage = hero.damage * critFactor;
    const directDps = baseAverageHitDamage * attackMultiplierFeature * hitsPerSecond;
    const woundProcRate = hitsPerSecond * hero.woundChance;
    const averageWaitForWound = woundProcRate > 0 ? 1 / woundProcRate : Infinity;
    const woundUptime = Number.isFinite(averageWaitForWound)
        ? WOUND_DURATION_SECONDS / (WOUND_DURATION_SECONDS + averageWaitForWound)
        : 0;
    const woundDps = woundUptime
        * baseAverageHitDamage
        * (WOUND_DAMAGE_SHARE_PER_TICK / WOUND_TICK_SECONDS);

    return directDps + woundDps;
}

function effectiveHp(hero) {
    return hero.hp / (1 - hero.defense);
}

function maximumRawBossHit(campaignLevel) {
    const legacyMultiplier = campaignLevel === 1
        ? 1
        : 1 + (campaignLevel * 0.05);
    return api.calculateBossAttackDamage(
        28 * legacyMultiplier,
        2,
        1,
        1,
        campaignLevel
    );
}

function hitsToDefeat(hero, rawDamage) {
    const damageTaken = Math.floor(rawDamage * (1 - hero.defense));
    return damageTaken > 0 ? Math.ceil(hero.hp / damageTaken) : Infinity;
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

function rarityMultiplier(random) {
    const roll = random();
    if (roll <= 0.50) return 1;
    if (roll <= 0.85) return 1.25;
    if (roll <= 0.95) return 1.5;
    if (roll <= 0.99) return 2;
    return 2.5;
}

function availableUpgradeTypes(hero) {
    const types = ['damage'];
    if (hero.critChance < 1) types.push('critChance');
    types.push('critMultiplier');
    if (hero.woundChance < 1) types.push('wound');
    types.push('hp');
    if (hero.defense < hero.defenseCap) types.push('defense');
    if (hero.interval > 200) types.push('fireRate');
    return types;
}

function applyUpgrade(hero, option) {
    const upgraded = { ...hero };
    const share = TEMPORARY_UPGRADE_BASE_SHARE * option.rarity;

    if (option.type === 'damage') {
        upgraded.damage += Math.round(upgraded.startDamage * share);
    } else if (option.type === 'critChance') {
        upgraded.critChance = Math.min(
            1,
            upgraded.critChance + (upgraded.startCritChance * share)
        );
    } else if (option.type === 'critMultiplier') {
        upgraded.critMultiplier += upgraded.startCritMultiplier * share;
    } else if (option.type === 'wound') {
        upgraded.woundChance = Math.min(
            1,
            upgraded.woundChance + (upgraded.startWoundChance * share)
        );
    } else if (option.type === 'hp') {
        upgraded.hp += Math.round(upgraded.startHp * share);
    } else if (option.type === 'defense') {
        upgraded.defense = Math.min(
            upgraded.defenseCap,
            upgraded.defense + (upgraded.startDefense * share)
        );
    } else if (option.type === 'fireRate') {
        const fireRateDecrease = (1000 - upgraded.startInterval) * share;
        upgraded.interval = Math.max(200, upgraded.interval - fireRateDecrease);
    }

    return upgraded;
}

function createOfferedUpgrades(hero, random) {
    return availableUpgradeTypes(hero)
        .map(type => ({ type, rarity: rarityMultiplier(random) }))
        // Mirrors selectRandomUpgrades in game.js, including its random-sort behavior.
        .sort(() => 0.5 - random())
        .slice(0, 3);
}

function chooseUpgrade(hero, offers, strategy, random, baseDps, baseEhp) {
    if (strategy === 'random') {
        return applyUpgrade(hero, offers[Math.floor(random() * offers.length)]);
    }

    const candidates = offers.map(option => {
        const upgraded = applyUpgrade(hero, option);
        const dps = expectedDps(upgraded);
        const ehp = effectiveHp(upgraded);
        let score;

        if (strategy === 'offense') score = dps;
        else if (strategy === 'survival') score = ehp;
        else score = Math.log(dps / baseDps) + Math.log(ehp / baseEhp);

        return { upgraded, score };
    });

    return candidates.reduce(
        (best, candidate) => candidate.score > best.score ? candidate : best
    ).upgraded;
}

function simulationSeed(level, strategy, run) {
    const strategyIndex = STRATEGIES.indexOf(strategy) + 1;
    return (
        Math.imul(level + 17, 0x9E3779B1)
        ^ Math.imul(strategyIndex + 31, 0x85EBCA6B)
        ^ Math.imul(run + 101, 0xC2B2AE35)
    ) >>> 0;
}

function simulateOne(permanentHero, heroKey, campaignLevel, strategy, run) {
    const random = mulberry32(simulationSeed(campaignLevel, strategy, run));
    let hero = createTemporaryState(heroKey, permanentHero);
    const baseDps = expectedDps(hero);
    const baseEhp = effectiveHp(hero);
    const choices = upgradeChoicesByLevel.get(campaignLevel);

    for (let choice = 0; choice < choices; choice++) {
        const offers = createOfferedUpgrades(hero, random);
        hero = chooseUpgrade(hero, offers, strategy, random, baseDps, baseEhp);
    }

    return {
        dps: expectedDps(hero),
        ehp: effectiveHp(hero),
        defense: hero.defense,
        hp: hero.hp
    };
}

function permanentReferences(campaignLevel) {
    const heroLevel = focusedProgression.get(campaignLevel);
    const heroes = Object.fromEntries(HERO_KEYS.map(heroKey => {
        const permanent = buildHeroAtLevel(heroKey, heroLevel);
        const tempState = createTemporaryState(heroKey, permanent);
        return [heroKey, {
            permanent,
            dps: expectedDps(tempState),
            ehp: effectiveHp(tempState)
        }];
    }));

    return { heroLevel, heroes };
}

function quantile(sorted, probability) {
    const index = Math.min(sorted.length - 1, Math.floor(sorted.length * probability));
    return sorted[index];
}

function simulateDistribution(campaignLevel, heroKey, strategy, runs) {
    const references = permanentReferences(campaignLevel);
    const permanentHero = references.heroes[heroKey].permanent;
    const ownBaseDps = references.heroes[heroKey].dps;
    const ownBaseEhp = references.heroes[heroKey].ehp;
    const topPermanentDps = references.heroes.luka.dps;
    const topPermanentEhp = references.heroes.eremei.ehp;
    const dpsMultipliers = [];
    const ehpMultipliers = [];
    const hitCounts = [];
    const rawResults = [];
    let tankCrosses = 0;
    let topDpsCrosses = 0;
    let dualExtreme = 0;
    let wildTank = 0;
    let extraHit = 0;
    let excessiveDurability = 0;
    const rawBossHit = maximumRawBossHit(campaignLevel);
    const ownPermanentState = createTemporaryState(heroKey, permanentHero);
    const permanentHits = hitsToDefeat(ownPermanentState, rawBossHit);
    const excessiveHitThreshold = {
        eremei: 10,
        dunya: 6,
        luka: 4
    }[heroKey];

    for (let run = 0; run < runs; run++) {
        const result = simulateOne(permanentHero, heroKey, campaignLevel, strategy, run);
        const dpsMultiplier = result.dps / ownBaseDps;
        const ehpMultiplier = result.ehp / ownBaseEhp;
        const crossesTank = result.ehp >= topPermanentEhp;
        const crossesTopDps = result.dps >= topPermanentDps;
        const hits = hitsToDefeat(result, rawBossHit);

        if (crossesTank) tankCrosses++;
        if (crossesTopDps) topDpsCrosses++;
        if (crossesTank && crossesTopDps) dualExtreme++;
        if (crossesTank && dpsMultiplier >= 1.5) wildTank++;
        if (hits > permanentHits) extraHit++;
        if (hits >= excessiveHitThreshold) excessiveDurability++;
        dpsMultipliers.push(dpsMultiplier);
        ehpMultipliers.push(ehpMultiplier);
        hitCounts.push(hits);
        rawResults.push(result);
    }

    dpsMultipliers.sort((left, right) => left - right);
    ehpMultipliers.sort((left, right) => left - right);
    hitCounts.sort((left, right) => left - right);

    return {
        campaignLevel,
        heroLevel: references.heroLevel,
        heroKey,
        strategy,
        choices: upgradeChoicesByLevel.get(campaignLevel),
        tankProbability: tankCrosses / runs,
        topDpsProbability: topDpsCrosses / runs,
        dualExtremeProbability: dualExtreme / runs,
        wildTankProbability: wildTank / runs,
        extraHitProbability: extraHit / runs,
        excessiveDurabilityProbability: excessiveDurability / runs,
        permanentHits,
        dpsP50: quantile(dpsMultipliers, 0.50),
        dpsP95: quantile(dpsMultipliers, 0.95),
        dpsP99: quantile(dpsMultipliers, 0.99),
        ehpP50: quantile(ehpMultipliers, 0.50),
        ehpP95: quantile(ehpMultipliers, 0.95),
        ehpP99: quantile(ehpMultipliers, 0.99),
        hitsP50: quantile(hitCounts, 0.50),
        hitsP95: quantile(hitCounts, 0.95),
        hitsP99: quantile(hitCounts, 0.99),
        rawResults
    };
}

const worstByCombination = new Map();
const worstDurabilityByCombination = new Map();
for (let campaignLevel = 1; campaignLevel <= CAMPAIGN_FINAL_LEVEL; campaignLevel++) {
    for (const heroKey of HERO_KEYS) {
        for (const strategy of STRATEGIES) {
            const result = simulateDistribution(
                campaignLevel,
                heroKey,
                strategy,
                SCAN_RUNS
            );
            const key = `${heroKey}:${strategy}`;
            const previous = worstByCombination.get(key);
            if (
                !previous
                || result.dualExtremeProbability > previous.dualExtremeProbability
                || (
                    result.dualExtremeProbability === previous.dualExtremeProbability
                    && result.wildTankProbability > previous.wildTankProbability
                )
            ) {
                worstByCombination.set(key, result);
            }
            const previousDurability = worstDurabilityByCombination.get(key);
            if (
                !previousDurability
                || result.excessiveDurabilityProbability
                    > previousDurability.excessiveDurabilityProbability
            ) {
                worstDurabilityByCombination.set(key, result);
            }
        }
    }
}

const detailResults = [];
for (const scanResult of worstByCombination.values()) {
    detailResults.push(simulateDistribution(
        scanResult.campaignLevel,
        scanResult.heroKey,
        scanResult.strategy,
        DETAIL_RUNS
    ));
}

const durabilityDetailResults = [];
for (const scanResult of worstDurabilityByCombination.values()) {
    durabilityDetailResults.push(simulateDistribution(
        scanResult.campaignLevel,
        scanResult.heroKey,
        scanResult.strategy,
        DETAIL_RUNS
    ));
}

function percent(value) {
    return `${(value * 100).toFixed(2)}%`;
}

console.log('\nTemporary upgrade choices from current level data:');
console.table(
    [...upgradeChoicesByLevel.entries()]
        .filter(([level]) => fs.existsSync(`lvlData/gameData${level}.js`))
        .map(([level, choices]) => ({ level, choices }))
);

console.log('\nWorst campaign point for crossing both permanent anchors (Luka DPS + Eremey EHP):');
console.table(detailResults.map(result => ({
    hero: HERO_NAMES[result.heroKey],
    strategy: STRATEGY_NAMES[result.strategy],
    campaignLevel: result.campaignLevel,
    heroLevel: result.heroLevel,
    choices: result.choices,
    dualExtreme: percent(result.dualExtremeProbability),
    wildTank: percent(result.wildTankProbability),
    dpsP50: `${result.dpsP50.toFixed(2)}x`,
    dpsP95: `${result.dpsP95.toFixed(2)}x`,
    dpsP99: `${result.dpsP99.toFixed(2)}x`,
    ehpP50: `${result.ehpP50.toFixed(2)}x`,
    ehpP95: `${result.ehpP95.toFixed(2)}x`,
    ehpP99: `${result.ehpP99.toFixed(2)}x`
})));

console.log('\nWorst point for exceeding the role durability budget (Eremey 10 / Dunya 6 / Luka 4 hits):');
console.table(durabilityDetailResults.map(result => ({
    hero: HERO_NAMES[result.heroKey],
    strategy: STRATEGY_NAMES[result.strategy],
    campaignLevel: result.campaignLevel,
    heroLevel: result.heroLevel,
    choices: result.choices,
    permanentHits: result.permanentHits,
    extraHit: percent(result.extraHitProbability),
    excessiveDurability: percent(result.excessiveDurabilityProbability),
    hitsP50: result.hitsP50,
    hitsP95: result.hitsP95,
    hitsP99: result.hitsP99,
    dpsP50: `${result.dpsP50.toFixed(2)}x`,
    ehpP50: `${result.ehpP50.toFixed(2)}x`
})));

const orderingRows = [];
for (const campaignLevel of PAIR_CHECKPOINTS) {
    const references = permanentReferences(campaignLevel);
    const permanentDpsLeader = HERO_KEYS.reduce((leader, heroKey) => (
        references.heroes[heroKey].dps > references.heroes[leader].dps
            ? heroKey
            : leader
    ));

    for (const strategy of ['random', 'hybrid']) {
        let ehpOrderBroken = 0;
        let dpsLeaderChanged = 0;
        for (let run = 0; run < PAIR_RUNS; run++) {
            const results = Object.fromEntries(HERO_KEYS.map(heroKey => [
                heroKey,
                simulateOne(
                    references.heroes[heroKey].permanent,
                    heroKey,
                    campaignLevel,
                    strategy,
                    run
                )
            ]));
            const dpsLeader = HERO_KEYS.reduce((leader, heroKey) => (
                results[heroKey].dps > results[leader].dps ? heroKey : leader
            ));

            if (!(results.eremei.ehp > results.dunya.ehp && results.dunya.ehp > results.luka.ehp)) {
                ehpOrderBroken++;
            }
            if (dpsLeader !== permanentDpsLeader) dpsLeaderChanged++;
        }

        orderingRows.push({
            campaignLevel,
            heroLevel: references.heroLevel,
            strategy: STRATEGY_NAMES[strategy],
            ehpOrderBroken: percent(ehpOrderBroken / PAIR_RUNS),
            dpsLeaderChanged: percent(dpsLeaderChanged / PAIR_RUNS)
        });
    }
}

console.log('\nArchetype ordering under matched offers and the same strategy:');
console.table(orderingRows);

for (const row of orderingRows) {
    assert.ok(
        Number.parseFloat(row.ehpOrderBroken) < 5,
        `Defensive archetype order breaks too often at campaign level ${row.campaignLevel}`
    );
}

console.log('Temporary upgrade report completed.');
