// ==================== Сохранение и загрузка прогресса ====================

const GAME_STATE_STORAGE_KEY = 'gameState';
const GAME_STATE_VERSION = 7;
const MAX_CASTLE_DAMAGE_REDUCTION = 0.60;
const CAMPAIGN_FINAL_LEVEL = 141;
const HERO_MAX_LEVEL = 200;
const LEVEL_REWARD_SCALE = 3;
const HERO_UPGRADE_BASE_COST = 10;
const HERO_UPGRADE_COST_GROWTH = 1.06;
const BOSS_DAMAGE_BALANCE = Object.freeze({
    progressionScale: 1.25,
    progressionExponent: 1.70,
    legacyLinearGrowthPerLevel: 0.05,
    maxCombatMultiplier: 2.00
});
const DEBUG_UNLOCK_SECRET = 'tda98';
const DEBUG_ZLATA_REWARD = 10_000_000;

const DEFAULT_HERO_PERMANENT_GROWTH = Object.freeze({
    damageMultiplier: 1.03,
    critChanceIncrease: 0.01,
    critMultiplierIncrease: 0.1,
    woundChanceIncrease: 0.01,
    shotIntervalReduction: 1,
    castleHpMultiplier: 1.05,
    defenseIncrease: 0.01,
    defenseCap: MAX_CASTLE_DAMAGE_REDUCTION
});

const HERO_PERMANENT_GROWTH_PROFILES = Object.freeze({
    guardian: Object.freeze({
        damageMultiplier: 1.042,
        critChanceIncrease: 0.003,
        critMultiplierIncrease: 0.10,
        woundChanceIncrease: 0.003,
        shotIntervalReduction: 1,
        castleHpMultiplier: 1.0525,
        defenseIncrease: 0.01,
        defenseCap: 0.60
    }),
    tempest: Object.freeze({
        damageMultiplier: 1.037,
        critChanceIncrease: 0.007,
        critMultiplierIncrease: 0.09,
        woundChanceIncrease: 0.006,
        shotIntervalReduction: 2,
        castleHpMultiplier: 1.048,
        defenseIncrease: 0.0075,
        defenseCap: 0.50
    }),
    marksman: Object.freeze({
        damageMultiplier: 1.029,
        critChanceIncrease: 0.008,
        critMultiplierIncrease: 0.12,
        woundChanceIncrease: 0.012,
        shotIntervalReduction: 5,
        castleHpMultiplier: 1.045,
        defenseIncrease: 0.0065,
        defenseCap: 0.40
    })
});

function getHeroPermanentGrowth(hero) {
    return HERO_PERMANENT_GROWTH_PROFILES[hero?.permanentGrowthProfile]
        ?? DEFAULT_HERO_PERMANENT_GROWTH;
}

function getHeroDefenseCap(hero) {
    return Math.min(
        MAX_CASTLE_DAMAGE_REDUCTION,
        getHeroPermanentGrowth(hero).defenseCap
    );
}

function getHeroUpgradeCost(heroLevel) {
    const normalizedLevel = Math.min(
        HERO_MAX_LEVEL,
        Math.max(1, Math.floor(Number(heroLevel) || 1))
    );

    if (normalizedLevel >= HERO_MAX_LEVEL) return 0;

    return Math.max(1, Math.round(
        HERO_UPGRADE_BASE_COST * Math.pow(HERO_UPGRADE_COST_GROWTH, normalizedLevel - 1)
    ));
}

function getBossDamageProgressionMultiplier(levelNumber) {
    const normalizedLevel = Math.min(
        CAMPAIGN_FINAL_LEVEL,
        Math.max(1, Math.floor(Number(levelNumber) || 1))
    );
    const campaignProgress = (
        normalizedLevel - 1
    ) / (CAMPAIGN_FINAL_LEVEL - 1);

    return 1 + (
        BOSS_DAMAGE_BALANCE.progressionScale
        * (
            Math.exp(
                BOSS_DAMAGE_BALANCE.progressionExponent * campaignProgress
            ) - 1
        )
    );
}

function calculateBossAttackDamage(
    configuredAttackDamage,
    bossMultiplier,
    phaseMultiplier,
    levelMultiplier,
    levelNumber
) {
    const normalizedLevel = Math.max(1, Math.floor(Number(levelNumber) || 1));
    // gameData2..N уже содержат старый множитель +5% за номер уровня.
    // Сначала убираем его, чтобы новая кривая не накладывалась поверх старой.
    const legacyProgressionMultiplier = normalizedLevel === 1
        ? 1
        : 1 + (
            BOSS_DAMAGE_BALANCE.legacyLinearGrowthPerLevel * normalizedLevel
        );
    const normalizedAttackDamage = Math.max(
        0,
        Number(configuredAttackDamage) || 0
    ) / legacyProgressionMultiplier;
    const combatMultiplier = Math.min(
        // Сочетание «сильный босс + третья фаза + сложный уровень»
        // не должно превращать читаемую атаку в случайный ваншот.
        BOSS_DAMAGE_BALANCE.maxCombatMultiplier,
        Math.max(0, Number(bossMultiplier) || 0)
        * Math.max(0, Number(phaseMultiplier) || 0)
        * Math.max(0, Number(levelMultiplier) || 0)
    );

    return Math.max(1, Math.round(
        normalizedAttackDamage
        * getBossDamageProgressionMultiplier(normalizedLevel)
        * combatMultiplier
    ));
}

function getBossComboDamageMultiplier(
    combo,
    abilities,
    isLongScalingEnabled = false,
    isShortScalingEnabled = false
) {
    const attacks = (combo?.indexAbilities ?? [])
        .map(index => abilities[index])
        .filter(Boolean);

    if (attacks.length <= 1) return 1;

    if (attacks.length <= 4) {
        if (!isShortScalingEnabled) return 1;

        const configuredMultiplier = Number(combo?.damageMultiplier);
        if (Number.isFinite(configuredMultiplier)) {
            return Math.min(0.80, Math.max(0.55, configuredMultiplier));
        }

        const averageSpeed = attacks.reduce(
            (total, attack) => total + Math.max(0, Number(attack.customSpeed) || 0),
            0
        ) / attacks.length;
        const fastAttackShare = attacks.filter(
            attack => (Number(attack.customSpeed) || 0) >= 20
        ).length / attacks.length;
        const baseMultiplier = attacks.length === 2
            ? 0.80
            : attacks.length === 3
                ? 0.70
                : 0.60;
        const speedPenalty = averageSpeed >= 20 ? 0.05 : 0;
        const fastDensityPenalty = fastAttackShare >= 0.75 ? 0.05 : 0;
        const multiplier = baseMultiplier - speedPenalty - fastDensityPenalty;

        return Math.round(Math.min(0.80, Math.max(0.55, multiplier)) * 100) / 100;
    }

    if (!isLongScalingEnabled) return 1;

    const configuredMultiplier = Number(combo?.damageMultiplier);
    if (Number.isFinite(configuredMultiplier)) {
        return Math.min(0.50, Math.max(0.24, configuredMultiplier));
    }

    const averageSpeed = attacks.reduce(
        (total, attack) => total + Math.max(0, Number(attack.customSpeed) || 0),
        0
    ) / attacks.length;
    const fastAttackShare = attacks.filter(
        attack => (Number(attack.customSpeed) || 0) >= 20
    ).length / attacks.length;

    const lengthPenalty = Math.min(0.21, (attacks.length - 5) * 0.07);
    const speedPenalty = averageSpeed >= 20
        ? 0.08
        : averageSpeed >= 14
            ? 0.04
            : 0;
    const fastDensityPenalty = fastAttackShare >= 0.75 ? 0.04 : 0;
    const multiplier = 0.50 - lengthPenalty - speedPenalty - fastDensityPenalty;

    return Math.round(Math.min(0.50, Math.max(0.24, multiplier)) * 100) / 100;
}

function getLevelZlataReward(levelNumber) {
    const normalizedLevel = Math.min(
        CAMPAIGN_FINAL_LEVEL,
        Math.max(1, Math.floor(Number(levelNumber) || 1))
    );

    // Награда уровня фиксирована. Цена развития растёт быстрее силы старых уровней,
    // поэтому фарм остаётся бесконечным, но постепенно теряет эффективность.
    return getHeroUpgradeCost(normalizedLevel) * LEVEL_REWARD_SCALE;
}

function getLevelZlataPayout(levelNumber, defeatedBosses, totalBosses = 5) {
    const normalizedBossCount = Math.max(1, Math.floor(Number(totalBosses) || 1));
    const normalizedDefeated = Math.min(
        normalizedBossCount,
        Math.max(0, Math.floor(Number(defeatedBosses) || 0))
    );

    return Math.floor(
        getLevelZlataReward(levelNumber) * (normalizedDefeated / normalizedBossCount)
    );
}

function getHeroInvestedZlata(heroLevel) {
    const normalizedLevel = Math.min(
        HERO_MAX_LEVEL,
        Math.max(1, Math.floor(Number(heroLevel) || 1))
    );
    let invested = 0;

    for (let level = 1; level < normalizedLevel; level++) {
        invested += getHeroUpgradeCost(level);
    }

    return invested;
}

// 1. Инициализация прогресса
let gameState = createGameState();

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function readStoredGameState() {
    try {
        const saved = localStorage.getItem(GAME_STATE_STORAGE_KEY);
        if (!saved) return null;

        const parsed = JSON.parse(saved);
        if (!isPlainObject(parsed)) {
            console.warn('Сохранение имеет неверный формат. Создан новый прогресс.');
            return null;
        }
        return parsed;
    } catch (error) {
        console.warn('Не удалось прочитать сохранение. Создан новый прогресс.', error);
        return null;
    }
}

function persistGameState(state) {
    try {
        localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
        return true;
    } catch (error) {
        console.error('Не удалось сохранить игровой прогресс.', error);
        return false;
    }
}

function applyHeroPermanentStatUpgrade(hero) {
    const growth = getHeroPermanentGrowth(hero);

    if (hero.upSpecif === 1) {
        hero.startGlobalDamage *= growth.damageMultiplier;
        hero.startGlobalCritChance = Math.min(
            1,
            hero.startGlobalCritChance + growth.critChanceIncrease
        );
        hero.upSpecif = 2;
    } else if (hero.upSpecif === 2) {
        hero.startGlobalCritMultiplier += growth.critMultiplierIncrease;
        hero.startGlobalWoundChance = Math.min(
            1,
            hero.startGlobalWoundChance + growth.woundChanceIncrease
        );
        hero.upSpecif = 3;
    } else if (hero.upSpecif === 3) {
        hero.startSHOT_INTERVAL = Math.max(
            200,
            hero.startSHOT_INTERVAL - growth.shotIntervalReduction
        );
        hero.upSpecif = 4;
    } else if (hero.upSpecif === 4) {
        hero.castleHP += Math.floor(
            hero.castleHP * (growth.castleHpMultiplier - 1)
        );
        hero.startCastleDamageReduction = Math.min(
            getHeroDefenseCap(hero),
            hero.startCastleDamageReduction + growth.defenseIncrease
        );
        hero.upSpecif = 1;
    }
}

function rebuildBalancedHero(defaultHero, savedHero) {
    const rebuiltHero = { ...defaultHero };
    const savedLevel = Number.isFinite(savedHero.level)
        ? Math.min(HERO_MAX_LEVEL, Math.max(1, Math.floor(savedHero.level)))
        : defaultHero.level;

    for (let level = 1; level < savedLevel; level++) {
        applyHeroPermanentStatUpgrade(rebuiltHero);
    }

    rebuiltHero.level = savedLevel;
    rebuiltHero.zlataUp = getHeroUpgradeCost(savedLevel);
    rebuiltHero.investedZlata = Number.isFinite(savedHero.investedZlata)
        ? Math.max(0, Math.floor(savedHero.investedZlata))
        : getHeroInvestedZlata(savedLevel);
    if (typeof savedHero.unlock === 'boolean') rebuiltHero.unlock = savedHero.unlock;

    return rebuiltHero;
}

const HERO_DIFFICULTY_MODEL = Object.freeze({
    survivalWeight: 0.85,
    damageWeight: 0.08,
    fireRateWeight: 0.04,
    mechanicWeight: 0.03,
    eremeiExpectedCatchBackUptime: 0.45,
    woundDurationSeconds: 5,
    woundTickSeconds: 0.3,
    woundDamageSharePerTick: 0.1,
    volatilityReference: 0.75,
    catchBackCritReference: 0.10
});

function clampHeroDifficultyValue(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
}

function isHeroEligibleForDifficulty(hero) {
    return isPlainObject(hero)
        && typeof hero.name === 'string'
        && typeof hero.dispName === 'string'
        && typeof hero.permanentGrowthProfile === 'string'
        && typeof hero.feature === 'string'
        && typeof hero.fullImage === 'string'
        && Number.isFinite(hero.startGlobalDamage)
        && Number.isFinite(hero.startGlobalCritChance)
        && Number.isFinite(hero.startGlobalCritMultiplier)
        && Number.isFinite(hero.startGlobalWoundChance)
        && Number.isFinite(hero.startSHOT_INTERVAL)
        && Number.isFinite(hero.castleHP)
        && Number.isFinite(hero.startCastleDamageReduction);
}

function buildDifficultyReferenceHero(defaultHero, targetLevel) {
    const referenceHero = { ...defaultHero };
    const normalizedLevel = Math.min(
        HERO_MAX_LEVEL,
        Math.max(1, Math.floor(Number(targetLevel) || 1))
    );

    for (let level = 1; level < normalizedLevel; level++) {
        applyHeroPermanentStatUpgrade(referenceHero);
    }

    referenceHero.level = normalizedLevel;
    return referenceHero;
}

function getHeroAttackMultiplierStats(hero) {
    const doubleChance = clampHeroDifficultyValue(Number(hero.doubleAttackChance) || 0);
    const tripleChance = clampHeroDifficultyValue(Number(hero.tripleAttackChance) || 0);
    const jackpotChance = clampHeroDifficultyValue(Number(hero.jackpotAttackChance) || 0);
    const normalChance = Math.max(0, 1 - doubleChance - tripleChance - jackpotChance);
    const jackpotMultiplier = Math.max(1, Number(hero.jackpotAttackMultiplier) || 1);
    const outcomes = [
        { chance: normalChance, multiplier: 1 },
        { chance: doubleChance, multiplier: 2 },
        { chance: tripleChance, multiplier: 3 },
        { chance: jackpotChance, multiplier: jackpotMultiplier }
    ];
    const totalChance = outcomes.reduce((sum, outcome) => sum + outcome.chance, 0) || 1;
    const mean = outcomes.reduce(
        (sum, outcome) => sum + (outcome.chance * outcome.multiplier),
        0
    ) / totalChance;
    const variance = outcomes.reduce(
        (sum, outcome) => sum + (
            outcome.chance * Math.pow(outcome.multiplier - mean, 2)
        ),
        0
    ) / totalChance;

    return {
        mean: Math.max(1, mean),
        coefficientOfVariation: mean > 0 ? Math.sqrt(Math.max(0, variance)) / mean : 0
    };
}

function getHeroExpectedPermanentDps(hero) {
    const attackStats = getHeroAttackMultiplierStats(hero);
    const hitsPerSecond = 1000 / Math.max(200, Number(hero.startSHOT_INTERVAL) || 1000);
    const ordinaryCritChance = clampHeroDifficultyValue(
        Number(hero.startGlobalCritChance) || 0
    );
    const catchBackCritBonus = Math.max(0, Number(hero.catchBackCritChanceBonus) || 0);
    const catchBackCritChance = catchBackCritBonus * HERO_DIFFICULTY_MODEL.eremeiExpectedCatchBackUptime;
    const guaranteedCritEvery = Math.max(0, Math.floor(Number(hero.guaranteedCritEvery) || 0));
    const guaranteedCritShare = guaranteedCritEvery > 0 ? 1 / guaranteedCritEvery : 0;
    const effectiveCritChance = guaranteedCritShare + (
        (1 - guaranteedCritShare) * clampHeroDifficultyValue(
            ordinaryCritChance + catchBackCritChance
        )
    );
    const critMultiplier = Math.max(1, Number(hero.startGlobalCritMultiplier) || 1);
    const critFactor = 1 + (effectiveCritChance * (critMultiplier - 1));
    const baseAverageHitDamage = Math.max(0, Number(hero.startGlobalDamage) || 0) * critFactor;
    const directDps = baseAverageHitDamage * attackStats.mean * hitsPerSecond;
    const woundProcRate = hitsPerSecond * clampHeroDifficultyValue(
        Number(hero.startGlobalWoundChance) || 0
    );
    const averageWaitForWound = woundProcRate > 0 ? 1 / woundProcRate : Infinity;
    const woundUptime = Number.isFinite(averageWaitForWound)
        ? HERO_DIFFICULTY_MODEL.woundDurationSeconds / (
            HERO_DIFFICULTY_MODEL.woundDurationSeconds + averageWaitForWound
        )
        : 0;
    const woundDps = woundUptime
        * baseAverageHitDamage
        * (
            HERO_DIFFICULTY_MODEL.woundDamageSharePerTick
            / HERO_DIFFICULTY_MODEL.woundTickSeconds
        );

    return directDps + woundDps;
}

function getHeroDifficultyMetrics(hero) {
    const defense = clampHeroDifficultyValue(
        Number(hero.startCastleDamageReduction) || 0,
        0,
        MAX_CASTLE_DAMAGE_REDUCTION
    );
    const attackStats = getHeroAttackMultiplierStats(hero);
    const volatilityBurden = clampHeroDifficultyValue(
        attackStats.coefficientOfVariation / HERO_DIFFICULTY_MODEL.volatilityReference
    );
    const catchBackBurden = clampHeroDifficultyValue(
        (Math.max(0, Number(hero.catchBackCritChanceBonus) || 0))
        / HERO_DIFFICULTY_MODEL.catchBackCritReference
    );

    return {
        effectiveHp: Math.max(1, Number(hero.castleHP) || 1) / (1 - defense),
        expectedDps: Math.max(0.001, getHeroExpectedPermanentDps(hero)),
        shotsPerSecond: 1000 / Math.max(200, Number(hero.startSHOT_INTERVAL) || 1000),
        mechanicBurden: Math.max(volatilityBurden, catchBackBurden)
    };
}

function normalizeHeroDifficultyMetric(value, values, lowerIsHarder) {
    const transform = metricValue => lowerIsHarder
        ? 1 / Math.max(0.001, metricValue)
        : metricValue;
    const transformedValues = values.map(transform);
    const transformedValue = transform(value);
    const minimum = Math.min(...transformedValues);
    const maximum = Math.max(...transformedValues);

    if (!Number.isFinite(minimum) || !Number.isFinite(maximum) || maximum - minimum < 1e-9) {
        return 0.5;
    }

    return clampHeroDifficultyValue((transformedValue - minimum) / (maximum - minimum));
}

function calculateHeroDifficulty(hero) {
    if (!isHeroEligibleForDifficulty(hero)) return 3;

    const defaults = getDefaultGameState();
    const targetLevel = Math.min(
        HERO_MAX_LEVEL,
        Math.max(1, Math.floor(Number(hero.level) || 1))
    );
    let candidateIndex = -1;
    const comparisonHeroes = defaults.mHero
        .map(heroKey => defaults[heroKey])
        .filter(isHeroEligibleForDifficulty)
        .map((defaultHero, referenceIndex) => {
            const isCandidate = defaultHero.name === hero.name
                && defaultHero.dispName === hero.dispName;

            if (isCandidate) {
                candidateIndex = referenceIndex;
                return hero;
            }

            return buildDifficultyReferenceHero(defaultHero, targetLevel);
        });

    if (candidateIndex < 0) {
        candidateIndex = comparisonHeroes.length;
        comparisonHeroes.push(hero);
    }

    if (comparisonHeroes.length < 2) return 3;

    const allMetrics = comparisonHeroes.map(getHeroDifficultyMetrics);
    const effectiveHpValues = allMetrics.map(metrics => metrics.effectiveHp);
    const dpsValues = allMetrics.map(metrics => metrics.expectedDps);
    const fireRateValues = allMetrics.map(metrics => metrics.shotsPerSecond);
    const mechanicValues = allMetrics.map(metrics => metrics.mechanicBurden);
    const rawDifficultyValues = allMetrics.map(metrics => (
        normalizeHeroDifficultyMetric(metrics.effectiveHp, effectiveHpValues, true)
            * HERO_DIFFICULTY_MODEL.survivalWeight
        + normalizeHeroDifficultyMetric(metrics.expectedDps, dpsValues, true)
            * HERO_DIFFICULTY_MODEL.damageWeight
        + normalizeHeroDifficultyMetric(metrics.shotsPerSecond, fireRateValues, true)
            * HERO_DIFFICULTY_MODEL.fireRateWeight
        + normalizeHeroDifficultyMetric(metrics.mechanicBurden, mechanicValues, false)
            * HERO_DIFFICULTY_MODEL.mechanicWeight
    ));
    const minimumDifficulty = Math.min(...rawDifficultyValues);
    const maximumDifficulty = Math.max(...rawDifficultyValues);

    if (maximumDifficulty - minimumDifficulty < 1e-9) return 3;

    const normalizedDifficulty = (
        rawDifficultyValues[candidateIndex] - minimumDifficulty
    ) / (maximumDifficulty - minimumDifficulty);

    return Math.round((1 + (4 * clampHeroDifficultyValue(normalizedDifficulty))) * 10) / 10;
}

function migrateGameState(savedState) {
    const defaults = getDefaultGameState();
    if (!isPlainObject(savedState)) return defaults;

    const migrated = { ...defaults, ...savedState };
    migrated.schemaVersion = GAME_STATE_VERSION;
    migrated.lastCompletedLevel = Number.isFinite(savedState.lastCompletedLevel)
        ? Math.max(0, Math.floor(savedState.lastCompletedLevel))
        : defaults.lastCompletedLevel;
    migrated.skillPoints = Number.isFinite(savedState.skillPoints)
        ? Math.max(0, savedState.skillPoints)
        : defaults.skillPoints;
    migrated.zlata = Number.isFinite(savedState.zlata)
        ? Math.max(0, savedState.zlata)
        : defaults.zlata;

    // Добавляем новых героев из текущей версии, сохраняя пользовательских из
    // старого сохранения. Отсутствующие поля героя берём из нового шаблона.
    const savedHeroes = Array.isArray(savedState.mHero)
        ? savedState.mHero.filter(heroKey => typeof heroKey === 'string')
        : [];
    migrated.mHero = [...new Set([...defaults.mHero, ...savedHeroes])];

    migrated.mHero.forEach(heroKey => {
        const defaultHero = defaults[heroKey];
        const savedHero = savedState[heroKey];

        if (isPlainObject(defaultHero)) {
            migrated[heroKey] = {
                ...defaultHero,
                ...(isPlainObject(savedHero) ? savedHero : {})
            };

            if (
                isPlainObject(savedHero) &&
                Number.isInteger(defaultHero.balanceRevision) &&
                savedHero.balanceRevision !== defaultHero.balanceRevision
            ) {
                migrated[heroKey] = {
                    ...migrated[heroKey],
                    ...rebuildBalancedHero(defaultHero, savedHero)
                };
            }

            Object.keys(defaultHero).forEach(field => {
                if (typeof defaultHero[field] === 'number' && !Number.isFinite(migrated[heroKey][field])) {
                    migrated[heroKey][field] = defaultHero[field];
                }
            });

            // Текст особенности всегда из актуальных дефолтов
            if (typeof defaultHero.feature === 'string') {
                migrated[heroKey].feature = defaultHero.feature;
            }

            migrated[heroKey].startCastleDamageReduction = Math.min(
                getHeroDefenseCap(migrated[heroKey]),
                Math.max(0, migrated[heroKey].startCastleDamageReduction)
            );

            if (Number.isFinite(migrated[heroKey].level)) {
                migrated[heroKey].level = Math.min(
                    HERO_MAX_LEVEL,
                    Math.max(1, Math.floor(migrated[heroKey].level))
                );
                migrated[heroKey].zlataUp = getHeroUpgradeCost(migrated[heroKey].level);
                if (!Number.isFinite(savedHero?.investedZlata)) {
                    migrated[heroKey].investedZlata = getHeroInvestedZlata(migrated[heroKey].level);
                } else {
                    migrated[heroKey].investedZlata = Math.max(
                        0,
                        Math.floor(savedHero.investedZlata)
                    );
                }
            }
        } else if (!isPlainObject(savedHero)) {
            delete migrated[heroKey];
        }
    });

    const savedTimes = isPlainObject(savedState.levelTimes) ? savedState.levelTimes : {};
    migrated.levelTimes = {};
    Object.entries(savedTimes).forEach(([level, time]) => {
        const levelNumber = Number(level);
        if (Number.isInteger(levelNumber) && levelNumber > 0 && Number.isFinite(time) && time >= 0) {
            migrated.levelTimes[levelNumber] = time;
        }
    });

    if (typeof migrated.activeHero !== 'string' || !isPlainObject(migrated[migrated.activeHero])) {
        migrated.activeHero = defaults.activeHero;
    }

    return migrated;
}

// 2. Сохранение
function saveGameState() {
    return persistGameState(gameState);
}

// 3. Безопасное чтение без изменения текущего gameState
function loadGameState() {
    const saved = readStoredGameState();
    return saved ? migrateGameState(saved) : null;
}

// 4. Очистка (для отладки)
function clearGameState() {
    try {
        localStorage.removeItem(GAME_STATE_STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Не удалось очистить игровой прогресс.', error);
        return false;
    }
}

function unlockAllLevelsForDebug(secret, maxAvailableLevel) {
    if (secret !== DEBUG_UNLOCK_SECRET) {
        return { success: false, reason: 'invalid-secret' };
    }

    const normalizedMaxLevel = Number(maxAvailableLevel);
    if (!Number.isInteger(normalizedMaxLevel) || normalizedMaxLevel < 1) {
        return { success: false, reason: 'invalid-level-count' };
    }

    const previousCompletedLevel = gameState.lastCompletedLevel;
    const previousZlata = gameState.zlata;

    gameState.lastCompletedLevel = Math.max(gameState.lastCompletedLevel, normalizedMaxLevel);
    gameState.zlata += DEBUG_ZLATA_REWARD;

    if (!saveGameState()) {
        gameState.lastCompletedLevel = previousCompletedLevel;
        gameState.zlata = previousZlata;
        return { success: false, reason: 'save-failed' };
    }

    return {
        success: true,
        unlockedThrough: normalizedMaxLevel,
        reward: DEBUG_ZLATA_REWARD,
        totalZlata: gameState.zlata
    };
}

// 5. Обновление уровня
function completeLevel() {
	
	saveLevelTime(lvlNumber, timeSec2);
    if (lvlNumber > gameState.lastCompletedLevel) {
        gameState.lastCompletedLevel = lvlNumber;

		if (typeof levelCompletionConfig !== 'undefined' && levelCompletionConfig.isRegionFinal) {
			const completionMessage = levelCompletionConfig.completionMessage || 'Область пройдена!';
			rowTotal = rowTotal + `<div class="time-line">${completionMessage}</div>`;
		} else {
			rowTotal = rowTotal + `<div class="time-line">Разблокирован уровень ${lvlNumber+1}!</div>`;
		}
        
        gameState.mHero.forEach(heroKey => {
            const hero = gameState[heroKey];
            if (!hero) return;
            
            if (hero.lvlUnlock <= lvlNumber && hero.unlock == false) {
                hero.unlock = true;
				rowTotal = rowTotal + `<div class="time-line">Разблокирован новый герой — ${hero.dispName}!</div>`;	
            }
        }); // Добавлена закрывающая скобка
        
        saveGameState();
    }
}

function addZlat(zlatP) {
   
		gameState.zlata = gameState.zlata + zlatP;       
        saveGameState();
		
}

function getAllHeroUpgradeRefund() {
    const defaults = getDefaultGameState();
    return gameState.mHero.reduce((refund, heroKey) => {
        const hero = gameState[heroKey];
        const defaultHero = defaults[heroKey];
        return Number.isFinite(hero?.level) && Number.isFinite(defaultHero?.level)
            ? refund + (
                Number.isFinite(hero.investedZlata)
                    ? Math.max(0, Math.floor(hero.investedZlata))
                    : getHeroInvestedZlata(hero.level)
            )
            : refund;
    }, 0);
}

function resetAllHeroUpgrades() {
    const refund = getAllHeroUpgradeRefund();
    if (refund <= 0) {
        return { success: true, refund: 0, resetCount: 0 };
    }

    const defaults = getDefaultGameState();
    const previousZlata = gameState.zlata;
    const previousHeroes = {};
    let resetCount = 0;

    gameState.mHero.forEach(heroKey => {
        const currentHero = gameState[heroKey];
        const defaultHero = defaults[heroKey];
        if (!Number.isFinite(currentHero?.level) || !Number.isFinite(defaultHero?.level)) return;

        previousHeroes[heroKey] = currentHero;
        gameState[heroKey] = {
            ...defaultHero,
            unlock: currentHero.unlock
        };
        resetCount++;
    });

    gameState.zlata += refund;

    if (!saveGameState()) {
        gameState.zlata = previousZlata;
        Object.entries(previousHeroes).forEach(([heroKey, hero]) => {
            gameState[heroKey] = hero;
        });
        return { success: false, refund: 0, resetCount: 0 };
    }

    return { success: true, refund, resetCount };
}

function heroUp(heroName, infoMode) {
    const originalHero = gameState[heroName];
    if (!originalHero) {
        console.log('Герой с таким именем не найден:', heroName);
        return;
    }

    if (originalHero.level >= HERO_MAX_LEVEL) return;

    if (!infoMode && gameState.zlata < originalHero.zlataUp) return;

    // Если infoMode, создаём глубокую копию (не трогаем оригинал)
    const hero = infoMode ? JSON.parse(JSON.stringify(originalHero)) : originalHero;

    // Применяем улучшения (копию или оригинал)
    applyHeroPermanentStatUpgrade(hero);

    // Если не infoMode, сохраняем изменения в оригинале
    if (!infoMode) {
		const upgradeCost = hero.zlataUp;
		gameState.zlata = gameState.zlata - upgradeCost;
		hero.investedZlata = (
			Number.isFinite(hero.investedZlata)
				? hero.investedZlata
				: getHeroInvestedZlata(hero.level)
		) + upgradeCost;
		hero.level++;
        hero.zlataUp = getHeroUpgradeCost(hero.level);
        saveGameState();
        return;
    } else {
        // infoMode: возвращаем копию с изменениями
        return hero;
    }
}


function saveLevelTime(level, timeInSeconds) {
	
	const currentTime = gameState.levelTimes[level];
	
	let updRecord = false;
	
	// если записи нет — добавляем
	if (currentTime === undefined) {
		updRecord = true;
		gameState.levelTimes[level] = timeInSeconds;
	}

	// если новое время меньше старого — обновляем
	if (timeInSeconds < currentTime) {
		updRecord = true;
		gameState.levelTimes[level] = timeInSeconds;
		//выводим предыдущее время:
		rowTotal = rowTotal + `<div class="time-line">Лучшее время: <span>${formatTime(currentTime)}</span></div>`;
	}
	

	//если рекород не побит то на этом заканчиваем
	if (!updRecord) {return}

	//если рекород побит то:
	// считаем общую сумму
	let totalScore = 0;

	for (const lvl in gameState.levelTimes) {
		const time = gameState.levelTimes[lvl];

		// 1000 - время, но не меньше 0
		const value = Math.max(0, 600 - time);

		totalScore += value;
	}
	
	const skillPoints = totalScore - gameState.skillPoints;
	
	if (skillPoints > 0) {
		rowTotal = rowTotal + `<div class="time-line">Рекорд побит — очки мастерства: +${skillPoints}!</div>`;
		gameState.skillPoints = gameState.skillPoints+skillPoints;
		saveGameState();
	}
	
}

function createGameState() {
    const savedState = readStoredGameState();
    const initialState = migrateGameState(savedState);

    // Сразу записываем результат миграции: так новые поля появятся в старом
    // сохранении, а повреждённое значение будет заменено рабочим шаблоном.
    persistGameState(initialState);
    return initialState;
}

function getDefaultGameState() {
    return {
			schemaVersion: GAME_STATE_VERSION,
			lastCompletedLevel: 0,			
			levelTimes: {
	          },
			skillPoints: 0,			  
			mHero: ['eremei', 'dunya', 'luka', 'kim', 'vas', 'gen', 'gm', 'kir', 'gam', 'gama','gamb','gamc', 'gamd','game','gamf', 'gamg', 'gamh', ],
			activeHero: 'eremei',
			zlata: 0, 
			eremei: {
				balanceRevision: 7,
				name: 'eremei', 
				permanentGrowthProfile: 'guardian',
				dispName: 'Еремей Дуболом',
				image: 'images/hero/2_eremei/eremei_min.png',
				fullImage: 'images/hero/2_eremei/eremei_full.png',
				level: 1,
				startGlobalDamage: 158.4,
				startGlobalCritChance: 0.045,
				startGlobalCritMultiplier: 2.1,
				startGlobalWoundChance	: 0.015,
				startCastleDamageReduction : 0.075,
				startSHOT_INTERVAL : 970,
				castleHP : 188,
				lvlUnlock: 1,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1, 	
				feature: 'Лови обратно — <br>после получения урона<br>шанс крита +10%<br>на следующие 3 секунды',
				unlock: true,
				catchBackCritChanceBonus: 0.10,
				catchBackDurationMs: 3000,
			},
			
			
			dunya: {
				balanceRevision: 6,
				name: 'dunya', 
				permanentGrowthProfile: 'tempest',
				dispName: 'Ветроманка Дуня',
				image: 'images/hero/1_babka/dunya_min.png',
				fullImage: 'images/hero/1_babka/dunya_full.png',
				level: 1,
				startGlobalDamage: 112.5,
				startGlobalCritChance: 0.03,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0.015,
				startCastleDamageReduction : 0.03,
				startSHOT_INTERVAL : 940,
				castleHP : 120,
				lvlUnlock: 2,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1, 
				unlock: true,
				feature: 'Раскрутилась — <br>10% шанс двойной атаки,<br>3% шанс тройной атаки<br>и 1% шанс: восьмикратного урона!',
				doubleAttackChance: 0.10,
				tripleAttackChance: 0.03,
				jackpotAttackChance: 0.01,
				jackpotAttackMultiplier: 8,
			},
			
			luka: {
				balanceRevision: 6,
				name: 'luka', 
				permanentGrowthProfile: 'marksman',
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				fullImage: 'images/hero/3_luka/luka_full.png',
				level: 1,
				startGlobalDamage: 105,
				startGlobalCritChance: 0.015,
				startGlobalCritMultiplier: 2.2,
				startGlobalWoundChance	: 0.03,
				startCastleDamageReduction : 0.015,
				startSHOT_INTERVAL : 800,
				castleHP : 75,
				lvlUnlock: 3,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: true,
				feature: 'Считалочка — <br>каждый 5-й выстрел по боссу<br> гарантированно критический',
				guaranteedCritEvery: 5,
			},
			
			kim: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 300,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 30,
				unlock: false,
			},
			
			
			vas: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 40,
				unlock: false,
			},
			
			
			gen: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 50,
				unlock: false,
			},
			
			gm: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 60,
				unlock: false,
			},
			
			kir: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 70,
				unlock: false,
			},
			
			gam: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 80,
				unlock: false,
			},
			
			gama: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 90,
				unlock: false,
			},
			
			gamb: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 100,
				unlock: false,
			},
			
			gamc: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 110,
				unlock: false,
			},
			
			gamd: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 120,
				unlock: false,
			},
			
			gamf: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 130,
				unlock: false,
			},
			
			gamg: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 140,
				unlock: false,
			},
			
			gamh: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 141,
				unlock: false,
			},
				
			}; // дефолт
}
