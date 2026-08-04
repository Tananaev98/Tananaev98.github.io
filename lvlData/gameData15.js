let lvlNumber = 15;
let factorChar = (lvlNumber * 5) / 100;

// Финал Смешанного леса. Сложность строится на смене приоритетов и чтении
// геометрии, а не на одновременном усилении частоты, скорости и урона.
const bossCombatConfig = {
	levelCadence: 0.70, damageMultiplier: 1.25, minWaveDelay: 1950, minShotDelay: 130, minTelegraphMs: 460,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 1.02, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.31, cadence: 0.74, speed: 1.15, damage: 1.16, telegraphMultiplier: 0.89, surpriseChance: 0.30, maxActiveAttacks: 21 },
		{ phase: 3, minHp: 0.00, cadence: 0.60, speed: 1.28, damage: 1.34, telegraphMultiplier: 0.82, surpriseChance: 0.42, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: { movementStyle: 'drift', cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.02, damageMultiplier: 0.96, speedVariance: [0.84, 0.94, 1.02, 1.10, 1.18] }, // CENTER_OUT_BELLS: круги сходятся к центру
		enem2: { movementStyle: 'weave', cadence: 0.92, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 0.84, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] }, // PERIMETER_FLIGHT: полёт по дуге периметра
		enem3: { movementStyle: 'pause', cadence: 1.12, telegraphMs: 960, speedMultiplier: 0.88, damageMultiplier: 1.08, speedVariance: [0.74, 0.84, 0.94, 1.04, 1.14] }, // FOOTSTEPS: редкие тяжёлые шаги
		enem4: { movementStyle: 'accelerate', cadence: 0.84, telegraphMs: 650, speedMultiplier: 1.12, damageMultiplier: 0.68, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26] }, // BROOM_SWEEP: направленный пролёт метлы
		enem5: {
			movementStyle: 'lateRush', cadence: 0.72, telegraphMs: 650, speedMultiplier: 1.15, damageMultiplier: 1.05,
			speedVariance: [0.82, 0.94, 1.06, 1.18, 1.30],
			phaseMessages: { 2: 'БАБА-ЯГА КОЛДУЕТ', 3: 'ПЛЯСКА ИЗБУШКИ' }
		} // WITCHCRAFT_FINALE: морок, ступа и удары избушки
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
		dispName: 'Баюнище',
		image: 'images/enemies/regions/1_smesh_les/lvl15/1.webp',
		baseHP: 5200 + (5200 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 300,
		xPos: 36,
		size: '27%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Каркун-Вещун',
		image: 'images/enemies/regions/1_smesh_les/lvl15/2.webp',
		baseHP: 20500 + (20500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 450,
		xPos: 36,
		size: '25%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Топотушка',
		image: 'images/enemies/regions/1_smesh_les/lvl15/3.webp',
		baseHP: 43000 + (43000 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 650,
		xPos: 36,
		size: '28%',
        deathAnimation: { preset: 'heavySink', durationMs: 1500 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Ступолёт',
		image: 'images/enemies/regions/1_smesh_les/lvl15/4.webp',
		baseHP: 90000 + (90000 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 850,
		xPos: 38,
		size: '23%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Баба-яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/5.webp',
		baseHP: 146000 + (146000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 36,
		size: '27%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1600 }
	}
};

// Три бюджета урона не дают плотным сериям стать смертельным пулемётом.
// В первой фазе даже две тяжёлые атаки оставляют самому хрупкому герою шанс.
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

// Уровень 15 — Избушка и Баба-яга, финал области «Смешанный лес».
// Архетипы: круги из центра / дуга по периметру / чередующиеся шаги /
// направленный пролёт / ведьмовской морок с ложным центром. Полной нижней стены нет.
const bossAbilities = [
	// ===== Баюнище: CENTER_OUT_BELLS — звон расходится кругами из центра =====
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //0 центр, медленный звон
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 14 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 15 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 15 }, //7 язык колокола
	{ boss: 'enem1', type: 'enem11', xPos: 36, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 21 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 64, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 4 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 25 }, //12 быстрый бой часов
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 13 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 74, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 15 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //15 ложный сон → удар

	// ===== Каркун-Вещун: PERIMETER_FLIGHT — одна дуга поля за серию =====
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 18 }, //0 верх слева
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 24 }, //2 верх справа
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 18, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 50, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //6 низ центра
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 18, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 23 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 28, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 28, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 25 }, //14 резкий крик
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 9 },  //15

	// ===== Топотушка: FOOTSTEPS — одиночные шаги и редкие тройки, не стена =====
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //0 левая нога
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //1 правая нога
	{ boss: 'enem3', type: 'enem33', xPos: 34, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 8 },  //4 дверь-клюв
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 28, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 28, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 24, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 24, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 15 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 21 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 9 },  //15

	// ===== Ступолёт: BROOM_SWEEP — серия имеет одно направление и выход =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //10 пыль после пролёта
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 10 }, //13 ложный старт
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 13 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //15 быстрый таран

	// ===== Баба-яга: WITCHCRAFT_FINALE — морок, ступа и пляшущая избушка =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //0 морок в центре
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //1 внутренняя дуга
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 26, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, //3 внешний размах
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 26, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 14 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 16, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 15 }, //7 удар посохом
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 23 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 25 }, //10 ведьмина вспышка
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //11 шаг избушки
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 16 }, //13 пролёт слева
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 18 }, //14 пролёт справа
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 9 },  //15 ложный центр
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 340, bossDelayAbDop: 6000 }, // спокойные круги с передышкой
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 5500 }, // отдельные дуги, не весь периметр
	{ boss: 'enem3', bossDelayAb: 420, bossDelayAbDop: 6500 }, // тяжёлые шаги и длинная пауза
	{ boss: 'enem4', bossDelayAb: 290, bossDelayAbDop: 5200 }, // быстрый, но малый урон и одно направление
	{ boss: 'enem5', bossDelayAb: 300, bossDelayAbDop: 4600 }, // финальные серии плотнее, но каждая атака сохраняет телеграф
];

const bossAbilitiesDop = [
	// Баюнище — CENTER_OUT_BELLS
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },
	{ boss: 'enem1', indexAbilities: [1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11] },
	{ boss: 'enem1', indexAbilities: [15, 7, 12] }, // честный поворот: сон → язык → быстрый бой
	{ boss: 'enem1', indexAbilities: [3, 5, 8] },
	{ boss: 'enem1', indexAbilities: [4, 6, 9, 0] },
	{ boss: 'enem1', indexAbilities: [0, 3, 4, 8, 9] },

	// Каркун-Вещун — PERIMETER_FLIGHT
	{ boss: 'enem2', indexAbilities: [0, 10] },
	{ boss: 'enem2', indexAbilities: [2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0] },
	{ boss: 'enem2', indexAbilities: [10, 14] },
	{ boss: 'enem2', indexAbilities: [4, 12, 15, 14] },
	{ boss: 'enem2', indexAbilities: [7, 8, 13, 0] },
	{ boss: 'enem2', indexAbilities: [0, 1, 3, 5, 6] }, // полукруг, противоположная сторона свободна

	// Топотушка — FOOTSTEPS
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 4, 3] },
	{ boss: 'enem3', indexAbilities: [5, 6, 9] },
	{ boss: 'enem3', indexAbilities: [10, 12, 11] },
	{ boss: 'enem3', indexAbilities: [13, 15, 14] },
	{ boss: 'enem3', indexAbilities: [0, 5, 10, 1] }, // шаг поднимается по краю и меняет ногу

	// Ступолёт — BROOM_SWEEP
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [3, 4] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15] }, // два ложных старта → таран сверху

	// Баба-яга — WITCHCRAFT_FINALE. Она смешивает приёмы четырёх хранителей уровня.
	{ boss: 'enem5', indexAbilities: [1, 0, 2] }, // расходящийся морок Баюнища
	{ boss: 'enem5', indexAbilities: [8, 14, 12, 9] }, // рваная дуга Каркуна
	{ boss: 'enem5', indexAbilities: [11, 15, 12] }, // два шага избушки и удар в центре
	{ boss: 'enem5', indexAbilities: [13, 5, 7, 6, 14] }, // пролёт ступы слева направо
	{ boss: 'enem5', indexAbilities: [0, 7, 10] }, // морок замирает перед быстрым ударом сверху
	{ boss: 'enem5', indexAbilities: [1, 3, 5, 10, 8] }, // левая спираль заканчивается встречным выпадом
	{ boss: 'enem5', indexAbilities: [2, 4, 6, 10, 9] }, // зеркальная правая спираль
	{ boss: 'enem5', indexAbilities: [15, 5, 6, 3, 4, 10, 7] }, // финал: ложный центр → двойная дуга → удар посохом
];
