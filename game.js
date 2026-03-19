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

let timeGame   = 0;

// Параметры типов врагов - характеристики для каждого типа врагов

 //clearGameState();//для отладки
// ==================== Боссы ====================
 let bossAlive = false;
 let bossAliveName = ''; 

 let bossTimer = null;
 

bossDelayAb = 1000;


 
bossDelayAbDop = 5000;

let spawnEnabled = true; // По умолчанию спавн включен

// Полоска HP босса
let bossHealthBar = null;
let bossHealthFill = null;
let bossHealthContainer = null;
let bossNameElement = null;
let currentBoss = null;

// Конфигурация игры - основные настройки
const GAME_CONFIG = {
    START_Y: 5,           // Начальная позиция Y (выше экрана)
    TARGET_Y: 73,           // Целевая позиция Y (красная линия/замок)
	CASTLE_BASE_HP: 300,
	CASTLE_HP_PER_LEVEL: 20
};

// Массив активных врагов - хранит все текущие объекты врагов
let activeEnemies = [];

// Таймеры - для контроля времени в игре
let lastSpawnTime = 0;      // Время последнего спавна врага
let gameStartTime = 0;      // Время начала игры


// Здоровье крепости и завершение игры: 
let castleHealthBar = null;
let castleHealthText = null;
let castleLevelText = null;


let castleHP = {
    current: 100,
    max: 100,
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

const startGlobalDamage = activeHeroObject.startGlobalDamage; 
const startGlobalCritChance = activeHeroObject.startGlobalCritChance;    
const startGlobalCritMultiplier = activeHeroObject.startGlobalCritMultiplier; 

const startGlobalWoundChance = activeHeroObject.startGlobalWoundChance;
const startCastleDamageReduction = activeHeroObject.startCastleDamageReduction;
const startSHOT_INTERVAL = activeHeroObject.startSHOT_INTERVAL;

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

let castleDamageReduction = startCastleDamageReduction;

// Таймер для стрельбы
let lastShotTime = 0;
let SHOT_INTERVAL = startSHOT_INTERVAL; // Стреляем каждые 100мс (10 раз в секунду)


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
		
		this.dispName = ENEMY_TYPES[type].dispName;
        
        // Рассчитываем финальные параметры с учетом глобальных множителей
        this.hp = Math.floor(ENEMY_TYPES[type].baseHP);
		this.maxHP = Math.floor(ENEMY_TYPES[type].baseHP);
        this.damage = Math.floor(ENEMY_TYPES[type].baseDamage);
        
        
        // Скорость в процентах высоты экрана в секунду
        this.speedPercentPerSecond = ENEMY_TYPES[type].baseSpeed * ANIMATION_PARAMS.BASE_SPEED;
        
        // Параметры для анимаций (в единицах в секунду)
        this.swaySpeed = ANIMATION_PARAMS.SWAY_SPEED; // радиан в секунду
        this.tiltSpeed = ANIMATION_PARAMS.TILT_SPEED; // радиан в секунду
        
        // Начальные фазы
        this.swayTime = Math.random() * Math.PI * 2;
        this.tiltTime = Math.random() * Math.PI * 2;
        
        // Параметры движения
        this.x = xPos;                      // Горизонтальная позиция в %
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
        // Создаем DOM элемент для отображения врага
        this.element = this.createEnemyElement();
        
        // Добавляем созданный элемент в контейнер врагов
        enemiesContainer.appendChild(this.element);
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
        
        // Устанавливаем размер в зависимости от типа врага
        img.style.width = ENEMY_TYPES[this.type].size;
        
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
			handleEnemyDeath(this, 'wound');
            return 'dead_from_wound';
        }
        
        // Двигаем врага вниз (в пикселях)
        this.pixelY += this.speedPixelsPerSecond * deltaSeconds;
        
        // Обновляем позицию в процентах
        this.y = (this.pixelY / this.fieldHeight) * 100;
        
        // Движение змейкой (горизонтальное покачивание)
        this.swayTime += this.swaySpeed * deltaSeconds;
		const swayPixels =
		  Math.sin(this.swayTime) * ANIMATION_PARAMS.SWAY_PIXELS;

		// перевод пикселей → проценты
		const swayPercent =
		  (swayPixels / this.fieldWidth) * 100;

		let newX = this.x + swayPercent;
        this.x = Math.max(5, Math.min(95, newX));
        
        // Обновляем пиксельную позицию X
        this.pixelX = (this.x / 100) * this.fieldWidth;
        
        // Наклон врага (вращение)
        this.tiltTime += this.tiltSpeed * deltaSeconds;
        const tiltAngle = Math.sin(this.tiltTime) * ANIMATION_PARAMS.TILT_AMPLITUDE;
        
        // Применяем вычисленные позицию и вращение к DOM элементу
        this.element.style.left = this.x + '%';
        this.element.style.top = this.y + '%';
        this.element.style.transform = `rotate(${tiltAngle}deg)`;
        
        // Проверяем, достиг ли враг красной линии
        return this.y >= GAME_CONFIG.TARGET_Y;
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
    
    // Запоминаем время начала игры
    gameStartTime = Date.now();
    lastSpawnTime = Date.now();
    lastFrameTime = Date.now();
    
    // Запускаем игровой цикл
    requestAnimationFrame(gameLoop);
	
	showStartModal();
	
    
    console.log('Игра запущена!');
	
	 gameField.addEventListener('click', function(e) {
        if (isGameOver || isGamePaused) return;

        const rect = gameField.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const enemy = getEnemyAtPoint(clickX, clickY);
        if (enemy) {
            showCenterText('Не нужно тыкать, просто наводи!', 1500, 'info');
        }
    });
}

/**
 * Сбрасывает состояние игры к начальным значениям
 */
function resetGame() {
    isGameOver = false;
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
    
    activeEnemies.forEach(enemy => enemy.remove());
    activeEnemies = [];
    
    // Сбрасываем статы игрока
    globalDamage = startGlobalDamage;
    globalCritChance = startGlobalCritChance;
    globalCritMultiplier = startGlobalCritMultiplier;
    globalWoundChance = startGlobalWoundChance;
    castleDamageReduction = startCastleDamageReduction;
    SHOT_INTERVAL = startSHOT_INTERVAL;
    
    lastSpawnTime = 0;
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


function spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed, isCustom=false) {
    
    if(!bossAlive && !bossM.includes(type)){return};
    
    try {
        // Проверяем, существует ли тип врага
        if (!ENEMY_TYPES[type]) {
            console.warn(`Тип врага ${type} не найден!`);
            return null;
        }
        
         
        
        // Создаем врага
        const enemy = new Enemy(type, xPos);
        
        enemy.isCustom = isCustom;
        
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
        }
        
        // Обновляем позицию элемента в DOM
        enemy.element.style.left = enemy.x + '%';
        enemy.element.style.top = enemy.y + '%';
        
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
 let lastFrameTime = 0;
 
 let timeSec = 0; 
 let timeSec1 = 0;
 let timeSec2 = 0;
 let lastTimeSec2 = 0;
 
function gameLoop(currentTime) {
	
	timeGame = (Date.now() - gameStartTime); 
	timeSec = Math.round(((timeGame) /1000));
	if (timeSec > timeSec1){
		timeSec1++;
			if (!isGamePaused) {timeSec2++}; 
	}
	
    if (isGameOver || isGamePaused) {
        requestAnimationFrame(gameLoop);
        return;
    }
	
	if ((timeSec2-lastTimeSec2)>=1 && (timeNextBoss-timeSec2)>0 && (timeNextBoss-timeSec2)<5 && !bossAlive) {
		lastTimeSec2 = timeSec2;
		showCenterText((timeNextBoss-timeSec2), 800, 'info');
	}
	
	console.log("Время прошло:" +timeSec2);
		

    
    // Вычисляем deltaTime (время с предыдущего кадра в миллисекундах)
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
	

	if (timeSec2 >= timeNextBoss && !bossAlive && spawnEnabled) {
		disableSpawning(); 
	}	
	
	if (timeSec2 >= timeNextBoss && !bossAlive && !areThereAnyLiveEnemies() && bossTimer === null) {    
		bossAliveName = bossM[0];
		let xPos = ENEMY_TYPES[bossAliveName]?.xPos ?? 40;
		const boss = spawnEnemyWithParams(bossAliveName, xPos, 13); 
		// spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
		bossAlive = true;
		currentBoss = boss; // Сохраняем ссылку на босса
		
		// Показываем полоску здоровья босса
		if (boss) {
			showBossHealthBar(boss);
		}
		
		startBossEvents();
	}
			

    
    // Ограничиваем deltaTime, чтобы избежать скачков при длительных паузах
    const clampedDeltaTime = Math.min(deltaTime, 100);
      
    checkAimAndDamage();
	
		
    
    if (spawnEnabled) {
        const now = Date.now();
        if (now - lastSpawnTime > GAME_CONFIG.SPAWN_INTERVAL) {
            lastSpawnTime = now;
        }
    }
    
    for (let i = activeEnemies.length - 1; i >= 0; i--) {
        const enemy = activeEnemies[i];
        
        // Передаем deltaTime врагу для корректного движения
        const updateResult = enemy.update(clampedDeltaTime);
        
        if (updateResult === 'dead_from_wound') {
            
            console.log(`${enemy.type} умер от ранения!`);
			handleEnemyDeath(this);
            
            // Анимация смерти
            enemy.element.style.transition = 'all 0.3s ease';
            enemy.element.style.opacity = '0';
            enemy.element.style.transform = 'scale(0) rotate(180deg)';
            
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
	bossDelayAb    = bossObject.bossDelayAb;
        // Таймер каждую секунду (1000мс)
        bossTimer = setInterval(() => {

            
            // Выполняем событие босса
            executeBossEvent();
            
        }, bossDelayAbDop); 
}

function stopBossEvents() {
    bossAlive = false;
    if (bossTimer) {
        clearInterval(bossTimer);
        bossTimer = null;
        console.log('События босса остановлены');
    }
}

function executeBossEvent() {
		bossAbD =  bossAbilitiesDop.filter(ba => ba.boss === bossAliveName);
		bossAb  =  bossAbilities.filter(ba => ba.boss === bossAliveName);
		console.log(bossAliveName);
		randomAbilityIndex = Math.floor(Math.random() * bossAbD.length);
		randomAbilityM = bossAbD[randomAbilityIndex].indexAbilities;
	//	console.log( 'bossAbD равен'+randomAbilityM);
		
		let ind =0;
		const intr = setInterval(() => {
        if (ind >= randomAbilityM.length) {
            clearInterval(intr);
            return;
        }
        
        const activeAbility = randomAbilityM[ind];
		abObject = bossAb[activeAbility];
		
		if (activeEnemies.length <= randomAbilityM.length+1 && !isGamePaused && !isGameOver) {
			spawnEnemyWithParams(abObject.type, abObject.xPos, abObject.yPos, abObject.customHP, abObject.customDamage, abObject.customSpeed, true);
        }
		
        ind++;
    }, bossDelayAb);		
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
    bossNameElement = document.getElementById('bossName');
    
    if (!bossHealthContainer || !bossHealthFill || !bossNameElement) {
        console.error('Элементы полоски здоровья босса не найдены!');
        return;
    }
    
    console.log('Полоска здоровья босса инициализирована');
}

/**
 * Показывает полоску здоровья босса
 * @param {Enemy} boss - объект босса
 */
function showBossHealthBar(boss) {
    if (!bossHealthContainer || !bossHealthFill || !bossNameElement) return;
    
    currentBoss = boss;
    
    // Убедимся, что у босса есть maxHP
    if (!boss.maxHP) {
        boss.maxHP = boss.hp;
    }
    

    
    const bossDisplayName =currentBoss.dispName;
    bossNameElement.textContent = bossDisplayName;
    
    // Сбрасываем полоску здоровья
    const healthPercent = (boss.hp / boss.maxHP) * 100;
    bossHealthFill.style.width = `${healthPercent}%`;
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
    
    currentBoss = null;
    bossHealthContainer.classList.remove('show');
    
    console.log('Полоска здоровья босса скрыта');
}

/**
 * Обновляет полоску здоровья босса
 */
function updateBossHealthBar() {
    if (!currentBoss || !bossHealthFill) {
        return;
    }
    
    // Защита от деления на ноль
    if (!currentBoss.maxHP || currentBoss.maxHP <= 0) {
        console.warn('maxHP босса некорректно:', currentBoss.maxHP);
        return;
    }
    
    const healthPercent = (currentBoss.hp / currentBoss.maxHP) * 100;
    bossHealthFill.style.width = `${healthPercent}%`;
    
    // Добавляем анимацию урона
    bossHealthFill.classList.add('damaged');
    setTimeout(() => {
        if (bossHealthFill) {
            bossHealthFill.classList.remove('damaged');
        }
    }, 500);
    
    // Если здоровье низкое, добавляем пульсацию
    if (healthPercent <= 25 && !bossHealthFill.classList.contains('low-health')) {
        bossHealthFill.classList.add('low-health');
    } else if (healthPercent > 25 && bossHealthFill.classList.contains('low-health')) {
        bossHealthFill.classList.remove('low-health');
    }
    
    // Если здоровье кончилось, скрываем полоску через секунду
    if (healthPercent <= 0) {
        setTimeout(() => {
            hideBossHealthBar();
        }, 1000);
    }
    
    // Отладочный вывод
    console.log(`Босс HP: ${currentBoss.hp}/${currentBoss.maxHP} (${healthPercent.toFixed(1)}%)`);
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
	
	 heroImage = document.getElementById('heroImage');
	 hpImage   = document.getElementById('hpCont');
    
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
    // Ставим игру на паузу, если ещё не
    if (!isGamePaused && !isGameOver) {
        pauseGame();
    }
	
	if(victory) {
		completeLevel();
	}
	
    const modal = document.createElement('div');
    modal.className = 'level-up-modal endgame-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${victory ? 'ПОБЕДА!' : 'ПОРАЖЕНИЕ!'}</h2>
            <p class="modal-subtitle">${victory ? 'Последний противник побежден!' : 'Ваш персонаж побежден'}</p>
            <div class="endgame-stats">
                <div class="resource-line">Ресурсы: <span>0</span></div>
                <div class="time-line">Время: <span>${formatTime(timeSeconds)}</span></div>
            </div>
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
        resumeGame(); // Снимаем паузу
    });
}

// ==================== ФУНКЦИИ ПРИЦЕЛА И УРОНА ====================


/**
 * Настраивает прицел для мобильных устройств (следует за тапом)
 */
// ==================== ФУНКЦИИ ПРИЦЕЛА И УРОНА ====================

/**
 * Инициализирует прицел и определяет тип устройства
 */
function initAim() {
    aimElement = document.getElementById('aim');
    damageContainer = document.getElementById('damage-container');
    
    
    setupDesktopAim();

    
    console.log(`Игра запущена на ${isMobileDevice ? 'мобильном устройстве' : 'компьютере'}`);
}

/**
 * Настраивает прицел для компьютеров (следует за курсором)
 */
function setupDesktopAim() {
    // Для ПК прицел невидим, используем системный курсор
/*     if (aimElement) {
        aimElement.style.display = 'none';
    } */
    
    // Следим за движением мыши
    gameField.addEventListener('mousemove', function(e) {
        const rect = gameField.getBoundingClientRect();
        aimPosition.x = e.clientX - rect.left;
        aimPosition.y = e.clientY - rect.top;
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
        const isDead = damageEnemy(enemy, index);
        if (isDead) {
            activeEnemies.splice(index, 1);
        }
    }
}


function damageEnemy(enemy, index) {
    // Рассчитываем урон с учетом крита
    const damageResult = calculateDamage();
	
	const isBoss = bossM.includes(enemy.type);
	
	if(activeHeroObject.name == 'eremei' && !isBoss) {
		addDamageBonus();
	}
	
    
    // Наносим урон
    enemy.hp -= damageResult.damage;
    
    // Запускаем анимацию удара по врагу
	
	animateEnemyHit(enemy);
	
	
	if (enemy.type === bossAliveName && currentBoss) {
        updateBossHealthBar();
    }
	
	// Воспроизводим звук
	playDamageSound();
	
	if ((damageResult.damage / 20) > 1) {
	checkForWound(enemy, damageResult.damage);
	}
    
    // Получаем позицию врага для отображения текста урона
    const enemyRect = enemy.element.getBoundingClientRect();
    const fieldRect = gameField.getBoundingClientRect();
    
    // Рассчитываем позицию в процентах относительно игрового поля
    const xPercent = ((enemyRect.left + enemyRect.width / 2 - fieldRect.left) / fieldRect.width) * 100;
    const yPercent = ((enemyRect.top + enemyRect.height / 2 - fieldRect.top) / fieldRect.height) * 100;
    
    // Создаем анимацию текста урона (передаем информацию о крите)
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
        enemy.element.style.transform = 'scale(0) rotate(180deg)';
         
        // Удаляем врага через короткую задержку для анимации
        setTimeout(() => {
            enemy.remove();
        }, 300);
        
        return true; // Враг убит
    }
    
    return false; // Враг жив
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
function calculateDamage() {
    // Базовый урон
    let damage = (globalDamage+ (globalDamage * globalDamageBonusPercent));
    let isCritical = false;
    
    // Проверяем, выпал ли критический удар
    const random = Math.random(); // Случайное число от 0 до 1
    
    if (random < globalCritChance) {
        // КРИТИЧЕСКИЙ УДАР!
        isCritical = true;
        damage *= globalCritMultiplier;
        console.log(`Критический удар! Множитель: x${globalCritMultiplier}`);
    }
    
    // Округляем до целого числа
    damage = Math.round(damage);
    
    return {
        damage: damage,
        isCritical: isCritical
    };
}

function addDamageBonus() {
	globalDamageBonusPercent = (globalDamageBonusPercent + globalDamageBonusPercentSize);
	if (globalDamageBonusPercent >= globalMaxDamageBonusPercent) {globalDamageBonusPercent = globalMaxDamageBonusPercent};
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

function createDamageText(damage, xPercent, yPercent) {
    // Создаем элемент текста урона
    const damageText = document.createElement('div');
    damageText.className = 'damage-text';
    damageText.textContent = `-${damage}`;
    
    // Устанавливаем начальную позицию
    damageText.style.left = xPercent + '%';
    damageText.style.top = yPercent + '%';
    
    // Добавляем в контейнер
    damageContainer.appendChild(damageText);
    
    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        if (damageText.parentNode) {
            damageText.parentNode.removeChild(damageText);
        }
    }, 1000);
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
    const enemyName = enemy.customName || ENEMY_TYPES[enemy.type]?.name || 'Враг';
    if (enemyName == bossAliveName) {
        // Это босс
        if (enemy.type === 'enem5') {   // ПОБЕДА
            killAllEnemies();
            pauseGame();
            hideBossHealthBar();
            stopBossEvents();
            showEndGameModal(true, timeSec2);
            return;   // Не начисляем опыт, не переходим к следующему боссу
        }

        // Обычный босс (не последний)
        killAllEnemies();
        bossM.splice(0, 1);
        bossAlive = false;
        hideBossHealthBar();
        stopBossEvents();
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
            enemy.element.style.transform = 'scale(0) rotate(180deg)';
            
            setTimeout(() => {
                enemy.remove();
            }, 300);
        }
    });
    
    // Очищаем массив активных врагов
    activeEnemies.length = 0;
    
    console.log(`Уничтожено ${enemiesToKill.length} врагов`);
}

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

function pauseGame() {
    isGamePaused = true;
    
    // Сохраняем оригинальные скорости врагов
    activeEnemies.forEach(enemy => {
        enemy.originalSpeed = enemy.speed;
        enemy.speed = 0;
    });
    
    
    console.log("Игра поставлена на паузу, таймер групп приостановлен");
}

function resumeGame() {
    isGamePaused = false;
    
    // Восстанавливаем скорости врагов
    activeEnemies.forEach(enemy => {
        if (enemy.originalSpeed !== undefined) {
            enemy.speed = enemy.originalSpeed;
        }
    });
    
    console.log("Игра возобновлена, таймер групп возобновлен");
}
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
        
        // Автоматическое повышение базовых характеристик при каждом уровне
        applyAutomaticLevelUpBonuses();
        
        // Показываем окно выбора улучшения
		if(!openLevelUpModal) {
			await showLevelUpModal();
        }
		
        updateExperienceDisplay();
    }
    
    return levelsGained > 0;
}

// ==================== ДОБАВЛЯЕМ ФУНКЦИЮ ДЛЯ АВТОМАТИЧЕСКИХ БОНУСОВ ====================

function applyAutomaticLevelUpBonuses() {
    // Автоматические улучшения при каждом уровне
    globalDamage = globalDamage + playerLevel;
    globalCritChance = Math.min(1, globalCritChance + 0.01); // Ограничиваем 100%
    globalCritMultiplier = globalCritMultiplier + 0.05;
    
    // Увеличиваем здоровье замка
    const hpIncrease = 10;
    castleHP.max = castleHP.max + hpIncrease;
    castleHP.current = castleHP.current + hpIncrease;
    
    // Защита замка (ограничиваем 99%)
    castleDamageReduction = Math.min(0.99, castleDamageReduction + 0.01);
    
    // Скорострельность (ограничиваем минимальный интервал 200 мс)
    // Если уже на минимуме, не уменьшаем дальше
    if (SHOT_INTERVAL > 100) {
        SHOT_INTERVAL = Math.max(100, SHOT_INTERVAL - 1);
    }
    
    // Обновляем отображение здоровья замка
    updateCastleHealthDisplay();
    
    // Логируем изменения
    console.log(`Автоматические бонусы уровня ${playerLevel}:`);
    console.log(`- Урон: ${globalDamage}`);
    console.log(`- Шанс крита: ${(globalCritChance * 100).toFixed(2)}%`);
    console.log(`- Множитель крита: ${globalCritMultiplier.toFixed(2)}`);
    console.log(`- Здоровье замка: ${castleHP.max}`);
    console.log(`- Защита замка: ${(castleDamageReduction * 100).toFixed(2)}%`);
    console.log(`- Интервал стрельбы: ${SHOT_INTERVAL} мс`);
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
    const damageIncrease = Math.round(startGlobalDamage * damageMultiplier);
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
        const critChanceIncrease = startGlobalCritChance * critChanceMultiplier;
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
    const critMultiplierIncrease   = (startGlobalCritMultiplier/5) * critMultiplierMultiplier;
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
        const woundChanceIncrease = startGlobalWoundChance * woundChanceMultiplier;
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
    const castleHpIncrease = Math.round(startGlobalCastleHp * castleHpMultiplier);
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
    
    // 7. Защита  - проверяем, что еще не достиг максимума (0.99 = 99%)
    if (castleDamageReduction < 0.99) {
        const defenseRarity = getRandomRarity();
        const defenseMultiplier = getRarityMultiplier(defenseRarity);
        const defenseIncrease = startCastleDamageReduction * defenseMultiplier;
        upgrades.push({
            id: 'castleDefense',
            name: 'Защита',
            description: `+${(defenseIncrease * 100).toFixed(2)}% к защите`,
            rarity: defenseRarity,
            apply: function() {
                castleDamageReduction = Math.min(0.99, castleDamageReduction + defenseIncrease);
                console.log(`Защита увеличена до: ${(castleDamageReduction * 100).toFixed(2)}% (множитель: ${defenseMultiplier}x)`);
            }
        });
    }
    
    // 8. Скорострельность - проверяем, что еще не достиг минимума (200 мс)
    if (SHOT_INTERVAL > 100) { // Только если интервал больше 200 мс
        const fireRateRarity = getRandomRarity();
        const fireRateMultiplier = getRarityMultiplier(fireRateRarity);
        const fireRateDecrease = (1000-startSHOT_INTERVAL) * fireRateMultiplier;
        const newInterval = Math.max(100, SHOT_INTERVAL - fireRateDecrease);
        
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
        case 'uncommon': return 2;
        case 'rare': return 3;
        case 'epic': return 4;
        case 'legendary': return 5;
        default: return 1;
    }
}

function getRarityName(rarity) {
    switch (rarity) {
        case 'common': return 'Обычное';
        case 'uncommon': return 'Необычное';
        case 'rare': return 'Редкое';
        case 'epic': return 'Эпическое';
        case 'legendary': return 'Легендарное';
        default: return 'Обычное';
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

const musicFiles = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.ogg'];
let currentTrack = 0;

function playBgMusic() {
    const audio = new Audio(`music/${musicFiles[currentTrack]}`);
    audio.volume = 0.03;
    audio.play();
    audio.onended = () => {
        currentTrack = (currentTrack + 1) % musicFiles.length;
        playBgMusic();
    };
}

// Запустить по клику
//document.addEventListener('click', playBgMusic, { once: true });

// ==================== ЗАПУСК ИГРЫ ====================

// Запускаем инициализацию игры после полной загрузки страницы
window.onload = initGame;
