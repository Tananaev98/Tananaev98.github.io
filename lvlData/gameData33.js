let lvlNumber = 33;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 33 — «Новгородские сети», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом (рыбы поданы
// как гуманоиды, как и весь остальной бестиарий игры). Большинство боссов — 'wave'
// с разным почерком: Юркач дёргано мечется мелкими волнами, Сетевик колышется как
// поплавок на течении, Ладейник качается плавно и величаво (финал). Ершак —
// единственный не-wave: колючий ёрш идёт классическим тугим 'weave' — резкая,
// но геометрически иная волна, чтобы не сливаться с соседями. Струнобой — lateRush:
// гусляр после долгого перебора струн внезапно срывается в рывок.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.89, damageMultiplier: 2.08, minWaveDelay: 2080, minShotDelay: 146, minTelegraphMs: 535,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.15, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.30, cadence: 0.83, speed: 1.14, damage: 1.17, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.68, speed: 1.26, damage: 1.30, telegraphMultiplier: 0.81, surpriseChance: 0.38, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { movementStyle: 'wave',     cadence: 1.02, telegraphMs: 850, speedMultiplier: 0.97, damageMultiplier: 0.88, speedVariance: [0.85, 0.94, 1.03, 1.12, 1.21] }, // Юркач: мелкая дёрганая волна
		enem2: { movementStyle: 'weave',    cadence: 0.95, telegraphMs: 780, speedMultiplier: 1.03, damageMultiplier: 0.96, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Ершак: классический тугой weave, единственный не-wave
		enem3: { movementStyle: 'wave',     cadence: 1.08, telegraphMs: 920, speedMultiplier: 0.88, damageMultiplier: 1.12, speedVariance: [0.79, 0.89, 1.00, 1.11, 1.22] }, // Сетевик: поплавковая волна на течении
		enem4: { movementStyle: 'lateRush', cadence: 0.95, telegraphMs: 820, speedMultiplier: 0.90, damageMultiplier: 1.05, speedVariance: [0.82, 0.92, 1.03, 1.14, 1.25] }, // Струнобой: перебор струн → внезапный рывок
		enem5: { movementStyle: 'wave',     cadence: 0.85, telegraphMs: 700, speedMultiplier: 1.08, damageMultiplier: 1.10, speedVariance: [0.84, 0.94, 1.05, 1.16, 1.27] }  // Ладейник: плавная величавая волна, финал
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl33/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl33/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl33/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl33/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl33/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Юркач', image: 'images/enemies/regions/4_rech_ozer/lvl33/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 270, xPos: 50, size: '23%',
		deathAnimation: { preset: 'scaleFlicker', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Ершак', image: 'images/enemies/regions/4_rech_ozer/lvl33/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 410, xPos: 50, size: '24%',
		deathAnimation: { preset: 'spineWither', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Сетевик', image: 'images/enemies/regions/4_rech_ozer/lvl33/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 530, xPos: 50, size: '26%',
		deathAnimation: { preset: 'netTangle', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Струнобой', image: 'images/enemies/regions/4_rech_ozer/lvl33/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 670, xPos: 50, size: '27%',
		deathAnimation: { preset: 'stringSnap', durationMs: 1350 }
	},
	enem5: {
		name: 'enem5', dispName: 'Ладейник', image: 'images/enemies/regions/4_rech_ozer/lvl33/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'hullSink', durationMs: 1550 }
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
	// ===== Юркач: 'wave', мелкая дёрганая волна =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8,  waveAmplitude: 6,  waveFrequency: 1.8 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 33, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 7,  waveFrequency: 1.6 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 24, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 5,  waveFrequency: 2.1 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 23, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 6,  waveFrequency: 1.9 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 8,  waveFrequency: 1.4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16, waveAmplitude: 7,  waveFrequency: 1.5 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 18, waveAmplitude: 5,  waveFrequency: 2.3 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 19, waveAmplitude: 6,  waveFrequency: 2.2 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 21, waveAmplitude: 4,  waveFrequency: 2.6 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 22, waveAmplitude: 5,  waveFrequency: 2.5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.1 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.2 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 5,  waveAmplitude: 8,  waveFrequency: 1.0 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 17, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14, waveAmplitude: 6,  waveFrequency: 1.7 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 16, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14, waveAmplitude: 7,  waveFrequency: 1.6 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 23, waveAmplitude: 5,  waveFrequency: 2.4 }   //15 нежданчик

	,
	// ===== Ершак: тугой классический weave — колючий, резкий =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 22, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 21, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 45, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 21 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 14, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 22 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25 } //15 нежданчик

	,
	// ===== Сетевик: 'wave', поплавковая волна на течении =====
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 8,  waveFrequency: 0.8 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 41, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 9,  waveFrequency: 0.7 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 1.0 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 29, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 0.9 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 16, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.2 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 15, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.1 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 18, waveAmplitude: 5,  waveFrequency: 1.5 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 19, waveAmplitude: 6,  waveFrequency: 1.4 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.6 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.6 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 11, waveAmplitude: 7,  waveFrequency: 0.9 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 11, waveAmplitude: 8,  waveFrequency: 0.8 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4,  waveAmplitude: 10, waveFrequency: 0.5 }, //12 самая широкая волна
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4,  waveAmplitude: 9,  waveFrequency: 0.6 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7,  waveAmplitude: 6,  waveFrequency: 1.0 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21, waveAmplitude: 6,  waveFrequency: 1.6 }   //15 нежданчик

	,
	// ===== Струнобой: перебор струн → внезапный рывок (lateRush) =====
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 38, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 37, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 24, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 23, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 16, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 15, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 45, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 24 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 26 }  //15 нежданчик — самый резкий срыв

	,
	// ===== Ладейник: 'wave', плавная величавая волна, финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6,  waveAmplitude: 9,  waveFrequency: 0.9 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7,  waveAmplitude: 10, waveFrequency: 0.8 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 1.2 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 17, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11, waveAmplitude: 8,  waveFrequency: 1.1 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17, waveAmplitude: 11, waveFrequency: 0.7 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 18, waveAmplitude: 12, waveFrequency: 0.6 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 22, waveAmplitude: 6,  waveFrequency: 1.5 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23, waveAmplitude: 7,  waveFrequency: 1.4 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 1.0 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 31, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8,  waveAmplitude: 9,  waveFrequency: 0.9 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4,  waveAmplitude: 13, waveFrequency: 0.4 }, //12 самая широкая величавая волна уровня
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 13, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15, waveAmplitude: 9,  waveFrequency: 1.3 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15, waveAmplitude: 10, waveFrequency: 1.2 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25, waveAmplitude: 7,  waveFrequency: 1.8 }   //15 нежданчик
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 230, bossDelayAbDop: 4200 }, // мелкая дёрганая волна, самый быстрый темп
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 5100 }, // тугой колючий weave
	{ boss: 'enem3', bossDelayAb: 340, bossDelayAbDop: 5600 }, // поплавковая волна на течении
	{ boss: 'enem4', bossDelayAb: 400, bossDelayAbDop: 6100 }, // перебор струн, долгая пауза перед рывком
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4600 }, // величавая финальная волна
];

const bossAbilitiesDop = [
	// Юркач
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },

	// Ершак
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 10] },
	{ boss: 'enem2', indexAbilities: [8, 9, 11, 12] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 10] },

	// Сетевик
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [2, 3, 10] },
	{ boss: 'enem3', indexAbilities: [4, 5, 11] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem3', indexAbilities: [0, 1, 12, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [8, 9, 14, 15] },

	// Струнобой
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },

	// Ладейник
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 10, 11] },
	{ boss: 'enem5', indexAbilities: [6, 7, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [10, 11, 13, 14, 15] },
];
