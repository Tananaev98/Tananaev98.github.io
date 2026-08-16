let lvlNumber = 32;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 32 — «Переправа через реку», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую (см. §12) — состав совпадает с идея-документом.
// Почти все боссы уровня — 'wave' с разными per-атака amplitude/frequency
// (движковый механизм из §0.1, введён на уровне 31): Мохогляд качается медленно
// и широко, Вёслыч гребёт равномерными взмахами, Крючень цепляет резкими рывками
// волны, Пагодник завершает плавной властной раскачкой. Зубоплот — единственный
// не-wave (drift): паром идёт направленным сносом поперёк течения, а не колышется.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.90, damageMultiplier: 2.05, minWaveDelay: 2100, minShotDelay: 148, minTelegraphMs: 540,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.15, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.30, cadence: 0.84, speed: 1.13, damage: 1.16, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0.00, cadence: 0.69, speed: 1.25, damage: 1.29, telegraphMultiplier: 0.81, surpriseChance: 0.37, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { movementStyle: 'wave',  cadence: 0.98, telegraphMs: 870, speedMultiplier: 0.94, damageMultiplier: 0.87, speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18] }, // Мохогляд: широкая медленная волна
		enem2: { movementStyle: 'wave',  cadence: 0.92, telegraphMs: 800, speedMultiplier: 1.00, damageMultiplier: 0.94, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Вёслыч: равномерные гребки веслом
		enem3: { movementStyle: 'drift', cadence: 1.10, telegraphMs: 950, speedMultiplier: 0.86, damageMultiplier: 1.14, speedVariance: [0.78, 0.88, 0.99, 1.10, 1.21] }, // Зубоплот: направленный снос поперёк течения
		enem4: { movementStyle: 'wave',  cadence: 1.05, telegraphMs: 760, speedMultiplier: 1.05, damageMultiplier: 1.02, speedVariance: [0.84, 0.94, 1.05, 1.16, 1.27] }, // Крючень: резкие тугие рывки багром
		enem5: { movementStyle: 'wave',  cadence: 0.86, telegraphMs: 710, speedMultiplier: 1.08, damageMultiplier: 1.10, speedVariance: [0.84, 0.94, 1.05, 1.16, 1.27] }  // Пагодник: плавная властная раскачка, финал
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl32/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl32/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl32/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl32/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl32/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Мохогляд', image: 'images/enemies/regions/4_rech_ozer/lvl32/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 260, xPos: 50, size: '25%',
		deathAnimation: { preset: 'mossCrumble', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Вёслыч', image: 'images/enemies/regions/4_rech_ozer/lvl32/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 400, xPos: 50, size: '24%',
		deathAnimation: { preset: 'ragCollapse', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Зубоплот', image: 'images/enemies/regions/4_rech_ozer/lvl32/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 520, xPos: 50, size: '28%',
		deathAnimation: { preset: 'plankBreak', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Крючень', image: 'images/enemies/regions/4_rech_ozer/lvl32/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 660, xPos: 50, size: '27%',
		deathAnimation: { preset: 'armorShatter', durationMs: 1400 }
	},
	enem5: {
		name: 'enem5', dispName: 'Пагодник', image: 'images/enemies/regions/4_rech_ozer/lvl32/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '30%',
		deathAnimation: { preset: 'roofCollapse', durationMs: 1550 }
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
	// ===== Мохогляд: 'wave', широкая медленная раскачка мшистого камня =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 7,  waveFrequency: 0.6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 0.7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8,  waveAmplitude: 6,  waveFrequency: 0.9 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 27, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 9,  waveFrequency: 0.5 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 11, waveAmplitude: 5,  waveFrequency: 1.0 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 17, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 6,  waveFrequency: 0.9 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 7,  waveFrequency: 0.7 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 9,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16, waveAmplitude: 6,  waveFrequency: 0.8 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 18, waveAmplitude: 10, waveFrequency: 0.5 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 19, waveAmplitude: 9,  waveFrequency: 0.6 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 4,  waveAmplitude: 5,  waveFrequency: 0.4 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 47, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4,  waveAmplitude: 11, waveFrequency: 0.4 },  //12 самая широкая волна, честный долгий телеграф
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.1 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.0 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20, waveAmplitude: 8,  waveFrequency: 0.8 }   //15 нежданчик

	,
	// ===== Вёслыч: 'wave', равномерные гребки веслом =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9,  waveAmplitude: 6,  waveFrequency: 1.3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 31, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 1.2 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 22, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13, waveAmplitude: 5,  waveFrequency: 1.5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 21, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14, waveAmplitude: 6,  waveFrequency: 1.4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18, waveAmplitude: 8,  waveFrequency: 1.1 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19, waveAmplitude: 9,  waveFrequency: 1.0 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 22, waveAmplitude: 5,  waveFrequency: 1.7 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23, waveAmplitude: 6,  waveFrequency: 1.6 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 0.9 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.0 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 1.3 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 8,  waveFrequency: 1.2 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.8 },  //12 контраст: медленный центр
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16, waveAmplitude: 9,  waveFrequency: 1.4 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16, waveAmplitude: 8,  waveFrequency: 1.5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24, waveAmplitude: 6,  waveFrequency: 1.8 }   //15 нежданчик

	,
	// ===== Зубоплот: направленный снос поперёк течения (drift) =====
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 33, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 10 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 10 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 19 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 20 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22 }  //15 нежданчик

	,
	// ===== Крючень: 'wave', резкие тугие рывки багром =====
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8,  waveAmplitude: 6,  waveFrequency: 2.2 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9,  waveAmplitude: 7,  waveFrequency: 2.0 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12, waveAmplitude: 5,  waveFrequency: 2.6 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 25, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 13, waveAmplitude: 6,  waveFrequency: 2.4 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 13, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17, waveAmplitude: 8,  waveFrequency: 1.9 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18, waveAmplitude: 9,  waveFrequency: 1.8 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22, waveAmplitude: 5,  waveFrequency: 3.0 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23, waveAmplitude: 6,  waveFrequency: 2.9 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12, waveAmplitude: 7,  waveFrequency: 2.1 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 17, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12, waveAmplitude: 7,  waveFrequency: 2.2 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4,  waveAmplitude: 4,  waveFrequency: 1.4 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4,  waveAmplitude: 4,  waveFrequency: 1.5 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 24, waveAmplitude: 6,  waveFrequency: 3.2 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7,  waveAmplitude: 5,  waveFrequency: 1.7 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7,  waveAmplitude: 5,  waveFrequency: 1.8 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 26, waveAmplitude: 7,  waveFrequency: 3.1 }   //15 нежданчик — самый резкий рывок

	,
	// ===== Пагодник: 'wave', плавная властная раскачка, финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 1.0 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 29, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8,  waveAmplitude: 9,  waveFrequency: 0.9 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 20, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11, waveAmplitude: 6,  waveFrequency: 1.3 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 19, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12, waveAmplitude: 7,  waveFrequency: 1.2 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 18, waveAmplitude: 10, waveFrequency: 0.8 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 19, waveAmplitude: 11, waveFrequency: 0.7 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23, waveAmplitude: 6,  waveFrequency: 1.6 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24, waveAmplitude: 7,  waveFrequency: 1.5 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.6 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.6 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9,  waveAmplitude: 7,  waveFrequency: 1.1 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 1.0 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4,  waveAmplitude: 12, waveFrequency: 0.5 }, //12 самая широкая властная волна уровня
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15, waveAmplitude: 8,  waveFrequency: 1.4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15, waveAmplitude: 9,  waveFrequency: 1.3 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25, waveAmplitude: 7,  waveFrequency: 1.9 }   //15 нежданчик
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 360, bossDelayAbDop: 5900 }, // широкая медленная волна
	{ boss: 'enem2', bossDelayAb: 270, bossDelayAbDop: 4700 }, // равномерные гребки
	{ boss: 'enem3', bossDelayAb: 400, bossDelayAbDop: 6200 }, // тяжёлый направленный снос
	{ boss: 'enem4', bossDelayAb: 240, bossDelayAbDop: 4300 }, // резкие тугие рывки багром
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4600 }, // властная финальная волна
];

const bossAbilitiesDop = [
	// Мохогляд
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },

	// Вёслыч
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0, 1] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },

	// Зубоплот
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 12] },
	{ boss: 'enem3', indexAbilities: [6, 7, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem3', indexAbilities: [0, 1, 10, 11] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [8, 9, 14, 15] },

	// Крючень
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },

	// Пагодник
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 10, 11] },
	{ boss: 'enem5', indexAbilities: [6, 7, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [10, 11, 13, 14, 15] },
];
