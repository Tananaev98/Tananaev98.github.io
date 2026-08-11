/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');

const gameSource = fs.readFileSync('game.js', 'utf8');
assert.match(gameSource, /const BOSS_DAMAGE_VARIANCE = 0\.05;/);
assert.match(gameSource, /rollBossHitDamage\(multipliedDamage\)/);

const testBossHitDamage = (damage, randomRoll) => Math.max(
    1,
    Math.round(damage * (0.95 + 0.10 * randomRoll))
);
assert.equal(testBossHitDamage(100, 0), 95);
assert.equal(testBossHitDamage(100, 0.5), 100);
assert.equal(testBossHitDamage(100, 1), 105);
assert.ok(Number.isInteger(testBossHitDamage(137, 0.376)));

const HEROES = {
    eremei: {
        name: 'Еремей',
        damage: 158.4,
        critChance: 0.045,
        critMultiplier: 2.1,
        woundChance: 0.015,
        interval: 970,
        hp: 188,
        defense: 0.075,
        growthProfile: 'guardian',
        featureType: 'catchBackCrit',
        catchBackCritChanceBonus: 0.10,
        catchBackExpectedUptime: 0.45
    },
    dunya: {
        name: 'Дуня',
        damage: 112.5,
        critChance: 0.03,
        critMultiplier: 2.0,
        woundChance: 0.015,
        interval: 940,
        hp: 120,
        defense: 0.03,
        growthProfile: 'tempest',
        featureMultiplier: 1.23,
        featureType: 'attackMultiplier',
        doubleAttackChance: 0.10,
        tripleAttackChance: 0.03,
        jackpotAttackChance: 0.01,
        jackpotAttackMultiplier: 8
    },
    luka: {
        name: 'Лука',
        damage: 105,
        critChance: 0.015,
        critMultiplier: 2.2,
        woundChance: 0.03,
        interval: 800,
        hp: 75,
        defense: 0.015,
        growthProfile: 'marksman',
        guaranteedCritEvery: 5
    },
    daryana: {
        name: 'Дарьяна',
        // Ревизия 4: прогрев поднят с 0.5% до 1.5% за удар (иначе тонул в шуме
        // крита/разброса урона), урон снижен так, чтобы DPS остался тем же (~145).
        // minInterval — личный пол скорострельности: растёт максимум до
        // скорости 60 (интервал не ниже 940мс), а не до общих 200мс.
        damage: 117.3,
        critChance: 0.02,
        critMultiplier: 2.0,
        woundChance: 0.02,
        interval: 980,
        minInterval: 940,
        hp: 108,
        defense: 0.02,
        growthProfile: 'tempest',
        featureType: 'damage',
        // Прогревание: +1.5% за удар по цели. featureMultiplier — ожидаемое
        // среднее усиление за бой при допущении ~10 средних стаков (тот же
        // приём, что и catchBackExpectedUptime у Еремея).
        warmupDamagePerHit: 0.015,
        featureMultiplier: 1.15
    }
};

const CAMPAIGN_FINAL_LEVEL = 141;
const HERO_MAX_LEVEL = 200;
const HERO_UPGRADE_BASE_COST = 10;
const HERO_UPGRADE_COST_GROWTH = 1.06;
const LEVEL_REWARD_SCALE = 3;
const BOSS_HEALTH_PROGRESSION_SCALE = 2.25;
const BOSS_HEALTH_PROGRESSION_EXPONENT = 2.1;
const CAMPAIGN_CHECKPOINTS = [1, 15, 30, 45, 60, 75, 90, 105, 120, 135, 141];
const RARITIES = [
    { max: 0.50, multiplier: 1 },
    { max: 0.85, multiplier: 1.25 },
    { max: 0.95, multiplier: 1.5 },
    { max: 0.99, multiplier: 2 },
    { max: 1, multiplier: 2.5 }
];
const TEMPORARY_UPGRADE_BASE_SHARE = 0.20;
const WOUND_DURATION_SECONDS = 5;
const WOUND_TICK_SECONDS = 0.3;
const WOUND_DAMAGE_SHARE_PER_TICK = 0.1;
const BOSS_BASE_HP = [2600, 6500, 11500, 18500, 28000];
const UPGRADES_AFTER_BOSS = [2, 3, 3, 3, 0];
const RUNS = 5000;
const GROWTH_PROFILES = {
    guardian: {
        damageMultiplier: 1.042,
        critChanceIncrease: 0.003,
        critMultiplierIncrease: 0.10,
        woundChanceIncrease: 0.003,
        shotIntervalReduction: 1,
        castleHpMultiplier: 1.0525,
        defenseIncrease: 0.01,
        defenseCap: 0.60
    },
    tempest: {
        damageMultiplier: 1.037,
        critChanceIncrease: 0.007,
        critMultiplierIncrease: 0.09,
        woundChanceIncrease: 0.006,
        shotIntervalReduction: 2,
        castleHpMultiplier: 1.048,
        defenseIncrease: 0.0075,
        defenseCap: 0.50
    },
    marksman: {
        damageMultiplier: 1.029,
        critChanceIncrease: 0.008,
        critMultiplierIncrease: 0.12,
        woundChanceIncrease: 0.012,
        shotIntervalReduction: 5,
        castleHpMultiplier: 1.045,
        defenseIncrease: 0.0065,
        defenseCap: 0.40
    }
};

const dunyaExpectedAttackMultiplier = 1
    + HEROES.dunya.doubleAttackChance
    + (HEROES.dunya.tripleAttackChance * 2)
    + (
        HEROES.dunya.jackpotAttackChance
        * (HEROES.dunya.jackpotAttackMultiplier - 1)
    );
assert.ok(Math.abs(dunyaExpectedAttackMultiplier - HEROES.dunya.featureMultiplier) < 1e-12);

function cloneHeroAtLevel(baseHero, targetLevel) {
    const hero = { ...baseHero, upSpecif: 1 };
    const growth = GROWTH_PROFILES[baseHero.growthProfile];

    for (let level = 1; level < targetLevel; level++) {
        if (hero.upSpecif === 1) {
            hero.damage *= growth.damageMultiplier;
            hero.critChance = Math.min(1, hero.critChance + growth.critChanceIncrease);
            hero.upSpecif = 2;
        } else if (hero.upSpecif === 2) {
            hero.critMultiplier += growth.critMultiplierIncrease;
            hero.woundChance = Math.min(1, hero.woundChance + growth.woundChanceIncrease);
            hero.upSpecif = 3;
        } else if (hero.upSpecif === 3) {
            hero.interval = Math.max(hero.minInterval ?? 200, hero.interval - growth.shotIntervalReduction);
            hero.upSpecif = 4;
        } else {
            hero.hp += Math.floor(hero.hp * (growth.castleHpMultiplier - 1));
            hero.defense = Math.min(growth.defenseCap, hero.defense + growth.defenseIncrease);
            hero.upSpecif = 1;
        }
    }

    return hero;
}

function expectedDps(hero, featureMultiplier = true) {
    let effectiveCritChance = hero.critChance;
    if (hero.guaranteedCritEvery) {
        const guaranteedShare = 1 / hero.guaranteedCritEvery;
        effectiveCritChance = guaranteedShare + ((1 - guaranteedShare) * hero.critChance);
    }
    if (featureMultiplier && hero.featureType === 'catchBackCrit') {
        effectiveCritChance += (hero.catchBackCritChanceBonus || 0)
            * (hero.catchBackExpectedUptime || 0.45);
        effectiveCritChance = Math.min(1, effectiveCritChance);
    }

    const critFactor = 1 + (effectiveCritChance * (hero.critMultiplier - 1));
    const feature = featureMultiplier ? (hero.featureMultiplier ?? 1) : 1;
    const damageFeature = hero.featureType === 'damage' ? feature : 1;
    const attackMultiplierFeature = hero.featureType === 'attackMultiplier' ? feature : 1;
    const hitsPerSecond = 1000 / hero.interval;
    const baseAverageHitDamage = hero.damage * critFactor * damageFeature;
    const averageHitDamage = baseAverageHitDamage * attackMultiplierFeature;
    const directDps = averageHitDamage * hitsPerSecond;

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

function randomRarityMultiplier() {
    const roll = Math.random();
    return RARITIES.find(rarity => roll <= rarity.max).multiplier;
}

function createUpgradeOptions(hero) {
    const types = ['damage', 'critChance', 'critMultiplier', 'wound', 'hp', 'defense', 'fireRate'];
    const shuffled = types
        .map(type => ({ type, order: Math.random(), rarity: randomRarityMultiplier() }))
        .sort((a, b) => a.order - b.order)
        .slice(0, 3);

    return shuffled.map(option => {
        const upgraded = { ...hero };
        const share = TEMPORARY_UPGRADE_BASE_SHARE * option.rarity;

        if (option.type === 'damage') upgraded.damage += hero.startDamage * share;
        if (option.type === 'critChance') upgraded.critChance = Math.min(1, upgraded.critChance + (hero.startCritChance * share));
        if (option.type === 'critMultiplier') upgraded.critMultiplier += hero.startCritMultiplier * share;
        if (option.type === 'wound') upgraded.woundChance = Math.min(1, upgraded.woundChance + (hero.startWoundChance * share));
        if (option.type === 'fireRate') upgraded.interval = Math.max(200, upgraded.interval - (hero.startFireRate * share));

        return upgraded;
    });
}

function chooseOffensiveUpgrade(hero) {
    const options = createUpgradeOptions(hero);
    return options.reduce((best, option) => (
        expectedDps(option) > expectedDps(best) ? option : best
    ), hero);
}

function simulateRun(baseHero, heroLevel) {
    const permanentHero = cloneHeroAtLevel(baseHero, heroLevel);
    let hero = {
        ...permanentHero,
        startDamage: permanentHero.damage,
        startCritChance: permanentHero.critChance,
        startCritMultiplier: permanentHero.critMultiplier,
        startWoundChance: permanentHero.woundChance,
        startFireRate: 1000 - permanentHero.interval
    };
    const bossDps = [];

    for (let bossIndex = 0; bossIndex < BOSS_BASE_HP.length; bossIndex++) {
        bossDps.push(expectedDps(hero));
        for (let choice = 0; choice < UPGRADES_AFTER_BOSS[bossIndex]; choice++) {
            hero = chooseOffensiveUpgrade(hero);
        }
    }

    return bossDps;
}

function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function bossHealthMultiplier(level) {
    const campaignProgress = (
        Math.min(CAMPAIGN_FINAL_LEVEL, Math.max(1, level)) - 1
    ) / (CAMPAIGN_FINAL_LEVEL - 1);
    return 1 + (
        BOSS_HEALTH_PROGRESSION_SCALE
        * (Math.exp(BOSS_HEALTH_PROGRESSION_EXPONENT * campaignProgress) - 1)
    );
}

function heroUpgradeCost(heroLevel) {
    if (heroLevel >= HERO_MAX_LEVEL) return 0;
    return Math.round(HERO_UPGRADE_BASE_COST * Math.pow(HERO_UPGRADE_COST_GROWTH, heroLevel - 1));
}

function levelReward(level) {
    return heroUpgradeCost(Math.min(CAMPAIGN_FINAL_LEVEL, Math.max(1, level))) * LEVEL_REWARD_SCALE;
}

function buildFocusedHeroProgression() {
    const beforeLevel = new Map();
    const afterLevel = new Map();
    let heroLevel = 1;
    let zlata = 0;

    for (let level = 1; level <= CAMPAIGN_FINAL_LEVEL; level++) {
        beforeLevel.set(level, heroLevel);
        zlata += levelReward(level);

        while (heroLevel < HERO_MAX_LEVEL && zlata >= heroUpgradeCost(heroLevel)) {
            zlata -= heroUpgradeCost(heroLevel);
            heroLevel++;
        }
        afterLevel.set(level, heroLevel);
    }

    return { beforeLevel, afterLevel, remainingZlata: zlata };
}

const focusedProgression = buildFocusedHeroProgression();

const rows = [];
for (const level of CAMPAIGN_CHECKPOINTS) {
    const heroLevel = focusedProgression.beforeLevel.get(level);
    for (const hero of Object.values(HEROES)) {
        const permanent = cloneHeroAtLevel(hero, heroLevel);
        const accumulatedBossDps = Array(BOSS_BASE_HP.length).fill(0);

        for (let run = 0; run < RUNS; run++) {
            const bossDps = simulateRun(hero, heroLevel);
            bossDps.forEach((dps, index) => {
                accumulatedBossDps[index] += dps;
            });
        }

        const averageBossDps = accumulatedBossDps.map(total => total / RUNS);
        const weightedRunDps = BOSS_BASE_HP.reduce((hp, value) => hp + value, 0)
            / BOSS_BASE_HP.reduce((time, hp, index) => time + (hp / averageBossDps[index]), 0);
        const isRegionFinal = level % 15 === 0 || level === CAMPAIGN_FINAL_LEVEL;
        const bossSeconds = BOSS_BASE_HP.map((hp, index) => {
            const regionMultiplier = isRegionFinal && index === BOSS_BASE_HP.length - 1 ? 1.12 : 1;
            return (hp * bossHealthMultiplier(level) * regionMultiplier) / averageBossDps[index];
        });
        const aimSeconds = bossSeconds.reduce((total, seconds) => total + seconds, 0);

        rows.push({
            level,
            heroLevel,
            hero: hero.name,
            permanentDps: Math.round(expectedDps(permanent)),
            effectiveHp: Math.round(permanent.hp / (1 - permanent.defense)),
            runDps: Math.round(weightedRunDps),
            shortestBoss: Math.round(Math.min(...bossSeconds)),
            longestBoss: Math.round(Math.max(...bossSeconds)),
            aimSeconds: Math.round(aimSeconds)
        });
    }
}

console.table(rows);

const baselineRunDps = average(rows.filter(row => row.level === 1).map(row => row.runDps));
console.log('\nСредний множитель DPS забега относительно уровня 1:');
for (const level of CAMPAIGN_CHECKPOINTS) {
    const levelDps = average(rows.filter(row => row.level === level).map(row => row.runDps));
    console.log(
        String(level).padStart(3),
        (levelDps / baselineRunDps).toFixed(3),
        'HP x' + bossHealthMultiplier(level).toFixed(3)
    );
}

console.log('\nПостоянный DPS после прохождения контрольных уровней:');
const postLevelRows = [];
for (const completedLevel of CAMPAIGN_CHECKPOINTS) {
    const heroLevel = focusedProgression.afterLevel.get(completedLevel);
    for (const hero of Object.values(HEROES)) {
        postLevelRows.push({
            completedLevel,
            heroLevel,
            hero: hero.name,
            permanentDps: Math.round(expectedDps(cloneHeroAtLevel(hero, heroLevel))),
            effectiveHp: Math.round(
                cloneHeroAtLevel(hero, heroLevel).hp
                / (1 - cloneHeroAtLevel(hero, heroLevel).defense)
            )
        });
    }
}
console.table(postLevelRows);

const archetypeRows = [];
for (const heroLevel of [1, 40, 80, 120, 160, 200]) {
    const levelHeroes = Object.fromEntries(
        Object.entries(HEROES).map(([heroKey, hero]) => [
            heroKey,
            cloneHeroAtLevel(hero, heroLevel)
        ])
    );
    const eremei = levelHeroes.eremei;
    const dunya = levelHeroes.dunya;
    const luka = levelHeroes.luka;
    const daryana = levelHeroes.daryana;

    assert.ok(
        eremei.hp / (1 - eremei.defense) > dunya.hp / (1 - dunya.defense)
        && dunya.hp / (1 - dunya.defense) > luka.hp / (1 - luka.defense),
        `Нарушен порядок живучести на уровне героя ${heroLevel}`
    );
    assert.ok(
        eremei.interval > dunya.interval && dunya.interval > luka.interval,
        `Нарушен порядок скорострельности на уровне героя ${heroLevel}`
    );
    assert.ok(
        eremei.defense <= GROWTH_PROFILES.guardian.defenseCap
        && dunya.defense <= GROWTH_PROFILES.tempest.defenseCap
        && luka.defense <= GROWTH_PROFILES.marksman.defenseCap,
        `Превышен классовый предел защиты на уровне героя ${heroLevel}`
    );

    // Дарьяна занимает промежуточную точку живучести между Дуней и Лукой
    // («чуть ниже среднего») и намеренно уступает Луке по постоянному DPS.
    assert.ok(
        daryana.hp / (1 - daryana.defense) < dunya.hp / (1 - dunya.defense)
        && daryana.hp / (1 - daryana.defense) > luka.hp / (1 - luka.defense),
        `Дарьяна выпала из промежутка живучести между Дуней и Лукой на уровне героя ${heroLevel}`
    );
    assert.ok(
        daryana.defense <= GROWTH_PROFILES.marksman.defenseCap,
        `Превышен классовый предел защиты Дарьяны на уровне героя ${heroLevel}`
    );

    const eremeiDps = expectedDps(eremei);
    const lukaDps = expectedDps(luka);
    const daryanaDps = expectedDps(daryana);
    const eremeiCriticalHit = eremei.damage * eremei.critMultiplier;
    const lukaCriticalHit = luka.damage * luka.critMultiplier;
    const dunyaJackpotCriticalHit = dunya.damage
        * dunya.critMultiplier
        * dunya.jackpotAttackMultiplier;
    assert.ok(
        lukaDps > eremeiDps,
        `Лука потерял преимущество по постоянному DPS на уровне героя ${heroLevel}`
    );
    assert.ok(
        eremeiCriticalHit > lukaCriticalHit * 1.15,
        `Критический удар Еремея недостаточно тяжёлый на уровне героя ${heroLevel}`
    );
    assert.ok(
        dunyaJackpotCriticalHit > eremeiCriticalHit * 4,
        `Джекпот Дуни недостаточно мощный на уровне героя ${heroLevel}`
    );
    assert.ok(
        lukaDps / eremeiDps <= 1.50,
        `Преимущество Луки по DPS превысило 50% на уровне героя ${heroLevel}`
    );
    assert.ok(
        daryanaDps < lukaDps && daryanaDps / lukaDps >= 0.65 && daryanaDps / lukaDps <= 0.90,
        `DPS Дарьяны вышел за коридор ~15% ниже Луки на уровне героя ${heroLevel}: ${(daryanaDps / lukaDps).toFixed(3)}`
    );

    for (const hero of Object.values(levelHeroes)) {
        archetypeRows.push({
            heroLevel,
            hero: hero.name,
            dps: Math.round(expectedDps(hero)),
            criticalHit: Math.round(
                hero.damage
                * hero.critMultiplier
                * (hero.featureType === 'damage' ? hero.featureMultiplier : 1)
            ),
            jackpotCriticalHit: Math.round(
                hero.damage
                * hero.critMultiplier
                * (hero.jackpotAttackMultiplier ?? 1)
                * (hero.featureType === 'damage' ? hero.featureMultiplier : 1)
            ),
            effectiveHp: Math.round(hero.hp / (1 - hero.defense)),
            defense: `${(hero.defense * 100).toFixed(1)}%`,
            shotsPerSecond: (1000 / hero.interval).toFixed(3),
            critChance: `${(hero.critChance * 100).toFixed(1)}%`,
            woundChance: `${(hero.woundChance * 100).toFixed(1)}%`
        });
    }
}

for (const row of rows) {
    assert.ok(
        row.aimSeconds >= 140 && row.aimSeconds <= 290,
        `Суммарное время пяти боссов вышло из коридора на уровне ${row.level}: ${row.aimSeconds} с`
    );
    assert.ok(
        row.shortestBoss >= 10 && row.longestBoss <= 90,
        `Время отдельного босса вышло из коридора на уровне ${row.level}: ${row.shortestBoss}-${row.longestBoss} с`
    );
}

console.log('\nКонтроль сохранения архетипов:');
console.table(archetypeRows);
console.log('\nПроверки архетипов, DPS и длительности боёв пройдены.');
