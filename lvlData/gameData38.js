let lvlNumber = 38;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 38 — «Сокровища речного дна», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом. 'wave' у четырёх:
// Жемчужник качается вязкой донной волной, Чекан крутится и виляет мелкой быстрой
// волной как монета на ребре, Осетрыч (финал) идёт мощной синусоидой матёрой рыбы.
// Скрыня — единственный не-wave (lateRush): тяжёлый сундук не колеблется, а
// перекатывается-переваливается резким рывком. Глубинник — 'wave' тоже (пловец
// гребёт волнообразно), но с самой резкой короткой амплитудой уровня.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.84, damageMultiplier: 2.23, minWaveDelay: 1980, minShotDelay: 136, minTelegraphMs: 510,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.79, speed: 1.17, damage: 1.20, telegraphMultiplier: 0.86, surpriseChance: 0.30, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0.00, cadence: 0.64, speed: 1.30, damage: 1.34, telegraphMultiplier: 0.77, surpriseChance: 0.42, maxActiveAttacks: 25 }
	],
	bosses: {
		enem1: { movementStyle: 'wave',     cadence: 0.98, telegraphMs: 900, speedMultiplier: 0.88, damageMultiplier: 0.92, speedVariance: [0.80, 0.90, 1.01, 1.12, 1.23] }, // Жемчужник: вязкая донная волна
		enem2: { movementStyle: 'wave',     cadence: 1.10, telegraphMs: 770, speedMultiplier: 1.06, damageMultiplier: 0.94, speedVariance: [0.85, 0.96, 1.07, 1.18, 1.29] }, // Чекан: мелкая быстрая волна монеты на ребре
		enem3: { movementStyle: 'wave',     cadence: 1.00, telegraphMs: 820, speedMultiplier: 1.00, damageMultiplier: 1.00, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Глубинник: короткая резкая волна гребка
		enem4: { movementStyle: 'lateRush', cadence: 0.90, telegraphMs: 970, speedMultiplier: 0.82, damageMultiplier: 1.18, speedVariance: [0.75, 0.85, 0.96, 1.07, 1.18] }, // Скрыня: тяжёлый перекат-рывок
		enem5: { movementStyle: 'wave',     cadence: 0.80, telegraphMs: 680, speedMultiplier: 1.12, damageMultiplier: 1.08, speedVariance: [0.85, 0.99, 1.13, 1.27, 1.41] }  // Осетрыч: мощная синусоида матёрой рыбы, финал
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl38/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl38/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl38/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl38/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl38/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Жемчужник', image: 'images/enemies/regions/4_rech_ozer/lvl38/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 320, xPos: 50, size: '24%',
		deathAnimation: { preset: 'shellSplit', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Чекан', image: 'images/enemies/regions/4_rech_ozer/lvl38/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 460, xPos: 50, size: '23%',
		deathAnimation: { preset: 'coinSpinFade', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Глубинник', image: 'images/enemies/regions/4_rech_ozer/lvl38/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 580, xPos: 50, size: '26%',
		deathAnimation: { preset: 'ragSink', durationMs: 1350 }
	},
	enem4: {
		name: 'enem4', dispName: 'Скрыня', image: 'images/enemies/regions/4_rech_ozer/lvl38/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 720, xPos: 50, size: '27%',
		deathAnimation: { preset: 'lidBurst', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Осетрыч', image: 'images/enemies/regions/4_rech_ozer/lvl38/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '30%',
		deathAnimation: { preset: 'plateShedSink', durationMs: 1600 }
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
	// ===== Жемчужник: 'wave', вязкая донная волна =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 40, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 8,  waveFrequency: 0.6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 39, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 9,  waveFrequency: 0.5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 0.8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 27, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 0.7 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 15, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.1 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14, waveAmplitude: 7,  waveFrequency: 1.0 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 18, waveAmplitude: 5,  waveFrequency: 1.4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 19, waveAmplitude: 6,  waveFrequency: 1.3 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.5 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 11, waveAmplitude: 7,  waveFrequency: 0.9 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 11, waveAmplitude: 8,  waveFrequency: 0.8 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4,  waveAmplitude: 11, waveFrequency: 0.4 }, //12 самая широкая волна уровня
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 15, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 6,  waveFrequency: 1.0 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 7,  waveFrequency: 0.9 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 1.5 }   //15 нежданчик

	,
	// ===== Чекан: 'wave', мелкая быстрая волна монеты на ребре =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 24, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12, waveAmplitude: 5,  waveFrequency: 2.6 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 23, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13, waveAmplitude: 6,  waveFrequency: 2.4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 14, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 16, waveAmplitude: 4,  waveFrequency: 3.0 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 13, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 17, waveAmplitude: 5,  waveFrequency: 2.8 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20, waveAmplitude: 7,  waveFrequency: 2.1 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 21, waveAmplitude: 8,  waveFrequency: 2.0 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24, waveAmplitude: 4,  waveFrequency: 3.2 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25, waveAmplitude: 5,  waveFrequency: 3.1 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.5 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 6,  waveFrequency: 2.3 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 31, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 2.2 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 1.1 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18, waveAmplitude: 8,  waveFrequency: 2.5 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18, waveAmplitude: 7,  waveFrequency: 2.6 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 26, waveAmplitude: 5,  waveFrequency: 3.3 }   //15 нежданчик — самая быстрая волна уровня

	,
	// ===== Глубинник: 'wave', короткая резкая волна гребка =====
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9,  waveAmplitude: 6,  waveFrequency: 1.7 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 33, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 1.5 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 22, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 5,  waveFrequency: 2.0 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 21, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.9 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16, waveAmplitude: 8,  waveFrequency: 1.3 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17, waveAmplitude: 9,  waveFrequency: 1.2 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 20, waveAmplitude: 5,  waveFrequency: 2.3 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21, waveAmplitude: 6,  waveFrequency: 2.2 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.0 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.1 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14, waveAmplitude: 6,  waveFrequency: 1.8 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14, waveAmplitude: 7,  waveFrequency: 1.7 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5,  waveAmplitude: 8,  waveFrequency: 0.9 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15, waveAmplitude: 6,  waveFrequency: 1.9 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15, waveAmplitude: 7,  waveFrequency: 1.8 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22, waveAmplitude: 5,  waveFrequency: 2.4 }   //15 нежданчик

	,
	// ===== Скрыня: тяжёлый перекат-рывок (lateRush) =====
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 3 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 3 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 33, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 10 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 19, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 10 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 19 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 20 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22 }  //15 нежданчик

	,
	// ===== Осетрыч: 'wave', мощная синусоида матёрой рыбы, финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8,  waveAmplitude: 10, waveFrequency: 1.1 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 29, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9,  waveAmplitude: 11, waveFrequency: 1.0 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 19, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12, waveAmplitude: 8,  waveFrequency: 1.5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 13, waveAmplitude: 9,  waveFrequency: 1.4 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 19, waveAmplitude: 6,  waveFrequency: 2.1 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20, waveAmplitude: 7,  waveFrequency: 2.0 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24, waveAmplitude: 5,  waveFrequency: 2.6 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25, waveAmplitude: 6,  waveFrequency: 2.5 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6,  waveAmplitude: 6,  waveFrequency: 0.7 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6,  waveAmplitude: 6,  waveFrequency: 0.7 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10, waveAmplitude: 9,  waveFrequency: 1.3 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 31, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10, waveAmplitude: 10, waveFrequency: 1.2 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5,  waveAmplitude: 14, waveFrequency: 0.5 }, //12 самая мощная широкая синусоида уровня
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17, waveAmplitude: 8,  waveFrequency: 1.8 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17, waveAmplitude: 9,  waveFrequency: 1.7 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26, waveAmplitude: 6,  waveFrequency: 2.8 }   //15 нежданчик
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 380, bossDelayAbDop: 6100 }, // вязкая донная волна
	{ boss: 'enem2', bossDelayAb: 200, bossDelayAbDop: 3900 }, // мелкая быстрая волна, самый быстрый темп уровня
	{ boss: 'enem3', bossDelayAb: 260, bossDelayAbDop: 4500 }, // короткая резкая волна гребка
	{ boss: 'enem4', bossDelayAb: 430, bossDelayAbDop: 6600 }, // тяжёлый перекат-рывок, долгая пауза
	{ boss: 'enem5', bossDelayAb: 240, bossDelayAbDop: 4300 }, // мощная финальная синусоида
];

const bossAbilitiesDop = [
	// Жемчужник
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },

	// Чекан
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0, 1] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },

	// Глубинник
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [2, 3, 10] },
	{ boss: 'enem3', indexAbilities: [4, 5, 11] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem3', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },

	// Скрыня
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 12] },
	{ boss: 'enem4', indexAbilities: [6, 7, 13] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [0, 1, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [8, 9, 14, 15] },

	// Осетрыч
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 10, 11] },
	{ boss: 'enem5', indexAbilities: [6, 7, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [10, 11, 13, 14, 15] },
];

// Лорные названия связок. Уровень 38 — глубинная стража: Жемчужник (моллюск),
// Чекан (мелкая монетная нежить), Глубинник (донный житель), Скрыня (сундук),
// Осетрыч (осётр, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Жемчужный удар', variant2: 'Вязкий шаг', variant3: 'Жемчужная сила',
        variant4: 'Куполообразный панцирь', variant5: 'Донная тягучая волна', variant6: 'Илистая слизь',
        variant7: 'Жемчужная мощь', variant8: 'Плотный панцирь', variant9: 'Густая донная волна',
        variant10: 'Живучий Жемчужник', variant11: 'Цепкая лапа', variant12: 'Волна и в глубокий ил',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый Жемчужник', variant15: 'Лапа пружинит',
        variant16: 'Меткий укол', variant17: 'Жемчужная хватка', variant18: 'Немигающий взгляд из ила',
        variant19: 'Донная волна вмиг', variant20: 'Донный дух', variant21: 'Панцирь стойкий',
        variant22: 'Юркий вопреки тяжести', variant23: 'Жемчужная стойкость', variant24: 'Чуткая лапа',
        variant25: 'Ускользающая тягучая волна', variant26: 'Дикая вязкая волна', variant27: 'Мощь ила',
        variant28: 'Донная волна внезапно', variant29: 'Каменный панцирь', variant30: 'Жемчуг разросся',
        variant31: 'Жемчужный рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимая донная волна',
        variant34: 'Жемчужная прыть', variant35: 'Жемчужная выносливость'
    },
    enem2: {
        variant1: 'Чеканный удар', variant2: 'Быстрый край', variant3: 'Чеканная сила',
        variant4: 'Медный бок', variant5: 'Краевая волна', variant6: 'Ржавая пыль',
        variant7: 'Чеканная мощь', variant8: 'Плотный медный бок', variant9: 'Мелкая быстрая краевая волна',
        variant10: 'Живучий Чекан', variant11: 'Цепкий острый край', variant12: 'Краевая волна и вглубь',
        variant13: 'Толстый медный бок', variant14: 'Неутомимый Чекан', variant15: 'Острый край пружинит',
        variant16: 'Меткий чекан', variant17: 'Чеканная хватка', variant18: 'Блеск в глазах',
        variant19: 'Краевая волна вмиг', variant20: 'Кладовый дух', variant21: 'Медь стойкая',
        variant22: 'Юркий Чекан', variant23: 'Чеканная стойкость', variant24: 'Чуткий острый край',
        variant25: 'Ускользающий чекан', variant26: 'Дикая краевая волна', variant27: 'Мощь ржавчины',
        variant28: 'Краевая волна внезапно', variant29: 'Каменная медь', variant30: 'Чекан разросся',
        variant31: 'Чеканный рывок', variant32: 'Живучая медь', variant33: 'Неутомимая краевая волна',
        variant34: 'Чеканная прыть', variant35: 'Чеканная выносливость'
    },
    enem3: {
        variant1: 'Донный удар', variant2: 'Короткий гребок', variant3: 'Донная сила',
        variant4: 'Тёмная шкура', variant5: 'Резкая волна', variant6: 'Придонная муть',
        variant7: 'Донная мощь', variant8: 'Плотная тёмная шкура', variant9: 'Короткая резкая волна',
        variant10: 'Живучий Глубинник', variant11: 'Цепкий гребок', variant12: 'Резкая волна и в муть',
        variant13: 'Толстая шкура', variant14: 'Неутомимый Глубинник', variant15: 'Гребок пружинит',
        variant16: 'Меткий укол из тьмы', variant17: 'Донная хватка', variant18: 'Взгляд из глубины',
        variant19: 'Резкая волна вмиг', variant20: 'Глубинный дух', variant21: 'Шкура стойкая',
        variant22: 'Юркий Глубинник', variant23: 'Донная стойкость', variant24: 'Чуткий гребок',
        variant25: 'Ускользающий в муть', variant26: 'Дикая резкая волна', variant27: 'Мощь мути',
        variant28: 'Резкая волна внезапно', variant29: 'Каменная шкура', variant30: 'Тьма разрослась',
        variant31: 'Донный рывок', variant32: 'Живучая шкура', variant33: 'Неутомимая резкая волна',
        variant34: 'Донная прыть', variant35: 'Донная выносливость'
    },
    enem4: {
        variant1: 'Сундучный удар', variant2: 'Тяжёлый крен', variant3: 'Сундучная сила',
        variant4: 'Кованая крышка', variant5: 'Перекатный рывок', variant6: 'Ржавая труха',
        variant7: 'Сундучная мощь', variant8: 'Плотная кованая крышка', variant9: 'Тяжёлый широкий перекат',
        variant10: 'Живучая Скрыня', variant11: 'Цепкий замок', variant12: 'Перекат и в ил',
        variant13: 'Толстая кованая крышка', variant14: 'Неутомимая Скрыня', variant15: 'Замок пружинит',
        variant16: 'Меткий засов', variant17: 'Сундучная хватка', variant18: 'Немигающий замочный глаз',
        variant19: 'Перекатный рывок мгновенно', variant20: 'Кладовый дух вдвойне', variant21: 'Крышка держит',
        variant22: 'Юркая вопреки весу', variant23: 'Сундучная стойкость', variant24: 'Чуткий замок',
        variant25: 'Ускользающий перекат', variant26: 'Дикий перекатный рывок', variant27: 'Мощь ржавчины вдвойне',
        variant28: 'Перекатный рывок внезапно', variant29: 'Каменная крышка', variant30: 'Замок разросся',
        variant31: 'Сундучный рывок', variant32: 'Живучая крышка', variant33: 'Неутомимый перекат',
        variant34: 'Сундучная прыть', variant35: 'Сундучная выносливость'
    },
    enem5: {
        variant1: 'Осетровый удар', variant2: 'Мощная синусоида', variant3: 'Осетровая сила',
        variant4: 'Костяная броня', variant5: 'Волновой размах', variant6: 'Речная муть',
        variant7: 'Осетровая мощь', variant8: 'Плотная костяная броня', variant9: 'Широкий волновой размах',
        variant10: 'Живучий Осетрыч', variant11: 'Цепкий костяной гребень', variant12: 'Размах и на глубину',
        variant13: 'Толстая костяная броня', variant14: 'Неутомимый Осетрыч', variant15: 'Гребень пружинит',
        variant16: 'Меткий гребень', variant17: 'Осетровая хватка', variant18: 'Царственный взгляд',
        variant19: 'Волновой размах вмиг', variant20: 'Речной царственный дух', variant21: 'Броня стойкая',
        variant22: 'Юркий вопреки мощи', variant23: 'Осетровая стойкость', variant24: 'Чуткий гребень',
        variant25: 'Ускользающий размах', variant26: 'Дикая синусоида', variant27: 'Мощь мути вдвойне',
        variant28: 'Волновой размах внезапно', variant29: 'Каменная броня', variant30: 'Размах разросся',
        variant31: 'Осетровый рывок', variant32: 'Живучая броня', variant33: 'Неутомимая синусоида',
        variant34: 'Осетровая прыть', variant35: 'Осетровая выносливость'
    }
};
