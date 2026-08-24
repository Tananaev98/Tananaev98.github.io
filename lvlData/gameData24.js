let lvlNumber = 24;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 24 — «Старая ветряная мельница», область II «Золотые поля».
// Пять архетипов: редкие тяжёлые удары мешка с долгой паузой / давление снизу
// катящегося жёрнова / зигзаг ковша без нижней стены / щелчки лопастей
// только из четырёх углов / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	levelCadence: 0.81, damageMultiplier: 1.568, minWaveDelay: 1980, minShotDelay: 138, minTelegraphMs: 515,
	phases: [
		{ phase: 1, minHp: 0.63, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.17, maxActiveAttacks: 17 },
		{ phase: 2, minHp: 0.29, cadence: 0.78, speed: 1.15, damage: 1.20, telegraphMultiplier: 0.87, surpriseChance: 0.30, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.65, speed: 1.24, damage: 1.32, telegraphMultiplier: 0.80, surpriseChance: 0.40, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { movementStyle: 'lateRush',      cadence: 1.21, telegraphMs: 1000, speedMultiplier: 0.82, damageMultiplier: 1.20, speedVariance: [0.74, 0.84, 0.96, 1.08, 1.20] }, // МЕШКАЧ: редкие тяжёлые удары мешка, долгая пауза
		enem2: { movementStyle: 'pause',   cadence: 1.03, telegraphMs: 815, speedMultiplier: 0.94, damageMultiplier: 0.93, speedVariance: [0.87, 0.94, 1.02, 1.10, 1.18] }, // ЖЕРНОВЕНЬ: давление снизу катящегося жёрнова
		enem3: { movementStyle: 'straight',      cadence: 0.91, telegraphMs: 720, speedMultiplier: 1.04, damageMultiplier: 0.92, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] }, // МУЧЕНЬ: зигзаг ковша без нижней стены
		enem4: { movementStyle: 'weave',   cadence: 0.77, telegraphMs: 605, speedMultiplier: 1.21, damageMultiplier: 0.62, speedVariance: [0.92, 1.05, 1.18, 1.31, 1.44] }, // КРЫЛОРЕЗ: щелчки лопастей только из четырёх углов
		enem5: { movementStyle: 'accelerate', cadence: 0.70, telegraphMs: 600, speedMultiplier: 1.19, damageMultiplier: 1.12, speedVariance: [0.78, 0.91, 1.04, 1.17, 1.30] }  // БЕЛОРУЧКА: разгоняется, только когда деваться некуда — а к финалу собирает жерновой вес в один рывок
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Мешкач',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/1.webp',
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
		dispName: 'Жерновень',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Мучень',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1350 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Крылорез',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Белоручка',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/5.webp',
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
	// ===== Мешкач: редкие тяжёлые удары мешка, долгая пауза между ними =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 50, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 50, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 47, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 47, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 5 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 6 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 22, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 12, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 20 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 3 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //15

	// ===== Жерновень: давление снизу катящегося жёрнова =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 50, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 50, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 6 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 8 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 36, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 36, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 21 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //15

	// ===== Мучень: зигзаг ковша от края к краю, без нижней стены =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 7 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 7 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 26, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 25, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 21 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 4 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 4 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 36, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 10 }, //13 нежданчик: широкий тяжёлый взмах ковша из центра
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 24 }, //15

	// ===== Крылорез: щелчки лопастей только из четырёх углов =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 23 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 19 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 27 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //12 редкий контраст: центр вместо угла
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //15 нежданчик: второй центральный щелчок

	// ===== Белоручка: смешивает почерк всех четверых, впервые перекрывает низ разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 14 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 26 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 11 } //14
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 460, bossDelayAbDop: 7000 }, // редкие тяжёлые удары мешка, самая долгая пауза
	{ boss: 'enem2', bossDelayAb: 460, bossDelayAbDop: 6800 }, // тяжёлое давление снизу
	{ boss: 'enem3', bossDelayAb: 320, bossDelayAbDop: 5500 }, // зигзаг ковша, смена ритма
	{ boss: 'enem4', bossDelayAb: 220, bossDelayAbDop: 4400 }, // нервные щелчки из углов
	{ boss: 'enem5', bossDelayAb: 245, bossDelayAbDop: 4100 }, // финал: плотнее всех, но честный
];

const bossAbilitiesDop = [
	// Мешкач
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [13, 11, 14] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 7, 9, 15] }, // опасная сигнатурная
	{ boss: 'enem1', indexAbilities: [8, 10, 12] }, // смешанная поздняя

	// Жерновень
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 4] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 7, 9, 13] }, // опасная сигнатурная
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 14] }, // смешанная поздняя

	// Мучень
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [11, 9, 12] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6, 8, 10] }, // опасная сигнатурная
	{ boss: 'enem3', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя

	// Крылорез
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [1] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10, 11] },
	{ boss: 'enem4', indexAbilities: [4, 12, 5] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 13, 15] }, // опасная сигнатурная
	{ boss: 'enem4', indexAbilities: [1, 3, 9, 14] }, // смешанная поздняя

	// Белоручка — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя
];

// Лорные названия связок. Уровень 24 — мельница: Мешкач (мешок), Жерновень (жёрнов),
// Мучень (ковш муки), Крылорез (крыло мельницы), Белоручка (ленивая, но копит рывок).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Мешковый удар', variant2: 'Завязка мешка', variant3: 'Мешковая сила',
        variant4: 'Холщовая защита', variant5: 'Удар мешком', variant6: 'Мучная пыль',
        variant7: 'Мешковая мощь', variant8: 'Холстина мешка', variant9: 'Долгая пауза перед ударом',
        variant10: 'Живучий Мешкач', variant11: 'Цепкая завязка', variant12: 'Удар и в амбар',
        variant13: 'Толстая холстина', variant14: 'Неутомимый Мешкач', variant15: 'Пружинистый мешок',
        variant16: 'Меткая завязка', variant17: 'Мешковая хватка', variant18: 'Взгляд из-под мешка',
        variant19: 'Тяжёлый удар вмиг', variant20: 'Мучной дух', variant21: 'Стойкая холстина',
        variant22: 'Юркий Мешкач', variant23: 'Мешковая стойкость', variant24: 'Чуткая завязка',
        variant25: 'Ускользающий мешок', variant26: 'Дикий удар мешком', variant27: 'Мощь пыли',
        variant28: 'Внезапный тяжёлый удар', variant29: 'Каменная холстина', variant30: 'Разросшийся мешок',
        variant31: 'Мешковый рывок', variant32: 'Живучая холстина', variant33: 'Пауза-удар вновь',
        variant34: 'Мешковая прыть', variant35: 'Мешковая выносливость'
    },
    enem2: {
        variant1: 'Жерновой удар', variant2: 'Скол камня', variant3: 'Жерновая сила',
        variant4: 'Каменная защита', variant5: 'Давление жёрнова', variant6: 'Мучная крошка',
        variant7: 'Жерновая мощь', variant8: 'Прочный камень', variant9: 'Катящееся давление снизу',
        variant10: 'Живучий Жерновень', variant11: 'Цепкий скол', variant12: 'Давление и в муку',
        variant13: 'Толстый камень', variant14: 'Неутомимый Жерновень', variant15: 'Пружинистое качение',
        variant16: 'Меткий скол', variant17: 'Жерновая хватка', variant18: 'Тяжёлый каменный взгляд',
        variant19: 'Давление вмиг', variant20: 'Мучной дух жёрнова', variant21: 'Стойкий камень',
        variant22: 'Юркий Жерновень', variant23: 'Жерновая стойкость', variant24: 'Чуткий скол',
        variant25: 'Ускользающее качение', variant26: 'Дикое давление снизу', variant27: 'Мощь крошки',
        variant28: 'Катящееся давление вмиг', variant29: 'Жёрнов-камень вдвойне', variant30: 'Разросшийся жёрнов',
        variant31: 'Жерновой рывок', variant32: 'Живучий камень', variant33: 'Качение вновь',
        variant34: 'Жерновая прыть', variant35: 'Жерновая выносливость'
    },
    enem3: {
        variant1: 'Мучной удар', variant2: 'Край ковша', variant3: 'Мучная сила',
        variant4: 'Пыльная защита', variant5: 'Зигзаг ковша', variant6: 'Мука в глаза',
        variant7: 'Мучная мощь', variant8: 'Прочный ковш', variant9: 'Зигзаг без опоры внизу',
        variant10: 'Живучий Мучень', variant11: 'Цепкий ковш', variant12: 'Взмах и в мешок',
        variant13: 'Толстый ковш', variant14: 'Неутомимый Мучень', variant15: 'Пружинистый ковш',
        variant16: 'Край ковша вмиг', variant17: 'Мучная хватка', variant18: 'Взгляд сквозь муку',
        variant19: 'Мгновенный зигзаг', variant20: 'Мучной дух', variant21: 'Стойкий ковш',
        variant22: 'Юркий Мучень', variant23: 'Мучная стойкость', variant24: 'Чуткий ковш',
        variant25: 'Зигзаг ковша ускользает', variant26: 'Дикий зигзаг', variant27: 'Мощь муки',
        variant28: 'Внезапный зигзаг', variant29: 'Каменный ковш', variant30: 'Разросшийся ковш',
        variant31: 'Мучной рывок', variant32: 'Живучий ковш', variant33: 'Зигзаг ковша вновь',
        variant34: 'Мучная прыть', variant35: 'Мучная выносливость'
    },
    enem4: {
        variant1: 'Лопастный удар', variant2: 'Острая лопасть', variant3: 'Лопастная сила',
        variant4: 'Защита крыла', variant5: 'Щелчок лопасти', variant6: 'Щепа лопасти',
        variant7: 'Лопастная мощь', variant8: 'Прочная лопасть', variant9: 'Щелчок из угла крыла',
        variant10: 'Живучий Крылорез', variant11: 'Цепкая лопасть', variant12: 'Щелчок и в жернова',
        variant13: 'Толстая лопасть', variant14: 'Неутомимый Крылорез', variant15: 'Пружинистое крыло',
        variant16: 'Меткая лопасть', variant17: 'Лопастная хватка', variant18: 'Взгляд с высоты крыла',
        variant19: 'Щелчок лопасти вмиг', variant20: 'Ветреный дух мельницы', variant21: 'Стойкая лопасть',
        variant22: 'Юркий Крылорез', variant23: 'Лопастная стойкость', variant24: 'Чуткая лопасть',
        variant25: 'Ускользающий щелчок', variant26: 'Щелчок из углов дикий', variant27: 'Мощь щепы',
        variant28: 'Щелчок из угла вмиг', variant29: 'Каменная лопасть', variant30: 'Разросшееся крыло',
        variant31: 'Лопастный рывок', variant32: 'Живучая лопасть', variant33: 'Щелчок из четырёх углов',
        variant34: 'Лопастная прыть', variant35: 'Лопастная выносливость'
    },
    enem5: {
        variant1: 'Ленивый удар', variant2: 'Коготок в крайности', variant3: 'Скрытая сила',
        variant4: 'Перчатка-защита', variant5: 'Удар из угла', variant6: 'Едкая лень',
        variant7: 'Скрытая мощь', variant8: 'Мягкая перчатка', variant9: 'Разгон только в крайности',
        variant10: 'Живучая Белоручка', variant11: 'Цепкая перчатка', variant12: 'Удар и в тень',
        variant13: 'Плотная перчатка', variant14: 'Неутомимая лень', variant15: 'Рывок из безделья',
        variant16: 'Меткий ленивый удар', variant17: 'Скрытая хватка', variant18: 'Ленивый прищур',
        variant19: 'Рывок в крайности вмиг', variant20: 'Дух безделья', variant21: 'Стойкая к труду лень',
        variant22: 'Юркая, когда припрёт', variant23: 'Скрытая стойкость', variant24: 'Чуткая к опасности лень',
        variant25: 'Ускользающая от работы', variant26: 'Рывок в последний миг', variant27: 'Мощь лени',
        variant28: 'Внезапный разгон', variant29: 'Каменная лень', variant30: 'Собранный жерновой вес',
        variant31: 'Ленивый рывок', variant32: 'Живучая перчатка', variant33: 'Последний рывок вновь',
        variant34: 'Скрытая прыть', variant35: 'Скрытая выносливость'
    }
};
