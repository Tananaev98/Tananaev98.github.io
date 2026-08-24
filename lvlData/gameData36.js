let lvlNumber = 36;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 36 — «Хищница глубин», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом (рыбы-гуманоиды).
// 'wave' у трёх: Серебрянка мечется мелкой блестящей волной, Полосатик держит
// среднюю уверенную волну, Усач тяжело переваливается широкой донной волной.
// Красноплав — не-wave (accelerate): круглый и юркий, бьёт короткими разгонными
// бросками, а не колебанием. Зубарь (финал, щука) — lateRush: долгая неподвижная
// засада и внезапный хищный рывок — вместо волны честная прямая атака из засады.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.86, damageMultiplier: 2.17, minWaveDelay: 2020, minShotDelay: 140, minTelegraphMs: 520,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.81, speed: 1.16, damage: 1.18, telegraphMultiplier: 0.87, surpriseChance: 0.29, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.66, speed: 1.28, damage: 1.32, telegraphMultiplier: 0.79, surpriseChance: 0.40, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: { movementStyle: 'wave',       cadence: 1.05, telegraphMs: 810, speedMultiplier: 1.03, damageMultiplier: 0.87, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Серебрянка: мелкая блестящая волна
		enem2: { movementStyle: 'accelerate', cadence: 0.98, telegraphMs: 760, speedMultiplier: 1.00, damageMultiplier: 0.96, speedVariance: [0.83, 0.93, 1.04, 1.15, 1.26] }, // Красноплав: короткие разгонные броски
		enem3: { movementStyle: 'wave',       cadence: 0.94, telegraphMs: 850, speedMultiplier: 0.94, damageMultiplier: 1.04, speedVariance: [0.83, 0.93, 1.04, 1.15, 1.26] }, // Полосатик: средняя уверенная волна
		enem4: { movementStyle: 'wave',       cadence: 0.90, telegraphMs: 940, speedMultiplier: 0.84, damageMultiplier: 1.16, speedVariance: [0.76, 0.86, 0.97, 1.08, 1.19] }, // Усач: тяжёлая широкая донная волна
		enem5: { movementStyle: 'lateRush',   cadence: 0.80, telegraphMs: 1000, speedMultiplier: 0.78, damageMultiplier: 1.08, speedVariance: [0.85, 0.98, 1.11, 1.24, 1.37] } // Зубарь: долгая засада → хищный рывок, финал
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl36/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl36/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl36/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl36/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl36/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Серебрянка', image: 'images/enemies/regions/4_rech_ozer/lvl36/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 300, xPos: 50, size: '23%',
		deathAnimation: { preset: 'scaleFlash', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Красноплав', image: 'images/enemies/regions/4_rech_ozer/lvl36/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 440, xPos: 50, size: '24%',
		deathAnimation: { preset: 'finCrumple', durationMs: 1200 }
	},
	enem3: {
		name: 'enem3', dispName: 'Полосатик', image: 'images/enemies/regions/4_rech_ozer/lvl36/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 560, xPos: 50, size: '26%',
		deathAnimation: { preset: 'stripeFade', durationMs: 1350 }
	},
	enem4: {
		name: 'enem4', dispName: 'Усач', image: 'images/enemies/regions/4_rech_ozer/lvl36/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 700, xPos: 50, size: '29%',
		deathAnimation: { preset: 'heavySink', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Зубарь', image: 'images/enemies/regions/4_rech_ozer/lvl36/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'jawSnapFade', durationMs: 1550 }
	}
};

const attackDamage = {
	enem1: { light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.28), medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.40), heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.54) },
	enem2: { light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.26), medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.36), heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50) },
	enem3: { light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.56) },
	enem4: { light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.22), medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.32), heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.46) },
	enem5: { light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.58) }
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	// ===== Серебрянка: 'wave', мелкая блестящая волна =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 32, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10, waveAmplitude: 6,  waveFrequency: 1.9 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 31, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 1.7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 22, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 13, waveAmplitude: 5,  waveFrequency: 2.2 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 21, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 14, waveAmplitude: 6,  waveFrequency: 2.0 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 18, waveAmplitude: 8,  waveFrequency: 1.4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 19, waveAmplitude: 9,  waveFrequency: 1.3 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 22, waveAmplitude: 5,  waveFrequency: 2.6 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 23, waveAmplitude: 6,  waveFrequency: 2.4 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.1 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.2 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16, waveAmplitude: 6,  waveFrequency: 1.8 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16, waveAmplitude: 7,  waveFrequency: 1.7 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 5,  waveAmplitude: 9,  waveFrequency: 0.9 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 6,  waveFrequency: 2.0 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 7,  waveFrequency: 1.9 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 24, waveAmplitude: 5,  waveFrequency: 2.7 }   //15 нежданчик

	,
	// ===== Красноплав: разгонные броски (accelerate) =====
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 38, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 37, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 25, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 13, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 14 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 14 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 46, yPos: 17, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 54, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 4 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 4 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 31, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 31, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 26 }  //15 нежданчик — самый резкий бросок

	,
	// ===== Полосатик: 'wave', средняя уверенная волна =====
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 1.3 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 33, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 1.2 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 24, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10, waveAmplitude: 6,  waveFrequency: 1.6 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 23, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 1.5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 13, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14, waveAmplitude: 5,  waveFrequency: 1.9 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15, waveAmplitude: 6,  waveFrequency: 1.8 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 19, waveAmplitude: 5,  waveFrequency: 2.2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 2.1 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 0.9 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.0 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12, waveAmplitude: 6,  waveFrequency: 1.7 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12, waveAmplitude: 7,  waveFrequency: 1.6 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5,  waveAmplitude: 9,  waveFrequency: 0.8 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 15, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.7 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 14, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.6 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21, waveAmplitude: 5,  waveFrequency: 2.3 }   //15 нежданчик

	,
	// ===== Усач: 'wave', тяжёлая широкая донная волна =====
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 3,  waveAmplitude: 9,  waveFrequency: 0.5 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4,  waveAmplitude: 10, waveFrequency: 0.4 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 3,  waveAmplitude: 9,  waveFrequency: 0.5 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4,  waveAmplitude: 10, waveFrequency: 0.4 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6,  waveAmplitude: 7,  waveFrequency: 0.7 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 33, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6,  waveAmplitude: 8,  waveFrequency: 0.6 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 10, waveAmplitude: 5,  waveFrequency: 1.0 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 19, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 10, waveAmplitude: 6,  waveFrequency: 0.9 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16, waveAmplitude: 6,  waveFrequency: 1.2 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17, waveAmplitude: 7,  waveFrequency: 1.1 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 19, waveAmplitude: 5,  waveFrequency: 1.4 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 1.3 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.6 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.6 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6,  waveAmplitude: 12, waveFrequency: 0.35 }, //14 самая тяжёлая и широкая волна уровня
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22, waveAmplitude: 6,  waveFrequency: 1.5 }   //15 нежданчик

	,
	// ===== Зубарь: долгая засада → хищный рывок (lateRush), финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 41, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 29, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 15, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 12 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 14, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 12 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 11 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 19, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 11 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 3 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 3 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 27 }  //15 нежданчик — самый резкий хищный рывок
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 220, bossDelayAbDop: 4000 }, // мелкая блестящая волна, быстрый темп
	{ boss: 'enem2', bossDelayAb: 280, bossDelayAbDop: 4600 }, // разгонные броски
	{ boss: 'enem3', bossDelayAb: 300, bossDelayAbDop: 5100 }, // средняя уверенная волна
	{ boss: 'enem4', bossDelayAb: 420, bossDelayAbDop: 6400 }, // тяжёлая донная волна, самая долгая пауза
	{ boss: 'enem5', bossDelayAb: 460, bossDelayAbDop: 7000 }, // долгая засада перед хищным рывком, финал
];

const bossAbilitiesDop = [
	// Серебрянка
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },

	// Красноплав
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },

	// Полосатик
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [2, 3, 10] },
	{ boss: 'enem3', indexAbilities: [4, 5, 11] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem3', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },

	// Усач
	{ boss: 'enem4', indexAbilities: [0, 2] },
	{ boss: 'enem4', indexAbilities: [1, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 12] },
	{ boss: 'enem4', indexAbilities: [6, 7, 13] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 5] },
	{ boss: 'enem4', indexAbilities: [0, 2, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 2] },
	{ boss: 'enem4', indexAbilities: [8, 9, 14, 15] },

	// Зубарь
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 10, 11] },
	{ boss: 'enem5', indexAbilities: [6, 7, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [10, 11, 13, 14, 15] },
];

// Лорные названия связок. Уровень 36 — рыбий косяк: Серебрянка (уклейка), Красноплав
// (краснопёрка), Полосатик (окунь), Усач (сом), Зубарь (щука, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Серебристый удар', variant2: 'Острый плавник', variant3: 'Серебристая сила',
        variant4: 'Блестящая чешуя', variant5: 'Блестящая волна', variant6: 'Речная соль',
        variant7: 'Серебристая мощь', variant8: 'Плотная чешуя', variant9: 'Мелкая блестящая волна',
        variant10: 'Живучая Серебрянка', variant11: 'Цепкий плавник', variant12: 'Волна и на глубину',
        variant13: 'Толстая чешуя', variant14: 'Неутомимая Серебрянка', variant15: 'Пружинистый плавник',
        variant16: 'Меткая чешуйка', variant17: 'Серебристая хватка', variant18: 'Блестящий взгляд',
        variant19: 'Блестящая волна вмиг', variant20: 'Речной дух', variant21: 'Стойкая чешуя',
        variant22: 'Юркая Серебрянка', variant23: 'Серебристая стойкость', variant24: 'Чуткий плавник',
        variant25: 'Ускользающий блеск', variant26: 'Дикая волна', variant27: 'Мощь соли',
        variant28: 'Блестящая волна внезапно', variant29: 'Каменная чешуя', variant30: 'Разросшийся блеск',
        variant31: 'Серебристый рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая волна',
        variant34: 'Серебристая прыть', variant35: 'Серебристая выносливость'
    },
    enem2: {
        variant1: 'Алоплавниковый удар', variant2: 'Красный плавник', variant3: 'Алоплавниковая сила',
        variant4: 'Красная чешуя', variant5: 'Разгонный бросок', variant6: 'Рыбья кровь',
        variant7: 'Алоплавниковая мощь', variant8: 'Плотная красная чешуя', variant9: 'Короткий разгонный бросок',
        variant10: 'Живучий Красноплав', variant11: 'Цепкий красный плавник', variant12: 'Бросок и на глубину',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Красноплав', variant15: 'Красный плавник пружинит',
        variant16: 'Меткий бросок', variant17: 'Алоплавниковая хватка', variant18: 'Алый взгляд',
        variant19: 'Разгонный бросок вмиг', variant20: 'Кровавый речной дух', variant21: 'Стойкая красная чешуя',
        variant22: 'Юркий Красноплав', variant23: 'Алоплавниковая стойкость', variant24: 'Чуткий красный плавник',
        variant25: 'Ускользающий разгон', variant26: 'Дикий бросок', variant27: 'Мощь крови',
        variant28: 'Разгонный бросок внезапно', variant29: 'Каменная красная чешуя', variant30: 'Плавник разросся',
        variant31: 'Алоплавниковый рывок', variant32: 'Живучая красная чешуя', variant33: 'Неутомимый разгон',
        variant34: 'Алоплавниковая прыть', variant35: 'Алоплавниковая выносливость'
    },
    enem3: {
        variant1: 'Полосатый удар', variant2: 'Колючий плавник', variant3: 'Полосатая сила',
        variant4: 'Полосатая чешуя', variant5: 'Уверенная волна', variant6: 'Колючая слизь',
        variant7: 'Полосатая мощь', variant8: 'Плотная полосатая чешуя', variant9: 'Средняя уверенная волна',
        variant10: 'Живучий Полосатик', variant11: 'Колючий плавник-крюк', variant12: 'Волна и в камыш',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Полосатик', variant15: 'Колючий плавник пружинит',
        variant16: 'Меткий колючий шип', variant17: 'Полосатая хватка', variant18: 'Уверенный взгляд',
        variant19: 'Уверенная волна вмиг', variant20: 'Полосатый дух', variant21: 'Полосатая чешуя стойка',
        variant22: 'Юркий Полосатик', variant23: 'Полосатая стойкость', variant24: 'Чуткий колючий плавник',
        variant25: 'Ускользающая волна', variant26: 'Дикая полосатая волна', variant27: 'Мощь слизи',
        variant28: 'Уверенная волна внезапно', variant29: 'Каменная полосатая чешуя', variant30: 'Полосы разрослись',
        variant31: 'Полосатый рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая волна',
        variant34: 'Полосатая прыть', variant35: 'Полосатая выносливость'
    },
    enem4: {
        variant1: 'Усатый удар', variant2: 'Ус-хлыст', variant3: 'Усатая сила',
        variant4: 'Илистая кожа', variant5: 'Тяжёлый навал', variant6: 'Донный ил',
        variant7: 'Усатая мощь', variant8: 'Прочная илистая кожа', variant9: 'Тяжёлая широкая донная волна',
        variant10: 'Живучий Усач', variant11: 'Цепкий ус', variant12: 'Навал и в тину',
        variant13: 'Толстая кожа', variant14: 'Неутомимый Усач', variant15: 'Пружинистый ус',
        variant16: 'Ус-хлыст вмиг', variant17: 'Усатая хватка', variant18: 'Донный взгляд',
        variant19: 'Тяжёлый навал мгновенно', variant20: 'Донный дух', variant21: 'Илистая кожа стойка',
        variant22: 'Юркий вопреки размеру', variant23: 'Усатая стойкость', variant24: 'Чуткий ус',
        variant25: 'Ускользающий в тину', variant26: 'Дикий навал', variant27: 'Мощь ила',
        variant28: 'Донная волна внезапно', variant29: 'Каменная кожа', variant30: 'Усы разрослись',
        variant31: 'Усатый рывок', variant32: 'Живучая кожа', variant33: 'Неутомимая донная волна',
        variant34: 'Усатая прыть', variant35: 'Усатая выносливость'
    },
    enem5: {
        variant1: 'Зубастый удар', variant2: 'Ряд зубов', variant3: 'Зубастая сила',
        variant4: 'Пятнистая защита', variant5: 'Хищный рывок', variant6: 'Хищная слюна',
        variant7: 'Зубастая мощь', variant8: 'Пятнистая чешуя', variant9: 'Засада и хищный рывок',
        variant10: 'Живучий Зубарь', variant11: 'Цепкий ряд зубов', variant12: 'Рывок и в глубину',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Зубарь', variant15: 'Хищный рывок пружинит',
        variant16: 'Меткий зуб', variant17: 'Зубастая хватка', variant18: 'Хищный неподвижный взгляд',
        variant19: 'Хищный рывок вмиг', variant20: 'Хищный дух', variant21: 'Пятнистая чешуя стойка',
        variant22: 'Юркий Зубарь', variant23: 'Зубастая стойкость', variant24: 'Чуткий ряд зубов',
        variant25: 'Ускользающий хищный рывок', variant26: 'Дикая засада', variant27: 'Мощь слюны',
        variant28: 'Рывок после засады внезапно', variant29: 'Каменная чешуя', variant30: 'Засада разрослась',
        variant31: 'Зубастый рывок', variant32: 'Живучая пятнистая чешуя', variant33: 'Неутомимая засада',
        variant34: 'Зубастая прыть', variant35: 'Зубастая выносливость'
    }
};
