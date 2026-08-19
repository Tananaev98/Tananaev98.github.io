// ==================== Сохранение и загрузка прогресса ====================

const GAME_STATE_STORAGE_KEY = 'gameState';
const GAME_STATE_VERSION = 7;
const MAX_HERO_DAMAGE_REDUCTION = 0.60;
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
    heroHpMultiplier: 1.05,
    defenseIncrease: 0.01,
    defenseCap: MAX_HERO_DAMAGE_REDUCTION
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
        heroHpMultiplier: 1.049,
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
        heroHpMultiplier: 1.049,
        defenseIncrease: 0.001,
        defenseCap: 0.162
    }),
    // Ревизия 10 (живучесть): Лука снова растёт по HP/защите (раньше был заморожен),
    // чтобы держать ~5 сильнейших ударов на фоне uncapped урона боссов.
    // Ревизия 11: damageMultiplier 1.029→1.0298 (см. комментарий у объекта luka) — рост
    // урона отставал от ember (Дарьяна, 1.061), из-за чего к концу кампании Лука терял
    // задуманное преимущество над ней по ДПС.
    marksman: Object.freeze({
        damageMultiplier: 1.0298,
        critChanceIncrease: 0.008,
        critMultiplierIncrease: 0.12,
        woundChanceIncrease: 0.012,
        shotIntervalReduction: 5,
        heroHpMultiplier: 1.045,
        defenseIncrease: 0.002,
        defenseCap: 0.196
    }),
    // Мила — «Стрекоза»: скорострельность (startSHOT_INTERVAL 100мс, minShotInterval
    // тоже 100 — личный пол равен старту, как у Еремея/Дарьяны, поэтому shotIntervalReduction
    // здесь можно оставить 0, замораживает и без него) фиксирована с 1 уровня и НИКОГДА
    // не растёт — это archetypal черта, а не временное состояние.
    // woundChanceCap (0 == старту) заморожен: на шаге upSpecif===2 applyHeroPermanentStatUpgrade
    // редиректит его прирост во второй проход critMultiplierIncrease (тот же механизм,
    // что уже используется у Дуни). Крит-шанс НЕ заморожен (critChanceCap 0.07 > старта
    // 0.01) — растёт медленно сам по себе, отдельной осью, не редиректится.
    // Рост, соответственно, идёт уроном/крит-шансом/крит-уроном/HP/защитой. damageMultiplier
    // подобран так, чтобы держать DPS Милы между Дуней и Дарьяной на всех 11 контрольных
    // точках кампании — но НЕ через формулу-прокси, а через реальный экспорт
    // admin-balance-panel.html (см. CLAUDE.md §2, /DataExport): у Дуни и Дарьяны РЕАЛЬНЫЙ
    // боевой DPS на 23-30% выше "выстрелов×урон×крит" — у Дуни это её казино
    // (double/triple/jackpot, см. rollHeroAttackMultiplier в game.js), у остальных —
    // тик ранения (см. checkForWound/updateWound), которого у Милы нет и не будет (шанс
    // ранения заморожен на 0). У самой Милы, наоборот, реальный DPS СОВПАДАЕТ с наивной
    // формулой (проверено — отклонение <2% на всех контрольных точках), потому что у неё
    // нет ни одного из этих бонусных механизмов — значит для НЕЁ (и только для неё)
    // "выстрелов×урон×крит" — надёжный прокси реального DPS, а для Дуни/Дарьяны — нет
    // (их нельзя тюнить по такой формуле, только по реальному экспорту панели).
    swift: Object.freeze({
        damageMultiplier: 1.067,
        critChanceIncrease: 0.0012,
        critMultiplierIncrease: 0.02,
        woundChanceIncrease: 0,
        shotIntervalReduction: 0,
        heroHpMultiplier: 1.048,
        defenseIncrease: 0.0015,
        defenseCap: 0.17
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
        heroHpMultiplier: 1.047,
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
        MAX_HERO_DAMAGE_REDUCTION,
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

function getHeroHpCap(hero) {
    return Number.isFinite(hero?.heroHpCap) && hero.heroHpCap > 0 ? hero.heroHpCap : Infinity;
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

// «Замка» в игре никогда не было — castleHP/startCastleDamageReduction/castleHpCap/
// castleRegenPerSecond всегда были здоровьем и защитой самого героя, только назывались
// по-старому. Переименовано в heroHP/startHeroDamageReduction/heroHpCap/heroRegenPerSecond
// — эта функция один раз переносит значения со старых имён полей на новые в уже
// сохранённых у игрока данных, чтобы прогресс не обнулился молча. Определено здесь,
// ДО createGameState() ниже — та вызывает migrateGameState() сразу же при загрузке
// скрипта (не отложенно), а isPlainObject — function-декларация, ей хостинг не мешает,
// но const без инициализации на этот момент уже упал бы в temporal dead zone.
const LEGACY_HERO_FIELD_RENAMES = Object.freeze({
    castleHP: 'heroHP',
    startCastleDamageReduction: 'startHeroDamageReduction',
    castleHpCap: 'heroHpCap',
    castleRegenPerSecond: 'heroRegenPerSecond'
});

function renameLegacyHeroFields(savedHero) {
    if (!isPlainObject(savedHero)) return savedHero;
    const renamed = { ...savedHero };
    Object.entries(LEGACY_HERO_FIELD_RENAMES).forEach(([oldKey, newKey]) => {
        if (renamed[newKey] === undefined && renamed[oldKey] !== undefined) {
            renamed[newKey] = renamed[oldKey];
        }
        delete renamed[oldKey];
    });
    return renamed;
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
// (critChanceCap/woundChanceCap/heroHpCap на герое, defenseCap по профилю), прирост
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
        const heroHpCap = getHeroHpCap(hero);
        const defenseCap = getHeroDefenseCap(hero);
        const heroHpCapped = hero.heroHP >= heroHpCap;
        const defenseCapped = hero.startHeroDamageReduction >= defenseCap;

        if (!heroHpCapped) {
            hero.heroHP = Math.min(
                heroHpCap,
                hero.heroHP + Math.floor(hero.heroHP * (growth.heroHpMultiplier - 1))
            );
        }
        if (!defenseCapped) {
            hero.startHeroDamageReduction = Math.min(
                defenseCap,
                hero.startHeroDamageReduction + growth.defenseIncrease
            );
        }
        if (heroHpCapped && !defenseCapped) {
            hero.startHeroDamageReduction = Math.min(
                defenseCap,
                hero.startHeroDamageReduction + growth.defenseIncrease
            );
        } else if (defenseCapped && !heroHpCapped) {
            hero.heroHP = Math.min(
                heroHpCap,
                hero.heroHP + Math.floor(hero.heroHP * (growth.heroHpMultiplier - 1))
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
        && Number.isFinite(hero.heroHP)
        && Number.isFinite(hero.startHeroDamageReduction);
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
        Number(hero.startHeroDamageReduction) || 0,
        0,
        MAX_HERO_DAMAGE_REDUCTION
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
        effectiveHp: Math.max(1, Number(hero.heroHP) || 1) / (1 - defense),
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

    if (isPlainObject(savedState) && Array.isArray(savedState.mHero)) {
        savedState.mHero.forEach(heroKey => {
            if (isPlainObject(savedState[heroKey])) {
                savedState[heroKey] = renameLegacyHeroFields(savedState[heroKey]);
            }
        });
    }

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

            migrated[heroKey].startHeroDamageReduction = Math.min(
                getHeroDefenseCap(migrated[heroKey]),
                Math.max(0, migrated[heroKey].startHeroDamageReduction)
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
			mHero: ['eremei', 'daryana', 'luka', 'dunya', 'mila', 'vas', 'gen', 'gm', 'kir', 'gam', 'gama','gamb','gamc', 'gamd','game','gamf', 'gamg', 'gamh', ],
			activeHero: 'eremei',
			zlata: 0, 
			eremei: {
				// Ревизия 11: шанс ранения снят целиком (см. startGlobalWoundChance/
				// woundChanceCap ниже). Ревизия 12: скорость атаки опущена с 30 до 20.
				// Ревизия 13: базовый урон 140→116, temporaryUpgradePower 1.5→0.9 — цель:
				// ДПС Еремея ниже всех, на 8% ниже Дуни, на каждой точке кампании — касается
				// ОБОИХ листов панели (без апгрейдов и с апгрейдами). Ревизия 14: урон
				// 116→117, подстройка постоянного ДПС по реальному бою. Ревизия 15: power
				// 0.9→1.0 — лист «с апгрейдами» после ревизии 13 просел куда сильнее цели
				// (см. комментарий у temporaryUpgradePower ниже). Bump обязателен на каждую
				// такую правку, иначе у игроков с уже сохранённым прогрессом
				// migrateGameState берёт старое значение прямо из localStorage
				// (naive-merge: {...defaultHero, ...savedHero}) и не перестраивает через
				// rebuildBalancedHero, потому что тот запускается только при разнице
				// balanceRevision. Ревизия 16: power 1.0→1.15 (лист «с апгрейдами» после
				// ревизии 15 всё ещё далёк от цели — среднее −33.8% вместо −8%). Подтверждено
				// реальным боем: −23.0%. Ревизия 17: пробовали 1.30 (не проверено боем).
				// Ревизия 18: откат обратно на 1.15 (см. комментарий у temporaryUpgradePower
				// ниже) — фиксируем на последнем реально подтверждённом значении, дальше
				// не тюним.
				balanceRevision: 18,
				name: 'eremei',
				permanentGrowthProfile: 'guardian',
				dispName: 'Еремей Дуболом',
				image: 'images/hero/2_eremei/eremei_min.webp',
				fullImage: 'images/hero/2_eremei/eremei_full.webp',
				// Спрайт оружия/атаки в анимации — та же картинка, что зашита в main_css.css
				// у .eremei-club. Отдельное поле, чтобы экран загрузки уровня (game.js/
				// preloadLevelAssets) мог предзагрузить её как обычную картинку.
				weaponImage: 'images/hero/2_eremei/weapon.webp',
				level: 1,
				// Ревизия 8: старый баг «Лука теряет преимущество по DPS на уровне героя 1»
				// (базовый урон Еремея давал ему 184 DPS против 172 у Луки уже на старте,
				// хотя лучший постоянный DPS — архетипная черта Луки, см. раздел 2 правил) —
				// урон снижен со 158.4 до 140.
				// Ревизия 13: 140 всё ещё оказалось много — после снятия шанса ранения
				// (см. balanceRevision выше) и опускания скорости 30→20 постоянный ДПС
				// Еремея всё равно шёл ВЫШЕ всех, а не ниже (реальный бой панели — «Лови
				// обратно» и без того давал ему растущий реальный бонус сверх наивной
				// формулы урон×крит, с +8% на 1 уровне до +35% к 141-му). Цель по задаче:
				// ДПС Еремея — самый низкий из всех пяти, ровно на 8% ниже Дуни, на каждой
				// из 11 контрольных точек кампании. Крит-шанс/крит-множитель НЕ трогали —
				// удар и крит остаются самыми «болючими» по абсолютной величине, вниз
				// двигали только базовый урон. Первая прикидка 116 (по 0.92×Дуни с
				// поправкой на измеренный рост бонуса «Лови обратно») подтверждена реальным
				// боем панели: в среднем по 11 точкам разрыв вышел −8.78% (почти в цель), но
				// по отдельным точкам гулял от −2.3% до −12.4% — часть этого разброса
				// объективный шум движка «Лови обратно» (пуассоновский поток входящих
				// ударов в симуляции, 150 боёв/точка), часть — неидеальная кривая. 116 → 117
				// по среднему k=1.0095 между целью и реальным боем на всех 11 точках (см.
				// историю подбора). Точное совпадение на каждой точке — недостижимо при
				// таком шуме, ориентир — среднее ≈−8%, как и у остальных героев в файле.
				startGlobalDamage: 150,
				startGlobalCritChance: 0.045,
				startGlobalCritMultiplier: 2.1,
				// Ревизия N: шанс ранения снят целиком (эксперимент — см. woundChanceCap
				// ниже и историю temporaryUpgradePower). Заморожен на 0 == потолку с самого
				// старта, поэтому весь его прирост с 1 же прокачки редиректится во второй
				// проход critMultiplierIncrease (см. applyHeroPermanentStatUpgrade, шаг
				// upSpecif===2) — тот же механизм, что у Дуни/Милы. Не оценено реальным боем
				// панели — нужен новый экспорт в /DataExport после этой правки.
				startGlobalWoundChance	: 0,
				// Ревизия 10 (живучесть): HP/защита растут всю кампанию вслед за uncapped
				// уроном боссов. Цель — ~12 сильнейших ударов на каждом уровне кампании
				// при focused-прокачке (см. scripts/fit-survivability.js). На 1 уровне
				// допускается 11 вместо 12 из‑за округления.
				startHeroDamageReduction : 0.097,
				// Скорость атаки (=1000-startSHOT_INTERVAL) опущена с 30 до 20 — постоянный
				// ДПС Еремея оказался завышен (см. историю снятия шанса ранения выше —
				// комментарий про balanceRevision 11). Не оценено реальным боем панели после
				// этой правки — нужен новый экспорт в /DataExport.
				startSHOT_INTERVAL : 980,
				// Ревизия 12: minShotInterval == старту, по образцу Дарьяны (см. её
				// комментарий ниже) — Еремей архетипно «тяжёлый редкий удар», а не скорость.
				// Без этого лока временный апгрейд «скорость атаки» (после починки формулы —
				// см. game.js/getAvailableUpgrades) стакался у него вплоть до общего пола
				// 200мс, превращая его в скорострела и ломая архетип. Теперь тип апгрейда
				// «скорость атаки» ему вообще не предлагается — сила только через
				// damage/crit, как и задумано.
				minShotInterval: 980,
				heroHP : 336,
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
				// 0 == старту (см. комментарий у startGlobalWoundChance выше) — эксперимент,
				// шанс ранения снят целиком.
				woundChanceCap: 0,
				// Потолок чуть выше HP на герое 200 при focused-кривой — постоянная
				// прокачка не упирается раньше конца. Временные HP-апгрейды ограничены
				// отдельно в game.js (~+25% от старта забега), чтобы высокий cap не
				// раздувал живучесть внутри одного уровня.
				heroHpCap: 3500,
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
				// уровень): −9.4% от Дуни, обгон 12.8% («редкий крупный крит»).
				// Ревизия 13: снятие шанса ранения (см. balanceRevision выше) убрало у него
				// ещё один тип временного апгрейда — сила апгрейдов схлопнулась в ещё более
				// узкий набор осей (damage/critChance/critMultiplier), тот же эффект
				// «концентрации», что уже ловили на ревизии 12, но резче. Реальный бой
				// панели после этого показал ДПС с апгрейдами В РАЗЫ выше всех остальных
				// героев (141 уровень: 20062 против 9539 у Дуни). Опущено с 1.5 до 0.9 —
				// перелетело в другую сторону: реальный бой панели показал разрыв от Дуни
				// −25…−67% вместо целевых −8% (задача — ДПС Еремея ниже всех на 8% от Дуни
				// касается ОБОИХ листов панели, «без апгрейдов» и «с апгрейдами», не только
				// постоянного). Отклик на power по-прежнему очень нелинейный (см. историю
				// выше) — 1.5 дало кратный перелёт вверх, 0.9 кратный перелёт вниз, 1.0
				// снова перелетело вниз (реальный бой панели: среднее −33.8% от Дуни
				// вместо целевых −8%). Локальный наклон между 0.9 и 1.0 (обе точки —
				// реальный бой) заметно положе, чем между 0.9 и 1.5 — отклик явно
				// нелинейно ускоряется где-то в диапазоне 1.0-1.5, поэтому линейная
				// экстраполяция ненадёжна. 1.0 → 1.15 — осторожный, не резкий шаг вверх.
				// Подтверждено реальным боем: среднее −23.0% (было −33.8% на 1.0) — не
				// идеально, но это последнее значение, реально проверенное боем панели.
				// Пробовал докрутить до 1.30 (расчётная цель ≈1.33 log-линейно), но эта
				// правка не была проверена — по решению пользователя откат обратно на
				// 1.15 и остановка здесь, дальше не докручивать.
				temporaryUpgradePower: 1.15,
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
				weaponImage: 'images/hero/1_babka/weapon.webp',
				level: 1,
				startGlobalDamage: 115,
				startGlobalCritChance: 0.03,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0,
				// Ревизия 10 (живучесть): цель ~9 сильнейших ударов по всей кампании.
				startHeroDamageReduction : 0.122,
				startSHOT_INTERVAL : 808,
				minShotInterval: 555,
				heroHP : 248,
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
				heroHpCap: 2600,
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
				weaponImage: 'images/hero/4_daryana/weapon.webp',
				level: 1,
				startGlobalDamage: 110,
				startGlobalCritChance: 0.02,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0.02,
				// Механика та же (ranение/DoT), но для огненного мага это подпалы —
				// подпись в UI переименована чисто косметически, без смены логики.
				woundChanceLabel: 'Шанс поджога',
				// Ревизия 10 (живучесть): цель ~7 сильнейших ударов по всей кампании.
				startHeroDamageReduction : 0.148,
				startSHOT_INTERVAL : 980,
				minShotInterval: 940,
				heroHP : 160,
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
				heroHpCap: 1750,
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
				// Ревизия 11: и постоянный, и апгрейженный ДПС Луки часто проседали ниже
				// Дарьяны (реальный бой панели) — задача: Лука должен быть сильнее Дарьяны
				// по ДПС на 7-10%, почти всегда, на обоих листах панели (см. [[feedback-
				// dps-means-both-sheets]] — цель касается и «без апгрейдов», и «с
				// апгрейдами»). Причина отставания к концу кампании — профиль marksman
				// растил урон заметно медленнее (damageMultiplier 1.029), чем ember у
				// Дарьяны (1.061): она компенсирует урезанный крит-рост почти всей силой
				// именно в урон, Лука — размазывает рост между уроном/критом/скоростью/
				// HP-защитой. startGlobalDamage 105→106 и marksman.damageMultiplier
				// 1.029→1.0298 (см. профиль marksman выше) подобраны по реальным цифрам
				// Дарьяны из /DataExport — расчётное отклонение по всем 11 точкам
				// кампании 7.8-11.4% (чуть выше 10% на паре точек, в пределах шума).
				// Подтверждено реальным боем панели: получилось 7.5-11.9% — цель на
				// листе «без апгрейдов» достигнута. Ревизия 12: temporaryUpgradePower
				// 1.3→1.06 — лист «с апгрейдами» вышел далеко за цель. Подтверждено:
				// среднее 15.3% (было 46.7% на 1.3) — уже близко, чуть выше 7-10%.
				// Ревизия 13: 1.06→1.033, точечная подстройка (см. комментарий у
				// temporaryUpgradePower ниже). Bump обязателен на каждую такую
				// правку — см. объяснение у Еремея выше.
				// Ревизия 14: пробовали power 1.01, не проверено боем — откат обратно на
				// 1.033 (последнее подтверждённое значение), фиксируем, дальше не тюним.
				balanceRevision: 15,
				name: 'luka',
				permanentGrowthProfile: 'marksman',
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.webp',
				fullImage: 'images/hero/3_luka/luka_full.webp',
				weaponImage: 'images/hero/3_luka/weapon.webp',
				level: 1,
				startGlobalDamage: 123,
				startGlobalCritChance: 0.035,
				startGlobalCritMultiplier: 2.2,
				startGlobalWoundChance	: 0.03,
				// Ревизия 10 (живучесть): цель ~5 сильнейших ударов. Временные HP не
				// раздуваются через высокий heroHpCap — см. потолок забега в game.js.
				startHeroDamageReduction : 0.116,
				startSHOT_INTERVAL : 775,
				heroHP : 144,
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
				heroHpCap: 1200,
				// Ревизия 11: у Луки не было явного temporaryUpgradePower (дефолт 1 —
				// см. game.js/getAvailableUpgrades) — отсюда просадки под Дарьяной
				// (power 2.5) в реальном бою панели вплоть до -21% на отдельных точках.
				// Первая прикидка 1.3 (расчёт «раз осей больше — рост power безопаснее»)
				// оказалась неверна: реальный бой панели показал отклик КРУЧЕ, чем у
				// героев с замороженными осями — в среднем по 16 точкам +46.7% от
				// Дарьяны вместо целевых ~8.5% (было ~0.7% на дефолтном power=1 —
				// т.е. рост всего на 0.3 units power дал +46 п.п. в среднем).
				// Ревизия 12: log-линейная интерполяция между этими двумя реальными
				// точками (power=1.0→ratio 1.007, power=1.3→ratio 1.467) даёт
				// power≈1.06 для среднего ~8.5%. Подтверждено реальным боем: среднее по
				// 141 точке вышло 15.3% — чуть выше цели 7-10%, но намного точнее, чем
				// 1.3. Ревизия 13: интерполяция между двумя соседними реальными точками
				// (1.0→0.66%, 1.06→15.3%) даёт power≈1.033 для центра диапазона (~8.5%).
				// При таком разбросе (±20-30 п.п. вокруг среднего даже на фиксированном
				// power, из-за всего 8 заходов/уровень) точное попадание 7-10% на КАЖДОЙ
				// точке маловероятно — ориентир, как и у остальных героев в файле,
				// среднее ≈8-9%. Подтверждено реальным боем: среднее 11.6% (было 15.3%
				// на 1.06) — не идеально, но последнее значение, реально проверенное
				// боем панели. Пробовали 1.01 (расчётная точечная подстройка), но эта
				// правка не была проверена — по решению пользователя откат обратно на
				// 1.033 и остановка здесь, дальше не тюним.
				temporaryUpgradePower: 1.033,
			},
			
			// Мила Зеленова — «Стрекоза». Разблокируется после 30-го уровня кампании.
			// Архетип: скорострельность 900 (=1000-startSHOT_INTERVAL, см. formatEndgameStatDelta
			// в game.js) фиксирована с 1 уровня и не растёт никогда (minShotInterval == старту).
			// Шанс ранения заморожен на нуле (woundChanceCap == старту 0) — редирект в
			// applyHeroPermanentStatUpgrade усиливает крит-урон вместо него (см. профиль
			// swift выше). Крит-шанс НЕ заморожен, растёт медленно сам по себе (critChanceCap
			// 0.07). Особенность «Живительная клубника» — пассивный реген HP героя на 1% от
			// максимума каждую секунду (см. heroRegenPerSecond ниже, применяется в game.js
			// через applyMilaHeroRegen). ВАЖНО: сырая живучесть (heroHP/защита, БЕЗ учёта
			// регена) нарочно держится чуть НИЖЕ Луки на контрольных точках кампании
			// (1/15/30/45/60/75/90/105/120/135/141) — на 1 сильнейший удар меньше почти
			// везде — а реген компенсирует разницу в реальном бою. DPS тюнингом (см. swift)
			// держится между Дуней и Дарьяной на контрольных точках уровня героя
			// (1/40/80/120/160/200). Проверено реальными функциями движка
			// (applyHeroPermanentStatUpgrade/calculateBossAttackDamage), не своей формулой.
			// Реальные портрет/оружие — images/hero/5_MilaZelenova/.
			mila: {
				// Ревизия 11: damageMultiplier/temporaryUpgradePower пересчитаны реальным
				// боем панели (см. комментарии у профиля swift выше и у
				// temporaryUpgradePower ниже) — тот же bump и по той же причине, что у
				// Еремея (см. его комментарий): без него игрок с уже сохранённой Милой
				// не получит новые статы, пока не сбросит прокачку вручную.
				balanceRevision: 11,
				name: 'mila',
				permanentGrowthProfile: 'swift',
				dispName: 'Мила Зеленова',
				image: 'images/hero/5_MilaZelenova/min.webp',
				fullImage: 'images/hero/5_MilaZelenova/full.webp',
				weaponImage: 'images/hero/5_MilaZelenova/weapon.webp',
				level: 1,
				startGlobalDamage: 20,
				startGlobalCritChance: 0.01,
				startGlobalCritMultiplier: 1.4,
				startGlobalWoundChance	: 0,
				// Ниже, чем у Луки (0.116) на старте — сырая живучесть без учёта регена
				// нарочно слабее его (см. комментарий выше объекта mila).
				startHeroDamageReduction : 0.10,
				startSHOT_INTERVAL : 100,
				// Личный пол равен старту — скорость заморожена навсегда (тот же приём,
				// что у Еремея/Дарьяны, только у неё пол на противоположном, самом
				// быстром конце шкалы, а не на медленном).
				minShotInterval: 100,
				// Ниже, чем у Луки (144) на старте — см. комментарий выше объекта mila.
				heroHP : 115,
				lvlUnlock: 30,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: false,
				feature: 'Живительная клубника — <br>здоровье восстанавливается<br>каждую секунду на 1%',
				// Живительная клубника: пассивный реген HP героя, читается в game.js
				// через applyMilaHeroRegen(hero.heroRegenPerSecond ?? дефолт).
				heroRegenPerSecond: 0.01,
				// critChanceCap выше старта (0.01) — крит-шанс растёт медленно сам,
				// без редиректа (см. комментарий у профиля swift).
				critChanceCap: 0.07,
				// woundChanceCap 0 == старту: шанс ранения заморожен на нуле, весь
				// его прирост редиректится в крит-урон.
				woundChanceCap: 0,
				// Ниже, чем у Луки (1200) — см. комментарий выше объекта mila.
				heroHpCap: 1000,
				// Из 7 типов временных апгрейдов ей заблокированы 2 (скорость и ранение) —
				// личные потолки равны старту (см. выше).
				// Ревизия N (DPS с временными улучшениями — см. game.js/getAvailableUpgrades
				// и temporaryUpgradePower у объекта eremei выше): первая прикидка 2.6 (по
				// аналогии с Дарьяной 2.5 — «теряет на один тип меньше») оказалась заметно
				// завышена — реальный бой панели (см. /DataExport, лист «DPS с апгрейдами»)
				// показал, что среднее по 8 заходам достигало и превышало Луку на нескольких
				// контрольных точках (ур.100: 101.8%, ур.120: 109.1%, ур.140: 102.2% от его
				// DPS) — то есть не «если очень повезёт», а буквально в среднем. Опущено до
				// 2.0 — первая коррекция, ещё не подтверждена свежим реальным боем панели
				// (нужен новый экспорт в /DataExport после этой правки, см. CLAUDE.md §2).
				// Не трогает постоянный DPS и HP/защиту.
				temporaryUpgradePower: 2.0,
			},
			
			
			vas: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.webp',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
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
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				heroHP : 50,
				lvlUnlock: 141,
				unlock: false,
			},
				
			}; // дефолт
}
