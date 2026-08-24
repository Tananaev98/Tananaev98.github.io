let lvlNumber = 15;
let factorChar = (lvlNumber * 5) / 100;

// Финал Смешанного леса переосмыслен: это больше не пять разных хранителей, а одна
// Баба-яга, показанная в пяти нарастающих обликах — от ведьмы с посохом до полного
// слияния с избушкой. Архетипы построены так же, как и обычная пятёрка боссов
// (иначе движок не читает уровень), но каждый следующий приём — явный шаг её
// перерождения, а финал сводит воедино приёмы всех четырёх предыдущих обликов.
const bossCombatConfig = {
	levelCadence: 0.70, damageMultiplier: 1.750, minWaveDelay: 1950, minShotDelay: 130, minTelegraphMs: 460,
	// Один и тот же противник от начала и до конца уровня — фоновая музыка
	// не должна плыть по настроению вслед за архетипами, поэтому здесь задан
	// единственный, всегда эпичный пул треков (см. правило 14 в lvlData/Правила
	// создания уровня.txt: явный musicMood полностью отменяет автоподбор).
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 1.02, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.31, cadence: 0.74, speed: 1.15, damage: 1.16, telegraphMultiplier: 0.89, surpriseChance: 0.30, maxActiveAttacks: 21 },
		{ phase: 3, minHp: 0.00, cadence: 0.60, speed: 1.28, damage: 1.34, telegraphMultiplier: 0.82, surpriseChance: 0.42, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: {
			movementStyle: 'drift', cadence: 1.05, telegraphMs: 880, speedMultiplier: 0.92, damageMultiplier: 0.92,
			healthMultiplier: 1.50,
			speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18],
			phaseMessages: { 2: 'ПОСОХ ЖАЖДЕТ КРОВИ', 3: 'ПОСОХ НЕ ЗНАЕТ ПОЩАДЫ' }
		}, // БАБА-ЯГА: зигзаг посоха, испытывает игрока
		enem2: {
			movementStyle: 'straight', cadence: 0.90, telegraphMs: 740, speedMultiplier: 1.06, damageMultiplier: 0.90,
			healthMultiplier: 1.50,
			speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25],
			appearMessage: 'ВЗБЕСИЛАСЬ ОТ ЗЛОСТИ',
			phaseMessages: { 2: 'КОГТИ РВУТСЯ В БОЙ', 3: 'КОГТИ ЖАЖДУТ КРОВИ' }
		}, // ЗЛАЯ БАБА-ЯГА: парные когтистые выпады с флангов
		enem3: {
			movementStyle: 'weave', cadence: 1.18, telegraphMs: 980, speedMultiplier: 0.85, damageMultiplier: 1.18,
			healthMultiplier: 1.50,
			speedVariance: [0.76, 0.86, 0.98, 1.10, 1.22],
			appearMessage: 'ПРОКЛЯТЬЯ КЛОКОЧУТ В ГОРЛЕ',
			phaseMessages: { 2: 'ПРОКЛЯТЬЯ КИПЯТ', 3: 'ОХВАЧЕНА БЕЗУМИЕМ' }
		}, // ОЧЕНЬ ЗЛАЯ БАБА-ЯГА: редкие тяжёлые проклятия, долгие паузы
		enem4: {
			movementStyle: 'lateRush', cadence: 0.76, telegraphMs: 610, speedMultiplier: 1.20, damageMultiplier: 0.66,
			healthMultiplier: 1.50,
			speedVariance: [0.90, 1.03, 1.16, 1.29, 1.42],
			appearMessage: 'ВЗОРВАЛАСЬ ЯРОСТЬЮ',
			phaseMessages: { 2: 'ПЫШЕТ ОГНЁМ', 3: 'ПЫЛАЕТ ЯРОСТЬЮ' }
		}, // ВЗБЕШЕННАЯ БАБА-ЯГА: нервные вспышки только из четырёх углов
		enem5: {
			movementStyle: 'pause', cadence: 0.72, telegraphMs: 640, speedMultiplier: 1.15, damageMultiplier: 1.10,
			healthMultiplier: 1.50,
			speedVariance: [0.84, 0.97, 1.10, 1.23, 1.36],
			appearMessage: 'ОБЕЗУМЕЛА ОКОНЧАТЕЛЬНО',
			phaseMessages: { 2: 'БЕЗУМИЕ РАСТЁТ', 3: 'БЕЗУМИЕ БЕЗ ГРАНИЦ' }
		} // ОБЕЗУМЕВШАЯ БАБА-ЯГА: полное перерождение, сводит воедино приёмы всех обликов
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Смешанный лес» пройдена!'
};

const ENEMY_TYPES = {
	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl15/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl15/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl15/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl15/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl15/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Злая Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Очень злая Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '29%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Взбешенная Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '30%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Обезумевшая Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '31%',
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
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.48)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 15 — пять обликов Бабы-яги. Архетипы: зигзаг посоха / парные когтистые
// выпады с флангов / редкие тяжёлые проклятия с долгой паузой / нервные вспышки
// только из углов / финальное перерождение, сводящее воедино приёмы всех обликов
// и впервые перекрывающее всю нижнюю полосу — лес смыкается вокруг героя.
const bossAbilities = [
	// ===== Яга: зигзаг посоха, испытывает игрока =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //13 нежданчик: тяжёлый посох из центра
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //15

	// ===== Костяница: парные когтистые выпады с флангов =====
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //0 пара A слева
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //1 пара A справа
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //2 пара B слева
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //3 пара B справа
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //4 пара C слева
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //5 пара C справа
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //6 редкий тяжёлый коготь слева
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //7 редкий тяжёлый коготь справа
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 6 },  //8 коготь в центр
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 25 }, //9 самый резкий центральный
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //14 самый медленный, глубочайший коготь
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //15

	// ===== Мороковица: редкие тяжёлые проклятия, долгие паузы между ними =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 6 },  //4 самое мощное проклятие, центр
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 22, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //11 нежданчик: резкий бросок сразу после паузы
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //13 самое медленное и мощное
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 9 },  //15

	// ===== Печевница: нервные вспышки только из четырёх углов =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 23 }, //0 верхний левый угол
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //1 верхний правый угол
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //4 самая резкая вспышка слева
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 27 }, //5 самая резкая вспышка справа
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //6 нижний левый угол
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //7 нижний правый угол
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //12 редкий контраст: центр вместо угла
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //15 нежданчик: второй центральный щелчок

	// ===== Лесовладычица: перерождение сводит воедино приёмы всех обликов =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //0 эхо Яги: зигзаг-центр
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //1 эхо Костяницы: пара слева
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //2 пара справа
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 24, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 13 }, //3 эхо Мороковицы: тяжёлое проклятие
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //4 эхо Печевницы: угловой рывок
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 26 }, //6 самый резкий финальный рывок
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //9 нижний ряд: лес смыкается
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13 конец ряда — лес обступил героя со всех сторон
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 12 } //14 неожиданный удар из центра после смыкания
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 380, bossDelayAbDop: 6200 }, // спокойное испытание, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 280, bossDelayAbDop: 5000 }, // парные выпады, смена ритма
	{ boss: 'enem3', bossDelayAb: 440, bossDelayAbDop: 6800 }, // редкие тяжёлые проклятия, самая долгая пауза
	{ boss: 'enem4', bossDelayAb: 230, bossDelayAbDop: 4600 }, // нервные вспышки из углов
	{ boss: 'enem5', bossDelayAb: 270, bossDelayAbDop: 4300 }, // финал: плотнее всех, но телеграф честный
];

const bossAbilitiesDop = [
	// Яга
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 9, 12] }, // ритмическая: медленно → быстро → медленно
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6, 8, 10] }, // опасная сигнатурная: нарастающий зигзаг к резкому финалу
	{ boss: 'enem1', indexAbilities: [13, 10, 14, 15] }, // смешанная поздняя: тяжёлый центр → быстрый верх

	// Костяница
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 10, 7] }, // ритмическая: тяжело → средне → легко
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 8] }, // опасная сигнатурная: все пары + коготь в центр
	{ boss: 'enem2', indexAbilities: [9, 12, 13, 15] }, // смешанная поздняя

	// Мороковица
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [13, 11, 14] }, // ритмическая: самое медленное → резкий рывок → снова медленное
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 7, 9, 15] }, // опасная сигнатурная
	{ boss: 'enem3', indexAbilities: [8, 10, 12] }, // смешанная поздняя

	// Печевница
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [1] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10, 11] },
	{ boss: 'enem4', indexAbilities: [4, 12, 5] }, // ритмическая: резкий щелчок → пауза-тяжесть → резкий щелчок
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 13, 15] }, // опасная сигнатурная: смешение всех четырёх углов
	{ boss: 'enem4', indexAbilities: [1, 3, 9, 14] }, // смешанная поздняя

	// Лесовладычица — сводит воедино приёмы всех четырёх предыдущих обликов
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [3] },
	{ boss: 'enem5', indexAbilities: [0, 3] },
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [7, 8, 6] }, // ритмическая: два боковых рывка сверху → резкий центр
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14] }, // сигнатура: полное смыкание леса → удар из центра
	{ boss: 'enem5', indexAbilities: [0, 4, 7, 9, 14] }, // смешанная поздняя: мотивы всех четырёх обликов
];

// Лорные названия связок. Уровень 15 — Баба-Яга (одна сущность, 5 нарастающих стадий
// гнева): от спокойной ведьмы до обезумевшей — словарь один и тот же персонаж, но
// интенсивность растёт от стадии к стадии (не переиспользуем слова между стадиями).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Ведьмин удар', variant2: 'Костяная нога', variant3: 'Ведьмина сила',
        variant4: 'Заговорённая шаль', variant5: 'Меткий помёл', variant6: 'Едкое зелье',
        variant7: 'Ведьмина мощь', variant8: 'Крепкая шаль', variant9: 'Полёт в ступе',
        variant10: 'Живучая Яга', variant11: 'Цепкие пальцы', variant12: 'Зелье и в лес',
        variant13: 'Плотная шаль', variant14: 'Неутомимая Яга', variant15: 'Прыжок в ступе',
        variant16: 'Меткое зелье', variant17: 'Ведьмина хватка', variant18: 'Колдовской прищур',
        variant19: 'Мгновенное заклятие', variant20: 'Колдовской дух', variant21: 'Стойкая к заклятьям',
        variant22: 'Юркая на костяной ноге', variant23: 'Ведьмина стойкость', variant24: 'Ухо на избушку',
        variant25: 'Ускользающая в чащу', variant26: 'Дикое зелье', variant27: 'Мощь заклятья',
        variant28: 'Внезапное заклятие', variant29: 'Кость ноги', variant30: 'Разросшееся колдовство',
        variant31: 'Ведьмин рывок', variant32: 'Живучая шаль', variant33: 'Неутомимый полёт',
        variant34: 'Ведьмина прыть', variant35: 'Ведьмина выносливость'
    },
    enem2: {
        variant1: 'Злобный удар', variant2: 'Ядовитая клюка', variant3: 'Злая сила',
        variant4: 'Колючая шаль', variant5: 'Бросок клюки', variant6: 'Проклятое зелье',
        variant7: 'Злая мощь', variant8: 'Клюка-щит', variant9: 'Разгневанный полёт',
        variant10: 'Живучая злоба', variant11: 'Костлявые когти', variant12: 'Проклятие и в чащу',
        variant13: 'Толстая шаль', variant14: 'Неутомимая злоба', variant15: 'Резкий взмах клюки',
        variant16: 'Меткое проклятие', variant17: 'Злая хватка', variant18: 'Испепеляющий взгляд',
        variant19: 'Мгновенное проклятие', variant20: 'Злобный дух', variant21: 'Стойкая к гневу',
        variant22: 'Юркая в гневе', variant23: 'Злая стойкость', variant24: 'Чуткая к обиде',
        variant25: 'Ускользающая в злобе', variant26: 'Дикая злоба', variant27: 'Мощь проклятья',
        variant28: 'Внезапное проклятие', variant29: 'Каменная злость', variant30: 'Разросшийся гнев',
        variant31: 'Злой рывок', variant32: 'Живучая клюка', variant33: 'Неутомимый гнев',
        variant34: 'Злая прыть', variant35: 'Злая выносливость'
    },
    enem3: {
        variant1: 'Яростный удар', variant2: 'Огненная клюка', variant3: 'Ярая сила',
        variant4: 'Грозовая шаль', variant5: 'Грозовой бросок', variant6: 'Кипящее зелье',
        variant7: 'Ярая мощь', variant8: 'Пылающая клюка', variant9: 'Взбешенный полёт',
        variant10: 'Живучая ярость', variant11: 'Раскалённые когти', variant12: 'Проклятие и в бурю',
        variant13: 'Грозовая шаль-щит', variant14: 'Неутомимая ярость', variant15: 'Молниеносный взмах',
        variant16: 'Проклятие бури', variant17: 'Ярая хватка', variant18: 'Пылающий взгляд',
        variant19: 'Грозовое проклятие', variant20: 'Грозовой дух', variant21: 'Стойкая к буре',
        variant22: 'Юркая в буре', variant23: 'Ярая стойкость', variant24: 'Чуткая к молнии',
        variant25: 'Ускользающая в грозе', variant26: 'Дикая буря', variant27: 'Кипящая мощь',
        variant28: 'Внезапная буря', variant29: 'Каменная ярость', variant30: 'Разросшаяся буря',
        variant31: 'Яростный рывок', variant32: 'Клюка бури', variant33: 'Неутомимая буря',
        variant34: 'Ярая прыть', variant35: 'Ярая выносливость'
    },
    enem4: {
        variant1: 'Безумный удар', variant2: 'Клюка хаоса', variant3: 'Безумная сила',
        variant4: 'Рваная шаль', variant5: 'Хаотичный бросок', variant6: 'Бурлящее зелье',
        variant7: 'Безумная мощь', variant8: 'Треснувшая клюка', variant9: 'Бешеный полёт',
        variant10: 'Живучее безумие', variant11: 'Скрюченные когти', variant12: 'Проклятие и в хаос',
        variant13: 'Изодранная шаль', variant14: 'Неутомимое безумие', variant15: 'Судорожный взмах',
        variant16: 'Хаотичное проклятие', variant17: 'Безумная хватка', variant18: 'Обезумевший взгляд',
        variant19: 'Мгновенный хаос', variant20: 'Дух безумия', variant21: 'Стойкая к боли',
        variant22: 'Юркая в бешенстве', variant23: 'Безумная стойкость', variant24: 'Чуткая к хаосу',
        variant25: 'Ускользающая в бешенстве', variant26: 'Дикое бешенство', variant27: 'Бурлящая мощь',
        variant28: 'Внезапный хаос', variant29: 'Каменное безумие', variant30: 'Разросшийся хаос',
        variant31: 'Безумный рывок', variant32: 'Треснувшая клюка-щит', variant33: 'Неутомимый хаос',
        variant34: 'Безумная прыть', variant35: 'Безумная выносливость'
    },
    enem5: {
        variant1: 'Последний удар', variant2: 'Клюка судьбы', variant3: 'Нечеловеческая сила',
        variant4: 'Испепелённая шаль', variant5: 'Смертельный бросок', variant6: 'Адское зелье',
        variant7: 'Нечеловеческая мощь', variant8: 'Обугленная клюка', variant9: 'Апокалиптический полёт',
        variant10: 'Неубиваемое безумие', variant11: 'Когти рока', variant12: 'Проклятие и в бездну',
        variant13: 'Тлеющая шаль', variant14: 'Вечное безумие', variant15: 'Последний взмах',
        variant16: 'Смертельное проклятие', variant17: 'Хватка рока', variant18: 'Взгляд бездны',
        variant19: 'Мгновенная гибель', variant20: 'Дух бездны', variant21: 'Неуязвимая к боли',
        variant22: 'Юркая в безумии', variant23: 'Нечеловеческая стойкость', variant24: 'Чуткая к року',
        variant25: 'Ускользающая в бездну', variant26: 'Апокалиптическое безумие', variant27: 'Адская мощь',
        variant28: 'Внезапная гибель', variant29: 'Каменное проклятие', variant30: 'Бездонный хаос',
        variant31: 'Последний рывок', variant32: 'Тлеющая клюка', variant33: 'Вечный хаос',
        variant34: 'Нечеловеческая прыть', variant35: 'Нечеловеческая выносливость'
    }
};
