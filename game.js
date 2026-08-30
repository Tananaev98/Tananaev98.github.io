// ==================== ГЛОБАЛЬНЫЕ КОНСТАНТЫ И ПЕРЕМЕННЫЕ ====================
//clearGameState(); //очищаем прогресс для отладки 
    // Загружаем прогресс игрока (только чтение)

let gameStateLstorage = gameState;


const activeHeroStr = gameStateLstorage.activeHero;
const activeHeroObject = gameStateLstorage[activeHeroStr];


// DOM элементы - будут инициализированы после загрузки страницы
let gameField = null;          // Основное игровое поле
let enemiesContainer = null;   // Контейнер для всех врагов
//
// ГЛОБАЛЬНЫЕ ПАРАМЕТРЫ АНИМАЦИИ - настройки движения и вращения врагов
const ANIMATION_PARAMS = {
    // Скорости анимации (теперь в единицах в секунду)
    SWAY_SPEED: 3,          // 3 радиана в секунду (примерно 0.5 оборота в секунду)
    TILT_SPEED: 3,          // 3 радиана в секунду
    
    // Амплитуды анимации
    SWAY_AMPLITUDE: 0.05,   // Амплитуда покачивания (% от ширины экрана)
    TILT_AMPLITUDE: 20,     // Амплитуда наклона (градусы)
    
    // Плавность анимации
    TRANSITION_SPEED: 1,
    
    // Параметры движения (базовая скорость в процентах высоты экрана в секунду)
    BASE_SPEED: 120,        // 120% высоты экрана в секунду = множитель для baseSpeed
	
	SWAY_PIXELS: 1,   //
};

// У каждого уровня фиксированная награда: его можно фармить без ограничений,
// но экспоненциальная цена прокачки постепенно делает старые уровни невыгодными.
//----------------------------------------------------------------------------
//
// Параметры типов врагов - характеристики для каждого типа врагов

 //clearGameState();//для отладки
// ==================== Боссы ====================
 let bossAlive = false;
 let bossAliveName = ''; 

 let bossTimer = null;
 let bossTimerStartedAt = 0;
 let bossTimerDelay = 0;
 let pausedBossWaveDelay = null;
 const bossAttackTimers = new Set();
 let isAutoPausedForVisibility = false;
let bossComboHistory = [];
let bossWaveCounter = 0;
let bossCombatPhase = 1;

// Кривая синхронизирована со свободной прокачкой одного выбранного героя:
// без дополнительного фарма он подходит к финалу примерно на 159-м уровне.
const BOSS_HEALTH_BALANCE = Object.freeze({
    baseByType: Object.freeze({
        enem1: 2600,
        enem2: 6500,
        enem3: 11500,
        enem4: 18500,
        enem5: 28000
    }),
    progressionScale: 2.25,
    progressionExponent: 2.1,
    regionFinalBossMultiplier: 1.12
});

// Централизованные балансные правки HP БОССОВ (enem1-enem5) по диапазону
// уровней кампании — независимо от общей прогрессии выше и от точечных
// healthMultiplier у конкретных боссов (bossCombatConfig.bosses[type].
// healthMultiplier — используется для многофазных сюжетных боссов, см.
// lvlData/gameData15/25/30/39/40.js). Чтобы добавить новый нерф/бафф на
// диапазон уровней — достаточно дописать сюда ещё одну запись { fromLevel,
// toLevel, hpMultiplier }, ничего больше менять не нужно. Диапазоны не должны
// пересекаться; при пересечении применяется первое совпадающее правило по
// порядку в массиве.
const BOSS_HEALTH_LEVEL_ADJUSTMENTS = Object.freeze([
 //   { fromLevel: 1, toLevel: 6, hpMultiplier: 1 },
   // { fromLevel: 7, toLevel: 25, hpMultiplier: 1 }
]);

function getBossHealthLevelMultiplier(level) {
    const parsedLevel = Number(level);
    if (!Number.isFinite(parsedLevel)) return 1;
    const currentLevel = Math.floor(parsedLevel);
    for (const rule of BOSS_HEALTH_LEVEL_ADJUSTMENTS) {
        if (currentLevel >= rule.fromLevel && currentLevel <= rule.toLevel) {
            return rule.hpMultiplier;
        }
    }
    return 1;
}

// overrides — опционально, только для инструментов вне реальной игры (см.
// admin-balance-panel.html): позволяет спросить HP босса произвольного уровня
// кампании без перезагрузки level.html под этот уровень, не трогая формулу и
// не читая её из скрытых глобалей. В реальной игре overrides всегда
// отсутствует, и функция читает те же lvlNumber/bossCombatConfig/
// levelCompletionConfig, что и раньше — поведение не меняется.
function calculateBossMaxHealth(type, fallbackBaseHealth, overrides) {
    const balancedBaseHealth = BOSS_HEALTH_BALANCE.baseByType[type];
    if (!Number.isFinite(balancedBaseHealth)) {
        return Math.max(1, Math.floor(fallbackBaseHealth));
    }

    const effectiveLvlNumber = overrides && Number.isFinite(overrides.lvlNumber)
        ? overrides.lvlNumber
        : lvlNumber;
    const effectiveBossCombatConfig = (overrides && overrides.bossCombatConfig) || bossCombatConfig;
    const effectiveIsRegionFinal = overrides && typeof overrides.isRegionFinal === 'boolean'
        ? overrides.isRegionFinal
        : (typeof levelCompletionConfig !== 'undefined' && levelCompletionConfig.isRegionFinal);

    const parsedLevel = Number(effectiveLvlNumber);
    const currentLevel = Number.isFinite(parsedLevel)
        ? Math.max(1, Math.floor(parsedLevel))
        : 1;
    const balancedLevel = Math.min(CAMPAIGN_FINAL_LEVEL, currentLevel);
    const campaignProgress = (balancedLevel - 1) / (CAMPAIGN_FINAL_LEVEL - 1);
    const levelMultiplier = 1 + (
        BOSS_HEALTH_BALANCE.progressionScale
        * (Math.exp(BOSS_HEALTH_BALANCE.progressionExponent * campaignProgress) - 1)
    );

    // Точечные сюжетные отклонения можно задавать через healthMultiplier
    // в профиле конкретного босса, не меняя общую кривую региона.
    const configuredHealthMultiplier = effectiveBossCombatConfig?.bosses?.[type]?.healthMultiplier;
    const bossHealthMultiplier = Number.isFinite(configuredHealthMultiplier) && configuredHealthMultiplier > 0
        ? configuredHealthMultiplier
        : 1;

    const isRegionFinalBoss = type === 'enem5' && effectiveIsRegionFinal;
    const regionFinalMultiplier = isRegionFinalBoss
        ? BOSS_HEALTH_BALANCE.regionFinalBossMultiplier
        : 1;

    const levelRangeMultiplier = getBossHealthLevelMultiplier(effectiveLvlNumber);

    // Сложность уровня (getDifficultyMultiplier, saveData.js) — только здесь, в ветке
    // РЕАЛЬНОГО босса. Ветка выше (fallbackBaseHealth, ранний return) — для атак/
    // не-боссов, которых сложность по правилам фичи не касается (см. её комментарий).
    return Math.max(1, Math.round(
        balancedBaseHealth * levelMultiplier * bossHealthMultiplier * regionFinalMultiplier
        * levelRangeMultiplier * getDifficultyMultiplier()
    ));
}

// Геометрия и ВСЕ настройки конкретного уровня приходят из gameDataN.js.
// Здесь остаётся только универсальное исполнение механик.
 

let bossDelayAb = 1000;


 
let bossDelayAbDop = 5000;

let spawnEnabled = true; // По умолчанию спавн включен

// Полоска HP босса
let bossHealthBar = null;
let bossHealthFill = null;
let bossHealthDelayedFill = null;
let bossHealthContainer = null;
let bossNameElement = null;
let currentBoss = null;
let bossDeathSequenceActive = false;
let countDefeatBoss = 0;
let bossDisplayedHpPercent = 100;
let bossDelayedHpPercent = 100;
let bossHpCatchUpTimer = null;
let bossHpHideTimer = null;
const BOSS_HP_CATCHUP_DELAY_MS = 480;

// Конфигурация игры - основные настройки
const GAME_CONFIG = {
    START_Y: 5,           // Начальная позиция Y (выше экрана)
    TARGET_Y: 78,           // Целевая позиция Y (верх статус-бара героя)
	HERO_BASE_HP: activeHeroObject.heroHP,
	HERO_HP_PER_LEVEL: 20
};

let rowTotal = ""; //Строка итогов прохождения уровня

// Массив активных врагов - хранит все текущие объекты врагов
let activeEnemies = [];

// Здоровье героя и завершение игры: 
let heroHealthBar = null;
let heroHealthText = null;
let heroLevelText = null;


let heroHP = {
    current: activeHeroObject.heroHP,
    max: activeHeroObject.heroHP,
    level: 1
};

const startGlobalHeroHp = activeHeroObject.heroHP;

heroHP.current = activeHeroObject.heroHP;
heroHP.max = activeHeroObject.heroHP;

let isGameOver = false;
let heroStatusBar = null;


// Прицел и урон
let aimElement = null;
let damageContainer = null;
let countDamageBoss = 0; //счетчик ударов по боссу

const startGlobalDamage = activeHeroObject.startGlobalDamage; 
const startGlobalCritChance = activeHeroObject.startGlobalCritChance;    
const startGlobalCritMultiplier = activeHeroObject.startGlobalCritMultiplier; 

const startGlobalWoundChance = activeHeroObject.startGlobalWoundChance;
// Раньше тут был доп. клэмп через движковую константу MAX_HERO_DAMAGE_REDUCTION —
// по решению пользователя убран: единственный источник числа — сам объект героя.
const startHeroDamageReduction = activeHeroObject.startHeroDamageReduction;
const startSHOT_INTERVAL = activeHeroObject.startSHOT_INTERVAL;
// 0.20 → 0.18 → 0.54 (по решению пользователя, вместе с переходом на одно окно вместо
// трёх после босса — см. BOSS_KILL_UPGRADE_CHOICES) и без personal temporaryUpgradePower
// (убран из saveData.js) — единая база для всех героев: обычное = 54% от базового стата.
// Действует на damage/critMultiplier — у остальных статов своя, отдельная и меньшая база
// (см. TEMPORARY_UPGRADE_MINOR_SHARE/TEMPORARY_UPGRADE_FIRE_RATE_SHARE ниже).
const TEMPORARY_UPGRADE_BASE_SHARE = 0.54;
// Отдельная (меньшая) база для heroHP/heroDefense/critChance/woundChance — по решению
// пользователя: обычное = 10% от базового стата, а не 54%, как у урона/крит-урона.
const TEMPORARY_UPGRADE_MINOR_SHARE = 0.10;
// Отдельная база для fireRate (скорость атаки) — по решению пользователя: обычное = 25%
// от базового стата, а не 54%, как у урона/крита/ранения.
const TEMPORARY_UPGRADE_FIRE_RATE_SHARE = 0.25;
// Максимум один знак после точки у дробных статов связок (0.1/0.5/0.9/1.3/1.8 — по
// решению пользователя) — сейчас у защиты, крит-шанса и шанса ранения; у остальных
// статов дробных значений нет, там обычные целые числа (precision=0 по умолчанию, см.
// computeUpgradeStatDelta).
const TEMPORARY_UPGRADE_FRACTIONAL_PRECISION = 1;

// Глобальные параметры оглушения

let globalDamage = startGlobalDamage; // Базовый урон

let globalCritChance = startGlobalCritChance;    // 15% шанс критического удара
let globalCritMultiplier = startGlobalCritMultiplier; // 150% крит урон
const WOUND_DURATION = 5000; // 5 секунд в миллисекундах
let globalWoundChance = startGlobalWoundChance; // 30% шанс ранить при попадании
let aimPosition = { x: 0, y: 0 };
let isMobileDevice = false;
const MOBILE_AIM_OFFSET_Y = 48; // прицел чуть выше пальца, чтобы не закрывать цель
let lastTouchAimTime = 0;

let heroDamageReduction = startHeroDamageReduction;
const heroDamageReductionCap = getHeroDefenseCap(activeHeroObject);
// Потолки крит-шанса/шанса ранения/HP героя (см. одноимённые поля на герое в
// saveData.js) — как и heroDamageReductionCap, читаются один раз при заходе на
// уровень: после потолка временные улучшения этого стата больше не предлагаются
// (getAvailableUpgrades), а в постоянной прокачке рост уходит в парный стат шага
// (applyHeroPermanentStatUpgrade).
const globalCritChanceCap = getHeroCritChanceCap(activeHeroObject);
const globalWoundChanceCap = getHeroWoundChanceCap(activeHeroObject);
const heroHpCap = getHeroHpCap(activeHeroObject);
// Необязательный — undefined у героя без явного поля значит "без потолка", как и было
// у всех до этого (см. getHeroCritMultiplierCap в saveData.js).
const globalCritMultiplierCap = getHeroCritMultiplierCap(activeHeroObject);

// Таймер для стрельбы
let lastShotTime = 0;
let SHOT_INTERVAL = startSHOT_INTERVAL; // Стреляем каждые 100мс (10 раз в секунду)

// Единый боевой тайминг всех героев:
// атака начинается сразу, а урон применяется в визуальной точке контакта.
const HERO_ATTACK_TIMING = Object.freeze({
    impactAt: 0.72,          // 72% текущего интервала атаки
    visualCycle: 0.96,       // активная фаза почти равна интервалу
    minImpactDelayMs: 90,
    minVisualCycleMs: 140,
    maxVisualCycleMs: 1300,
    deflectCycleRatio: 0.28,
    minDeflectCycleMs: 120,
    maxDeflectCycleMs: 220,
    deflectImpactAt: 0.68,
    animatedHeroes: Object.freeze(['eremei', 'dunya', 'luka', 'daryana', 'mila', 'tikhon'])
});
const pendingHeroAttackTimers = new Set();

function getHeroAttackTiming(shotIntervalMs) {
    const intervalMs = Math.max(120, Number(shotIntervalMs) || SHOT_INTERVAL || 800);
    const hasSynchronizedVfx = HERO_ATTACK_TIMING.animatedHeroes.includes(activeHeroObject?.name);
    const cycleMs = Math.max(
        HERO_ATTACK_TIMING.minVisualCycleMs,
        Math.min(HERO_ATTACK_TIMING.maxVisualCycleMs, intervalMs * HERO_ATTACK_TIMING.visualCycle)
    );
    if (!hasSynchronizedVfx) {
        return {
            intervalMs,
            cycleMs: Math.round(cycleMs),
            impactDelayMs: 0
        };
    }
    const impactDelayMs = Math.max(
        HERO_ATTACK_TIMING.minImpactDelayMs,
        Math.min(cycleMs * 0.9, intervalMs * HERO_ATTACK_TIMING.impactAt)
    );
    return {
        intervalMs,
        cycleMs: Math.round(cycleMs),
        impactDelayMs: Math.round(impactDelayMs)
    };
}

function getHeroDeflectTiming() {
    const cycleMs = Math.max(
        HERO_ATTACK_TIMING.minDeflectCycleMs,
        Math.min(
            HERO_ATTACK_TIMING.maxDeflectCycleMs,
            SHOT_INTERVAL * HERO_ATTACK_TIMING.deflectCycleRatio
        )
    );
    return {
        intervalMs: 0,
        cycleMs: Math.round(cycleMs),
        impactDelayMs: Math.round(cycleMs * HERO_ATTACK_TIMING.deflectImpactAt)
    };
}

function scheduleHeroImpact(callback, delayMs) {
    const timer = window.setTimeout(() => {
        pendingHeroAttackTimers.delete(timer);
        callback();
    }, Math.max(0, delayMs));
    pendingHeroAttackTimers.add(timer);
}

function clearPendingHeroAttacks() {
    pendingHeroAttackTimers.forEach((timer) => window.clearTimeout(timer));
    pendingHeroAttackTimers.clear();
}


// Система опыта и уровней
let playerLevel = 1;
let playerExp = 0;
let expToNextLevel = 100;
let isGamePaused = false;





// ==================== КЛАСС ВРАГА ====================

/**
 * Класс представляющий отдельного врага
 * Инкапсулирует логику конкретного врага
 */
// ВАЖНО для понимания боевой системы: класс называется Enemy, но обычных врагов
// (мобов) в игре не бывает — вообще ни одного. Уровень — это всегда один босс (или
// один босс с несколькими фазами). Экземпляр Enemy — это либо сам босс/текущая фаза
// босса целиком (isBoss===true, type ∈ bossM — в lvlData/gameDataXX.js это обычно
// однозначные ключи типа enem1/enem2/.../enem5, каждый — своя фаза с именем и HP),
// либо одна из его отдельных атак (isBoss===false — в lvlData это обычно ключи
// вида enem11/enem22/.../enem55, с общим "снарядным" HP вроде 100), которая
// прилетает как отдельный спрайт-«снаряд». Сейчас атаки босса (isBoss===false)
// всегда умирают ровно с одного удара героя — их HP в данных уровня по факту не
// влияет на баланс ДПС (по-настоящему считается только HP самого босса/фазы, см.
// calculateBossMaxHealth ниже). Не путать это с "живучестью мобов" — такой механики
// в игре нет и никогда не было. Если в будущем введут атаки босса, которые НЕ
// умирают с одного удара (условная "броня" у снаряда), это предположение перестанет
// быть верным везде, где сейчас на нём молча полагаются (например, анализ баланса
// ДПС по чёрному ящику admin-balance-panel.html).
class Enemy {
    constructor(type, xPos) {
        // Сохраняем тип врага
        this.type = type;
        this.isBoss = typeof bossM !== 'undefined' && bossM.includes(type);
		
		this.dispName = ENEMY_TYPES[type].dispName;
        
        // HP пяти боссов рассчитывается централизованно; для атак и будущих
        // нестандартных противников сохраняется значение из данных уровня.
        const maxHealth = calculateBossMaxHealth(type, ENEMY_TYPES[type].baseHP);
        this.hp = maxHealth;
		this.maxHP = maxHealth;
        this.damage = Math.floor(ENEMY_TYPES[type].baseDamage);
        
        
        // Скорость в процентах высоты экрана в секунду
        this.speedPercentPerSecond = ENEMY_TYPES[type].baseSpeed * ANIMATION_PARAMS.BASE_SPEED;
        
        // Параметры для анимаций (в единицах в секунду)
        this.swaySpeed = ANIMATION_PARAMS.SWAY_SPEED; // радиан в секунду
        this.tiltSpeed = ANIMATION_PARAMS.TILT_SPEED; // радиан в секунду
        
        // Начальные фазы
        this.swayTime = Math.random() * Math.PI * 2;
        this.tiltTime = Math.random() * Math.PI * 2;
        
        // Параметры движения (босс всегда по центру экрана)
        this.x = this.isBoss ? 50 : xPos;
        this.y = GAME_CONFIG.START_Y;       // Вертикальная позиция в %
        
        // Сохраняем размеры игрового поля на момент создания
        this.fieldWidth = gameField.clientWidth;
        this.fieldHeight = gameField.clientHeight;
        
        // Пиксельные координаты (для расчета движения)
        this.pixelX = (this.x / 100) * this.fieldWidth;
        this.pixelY = (this.y / 100) * this.fieldHeight;
        
        // Расчет скорости в пикселях в секунду
        this.speedPixelsPerSecond = (this.speedPercentPerSecond / 100) * this.fieldHeight;
        
        
        // Параметры ранения
        this.isWounded = false;
        this.woundEndTime = 0;
        this.woundDamagePerSecond = 0;
        this.lastWoundTick = 0;
		this.lastShotTime = 0;
        this.isCustom = false; // атаки босса помечаются true в spawnEnemyWithParams
        this.movementStyle = 'straight';
        this.movementOriginX = this.x;
        this.baseSpeedPixelsPerSecond = this.speedPixelsPerSecond;
        this.hasPausedMidFlight = false;
        this.pauseUntil = 0;
        this.hasTriggeredRush = false;
        this.hitStopUntil = 0; // короткая заморозка движения в момент мощного попадания (hit-stop)
        // Параметры движения 'wave' — задаются per-атаку из bossAbilities (см. ниже, спавн),
        // а не хардкодятся в движке. Значения по умолчанию используются, только если
        // атака не передала свои (например, спавн без указания amplitude/frequency/phase).
        this.waveAmplitude = 6;
        this.waveFrequency = 1.2;
        this.wavePhase = 0;
        this.currentTiltAngle = 0; // текущий угол покачивания (градусы) — нужен для попадания строго по силуэту
        // Создаем DOM элемент для отображения врага
        this.element = this.createEnemyElement();
        
        // Добавляем созданный элемент в контейнер врагов
        enemiesContainer.appendChild(this.element);

        // Не даём атаке вылезти за края (после вставки в DOM и после загрузки картинки)
        this.x = this.clampHorizontal(this.x);
        this.pixelX = (this.x / 100) * this.fieldWidth;
        this.element.addEventListener('load', () => {
            if (!this.element) return;
            this.x = this.clampHorizontal(this.x);
            this.resolveAwayFromBoss();
            this.pixelX = (this.x / 100) * this.fieldWidth;
            this.pixelY = (this.y / 100) * this.fieldHeight;
            this.applyPositionTransform(0);
            // Прогрев маски силуэта — для стрел Луки и для попадания строго по силуэту
            ensureEnemyOpaqueSamples(this.element);
            getEnemyHitGrid(this.element);
        });
    }
  
  
    /**
     * Создает DOM элемент для врага
     * @return {HTMLImageElement} img элемент врага
     */
    createEnemyElement() {
        // Создаем элемент изображения
        const img = document.createElement('img');
        // Устанавливаем путь к изображению из настроек типа врага
        img.src = ENEMY_TYPES[this.type].image;
        // Добавляем CSS класс
        img.className = 'enemy';
        // Сохраняем тип врага в data-атрибут (можно использовать для стилизации)
        img.dataset.type = this.type;
        
        // Устанавливаем размер: на ПК — из данных уровня; на мобилке — только класс, размер в CSS
        if (!isMobileDevice) {
            img.style.width = ENEMY_TYPES[this.type].size;
        }
        if (this.isBoss) {
            img.classList.add('enemy-boss');
        } else {
            img.classList.add('enemy-attack');
        }
        
        // Настраиваем общие стили элемента
        img.style.position = 'absolute';  // Абсолютное позиционирование
        img.style.height = 'auto';        // Автоматическая высота
        img.style.zIndex = '5';           // Уровень наложения (над фоном)
        // Плавная анимация вращения
        img.style.transition = `transform ${ANIMATION_PARAMS.TRANSITION_SPEED}s linear`;
        
        // Возвращаем созданный элемент
        return img;
    }
    
    /**
     * Обновляет позицию врага на каждом кадре
     * @return {boolean} true если враг достиг цели (красной линии)
     */
   update(deltaTime) {
        if (this.isInert || this.isBossDying) {
            return false;
        }

        // Hit-stop: короткая заморозка движения/поворота в момент мощного попадания
        if (this.hitStopUntil > performance.now()) {
            return false;
        }

        const deltaSeconds = deltaTime / 1000; // Переводим в секунды
        
        
        // Обновляем состояние ранения
        const diedFromWound = this.updateWound();
        if (diedFromWound) {
            return 'dead_from_wound';
        }
        
        const travelRange = Math.max(1, GAME_CONFIG.TARGET_Y - GAME_CONFIG.START_Y);
        const travelProgress = Math.max(0, Math.min(1, (this.y - GAME_CONFIG.START_Y) / travelRange));
        let movementMultiplier = 1;

        if (this.isCustom) {
            if (this.movementStyle === 'accelerate') {
                movementMultiplier = 0.72 + travelProgress * 0.90;
            } else if (this.movementStyle === 'lateRush') {
                movementMultiplier = travelProgress < 0.55 ? 0.72 : 1.48;
                if (travelProgress >= 0.55 && !this.hasTriggeredRush) {
                    this.hasTriggeredRush = true;
                    this.element.classList.add('boss-attack-rush');
                }
            } else if (this.movementStyle === 'pause') {
                if (!this.hasPausedMidFlight && travelProgress >= 0.42) {
                    this.hasPausedMidFlight = true;
                    this.pauseUntil = performance.now() + 420;
                    this.element.classList.add('boss-attack-paused');
                }
                if (performance.now() < this.pauseUntil) {
                    movementMultiplier = 0;
                } else {
                    this.element.classList.remove('boss-attack-paused');
                    movementMultiplier = this.hasPausedMidFlight ? 1.22 : 1;
                }
            }
        }

        // У разных боссов скорость меняется по ходу полёта, но траектория остаётся читаемой.
        this.speedPixelsPerSecond = this.baseSpeedPixelsPerSecond * movementMultiplier;
        this.pixelY += this.speedPixelsPerSecond * deltaSeconds;
        
        // Обновляем позицию в процентах
        this.y = (this.pixelY / this.fieldHeight) * 100;
        
        // Босс всегда по центру; остальные — змейкой, но без выхода за края экрана
        if (this.isBoss) {
            this.x = 50;
        } else {
            this.swayTime += this.swaySpeed * deltaSeconds;
            if (this.isCustom && this.movementStyle === 'weave') {
                this.x = this.clampHorizontal(this.movementOriginX + Math.sin(this.swayTime * 1.35) * 5.5);
            } else if (this.isCustom && this.movementStyle === 'wave') {
                // В отличие от 'weave' (фиксированная амплитуда/частота), у 'wave' траектория
                // задаётся per-атаку из данных уровня — см. spawnEnemyWithParams/executeBossEvent.
                this.x = this.clampHorizontal(
                    this.movementOriginX
                    + Math.sin(this.swayTime * this.waveFrequency + this.wavePhase) * this.waveAmplitude
                );
            } else if (this.isCustom && this.movementStyle === 'drift') {
                const driftDirection = this.movementOriginX < 50 ? 1 : -1;
                this.x = this.clampHorizontal(this.movementOriginX + driftDirection * travelProgress * 10);
            } else {
                const swayPixels = Math.sin(this.swayTime) * ANIMATION_PARAMS.SWAY_PIXELS;
                const swayPercent = (swayPixels / this.fieldWidth) * 100;
                this.x = this.clampHorizontal(this.x + swayPercent);
            }
            // Атаки босса обтекают силуэт босса (не пересекаются с ним)
            this.resolveAwayFromBoss();
        }
        
        // Обновляем пиксельную позицию X
        this.pixelX = (this.x / 100) * this.fieldWidth;
        this.pixelY = (this.y / 100) * this.fieldHeight;
        
        // Наклон врага (вращение)
        this.tiltTime += this.tiltSpeed * deltaSeconds;
        const tiltAngle = Math.sin(this.tiltTime) * ANIMATION_PARAMS.TILT_AMPLITUDE;
        
        // Применяем позицию и вращение (у босса left=50% + translateX(-50%) = визуальный центр)
        this.applyPositionTransform(tiltAngle);
        
        // Проверяем, достиг ли враг красной линии
        return this.y >= GAME_CONFIG.TARGET_Y;
    }

    /** Ширина спрайта в % от поля (для clamp по краям) */
    getWidthPercent() {
        const fieldW = this.fieldWidth || gameField?.clientWidth || 1;
        const measured = this.element?.offsetWidth || 0;
        if (measured > 0) {
            return (measured / fieldW) * 100;
        }
        const size = ENEMY_TYPES[this.type]?.size;
        if (typeof size === 'string' && size.endsWith('%')) {
            const parsed = parseFloat(size);
            if (!Number.isNaN(parsed)) return parsed;
        }
        // Пока картинка не загрузилась / мобильный CSS без inline size
        return isMobileDevice ? 20 : 10;
    }

    /** Высота спрайта в % от поля */
    getHeightPercent() {
        const fieldH = this.fieldHeight || gameField?.clientHeight || 1;
        const measured = this.element?.offsetHeight || 0;
        if (measured > 0) {
            return (measured / fieldH) * 100;
        }
        // Пока нет layout — грубо как у квадрата/портрета
        return this.getWidthPercent() * (isMobileDevice ? 1.15 : 1.2);
    }

    /** AABB в % поля (учитывает центрирование босса) */
    getLogicalBounds(pad = 0) {
        const w = this.getWidthPercent();
        const h = this.getHeightPercent();
        let left;
        let right;
        if (this.isBoss) {
            left = this.x - w / 2;
            right = this.x + w / 2;
        } else {
            left = this.x;
            right = this.x + w;
        }
        return {
            left: left - pad,
            right: right + pad,
            top: this.y - pad,
            bottom: this.y + h + pad,
            width: w,
            height: h,
            cx: (left + right) / 2,
            cy: this.y + h / 2
        };
    }

    static boundsOverlap(a, b) {
        return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
    }

    /**
     * Атака босса не должна пересекаться с силуэтом босса:
     * сдвигаем влево/вправо (обтекание), если некуда — чуть ниже босса.
     */
    resolveAwayFromBoss() {
        if (this.isBoss || !this.isCustom || !bossAlive || !currentBoss || currentBoss === this) {
            return;
        }

        const gap = 1.5; // зазор между атакой и боссом, %
        const attack = this.getLogicalBounds(0);
        const boss = currentBoss.getLogicalBounds(gap);

        if (!Enemy.boundsOverlap(attack, boss)) {
            return;
        }

        const widthPct = attack.width;
        const preferLeft = attack.cx <= boss.cx;

        // Помимо обязательного минимума (чтобы не залезать на босса), добавляем сдвиг,
        // зависящий от исходного xPos атаки: чем дальше атака была от центра босса до
        // коррекции, тем дальше она уйдёт за его край. Без этого все атаки одной стороны
        // прилипали ровно к одной и той же точке (boss.left - widthPct / boss.right),
        // независимо от того, насколько разными были их авторские xPos в gameData —
        // визуально это выглядело как "снаряды всегда летят в одну и ту же точку".
        const distanceFromBossCenter = Math.abs(attack.cx - boss.cx);
        const extraSpread = Math.min(widthPct * 2, distanceFromBossCenter * 0.6);

        const tryPlaceX = (leftEdge) => {
            const x = this.clampHorizontal(leftEdge);
            const left = x;
            const right = x + widthPct;
            const overlapsH = !(right <= boss.left || left >= boss.right);
            return { x, ok: !overlapsH };
        };

        const primary = preferLeft
            ? tryPlaceX(boss.left - widthPct - extraSpread)
            : tryPlaceX(boss.right + extraSpread);
        const secondary = preferLeft
            ? tryPlaceX(boss.right + extraSpread)
            : tryPlaceX(boss.left - widthPct - extraSpread);

        if (primary.ok) {
            this.x = primary.x;
        } else if (secondary.ok) {
            this.x = secondary.x;
        } else {
            // Узкий экран / широкий босс — уводим атаку под силуэт
            this.x = preferLeft ? primary.x : secondary.x;
            this.y = boss.bottom;
        }

        // Финальная проверка: если всё ещё пересечение по вертикали+горизонтали — ниже босса
        const after = {
            left: this.x,
            right: this.x + widthPct,
            top: this.y,
            bottom: this.y + attack.height
        };
        if (Enemy.boundsOverlap(after, boss)) {
            this.y = boss.bottom;
        }

        this.x = this.clampHorizontal(this.x);
        this.pixelX = (this.x / 100) * this.fieldWidth;
        this.pixelY = (this.y / 100) * this.fieldHeight;
    }

    /** left — левый край спрайта; держим весь спрайт внутри 0..100% */
    clampHorizontal(x) {
        if (this.isBoss) return 50;
        const widthPct = this.getWidthPercent();
        const margin = 0.5;
        const minX = margin;
        const maxX = Math.max(minX, 100 - widthPct - margin);
        return Math.max(minX, Math.min(maxX, x));
    }

    /** Позиция на поле; босс всегда горизонтально по центру */
    applyPositionTransform(tiltAngle = 0) {
        this.currentTiltAngle = tiltAngle; // источник истины для попадания строго по силуэту
        if (!this.isBoss) {
            this.x = this.clampHorizontal(this.x);
        }
        this.element.style.left = this.x + '%';
        this.element.style.top = this.y + '%';
        if (this.isBoss) {
            this.element.style.transform = `translateX(-50%) rotate(${tiltAngle}deg)`;
        } else {
            this.element.style.transform = `rotate(${tiltAngle}deg)`;
        }
    }

    /** Transform для анимации смерти (сохраняет центрирование босса) */
    applyDeathTransform() {
        this.element.style.transform = this.isBoss
            ? 'translateX(-50%) scale(0) rotate(180deg)'
            : 'scale(0) rotate(180deg)';
    }
    
    /**
     * Удаляет врага из игры (из DOM и из памяти)
     */
    remove() {
        // Проверяем, существует ли элемент и его родитель
        if (this.element && this.element.parentNode) {
            // Удаляем элемент из DOM
            this.element.parentNode.removeChild(this.element);
        }
    }
	//урон герою:
	getDamageToHero() {
        return this.damage;
    }
	
 
    

  



// ==================== ДОБАВЛЯЕМ МЕТОД ДЛЯ ОБНОВЛЕНИЯ РАНЕНИЯ ====================
    
    /**
     * Обновляет состояние ранения врага
     * @return {boolean} true если враг умер от ранения
     */
updateWound() {
    if (this.isWounded) {
        const now = Date.now();
        
        // Проверяем, не истекло ли время ранения
        if (now >= this.woundEndTime) {
            // Снимаем ранение
            this.removeWound();
            return false;
        } else {
            // Наносим урон от ранения раз в секунду
            if (now - this.lastWoundTick >= 300) {
                // Наносим урон от ранения (целое число)
                const woundDamage = this.woundDamagePerSecond;
                this.hp -= woundDamage;
                this.lastWoundTick = now;
                
                // Визуальная обратная связь для урона от ранения
                this.showWoundDamage(woundDamage);
                
                // Проверяем, не умер ли враг от ранения
                if (this.hp <= 0) {
                    return true; // Враг умер от ранения
					
                }
            }
        }
    }
    return false; // Враг жив
}
    
    /**
     * Наносит ранение врагу
     * @param {number} damage - урон, на основе которого рассчитывается ранение
     */
    applyWound(damage) {
        this.isWounded = true;
        this.woundDamagePerSecond = Math.round(damage / 10);
        this.woundEndTime = Date.now() + WOUND_DURATION;
        this.lastWoundTick = Date.now();
        
        // Визуальный эффект ранения
        if (this.element) {
            this.element.classList.add('enemy-wounded');
        }
        
        console.log(`${this.type} ранен! Урон в секунду: ${this.woundDamagePerSecond.toFixed(1)}`);
    }
    
    /**
     * Снимает ранение с врага
     */
    removeWound() {
        this.isWounded = false;
        this.woundDamagePerSecond = 0;
        this.woundEndTime = 0;
        this.lastWoundTick = 0;
        
        // Убираем визуальный эффект ранения
        if (this.element) {
            this.element.classList.remove('enemy-wounded');
        }
    }
    
    /**
     * Показывает урон от ранения
     * @param {number} damage - урон от ранения
     */
	showWoundDamage(damage) {
		const enemyRect = this.element.getBoundingClientRect();
		const fieldRect = gameField.getBoundingClientRect();
		
		// Рассчитываем позицию в процентах относительно игрового поля
		const xPercent = ((enemyRect.left + enemyRect.width / 2 - fieldRect.left) / fieldRect.width) * 100;
		const yPercent = ((enemyRect.top + enemyRect.height / 2 - fieldRect.top) / fieldRect.height) * 100;
		
		// Создаем текст урона от ранения (отличается цветом)
		const woundText = document.createElement('div');
		woundText.className = 'damage-text wound-damage-text';
		woundText.textContent = `-${damage}`; // damage уже целое число
		
		// Устанавливаем позицию
		woundText.style.left = xPercent + '%';
		woundText.style.top = yPercent + '%';
		
		// Добавляем в контейнер
		damageContainer.appendChild(woundText);
		
		// Удаляем элемент после завершения анимации
		setTimeout(() => {
			if (woundText.parentNode) {
				woundText.parentNode.removeChild(woundText);
			}
		}, 1000);
	}
}
	


// ==================== ФУНКЦИИ ИГРЫ ====================

/**
 * Инициализация игры - запускается один раз при загрузке страницы
 */
 
function getEnemyAtPoint(x, y) {
    const fieldRect = gameField.getBoundingClientRect();
    const aimClientX = x + fieldRect.left;
    const aimClientY = y + fieldRect.top;

    for (let i = activeEnemies.length - 1; i >= 0; i--) {
        const enemy = activeEnemies[i];
        const enemyElement = enemy.element;
        if (!enemyElement) continue;

        const enemyRect = enemyElement.getBoundingClientRect();
        if (enemyRect.width <= 0 || enemyRect.height <= 0) continue;

        // Быстрый грубый отсев: прицел вообще не над (повёрнутым) прямоугольником спрайта.
        if (
            aimClientX < enemyRect.left || aimClientX > enemyRect.right ||
            aimClientY < enemyRect.top || aimClientY > enemyRect.bottom
        ) {
            continue;
        }

        // Строгая проверка попадания по силуэту (альфа-маска). true/false — силуэт
        // посчитан и даёт однозначный ответ. null — маска для этой картинки ещё не
        // готова (первые кадры после спавна) — тогда не оставляем врага совсем
        // неуязвимым и подстраховываемся старой эллиптической проверкой.
        const silhouetteHit = isPointOverEnemySilhouette(enemy, aimClientX, aimClientY);
        if (silhouetteHit === true) return enemy;
        if (silhouetteHit === false) continue;

        const enemyCenterX = enemyRect.left + enemyRect.width / 2;
        const enemyCenterY = enemyRect.top + enemyRect.height / 2;
        const distanceX = Math.abs(aimClientX - enemyCenterX);
        const distanceY = Math.abs(aimClientY - enemyCenterY);
        const hitRadiusX = enemyRect.width / 2.5;
        const hitRadiusY = enemyRect.height / 2.5;

        if (distanceX < hitRadiusX && distanceY < hitRadiusY) {
            return enemy;
        }
    }
    return null;
}
 
function areThereAnyLiveEnemies() {
    return activeEnemies.length > 0;
}
 
function initGame() {
    console.log('Инициализация игры...');
    applyMobileDeviceFlag();
    
    // Находим игровое поле в DOM по CSS классу
    gameField = document.querySelector('.main_menu_image');
    if (!gameField) {
        console.error('Игровое поле не найдено!');
        return;
    }
    
    // Создаем контейнер для врагов
    enemiesContainer = document.createElement('div');
    enemiesContainer.id = 'enemies-container';
    enemiesContainer.style.position = 'absolute';
    enemiesContainer.style.width = '100%';
    enemiesContainer.style.height = '100%';
    enemiesContainer.style.top = '0';
    enemiesContainer.style.left = '0';
    gameField.appendChild(enemiesContainer);
    
    initHeroHealth();
	initTikhonShakeGauge();
	initEliseyBeeGauge();

	   // Инициализация полоски здоровья босса
    initBossHealthBar();
	
    heroStatusBar = document.getElementById('heroStatusBar');

    document.getElementById('statusbarRestartBtn')?.addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('statusbarBaseBtn')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Инициализация прицела
    initAim();
    
    // Сбрасываем состояние игры к начальному
    resetGame();
    
    // requestAnimationFrame использует свою шкалу времени. Первый кадр сам
    // инициализирует отметку, чтобы не смешивать её с Date.now().
    lastFrameTime = null;
    
    // Запускаем игровой цикл
    requestAnimationFrame(gameLoop);

    // Пауза сразу, а не только внутри showStartModal() — иначе враги/таймеры боссов
    // могли бы начать работать, пока на экране ещё только загрузка ассетов.
    pauseGame();
    showLevelLoadingScreen();
    preloadLevelAssets().then(() => {
        hideLevelLoadingScreen();
        showStartModal();
    });

    console.log('Игра запущена!');

	 gameField.addEventListener('click', function(e) {
        if (isGameOver || isGamePaused) return;
        // На мобилке / после тапа подсказка не нужна — тап двигает прицел
        if (isMobileDevice || Date.now() - lastTouchAimTime < 700) return;

        const rect = gameField.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const enemy = getEnemyAtPoint(clickX, clickY);
        if (enemy) {
            showCenterText('Не нужно тыкать, просто наводи!', 1500, 'info');
        }
    });

    window.addEventListener('resize', handleGameFieldResize);
    window.addEventListener('orientationchange', handleGameFieldResize);
}

/**
 * Сбрасывает состояние игры к начальным значениям
 */
function resetGame() {
    isGameOver = false;
    activeGameTimeMs = 0;
    timeSec2 = 0;
    lastTimeSec2 = 0;
    lastFrameTime = null;
    heroHP.current = GAME_CONFIG.HERO_BASE_HP;
    heroHP.max = GAME_CONFIG.HERO_BASE_HP;
    heroHP.level = 1;
    updateHeroHealthDisplay();
    document.body.style.backgroundColor = ''; // возвращаем цвет CSS-переменной --area-bg текущей области
	stopBossEvents();
	bossDeathSequenceActive = false;
	
	// Скрываем полоску здоровья босса
    hideBossHealthBar();
    currentBoss = null;
    
    // Сбрасываем прокачку игрока
    playerLevel = 1;
    playerExp = 0;
    expToNextLevel = 100;
    isGamePaused = false;
    updateExperienceDisplay();
    
    
    // Включаем спавн по умолчанию
    spawnEnabled = true;
    
    // Сбрасываем позицию прицела
    aimPosition = { x: gameField.clientWidth / 2, y: gameField.clientHeight / 2 };
    if (aimElement) {
        aimElement.style.left = aimPosition.x + 'px';
        aimElement.style.top = aimPosition.y + 'px';
    }
    
    // Очищаем тексты урона
    if (damageContainer) {
        damageContainer.innerHTML = '';
    }
    
    clearPendingHeroAttacks();
    activeEnemies.forEach(enemy => enemy.remove());
    activeEnemies = [];
    
    // Сбрасываем статы игрока
    globalDamage = startGlobalDamage;
    globalCritChance = startGlobalCritChance;
    globalCritMultiplier = startGlobalCritMultiplier;
    globalWoundChance = startGlobalWoundChance;
    countDamageBoss = 0;
    heroDamageReduction = startHeroDamageReduction;
    SHOT_INTERVAL = startSHOT_INTERVAL;
    resetHeroFeatureCombatState();
    
}
/**
 * Выбирает случайный тип врага на основе весов
 * @return {string} ключ типа врага ('TANK', 'NORMAL' или 'FAST')
 */
function getRandomEnemyType() {
    // Получаем массив ключей типов врагов
    const types = Object.keys(ENEMY_TYPES);
    // Создаем массив весов для каждого типа
    const weights = types.map(type => ENEMY_TYPES[type].spawnWeight);
    // Вычисляем суммарный вес всех типов
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    
    // Генерируем случайное число от 0 до totalWeight
    let random = Math.random() * totalWeight;
    
    // Проходим по всем типам и выбираем тот, в диапазон веса которого попало случайное число
    for (let i = 0; i < types.length; i++) {
        // Если случайное число меньше веса текущего типа
        if (random < weights[i]) {
            return types[i]; // Возвращаем этот тип
        }
        // Иначе вычитаем вес текущего типа и переходим к следующему
        random -= weights[i];
    }
    
    // Запасной вариант (должен быть достижим только при ошибке)
    return 'NORMAL';
}

/**
 * Генерирует случайную позицию X для появления врага
 * @return {number} позиция X в процентах (от 0 до 100)
 */
function getRandomXPosition() {
    const margin = 10; // Отступ от краев экрана
    // Генерируем случайную позицию между margin и (100 - margin)
    return margin + Math.random() * (100 - margin * 2);
}

/**
 * Создает нового врага и добавляет его в игру
 */


function spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed, isCustom=false, movementStyle='straight', waveOptions=null) {

    if(!bossAlive && !bossM.includes(type)){return};
    
    try {
        // Проверяем, существует ли тип врага
        if (!ENEMY_TYPES[type]) {
            console.warn(`Тип врага ${type} не найден!`);
            return null;
        }
        
         
        
        // Боссы всегда по центру; атаки — по xPos, но clamp по ширине спрайта сделает Enemy
        const spawnX = bossM.includes(type) ? 50 : xPos;

        // Создаем врага
        const enemy = new Enemy(type, spawnX);
        
        enemy.isCustom = isCustom;
        enemy.movementStyle = movementStyle;
        enemy.movementOriginX = spawnX;

        // Траектория 'wave' — параметры приходят из данных уровня (per-атака), а не хардкод.
        // Если атака не указала своё значение, остаётся дефолт из конструктора Enemy.
        if (movementStyle === 'wave' && waveOptions) {
            if (Number.isFinite(waveOptions.waveAmplitude)) enemy.waveAmplitude = waveOptions.waveAmplitude;
            if (Number.isFinite(waveOptions.waveFrequency)) enemy.waveFrequency = waveOptions.waveFrequency;
            if (Number.isFinite(waveOptions.wavePhase)) enemy.wavePhase = waveOptions.wavePhase;
        }

        // Переопределяем Y позицию
        enemy.y = yPos;
        enemy.pixelY = (yPos / 100) * enemy.fieldHeight;
        
        // Переопределяем здоровье если указано
        if (customHP !== undefined) {
            enemy.hp = customHP;
            enemy.maxHP = customHP; 
        }
        
        // Переопределяем урон если указано
        if (customDamage !== undefined) {
            enemy.damage = customDamage;
        }
        
        // Переопределяем скорость если указано
        if (customSpeed !== undefined) {
            enemy.speedPercentPerSecond = ENEMY_TYPES[type].baseSpeed * customSpeed * ANIMATION_PARAMS.BASE_SPEED;
            enemy.speedPixelsPerSecond = (enemy.speedPercentPerSecond / 100) * enemy.fieldHeight;
            enemy.baseSpeedPixelsPerSecond = enemy.speedPixelsPerSecond;
        }

        if (enemy.isCustom && customSpeed !== undefined) {
            applyBossAttackSpeedVisual(enemy.element, customSpeed);
        }
        
        // Обновляем позицию элемента в DOM
        enemy.applyPositionTransform(0);
        // Атаки босса сразу ставим так, чтобы не пересекаться с силуэтом
        if (enemy.isCustom) {
            enemy.resolveAwayFromBoss();
            enemy.movementOriginX = enemy.x;
            enemy.applyPositionTransform(0);
        }
        
        // Добавляем в активные враги
        activeEnemies.push(enemy);
        
        console.log(`Создан кастомный враг ${type} в (${xPos}%, ${yPos}%), HP: ${enemy.hp}/${enemy.maxHP}, Урон: ${enemy.damage}`);
        
        return enemy;
        
    } catch (error) {
        console.error('Ошибка при создании кастомного врага:', error);
        return null;
    }
}


function enableSpawning() {
    spawnEnabled = true;

    console.log("Спавн монстров включен, таймер групп возобновлен");
}

function disableSpawning() {
    spawnEnabled = false;

    console.log("Спавн монстров выключен, таймер групп приостановлен");
}


/**
 * Основной игровой цикл - вызывается каждый кадр анимации
 */
let lastFrameTime = null;
let activeGameTimeMs = 0;
let timeSec2 = 0;
let lastTimeSec2 = 0;
 
function gameLoop(currentTime) {
    const rawDeltaTime = lastFrameTime === null ? 0 : currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    if (isGameOver || isGamePaused) {
        requestAnimationFrame(gameLoop);
        return;
    }

    // Считаем только активное игровое время. Большие разрывы возникают при
    // скрытой вкладке и не должны мгновенно перематывать бой вперёд.
    const deltaTime = Math.min(Math.max(rawDeltaTime, 0), 100);
    activeGameTimeMs += deltaTime;
    timeSec2 = Math.floor(activeGameTimeMs / 1000);
    applyMilaHeroRegen(deltaTime);
    updateTikhonShakeGauge(currentTime);
    updateEliseyBees(currentTime);
    updateEliseyBeeGauge();

	if ((timeSec2-lastTimeSec2)>=1 && (timeNextBoss-timeSec2)>0 && (timeNextBoss-timeSec2)<5 && !bossAlive) {
		lastTimeSec2 = timeSec2;
		showCenterText((timeNextBoss-timeSec2), 800, 'info');
	}
	
    if (timeSec2 >= timeNextBoss && !bossAlive && spawnEnabled) {
		disableSpawning(); 
	}	
	
	if (
        timeSec2 >= timeNextBoss
        && !bossAlive
        && !bossDeathSequenceActive
        && !areThereAnyLiveEnemies()
        && bossTimer === null
        && bossM.length > 0
    ) {
		bossAliveName = bossM[0];
		const boss = spawnEnemyWithParams(bossAliveName, 50, 13);
		// spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
		bossAlive = true;
		currentBoss = boss; // Сохраняем ссылку на босса
		window.battleMusic?.setContext(buildBattleMusicContext(bossAliveName));

		// Показываем полоску здоровья босса
		if (boss) {
			showBossHealthBar(boss);
		}

		// Необязательная реплика при появлении конкретного босса (например,
		// «Вы разозлили Бабу-Ягу!» между обликами одного и того же противника).
		const appearMessage = getLevelCombatConfig().bosses[bossAliveName]?.appearMessage;
		if (appearMessage) {
			showCenterText(appearMessage, 1600, 'boss');
		}

		startBossEvents();
	}
			

    
    checkAimAndDamage();
    
    for (let i = activeEnemies.length - 1; i >= 0; i--) {
        const enemy = activeEnemies[i];
        
        // Передаем deltaTime врагу для корректного движения
        const updateResult = enemy.update(deltaTime);
        
        if (updateResult === 'dead_from_wound') {
            const isBossDeath = beginEnemyDeathVisual(enemy, 'wound');
            activeEnemies.splice(i, 1);
            if (!isBossDeath) {
                playGenericEnemyDeathVisual(enemy);
            }
            continue;
        }
        
        if (updateResult) {
            // Атака достигла героя - наносим урон
            const damage = enemy.getDamageToHero();
            damageHero(damage);
            
            console.log(`${enemy.type} достиг героя и нанёс ${damage} урона!`);
            
            enemy.remove();
            activeEnemies.splice(i, 1);
        }
    }
    
	
	if (currentBoss && bossAlive) {
        updateBossHealthBar();
    }
	
    requestAnimationFrame(gameLoop);
}



function startBossEvents() {
    const bossObject = mBossDelayAb.find(item => item.boss === bossAliveName);
    bossDelayAbDop = bossObject.bossDelayAbDop;
    bossDelayAb = bossObject.bossDelayAb;
    bossComboHistory = [];
    bossWaveCounter = 0;
    bossCombatPhase = 1;

    // Первая атака приходит быстрее прежних 5–7 секунд, но с полноценным телеграфом.
    scheduleNextBossWave(Math.min(2400, bossDelayAbDop * 0.48));
}

function stopBossEvents() {
    bossAlive = false;
    if (bossTimer !== null) {
        clearTimeout(bossTimer);
        bossTimer = null;
    }
    bossTimerStartedAt = 0;
    bossTimerDelay = 0;
    pausedBossWaveDelay = null;
    bossAttackTimers.forEach(task => clearTimeout(task.timeoutId));
    bossAttackTimers.clear();
    document.querySelectorAll('.boss-attack-telegraph').forEach(element => element.remove());
    bossComboHistory = [];
    console.log('События босса остановлены');
}

function armBossTask(task) {
    task.startedAt = performance.now();
    task.timeoutId = setTimeout(() => {
        task.timeoutId = null;
        bossAttackTimers.delete(task);
        task.callback();
    }, task.remainingDelay);
}

function scheduleBossTask(callback, delay) {
    const task = {
        callback,
        remainingDelay: Math.max(0, Number(delay) || 0),
        startedAt: 0,
        timeoutId: null
    };
    bossAttackTimers.add(task);
    armBossTask(task);
    return task;
}

function getLevelCombatConfig() {
    if (typeof bossCombatConfig === 'undefined' || !bossCombatConfig.bosses || !bossCombatConfig.phases) {
        throw new Error(`В gameData${lvlNumber}.js отсутствует bossCombatConfig`);
    }
    return bossCombatConfig;
}

function buildBattleMusicContext(bossName = bossM?.[0]) {
    const config = getLevelCombatConfig();
    const bossOrder = Object.keys(config.bosses);
    const rawBossIndex = bossOrder.indexOf(bossName);
    const bossIndex = rawBossIndex >= 0 ? rawBossIndex : 0;
    const profile = config.bosses[bossName] ?? {};
    const combos = typeof bossAbilitiesDop !== 'undefined' && Array.isArray(bossAbilitiesDop)
        ? bossAbilitiesDop.filter(combo => combo.boss === bossName)
        : [];
    const attacks = typeof bossAbilities !== 'undefined' && Array.isArray(bossAbilities)
        ? bossAbilities.filter(attack => attack.boss === bossName)
        : [];
    const phases = Array.isArray(config.phases) ? config.phases : [];
    const averageSurpriseChance = phases.length > 0
        ? phases.reduce((sum, phase) => sum + (Number(phase.surpriseChance) || 0), 0) / phases.length
        : 0;
    const isRegionFinal = typeof levelCompletionConfig !== 'undefined'
        && Boolean(levelCompletionConfig?.isRegionFinal);

    return {
        levelNumber: lvlNumber,
        bossName,
        bossIndex,
        bossCount: bossOrder.length,
        isFinalBoss: bossIndex === bossOrder.length - 1,
        isRegionFinal,
        movementStyle: profile.movementStyle,
        cadence: profile.cadence,
        telegraphMs: profile.telegraphMs,
        maxComboLength: combos.reduce(
            (maxLength, combo) => Math.max(maxLength, combo.indexAbilities?.length ?? 0),
            0
        ),
        maxAttackSpeed: attacks.reduce(
            (maxSpeed, attack) => Math.max(maxSpeed, Number(attack.customSpeed) || 0),
            0
        ),
        averageSurpriseChance,
        // Необязательные авторские исключения. Для обычных уровней они не нужны.
        musicMood: profile.musicMood ?? config.musicMood,
        musicTrack: profile.musicTrack ?? config.musicTrack
    };
}

function getBossPhase() {
    const phases = getLevelCombatConfig().phases;
    if (!currentBoss || !currentBoss.maxHP) return phases[0];
    const hpRatio = currentBoss.hp / currentBoss.maxHP;
    return phases.find(phase => hpRatio >= phase.minHp) || phases[phases.length - 1];
}

function getBossProfile() {
    const profile = getLevelCombatConfig().bosses[bossAliveName];
    if (!profile) {
        throw new Error(`Для ${bossAliveName} не задан профиль в bossCombatConfig`);
    }
    return profile;
}

function getLevelCadenceMultiplier() {
    return getLevelCombatConfig().levelCadence;
}

function getBossWaveDelay() {
    const profile = getBossProfile();
    const phase = getBossPhase();
    const jitter = 0.88 + Math.random() * 0.24;
    const config = getLevelCombatConfig();
    return Math.max(config.minWaveDelay, bossDelayAbDop * profile.cadence * phase.cadence * getLevelCadenceMultiplier() * jitter);
}

function scheduleNextBossWave(delay = getBossWaveDelay()) {
    if (!bossAlive || isGameOver || isGamePaused) return;
    if (bossTimer !== null) clearTimeout(bossTimer);
    bossTimerDelay = Math.max(0, Number(delay) || 0);
    bossTimerStartedAt = performance.now();
    bossTimer = setTimeout(() => {
        bossTimer = null;
        bossTimerStartedAt = 0;
        bossTimerDelay = 0;
        if (bossAlive && !isGamePaused && !isGameOver) {
            executeBossEvent();
            scheduleNextBossWave();
        }
    }, bossTimerDelay);
}

function getComboDanger(combo, abilities) {
    const attacks = combo.indexAbilities.map(index => abilities[index]).filter(Boolean);
    if (attacks.length === 0) return 0;
    const averageSpeed = attacks.reduce((sum, attack) => sum + attack.customSpeed, 0) / attacks.length;
    return averageSpeed + attacks.length * 0.8;
}

function selectBossCombo(combos, abilities, phase) {
    const rankedCombos = combos
        .map((combo, index) => ({ combo, index, danger: getComboDanger(combo, abilities) }))
        .sort((left, right) => left.danger - right.danger);
    const excludedDangerousCombos = Math.max(
        0,
        Math.min(
            rankedCombos.length - 1,
            Math.floor(Number(phase.excludedDangerousCombos) || 0)
        )
    );
    const eligibleIndexes = new Set(
        rankedCombos
            .slice(0, rankedCombos.length - excludedDangerousCombos)
            .map(candidate => candidate.index)
    );
    const eligibleCombos = combos
        .map((combo, index) => ({ combo, index, danger: getComboDanger(combo, abilities) }))
        .filter(candidate => eligibleIndexes.has(candidate.index));
    let candidates = eligibleCombos
        .filter(candidate => !bossComboHistory.includes(candidate.index));

    if (candidates.length === 0) {
        candidates = eligibleCombos;
    }

    const sortedDanger = [...candidates].sort((a, b) => a.danger - b.danger);
    const surpriseChance = phase.surpriseChance;
    let selected;

    if (Math.random() < surpriseChance) {
        // Редкая опасная серия — неожиданная, но каждая её атака всё равно предупреждается.
        const dangerousPool = sortedDanger.slice(Math.max(0, sortedDanger.length - 2));
        selected = dangerousPool[Math.floor(Math.random() * dangerousPool.length)];
    } else {
        const weights = candidates.map(candidate => {
            const normalizedDanger = candidate.danger / Math.max(1, sortedDanger[sortedDanger.length - 1].danger);
            if (phase.phase === 1) return Math.max(0.25, 1.35 - normalizedDanger);
            if (phase.phase === 3) return 0.45 + normalizedDanger * 1.35;
            return 1;
        });
        const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
        let roll = Math.random() * weightTotal;
        selected = candidates[candidates.length - 1];
        for (let i = 0; i < candidates.length; i++) {
            roll -= weights[i];
            if (roll <= 0) {
                selected = candidates[i];
                break;
            }
        }
    }

    bossComboHistory.push(selected.index);
    if (bossComboHistory.length > 2) bossComboHistory.shift();
    return selected.combo;
}

function getBossMovementStyle() {
    return getBossProfile().movementStyle;
}

const FAST_BOSS_ATTACK_SPEED = 18;
const BOSS_LEFT_FLANK_MAX_X = 28;
const BOSS_RIGHT_FLANK_MIN_X = 72;
const MIN_FAST_CROSSFIRE_GAP_MS = 720;
const BOSS_ATTACK_VISUAL_MIN_SPEED = 2;
const BOSS_ATTACK_VISUAL_MAX_SPEED = 31;

function getBossAttackDangerIntensity(speed) {
    const speedRange = BOSS_ATTACK_VISUAL_MAX_SPEED - BOSS_ATTACK_VISUAL_MIN_SPEED;
    const normalizedSpeed = (Number(speed) - BOSS_ATTACK_VISUAL_MIN_SPEED) / speedRange;
    return Math.max(0, Math.min(1, normalizedSpeed));
}

function mixColorChannel(start, end, amount) {
    return Math.round(start + (end - start) * amount);
}

function getBossAttackDangerVisual(speed) {
    const intensity = getBossAttackDangerIntensity(speed);
    const borderColor = [255, 222, 120].map((channel, index) => (
        mixColorChannel(channel, [255, 42, 30][index], intensity)
    ));
    const fillColor = [140, 20, 10].map((channel, index) => (
        mixColorChannel(channel, [255, 18, 12][index], intensity)
    ));
    const borderAlpha = 0.95 + intensity * 0.05;
    const fillAlpha = 0.2 + intensity * 0.26;
    const glowAlpha = 0.08 + intensity * 0.78;

    return {
        intensity,
        borderColor: `rgba(${borderColor.join(', ')}, ${borderAlpha.toFixed(3)})`,
        fillColor: `rgba(${fillColor.join(', ')}, ${fillAlpha.toFixed(3)})`,
        glowColor: `rgba(255, 35, 20, ${glowAlpha.toFixed(3)})`,
        glowSize: `${(2 + intensity * 16).toFixed(1)}px`,
        iconFilter: [
            `sepia(${(intensity * 0.82).toFixed(3)})`,
            `saturate(${(1 + intensity * 4.2).toFixed(3)})`,
            `hue-rotate(${(-30 * intensity).toFixed(1)}deg)`,
            `contrast(${(1 + intensity * 0.14).toFixed(3)})`,
            `brightness(${(1 + intensity * 0.04).toFixed(3)})`,
            `drop-shadow(0 0 ${(intensity * 9).toFixed(1)}px rgba(255, 34, 20, ${(intensity * 0.72).toFixed(3)}))`
        ].join(' ')
    };
}

function applyBossAttackSpeedVisual(element, speed) {
    if (!element) return;
    const visual = getBossAttackDangerVisual(speed);
    element.style.setProperty('--attack-danger', visual.intensity.toFixed(3));
    element.style.setProperty('--attack-speed-filter', visual.iconFilter);
    element.dataset.attackSpeed = Number(speed).toFixed(1);
}

function capBossAttackSpeed(attack, speed) {
    let cappedSpeed = speed;

    // Не превращаем низкий спавн в телепорт: быстрые атаки разрешены только высоко.
    if (attack.yPos > 12) cappedSpeed = Math.min(cappedSpeed, 15);
    else if (attack.yPos > 10) cappedSpeed = Math.min(cappedSpeed, 18);
    else cappedSpeed = Math.min(cappedSpeed, 31);

    // Медленные «тяжёлые» угрозы сохраняют отдельный темп даже в третьей фазе.
    if (attack.customSpeed <= 10) cappedSpeed = Math.min(cappedSpeed, 11.5);
    return cappedSpeed;
}

function getBalancedAttackSpeed(attack, phase, profile, shotIndex) {
    const variations = profile.speedVariance;
    const variation = variations[(bossWaveCounter + shotIndex) % variations.length];
    const rawSpeed = attack.customSpeed * profile.speedMultiplier * phase.speed * variation;
    const speed = capBossAttackSpeed(attack, rawSpeed);
    return Math.max(2, Math.round(speed * 10) / 10);
}

function getBossAttackSide(attack) {
    if (attack.xPos <= BOSS_LEFT_FLANK_MAX_X) return 'left';
    if (attack.xPos >= BOSS_RIGHT_FLANK_MIN_X) return 'right';
    return 'center';
}

function getProjectedBossAttackSpeed(attack, phase, profile) {
    const maximumVariance = Math.max(...profile.speedVariance);
    const rawSpeed = attack.customSpeed * profile.speedMultiplier * phase.speed * maximumVariance;
    return capBossAttackSpeed(attack, rawSpeed);
}

function getBossAttackScheduleOffsets(abilityIndexes, abilities, shotDelay, phase, profile) {
    const offsets = [];
    const lastFastAttackAt = { left: -Infinity, right: -Infinity };
    const minimumSideSwitchGap = Math.max(
        MIN_FAST_CROSSFIRE_GAP_MS,
        Number(profile.minFastSideSwitchMs) || 0
    );
    let currentOffset = 0;

    abilityIndexes.forEach((abilityIndex, shotIndex) => {
        if (shotIndex > 0) currentOffset += shotDelay;

        const attack = abilities[abilityIndex];
        if (!attack) {
            offsets.push(Math.round(currentOffset));
            return;
        }

        const side = getBossAttackSide(attack);
        const isFastAttack = side !== 'center'
            && getProjectedBossAttackSpeed(attack, phase, profile) >= FAST_BOSS_ATTACK_SPEED;

        if (isFastAttack) {
            const oppositeSide = side === 'left' ? 'right' : 'left';
            const earliestFairOffset = lastFastAttackAt[oppositeSide] + minimumSideSwitchGap;
            currentOffset = Math.max(currentOffset, earliestFairOffset);
            lastFastAttackAt[side] = currentOffset;
        }

        offsets.push(Math.round(currentOffset));
    });

    return offsets;
}

function showAttackTelegraph(attack, duration, movementStyle, speed) {
    if (!enemiesContainer || !bossAlive) return null;
    const marker = document.createElement('div');
    const visual = getBossAttackDangerVisual(speed);
    marker.className = `boss-attack-telegraph telegraph-${movementStyle}`;
    marker.style.left = `${attack.xPos}%`;
    marker.style.top = `${attack.yPos}%`;
    marker.style.setProperty('--telegraph-duration', `${duration}ms`);
    marker.style.setProperty('--attack-danger', visual.intensity.toFixed(3));
    marker.style.setProperty('--telegraph-border-color', visual.borderColor);
    marker.style.setProperty('--telegraph-fill-color', visual.fillColor);
    marker.style.setProperty('--telegraph-glow-color', visual.glowColor);
    marker.style.setProperty('--telegraph-glow-size', visual.glowSize);
    marker.dataset.attackSpeed = Number(speed).toFixed(1);
    marker.setAttribute('aria-hidden', 'true');
    enemiesContainer.appendChild(marker);
    scheduleBossTask(() => marker.remove(), duration + 100);
    return marker;
}

function executeBossEvent() {
    const bossAbD = bossAbilitiesDop.filter(ba => ba.boss === bossAliveName);
    const bossAb = bossAbilities.filter(ba => ba.boss === bossAliveName);
    if (bossAbD.length === 0 || bossAb.length === 0 || !currentBoss) return;

    const config = getLevelCombatConfig();
    const profile = getBossProfile();
    const phase = getBossPhase();
    if (phase.phase !== bossCombatPhase) {
        bossCombatPhase = phase.phase;
        const phaseMessage = profile.phaseMessages?.[phase.phase]
            || `ФАЗА ${phase.phase === 2 ? 'II' : 'III'}`;
        showCenterText(phaseMessage, 1100, 'boss');
    }

    const selectedCombo = selectBossCombo(bossAbD, bossAb, phase);
    const selectedAbilityIndexes = selectedCombo.indexAbilities;
    const comboDamageMultiplier = getBossComboDamageMultiplier(
        selectedCombo,
        bossAb,
        config.scaleLongComboDamage,
        config.scaleShortComboDamage
    );
    const movementStyle = getBossMovementStyle();
    const shotDelay = Math.max(config.minShotDelay, bossDelayAb * profile.cadence * phase.cadence);
    const telegraphMs = Math.max(config.minTelegraphMs, profile.telegraphMs * phase.telegraphMultiplier);
    const attackScheduleOffsets = getBossAttackScheduleOffsets(
        selectedAbilityIndexes,
        bossAb,
        shotDelay,
        phase,
        profile
    );

    selectedAbilityIndexes.forEach((abilityIndex, shotIndex) => {
        const attack = bossAb[abilityIndex];
        if (!attack) return;

        scheduleBossTask(() => {
            if (!bossAlive || isGameOver) return;
            const speed = getBalancedAttackSpeed(attack, phase, profile, shotIndex);
            showAttackTelegraph(attack, telegraphMs, movementStyle, speed);
            scheduleBossTask(() => {
                if (!bossAlive || isGamePaused || isGameOver) return;
                const activeBossAttacks = activeEnemies.filter(enemy => enemy.isCustom && !enemy.isBoss).length;
                if (activeBossAttacks >= phase.maxActiveAttacks) return;

                const damage = calculateBossAttackDamage(
                    attack.customDamage * comboDamageMultiplier,
                    profile.damageMultiplier,
                    phase.damage,
                    config.damageMultiplier,
                    lvlNumber
                );
                spawnEnemyWithParams(
                    attack.type,
                    attack.xPos,
                    attack.yPos,
                    attack.customHP,
                    damage,
                    speed,
                    true,
                    movementStyle,
                    movementStyle === 'wave'
                        ? { waveAmplitude: attack.waveAmplitude, waveFrequency: attack.waveFrequency, wavePhase: attack.wavePhase }
                        : null
                );
            }, telegraphMs);
        }, attackScheduleOffsets[shotIndex]);
    });

    bossWaveCounter++;
}


// ====================ФУНКЦИИ ЗДОРОВЬЯ ГЕРОЯ И ЗАВЕРШЕНИЯ ИГРЫ ====================

 //* Инициализирует здоровье героя
function initHeroHealth() {
    heroHealthBar = document.getElementById('heroHealthBar');
    heroHealthText = document.getElementById('heroHealthText');
    heroLevelText = document.getElementById('heroLevel');
    
    heroHP.current = GAME_CONFIG.HERO_BASE_HP;
    heroHP.max = GAME_CONFIG.HERO_BASE_HP;
    heroHP.level = 1;
    
    updateHeroHealthDisplay();
    console.log('Здоровье героя инициализировано');
}

/**
 * Обновляет отображение здоровья героя
 */
function updateHeroHealthDisplay() {
    if (!heroHealthBar || !heroHealthText) return;
    
    const healthPercent = (heroHP.current / heroHP.max) * 100;
    
    heroHealthBar.style.width = `${healthPercent}%`;
    
    if (healthPercent > 50) {
        heroHealthBar.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
    } else if (healthPercent > 25) {
        heroHealthBar.style.background = 'linear-gradient(to right, #FF9800, #FFC107)';
    } else {
        heroHealthBar.style.background = 'linear-gradient(to right, #F44336, #FF5722)';
    }
    
    heroHealthText.textContent = activeHeroObject.dispName;
	const heroImage = document.getElementById('heroImage');
	heroImage.src = activeHeroObject.image;
    
    if (heroLevelText) {
        heroLevelText.textContent = heroHP.level;
    }
}

// ==================== ФУНКЦИИ ДЛЯ ПОЛОСКИ ЗДОРОВЬЯ БОССА ====================

/**
 * Инициализирует полоску здоровья босса
 */
function initBossHealthBar() {
    bossHealthContainer = document.getElementById('bossHealthContainer');
    bossHealthBar = document.getElementById('bossHealthBar');
    bossHealthFill = document.getElementById('bossHealthFill');
    bossHealthDelayedFill = document.getElementById('bossHealthDelayed');
    bossNameElement = document.getElementById('bossName');
    
    if (!bossHealthContainer || !bossHealthFill || !bossHealthDelayedFill || !bossNameElement) {
        console.error('Элементы полоски здоровья босса не найдены!');
        return;
    }
    
    console.log('Полоска здоровья босса инициализирована');
}

function clearBossHpCatchUp() {
    if (bossHpCatchUpTimer) {
        window.clearTimeout(bossHpCatchUpTimer);
        bossHpCatchUpTimer = null;
    }
    if (bossHealthDelayedFill) {
        bossHealthDelayedFill.classList.remove('catching-up');
    }
}

function getBossDelayedFillPercent() {
    if (!bossHealthDelayedFill || !bossHealthBar) return bossDelayedHpPercent;
    const barWidth = bossHealthBar.clientWidth;
    if (barWidth <= 0) return bossDelayedHpPercent;
    return Math.max(0, Math.min(100, (bossHealthDelayedFill.getBoundingClientRect().width / barWidth) * 100));
}

function syncBossHpBars(healthPercent) {
    clearBossHpCatchUp();
    bossDisplayedHpPercent = healthPercent;
    bossDelayedHpPercent = healthPercent;
    if (bossHealthFill) bossHealthFill.style.width = `${healthPercent}%`;
    if (bossHealthDelayedFill) bossHealthDelayedFill.style.width = `${healthPercent}%`;
}

function startBossHpCatchUp(targetPercent) {
    if (!bossHealthDelayedFill) return;
    bossDelayedHpPercent = targetPercent;
    // force reflow so transition applies from frozen width
    void bossHealthDelayedFill.offsetWidth;
    bossHealthDelayedFill.classList.add('catching-up');
    bossHealthDelayedFill.style.width = `${targetPercent}%`;
}

/**
 * Показывает полоску здоровья босса
 * @param {Enemy} boss - объект босса
 */
function showBossHealthBar(boss) {
    if (!bossHealthContainer || !bossHealthFill || !bossHealthDelayedFill || !bossNameElement) return;
    
    currentBoss = boss;
    
    // Убедимся, что у босса есть maxHP
    if (!boss.maxHP) {
        boss.maxHP = boss.hp;
    }

    if (bossHpHideTimer) {
        window.clearTimeout(bossHpHideTimer);
        bossHpHideTimer = null;
    }
    
    const bossDisplayName = currentBoss.dispName;
    bossNameElement.textContent = bossDisplayName;
    
    const healthPercent = Math.max(0, Math.min(100, (boss.hp / boss.maxHP) * 100));
    syncBossHpBars(healthPercent);
    bossHealthFill.classList.remove('low-health');
    bossHealthFill.classList.remove('damaged');
    
    // Показываем контейнер
    bossHealthContainer.classList.add('show');
    
    console.log(`Показана полоска здоровья босса: ${bossDisplayName}, HP: ${boss.hp}/${boss.maxHP} (${healthPercent.toFixed(1)}%)`);
}

/**
 * Скрывает полоску здоровья босса
 */
function hideBossHealthBar() {
    if (!bossHealthContainer) return;
    
    clearBossHpCatchUp();
    if (bossHpHideTimer) {
        window.clearTimeout(bossHpHideTimer);
        bossHpHideTimer = null;
    }
    currentBoss = null;
    bossHealthContainer.classList.remove('show');
    
    console.log('Полоска здоровья босса скрыта');
}

/**
 * Обновляет полоску здоровья босса (Dark Souls: красная сразу, жёлтая догоняет)
 */
function updateBossHealthBar() {
    if (!currentBoss || !bossHealthFill || !bossHealthDelayedFill) {
        return;
    }
    
    // Защита от деления на ноль
    if (!currentBoss.maxHP || currentBoss.maxHP <= 0) {
        console.warn('maxHP босса некорректно:', currentBoss.maxHP);
        return;
    }
    
    const healthPercent = Math.max(0, Math.min(100, (currentBoss.hp / currentBoss.maxHP) * 100));

    // Каждый кадр зовёт эту функцию — реагируем только на реальное изменение HP.
    if (Math.abs(healthPercent - bossDisplayedHpPercent) < 0.05) {
        return;
    }

    const previousPercent = bossDisplayedHpPercent;
    bossDisplayedHpPercent = healthPercent;
    bossHealthFill.style.width = `${healthPercent}%`;
    
    if (healthPercent < previousPercent - 0.05) {
        // Урон: красная падает сразу, жёлтая ждёт и копит серию ударов.
        clearBossHpCatchUp();
        const frozenDelayed = Math.max(getBossDelayedFillPercent(), previousPercent, healthPercent);
        bossDelayedHpPercent = frozenDelayed;
        bossHealthDelayedFill.style.width = `${frozenDelayed}%`;

        bossHpCatchUpTimer = window.setTimeout(() => {
            bossHpCatchUpTimer = null;
            startBossHpCatchUp(bossDisplayedHpPercent);
        }, BOSS_HP_CATCHUP_DELAY_MS);

        bossHealthFill.classList.add('damaged');
        window.setTimeout(() => {
            bossHealthFill?.classList.remove('damaged');
        }, 500);
    } else {
        // Лечение / полный сброс — без ложного «догона».
        syncBossHpBars(healthPercent);
    }
    
    // Если здоровье низкое, добавляем пульсацию
    if (healthPercent <= 25 && !bossHealthFill.classList.contains('low-health')) {
        bossHealthFill.classList.add('low-health');
    } else if (healthPercent > 25 && bossHealthFill.classList.contains('low-health')) {
        bossHealthFill.classList.remove('low-health');
    }
    
    // Если здоровье кончилось, скрываем полоску после догона
    if (healthPercent <= 0) {
        if (bossHpHideTimer) window.clearTimeout(bossHpHideTimer);
        bossHpHideTimer = window.setTimeout(() => {
            bossHpHideTimer = null;
            hideBossHealthBar();
        }, BOSS_HP_CATCHUP_DELAY_MS + 700);
    }
    
}

/**
 * Наносит урон герою
 * //@param {number} damage - количество урона
 */
/**
 * Наносит урон герою
 * @param {number} damage - количество урона
 */
// Мила — «Живительная клубника»: пассивная регенерация 1% ОТ МАКСИМУМА HP в секунду,
// непрерывно (не тиками), пока герой жив. Копится дробно через deltaTime, поэтому
// не зависит от FPS. Не мешает damageHero — просто плюс к current с тем же капом.
const MILA_HERO_REGEN_PER_SECOND = 0.01;

function applyMilaHeroRegen(deltaTime) {
    if (activeHeroObject?.name !== 'mila' || isGameOver) return;
    if (heroHP.current <= 0 || heroHP.current >= heroHP.max) return;

    const regenRate = Math.max(0, Number(activeHeroObject?.heroRegenPerSecond) || MILA_HERO_REGEN_PER_SECOND);
    const healAmount = heroHP.max * regenRate * (deltaTime / 1000);
    if (healAmount <= 0) return;

    const before = heroHP.current;
    heroHP.current = Math.min(heroHP.max, heroHP.current + healAmount);
    if (heroHP.current !== before) {
        updateHeroHealthDisplay();
    }
}

function damageHero(damage) {
    if (isGameOver) return;
    
	
	damage = Math.floor((damage * (1-heroDamageReduction)));
	
    // Запускаем анимацию удара по герою
    animateHeroHit();
    
    // Уменьшаем здоровье
    heroHP.current -= damage;
    
    // Ограничиваем снизу
    if (heroHP.current < 0) {
        heroHP.current = 0;
    }
    
    // Обновляем отображение
    updateHeroHealthDisplay();
    
    // Логируем урон
    console.log(`Герой получил ${damage} урона. Осталось здоровья: ${heroHP.current}`);

    // Особенность героя: реакция на полученный урон
    notifyHeroTookDamage(damage);
    
    // Проверяем конец игры
    if (heroHP.current <= 0) {
        gameOver();
    }
}

/**
 * Запускает анимацию удара по герою
 */
function animateHeroHit() {
    if (!heroStatusBar) return;
    
    // Удаляем класс, если он уже есть (для перезапуска анимации)
    heroStatusBar.classList.remove('hero-hit-animation');
    
    // Триггерим перерисовку DOM
    void heroStatusBar.offsetWidth;
	
	 const heroImage = document.getElementById('heroImage');
	 const hpImage = document.getElementById('hpCont');
    
    // Добавляем класс с анимацией
    heroStatusBar.classList.add('hero-hit-animation');
	hpImage.classList.add('hero-hit-animation');
	heroImage.classList.add('hero-hit-animation');
    
    // Удаляем класс после завершения анимации
    setTimeout(() => {
        heroStatusBar.classList.remove('hero-hit-animation');
		hpImage.classList.remove('hero-hit-animation');
		heroImage.classList.remove('hero-hit-animation');
    }, 500); // 500мс - длительность анимации
}

/**
 * Завершает игру
 */
function gameOver() {
    isGameOver = true;
    document.body.style.backgroundColor = '#FF6B6B';
    showEndGameModal(false, timeSec2);   // Вместо alert
}

// ==================== ФУНКЦИИ ПОБЕДЫ/ПОРАЖЕНИЯ ====================
// formatTime переехала в saveData.js — нужна и index.html (окно детализации рейтинга),
// который game.js вообще не грузит.

function getActiveHeroSaveKey() {
    return gameState?.activeHero || activeHeroObject?.name || null;
}

function getActiveHeroSave() {
    const heroKey = getActiveHeroSaveKey();
    return heroKey ? gameState?.[heroKey] : null;
}

function canUpgradeActiveHeroFromEndgame() {
    const hero = getActiveHeroSave();
    if (!hero || hero.level >= HERO_MAX_LEVEL) return false;
    return gameState.zlata >= hero.zlataUp;
}

function formatEndgameStatDelta(before, after, { percent = false, digits = 0 } = {}) {
    const scale = percent ? 100 : 1;
    const diff = (after - before) * scale;
    if (Math.abs(diff) < 0.0005) return null;
    const rounded = Number(diff.toFixed(digits));
    if (rounded === 0) return null;
    const sign = rounded > 0 ? '+' : '';
    return `${sign}${rounded}${percent ? '%' : ''}`;
}

function buildEndgameUpgradeDeltaText(hero, preview) {
    const parts = [
        {
            label: 'урон',
            text: formatEndgameStatDelta(hero.startGlobalDamage, preview.startGlobalDamage, { digits: 1 })
        },
        {
            label: 'шанс крита',
            text: formatEndgameStatDelta(
                hero.startGlobalCritChance,
                preview.startGlobalCritChance,
                { percent: true, digits: 2 }
            )
        },
        {
            label: 'крит. урон',
            text: formatEndgameStatDelta(
                hero.startGlobalCritMultiplier,
                preview.startGlobalCritMultiplier,
                { percent: true, digits: 0 }
            )
        },
        {
            label: 'ранение',
            text: formatEndgameStatDelta(
                hero.startGlobalWoundChance,
                preview.startGlobalWoundChance,
                { percent: true, digits: 2 }
            )
        },
        {
            label: 'скор. атаки',
            text: formatEndgameStatDelta(
                1000 - hero.startSHOT_INTERVAL,
                1000 - preview.startSHOT_INTERVAL,
                { digits: 0 }
            )
        },
        {
            label: 'HP',
            text: formatEndgameStatDelta(hero.heroHP, preview.heroHP, { digits: 0 })
        },
        {
            label: 'защита',
            text: formatEndgameStatDelta(
                hero.startHeroDamageReduction,
                preview.startHeroDamageReduction,
                { percent: true, digits: 2 }
            )
        }
    ]
        .filter((part) => part.text)
        .map((part) => `${part.label} ${part.text}`);

    return parts.length ? `Прирост: ${parts.join(', ')}` : '';
}

function buildEndgameHeroUpgradeMarkup() {
    const heroKey = getActiveHeroSaveKey();
    const hero = getActiveHeroSave();
    if (!heroKey || !hero) return '';
    if (hero.level >= HERO_MAX_LEVEL) return '';
    if (!canUpgradeActiveHeroFromEndgame()) return '';

    const preview = heroUp(heroKey, true);
    if (!preview) return '';

    // Не гейтим саму карточку/кнопку наличием видимого прироста — на index.html
    // (см. updateUpgradeButton) повышение доступно по одному критерию: хватает
    // злата и уровень не максимум. Если апгрейд попал в характеристику, уже
    // упёршуюся в потолок (critChanceCap/woundChanceCap/defenseCap и т.п.), все
    // 7 отображаемых дельт могут округлиться в 0 — тогда просто не показываем
    // строку прироста, а не прячем всю карточку с кнопкой.
    const deltaText = buildEndgameUpgradeDeltaText(hero, preview);

    return `
        <div class="endgame-hero-upgrade">
            <img class="endgame-hero-upgrade-portrait" src="${hero.image}" alt="">
            <div class="endgame-hero-upgrade-body">
                <div class="endgame-hero-upgrade-title">${hero.dispName}</div>
                <div class="endgame-hero-upgrade-meta">
                    Уровень <span class="endgame-hero-level">${Math.round(hero.level)}</span>
                    → ${Math.round(hero.level) + 1}
                </div>
                ${deltaText ? `<div class="endgame-hero-upgrade-deltas">${deltaText}</div>` : ''}
                <div class="endgame-hero-upgrade-wallet">
                    У вас: ${gameState.zlata}
                    <img src="images/other/zlata.webp" class="zlatImg" alt="">
                </div>
            </div>
            <button type="button" class="endgame-button endgame-upgrade-btn">
                Повысить
                <span class="endgame-upgrade-cost">
                    ${hero.zlataUp}
                    <img src="images/other/zlata.webp" class="zlatImg" alt="">
                </span>
            </button>
        </div>
    `;
}

function playEndgameLevelUpAnimation(modal, level) {
    const content = modal?.querySelector('.modal-content');
    const upgradeCard = modal?.querySelector('.endgame-hero-upgrade');
    if (!content) return;

    content.querySelector('.level-up-celebration')?.remove();
    content.classList.remove('endgame-level-up-impact');
    upgradeCard?.classList.remove('endgame-level-up-portrait');
    void content.offsetWidth;

    const celebration = document.createElement('div');
    celebration.className = 'level-up-celebration';
    celebration.setAttribute('aria-hidden', 'true');
    celebration.innerHTML = `
        <div class="level-up-rays"></div>
        <div class="level-up-ring"></div>
        <div class="level-up-message">
            <span class="level-up-title">Уровень повышен</span>
            <span class="level-up-number">${Math.round(level)}</span>
        </div>
        <span class="level-up-spark spark-1">✦</span>
        <span class="level-up-spark spark-2">✦</span>
        <span class="level-up-spark spark-3">✦</span>
        <span class="level-up-spark spark-4">✦</span>
        <span class="level-up-spark spark-5">✦</span>
        <span class="level-up-spark spark-6">✦</span>
    `;

    content.appendChild(celebration);
    content.classList.add('endgame-level-up-impact');
    upgradeCard?.classList.add('endgame-level-up-portrait');
    upgradeCard?.querySelector('.endgame-hero-level')?.classList.add('level-up-value');

    window.setTimeout(() => {
        celebration.remove();
        content.classList.remove('endgame-level-up-impact');
        upgradeCard?.classList.remove('endgame-level-up-portrait');
    }, 1200);
}

const endgameLevelUpSound = new Audio('sound/level_up.wav?v=1');
endgameLevelUpSound.preload = 'auto';

function playEndgameLevelUpSound() {
    const volume = window.audioSettings?.getSfxVolumeFactor() ?? 0.10;
    if (volume <= 0) return;
    endgameLevelUpSound.volume = volume;
    endgameLevelUpSound.currentTime = 0;
    const playback = endgameLevelUpSound.play();
    if (playback && typeof playback.catch === 'function') {
        playback.catch(() => {});
    }
}

function refreshEndgameHeroUpgrade(modal) {
    const host = modal?.querySelector('.endgame-hero-upgrade-host');
    if (!host) return;

    host.innerHTML = buildEndgameHeroUpgradeMarkup();
    const upgradeBtn = host.querySelector('.endgame-upgrade-btn');
    if (!upgradeBtn) return;

    upgradeBtn.addEventListener('click', () => {
        const heroKey = getActiveHeroSaveKey();
        if (!heroKey || !canUpgradeActiveHeroFromEndgame()) {
            refreshEndgameHeroUpgrade(modal);
            return;
        }

        heroUp(heroKey, false);
        const updatedHero = getActiveHeroSave();
        playEndgameLevelUpSound();
        refreshEndgameHeroUpgrade(modal);
        playEndgameLevelUpAnimation(modal, updatedHero?.level ?? 0);
    });
}

// Анимированный пересчёт чисел (злато, очки рейтинга) от 0 до целевого значения в
// окне победы/поражения — плашки со статами сами по себе уже появляются по очереди
// (см. .endgame-stat-row в main_css.css), а числа внутри них дополнительно "накручиваются",
// как это обычно делают в играх. Уважает prefers-reduced-motion — тогда просто сразу
// показывает итоговое число без анимации.
function animateEndgameCounters(modal) {
    const targets = modal?.querySelectorAll('[data-count-to]');
    if (!targets || targets.length === 0) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const duration = 900;

    targets.forEach(el => {
        const target = Math.round(Number(el.dataset.countTo)) || 0;
        if (reduceMotion || target === 0) {
            el.textContent = target;
            return;
        }
        const start = performance.now();
        const step = now => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        };
        requestAnimationFrame(step);
    });
}

// Полоса прогресса до нового героя (см. .endgame-hero-track/getHeroUnlockProgress
// в saveData.js) рендерится с шириной 0%, а целевой % лежит в data-target-width —
// два кадра спустя после вставки в DOM переставляем реальную ширину, чтобы сработал
// CSS-переход (задать финальную ширину сразу в разметке — переход не запустится,
// браузер просто отрисует уже готовое состояние).
function animateEndgameHeroTrackFill(modal) {
    const fillEl = modal?.querySelector('.endgame-hero-track .hero-track-fill[data-target-width]');
    if (!fillEl) return;

    const target = fillEl.dataset.targetWidth;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        fillEl.style.width = `${target}%`;
        return;
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            fillEl.style.width = `${target}%`;
        });
    });
}

function showEndGameModal(victory, timeSeconds) {
    // Доигрываем текущую композицию, но после неё оставляем экран результата в тишине.
    window.battleMusic?.setCombatActive(false);

    // Ставим игру на паузу, если ещё не
    if (!isGamePaused && !isGameOver) {
        pauseGame();
    }
	
	let firstRegionFinalClear = false;
	if(victory) {
		firstRegionFinalClear = completeLevel();
	}

	const bossCount = Array.isArray(bossM) && bossM.length > 0 ? bossM.length : 5;
	let zlatP = getLevelZlataPayout(lvlNumber, countDefeatBoss, bossCount);
	if (firstRegionFinalClear && zlatP > 0) {
		zlatP = zlatP * REGION_FINAL_FIRST_CLEAR_ZLATA_MULTIPLIER;
	}
	if(zlatP >0){addZlat(zlatP)};

    const nextLevelNumber = Math.floor(Number(lvlNumber)) + 1;
    const maxPlayableLevel = (typeof MAX_LEVEL === 'number' && Number.isFinite(MAX_LEVEL))
        ? MAX_LEVEL
        : 15;
    const hasNextLevel = victory
        && Number.isFinite(nextLevelNumber)
        && nextLevelNumber <= maxPlayableLevel;
	
    const modal = document.createElement('div');
    modal.className = `level-up-modal endgame-modal ${victory ? 'is-victory' : 'is-defeat'}`;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="endgame-badge">${victory ? '🏆' : '⚔️'}</div>
            <h2>${victory ? 'ПОБЕДА!' : 'ПОРАЖЕНИЕ'}</h2>
            <p class="modal-subtitle">${victory ? 'Последний противник побежден!' : 'Ваш персонаж побежден'}</p>
            <div class="endgame-stats">
                <div class="endgame-stat-row resource-line">
                    <span class="endgame-stat-icon"><img src="images/other/zlata.webp" class="zlatImg" alt=""></span>
                    <span class="endgame-stat-label">Получено злата</span>
                    <span class="endgame-stat-value" data-count-to="${zlatP}">0</span>
                </div>
                <div class="endgame-stat-row time-line">
                    <span class="endgame-stat-icon">⏱</span>
                    <span class="endgame-stat-label">Время прохождения</span>
                    <span class="endgame-stat-value endgame-stat-value--time">${formatTime(timeSeconds)}</span>
                </div>`
				+ rowTotal +
            `</div>
            <div class="endgame-hero-upgrade-host"></div>
            <div class="endgame-buttons">
                ${hasNextLevel ? '<button class="endgame-button next-level">Следующий уровень</button>' : ''}
                <button class="endgame-button restart">Еще разок</button>
                <button class="endgame-button base">На базу</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    refreshEndgameHeroUpgrade(modal);
    animateEndgameCounters(modal);
    animateEndgameHeroTrackFill(modal);

    // Кнопка в баннере разблокировки героя (см. recordLevelCompletion/completeLevel в
    // saveData.js) — ведёт на index.html и сразу открывает окно персонажей с уже
    // выбранной карточкой именно этого героя, чтобы игрок не искал её в сетке сам.
    modal.querySelectorAll('.endgame-hero-unlock-goto').forEach(btn => {
        btn.addEventListener('click', () => {
            const heroKey = btn.dataset.hero || '';
            window.location.href = `index.html?openCharacters=${encodeURIComponent(heroKey)}`;
        });
    });

    modal.querySelector('.next-level')?.addEventListener('click', () => {
        goToLevelWithRememberedDifficulty(nextLevelNumber);
    });

    // Кнопка "Еще разок" – перезагрузка страницы
    modal.querySelector('.restart').addEventListener('click', () => {
        location.reload();
    });

    // Кнопка "На базу" – пока просто закрывает окно
	modal.querySelector('.base').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// ==================== ЭКРАН ЗАГРУЗКИ УРОВНЯ ====================
// Раньше бой мог начаться (и нанести урон) раньше, чем реально догрузились картинки
// атак — img.src выставлялся при спавне, но урон считался по таймеру независимо от
// того, успела ли картинка отрисоваться. Теперь перед стартовой модалкой «Готовы к
// битве?» ждём: все картинки врагов/боссов этого уровня, оба звуковых эффекта и первый
// боевой трек (готовый к плавному проигрыванию, не просто «начал качаться»). Остальные
// треки, как и раньше, догружаются по ходу боя в фоне.

function preloadImageAsset(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

function preloadSoundAsset(src) {
    return new Promise(resolve => {
        const audio = new Audio();
        let settled = false;
        const finish = ready => {
            if (settled) return;
            settled = true;
            resolve(ready);
        };
        audio.addEventListener('canplaythrough', () => finish(true), { once: true });
        audio.addEventListener('error', () => finish(false), { once: true });
        audio.preload = 'auto';
        audio.src = src;
        // Маленькие wav-эффекты — на случай, если canplaythrough почему-то не придёт.
        setTimeout(() => finish(true), 4000);
    });
}

function getLevelPreloadImagePaths() {
    const paths = new Set();
    if (typeof ENEMY_TYPES === 'object' && ENEMY_TYPES) {
        Object.values(ENEMY_TYPES).forEach(enemyType => {
            if (enemyType?.image) paths.add(enemyType.image);
        });
    }
    // Портрет героя и спрайт оружия/атаки, участвующий в анимации (см. weaponImage
    // у объектов героев в saveData.js — та же картинка, что зашита в main_css.css у
    // .eremei-club/.dunya-broom/.luka-arrow/.daryana-fire) — раньше не ждали загрузки
    // и могли мигнуть пустотой на первом ударе.
    if (activeHeroObject?.image) paths.add(activeHeroObject.image);
    if (activeHeroObject?.weaponImage) paths.add(activeHeroObject.weaponImage);
    // Второй спрайт пчелы у Елисея (чередуется с weaponImage, см. trySpawnEliseyBee) —
    // без прелоада первая пчела с этим спрайтом мигала бы пустотой при появлении.
    if (activeHeroObject?.weaponImage2) paths.add(activeHeroObject.weaponImage2);
    if (activeHeroObject?.aimImage) paths.add(activeHeroObject.aimImage);
    paths.add('images/background/1.png');
    return [...paths];
}

const LEVEL_PRELOAD_SOUND_PATHS = ['sound/damage.wav', 'sound/level_up.wav?v=1'];

function updateLoadingScreenProgress(done, total) {
    const bar = document.getElementById('levelLoadingBar');
    const label = document.getElementById('levelLoadingLabel');
    if (bar) bar.style.width = `${total > 0 ? Math.round((done / total) * 100) : 100}%`;
    if (label) label.textContent = `${done} / ${total}`;
}

function showLevelLoadingScreen() {
    if (document.querySelector('.level-loading-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'level-up-modal level-loading-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>⏳ ЗАГРУЗКА ⏳</h2>
            <div class="level-loading-bar-track">
                <div class="level-loading-bar-fill" id="levelLoadingBar"></div>
            </div>
            <p class="level-loading-label" id="levelLoadingLabel">0 / 0</p>
        </div>
    `;
    document.body.appendChild(modal);
}

function hideLevelLoadingScreen() {
    document.querySelector('.level-loading-modal')?.remove();
}

async function preloadLevelAssets() {
    const imagePaths = getLevelPreloadImagePaths();
    const tasks = [
        ...imagePaths.map(src => () => preloadImageAsset(src)),
        ...LEVEL_PRELOAD_SOUND_PATHS.map(src => () => preloadSoundAsset(src)),
        () => window.battleMusic?.preloadFirstTrack(buildBattleMusicContext(bossM?.[0])) ?? Promise.resolve(true)
    ];

    const total = tasks.length;
    let done = 0;
    updateLoadingScreenProgress(done, total);

    await Promise.all(tasks.map(task => task().finally(() => {
        done++;
        updateLoadingScreenProgress(done, total);
    })));
}

function showStartModal() {
    // Если окно уже открыто – не создаём новое
    if (document.querySelector('.start-modal')) return;

    // Ставим игру на паузу
    pauseGame();

    const modal = document.createElement('div');
    modal.className = 'level-up-modal start-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>⚔️ ДОБРО ПОЖАЛОВАТЬ ⚔️</h2>
            <p class="modal-subtitle">Готовы к битве?</p>
            <div class="endgame-buttons" style="justify-content: center; margin-top: 30px;">
                <button class="endgame-button restart start-button">ВПЕРЕД!</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Обработчик кнопки
    modal.querySelector('.start-button').addEventListener('click', () => {
        document.body.removeChild(modal);
        window.battleMusic?.start(buildBattleMusicContext(bossM?.[0]));
        resumeGame(); // Снимаем паузу
    });
}

// Определяет, доступен ли следующий уровень (в рамках контента и уже открытый прогрессом игрока)
// Переход "Следующий уровень" (из окна победы и из окна временного улучшения после
// босса) — по прямому запросу пользователя больше НЕ спрашивает сложность: она
// берётся автоматически (getLevelDifficulty — глобальный дефолт из настроек, если
// уровень ещё не проходили, иначе последняя сложность, с которой его запускали).
// setLevelDifficulty всё равно вызывается — этот переход тоже реальный старт уровня,
// и по тому же правилу «запоминается в момент старта», что и явное окно выбора
// (см. difficulty.js/onStart), должен обновить память о последней сложности этого
// уровня. Окно выбора сложности по клику на плитку уровня в index.html не трогаем —
// там оно как и было.
function goToLevelWithRememberedDifficulty(levelNumber) {
    const difficulty = typeof getLevelDifficulty === 'function' ? getLevelDifficulty(levelNumber) : 1;
    if (typeof setLevelDifficulty === 'function') setLevelDifficulty(levelNumber, difficulty);
    const version = typeof GAME_BUILD_VERSION === 'string' ? GAME_BUILD_VERSION : '';
    const versionQuery = version ? `&v=${encodeURIComponent(version)}` : '';
    window.location.href = `level.html?level=${levelNumber}&difficulty=${difficulty}${versionQuery}`;
}

function getNextLevelAvailability() {
    const nextLevelNumber = Math.floor(Number(lvlNumber)) + 1;
    const maxContentLevel = (typeof MAX_LEVEL === 'number' && Number.isFinite(MAX_LEVEL))
        ? MAX_LEVEL
        : nextLevelNumber - 1;
    const maxUnlockedLevel = (Number(gameState?.lastCompletedLevel) || 0) + 1;
    const hasNextLevel = Number.isFinite(nextLevelNumber)
        && nextLevelNumber <= maxContentLevel
        && nextLevelNumber <= maxUnlockedLevel;
    return { nextLevelNumber, hasNextLevel };
}

// ==================== ФУНКЦИИ ПРИЦЕЛА И УРОНА ====================

/**
 * Определяет мобильное / touch-устройство (с запасом под iOS Safari)
 */
function detectMobileDevice() {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '')) {
        return true;
    }
    try {
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return true;
        if (window.matchMedia('(pointer: coarse)').matches) return true;
        if (window.matchMedia('(max-width: 820px)').matches && ('ontouchstart' in window)) return true;
    } catch (e) { /* ignore */ }
    if ('ontouchstart' in window) return true;
    if ((navigator.maxTouchPoints || navigator.msMaxTouchPoints || 0) > 0) return true;
    return false;
}

function applyMobileDeviceFlag() {
    isMobileDevice = detectMobileDevice();
    document.documentElement.classList.toggle('is-mobile', isMobileDevice);
    if (document.body) {
        document.body.classList.toggle('is-mobile', isMobileDevice);
    }
}

/**
 * Обновляет aimPosition (и DOM-прицел на мобилке) из клиентских координат
 */
function setAimFromClient(clientX, clientY, options) {
    if (!gameField) return;

    const fingerOffset = options && options.fingerOffset;
    const showAim = options && options.showAim;
    const rect = gameField.getBoundingClientRect();

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    if (fingerOffset) {
        y -= MOBILE_AIM_OFFSET_Y;
    }

    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));

    aimPosition.x = x;
    aimPosition.y = y;

    if (aimElement && (showAim || isMobileDevice)) {
        aimElement.style.left = x + 'px';
        aimElement.style.top = y + 'px';
    }
}

/**
 * Пересчитывает размеры поля у живых врагов после resize / поворота экрана
 */
function handleGameFieldResize() {
    if (!gameField) return;

    const w = gameField.clientWidth;
    const h = gameField.clientHeight;
    if (w <= 0 || h <= 0) return;

    activeEnemies.forEach(function(enemy) {
        enemy.fieldWidth = w;
        enemy.fieldHeight = h;
        enemy.pixelX = (enemy.x / 100) * w;
        enemy.pixelY = (enemy.y / 100) * h;
        enemy.speedPixelsPerSecond = (enemy.speedPercentPerSecond / 100) * h;
    });

    aimPosition.x = Math.max(0, Math.min(w, aimPosition.x));
    aimPosition.y = Math.max(0, Math.min(h, aimPosition.y));

    if (aimElement && isMobileDevice) {
        aimElement.style.left = aimPosition.x + 'px';
        aimElement.style.top = aimPosition.y + 'px';
    }
}

/**
 * Инициализирует прицел и определяет тип устройства
 */
function initAim() {
    aimElement = document.getElementById('aim');
    damageContainer = document.getElementById('damage-container');

    applyMobileDeviceFlag();
    applyHeroAimAssets();

    setupDesktopAim();
    if (isMobileDevice || ('ontouchstart' in window)) {
        setupMobileAim();
    }

    console.log(`Игра запущена на ${isMobileDevice ? 'мобильном устройстве' : 'компьютере'}`);
}

/**
 * Проверяет, попадает ли точка (в клиентских координатах) в статус-бар
 * героя — над ним не должно быть прицела и тапы там не должны считаться
 * прицеливанием/выстрелом.
 */
function isPointOverStatusBar(clientX, clientY) {
    const bar = document.querySelector('.hero-status-bar');
    if (!bar) return false;
    const rect = bar.getBoundingClientRect();
    return clientX >= rect.left && clientX <= rect.right &&
        clientY >= rect.top && clientY <= rect.bottom;
}

const STYLIZED_MENU_CURSOR = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><polygon points="2,2 30,12 16,20 12,30 2,2" fill="%23e0c9a6" stroke="%238B4513" stroke-width="2" stroke-linejoin="round"/></svg>\') 2 2, auto';

/**
 * У каждого героя свой прицел — картинка aimImage на его объекте в
 * saveData.js (images/hero/<папка героя>/aim.webp). Раньше на все поле боя
 * был один общий курсор (images/aim/1.png) — теперь курсор боевого поля
 * целиком собирается из этого поля, общей картинки-фолбэка больше нет: без
 * aimImage у героя просто остаётся обычный системный курсор.
 */
function getHeroAimCursorValue() {
    const aimImage = activeHeroObject?.aimImage;
    return aimImage ? `url('${aimImage}') 30 30, auto` : 'auto';
}

/**
 * Навешивает прицел активного героя на мобильный DOM-курсор (.aim) и
 * запоминает исходный курсор боевого поля для десктопа.
 */
function applyHeroAimAssets() {
    const aimImage = activeHeroObject?.aimImage;
    if (aimElement && aimImage) {
        aimElement.style.backgroundImage = `url('${aimImage}')`;
    }
    setStatusBarCursorOverride(false);
}

/**
 * Включает/выключает обычный курсор поверх статус-бара, перебивая
 * инлайн-стилем прицел активного героя. Приоритет 'important' нужен ВСЕГДА
 * (не только когда active===true) — в main_css.css есть общее правило
 * `* { cursor: ... !important }` (стилизованный курсор всего интерфейса),
 * и обычный инлайн-стиль без important ему проигрывает независимо от
 * специфичности селектора.
 */
function setStatusBarCursorOverride(active) {
    const value = active ? STYLIZED_MENU_CURSOR : getHeroAimCursorValue();
    if (gameField) gameField.style.setProperty('cursor', value, 'important');
    if (enemiesContainer) enemiesContainer.style.setProperty('cursor', value, 'important');
}

/**
 * Настраивает прицел для компьютеров (следует за курсором)
 */
function setupDesktopAim() {
    // Следим за движением мыши
    gameField.addEventListener('mousemove', function(e) {
        // На мобилке цель ведёт только touch; после тапа игнорируем синтетическую мышь
        if (isMobileDevice || Date.now() - lastTouchAimTime < 500) return;
        const overStatusBar = isPointOverStatusBar(e.clientX, e.clientY);
        setStatusBarCursorOverride(overStatusBar);
        if (overStatusBar) return;
        setAimFromClient(e.clientX, e.clientY, { showAim: false });
    });

    // Для отладки: показываем прицел при зажатой клавише (например, Ctrl)
    gameField.addEventListener('mousedown', function(e) {
        if (e.ctrlKey && aimElement) {
            aimElement.style.display = 'block';
            aimElement.style.left = aimPosition.x + 'px';
            aimElement.style.top = aimPosition.y + 'px';
        }
    });
}

/**
 * Настраивает прицел для мобильных (тап / свайп по экрану)
 */
function setupMobileAim() {
    if (aimElement && isMobileDevice) {
        aimElement.style.display = 'block';
        aimElement.style.left = aimPosition.x + 'px';
        aimElement.style.top = aimPosition.y + 'px';
    }

    function handleTouchAim(e) {
        if (!e.touches || e.touches.length === 0) return;
        const touch = e.touches[0];
        // Тап по статус-бару (кнопки «заново» / «на базу», хп-бар) — не
        // прицеливание. Не трогаем preventDefault, чтобы дошёл нативный
        // клик по кнопке, и не двигаем туда прицел.
        if (isPointOverStatusBar(touch.clientX, touch.clientY)) return;
        // Не перехватываем жесты на модалках вне поля — слушаем только gameField
        e.preventDefault();
        lastTouchAimTime = Date.now();
        setAimFromClient(touch.clientX, touch.clientY, {
            fingerOffset: true,
            showAim: true
        });
    }

    gameField.addEventListener('touchstart', handleTouchAim, { passive: false });
    gameField.addEventListener('touchmove', handleTouchAim, { passive: false });
}



/**
 * Проверяет, находится ли враг в радиусе прицела и наносит урон
 */
function checkAimAndDamage() {
    const enemy = getEnemyAtPoint(aimPosition.x, aimPosition.y);
    if (!enemy) return;

    const now = Date.now();
    const isBoss = bossM.includes(enemy.type);
    const shotInterval = isBoss ? SHOT_INTERVAL : 300; // разные интервалы
	
    // Если с момента последнего выстрела по этому врагу прошло меньше интервала — выходим
    if (now - (enemy.lastShotTime) < shotInterval) return;

    enemy.lastShotTime = now;

    const index = activeEnemies.indexOf(enemy);
    if (index !== -1) {
        // ЖЕЛЕЗОБЕТОННОЕ ПРАВИЛО (не только для Елисея — для ЛЮБОГО текущего и
        // будущего героя): "атаки" боссов (снаряды/угрозы, enemy НЕ из bossM) —
        // это то, что игрок ОТБИВАЕТ, и отбой обязан быть МГНОВЕННЫМ, без единой
        // мс задержки, независимо от особой механики героя. Поэтому рой Елисея
        // подменяет обычный удар ТОЛЬКО по самому боссу (isBoss) — по его атакам
        // Елисей бьёт как все, через обычный damageEnemy ниже (isBoss=false там
        // и так уже применяет урон синхронно в этом же кадре, без scheduleHeroImpact).
        if (activeHeroObject?.name === 'elisey' && isBoss) {
            // Прицел поднимает пчёл (до 8 на цели) вместо мгновенного удара — сам
            // урон/крит наносится позже, независимо каждой пчелой по своему темпу
            // (см. trySpawnEliseyBee/updateEliseyBees). Этот же rate-limit по
            // enemy.lastShotTime/shotInterval выше — и есть темп СПАВНА новых пчёл.
            trySpawnEliseyBee(enemy);
            return;
        }
        const attackRoll = rollHeroAttackMultiplier(isBoss);
        damageEnemy(enemy, attackRoll.multiplier, attackRoll.kind, shotInterval);
    }
}

const BOSS_DAMAGE_VARIANCE = 0.05;

function rollBossHitDamage(damage, randomRoll = Math.random()) {
    const numericRoll = Number(randomRoll);
    const boundedRoll = Number.isFinite(numericRoll)
        ? Math.max(0, Math.min(1, numericRoll))
        : 0.5;
    const varianceMultiplier = 1 - BOSS_DAMAGE_VARIANCE
        + (BOSS_DAMAGE_VARIANCE * 2 * boundedRoll);
    return Math.max(1, Math.round(damage * varianceMultiplier));
}


function damageEnemy(enemy, attackMultiplier = 1, attackKind = 'normal', shotIntervalMs = SHOT_INTERVAL) {
    if (!enemy?.element || !enemy.element.isConnected) return;

	const isBoss = bossM.includes(enemy.type);
    const damageResult = calculateDamage(isBoss, enemy);
    const woundBaseDamage = damageResult.damage;
    const multipliedDamage = damageResult.damage * attackMultiplier;
    damageResult.damage = isBoss
        ? rollBossHitDamage(multipliedDamage)
        : Math.round(multipliedDamage);
    damageResult.woundBaseDamage = woundBaseDamage;

    const timing = isBoss
        ? getHeroAttackTiming(shotIntervalMs)
        : getHeroDeflectTiming();
    const predictedDestroyed = enemy.hp - damageResult.damage <= 0;

    // Сначала проигрываем активную фазу атаки. Урон будет применён
    // централизованно в её точке контакта.
    if (isBoss) {
        showEremeiBossImpact(enemy, damageResult.isCritical, timing);
        showDunyaBossImpact(enemy, damageResult.isCritical, attackKind, timing);
        showLukaBossImpact(enemy, damageResult.isCritical, damageResult.isCountShot, timing);
        showDaryanaBossImpact(enemy, damageResult.isCritical, timing);
        showMilaBossImpact(enemy, damageResult.isCritical, timing);
        showTikhonBossImpact(enemy, damageResult.isCritical, timing);
    } else if (predictedDestroyed) {
        showEremeiDeflectImpact(enemy, damageResult.isCritical, timing);
        showDunyaDeflectImpact(enemy, damageResult.isCritical, timing);
        showLukaDeflectImpact(enemy, damageResult.isCritical, timing);
        showDaryanaDeflectImpact(enemy, damageResult.isCritical, timing);
        showMilaDeflectImpact(enemy, damageResult.isCritical, timing);
        showTikhonDeflectImpact(enemy, damageResult.isCritical, timing);
        showEliseyDeflectImpact(enemy, damageResult.isCritical, timing);
    }

    if (!isBoss) {
        // Снаряд считается отбитым сразу: он прекращает движение и умирает
        // в этом же кадре, а короткий VFX доигрывается независимо.
        applyHeroImpactDamage(enemy, damageResult, false);
        return;
    }

    scheduleHeroImpact(() => {
        applyHeroImpactDamage(enemy, damageResult, true);
    }, timing.impactDelayMs);
}

function applyHeroImpactDamage(enemy, damageResult, isBoss) {
    const liveIndex = activeEnemies.indexOf(enemy);
    if (liveIndex === -1 || !enemy?.element || !enemy.element.isConnected || enemy.hp <= 0) return;

    // Фактический урон наносится только в момент визуального контакта.
    enemy.hp -= damageResult.damage;

    // Hit-stop у Еремея: тяжёлый удар на миг "вешает" цель в воздухе.
    if (isBoss && activeHeroObject?.name === 'eremei') {
        enemy.hitStopUntil = performance.now() + (damageResult.isCritical ? 110 : 45);
    }

	//Применение особенностей героев
	subsDamageEnemy(isBoss, enemy.hp <= 0);
    
    // Запускаем анимацию удара по врагу
	
	animateEnemyHit(enemy);

	if (enemy.type === bossAliveName && currentBoss) {
        updateBossHealthBar();
    }
	
	// Воспроизводим звук
	playDamageSound();
	
	if ((damageResult.woundBaseDamage / 20) > 1) {
	checkForWound(enemy, damageResult.woundBaseDamage);
	}
    
    // Получаем позицию врага для отображения текста урона
    const enemyRect = enemy.element.getBoundingClientRect();
    const fieldRect = gameField.getBoundingClientRect();
    
    // Рассчитываем позицию в процентах относительно игрового поля
    const xPercent = ((enemyRect.left + enemyRect.width / 2 - fieldRect.left) / fieldRect.width) * 100;
    const yPercent = ((enemyRect.top + enemyRect.height / 2 - fieldRect.top) / fieldRect.height) * 100;
    
    // Всплывающий урон только по боссам (так задумано)
    if (isBoss) {
        createDamageText(damageResult.damage, xPercent, yPercent, damageResult.isCritical);
    }
	
    // Визуальная обратная связь при попадании
    enemy.element.style.filter = 'brightness(1.5)';
    setTimeout(() => {
        if (enemy.element && !enemy.isBossDying && !enemy.isInert) {
            enemy.element.style.filter = 'brightness(1)';
        }
    }, 100);
    
    // Проверяем, умер ли враг
    if (enemy.hp <= 0) {
        const isBossDeath = beginEnemyDeathVisual(enemy, 'player');
        const currentIndex = activeEnemies.indexOf(enemy);
        if (currentIndex !== -1) activeEnemies.splice(currentIndex, 1);
        if (!isBossDeath) {
            playGenericEnemyDeathVisual(enemy);
        }
    }
}

function checkForWound(enemy, damage) {
    // Если враг уже ранен - не проверяем снова
    if (enemy.isWounded) return;
    
    // Проверяем шанс ранения
    const random = Math.random();
    
    if (random < globalWoundChance) {
        // УСПЕХ! Ранение наложено
        enemy.applyWound(damage);
        
        // Создаем текст "Ранен!"
        createWoundText(enemy);
    }
}

function createWoundText(enemy) {
    if (!enemy.element) return;
    
    const enemyRect = enemy.element.getBoundingClientRect();
    const fieldRect = gameField.getBoundingClientRect();
    
    // Рассчитываем позицию над врагом
    const xPercent = ((enemyRect.left + enemyRect.width / 2 - fieldRect.left) / fieldRect.width) * 100;
    const yPercent = ((enemyRect.top - 30 - fieldRect.top) / fieldRect.height) * 100;
    
    // Создаем элемент текста ранения
    const woundText = document.createElement('div');
    woundText.className = 'wound-text';
    woundText.textContent = 'Ранен!';
    
    // Устанавливаем позицию
    woundText.style.left = xPercent + '%';
    woundText.style.top = yPercent + '%';
    
    // Добавляем в контейнер
    damageContainer.appendChild(woundText);
    
    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        if (woundText.parentNode) {
            woundText.parentNode.removeChild(woundText);
        }
    }, 1000);
}


/**
 * Разброс урона одиночного удара (±доля от базового урона) — та же роль для
 * урона, что критический шанс/множитель играют для крита, но действует на
 * КАЖДЫЙ удар, а не только на критический. Доля берётся с самого героя
 * (getHeroDamageVariance в saveData.js, по умолчанию ±5%, у Еремея ±30% —
 * см. damageVariance в его объекте). Равномерное распределение вокруг 1,
 * тот же стиль, что и jitter у волн боссов (getBossWaveDelay).
 */
function rollDamageVariance(baseDamage) {
    const variance = getHeroDamageVariance(activeHeroObject);
    if (!(variance > 0)) return baseDamage;
    const spread = 1 + (Math.random() * 2 - 1) * variance;
    return baseDamage * spread;
}

//* Рассчитывает урон с учетом шанса критического удара
function calculateDamage(isBoss, target) {
    // Базовый урон, ± разброс конкретного героя (см. rollDamageVariance)
    let damage = rollDamageVariance(globalDamage);
    let isCritical = false;

    // Крит только по боссу: отбивание снарядов — обычный удар без крита/тряски.
    if (isBoss) {
        const random = Math.random();
        if (random < getEffectiveCritChance()) {
            isCritical = true;
        }

        const heroCriticalResult = subsCalculateDamageEnemy(true, isCritical);
        isCritical = heroCriticalResult.isCritical;

        if (isCritical) {
            damage *= globalCritMultiplier;
            console.log(`Критический удар! Множитель: x${globalCritMultiplier}`);
        }

        // Дарьяна: бонус считается от текущей недостающей HP% цели
        // ПЕРЕД этим ударом — состояние не хранится, только читает target.hp.
        damage *= getDaryanaMissingHpMultiplier(target);

        // Тихон: «Дрожащая рука» — та же волна, что и в getHeroFeatureCritChanceBonus
        // выше (общий now, один и тот же момент удара), только множит урон, а не крит-шанс.
        damage *= getTikhonShakeDamageMultiplier();

        damage = Math.round(damage);
        return {
            damage,
            isCritical,
            isCountShot: heroCriticalResult.isCountShot
        };
    }

    return {
        damage: Math.round(damage),
        isCritical: false,
        isCountShot: false
    };
}

/* 
 * Запускает анимацию удара по врагу
 * @param {Enemy} enemy - объект врага
 */ 
function animateEnemyHit(enemy) {
    if (!enemy || !enemy.element) return;
    
    // Удаляем класс, если он уже есть (для перезапуска анимации)
    enemy.element.classList.remove('enemy-hit');
    
    // Триггерим перерисовку DOM (force reflow)
    void enemy.element.offsetWidth;
    
    // Добавляем класс с анимацией
    enemy.element.classList.add('enemy-hit');
    
    // Удаляем класс после завершения анимации
    setTimeout(() => {
        if (enemy.element) {
            enemy.element.classList.remove('enemy-hit');
        }
    }, 400); // 400мс - длительность анимации
}

function getImpactFieldPercent(targetElement) {
    if (!targetElement || !gameField) return null;
    const targetRect = targetElement.getBoundingClientRect();
    const fieldRect = gameField.getBoundingClientRect();
    if (fieldRect.width <= 0 || fieldRect.height <= 0) return null;
    return {
        left: ((targetRect.left + targetRect.width / 2 - fieldRect.left) / fieldRect.width) * 100,
        top: ((targetRect.top + targetRect.height / 2 - fieldRect.top) / fieldRect.height) * 100
    };
}

function pruneImpactNodes(selector, maxCount) {
    if (!enemiesContainer) return;
    const existing = enemiesContainer.querySelectorAll(selector);
    const overflow = existing.length - maxCount + 1;
    for (let i = 0; i < overflow; i++) {
        existing[i]?.remove();
    }
}

// Кэш маски силуэта врага: массив точек только в плотной непрозрачной зоне.
const enemyOpaqueHitCache = new Map();
const enemyOpaqueHitPending = new Map(); // src -> Promise

function isEnemyBodyPixel(r, g, b, a, alphaMin) {
    if (a < alphaMin) return false;
    // Некоторые спрайты вместо прозрачности залиты чёрным — его не считаем телом.
    if (r <= 14 && g <= 14 && b <= 14) return false;
    return true;
}

function collectBodySamples(data, w, h, alphaMin, requireNeighbor) {
    const body = new Uint8Array(w * h);
    let bodyCount = 0;
    for (let i = 0, p = 0; i < body.length; i++, p += 4) {
        if (isEnemyBodyPixel(data[p], data[p + 1], data[p + 2], data[p + 3], alphaMin)) {
            body[i] = 1;
            bodyCount++;
        }
    }
    if (!bodyCount) return [];

    const samples = [];
    const pad = requireNeighbor ? 1 : 0;
    for (let y = pad; y < h - pad; y++) {
        for (let x = pad; x < w - pad; x++) {
            const idx = y * w + x;
            if (!body[idx]) continue;
            if (requireNeighbor) {
                // Мягкая проверка: хотя бы 2 соседа из 4 — чтобы не тыкать в одиночный антиалиас.
                const neighbors =
                    body[idx - 1] + body[idx + 1] + body[idx - w] + body[idx + w];
                if (neighbors < 2) continue;
            }
            samples.push({ x: (x + 0.5) / w, y: (y + 0.5) / h });
        }
    }
    return samples;
}

function buildOpaqueHitSamples(source, naturalW, naturalH) {
    const maxSide = 180;
    const scale = Math.min(1, maxSide / Math.max(naturalW, naturalH));
    const w = Math.max(1, Math.round(naturalW * scale));
    const h = Math.max(1, Math.round(naturalH * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(source, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;

    // Если canvas «пустой»/не прочитался — считаем это ошибкой чтения, не пустым спрайтом.
    let anyAlpha = 0;
    for (let p = 3; p < data.length; p += 4) {
        if (data[p]) {
            anyAlpha++;
            if (anyAlpha > 8) break;
        }
    }
    if (anyAlpha <= 8) {
        throw new Error('opaque-sample-empty-read');
    }

    // Сначала строже, потом мягче — тонкие силуэты всё равно должны дать точки.
    const attempts = [
        { alphaMin: 160, requireNeighbor: true },
        { alphaMin: 100, requireNeighbor: true },
        { alphaMin: 60, requireNeighbor: false },
        { alphaMin: 30, requireNeighbor: false }
    ];

    let samples = [];
    for (const attempt of attempts) {
        samples = collectBodySamples(data, w, h, attempt.alphaMin, attempt.requireNeighbor);
        if (samples.length >= 8) break;
    }

    if (!samples.length) return null;
    if (samples.length <= 1400) return samples;
    const step = Math.ceil(samples.length / 1400);
    return samples.filter((_, i) => i % step === 0);
}

function decodeImageForSampling(src) {
    return fetch(src)
        .then((res) => {
            if (!res.ok) throw new Error('opaque-sample-fetch-failed');
            return res.blob();
        })
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
            try {
                return buildOpaqueHitSamples(bitmap, bitmap.width, bitmap.height);
            } finally {
                bitmap.close?.();
            }
        });
}

function getPrecomputedEnemyOpaqueSamples(imgEl) {
    const rawSrc = imgEl?.getAttribute?.('src');
    if (!rawSrc || !window.ENEMY_ALPHA_MASKS) return null;

    const key = rawSrc.replace(/\\/g, '/').split(/[?#]/, 1)[0].replace(/^\.\//, '');
    const mask = window.ENEMY_ALPHA_MASKS[key];
    if (!mask?.p?.length || !mask.w || !mask.h) return null;

    if (mask.samples) return mask.samples;
    const samples = mask.p.map((index) => ({
        x: ((index % mask.w) + 0.5) / mask.w,
        y: (Math.floor(index / mask.w) + 0.5) / mask.h
    }));
    Object.defineProperty(mask, 'samples', { value: samples });
    return samples;
}

function ensureEnemyOpaqueSamples(imgEl) {
    if (!imgEl || !(imgEl instanceof HTMLImageElement)) return Promise.resolve(null);
    const src = imgEl.currentSrc || imgEl.src;
    if (!src) return Promise.resolve(null);

    const precomputed = getPrecomputedEnemyOpaqueSamples(imgEl);
    if (precomputed?.length) {
        enemyOpaqueHitCache.set(src, precomputed);
        return Promise.resolve(precomputed);
    }

    if (enemyOpaqueHitCache.has(src)) {
        return Promise.resolve(enemyOpaqueHitCache.get(src));
    }
    if (enemyOpaqueHitPending.has(src)) {
        return enemyOpaqueHitPending.get(src);
    }

    const finalize = (samples) => {
        enemyOpaqueHitCache.set(src, samples);
        return samples;
    };

    // Синхронно только если реально получили точки. null/ошибку не кэшируем навсегда сразу —
    // сначала пробуем blob/bitmap путь.
    try {
        if (imgEl.complete && imgEl.naturalWidth > 0) {
            const samples = buildOpaqueHitSamples(imgEl, imgEl.naturalWidth, imgEl.naturalHeight);
            if (samples?.length) {
                return Promise.resolve(finalize(samples));
            }
        }
    } catch (err) {
        // tainted canvas / file:// / empty read
    }

    const promise = decodeImageForSampling(src)
        .then((samples) => finalize(samples?.length ? samples : null))
        .catch(() => finalize(null))
        .finally(() => {
            enemyOpaqueHitPending.delete(src);
        });

    enemyOpaqueHitPending.set(src, promise);
    return promise;
}

function getEnemyOpaqueSamples(imgEl) {
    if (!imgEl || !(imgEl instanceof HTMLImageElement)) return null;
    const src = imgEl.currentSrc || imgEl.src;
    if (!src) return null;

    const precomputed = getPrecomputedEnemyOpaqueSamples(imgEl);
    if (precomputed?.length) {
        enemyOpaqueHitCache.set(src, precomputed);
        return precomputed;
    }

    if (enemyOpaqueHitCache.has(src)) return enemyOpaqueHitCache.get(src);
    ensureEnemyOpaqueSamples(imgEl);
    return enemyOpaqueHitCache.get(src) ?? null;
}

function pickOpaqueHitNormFromSamples(samples) {
    if (!samples?.length) return null;
    return samples[Math.floor(Math.random() * samples.length)];
}

// ==================== Прицеливание строго по силуэту (альфа-маска) ====================
//
// Универсальный механизм: попадание засчитывается только по непрозрачным пикселям
// спрайта, не по всему прямоугольнику вокруг него. Источник силуэта — та же цепочка
// getEnemyOpaqueSamples/ensureEnemyOpaqueSamples, что уже питает прицеливание стрелы
// Луки: сперва предпосчитанная маска из enemyAlphaMasks.js (мгновенно, без задержки),
// при её отсутствии — расчёт по холсту на лету (с тем же кэшем и тем же безопасным
// поведением при неудаче). Поэтому для НОВОГО противника ничего в этом блоке
// дописывать не нужно: как только для его картинки появится маска (или хотя бы
// один раз успешно посчитается холст), точный силуэт заработает сам собой.
const ENEMY_HIT_GRID_SIZE = 48; // разрешение сетки попадания; не привязано к разрешению маски
const HIT_GRID_NEIGHBOR_RADIUS = 1; // сглаживает разреженность выборки и края спрайта
const enemyHitGridCache = new Map(); // src -> Set(cellIndex) | null

function buildEnemyHitGrid(samples) {
    if (!samples?.length) return null;
    const size = ENEMY_HIT_GRID_SIZE;
    const grid = new Set();
    for (const sample of samples) {
        const gx = Math.min(size - 1, Math.max(0, Math.floor(sample.x * size)));
        const gy = Math.min(size - 1, Math.max(0, Math.floor(sample.y * size)));
        grid.add(gy * size + gx);
    }
    return grid;
}

function getEnemyHitGrid(imgEl) {
    if (!imgEl || !(imgEl instanceof HTMLImageElement)) return null;
    const src = imgEl.currentSrc || imgEl.src;
    if (!src) return null;

    if (enemyHitGridCache.has(src)) return enemyHitGridCache.get(src);

    const samples = getEnemyOpaqueSamples(imgEl);
    if (samples?.length) {
        const grid = buildEnemyHitGrid(samples);
        enemyHitGridCache.set(src, grid);
        return grid;
    }

    // Точки силуэта ещё не готовы (первый кадр после спавна, холст не досчитался
    // и т.п.) — не блокируем попадание насовсем, а досчитываем сетку в фоне и пока
    // возвращаем null: вызывающий код в этом случае временно подстрахуется старой
    // эллиптической проверкой (см. getEnemyAtPoint), а не оставит врага неуязвимым.
    ensureEnemyOpaqueSamples(imgEl).then((asyncSamples) => {
        enemyHitGridCache.set(src, buildEnemyHitGrid(asyncSamples));
    });
    return null;
}

/**
 * @returns {boolean|null} true — клик по непрозрачному пикселю силуэта,
 *   false — точно мимо (силуэт посчитан), null — силуэт для этой картинки
 *   ещё не готов, решение остаётся за вызывающим кодом.
 */
function isPointOverEnemySilhouette(enemy, clientX, clientY) {
    const imgEl = enemy?.element;
    if (!(imgEl instanceof HTMLImageElement)) return null;

    const rect = imgEl.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    const localWidth = imgEl.offsetWidth;
    const localHeight = imgEl.offsetHeight;
    if (!(localWidth > 0) || !(localHeight > 0)) return null;

    // Спрайт покачивается через CSS rotate(), поэтому getBoundingClientRect() отдаёт
    // расширенный AABB уже повёрнутой картинки, а не сами её границы. Разворачиваем
    // точку клика обратно в локальные координаты спрайта вокруг его геометрического
    // центра (он же центр вращения по умолчанию) — иначе на наклоне силуэт "уезжает".
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltDeg = Number(enemy.currentTiltAngle) || 0;
    const angleRad = -tiltDeg * Math.PI / 180;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const localDx = dx * cos - dy * sin;
    const localDy = dx * sin + dy * cos;

    const u = 0.5 + localDx / localWidth;
    const v = 0.5 + localDy / localHeight;
    if (u < 0 || u > 1 || v < 0 || v > 1) return false;

    const grid = getEnemyHitGrid(imgEl);
    if (!grid) return null;

    const size = ENEMY_HIT_GRID_SIZE;
    const gx = Math.min(size - 1, Math.max(0, Math.floor(u * size)));
    const gy = Math.min(size - 1, Math.max(0, Math.floor(v * size)));

    for (let ndy = -HIT_GRID_NEIGHBOR_RADIUS; ndy <= HIT_GRID_NEIGHBOR_RADIUS; ndy++) {
        const ny = gy + ndy;
        if (ny < 0 || ny >= size) continue;
        const rowBase = ny * size;
        for (let ndx = -HIT_GRID_NEIGHBOR_RADIUS; ndx <= HIT_GRID_NEIGHBOR_RADIUS; ndx++) {
            const nx = gx + ndx;
            if (nx < 0 || nx >= size) continue;
            if (grid.has(rowBase + nx)) return true;
        }
    }
    return false;
}

function syncLukaArrowMount(mount, enemyEl) {
    if (!mount?.isConnected) return;

    if (enemyEl?.isConnected) {
        const renderedStyle = getComputedStyle(enemyEl);
        mount.style.left = enemyEl.style.left || '0%';
        mount.style.top = enemyEl.style.top || '0%';
        // Берём уже интерполированную браузером матрицу. Иначе стрела получает
        // конечный угол раньше босса, у которого transform идёт через transition.
        mount.style.transform = renderedStyle.transform === 'none'
            ? 'none'
            : renderedStyle.transform;
    }

    // Для уничтоженной атаки оставляем стрелу в последней позиции;
    // у живого босса продолжаем повторять покачивание до исчезновения эффекта.
    requestAnimationFrame(() => syncLukaArrowMount(mount, enemyEl));
}

function showLukaArrowImpact(
    enemyEl,
    {
        isMini = false,
        isCritical = false,
        isCountShot = false,
        timing = isMini ? getHeroDeflectTiming() : getHeroAttackTiming(SHOT_INTERVAL)
    } = {}
) {
    if (!enemyEl || !enemiesContainer) return;

    const spawnAt = (hit) => {
        if (!hit || !enemyEl.isConnected || !enemiesContainer) return;
        if (enemyEl.offsetWidth < 2 || enemyEl.offsetHeight < 2) return;

        pruneImpactNodes(isMini ? '.luka-arrow-mount.is-mini' : '.luka-arrow-mount:not(.is-mini)', isMini ? 4 : 12);

        const mount = document.createElement('div');
        mount.className = `luka-arrow-mount${isMini ? ' is-mini' : ''}${isCritical ? ' is-critical' : ''}${isCountShot ? ' is-count-shot' : ''}`;
        mount.style.left = enemyEl.style.left || '0%';
        mount.style.top = enemyEl.style.top || '0%';
        mount.style.width = `${Math.max(1, enemyEl.offsetWidth)}px`;
        mount.style.height = `${Math.max(1, enemyEl.offsetHeight)}px`;
        mount.style.transform = enemyEl.style.transform || 'none';
        mount.style.transformOrigin = getComputedStyle(enemyEl).transformOrigin || '50% 50%';
        mount.setAttribute('aria-hidden', 'true');

        const impact = document.createElement('div');
        impact.className = `luka-boss-impact${isMini ? ' is-mini' : ''}${isCritical ? ' luka-boss-impact-critical' : ''}${isCountShot ? ' is-count-shot' : ''}`;
        impact.style.left = `${(hit.x * 100).toFixed(3)}%`;
        impact.style.top = `${(hit.y * 100).toFixed(3)}%`;
        impact.style.setProperty('--luka-arrow-rot', `${(Math.random() * 28 - 14).toFixed(1)}deg`);
        impact.style.setProperty('--luka-flight-x', `${(Math.random() * 20 - 10).toFixed(1)}px`);
        impact.style.setProperty('--luka-arrow-duration', `${Math.max(280, Math.round(timing.impactDelayMs / 0.18))}ms`);
        impact.style.setProperty('--luka-trail-duration', `${Math.max(120, timing.impactDelayMs)}ms`);
        impact.style.setProperty('--luka-ring-duration', `${Math.max(180, Math.round(timing.impactDelayMs / 0.7))}ms`);
        impact.style.setProperty('--luka-puncture-duration', `${Math.max(300, Math.round(timing.impactDelayMs / 0.19))}ms`);
        impact.innerHTML = `
            <span class="luka-puncture"></span>
            <span class="luka-impact-ring"></span>
            <span class="luka-impact-flash"></span>
            <span class="luka-flight-trail"></span>
            <span class="luka-count-fire"></span>
            <span class="luka-arrow"></span>
        `;
        mount.appendChild(impact);
        enemiesContainer.appendChild(mount);
        // Стрелы в живом боссе следуют за его покачиванием. Атака же сразу
        // сжимается при смерти, поэтому мини-стрелу оставляем в точке отбивания.
        if (!isMini) {
            syncLukaArrowMount(mount, enemyEl);
        }

        window.setTimeout(() => mount.remove(), 3100);
    };

    const ready = pickOpaqueHitNormFromSamples(getEnemyOpaqueSamples(enemyEl));
    if (ready) {
        spawnAt(ready);
        return;
    }

    ensureEnemyOpaqueSamples(enemyEl).then((samples) => {
        const hit = pickOpaqueHitNormFromSamples(samples);
        if (hit) {
            spawnAt(hit);
            return;
        }
        // Последний запасной вариант — центр спрайта, чтобы эффект не пропадал совсем.
        spawnAt({ x: 0.5, y: 0.45 });
    });
}

function showLukaBossImpact(
    boss,
    isCritical = false,
    isCountShot = false,
    timing = getHeroAttackTiming(SHOT_INTERVAL)
) {
    if (activeHeroObject?.name !== 'luka' || !boss?.element || !enemiesContainer || !gameField) return;
    showLukaArrowImpact(boss.element, { isMini: false, isCritical, isCountShot, timing });
}

function showLukaDeflectImpact(attackEnemy, isCritical = false, timing = getHeroDeflectTiming()) {
    if (activeHeroObject?.name !== 'luka' || !attackEnemy?.element || !enemiesContainer || !gameField) return;
    showLukaArrowImpact(attackEnemy.element, { isMini: true, isCritical, timing });
}

// Дарьяна: огонёк летит к цели по спирали (та же схема mount/impact, что у стрелы
// Луки — синк с покачиванием босса, размещение по силуэту через альфа-маску), но
// вместо прямого «вонзания» кружит по сужающейся спирали, прежде чем осесть.
function syncDaryanaFireMount(mount, enemyEl) {
    if (!mount?.isConnected) return;

    if (enemyEl?.isConnected) {
        const renderedStyle = getComputedStyle(enemyEl);
        mount.style.left = enemyEl.style.left || '0%';
        mount.style.top = enemyEl.style.top || '0%';
        mount.style.transform = renderedStyle.transform === 'none'
            ? 'none'
            : renderedStyle.transform;
    }

    requestAnimationFrame(() => syncDaryanaFireMount(mount, enemyEl));
}

function showDaryanaFireImpact(
    enemyEl,
    {
        isMini = false,
        isCritical = false,
        timing = isMini ? getHeroDeflectTiming() : getHeroAttackTiming(SHOT_INTERVAL)
    } = {}
) {
    if (!enemyEl || !enemiesContainer) return;

    const spawnAt = (hit) => {
        if (!hit || !enemyEl.isConnected || !enemiesContainer) return;
        if (enemyEl.offsetWidth < 2 || enemyEl.offsetHeight < 2) return;

        pruneImpactNodes(isMini ? '.daryana-fire-mount.is-mini' : '.daryana-fire-mount:not(.is-mini)', isMini ? 4 : 12);

        const mount = document.createElement('div');
        mount.className = `daryana-fire-mount${isMini ? ' is-mini' : ''}${isCritical ? ' is-critical' : ''}`;
        mount.style.left = enemyEl.style.left || '0%';
        mount.style.top = enemyEl.style.top || '0%';
        mount.style.width = `${Math.max(1, enemyEl.offsetWidth)}px`;
        mount.style.height = `${Math.max(1, enemyEl.offsetHeight)}px`;
        mount.style.transform = enemyEl.style.transform || 'none';
        mount.style.transformOrigin = getComputedStyle(enemyEl).transformOrigin || '50% 50%';
        mount.setAttribute('aria-hidden', 'true');

        const impact = document.createElement('div');
        impact.className = `daryana-boss-impact${isMini ? ' is-mini' : ''}${isCritical ? ' daryana-boss-impact-critical' : ''}`;
        impact.style.left = `${(hit.x * 100).toFixed(3)}%`;
        impact.style.top = `${(hit.y * 100).toFixed(3)}%`;
        // Сторона, с которой огонёк заходит и в которую сначала качнётся —
        // иначе все выстрелы летели бы и покачивались одинаково.
        impact.style.setProperty('--daryana-fly-dir', Math.random() < 0.5 ? '1' : '-1');
        // Полёт по прямой (по боссу) — неторопливый, с запасом от цикла атаки,
        // чтобы не выглядел «проматываемым». Отбитие атаки (mini) — по-прежнему
        // короткое: снаряд гибнет мгновенно, огоньку незачем задерживаться.
        const fireDurationMs = isMini
            ? Math.max(420, Math.min(900, Math.round(timing.cycleMs)))
            : Math.max(700, Math.min(1600, Math.round(timing.cycleMs * 1.3)));
        impact.style.setProperty('--daryana-fire-duration', `${fireDurationMs}ms`);
        impact.style.setProperty('--daryana-ring-duration', `${Math.max(150, Math.round(fireDurationMs * 0.22))}ms`);
        // Вспышка-«прощание» приходится на момент прибытия огонька (~70% полёта),
        // а не на его старт — иначе кольцо мигнёт ещё в воздухе, до цели.
        impact.style.setProperty('--daryana-arrival-delay', `${Math.round(fireDurationMs * 0.7)}ms`);
        if (isMini) {
            // При отбитии атаки огонёк не должен теряться на фоне снаряда —
            // высота примерно с саму атаку, даже чуть выше.
            const miniFireSize = Math.round(Math.max(1, enemyEl.offsetHeight) * 1.15);
            impact.style.setProperty('--daryana-mini-fire-size', `${miniFireSize}px`);
        }
        impact.innerHTML = `
            <span class="daryana-impact-ring"></span>
            <span class="daryana-impact-flash"></span>
            <span class="daryana-fire"></span>
        `;
        mount.appendChild(impact);
        enemiesContainer.appendChild(mount);
        if (!isMini) {
            syncDaryanaFireMount(mount, enemyEl);
        }

        window.setTimeout(() => mount.remove(), fireDurationMs + 200);
    };

    const ready = pickOpaqueHitNormFromSamples(getEnemyOpaqueSamples(enemyEl));
    if (ready) {
        spawnAt(ready);
        return;
    }

    ensureEnemyOpaqueSamples(enemyEl).then((samples) => {
        const hit = pickOpaqueHitNormFromSamples(samples);
        if (hit) {
            spawnAt(hit);
            return;
        }
        spawnAt({ x: 0.5, y: 0.45 });
    });
}

function showDaryanaBossImpact(boss, isCritical = false, timing = getHeroAttackTiming(SHOT_INTERVAL)) {
    if (activeHeroObject?.name !== 'daryana' || !boss?.element || !enemiesContainer || !gameField) return;
    showDaryanaFireImpact(boss.element, { isMini: false, isCritical, timing });
}

function showDaryanaDeflectImpact(attackEnemy, isCritical = false, timing = getHeroDeflectTiming()) {
    if (activeHeroObject?.name !== 'daryana' || !attackEnemy?.element || !enemiesContainer || !gameField) return;
    showDaryanaFireImpact(attackEnemy.element, { isMini: true, isCritical, timing });
}

// Мила: горошины летят и лопаются на попадании — та же mount/impact-схема
// с приклеиванием по силуэту (alpha-mask), что у стрелы Луки (см. showLukaArrowImpact
// выше), но БЕЗ направленного «втыкания под углом»: горох круглый, поэтому вместо
// luka-puncture/luka-flight-trail — простой хлопок (масштаб + вспышка + кольцо).
// Живёт короче стрелы (900мс против 3000мс) и обрезается агрессивнее (pruneImpactNodes) —
// при 100мс между выстрелами на экране иначе скопится слишком много горошин разом.
function syncMilaPeaMount(mount, enemyEl) {
    if (!mount?.isConnected) return;

    if (enemyEl?.isConnected) {
        const renderedStyle = getComputedStyle(enemyEl);
        mount.style.left = enemyEl.style.left || '0%';
        mount.style.top = enemyEl.style.top || '0%';
        mount.style.transform = renderedStyle.transform === 'none'
            ? 'none'
            : renderedStyle.transform;
    }

    requestAnimationFrame(() => syncMilaPeaMount(mount, enemyEl));
}

function showMilaPeaImpact(
    enemyEl,
    {
        isMini = false,
        isCritical = false,
        timing = isMini ? getHeroDeflectTiming() : getHeroAttackTiming(SHOT_INTERVAL)
    } = {}
) {
    if (!enemyEl || !enemiesContainer) return;

    const spawnAt = (hit) => {
        if (!hit || !enemyEl.isConnected || !enemiesContainer) return;
        if (enemyEl.offsetWidth < 2 || enemyEl.offsetHeight < 2) return;

        pruneImpactNodes(isMini ? '.mila-pea-mount.is-mini' : '.mila-pea-mount:not(.is-mini)', isMini ? 3 : 6);
        pruneImpactNodes('.mila-debris-burst', isMini ? 4 : 8);

        const mount = document.createElement('div');
        mount.className = `mila-pea-mount${isMini ? ' is-mini' : ''}${isCritical ? ' is-critical' : ''}`;
        mount.style.left = enemyEl.style.left || '0%';
        mount.style.top = enemyEl.style.top || '0%';
        mount.style.width = `${Math.max(1, enemyEl.offsetWidth)}px`;
        mount.style.height = `${Math.max(1, enemyEl.offsetHeight)}px`;
        mount.style.transform = enemyEl.style.transform || 'none';
        mount.style.transformOrigin = getComputedStyle(enemyEl).transformOrigin || '50% 50%';
        mount.setAttribute('aria-hidden', 'true');

        const impact = document.createElement('div');
        impact.className = `mila-boss-impact${isMini ? ' is-mini' : ''}${isCritical ? ' mila-boss-impact-critical' : ''}`;
        impact.style.left = `${(hit.x * 100).toFixed(3)}%`;
        impact.style.top = `${(hit.y * 100).toFixed(3)}%`;
        const peaDurationMs = Math.max(300, Math.round(timing.impactDelayMs / 0.2));
        impact.style.setProperty('--mila-pea-rot', `${(Math.random() * 360).toFixed(0)}deg`);
        impact.style.setProperty('--mila-fly-x', `${(Math.random() * 44 - 22).toFixed(1)}px`);
        impact.style.setProperty('--mila-pea-duration', `${peaDurationMs}ms`);
        impact.style.setProperty('--mila-ring-duration', `${Math.max(140, Math.round(peaDurationMs * 0.42))}ms`);
        impact.innerHTML = `
            <span class="mila-splat-ring"></span>
            <span class="mila-impact-flash"></span>
            <span class="mila-pea"></span>
        `;
        mount.appendChild(impact);
        enemiesContainer.appendChild(mount);
        if (!isMini) {
            syncMilaPeaMount(mount, enemyEl);
        }
        window.setTimeout(() => mount.remove(), peaDurationMs + 150);

        // Осколки — отдельный элемент в мировых координатах поля, НЕ привязанный
        // к боссу: горошина лопается и разлетается на месте попадания, а не едет
        // дальше вместе с боссом (тот может продолжать качаться/двигаться волной).
        // Живут заметно дольше самого перелёта горошины (1-1.5с, см. mila-debris-fly).
        const enemyRect = enemyEl.getBoundingClientRect();
        const containerRect = enemiesContainer.getBoundingClientRect();
        const burstPxX = enemyRect.left - containerRect.left + hit.x * enemyRect.width;
        const burstPxY = enemyRect.top - containerRect.top + hit.y * enemyRect.height;
        const burstDelayMs = Math.round(peaDurationMs * 0.6);
        const burst = document.createElement('div');
        burst.className = `mila-debris-burst${isCritical ? ' is-critical' : ''}`;
        burst.style.left = `${burstPxX.toFixed(1)}px`;
        burst.style.top = `${burstPxY.toFixed(1)}px`;
        burst.setAttribute('aria-hidden', 'true');
        const shardBaseAngle = Math.random() * 360;
        let maxPieceLifeMs = 0;
        burst.innerHTML = [0, 130, 250].map((offset) => {
            const angle = shardBaseAngle + offset + (Math.random() * 24 - 12);
            const dist = Math.round(90 + Math.random() * 80);
            const pieceDurationMs = Math.round(1000 + Math.random() * 500);
            maxPieceLifeMs = Math.max(maxPieceLifeMs, pieceDurationMs);
            return `<span class="mila-debris" style="--mila-shard-angle: ${angle.toFixed(0)}deg; --mila-shard-dist: ${dist}px; animation-duration: ${pieceDurationMs}ms; animation-delay: ${burstDelayMs}ms;"></span>`;
        }).join('');
        enemiesContainer.appendChild(burst);
        window.setTimeout(() => burst.remove(), burstDelayMs + maxPieceLifeMs + 100);
    };

    const ready = pickOpaqueHitNormFromSamples(getEnemyOpaqueSamples(enemyEl));
    if (ready) {
        spawnAt(ready);
        return;
    }

    ensureEnemyOpaqueSamples(enemyEl).then((samples) => {
        const hit = pickOpaqueHitNormFromSamples(samples);
        if (hit) {
            spawnAt(hit);
            return;
        }
        spawnAt({ x: 0.5, y: 0.45 });
    });
}

function showMilaBossImpact(boss, isCritical = false, timing = getHeroAttackTiming(SHOT_INTERVAL)) {
    if (activeHeroObject?.name !== 'mila' || !boss?.element || !enemiesContainer || !gameField) return;
    showMilaPeaImpact(boss.element, { isMini: false, isCritical, timing });
}

function showMilaDeflectImpact(attackEnemy, isCritical = false, timing = getHeroDeflectTiming()) {
    if (activeHeroObject?.name !== 'mila' || !attackEnemy?.element || !enemiesContainer || !gameField) return;
    showMilaPeaImpact(attackEnemy.element, { isMini: true, isCritical, timing });
}

// Тихон Речкин: удар веслом — тяжёлый двуручный замах, попадание в центр цели
// (та же схема getImpactFieldPercent, что у Еремея/Дуни, а не альфа-маска по
// силуэту, как у Луки/Дарьяны/Милы — оружие бьёт «по площади», не в конкретную
// точку). Три варианта замаха по кругу (не 10, как у Еремея, но та же идея
// разнообразия), плюс водяной всплеск на контакте — тематика «речкин»/река.
let tikhonSwingStep = 0;
const TIKHON_OAR_SWINGS = [
    'tikhon-oar-overhead',   // 1. замах сверху, смэш
    'tikhon-oar-diag-left',  // 2. диагональ справа-сверху налево-вниз
    'tikhon-oar-diag-right'  // 3. диагональ слева-сверху направо-вниз
];

function nextTikhonOarSwing() {
    const swingClass = TIKHON_OAR_SWINGS[tikhonSwingStep % TIKHON_OAR_SWINGS.length];
    tikhonSwingStep += 1;
    return swingClass;
}

function showTikhonBossImpact(boss, isCritical = false, timing = getHeroAttackTiming(SHOT_INTERVAL)) {
    if (activeHeroObject?.name !== 'tikhon' || !boss?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(boss.element);
    if (!pos) return;

    enemiesContainer.querySelectorAll('.tikhon-boss-impact:not(.is-mini)').forEach((node) => node.remove());

    const swingClass = nextTikhonOarSwing();
    const swingDurationMs = Math.max(180, Math.round(timing.impactDelayMs / 0.58));

    const impact = document.createElement('div');
    impact.className = `tikhon-boss-impact${isCritical ? ' tikhon-boss-impact-critical' : ''}`;
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    impact.style.setProperty('--tikhon-swing-duration', `${swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');
    impact.innerHTML = `
        <span class="tikhon-splash-ring"></span>
        <span class="tikhon-impact-flash"></span>
        <span class="tikhon-oar ${swingClass}"></span>
    `;
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), swingDurationMs + 220);
}

function showTikhonDeflectImpact(attackEnemy, isCritical = false, timing = getHeroDeflectTiming()) {
    if (activeHeroObject?.name !== 'tikhon' || !attackEnemy?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(attackEnemy.element);
    if (!pos) return;

    pruneImpactNodes('.tikhon-boss-impact.is-mini', 3);

    const swingDurationMs = Math.max(140, Math.round(timing.impactDelayMs / 0.5));

    const impact = document.createElement('div');
    impact.className = `tikhon-boss-impact is-mini${isCritical ? ' tikhon-boss-impact-critical' : ''}`;
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    impact.style.setProperty('--tikhon-swing-duration', `${swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');
    impact.innerHTML = `
        <span class="tikhon-splash-ring"></span>
        <span class="tikhon-impact-flash"></span>
        <span class="tikhon-oar tikhon-oar-mini-tap"></span>
    `;
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), swingDurationMs + 220);
}

// Еремей: цикл двуручных ударов дубиной (горизонталь / overhead / диагонали / sweep / chop).
// Контакт в keyframes ~61–62% — совпадает с impactDelayMs / 0.62.
let eremeiComboStep = 0;
const EREMEI_CLUB_SWINGS = [
    'eremei-club-from-left',   // 1. горизонталь L→R
    'eremei-club-from-right',  // 2. горизонталь R→L
    'eremei-club-from-top',    // 3. overhead smash
    'eremei-club-from-bottom', // 4. rising uppercut
    'eremei-club-diag-tr',     // 5. диагональ ↘
    'eremei-club-diag-tl',     // 6. диагональ ↙
    'eremei-club-diag-br',     // 7. восходящая ↗
    'eremei-club-smash',       // 8. тяжёлый overhead с замахом
    'eremei-club-sweep',       // 9. широкий круговой sweep
    'eremei-club-chop'         // 10. короткий 10-to-2 chop
];

function nextEremeiClubSwing() {
    const swingClass = EREMEI_CLUB_SWINGS[eremeiComboStep % EREMEI_CLUB_SWINGS.length];
    eremeiComboStep += 1;
    return swingClass;
}

function renderEremeiImpactHtml(swingClass, { isMini = false, isCritical = false } = {}) {
    const rings = isMini
        ? `<span class="eremei-force eremei-force-ring eremei-force-ring-a"></span>`
        : `
        <span class="eremei-force eremei-force-ring eremei-force-ring-a"></span>
        <span class="eremei-force eremei-force-ring eremei-force-ring-b"></span>`;
    const debris = isMini
        ? `
        <span class="eremei-debris eremei-debris-1"></span>
        <span class="eremei-debris eremei-debris-2"></span>
        <span class="eremei-debris eremei-debris-3"></span>`
        : `
        <span class="eremei-debris eremei-debris-1"></span>
        <span class="eremei-debris eremei-debris-2"></span>
        <span class="eremei-debris eremei-debris-3"></span>
        <span class="eremei-debris eremei-debris-4"></span>
        <span class="eremei-debris eremei-debris-5"></span>`;
    const dust = isMini
        ? `<span class="eremei-dust eremei-dust-a"></span>`
        : `
        <span class="eremei-dust eremei-dust-a"></span>
        <span class="eremei-dust eremei-dust-b"></span>`;
    const critFx = isCritical
        ? `
        <span class="eremei-crit-shock"></span>
        <span class="eremei-crit-flash"></span>
        <span class="eremei-club eremei-club-crit-ghost"></span>`
        : '';
    const clubClass = isCritical ? 'eremei-club-crit' : swingClass;
    // Лёгкий смазанный "хвост" за дубиной на обычных замахах — усиливает ощущение скорости/веса удара.
    const trail = (!isMini && !isCritical)
        ? `<span class="eremei-club eremei-club-trail ${swingClass}"></span>`
        : '';

    return `
        ${rings}
        <span class="eremei-heavy-core"></span>
        ${dust}
        ${debris}
        ${critFx}
        <span class="eremei-impact-spark"></span>
        ${trail}
        <span class="eremei-club ${clubClass}"></span>
    `;
}

function triggerEremeiCritScreenShake({ isMini = false } = {}) {
    if (!gameField) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

    const shakeClass = isMini ? 'eremei-screen-shake-mini' : 'eremei-screen-shake';
    const durationMs = isMini ? 280 : 420;
    gameField.classList.remove('eremei-screen-shake', 'eremei-screen-shake-mini');
    // restart CSS animation if shake is already playing
    void gameField.offsetWidth;
    gameField.classList.add(shakeClass);
    window.setTimeout(() => gameField?.classList.remove(shakeClass), durationMs + 40);
}

// Лёгкий "пуш" экрана на КАЖДЫЙ удар Еремея по боссу (не только крит) —
// даёт ощущение веса удара без утомительной тряски на каждый чих.
function triggerEremeiHitPunch() {
    if (!gameField) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

    gameField.classList.remove('eremei-screen-punch');
    void gameField.offsetWidth;
    gameField.classList.add('eremei-screen-punch');
    window.setTimeout(() => gameField?.classList.remove('eremei-screen-punch'), 190);
}

function showEremeiBossImpact(boss, isCritical = false, timing = getHeroAttackTiming(SHOT_INTERVAL)) {
    if (activeHeroObject?.name !== 'eremei' || !boss?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(boss.element);
    if (!pos) return;

    enemiesContainer.querySelectorAll('.eremei-boss-impact:not(.is-mini)').forEach((node) => node.remove());

    const swingClass = isCritical ? null : nextEremeiClubSwing();
    const swingDurationMs = Math.max(140, Math.round(timing.impactDelayMs / 0.62));

    const impact = document.createElement('div');
    impact.className = `eremei-boss-impact${isCritical ? ' eremei-boss-impact-critical' : ''}`;
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    impact.style.setProperty('--eremei-swing-duration', `${swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');
    impact.innerHTML = renderEremeiImpactHtml(swingClass, { isCritical });
    enemiesContainer.appendChild(impact);

    const contactAtMs = Math.round(swingDurationMs * 0.62);
    window.setTimeout(() => {
        if (isCritical) {
            triggerEremeiCritScreenShake();
        } else {
            triggerEremeiHitPunch();
        }
        playEremeiImpactThud(isCritical);
    }, contactAtMs);

    window.setTimeout(() => impact.remove(), swingDurationMs + 160);
}

function showEremeiDeflectImpact(attackEnemy, isCritical = false, timing = getHeroDeflectTiming()) {
    if (activeHeroObject?.name !== 'eremei' || !attackEnemy?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(attackEnemy.element);
    if (!pos) return;

    pruneImpactNodes('.eremei-boss-impact.is-mini', 3);

    // Отбивание снарядов: только обычный замах, без крит-VFX и тряски.
    const swingClass = nextEremeiClubSwing();
    const swingDurationMs = Math.max(120, Math.round(timing.impactDelayMs / 0.62));

    const impact = document.createElement('div');
    impact.className = 'eremei-boss-impact is-mini';
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    impact.style.setProperty('--eremei-swing-duration', `${swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');
    impact.innerHTML = renderEremeiImpactHtml(swingClass, { isMini: true, isCritical: false });
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), swingDurationMs + 100);
}

// Дуня: dual-wield комбо обычных атак (вихри отдельно).
// delayMs — относительный вес старта второй метёлки; масштаб под интервал атаки.
let dunyaComboStep = 0;
const DUNYA_CONTACT_RATIO = 0.58;
const DUNYA_DUAL_COMBOS = [
    // 1. Горизонталь: справа → слева
    [
        { swing: 'dunya-broom-from-right', delayMs: 0 },
        { swing: 'dunya-broom-from-left', delayMs: 130 }
    ],
    // 2. Горизонталь: слева → справа
    [
        { swing: 'dunya-broom-from-left', delayMs: 0 },
        { swing: 'dunya-broom-from-right', delayMs: 130 }
    ],
    // 3. Вертикаль: сверху → снизу
    [
        { swing: 'dunya-broom-from-top', delayMs: 0 },
        { swing: 'dunya-broom-from-bottom', delayMs: 130 }
    ],
    // 4. Вертикаль: снизу → сверху
    [
        { swing: 'dunya-broom-from-bottom', delayMs: 0 },
        { swing: 'dunya-broom-from-top', delayMs: 130 }
    ],
    // 5. Крест: диагональ ↘ затем ↙
    [
        { swing: 'dunya-broom-diag-tr', delayMs: 0 },
        { swing: 'dunya-broom-diag-tl', delayMs: 145 }
    ],
    // 6. Крест наоборот: ↙ затем ↘
    [
        { swing: 'dunya-broom-diag-tl', delayMs: 0 },
        { swing: 'dunya-broom-diag-tr', delayMs: 145 }
    ],
    // 7. Восходящий крест: ↗ затем ↖
    [
        { swing: 'dunya-broom-diag-br', delayMs: 0 },
        { swing: 'dunya-broom-diag-bl', delayMs: 145 }
    ],
    // 8. Ножницы: обе метёлки почти одновременно к центру
    [
        { swing: 'dunya-broom-scissor-left', delayMs: 0 },
        { swing: 'dunya-broom-scissor-right', delayMs: 35 }
    ],
    // 9. Смешанная: боковой → рубящий
    [
        { swing: 'dunya-broom-from-right', delayMs: 0 },
        { swing: 'dunya-broom-from-top', delayMs: 125 }
    ],
    // 10. Смешанная: боковой → подсекающий
    [
        { swing: 'dunya-broom-from-left', delayMs: 0 },
        { swing: 'dunya-broom-from-bottom', delayMs: 125 }
    ]
];

const DUNYA_WHIRL_CONFIG = {
    // Полные обороты «как часовые стрелки»; тройная — быстрее, джекпот — больше оборотов
    double: { count: 4, durationMs: 900, spins: 1, sizeClass: 'dunya-whirl-double' },
    triple: { count: 6, durationMs: 580, spins: 1, sizeClass: 'dunya-whirl-triple' },
    jackpot: { count: 8, durationMs: 1300, spins: 2, sizeClass: 'dunya-whirl-jackpot' }
};

function buildDunyaComboTiming(combo, timing, { isMini = false } = {}) {
    const swingDurationMs = timing.cycleMs;
    const sparkDurationMs = Math.max(isMini ? 100 : 140, Math.round(swingDurationMs * 0.42));
    const maxDelayWeight = Math.max(0, ...combo.map((hit) => hit.delayMs || 0));
    const availableGap = Math.max(0, timing.impactDelayMs - swingDurationMs * DUNYA_CONTACT_RATIO);
    const delayScale = maxDelayWeight > 0 ? availableGap / maxDelayWeight : 0;

    let totalMs = swingDurationMs;
    // След рисуется чуть после старта метлы и доходит до контакта (~58%)
    const trailLagMs = Math.round(swingDurationMs * 0.18);

    const hits = combo.map((hit, index) => {
        const delay = Math.round((hit.delayMs || 0) * delayScale);
        const contact = delay + swingDurationMs * DUNYA_CONTACT_RATIO;
        const sparkDelay = Math.max(0, Math.round(contact - sparkDurationMs * 0.4));
        const trailDelay = delay + trailLagMs;
        totalMs = Math.max(totalMs, delay + swingDurationMs);
        return { swing: hit.swing, delay, trailDelay, sparkDelay, index };
    });

    return { swingDurationMs, sparkDurationMs, totalMs, hits };
}

const DUNYA_TRAIL_BY_SWING = {
    'dunya-broom-from-left': { trail: 'dunya-trail-h-lr', path: 'M 8 58 C 28 22, 72 22, 92 58' },
    'dunya-broom-from-right': { trail: 'dunya-trail-h-rl', path: 'M 92 42 C 72 78, 28 78, 8 42' },
    'dunya-broom-from-top': { trail: 'dunya-trail-v-tb', path: 'M 38 8 C 78 28, 78 72, 38 92' },
    'dunya-broom-from-bottom': { trail: 'dunya-trail-v-bt', path: 'M 62 92 C 22 72, 22 28, 62 8' },
    'dunya-broom-diag-tl': { trail: 'dunya-trail-d-tl', path: 'M 14 18 C 34 28, 66 66, 86 82' },
    'dunya-broom-diag-tr': { trail: 'dunya-trail-d-tr', path: 'M 86 18 C 66 28, 34 66, 14 82' },
    'dunya-broom-diag-bl': { trail: 'dunya-trail-d-bl', path: 'M 14 82 C 34 66, 66 28, 86 18' },
    'dunya-broom-diag-br': { trail: 'dunya-trail-d-br', path: 'M 86 82 C 66 66, 34 28, 14 18' },
    'dunya-broom-scissor-left': { trail: 'dunya-trail-sc-l', path: 'M 10 50 C 30 34, 55 34, 78 50' },
    'dunya-broom-scissor-right': { trail: 'dunya-trail-sc-r', path: 'M 90 50 C 70 66, 45 66, 22 50' }
};

function renderDunyaComboBrooms(hits) {
    return hits.map((hit) => {
        const trail = DUNYA_TRAIL_BY_SWING[hit.swing] || DUNYA_TRAIL_BY_SWING['dunya-broom-from-left'];
        return `
        <span class="dunya-broom ${hit.swing}" style="animation-delay: ${hit.delay}ms">
            <span class="dunya-broom-orbit" aria-hidden="true">
                <span class="dunya-orbit-ring dunya-orbit-ring-a"></span>
                <span class="dunya-orbit-ring dunya-orbit-ring-b"></span>
                <span class="dunya-orbit-ring dunya-orbit-ring-c"></span>
            </span>
        </span>
        <svg class="dunya-swing-trail ${trail.trail}" viewBox="0 0 100 100" style="animation-delay: ${hit.trailDelay}ms" aria-hidden="true">
            <path class="dunya-trail-path dunya-trail-path-soft" d="${trail.path}" pathLength="1" style="animation-delay: ${hit.trailDelay}ms"></path>
            <path class="dunya-trail-path" d="${trail.path}" pathLength="1" style="animation-delay: ${hit.trailDelay}ms"></path>
        </svg>
        <span class="dunya-impact-spark dunya-impact-spark-${hit.index + 1}" style="animation-delay: ${hit.sparkDelay}ms"></span>
    `;
    }).join('');
}

function showDunyaBossImpact(
    boss,
    isCritical = false,
    attackKind = 'normal',
    timing = getHeroAttackTiming(SHOT_INTERVAL)
) {
    if (activeHeroObject?.name !== 'dunya' || !boss?.element || !enemiesContainer || !gameField) return;

    if (attackKind === 'double' || attackKind === 'triple' || attackKind === 'jackpot') {
        showDunyaWhirlImpact(boss, isCritical, attackKind, timing);
        return;
    }

    const pos = getImpactFieldPercent(boss.element);
    if (!pos) return;

    enemiesContainer.querySelectorAll('.dunya-boss-impact:not(.is-mini)').forEach((node) => node.remove());

    const combo = DUNYA_DUAL_COMBOS[dunyaComboStep % DUNYA_DUAL_COMBOS.length];
    dunyaComboStep += 1;
    const comboTiming = buildDunyaComboTiming(combo, timing);

    const impact = document.createElement('div');
    impact.className = `dunya-boss-impact${isCritical ? ' dunya-boss-impact-critical' : ''}`;
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    impact.style.setProperty('--dunya-swing-duration', `${comboTiming.swingDurationMs}ms`);
    impact.style.setProperty('--dunya-spark-duration', `${comboTiming.sparkDurationMs}ms`);
    impact.style.setProperty('--dunya-wind-duration', `${comboTiming.swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');

    impact.innerHTML = renderDunyaComboBrooms(comboTiming.hits);
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), comboTiming.totalMs + 120);
}

function showDunyaDeflectImpact(attackEnemy, isCritical = false, timing = getHeroDeflectTiming()) {
    if (activeHeroObject?.name !== 'dunya' || !attackEnemy?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(attackEnemy.element);
    if (!pos) return;

    pruneImpactNodes('.dunya-boss-impact.is-mini', 3);

    const combo = DUNYA_DUAL_COMBOS[dunyaComboStep % DUNYA_DUAL_COMBOS.length];
    dunyaComboStep += 1;
    const comboTiming = buildDunyaComboTiming(combo, timing, { isMini: true });

    const impact = document.createElement('div');
    impact.className = `dunya-boss-impact is-mini${isCritical ? ' dunya-boss-impact-critical' : ''}`;
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    impact.style.setProperty('--dunya-swing-duration', `${comboTiming.swingDurationMs}ms`);
    impact.style.setProperty('--dunya-spark-duration', `${comboTiming.sparkDurationMs}ms`);
    impact.style.setProperty('--dunya-wind-duration', `${comboTiming.swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');

    impact.innerHTML = renderDunyaComboBrooms(comboTiming.hits);
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), comboTiming.totalMs + 100);
}

function showDunyaWhirlImpact(
    boss,
    isCritical,
    attackKind,
    timing = getHeroAttackTiming(SHOT_INTERVAL)
) {
    const pos = getImpactFieldPercent(boss.element);
    if (!pos || !enemiesContainer) return;

    const config = DUNYA_WHIRL_CONFIG[attackKind];
    if (!config) return;

    enemiesContainer.querySelectorAll('.dunya-boss-impact:not(.is-mini)').forEach((node) => node.remove());

    const impact = document.createElement('div');
    impact.className = [
        'dunya-boss-impact',
        'dunya-whirl',
        config.sizeClass,
        isCritical ? 'dunya-boss-impact-critical' : ''
    ].filter(Boolean).join(' ');
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    const whirlDurationMs = timing.cycleMs;
    impact.style.setProperty('--whirl-duration', `${whirlDurationMs}ms`);
    impact.style.setProperty('--whirl-spins', String(config.spins));
    impact.setAttribute('aria-hidden', 'true');

    const brooms = Array.from({ length: config.count }, (_, index) => {
        const angle = (360 / config.count) * index;
        return `<span class="dunya-broom dunya-whirl-broom" style="--whirl-angle: ${angle}deg"></span>`;
    }).join('');

    impact.innerHTML = `
        <span class="dunya-wind dunya-wind-swirl dunya-wind-swirl-1"></span>
        <span class="dunya-wind dunya-wind-swirl dunya-wind-swirl-2"></span>
        <span class="dunya-wind dunya-wind-swirl dunya-wind-swirl-3"></span>
        <span class="dunya-wind dunya-wind-gust"></span>
        <span class="dunya-whirl-ring"></span>
        <span class="dunya-whirl-core"></span>
        ${brooms}
    `;
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), whirlDurationMs + 100);
}

function createDamageText(damage, xPercent, yPercent, isCritical = false) {
    // CSS-анимация в Яндекс.Браузере на Android то пропадает, то идёт рывками —
    // двигаем текст через rAF (как надёжный fallback)
    if (!damageContainer) return;

    while (damageContainer.childElementCount > 8) {
        damageContainer.removeChild(damageContainer.firstChild);
    }

    const damageText = document.createElement('div');
    damageText.className = isCritical ? 'damage-text damage-critical' : 'damage-text';
    damageText.textContent = `-${damage}`;
    damageText.style.left = xPercent + '%';
    damageText.style.top = yPercent + '%';
    damageText.style.opacity = '1';
    damageText.style.animation = 'none';
    damageText.style.webkitAnimation = 'none';
    damageText.style.transform = 'translateY(0px) scale(1)';

    damageContainer.appendChild(damageText);

    const duration = isCritical ? 1200 : 1000;
    const travelY = isCritical ? -70 : -50;
    const endScale = isCritical ? 1.7 : 1.45;
    const start = performance.now();

    function frame(now) {
        if (!damageText.parentNode) return;

        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3); // ease-out
        const y = travelY * ease;
        const scale = 1 + (endScale - 1) * ease;
        // держим видимым большую часть полёта (Яндекс не любит мгновенный opacity:0)
        const opacity = t < 0.75 ? 1 : 1 - ((t - 0.75) / 0.25);

        damageText.style.transform = 'translateY(' + y + 'px) scale(' + scale + ')';
        damageText.style.opacity = String(Math.max(0, opacity));

        if (t < 1) {
            requestAnimationFrame(frame);
        } else if (damageText.parentNode) {
            damageText.parentNode.removeChild(damageText);
        }
    }

    requestAnimationFrame(frame);
}

/**
 * Дает опыт игроку за убийство врага
 * @param {string} enemyType - тип убитого врага
 */
function giveExperienceForKill(enemyType) {
    if (!ENEMY_TYPES[enemyType]) return;
    
    // Базовый опыт из ENEMY_TYPES умножаем на глобальный множитель опыта
    const baseExp = ENEMY_TYPES[enemyType].baseExp;
    const expGained = Math.round(baseExp);
    
    playerExp += expGained;
    updateExperienceDisplay();
    
    console.log(`Получено ${expGained} опыта (база: ${baseExp} Всего: ${playerExp}/${expToNextLevel}`);
    
    // Обновляем отображение текущего опыта
    const playerExpElement = document.getElementById('playerExp');
    const expToNextLevelElement = document.getElementById('expToNextLevel');
    if (playerExpElement) playerExpElement.textContent = playerExp;
    if (expToNextLevelElement) expToNextLevelElement.textContent = expToNextLevel;
    
    if (playerExp >= expToNextLevel) {
        processLevelUp();
    }
}

function waitMs(ms) {
    return new Promise(resolve => setTimeout(resolve, Math.max(0, ms)));
}

const UNIVERSAL_BOSS_DEATH = Object.freeze({
    preset: 'flyBackPerspective',
    durationMs: 1200
});

/**
 * Пока для всех боссов одна универсальная смерть.
 * Поле deathAnimation в ENEMY_TYPES можно будет снова использовать позже.
 */
function resolveBossDeathAnimation(_bossType) {
    return { ...UNIVERSAL_BOSS_DEATH };
}

function playGenericEnemyDeathVisual(enemy) {
    if (!enemy?.element) return;
    enemy.element.style.transition = 'all 0.3s ease';
    enemy.element.style.opacity = '0';
    enemy.applyDeathTransform();
    setTimeout(() => {
        enemy.remove();
    }, 300);
}

/**
 * Запускает визуал смерти. Для босса — особая последовательность.
 * @returns {boolean} true, если это смерть босса (визуал уже ведёт sequence)
 */
function beginEnemyDeathVisual(enemy, cause = 'player') {
    clearEliseyBeesForEnemy(enemy);
    if (enemy?.type === bossAliveName || enemy?.isBoss) {
        handleBossDeathSequence(enemy, cause);
        return true;
    }
    handleEnemyDeath(enemy, cause);
    return false;
}

function playBossDeathAnimation(enemy, config) {
    const el = enemy?.element;
    if (!el) return Promise.resolve();

    el.classList.remove('enemy-hit', 'enemy-wounded', 'boss-attack-paused', 'boss-attack-rush');
    el.style.filter = '';
    el.style.transition = 'none';
    el.style.setProperty('--boss-death-duration', `${config.durationMs}ms`);
    el.classList.add('boss-dying', `boss-death--${config.preset}`);

    return waitMs(config.durationMs).then(() => {
        enemy.remove();
    });
}

/**
 * Атаки улетают вслед за боссом в ту же точку перспективы (верх/центр),
 * с небольшой задержкой — сначала босс, затем снаряды.
 */
function chaseAttacksAfterBoss(attacks, boss, durationMs) {
    if (!attacks.length) return Promise.resolve();

    const fieldRect = gameField?.getBoundingClientRect?.();
    if (!fieldRect || fieldRect.width <= 0 || fieldRect.height <= 0) {
        return fadeOutEnemiesQuick(attacks, Math.min(durationMs, 400));
    }

    const bossRect = boss?.element?.getBoundingClientRect?.();
    const vanishX = bossRect
        ? bossRect.left + bossRect.width / 2
        : fieldRect.left + fieldRect.width * 0.5;
    const vanishY = fieldRect.top + fieldRect.height * 0.04;

    const ordered = [...attacks].sort((a, b) => (a.y || 0) - (b.y || 0));

    const tasks = ordered.map((attack, index) => {
        const el = attack.element;
        if (!el) return Promise.resolve();

        attack.isInert = true;
        el.classList.remove('boss-attack-paused', 'boss-attack-rush');

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dxVw = ((vanishX - centerX) / window.innerWidth) * 100 * 1.12;
        const dyVh = ((vanishY - centerY) / window.innerHeight) * 100 * 1.08;
        // Ниже на поле — позже стартуют, будто догоняют босса.
        const delay = 70 + index * 42 + Math.floor(Math.random() * 30);

        el.style.transition = 'none';
        el.style.setProperty('--flyback-x', `${dxVw.toFixed(1)}vw`);
        el.style.setProperty('--flyback-y', `${dyVh.toFixed(1)}vh`);
        el.style.setProperty('--flyback-duration', `${durationMs}ms`);
        el.style.setProperty('--flyback-delay', `${delay}ms`);
        el.classList.add('boss-attack-flyback');

        return waitMs(durationMs + delay).then(() => attack.remove());
    });

    return Promise.all(tasks);
}

function fadeOutEnemiesQuick(enemies, durationMs = 350) {
    if (!enemies.length) return Promise.resolve();

    const tasks = enemies.map(enemy => {
        const el = enemy.element;
        if (!el) return Promise.resolve();

        enemy.isInert = true;
        el.style.transition = `opacity ${durationMs}ms ease, transform ${durationMs}ms ease`;
        el.style.opacity = '0';
        el.style.transform = 'scale(0.35) rotate(20deg)';
        return waitMs(durationMs).then(() => enemy.remove());
    });

    return Promise.all(tasks);
}

// Число гарантированных окон выбора временного улучшения после побед над
// небоссами-финалами уровня (боссы 1-4 из 5). Не связано с опытом/уровнем
// игрока — та механика (giveExperienceForKill → processLevelUp) остаётся
// нетронутой и может пригодиться отдельно для других режимов.
// 3 → 1 по решению пользователя (вместе с ростом базовой доли 18%→54% — три старых
// окна по 18% и одно новое по 54% дают тот же суммарный прирост за одного босса).
const BOSS_KILL_UPGRADE_CHOICES = 1;

async function awardBossKillUpgradeChoices(count = BOSS_KILL_UPGRADE_CHOICES) {
    for (let i = 0; i < count; i++) {
        await showLevelUpModal('🏆 НАГРАДА ЗА ПОБЕДУ 🏆', 'Выберите одно временное улучшение:');
    }
}

async function finalizeBossDefeatAftermath(enemy, isFinalBoss) {
    bossDeathSequenceActive = false;

    if (isFinalBoss) {
        pauseGame();
        showEndGameModal(true, timeSec2);
        return;
    }

    window.battleMusic?.setContext(buildBattleMusicContext(bossM[0]));
    await awardBossKillUpgradeChoices();
    // giveExperienceForKill здесь намеренно не вызывается — гарантированное
    // окно полностью заменяет опыт за победу над боссом. Сама функция
    // (и вся цепочка processLevelUp/handleLevelUps) не тронута и остаётся
    // доступной для других режимов, где опыт снова понадобится.
    timeNextBoss = timeSec2 + bossInterval;
    enableSpawning();
}

/**
 * Смерть босса: стоп атак → параллельно deathAnimation босса + рассыпание снарядов
 * → только потом апгрейд / победа / следующий босс.
 */
function handleBossDeathSequence(enemy, cause = 'player') {
    if (enemy.isBossDying || bossDeathSequenceActive) return;
    enemy.isBossDying = true;
    enemy.isInert = true;

    countDefeatBoss++;

    const defeatedBossIndex = bossM.indexOf(enemy.type);
    if (defeatedBossIndex !== -1) {
        bossM.splice(defeatedBossIndex, 1);
    }

    const isFinalBoss = bossM.length === 0;

    // 1) Останавливаем новые атаки и телеграфы сразу.
    stopBossEvents();
    hideBossHealthBar();
    currentBoss = null;
    bossDeathSequenceActive = true;
    disableSpawning();

    const attacks = activeEnemies.filter(item => item !== enemy && item.isCustom);
    const others = activeEnemies.filter(item => item !== enemy && !item.isCustom);

    // Снимаем с симуляции, но DOM оставляем для анимаций.
    activeEnemies.length = 0;
    attacks.forEach(attack => {
        attack.isInert = true;
    });
    others.forEach(other => {
        other.isInert = true;
    });

    const deathConfig = resolveBossDeathAnimation(enemy.type);
    const chaseDuration = deathConfig.durationMs + 180;

    Promise.all([
        playBossDeathAnimation(enemy, deathConfig),
        chaseAttacksAfterBoss(attacks, enemy, chaseDuration),
        fadeOutEnemiesQuick(others, 380)
    ]).then(() => {
        finalizeBossDefeatAftermath(enemy, isFinalBoss);
    }).catch(error => {
        console.warn('Ошибка анимации смерти босса:', error);
        enemy.remove?.();
        attacks.forEach(attack => attack.remove?.());
        others.forEach(other => other.remove?.());
        finalizeBossDefeatAftermath(enemy, isFinalBoss);
    });
}

function handleEnemyDeath(enemy, cause = 'player') {
    // Не-боссы: награды/логика при необходимости. Сейчас опыт только у боссов.
    if (enemy?.type === bossAliveName) {
        handleBossDeathSequence(enemy, cause);
    }
}

function killAllEnemies() {
    const enemiesToKill = [...activeEnemies];
    activeEnemies.length = 0;

    enemiesToKill.forEach(enemy => {
        enemy.isInert = true;
        playGenericEnemyDeathVisual(enemy);
    });

    console.log(`Уничтожено ${enemiesToKill.length} врагов`);
}

//=====================Подписки на события и особенности героев========================

/**
 * Еремей — «Лови обратно»:
 * после получения урона временно повышает шанс крита.
 * Состояние живёт только в бою и сбрасывается при рестарте уровня.
 */
const EREMEI_CATCH_BACK = Object.freeze({
    critChanceBonus: 0.10,
    durationMs: 3000
});

let eremeiCatchBackUntilMs = 0;

/**
 * Тихон Речкин — «Дрожащая рука»: непрерывная треугольная волна (не событие,
 * не реакция на удар — идёт с самого начала боя и никогда не останавливается),
 * которая одновременно множит урон и добавляет к шансу крита. cycleMs — полный
 * период: первая половина — рост от Min до Max, вторая половина — спад обратно
 * до Min, дальше по кругу. tikhonShakeStartMs — момент t=0 волны для ТЕКУЩЕГО
 * захода на уровень, лениво выставляется при первом обращении после reset'а
 * (см. resetHeroFeatureCombatState) — так и реальная игра, и виртуальные часы
 * probe-скрипта панели баланса (см. admin-balance-panel.html) стартуют волну
 * с одной и той же фазы, без расхождений.
 */
const TIKHON_SHAKE = Object.freeze({
    cycleMs: 6000,
    damageMultiplierMin: 0.01,
    damageMultiplierMax: 2.0,
    critChanceBonusMin: 0.01,
    critChanceBonusMax: 0.50
});

let tikhonShakeStartMs = null;

/**
 * Дарьяна — «Прогревание»: за каждый недостающий 1% HP цели урон растёт на
 * missingHpDamagePerPercent (1.5% по умолчанию). Чистая функция от текущего
 * HP цели — состояние не хранится и ничего не нужно сбрасывать при смене
 * босса или рестарте уровня.
 */
function getDaryanaMissingHpPerPercent() {
    return Math.max(0, Number(activeHeroObject?.missingHpDamagePerPercent) || 0);
}

function getDaryanaMissingHpMultiplier(target) {
    if (activeHeroObject?.name !== 'daryana') return 1;
    if (!target || !Number.isFinite(target.maxHP) || target.maxHP <= 0) return 1;

    const missingHpFraction = Math.max(0, Math.min(1, 1 - (target.hp / target.maxHP)));
    return 1 + (missingHpFraction * 100 * getDaryanaMissingHpPerPercent());
}

function resetHeroFeatureCombatState() {
    eremeiCatchBackUntilMs = 0;
    tikhonShakeStartMs = null;
    clearAllEliseyBees();
}

function getTikhonShakeConfig() {
    return {
        cycleMs: Math.max(200, Number(activeHeroObject?.shakeCycleMs) || TIKHON_SHAKE.cycleMs),
        damageMultiplierMin: Math.max(
            0,
            Number.isFinite(activeHeroObject?.shakeDamageMultiplierMin)
                ? activeHeroObject.shakeDamageMultiplierMin
                : TIKHON_SHAKE.damageMultiplierMin
        ),
        damageMultiplierMax: Math.max(
            0,
            Number.isFinite(activeHeroObject?.shakeDamageMultiplierMax)
                ? activeHeroObject.shakeDamageMultiplierMax
                : TIKHON_SHAKE.damageMultiplierMax
        ),
        critChanceBonusMin: Math.max(
            0,
            Number.isFinite(activeHeroObject?.shakeCritChanceBonusMin)
                ? activeHeroObject.shakeCritChanceBonusMin
                : TIKHON_SHAKE.critChanceBonusMin
        ),
        critChanceBonusMax: Math.max(
            0,
            Number.isFinite(activeHeroObject?.shakeCritChanceBonusMax)
                ? activeHeroObject.shakeCritChanceBonusMax
                : TIKHON_SHAKE.critChanceBonusMax
        )
    };
}

// Треугольная волна 0→1→0 с периодом cycleMs (первая половина — подъём, вторая —
// спад). Возвращает «прогресс» 0..1, не сами значения урона/крита — из него потом
// линейно интерполируются Min..Max для каждой оси отдельно (см. ниже).
function getTikhonShakeProgress(now = performance.now()) {
    if (tikhonShakeStartMs === null) tikhonShakeStartMs = now;
    const { cycleMs } = getTikhonShakeConfig();
    const elapsed = Math.max(0, now - tikhonShakeStartMs);
    const cyclePos = (elapsed % cycleMs) / cycleMs;
    return cyclePos < 0.5 ? (cyclePos / 0.5) : (1 - (cyclePos - 0.5) / 0.5);
}

function getTikhonShakeDamageMultiplier(now = performance.now()) {
    if (activeHeroObject?.name !== 'tikhon') return 1;
    const { damageMultiplierMin, damageMultiplierMax } = getTikhonShakeConfig();
    const progress = getTikhonShakeProgress(now);
    return damageMultiplierMin + progress * (damageMultiplierMax - damageMultiplierMin);
}

function getTikhonShakeCritChanceBonus(now = performance.now()) {
    if (activeHeroObject?.name !== 'tikhon') return 0;
    const { critChanceBonusMin, critChanceBonusMax } = getTikhonShakeConfig();
    const progress = getTikhonShakeProgress(now);
    return critChanceBonusMin + progress * (critChanceBonusMax - critChanceBonusMin);
}

// Шкала «Дрожащей руки» в статус-баре — индикатор (бутылка) ходит по горизонтали
// вместе с прогрессом волны (0..1..0), а не отдельной от боевой механики анимацией:
// то, что видит игрок, — это буквально то же значение progress, что прямо сейчас
// множит урон/крит-шанс в calculateDamage/getEffectiveCritChance, без рассинхрона.
let tikhonShakeGaugeEl = null;
let tikhonShakeTrackEl = null;
let tikhonShakeBottleEl = null;

function initTikhonShakeGauge() {
    tikhonShakeGaugeEl = document.getElementById('tikhonShakeGauge');
    tikhonShakeTrackEl = document.getElementById('tikhonShakeTrack');
    tikhonShakeBottleEl = document.getElementById('tikhonShakeBottle');
    if (!tikhonShakeGaugeEl) return;

    const isTikhon = activeHeroObject?.name === 'tikhon';
    tikhonShakeGaugeEl.style.display = isTikhon ? '' : 'none';
}

function updateTikhonShakeGauge(now = performance.now()) {
    if (!tikhonShakeGaugeEl || !tikhonShakeBottleEl) return;
    if (activeHeroObject?.name !== 'tikhon') return;

    const progress = getTikhonShakeProgress(now);
    const { damageMultiplierMin, damageMultiplierMax, critChanceBonusMin, critChanceBonusMax } = getTikhonShakeConfig();
    const damageMultiplier = damageMultiplierMin + progress * (damageMultiplierMax - damageMultiplierMin);
    const critChanceBonus = critChanceBonusMin + progress * (critChanceBonusMax - critChanceBonusMin);

    // Бутылка ходит по треку 0%..100% вместе с progress, плюс лёгкий наклон —
    // читается как «дрожащая рука качает самогон» вместе со шкалой.
    tikhonShakeBottleEl.style.left = `${(progress * 100).toFixed(1)}%`;
    tikhonShakeBottleEl.style.transform = `translate(-50%, -50%) rotate(${(progress * 24 - 12).toFixed(1)}deg)`;
    tikhonShakeBottleEl.title = `Урон ×${damageMultiplier.toFixed(2)}, крит +${Math.round(critChanceBonus * 100)}%`;
}

// ==================== Елисей Медов — «Пчелиный рой» ====================
// Вместо мгновенного урона по прицелу (см. редирект в checkAimAndDamage) герой
// поднимает пчёл на цель — до 8 одновременно, КАЖДАЯ со своим независимым
// таймером посадки (не хором, см. updateEliseyBees ниже) — суммарный темп
// попаданий на полном стеке растёт в разы относительно SHOT_INTERVAL, это и
// есть источник его высокого потенциала урона. Данные пчелы живут прямо на
// объекте enemy (enemy.eliseyBees), по тому же принципу, что enemy.lastShotTime/
// enemy.isWounded — никакого отдельного глобального реестра.
//
// Урон/крит каждой посадки считается РЕАЛЬНЫМ damageEnemy/calculateDamage
// (правило 1 — не переписывается заново): damageEnemy(enemy, 0.125, ...)
// берёт уже посчитанный полный урон героя и умножает на 1/8, а крит-шанс/
// крит-множитель читаются оттуда же (getEffectiveCritChance()/
// globalCritMultiplier) — то есть "крит пчелы = крит героя" выполняется само
// собой, без единой новой строчки крит-логики. activeHeroObject.name НЕ
// добавлен в HERO_ATTACK_TIMING.animatedHeroes — значит getHeroAttackTiming
// вернёт impactDelayMs:0 (мгновенное применение без синхронизированной
// анимации "полёта снаряда"), что и нужно: пчела уже сидит на цели.
const ELISEY_BEE = Object.freeze({
    maxBeesPerTarget: 8,
    landDamageShare: 0.125, // 1/8 урона героя за одну посадку
    // Ревизия 2 (правка баланса, см. minShotInterval в saveData.js): 3с → 1.5с по прямому
    // решению пользователя — механику нанесения урона нельзя делать слишком прощающей,
    // раз она усилена скоростью набора роя (см. рядом), удержание прицела должно
    // оставаться реальным навыком, а не формальностью.
    idleDespawnMs: 1500,    // исчезает после 1.5с без прицела на цели
    wanderIntervalMs: 650   // как часто пчела выбирает новую точку на силуэте
});

let eliseyBeeIdCounter = 0;
// Цель, чей рой сейчас показывается в индикаторе статус-бара (см. раздел
// "Индикатор пчелиного роя" ниже) — обновляется при каждом спавне пчелы.
let eliseyFocusedEnemy = null;

function trySpawnEliseyBee(enemy) {
    if (!enemy) return;
    if (!Array.isArray(enemy.eliseyBees)) enemy.eliseyBees = [];
    eliseyFocusedEnemy = enemy;
    if (enemy.eliseyBees.length >= ELISEY_BEE.maxBeesPerTarget) return;

    const now = performance.now();
    const bee = {
        id: ++eliseyBeeIdCounter,
        // Чередование спрайтов weapon1/weapon2 по чётности индекса — чтобы рой
        // не летал "в одну сторону" (см. weaponImage/weaponImage2 у героя).
        weaponVariant: enemy.eliseyBees.length % 2 === 0 ? 1 : 2,
        lastLandTime: now, // не жалит в самый момент появления
        idleSince: null,
        nextWanderAt: 0,
        mount: null,
        beeEl: null
    };
    enemy.eliseyBees.push(bee);
    spawnEliseyBeeVisual(enemy, bee);
}

function removeEliseyBee(enemy, bee) {
    if (!enemy || !Array.isArray(enemy.eliseyBees)) return;
    const index = enemy.eliseyBees.indexOf(bee);
    if (index !== -1) enemy.eliseyBees.splice(index, 1);
    bee.mount?.remove();
}

function clearEliseyBeesForEnemy(enemy) {
    if (!enemy || !Array.isArray(enemy.eliseyBees) || enemy.eliseyBees.length === 0) return;
    enemy.eliseyBees.slice().forEach(bee => removeEliseyBee(enemy, bee));
    enemy.eliseyBees = [];
    if (eliseyFocusedEnemy === enemy) eliseyFocusedEnemy = null;
}

function clearAllEliseyBees() {
    activeEnemies.forEach(clearEliseyBeesForEnemy);
    eliseyFocusedEnemy = null;
}

// Вызывается каждый кадр из gameLoop, только пока активный герой — Елисей.
function updateEliseyBees(now) {
    if (activeHeroObject?.name !== 'elisey') return;

    const aimedEnemy = getEnemyAtPoint(aimPosition.x, aimPosition.y);

    activeEnemies.forEach(enemy => {
        if (!Array.isArray(enemy.eliseyBees) || enemy.eliseyBees.length === 0) return;

        const isAimedNow = enemy === aimedEnemy;
        if (isAimedNow) eliseyFocusedEnemy = enemy;

        enemy.eliseyBees.slice().forEach(bee => {
            // Деспавн: таймер тикает только пока прицел НЕ на этой цели — пока
            // держишь прицел на враге, пчёлы не гаснут вообще.
            if (isAimedNow) {
                bee.idleSince = null;
            } else {
                if (bee.idleSince === null) bee.idleSince = now;
                if (now - bee.idleSince >= ELISEY_BEE.idleDespawnMs) {
                    removeEliseyBee(enemy, bee);
                    return;
                }
            }

            // Посадка/урон — независимо от простоя, пока пчела жива (она может
            // "жалить", даже угасая последние секунды без прицела).
            if (now - bee.lastLandTime >= SHOT_INTERVAL) {
                bee.lastLandTime = now;
                damageEnemy(enemy, ELISEY_BEE.landDamageShare, 'bee', SHOT_INTERVAL);
                pulseEliseyBeeVisual(bee);
            }

            updateEliseyBeeWander(enemy, bee, now);
        });
    });
}

// ---- Визуал: mount синхронизируется с врагом 1:1 по паттерну
// syncLukaArrowMount/syncDaryanaFireMount/syncMilaPeaMount, только живёт не
// один цикл, а пока существует пчела (despawn останавливает рекурсию rAF сам —
// mount.remove() делает isConnected===false, следующий кадр просто не планирует
// новый). Точка посадки внутри mount берётся из того же источника семплов
// силуэта (getEnemyOpaqueSamples/pickOpaqueHitNormFromSamples), что уже питает
// стрелу Луки/огонь Дарьяны/горошину Милы.
function spawnEliseyBeeVisual(enemy, bee) {
    const enemyEl = enemy?.element;
    if (!enemyEl || !enemiesContainer) return;
    if (enemyEl.offsetWidth < 2 || enemyEl.offsetHeight < 2) return;

    pruneImpactNodes('.elisey-bee-mount', ELISEY_BEE.maxBeesPerTarget * 3);

    const mount = document.createElement('div');
    mount.className = 'elisey-bee-mount';
    mount.style.left = enemyEl.style.left || '0%';
    mount.style.top = enemyEl.style.top || '0%';
    mount.style.width = `${Math.max(1, enemyEl.offsetWidth)}px`;
    mount.style.height = `${Math.max(1, enemyEl.offsetHeight)}px`;
    mount.style.transform = enemyEl.style.transform || 'none';
    mount.style.transformOrigin = getComputedStyle(enemyEl).transformOrigin || '50% 50%';
    mount.setAttribute('aria-hidden', 'true');

    const beeEl = document.createElement('img');
    beeEl.className = 'elisey-bee';
    beeEl.src = (bee.weaponVariant === 2 && activeHeroObject?.weaponImage2)
        ? activeHeroObject.weaponImage2
        : activeHeroObject?.weaponImage;
    beeEl.alt = '';
    const initialHit = pickOpaqueHitNormFromSamples(getEnemyOpaqueSamples(enemyEl)) || { x: 0.5, y: 0.45 };
    beeEl.style.left = `${(initialHit.x * 100).toFixed(2)}%`;
    beeEl.style.top = `${(initialHit.y * 100).toFixed(2)}%`;

    mount.appendChild(beeEl);
    enemiesContainer.appendChild(mount);

    bee.mount = mount;
    bee.beeEl = beeEl;

    syncEliseyBeeMount(mount, enemyEl);
}

function syncEliseyBeeMount(mount, enemyEl) {
    if (!mount?.isConnected) return;

    if (enemyEl?.isConnected) {
        const renderedStyle = getComputedStyle(enemyEl);
        mount.style.left = enemyEl.style.left || '0%';
        mount.style.top = enemyEl.style.top || '0%';
        mount.style.transform = renderedStyle.transform === 'none'
            ? 'none'
            : renderedStyle.transform;
    }

    requestAnimationFrame(() => syncEliseyBeeMount(mount, enemyEl));
}

// Косметическое блуждание точки посадки внутри mount — раз в ~650-900мс новая
// случайная точка силуэта, CSS-transition на left/top интерполирует полёт.
function updateEliseyBeeWander(enemy, bee, now) {
    if (!bee.beeEl?.isConnected) return;
    if (now < bee.nextWanderAt) return;
    bee.nextWanderAt = now + ELISEY_BEE.wanderIntervalMs + Math.random() * 250;

    const point = pickOpaqueHitNormFromSamples(getEnemyOpaqueSamples(enemy.element));
    if (!point) return;
    bee.beeEl.style.left = `${(point.x * 100).toFixed(2)}%`;
    bee.beeEl.style.top = `${(point.y * 100).toFixed(2)}%`;
}

function pulseEliseyBeeVisual(bee) {
    if (!bee.beeEl) return;
    bee.beeEl.classList.remove('is-stinging');
    void bee.beeEl.offsetWidth;
    bee.beeEl.classList.add('is-stinging');
}

// ---- Индикатор пчелиного роя в статус-баре — 8 силуэтов под HP-баром, тот же
// init/update-паттерн по кадрам, что и initTikhonShakeGauge/updateTikhonShakeGauge
// выше. Показывает рой ТЕКУЩЕЙ "сфокусированной" цели (eliseyFocusedEnemy) —
// если она без пчёл (все истекли), просто все 8 слотов пустые.
let eliseyBeeGaugeEl = null;
let eliseyBeeSlotEls = [];

function initEliseyBeeGauge() {
    eliseyBeeGaugeEl = document.getElementById('eliseyBeeGauge');
    if (!eliseyBeeGaugeEl) return;
    eliseyBeeSlotEls = Array.from(eliseyBeeGaugeEl.querySelectorAll('.elisey-bee-slot'));

    const isElisey = activeHeroObject?.name === 'elisey';
    eliseyBeeGaugeEl.style.display = isElisey ? '' : 'none';
}

function updateEliseyBeeGauge() {
    if (!eliseyBeeGaugeEl || activeHeroObject?.name !== 'elisey') return;

    const activeCount = eliseyFocusedEnemy?.eliseyBees?.length || 0;
    eliseyBeeSlotEls.forEach((slot, index) => {
        slot.classList.toggle('is-filled', index < activeCount);
    });
}

// Отбой "атаки" босса (isBoss===false — см. железобетонное правило про мгновенный
// отбой, CLAUDE.md правило 13): урон применяется мгновенно и синхронно ДО этого
// вызова (см. комментарий "VFX доигрывается независимо" в damageEnemy) — эта
// функция только косметика поверх уже случившегося отбоя, ничего не задерживает.
// По просьбе пользователя: кратковременно появляется пчела в точке отбоя и
// пропадает примерно через секунду — в отличие от персистентного роя на самом
// боссе, тут одноразовый эффект без mount/слежения за целью (цель уже уничтожена).
function showEliseyDeflectImpact(attackEnemy, isCritical = false) {
    if (activeHeroObject?.name !== 'elisey' || !attackEnemy?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(attackEnemy.element);
    if (!pos) return;

    pruneImpactNodes('.elisey-deflect-bee', 8);

    const impact = document.createElement('img');
    impact.className = `elisey-deflect-bee${isCritical ? ' is-critical' : ''}`;
    impact.src = (Math.random() < 0.5 && activeHeroObject.weaponImage2)
        ? activeHeroObject.weaponImage2
        : activeHeroObject.weaponImage;
    impact.alt = '';
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    impact.setAttribute('aria-hidden', 'true');
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), 1000);
}

function getEremeiCatchBackConfig() {
    return {
        critChanceBonus: Math.max(
            0,
            Number(activeHeroObject?.catchBackCritChanceBonus) || EREMEI_CATCH_BACK.critChanceBonus
        ),
        durationMs: Math.max(
            0,
            Number(activeHeroObject?.catchBackDurationMs) || EREMEI_CATCH_BACK.durationMs
        )
    };
}

function isEremeiCatchBackActive(now = performance.now()) {
    return activeHeroObject?.name === 'eremei' && now < eremeiCatchBackUntilMs;
}

function getHeroFeatureCritChanceBonus(now = performance.now()) {
    if (isEremeiCatchBackActive(now)) return getEremeiCatchBackConfig().critChanceBonus;
    return getTikhonShakeCritChanceBonus(now);
}

function getEffectiveCritChance(now = performance.now()) {
    return Math.min(1, globalCritChance + getHeroFeatureCritChanceBonus(now));
}

function activateEremeiCatchBack(now = performance.now()) {
    if (activeHeroObject?.name !== 'eremei') return;

    const { critChanceBonus, durationMs } = getEremeiCatchBackConfig();
    const wasActive = isEremeiCatchBackActive(now);
    eremeiCatchBackUntilMs = now + durationMs;

    // Тост только при активации / реактивации с нуля — не спамим на каждый тик урона.
    if (!wasActive) {
        const bonusPercent = Math.round(critChanceBonus * 100);
        showCenterText(`Лови обратно! Крит +${bonusPercent}%`, 1000, 'info');
    }
}

/** Единая точка входа: герой получил фактический урон. */
function notifyHeroTookDamage(appliedDamage) {
    if (!(appliedDamage > 0) || isGameOver) return;

    if (activeHeroObject?.name === 'eremei') {
        activateEremeiCatchBack();
    }
}

function subsDamageEnemy(_isBoss, _isDestroyed) {
    // Hook под особенности «при убийстве/попадании».
    // Еремей больше не использует ramp-урон от отбитых атак.
}

function rollHeroAttackMultiplier(isBoss) {
	if (!isBoss || activeHeroObject.name !== 'dunya') {
		return { multiplier: 1, kind: 'normal' };
	}

	const random = Math.random();
	// TEMP preview: false = боевые шансы из saveData
	const DUNYA_SPECIAL_PREVIEW = false;
	const doubleChance = DUNYA_SPECIAL_PREVIEW ? 0.34 : (activeHeroObject.doubleAttackChance ?? 0.10);
	const tripleChance = DUNYA_SPECIAL_PREVIEW ? 0.28 : (activeHeroObject.tripleAttackChance ?? 0.03);
	const jackpotChance = DUNYA_SPECIAL_PREVIEW ? 0.22 : (activeHeroObject.jackpotAttackChance ?? 0.01);
	const jackpotMultiplier = Math.max(1, activeHeroObject.jackpotAttackMultiplier ?? 8);

	if (random < jackpotChance) {
		showCenterText('Вихрь! Восьмикратный урон!', 1700, 'info');
		return { multiplier: jackpotMultiplier, kind: 'jackpot' };
	}

	if (random < jackpotChance + tripleChance) {
		showCenterText('Ух как раскрутилась! Тройная атака!', 1500, 'info');
		return { multiplier: 3, kind: 'triple' };
	}

	if (random < jackpotChance + tripleChance + doubleChance) {
		showCenterText('Раскрутилась! Двойная атака!', 1500, 'info');
		return { multiplier: 2, kind: 'double' };
	}

	return { multiplier: 1, kind: 'normal' };
}

function subsCalculateDamageEnemy(isBoss, isCritical) {
	
	if(activeHeroObject.name === 'luka' && isBoss) {
		countDamageBoss++;
		const guaranteedCritEvery = Math.max(1, activeHeroObject.guaranteedCritEvery ?? 5);

		if (countDamageBoss >= guaranteedCritEvery) {
			countDamageBoss = 0;
			showCenterText('Считалочка! Точный выстрел!', 900, 'info');
			return { isCritical: true, isCountShot: true };
		}
	}
	
	return { isCritical, isCountShot: false };
}


//=======================================================================================

// ==================== ДОБАВЛЯЕМ ФУНКЦИЮ ОБНОВЛЕНИЯ ПОЛОСКИ ОПЫТА ====================

function updateExperienceDisplay() {
    // Создаем элементы если их нет
    if (!document.querySelector('.experience-container')) {
        createExperienceUI();
    }
    
    const experienceBar = document.getElementById('experienceBar');
    const playerLevelElement = document.getElementById('playerLevel');
    
    if (experienceBar && playerLevelElement) {
        const expPercent = Math.min(100, (playerExp / expToNextLevel) * 100);
        experienceBar.style.width = `${expPercent}%`;
        playerLevelElement.textContent = playerLevel;
    }
}

// ==================== СОЗДАЕМ ИНТЕРФЕЙС ОПЫТА В ЛЕВОЙ ПАНЕЛИ ====================

function createExperienceUI() {
    const experienceHTML = `
        <div class="experience-container">
            <h3>ОПЫТ ИГРОКА</h3>
            <div class="experience-bar-container">
                <div class="experience-bar" id="experienceBar" style="width: 0%"></div>
                <div class="experience-markers"></div>
            </div>
            <div class="level-info">Уровень: <span id="playerLevel">1</span></div>
            <div class="exp-info">Опыт: <span id="playerExp">0</span>/<span id="expToNextLevel">100</span></div>
        </div>
    `;
    
    const infoPanel = document.querySelector('.info-panel');
    if (infoPanel) {
        infoPanel.innerHTML += experienceHTML;
    }
}

// ==================== ФУНКЦИЯ ПРОЦЕССА ПОВЫШЕНИЯ УРОВНЯ ====================

async function processLevelUp() {
    console.log("Начало повышения уровня!");
    
    // Ставим игру на паузу
    pauseGame();
    
    // Обрабатываем все уровни, которые заработали
    const levelsProcessed = await handleLevelUps();
    
    // Снимаем игру с паузы
    if (levelsProcessed) {
        resumeGame();
    }
}

// ==================== ПАУЗА И ВОЗОБНОВЛЕНИЕ ИГРЫ ====================

function pauseBossEventTimers() {
    const now = performance.now();

    if (bossTimer !== null) {
        clearTimeout(bossTimer);
        pausedBossWaveDelay = Math.max(0, bossTimerDelay - (now - bossTimerStartedAt));
        bossTimer = null;
        bossTimerStartedAt = 0;
        bossTimerDelay = 0;
    }

    bossAttackTimers.forEach(task => {
        if (task.timeoutId === null) return;
        clearTimeout(task.timeoutId);
        task.remainingDelay = Math.max(0, task.remainingDelay - (now - task.startedAt));
        task.timeoutId = null;
        task.startedAt = 0;
    });
}

function resumeBossEventTimers() {
    if (bossAlive && !isGameOver && pausedBossWaveDelay !== null) {
        const remainingDelay = pausedBossWaveDelay;
        pausedBossWaveDelay = null;
        scheduleNextBossWave(remainingDelay);
    }

    bossAttackTimers.forEach(task => {
        if (task.timeoutId === null) armBossTask(task);
    });
}

function pauseGame() {
    if (isGamePaused) return;
    isGamePaused = true;
    pauseBossEventTimers();
    
    // Сохраняем оригинальные скорости врагов
    activeEnemies.forEach(enemy => {
        enemy.originalSpeedPixelsPerSecond = enemy.speedPixelsPerSecond;
        enemy.speedPixelsPerSecond = 0;
    });
    
    
    console.log("Игра поставлена на паузу, таймер групп приостановлен");
}

function resumeGame() {
    if (!isGamePaused || document.hidden || isAutoPausedForVisibility) return;
    isGamePaused = false;
    // Первый кадр после возврата не должен списывать время, прошедшее вне игры.
    lastFrameTime = null;
    
    // Восстанавливаем скорости врагов
    activeEnemies.forEach(enemy => {
        if (enemy.originalSpeedPixelsPerSecond !== undefined) {
            enemy.speedPixelsPerSecond = enemy.originalSpeedPixelsPerSecond;
            delete enemy.originalSpeedPixelsPerSecond;
        }
    });

    resumeBossEventTimers();
    
    console.log("Игра возобновлена, таймер групп возобновлен");
}

function syncGameWithPageVisibility() {
    const pageIsInactive = document.hidden || !document.hasFocus();

    if (pageIsInactive) {
        if (!isGameOver && !isGamePaused) {
            isAutoPausedForVisibility = true;
            pauseGame();
            window.battleMusic?.pause({ immediate: true });
        }
        return;
    }

    if (isAutoPausedForVisibility) {
        isAutoPausedForVisibility = false;
        if (!isGameOver) {
            resumeGame();
            window.battleMusic?.resume();
        }
    }
}

document.addEventListener('visibilitychange', syncGameWithPageVisibility);
window.addEventListener('blur', syncGameWithPageVisibility);
window.addEventListener('focus', syncGameWithPageVisibility);
// ==================== ОБРАБОТКА ПОВЫШЕНИЯ УРОВНЕЙ ====================

// ==================== ОБНОВЛЯЕМ ФУНКЦИЮ handleLevelUps ====================

async function handleLevelUps() {
    let levelsGained = 0;
    
    while (playerExp >= expToNextLevel) {
        playerLevel++;
        const oldExpToNextLevel = expToNextLevel;
        expToNextLevel = Math.round(expToNextLevel * 1.1);
        playerExp -= oldExpToNextLevel;
        levelsGained++;
        
        console.log(`Повышение уровня до ${playerLevel}! Опыт для след. уровня: ${expToNextLevel}`);
        
        // Показываем окно выбора улучшения
		if(!openLevelUpModal) {
			await showLevelUpModal();
        }
		
        updateExperienceDisplay();
    }
    
    return levelsGained > 0;
}

// ==================== ОБНОВЛЯЕМ ФУНКЦИЮ showLevelUpModal ====================

let openLevelUpModal = false;
function showLevelUpModal(titleHtml, subtitleText) {

	openLevelUpModal = true;

    return new Promise((resolve) => {
        // Создаем модальное окно
        const { nextLevelNumber, hasNextLevel } = getNextLevelAvailability();

        const resolvedTitle = titleHtml ?? `🎉 УРОВЕНЬ ${playerLevel} 🎉`;
        const resolvedSubtitle = subtitleText ?? 'Выберите одно временное улучшение:';

        const modal = document.createElement('div');
        modal.className = 'level-up-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="levelup-util-buttons">
                    <button type="button" class="levelup-util-btn restart" title="Начать уровень заново">⟳</button>
                    ${hasNextLevel ? '<button type="button" class="levelup-util-btn next-level" title="Следующий уровень">⏭</button>' : ''}
                    <button type="button" class="levelup-util-btn base" title="Вернуться на базу">🏠</button>
                </div>
                <h2>${resolvedTitle}</h2>
                <p class="modal-subtitle">${resolvedSubtitle}</p>
                ${buildLevelUpStatsPanelMarkup()}
                <div class="upgrade-options" id="upgradeOptions"></div>
            </div>
        `;

		 pauseGame();
        document.body.appendChild(modal);

        modal.querySelector('.levelup-util-btn.restart').addEventListener('click', () => {
            location.reload();
        });

        modal.querySelector('.levelup-util-btn.next-level')?.addEventListener('click', () => {
            goToLevelWithRememberedDifficulty(nextLevelNumber);
        });

        modal.querySelector('.levelup-util-btn.base').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // До 3 связок по 3 стата — см. getAvailableUpgradeBundles (заменяет старые
        // getAvailableUpgrades()+selectRandomUpgrades()).
        const bundles = getAvailableUpgradeBundles(3);

        const upgradeOptions = document.getElementById('upgradeOptions');

        bundles.forEach((bundle) => {
            const upgradeButton = document.createElement('div');
            upgradeButton.className = `upgrade-option rarity-${bundle.rarity}`;
            const effectLines = bundle.statEffects.map(effect => `
                <div class="upgrade-bundle-stat">
                    <span class="upgrade-bundle-stat-icon" aria-hidden="true">${getLevelUpStatIcon(effect.statId)}</span>
                    <span class="upgrade-bundle-stat-label">${getLevelUpStatShortLabel(effect.statId)}</span>
                    <span class="upgrade-bundle-stat-amount">${effect.cardText}</span>
                </div>
            `).join('');
            upgradeButton.innerHTML = `
                <div class="upgrade-title" style="color: ${getRarityColor(bundle.rarity)}">${bundle.displayName}</div>
                <div class="upgrade-effect">${effectLines}</div>
                <div class="upgrade-rarity">${getRarityName(bundle.rarity)}</div>
            `;

            // Предпросмотр при наведении — тот же принцип, что у постоянной прокачки в
            // index.html (previewUpgrade/revertPreview): показываем в панели статов
            // реальный (уже обрезанный под потолок, если он есть) эффект КАЖДОГО из 3
            // статов этой связки разом, а не номинал из cardText.
            upgradeButton.addEventListener('mouseenter', () => {
                bundle.statEffects.forEach(effect => applyLevelUpStatPreview(modal, effect.statId, effect));
            });
            upgradeButton.addEventListener('mouseleave', () => {
                bundle.statEffects.forEach(effect => clearLevelUpStatPreview(modal, effect.statId));
            });

            upgradeButton.addEventListener('click', () => {
                // Применяем всю связку — 3 стата разом.
                bundle.apply();

                // Закрываем модальное окно
                document.body.removeChild(modal);

                // Разрешаем промис
                resolve();

				 resumeGame();
				 openLevelUpModal = false;
            });

            upgradeOptions.appendChild(upgradeButton);
        });
    });
	
	
	
}

// ==================== СВЯЗКИ ВРЕМЕННЫХ УЛУЧШЕНИЙ (BUNDLE-ВАРИАНТЫ) ====================
//
// По решению пользователя: одиночные улучшения (1 карточка = 1 стат) заменены на
// связки (1 карточка = 3 разных стата разом, один общий ролл редкости на всю связку).
// Никакого личного множителя силы героя (temporaryUpgradePower убран из saveData.js) —
// база одна на всех: TEMPORARY_UPGRADE_BASE_SHARE=0.18 (обычное = 18% от базового стата).
// Все показываемые и реально применяемые числа — целые, без дробных значений: ceil для
// номинала на карточке и для несжатого (не упёршегося в потолок) реального эффекта,
// floor для эффекта, который пришлось обрезать под потолок героя (чтобы округление
// вверх не перескочило сам потолок).

// Статы, способные меняться временными улучшениями — порядок совпадает с секциями
// panel/bundle ниже. Объявлено здесь (а не рядом с панелью статов дальше по файлу),
// потому что UPGRADE_VARIANTS ниже строится по этому списку уже при загрузке модуля.
const LEVEL_UP_STAT_IDS = ['damage', 'critChance', 'critMultiplier', 'woundChance', 'heroHP', 'heroDefense', 'fireRate'];

// Округление числа до precision знаков после точки в заданном режиме: 'ceil' — вверх
// (герой никогда не получает меньше номинала), 'floor' — вниз (чтобы округление вверх
// не перескочило сам потолок героя), 'nearest' — к ближайшему (для уже показанных на
// экране текущего значения/потолка, от которых считается разница при клэмпе).
// precision=0 — целые числа без дробной части (все статы, кроме защиты), precision=1 —
// один знак после точки (0.1/0.2/5.3 — по решению пользователя только у защиты).
function roundUpgradeToPrecision(value, precision, mode) {
    const factor = Math.pow(10, precision);
    // Крохотный эпсилон убирает шум плавающей точки (0.1×0.10 = 0.010000000000000002,
    // а не ровно 0.01) — без него ceil прыгал на одну лишнюю ступеньку вверх (1.1%
    // вместо честных 1.0%). Округление по-прежнему ВВЕРХ, просто до правильного числа,
    // а не до случайно завышенного плавающей точкой.
    const scaled = value * factor;
    if (mode === 'ceil') return Math.ceil(scaled - 1e-9) / factor;
    if (mode === 'floor') return Math.floor(scaled + 1e-9) / factor;
    return Math.round(scaled) / factor;
}

// Итоговая (видимая игроку) прибавка стата — единая логика для карточки, hover-превью и
// apply(), чтобы карточка честно обещала именно то число, которое реально применится, а
// не полный номинал легендарки, если герой почти упёрся в потолок (например «+5%» на
// карточке при реальных +1% из-за близости к потолку — так быть не должно). scale — во
// сколько раз перевести сырые единицы стата в отображаемые (100 для процентных статов,
// 1 для абсолютных чисел вроде урона/HP/скорости). precision — см. roundUpgradeToPrecision
// (по умолчанию 0, у защиты передаётся 1).
// Без потолка (cap не задан/не конечен) — обычный ceil от номинала, как и раньше.
// С потолком — всегда сравниваем ДВЕ УЖЕ ОКРУГЛЁННЫЕ величины: несжатый ceil-номинал и
// округлённый запас до потолка (roundedCap - roundedCurrent), берём меньшую. Раньше
// клэмп решался по сырой (до округления) разнице через эпсилон — это ловило только
// случай, когда сырой номинал ЗАМЕТНО больше запаса, но пропускало пограничный: если
// сырой номинал математически ровно (или чуть меньше) помещается в запас, «клэмп не
// нужен» и код применял чистый ceil(nominal) — а ceil у нецелого номинала сам по себе
// перепрыгивал через границу потолка (например номинал 13.5 при запасе ровно 13.5%:
// «не клэмповано», ceil даёт 14, и 21.5%+14%=35.5% — выше потолка 35%). Теперь клэмп
// определяется по факту (несжатый ceil > округлённый запас), а не по сырой разнице до
// округления — потолок никогда не перепрыгивается, независимо от того, целое ли число
// получилось у запаса.
function computeUpgradeStatDelta(nominalRaw, current, cap, scale, precision = 0) {
    const unclampedAmount = roundUpgradeToPrecision(nominalRaw * scale, precision, 'ceil');
    if (!Number.isFinite(cap)) {
        return { amount: unclampedAmount, isClamped: false };
    }
    const roundedCap = roundUpgradeToPrecision(cap * scale, precision, 'nearest');
    const roundedCurrent = roundUpgradeToPrecision(current * scale, precision, 'nearest');
    const headroom = Math.max(0, roundUpgradeToPrecision(roundedCap - roundedCurrent, precision, 'nearest'));
    if (unclampedAmount <= headroom) {
        return { amount: unclampedAmount, isClamped: false };
    }
    return { amount: headroom, isClamped: true };
}

// Живой (не стартовый) гейт «стат ещё способен вырасти прямо сейчас» — используется при
// фильтрации вариантов связок на каждый показ окна. Herohp/heroDefense/critChance/
// woundChance/fireRate — потолок гейтит только показ, само число не обрезается под
// остаток (см. buildUpgradeStatEffect ниже) — если стата нет на потолке героя, он ничем
// не ограничен, движок не подставляет собственных запасных чисел.
function isUpgradeStatEligibleNow(statId) {
    switch (statId) {
        case 'damage':
            return true;
        case 'critMultiplier':
            return !Number.isFinite(globalCritMultiplierCap) || globalCritMultiplier < globalCritMultiplierCap;
        case 'critChance':
            return !Number.isFinite(globalCritChanceCap) || globalCritChance < globalCritChanceCap;
        case 'woundChance':
            return startGlobalWoundChance > 0
                && (!Number.isFinite(globalWoundChanceCap) || globalWoundChance < globalWoundChanceCap);
        case 'heroHP':
            return !Number.isFinite(heroHpCap) || heroHP.max < heroHpCap;
        case 'heroDefense':
            return !Number.isFinite(heroDamageReductionCap) || heroDamageReduction < heroDamageReductionCap;
        case 'fireRate': {
            const floor = activeHeroObject?.minShotInterval;
            return !Number.isFinite(floor) || SHOT_INTERVAL > floor;
        }
        default:
            return false;
    }
}

// Один стат связки: карточка, apply() и preview() всегда показывают и применяют ОДНО И
// ТО ЖЕ число — реальную (обрезанную под потолок героя, если герой уже почти упёрся)
// прибавку, а не полный номинал легендарки. Иначе карточка обещает «+5%», а по клику
// реально даёт «+1%», потому что до потолка остался всего 1% — так быть не должно.
// Одна функция на все 7 статов — единственное место с формулой magnitude = база × доля
// × редкость, переиспользуется и при сборке связки, и (опосредованно) при построении
// панели статов через ту же клэмп-логику. Доля разная по группам статов (по решению
// пользователя): TEMPORARY_UPGRADE_BASE_SHARE (54%) — урон/крит-урон,
// TEMPORARY_UPGRADE_MINOR_SHARE (10%) — здоровье/защита/крит-шанс/шанс ранения,
// TEMPORARY_UPGRADE_FIRE_RATE_SHARE (25%) — скорость атаки. Защита/крит-шанс/шанс
// ранения дополнительно округляются до одного знака после точки (см.
// TEMPORARY_UPGRADE_FRACTIONAL_PRECISION), у остальных статов — целые числа.
function buildUpgradeStatEffect(statId, rarityMultiplier) {
    switch (statId) {
        case 'damage': {
            const nominalRaw = startGlobalDamage * TEMPORARY_UPGRADE_BASE_SHARE * rarityMultiplier;
            const delta = computeUpgradeStatDelta(nominalRaw, globalDamage, undefined, 1);
            return {
                statId,
                cardText: `+${delta.amount}`,
                apply: function() {
                    globalDamage += computeUpgradeStatDelta(nominalRaw, globalDamage, undefined, 1).amount;
                },
                preview: function() {
                    const amount = computeUpgradeStatDelta(nominalRaw, globalDamage, undefined, 1).amount;
                    return { text: `${Math.round(globalDamage)} +${amount}`, isClamped: false };
                }
            };
        }
        case 'critChance': {
            const nominalRaw = startGlobalCritChance * TEMPORARY_UPGRADE_MINOR_SHARE * rarityMultiplier;
            const delta = computeUpgradeStatDelta(nominalRaw, globalCritChance, globalCritChanceCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
            return {
                statId,
                cardText: `+${delta.amount.toFixed(TEMPORARY_UPGRADE_FRACTIONAL_PRECISION)}%`,
                apply: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, globalCritChance, globalCritChanceCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
                    globalCritChance += liveDelta.amount / 100;
                },
                preview: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, globalCritChance, globalCritChanceCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
                    const capSuffix = liveDelta.isClamped ? ` (максимум ${Math.ceil(globalCritChanceCap * 100)}%)` : '';
                    return { text: `${Math.round(globalCritChance * 100)}% +${liveDelta.amount.toFixed(TEMPORARY_UPGRADE_FRACTIONAL_PRECISION)}%${capSuffix}`, isClamped: liveDelta.isClamped };
                }
            };
        }
        case 'critMultiplier': {
            // Множитель — внутреннее представление (глобальный критУрон = база × множитель);
            // игроку везде в UI (index.html/updateInfoPanel, панель статов) крит-урон
            // показывается как %, а не сырой множитель — тот же язык и здесь. Потолок —
            // необязательный (globalCritMultiplierCap), см. getHeroCritMultiplierCap в
            // saveData.js: у героя без явного поля — по-прежнему без потолка, как раньше.
            const nominalRaw = startGlobalCritMultiplier * TEMPORARY_UPGRADE_BASE_SHARE * rarityMultiplier;
            const delta = computeUpgradeStatDelta(nominalRaw, globalCritMultiplier, globalCritMultiplierCap, 100);
            return {
                statId,
                cardText: `+${delta.amount}%`,
                apply: function() {
                    const amount = computeUpgradeStatDelta(nominalRaw, globalCritMultiplier, globalCritMultiplierCap, 100).amount;
                    globalCritMultiplier += amount / 100;
                },
                preview: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, globalCritMultiplier, globalCritMultiplierCap, 100);
                    const capSuffix = liveDelta.isClamped ? ` (максимум ${Math.ceil(globalCritMultiplierCap * 100)}%)` : '';
                    return { text: `${Math.round(globalCritMultiplier * 100)}% +${liveDelta.amount}%${capSuffix}`, isClamped: liveDelta.isClamped };
                }
            };
        }
        case 'woundChance': {
            const nominalRaw = startGlobalWoundChance * TEMPORARY_UPGRADE_MINOR_SHARE * rarityMultiplier;
            const delta = computeUpgradeStatDelta(nominalRaw, globalWoundChance, globalWoundChanceCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
            return {
                statId,
                cardText: `+${delta.amount.toFixed(TEMPORARY_UPGRADE_FRACTIONAL_PRECISION)}%`,
                apply: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, globalWoundChance, globalWoundChanceCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
                    globalWoundChance += liveDelta.amount / 100;
                },
                preview: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, globalWoundChance, globalWoundChanceCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
                    const capSuffix = liveDelta.isClamped ? ` (максимум ${Math.ceil(globalWoundChanceCap * 100)}%)` : '';
                    return { text: `${Math.round(globalWoundChance * 100)}% +${liveDelta.amount.toFixed(TEMPORARY_UPGRADE_FRACTIONAL_PRECISION)}%${capSuffix}`, isClamped: liveDelta.isClamped };
                }
            };
        }
        case 'heroHP': {
            const nominalRaw = startGlobalHeroHp * TEMPORARY_UPGRADE_MINOR_SHARE * rarityMultiplier;
            const delta = computeUpgradeStatDelta(nominalRaw, heroHP.max, heroHpCap, 1);
            return {
                statId,
                cardText: `+${delta.amount}`,
                apply: function() {
                    const amount = computeUpgradeStatDelta(nominalRaw, heroHP.max, heroHpCap, 1).amount;
                    heroHP.max += amount;
                    heroHP.current += amount;
                    updateHeroHealthDisplay();
                },
                preview: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, heroHP.max, heroHpCap, 1);
                    const capSuffix = liveDelta.isClamped ? ` (максимум ${Math.round(heroHpCap)})` : '';
                    return { text: `${Math.round(heroHP.current)}/${Math.round(heroHP.max)} +${liveDelta.amount}${capSuffix}`, isClamped: liveDelta.isClamped };
                }
            };
        }
        case 'heroDefense': {
            const nominalRaw = startHeroDamageReduction * TEMPORARY_UPGRADE_MINOR_SHARE * rarityMultiplier;
            const delta = computeUpgradeStatDelta(nominalRaw, heroDamageReduction, heroDamageReductionCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
            return {
                statId,
                cardText: `+${delta.amount.toFixed(TEMPORARY_UPGRADE_FRACTIONAL_PRECISION)}%`,
                apply: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, heroDamageReduction, heroDamageReductionCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
                    heroDamageReduction += liveDelta.amount / 100;
                },
                preview: function() {
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, heroDamageReduction, heroDamageReductionCap, 100, TEMPORARY_UPGRADE_FRACTIONAL_PRECISION);
                    const capSuffix = liveDelta.isClamped ? ` (максимум ${Math.ceil(heroDamageReductionCap * 100)}%)` : '';
                    return { text: `${Math.round(heroDamageReduction * 100)}% +${liveDelta.amount.toFixed(TEMPORARY_UPGRADE_FRACTIONAL_PRECISION)}%${capSuffix}`, isClamped: liveDelta.isClamped };
                }
            };
        }
        case 'fireRate': {
            // Доля/(1+доля) от СВОЕГО интервала: даёт тот же прирост DPS от ускорения, что
            // damage-эффект с той же долей даёт от урона (симметрично остальным статам, не
            // зависит от абсолютного стартового интервала героя). Пол на SHOT_INTERVAL — это
            // и есть потолок на «скорости» (1000-интервал), просто вывернутый: чем меньше
            // интервал, тем выше скорость.
            const fireRateFloor = activeHeroObject?.minShotInterval;
            const fireRateShare = TEMPORARY_UPGRADE_FIRE_RATE_SHARE * rarityMultiplier;
            const nominalRaw = startSHOT_INTERVAL * (fireRateShare / (1 + fireRateShare));
            const speedCap = Number.isFinite(fireRateFloor) ? 1000 - fireRateFloor : undefined;
            const delta = computeUpgradeStatDelta(nominalRaw, 1000 - SHOT_INTERVAL, speedCap, 1);
            return {
                statId,
                cardText: `+${delta.amount}`,
                apply: function() {
                    const currentSpeed = 1000 - SHOT_INTERVAL;
                    const amount = computeUpgradeStatDelta(nominalRaw, currentSpeed, speedCap, 1).amount;
                    SHOT_INTERVAL -= amount;
                },
                preview: function() {
                    const currentSpeed = 1000 - SHOT_INTERVAL;
                    const liveDelta = computeUpgradeStatDelta(nominalRaw, currentSpeed, speedCap, 1);
                    const capSuffix = liveDelta.isClamped ? ` (максимум ${Math.round(speedCap)})` : '';
                    return { text: `${Math.round(currentSpeed)} +${liveDelta.amount}${capSuffix}`, isClamped: liveDelta.isClamped };
                }
            };
        }
        default:
            return null;
    }
}

// Все сочетания по 3 без повторов из 7 статов (C(7,3)=35) — стабильный список,
// сгенерированный один раз при загрузке движка. id детерминирован порядком перебора
// (variant1..variant35, i<j<k по LEVEL_UP_STAT_IDS) — на него ссылаются лорные названия
// в lvlData/gameData{N}.js (UPGRADE_VARIANT_NAMES[boss][variantId]). Дубликатов по
// построению быть не может — комбинаторный перебор не повторяет один и тот же набор.
const UPGRADE_VARIANTS = (function generateUpgradeVariants() {
    const variants = [];
    for (let i = 0; i < LEVEL_UP_STAT_IDS.length; i++) {
        for (let j = i + 1; j < LEVEL_UP_STAT_IDS.length; j++) {
            for (let k = j + 1; k < LEVEL_UP_STAT_IDS.length; k++) {
                variants.push({
                    id: `variant${variants.length + 1}`,
                    statIds: [LEVEL_UP_STAT_IDS[i], LEVEL_UP_STAT_IDS[j], LEVEL_UP_STAT_IDS[k]]
                });
            }
        }
    }
    return variants;
})();

// Случайный вариант из тех, где ХОТЯ БЫ ОДИН из 3 статов ещё способен вырасти (см.
// isUpgradeStatEligibleNow), и id не входит в excludeVariantIds (чтобы 3 карточки в
// одном окне не повторяли одну и ту же связку). Из ролла выкидываются только полностью
// бесполезные варианты — где все 3 стата уже на потолке (карточка была бы сплошными
// +0/+0/+0) — а не любой вариант, где хотя бы один стат упёрся: связка с одним капнутым
// статом всё равно даёт реальный прирост по двум другим (см. computeUpgradeStatDelta —
// капнутый эффект внутри связки сам покажет +0%, не ломая остальные два). Урон и
// крит-урон (see isUpgradeStatEligibleNow) не капаются никогда, поэтому хотя бы одна
// связка остаётся доступной всегда — «пустого» окна без единой карточки быть не должно.
// null возвращается, только если excludeVariantIds уже выбрал все связки, где есть хотя
// бы один нерастущий стат (в рамках одного открытия окна, не позднего забега).
function getRandomUpgradeVariant(excludeVariantIds) {
    const excluded = excludeVariantIds instanceof Set ? excludeVariantIds : new Set(excludeVariantIds || []);
    const eligible = UPGRADE_VARIANTS.filter(variant =>
        !excluded.has(variant.id) && variant.statIds.some(isUpgradeStatEligibleNow)
    );
    if (eligible.length === 0) return null;
    return eligible[Math.floor(Math.random() * eligible.length)];
}

// Лорное название связки на ТЕКУЩЕМ уровне/боссе — опциональная глобальная переменная
// UPGRADE_VARIANT_NAMES, объявляемая в lvlData/gameData{N}.js (см. правила создания
// уровней), формат: { enem1: { variant7: 'Прыгучесть побегайчика' }, ... }. Не задано —
// движок сам собирает читаемое имя из статов связки, игра не ломается без единой
// написанной строки. Название НЕ зависит от редкости — «Ловкость колобка» остаётся
// «Ловкостью колобка» что на обычной, что на легендарной, редкость — отдельный лейбл.
function getUpgradeVariantDisplayName(variant) {
    const namesForBoss = (typeof UPGRADE_VARIANT_NAMES !== 'undefined' && bossAliveName)
        ? UPGRADE_VARIANT_NAMES[bossAliveName]
        : null;
    const specific = namesForBoss?.[variant.id];
    if (specific) return specific;
    // Короткие лейблы — иначе «Шанс крита + Критический урон + Здоровье» переносится
    // на 2-3 строки и карточки становятся неровными по высоте.
    return variant.statIds.map(getLevelUpStatShortLabel).join(' + ');
}

// Одна связка: один общий ролл редкости на всю тройку статов (не по одному на стат) —
// множит magnitude всех трёх одинаково, как и было для одиночных улучшений.
function buildUpgradeBundle(variant) {
    const rarity = getRandomRarity();
    const rarityMultiplier = getRarityMultiplier(rarity);
    const statEffects = variant.statIds.map(statId => buildUpgradeStatEffect(statId, rarityMultiplier));
    return {
        variantId: variant.id,
        rarity,
        displayName: getUpgradeVariantDisplayName(variant),
        statEffects,
        apply: function() {
            statEffects.forEach(effect => effect.apply());
        }
    };
}

// Заменяет старые getAvailableUpgrades()+selectRandomUpgrades(): до `count` связок,
// каждая — случайный ещё не выбранный в этом окне вариант (см. getRandomUpgradeVariant).
function getAvailableUpgradeBundles(count = 3) {
    const bundles = [];
    const usedVariantIds = new Set();
    for (let i = 0; i < count; i++) {
        const variant = getRandomUpgradeVariant(usedVariantIds);
        if (!variant) break;
        usedVariantIds.add(variant.id);
        bundles.push(buildUpgradeBundle(variant));
    }
    return bundles;
}


// ==================== ПАНЕЛЬ ТЕКУЩИХ СТАТОВ В ОКНЕ ВРЕМЕННЫХ УЛУЧШЕНИЙ ====================
// LEVEL_UP_STAT_IDS объявлен раньше по файлу (у UPGRADE_VARIANTS) — используется и там,
// и здесь.

function getLevelUpStatLabel(statId) {
    switch (statId) {
        case 'damage': return 'Урон';
        case 'critChance': return 'Шанс крита';
        case 'critMultiplier': return 'Критический урон';
        case 'woundChance': return activeHeroObject?.woundChanceLabel ?? 'Шанс ранения';
        case 'heroHP': return 'Здоровье';
        case 'heroDefense': return 'Защита';
        case 'fireRate': return 'Скорость атаки';
        default: return '';
    }
}

// Короткая форма — для тесных мест (строка внутри карточки-связки, generic-заголовок из
// нескольких статов через " + "), где полная «Критический урон»/«Скорость атаки»
// переносится на 2-3 строки и ломает вёрстку. Панель текущих статов (простор шире)
// по-прежнему использует полную getLevelUpStatLabel.
function getLevelUpStatShortLabel(statId) {
    switch (statId) {
        case 'damage': return 'Урон';
        case 'critChance': return 'Крит-шанс';
        case 'critMultiplier': return 'Крит-урон';
        case 'woundChance': return activeHeroObject?.woundChanceLabel ?? 'Ранение';
        case 'heroHP': return 'Здоровье';
        case 'heroDefense': return 'Защита';
        case 'fireRate': return 'Скорость';
        default: return '';
    }
}

function getLevelUpStatIcon(statId) {
    switch (statId) {
        case 'damage': return '⚔️';
        case 'critChance': return '🎯';
        case 'critMultiplier': return '💥';
        // «Шанс поджога» (Дарьяна) — та же ось данных, что и ранение, но подпись и
        // иконка меняются вслед за её собственной меткой (см. woundChanceLabel).
        case 'woundChance': return /поджог/i.test(activeHeroObject?.woundChanceLabel ?? '') ? '🔥' : '🩸';
        case 'heroHP': return '❤️';
        case 'heroDefense': return '🛡️';
        case 'fireRate': return '⚡';
        default: return '';
    }
}

function getLevelUpStatDisplay(statId) {
    switch (statId) {
        case 'damage': return `${Math.round(globalDamage)}`;
        case 'critChance': return `${(globalCritChance * 100).toFixed(2)}%`;
        case 'critMultiplier': return `${(globalCritMultiplier * 100).toFixed(2)}%`;
        case 'woundChance': return `${(globalWoundChance * 100).toFixed(2)}%`;
        case 'heroHP': return `${Math.round(heroHP.current)}/${Math.round(heroHP.max)}`;
        case 'heroDefense': return `${(heroDamageReduction * 100).toFixed(2)}%`;
        case 'fireRate': return `${Math.round(1000 - SHOT_INTERVAL)}`;
        default: return '';
    }
}

// Стат показываем в панели, только если он в принципе способен вырасти от временных
// улучшений за этот забег — те же условия, что isUpgradeStatEligibleNow выше, но
// проверенные от СТАРТОВОГО значения героя (если старт уже был на потолке/на полу —
// стат структурно заморожен весь забег, ни один вариант связки с ним не выпадет
// никогда, и строка в панели была бы бессмысленной).
function isTemporaryStatEverAvailable(statId) {
    switch (statId) {
        case 'damage':
            return true;
        case 'critMultiplier':
            return !Number.isFinite(globalCritMultiplierCap) || startGlobalCritMultiplier < globalCritMultiplierCap;
        case 'critChance':
            return !Number.isFinite(globalCritChanceCap) || startGlobalCritChance < globalCritChanceCap;
        case 'woundChance':
            return startGlobalWoundChance > 0
                && (!Number.isFinite(globalWoundChanceCap) || startGlobalWoundChance < globalWoundChanceCap);
        case 'heroHP':
            return !Number.isFinite(heroHpCap) || startGlobalHeroHp < heroHpCap;
        case 'heroDefense':
            return !Number.isFinite(heroDamageReductionCap) || startHeroDamageReduction < heroDamageReductionCap;
        case 'fireRate': {
            const floor = activeHeroObject?.minShotInterval;
            return !Number.isFinite(floor) || startSHOT_INTERVAL > floor;
        }
        default:
            return false;
    }
}

function buildLevelUpStatsPanelMarkup() {
    const chips = LEVEL_UP_STAT_IDS
        .filter(isTemporaryStatEverAvailable)
        .map(statId => `
            <div class="levelup-stat-row" data-stat="${statId}">
                <span class="levelup-stat-icon" aria-hidden="true">${getLevelUpStatIcon(statId)}</span>
                <span class="levelup-stat-text">
                    <span class="levelup-stat-label">${getLevelUpStatLabel(statId)}</span>
                    <span class="levelup-stat-value">${getLevelUpStatDisplay(statId)}</span>
                </span>
            </div>
        `)
        .join('');

    return `
        <div class="levelup-current-stats">
            <div class="levelup-current-stats-title">Ваши характеристики</div>
            <div class="levelup-current-stats-grid">${chips}</div>
        </div>
    `;
}

function applyLevelUpStatPreview(modal, statId, upgrade) {
    const rowEl = modal.querySelector(`.levelup-stat-row[data-stat="${statId}"]`);
    const valueEl = rowEl?.querySelector('.levelup-stat-value');
    if (!valueEl || typeof upgrade.preview !== 'function') return;

    const { text, isClamped } = upgrade.preview();
    valueEl.textContent = text;
    rowEl.classList.add('is-previewing');
    rowEl.classList.toggle('is-clamped', isClamped);
}

function clearLevelUpStatPreview(modal, statId) {
    const rowEl = modal.querySelector(`.levelup-stat-row[data-stat="${statId}"]`);
    const valueEl = rowEl?.querySelector('.levelup-stat-value');
    if (!valueEl) return;

    valueEl.textContent = getLevelUpStatDisplay(statId);
    rowEl.classList.remove('is-previewing', 'is-clamped');
}


// ==================== ДОБАВЛЯЕМ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

function getRarityName(rarity) {
    const names = {
        'common': 'Обычное',
        'uncommon': 'Необычное', 
        'rare': 'Редкое',
        'epic': 'Эпическое',
        'legendary': 'Легендарное'
    };
    return names[rarity] || 'Обычное';
}

function getRarityColor(rarity) {
    const colors = {
        'common': '#808080',
        'uncommon': '#1e7e34',
        'rare': '#007bff',
        'epic': '#6f42c1',
        'legendary': '#fd7e14'
    };
    return colors[rarity] || '#808080';
}



// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ УЛУЧШЕНИЙ ====================

function getRandomRarity() {
    const random = Math.random() * 100;
    
    if (random <= 50) return 'common';      // 50% - обычное
    if (random <= 85) return 'uncommon';    // 35% - необычное
    if (random <= 95) return 'rare';        // 10% - редкое
    if (random <= 99) return 'epic';        // 4% - эпическое
    return 'legendary';                     // 1% - легендарное
}

function getRarityMultiplier(rarity) {
    switch (rarity) {
        case 'common': return 1;
        case 'uncommon': return 1.25;
        case 'rare': return 1.5;
        case 'epic': return 2;
        case 'legendary': return 2.5;
        default: return 1;
    }
}

let messageOpen = false;
function showCenterText(text, duration = 2000, type = 'info') {
	if (messageOpen) {return};
    // Создаём элемент сообщения
    const message = document.createElement('div');
    message.className = `center-text-message center-text-${type}`;
    message.textContent = text;

    // Добавляем в body
    document.body.appendChild(message);

    // Принудительный reflow для анимации
    void message.offsetWidth;

    // Добавляем класс для появления
    message.classList.add('show');
	
	messageOpen = true; 

    // Автоматически удаляем через duration
    setTimeout(() => {
        message.classList.remove('show');
        message.classList.add('hide');
		messageOpen = false; 
        setTimeout(() => {
            if (message.parentNode) message.parentNode.removeChild(message);
        }, 500); // Время анимации исчезновения
    }, duration);

    return message;
}
// ==================== Звук ====================
function playDamageSound() {
    const volume = window.audioSettings?.getSfxVolumeFactor() ?? 0.10;
    if (volume <= 0) return;
    const audio = new Audio('sound/damage.wav');
    audio.volume = volume;
    audio.play();
}

// Низкочастотный "утяжеляющий" удар для тяжёлых атак Еремея.
// Синтезируется на лету (Web Audio), чтобы не тащить новый аудио-файл.
let eremeiThudAudioCtx = null;
function playEremeiImpactThud(isCritical = false) {
    const volume = window.audioSettings?.getSfxVolumeFactor() ?? 0.10;
    if (volume <= 0) return;
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        eremeiThudAudioCtx = eremeiThudAudioCtx || new Ctx();
        if (eremeiThudAudioCtx.state === 'suspended') eremeiThudAudioCtx.resume();

        const ctx = eremeiThudAudioCtx;
        const now = ctx.currentTime;
        const duration = isCritical ? 0.26 : 0.13;
        const startFreq = isCritical ? 150 : 115;
        const endFreq = isCritical ? 42 : 55;
        // Крит звучит вдвое громче обычного удара — соотношение внутри эффекта,
        // не «фиксированный уровень»: масштаб всё равно задаёт общий ползунок звука.
        const peakGain = (isCritical ? 0.32 : 0.16) * volume;

        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration + 0.02);
    } catch (e) {
        // Звук необязателен для игры — молча игнорируем сбой синтеза
    }
}

// ==================== ЗАПУСК ИГРЫ ====================

// Запускаем инициализацию игры после полной загрузки страницы
window.onload = initGame;
