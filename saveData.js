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

// «Перекачка» после героя-уровня 160 — тот же архитектурный приём, что и у
// BOSS_HEALTH_LEVEL_ADJUSTMENTS/getBossHealthLevelMultiplier ниже (плавная ускоряющаяся
// кривая через Math.exp от прогресса внутри диапазона), применённая к цене прокачки
// вместо HP боссов. fromLevel — множитель РОВНО 1 (никакого скачка цены в самой точке
// перехода, herolevel 160 стоит ИДЕНТИЧНО прежней формуле — правило пользователя «не
// резкий скачок»); дальше множитель гладко ускоряется до toLevel.
// scale/exponent подобраны (не на глаз) так, чтобы суммарная цена прокачки 160→200
// (40 покупок) совпадала с целью пользователя: getLevelZlataPayout(141, 5, 5) на
// сложности 500 (см. difficulty.js), взятое 100 раз — реальными функциями, не
// переписанной формулой (см. scripts-заметку в истории коммитов при желании
// перепроверить: getLevelZlataPayout(141,5,5) при LEVEL_DIFFICULTY=500 ≈ 5 339 700,
// ×100 ≈ 533 970 000 — и это ровно то, что получается с этими scale/exponent).
// Результат: рядом с 160 прирост цены за уровень почти не отличается от базовых 6%
// (лвл 161 — уже ~10.7% вместо 6%, а не единомоментный множитель ×N), и только к концу
// диапазона (герой-уровень ~190-199) ускорение становится действительно резким —
// ступенчато нарастающий процент прироста, а не одна ступенька.
const HERO_UPGRADE_OVERDRIVE = Object.freeze({
    fromLevel: 160,
    toLevel: HERO_MAX_LEVEL,
    scale: 0.276,
    exponent: 6
});

function getHeroUpgradeOverdriveMultiplier(heroLevel) {
    const { fromLevel, toLevel, scale, exponent } = HERO_UPGRADE_OVERDRIVE;
    if (heroLevel <= fromLevel) return 1;
    const span = Math.max(1, toLevel - fromLevel);
    const progress = Math.min(1, (heroLevel - fromLevel) / span);
    return 1 + scale * (Math.exp(exponent * progress) - 1);
}
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

// Личный потолок крит-урона от временных апгрейдов — необязательный (undefined у
// героя без явного поля = по-прежнему без потолка, как и раньше у всех). Введён для
// Тихона: у него единственного крит-урон дополнительно множится на пик волны
// «Дрожащей руки» (см. shakeDamageMultiplierMax в game.js) — без потолка два ничем не
// ограниченных множителя перемножаются и дают ваншот-риск, подтверждённый вживую
// (реальный забег поймал крит на 100 000 против рассчитанных панелью ~40 000 на
// синтетической выборке — см. CLAUDE.md, разбор баланса Тихона).
function getHeroCritMultiplierCap(hero) {
    return hero?.critMultiplierCap;
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

    const baseCost = HERO_UPGRADE_BASE_COST * Math.pow(HERO_UPGRADE_COST_GROWTH, normalizedLevel - 1);
    return Math.max(1, Math.round(
        baseCost * getHeroUpgradeOverdriveMultiplier(normalizedLevel)
    ));
}

// Выбранная игроком сложность уровня на этом заходе (см. index.html — окно выбора при
// входе на уровень, difficulty.js). LEVEL_DIFFICULTY — глобальная переменная верхнего
// уровня, объявленная в level.html из URL-параметра ?difficulty=N (та же лексическая
// область видимости скриптов одной страницы, что и у lvlNumber/bossCombatConfig — см.
// PROBE_SCRIPT_SOURCE в admin-balance-panel.html, где этот же приём уже использовался для
// isGamePaused). В контекстах, где её вообще нет (страница не через level.html, песочница
// ProgressionEngine админ-панели) — typeof-проверка, безопасный дефолт: сложность 1
// (минимальная выбираемая сложность в игре — не «выключенная» сложность, отдельного
// «нулевого» варианта нет).
function getCurrentLevelDifficulty() {
    const raw = typeof LEVEL_DIFFICULTY !== 'undefined' ? Number(LEVEL_DIFFICULTY) : 1;
    return Number.isFinite(raw) ? Math.max(1, Math.floor(raw)) : 1;
}

// Единая точка для ВСЕХ начислений, зависящих от сложности — урон боссов (ниже), HP
// боссов (calculateBossMaxHealth в game.js), злато (getLevelZlataPayout ниже) и рейтинг
// (recordLevelCompletion ниже) читают отсюда, а не пересчитывают каждый сам по себе.
// Это и есть «универсально раз и навсегда»: чтобы добавить сложность новому уровню,
// ничего в его gameDataN.js трогать не нужно.
function getDifficultyMultiplier() {
    return 1 + getCurrentLevelDifficulty() * 0.10;
}

// Ревизия 10: levelNumber больше не используется (см. комментарий ревизии 10 выше у
// прежнего BOSS_DAMAGE_BALANCE) — параметр оставлен в сигнатуре, чтобы не трогать вызовы
// в game.js/скриптах, которые продолжают его передавать; вся прогрессия сложности
// приходит через bossMultiplier/phaseMultiplier/levelMultiplier — то есть напрямую из
// данных уровня.
// Ревизия 11: без потолка на произведение множителей.
// Сложность уровня (getDifficultyMultiplier) домножается сюда же — это урон именно
// БОССА (реальная величина одного удара), не механика/паттерн атаки, который не меняется.
function calculateBossAttackDamage(
    configuredAttackDamage,
    bossMultiplier,
    phaseMultiplier,
    levelMultiplier
) {
    const combatMultiplier = Math.max(0, Number(bossMultiplier) || 0)
        * Math.max(0, Number(phaseMultiplier) || 0)
        * Math.max(0, Number(levelMultiplier) || 0)
        * getDifficultyMultiplier();

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

// Сложность (getDifficultyMultiplier) — здесь, а не в getLevelZlataReward выше: там
// живёт «база» уровня, которую панель баланса использует напрямую для проекции
// экономики кампании (buildCampaignToHeroLevelMap) — трогать её незачем, реальная
// выплата (эта функция) домножается уже поверх.
function getLevelZlataPayout(levelNumber, defeatedBosses, totalBosses = 5) {
    const normalizedBossCount = Math.max(1, Math.floor(Number(totalBosses) || 1));
    const normalizedDefeated = Math.min(
        normalizedBossCount,
        Math.max(0, Math.floor(Number(defeatedBosses) || 0))
    );

    return Math.floor(
        getLevelZlataReward(levelNumber) * (normalizedDefeated / normalizedBossCount) * getDifficultyMultiplier()
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
// currentLevel (опционально) — уровень героя ДО этого применения (level, который станет
// level+1 после). Нужен только для нелинейных «финишных» рычагов, привязанных к
// конкретному участку кривой (см. jackpotAttackChanceLateBonusPerLevel ниже) — если не
// передан, такие рычаги просто не срабатывают (безопасный дефолт, ничего не ломается у
// героев/вызовов без него).
function applyHeroPermanentStatUpgrade(hero, currentLevel) {
    if (hero.upSpecif === 1) {
        const critChanceCap = getHeroCritChanceCap(hero);
        const critChanceCapped = Number.isFinite(critChanceCap) && hero.startGlobalCritChance >= critChanceCap;
        // damageLateBonusPerLevel (опционально, поверх обычного роста) — тот же нелинейный
        // «финишный рывок», что и у crit/jackpot-бонусов выше, но на ПРЯМОЙ урон, не через
        // вероятностный гейт (крит-шанс/джекпот) — нужен героям с очень низким крит-шансом
        // (Мила: 0.16 на hl=200), где крит-урон физически не может дать заметный сдвиг, раз
        // сам крит почти никогда не срабатывает. У героев без этого поля безопасно
        // трактуется как 0.
        const damageLateBonusStart = Number(hero.damageLateBonusStartLevel) || Infinity;
        const damageLateBonus = Number.isFinite(currentLevel) && currentLevel >= damageLateBonusStart
            ? (Number(hero.damageLateBonusPerLevel) || 0)
            : 0;
        const damagePerLevel = (Number(hero.damagePerLevel) || 0) + damageLateBonus;

        hero.startGlobalDamage += damagePerLevel;
        if (!critChanceCapped) {
            const nextCritChance = hero.startGlobalCritChance + (Number(hero.critChancePerLevel) || 0);
            hero.startGlobalCritChance = Number.isFinite(critChanceCap)
                ? Math.min(critChanceCap, nextCritChance)
                : nextCritChance;
        } else {
            hero.startGlobalDamage += damagePerLevel;
        }
        // Джекпот-шанс (Дуня, «Раскрутилась») — параллельный крит-шансу канал роста, тот
        // же такт (upSpecif===1), со своим потолком. У героев без jackpotAttackChancePerLevel
        // безопасно трактуется как 0 (см. общий комментарий у функции выше про поля без
        // явного *PerLevel) — на остальной ростер эта ветка не влияет вообще.
        //
        // jackpotAttackChanceLateBonusPerLevel (опционально, поверх обычного роста) —
        // НЕЛИНЕЙНЫЙ «финишный рывок» на последних уровнях (currentLevel >=
        // jackpotAttackChanceLateBonusStartLevel). По прямому запросу пользователя: у Луки
        // shotInterval падает до жёсткого пола РОВНО к hl=200 (реальный скачок скорости в
        // последних ~5 уровнях, не постепенный) — линейный рост Дуни физически не может
        // воспроизвести такой же скачок именно в конце, либо недожимает хвост, либо
        // перекачивает всю кривую целиком (см. историю раундов 4-7 выше). Отдельный бонус,
        // применяющийся ТОЛЬКО на последних уровнях, даёт нужный несимметричный рывок, не
        // трогая середину/раннюю игру.
        const jackpotPerLevel = Number(hero.jackpotAttackChancePerLevel) || 0;
        const jackpotLateBonusStart = Number(hero.jackpotAttackChanceLateBonusStartLevel) || Infinity;
        const jackpotLateBonus = Number.isFinite(currentLevel) && currentLevel >= jackpotLateBonusStart
            ? (Number(hero.jackpotAttackChanceLateBonusPerLevel) || 0)
            : 0;
        if (jackpotPerLevel > 0 || jackpotLateBonus > 0) {
            const jackpotCap = Number.isFinite(hero.jackpotAttackChanceCap) ? hero.jackpotAttackChanceCap : undefined;
            const nextJackpot = (Number(hero.jackpotAttackChance) || 0) + jackpotPerLevel + jackpotLateBonus;
            hero.jackpotAttackChance = Number.isFinite(jackpotCap) ? Math.min(jackpotCap, nextJackpot) : nextJackpot;
        }
        hero.upSpecif = 2;
    } else if (hero.upSpecif === 2) {
        // Растущий потолок крит-урона (правило 13 CLAUDE.md, Тихон): critMultiplierCap —
        // единственный канал роста, который у Тихона (в отличие от Луки, у него потолка
        // нет вообще) со временем закрывается — постоянная прокачка упирается в него уже
        // к середине игры, и с этого момента герой ТЕРЯЕТ доступ к апгрейду «крит-урон» и
        // в забегах тоже (isUpgradeStatEligibleNow в game.js гейтит именно по этому же
        // потолку). Даём потолку расти вместе с уровнем героя — тем же приёмом, что и у
        // остальных статов «за уровень» — чтобы запас крита не заканчивался так рано.
        // critMultiplierCapPerLevel есть только у Тихона; у остальных героев (без
        // критМультиплиерКапа вообще) Number.isFinite(hero.critMultiplierCap) === false,
        // условие ниже не сработает — их потолок как был отсутствующим, так и остаётся.
        const critMultiplierCapPerLevel = Number(hero.critMultiplierCapPerLevel) || 0;
        // critMultiplierCapLateBonusPerLevel (опционально, поверх обычного роста потолка) —
        // тот же нелинейный «финишный рывок» приём, что и у остальных *LateBonusPerLevel
        // выше, только на РОСТ САМОГО ПОТОЛКА, не на стат под ним. Нужен героям, у которых
        // потолок обязан оставаться туго прижатым к натуральному росту в середине игры
        // (иначе герой ломает правило 13 задолго до хвоста — см. Тихона), но должен
        // ускоренно раскрываться именно в последних уровнях. У героев без этого поля
        // безопасно трактуется как 0.
        const critMultiplierCapLateBonusStart = Number(hero.critMultiplierCapLateBonusStartLevel) || Infinity;
        const critMultiplierCapLateBonus = Number.isFinite(currentLevel) && currentLevel >= critMultiplierCapLateBonusStart
            ? (Number(hero.critMultiplierCapLateBonusPerLevel) || 0)
            : 0;
        if (Number.isFinite(hero.critMultiplierCap) && (critMultiplierCapPerLevel > 0 || critMultiplierCapLateBonus > 0)) {
            hero.critMultiplierCap += critMultiplierCapPerLevel + critMultiplierCapLateBonus;
        }
        const woundChanceCap = getHeroWoundChanceCap(hero);
        const woundChanceCapped = Number.isFinite(woundChanceCap) && hero.startGlobalWoundChance >= woundChanceCap;
        const critMultiplierCap = getHeroCritMultiplierCap(hero);
        const critMultiplierPerLevel = Number(hero.critMultiplierPerLevel) || 0;
        // critMultiplierLateBonusPerLevel (опционально, поверх обычного роста) — тот же
        // нелинейный «финишный рывок», что и у jackpotAttackChanceLateBonusPerLevel выше
        // (см. её комментарий про скачок скорости Луки к hl=200) — только для крит-урона.
        // У героев без этого поля безопасно трактуется как 0.
        const critMultiplierLateBonusStart = Number(hero.critMultiplierLateBonusStartLevel) || Infinity;
        const critMultiplierLateBonus = Number.isFinite(currentLevel) && currentLevel >= critMultiplierLateBonusStart
            ? (Number(hero.critMultiplierLateBonusPerLevel) || 0)
            : 0;
        // Клэмп на каждое приращение отдельно (а не один раз в конце) — тот же принцип,
        // что и у critChance/heroHP/defense выше и ниже: у героя без явного
        // critMultiplierCap (все, кроме Тихона) Number.isFinite(undefined) === false,
        // поведение не меняется вообще.
        const growCritMultiplier = () => {
            const nextCritMultiplier = hero.startGlobalCritMultiplier + critMultiplierPerLevel + critMultiplierLateBonus;
            hero.startGlobalCritMultiplier = Number.isFinite(critMultiplierCap)
                ? Math.min(critMultiplierCap, nextCritMultiplier)
                : nextCritMultiplier;
        };

        growCritMultiplier();
        if (!woundChanceCapped) {
            const nextWoundChance = hero.startGlobalWoundChance + (Number(hero.woundChancePerLevel) || 0);
            hero.startGlobalWoundChance = Number.isFinite(woundChanceCap)
                ? Math.min(woundChanceCap, nextWoundChance)
                : nextWoundChance;
        } else {
            // Редирект (шанс ранения упёрся в потолок — весь прирост уходит в крит-урон
            // вместо него, см. комментарий у объекта eremei) — у Тихона именно этот
            // редирект и разгонял critMultiplier без потолка (startGlobalWoundChance ==
            // woundChanceCap == 0 с самого старта, редирект срабатывает КАЖДЫЙ раз).
            growCritMultiplier();
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
        applyHeroPermanentStatUpgrade(rebuiltHero, level);
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
        applyHeroPermanentStatUpgrade(referenceHero, level);
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

    // Переименование ключей героев вслед за игровым именем: Тихон Речкин раньше
    // лежал под ключом 'vas' (при этом его .name уже был 'tikhon' — см. историю
    // этого разнобоя в комментарии getActiveHeroKey в admin-balance-panel.html),
    // Елисей — под заглушкой 'gen', Клим Глыбов — под заглушкой 'gm'. Без этого шага
    // прогресс (level/investedZlata/unlock) в уже существующих сохранениях молча
    // терялся бы: под новыми ключами ('tikhon'/'elisey'/'klim') в defaults для
    // старых записей ничего бы не нашлось, и герой откатился бы к чистому дефолту.
    const LEGACY_HERO_KEY_RENAMES = { vas: 'tikhon', gen: 'elisey', gm: 'klim' };
    Object.entries(LEGACY_HERO_KEY_RENAMES).forEach(([oldKey, newKey]) => {
        if (isPlainObject(savedState[oldKey]) && !isPlainObject(savedState[newKey])) {
            savedState[newKey] = savedState[oldKey];
        }
        delete savedState[oldKey];
        if (Array.isArray(savedState.mHero)) {
            savedState.mHero = savedState.mHero.map(key => key === oldKey ? newKey : key);
        }
        if (savedState.activeHero === oldKey) {
            savedState.activeHero = newKey;
        }
    });

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

    const savedDifficulty = isPlainObject(savedState.levelDifficulty) ? savedState.levelDifficulty : {};
    migrated.levelDifficulty = {};
    Object.entries(savedDifficulty).forEach(([level, difficulty]) => {
        const levelNumber = Number(level);
        const normalizedDifficulty = Math.floor(Number(difficulty));
        if (Number.isInteger(levelNumber) && levelNumber > 0 && Number.isInteger(normalizedDifficulty) && normalizedDifficulty >= 1) {
            migrated.levelDifficulty[levelNumber] = normalizedDifficulty;
        }
    });

    const normalizedDefaultDifficulty = Math.floor(Number(savedState.defaultLevelDifficulty));
    migrated.defaultLevelDifficulty = Number.isInteger(normalizedDefaultDifficulty) && normalizedDefaultDifficulty >= 1
        ? normalizedDefaultDifficulty
        : defaults.defaultLevelDifficulty;

    // levelRecords — источник истины для рейтинга (см. окно детализации в index.html и
    // комментарий у levelRecords в getDefaultGameState). Два пути: (1) уже есть записи
    // нового формата — просто провалидировать; (2) старое сохранение, до этой ревизии,
    // знает только плоский levelTimes — честно восстанавливаем что можем: сложность
    // берём из уже смигрированного levelDifficulty выше как лучшее доступное
    // приближение (по факту это «сложность последнего СТАРТА», не «сложность именно
    // рекордного забега», точнее взять неоткуда), герой никогда не отслеживался — null.
    // Старый непрозрачный gameState.skillPoints (бегущий накопитель дельт) нигде не
    // используется — рейтинг с этой ревизии всегда живая сумма finalPoints ниже.
    migrated.levelRecords = {};
    if (isPlainObject(savedState.levelRecords)) {
        Object.entries(savedState.levelRecords).forEach(([level, record]) => {
            const levelNumber = Number(level);
            const time = Number(record?.time);
            if (!Number.isInteger(levelNumber) || levelNumber <= 0 || !isPlainObject(record) || !Number.isFinite(time) || time < 0) return;
            const difficulty = Number.isInteger(record.difficulty) && record.difficulty >= 1 ? record.difficulty : 1;
            const basePoints = Math.max(0, 600 - time);
            migrated.levelRecords[levelNumber] = {
                time,
                difficulty,
                heroKey: typeof record.heroKey === 'string' ? record.heroKey : null,
                basePoints,
                finalPoints: Number.isFinite(record.finalPoints) && record.finalPoints >= 0
                    ? Math.round(record.finalPoints)
                    : Math.round(basePoints * (1 + difficulty * 0.10))
            };
        });
    } else if (isPlainObject(savedState.levelTimes)) {
        Object.entries(savedState.levelTimes).forEach(([level, time]) => {
            const levelNumber = Number(level);
            const normalizedTime = Number(time);
            if (!Number.isInteger(levelNumber) || levelNumber <= 0 || !Number.isFinite(normalizedTime) || normalizedTime < 0) return;
            const difficulty = migrated.levelDifficulty[levelNumber] ?? 1;
            const basePoints = Math.max(0, 600 - normalizedTime);
            migrated.levelRecords[levelNumber] = {
                time: normalizedTime,
                difficulty,
                heroKey: null,
                basePoints,
                finalPoints: Math.round(basePoints * (1 + difficulty * 0.10))
            };
        });
    }
    delete migrated.levelTimes;
    delete migrated.skillPoints;

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

	// Сложность запоминается в момент СТАРТА уровня (см. onStart в difficulty.js,
	// вызывается из окна выбора при клике «Начать»), а не здесь — пользователь явно
	// уточнил: «переопределяется последним числом, с которым НАЧАЛИ прохождение», не
	// обязательно прошли. Поражение тоже должно запомниться, а completeLevel вызывается
	// только при победе (см. showEndGameModal).
	recordLevelCompletion(lvlNumber, timeSec2);
    let firstRegionFinalClear = false;
    if (lvlNumber > gameState.lastCompletedLevel) {
        gameState.lastCompletedLevel = lvlNumber;

		if (typeof levelCompletionConfig !== 'undefined' && levelCompletionConfig.isRegionFinal) {
			firstRegionFinalClear = true;
			const completionMessage = levelCompletionConfig.completionMessage || 'Область пройдена!';
			rowTotal = rowTotal + `<div class="endgame-unlock-banner">🔓 ${completionMessage}</div>`;
		} else {
			rowTotal = rowTotal + `<div class="endgame-unlock-banner">🔓 Разблокирован уровень ${lvlNumber+1}!</div>`;
		}

        gameState.mHero.forEach(heroKey => {
            const hero = gameState[heroKey];
            if (!hero) return;

            if (hero.lvlUnlock <= lvlNumber && hero.unlock == false) {
                hero.unlock = true;
				// Портрет героя тут можно показывать открыто — герой только что разблокирован
				// именно в этот момент (в отличие от боевого трека прогресса на index.html,
				// который обязан скрывать портрет ДО разблокировки).
				rowTotal = rowTotal + `
					<div class="endgame-hero-unlock-banner">
						<img class="endgame-hero-unlock-portrait" src="${hero.image}" alt="${hero.dispName}">
						<div class="endgame-hero-unlock-body">
							<span class="endgame-hero-unlock-kicker">✨ Новый герой разблокирован!</span>
							<span class="endgame-hero-unlock-name">${hero.dispName}</span>
						</div>
						<button type="button" class="endgame-button endgame-hero-unlock-goto" data-hero="${heroKey}">Перейти к персонажам</button>
					</div>`;
            }
        }); // Добавлена закрывающая скобка

		// Трек прогресса до следующего героя — показывается только тут (в окне победы),
		// при прохождении уровня, который раньше не был пройден, по прямому запросу
		// пользователя (изначально был ещё и в шапке меню на index.html, но пользователь
		// попросил убрать его оттуда и оставить только здесь). Если герой только что
		// разблокировался парой строк выше, эта функция уже вызывается ПОСЛЕ того
		// forEach, поэтому корректно укажет на СЛЕДУЮЩЕГО ещё не открытого героя.
		const heroUnlockProgress = getHeroUnlockProgress();
		if (heroUnlockProgress) {
			const remainingLabel = heroUnlockProgress.remaining > 0
				? `${heroUnlockProgress.remaining} ${pluralizeLevels(heroUnlockProgress.remaining)}`
				: 'Уже пора!';
			rowTotal = rowTotal + `
				<div class="endgame-hero-track">
					<div class="hero-track-portrait locked" aria-hidden="true"><span>?</span></div>
					<div class="hero-track-body">
						<div class="hero-track-top">
							<span class="hero-track-title">До нового героя</span>
							<span class="hero-track-count">${remainingLabel}</span>
						</div>
						<div class="hero-track-bar">
							<div class="hero-track-fill" data-target-width="${heroUnlockProgress.progressPct}" style="width:0%"></div>
						</div>
					</div>
				</div>`;
		}

        saveGameState();
    }
    return firstRegionFinalClear;
}

// Универсальный расчёт прогресса до следующего разблокируемого героя — единственный
// источник этой логики (см. правило 1 в CLAUDE.md про недопустимость дублей), читает
// его трек-баннер в completeLevel выше. Не завязана на конкретных героях/уровнях —
// смотрит на gameState.mHero и поля lvlUnlock/unlock каждого героя, поэтому
// переживёт любую правку lvlUnlock или добавление героя.
function getHeroUnlockProgress() {
	const lastCompleted = Number(gameState.lastCompletedLevel) || 0;

	// startsUnlocked — герой доступен с самого начала игры (unlock:true в дефолтном
	// состоянии), а не разблокирован прохождением. У таких героев lvlUnlock
	// декоративный/неактуальный (см. luka — unlock:true, но lvlUnlock:3) — учитывать
	// его как пройденную веху нельзя, иначе бар может показывать 0% сразу после
	// реального прогресса или прыгать назад, когда lastCompleted "нагоняет" такого
	// героя. getDefaultGameState() — тот же самый источник правды, что уже
	// используется при миграции сохранений, ничего не дублируем вручную.
	const defaults = getDefaultGameState();

	const heroEntries = (gameState.mHero || [])
		.map(heroKey => ({
			heroKey,
			hero: gameState[heroKey],
			startsUnlocked: !!defaults[heroKey]?.unlock,
		}))
		.filter(entry => entry.hero && Number.isFinite(entry.hero.lvlUnlock));

	const nextLocked = heroEntries
		.filter(entry => !entry.hero.unlock)
		.sort((a, b) => a.hero.lvlUnlock - b.hero.lvlUnlock)[0];

	if (!nextLocked) return null;

	const prevMilestone = heroEntries
		.filter(entry => entry.hero.unlock && !entry.startsUnlocked)
		.reduce((max, entry) => Math.max(max, entry.hero.lvlUnlock), 0);

	const nextMilestone = nextLocked.hero.lvlUnlock;
	const span = Math.max(1, nextMilestone - prevMilestone);
	const progressPct = Math.max(0, Math.min(100, Math.round((lastCompleted - prevMilestone) / span * 100)));
	const remaining = Math.max(0, nextMilestone - lastCompleted);

	return {
		remaining,
		progressPct,
		nextHeroKey: nextLocked.heroKey,
		nextHeroDispName: nextLocked.hero.dispName,
	};
}

// Склонение "уровень/уровня/уровней" для трек-баннера выше.
function pluralizeLevels(n) {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return 'уровень';
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'уровня';
	return 'уровней';
}

function addZlat(zlatP) {

		gameState.zlata = gameState.zlata + zlatP;
        saveGameState();

}

// Глобальная сложность по умолчанию (настройки, index.html) — используется, только
// пока игрок ещё ни разу не заходил на конкретный уровень ни с какой сложностью (см.
// getLevelDifficulty ниже). Дефолт 1 — минимальная сложность в игре, отдельного
// «нулевого»/выключенного варианта нет.
function getDefaultLevelDifficulty() {
    const stored = gameState.defaultLevelDifficulty;
    return Number.isInteger(stored) && stored >= 1 ? stored : 1;
}

function setDefaultLevelDifficulty(difficulty) {
    const normalized = Math.max(1, Math.floor(Number(difficulty) || 1));
    gameState.defaultLevelDifficulty = normalized;
    saveGameState();
    return normalized;
}

// Сложность конкретного уровня — приоритет: (1) число, с которым игрок последний раз
// НАЧАЛ заход именно на этот уровень (см. setLevelDifficulty — пишется в момент старта,
// а не прохождения, см. её комментарий), (2) если уровень ещё ни разу не начинали —
// глобальная сложность по умолчанию из настроек, (3) если и её не задавали — 1.
function getLevelDifficulty(levelNumber) {
    const stored = gameState.levelDifficulty[levelNumber];
    if (Number.isInteger(stored) && stored >= 1) return stored;
    return getDefaultLevelDifficulty();
}

// Вызывается из difficulty.js в момент старта уровня (клик «Начать» в окне выбора) —
// именно старта, не прохождения: пользователь явно уточнил, что запоминаться должно
// число, с которым НАЧАЛИ заход, независимо от исхода (победа/поражение).
function setLevelDifficulty(levelNumber, difficulty) {
    const normalized = Math.max(1, Math.floor(Number(difficulty) || 1));
    gameState.levelDifficulty[levelNumber] = normalized;
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
    applyHeroPermanentStatUpgrade(hero, hero.level);

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


// Правило прозрачности рейтинга (см. окно детализации в index.html, открывается кликом
// по «Рейтинг» в шапке): показанная сумма ДОЛЖНА быть суммой видимых строк, без единой
// скрытой добавки. Поэтому здесь больше нет бегущего накопителя (как раньше
// gameState.skillPoints, который прибавлял дельту, посчитанную по сложности МОМЕНТА
// улучшения рекорда, — задним числом невозможно понять, откуда взялось число) — вместо
// этого один ПОЛНЫЙ рекорд на уровень (время + сложность/герой именно этого забега +
// уже готовые очки), а итог в шапке считается на лету суммированием этих записей
// (getTotalRatingPoints ниже) — то есть в принципе не может разойтись с таблицей.
function recordLevelCompletion(level, timeInSeconds) {
	const existing = gameState.levelRecords[level];

	const difficulty = getCurrentLevelDifficulty();
	const heroKey = typeof getActiveHeroSaveKey === 'function' ? getActiveHeroSaveKey() : gameState.activeHero;
	const basePoints = Math.max(0, 600 - timeInSeconds);
	const finalPoints = Math.round(basePoints * getDifficultyMultiplier());

	// Лучший результат — это лучшие ИТОГОВЫЕ ОЧКИ, а не лучшее время: забег на более
	// высокой сложности может дать больше очков даже с худшим временем, и такой забег
	// обязан заменить рекорд (совпадение очков тоже не считается — как и раньше со временем).
	if (existing && finalPoints <= existing.finalPoints) return;

	if (existing) {
		rowTotal = rowTotal + `<div class="endgame-record-banner endgame-record-prev">Прошлый лучший результат: ${existing.finalPoints} (время ${formatTime(existing.time)})</div>`;
	}

	gameState.levelRecords[level] = { time: timeInSeconds, difficulty, heroKey, basePoints, finalPoints };

	const bonusPct = Math.round((getDifficultyMultiplier() - 1) * 100);
	rowTotal = rowTotal + `<div class="endgame-record-banner endgame-record-new">
		<span class="endgame-record-badge">🏅 Новый рекорд уровня!</span>
		<span class="endgame-record-formula">${basePoints} очков + бонус сложности ${bonusPct}%</span>
		<span class="endgame-record-total">+<span data-count-to="${finalPoints}">0</span> к рейтингу</span>
	</div>`;

	saveGameState();
}

// Единственный источник итогового рейтинга в игре — шапка (index.html) и итоговая
// строка окна детализации читают ИМЕННО эту функцию, не отдельно хранимое число.
function getTotalRatingPoints() {
	return Object.values(gameState.levelRecords).reduce(
		(sum, record) => sum + (Number(record?.finalPoints) || 0),
		0
	);
}

// Раньше жила в game.js — переехала сюда, потому что нужна и index.html (окно
// детализации рейтинга), который game.js вообще не грузит, а saveData.js грузят обе
// страницы.
function formatTime(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
			// Один рекорд на уровень — время ЛУЧШЕГО прохождения плюс сложность/герой
			// именно того забега, который его установил, и уже готовые очки (см.
			// recordLevelCompletion/getTotalRatingPoints). Общий рейтинг в шапке — это
			// ВСЕГДА живая сумма finalPoints по всем записям здесь, без отдельного
			// счётчика — окно детализации в index.html должно показывать ровно то, из
			// чего складывается число в шапке, без расхождений.
			levelRecords: {
	          },
			// Сложность, с которой последний раз НАЧАЛИ заход на уровень — ключ: номер
			// уровня, значение: целое ≥1 (см. getLevelDifficulty/setLevelDifficulty). Тот
			// же плоский формат, что и у levelRecords выше.
			levelDifficulty: {
	          },
			// Сложность по умолчанию для уровней, на которые ещё ни разу не заходили —
			// настройки, index.html (см. getDefaultLevelDifficulty/setDefaultLevelDifficulty).
			defaultLevelDifficulty: 1,
			mHero: ['eremei', 'daryana', 'luka', 'dunya', 'mila', 'tikhon', 'elisey', 'klim', 'kir', 'gam', 'gama','gamb','gamc', 'gamd','game','gamf', 'gamg', 'gamh', ],
			activeHero: 'eremei',
			zlata: 0,
			// Состояние галочки "Повышать на максимум" у кнопки прокачки героя в
			// index.html (openCharacterSelect/upgradeHero) — глобальная настройка UI, не
			// привязана к конкретному герою.
			maxUpgradeMode: false,
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
				balanceRevision: 38,
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
				// Ревизия 33 (лог-факт, прямое указание пользователя после нулевого эффекта
				// двух попыток роста потолка крит-урона, см. ревизии 31-32): «когда у него не
				// было потолка крит урона у него был шанс обогнать луку и был очень не плохой
				// шанс — значит нужные статы способны дать нужный результат». Первая попытка —
				// одновременно поднять урон+критШанс+критУрон (260/20/0.009/13.0/0.11/0.13) —
				// ПЕРЕЛЕТЕЛА жёстко: полный прогон (balance-report_2026-09-02_22-23-42.xls)
				// показал среднее ДПС Еремея выше Луки в 148/150 строк (98.7%, mean_ratio=1.347)
				// — прямое нарушение железного условия «Лука остаётся топ-1» (правило 13
				// CLAUDE.md), а хвост улетел с -32pp до +42.7pp. Три мультипликативных рычага
				// (урон×критШанс×критУрон), поднятые ОДНОВРЕМЕННО, перемножились, а не
				// сложились. Откатываю урон и крит-шанс к исходным значениям — правлю только
				// потолок крит-урона отдельно (см. critMultiplierCap/critMultiplierPerLevel
				// ниже), одним рычагом за раз, по правилу 14.
				// Ревизия 37 (лог-факт, построчная проверка hl=6-60, не бакетами —
				// balance-report_2026-09-02_23-02-50.xls): подъём потолка крит-урона (22→32)
				// вытянул середину-хвост (hl 121-180) точно в target-коридор пользователя
				// 30-35%, но НЕ помог раннему-среднему диапазону (hl 6-60 держится 2-20%,
				// устойчиво по каждой строке, не выброс) — ожидаемо: натуральный crit-mult на
				// этих уровнях (1.6-3.х) далёк от любого потолка, рычаг здесь не при делах.
				// Первая попытка одновременного подъёма урона (230→260) + крит-шанса + крит-
				// урона перелетела (ревизия 33-34 выше) — но это было ТРИ рычага разом. Теперь
				// пробую ТОЛЬКО урон, изолированно, тем же значением 260 — оно двигает именно
				// РАННИЙ бой (startGlobalDamage — разовая база, не растёт с уровнем, влияние
				// сильнее всего там, где damagePerLevel ещё не накопился).
				startGlobalDamage: 260,
				startGlobalCritChance: 0.10,
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
				// Ревизия 37 (продолжение, лог-факт): 17→19 перелетело — hl 101-180 ушёл до
				// 40-47% (цель 30-35%, balance-report_2026-09-02_23-07-21.xls), тогда как hl
				// 21-60 всё ещё недобирал (25-29%). Компаундящийся рычаг слишком резко бьёт по
				// хвосту при попытке подтянуть середину. Возврат на полшага: 17→18.
				damagePerLevel: 18,
				// Ревизия 33: откат к исходному 0.006 — см. комментарий у startGlobalDamage.
				critChancePerLevel: 0.006,
				// Ревизия 22 (задача «шанс обогнать Луку», win-rate-vs-luka.js — правило 1):
				// хвост (герой-уровень 159-200) давал 0% шанс на удачном заходе, хотя
				// критChanceCap высокий (0.65) и лимита на critMultiplier у него вообще нет
				// (как и у Луки) — просто рос медленнее. Еремей не может нагонять скоростью
				// (minShotInterval==старту, архетип «тяжёлый редкий удар», см. комментарий
				// выше — не трогаю), поэтому единственный рычаг, не ломающий архетип —
				// крит-урон. Первая попытка 0.08→0.10 почти не сдвинула хвост (0%→0%,
				// разрыв с Лукой на 200 уровне слишком большой — ×1.24 роста мало). 0.14
				// сдвинула хвост с 0% до 2-4% — направление верное, ещё мало. 0.19 резко
				// перелетела цель: хвост 66-77%, и средний ДПС на 200 уровне обогнал Луку
				// (16184 vs 14837) — нарушает жёсткое условие «Лука остаётся эталоном».
				// 0.16 всё ещё перелёт (хвост 19-47% против цели ~10%), хоть средний ДПС
				// уже не обгоняет Луку нигде. Рычаг очень чувствителен в этом диапазоне —
				// 0.145, ближе к нижней (недолетевшей) границе 0.14.
				// ОТКАТ: калибровка выше проверялась только на 7 контрольных точках —
				// ошибка правила 3 CLAUDE.md. Свежий полный прогон (все 150 строк) показал
				// средний ДПС/Лука = 0.99 (практически сравнялся) и превышение в 59 из 150
				// строк — намного больше цели ~10% редкого шанса. Откатываю к куда более
				// скромному 0.105 и перепроверяю плотной сеткой точек, а не редкой.
				// Плотная проверка (20 точек по всему диапазону) подтвердила: 0.105 больше
				// не обгоняет Луку нигде в среднем, но откатила и хвост назад к 0% (120-200)
				// — та же проблема, с которой всё начиналось. Между 0.105 (мало) и 0.145
				// (много) — 0.12.
				// Ревизия 29 (правило 13 CLAUDE.md, ПЕРЕКАЛИБРОВКА после фикса stale-const
				// бага панели — см. чат/CLAUDE.md): вся история выше калибровалась, когда
				// startGlobalCritMultiplier для магнитуды карточек временных апгрейдов
				// ошибочно читался с героя 1 уровня (const в game.js не обновлялся после
				// setCombatState) — то есть эта самая критМульт-прокачка «за уровень»
				// реально ПОЧТИ НЕ влияла на размер карточек до фикса, только на постоянный
				// ДПС. После фикса тот же 0.12 даёт совсем другую картину: полный прогон
				// панели (150 строк) — шанс обогнать Луку в среднем 34.2% (не систематически
				// выше среднего ДПС Луки — 29/150 строк, это ок), при этом преимущество
				// живучести Еремея над Лукой — 164.7% в среднем по «Живучесть с
				// апгрейдами». Целевая формула (см. CLAUDE.md, База=52.5 — см. её вывод из
				// Елисея, наименьшего преимущества живучести в ростере): 52.5/(1+164.7/100)
				// ≈ 19.8% — заметно ниже текущих 34.2%. Режу 0.12→0.10, чтобы уменьшить
				// именно хвост/разброс, не разгоняя постоянный ДПС сильнее необходимого —
				// подтверждать новым полным прогоном (правило 14), возможен ещё один раунд.
				// Ревизия 33: откат к исходному 0.10 — тестирую в этом раунде только базу
				// потолка (critMultiplierCap выше), не смешиваю с натуральным ростом.
				critMultiplierPerLevel: 0.10,
				// Ревизия 38 (прямой запрос пользователя: hl=200 конкретно должен читаться
				// ~32%, тот же приём, что сработал на Дуне — правило 15 CLAUDE.md): низкий шум
				// (--attempts-per-strategy=30) подтвердил хвост 185-200 = 28/36/29/25 при
				// итоге 33% — реальный, не шумовой провал именно в последних уровнях (тот же
				// эффект финишного рывка Луки, см. историю Дуни). mean_ratio=0.885 даёт много
				// запаса. Нелинейный бонус крит-урона только в последних уровнях (порог 160,
				// как у Дуни — захватывает ~10 применений, растущих в фазе upSpecif===2 раз в
				// ~4 уровня, см. applyHeroPermanentStatUpgrade).
				// Раунд 1 (бонус 0.15): перелёт — hl=200=41% (цель 32%), итог 34%, безопасно
				// (mean_ratio 0.893). Интерполяция между 0 (без бонуса → hl=200=25%) и 0.15
				// (→41%) к цели 32%: 0.15×(32-25)/(41-25)≈0.07. С новым точным замером
				// (последняя строка ×20 попыток, FINAL_ROW_ATTEMPTS_MULTIPLIER в панели) то
				// же значение читается выше — 35-37% (цель теперь 31%). Наклон (41-25)/0.15
				// ≈106.7pp/ед. Правка вниз: 0.07-5/106.7≈0.02.
				critMultiplierLateBonusStartLevel: 160,
				critMultiplierLateBonusPerLevel: 0.02,
				// Ревизия 30 (лог-факт, построчная проверка, не по среднему — см. чат/
				// CLAUDE.md): 98.7% строк листа «DPS с апгрейдами» нарушают порядок «живучее
				// → меньше шанс» на САМОЙ строке (преимущество живучести у Еремея растёт до
				// +226% в хвосте, а не держится на среднем +164%). В хвосте (hl>=180) у ВСЕХ
				// шести остальных героев факт проваливается на -20…-42pp ниже цели по
				// формуле — а у Еремея всего -8.3pp. Причина — единственный герой БЕЗ
				// critMultiplierCap вообще: crit-урон растёт неограниченно (на hl=200
				// доходит до ×11.6, прочитано реальным ProgressionEngine.buildHeroAtLevel, не
				// на глаз), пока у всех остальных крит либо ограничен явным потолком, либо
				// архетипно вторичен. Добавляю потолок по тому же образцу, что у Тихона/
				// Клима — первый проход, ×8.0 с ростом ×0.03/применение (в разы выше их
				// финальных потолков — у Еремея архетип "редкий тяжёлый удар", крит-урон
				// центральнее для его силы, режу мягче). Не финальное, подтверждать новым
				// прогоном по тому же листу построчно, не средним.
				// Ревизия 33: база 8.0→10.0 подняла средний ДПС (mean_ratio к Луке 0.82,
				// Лука по-прежнему топ-1 везде — balance-report_2026-09-02_22-26-48.xls), но
				// ХВОСТ не сдвинулся (-31.7pp, было -31.9pp) — прочитал реальные значения
				// (ProgressionEngine.buildHeroAtLevel): на hl=200 натуральный critMult=11.6
				// уже почти равен потолку 14.5. Причина в механике карточек временных
				// апгрейдов: buildUpgradeStatEffect('critMultiplier') клэмпит прибавку
				// запасом (cap−текущее) — см. game.js computeUpgradeStatDelta. При маленьком
				// запасе «удачный забег» с несколькими картами крит-урона за 4 окна
				// апгрейдов просто не может накопиться — а «шанс обогнать» считает именно
				// долю УДАЧНЫХ забегов сверх среднего Луки, не средний ДПС. До потолка
				// (ревизия <30) у Еремея не было именно этого структурного ограничения —
				// отсюда и его исторически лучший в ростере хвост (-8.3pp). Средний рост
				// (critMultiplierPerLevel) трогать не нужно — mean уже безопасно ниже Луки.
				// Нужен большой ЗАПАС до потолка, а не более высокая база сама по себе —
				// поднимаю потолок решительно выше натурального конца карьеры: 10.0→22.0.
				// Ревизия 36 (прямой запрос пользователя: «на КАЖДОЙ строке шанс обгона 30-
				// 35%», после того как сообщил про статистический шум 50 попыток/строка (±6-
				// 7pp) — договорились центрировать тренд на 32.5% и принять разброс, не гнаться
				// за буквальным «на каждой»). После апа Луки (ревизия 23 её объекта, +14%
				// урона) реальный тренд просел с mean_tail_dev≈+0.9pp до общего mean≈22.2% по
				// всем 150 строкам (balance-report_2026-09-02_22-42-36.xls) — тот же рычаг
				// (запас-до-потолка), что сработал в прошлый раз, но калиброван под старую
				// Луку. Поднимаю ещё раз пропорционально: 22.0→32.0. Подтверждать прогоном.
				critMultiplierCap: 32.0,
				// Ревизия 31 (лог-факт: построчный хвост hl>=180, balance-report_2026-09-02_
				// 22-03-24.xls, ПОСЛЕ потолка у Луки) — Еремей всё ещё -31.9pp от цели в
				// хвосте, почти не сдвинулся от потолка Луки (был -32.1pp) — держит именно
				// его собственный потолок. Поднимаю рост: 0.03→0.05.
				// Ревизия 32 (лог-факт: прогон balance-report_2026-09-02_22-08-50.xls после
				// 0.03→0.05 — эффект нулевой, -31.9pp→-32.3pp). Прочитал реальные значения по
				// уровням (ProgressionEngine.buildHeroAtLevel) — на hl=200 critMult=10.50,
				// уже вдвое выше, чем у Луки (4.70), а интервал у Еремея заморожен 999мс
				// против падающих до 200мс у Луки (×5 к хитам/сек) — крит уже почти
				// компенсирует множитель урона за удар, но множитель частоты не может, а
				// он мультипликативный. По прямому запросу пользователя пробую решительнее,
				// а не мелким шагом: 0.05→0.09.
				// Ревизия 32-33: рост потолка оставлен на уже проверенном 0.09 (сам по себе
				// рост дважды подтверждён неэффективным изолированно — см. ревизии 31-32,
				// меняю только базу в этом раунде, не смешиваю рычаги).
				critMultiplierCapPerLevel: 0.09,
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
				// Ревизия 13 (лог-факт, не догадка — лист «DPS с апгрейдами» полного
				// прогона balance-report_2026-09-02_21-29-51.xls): средний ДПС Дуни —
				// НИЖЕ всех в ростере (4903), хотя она не самая живучая (+92.1% против
				// Еремея +164.2%) — Еремей её обгоняет по ДПС, что нарушает ось
				// живучесть/урон (правило 4: он живучее — должен бить слабее). Шанс
				// обогнать Луку 34.2% при цели 39.0% (-12.4%). Разбивка по третям того же
				// листа показала, ГДЕ именно: треть1 1.024 (норма), треть2 0.881, треть3
				// 0.704, хвост(190-200) 0.603 — плоская просадка растёт к концу диапазона,
				// то есть проблема в темпе роста, не в стартовой базе. damagePerLevel —
				// единственный растущий боевой рычаг Дуни (jackpotAttackChance — фиксная
				// вероятность, applyHeroPermanentStatUpgrade её вообще не трогает, растить
				// нечем): 16→22 (+37.5%). Не финальное, подтверждать новым прогоном по
				// тому же листу.
				//
				// Ревизия 14 (лог-факт: лист «DPS с апгрейдами», balance-report_2026-09-02_
				// 21-35-42.xls): перелёт, не попадание — средний ДПС 4903→6404 (+30.6% от
				// +37.5% рычага, damagePerLevel компаундится сильнее, чем казалось), ratio к
				// Луке 0.781→1.029 (уже ВЫШЕ), 79.3% строк выше Луки (систематично), шанс
				// обогнать 55.0% при цели 39.0% (+41.2%). Третям того же листа: треть1 1.266,
				// треть2 1.150 (обе теперь перегреты — рычаг задел не только хвост, вопреки
				// ожиданию), треть3 0.943, хвост 0.787 (оба всё ещё НЕДОБИРАЮТ до цели, даже
				// после подъёма). damagePerLevel — рычаг «за уровень», действует на весь
				// диапазон пропорционально, не только на конец — не изолируется чисто под
				// хвост. Отступаю к куда более скромному числу — 22→18 (был 16 изначально) —
				// вместо полного отката к 16, чтобы часть прогресса в хвосте осталась. Не
				// финальное, подтверждать тем же листом — вероятен ещё раунд именно на баланс
				// треть1-2 против треть3-хвоста для этого рычага.
				balanceRevision: 16,
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
				// Ревизия 13 (задача «шанс обогнать Луку», win-rate-vs-luka.js — правило 1):
				// хвост (герой-уровень 159-200) давал 0% шанс на удачном заходе — у нее
				// критChanceCap заперт на старте (редирект целиком в урон, см. комментарий
				// выше), поэтому крит — не рычаг вообще. Родная механика Дуни для «редкой
				// большой удачи» — казино-джекпот, не крит, логично поднимать именно его,
				// а не заводить ей крит-потолок не по архетипу. Первая попытка 0.01→0.02
				// сдвинула середину диапазона (герой-уровень ~79: 22%→44%), но хвост
				// (159-200) почти не тронула — джекпот всё ещё слишком редкий, чтобы
				// заметно повлиять на среднее по 15 боям за заход. 0.04 подняла хвост до
				// ~5-11%, близко к цели ~13%, но ещё чуть мало — беру 0.06.
				// ОТКАТ: калибровка выше проверялась только на 7 контрольных точках —
				// ошибка правила 3 CLAUDE.md. Свежий полный прогон (все 150 строк) показал
				// средний ДПС/Лука = 1.06 (уже ВЫШЕ Луки в среднем) и превышение в 76 из
				// 150 строк — далеко за целью ~13% редкого шанса. Откатываю к куда более
				// скромному 0.025 и перепроверяю плотной сеткой точек, а не редкой.
				// Ревизия 15 (прямой запрос пользователя: итог «шанс обогнать Луку» с текущих
				// 32% до цели 35%, интерполировано по шкале живучести между Еремеем (32%) и
				// Дарьяной (39%)). Разрыв всего 3pp — маленький шаг. История этого объекта
				// (ревизии 13-14) прямо предупреждает: damagePerLevel крайне чувствителен у
				// неё (+37.5% дал перелёт 34%→55%) — беру другой рычаг, джекпот-шанс (её
				// аналог «редкой удачи», ceiling-механика, не растущий с уровнем стат) —
				// маленький шаг 0.025→0.03 (+20% относительно, мало в абсолюте). Итог 32%→33%
				// (safe, mean_ratio 0.889, beat%=20.0%) — движение верное, но недостаточное.
				// 0.03→0.04 перелетело: итог 38% (цель 35%), mean_ratio 0.937, beat%=34.7% —
				// уже близко к верхней безопасной границе. Интерполяция между 0.03→33% и
				// 0.04→38% к цели 35%: 0.03+0.01×(35-33)/(38-33)≈0.034 — итог 35% подтверждён
				// (balance-report_2026-09-02_23-48-03.xls).
				//
				// Ревизия 16 (прямой запрос пользователя): форма кривой развёрнута — раньше
				// джекпот был флэтным (растить нечем), из-за чего ранняя-средняя игра сильная,
				// а хвост (hl 180-200) проваливался на дне (6% на hl=200, при итоге 35%).
				// Хотим наоборот: слабый старт допустим, но hl=200 должен читаться близко к
				// цели. Добавлен настоящий игровой рост jackpotAttackChance (см.
				// jackpotAttackChancePerLevel/jackpotAttackChanceCap ниже и новую ветку в
				// applyHeroPermanentStatUpgrade, saveData.js) — стартовое значение урезано,
				// чтобы ранняя игра просела, а поздняя выросла за счёт роста. Первый проход,
				// подтверждать прогоном.
				jackpotAttackChance: 0.008,
				jackpotAttackMultiplier: 8,
				// Ревизия 16: настоящий рост джекпот-шанса за уровень (см. новую ветку
				// applyHeroPermanentStatUpgrade выше). Раунд 1 (старт 0.012/рост 0.001): итог
				// 37%, hl=200=24% — форма лучше, но ещё низковато. Раунд 2 (старт 0.008/рост
				// 0.0015): итог 40% (перелёт, цель 35%), но форма отличная — бакет 161-180
				// почти точно на цели (35.0), mean_ratio 0.949 (близко к безопасному потолку).
				// Раунд 3 (старт 0.010/рост 0.0011): итог 36% (в цели), но по прямому запросу
				// пользователя — именно герой-уровень 200 должен читаться близко к 35%, а не
				// только средний бакет; факт на hl=200 в районе 26-32% (бакет 181-200: 26.5).
				// Раунд 4 (старт 0.009/рост 0.0013): с пониженным шумом (--attempts-per-
				// strategy=30, правило 15 CLAUDE.md) подтверждено hl=200=20% — надёжный замер,
				// не шум. Раунд 5 (старт 0.006/рост 0.002): итог улетел до 43% (mean_ratio
				// 0.981 — опасно близко к правилу 13), а hl=200 вырос только до 25% —
				// непропорционально мало. Причина: к hl=200 накопленный рост (0.006+0.002×~40
				// ≈0.086) уже УПИРАЕТСЯ в jackpotAttackChanceCap=0.08 — тот же эффект запаса-
				// до-потолка, что у Еремея с крит-уроном (см. его ревизии 33-35 выше по файлу).
				// Раздутый рост поднимал середину (ещё не упёрлась в потолок), а хвост
				// плоско упирался. Решение — поднять САМ ПОТОЛОК, не только скорость роста,
				// и вернуть более скромный рост/старт. Раунд 6 (потолок 0.08→0.14): итог 40%,
				// хвост 39/34/29/35/32 (hl=200=32%) — куда ровнее, но пользователь хочет
				// именно hl=200≈35%, не 32%. Проверил реальным ProgressionEngine.
				// buildHeroAtLevel: на hl=200 джекпот=0.083, потолок (0.14) НЕ упирается —
				// разрыв 195→200 объясняется не Дуней, а Лукой (её shotInterval падает до
				// пола minShotInterval=200 РОВНО на hl=200 — реальный финишный рывок скорости,
				// не баг). Раунд 7 (perLevel 0.0015→0.0017, линейно): итог продолжил расти
				// (41%, mean_ratio 0.962 — близко к опасной границе правила 13), а hl=200
				// НЕ стабилизировался (32→27) — линейный рычаг физически не может
				// воспроизвести скачкообразный финишный рывок Луки. По решению пользователя —
				// нелинейный рычаг: возврат к безопасному perLevel=0.0015 (итог 40%,
				// mean_ratio 0.944) + отдельный БОНУС роста только на последних уровнях (см.
				// jackpotAttackChanceLateBonusPerLevel/LateBonusStartLevel ниже и новую ветку
				// в applyHeroPermanentStatUpgrade выше) — целится именно в участок, где Лука
				// делает свой рывок, не трогая середину/раннюю игру.
				// Раунд 8 (лог-факт): порог 190 дал итог 39% (в цели), но hl=200 всё ещё
				// низкий (23%) — оказалось, рост применяется только в фазе upSpecif===1 из
				// 4-тактового цикла (см. applyHeroPermanentStatUpgrade), то есть реально раз
				// в ~4 уровня героя, а не каждый уровень (диагностика: между hl=195 и hl=200,
				// разница в 5 уровней, джекпот вырос ровно на один шаг 0.0015 — 1 применение,
				// не 5). Порог 190 захватывал всего ~2 применения бонуса за 10 уровней —
				// слишком редко для заметного эффекта. Расширяю окно: порог 160 (даёт ~10
				// применений на последнем участке).
				jackpotAttackChancePerLevel: 0.0015,
				jackpotAttackChanceLateBonusStartLevel: 160,
				jackpotAttackChanceLateBonusPerLevel: 0.0015,
				jackpotAttackChanceCap: 0.14,
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
				damagePerLevel: 18,
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
				// Ревизия 21 (правило 13 CLAUDE.md, перекалибровка после фикса пилообразного
				// HP манекена — см. чат/CLAUDE.md, «Обвал» Клима/«Прогревание» Дарьяны теперь
				// реально видны панели): «Прогревание» (missingHpDamagePerPercent) снова
				// корректно измеряется (HP цели честно ходит от 100% до 0% каждые 60 сек), а
				// critMultiplierPerLevel 0.09 был поднят в ревизии 19 ИМЕННО чтобы
				// компенсировать НЕВИДИМОЕ на тогдашнем манекене «Прогревание» — сейчас это
				// двойной счёт: механика видна и работает САМА, плюс сверху всё ещё стоит
				// компенсирующий рычаг. Полный прогон (report 2026-09-01_22-32-36.xls,
				// вместе с klim/luka): ratio к среднему ДПС Луки 1.94 в среднем (по третям
				// 1.44/2.09/2.29 — растёт к хвосту, не падает), превышает Луку в 143/150
				// строк (95.3%, далеко за порогом систематичности), шанс обогнать 89.4% при
				// преимуществе живучести над Лукой всего 33.8% — целевая формула
				// (52.5/(1+33.8/100)) требует ≈39.2%. Возвращаю critMultiplierPerLevel к
				// значению ДО компенсации (0.09→0.017, тот же порядок, что и до ревизии 19) —
				// startGlobalDamage/damagePerLevel не трогаю, они калибровались ещё раньше
				// (ревизии 16-18) на движке, где «Прогревание» уже засчитывалось. Подтверждать
				// новым прогоном — ожидаю ещё раунд(ы) на точную величину.
				//
				// Ревизия 22: прогон balance-report_2026-09-01_22-37-46.xls после ревизии 21
				// (0.09→0.017) — сдвиг в нужную сторону, но недостаточно: ratio 1.33 в среднем
				// (было 1.94), всё ещё превышает Луку в 143/150 строк (95.3%, порог не
				// пройден), шанс обогнать 75.2% (цель 39.2%). critMultiplierPerLevel уже почти
				// у исторического пре-компенсационного пола — дальше резать его бессмысленно,
				// остаток перевеса объясняется самим «Прогревание» + флэт-базой, которые
				// раньше калибровались на движке с менее выраженным средним missing-HP% (в
				// ODE-оценке ≈42.5%, см. её комментарий выше, — пила даёт ровно 50%, ощутимо
				// не отличается, но всё же выше). Режу startGlobalDamage 70→52 и damagePerLevel
				// 33→25 (по ~25% каждый, перекос по третям сейчас довольно ровный —
				// 1.28/1.43/1.28, хвост уже у цели 1.02, поэтому режу пропорционально оба
				// рычага, а не один точечно). Не финальное, подтверждать новым прогоном.
				// Ревизия 23 (прямой запрос пользователя: поднять «шанс обогнать Луку %» с
				// текущих ~33.4% до цели ~40%, не выше — потолок посчитан регрессией по 7
				// героям ростера, mean_ratio≈0.635+0.00736×шанс%, нарушение правила 13 (mean_
				// ratio=1.0) наступает у шанс≈50%, у самого смелого сейчас безопасного героя
				// (Елисей) шанс=37.3%/ratio=0.913 — 40% даёт запас, ratio≈0.93). Изолированный
				// шаг (см. правило 14/урок Еремея этой же сессии — несколько рычагов разом
				// перемножаются, а не складываются): startGlobalDamage 52→60 (+15%), флэт-
				// рычаг сильнее всего давит на ранний бой (hl 1-20 сейчас почти всегда 0-6%,
				// самый провальный участок диапазона). Подтверждать прогоном.
				balanceRevision: 24,
				// Ревизия 18: прогон balance-report_2026-08-31_21-45-38.xls после ревизии 17
				// (120→85) — почти сошлось: среднее по всему диапазону 1.025, треть1/2 1.06/
				// 1.05 (уже небольшой перекос), треть3/хвост 0.97/0.93 (уже под целью). Режу
				// ещё немного, мягче предыдущих шагов (85→70), чтобы не продавить хвост ниже
				// разумного. Числа не финальные.
				// Ревизия 17: прогон balance-report_2026-08-31_21-39-46.xls после ревизии 16
				// (160→120) — сдвиг в нужную сторону, но всё ещё выше Луки везде кроме хвоста
				// (треть1 1.22, треть2 1.12, треть3 1.02, хвост 0.95). Чувствительность между
				// двумя прогонами ~линейная (ΔB=40 → Δratio_треть1=0.195) — режу дальше по той
				// же экстраполяции, чтобы треть1 подошла к ~1.05: 120→85. Числа не финальные.
				// Ревизия 16 (правило 13 CLAUDE.md — Лука эталон по ДПС): полный прогон
				// панели (balance-report_2026-08-31_21-28-00.xls, лист «DPS с апгрейдами»,
				// все 150 строк) показал Дарьяну систематически ВЫШЕ среднего ДПС Луки —
				// не изредка, а почти везде: ratio к Луке 1.42 в первой трети диапазона,
				// 1.05 в третьей, 0.97 даже в хвосте 190-200 (макс всё ещё 1.08). Источник —
				// startGlobalDamage 160 (почти вдвое выше стартового урона Луки, 85) при
				// том что «Прогревание» уже даёт ей в среднем +64% урона поверх статов
				// (missingHpDamagePerPercent, см. поле ниже) — комбо двух источников силы
				// сразу с 1 уровня, пока крит-масштабирование Луки (critMultiplierPerLevel
				// 0.06 против её 0.017) ещё не разогналось. Режу startGlobalDamage 160→120
				// (флэт-рычаг, сильнее всего давит на низкие уровни — база даёт ~62% от
				// общего effective-урона на hl=1, но всего ~2% на hl=200) — damagePerLevel
				// не трогаю, чтобы не просадить хвост (он и так уже близко к цели ~0.97).
				// Число первого прохода — подтверждать новым прогоном панели (правило 14).
				name: 'daryana',
				permanentGrowthProfile: 'ember',
				dispName: 'Дарьяна Пылкая',
				image: 'images/hero/4_daryana/daryana_min.webp',
				fullImage: 'images/hero/4_daryana/daryana_full.webp',
				weaponImage: 'images/hero/4_daryana/weapon.webp',
				aimImage: 'images/hero/4_daryana/aim.webp',
				level: 1,
				startGlobalDamage: 60,
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
				// Ревизия 23 (продолжение, лог-факт): 25→28 резко перелетело — итог 48%
				// (цель 40%), mean_ratio к Луке ровно 1.0, обгон в 57.3% строк — прямое
				// нарушение правила 13 (balance-report_2026-09-02_23-32-09.xls). Компаундящийся
				// рычаг оказался намного чувствительнее, чем при startGlobalDamage — та же
				// ловушка, что и с Еремеем в этой сессии. Линейная экстраполяция между
				// известными точками (25→36%, 28→48%) к цели 40%: 25+3×(40-36)/(48-36)≈26.
				damagePerLevel: 26,
				critChancePerLevel: 0.010,
				// Ревизия 19 (правило 13 CLAUDE.md, шанс обогнать Луку): её «Прогревание»
				// (missingHpDamagePerPercent) структурно не видно замеру на манекене — цель
				// там никогда не умирает и % недостающего HP не растёт (правило 10, тот же
				// класс пробела, что раньше был у регена Милы) — то есть весь её реальный
				// разброс ДПС «с апгрейдами» на манекене сейчас держится ТОЛЬКО на голых
				// крит-статах, а critMultiplierPerLevel у неё был почти нулевой. Полный
				// прогон панели: шанс обогнать Луку всего 7.75% в среднем, при преимуществе
				// живучести над Лукой всего 33.8% (самое скромное после Елисея) — целевая
				// формула (База=52.5/(1+33.8/100)) требует ≈39%. Поднимаю рычаг в разы —
				// это единственный «крит-урон» лимит, у неё нет critMultiplierCap (не
				// упрётся раньше времени). Подтверждать новым полным прогоном (правило 14).
				// Цель (≈39%) выше, чем у Еремея (≈19.8%, у него critMultiplierPerLevel=0.10
				// при critChanceCap=0.65) — а у Дарьяны critChanceCap заметно ниже (0.35),
				// поэтому для сопоставимого разброса нужен рычаг сильнее, не слабее.
				// Раунд 2: 0.12 оказался перелётом — полный прогон дал шанс 51.5% (цель
				// ≈39%) и систематическое превышение среднего ДПС Луки на 101/150 строк
				// (правило 6/13, порог 60%) — 0.12 явно за порогом. Интерполяция по двум
				// известным точкам (0.017→7.75%, 0.12→51.5%) к цели 39%: ≈0.017+0.103×
				// (39-7.75)/(51.5-7.75) ≈ 0.09. Подтверждать новым полным прогоном.
				critMultiplierPerLevel: 0.017,
				// Ревизия 23 (прямой запрос пользователя: hl=200 конкретно должен читаться
				// ~42% — тот же приём, что на Еремее/Дуне, правило 15 CLAUDE.md). Низкий шум
				// (--attempts-per-strategy=30) дал итог 41% (mean_ratio=0.945, beat%=28% —
				// уже не так далеко от безопасного потолка ~0.95-1.0, следить внимательнее,
				// чем у Еремея), хвост 180-200 = 25/31/24/26/19 — реальный провал в конце.
				// Нелинейный бонус крит-урона только в последних уровнях (порог 160, как у
				// остальных двух героев).
				// Раунд 1 (бонус 0.15, как у Еремея): дикий перелёт — hl=200 улетел до 74%
				// (цель 42%), хвост 165-200 46/57/59/65/66/71/75/74 — монотонно разгоняется,
				// не сходится. У Дарьяны базовый critMultiplierPerLevel в 6 раз меньше, чем у
				// Еремея (0.017 против 0.10) — та же добавка дала непропорционально огромный
				// эффект. Раунд 2 (0.04): hl=200=34% (недолёт), итог 41%, безопасно. Интерполяция
				// между 0.04→34% и 0.15→74% к цели 42%: 0.04+0.11×(42-34)/(74-34)≈0.062. С
				// новым точным замером (FINAL_ROW_ATTEMPTS_MULTIPLIER=20 в панели) то же
				// значение читается 48-50% (цель теперь 42%). Наклон (74-34)/0.11≈363.6pp/ед.
				// (близко к прежней оценке 454.5). Правка вниз: 0.062-7/363.6≈0.043. РЕЗУЛЬТАТ:
				// hl=200=38% (недолёт, цель 42%). Наклон между 0.043→38% и 0.062→~49%:
				// 11/0.019≈578.9pp/ед. Правка вверх: 0.043+4/578.9≈0.05.
				critMultiplierLateBonusStartLevel: 160,
				critMultiplierLateBonusPerLevel: 0.05,
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
				// Ревизия 21 (первый заход, отчёт 23-10-32): +28% выше кривой — урезал
				// ×0.78. Реальный итог оказался -18/-19% — перебрал с порезом заметно
				// сильнее, чем предсказывал расчёт. Разобрался, откуда разъехалось: между
				// этим прогоном и следующим я ЕЩЁ поправил Милу (см. её объект выше) —
				// а Мила тоже входит в «остальных пятерых», по которым для Луки строится
				// кривая (leave-one-out), так что цель по факту сдвинулась ПОСЛЕ моего
				// расчёта, а не сам расчёт был неверным. Раз баг найден — тем же методом,
				// но по СВЕЖЕМУ отчёту (уже с исправленной Милой, больше двигаться не
				// должна) надёжнее.
				// Ревизия 22: срез отчёта balance-report_2026-08-26_00-04-24.xls — по
				// листам «с апгрейдами» (правило 11) Лука систематически НИЖЕ кривой:
				// -19% в среднем без первой шумной четверти диапазона (медиана -20%), -16%
				// в хвосте 190-200 (медиана -16%) — беру среднее между этими двумя более
				// устойчивыми оценками: -18%. Поднимаю startGlobalDamage/damagePerLevel в
				// одинаковой пропорции ×1.22 (1/0.82, цель — вернуть отклонение к 0%), оба
				// рычага, не один (правило 3, отклонение плоское по диапазону: по
				// четвертям -8/-21/-19/-17%, без учёта шумной первой). ВАЖНО (как и в
				// прошлый раз): у него 95% строк — экстраполяция, он почти всегда самый
				// хрупкий в ростере — направление надёжно, точная величина ×1.22 менее
				// надёжна. Числа не финальные, подтверждать новым прогоном панели —
				// и в этот раз больше НЕ трогать других героев одновременно с проверкой
				// Луки, чтобы не повторить сдвиг цели, как в прошлый раз.
				// Ревизия 23 (прямое разрешение пользователя на правку Луки — «чучуть проапай
				// луку чтобы выровнять - но не слишком сильно... ровно настолько насколько
				// нужно»): полный прогон ростера (balance-report_2026-09-02_22-33-57.xls,
				// ПОСЛЕ калибровки Еремея, см. его ревизию 35) показал, что Лука перестала
				// быть топ-1 по среднему ДПС для 4 из 7 героев — Дарьяна (mean_ratio 1.044,
				// обгоняет в 76% строк), Дуня (1.019, 52%), Тихон (1.021, 61%), Елисей (1.058,
				// 72%) — прямое нарушение правила 13. Реальные данные того же отчёта (все 150
				// строк, лист «DPS с апгрейдами», herо_dps/luka_dps по каждой строке) дают
				// минимальный множитель K=1.14 для ДПС Луки, при котором худший нарушитель
				// (Елисей) опускается до ~26% строк-обгонов — примерно на уровне здорового
				// эталона (у самого Еремея после калибровки — 24%). Проверил (реальным
				// ProgressionEngine.buildHeroAtLevel), что критМульт-потолок (8.0) НЕ рычаг
				// здесь — натуральный крит-урон Луки на hl=200 всего 4.7, запас до потолка и
				// так большой (3.3), а крит-шанс низкий (8.5%) — слабое плечо. Плоский урон —
				// предсказуемый линейный рычаг, масштабирует средний И максимальный ДПС РОВНО
				// пропорционально (без нелинейных сюрпризов, которые дал крит-урон у Еремея в
				// этом же раунде правок) — держит уже откалиброванный потолок ~50k макс-ДПС
				// (макс на hl=200 был 45853 → +14% ≈ 52272, всё ещё близко к цели). Поднимаю
				// startGlobalDamage/damagePerLevel в одинаковой пропорции ×1.14 (тот же метод,
				// что и в ревизии 22 выше) — 85→97, 12→14. Подтверждать новым полным прогоном.
				balanceRevision: 23,
				name: 'luka',
				permanentGrowthProfile: 'marksman',
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.webp',
				fullImage: 'images/hero/3_luka/luka_full.webp',
				weaponImage: 'images/hero/3_luka/weapon.webp',
				aimImage: 'images/hero/3_luka/aim.webp',
				level: 1,
				startGlobalDamage: 97,
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
				// Ревизия 21 (базовая цифра): прирост за уровень — см. подробный комментарий
				// у объекта eremei (матчит герой 159 из реального отчёта DataExport).
				// critChanceCap у Луки не упирается за 40 применений — редиректа по урону
				// нет. Ревизия 22 (подъём ×1.22): та же пропорция, что у startGlobalDamage
				// выше — см. комментарий там про отчёт 2026-08-26 00-04-24 и правило 11.
				damagePerLevel: 14,
				critChancePerLevel: 0.001,
				critMultiplierPerLevel: 0.06,
				woundChancePerLevel: 0.002,
				shotIntervalReductionPerLevel: 12,
				heroHpPerLevel: 8,
				defensePerLevel: 0.0015,
				defenseCap: 0.196,
				minShotInterval: 120,
				// Ревизия 1 (потолок крит-урона у Луки) — по прямому и явному решению
				// пользователя, override правила «Луку не трогать» именно для этого поля
				// (см. её обсуждение в чате). Причина: построчная проверка листа «DPS с
				// апгрейдами» показала, что в глубоком хвосте (hl>=180) ВСЕ герои разом
				// проваливаются на 20-40pp ниже цели формулы шанса — не баг одного героя, а
				// сам целевой шанс там становится недостижим, потому что у Луки нет потолка
				// крит-урона вообще (permanent crit доходит только до ×4.7 к hl=200 — не
				// главный источник его силы, интервал атаки 800→200мс важнее), а магнитуда
				// карточек временного улучшения «крит-урон» без потолка не ограничена ничем
				// (см. её комментарий в admin-balance-panel.html — считается от остатка ДО
				// потолка), отсюда его «потолок» (макс-колонка) улетает до ~67к на hl=200,
				// пока средний ДПС остальных героев там 13-21к. Цель по прямому заданию —
				// Лука остаётся #1 по среднему ДПС, но его макс (потолок на удачных
				// карточках) не должен разгоняться выше ~50к. Первый проход. Подтверждать
				// реальным прогоном (правило 14).
				critMultiplierCap: 8.0,
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
				// Ревизия 17 (первый заход, отчёт 23-10-32): -30% ниже кривой на листах
				// «с апгрейдами» — поднял startGlobalDamage/damagePerLevel ×1.43. НО этот
				// расчёт опирался на СТАРУЮ модель живучести панели, которая не знала про
				// паузу между боссами внутри уровня (finalizeBossDefeatAftermath не
				// сбрасывает HP, даёт bossInterval=5с простоя без входящих атак — реген
				// тикает и туда, см. CLAUDE.md правило 10) — реальная живучесть Милы была
				// занижена, а значит и цель по урону завышена.
				// Ревизия 18: после починки панели под эти паузы (тот же принцип правила 10
				// — метрика должна видеть механику полностью, а не только тик в самом бою)
				// свежий отчёт (balance-report_2026-08-25_23-57-58.xls) показал на листах
				// «с апгрейдами»: +12% выше кривой в среднем (без первой четверти — +15%,
				// в хвосте 190-200 — +11%), экстраполяция всего 3% строк — то есть я
				// перебрал с прошлым подъёмом, ожидаемо, раз считал по заниженной
				// живучести. Режу startGlobalDamage/damagePerLevel в одинаковой пропорции
				// ×0.89 (1/1.12, цель — вернуть отклонение к 0%) — держится плоским по
				// диапазону, оба рычага, не один (правило 3). Числа не финальные —
				// подтверждать новым прогоном панели.
				balanceRevision: 30,
				// Ревизия 28: прогон balance-report_2026-09-01_23-10-22.xls после ревизии 27
				// (11→8) — сработало, но перелетело в минус: ratio 1.129→0.838, уже не
				// систематична (16.7% строк выше Луки, было 72.0%), шанс обогнать 61.6%→28.5%
				// (цель 35.5%, теперь чуть НИЖЕ цели, не выше). Небольшой откат обратно —
				// damagePerLevel 8→9 — чтобы приблизиться к цели, не рискуя вернуть
				// систематичность. Не финальное.
				// Ревизия 27: прогон balance-report_2026-09-01_23-05-09.xls после ревизии 26
				// (7→5) — эффект минимальный (ratio 1.149→1.129), хотя срез базы был
				// пропорционально большим (-29%). Причина — damagePerLevel=11 давно доминирует
				// над startGlobalDamage даже на низких уровнях (11×20=220 ≫ 5 уже к герой-
				// уровню 20) — флэт-рычаг тут второстепенен, как раньше выяснилось у Тихона.
				// Переключаюсь на damagePerLevel: 11→8 (-27%) — растущий рычаг, должен реально
				// сдвинуть картину. startGlobalDamage не трогаю в этот раз — изолирую эффект.
				// Не финальное, подтверждать новым прогоном.
				// Ревизия 26 (правило 13 CLAUDE.md, перекалибровка после фикса пилообразного
				// HP манекена — см. чат/CLAUDE.md): у Милы нет target-HP%-механики (реген —
				// пассивный, по реальному времени, к target.hp не привязан), но полный прогон
				// всего ростера (report 2026-09-01_22-50-04.xls) всё равно показал систематику:
				// ratio к среднему ДПС Луки 1.149 (по третям 1.28/1.23/0.94 — хвост уже ниже
				// цели), обгоняет Луку в 111/150 строк (74.0%, за порогом), шанс обогнать 64.0%
				// при цели 35.2% (преимущество живучести над Лукой 49.3%). Не разобрался, что
				// именно сдвинуло её относительно ревизии 25 (не механика — вероятно общий шум
				// сэмплирования между прогонами), но по факту сейчас систематично выше —
				// режу дальше тем же рычагом, что и раньше:
				// startGlobalDamage 7→5 (треть1/2 явно горячее трети3/хвоста — флэт-рычаг). Не
				// финальное, подтверждать новым прогоном.
				// Ревизия 24: прогон balance-report_2026-08-31_21-45-38.xls после ревизии 23
				// (16→10) — среднее по диапазону уже 1.003 (практически цель), треть1/2 всё ещё
				// чуть выше (1.14/1.05), треть3/хвост под целью (0.83/0.72). База уже совсем
				// маленькая (10) — экстраполяция «в ноль» здесь неадекватна (риск нелинейного
				// провала при базе, близкой к 0), поэтому режу совсем немного: 10→8.
				// Не финальное число.
				// Ревизия 23: прогон balance-report_2026-08-31_21-39-46.xls после ревизии 22
				// (25→16) — сдвиг верный, но ещё выше Луки в треть1/2 (1.25/1.09), треть3/хвост
				// уже под целью (0.85/0.73). Чувствительность ΔB=9→Δratio_треть1=0.191 —
				// продолжаю резать той же пропорцией: 16→10 (осторожнее, не по прямой
				// экстраполяции до нуля — берегу от нелинейного провала). Не финальное число.
				// Ревизия 22 (правило 13 CLAUDE.md — Лука эталон по ДПС; старое правило 12
				// про «Милу не трогать» удалено пользователем явным запросом): полный прогон
				// панели (balance-report_2026-08-31_21-28-00.xls, лист «DPS с апгрейдами»,
				// все 150 строк) показал Милу систематически ВЫШЕ среднего ДПС Луки в первых
				// двух третях диапазона (ratio 1.44 / 1.15), выправляется только к хвосту
				// (0.75 на 190-200). Режу startGlobalDamage 25→16 (флэт-рычаг, доля ~66% от
				// общего effective-урона на hl=1, но всего ~1.2% на hl=200 при damagePerLevel
				// 13) — damagePerLevel не трогаю, хвост и так уже ниже цели, лишний порез там
				// не нужен. Число первого прохода — подтверждать новым прогоном (правило 14).
				name: 'mila',
				permanentGrowthProfile: 'swift',
				dispName: 'Мила Зеленова',
				image: 'images/hero/5_MilaZelenova/min.webp',
				fullImage: 'images/hero/5_MilaZelenova/full.webp',
				weaponImage: 'images/hero/5_MilaZelenova/weapon.webp',
				aimImage: 'images/hero/5_MilaZelenova/aim.webp',
				level: 1,
				// Ревизия 25 (правило 13 CLAUDE.md, шанс обогнать Луку — перекалибровка
				// после фикса stale-const бага панели, см. чат/CLAUDE.md): вся история выше
				// (ревизии 16-24, флэт-рычаг startGlobalDamage/damagePerLevel) считалась,
				// когда карточки временных апгрейдов ошибочно масштабировались от статов
				// 1 уровня — сейчас, когда баг починен, эти же цифры (8/13) снова дают
				// систематический перевес: полный прогон панели — ratio к среднему ДПС Луки
				// 1.058 в среднем (треть2 доходит до 1.185), Мила обгоняет Луку по среднему
				// ДПС на 100 из 150 строк (систематически, правило 6/13, порог 60%), шанс
				// обогнать на удачном заходе 56.0% при преимуществе живучести над Лукой
				// всего 56.1% — целевая формула (База=52.5/(1+56.1/100)) требует ≈33.6%.
				// Режу оба рычага пропорционально ×0.88 (тот же приём, что и в прошлых
				// ревизиях) — 8→7, damagePerLevel 13→11 ниже. Подтверждать новым полным
				// прогоном (правило 14), вероятен ещё один раунд.
				startGlobalDamage: 5,
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
				// Ревизия 21 (базовая цифра): прирост за уровень — см. подробный комментарий
				// у объекта eremei (матчит герой 159 из реального отчёта DataExport).
				// critChanceCap у Милы не упирается за 40 применений — редиректа по урону
				// нет. Ревизия 18 (порез ×0.89): та же пропорция, что у startGlobalDamage
				// выше — см. комментарий там про отчёт 2026-08-25 23-57-58 и правило 11.
				damagePerLevel: 9,
				critChancePerLevel: 0.003,
				critMultiplierPerLevel: 0.01,
				// Ревизия 29 (прямой запрос пользователя: hl=200 должен читаться ~36% — тот же
				// приём, что на Еремее/Дуне/Дарьяне, правило 15 CLAUDE.md). Низкий шум
				// (--attempts-per-strategy=30): итог 26%, хвост 165-200 почти нулевой
				// (3/1/3/1/1/1/2/0) — mean_ratio=0.827, большой запас по правилу 13. Бонус
				// крит-урона (0.03) поднял critMult заметно (2.2→3.0 на hl=160-200, реально
				// проверил ProgressionEngine.buildHeroAtLevel), но эффект на шанс — ноль: у
				// Милы крит-шанс критически низкий (0.16 на hl=200), крит-урон — слабый рычаг,
				// раз сам крит почти не срабатывает. Переключаюсь на прямой урон (без
				// вероятностного гейта) — damageLateBonusPerLevel (новая ветка выше в
				// applyHeroPermanentStatUpgrade).
				// Раунд 1 (бонус 15): слабый сдвиг — hl=200 0%→9% (цель 36%), mean_ratio почти
				// не двинулся (0.827→0.831). Раунд 2 (бонус 60): дикий перелёт — hl=200=65%,
				// причём отклик нелинейный (165→11, 170→39, скачок) — похоже на пороговый
				// эффект. Интерполяция между 15→9% и 60→65% к цели 36%: 15+45×(36-9)/(65-9)≈37
				// — подтверждено прогоном: hl=200=35%. Ревизия (прямой запрос пользователя):
				// цель поднята с 35% до 38% (+3pp). Расчёт по наклону 37→60 дал 39, но реальный
				// прогон (100 попыток/стратегию, n=500/строку) показал hl=200=41% — локальный
				// наклон оказался круче (3.0pp/ед. между 37→35% и 39→41%, не 1.3). Коррекция:
				// 39-3/3.0=38.
				damageLateBonusStartLevel: 160,
				damageLateBonusPerLevel: 38,
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
			tikhon: {
				balanceRevision: 32,
				// Ревизия 26 (правило 13 CLAUDE.md, перекалибровка формулы шанса — см. её
				// историю в CLAUDE.md §13 и чат): свежий прогон всего ростера показал, что
				// старая формула (степень -1) занижала цель для героев с большим преимуществом
				// живучести — регрессией по 7 героям формулу поправили на степень -0.37, база
				// 49.7. По новой формуле Тихон (+84.8% живучести над Лукой) — единственный
				// заметный отстающий: факт 48.0% против новой цели 39.6% (+21%), у остальных
				// шести героев ростера отклонение теперь ≤11%. Режу тот же рычаг, что и в
				// ревизии 25 (единственный настоящий для этого героя) — critMultiplierCap
				// 3.8→3.3, тем же осторожным шагом, известная нелинейность. Не финальное.
				//
				// Ревизия 27 (правило 4 CLAUDE.md — ось живучесть/урон, поймано пользователем):
				// после ревизии 26 средний ДПС Тихона по всему диапазону оказался НИЖЕ среднего
				// ДПС Еремея (5073 против 5610, ratio 0.91) — при том что у Еремея живучести
				// намного БОЛЬШЕ (+164.4% над Лукой против +84.7% у Тихона), по оси
				// живучесть/урон должно быть строго наоборот (больше живучести — меньше урона).
				// Прочитал по уровням (ProgressionEngine.buildHeroAtLevel, не на глаз) — нашёл
				// причину: critMultiplier Тихона УПЁРТ В ПОТОЛОК ровно с герой-уровня ~100 до
				// 200 (растёт только со скоростью самого потолка, не своей естественной), а у
				// Еремея crit-урон вообще без потолка — на hl=200 у Еремея critMultiplier=11.6,
				// у Тихона потолок держит его на 5.05. Разрыв не разовый (третям1/2 у Тихона
				// ratio к Еремею 0.83/0.94 — почти норма), а именно хвостовой (треть3 — 1.27,
				// Еремей заметно выше). Проблема была и до ревизии 26 (уже тогда третям3 давала
				// 1.17), правка 3.8→3.3 её просто усугубила. Правлю ИМЕННО рост потолка, не сам
				// потолок (не хочу снова раздувать треть1/2, где всё уже в порядке) —
				// critMultiplierCapPerLevel 0.035→0.08, чтобы потолок к 200 уровню доходил
				// заметно выше (было 5.05, должно быть ближе к ~7-8) и переставал так рано
				// душить рост. Не финальное, подтверждать новым прогоном (и заново сверить и с
				// целью по формуле шанса, и с положением относительно Еремея по оси 4).
				//
				// Ревизия 28: прогон balance-report_2026-09-01_23-39-45.xls после ревизии 27
				// (0.035→0.08) — ось живучесть/урон исправлена (средний ДПС Тихона теперь выше
				// Еремея — 6191 против 5641, ratio 0.91, треть3 почти вровень 0.998, было 1.27),
				// но откатила исправление правила 13: шанс обогнать снова 56.1% при цели 39.6%
				// (+42%), систематична (72.0% строк выше Луки, порог не пройден). Рост потолка
				// оказался слишком сильным рычагом для ОБЕИХ целей сразу — режу его вдвое мягче:
				// 0.08→0.055 (к 200 уровню потолок ~6.05 вместо 7.3) — компромисс между «не
				// душить хвост» (правило 4) и «не переливать через край формулы» (правило 13).
				// Не финальное, подтверждать новым прогоном по обоим критериям.
				// Ревизия 25: прогон balance-report_2026-09-01_23-05-09.xls после ревизии 24
				// (30→18) — эффект слабый (ratio 1.169→1.135), подтверждает старый вывод из
				// истории этого героя (см. комментарий у ревизии 22, «startGlobalDamage тут
				// второстепенен») — его реальная сила «с апгрейдами» держится на
				// critMultiplier через потолок, не на флэт-уроне. Переключаюсь на сам рычаг:
				// critMultiplierCap 5.0→3.8 (-24%), critMultiplierCapPerLevel не трогаю —
				// известный нелинейный рычаг (история ревизий 20-27), режу осторожным шагом,
				// не резко. startGlobalDamage оставляю на 18 (уже давал слабый, но правильно
				// направленный эффект). Не финальное, подтверждать новым прогоном.
				// Ревизия 24 (правило 13 CLAUDE.md, перекалибровка после фикса пилообразного
				// HP манекена — см. чат/CLAUDE.md): «Дрожащая рука» — таймингова волна, к
				// target.hp не привязана, но полный прогон ростера (report 2026-09-01_22-50-
				// 04.xls) снова показал систематику: ratio к среднему ДПС Луки 1.169 (по
				// третям 1.24/1.29/0.97 — тот же знакомый почерк, хвост уже ниже цели, начало-
				// середина горячие), обгоняет Луку в 118/150 строк (78.7%, далеко за порогом),
				// шанс обогнать 64.0% при цели 28.4% (преимущество живучести над Лукой 84.8%).
				// По решению пользователя раньше «останавливались здесь» на ×5.0/0.035 — но
				// это было решение под ДРУГОЕ состояние баланса (до фикса манекена), сейчас
				// пользователь явно попросил докрутить заново. Режу флэт-базу — тот же рычаг,
				// что и в ревизии 22-23 (давит на начало-середину, почти не трогает уже
				// заниженный хвост): startGlobalDamage 30→18. critMultiplierCap НЕ трогаю в
				// этот раз — известный нелинейный/пороговый рычаг (история ревизий 20-27),
				// один явный лишний рычаг за раунд повышает шанс не понять, что сработало. Не
				// финальное, подтверждать новым прогоном.
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
				// Ревизии 14-17 (история в git) правили базу/темп роста несколько раз вслед
				// за отчётами. Ревизия 18 (отчёт balance-report_2026-08-26_00-10-27.xls,
				// листы «с апгрейдами», правило 11): по строкам отчёта (не по чекпоинтам,
				// правило 3) видно, что отклонение от кривой живучесть→DPS не плоское —
				// герой-уровень 1-90 шумно колеблется вокруг нуля (от -16% до +41% —
				// маленькая выборка боёв на ранних уровнях), а с ~90-го стабильно уходит в
				// минус и держится там: -10…-30% почти на всех строках до конца диапазона,
				// в хвосте 190-200 в среднем -25% (медиана -23%).
				// ВАЖНО (проверено отдельно, реальным `calculateDamage`/`RealUpgradeEngine`,
				// не оценкой на глаз): damage и critMultiplier у ВСЕХ героев намеренно без
				// потолка для временных апгрейдов ("Без потолка" в game.js) — за агрессивный
				// (offense) забег critMultiplier у Тихона реально долетает до ×8-12 против
				// стартовых ×2, и это умножается на пик волны «Дрожащей руки» (×2.0) —
				// пиковый удар одного улучшенного захода уже сейчас доходит до ~71% HP
				// самого слабого босса уровня 141 (44522 HP). Поднимать урон флэтом
				// (как Луке/Миле, ×1.32 везде) значит утроить и этот пиковый риск — проверял,
				// это подводит вплотную к ваншоту слабого босса. При этом РЕАЛЬНАЯ игровая
				// сила по факту (лучшие из 8 записанных заходов на уровень, реальное время
				// прохождения) на сегодня заметно ниже средних показателей остальных даже в
				// удачных заходах — герой сейчас объективно НЕ конкурентоспособен, риск
				// «уже слишком силён» не подтвердился.
				// Поэтому правлю только damagePerLevel (рычаг «за уровень» — растёт с числом
				// применений, ~0 в начале игры, до 50 применений к герою 200, см. комментарий
				// у damagePerLevel ниже), НЕ трогая startGlobalDamage: на герое 1 множитель
				// точно ×1.000 (ранний шумный диапазон не толкаю вообще), плавно растёт до
				// ×1.28 к герою 200 — короче цели ×1.32 нарочно (по хвосту -25%), чтобы
				// пиковый крит на волне вырос МЕНЬШЕ, чем при полной флэт-правке (расчёт:
				// пик с апгрейдами вырастет пропорционально примерно до ~91% HP слабейшего
				// босса, не выше — не ваншот, но осторожно). Волну (shakeDamageMultiplier*/
				// shakeCritChanceBonus*) по-прежнему не трогаем. Числа не финальные —
				// подтверждать новым прогоном панели (и отдельно перепроверить пиковый удар).
				// Ревизия 22 (правило 13 CLAUDE.md, перекалибровка после фикса stale-const
				// бага панели — см. чат/CLAUDE.md): вся серия critMultiplierCap-правок
				// (ревизии 20-27, история выше) и это самое startGlobalDamage=45 калибровались
				// на карточках апгрейдов, ошибочно масштабированных от статов 1 уровня — баг
				// починен, критМульт-прокачка Тихона (которая раньше почти не влияла на
				// размер карточек) теперь влияет по-настоящему. Полный прогон панели: ratio
				// к среднему ДПС Луки 1.111 в среднем (по четвертям 1.10/1.29/1.13/0.92 —
				// хвост уже НИЖЕ цели, середина сильно выше), обгоняет Луку по среднему ДПС
				// на 109 из 150 строк (систематически, правило 6/13, порог 60%), шанс
				// обогнать на удачном заходе 58.9% при преимуществе живучести над Лукой
				// 84.1% — целевая формула (База=52.5/(1+84.1/100)) требует ≈28.5%. critMultiplierCap
				// — известно нелинейный/пороговый рычаг (см. историю выше, ревизии 20-27) —
				// НЕ трогаю его в этот раз, использую startGlobalDamage: по её же комментарию
				// (правило 3) он давит сильнее всего на низкие герой-уровни и почти не влияет
				// на герой-уровень ~200 — то есть должен срезать раздутые треть1/2 (1.10/1.29),
				// не трогая уже заниженный хвост (0.92). 45→30 (×0.667, сопоставимо с прошлой
				// проверенной правкой ревизии 22-23 в git-истории — 140→90, ×0.643).
				// Подтверждать новым полным прогоном (правило 14), вероятен ещё один раунд.
				startGlobalDamage: 18,
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
				// Единственный герой с этим полем — без него critMultiplier рос
				// НЕОГРАНИЧЕННО с двух независимых сторон: (1) постоянная прокачка — у
				// Тихона startGlobalWoundChance/woundChanceCap оба 0 с самого старта,
				// поэтому редирект «шанс ранения упёрся → плюс крит-урон» в
				// applyHeroPermanentStatUpgrade (см. её комментарий) срабатывал КАЖДЫЙ
				// цикл прокачки — это, а не апгрейды забега, было основным источником
				// разгона (герой 159 без единого апгрейда уже был на critMultiplier ×7.6);
				// (2) временные апгрейды за забег добавляли ещё сверху. Оба источника
				// теперь читают globalCritMultiplierCap/getHeroCritMultiplierCap. Пойман
				// вживую пользователем (крит на 100 000, уровень закрыт за 2 минуты фармом
				// перекачки уровня 141 на герое 160) — не гипотеза, реальный экземпляр.
				// Первая версия — ×4.5 — упала слишком резко: без прежнего постоянного
				// компаундинга через редирект DPS-с-апгрейдами провалился до -27% в
				// среднем и -56% в хвосте (сам редирект отвечал за большую часть его
				// роста после герой-уровня ~50-80, не только апгрейды — правило 3, рычаг
				// «за уровень» компаундится сильнее, чем казалось на калибровке).
				// ×6.0 — компромисс: пик всё ещё безопасно далеко от HP боссов (см. ниже),
				// но плато наступает позже и мягче давит на позднюю игру. Одновременно
				// поднял damagePerLevel — см. её комментарий — чтобы вместе вернуть
				// герой-уровень 150-200 к кривой живучесть/урон.
				// Проверено реальным боем (правило 1, не на глаз): пиковый удар с
				// реальными апгрейдами при ×6.0 оценочно ~47% HP слабейшего босса уровня
				// 141 (44522 HP) — тот же порядок безопасности, что и у ×4.5 (~36%), не
				// возврат к прежним ~92% при ×7.6. Другие герои без этого поля —
				// Number.isFinite(undefined) === false, поведение не менялось (Лука).
				// Ревизия 21 (задача «шанс обогнать Луку», win-rate-vs-luka.js — правило 1,
				// реальные заходы): при ×6.0 хвост (герой-уровень 159-200) давал 0% шанс
				// обогнать Луку на удачном заходе (реально измерено, не оценка) — та же
				// причина, что чинили у Елисея: потолок крит-урона упирается раньше, чем у
				// Луки (у него потолка вообще нет). Первая попытка ×9.0 оказалась резко
				// нелинейной: герой-уровень 159 подскочил до 83% (цель ~14%), 200 остался на
				// 1% — сам потолок к 200 уровню всё равно упирается, а в середине хвоста
				// давал гигантский, не запрошенный перекос. ×7.0 откатил слишком далеко —
				// снова 0% по всему хвосту. ×8.0 — резкий порог посередине диапазона (159:
				// 32%, но 180/200: 0%). ×7.5 почти не отличалась от ×7.0 (159: 6%, 180/200:
				// 0%) — эффект у этого героя нелинейный и узкий по всему опробованному
				// диапазону 6-9, не удалось найти значение с ровным откликом по всему
				// хвосту (честно фиксирую как известное ограничение, не молчу об этом).
				// ×8.5 — последняя проверенная точка, ближе к пороговой зоне ×8-9.
				// ОТКАТ: вся эта серия правок (×7.0-×9.0) проверялась только на 7
				// контрольных точках (герой-уровень 1/35/79/119/159/180/200) — ровно та
				// ошибка, от которой предостерегает правило 3 CLAUDE.md. Свежий полный
				// прогон панели (все 150 строк) показал, что ×8.5 давал средний ДПС на
				// +40% ВЫШЕ Луки и первое место по ДПС в 141 из 150 строк — не «изредка
				// везёт», а систематическое доминирование всего мидгейма (уровни ~20-150),
				// который контрольные точки просто перепрыгнули. Тихон уже был у верхней
				// границы кривой живучесть/урон ДО этой правки (см. более ранний разбор) —
				// подъём потолка усугубил ранее известную, ещё не решённую проблему вместо
				// того чтобы просто дать редкий шанс в хвосте. Откат к исходным ×6.0 —
				// требует отдельного разбора именно этого героя, не тем же рычагом.
				// Ревизия 22 (правило 13 CLAUDE.md — Лука эталон по ДПС): полный прогон
				// панели (balance-report_2026-08-31_21-28-00.xls, лист «DPS с апгрейдами»,
				// все 150 строк) — даже на этом ОТКАЧЕННОМ ×6.0 (см. историю выше) Тихон
				// систематически выше среднего ДПС Луки в первых двух третях диапазона
				// (ratio 1.61 / 1.26), ниже цели уже в хвосте (0.69 на 190-200 — критМульт-
				// потолок и так режет поздний рост). Пробовать разные critMultiplierCap
				// (6.0-9.0) уже показало нелинейный/пороговый отклик (см. историю выше) —
				// в этот раз рычаг ДРУГОЙ: startGlobalDamage (см. поле ниже), флэт, сильнее
				// всего давит на низкие уровни (доля ~79% от общего effective-урона на hl=1,
				// но всего ~0.5% на hl=200 при damagePerLevel 38) — не трогает и так
				// заниженный хвост. Число первого прохода — подтверждать новым прогоном.
				// Ревизия 23: прогон balance-report_2026-08-31_21-39-46.xls после ревизии 22
				// (140→90) — сдвиг в нужную сторону (треть1 1.61→1.33, треть2 1.26→1.14), но
				// ещё выше Луки; хвост тем временем ещё просел ниже цели (0.69→0.65). Режу
				// startGlobalDamage дальше по той же экстраполяции (90→55) — хвост продолжит
				// проседать (это отдельная, уже известная проблема этого героя, не решается
				// этим рычагом — вернусь к ней отдельным рычагом после того как выправлю
				// систематическое превышение в начале-середине). Не финальное число.
				// Ревизия 24: прогон balance-report_2026-08-31_21-45-38.xls после ревизии 23
				// (90→55) — среднее по диапазону уже 0.985 (у цели), треть1/2 всё ещё чуть выше
				// (1.13/1.06), треть3/хвост под целью (0.77/0.63, lucky%=2/0). damagePerLevel
				// здесь НЕ подходит для подъёма хвоста отдельно от треть1-3 — база (55) уже
				// пренебрежимо мала относительно damagePerLevel*L даже на треть1 (hl~25:
				// 38*25=950 ≫ 55), так что ЛЮБОЙ подъём damagePerLevel поднимет треть1-3
				// почти на ту же % величину, что и хвост, откатывая только что сделанный
				// прогресс. Режу базу ещё немного мягче (55→45), хвост отдельно — в
				// следующем раунде другим рычагом (вероятно critMultiplierCap, теперь при
				// заметно меньшей общей мощности герой может вести себя иначе, чем в прошлых
				// нелинейных экспериментах ×7-9 на прежней, более высокой базе). Не финальное.
				// Ревизия 25: прогон balance-report_2026-08-31_21-51-51.xls после ревизии 24
				// (55→45) — среднее по диапазону уже 0.954 (под целью), треть1/2 остаточно
				// чуть выше (1.07/1.03 — намного меньше исходных 1.61/1.26), треть3 0.76,
				// хвост 190-200 продолжил проседать (0.61, lucky%=0). Дальше резать базу не
				// буду — остаточное превышение в треть1/2 уже небольшое (в пределах разумного
				// шума RNG-апгрейдов), а хвост и так занижен. Переключаюсь на другой рычаг для
				// хвоста: critMultiplierCap 6.0→6.5 (осторожный шаг, при заметно меньшей базе
				// (45 против прежних 90-140), возможно, поведёт себя линейнее, чем в прошлых
				// экспериментах ×7-9). Проверить, не дал ли скачок в треть1/2 (правило 3: этот
				// рычаг растёт с числом применений и раньше давал пороговые эффекты).
				// Ревизия 26: прогон balance-report_2026-08-31_21-57-04.xls после ревизии 25
				// (6.0→6.5) — среднее по диапазону 0.998 (ровно цель), но хвост так и не даёт
				// ни одного обгона Луки (lucky%=0, макс всего 0.73 от среднего Луки на hl=200).
				// Раскопал причину (не на глаз, чтением кода): у Тихона startGlobalWoundChance
				// == woundChanceCap == 0 с самого старта → редирект «шанс ранения упёрся →
				// плюс крит-урон» в applyHeroPermanentStatUpgrade срабатывает КАЖДЫЙ цикл
				// прокачки без исключений — то есть его критMultiplier растёт ПОСТОЯННО и
				// быстро упирается в critMultiplierCap (около герой-уровня ~130, что ровно
				// совпадает с последней строкой отчёта, где он ещё смог обогнать Луку — не
				// совпадение). После этого isUpgradeStatEligibleNow('critMultiplier') в game.js
				// (гейтится ТЕМ ЖЕ полем critMultiplierCap) перестаёт вообще предлагать апгрейд
				// крит-урона герою НА ЗАБЕГЕ — то есть с этого уровня Тихон теряет единственный
				// канал роста, где у Луки (без потолка вообще) роста стакается бесконечно.
				// Фикс — по решению пользователя: растущий потолок (critMultiplierCapPerLevel),
				// а не разовый подъём константы (тот двигает и середину игры почти так же, как
				// хвост — не рычаг, целящийся именно в хвост). Первый проход: +0.08 за каждое
				// применение цикла upSpecif===2 (та же частота, что у critMultiplierPerLevel) —
				// к герою 200 потолок вырастет примерно до ~10.5. Требует отдельной проверки
				// пикового удара на безопасность (см. историю выше про инцидент с критом на
				// 100 000) — не подтверждено на глаз, подтверждать реальным боем панели.
				// Ревизия 27: прогон balance-report_2026-08-31_22-16-50.xls после ревизии 26
				// (+0.08/применение) — сработало: последняя строка с обгоном сдвинулась с
				// герой-уровня 130 до 143, хвост 190-200 подрос (0.66→0.81 среднее, макс
				// 0.73→0.89 от Луки), треть1/2 почти не шелохнулись (1.10/1.09→1.10/1.09 —
				// рост и правда пренебрежимо мал на низких уровнях, как и задумано). Проверка
				// безопасности: время прохождения и мин/макс ДПС на герой-уровне 150-200
				// растут плавно, без обвалов/всплесков — признаков возврата эксплойта с
				// критом нет. НО среднее по всему диапазону перевалило за цель (0.998→1.023) —
				// формально систематическое превышение Луки (правило 13, «не обгонять
				// систематически»), пусть и небольшое. Смягчаю рост (0.08→0.05) — часть
				// выигрыша в хвосте сохранится, но без ухода среднего выше 1.0. Не финальное.
				// Ревизия 22, раунд 2 (правило 13, перекалибровка после фикса stale-const
				// бага панели): startGlobalDamage (см. её правку выше, 45→30, ×0.667) почти
				// не сдвинул картину — ratio к Луке 1.111→1.087, шанс обогнать 58.9%→57.2%,
				// систематическое превышение среднего ДПС Луки 109/150→98/150 (порог 60%,
				// всё ещё систематично). Причина — у Тихона нет отдельного critMultiplierPerLevel
				// (см. комментарий выше про редирект woundChance→критУрон): его реальная сила
				// «с апгрейдами» держится почти целиком на critMultiplier через ИМЕННО этот
				// потолок + карточки апгрейдов, магнитуда которых теперь (после фикса)
				// тоже честно масштабируется от текущего critMultiplier — startGlobalDamage
				// тут второстепенен. Режу сам потолок — единственный настоящий рычаг для
				// этого героя, невзирая на известную нелинейность (история выше, ревизии
				// 20-27): cap 6.5→5.0 (×0.77), рост потолка за уровень 0.05→0.035 (×0.70).
				// Подтверждать новым полным прогоном (правило 14) — ожидаю ещё раунд из-за
				// документированной нелинейности этого конкретного рычага.
				// Ревизия 25 (сам прогон, для полноты): balance-report_2026-09-01_23-10-22.xls
				// после 5.0→3.8 — сработало хорошо на главном критерии: ratio 1.135→0.991
				// (ровно у цели), уже не систематична (54.0% строк выше Луки, было 74.7%,
				// порог 60%). Шанс обогнать всё ещё выше цели (47.8% против 28.4%) — но при
				// ratio~1.0 и известной высокой дисперсии волны «Дрожащей руки» (удачный/
				// неудачный тайминг качели даёт заметно разный результат) дальнейшая охота
				// именно за этим числом тем же рычагом рискует качнуть обратно в минус, как
				// уже бывало не раз в истории этого героя (ревизии 20-27) — оставляю здесь,
				// главный критерий систематичности выполнен. Можно продолжить точечно позже.
				// Ревизия 29 (лог-факт: лист «DPS с апгрейдами», balance-report_2026-09-02_
				// 21-29-51.xls): шанс обогнать 46.5% при цели 39.6% (+17.6%, всё ещё заметно
				// выше) — и та же строка листа живучести показывает Тихона (+84.9%) ВЫШЕ
				// Клима (+73.0%) по среднему ДПС (5564 против 5251) — по оси живучесть/урон
				// должно быть наоборот, он живучее. Режу тот же рычаг третий раз подряд, но
				// мягче предыдущих качелей (0.035→0.08 было перелётом, 0.08→0.055 — компромисс,
				// сейчас всё ещё чуть высоко): critMultiplierCapPerLevel 0.055→0.048. Не
				// финальное, подтверждать тем же листом.
				//
				// Ревизия 30 (лог-факт: лист «DPS с апгрейдами», balance-report_2026-09-02_
				// 21-35-42.xls): шанс обогнать 44.4% при цели 39.6% (+12.2%, продолжает
				// сходиться — было +17.6%). Ещё один маленький шаг тем же рычагом:
				// critMultiplierCapPerLevel 0.048→0.043.
				// Ревизия 32 (прямой запрос пользователя: hl=200 строго 36%). Низкий шум
				// (--attempts-per-strategy=100): итог 34%, хвост 165-200 почти нулевой
				// (3/3/1/1/0/0/0/0) — mean_ratio=0.875, запас есть. Диагностика (реальный
				// ProgressionEngine.buildHeroAtLevel): натуральный critMultiplier ТОЧНО равен
				// потолку на КАЖДОМ проверенном уровне от hl=100 и дальше (4.675=4.675,
				// 5.5=5.5, 6.05=6.05...) — потолок упирается практически на всём диапазоне,
				// не только в хвосте, карточкам крит-урона апгрейдов вообще некуда расти.
				// Поднимаю саму базу потолка решительно. РЕЗУЛЬТАТ: КАТАСТРОФА — mean_ratio
				// 1.362, обгон Луки в 92% строк (прямое нарушение правила 13). Причина: у
				// Тихона (в отличие от Еремея/Клима) НАТУРАЛЬНЫЙ (без потолка) рост и так
				// разгоняется до ~9.0 к hl=200 — потолок 3.3 БЫЛ единственным, что держало
				// его в узде (см. историю ревизий 20-27 выше — герой 159 без потолка уже был
				// на ×7.6, крит доходил до ×100000). Подняв потолок до 10.0, я выше
				// натурального роста — потолок перестал ограничивать permanent-стат вообще,
				// он просто разгоняется свободно. Нужен потолок ЗАМЕТНО выше 3.3 (чтобы дать
				// temp-апгрейдам хоть какой-то запас), но заметно НИЖЕ натуральных ~9.0 —
				// пробовал 5.0: ВСЁ ЕЩЁ нарушение (mean_ratio 1.058, обгон 72%), а хвост
				// снова почти нулевой (1% на hl=200) — cap=5.0 даёт слишком много запаса в
				// середине (где герой и так уже силён) и слишком мало в самом конце. Проблема
				// не в БАЗЕ потолка — откат к исходной 3.3, рычаг нужен другой: ускорение
				// РОСТА потолка только в последних уровнях (см.
				// critMultiplierCapLateBonusPerLevel ниже и новую ветку в
				// applyHeroPermanentStatUpgrade), не трогая уже опасно горячую середину.
				// Ревизия 32 (продолжение): cap=3.3 + позднийРостБонус=0.1 — безопасно
				// (mean_ratio=0.875, обгон 15.3%), но эффект слишком слаб (hl=200 всё ещё
				// 1%, было 0%) — потолок к hl=200 (≈3.3+2.75+1.0=7.05) всё ещё заметно ниже
				// натурального желаемого роста (~9.0), запаса под карточки почти нет. Давлю
				// сильнее: 0.1→0.4. РЕЗУЛЬТАТ: hl=200 1%→14% (цель 36%), безопасно
				// (mean_ratio=0.879, обгон 18.0%). Наклон между 0.1 и 0.4: (14-1)/0.3≈43.3
				// pp/ед. Экстраполяция к цели: 0.4+(36-14)/43.3≈0.91. РЕЗУЛЬТАТ: hl=200=37%
				// (цель 36, очень близко), mean_ratio=0.887, обгон 18.0% — безопасно.
				// Финальная микро-подстройка: наклон (37-14)/0.51≈45.1pp/ед., для -1pp:
				// 0.91-1/45.1≈0.89. С новым точным замером (FINAL_ROW_ATTEMPTS_MULTIPLIER=20)
				// то же значение читается 38% (цель теперь 36%, +2pp). Тем же наклоном:
				// 0.89-2/45.1≈0.845. РЕЗУЛЬТАТ: 39% (0.89→38%, 0.845→39% — движение НЕ в
				// ожидаемую сторону, различия внутри шума 1000-выборки на hl=200, ~±2pp).
				// Пользователь настаивает строго на 36% — беру более крупный шаг, чтобы выйти
				// за пределы шума и получить надёжный наклон: 0.845→0.7. РЕЗУЛЬТАТ: hl=200=
				// 30% — чёткий сигнал, наклон (38.5-30)/(0.87-0.7)≈50pp/ед., подтверждает
				// прежнюю оценку ~45-49. Интерполяция к 36%: 0.7+6/50=0.82. РЕЗУЛЬТАТ: 37%
				// (цель 36%, разница 1pp). Наклон (37-30)/0.12≈58.3pp/ед. Финальная
				// подстройка: 0.82-1/58.3≈0.80.
				critMultiplierCap: 3.3,
				critMultiplierCapLateBonusStartLevel: 160,
				critMultiplierCapLateBonusPerLevel: 0.80,
				// Ревизия 31 (лог-факт: построчный хвост hl>=180, после потолка у Луки) —
				// Тихон -38.5pp от цели в хвосте (было -38.5pp, без изменений от Луки).
				// Поднимаю рост: 0.043→0.055.
				critMultiplierCapPerLevel: 0.055,
				woundChanceCap: 0,
				heroHpCap: 3000,
				damageVariance: 0.15,
				// Ревизия 21: прирост за уровень — см. подробный комментарий у объекта eremei
				// (матчит герой 159 из реального отчёта DataExport). У Тихона critChanceCap
				// упирается на 35-м из 40 ходов урона — последние 5 удвоены редиректом:
				// 35×1 + 5×2 = 45 применений инкремента, damagePerLevel = (498.5-106)/45
				// (а не /40 — та же ошибка деления, что была у Дуни, см. её комментарий).
				// Ревизия 14: этот расчёт был откалиброван под старый startGlobalDamage=126 —
				// теперь неактуален. Ревизия 20: срез отчёта balance-report_2026-08-26_
				// 01-25-57.xls (после потолка crit-урона ×4.5 — DPS с апгрейдами упал до
				// -27% в среднем, -56% в хвосте 190-200). Вместе с подъёмом
				// critMultiplierCap до ×6.0 (см. её комментарий) подобрано так, чтобы
				// сумма обоих рычагов вернула герой-уровень 150-200 к кривой
				// живучесть/урон (расчёт по реальным applyHeroPermanentStatUpgrade —
				// правило 1, не переписанная формула). Числа снова не финальные —
				// подтверждать новым прогоном панели.
				damagePerLevel: 38,
				critChancePerLevel: 0.001,
				critMultiplierPerLevel: 0.07,
				woundChancePerLevel: 0,
				shotIntervalReductionPerLevel: 1.2,
				heroHpPerLevel: 18.60,
				defensePerLevel: 0.00015,
				defenseCap: 0.17,
			},


			// Елисей Медов — «Пчелиный рой». Разблокируется после 49-го уровня кампании
			// (пасечный уровень, см. description/идеи по уровням.txt). Вместо мгновенного
			// урона по прицелу поднимает пчёл (до 8 на одну цель, см. checkAimAndDamage/
			// trySpawnEliseyBee/updateEliseyBees в game.js) — каждая жалит на 1/8 урона
			// героя по СВОЕМУ независимому таймеру (не хором), из-за чего суммарный темп
			// попаданий на полном стеке растёт в разы относительно startSHOT_INTERVAL —
			// компаундящийся рычаг (та же категория, что и damagePerLevel у обычных
			// героев, см. правило 3 CLAUDE.md про Тихона), поэтому startGlobalDamage
			// здесь НАМЕРЕННО ближе к тир Дуни (архетип «частые слабые удары»), а не
			// Луки/Дарьяны — числа первого прохода, требуют подтверждения реальным боем
			// панели ПОСЛЕ того, как механика заработает (правило 1 — не на глаз).
			elisey: {
				name: 'elisey',
				permanentGrowthProfile: 'apiary',
				dispName: 'Елисей Медов',
				image: 'images/hero/7_EliseyMedov/min.webp',
				fullImage: 'images/hero/7_EliseyMedov/full.webp',
				weaponImage: 'images/hero/7_EliseyMedov/weapon1.webp',
				// Второй спрайт пчелы — чередуется по чётности индекса пчелы в её массиве
				// (см. trySpawnEliseyBee в game.js), чтобы рой не летал "в одну сторону".
				weaponImage2: 'images/hero/7_EliseyMedov/weapon2.webp',
				aimImage: 'images/hero/7_EliseyMedov/aim.webp',
				level: 1,
				startGlobalDamage: 100,
				startGlobalCritChance: 0.06,
				startGlobalCritMultiplier: 1.9,
				// Шанс ранения заморожен на 0 с самого старта (см. startGlobalWoundChance
				// ниже) — весь его рост уходит в critMultiplier через уже существующий
				// редирект в applyHeroPermanentStatUpgrade (тот же механизм, что у Еремея/
				// Дуни/Милы/Тихона), никакого нового кода для этого не нужно.
				startGlobalWoundChance	: 0,
				// Живучесть — «чуть ниже Дарьяны» (heroHP:140, startHeroDamageReduction:0.05,
				// heroHpCap:1750, heroHpPerLevel:11, defensePerLevel:0.001, defenseCap:0.228),
				// с запасом ~10-12% ниже по каждому рычагу.
				startHeroDamageReduction : 0.045,
				startSHOT_INTERVAL : 720,
				// Ревизия 2 (правка баланса по отчёту balance-report_2026-08-30_21-55-46.xls,
				// лист «DPS с апгрейдами», правило 11): Елисей был СИСТЕМАТИЧЕСКИ последним
				// по DPS на всех 150 строках диапазона без единого исключения (не выброс —
				// см. правило 6), отношение к Луке падало с 0.86 на герое-уровне 1 до
				// 0.32-0.35 в хвосте 190-200 — росло хуже с уровнем, а не ровный сдвиг, что
				// по правилу 3 указывает на рычаг «за уровень», а не на разовую базу.
				// Раскопал причину: damagePerLevel у него УЖЕ выше, чем у Луки (14 vs 12) —
				// дело не в уроне. Дело в скорости атаки — она у роя двойного действия:
				// governs и темп СПАВНА пчёл (набор стека до 8), и темп посадки/урона
				// КАЖДОЙ пчелы, то есть бьёт по итоговому ДПС куда сильнее, чем обычному
				// герою. Старое minShotInterval:500/shotIntervalReductionPerLevel:2 против
				// Луки 120/12 давали ×4.17 разрыв в скорости на потолке — при том что по
				// самому урону/криту (без скорости) Елисей и так был примерно на ~30% ВЫШЕ
				// Луки, то есть весь недобор был именно в скорости, не в уроне. Подняты оба
				// рычага скорости (не один — правило 3), калибровка через реальный прогон
				// панели ДО/ПОСЛЕ (не аналитика на глаз — правило 1): цель — приблизить
				// хвостовое отношение к Луке к ~0.85-0.95 (не 1:1 — умышленно чуть ниже
				// Луки, а не вровень, по прямому решению пользователя не делать его имбой).
				minShotInterval: 180,
				heroHP : 125,
				lvlUnlock: 49,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: false,
				feature: 'Пчелиный рой — <br>атакует роем пчёл,<br>рой жалит ещё 1,5 секунды, даже если герой не наведён на цель.',
				critChanceCap: 0.35,
				// Шанс ранения заперт на 0 с самого старта (== woundChanceCap ниже) — весь его
				// прирост КАЖДЫЙ цикл редиректится в critMultiplier (applyHeroPermanentStatUpgrade,
				// тот же механизм, что у Тихона/Еремея/Дуни/Милы) — без потолка здесь это тот же
				// неограниченный разгон, что чинили у Тихона: критMultiplier уже дорастает до
				// ×6.3 к герою-уровню 175 без единого temporary-апгрейда. Число первого прохода —
				// подтверждать реальным боем панели (правило 1), просто сам факт потолка обязателен.
				// Ревизия 2 (правка баланса, диагностика win-rate-diagnostic.js — правило 1,
				// реальные заходы, не аналитика): при 6.0 Елисей упирался в потолок уже к
				// герою-уровню ~82 и дальше НЕ РОС по крит-урону вообще до конца диапазона —
				// а у Луки critMultiplierCap в объекте вообще НЕТ ПОЛЯ (растёт без потолка,
				// см. Number.isFinite(undefined)===false в applyHeroPermanentStatUpgrade) —
				// доходит до ×13.7 к герою-уровню 200. Из-за этого шанс Елисея обогнать Луку
				// в удачном заходе падал с 52% на герое-уровне 1 до 13.8% на 119 и до 0% на
				// 159-200 (реально измерено, не оценка). Подняты до 12.0 — при текущем
				// critMultiplierPerLevel:0.05 это не даёт упереться в потолок до самого 200
				// уровня (та же логика "потолок есть, но не бьёт по факту", что у Луки), а
				// не снятие потолка совсем — предохранитель от неограниченного разгона (как
				// у Тихона) остаётся на случай будущей правки этого рычага.
				// Ревизия 4 (лог-факт): critMultiplierLateBonusPerLevel (см. ниже) быстро
				// разгоняет натуральный крит-урон до потолка уже к hl=180 (реально проверено
				// ProgressionEngine.buildHeroAtLevel: critMult==cap==12.0 с hl=180) — дальше
				// бонус упирается в потолок и не даёт эффекта (плоский отклик 1.0→36%,
				// 1.3→34%, 2.0→36% — три разных значения рычага дают одинаковый результат).
				// Поднимаю саму базу потолка, чтобы освободить запас для карточек апгрейдов.
				// РЕЗУЛЬТАТ: дикий перелёт — hl=200=80% (цель 40%!), mean_ratio=0.967, уже
				// близко к опасной границе правила 13. 24.0 сняло СЛИШКОМ много ограничения
				// разом. Резко сокращаю: 24.0→15.0. РЕЗУЛЬТАТ: hl=200=46% (цель 40%, +6pp),
				// безопасно (mean_ratio=0.935). Наклон между 12(36%) и 15(46%): 10/3≈3.33pp/
				// ед. потолка. Точечная подстройка: 15-6/3.33≈13.2. РЕЗУЛЬТАТ: hl=200=37%
				// (цель 40%, -3pp). Наклон (46-37)/(15-13.2)=5pp/ед. Финал: 13.2+3/5≈13.8.
				critMultiplierCap: 13.8,
				woundChanceCap: 0,
				heroHpCap: 1600,
				damageVariance: 0.10,
				damagePerLevel: 14,
				critChancePerLevel: 0.006,
				critMultiplierPerLevel: 0.05,
				// Ревизия 3 (прямой запрос пользователя: hl=200 строго 42%). Низкий шум
				// (--attempts-per-strategy=100): итог 36%, хвост 165-200 монотонно падает
				// (43/39/36/31/27/25/23/20) — mean_ratio=0.904, beat%=1.3% — очень большой
				// запас. critMultiplierCap=12.0 подтверждённо не упирается (см. комментарий
				// выше), поэтому пробую тот же нелинейный «финишный рывок» крит-урона, что и
				// у остальных героев, порог 160.
				// Раунд 1 (бонус 0.05): слабый эффект — hl=200 20%→23% (цель 42%), запас
				// остаётся большой (mean_ratio=0.901, beat%=3.3%). Раунд 2 (0.15): 23%→33%,
				// наклон (33-23)/0.1=100pp/ед. Раунд 3 (0.24): hl=200 почти не сдвинулся
				// (33→32), хотя соседние строки (170-190) выросли до 39-49% — тот же эффект
				// финишного рывка скорости Луки на hl=200, что у Дуни/Клима/Тихона. Толкаю
				// решительнее, с запасом сверх линейной экстраполяции: 0.24→0.4. РЕЗУЛЬТАТ:
				// hl=200 32%→37% (цель 42%), наклон (37-32)/0.16≈31.25pp/ед. Экстраполяция:
				// 0.4+(42-37)/31.25≈0.56. РЕЗУЛЬТАТ (высокая точность, n=500): hl=200=38%
				// (цель 42%), mean_ratio=0.915, beat%=3.3% — запас всё ещё большой. Отклик
				// слабее ожидаемого — толкаю крупнее: 0.56→1.0. С новым точным замером
				// (FINAL_ROW_ATTEMPTS_MULTIPLIER=60, 3000 попыток) hl=200=36% (цель теперь
				// строго 40%, +4pp). Пробую следующий шаг с той же высокой точностью: 1.3.
				// РЕЗУЛЬТАТ: hl=200=34% — движение НЕ в ожидаемую сторону (36→34 при
				// увеличении рычага), снова похоже на шум. Беру более крупный шаг для
				// чёткого сигнала: 1.3→2.0. РЕЗУЛЬТАТ: hl=200=36% — то же самое, что и при
				// бонусе 1.0! Диагностика (ProgressionEngine.buildHeroAtLevel) подтвердила:
				// критМульт УПИРАЕТСЯ в потолок (12.0) уже с hl=180 — дальнейший рост бонуса
				// не даёт эффекта, потолок сам сдерживает. Откатываю бонус к умеренному
				// значению (потолок теперь поднят отдельно, см. critMultiplierCap выше) — 0.5.
				// С потолком 24.0 это дало дикий перелёт (80%) — режу и бонус тоже, пока
				// подбираю новый безопасный потолок: 0.5→0.2.
				critMultiplierLateBonusStartLevel: 160,
				critMultiplierLateBonusPerLevel: 0.2,
				woundChancePerLevel: 0,
				// См. подробный комментарий у minShotInterval выше — тот же рычаг «скорость
				// атаки за уровень», поднят вместе с потолком, а не один из двух.
				shotIntervalReductionPerLevel: 5,
				heroHpPerLevel: 10,
				defensePerLevel: 0.0009,
				defenseCap: 0.20,
			},
			
			// Клим Глыбов — «Обвал»: единственный герой, чей крит-шанс зависит от
			// СОСТОЯНИЯ ЦЕЛИ, а не от статов/таймингов самого героя — см.
			// getKlimCritChanceBonus в game.js (чистая функция от target.hp/maxHP,
			// без хранимого состояния, тот же паттерн, что и «Прогревание» Дарьяны,
			// только зеркально: чем МЕНЬШЕ HP осталось у цели, тем МЕНЬШЕ бонус, а не
			// больше). Архетип — медленный тяжёлый метатель: почти гарантированный
			// крит по свежему/полному HP боссу открывает бой, но чем дольше бой
			// длится, тем ближе крит-шанс к голому стату героя (critChanceCap ниже) —
			// сила сильно смещена к началу каждой боссовой фазы.
			// Первый проход по всем числам ниже — не откалиброван реальным боем
			// панели (правило 1/14 CLAUDE.md): startGlobalDamage/критовые статы и
			// живучесть (заявлено «чуть меньше Дуни») подобраны интерполяцией от
			// соседних архетипов (Еремей — тяжёлый редкий удар; Тихон — растущий
			// critMultiplierCap), не расчётом. Требуется полный прогон
			// scripts/balance-sim/run.js и калибровка шанса обогнать Луку по правилу
			// 13 (пропорционально преимуществу живучести над Лукой) — как и у любого
			// другого героя, числа тут будут меняться по мере прогонов.
			klim: {
				// Ревизия 2 (правило 13 CLAUDE.md, первая калибровка): прогон
				// scripts/balance-sim/run.js --heroes=klim,luka (balance-report_2026-
				// 09-01_21-28-06.xls) по листу «DPS с апгрейдами», все 150 строк —
				// ratio klim/luka по третям 1.63/1.21/0.83, хвост (hl>=190) 0.55,
				// klim обгоняет средний ДПС Луки в 103/150 строк (68.7%, выше порога
				// систематичности из правила 6/13). Живучесть-с-апгрейдами: klim
				// живучее Луки в среднем на 72.8% (треть1 52%, треть3 97%, хвост
				// 116%) — целевой шанс обогнать по формуле База=52.5/(1+72.8/100)
				// ≈30.4%, панель уже даёт 60.7% в среднем — вдвое больше цели, и это
				// ДО учёта систематического превышения среднего ДПС.
				// Диагностика (не на глаз — прочитан реальный critMultiplier/cap по
				// уровням через ProgressionEngine.buildHeroAtLevel): критМульт-потолок
				// НЕ упирается нигде в диапазоне (на hl=200: critMultiplier=7.3 при
				// cap=8.0) — в отличие от истории Тихона, тут не потолок обваливает
				// хвост. Форма (сильный старт, слабый хвост) — типичный флэт-рычаг:
				// startGlobalDamage/startGlobalCritMultiplier дают несоразмерно много
				// в начале (когда «гарантированный крит от Обвала» — единственный
				// источник силы, statы ещё маленькие) и разбавляются к 200 уровню,
				// а growth-рычаги (damagePerLevel/critMultiplierPerLevel) в первом
				// проходе оказались НЕДОСТАТОЧНЫМИ, чтобы удержать хвост на уровне
				// Луки. Режу флэт-базу (150→70 урон, 2.3→1.9 крит-мульт) и поднимаю
				// оба growth-рычага (18→26 урон/уровень, 0.05→0.075 крит-мульт/
				// уровень — с учётом редиректа шанса ранения эффективно ×2). Числа не
				// финальные, ожидаю ещё раунд(ы) — подтверждать новым прогоном.
				//
				// Ревизия 3: прогон balance-report_2026-09-01_21-33-05.xls после
				// ревизии 2 — стало ХУЖЕ, не лучше: ratio по третям 1.51/1.46/1.09
				// (треть1 почти не сдвинулась, треть2 ВЫРОСЛА с 1.21 до 1.46), превышение
				// среднего ДПС Луки — уже 133/150 строк (88.7%, было 68.7%), шанс
				// обогнать — 74% (было 60.7%), хвост чуть подрос к цели (0.55→0.795, это
				// нормально — хвост НИЖЕ Луки не проблема сама по себе, правило 13 не
				// требует точного совпадения, только «не систематически выше»). Вывод:
				// одновременный подъём growth-рычагов (damagePerLevel/critMultiplierPerLevel)
				// перевесил порез флэт-базы почти на всём диапазоне — у Клима КАЖДАЯ
				// единица урона/крит-мульт умножается на практически гарантированный крит
				// («Обвал» действует весь бой, не долю времени, как обычный крит-шанс),
				// поэтому и база, и рост нужны значительно НИЖЕ, чем у героя без такого
				// множителя. Откатываю growth-рычаги почти к исходным (26→18, 0.075→0.05)
				// и режу флэт-базу заметно сильнее, чем в прошлый раз (70→40 урон,
				// 1.9→1.7 крит-мульт — уже на уровне обычных героев, вся «взрывная» сила
				// остаётся за счёт почти гарантированного крита, не за счёт множителя
				// поверх него). Числа не финальные, подтверждать новым прогоном.
				//
				// Ревизия 4: прогон balance-report_2026-09-01_21-35-30.xls после
				// ревизии 3 — резко в другую сторону: среднее ratio 0.846, превышение
				// среднего ДПС Луки только в 24/150 строк (16%, уже не систематично),
				// средний шанс обогнать — 31.2% (цель 30.3%, почти точное попадание в
				// среднем!). НО форма по диапазону неровная (правило 3): треть1/2 у цели
				// (0.91/0.92), треть3 просела (0.71), хвост (hl>=190) заметно ниже (0.50,
				// шанс обогнать буквально 0% на hl=190/195/200) — и САМ старт (hl=1,
				// ratio=0.375, шанс 0%) тоже заметно слабее своей же трети. Общее среднее
				// совпало с целью СЛУЧАЙНО — компенсацией «слишком слабо на краях,
				// нормально в середине», а не ровной кривой. Точечная правка: небольшой
				// подъём флэт-базы (40→55 урон, помогает в основном самому началу
				// диапазона, где сейчас просадка сильнее всего) и небольшой подъём обоих
				// growth-рычагов (18→21 урон/уровень, 0.05→0.058 крит-мульт/уровень —
				// помогает хвосту, не раздувая уже нормальную середину). Не финальное.
				//
				// Ревизия 5: прогон balance-report_2026-09-01_21-37-41.xls после
				// ревизии 4 — «небольшая» правка (+37.5% к базе, +17%/+16% к обоим
				// growth-рычагам одновременно) оказалась НЕ небольшой: среднее ratio
				// подскочило до 1.04, превышение среднего ДПС Луки ровно на границе
				// систематичности (90/150 строк, 60%), шанс обогнать — 51.7% (цель
				// 30.4%, перелёт почти вдвое). Подтверждает вывод ревизии 3 ещё раз:
				// у Клима любой из этих рычагов работает с намного большим эффективным
				// плечом, чем у обычного героя (гарантированный крит «Обвала» умножает
				// КАЖДУЮ единицу базы/роста почти всё время боя) — 4 одновременных
				// правки суммарно дали непропорционально большой прирост. Возвращаюсь к
				// ревизии 3 (40 урон, 1.7 крит-мульт, 18 урон/уровень, 0.05 крит-мульт/
				// уровень — она давала среднее почти точно в цель), и правлю ТОЛЬКО
				// хвост/старт точечно и раздельно, меньшими шагами: startGlobalDamage
				// 40→46 (короткое плечо — влияет в основном на герой-уровень 1, где в
				// ревизии 3 был явный провал, ratio 0.375/0%-шанс), critMultiplierPerLevel
				// 0.05→0.053 (длинное плечо — компаундится к 200 уровню через редирект,
				// придаёт хвосту чуть больше без ощутимого влияния на середину). Оба
				// шага меньше и разнонаправленнее прошлого раза — не трогаю damagePerLevel
				// (тот уже раз показал сильный эффект на треть2/3 вместе). Не финальное.
				balanceRevision: 11,
				//
				// Ревизия 6 (правило 13 CLAUDE.md, перекалибровка после фикса пилообразного
				// HP манекена — см. чат/CLAUDE.md): вся ревизия 5 калибровалась на ОДНОРАЗОВОМ
				// линейном спуске HP манекена за весь забег; сейчас HP идёт пилой — 100%→0%
				// КАЖДУЮ минуту, 4 раза, синхронно с окнами апгрейдов. Средний бонус «Обвала»
				// по времени похожий (~50%), но полный прогон (report 2026-09-01_22-32-36.xls,
				// вместе с daryana/luka) даёт другую картину: ratio к среднему ДПС Луки 0.755
				// в среднем (по третям 0.765/0.836/0.664 — просадка к концу), НИ РАЗУ не
				// обгоняет Луку (0/150 строк), шанс обогнать 16.2% при цели ≈30.3%
				// (преимущество живучести над Лукой 73.0%) — нужен ощутимый общий подъём, не
				// точечная правка. Треть3/хвост (0.664/0.472) просели куда сильнее трети1/2
				// (0.765/0.836) — поднимаю оба growth-рычага заметнее, чем флэт-базу:
				// startGlobalDamage 46→55 (+20%, треть1 уже близко к норме), damagePerLevel
				// 18→26 (+44%) и critMultiplierPerLevel 0.053→0.075 (+42%, с учётом редиректа
				// шанса ранения эффективно ×2) — оба нацелены на хвост. Не финальное, ожидаю
				// ещё раунд(ы) — подтверждать новым прогоном.
				//
				// Ревизия 7: прогон balance-report_2026-09-01_22-37-46.xls после ревизии 6 —
				// перелёт: ratio 1.151 в среднем (было 0.755), обгоняет Луку в 121/150 строк
				// (80.7%, за порогом систематичности), шанс обогнать 64.1% (цель 30.2%). НО
				// форма всё ещё неровная: треть1/2 перегреты (1.176/1.265), а треть3/хвост
				// ВСЁ ЕЩЁ просели (1.011/0.707) даже после общего подъёма — прочитал реальный
				// critMultiplier по уровням (ProgressionEngine.buildHeroAtLevel, не на глаз):
				// на hl=180 и hl=200 critMultiplier ТОЧНО равен critMultiplierCap (7.8/8.0) —
				// потолок реально упирается в хвосте, как когда-то у Тихона, и съедает
				// прибавку от возросшего critMultiplierPerLevel именно там, где она нужнее
				// всего. Две независимые правки: (1) откатываю startGlobalDamage 55→46
				// (треть1/2 перегреты — флэт-рычаг сильнее всего давит на начало); (2) поднимаю
				// сам потолок и его рост — critMultiplierCap 6.0→9.0, critMultiplierCapPerLevel
				// 0.04→0.06 — чтобы возросший critMultiplierPerLevel (оставляю 0.075) реально
				// доходил до хвоста, а не упирался в потолок раньше времени. damagePerLevel
				// (26) не трогаю — треть2 и так уже выше цели. Не финальное.
				//
				// Ревизия 8: прогон balance-report_2026-09-01_22-42-06.xls после ревизии 7 —
				// сильный перелёт ПО ВСЕМУ диапазону, не только в хвосте: ratio 1.361 в среднем
				// (было 1.151), треть1/2/3 — 1.237/1.541/1.305 (треть2 выросла сильнее всего,
				// хотя потолок там даже не был близок к binding ни в ревизии 6, ни в 7), 92.0%
				// строк выше Луки, шанс обогнать 75.4% (цель 30.4%). Причина шире, чем просто
				// «снять потолок в хвосте»: RealUpgradeEngine.buildUpgradeStatEffect считает
				// магнитуду карточки «крит-урон» через остаток ДО потолка (см. её комментарий
				// в admin-balance-panel.html) — подняв cap 6.0→9.0, я не только разрешил расти
				// дальше в хвосте, но и дал куда больший запас под карточки апгрейдов ВЕЗДЕ по
				// диапазону, отсюда рост треть2 сильнее прежнего. Отдельная от простого
				// permanent-статa причина, важно зафиксировать на будущее. Откатываю потолок
				// заметно скромнее — 9.0→7.0, 0.06→0.045 (headroom к 200 уровню остаётся, но
				// куда меньше прежнего) — и режу сам рычаг роста critMultiplierPerLevel
				// 0.075→0.055 (тот, что раньше всего разгонял и постоянный стат, и карточки).
				// startGlobalDamage/damagePerLevel в этот раз не трогаю — изолирую эффект
				// именно крит-рычагов. Не финальное, подтверждать новым прогоном.
				//
				// Ревизия 9: прогон balance-report_2026-09-01_22-45-04.xls после ревизии 8 —
				// сдвиг в нужную сторону (ratio 1.361→1.126, шанс 75.4%→60.9%), но всё ещё
				// систематично (123/150 строк, 82.0%, порог не пройден) и цель (30.3%) вдвое
				// ниже факта. Форма стабильно повторяется третий раунд подряд — треть2
				// (герой-уровень 69-118) стабильно горячее треть1/3, независимо от того, какой
				// рычаг режу (крит-урон, потолок) — похоже на структурную особенность самого
				// «Обвала» в связке с пилой HP, не устранимую одним точечным рычагом. Крит-
				// рычаги уже дважды резал подряд с сложными побочными эффектами (через
				// магнитуду карточек, см. ревизию 8) — в этот раз переключаюсь на
				// нетронутый до сих пор damagePerLevel: 26→20 (-23%), изолированно от
				// крит-рычагов, чтобы разделить эффекты. Не финальное.
				name: 'klim',
				permanentGrowthProfile: 'quarry',
				dispName: 'Клим Глыбов',
				image: 'images/hero/8_KlimGlibov/min.webp',
				fullImage: 'images/hero/8_KlimGlibov/full.webp',
				weaponImage: 'images/hero/8_KlimGlibov/weapon.webp',
				aimImage: 'images/hero/8_KlimGlibov/aim.webp',
				level: 1,
				startGlobalDamage: 46,
				startGlobalCritChance: 0.05,
				startGlobalCritMultiplier: 1.7,
				// Шанс ранения заморожен на 0 с самого старта (по прямому запросу) —
				// isUpgradeStatEligibleNow/isTemporaryStatEverAvailable в game.js уже
				// гейтят апгрейд «шанс ранения» через startGlobalWoundChance > 0, а
				// applyHeroPermanentStatUpgrade в этом файле уже редиректит весь его
				// прирост в critMultiplier, когда woundChanceCap заперт на старте —
				// тот же готовый механизм, что у Еремея/Дуни/Милы/Тихона, никакого
				// нового кода не нужно. Стат «шанс ранения» у Клима нигде в UI/
				// апгрейдах сам не появится.
				startGlobalWoundChance: 0,
				// Живучесть — «чуть меньше Дуни» (heroHP:150, startHeroDamageReduction:
				// 0.04, heroHpCap:2600, heroHpPerLevel:13, defensePerLevel:0.01,
				// defenseCap:0.25, см. её объект выше) — взято с запасом ~10% ниже по
				// каждому рычагу, первый проход.
				startHeroDamageReduction: 0.035,
				// «Медленное метание» — по прямому заданию: стартовая скорость атаки
				// (=1000-startSHOT_INTERVAL, как в UI) равна 10, растёт по 2 ед. за
				// применение (shotIntervalReductionPerLevel ниже). minShotInterval —
				// личный пол чуть ниже старта (не заморожен наглухо, как у Еремея,
				// раз задание явно требует роста, но и не даёт разогнаться до
				// скорострела — держит архетип «тяжёлый и медленный» весь забег).
				startSHOT_INTERVAL: 990,
				minShotInterval: 900,
				heroHP: 135,
				lvlUnlock: 65,
				zlataUp: 10,
				investedZlata: 0,
				upSpecif: 1,
				unlock: false,
				feature: 'Земля непаханая — <br>каждый % здоровья цели даёт +1% к шансу критического удара',
				// Потолок базового крит-шанса (сам стат героя, без бонуса «Обвала» —
				// см. getKlimCritChanceBonus в game.js) — умеренный, сила героя не в
				// этом рычаге, а в бонусе от HP цели.
				critChanceCap: 0.30,
				woundChanceCap: 0,
				heroHpCap: 2300,
				// «Разброс урона 20%» — по прямому заданию.
				damageVariance: 0.20,
				damagePerLevel: 20,
				critChancePerLevel: 0.004,
				// critMultiplierPerLevel применяется дважды за цикл upSpecif===2 —
				// woundChanceCap==0==старту редиректит туда же весь прирост шанса
				// ранения (см. комментарий у startGlobalWoundChance выше), так что
				// реальный рост крит-урона примерно вдвое выше этого числа.
				critMultiplierPerLevel: 0.055,
				// Ревизия 11 (прямой запрос пользователя: hl=200 строго 35%). Низкий шум
				// (--attempts-per-strategy=30): итог 25%, хвост 165-200 почти нулевой
				// (7/4/4/3/1/0/0/0) — mean_ratio=0.812, запас есть. Диагностика (реальный
				// ProgressionEngine.buildHeroAtLevel): на hl=200 critMult=7.2 при потолке
				// 10.0 — headroom 2.8, не упирается наглухо, но и не огромный. Клим —
				// исторически САМЫЙ чувствительный герой к любому крит-рычагу (см. ревизии
				// 2-9 выше — почти гарантированный крит от «Обвала» умножает каждую единицу
				// крит-урона почти весь бой) — начинаю с осторожного шага, меньше, чем у
				// других героев.
				// Раунд (потолок 7→14, бонус 0.02→0.05): hl=200 1%→28% (цель 35%), итог 39%,
				// mean_ratio=0.92, beat%=36.7%. Бонус 0.065→27%, 0.10→31% (наклон ≈114pp/ед.
				// в этом диапазоне, все точки на --attempts-per-strategy=100). beat% при
				// 0.10 уже 34.0% — по прямому запросу пользователя («несколько характеристик
				// разом, не одна») не давлю крит-бонус дальше, добавляю независимый канал —
				// прямой урон (damageLateBonusPerLevel ниже), тот же архетип «Обвала»
				// (гарантированный крит от HP цели) не трогаю, просто закрываю остаток
				// разрыва вторым, более слабо коррелирующим с beat% рычагом.
				critMultiplierLateBonusStartLevel: 160,
				critMultiplierLateBonusPerLevel: 0.10,
				// damageLateBonusPerLevel=5 дал перелёт: hl=200 31%→42% (цель 35%, +11pp от
				// всего +5 урона/применение — амплификация через почти гарантированный крит
				// «Обвала» даже сильнее, чем ожидалось), при этом beat% почти не изменился
				// (34.0%→33.3%) — независимый от крит-давления рычаг, безопаснее для точной
				// подстройки. Точки (все на --attempts-per-strategy=100): 0→31%, 2→31%,
				// 3→32%, 4→39%, 5→42% — самый крутой скачок именно между 3 и 4 (+7pp за
				// единицу). Интерполяция между 3 и 4 к цели 35: 3+1×(35-32)/(39-32)≈3.43. С
				// новым точным замером (3000 попыток на hl=200) читается 37% (та же цель 35,
				// +2pp). Наклон в этой зоне ~7pp/ед. Точечная подстройка: 3.43-2/7≈3.14.
				// РЕЗУЛЬТАТ: те же 37% — плоско, в пределах шума. Беру крупный шаг: 2.5.
				// РЕЗУЛЬТАТ: 33% (цель 35, -2pp) — чёткий сигнал. Наклон (37-33)/0.93≈4.3pp/
				// ед. Финал: 2.5+2/4.3≈2.97.
				damageLateBonusStartLevel: 160,
				damageLateBonusPerLevel: 2.97,
				woundChancePerLevel: 0,
				shotIntervalReductionPerLevel: 2,
				heroHpPerLevel: 12,
				defensePerLevel: 0.009,
				defenseCap: 0.22,
				// Предохранитель по образцу Тихона (см. его объект выше и историю
				// критMultiplierCap там) — у Клима crit-шанс и так может доходить до
				// 100%+ против полного HP цели, а редирект шанса ранения удваивает
				// рост crit-урона; растущий потолок не даёт этой комбинации разгоняться
				// бесконечно, но и не запирает её слишком рано.
				// Ревизия 7: реальным чтением по уровням подтверждено (не на глаз) — на
				// 6.0/+0.04 потолок упирается уже на hl=180 (critMultiplier==cap==7.8) и
				// держит герой-уровень 180-200 искусственно ниже, куда сильнее давя на
				// хвост, чем на середину. Поднимаю оба числа — 6.0→9.0, 0.04→0.06 — чтобы
				// возросший critMultiplierPerLevel реально доходил до 200 уровня. Не финальное.
				// Ревизия 11 (продолжение, лог-факт): бонус 0.02 дал почти нулевой эффект
				// (hl=200 0%→1%) — снова упирается в потолок, тот же эффект, что у Еремея.
				// Поднимаю саму базу потолка (7.0→14.0), не только рост.
				critMultiplierCap: 14.0,
				// Ревизия N (лог-факт: построчный хвост hl>=180, после потолка у Луки) —
				// Клим -34.4pp от цели в хвосте. Поднимаю рост: 0.045→0.06.
				critMultiplierCapPerLevel: 0.06,
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
