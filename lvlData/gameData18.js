let lvlNumber = 18;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 18 — «Жатвенные орудия», область II «Золотые поля».
// Пять ожившых инструментов, пять непохожих почерков: зигзаг серпа без нижней стены /
// тройные уколы вил / асимметричные грабли, давящие с одного бока / частый дождь
// сноповязки сверху / финал скрещивает высоты флангов и впервые перекрывает низ разом.
const bossCombatConfig = {
	levelCadence: 0.90, damageMultiplier: 1.908, minWaveDelay: 2100, minShotDelay: 150, minTelegraphMs: 545,
	phases: [
		{ phase: 1, minHp: 0.64, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.14, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.30, cadence: 0.84, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.91, surpriseChance: 0.24, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0.00, cadence: 0.71, speed: 1.19, damage: 1.26, telegraphMultiplier: 0.84, surpriseChance: 0.34, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { movementStyle: 'accelerate',      cadence: 1.02, telegraphMs: 860, speedMultiplier: 0.93, damageMultiplier: 0.94, speedVariance: [0.87, 0.94, 1.01, 1.08, 1.15] }, // КРИВОЗУБ: серп качается зигзагом от края к краю, без стены снизу
		enem2: { movementStyle: 'lateRush', cadence: 0.86, telegraphMs: 730, speedMultiplier: 1.07, damageMultiplier: 0.87, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // ТРОЙЧАТКА: вилы бьют тройными уколами, каждый следующий сет — выше и резче
		enem3: { movementStyle: 'pause',   cadence: 1.22, telegraphMs: 960, speedMultiplier: 0.84, damageMultiplier: 1.13, speedVariance: [0.79, 0.89, 0.99, 1.09, 1.19] }, // ЧЕСАЛКА: грабли давят почти всегда с правого бока, левый — редкий укол
		enem4: { movementStyle: 'straight',      cadence: 0.76, telegraphMs: 610, speedMultiplier: 1.20, damageMultiplier: 0.63, speedVariance: [0.91, 1.03, 1.15, 1.27, 1.39] }, // СКРИПУХА: сноповязка сыплет обрывками сверху, частый нервный дождь
		enem5: { movementStyle: 'weave',      cadence: 0.73, telegraphMs: 630, speedMultiplier: 1.11, damageMultiplier: 1.06, speedVariance: [0.87, 0.98, 1.10, 1.22, 1.34] }  // ШЕСТЕРИЛО: машина скрещивает высоты флангов и впервые перекрывает низ поля разом
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Кривозуб',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Тройчатка',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '18%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Чесалка',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 30,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Скрипуха',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1550 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Шестерило',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '30%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

// Урон унаследован от проверенного распределения уровней 16-17: та же лестница
// light/medium/heavy на удар базового урона, только образы и геометрия — новые.
const attackDamage = {
	enem1: {
		light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.34),
		medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.46),
		heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.58)
	},
	enem2: {
		light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.28),
		medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.38),
		heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50)
	},
	enem3: {
		light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.30),
		medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.40),
		heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.48)
	},
	enem4: {
		light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.24),
		medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.33),
		heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.42)
	},
	enem5: {
		light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.26),
		medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.36),
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.48)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 18 — Жатвенные орудия. Архетипы: зигзаг серпа без стены / тройные уколы вил /
// асимметричные грабли с одного бока / частый дождь сноповязки сверху / финал скрещивает
// высоты флангов, смешивает почерк всех четверых и впервые перекрывает низ поля разом.
const bossAbilities = [
	// ===== Кривозуб: зигзаг серпа от края к краю, без нижней стены =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 6 },  //0 взмах слева
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 6 },  //1 взмах справа
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 68, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 25, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 20 }, //10 резкий взмах из центра
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //11 самый медленный взмах
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //13 нежданчик: широкий тяжёлый взмах из центра
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //15

	// ===== Тройчатка: тройные уколы, каждый следующий сет выше и резче =====
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //0 сет A: слева
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //1 сет A: центр
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //2 сет A: справа
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //3 сет B: слева
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 25, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //4 сет B: центр
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //5 сет B: справа
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //6 сет C: слева
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19 }, //7 сет C: центр
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //8 сет C: справа
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //9 редкий тяжёлый укол снизу-слева
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //10 редкий тяжёлый укол снизу-справа
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 24 }, //11 самый резкий центральный укол
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //14 самый медленный, глубочайший укол
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //15

	// ===== Чесалка: давит почти всегда с правого бока, левый — редкий укол =====
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //0 тяжёлый гребень у земли
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 36, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //5 редкий слабее удар слева
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 22, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 13, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //9 редкий резкий бросок из центра
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 4 },  //11 единственный по-настоящему левый
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 7 },  //12 второй тяжёлый правый
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 14 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 6 },  //14 нежданчик: смещается к центру-низу
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //15

	// ===== Скрипуха: частый нервный дождь обрывков сверху =====
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 20 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 20 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //10 самый резкий центральный обрывок
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 16 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 16 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //13 редкий контраст: тяжёлый обломок падает вниз медленно
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //15

	// ===== Шестерило: скрещенные высоты флангов, впервые перекрывает низ поля разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //0 эхо Скрипухи: лево высоко
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //1 право низко
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //2 лево низко
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //3 право высоко
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //4 эхо Тройчатки: центр
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //5 эхо Чесалки: тяжёлый правый низкий
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //6 симметричный тяжёлый левый низкий
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 14 }, //7 эхо Кривозуба: центр-подъём
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 25 }, //10 самый резкий рывок
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11 нижний ряд: начало полного прохода
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //15 конец ряда — вся ширина поля закрыта шестернями
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 11 } //16 неожиданный удар из центра после прохода
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 420, bossDelayAbDop: 6300 }, // редкий зигзаг, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 290, bossDelayAbDop: 4650 }, // тройные уколы, смена ритма
	{ boss: 'enem3', bossDelayAb: 450, bossDelayAbDop: 6900 }, // редкие тяжёлые удары, самая долгая пауза
	{ boss: 'enem4', bossDelayAb: 230, bossDelayAbDop: 4500 }, // частый нервный дождь
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 4250 }, // финал: плотнее всех, но телеграф честный
];

const bossAbilitiesDop = [
	// Кривозуб
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 9, 12] }, // ритмическая: медленно → быстро → медленно
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6, 8, 10] }, // опасная сигнатурная: нарастающий зигзаг к резкому финалу
	{ boss: 'enem1', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя: тяжёлый центр → быстрый верх

	// Тройчатка
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [9] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2] }, // тройной укол: сет A
	{ boss: 'enem2', indexAbilities: [3, 4, 5] }, // тройной укол: сет B
	{ boss: 'enem2', indexAbilities: [6, 7, 8] }, // тройной укол: сет C
	{ boss: 'enem2', indexAbilities: [9, 10, 11] }, // ритмическая: тяжело → тяжело → резкий рывок
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 6] }, // опасная сигнатурная: все сеты подряд, нарастающая волна
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя: фланги + глубокий укол + резкий верх

	// Чесалка
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [11] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [6, 7, 8] },
	{ boss: 'enem3', indexAbilities: [5, 12, 14] }, // ритмическая: слабый слева → тяжёлый справа → нежданчик к центру
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 6, 8] }, // опасная сигнатурная: долгая волна по правому флангу
	{ boss: 'enem3', indexAbilities: [9, 10, 15] }, // смешанная поздняя: резкие броски из центра и справа

	// Скрипуха
	{ boss: 'enem4', indexAbilities: [2] },
	{ boss: 'enem4', indexAbilities: [3] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [0, 1, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10] }, // ритмическая: нарастание к самому резкому центру
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 10] }, // опасная сигнатурная: почти весь дождь + резкий центр
	{ boss: 'enem4', indexAbilities: [11, 12, 13] }, // смешанная поздняя: боковые + тяжёлый контраст снизу

	// Шестерило — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [4] },
	{ boss: 'enem5', indexAbilities: [7] },
	{ boss: 'enem5', indexAbilities: [4, 7] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] }, // средняя: скрещенные высоты флангов
	{ boss: 'enem5', indexAbilities: [5, 6] }, // средняя: симметричные тяжёлые низкие
	{ boss: 'enem5', indexAbilities: [8, 9, 10] }, // ритмическая: нарастающая быстрая тройка
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14, 15, 16] }, // сигнатура: полный проход стены → удар из центра
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 8, 16] }, // смешанная поздняя: мотивы всех четырёх боссов уровня
];

// Лорные названия связок. Уровень 18 — ожившие орудия жатвы: Кривозуб (серп), Тройчатка
// (вилы), Чесалка (грабли), Скрипуха (сноповязка), Шестерило (машина-молотилка).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Серповый удар', variant2: 'Лезвие серпа', variant3: 'Серповая сила',
        variant4: 'Соломенная защита', variant5: 'Зигзаг серпа', variant6: 'Ржавчина серпа',
        variant7: 'Серповая мощь', variant8: 'Рукоять серпа', variant9: 'Зигзагующий взмах',
        variant10: 'Живучий Кривозуб', variant11: 'Цепкое лезвие', variant12: 'Взмах и в стерню',
        variant13: 'Крепкая рукоять', variant14: 'Неутомимый Кривозуб', variant15: 'Пружинистый зигзаг',
        variant16: 'Лезвие серпа вмиг', variant17: 'Серповая хватка', variant18: 'Кривой прищур',
        variant19: 'Мгновенный зигзаг', variant20: 'Полевой дух серпа', variant21: 'Стойкая рукоять',
        variant22: 'Юркий Кривозуб', variant23: 'Серповая стойкость', variant24: 'Чуткое лезвие',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикий зигзаг', variant27: 'Мощь ржавчины',
        variant28: 'Внезапный зигзаг', variant29: 'Каменное лезвие', variant30: 'Разросшийся зигзаг',
        variant31: 'Серповый рывок', variant32: 'Живучая рукоять', variant33: 'Неутомимый зигзаг',
        variant34: 'Серповая прыть', variant35: 'Серповая выносливость'
    },
    enem2: {
        variant1: 'Тройной укол', variant2: 'Зубец вил', variant3: 'Тройчатая сила',
        variant4: 'Защита черенка', variant5: 'Меткий тройной укол', variant6: 'Едкий навоз',
        variant7: 'Тройчатая мощь', variant8: 'Прочный черенок', variant9: 'Растущий сет уколов',
        variant10: 'Живучая Тройчатка', variant11: 'Цепкие зубцы', variant12: 'Укол и в стог',
        variant13: 'Толстый черенок', variant14: 'Неутомимая Тройчатка', variant15: 'Пружинистый черенок',
        variant16: 'Меткий зубец', variant17: 'Тройчатая хватка', variant18: 'Прищур перед уколом',
        variant19: 'Мгновенный тройной укол', variant20: 'Сенной дух', variant21: 'Стойкий черенок',
        variant22: 'Юркая Тройчатка', variant23: 'Тройчатая стойкость', variant24: 'Чуткие зубцы',
        variant25: 'Ускользающий укол', variant26: 'Дикий тройной укол', variant27: 'Мощь навоза',
        variant28: 'Внезапный сет уколов', variant29: 'Каменные зубцы', variant30: 'Разросшийся сет',
        variant31: 'Тройчатый рывок', variant32: 'Живучий черенок', variant33: 'Растущий сет вновь',
        variant34: 'Тройчатая прыть', variant35: 'Тройчатая выносливость'
    },
    enem3: {
        variant1: 'Чешущий удар', variant2: 'Зубец грабель', variant3: 'Чесальная сила',
        variant4: 'Защита грабель', variant5: 'Давление справа', variant6: 'Едкая солома',
        variant7: 'Чесальная мощь', variant8: 'Черенок грабель', variant9: 'Давящий напор с бока',
        variant10: 'Живучая Чесалка', variant11: 'Зубья грабель', variant12: 'Давление и в стерню',
        variant13: 'Толстый черенок', variant14: 'Неутомимая Чесалка', variant15: 'Пружинистые зубья',
        variant16: 'Меткий зубец', variant17: 'Чесальная хватка', variant18: 'Взгляд справа',
        variant19: 'Редкий укол слева', variant20: 'Соломенный дух', variant21: 'Стойкие зубья',
        variant22: 'Юркая Чесалка', variant23: 'Чесальная стойкость', variant24: 'Чуткие зубья',
        variant25: 'Ускользающее давление', variant26: 'Дикое давление', variant27: 'Мощь соломы',
        variant28: 'Внезапный укол слева', variant29: 'Зубья грабель-камень', variant30: 'Разросшееся давление',
        variant31: 'Чесальный рывок', variant32: 'Живучие зубья', variant33: 'Неутомимое давление',
        variant34: 'Чесальная прыть', variant35: 'Чесальная выносливость'
    },
    enem4: {
        variant1: 'Скрипящий удар', variant2: 'Обрывок жгута', variant3: 'Скрипучая сила',
        variant4: 'Жестяная защита', variant5: 'Обрывок сверху', variant6: 'Машинная смазка',
        variant7: 'Скрипучая мощь', variant8: 'Прочная жесть', variant9: 'Нервный дождь обрывков',
        variant10: 'Живучая Скрипуха', variant11: 'Цепкий жгут', variant12: 'Обрывок и в солому',
        variant13: 'Толстая жесть', variant14: 'Неутомимая Скрипуха', variant15: 'Пружинистый механизм',
        variant16: 'Меткий обрывок', variant17: 'Скрипучая хватка', variant18: 'Скрежещущий взгляд',
        variant19: 'Дождь обрывков вмиг', variant20: 'Машинный дух', variant21: 'Стойкая жесть',
        variant22: 'Юркая Скрипуха', variant23: 'Скрипучая стойкость', variant24: 'Чуткий механизм',
        variant25: 'Ускользающий обрывок', variant26: 'Дикий скрип', variant27: 'Мощь смазки',
        variant28: 'Внезапный дождь', variant29: 'Каменная жесть', variant30: 'Дождь обрывков разросся',
        variant31: 'Скрипучий рывок', variant32: 'Живучая жесть', variant33: 'Неутомимый дождь',
        variant34: 'Скрипучая прыть', variant35: 'Скрипучая выносливость'
    },
    enem5: {
        variant1: 'Шестерённый удар', variant2: 'Зуб шестерни', variant3: 'Шестерённая сила',
        variant4: 'Стальная защита', variant5: 'Поворот шестерни', variant6: 'Машинное масло',
        variant7: 'Шестерённая мощь', variant8: 'Прочная сталь', variant9: 'Скрещивающийся рывок',
        variant10: 'Живучее Шестерило', variant11: 'Зуб шестерни-крюк', variant12: 'Поворот и в низ поля',
        variant13: 'Толстая сталь', variant14: 'Неутомимое Шестерило', variant15: 'Пружина механизма',
        variant16: 'Меткий зуб', variant17: 'Шестерённая хватка', variant18: 'Механический взгляд',
        variant19: 'Перекрытие низа', variant20: 'Машинный дух', variant21: 'Стойкая сталь',
        variant22: 'Юркое Шестерило', variant23: 'Шестерённая стойкость', variant24: 'Чуткий механизм',
        variant25: 'Ускользающий поворот', variant26: 'Дикий поворот', variant27: 'Мощь масла',
        variant28: 'Внезапное перекрытие', variant29: 'Каменная сталь', variant30: 'Разросшийся механизм',
        variant31: 'Шестерённый рывок', variant32: 'Живучая сталь', variant33: 'Неутомимое скрещивание',
        variant34: 'Шестерённая прыть', variant35: 'Шестерённая выносливость'
    }
};
