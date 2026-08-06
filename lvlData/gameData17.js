let lvlNumber = 17;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 17 — «Стражи посевов», область II «Золотые поля».
// Пять архетипов без повторов: одиночные вылазки из борозды / колонна с одного бока /
// давление снизу редкими тяжёлыми ударами / только четыре угла поля / финал смешивает
// мотивы всех четверых и впервые на уровне закрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	levelCadence: 0.92, damageMultiplier: 1.05, minWaveDelay: 2150, minShotDelay: 152, minTelegraphMs: 550,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.13, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.31, cadence: 0.85, speed: 1.09, damage: 1.13, telegraphMultiplier: 0.92, surpriseChance: 0.23, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0.00, cadence: 0.72, speed: 1.18, damage: 1.25, telegraphMultiplier: 0.85, surpriseChance: 0.33, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { movementStyle: 'pause',    cadence: 1.05, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 0.93, speedVariance: [0.88, 0.95, 1.02, 1.09, 1.16] }, // ПРИТАЙКА: перепёлка выжидает в бороздах, редкие одиночные вылазки
		enem2: { movementStyle: 'drift',    cadence: 0.85, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 0.88, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] }, // ЩЕКАН: хомяк волочит мешки колонной с одного бока
		enem3: { movementStyle: 'straight', cadence: 1.25, telegraphMs: 980, speedMultiplier: 0.82, damageMultiplier: 1.15, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] }, // СТОЛБИК: суслик держит стойку у норы и бьёт редко, но давит снизу
		enem4: { movementStyle: 'lateRush', cadence: 0.75, telegraphMs: 600, speedMultiplier: 1.22, damageMultiplier: 0.62, speedVariance: [0.90, 1.02, 1.14, 1.26, 1.38] }, // ТРЕЩОТНИК: трещотка щёлкает нервно из всех четырёх углов поля
		enem5: { movementStyle: 'weave',    cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.10, damageMultiplier: 1.05, speedVariance: [0.86, 0.97, 1.09, 1.21, 1.33] }  // ШУРШАЛО: чучело смешивает почерк всех четверых и закрывает зоны одну за другой
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Притайка',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/1.webp',
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
		dispName: 'Щекан',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 65,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Столбик',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/3.webp',
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
		dispName: 'Трещотник',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/4.webp',
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
		dispName: 'Шуршало',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/5.webp',
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

// Урон унаследован от проверенного распределения уровня 16: та же лестница
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

// Уровень 17 — Стражи посевов. Архетипы: одиночные вылазки из борозды / колонна мешков
// с одного бока / давление снизу редкими тяжёлыми ударами / только четыре угла поля /
// финал смешивает почерк всех четверых и впервые перекрывает всю нижнюю полосу разом.
const bossAbilities = [
	// ===== Притайка: короткие одиночные вылазки, длинные паузы, без стены и без дождя =====
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 5 },  //0 вылазка слева
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 6 },  //1 вылазка справа
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 25, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 18 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 21 }, //10 редкий резкий бросок из центра
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //11 самая медленная вылазка
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //13 нежданчик: тяжёлый удар там, где ждали лёгкий
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //15

	// ===== Щекан: колонна мешков зерна на левом боку, редкий встречный удар справа =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6 },  //0 первый мешок у норы
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 30, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 22, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 21 }, //5 верх колонны
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //6 самый тяжёлый мешок, у самой норы
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //8 редкий встречный удар с другого бока
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //10 мешок скатывается из центра
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 23 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //14 второй тяжёлый мешок
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //15 редкий быстрый удар с правого бока

	// ===== Столбик: давление снизу редкими тяжёлыми ударами, суслик держит стойку у норы =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //0 удар слева у самой земли
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //1 удар справа у самой земли
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 6 },  //4 широкий удар в центр
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 8 },  //7 самый тяжёлый, из-под самого поля
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 36, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 36, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 13 }, //10 редкий подъём выше обычного
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //13 редкий резкий бросок повыше
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 21 }, //14 нежданчик: неожиданно быстрый бросок сверху
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //15

	// ===== Трещотник: атаки только из четырёх углов поля, нервно и быстро =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //0 верхний левый угол
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 23 }, //1 верхний правый угол
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //4 самый резкий щелчок слева
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //5 самый резкий щелчок справа
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //6 нижний левый угол
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //7 нижний правый угол
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //12 редкий контраст: центр вместо угла
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //15 нежданчик: второй центральный щелчок сверху

	// ===== Шуршало: смешивает почерк всех четверых, впервые закрывает всю нижнюю полосу =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //0 эхо Столбика: удар из центра
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 17 }, //7 тяжёлый зубец цепляет глубже
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //8 эхо Трещотника: угловой щелчок
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 25 }, //10 самый резкий рывок
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11 нижний ряд: начало полного прохода
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //15 конец ряда — вся ширина поля закрыта
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 10 }  //16 неожиданный удар сверху после прохода
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 400, bossDelayAbDop: 6400 }, // редкие одиночные вылазки, самая щедрая передышка
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 4700 }, // колонна мешков, смена ритма
	{ boss: 'enem3', bossDelayAb: 460, bossDelayAbDop: 7000 }, // редкие тяжёлые удары, самая долгая пауза
	{ boss: 'enem4', bossDelayAb: 240, bossDelayAbDop: 4600 }, // нервные щелчки из углов
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 4300 }, // финал: плотнее всех, но телеграф честный
];

const bossAbilitiesDop = [
	// Притайка
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 9, 12] }, // ритмическая: медленно → быстро → медленно
	{ boss: 'enem1', indexAbilities: [1, 3, 5, 7, 9, 10] }, // опасная сигнатурная: нарастание к резкому финалу
	{ boss: 'enem1', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя: тяжёлый центр → быстрый верх

	// Щекан
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [6] },
	{ boss: 'enem2', indexAbilities: [0, 6] },
	{ boss: 'enem2', indexAbilities: [1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [4, 12, 5] }, // ритмическая: средне → медленно → быстро
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] }, // сигнатурная: полный проход колонны снизу вверх
	{ boss: 'enem2', indexAbilities: [8, 15, 13] }, // смешанная поздняя: редкий встречный бок + быстрые акценты

	// Столбик
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 4] }, // ритмическая: средне → средне → тяжёлый контраст
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 7, 9, 13] }, // сигнатурная: нарастающая волна снизу к резкому верху
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 14] }, // смешанная поздняя: подъём + неожиданный быстрый верх

	// Трещотник
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [1] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10, 11] },
	{ boss: 'enem4', indexAbilities: [4, 12, 5] }, // ритмическая: резкий щелчок → пауза-тяжесть → резкий щелчок
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 13, 15] }, // опасная сигнатурная: смешение всех четырёх углов
	{ boss: 'enem4', indexAbilities: [1, 3, 9, 14] }, // смешанная поздняя: правый угол пересобран по-новому

	// Шуршало — смешивает почерк всех четверых предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [7] },
	{ boss: 'enem5', indexAbilities: [0, 7] },
	{ boss: 'enem5', indexAbilities: [1, 2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10] }, // ритмическая: нарастающая быстрая тройка
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14, 15, 16] }, // сигнатура: полный проход стены → удар сверху
	{ boss: 'enem5', indexAbilities: [0, 5, 8, 10, 16] }, // смешанная поздняя: мотивы всех четырёх боссов уровня
];
