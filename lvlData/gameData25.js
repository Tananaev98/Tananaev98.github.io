let lvlNumber = 25;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 25 — финал области II «Золотые поля». Это не пять разных тварей,
// а одна сущность — Полудница — в пяти нарастающих обликах: от простого
// зноя над бороздой до полностью раскрытого истинного облика. Слово
// «Полудница» есть в каждом имени, чтобы сразу было ясно, что это один
// и тот же противник, но эпитет перед ним меняется по явлению, а не по
// формуле «злая / очень злая / взбешенная» (зной → марево → угли → венец).
const bossCombatConfig = {
	levelCadence: 0.72, damageMultiplier: 1.440, minWaveDelay: 1950, minShotDelay: 132, minTelegraphMs: 500,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.78, speed: 1.14, damage: 1.18, telegraphMultiplier: 0.88, surpriseChance: 0.29, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.64, speed: 1.24, damage: 1.32, telegraphMultiplier: 0.80, surpriseChance: 0.40, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: {
			movementStyle: 'drift', cadence: 1.00, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 0.95,
			healthMultiplier: 1.50,
			speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18],
			phaseMessages: { 2: 'ЗНОЙ СВОДИТ С УМА', 3: 'МАРЕВО ГУСТЕЕТ УГРОЗОЙ' }
		}, // ЗНОЙНАЯ ПОЛУДНИЦА: зигзаг марева над бороздой, без нижней стены
		enem2: {
			movementStyle: 'weave', cadence: 0.88, telegraphMs: 730, speedMultiplier: 1.08, damageMultiplier: 0.92,
			healthMultiplier: 1.50,
			speedVariance: [0.84, 0.95, 1.06, 1.17, 1.28],
			appearMessage: 'ДВОИТСЯ ОТ ЗЛОБЫ',
			phaseMessages: { 2: 'ОТРАЖЕНИЯ ОБЕЗУМЕЛИ', 3: 'МАРЕВО ЖАЖДЕТ ДОБЫЧИ' }
		}, // МАРЕВАЯ ПОЛУДНИЦА: парные удары-двойники с флангов, симметричный мираж
		enem3: {
			movementStyle: 'accelerate', cadence: 1.22, telegraphMs: 990, speedMultiplier: 0.82, damageMultiplier: 1.22,
			healthMultiplier: 1.50,
			speedVariance: [0.74, 0.85, 0.98, 1.11, 1.24],
			appearMessage: 'УГЛИ ПЫШУТ ЖАРОМ',
			phaseMessages: { 2: 'УГЛИ РАЗГОРАЮТСЯ СИЛЬНЕЕ', 3: 'ГОРИТ БЕЗ ПОЩАДЫ' }
		}, // ЖАРОВАЯ ПОЛУДНИЦА: редкие тяжёлые вспышки углей, долгая пауза
		enem4: {
			movementStyle: 'lateRush', cadence: 0.74, telegraphMs: 590, speedMultiplier: 1.24, damageMultiplier: 0.68,
			healthMultiplier: 1.50,
			speedVariance: [0.93, 1.07, 1.21, 1.35, 1.49],
			appearMessage: 'ВЕНЕЦ ПЫЛАЕТ ЗЛОБОЙ',
			phaseMessages: { 2: 'ВЕНЕЦ ПЫШЕТ ЖАРОМ', 3: 'ВЕНЕЦ ГОРИТ БЕЗ ПОЩАДЫ' }
		}, // ВЕНЦЕНОСНАЯ ПОЛУДНИЦА: нервные вспышки лучей только из четырёх углов
		enem5: {
			movementStyle: 'pause', cadence: 0.68, telegraphMs: 610, speedMultiplier: 1.22, damageMultiplier: 1.16,
			healthMultiplier: 1.50,
			speedVariance: [0.80, 0.94, 1.08, 1.22, 1.36],
			appearMessage: 'ЯВИЛА ИСТИННЫЙ ГНЕВ',
			phaseMessages: { 2: 'ЗНОЙ СТАНОВИТСЯ НЕСТЕРПИМЫМ', 3: 'ПОЛДЕНЬ ПЫЛАЕТ БЕЗ ПОЩАДЫ' }
		} // ИСТИННАЯ ПОЛУДНИЦА: сводит воедино приёмы всех четырёх и впервые перекрывает низ поля разом
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Золотые поля» пройдена!'
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/1.webp',
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
		dispName: 'Маревая Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/2.webp',
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
		dispName: 'Жаровая Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Венценосная Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/4.webp',
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
		dispName: 'Истинная Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '35%',
        deathAnimation: { preset: 'heavySink', durationMs: 1600 }
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
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.63)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 25 — Полудница, финал области «Золотые поля». Архетипы: зигзаг марева
// без нижней стены / симметричные удары-двойники / редкие тяжёлые вспышки углей
// с долгой паузой / нервные лучи только из углов / истинный облик сводит воедино
// приёмы всех четырёх и впервые перекрывает всю нижнюю полосу разом.
const bossAbilities = [
	// ===== Знойная Полудница: зигзаг марева над бороздой, без нижней стены =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 6 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 68, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 27, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 20 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //13 нежданчик: волна зноя из центра
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //15

	// ===== Маревая Полудница: симметричные удары-двойники с флангов =====
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 6 },  //8 двойник в центре
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 25 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //14 самый медленный двойник, глубочайший
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //15

	// ===== Жаровая Полудница: редкие тяжёлые вспышки углей, долгая пауза между ними =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 6 },  //4 самая мощная вспышка, центр
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 22, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //11 нежданчик: резкая искра сразу после паузы
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //13 самая медленная и мощная
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 9 },  //15

	// ===== Венценосная Полудница: нервные вспышки лучей только из четырёх углов =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 23 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //4 самый резкий луч слева
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 27 }, //5 самый резкий луч справа
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //12 редкий контраст: венец вспыхивает в центре
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //15 нежданчик: второй центральный луч сверху

	// ===== Истинная Полудница: сводит воедино приёмы всех четверых =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //0 эхо знойного облика: волна из центра
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //1 эхо маревого облика: двойник слева
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //2 двойник справа
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 14 }, //3 эхо жарового облика: тяжёлая вспышка углей
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //4 эхо венценосного облика: луч из угла
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 26 }, //6 самый резкий финальный луч
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //9 нижний ряд: полдень накрывает поле целиком
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13 конец ряда — марево накрыло всю ширину поля
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 12 } //14 неожиданный удар из центра после смыкания зноя
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 380, bossDelayAbDop: 6200 }, // спокойное марево, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 280, bossDelayAbDop: 5000 }, // удары-двойники, смена ритма
	{ boss: 'enem3', bossDelayAb: 440, bossDelayAbDop: 6800 }, // редкие тяжёлые вспышки, самая долгая пауза
	{ boss: 'enem4', bossDelayAb: 225, bossDelayAbDop: 4500 }, // нервные лучи из углов
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4100 }, // истинный облик: плотнее всех, но телеграф честный
];

const bossAbilitiesDop = [
	// Знойная Полудница
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 9, 12] }, // ритмическая: медленно → быстро → медленно
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6, 8, 10] }, // опасная сигнатурная: нарастающее марево к резкому финалу
	{ boss: 'enem1', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя: волна из центра → быстрый верх

	// Маревая Полудница
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 10, 7] }, // ритмическая: тяжело → средне → легко
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 8] }, // опасная сигнатурная: все двойники + центр
	{ boss: 'enem2', indexAbilities: [9, 12, 13, 15] }, // смешанная поздняя

	// Жаровая Полудница
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [13, 11, 14] }, // ритмическая: самая медленная → резкая искра → снова медленная
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 7, 9, 15] }, // опасная сигнатурная
	{ boss: 'enem3', indexAbilities: [8, 10, 12] }, // смешанная поздняя

	// Венценосная Полудница
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [1] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10, 11] },
	{ boss: 'enem4', indexAbilities: [4, 12, 5] }, // ритмическая: резкий луч → пауза-тяжесть → резкий луч
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 13, 15] }, // опасная сигнатурная: смешение всех четырёх углов
	{ boss: 'enem4', indexAbilities: [1, 3, 9, 14] }, // смешанная поздняя

	// Истинная Полудница — сводит воедино приёмы всех четырёх предыдущих обликов
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая: два боковых луча сверху → резкий центр
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура: полдень смыкается над полем → удар из центра
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя: мотивы всех четырёх обликов
];

// Лорные названия связок. Уровень 25 — Полудница (одна сущность, 5 нарастающих
// стадий): от полуденного зноя до истинного облика — тот же принцип эскалации, что у
// Бабы-Яги на уровне 15, свой словарь на каждую стадию.
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Полуденный удар', variant2: 'Острый серп', variant3: 'Полуденная сила',
        variant4: 'Льняная защита', variant5: 'Взмах серпа', variant6: 'Едкий зной',
        variant7: 'Полуденная мощь', variant8: 'Плотный лён', variant9: 'Стремительный зной',
        variant10: 'Живучая Полудница', variant11: 'Цепкий серп', variant12: 'Взмах и в марево',
        variant13: 'Толстый лён', variant14: 'Неутомимая Полудница', variant15: 'Шаг в мареве',
        variant16: 'Меткий серп', variant17: 'Полуденная хватка', variant18: 'Взгляд полдня',
        variant19: 'Мгновенный зной', variant20: 'Полевой полуденный дух', variant21: 'Стойкий к зною лён',
        variant22: 'Юркая в мареве', variant23: 'Полуденная стойкость', variant24: 'Чуткая к жаре',
        variant25: 'Ускользающая в зное', variant26: 'Дикий зной', variant27: 'Мощь серпа',
        variant28: 'Внезапный зной', variant29: 'Стойкость к жаре', variant30: 'Разросшееся марево',
        variant31: 'Полуденный рывок', variant32: 'Живучий лён', variant33: 'Неутомимый зной',
        variant34: 'Полуденная прыть', variant35: 'Полуденная выносливость'
    },
    enem2: {
        variant1: 'Марный удар', variant2: 'Дрожащий серп', variant3: 'Марная сила',
        variant4: 'Дымчатая защита', variant5: 'Бросок сквозь марево', variant6: 'Зелье зноя',
        variant7: 'Марная мощь', variant8: 'Струящаяся защита', variant9: 'Мерцающий рывок',
        variant10: 'Живучее марево', variant11: 'Цепкая дымка', variant12: 'Бросок и в дрожь воздуха',
        variant13: 'Плотная дымка', variant14: 'Неутомимое марево', variant15: 'Струящийся шаг',
        variant16: 'Меткий мираж', variant17: 'Марная хватка', variant18: 'Двоящийся взгляд',
        variant19: 'Мгновенное мерцание', variant20: 'Дух миража', variant21: 'Дымка не развеивается',
        variant22: 'Юркая в мареве', variant23: 'Марная стойкость', variant24: 'Дрожание воздуха',
        variant25: 'Ускользающий мираж', variant26: 'Дикое мерцание', variant27: 'Обманчивая мощь',
        variant28: 'Внезапный мираж', variant29: 'Каменное марево', variant30: 'Разросшееся мерцание',
        variant31: 'Марный рывок', variant32: 'Живучая дымка', variant33: 'Неутомимое мерцание',
        variant34: 'Марная прыть', variant35: 'Марная выносливость'
    },
    enem3: {
        variant1: 'Жаровой удар', variant2: 'Раскалённый серп', variant3: 'Жаровая сила',
        variant4: 'Обугленная защита', variant5: 'Огненный взмах', variant6: 'Кипящий зной',
        variant7: 'Жаровая мощь', variant8: 'Пылающая защита', variant9: 'Обжигающий рывок',
        variant10: 'Живучий жар', variant11: 'Раскалённая хватка серпа', variant12: 'Взмах и в пекло',
        variant13: 'Плотное пламя', variant14: 'Неутомимый жар', variant15: 'Огненный шаг',
        variant16: 'Меткий уголь', variant17: 'Жаровая хватка', variant18: 'Испепеляющий взгляд',
        variant19: 'Мгновенный жар', variant20: 'Дух пекла', variant21: 'Стойкая к огню броня',
        variant22: 'Юркая в пламени', variant23: 'Жаровая стойкость', variant24: 'Чуткая к искре',
        variant25: 'Ускользающее пламя', variant26: 'Дикий жар', variant27: 'Кипящая мощь',
        variant28: 'Внезапное пекло', variant29: 'Каменный жар', variant30: 'Разросшееся пламя',
        variant31: 'Жаровой рывок', variant32: 'Живучее пламя', variant33: 'Неутомимое пекло',
        variant34: 'Жаровая прыть', variant35: 'Жаровая выносливость'
    },
    enem4: {
        variant1: 'Венценосный удар', variant2: 'Золотой серп', variant3: 'Венценосная сила',
        variant4: 'Царственная защита', variant5: 'Царский взмах', variant6: 'Венец зноя',
        variant7: 'Венценосная мощь', variant8: 'Сияющая защита', variant9: 'Царственный рывок',
        variant10: 'Живучая корона', variant11: 'Хватка золотого серпа', variant12: 'Взмах и в свиту зноя',
        variant13: 'Плотная корона', variant14: 'Неутомимая венценосная', variant15: 'Величавый шаг',
        variant16: 'Меткий венец', variant17: 'Венценосная хватка', variant18: 'Властный взгляд',
        variant19: 'Мгновенный царский удар', variant20: 'Дух владычицы полдня', variant21: 'Несокрушимая корона',
        variant22: 'Юркая при всей величавости', variant23: 'Венценосная стойкость', variant24: 'Чуткая к неповиновению',
        variant25: 'Ускользающая свита', variant26: 'Дикая власть', variant27: 'Мощь отравленного венца',
        variant28: 'Внезапный царский удар', variant29: 'Каменная корона', variant30: 'Разросшаяся власть',
        variant31: 'Венценосный рывок', variant32: 'Живучая корона', variant33: 'Неутомимая власть',
        variant34: 'Венценосная прыть', variant35: 'Венценосная выносливость'
    },
    enem5: {
        variant1: 'Истинный удар', variant2: 'Серп судьбы', variant3: 'Нечеловеческая сила',
        variant4: 'Пепельная защита', variant5: 'Смертельный взмах', variant6: 'Испепеляющий зной',
        variant7: 'Нечеловеческая мощь', variant8: 'Обугленная корона', variant9: 'Апокалиптический зной',
        variant10: 'Неубиваемая истинная сущность', variant11: 'Хватка серпа судьбы', variant12: 'Взмах и в бездну зноя',
        variant13: 'Тлеющая защита', variant14: 'Вечный зной', variant15: 'Последний шаг',
        variant16: 'Смертельный серп', variant17: 'Хватка истинной сущности', variant18: 'Взгляд полудня',
        variant19: 'Мгновенная гибель в зное', variant20: 'Дух истинного полдня', variant21: 'Неуязвимая сущность',
        variant22: 'Юркая в истинном обличье', variant23: 'Нечеловеческая стойкость', variant24: 'Чуткая к року',
        variant25: 'Ускользающая в бездну зноя', variant26: 'Апокалиптический зной вновь', variant27: 'Испепеляющая мощь',
        variant28: 'Внезапная гибель', variant29: 'Каменная истинная сущность', variant30: 'Бездонный зной',
        variant31: 'Истинный рывок', variant32: 'Тлеющая корона', variant33: 'Вечный зной снова',
        variant34: 'Нечеловеческая прыть', variant35: 'Нечеловеческая выносливость'
    }
};
