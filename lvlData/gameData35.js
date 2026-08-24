let lvlNumber = 35;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 35 — «Лунный омут», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом. Здесь 'wave'
// у четырёх из пяти: Гребешок бьёт тугой гребенчатой волной, Белоцвет качается
// широко и плавно, Плакальщица свисает длинными печальными взмахами, Огнепёр
// (финал) сияет самой яркой и быстрой волной уровня. Улитень — единственный
// не-wave (drift): улитка ползёт направленным сносом, а не колеблется — тягучий,
// но неотвратимый снос вбок, самый медленный архетип уровня.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.87, damageMultiplier: 2.14, minWaveDelay: 2040, minShotDelay: 142, minTelegraphMs: 525,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.82, speed: 1.15, damage: 1.18, telegraphMultiplier: 0.88, surpriseChance: 0.29, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.67, speed: 1.27, damage: 1.31, telegraphMultiplier: 0.79, surpriseChance: 0.39, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { movementStyle: 'drift', cadence: 1.15, telegraphMs: 990, speedMultiplier: 0.80, damageMultiplier: 0.90, speedVariance: [0.72, 0.83, 0.95, 1.07, 1.19] }, // Улитень: тягучий неотвратимый снос вбок
		enem2: { movementStyle: 'wave',  cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.00, damageMultiplier: 0.98, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Гребешок: тугая гребенчатая волна
		enem3: { movementStyle: 'wave',  cadence: 0.92, telegraphMs: 870, speedMultiplier: 0.92, damageMultiplier: 1.02, speedVariance: [0.82, 0.92, 1.03, 1.14, 1.25] }, // Белоцвет: широкая плавная раскачка
		enem4: { movementStyle: 'wave',  cadence: 0.88, telegraphMs: 900, speedMultiplier: 0.88, damageMultiplier: 1.10, speedVariance: [0.80, 0.90, 1.01, 1.12, 1.23] }, // Плакальщица: длинные печальные взмахи
		enem5: { movementStyle: 'wave',  cadence: 0.83, telegraphMs: 690, speedMultiplier: 1.14, damageMultiplier: 1.05, speedVariance: [0.85, 0.98, 1.11, 1.24, 1.37] }  // Огнепёр: яркая быстрая волна, финал
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl35/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl35/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl35/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl35/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl35/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Улитень', image: 'images/enemies/regions/4_rech_ozer/lvl35/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 290, xPos: 50, size: '24%',
		deathAnimation: { preset: 'shellCrack', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Гребешок', image: 'images/enemies/regions/4_rech_ozer/lvl35/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 430, xPos: 50, size: '25%',
		deathAnimation: { preset: 'crestWither', durationMs: 1200 }
	},
	enem3: {
		name: 'enem3', dispName: 'Белоцвет', image: 'images/enemies/regions/4_rech_ozer/lvl35/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 550, xPos: 50, size: '27%',
		deathAnimation: { preset: 'petalFall', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Плакальщица', image: 'images/enemies/regions/4_rech_ozer/lvl35/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 690, xPos: 50, size: '28%',
		deathAnimation: { preset: 'branchDroop', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Огнепёр', image: 'images/enemies/regions/4_rech_ozer/lvl35/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'scaleGlowFade', durationMs: 1550 }
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
	// ===== Улитень: тягучий неотвратимый снос вбок (drift) =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 3 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 64, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 33, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 10 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 10 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 18 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 19 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 21 }  //15 нежданчик

	,
	// ===== Гребешок: 'wave', тугая гребенчатая волна =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 28, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 6,  waveFrequency: 2.0 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 27, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 1.8 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 18, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14, waveAmplitude: 5,  waveFrequency: 2.4 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 17, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15, waveAmplitude: 6,  waveFrequency: 2.2 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19, waveAmplitude: 8,  waveFrequency: 1.6 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20, waveAmplitude: 9,  waveFrequency: 1.5 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23, waveAmplitude: 5,  waveFrequency: 2.8 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24, waveAmplitude: 6,  waveFrequency: 2.6 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.2 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 2.0 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 8,  waveFrequency: 1.9 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 1.0 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17, waveAmplitude: 9,  waveFrequency: 1.7 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 14, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17, waveAmplitude: 8,  waveFrequency: 1.8 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25, waveAmplitude: 6,  waveFrequency: 2.5 }   //15 нежданчик

	,
	// ===== Белоцвет: 'wave', широкая плавная раскачка =====
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 36, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7,  waveAmplitude: 9,  waveFrequency: 0.8 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 35, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7,  waveAmplitude: 10, waveFrequency: 0.7 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 24, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9,  waveAmplitude: 7,  waveFrequency: 1.0 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 23, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10, waveAmplitude: 8,  waveFrequency: 0.9 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14, waveAmplitude: 11, waveFrequency: 0.6 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15, waveAmplitude: 12, waveFrequency: 0.5 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 1.4 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21, waveAmplitude: 7,  waveFrequency: 1.3 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12, waveAmplitude: 8,  waveFrequency: 0.9 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12, waveAmplitude: 9,  waveFrequency: 0.8 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4,  waveAmplitude: 13, waveFrequency: 0.4 }, //12 самая широкая волна уровня
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 8,  waveFrequency: 1.1 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 9,  waveFrequency: 1.0 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22, waveAmplitude: 6,  waveFrequency: 1.5 }   //15 нежданчик

	,
	// ===== Плакальщица: 'wave', длинные печальные взмахи =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6,  waveAmplitude: 11, waveFrequency: 0.6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6,  waveAmplitude: 12, waveFrequency: 0.5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 0.8 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 19, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9,  waveAmplitude: 9,  waveFrequency: 0.7 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15, waveAmplitude: 13, waveFrequency: 0.4 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16, waveAmplitude: 14, waveFrequency: 0.35 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 21, waveAmplitude: 6,  waveFrequency: 1.3 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22, waveAmplitude: 7,  waveFrequency: 1.2 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 45, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5,  waveAmplitude: 7,  waveFrequency: 0.5 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 45, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5,  waveAmplitude: 7,  waveFrequency: 0.5 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 33, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7,  waveAmplitude: 9,  waveFrequency: 0.8 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7,  waveAmplitude: 10, waveFrequency: 0.7 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 47, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4,  waveAmplitude: 15, waveFrequency: 0.3 }, //12 самая длинная и широкая печальная волна уровня
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13, waveAmplitude: 9,  waveFrequency: 0.9 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13, waveAmplitude: 10, waveFrequency: 0.8 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23, waveAmplitude: 7,  waveFrequency: 1.4 }   //15 нежданчик

	,
	// ===== Огнепёр: 'wave', яркая быстрая волна, финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 1.9 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11, waveAmplitude: 8,  waveFrequency: 1.7 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 14, waveAmplitude: 6,  waveFrequency: 2.3 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 17, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 15, waveAmplitude: 7,  waveFrequency: 2.1 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 19, waveAmplitude: 9,  waveFrequency: 1.5 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20, waveAmplitude: 10, waveFrequency: 1.4 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24, waveAmplitude: 5,  waveFrequency: 2.8 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25, waveAmplitude: 6,  waveFrequency: 2.6 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6,  waveAmplitude: 5,  waveFrequency: 1.1 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6,  waveAmplitude: 5,  waveFrequency: 1.2 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12, waveAmplitude: 8,  waveFrequency: 1.9 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 31, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12, waveAmplitude: 9,  waveFrequency: 1.8 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5,  waveAmplitude: 11, waveFrequency: 0.9 }, //12 контраст: медленная широкая волна
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17, waveAmplitude: 8,  waveFrequency: 2.0 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17, waveAmplitude: 9,  waveFrequency: 1.9 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26, waveAmplitude: 6,  waveFrequency: 3.0 }   //15 нежданчик — самая яркая быстрая волна уровня
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 420, bossDelayAbDop: 6600 }, // тягучий неотвратимый снос, самая долгая пауза
	{ boss: 'enem2', bossDelayAb: 230, bossDelayAbDop: 4200 }, // тугая гребенчатая волна
	{ boss: 'enem3', bossDelayAb: 340, bossDelayAbDop: 5600 }, // широкая плавная раскачка
	{ boss: 'enem4', bossDelayAb: 380, bossDelayAbDop: 6100 }, // длинные печальные взмахи
	{ boss: 'enem5', bossDelayAb: 210, bossDelayAbDop: 4000 }, // яркая быстрая финальная волна
];

const bossAbilitiesDop = [
	// Улитень
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5, 12] },
	{ boss: 'enem1', indexAbilities: [6, 7, 13] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [0, 1, 10, 11] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [8, 9, 14, 15] },

	// Гребешок
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem2', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },

	// Белоцвет
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [4, 5] },
	{ boss: 'enem3', indexAbilities: [2, 3, 10] },
	{ boss: 'enem3', indexAbilities: [8, 9, 11] },
	{ boss: 'enem3', indexAbilities: [0, 1, 4, 5] },
	{ boss: 'enem3', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 12] },

	// Плакальщица
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10] },
	{ boss: 'enem4', indexAbilities: [8, 9, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4, 5] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 12] },

	// Огнепёр
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [6, 7] },
	{ boss: 'enem5', indexAbilities: [2, 3, 10] },
	{ boss: 'enem5', indexAbilities: [4, 5, 11] },
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem5', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15] },
];

// Лорные названия связок. Уровень 35 — заводь: Улитень (улитка), Гребешок (ракушка),
// Белоцвет (кувшинка), Плакальщица (плакучая ива), Огнепёр (огненная жар-птица, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Слизистый удар', variant2: 'Рог улитки', variant3: 'Улиточная сила',
        variant4: 'Ракушечная защита', variant5: 'Тягучий бросок', variant6: 'Едкая слизь',
        variant7: 'Улиточная мощь', variant8: 'Прочная ракушка', variant9: 'Тягучий неотвратимый снос',
        variant10: 'Живучий Улитень', variant11: 'Цепкая слизь', variant12: 'Бросок и под ракушку',
        variant13: 'Толстая ракушка', variant14: 'Неутомимый Улитень', variant15: 'Пружинистые рожки',
        variant16: 'Меткий рожок', variant17: 'Улиточная хватка', variant18: 'Неотвратимый взгляд',
        variant19: 'Тягучий бросок вмиг', variant20: 'Илистый дух', variant21: 'Стойкая ракушка',
        variant22: 'Юркий вопреки медлительности', variant23: 'Улиточная стойкость', variant24: 'Чуткие рожки',
        variant25: 'Ускользающий в ракушку', variant26: 'Дикая слизь', variant27: 'Мощь слизи',
        variant28: 'Неотвратимый снос внезапно', variant29: 'Каменная ракушка', variant30: 'Разросшаяся ракушка',
        variant31: 'Улиточный рывок', variant32: 'Живучая ракушка', variant33: 'Неутомимый снос',
        variant34: 'Улиточная прыть', variant35: 'Улиточная выносливость'
    },
    enem2: {
        variant1: 'Гребенчатый удар', variant2: 'Зубец гребня', variant3: 'Гребенчатая сила',
        variant4: 'Чешуйчатая защита', variant5: 'Гребенчатая волна', variant6: 'Едкая слюна',
        variant7: 'Гребенчатая мощь', variant8: 'Прочная чешуя', variant9: 'Тугая гребенчатая волна',
        variant10: 'Живучий Гребешок', variant11: 'Цепкий зубец', variant12: 'Волна и на дно',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Гребешок', variant15: 'Пружинистый хвост',
        variant16: 'Зубец гребня вмиг', variant17: 'Гребенчатая хватка', variant18: 'Немигающий взгляд',
        variant19: 'Гребенчатая волна вмиг', variant20: 'Ящеричный дух', variant21: 'Стойкая чешуя',
        variant22: 'Юркий Гребешок', variant23: 'Гребенчатая стойкость', variant24: 'Чуткий зубец',
        variant25: 'Ускользающая волна', variant26: 'Дикая волна', variant27: 'Мощь слюны',
        variant28: 'Тугая волна внезапно', variant29: 'Каменная чешуя', variant30: 'Разросшийся гребень',
        variant31: 'Гребенчатый рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая волна',
        variant34: 'Гребенчатая прыть', variant35: 'Гребенчатая выносливость'
    },
    enem3: {
        variant1: 'Цветочный удар', variant2: 'Острый лепесток', variant3: 'Цветочная сила',
        variant4: 'Лепестковая защита', variant5: 'Широкая раскачка', variant6: 'Цветочный сок',
        variant7: 'Цветочная мощь', variant8: 'Плотные лепестки', variant9: 'Широкая плавная раскачка',
        variant10: 'Живучий Белоцвет', variant11: 'Цепкий лепесток', variant12: 'Раскачка и под воду',
        variant13: 'Толстые лепестки', variant14: 'Неутомимый Белоцвет', variant15: 'Стебель кувшинки пружинит',
        variant16: 'Меткий лепесток', variant17: 'Цветочная хватка', variant18: 'Безмятежный взгляд',
        variant19: 'Широкая раскачка вмиг', variant20: 'Цветочный дух', variant21: 'Стойкие лепестки',
        variant22: 'Юркий Белоцвет', variant23: 'Цветочная стойкость', variant24: 'Чуткий лепесток',
        variant25: 'Ускользающая раскачка', variant26: 'Дикая раскачка', variant27: 'Мощь сока',
        variant28: 'Плавная раскачка внезапно', variant29: 'Каменные лепестки', variant30: 'Разросшийся цветок',
        variant31: 'Цветочный рывок', variant32: 'Живучие лепестки', variant33: 'Неутомимая раскачка',
        variant34: 'Цветочная прыть', variant35: 'Цветочная выносливость'
    },
    enem4: {
        variant1: 'Плачущий удар', variant2: 'Плакучая ветвь', variant3: 'Плакучая сила',
        variant4: 'Ивовая защита', variant5: 'Печальный взмах', variant6: 'Едкая слеза',
        variant7: 'Плакучая мощь', variant8: 'Ветви ивы', variant9: 'Длинные печальные взмахи',
        variant10: 'Живучая Плакальщица', variant11: 'Цепкая ветвь', variant12: 'Взмах и в тень ивы',
        variant13: 'Толстые ветви', variant14: 'Неутомимая Плакальщица', variant15: 'Плакучая ветвь пружинит',
        variant16: 'Меткая ветвь', variant17: 'Плакучая хватка', variant18: 'Печальный взгляд',
        variant19: 'Печальный взмах вмиг', variant20: 'Плакучий дух', variant21: 'Стойкие ветви',
        variant22: 'Юркая Плакальщица', variant23: 'Плакучая стойкость', variant24: 'Чуткая ветвь',
        variant25: 'Ускользающий взмах', variant26: 'Дикий плач', variant27: 'Мощь слезы',
        variant28: 'Длинный взмах внезапно', variant29: 'Каменные ветви', variant30: 'Плакучие ветви разрослись',
        variant31: 'Плакучий рывок', variant32: 'Живучие ветви', variant33: 'Неутомимый печальный взмах',
        variant34: 'Плакучая прыть', variant35: 'Плакучая выносливость'
    },
    enem5: {
        variant1: 'Огненный удар', variant2: 'Пылающее перо', variant3: 'Огнепёрная сила',
        variant4: 'Жаркая защита', variant5: 'Яркая волна', variant6: 'Огненный след',
        variant7: 'Огнепёрная мощь', variant8: 'Огненные перья', variant9: 'Яркая быстрая волна',
        variant10: 'Живучий Огнепёр', variant11: 'Цепкое перо', variant12: 'Волна и в пламя',
        variant13: 'Толстые огненные перья', variant14: 'Неутомимый Огнепёр', variant15: 'Пылающее крыло пружинит',
        variant16: 'Меткое перо', variant17: 'Огнепёрная хватка', variant18: 'Пылающий взгляд',
        variant19: 'Яркая волна вмиг', variant20: 'Огненный дух', variant21: 'Стойкие перья',
        variant22: 'Юркий Огнепёр', variant23: 'Огнепёрная стойкость', variant24: 'Чуткое перо',
        variant25: 'Ускользающая яркая волна', variant26: 'Дикое пламя', variant27: 'Мощь огня',
        variant28: 'Быстрая волна внезапно', variant29: 'Каменные перья', variant30: 'Разросшееся пламя',
        variant31: 'Огнепёрный рывок', variant32: 'Живучие перья', variant33: 'Неутомимая яркая волна',
        variant34: 'Огнепёрная прыть', variant35: 'Огнепёрная выносливость'
    }
};
