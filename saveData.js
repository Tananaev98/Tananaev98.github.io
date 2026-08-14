// ==================== Сохранение и загрузка прогресса ====================

const GAME_STATE_STORAGE_KEY = 'gameState';
const GAME_STATE_VERSION = 7;
const MAX_CASTLE_DAMAGE_REDUCTION = 0.60;
const CAMPAIGN_FINAL_LEVEL = 141;
const HERO_MAX_LEVEL = 200;
const LEVEL_REWARD_SCALE = 3;
const REGION_FINAL_FIRST_CLEAR_ZLATA_MULTIPLIER = 10;
const HERO_UPGRADE_BASE_COST = 10;
const HERO_UPGRADE_COST_GROWTH = 1.06;
// Ревизия 10: убран движковый хак «погасить легаси +5%/уровень, наложить свою кривую
// поверх» — он делил РЕАЛЬНЫЙ configuredAttackDamage (customDamage/baseDamage из lvlData)
// на растущий множитель, хотя в самих файлах уровней никакого «уже заложенного +5%/уровень»
// на самом деле нет: baseDamage — константа (напр. 20) хоть на 1 уровне, хоть на 26-м, не
// растёт вообще. Легаси-деление было пустым домыслом и на практике просто искусственно
// душило реальный урон с ростом levelNumber, а add-on кривая (getBossDamageProgressionMultiplier)
// частично это компенсировала — суммарно давало почти нечитаемую, случайно почти-плоскую
// кривую урона, не имеющую отношения к тому, что реально в данных. Настоящая прогрессия
// сложности УЖЕ живёт в данных уровня: bossCombatConfig.damageMultiplier (level-wide),
// bossCombatConfig.bosses[x].damageMultiplier (per-boss) и phase.damage (per-phase) — они
// подаются сюда как bossMultiplier/phaseMultiplier/levelMultiplier и честно перемножаются
// (см. calculateBossAttackDamage).
// Ревизия 11: убран maxCombatMultiplier (потолок 2.0) — он глушил рост damageMultiplier
// в данных примерно с ~26–35 уровня кампании, хотя в lvlData множитель продолжал расти.
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
    // Ревизия 10 (живучесть): HP/защита растут всю кампанию вместе с uncapped
    // damageMultiplier боссов, чтобы держать ~12/9/7/5 сильнейших ударов (см. fit-survivability.js).
    guardian: Object.freeze({
        damageMultiplier: 1.042,
        critChanceIncrease: 0.003,
        critMultiplierIncrease: 0.10,
        woundChanceIncrease: 0.003,
        shotIntervalReduction: 1,
        castleHpMultiplier: 1.049,
        defenseIncrease: 0.002,
        defenseCap: 0.177
    }),
    // С ревизии на которой Дарьяна перешла на профиль ember, tempest используется только
    // Дуней — модифицировать его напрямую безопасно, отдельный профиль не нужен.
    // Ревизия 8: Дуня переведена на архетип «скорость, не разовый урон» — см. подробное
    // обоснование у объекта dunya. shotIntervalReduction поднят с 2 до 4.7 (у Луки — 5,
    // это и есть «почти как у Луки»), damageMultiplier опущен с 1.052 до 1.030 (разовый
    // урон растёт заметно медленнее). critChanceIncrease/woundChanceIncrease теперь ни на
    // что не влияют (см. critChanceCap/woundChanceCap у dunya — оба совпадают со стартом,
    // поэтому редиректы применяются с 1 же прокачки) — оставлены только для читаемости.
    // Ревизия 10 (живучесть): см. guardian выше.
    tempest: Object.freeze({
        damageMultiplier: 1.030,
        critChanceIncrease: 0.0035,
        critMultiplierIncrease: 0.012,
        woundChanceIncrease: 0,
        shotIntervalReduction: 4.7,
        castleHpMultiplier: 1.049,
        defenseIncrease: 0.001,
        defenseCap: 0.162
    }),
    // Ревизия 10 (живучесть): Лука снова растёт по HP/защите (раньше был заморожен),
    // чтобы держать ~5 сильнейших ударов на фоне uncapped урона боссов.
    marksman: Object.freeze({
        damageMultiplier: 1.029,
        critChanceIncrease: 0.008,
        critMultiplierIncrease: 0.12,
        woundChanceIncrease: 0.012,
        shotIntervalReduction: 5,
        castleHpMultiplier: 1.045,
        defenseIncrease: 0.002,
        defenseCap: 0.196
    }),
    // Дарьяна: рост почти целиком через урон, крит растёт нарочно медленно (см. объект
    // daryana ниже) — ни один из трёх базовых профилей так не устроен, поэтому это
    // отдельный профиль, а не переиспользование tempest (который также использует Дуня
    // и трогать его ради Дарьяны нельзя).
    ember: Object.freeze({
        damageMultiplier: 1.061,
        critChanceIncrease: 0.0017,
        critMultiplierIncrease: 0.017,
        woundChanceIncrease: 0.006,
        shotIntervalReduction: 2,
        // Ревизия 10 (живучесть): см. guardian выше.
        castleHpMultiplier: 1.047,
        defenseIncrease: 0.002,
        defenseCap: 0.228
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

// Потолки на % и HP-статы героя — в отличие от defenseCap (общий на архетип/профиль),
// это поля НА САМОМ герое: разным героям одного профиля можно задать разные потолки.
// Герой без явного поля (например, служебные заглушки kim/vas/gam... в mHero) остаётся
// без потолка — 1 для шансов, Infinity для HP — чтобы не ломать то, что раньше росло
// свободно.
function getHeroCritChanceCap(hero) {
    return Number.isFinite(hero?.critChanceCap) ? Math.min(1, hero.critChanceCap) : 1;
}

function getHeroWoundChanceCap(hero) {
    return Number.isFinite(hero?.woundChanceCap) ? Math.min(1, hero.woundChanceCap) : 1;
}

function getHeroCastleHpCap(hero) {
    return Number.isFinite(hero?.castleHpCap) && hero.castleHpCap > 0 ? hero.castleHpCap : Infinity;
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

// Ревизия 10: levelNumber больше не используется (см. комментарий ревизии 10 выше у
// прежнего BOSS_DAMAGE_BALANCE) — параметр оставлен в сигнатуре, чтобы не трогать вызовы
// в game.js/скриптах, которые продолжают его передавать; вся прогрессия сложности
// приходит через bossMultiplier/phaseMultiplier/levelMultiplier — то есть напрямую из
// данных уровня.
// Ревизия 11: без потолка на произведение множителей.
function calculateBossAttackDamage(
    configuredAttackDamage,
    bossMultiplier,
    phaseMultiplier,
    levelMultiplier
) {
    const combatMultiplier = Math.max(0, Number(bossMultiplier) || 0)
        * Math.max(0, Number(phaseMultiplier) || 0)
        * Math.max(0, Number(levelMultiplier) || 0);

    return Math.max(1, Math.round(
        Math.max(0, Number(configuredAttackDamage) || 0)
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

// Каждый шаг качает пару статов. Если один из пары уже упёрся в свой потолок
// (critChanceCap/woundChanceCap/castleHpCap на герое, defenseCap по профилю), прирост
// этого шага не пропадает впустую — второй стат пары получает его ЕЩЁ РАЗ. Так героя
// нельзя "перекачать" сверх задуманного по одной оси ценой недокачки по другой —
// вместо этого рост перетекает туда, где ещё есть куда расти.
function applyHeroPermanentStatUpgrade(hero) {
    const growth = getHeroPermanentGrowth(hero);

    if (hero.upSpecif === 1) {
        const critChanceCap = getHeroCritChanceCap(hero);
        const critChanceCapped = hero.startGlobalCritChance >= critChanceCap;

        hero.startGlobalDamage *= growth.damageMultiplier;
        if (!critChanceCapped) {
            hero.startGlobalCritChance = Math.min(
                critChanceCap,
                hero.startGlobalCritChance + growth.critChanceIncrease
            );
        } else {
            hero.startGlobalDamage *= growth.damageMultiplier;
        }
        hero.upSpecif = 2;
    } else if (hero.upSpecif === 2) {
        const woundChanceCap = getHeroWoundChanceCap(hero);
        const woundChanceCapped = hero.startGlobalWoundChance >= woundChanceCap;

        hero.startGlobalCritMultiplier += growth.critMultiplierIncrease;
        if (!woundChanceCapped) {
            hero.startGlobalWoundChance = Math.min(
                woundChanceCap,
                hero.startGlobalWoundChance + growth.woundChanceIncrease
            );
        } else {
            hero.startGlobalCritMultiplier += growth.critMultiplierIncrease;
        }
        hero.upSpecif = 3;
    } else if (hero.upSpecif === 3) {
        // Личный «пол» интервала (например, у Дарьяны — не про скорость)
        // может быть строже общего технического минимума 200мс.
        hero.startSHOT_INTERVAL = Math.max(
            hero.minShotInterval ?? 200,
            hero.startSHOT_INTERVAL - growth.shotIntervalReduction
        );
        hero.upSpecif = 4;
    } else if (hero.upSpecif === 4) {
        const castleHpCap = getHeroCastleHpCap(hero);
        const defenseCap = getHeroDefenseCap(hero);
        const castleHpCapped = hero.castleHP >= castleHpCap;
        const defenseCapped = hero.startCastleDamageReduction >= defenseCap;

        if (!castleHpCapped) {
            hero.castleHP = Math.min(
                castleHpCap,
                hero.castleHP + Math.floor(hero.castleHP * (growth.castleHpMultiplier - 1))
            );
        }
        if (!defenseCapped) {
            hero.startCastleDamageReduction = Math.min(
                defenseCap,
                hero.startCastleDamageReduction + growth.defenseIncrease
            );
        }
        if (castleHpCapped && !defenseCapped) {
            hero.startCastleDamageReduction = Math.min(
                defenseCap,
                hero.startCastleDamageReduction + growth.defenseIncrease
            );
        } else if (defenseCapped && !castleHpCapped) {
            hero.castleHP = Math.min(
                castleHpCap,
                hero.castleHP + Math.floor(hero.castleHP * (growth.castleHpMultiplier - 1))
            );
        }
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
    const catchBackExpectedUptime = Number.isFinite(hero.catchBackExpectedUptime)
        ? hero.catchBackExpectedUptime
        : HERO_DIFFICULTY_MODEL.eremeiExpectedCatchBackUptime;
    const catchBackCritChance = catchBackCritBonus * catchBackExpectedUptime;
    const guaranteedCritEvery = Math.max(0, Math.floor(Number(hero.guaranteedCritEvery) || 0));
    const guaranteedCritShare = guaranteedCritEvery > 0 ? 1 / guaranteedCritEvery : 0;
    const effectiveCritChance = guaranteedCritShare + (
        (1 - guaranteedCritShare) * clampHeroDifficultyValue(
            ordinaryCritChance + catchBackCritChance
        )
    );
    const critMultiplier = Math.max(1, Number(hero.startGlobalCritMultiplier) || 1);
    const critFactor = 1 + (effectiveCritChance * (critMultiplier - 1));
    // Дамаг-фичи, матчатся по наличию поля способности, а не по имени героя — любой будущий
    // герой с уже описанной здесь механикой подхватится автоматически, без правок теста.
    // Если появится принципиально новая механика (не сводится ни к одной из формул ниже),
    // для неё нужен новый термин здесь — это тот самый случай из раздела 11 правил.
    //
    // 1) Нарастание по числу ударов подряд по одной цели (например, старое «Прогревание»):
    //    среднее число ударов по цели за бой × прирост за удар.
    const warmupDamagePerHit = Math.max(0, Number(hero.warmupDamagePerHit) || 0);
    const warmupExpectedAverageHits = Number.isFinite(hero.warmupExpectedAverageHits)
        ? hero.warmupExpectedAverageHits
        : 10;
    const warmupMultiplier = warmupDamagePerHit > 0
        ? 1 + (warmupDamagePerHit * warmupExpectedAverageHits)
        : 1;
    // 2) Нарастание по недостающему HP% цели (например, «Добивание» Дарьяны): средняя доля
    //    недостающего HP за бой (0..1) × прирост за 1% недостающего HP × 100.
    const missingHpDamagePerPercent = Math.max(0, Number(hero.missingHpDamagePerPercent) || 0);
    const missingHpExpectedAverageFraction = Number.isFinite(hero.missingHpExpectedAverageFraction)
        ? hero.missingHpExpectedAverageFraction
        : 0.425;
    const missingHpMultiplier = missingHpDamagePerPercent > 0
        ? 1 + (missingHpDamagePerPercent * 100 * missingHpExpectedAverageFraction)
        : 1;
    const damageFeatureMultiplier = warmupMultiplier * missingHpMultiplier;
    const baseAverageHitDamage = Math.max(0, Number(hero.startGlobalDamage) || 0)
        * critFactor
        * damageFeatureMultiplier;
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

            // Пути к картинкам — игровой ассет, а не прогресс игрока: старое
            // сохранение не должно навсегда фиксировать устаревший путь/формат.
            if (typeof defaultHero.image === 'string') {
                migrated[heroKey].image = defaultHero.image;
            }
            if (typeof defaultHero.fullImage === 'string') {
                migrated[heroKey].fullImage = defaultHero.fullImage;
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
    const previousHeroUnlocks = {};

    gameState.lastCompletedLevel = Math.max(gameState.lastCompletedLevel, normalizedMaxLevel);
    gameState.zlata += DEBUG_ZLATA_REWARD;

    let unlockedHeroes = 0;
    gameState.mHero.forEach(heroKey => {
        const hero = gameState[heroKey];
        if (!hero || typeof hero !== 'object') return;
        previousHeroUnlocks[heroKey] = hero.unlock;
        if (hero.unlock !== true) {
            hero.unlock = true;
            unlockedHeroes++;
        }
    });

    if (!saveGameState()) {
        gameState.lastCompletedLevel = previousCompletedLevel;
        gameState.zlata = previousZlata;
        Object.keys(previousHeroUnlocks).forEach(heroKey => {
            if (gameState[heroKey]) {
                gameState[heroKey].unlock = previousHeroUnlocks[heroKey];
            }
        });
        return { success: false, reason: 'save-failed' };
    }

    return {
        success: true,
        unlockedThrough: normalizedMaxLevel,
        unlockedHeroes,
        reward: DEBUG_ZLATA_REWARD,
        totalZlata: gameState.zlata
    };
}

// 5. Обновление уровня
// Возвращает true, если это первое прохождение финального уровня области
// (используется для одноразового бонуса x10 к златам — см. showEndGameModal).
function completeLevel() {

	saveLevelTime(lvlNumber, timeSec2);
    let firstRegionFinalClear = false;
    if (lvlNumber > gameState.lastCompletedLevel) {
        gameState.lastCompletedLevel = lvlNumber;

		if (typeof levelCompletionConfig !== 'undefined' && levelCompletionConfig.isRegionFinal) {
			firstRegionFinalClear = true;
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
    return firstRegionFinalClear;
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
			mHero: ['eremei', 'daryana', 'luka', 'dunya', 'kim', 'vas', 'gen', 'gm', 'kir', 'gam', 'gama','gamb','gamc', 'gamd','game','gamf', 'gamg', 'gamh', ],
			activeHero: 'eremei',
			zlata: 0, 
			eremei: {
				balanceRevision: 10,
				name: 'eremei',
				permanentGrowthProfile: 'guardian',
				dispName: 'Еремей Дуболом',
				image: 'images/hero/2_eremei/eremei_min.webp',
				fullImage: 'images/hero/2_eremei/eremei_full.webp',
				level: 1,
				// Ревизия 8: старый баг «Лука теряет преимущество по DPS на уровне героя 1»
				// (базовый урон Еремея давал ему 184 DPS против 172 у Луки уже на старте,
				// хотя лучший постоянный DPS — архетипная черта Луки, см. раздел 2 правил) —
				// урон снижен со 158.4 до 140, чтобы Лука вёл по DPS на КАЖДОЙ контрольной
				// точке (1/40/80/120/160/200), а не только начиная с 40-го уровня. Крит
				// Еремея (startGlobalCritMultiplier×damage) по-прежнему превосходит крит
				// Луки минимум на 15% на всех точках — соответствующий assert не пострадал.
				startGlobalDamage: 140,
				startGlobalCritChance: 0.045,
				startGlobalCritMultiplier: 2.1,
				startGlobalWoundChance	: 0.015,
				// Ревизия 10 (живучесть): HP/защита растут всю кампанию вслед за uncapped
				// уроном боссов. Цель — ~12 сильнейших ударов на каждом уровне кампании
				// при focused-прокачке (см. scripts/fit-survivability.js). На 1 уровне
				// допускается 11 вместо 12 из‑за округления.
				startCastleDamageReduction : 0.097,
				startSHOT_INTERVAL : 970,
				// Ревизия 12: minShotInterval == старту, по образцу Дарьяны (см. её
				// комментарий ниже) — Еремей архетипно «тяжёлый редкий удар», а не скорость.
				// Без этого лока временный апгрейд «скорость атаки» (после починки формулы —
				// см. game.js/getAvailableUpgrades) стакался у него вплоть до общего пола
				// 200мс, превращая его в скорострела и ломая архетип. Теперь тип апгрейда
				// «скорость атаки» ему вообще не предлагается — сила только через
				// damage/crit, как и задумано.
				minShotInterval: 970,
				castleHP : 336,
				lvlUnlock: 1,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				feature: 'Лови обратно — <br>после получения урона<br>шанс крита +10%<br>на следующие 3 секунды',
				unlock: true,
				catchBackCritChanceBonus: 0.10,
				catchBackDurationMs: 3000,
				// Допущение для автотестов/расчёта сложности: доля времени боя, в течение
				// которого бонус крита от «Лови обратно» считается активным (см. также
				// HERO_DIFFICULTY_MODEL.eremeiExpectedCatchBackUptime — общий дефолт на случай
				// отсутствия этого поля у героя).
				catchBackExpectedUptime: 0.45,
				critChanceCap: 0.19,
				woundChanceCap: 0.155,
				// Потолок чуть выше HP на герое 200 при focused-кривой — постоянная
				// прокачка не упирается раньше конца. Временные HP-апгрейды ограничены
				// отдельно в game.js (~+25% от старта забега), чтобы высокий cap не
				// раздувал живучесть внутри одного уровня.
				castleHpCap: 3500,
				// Ревизия 11 (DPS с временными улучшениями — см. game.js/getAvailableUpgrades):
				// сила Еремея — немногочисленные, но огромные ПОСТОЯННЫЕ криты (см.
				// критChanceCap/catchBack выше), а не стак множества мелких временных
				// баффов за забег — поэтому temporaryUpgradePower чуть НИЖЕ базы (было
				// 1.61x DPS Дуни при среднем по 4 стратегиям вместо целевых ~0.95x, см.
				// подгонку в истории коммита). Не трогает постоянный DPS и HP/защиту —
				// см. точки применения в game.js.
				// Ревизия 12: заблокировали ему тип апгрейда «скорость атаки» (см.
				// minShotInterval выше — архетип «тяжёлый удар», не скорость). Без этой
				// оси вся сила апгрейдов концентрируется в critMultiplier/damage — отклик
				// на power оказался очень нелинейным (реальный бой, не аналитика): 1.66 →
				// 1.13x Дуни в среднем (обгонял в 59% прогонов, слишком часто), 1.25 → 0.80x
				// (обгонял только в 1.4% — для героя с акцентом на большие редкие криты
				// слишком редко), 1.45 → 0.948x (по факту цель была −5%, а не −8%). После
				// того как подняли power Дуни (см. её комментарий — финально 2.1, компромисс
				// «разрыв ~15%/обгон ~30-35%» с Дарьяной), у Еремея тот же эффект: любое
				// изменение power Дуни двигает и его отставание от неё при том же power —
				// подстроено вслед, до 1.5. Подтверждено реальным боем панели (141
				// уровень): −9.4% от Дуни, обгон 12.8% («редкий крупный крит»). Не трогает
				// постоянный DPS и HP/защиту.
				temporaryUpgradePower: 1.5,
			},
			
			
			// Ревизия 8: архетип пересобран под «скорость вместо разового урона» — казино-
			// джекпот остаётся её фирменной чертой, но фоновый бой теперь строится на частых
			// слабых ударах, а не на сильных редких. startGlobalDamage опущен со 132.5 до 97
			// (разовый удар заметно ниже, чем был), startSHOT_INTERVAL — с 940 до 808мс
			// (почти вплотную к стартовым 800мс Луки). critChanceCap опущен до 0.03 — это
			// ровно стартовый шанс крита, поэтому крит-чанс у неё вообще не растёт: любая
			// прокачка, которая шла бы в крит-шанс, с 1 же прокачки редиректится во второй
			// прямой урон (см. applyHeroPermanentStatUpgrade) — компенсирует низкий
			// startGlobalDamage не критом, а стабильным приростом самого удара. Новый
			// профиль tempest (shotIntervalReduction 4.7 против прежних 2, почти как 5 у
			// Луки) — интервал продолжает падать весь забег и к 200 уровню доходит до пола
			// minShotInterval 585мс (у Луки на 200 уровне интервал естественно ~550мс, т.е.
			// без искусственного пола) — Дуня быстрее почти как Лука, но не быстрее.
			// Цель ревизии: DPS Дуни ~90% (примерно на 10% ниже) DPS Дарьяны на всех
			// контрольных уровнях героя (1/40/80/120/160/200). Аналитическим расчётом
			// (та же формула, что в scripts/balance-report.js/expectedDps) коридор получился
			// 89.3–94.4% от DPS Дарьяны — без выхода за пределы ни на одной точке.
			// startGlobalDamage 95 не подошёл: на 135 уровне кампании (герой ур. 153)
			// suvival-время убийства самого жирного босса в scripts/balance-report.js
			// (симуляция временных улучшений, RUNS=5000) стабильно доходило до 91с — за
			// пределами дизайн-коридора «любой босс ≤90с» (row.longestBoss). Причина —
			// critChanceCap==старту убирает у Дуни весь тип временного апгрейда «шанс
			// крита» на весь забег, снижая гибкость внутри одного прохождения (тот же
			// эффект, что раньше не позволял урезать крит-рост Дарьяны ниже некоторого
			// предела — см. её комментарий). 97 держит это время на стабильных 89с.
			// woundChanceCap уже 0 (ревизия 7 сняла ранение целиком) — оставлено, редирект
			// по этой оси идёт в critMultiplier с самого начала, см. tempest.
			dunya: {
				balanceRevision: 10,
				name: 'dunya',
				permanentGrowthProfile: 'tempest',
				dispName: 'Ветроманка Дуня',
				image: 'images/hero/1_babka/dunya_min.webp',
				fullImage: 'images/hero/1_babka/dunya_full.webp',
				level: 1,
				startGlobalDamage: 97,
				startGlobalCritChance: 0.03,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0,
				// Ревизия 10 (живучесть): цель ~9 сильнейших ударов по всей кампании.
				startCastleDamageReduction : 0.122,
				startSHOT_INTERVAL : 808,
				minShotInterval: 585,
				castleHP : 248,
				lvlUnlock: 15,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: false,
				feature: 'Раскрутилась — <br>10% шанс двойной атаки,<br>3% шанс тройной атаки<br>и 1% шанс: восьмикратного урона!',
				doubleAttackChance: 0.10,
				tripleAttackChance: 0.03,
				jackpotAttackChance: 0.01,
				jackpotAttackMultiplier: 8,
				// Потолки % и HP-статов — см. подробное обоснование у объекта eremei.
				// critChanceCap == стартовому крит-шансу (см. комментарий выше про редирект).
				critChanceCap: 0.03,
				woundChanceCap: 0,
				castleHpCap: 2600,
				// Ревизия 11 (DPS с временными улучшениями — см. game.js/getAvailableUpgrades
				// и temporaryUpgradePower у объекта eremei выше): у Дуни critChanceCap==старту
				// (см. выше) — она не может брать «шанс крита», и без компенсации это резко
				// урезало её потолок стакинга временных апгрейдов по сравнению с Лукой (её
				// постоянный DPS в порядке, разъезжалось только под апгрейдами). Подняли
				// power, чтобы «если вихри напрокают много» (казино-механика) она могла на
				// удачных забегах обгонять всех, а в среднем держалась чуть ниже Дарьяны — не
				// трогает постоянный DPS и HP/защиту.
				// Ревизия 12: на 2.4 Дуня обгоняла Дарьяну по ДПС с временными улучшениями
				// в 55% прогонов (реальный бой панели баланса, 141 уровень) — это уже не
				// «если сильно повезёт», а почти монетка. У Дуни казино-механика (вихри/
				// джекпот) даёт заметно более «толстый хвост» удачи, чем у остальных героев,
				// поэтому обгон снижался куда медленнее среднего разрыва. Промежуточная
				// правка 1.9 пересадила слишком сильно (в среднем −22% от Дарьяны), а 2.3
				// (−8.8%) решала разрыв, но обгон остался почти монеткой (47.5% реальным
				// боем) — джекпот у Дуни настолько «толстохвостый», что при разрыве ≤10%
				// обгон физически не опускается ниже ~47%. По выбору пользователя —
				// компромисс «разрыв ~15% / обгон ~30-35%» (не нерфим Дарьяну/Луку, только
				// поднимаем Дуню/Еремея). 2.1 подтверждено реальным боем панели (141
				// уровень): −16.0% от Дарьяны, обгон 34.8%. Не трогает постоянный DPS.
				temporaryUpgradePower: 2.1,
			},

			// Дарьяна — «Прогревание»: урон растёт с недостающим HP% цели — за каждый
			// недостающий 1% HP урон +1.5% (см. missingHpDamagePerPercent, применяется в
			// game.js через getDaryanaMissingHpMultiplier — читает live target.hp/maxHP,
			// состояние между ударами не хранится). Название способности вернули прежним
			// (было временно «Добивание» на ревизии 5), сама механика — недостающий HP% —
			// не изменилась. Занимает стартовый слот Дуни — открыта с самого начала.
			// missingHpExpectedAverageFraction — допущение для расчёта среднего DPS в
			// автотестах (тот же приём, что и catchBackExpectedUptime у Еремея). Способность
			// самоусиливается: чем меньше HP у цели, тем быстрее падает следующий процент,
			// поэтому среднее недостающее HP% за бой МЕНЬШЕ плоских 50% (середины линейного
			// падения). ODE-оценка при равномерном базовом уроне и множителе
			// 1+1.5×missingFraction даёт среднее ≈42.5% — отсюда 0.425.
			//
			// Ревизия 6: цель — держать DPS Дарьяны не более чем на 10% ниже Луки на ВСЕХ
			// стадиях (уровни героя 1/40/80/120/160/200), а не в старом коридоре 65–90%.
			// По условию силу нужно брать НЕ скоростью (интервал/minShotInterval не тронуты)
			// и НЕ критом (наоборот, крит-рост урезан), а большим обычным уроном — поэтому:
			// - startGlobalDamage поднят с 82.4 до 91.9;
			// - критChance/критMultiplier как стартовые значения не менялись (2%/2.0), но
			//   их РОСТ за уровень урезан отдельным профилем ember (см. выше): было бы через
			//   tempest critMultiplierIncrease 0.09 и critChanceIncrease 0.007 — стало 0.017
			//   и 0.0017, чтобы к 200 уровню крит остался скромным (≈4.4×/22% против ~8.2×/
			//   41.5% у Луки на этом же уровне), а не был вторым источником силы;
			// - damageMultiplier профиля ember (1.061) выше, чем у tempest (1.037), — именно
			//   рост урона компенсирует то, что скорость Дарьяны рано упирается в личный пол
			//   940мс (после чего "выстрелы/сек" перестают расти вообще, в отличие от Луки).
			// Крит-рост урезан, но не до нуля: при более сильном урезании (пробовал вплоть до
			// 0.015/0.0015) DPS-коридор оставался в норме на archetypeRows-точках, но росло
			// время убийства отдельных боссов в симуляции временных улучшений
			// (scripts/balance-report.js, колонка longestBoss) — слишком слабый крит-рычаг
			// давал ей меньше гибкости внутри одного забега, даже при более высоком стартовом
			// DPS. critMultiplierIncrease/critChanceIncrease подобраны на границе, где обе
			// проверки (DPS-коридор ≤10% и время убийства босса ≤90с) проходят одновременно.
			// Числа проверены расчётом DPS на всех 6 контрольных уровнях героя — коридор
			// получился 0.93–0.99 от DPS Луки, без превышения.
			// Она по-прежнему не про скорость — стартовая скорость 20 (интервал 980мс),
			// minShotInterval задаёт личный «пол»: скорость растёт максимум до 60
			// (интервал не опускается ниже 940мс), в отличие от общего минимума 200мс.
			daryana: {
				balanceRevision: 10,
				name: 'daryana',
				permanentGrowthProfile: 'ember',
				dispName: 'Дарьяна Пылкая',
				image: 'images/hero/4_daryana/daryana_min.webp',
				fullImage: 'images/hero/4_daryana/daryana_full.webp',
				level: 1,
				startGlobalDamage: 91.9,
				startGlobalCritChance: 0.02,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0.02,
				// Механика та же (ranение/DoT), но для огненного мага это подпалы —
				// подпись в UI переименована чисто косметически, без смены логики.
				woundChanceLabel: 'Шанс поджога',
				// Ревизия 10 (живучесть): цель ~7 сильнейших ударов по всей кампании.
				startCastleDamageReduction : 0.148,
				startSHOT_INTERVAL : 980,
				minShotInterval: 940,
				castleHP : 188,
				lvlUnlock: 1,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: true,
				feature: 'Прогревание — <br>за каждый недостающий 1% HP цели<br>урон растёт на 1.5%',
				missingHpDamagePerPercent: 0.015,
				// Допущение для автотестов/расчёта сложности: среднее недостающее HP% цели
				// за бой (доля от 1.0), используемое для оценки среднего бонуса прогревания
				// (см. комментарий выше про ODE-оценку ≈42.5%).
				missingHpExpectedAverageFraction: 0.425,
				// Потолки % и HP-статов — см. подробное обоснование у объекта eremei. Сила
				// Дарьяны — «Прогревание» и большой обычный урон, не крит.
				critChanceCap: 0.103,
				woundChanceCap: 0.30,
				castleHpCap: 1750,
				// Ревизия 11 (DPS с временными улучшениями — см. game.js/getAvailableUpgrades
				// и temporaryUpgradePower у объекта eremei выше): minShotInterval==старту —
				// Дарьяна не может брать «скорость атаки» вообще (весь забег), а её низкий
				// critChanceCap рано выключает и «шанс крита» — из 7 типов апгрейда ей
				// реально доступны только damage/critMultiplier/wound, из-за чего под
				// апгрейдами она проседала до ~47% DPS Луки вместо целевых ~90% (постоянный
				// DPS не трогали — там она и так была в порядке, ~93%). Подняли power, чтобы
				// «если повезёт с критами» она могла обгонять Луку на удачных забегах, а в
				// среднем держалась чуть ниже — не трогает постоянный DPS и HP/защиту.
				temporaryUpgradePower: 2.5,
			},

			luka: {
				balanceRevision: 10,
				name: 'luka',
				permanentGrowthProfile: 'marksman',
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.webp',
				fullImage: 'images/hero/3_luka/luka_full.webp',
				level: 1,
				startGlobalDamage: 105,
				startGlobalCritChance: 0.015,
				startGlobalCritMultiplier: 2.2,
				startGlobalWoundChance	: 0.03,
				// Ревизия 10 (живучесть): цель ~5 сильнейших ударов. Временные HP не
				// раздуваются через высокий castleHpCap — см. потолок забега в game.js.
				startCastleDamageReduction : 0.116,
				startSHOT_INTERVAL : 800,
				castleHP : 144,
				lvlUnlock: 3,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: true,
				feature: 'Считалочка — <br>каждый 5-й выстрел по боссу<br> гарантированно критический',
				guaranteedCritEvery: 5,
				// Потолки % и HP-статов — см. подробное обоснование у объекта eremei. Крит —
				// его архетипная черта, поэтому cap заметно выше, чем у остальных героев.
				critChanceCap: 0.39,
				woundChanceCap: 0.59,
				castleHpCap: 1200,
			},
			
			kim: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
				image: 'images/hero/3_luka/luka_min.webp',
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
