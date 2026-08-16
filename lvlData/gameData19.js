let lvlNumber = 19;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 19 — «Пожиратели урожая», область II «Золотые поля».
// Пять архетипов: плотный рой сверху / встречные зигзаг-тараны панциря /
// одиночные вылазки из нор по углам / горизонтальные пары с одного бока /
// финал смешивает почерк всех четверых и впервые перекрывает низ поля разом.
const bossCombatConfig = {
	levelCadence: 0.89, damageMultiplier: 1.997, minWaveDelay: 2080, minShotDelay: 148, minTelegraphMs: 540,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.15, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.30, cadence: 0.83, speed: 1.10, damage: 1.15, telegraphMultiplier: 0.90, surpriseChance: 0.25, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0.00, cadence: 0.70, speed: 1.19, damage: 1.27, telegraphMultiplier: 0.83, surpriseChance: 0.35, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { movementStyle: 'pause',      cadence: 1.00, telegraphMs: 720, speedMultiplier: 1.05, damageMultiplier: 0.86, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.26] }, // ПРОЖОРЕНЬ: плотный рой сыплется сверху
		enem2: { movementStyle: 'drift', cadence: 0.90, telegraphMs: 780, speedMultiplier: 0.98, damageMultiplier: 1.02, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] }, // ЛАТНИК: встречные зигзаг-тараны панциря
		enem3: { movementStyle: 'weave',   cadence: 0.78, telegraphMs: 600, speedMultiplier: 1.18, damageMultiplier: 0.64, speedVariance: [0.90, 1.02, 1.14, 1.26, 1.38] }, // ЗУБОСКАЛ: нервные вылазки из нор по углам
		enem4: { movementStyle: 'accelerate',      cadence: 0.88, telegraphMs: 730, speedMultiplier: 1.06, damageMultiplier: 0.88, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // ХЛЕБОКРАД: горизонтальные пары с одного бока
		enem5: { movementStyle: 'lateRush',      cadence: 0.74, telegraphMs: 630, speedMultiplier: 1.12, damageMultiplier: 1.08, speedVariance: [0.82, 0.95, 1.08, 1.21, 1.34] }  // НЕНАСЫТЬ: голоден до всего поля разом — жрёт пространство роем, тараном и вылазками из нор без разбора
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Прожорень',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/1.webp',
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
		dispName: 'Латник',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/2.webp',
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
		dispName: 'Зубоскал',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Хлебокрад',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 65,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1350 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Ненасыть',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/5.webp',
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

// Урон по проверенной лестнице light/medium/heavy — та же, что и на соседних уровнях.
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
	// ===== Прожорень: плотный рой сыплется сверху =====
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //0
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 24 }, //1
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 26 }, //2
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 26 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 24 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 18 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 18 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 20 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 20 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 9,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 27 }, //10 самый резкий центральный обрывок
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 14 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 14 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 5 },  //13 редкий контраст: тяжёлая масса роя падает вниз медленно
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //15

	// ===== Латник: встречные зигзаг-тараны панциря =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 42, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 6 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 42, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 6 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 24, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 24, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 21 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 37, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 10 }, //13 нежданчик: тяжёлый таран из центра
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 23 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 24 }, //15

	// ===== Зубоскал: нервные вылазки из нор по углам =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //0
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //1
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 26 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 27 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //12 редкий контраст: центр вместо угла
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 21 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 21 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 25 }, //15 нежданчик: второй центральный бросок сверху

	// ===== Хлебокрад: горизонтальные пары краж с одного бока =====
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 38, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 22, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 10 }, //8 редкий встречный удар с другого бока
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 13 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 23 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //15 редкий быстрый удар с правого бока

	// ===== Ненасыть: смешивает почерк всех четверых, впервые перекрывает низ разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //0 эхо Прожореня: рой из центра
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //1 эхо Латника: зигзаг слева
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 14 }, //3 эхо Зубоскала: угловой контраст в центр
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //4 эхо Хлебокрада: боковой рывок
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 26 }, //6 самый резкий финальный рывок
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //9 нижний ряд: начало полного прохода
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13 конец ряда — рой сожрал всю ширину поля
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 11 } //14 неожиданный удар из центра после прохода
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 260, bossDelayAbDop: 4600 }, // рой частый, но телеграф честный
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 5100 }, // тараны, смена ритма
	{ boss: 'enem3', bossDelayAb: 240, bossDelayAbDop: 4500 }, // нервные вылазки из нор
	{ boss: 'enem4', bossDelayAb: 290, bossDelayAbDop: 5000 }, // кражи парами, редкий встречный бок
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 4200 }, // финал: плотнее всех, но честный
];

const bossAbilitiesDop = [
	// Прожорень
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [5] },
	{ boss: 'enem1', indexAbilities: [0, 5] },
	{ boss: 'enem1', indexAbilities: [1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 13, 12] }, // ритмическая: средне → тяжело → средне
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5, 10] }, // опасная сигнатурная: полный дождь + резкий центр
	{ boss: 'enem1', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя

	// Латник
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [11, 13, 12] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 6, 8, 10] }, // опасная сигнатурная: нарастающий зигзаг
	{ boss: 'enem2', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя

	// Зубоскал
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [2, 3, 10, 11] },
	{ boss: 'enem3', indexAbilities: [4, 12, 5] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 8, 13, 15] }, // опасная сигнатурная: смешение углов
	{ boss: 'enem3', indexAbilities: [1, 3, 9, 14] }, // смешанная поздняя

	// Хлебокрад
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [6] },
	{ boss: 'enem4', indexAbilities: [0, 6] },
	{ boss: 'enem4', indexAbilities: [1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [4, 12, 5] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5] }, // опасная сигнатурная: полный проход слева
	{ boss: 'enem4', indexAbilities: [8, 15, 13] }, // смешанная поздняя: редкий встречный бок

	// Ненасыть — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура: полный проход стены → удар из центра
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя: мотивы всех четырёх боссов уровня
];
