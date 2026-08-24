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

// Ревизия 20 (по решению пользователя — прокачка строго поюнитно из объекта
// героя): раньше рост статов задавался общим на архетип профилем
// (HERO_PERMANENT_GROWTH_PROFILES) — damage/heroHP росли МНОЖИТЕЛЕМ
// (компаундили экспоненциально всю кампанию), остальные статы — фиксированным
// плюсом из профиля. Теперь КАЖДЫЙ стат растёт фиксированным количеством ЕДИНИЦ
// за один шаг прокачки, и это количество явно прописано в объекте САМОГО героя
// (damagePerLevel, critChancePerLevel, critMultiplierPerLevel, woundChancePerLevel,
// shotIntervalReductionPerLevel, heroHpPerLevel, defensePerLevel, defenseCap) —
// см. applyHeroPermanentStatUpgrade ниже. HERO_PERMANENT_GROWTH_PROFILES удалён
// целиком, growth-логика больше не читает permanentGrowthProfile ни для чего —
// поле на герое осталось только как архетипная метка для истории/чтения.
// Значения *PerLevel у всех шести героев — первая прикидка, посчитанная как то,
// что старая мультипликативная кривая давала бы на первом же шаге прокачки
// (old = start × (multiplier − 1)), плюс перенесённые как есть уже-плюсовые
// приросты (крит-шанс/крит-урон/ранение/скорость/защита). Ранняя игра поэтому
// стартует почти как раньше, а поздняя станет куда более плоской (линейный рост
// вместо экспоненциального) — это ожидаемо и осознанно, но сами числа не
// проверены реальным боем панели (см. CLAUDE.md §2) — нужен новый экспорт в
// /DataExport перед следующей балансной правкой.
// Потолки статов героя (defenseCap/critChanceCap/woundChanceCap/heroHpCap) — по
// решению пользователя, ЕДИНСТВЕННЫЙ источник истины — поле на самом объекте героя
// в mHero, движок нигде не хранит и не подставляет собственных запасных чисел.
// Герой без явного поля возвращает undefined — вызывающий код (см. getAvailableUpgrades
// в game.js) трактует это как «потолка нет вообще», а не как какое-то дефолтное
// значение: любой Number.isFinite(cap)-fallback здесь — ровно та заглушка, от которой
// просили избавиться.
function getHeroDefenseCap(hero) {
    return hero?.defenseCap;
}

function getHeroCritChanceCap(hero) {
    return hero?.critChanceCap;
}

function getHeroWoundChanceCap(hero) {
    return hero?.woundChanceCap;
}

function getHeroHpCap(hero) {
    return hero?.heroHpCap;
}

// Разброс урона (±доля от рассчитанного удара) — поле НА САМОМ герое, как и
// потолки выше. У героя без явного damageVariance (или служебных заглушек)
// действует общий дефолт ±5%, поэтому добавление нового героя без этого поля
// ничего не ломает. Применяется в game.js (см. rollDamageVariance).
const DEFAULT_HERO_DAMAGE_VARIANCE = 0.05;

function getHeroDamageVariance(hero) {
    return Number.isFinite(hero?.damageVariance) && hero.damageVariance >= 0
        ? hero.damageVariance
        : DEFAULT_HERO_DAMAGE_VARIANCE;
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
// (critChanceCap/woundChanceCap/heroHpCap/defenseCap — все теперь поля НА САМОМ
// герое), прирост этого шага не пропадает впустую — второй стат пары получает его
// ЕЩЁ РАЗ. Так героя нельзя "перекачать" сверх задуманного по одной оси ценой
// недокачки по другой — вместо этого рост перетекает туда, где ещё есть куда расти.
//
// Ревизия 20: прирост каждого стата — фиксированное количество ЕДИНИЦ за шаг,
// взятое прямо с объекта героя (hero.damagePerLevel и т.д., см. комментарий у
// getHeroDefenseCap выше), а не множитель/приращение из общего профиля. Урон и
// HP героя раньше росли МНОЖИТЕЛЕМ (hero.startGlobalDamage *= growth.damageMultiplier)
// — теперь строго плюсом, как и остальные статы: hero.startGlobalDamage +=
// hero.damagePerLevel. Поле без явного *PerLevel безопасно трактуется как 0
// (герой просто не растёт по этой оси) — так служебные заглушки в mHero не ломаются.
// Все Math.min(cap, ...) ниже защищены Number.isFinite(cap) — если у героя нет
// явного поля-потолка в saveData.js, cap приходит как undefined (см. getHeroCritChanceCap
// и соседние функции выше), а Math.min(undefined, x) дал бы NaN. Без потолка стат
// считается ничем не ограниченным (never capped), а не тихо ломается — никакого
// движкового запасного числа при этом не подставляется.
function applyHeroPermanentStatUpgrade(hero) {
    if (hero.upSpecif === 1) {
        const critChanceCap = getHeroCritChanceCap(hero);
        const critChanceCapped = Number.isFinite(critChanceCap) && hero.startGlobalCritChance >= critChanceCap;
        const damagePerLevel = Number(hero.damagePerLevel) || 0;

        hero.startGlobalDamage += damagePerLevel;
        if (!critChanceCapped) {
            const nextCritChance = hero.startGlobalCritChance + (Number(hero.critChancePerLevel) || 0);
            hero.startGlobalCritChance = Number.isFinite(critChanceCap)
                ? Math.min(critChanceCap, nextCritChance)
                : nextCritChance;
        } else {
            hero.startGlobalDamage += damagePerLevel;
        }
        hero.upSpecif = 2;
    } else if (hero.upSpecif === 2) {
        const woundChanceCap = getHeroWoundChanceCap(hero);
        const woundChanceCapped = Number.isFinite(woundChanceCap) && hero.startGlobalWoundChance >= woundChanceCap;
        const critMultiplierPerLevel = Number(hero.critMultiplierPerLevel) || 0;

        hero.startGlobalCritMultiplier += critMultiplierPerLevel;
        if (!woundChanceCapped) {
            const nextWoundChance = hero.startGlobalWoundChance + (Number(hero.woundChancePerLevel) || 0);
            hero.startGlobalWoundChance = Number.isFinite(woundChanceCap)
                ? Math.min(woundChanceCap, nextWoundChance)
                : nextWoundChance;
        } else {
            hero.startGlobalCritMultiplier += critMultiplierPerLevel;
        }
        hero.upSpecif = 3;
    } else if (hero.upSpecif === 3) {
        // Личный «пол» интервала (например, у Дарьяны — не про скорость) читается
        // только с самого героя — без него скорость ничем не ограничена снизу.
        const floor = hero.minShotInterval;
        const nextInterval = hero.startSHOT_INTERVAL - (Number(hero.shotIntervalReductionPerLevel) || 0);
        hero.startSHOT_INTERVAL = Number.isFinite(floor) ? Math.max(floor, nextInterval) : nextInterval;
        hero.upSpecif = 4;
    } else if (hero.upSpecif === 4) {
        const heroHpCap = getHeroHpCap(hero);
        const defenseCap = getHeroDefenseCap(hero);
        const heroHpCapped = Number.isFinite(heroHpCap) && hero.heroHP >= heroHpCap;
        const defenseCapped = Number.isFinite(defenseCap) && hero.startHeroDamageReduction >= defenseCap;
        const heroHpPerLevel = Number(hero.heroHpPerLevel) || 0;
        const defensePerLevel = Number(hero.defensePerLevel) || 0;

        const growHeroHp = () => {
            const nextHp = hero.heroHP + heroHpPerLevel;
            hero.heroHP = Number.isFinite(heroHpCap) ? Math.min(heroHpCap, nextHp) : nextHp;
        };
        const growDefense = () => {
            const nextDefense = hero.startHeroDamageReduction + defensePerLevel;
            hero.startHeroDamageReduction = Number.isFinite(defenseCap)
                ? Math.min(defenseCap, nextDefense)
                : nextDefense;
        };

        if (!heroHpCapped) growHeroHp();
        if (!defenseCapped) growDefense();
        if (heroHpCapped && !defenseCapped) {
            growDefense();
        } else if (defenseCapped && !heroHpCapped) {
            growHeroHp();
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
            if (typeof defaultHero.aimImage === 'string') {
                migrated[heroKey].aimImage = defaultHero.aimImage;
            }

            {
                const defenseCapForMigration = getHeroDefenseCap(migrated[heroKey]);
                const sanitizedReduction = Math.max(0, migrated[heroKey].startHeroDamageReduction);
                migrated[heroKey].startHeroDamageReduction = Number.isFinite(defenseCapForMigration)
                    ? Math.min(defenseCapForMigration, sanitizedReduction)
                    : sanitizedReduction;
            }

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
				// Ревизия 13: базовый урон 140→116 — цель: ДПС Еремея ниже всех, на 8% ниже
				// Дуни, на каждой точке кампании — касается ОБОИХ листов панели (без
				// апгрейдов и с апгрейдами). Ревизия 14: урон 116→117, подстройка
				// постоянного ДПС по реальному бою. Bump обязателен на каждую такую правку,
				// иначе у игроков с уже сохранённым прогрессом migrateGameState берёт старое
				// значение прямо из localStorage (naive-merge: {...defaultHero, ...savedHero})
				// и не перестраивает через rebuildBalancedHero, потому что тот запускается
				// только при разнице balanceRevision.
				balanceRevision: 25,
				name: 'eremei',
				permanentGrowthProfile: 'guardian',
				dispName: 'Еремей Дуболом',
				image: 'images/hero/2_eremei/eremei_min.webp',
				fullImage: 'images/hero/2_eremei/eremei_full.webp',
				// Спрайт оружия/атаки в анимации — та же картинка, что зашита в main_css.css
				// у .eremei-club. Отдельное поле, чтобы экран загрузки уровня (game.js/
				// preloadLevelAssets) мог предзагрузить её как обычную картинку.
				weaponImage: 'images/hero/2_eremei/weapon.webp',
				// Индивидуальный прицел героя — навешивается в game.js
				// (applyHeroAimAssets) вместо старого общего images/aim/1.png.
				aimImage: 'images/hero/2_eremei/aim.webp',
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
				// Ревизия 19 (перебалансировка по решению пользователя): урон 150→135,
				// стартовый крит-шанс поднят до 40% (растёт постоянной прокачкой до
				// личного потолка 50% — см. critChanceCap ниже), скорость атаки заморожена
				// на минимуме (см. startSHOT_INTERVAL/minShotInterval ниже — «скорость 1»),
				// разброс урона расширен до ±30% (см. damageVariance ниже).
				startGlobalDamage: 185,
				startGlobalCritChance: 0.20,
				startGlobalCritMultiplier: 1.6,
				// Ревизия N: шанс ранения снят целиком (эксперимент — см. woundChanceCap
				// ниже). Заморожен на 0 == потолку с самого старта, поэтому весь его прирост
				// с 1 же прокачки редиректится во второй
				// проход critMultiplierIncrease (см. applyHeroPermanentStatUpgrade, шаг
				// upSpecif===2) — тот же механизм, что у Дуни/Милы. Не оценено реальным боем
				// панели — нужен новый экспорт в /DataExport после этой правки.
				startGlobalWoundChance	: 0,
				// Ревизия 10 (живучесть): HP/защита растут всю кампанию вслед за uncapped
				// уроном боссов. Цель — ~12 сильнейших ударов на каждом уровне кампании
				// при focused-прокачке (см. scripts/fit-survivability.js). На 1 уровне
				// допускается 11 вместо 12 из‑за округления.
				startHeroDamageReduction : 0.05,
				// Ревизия 19: скорость атаки (=1000-startSHOT_INTERVAL) опущена до минимума —
				// «скорость 1» по решению пользователя, ещё тяжелее прежних 20. Как и раньше,
				// minShotInterval == старту (см. комментарий ниже) — эта ревизия не меняет
				// архетип, просто ещё сильнее его подчёркивает.
				startSHOT_INTERVAL : 999,
				// Ревизия 12: minShotInterval == старту, по образцу Дарьяны (см. её
				// комментарий ниже) — Еремей архетипно «тяжёлый редкий удар», а не скорость.
				// Без этого лока временный апгрейд «скорость атаки» (после починки формулы —
				// см. game.js/getAvailableUpgrades) стакался у него вплоть до общего пола
				// 200мс, превращая его в скорострела и ломая архетип. Теперь тип апгрейда
				// «скорость атаки» ему вообще не предлагается — сила только через
				// damage/crit, как и задумано.
				minShotInterval: 999,
				heroHP : 170,
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
				// Ревизия 19: потолок постоянного крит-шанса поднят до 50% (старт — 40%,
				// см. startGlobalCritChance выше). Пока globalCritChance < 0.50, временный
				// апгрейд «шанс крита» ему по-прежнему предлагается (getAvailableUpgrades
				// сам проверяет globalCritChance < globalCritChanceCap) — как и у любого
				// другого героя, апгрейд перестаёт выпадать, как только герой упирается в
				// свой личный потолок, отдельного кода для этого не нужно. «Лови обратно»
				// (+10% крита на 3с, см. catchBackCritChanceBonus) складывается ПОВЕРХ этого
				// потолка в getEffectiveCritChance — 50%+10%=60% в моменте достижимо и это
				// осознанно допустимое исключение для фирменной механики, а не баг.
				critChanceCap: 0.65,
				// 0 == старту (см. комментарий у startGlobalWoundChance выше) — эксперимент,
				// шанс ранения снят целиком.
				woundChanceCap: 0,
				// Потолок чуть выше HP на герое 200 при focused-кривой — постоянная
				// прокачка не упирается раньше конца. Временные HP-апгрейды ограничены
				// отдельно в game.js (~+25% от старта забега), чтобы высокий cap не
				// раздувал живучесть внутри одного уровня.
				heroHpCap: 3500,
				// Ревизия 19: разброс урона ±30% вместо общего дефолта ±5% (см.
				// getHeroDamageVariance в saveData.js и rollDamageVariance в game.js) —
				// архетип «редкий тяжёлый удар» получает более рискованный, менее
				// предсказуемый хит по величине, а не только по частоте/крит-шансу.
				damageVariance: 0.30,
				// Ревизия 21: прирост за уровень прокачки — строго плюс это количество единиц
				// к соответствующему стату (см. applyHeroPermanentStatUpgrade в saveData.js).
				// damage/heroHP пересчитаны НЕ по первому шагу старой кривой guardian, а так,
				// чтобы линейный рост попадал в ТУ ЖЕ точку на герое 159 (=кампания 141 в
				// реальном отчёте DataExport/balance-report_2026-08-20_00-58-37.xls), что и
				// старая экспоненциальная кривая — 40 применений урона (крит-шанс не упирается
				// в потолок раньше) и 39 применений HP по циклу пар upSpecif. Остальные статы
				// уже были плюсовые в старом профиле — перенесены как есть, без изменений.
				// Матчит РАСПРЕДЕЛЕНИЕ сырых статов на контрольной точке отчёта, а не реальный
				// бой (крит/казино/волна и т.д.) — нужен новый экспорт панели для подтверждения.
				damagePerLevel: 13.5,
				critChancePerLevel: 0.003,
				critMultiplierPerLevel: 0.08,
				woundChancePerLevel: 0.003,
				shotIntervalReductionPerLevel: 0.5,
				heroHpPerLevel: 15,
				defensePerLevel: 0.02,
				defenseCap: 0.30,
				// temporaryUpgradePower (персональный множитель силы временных улучшений)
				// убран по решению пользователя вместе с переходом на систему связок из 3
				// статов — единая база 18% теперь одна на всех героев без исключений.
				// Долгая история балансировки этого поля (ревизии 11-18) осталась в
				// git-истории файла, тут не дублируется.
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
				balanceRevision: 12,
				name: 'dunya',
				permanentGrowthProfile: 'tempest',
				dispName: 'Ветроманка Дуня',
				image: 'images/hero/1_babka/dunya_min.webp',
				fullImage: 'images/hero/1_babka/dunya_full.webp',
				weaponImage: 'images/hero/1_babka/weapon.webp',
				aimImage: 'images/hero/1_babka/aim.webp',
				level: 1,
				startGlobalDamage: 115,
				startGlobalCritChance: 0.03,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0,
				// Ревизия 10 (живучесть): цель ~9 сильнейших ударов по всей кампании.
				startHeroDamageReduction : 0.04,
				startSHOT_INTERVAL : 808,
				minShotInterval: 220,
				heroHP : 150,
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
				critChanceCap: 0.20,
				woundChanceCap: 0,
				heroHpCap: 2600,
				// Разброс урона ±5% — общий дефолт (см. getHeroDamageVariance в saveData.js),
				// прописан явно, чтобы значение было видно и легко менялось прямо тут.
				damageVariance: 0.05,
				// Ревизия 21: прирост за уровень — см. подробный комментарий у объекта eremei
				// (матчит герой 159 из реального отчёта DataExport, не первый шаг кривой).
				// У Дуни critChanceCap==старту с 1-го уровня — редирект удваивает прибавку
				// урона КАЖДЫЙ ход (40 ходов × 2 применения = 80), поэтому damagePerLevel =
				// (1223.7-115)/80, а не /40 — первая версия ревизии делила на число ходов,
				// а не применений, из-за чего реальный прогон уходил почти вдвое выше цели
				// (сырой урон на герое 159 получался 2332 вместо целевых 1224).
				damagePerLevel: 16,
				critChancePerLevel: 0.0050,
				critMultiplierPerLevel: 0.012,
				woundChancePerLevel: 0,
				shotIntervalReductionPerLevel: 4.7,
				heroHpPerLevel: 13,
				defensePerLevel: 0.01,
				defenseCap: 0.25,
				// temporaryUpgradePower убран по решению пользователя вместе с переходом на
				// систему связок из 3 статов — единая база 18% теперь одна на всех героев.
				// История балансировки казино-механики Дуни относительно этого поля
				// (ревизии 11-12) осталась в git-истории файла.
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
				balanceRevision: 15,
				name: 'daryana',
				permanentGrowthProfile: 'ember',
				dispName: 'Дарьяна Пылкая',
				image: 'images/hero/4_daryana/daryana_min.webp',
				fullImage: 'images/hero/4_daryana/daryana_full.webp',
				weaponImage: 'images/hero/4_daryana/weapon.webp',
				aimImage: 'images/hero/4_daryana/aim.webp',
				level: 1,
				startGlobalDamage: 160,
				startGlobalCritChance: 0.05,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0.02,
				// Механика та же (ranение/DoT), но для огненного мага это подпалы —
				// подпись в UI переименована чисто косметически, без смены логики.
				woundChanceLabel: 'Шанс поджога',
				// Ревизия 10 (живучесть): цель ~7 сильнейших ударов по всей кампании.
				startHeroDamageReduction : 0.05,
				startSHOT_INTERVAL : 980,
				minShotInterval: 940,
				heroHP : 140,
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
				critChanceCap: 0.35,
				woundChanceCap: 0.35,
				heroHpCap: 1750,
				damageVariance: 0.05,
				// Ревизия 21: прирост за уровень — см. подробный комментарий у объекта eremei
				// (матчит герой 159 из реального отчёта DataExport). critChanceCap у Дарьяны
				// не упирается за 40 применений — редиректа по урону нет.
				damagePerLevel: 33,
				critChancePerLevel: 0.010,
				critMultiplierPerLevel: 0.017,
				woundChancePerLevel: 0.010,
				shotIntervalReductionPerLevel: 2,
				heroHpPerLevel: 11,
				defensePerLevel: 0.001,
				defenseCap: 0.228,
				// temporaryUpgradePower убран по решению пользователя вместе с переходом на
				// систему связок из 3 статов — единая база 18% теперь одна на всех героев.
				// История балансировки (ревизия 11) осталась в git-истории файла.
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
				// листе «без апгрейдов» достигнута.
				balanceRevision: 20,
				name: 'luka',
				permanentGrowthProfile: 'marksman',
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.webp',
				fullImage: 'images/hero/3_luka/luka_full.webp',
				weaponImage: 'images/hero/3_luka/weapon.webp',
				aimImage: 'images/hero/3_luka/aim.webp',
				level: 1,
				startGlobalDamage: 90,
				startGlobalCritChance: 0.035,
				startGlobalCritMultiplier: 1.7,
				startGlobalWoundChance	: 0.01,
				// Ревизия 10 (живучесть): цель ~5 сильнейших ударов. Временные HP не
				// раздуваются через высокий heroHpCap — см. потолок забега в game.js.
				startHeroDamageReduction : 0.116,
				startSHOT_INTERVAL : 800,
				heroHP : 80,
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
				damageVariance: 0.05,
				// Ревизия 21: прирост за уровень — см. подробный комментарий у объекта eremei
				// (матчит герой 159 из реального отчёта DataExport). critChanceCap у Луки
				// не упирается за 40 применений — редиректа по урону нет.
				damagePerLevel: 13,
				critChancePerLevel: 0.001,
				critMultiplierPerLevel: 0.06,
				woundChancePerLevel: 0.002,
				shotIntervalReductionPerLevel: 12,
				heroHpPerLevel: 8,
				defensePerLevel: 0.0015,
				defenseCap: 0.196,
				minShotInterval: 120, 
				// temporaryUpgradePower убран по решению пользователя вместе с переходом на
				// систему связок из 3 статов — единая база 18% теперь одна на всех героев.
				// История балансировки (ревизии 11-13) осталась в git-истории файла.
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
				// Ревизия 11: damageMultiplier пересчитан реальным боем панели (см.
				// комментарий у профиля swift выше) — bump обязателен, иначе игрок с уже
				// сохранённой Милой не получит новые статы, пока не сбросит прокачку.
				balanceRevision: 15,
				name: 'mila',
				permanentGrowthProfile: 'swift',
				dispName: 'Мила Зеленова',
				image: 'images/hero/5_MilaZelenova/min.webp',
				fullImage: 'images/hero/5_MilaZelenova/full.webp',
				weaponImage: 'images/hero/5_MilaZelenova/weapon.webp',
				aimImage: 'images/hero/5_MilaZelenova/aim.webp',
				level: 1,
				startGlobalDamage: 20,
				startGlobalCritChance: 0.01,
				startGlobalCritMultiplier: 1.4,
				startGlobalWoundChance	: 0,
				// Ниже, чем у Луки (0.116) на старте — сырая живучесть без учёта регена
				// нарочно слабее его (см. комментарий выше объекта mila).
				startHeroDamageReduction : 0.01,
				startSHOT_INTERVAL : 100,
				// Личный пол равен старту — скорость заморожена навсегда (тот же приём,
				// что у Еремея/Дарьяны, только у неё пол на противоположном, самом
				// быстром конце шкалы, а не на медленном).
				minShotInterval: 100,
				// Ниже, чем у Луки (144) на старте — см. комментарий выше объекта mila.
				heroHP : 70,
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
				critChanceCap: 0.40,
				// woundChanceCap 0 == старту: шанс ранения заморожен на нуле, весь
				// его прирост редиректится в крит-урон.
				woundChanceCap: 0,
				// Ниже, чем у Луки (1200) — см. комментарий выше объекта mila.
				heroHpCap: 1000,
				damageVariance: 0.05,
				// Ревизия 21: прирост за уровень — см. подробный комментарий у объекта eremei
				// (матчит герой 159 из реального отчёта DataExport). critChanceCap у Милы
				// не упирается за 40 применений — редиректа по урону нет.
				damagePerLevel: 6,
				critChancePerLevel: 0.005,
				critMultiplierPerLevel: 0.02,
				woundChancePerLevel: 0,
				shotIntervalReductionPerLevel: 0,
				heroHpPerLevel: 15.40,
				defensePerLevel: 0.0001,
				defenseCap: 0.17,
				// Из 7 типов временных апгрейдов ей заблокированы 2 (скорость и ранение) —
				// личные потолки равны старту (см. выше).
				// temporaryUpgradePower убран по решению пользователя вместе с переходом на
				// систему связок из 3 статов — единая база 18% теперь одна на всех героев.
			},
			
			
			// Тихон Речкин — «Дрожащая рука». Разблокируется после 40-го уровня кампании.
			// Дерётся веслом (двуручный тяжёлый удар, не колющее древковое оружие) —
			// архетип «редкий тяжёлый удар», скорость атаки низкая и растёт слабо (см.
			// профиль tremor выше). Шанс ранения заморожен на 0 (никогда не растёт).
			// Живучесть — между Еремеем и Дуней (см. heroHP/startHeroDamageReduction/
			// heroHpCap ниже, примерно посередине между их значениями на старте и капами).
			// Особенность «Дрожащая рука» — единственный источник его настоящего ДПС-
			// разброса: и урон, и крит-шанс идут волной (см. TIKHON_SHAKE/getTikhonShake*
			// в game.js) — 3 секунды растут, 3 секунды падают, по кругу, без остановки.
			// На пике волны — shakeDamageMultiplierMax (×2.0 урона) одновременно с
			// shakeCritChanceBonusMax (+50% к шансу крита); на дне — почти ничего
			// (shakeDamageMultiplierMin ×0.01, shakeCritChanceBonusMin +1%). Базовые
			// статы (startGlobalDamage и т.д.) сами по себе — не «средний» ДПС Тихона,
			// а нижняя часть шкалы, на которую эта волна умножается: реальный средний
			// ДПС нужно мерить только реальным боем панели (см. CLAUDE.md §2), не
			// собственной формулой — тем более что волна дополнительно взаимодействует
			// с реальным critMultiplier/раскладкой критов, которую панель считает
			// по-настоящему, а не приблизительно. Цель по задаче: на удачном тайминге
			// (высокие P90/макс в реальном бою панели) — обгоняет Дарьяну, но не Луку;
			// на неудачном (низкие P10/мин) — падает ниже всех.
			//
			// Ревизия 2: первая прикидка (startGlobalDamage 75) подтверждена реальным
			// боем панели (экспорт 2026-08-20) — оказалась резко занижена на ОБОИХ
			// листах, стабильно по всей кампании, а не в паре точек: «без апгрейдов»
			// Тихон/Еремей (сейчас самый слабый ДПС в ростере намеренно) держится
			// ~0.65-0.72 от старта (лвл1) до конца (141), без выраженного расползания —
			// то есть проблема в стартовой базе, а не в кривой роста tremor (её
			// damageMultiplier 1.035 не сильно ниже остальных). «С апгрейдами» — та же
			// картина ещё жёстче: на разблокировке (камп.40) 964 DPS/5:06 на босса
			// против 1751-2748 DPS/1:47-2:48 у остальных пятерых. Живучесть при этом
			// ровно в цели (медиана ударов 8/12 на камп.40/141 — точно между Еремеем
			// 9/14 и Дуней 7/10), поэтому правим только урон.
			// 75 → 106 (×1.41, целимся вывести пассивный/неталантованный ДПС примерно
			// на уровень Еремея — нижняя граница ростера, с запасом на «удачный тайминг»
			// выше Дарьяны за счёт волны). Растущий профиль tremor не трогали — разрыв
			// стабилен по кампании, не расползается.
			// Подтверждено реальным боем панели (экспорт 2026-08-20 00:58): «без
			// апгрейдов» на камп.40 448 DPS против 443 у Еремея (почти вровень, как и
			// целились), на камп.141 2479 против 2726 (~91%). «С апгрейдами» на камп.40
			// 1348/3:39 на босса против 1579-2806/1:45-2:49 у остальных — в одном поле
			// с пачкой, не в отрыве. P10/P90-разброс не аномально широк относительно
			// остальных (у Еремея на 141-м даже шире) — явной имбы «если повезёт» нет.
			// По решению пользователя — играется приятно, останавливаемся здесь, дальше
			// не тюним.
			vas: {
				balanceRevision: 12,
				name: 'tikhon',
				permanentGrowthProfile: 'tremor',
				dispName: 'Тихон Речкин',
				image: 'images/hero/6_TihonRechkin/min.webp',
				fullImage: 'images/hero/6_TihonRechkin/full.webp',
				weaponImage: 'images/hero/6_TihonRechkin/weapon.webp',
				aimImage: 'images/hero/6_TihonRechkin/aim.webp',
				// Индикатор шкалы «Дрожащей руки» в статус-баре — не оружие, отдельная
				// картинка (бутылка самогона), см. showTikhonShakeGauge в game.js.
				bottleImage: 'images/hero/6_TihonRechkin/bottle.webp',
				level: 1,
				startGlobalDamage: 126,
				startGlobalCritChance: 0.03,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance: 0,
				startHeroDamageReduction: 0.045,
				startSHOT_INTERVAL: 900,
				// Личный пол выше общего минимума 200мс — скорость растёт, но слабо (см.
				// tremor.shotIntervalReduction выше) — архетип не про частоту атаки.
				minShotInterval: 750,
				heroHP: 160,
				lvlUnlock: 40,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: false,
				feature: 'Дрожащая рука — <br>урон ×0.01…×2.0 и шанс крита +1%…+50%<br>качаются волной: 3 сек вверх, 3 сек вниз, по кругу',
				// Волна «Дрожащей руки» — период и границы качания. См. getTikhonShakeConfig
				// в game.js: cycleMs — полный период (пол-периода на подъём, пол на спад).
				shakeCycleMs: 6000,
				shakeDamageMultiplierMin: 0.01,
				shakeDamageMultiplierMax: 2.0,
				shakeCritChanceBonusMin: 0.01,
				shakeCritChanceBonusMax: 0.50,
				critChanceCap: 0.15,
				woundChanceCap: 0,
				heroHpCap: 3000,
				damageVariance: 0.15,
				// Ревизия 21: прирост за уровень — см. подробный комментарий у объекта eremei
				// (матчит герой 159 из реального отчёта DataExport). У Тихона critChanceCap
				// упирается на 35-м из 40 ходов урона — последние 5 удвоены редиректом:
				// 35×1 + 5×2 = 45 применений инкремента, damagePerLevel = (498.5-106)/45
				// (а не /40 — та же ошибка деления, что была у Дуни, см. её комментарий).
				damagePerLevel: 11,
				critChancePerLevel: 0.001,
				critMultiplierPerLevel: 0.06,
				woundChancePerLevel: 0,
				shotIntervalReductionPerLevel: 1.2,
				heroHpPerLevel: 18.60,
				defensePerLevel: 0.00015,
				defenseCap: 0.17,
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
