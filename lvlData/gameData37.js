let lvlNumber = 37;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 37 — «Гроза над рекой», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом. 'wave' у четырёх:
// Клешнач боком перебирает тугой волной, Долгонос дёргано мечется у кромки воды,
// Громонос клубится тяжёлой раскатистой волной, Фонарник (финал) качается на волнах
// как настоящий бакен. Треснодуб — единственный не-wave (pause): дерево замирает
// в трещине от разряда, а затем срывается — честная пауза-разрядка вместо колебания.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.85, damageMultiplier: 2.20, minWaveDelay: 2000, minShotDelay: 138, minTelegraphMs: 515,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.80, speed: 1.16, damage: 1.19, telegraphMultiplier: 0.87, surpriseChance: 0.30, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0.00, cadence: 0.65, speed: 1.29, damage: 1.33, telegraphMultiplier: 0.78, surpriseChance: 0.41, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: { movementStyle: 'wave',  cadence: 1.02, telegraphMs: 830, speedMultiplier: 0.98, damageMultiplier: 0.90, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Клешнач: тугая боковая волна
		enem2: { movementStyle: 'wave',  cadence: 1.08, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 0.92, speedVariance: [0.84, 0.95, 1.06, 1.17, 1.28] }, // Долгонос: дёрганая волна у кромки воды
		enem3: { movementStyle: 'wave',  cadence: 0.90, telegraphMs: 960, speedMultiplier: 0.86, damageMultiplier: 1.14, speedVariance: [0.78, 0.88, 0.99, 1.10, 1.21] }, // Громонос: тяжёлая раскатистая волна
		enem4: { movementStyle: 'pause', cadence: 0.88, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 1.08, speedVariance: [0.83, 0.95, 1.08, 1.21, 1.34], minFastSideSwitchMs: 780 }, // Треснодуб: пауза-разрядка в трещине
		enem5: { movementStyle: 'wave',  cadence: 0.82, telegraphMs: 690, speedMultiplier: 1.10, damageMultiplier: 1.10, speedVariance: [0.85, 0.98, 1.11, 1.24, 1.37] }  // Фонарник: бакен качается на волнах, финал
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl37/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl37/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl37/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl37/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl37/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Клешнач', image: 'images/enemies/regions/4_rech_ozer/lvl37/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 310, xPos: 50, size: '25%',
		deathAnimation: { preset: 'clawCrack', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Долгонос', image: 'images/enemies/regions/4_rech_ozer/lvl37/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 450, xPos: 50, size: '23%',
		deathAnimation: { preset: 'featherScatter', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Громонос', image: 'images/enemies/regions/4_rech_ozer/lvl37/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 570, xPos: 50, size: '28%',
		deathAnimation: { preset: 'smokeDisperse', durationMs: 1450 }
	},
	enem4: {
		name: 'enem4', dispName: 'Треснодуб', image: 'images/enemies/regions/4_rech_ozer/lvl37/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 710, xPos: 50, size: '28%',
		deathAnimation: { preset: 'trunkSplit', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Фонарник', image: 'images/enemies/regions/4_rech_ozer/lvl37/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'lanternSnuff', durationMs: 1550 }
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
	// ===== Клешнач: 'wave', тугая боковая волна =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 1.5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 33, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 1.3 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 24, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 6,  waveFrequency: 1.8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 23, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 7,  waveFrequency: 1.7 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 12, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 5,  waveFrequency: 2.1 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16, waveAmplitude: 6,  waveFrequency: 2.0 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20, waveAmplitude: 5,  waveFrequency: 2.4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 21, waveAmplitude: 6,  waveFrequency: 2.3 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.9 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 1.0 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.6 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.5 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4,  waveAmplitude: 9,  waveFrequency: 0.8 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14, waveAmplitude: 6,  waveFrequency: 1.7 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14, waveAmplitude: 7,  waveFrequency: 1.6 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 22, waveAmplitude: 5,  waveFrequency: 2.5 }   //15 нежданчик

	,
	// ===== Долгонос: 'wave', дёрганая волна у кромки воды =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 30, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 6,  waveFrequency: 2.2 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12, waveAmplitude: 7,  waveFrequency: 2.0 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15, waveAmplitude: 5,  waveFrequency: 2.6 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 16, waveAmplitude: 6,  waveFrequency: 2.4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20, waveAmplitude: 8,  waveFrequency: 1.8 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 21, waveAmplitude: 9,  waveFrequency: 1.7 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24, waveAmplitude: 5,  waveFrequency: 3.0 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25, waveAmplitude: 6,  waveFrequency: 2.9 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.3 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.4 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 2.1 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 8,  waveFrequency: 2.0 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 1.0 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18, waveAmplitude: 9,  waveFrequency: 1.9 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 14, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18, waveAmplitude: 8,  waveFrequency: 2.0 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 26, waveAmplitude: 6,  waveFrequency: 2.8 }   //15 нежданчик

	,
	// ===== Громонос: 'wave', тяжёлая раскатистая волна =====
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4,  waveAmplitude: 10, waveFrequency: 0.5 }, //0
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4,  waveAmplitude: 11, waveFrequency: 0.4 }, //1
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4,  waveAmplitude: 10, waveFrequency: 0.5 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4,  waveAmplitude: 11, waveFrequency: 0.4 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 32, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7,  waveAmplitude: 7,  waveFrequency: 0.8 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 31, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 0.7 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 11, waveAmplitude: 5,  waveFrequency: 1.1 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 17, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 11, waveAmplitude: 6,  waveFrequency: 1.0 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 9,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17, waveAmplitude: 6,  waveFrequency: 1.3 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18, waveAmplitude: 7,  waveFrequency: 1.2 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 20, waveAmplitude: 5,  waveFrequency: 1.5 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21, waveAmplitude: 6,  waveFrequency: 1.4 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3,  waveAmplitude: 13, waveFrequency: 0.35 }, //12 самая тяжёлая и широкая волна уровня
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3,  waveAmplitude: 12, waveFrequency: 0.4 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 0.9 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22, waveAmplitude: 6,  waveFrequency: 1.6 }  //15 нежданчик

	,
	// ===== Треснодуб: пауза-разрядка в трещине (pause) =====
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 27, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 26, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 24 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 17, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 25 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 26 }  //15 нежданчик

	,
	// ===== Фонарник: 'wave', бакен качается на волнах, финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7,  waveAmplitude: 9,  waveFrequency: 0.9 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 29, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8,  waveAmplitude: 10, waveFrequency: 0.8 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 1.3 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 19, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12, waveAmplitude: 8,  waveFrequency: 1.2 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 18, waveAmplitude: 6,  waveFrequency: 1.8 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 19, waveAmplitude: 7,  waveFrequency: 1.7 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23, waveAmplitude: 5,  waveFrequency: 2.2 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24, waveAmplitude: 6,  waveFrequency: 2.1 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.6 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.6 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 1.1 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 31, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9,  waveAmplitude: 9,  waveFrequency: 1.0 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4,  waveAmplitude: 13, waveFrequency: 0.4 }, //12 самое широкое покачивание бакена
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 13, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16, waveAmplitude: 8,  waveFrequency: 1.4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16, waveAmplitude: 9,  waveFrequency: 1.3 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25, waveAmplitude: 6,  waveFrequency: 2.3 }   //15 нежданчик
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 280, bossDelayAbDop: 4700 }, // тугая боковая волна
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4000 }, // дёрганая волна у кромки воды
	{ boss: 'enem3', bossDelayAb: 420, bossDelayAbDop: 6500 }, // тяжёлая раскатистая волна, долгая пауза
	{ boss: 'enem4', bossDelayAb: 440, bossDelayAbDop: 6800 }, // пауза-разрядка в трещине, самая долгая на уровне
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4500 }, // бакен качается на волнах, финал
];

const bossAbilitiesDop = [
	// Клешнач
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },

	// Долгонос
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0, 1] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },

	// Громонос
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 12] },
	{ boss: 'enem3', indexAbilities: [6, 7, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem3', indexAbilities: [0, 1, 10, 11] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [8, 9, 14, 15] },

	// Треснодуб
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },

	// Фонарник
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 10, 11] },
	{ boss: 'enem5', indexAbilities: [6, 7, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [10, 11, 13, 14, 15] },
];

// Лорные названия связок. Уровень 37 — прибрежная нежить: Клешнач (рак), Долгонос
// (жук-долгоносик), Громонос (грозовой дух), Треснодуб (треснувший дуб), Фонарник
// (буй-фонарь, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Клешнёвый удар', variant2: 'Боковой шаг', variant3: 'Клешнёвая сила',
        variant4: 'Панцирная броня', variant5: 'Боковая волна', variant6: 'Илистая слизь',
        variant7: 'Клешнёвая мощь', variant8: 'Плотный панцирь', variant9: 'Тесная боковая волна',
        variant10: 'Живучий Клешнач', variant11: 'Цепкая клешня', variant12: 'Волна вбок и в ил',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый Клешнач', variant15: 'Клешня пружинит',
        variant16: 'Меткий щипок', variant17: 'Клешнёвая хватка', variant18: 'Немигающий взгляд',
        variant19: 'Боковая волна вмиг', variant20: 'Прибрежный дух', variant21: 'Панцирь стойкий',
        variant22: 'Юркий Клешнач', variant23: 'Клешнёвая стойкость', variant24: 'Чуткая клешня',
        variant25: 'Ускользающий бок', variant26: 'Дикая боковая волна', variant27: 'Мощь слизи',
        variant28: 'Боковая волна внезапно', variant29: 'Каменный панцирь', variant30: 'Клешня разрослась',
        variant31: 'Клешнёвый рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимая боковая волна',
        variant34: 'Клешнёвая прыть', variant35: 'Клешнёвая выносливость'
    },
    enem2: {
        variant1: 'Клювенный удар', variant2: 'Дрожащий шаг', variant3: 'Клювенная сила',
        variant4: 'Жёсткое перо', variant5: 'Дёрганая волна', variant6: 'Прибрежный пух',
        variant7: 'Клювенная мощь', variant8: 'Плотное перо', variant9: 'Мелкая дёрганая волна',
        variant10: 'Живучий Долгонос', variant11: 'Цепкий клюв', variant12: 'Дёрганая волна и в ил',
        variant13: 'Толстое перо', variant14: 'Неутомимый Долгонос', variant15: 'Клюв пружинит',
        variant16: 'Меткий прокол', variant17: 'Клювенная хватка', variant18: 'Косой взгляд',
        variant19: 'Дёрганая волна вмиг', variant20: 'Береговой дух', variant21: 'Перо стойкое',
        variant22: 'Юркий Долгонос', variant23: 'Клювенная стойкость', variant24: 'Чуткий клюв',
        variant25: 'Ускользающая дрожь', variant26: 'Дикая дёрганая волна', variant27: 'Мощь пуха',
        variant28: 'Дёрганая волна внезапно', variant29: 'Каменное перо', variant30: 'Клюв удлинился',
        variant31: 'Клювенный рывок', variant32: 'Живучее перо', variant33: 'Неутомимая дёрганая волна',
        variant34: 'Клювенная прыть', variant35: 'Клювенная выносливость'
    },
    enem3: {
        variant1: 'Громовой удар', variant2: 'Тяжёлый шаг', variant3: 'Громовая сила',
        variant4: 'Дождевая шкура', variant5: 'Раскатистая волна', variant6: 'Грозовая изморось',
        variant7: 'Громовая мощь', variant8: 'Плотная дождевая шкура', variant9: 'Широкая раскатистая волна',
        variant10: 'Живучий Громонос', variant11: 'Цепкий удар грома', variant12: 'Раскат и в глубину',
        variant13: 'Толстая шкура', variant14: 'Неутомимый Громонос', variant15: 'Удар грома пружинит',
        variant16: 'Меткий разряд', variant17: 'Громовая хватка', variant18: 'Грозовой взгляд',
        variant19: 'Раскатистая волна вмиг', variant20: 'Грозовой дух', variant21: 'Дождевая шкура стойкая',
        variant22: 'Юркий вопреки грому', variant23: 'Громовая стойкость', variant24: 'Чуткий удар грома',
        variant25: 'Ускользающий раскат', variant26: 'Дикая гроза', variant27: 'Мощь изморози',
        variant28: 'Раскатистая волна внезапно', variant29: 'Каменная шкура', variant30: 'Раскат разросся',
        variant31: 'Громовой рывок', variant32: 'Живучая дождевая шкура', variant33: 'Неутомимая раскатистая волна',
        variant34: 'Громовая прыть', variant35: 'Громовая выносливость'
    },
    enem4: {
        variant1: 'Дубовый удар', variant2: 'Треск коры', variant3: 'Дубовая сила',
        variant4: 'Толстая кора', variant5: 'Пауза и рывок', variant6: 'Смолистая труха',
        variant7: 'Дубовая мощь', variant8: 'Крепкая кора', variant9: 'Короткая пауза перед рывком',
        variant10: 'Живучий Треснодуб', variant11: 'Цепкий сук', variant12: 'Рывок и в трещину',
        variant13: 'Толстая кора вдвойне', variant14: 'Неутомимый Треснодуб', variant15: 'Сук пружинит',
        variant16: 'Меткая щепка', variant17: 'Дубовая хватка', variant18: 'Немигающий взгляд коры',
        variant19: 'Пауза и рывок мгновенно', variant20: 'Лесной дух', variant21: 'Кора держит',
        variant22: 'Юркий вопреки трещине', variant23: 'Дубовая стойкость', variant24: 'Чуткая трещина',
        variant25: 'Ускользающая пауза', variant26: 'Дикий рывок из трещины', variant27: 'Мощь смолы',
        variant28: 'Рывок из трещины внезапно', variant29: 'Каменная кора', variant30: 'Трещина разрослась',
        variant31: 'Дубовый рывок', variant32: 'Живучая кора', variant33: 'Неутомимая пауза перед рывком',
        variant34: 'Дубовая прыть', variant35: 'Дубовая выносливость'
    },
    enem5: {
        variant1: 'Фонарный удар', variant2: 'Раскачка на волне', variant3: 'Фонарная сила',
        variant4: 'Просмолённый бок', variant5: 'Плавная качка', variant6: 'Болотный чад',
        variant7: 'Фонарная мощь', variant8: 'Плотный просмолённый бок', variant9: 'Широкая плавная качка',
        variant10: 'Живучий Фонарник', variant11: 'Цепкий крюк-подвес', variant12: 'Качка и в туман',
        variant13: 'Толстая просмолённая обшивка', variant14: 'Неутомимый Фонарник', variant15: 'Подвес пружинит',
        variant16: 'Меткий блик', variant17: 'Фонарная хватка', variant18: 'Немигающий свет',
        variant19: 'Плавная качка вмиг', variant20: 'Болотный дух', variant21: 'Обшивка держит',
        variant22: 'Юркий вопреки весу', variant23: 'Фонарная стойкость', variant24: 'Чуткий блик',
        variant25: 'Ускользающий свет', variant26: 'Дикая качка', variant27: 'Мощь чада',
        variant28: 'Плавная качка внезапно', variant29: 'Каменная обшивка', variant30: 'Свет разросся',
        variant31: 'Фонарный рывок', variant32: 'Живучая обшивка', variant33: 'Неутомимая качка',
        variant34: 'Фонарная прыть', variant35: 'Фонарная выносливость'
    }
};
