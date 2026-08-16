let lvlNumber = 22;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 22 — «Богатырская пахота», область II «Золотые поля».
// Пять архетипов: низкий забег лемеха с одного бока / давление снизу тяжёлого
// плуга / редкие удары рогом с долгой паузой / направленный бросок пластов
// земли / финал смешивает почерк всех четверых и впервые перекрывает всю
// нижнюю полосу разом.
const bossCombatConfig = {
	levelCadence: 0.84, damageMultiplier: 1.613, minWaveDelay: 2020, minShotDelay: 142, minTelegraphMs: 525,
	phases: [
		{ phase: 1, minHp: 0.64, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.29, cadence: 0.80, speed: 1.13, damage: 1.18, telegraphMultiplier: 0.88, surpriseChance: 0.28, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0.00, cadence: 0.67, speed: 1.22, damage: 1.30, telegraphMultiplier: 0.81, surpriseChance: 0.38, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { movementStyle: 'weave',   cadence: 1.05, telegraphMs: 780, speedMultiplier: 0.99, damageMultiplier: 1.11, speedVariance: [0.83, 0.93, 1.03, 1.13, 1.23] }, // ЛЕМЕШОК: низкий забег с одного бока, редкий центр
		enem2: { movementStyle: 'accelerate',      cadence: 1.20, telegraphMs: 960, speedMultiplier: 0.83, damageMultiplier: 1.16, speedVariance: [0.77, 0.87, 0.97, 1.09, 1.20] }, // ПЛУГАРЬ: давление снизу тяжёлого плуга
		enem3: { movementStyle: 'pause',   cadence: 1.02, telegraphMs: 810, speedMultiplier: 0.95, damageMultiplier: 0.94, speedVariance: [0.87, 0.94, 1.02, 1.10, 1.18] }, // БОДЕНЬ: редкие удары рогом с долгой паузой
		enem4: { movementStyle: 'drift', cadence: 0.83, telegraphMs: 640, speedMultiplier: 1.15, damageMultiplier: 0.65, speedVariance: [0.87, 0.98, 1.09, 1.20, 1.31] }, // БОРОЗДЕНЬ: направленный бросок пластов земли
		enem5: { movementStyle: 'straight',      cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.17, damageMultiplier: 1.10, speedVariance: [0.80, 0.93, 1.06, 1.19, 1.32] }  // МИКУЛА: богатырь-пахарь идёт прямой бороздой через всё поле — без уловок, там, где остальные хитрили
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Лемешок',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '25%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Плугарь',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/2.webp',
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
		dispName: 'Бодень',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Бороздень',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/4.webp',
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
		dispName: 'Микула',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/5.webp',
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
	// ===== Лемешок: низкий забег с одного бока, редкий центр =====
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 24 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //12 редкий тяжёлый бросок из центра
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 21 }, //13 резкий бросок из центра
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //15

	// ===== Плугарь: давление снизу тяжёлого плуга =====
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

	// ===== Бодень: редкие удары рогом с долгой паузой =====
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

	// ===== Бороздень: направленный бросок пластов, одно направление и выход =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, //0 L→R
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 15, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 14 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 17 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, //5 R→L
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 16, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 15 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 18 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 10 }, //13 ложный старт
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 13 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //15 резкий бросок сверху

	// ===== Микула: смешивает почерк всех четверых, впервые перекрывает низ разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 14 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 22 }, //5
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
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5400 }, // забег и долгая пауза перед новым рывком
	{ boss: 'enem2', bossDelayAb: 450, bossDelayAbDop: 6900 }, // тяжёлое давление снизу, долгая пауза
	{ boss: 'enem3', bossDelayAb: 460, bossDelayAbDop: 7000 }, // редкие рога, самая долгая пауза
	{ boss: 'enem4', bossDelayAb: 260, bossDelayAbDop: 4700 }, // направленный бросок, малый урон
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4200 }, // финал: плотнее всех, но честный
];

const bossAbilitiesDop = [
	// Лемешок
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [6] },
	{ boss: 'enem1', indexAbilities: [0, 6] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8] },
	{ boss: 'enem1', indexAbilities: [12, 14, 15] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] }, // опасная сигнатурная
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 13] }, // смешанная поздняя

	// Плугарь
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 4] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 7, 9, 13] }, // опасная сигнатурная
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 14] }, // смешанная поздняя

	// Бодень
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [13, 11, 14] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 7, 9, 15] }, // опасная сигнатурная
	{ boss: 'enem3', indexAbilities: [8, 10, 12] }, // смешанная поздняя

	// Бороздень
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [3, 4] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4] }, // опасная сигнатурная
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15] }, // смешанная поздняя

	// Микула — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя
];
