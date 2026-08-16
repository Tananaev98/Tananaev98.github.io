let lvlNumber = 16;
let factorChar = (lvlNumber * 5) / 100;

// Открытие Области II «Золотые поля». Свежий старт региона, поэтому темп чуть
// мягче финала Смешанного леса, но геометрия и почерк каждого босса — новые.
const bossCombatConfig = {
	levelCadence: 0.94, damageMultiplier: 1.941, minWaveDelay: 2200, minShotDelay: 155, minTelegraphMs: 560,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.31, cadence: 0.86, speed: 1.08, damage: 1.12, telegraphMultiplier: 0.93, surpriseChance: 0.22, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0.00, cadence: 0.73, speed: 1.17, damage: 1.24, telegraphMultiplier: 0.86, surpriseChance: 0.32, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { movementStyle: 'straight',    cadence: 1.00, telegraphMs: 880, speedMultiplier: 0.95, damageMultiplier: 0.95, speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18] }, // SOWER_STRIDE: сеятель ровным шагом бросает горстями
		enem2: { movementStyle: 'weave',  cadence: 0.88, telegraphMs: 740, speedMultiplier: 1.10, damageMultiplier: 0.85, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26] }, // GRAIN_FAN: веерный разброс зерна со сменой ритма
		enem3: { movementStyle: 'accelerate',       cadence: 1.20, telegraphMs: 980, speedMultiplier: 0.85, damageMultiplier: 1.12, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.16] }, // LARK_STOOP: редкие тяжёлые пикирования жаворонка
		enem4: { movementStyle: 'pause',    cadence: 0.78, telegraphMs: 620, speedMultiplier: 1.20, damageMultiplier: 0.65, speedVariance: [0.92, 1.02, 1.12, 1.22, 1.30] }, // OVERSEER_URGENCY: нервная скороговорка распорядителя сева
		enem5: { movementStyle: 'drift',       cadence: 0.75, telegraphMs: 640, speedMultiplier: 1.08, damageMultiplier: 1.06, speedVariance: [0.84, 0.96, 1.08, 1.20, 1.32] }  // HARROW_RECKONING: борона проходит финальным рядом, смешивая почерк всех четверых
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Босовик',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Сеюшка',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Звонец',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 38,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Дед-Всевсей',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1550 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Зубец',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 36,
		size: '30%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

// Роли ролей сохранены с уровня 15: интро мягче, финал жёстче, но фракции
// собственные — сеятели и жаворонок бьют иначе, чем избушка и Баюнище.
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

// Уровень 16 — Пробуждение нивы, старт области «Золотые поля».
// Архетипы: ровный шаг сеятеля / веерный разброс зерна / редкие пикирования жаворонка /
// нервная скороговорка распорядителя / финальный ряд бороны. Полной нижней стены
// почти нет — только у финального босса, и только в одной сигнатурной комбинации.
const bossAbilities = [
	// ===== Босовик: SOWER_STRIDE — сеятель проходит ровным шагом, без стены =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //0 бросок слева
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //1 бросок справа
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 7 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 8 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 22, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 22, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 13 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //10 бросок из центра
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 5 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 21 }, //13 редкий резкий бросок
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //15 полная горсть от души

	// ===== Сеюшка: GRAIN_FAN — веер зерна с быстрой сменой ритма =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 17 }, //0 левый край веера
	{ boss: 'enem2', type: 'enem22', xPos: 34, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //2 верхушка веера
	{ boss: 'enem2', type: 'enem22', xPos: 66, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 17 }, //4 правый край веера
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 50, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //8 зерно в центре
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 25 }, //14 самый быстрый бросок
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 11 }, //15 неожиданный тяжёлый в центре

	// ===== Звонец: LARK_STOOP — редкие тяжёлые пикирования, длинные паузы =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //0 пике слева
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //1 пике справа
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //4 широкое пике в центр
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 13 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 9,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 19 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 21 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 22 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //13 самое медленное и тяжёлое пике
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 8 },  //15 удар после долгой паузы

	// ===== Дед-Всевсей: OVERSEER_URGENCY — нервная скороговорка, минимум паттерна =====
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 22 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 23 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 19 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 19 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 21 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //11 редкая пауза-контраст
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //14 самый быстрый рывок
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 16, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 15 },//15 обманный средний бросок

	// ===== Зубец: HARROW_RECKONING — финальный ряд бороны, стена только здесь =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //0 зубья входят из центра
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 14 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 14 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 16, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 15 }, //7 тяжёлый зубец цепляет глубже
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 25 }, //10 самый резкий рывок бороны
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11 нижний ряд: начало полного прохода
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //15 конец ряда — вся ширина поля вспахана
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 9 }   //16 неожиданный удар сверху после прохода
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 380, bossDelayAbDop: 6200 }, // ровный шаг и щедрая передышка
	{ boss: 'enem2', bossDelayAb: 280, bossDelayAbDop: 5000 }, // быстрый веер со сменой ритма
	{ boss: 'enem3', bossDelayAb: 440, bossDelayAbDop: 6800 }, // редкие тяжёлые пикирования, долгая пауза
	{ boss: 'enem4', bossDelayAb: 250, bossDelayAbDop: 4800 }, // нервные быстрые броски
	{ boss: 'enem5', bossDelayAb: 270, bossDelayAbDop: 4400 }, // финал: плотнее, но телеграф честный
];

const bossAbilitiesDop = [
	// Босовик — SOWER_STRIDE
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [1] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [11, 12] }, // бросок по краям с паузой
	{ boss: 'enem1', indexAbilities: [10, 13, 14] }, // честный поворот: центр → редкий резкий бросок
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6, 8, 10, 15] }, // долгий проход поля, добивает полная горсть

	// Сеюшка — GRAIN_FAN
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [4] },
	{ boss: 'enem2', indexAbilities: [0, 4] },
	{ boss: 'enem2', indexAbilities: [1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 14] }, // полный веер → самый быстрый бросок
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 15] }, // боковой снос → неожиданный тяжёлый в центре

	// Звонец — LARK_STOOP
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [1] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [13, 14] }, // два самых медленных тяжёлых пике, долгая пауза между
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11, 12] }, // нарастающая дуга к быстрому финалу
	{ boss: 'enem3', indexAbilities: [0, 4, 1, 15] }, // знакомые пике + удар после долгой паузы

	// Дед-Всевсей — OVERSEER_URGENCY
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [1] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6] },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem4', indexAbilities: [11, 12, 13] }, // редкие медленные для контраста ритма
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 14] }, // быстрый залп → самый быстрый рывок
	{ boss: 'enem4', indexAbilities: [6, 9, 10, 15] }, // центральные броски + обманный средний

	// Зубец — HARROW_RECKONING. Смешивает почерк четырёх предыдущих боссов уровня.
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [7] },
	{ boss: 'enem5', indexAbilities: [0, 7] },
	{ boss: 'enem5', indexAbilities: [1, 2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10] }, // быстрое трио
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14, 15, 10] }, // сигнатура: полный проход бороны → внезапный удар сверху
	{ boss: 'enem5', indexAbilities: [0, 5, 8, 10, 16] }, // смешение: вход → рост → трио → неожиданный удар
];
