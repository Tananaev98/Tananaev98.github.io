let lvlNumber = 23;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 23 — «Тайна овина», область II «Золотые поля».
// Пять архетипов: зигзаг цепа без нижней стены / симметричные когтистые
// выпады решета с флангов / нервный дождь мякины сверху / щелчки серпов
// только из углов / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	levelCadence: 0.83, damageMultiplier: 1.702, minWaveDelay: 2000, minShotDelay: 140, minTelegraphMs: 520,
	phases: [
		{ phase: 1, minHp: 0.64, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.17, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.29, cadence: 0.79, speed: 1.14, damage: 1.19, telegraphMultiplier: 0.88, surpriseChance: 0.29, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.66, speed: 1.23, damage: 1.31, telegraphMultiplier: 0.80, surpriseChance: 0.39, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { movementStyle: 'accelerate',      cadence: 1.02, telegraphMs: 850, speedMultiplier: 0.94, damageMultiplier: 0.94, speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18] }, // ХЛЫСТЕНЬ: зигзаг цепа без нижней стены
		enem2: { movementStyle: 'lateRush',   cadence: 0.91, telegraphMs: 745, speedMultiplier: 1.05, damageMultiplier: 0.91, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // РЕШЕТЕНЬ: симметричные когтистые выпады с флангов
		enem3: { movementStyle: 'drift',      cadence: 0.86, telegraphMs: 615, speedMultiplier: 1.19, damageMultiplier: 0.63, speedVariance: [0.91, 1.04, 1.17, 1.30, 1.43] }, // ПЫЛЮГА: нервный дождь мякины сверху
		enem4: { movementStyle: 'straight',   cadence: 1.03, telegraphMs: 620, speedMultiplier: 1.02, damageMultiplier: 1.13, speedVariance: [0.83, 0.93, 1.03, 1.13, 1.23] }, // КОЛОСЕНЬ: щелчки серпов только из четырёх углов
		enem5: { movementStyle: 'weave',      cadence: 0.71, telegraphMs: 610, speedMultiplier: 1.18, damageMultiplier: 1.11, speedVariance: [0.79, 0.92, 1.05, 1.18, 1.31] }  // ОВИННИК: мечется меж снопами змейкой — сплетает дождь мякины сверху с когтями с флангов в одну ловушку
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Хлыстень',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/1.webp',
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
		dispName: 'Решетень',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '25%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Пылюга',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1300 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Колосень',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Овинник',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/5.webp',
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
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.62)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	// ===== Хлыстень: зигзаг цепа от края к краю, без нижней стены =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 6 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 68, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 25, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 20 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //13 нежданчик: широкий тяжёлый удар из центра
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //15

	// ===== Решетень: симметричные когтистые выпады с флангов =====
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 6 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 25 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //15

	// ===== Пылюга: нервный дождь мякины сверху =====
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //0
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 24 }, //1
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 25 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 25 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 24 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 9,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 26 }, //10 самый резкий центральный обрывок
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 14 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 14 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //13 редкий контраст: тяжёлый ком мякины падает вниз медленно
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //15

	// ===== Колосень: щелчки серпов только из четырёх углов =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 23 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //12 редкий контраст: центр вместо угла
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //15 нежданчик: второй центральный щелчок сверху

	// ===== Овинник: смешивает почерк всех четверых, впервые перекрывает низ разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 24, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 13 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 25 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 12 } //14
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 400, bossDelayAbDop: 6200 }, // редкий зигзаг, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 295, bossDelayAbDop: 5050 }, // симметричные выпады, смена ритма
	{ boss: 'enem3', bossDelayAb: 225, bossDelayAbDop: 4400 }, // частый нервный дождь
	{ boss: 'enem4', bossDelayAb: 235, bossDelayAbDop: 4500 }, // нервные щелчки из углов
	{ boss: 'enem5', bossDelayAb: 245, bossDelayAbDop: 4150 }, // финал: плотнее всех, но честный
];

const bossAbilitiesDop = [
	// Хлыстень
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 9, 12] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6, 8, 10] }, // опасная сигнатурная
	{ boss: 'enem1', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя

	// Решетень
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 10, 7] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 8] }, // опасная сигнатурная
	{ boss: 'enem2', indexAbilities: [9, 12, 13, 15] }, // смешанная поздняя

	// Пылюга
	{ boss: 'enem3', indexAbilities: [2] },
	{ boss: 'enem3', indexAbilities: [3] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [0, 1, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 10] }, // опасная сигнатурная: почти весь дождь + резкий центр
	{ boss: 'enem3', indexAbilities: [11, 12, 13] }, // смешанная поздняя

	// Колосень
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [1] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10, 11] },
	{ boss: 'enem4', indexAbilities: [4, 12, 5] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 13, 15] }, // опасная сигнатурная
	{ boss: 'enem4', indexAbilities: [1, 3, 9, 14] }, // смешанная поздняя

	// Овинник — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя
];

// Лорные названия связок. Уровень 23 — молотьба: Хлыстень (цеп), Решетень (решето),
// Пылюга (мякина-пыль), Колосень (серп), Овинник (дух овина-сушильни).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Цеповый удар', variant2: 'Звено цепа', variant3: 'Цеповая сила',
        variant4: 'Соломенная защита', variant5: 'Зигзаг цепа', variant6: 'Едкая мякина',
        variant7: 'Цеповая мощь', variant8: 'Прочное звено', variant9: 'Зигзаг без опоры',
        variant10: 'Живучий Хлыстень', variant11: 'Цепкое звено цепа', variant12: 'Взмах и в ток',
        variant13: 'Толстое звено', variant14: 'Неутомимый Хлыстень', variant15: 'Пружинистый цеп',
        variant16: 'Меткое звено', variant17: 'Цеповая хватка', variant18: 'Взгляд молотильщика',
        variant19: 'Зигзаг цепа вмиг', variant20: 'Хлебный дух тока', variant21: 'Стойкое звено',
        variant22: 'Юркий Хлыстень', variant23: 'Цеповая стойкость', variant24: 'Чуткое звено',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикий зигзаг цепа', variant27: 'Мощь мякины',
        variant28: 'Внезапный зигзаг', variant29: 'Каменное звено', variant30: 'Разросшийся цеп',
        variant31: 'Цеповый рывок', variant32: 'Живучее звено', variant33: 'Неутомимый зигзаг',
        variant34: 'Цеповая прыть', variant35: 'Цеповая выносливость'
    },
    enem2: {
        variant1: 'Решётчатый удар', variant2: 'Прут решета', variant3: 'Решётчатая сила',
        variant4: 'Плетёная защита', variant5: 'Выпад с флангов', variant6: 'Едкая пыль решета',
        variant7: 'Решётчатая мощь', variant8: 'Плотное плетение', variant9: 'Парный коготь с двух сторон',
        variant10: 'Живучий Решетень', variant11: 'Цепкие прутья', variant12: 'Выпад и в зерно',
        variant13: 'Толстое плетение', variant14: 'Неутомимый Решетень', variant15: 'Пружинистое решето',
        variant16: 'Меткий прут', variant17: 'Решётчатая хватка', variant18: 'Взгляд сквозь прутья',
        variant19: 'Мгновенный выпад', variant20: 'Зерновой дух', variant21: 'Стойкое плетение',
        variant22: 'Юркий Решетень', variant23: 'Решётчатая стойкость', variant24: 'Чуткие прутья',
        variant25: 'Ускользающий выпад', variant26: 'Дикий выпад', variant27: 'Мощь пыли решета',
        variant28: 'Симметричный выпад вмиг', variant29: 'Каменное плетение', variant30: 'Разросшееся решето',
        variant31: 'Решётчатый рывок', variant32: 'Живучее плетение', variant33: 'Симметрия когтей вновь',
        variant34: 'Решётчатая прыть', variant35: 'Решётчатая выносливость'
    },
    enem3: {
        variant1: 'Взмах лопаты', variant2: 'Бросок зерна', variant3: 'Веяльная сила',
        variant4: 'Соломенная защита', variant5: 'Дождь пыли', variant6: 'Едкая пыль',
        variant7: 'Веяльная мощь', variant8: 'Плотная солома', variant9: 'Нервный дождь сверху',
        variant10: 'Живучая Пылюга', variant11: 'Цепкая солома', variant12: 'Пыль и в глаза',
        variant13: 'Толстая солома', variant14: 'Неутомимая Пылюга', variant15: 'Облако пыли из лопаты',
        variant16: 'Меткий бросок зерна', variant17: 'Пыльная хватка', variant18: 'Взгляд сквозь пыль',
        variant19: 'Дождь пыли вмиг', variant20: 'Мякинный дух', variant21: 'Стойкая солома',
        variant22: 'Юркая Пылюга', variant23: 'Пыльная стойкость', variant24: 'Чуткая солома',
        variant25: 'Ускользающее облако', variant26: 'Дикий дождь пыли', variant27: 'Мощь пыли',
        variant28: 'Внезапный нервный дождь', variant29: 'Каменная лопата', variant30: 'Разросшееся облако',
        variant31: 'Взмах лопаты внахлёст', variant32: 'Живучая солома', variant33: 'Дождь сверху вновь',
        variant34: 'Пыльная прыть', variant35: 'Пыльная выносливость'
    },
    enem4: {
        variant1: 'Колосящий удар', variant2: 'Колос-серп', variant3: 'Колосящая сила',
        variant4: 'Зерновая защита', variant5: 'Щелчок серпа', variant6: 'Сок колоса',
        variant7: 'Колосящая мощь', variant8: 'Плотный колос', variant9: 'Щелчок из угла',
        variant10: 'Живучий Колосень', variant11: 'Цепкий колос', variant12: 'Щелчок и в закром',
        variant13: 'Толстый колос', variant14: 'Неутомимый Колосень', variant15: 'Пружинистый колос',
        variant16: 'Меткий щелчок', variant17: 'Колосящая хватка', variant18: 'Взгляд из четырёх углов',
        variant19: 'Щелчок серпа вмиг', variant20: 'Зерновой дух колоса', variant21: 'Стойкий колос',
        variant22: 'Юркий Колосень', variant23: 'Колосящая стойкость', variant24: 'Чуткий колос',
        variant25: 'Ускользающий щелчок', variant26: 'Дикий щелчок', variant27: 'Мощь сока колоса',
        variant28: 'Щелчок из угла вмиг', variant29: 'Каменный колос', variant30: 'Разросшийся колос',
        variant31: 'Колосящий рывок', variant32: 'Живучий колос', variant33: 'Щелчок из углов вновь',
        variant34: 'Колосящая прыть', variant35: 'Колосящая выносливость'
    },
    enem5: {
        variant1: 'Овинный удар', variant2: 'Уголёк овина', variant3: 'Овинная сила',
        variant4: 'Дымная защита', variant5: 'Бросок из снопов', variant6: 'Едкий дым овина',
        variant7: 'Овинная мощь', variant8: 'Плотный дым', variant9: 'Змейка меж снопами',
        variant10: 'Живучий Овинник', variant11: 'Цепкий уголёк', variant12: 'Бросок и в снопы',
        variant13: 'Толстый дым', variant14: 'Неутомимый Овинник', variant15: 'Снующий бег',
        variant16: 'Меткий уголёк', variant17: 'Овинная хватка', variant18: 'Взгляд из дыма',
        variant19: 'Мгновенный бросок', variant20: 'Дух овина', variant21: 'Стойкий дым',
        variant22: 'Юркий Овинник', variant23: 'Овинная стойкость', variant24: 'Чуткий дым',
        variant25: 'Ускользающий в снопы', variant26: 'Дикий дым', variant27: 'Мощь угля',
        variant28: 'Ловушка из дождя и когтей', variant29: 'Каменный уголёк', variant30: 'Разросшийся дым',
        variant31: 'Овинный рывок', variant32: 'Живучий дым', variant33: 'Ловушка вновь',
        variant34: 'Овинная прыть', variant35: 'Овинная выносливость'
    }
};
