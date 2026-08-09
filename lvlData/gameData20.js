let lvlNumber = 20;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 20 — «Сердце полей», область II «Золотые поля».
// Пять архетипов: колючие удары с одного бока за раз / симметричные вспышки
// улыбки с флангов / редкие горькие уколы с долгой паузой / давление снизу
// вспугнутого перепела / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	levelCadence: 0.87, damageMultiplier: 1.08, minWaveDelay: 2060, minShotDelay: 146, minTelegraphMs: 535,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.15, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.30, cadence: 0.82, speed: 1.11, damage: 1.16, telegraphMultiplier: 0.89, surpriseChance: 0.26, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0.00, cadence: 0.69, speed: 1.20, damage: 1.28, telegraphMultiplier: 0.82, surpriseChance: 0.36, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { movementStyle: 'straight',   cadence: 1.02, telegraphMs: 800, speedMultiplier: 0.96, damageMultiplier: 0.95, speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18] }, // КОЛЮЧЕНЬ: колючие удары с одного бока за раз
		enem2: { movementStyle: 'weave',      cadence: 0.90, telegraphMs: 740, speedMultiplier: 1.06, damageMultiplier: 0.90, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // БЕЛОЗУБКА: симметричные вспышки улыбки с флангов
		enem3: { movementStyle: 'pause',      cadence: 1.18, telegraphMs: 970, speedMultiplier: 0.85, damageMultiplier: 1.17, speedVariance: [0.76, 0.86, 0.98, 1.10, 1.22] }, // ГОРЧАК: редкие горькие уколы, долгая пауза
		enem4: { movementStyle: 'lateRush',   cadence: 0.79, telegraphMs: 620, speedMultiplier: 1.16, damageMultiplier: 0.68, speedVariance: [0.89, 1.02, 1.15, 1.28, 1.41] }, // КЛОХТУН: давление снизу вспугнутого перепела
		enem5: { movementStyle: 'accelerate', cadence: 0.74, telegraphMs: 630, speedMultiplier: 1.13, damageMultiplier: 1.08, speedVariance: [0.83, 0.96, 1.09, 1.22, 1.35] }  // ПОЛЕВИК: смешивает почерк всех четверых, впервые перекрывает низ поля разом
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Колючень',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/1.webp',
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
		dispName: 'Белозубка',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Горчак',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Клохтун',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Полевик',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/5.webp',
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
	// ===== Колючень: колючие удары строго с одного бока за раз =====
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //2
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 16, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 16, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 24 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //12 редкий тяжёлый шип из центра
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 21 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //15

	// ===== Белозубка: симметричные вспышки улыбки с флангов =====
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

	// ===== Горчак: редкие горькие уколы, долгая пауза между ними =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 6 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 22, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 9 },  //15

	// ===== Клохтун: давление снизу вспугнутого перепела =====
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 50, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 50, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 6 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 8 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 36, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 36, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 13 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //15

	// ===== Полевик: смешивает почерк всех четверых, впервые перекрывает низ разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 22, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 13 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 25 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 16, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 15, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 12 } //14
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 400, bossDelayAbDop: 6300 }, // редкие одноклонные удары, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 285, bossDelayAbDop: 4900 }, // симметричные вспышки, смена ритма
	{ boss: 'enem3', bossDelayAb: 450, bossDelayAbDop: 6900 }, // редкие горькие уколы, самая долгая пауза
	{ boss: 'enem4', bossDelayAb: 235, bossDelayAbDop: 4550 }, // давление снизу, частые вспугивания
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4200 }, // финал: плотнее всех, но честный
];

const bossAbilitiesDop = [
	// Колючень
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [6] },
	{ boss: 'enem1', indexAbilities: [0, 6] },
	{ boss: 'enem1', indexAbilities: [1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [12, 14, 13] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] }, // опасная сигнатурная: полный проход слева
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 13] }, // смешанная поздняя

	// Белозубка
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 10, 7] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 8] }, // опасная сигнатурная
	{ boss: 'enem2', indexAbilities: [9, 12, 13, 15] }, // смешанная поздняя

	// Горчак
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [13, 11, 14] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 7, 9, 15] }, // опасная сигнатурная
	{ boss: 'enem3', indexAbilities: [8, 10, 12] }, // смешанная поздняя

	// Клохтун
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [1] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3, 4] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 4] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 7, 9, 13] }, // опасная сигнатурная: нарастающая волна снизу
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 14] }, // смешанная поздняя

	// Полевик — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя
];
