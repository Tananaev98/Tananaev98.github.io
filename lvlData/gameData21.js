let lvlNumber = 21;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 21 — «Душистый сенокос», область II «Золотые поля».
// Пять архетипов: зигзаг косы без нижней стены / симметричные взмахи грабельных
// рук с флангов / редкие тяжёлые удары копны с долгой паузой / направленный
// пролёт перегруженного воза / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	levelCadence: 0.86, damageMultiplier: 1.09, minWaveDelay: 2040, minShotDelay: 144, minTelegraphMs: 530,
	phases: [
		{ phase: 1, minHp: 0.64, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.81, speed: 1.12, damage: 1.17, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0.00, cadence: 0.68, speed: 1.21, damage: 1.29, telegraphMultiplier: 0.81, surpriseChance: 0.37, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { movementStyle: 'weave',      cadence: 1.03, telegraphMs: 860, speedMultiplier: 0.93, damageMultiplier: 0.93, speedVariance: [0.87, 0.94, 1.01, 1.08, 1.15] }, // КОСМАЛЬ: зигзаг косы, без нижней стены
		enem2: { movementStyle: 'straight',   cadence: 0.89, telegraphMs: 730, speedMultiplier: 1.07, damageMultiplier: 0.89, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] }, // ВОРОШЕНЬ: симметричные взмахи грабельных рук
		enem3: { movementStyle: 'pause',      cadence: 1.19, telegraphMs: 990, speedMultiplier: 0.84, damageMultiplier: 1.19, speedVariance: [0.75, 0.85, 0.97, 1.09, 1.21] }, // КОПНУША: редкие тяжёлые удары, долгая пауза
		enem4: { movementStyle: 'accelerate', cadence: 0.85, telegraphMs: 645, speedMultiplier: 1.14, damageMultiplier: 0.66, speedVariance: [0.88, 0.99, 1.10, 1.21, 1.32] }, // ВОЗИЛО: направленный пролёт с чёткой стороной входа и выхода
		enem5: { movementStyle: 'lateRush',   cadence: 0.73, telegraphMs: 625, speedMultiplier: 1.16, damageMultiplier: 1.09, speedVariance: [0.81, 0.94, 1.07, 1.20, 1.33] }  // ДВУКОС: смешивает почерк всех четверых, впервые перекрывает низ поля разом
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Космаль',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/1.webp',
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
		dispName: 'Ворошень',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/2.webp',
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
		dispName: 'Копнуша',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/3.webp',
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
		dispName: 'Возило',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 38,
		size: '25%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Двукос',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '29%',
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
	// ===== Космаль: зигзаг косы от края к краю, без нижней стены =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //13 нежданчик: широкий тяжёлый взмах из центра
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //15

	// ===== Ворошень: симметричные взмахи грабельных рук с флангов =====
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

	// ===== Копнуша: редкие тяжёлые удары, долгая пауза между ними =====
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

	// ===== Возило: серия имеет одно направление и чёткий выход =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //10 пыль после проезда
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 10 }, //13 ложный старт
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 13 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //15 быстрый наезд

	// ===== Двукос: смешивает почерк всех четверых, впервые перекрывает низ разом =====
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
	{ boss: 'enem1', bossDelayAb: 420, bossDelayAbDop: 6300 }, // редкий зигзаг, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 290, bossDelayAbDop: 5000 }, // симметричные взмахи, смена ритма
	{ boss: 'enem3', bossDelayAb: 450, bossDelayAbDop: 6900 }, // редкие тяжёлые удары, самая долгая пауза
	{ boss: 'enem4', bossDelayAb: 240, bossDelayAbDop: 4600 }, // направленный проезд, малый урон
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 4300 }, // финал: плотнее всех, но телеграф честный
];

const bossAbilitiesDop = [
	// Космаль
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 9, 12] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6, 8, 10] }, // опасная сигнатурная
	{ boss: 'enem1', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя

	// Ворошень
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 10, 7] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 8] }, // опасная сигнатурная
	{ boss: 'enem2', indexAbilities: [9, 12, 13, 15] }, // смешанная поздняя

	// Копнуша
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [13, 11, 14] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 7, 9, 15] }, // опасная сигнатурная
	{ boss: 'enem3', indexAbilities: [8, 10, 12] }, // смешанная поздняя

	// Возило
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [3, 4] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4] }, // опасная сигнатурная
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15] }, // смешанная поздняя: два ложных старта → таран сверху

	// Двукос — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя
];
