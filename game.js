// ==================== ГЛОБАЛЬНЫЕ КОНСТАНТЫ И ПЕРЕМЕННЫЕ ====================
//clearGameState(); //очищаем прогресс для отладки 
    // Загружаем прогресс игрока (только чтение)

let gameStateLstorage = gameState;


const activeHeroStr = gameStateLstorage.activeHero;
const activeHeroObject = gameStateLstorage[activeHeroStr];


// DOM элементы - будут инициализированы после загрузки страницы
let gameField = null;          // Основное игровое поле
let enemiesContainer = null;   // Контейнер для всех врагов

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

function calculateBossMaxHealth(type, fallbackBaseHealth) {
    const balancedBaseHealth = BOSS_HEALTH_BALANCE.baseByType[type];
    if (!Number.isFinite(balancedBaseHealth)) {
        return Math.max(1, Math.floor(fallbackBaseHealth));
    }

    const parsedLevel = Number(lvlNumber);
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
    const configuredHealthMultiplier = bossCombatConfig?.bosses?.[type]?.healthMultiplier;
    const bossHealthMultiplier = Number.isFinite(configuredHealthMultiplier) && configuredHealthMultiplier > 0
        ? configuredHealthMultiplier
        : 1;

    const isRegionFinalBoss = type === 'enem5'
        && typeof levelCompletionConfig !== 'undefined'
        && levelCompletionConfig.isRegionFinal;
    const regionFinalMultiplier = isRegionFinalBoss
        ? BOSS_HEALTH_BALANCE.regionFinalBossMultiplier
        : 1;

    return Math.max(1, Math.round(
        balancedBaseHealth * levelMultiplier * bossHealthMultiplier * regionFinalMultiplier
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
	CASTLE_BASE_HP: activeHeroObject.castleHP,
	CASTLE_HP_PER_LEVEL: 20
};

let rowTotal = ""; //Строка итогов прохождения уровня

// Массив активных врагов - хранит все текущие объекты врагов
let activeEnemies = [];

// Здоровье крепости и завершение игры: 
let castleHealthBar = null;
let castleHealthText = null;
let castleLevelText = null;


let castleHP = {
    current: activeHeroObject.castleHP,
    max: activeHeroObject.castleHP,
    level: 1
};

const startGlobalCastleHp = activeHeroObject.castleHP;

castleHP.current = activeHeroObject.castleHP;
castleHP.max = activeHeroObject.castleHP;

let isGameOver = false;
let castleImage = null;


// Прицел и урон
let aimElement = null;
let damageContainer = null;
let countDamageBoss = 0; //счетчик ударов по боссу

const startGlobalDamage = activeHeroObject.startGlobalDamage; 
const startGlobalCritChance = activeHeroObject.startGlobalCritChance;    
const startGlobalCritMultiplier = activeHeroObject.startGlobalCritMultiplier; 

const startGlobalWoundChance = activeHeroObject.startGlobalWoundChance;
const startCastleDamageReduction = Math.min(
    MAX_CASTLE_DAMAGE_REDUCTION,
    activeHeroObject.startCastleDamageReduction
);
const startSHOT_INTERVAL = activeHeroObject.startSHOT_INTERVAL;
const TEMPORARY_UPGRADE_BASE_SHARE = 0.20;

// Глобальные параметры оглушения

let globalDamage = startGlobalDamage; // Базовый урон
let globalDamageBonusPercent = 0; // Прирост урона в процентах
const globalMaxDamageBonusPercent = activeHeroObject.maxDamageBonusPercentSize ?? 0; // Прирост урона в процентах
let globalDamageBonusPercentSize = activeHeroObject.DamageBonusPercentSize ?? 0; //Размер прироста в процентах
let blockCount = 0; //Счетчик заблокированных атак

let globalCritChance = startGlobalCritChance;    // 15% шанс критического удара
let globalCritMultiplier = startGlobalCritMultiplier; // 150% крит урон
const WOUND_DURATION = 5000; // 5 секунд в миллисекундах
let globalWoundChance = startGlobalWoundChance; // 30% шанс ранить при попадании
let aimPosition = { x: 0, y: 0 };
let isMobileDevice = false;
const MOBILE_AIM_OFFSET_Y = 48; // прицел чуть выше пальца, чтобы не закрывать цель
let lastTouchAimTime = 0;

let castleDamageReduction = startCastleDamageReduction;
const castleDamageReductionCap = getHeroDefenseCap(activeHeroObject);

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
    animatedHeroes: Object.freeze(['eremei', 'dunya', 'luka'])
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
            // Прогрев маски силуэта для стрел Луки
            ensureEnemyOpaqueSamples(this.element);
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

        const tryPlaceX = (leftEdge) => {
            const x = this.clampHorizontal(leftEdge);
            const left = x;
            const right = x + widthPct;
            const overlapsH = !(right <= boss.left || left >= boss.right);
            return { x, ok: !overlapsH };
        };

        const primary = preferLeft
            ? tryPlaceX(boss.left - widthPct)
            : tryPlaceX(boss.right);
        const secondary = preferLeft
            ? tryPlaceX(boss.right)
            : tryPlaceX(boss.left - widthPct);

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
	//урон по крепости:
	getDamageToCastle() {
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
    for (let i = activeEnemies.length - 1; i >= 0; i--) {
        const enemy = activeEnemies[i];
        const enemyElement = enemy.element;
        if (!enemyElement) continue;

        const enemyRect = enemyElement.getBoundingClientRect();
        const enemyCenterX = enemyRect.left + enemyRect.width / 2;
        const enemyCenterY = enemyRect.top + enemyRect.height / 2;
        const aimCenterX = x + fieldRect.left;
        const aimCenterY = y + fieldRect.top;

        const distanceX = Math.abs(aimCenterX - enemyCenterX);
        const distanceY = Math.abs(aimCenterY - enemyCenterY);
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
    
    initCastleHealth();
	
	   // Инициализация полоски здоровья босса
    initBossHealthBar();
	
    castleImage = document.getElementById('castleImage');
    
    // Инициализация прицела
    initAim();
    
    // Сбрасываем состояние игры к начальному
    resetGame();
    
    // requestAnimationFrame использует свою шкалу времени. Первый кадр сам
    // инициализирует отметку, чтобы не смешивать её с Date.now().
    lastFrameTime = null;
    
    // Запускаем игровой цикл
    requestAnimationFrame(gameLoop);
	
	showStartModal();
	
    
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
    castleHP.current = GAME_CONFIG.CASTLE_BASE_HP;
    castleHP.max = GAME_CONFIG.CASTLE_BASE_HP;
    castleHP.level = 1;
    updateCastleHealthDisplay();
    document.body.style.backgroundColor = '#D1B892';
	stopBossEvents();
	
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
    globalDamageBonusPercent = 0;
    blockCount = 0;
    countDamageBoss = 0;
    castleDamageReduction = startCastleDamageReduction;
    SHOT_INTERVAL = startSHOT_INTERVAL;
    
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


function spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed, isCustom=false, movementStyle='straight') {
    
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
	
	if ((timeSec2-lastTimeSec2)>=1 && (timeNextBoss-timeSec2)>0 && (timeNextBoss-timeSec2)<5 && !bossAlive) {
		lastTimeSec2 = timeSec2;
		showCenterText((timeNextBoss-timeSec2), 800, 'info');
	}
	
    if (timeSec2 >= timeNextBoss && !bossAlive && spawnEnabled) {
		disableSpawning(); 
	}	
	
	if (timeSec2 >= timeNextBoss && !bossAlive && !areThereAnyLiveEnemies() && bossTimer === null) {    
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
		
		startBossEvents();
	}
			

    
    checkAimAndDamage();
    
    for (let i = activeEnemies.length - 1; i >= 0; i--) {
        const enemy = activeEnemies[i];
        
        // Передаем deltaTime врагу для корректного движения
        const updateResult = enemy.update(deltaTime);
        
        if (updateResult === 'dead_from_wound') {
            handleEnemyDeath(enemy, 'wound');

            // Анимация смерти
            enemy.element.style.transition = 'all 0.3s ease';
            enemy.element.style.opacity = '0';
            enemy.applyDeathTransform();
            
            // Удаляем врага из массива и DOM
            setTimeout(() => {
                enemy.remove();
            }, 300);
            activeEnemies.splice(i, 1);
            continue;
        }
        
        if (updateResult) {
            // Враг достиг замка - наносим урон
            const damage = enemy.getDamageToCastle();
            damageCastle(damage);
            
            console.log(`${enemy.type} достиг крепости и нанес ${damage} урона!`);
            
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
                    movementStyle
                );
            }, telegraphMs);
        }, attackScheduleOffsets[shotIndex]);
    });

    bossWaveCounter++;
}


// ====================ФУНКЦИИ ЗДОРОВЬЯ КРЕПОСТИ И ЗАВЕРШЕНИЯ ИГРЫ ====================

 //* Инициализирует здоровье крепости
function initCastleHealth() {
    castleHealthBar = document.getElementById('castleHealthBar');
    castleHealthText = document.getElementById('castleHealthText');
    castleLevelText = document.getElementById('castleLevel');
    
    castleHP.current = GAME_CONFIG.CASTLE_BASE_HP;
    castleHP.max = GAME_CONFIG.CASTLE_BASE_HP;
    castleHP.level = 1;
    
    updateCastleHealthDisplay();
    console.log('Здоровье крепости инициализировано');
}

/**
 * Обновляет отображение здоровья крепости
 */
function updateCastleHealthDisplay() {
    if (!castleHealthBar || !castleHealthText) return;
    
    const healthPercent = (castleHP.current / castleHP.max) * 100;
    
    castleHealthBar.style.width = `${healthPercent}%`;
    
    if (healthPercent > 50) {
        castleHealthBar.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
    } else if (healthPercent > 25) {
        castleHealthBar.style.background = 'linear-gradient(to right, #FF9800, #FFC107)';
    } else {
        castleHealthBar.style.background = 'linear-gradient(to right, #F44336, #FF5722)';
    }
    
    castleHealthText.textContent = activeHeroObject.dispName;
	const heroImage = document.getElementById('heroImage');
	heroImage.src = activeHeroObject.image;
    
    if (castleLevelText) {
        castleLevelText.textContent = castleHP.level;
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
 * Наносит урон крепости
 * //@param {number} damage - количество урона
 */
/**
 * Наносит урон крепости
 * @param {number} damage - количество урона
 */
function damageCastle(damage) {
    if (isGameOver) return;
    
	
	damage = Math.floor((damage * (1-castleDamageReduction)));
	
    // Запускаем анимацию удара по замку
    animateCastleHit();
    
    // Уменьшаем здоровье
    castleHP.current -= damage;
    
    // Ограничиваем снизу
    if (castleHP.current < 0) {
        castleHP.current = 0;
    }
    
    // Обновляем отображение
    updateCastleHealthDisplay();
    
    // Логируем урон
    console.log(`Крепость получила ${damage} урона. Осталось здоровья: ${castleHP.current}`);
    
    // Проверяем конец игры
    if (castleHP.current <= 0) {
        gameOver();
    }
}

/**
 * Запускает анимацию удара по замку
 */
function animateCastleHit() {
    if (!castleImage) return;
    
    // Удаляем класс, если он уже есть (для перезапуска анимации)
    castleImage.classList.remove('castle-hit-animation');
    
    // Триггерим перерисовку DOM
    void castleImage.offsetWidth;
	
	 const heroImage = document.getElementById('heroImage');
	 const hpImage = document.getElementById('hpCont');
    
    // Добавляем класс с анимацией
    castleImage.classList.add('castle-hit-animation');
	hpImage.classList.add('castle-hit-animation');
	heroImage.classList.add('castle-hit-animation');
    
    // Удаляем класс после завершения анимации
    setTimeout(() => {
        castleImage.classList.remove('castle-hit-animation');
		hpImage.classList.remove('castle-hit-animation');
		heroImage.classList.remove('castle-hit-animation');
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

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showEndGameModal(victory, timeSeconds) {
    // Доигрываем текущую композицию, но после неё оставляем экран результата в тишине.
    window.battleMusic?.setCombatActive(false);

    // Ставим игру на паузу, если ещё не
    if (!isGamePaused && !isGameOver) {
        pauseGame();
    }
	
	if(victory) {
		completeLevel();
	}
	
	const bossCount = Array.isArray(bossM) && bossM.length > 0 ? bossM.length : 5;
	const zlatP = getLevelZlataPayout(lvlNumber, countDefeatBoss, bossCount);
	if(zlatP >0){addZlat(zlatP)};
	
    const modal = document.createElement('div');
    modal.className = 'level-up-modal endgame-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${victory ? 'ПОБЕДА!' : 'ПОРАЖЕНИЕ!'}</h2>
            <p class="modal-subtitle">${victory ? 'Последний противник побежден!' : 'Ваш персонаж побежден'}</p>
            <div class="endgame-stats">
                <div class="resource-line"> Получено злат: <span>${zlatP} <img src='images/other/zlata.webp' class='zlatImg'></span> </div>
                <div class="time-line">Время прохождения: <span>${formatTime(timeSeconds)}</span></div>` 
				+ rowTotal + 	
            `</div>
            <div class="endgame-buttons">
                <button class="endgame-button restart">Еще разок</button>
                <button class="endgame-button base">На базу</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Кнопка "Еще разок" – перезагрузка страницы
    modal.querySelector('.restart').addEventListener('click', () => {
        location.reload();
    });

    // Кнопка "На базу" – пока просто закрывает окно
	modal.querySelector('.base').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
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

    setupDesktopAim();
    if (isMobileDevice || ('ontouchstart' in window)) {
        setupMobileAim();
    }

    console.log(`Игра запущена на ${isMobileDevice ? 'мобильном устройстве' : 'компьютере'}`);
}

/**
 * Настраивает прицел для компьютеров (следует за курсором)
 */
function setupDesktopAim() {
    // Следим за движением мыши
    gameField.addEventListener('mousemove', function(e) {
        // На мобилке цель ведёт только touch; после тапа игнорируем синтетическую мышь
        if (isMobileDevice || Date.now() - lastTouchAimTime < 500) return;
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
        // Не перехватываем жесты на модалках вне поля — слушаем только gameField
        e.preventDefault();
        lastTouchAimTime = Date.now();
        const touch = e.touches[0];
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
    const damageResult = calculateDamage(isBoss);
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
    } else if (predictedDestroyed) {
        showEremeiDeflectImpact(enemy, damageResult.isCritical, timing);
        showDunyaDeflectImpact(enemy, damageResult.isCritical, timing);
        showLukaDeflectImpact(enemy, damageResult.isCritical, timing);
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
        if (enemy.element) {
            enemy.element.style.filter = 'brightness(1)';
        }
    }, 100);
    
    // Проверяем, умер ли враг
    if (enemy.hp <= 0) {
        // Анимация смерти
		handleEnemyDeath(enemy, 'player');
		
        enemy.element.style.transition = 'all 0.3s ease';
        enemy.element.style.opacity = '0';
        enemy.applyDeathTransform();
         
        // Удаляем врага через короткую задержку для анимации
        setTimeout(() => {
            enemy.remove();
        }, 300);

        const currentIndex = activeEnemies.indexOf(enemy);
        if (currentIndex !== -1) activeEnemies.splice(currentIndex, 1);
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


//* Рассчитывает урон с учетом шанса критического удара
function calculateDamage(isBoss) {
    // Базовый урон
    let damage = (globalDamage+ (globalDamage * globalDamageBonusPercent));
    let isCritical = false;
    
    // Проверяем, выпал ли критический удар
    const random = Math.random(); // Случайное число от 0 до 1
    
    if (random < globalCritChance) {
        // КРИТИЧЕСКИЙ УДАР!
        isCritical = true;
    }
	
	const heroCriticalResult = subsCalculateDamageEnemy(isBoss, isCritical);
	isCritical = heroCriticalResult.isCritical;
	
	if (isCritical) {
		damage *= globalCritMultiplier;
		console.log(`Критический удар! Множитель: x${globalCritMultiplier}`);
	}
    
    // Округляем до целого числа
    damage = Math.round(damage);
    
    return {
        damage: damage,
        isCritical: isCritical,
        isCountShot: heroCriticalResult.isCountShot
    };
}

function addDamageBonus() {
	const previousBonus = globalDamageBonusPercent;
	globalDamageBonusPercent = Math.min(
		globalMaxDamageBonusPercent,
		globalDamageBonusPercent + globalDamageBonusPercentSize
	);
	return globalDamageBonusPercent > previousBonus;
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

function showEremeiBossImpact(boss, isCritical = false, timing = getHeroAttackTiming(SHOT_INTERVAL)) {
    if (activeHeroObject?.name !== 'eremei' || !boss?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(boss.element);
    if (!pos) return;

    // Один полный взмах по боссу: старый эффект снимаем.
    enemiesContainer.querySelectorAll('.eremei-boss-impact:not(.is-mini)').forEach((node) => node.remove());

    const swingVariants = [
        'eremei-club-from-left',
        'eremei-club-from-right',
        'eremei-club-from-top',
        'eremei-club-from-bottom'
    ];
    const swingClass = swingVariants[Math.floor(Math.random() * swingVariants.length)];

    const impact = document.createElement('div');
    impact.className = `eremei-boss-impact${isCritical ? ' eremei-boss-impact-critical' : ''}`;
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    const swingDurationMs = Math.max(140, Math.round(timing.impactDelayMs / 0.62));
    impact.style.setProperty('--eremei-swing-duration', `${swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');
    impact.innerHTML = `
        <span class="eremei-force eremei-force-ring eremei-force-ring-a"></span>
        <span class="eremei-force eremei-force-ring eremei-force-ring-b"></span>
        <span class="eremei-heavy-core"></span>
        <span class="eremei-dust eremei-dust-a"></span>
        <span class="eremei-dust eremei-dust-b"></span>
        <span class="eremei-debris eremei-debris-1"></span>
        <span class="eremei-debris eremei-debris-2"></span>
        <span class="eremei-debris eremei-debris-3"></span>
        <span class="eremei-debris eremei-debris-4"></span>
        <span class="eremei-debris eremei-debris-5"></span>
        <span class="eremei-impact-spark"></span>
        <span class="eremei-club ${swingClass}"></span>
    `;
    enemiesContainer.appendChild(impact);

    window.setTimeout(() => impact.remove(), swingDurationMs + 160);
}

function showEremeiDeflectImpact(attackEnemy, isCritical = false, timing = getHeroDeflectTiming()) {
    if (activeHeroObject?.name !== 'eremei' || !attackEnemy?.element || !enemiesContainer || !gameField) return;

    const pos = getImpactFieldPercent(attackEnemy.element);
    if (!pos) return;

    pruneImpactNodes('.eremei-boss-impact.is-mini', 3);

    const swingVariants = [
        'eremei-club-from-left',
        'eremei-club-from-right',
        'eremei-club-from-top',
        'eremei-club-from-bottom'
    ];
    const swingClass = swingVariants[Math.floor(Math.random() * swingVariants.length)];

    const impact = document.createElement('div');
    impact.className = `eremei-boss-impact is-mini${isCritical ? ' eremei-boss-impact-critical' : ''}`;
    impact.style.left = `${pos.left}%`;
    impact.style.top = `${pos.top}%`;
    const swingDurationMs = Math.max(120, Math.round(timing.impactDelayMs / 0.62));
    impact.style.setProperty('--eremei-swing-duration', `${swingDurationMs}ms`);
    impact.setAttribute('aria-hidden', 'true');
    impact.innerHTML = `
        <span class="eremei-force eremei-force-ring eremei-force-ring-a"></span>
        <span class="eremei-heavy-core"></span>
        <span class="eremei-dust eremei-dust-a"></span>
        <span class="eremei-debris eremei-debris-1"></span>
        <span class="eremei-debris eremei-debris-2"></span>
        <span class="eremei-debris eremei-debris-3"></span>
        <span class="eremei-impact-spark"></span>
        <span class="eremei-club ${swingClass}"></span>
    `;
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

function handleEnemyDeath(enemy, cause = 'player') {
    if (enemy.type === bossAliveName) {
		countDefeatBoss++;

        // Удаляем именно побеждённого босса. Победа определяется отсутствием
        // следующих боссов, а не жёстко заданным именем вроде enem5.
        const defeatedBossIndex = bossM.indexOf(enemy.type);
        if (defeatedBossIndex !== -1) {
            bossM.splice(defeatedBossIndex, 1);
        }

        killAllEnemies();
        hideBossHealthBar();
        stopBossEvents();
        currentBoss = null;

        if (bossM.length === 0) {
            pauseGame();
            showEndGameModal(true, timeSec2);
            return; // Финальный босс не даёт опыт внутри завершённого боя
        }

        // В последовательности остались боссы — готовим следующую встречу.
		window.battleMusic?.setContext(buildBattleMusicContext(bossM[0]));
        giveExperienceForKill(enemy.type);
        timeNextBoss = timeSec2 + bossInterval;
        enableSpawning();   // Включаем спавн обычных врагов
        return;
    }

}

function killAllEnemies() {
    // Создаем копию массива, чтобы безопасно итерироваться
    const enemiesToKill = [...activeEnemies];
    
    enemiesToKill.forEach(enemy => {

        // Анимация смерти
        if (enemy.element) {
            enemy.element.style.transition = 'all 0.3s ease';
            enemy.element.style.opacity = '0';
            enemy.applyDeathTransform();
            
            setTimeout(() => {
                enemy.remove();
            }, 300);
        }
    });
    
    // Очищаем массив активных врагов
    activeEnemies.length = 0;
    
    console.log(`Уничтожено ${enemiesToKill.length} врагов`);
}

//=====================Подписки на события и особенности героев========================

function subsDamageEnemy(isBoss, isDestroyed) {
	
	//Способность Еремея 	
	if(activeHeroObject.name === 'eremei' && !isBoss && isDestroyed) {
		blockCount++;
		const bonusIncreased = addDamageBonus();

		if (bonusIncreased && (blockCount % 5 === 0 || globalDamageBonusPercent >= globalMaxDamageBonusPercent)) {
			showCenterText(
				`Отбивальщик: урон +${Math.round(globalDamageBonusPercent * 100)}%`,
				1000,
				'info'
			);
		}
	}
			
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
function showLevelUpModal() {
	
	openLevelUpModal = true;
	
    return new Promise((resolve) => {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'level-up-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🎉 УРОВЕНЬ ${playerLevel} 🎉</h2>
                <p class="modal-subtitle">Выберите одно временное улучшение:</p>
                <div class="upgrade-options" id="upgradeOptions"></div>
            </div>
        `;
        
		 pauseGame();
        document.body.appendChild(modal);
        
        // Определяем доступные улучшения
        const availableUpgrades = getAvailableUpgrades();
        
        // Выбираем 3 случайных улучшения
        const selectedUpgrades = selectRandomUpgrades(availableUpgrades, 3);
        
        // Создаем кнопки для выбора улучшений
        const upgradeOptions = document.getElementById('upgradeOptions');
        
        selectedUpgrades.forEach((upgrade) => {
            const upgradeButton = document.createElement('div');
            upgradeButton.className = `upgrade-option rarity-${upgrade.rarity}`;
            upgradeButton.innerHTML = `
                <div class="upgrade-title" style="color: ${getRarityColor(upgrade.rarity)}">${upgrade.name}</div>
                <div class="upgrade-effect">${upgrade.description}</div>
                <div class="upgrade-rarity">${getRarityName(upgrade.rarity)}</div>
            `;
            
            upgradeButton.addEventListener('click', () => {
                // Применяем выбранное улучшение
                upgrade.apply();
                
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

// ==================== ПОЛУЧЕНИЕ ДОСТУПНЫХ УЛУЧШЕНИЙ ====================

// ==================== ИСПРАВЛЯЕМ ФУНКЦИЮ getAvailableUpgrades ====================

function getAvailableUpgrades() {
    const upgrades = [];
    
    // 1. Урон
    const damageRarity = getRandomRarity();
    const damageMultiplier = getRarityMultiplier(damageRarity);
    const damageIncrease = Math.round(
        startGlobalDamage * TEMPORARY_UPGRADE_BASE_SHARE * damageMultiplier
    );
    upgrades.push({
        id: 'damage',
        name: 'Урон',
        description: `+${damageIncrease} к урону`,
        rarity: damageRarity,
        apply: function() {
            globalDamage += damageIncrease;
            console.log(`Урон увеличен до: ${globalDamage} (множитель: ${damageMultiplier}x)`);
        }
    });
    
    // 2. Шанс крита - проверяем, что еще не достиг максимума (1 = 100%)
    if (globalCritChance < 1) {
        const critChanceRarity = getRandomRarity();
        const critChanceMultiplier = getRarityMultiplier(critChanceRarity);
        const critChanceIncrease = Math.min(
            startGlobalCritChance * TEMPORARY_UPGRADE_BASE_SHARE * critChanceMultiplier,
            1 - globalCritChance
        );
        upgrades.push({
            id: 'critChance',
            name: 'Шанс крита',
            description: `+${(critChanceIncrease * 100).toFixed(2)}% к шансу крита`,
            rarity: critChanceRarity,
            apply: function() {
                globalCritChance = Math.min(1, globalCritChance + critChanceIncrease);
                console.log(`Шанс крита увеличен до: ${(globalCritChance * 100).toFixed(2)}% (множитель: ${critChanceMultiplier}x)`);
            }
        });
    }
    
    // 3. Множитель крита - всегда доступен
    const critMultiplierRarity = getRandomRarity();
    const critMultiplierMultiplier = getRarityMultiplier(critMultiplierRarity);
    const critMultiplierIncrease = startGlobalCritMultiplier * TEMPORARY_UPGRADE_BASE_SHARE * critMultiplierMultiplier;
    upgrades.push({
        id: 'critMultiplier',
        name: 'Множитель крита',
        description: `+${critMultiplierIncrease.toFixed(2)} к множителю крита`,
        rarity: critMultiplierRarity,
        apply: function() {
            globalCritMultiplier += critMultiplierIncrease;
            console.log(`Множитель крита увеличен до: ${globalCritMultiplier.toFixed(2)} (множитель: ${critMultiplierMultiplier}x)`);
        }
    });
    
    // 4. Шанс ранения - проверяем, что еще не достиг максимума
    if (globalWoundChance < 1) {
        const woundChanceRarity = getRandomRarity();
        const woundChanceMultiplier = getRarityMultiplier(woundChanceRarity);
        const woundChanceIncrease = Math.min(
            startGlobalWoundChance * TEMPORARY_UPGRADE_BASE_SHARE * woundChanceMultiplier,
            1 - globalWoundChance
        );
        upgrades.push({
            id: 'woundChance',
            name: 'Шанс ранения',
            description: `+${(woundChanceIncrease * 100).toFixed(2)}% к шансу ранения`,
            rarity: woundChanceRarity,
            apply: function() {
                globalWoundChance = Math.min(1, globalWoundChance + woundChanceIncrease);
                console.log(`Шанс ранения увеличен до: ${(globalWoundChance * 100).toFixed(2)}% (множитель: ${woundChanceMultiplier}x)`);
            }
        });
    }
    
    
    // 6. Здоровье  - всегда доступно
    const castleHpRarity = getRandomRarity();
    const castleHpMultiplier = getRarityMultiplier(castleHpRarity);
    const castleHpIncrease = Math.round(
        startGlobalCastleHp * TEMPORARY_UPGRADE_BASE_SHARE * castleHpMultiplier
    );
    upgrades.push({
        id: 'castleHP',
        name: 'Здоровье',
        description: `+${castleHpIncrease} к здоровью`,
        rarity: castleHpRarity,
        apply: function() {
            castleHP.max += castleHpIncrease;
            castleHP.current += castleHpIncrease;
            updateCastleHealthDisplay();
            console.log(`Здоровье увеличено до: ${castleHP.max} (множитель: ${castleHpMultiplier}x)`);
        }
    });
    
    // 7. Защита — после достижения 60% больше не предлагается
    if (castleDamageReduction < castleDamageReductionCap) {
        const defenseRarity = getRandomRarity();
        const defenseMultiplier = getRarityMultiplier(defenseRarity);
        const defenseIncrease = Math.min(
            startCastleDamageReduction * TEMPORARY_UPGRADE_BASE_SHARE * defenseMultiplier,
            castleDamageReductionCap - castleDamageReduction
        );
        upgrades.push({
            id: 'castleDefense',
            name: 'Защита',
            description: `+${(defenseIncrease * 100).toFixed(2)}% к защите`,
            rarity: defenseRarity,
            apply: function() {
                castleDamageReduction = Math.min(
                    castleDamageReductionCap,
                    castleDamageReduction + defenseIncrease
                );
                console.log(`Защита увеличена до: ${(castleDamageReduction * 100).toFixed(2)}% (множитель: ${defenseMultiplier}x)`);
            }
        });
    }
    
    // 8. Скорострельность - проверяем, что еще не достиг минимума (200 мс)
    if (SHOT_INTERVAL > 200) {
        const fireRateRarity = getRandomRarity();
        const fireRateMultiplier = getRarityMultiplier(fireRateRarity);
        const fireRateDecrease = Math.min(
            (1000 - startSHOT_INTERVAL) * TEMPORARY_UPGRADE_BASE_SHARE * fireRateMultiplier,
            SHOT_INTERVAL - 200
        );
        
        upgrades.push({
            id: 'fireRate',
            name: 'Скорость атаки',
            description: `Увеличивает скорость атаки на ${fireRateDecrease}`,
            rarity: fireRateRarity,
            apply: function() {
                SHOT_INTERVAL = Math.max(200, SHOT_INTERVAL - fireRateDecrease);
                console.log(`Интервал стрельбы уменьшен до: ${SHOT_INTERVAL} мс (множитель: ${fireRateMultiplier}x)`);
            }
        });
    }
    
    return upgrades;
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

function selectRandomUpgrades(upgrades, count) {
    const shuffled = [...upgrades].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
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
    const audio = new Audio('sound/damage.wav');
    audio.volume = 0.02; // 30% громкости (0.0 - 1.0)
    audio.play();
}

// ==================== ЗАПУСК ИГРЫ ====================

// Запускаем инициализацию игры после полной загрузки страницы
window.onload = initGame;
