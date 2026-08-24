let lvlNumber = 34;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 34 — «Лебединая заводь», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом (утки/цапля/лебеди).
// Все четыре первых босса — 'wave' с разным почерком полёта: Свистун мелко хлопает
// крыльями частой нервной волной, Клюворез шагает редкими широкими взмахами,
// Крякун держит средний плавный ритм, Белокрыл раскачивается величаво перед финалом.
// Горлотруб (финал) — единственный не-wave: после долгого плавного разгона резко
// ускоряется (accelerate) — самый крупный лебедь бьёт не колебанием, а прямым напором.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.88, damageMultiplier: 2.11, minWaveDelay: 2060, minShotDelay: 144, minTelegraphMs: 530,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.82, speed: 1.15, damage: 1.17, telegraphMultiplier: 0.88, surpriseChance: 0.28, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.67, speed: 1.27, damage: 1.31, telegraphMultiplier: 0.80, surpriseChance: 0.38, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { movementStyle: 'wave',       cadence: 1.05, telegraphMs: 830, speedMultiplier: 1.00, damageMultiplier: 0.87, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Свистун: мелкая нервная волна крыльев
		enem2: { movementStyle: 'wave',       cadence: 0.98, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 0.98, speedVariance: [0.81, 0.91, 1.02, 1.13, 1.24] }, // Клюворез: редкие широкие взмахи
		enem3: { movementStyle: 'wave',       cadence: 0.94, telegraphMs: 790, speedMultiplier: 1.02, damageMultiplier: 1.00, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Крякун: средний плавный ритм
		enem4: { movementStyle: 'wave',       cadence: 0.90, telegraphMs: 850, speedMultiplier: 0.94, damageMultiplier: 1.08, speedVariance: [0.83, 0.93, 1.04, 1.15, 1.26] }, // Белокрыл: величавая широкая раскачка
		enem5: { movementStyle: 'accelerate', cadence: 0.84, telegraphMs: 700, speedMultiplier: 1.10, damageMultiplier: 1.12, speedVariance: [0.84, 0.94, 1.05, 1.16, 1.27] }  // Горлотруб: плавный разгон → прямой напор, финал
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl34/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl34/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl34/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl34/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl34/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Свистун', image: 'images/enemies/regions/4_rech_ozer/lvl34/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 280, xPos: 50, size: '23%',
		deathAnimation: { preset: 'featherScatter', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Клюворез', image: 'images/enemies/regions/4_rech_ozer/lvl34/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 420, xPos: 50, size: '25%',
		deathAnimation: { preset: 'wingFold', durationMs: 1200 }
	},
	enem3: {
		name: 'enem3', dispName: 'Крякун', image: 'images/enemies/regions/4_rech_ozer/lvl34/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 540, xPos: 50, size: '26%',
		deathAnimation: { preset: 'plumageDrop', durationMs: 1350 }
	},
	enem4: {
		name: 'enem4', dispName: 'Белокрыл', image: 'images/enemies/regions/4_rech_ozer/lvl34/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 680, xPos: 50, size: '28%',
		deathAnimation: { preset: 'wingCollapse', durationMs: 1400 }
	},
	enem5: {
		name: 'enem5', dispName: 'Горлотруб', image: 'images/enemies/regions/4_rech_ozer/lvl34/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '31%',
		deathAnimation: { preset: 'wingBurst', durationMs: 1600 }
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
	// ===== Свистун: 'wave', мелкая нервная волна крыльев =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 6,  waveFrequency: 2.0 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 33, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 1.8 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 23, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 5,  waveFrequency: 2.3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 22, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 13, waveAmplitude: 6,  waveFrequency: 2.1 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16, waveAmplitude: 8,  waveFrequency: 1.5 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 12, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17, waveAmplitude: 7,  waveFrequency: 1.6 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 19, waveAmplitude: 5,  waveFrequency: 2.5 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 2.4 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 22, waveAmplitude: 4,  waveFrequency: 2.8 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 4,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 23, waveAmplitude: 5,  waveFrequency: 2.7 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.2 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.3 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 5,  waveAmplitude: 8,  waveFrequency: 1.0 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 16, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 6,  waveFrequency: 1.9 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 15, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 7,  waveFrequency: 1.8 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 24, waveAmplitude: 5,  waveFrequency: 2.6 }   //15 нежданчик

	,
	// ===== Клюворез: 'wave', редкие широкие взмахи =====
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 9,  waveFrequency: 0.7 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 10, waveFrequency: 0.6 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 27, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 0.9 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 0.8 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.1 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.0 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 18, waveAmplitude: 5,  waveFrequency: 1.4 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 19, waveAmplitude: 6,  waveFrequency: 1.3 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.5 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 0.5 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 11, waveAmplitude: 7,  waveFrequency: 0.8 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 11, waveAmplitude: 8,  waveFrequency: 0.7 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4,  waveAmplitude: 11, waveFrequency: 0.4 }, //12 самая широкая волна
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4,  waveAmplitude: 10, waveFrequency: 0.5 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7,  waveAmplitude: 6,  waveFrequency: 0.9 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 1.5 }   //15 нежданчик

	,
	// ===== Крякун: 'wave', средний плавный ритм =====
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 36, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 1.2 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 35, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 1.1 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 26, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10, waveAmplitude: 6,  waveFrequency: 1.4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 25, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 1.3 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14, waveAmplitude: 5,  waveFrequency: 1.7 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 15, waveAmplitude: 6,  waveFrequency: 1.6 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 19, waveAmplitude: 5,  waveFrequency: 2.0 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 1.9 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 0.8 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 0.9 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12, waveAmplitude: 6,  waveFrequency: 1.5 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12, waveAmplitude: 7,  waveFrequency: 1.4 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5,  waveAmplitude: 9,  waveFrequency: 0.7 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 15, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.6 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 14, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.5 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21, waveAmplitude: 5,  waveFrequency: 2.1 }   //15 нежданчик

	,
	// ===== Белокрыл: 'wave', величавая широкая раскачка =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6,  waveAmplitude: 10, waveFrequency: 0.6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 29, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7,  waveAmplitude: 11, waveFrequency: 0.5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 0.8 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 19, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 10, waveAmplitude: 9,  waveFrequency: 0.7 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16, waveAmplitude: 12, waveFrequency: 0.4 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17, waveAmplitude: 13, waveFrequency: 0.4 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 21, waveAmplitude: 6,  waveFrequency: 1.2 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22, waveAmplitude: 7,  waveFrequency: 1.1 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 0.9 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8,  waveAmplitude: 9,  waveFrequency: 0.8 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4,  waveAmplitude: 14, waveFrequency: 0.35 }, //12 самая широкая волна уровня, честный долгий телеграф
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 13, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14, waveAmplitude: 9,  waveFrequency: 1.0 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 14, waveAmplitude: 10, waveFrequency: 0.9 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23, waveAmplitude: 7,  waveFrequency: 1.4 }   //15 нежданчик

	,
	// ===== Горлотруб: плавный разгон → прямой напор (accelerate), финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 39, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 13 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 13 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 17, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 12 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 16, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 12 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 31, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 31, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26 }  //15 нежданчик — самый резкий рывок трубного гласа
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 220, bossDelayAbDop: 4100 }, // мелкая нервная волна, самый быстрый темп
	{ boss: 'enem2', bossDelayAb: 400, bossDelayAbDop: 6300 }, // редкие широкие взмахи, долгая пауза
	{ boss: 'enem3', bossDelayAb: 290, bossDelayAbDop: 5000 }, // средний плавный ритм
	{ boss: 'enem4', bossDelayAb: 360, bossDelayAbDop: 5900 }, // величавая широкая раскачка
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4700 }, // финальный трубный разгон
];

const bossAbilitiesDop = [
	// Свистун
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },

	// Клюворез
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 10] },
	{ boss: 'enem2', indexAbilities: [8, 9, 11] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [0, 1, 12, 13] },
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7, 14, 15] },

	// Крякун
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [2, 3, 10] },
	{ boss: 'enem3', indexAbilities: [4, 5, 11] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem3', indexAbilities: [0, 1, 8, 9] },
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },

	// Белокрыл
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10] },
	{ boss: 'enem4', indexAbilities: [8, 9, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4, 5] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 12] },

	// Горлотруб
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem5', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15] },
];

// Лорные названия связок. Уровень 34 — водоплавающие: Свистун (крикливая птица),
// Клюворез (цапля), Крякун (утка), Белокрыл (лебедь), Горлотруб (журавль, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Свистящий удар', variant2: 'Острое перо', variant3: 'Свистящая сила',
        variant4: 'Пуховая защита', variant5: 'Взмах крыла', variant6: 'Едкий свист',
        variant7: 'Свистящая мощь', variant8: 'Плотный пух', variant9: 'Нервная волна крыльев',
        variant10: 'Живучий Свистун', variant11: 'Цепкое перо', variant12: 'Взмах и в камыш',
        variant13: 'Толстый пух', variant14: 'Неутомимый Свистун', variant15: 'Пружинистое крыло',
        variant16: 'Меткое перо', variant17: 'Свистящая хватка', variant18: 'Пронзительный взгляд',
        variant19: 'Свист вмиг', variant20: 'Речной дух', variant21: 'Стойкий пух',
        variant22: 'Юркий Свистун', variant23: 'Свистящая стойкость', variant24: 'Чуткое перо',
        variant25: 'Ускользающий свист', variant26: 'Дикий свист', variant27: 'Мощь крика',
        variant28: 'Нервная волна внезапно', variant29: 'Каменный пух', variant30: 'Оперение разрослось',
        variant31: 'Свистящий рывок', variant32: 'Живучий пух', variant33: 'Неутомимая волна крыльев',
        variant34: 'Свистящая прыть', variant35: 'Свистящая выносливость'
    },
    enem2: {
        variant1: 'Режущий удар клювом', variant2: 'Клюв-нож', variant3: 'Клюворезная сила',
        variant4: 'Защита оперения', variant5: 'Широкий взмах', variant6: 'Рыбный дух',
        variant7: 'Клюворезная мощь', variant8: 'Серое оперение', variant9: 'Редкий широкий взмах',
        variant10: 'Живучий Клюворез', variant11: 'Цепкий клюв', variant12: 'Удар и в камыш',
        variant13: 'Толстое оперение', variant14: 'Неутомимый Клюворез', variant15: 'Пружинистая шея',
        variant16: 'Клюв-нож вмиг', variant17: 'Клюворезная хватка', variant18: 'Взгляд рыболова',
        variant19: 'Широкий взмах мгновенно', variant20: 'Рыболовный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Клюворез', variant23: 'Клюворезная стойкость', variant24: 'Чуткий клюв',
        variant25: 'Ускользающий взмах', variant26: 'Дикий удар клювом', variant27: 'Мощь духа',
        variant28: 'Редкий взмах внезапно', variant29: 'Каменное оперение', variant30: 'Размах крыльев разросся',
        variant31: 'Клюворезный рывок', variant32: 'Живучее оперение', variant33: 'Неутомимый широкий взмах',
        variant34: 'Клюворезная прыть', variant35: 'Клюворезная выносливость'
    },
    enem3: {
        variant1: 'Крякающий удар', variant2: 'Клюв утки', variant3: 'Крякающая сила',
        variant4: 'Пёстрая защита', variant5: 'Плавный удар', variant6: 'Едкий кряк',
        variant7: 'Крякающая мощь', variant8: 'Плотное перо', variant9: 'Средний плавный ритм',
        variant10: 'Живучий Крякун', variant11: 'Цепкая лапка', variant12: 'Удар и на воду',
        variant13: 'Толстое перо', variant14: 'Неутомимый Крякун', variant15: 'Пружинистая лапка',
        variant16: 'Меткий кряк', variant17: 'Крякающая хватка', variant18: 'Довольный взгляд',
        variant19: 'Плавный удар вмиг', variant20: 'Утиный дух', variant21: 'Стойкое перо',
        variant22: 'Юркий Крякун', variant23: 'Крякающая стойкость', variant24: 'Чуткий кряк',
        variant25: 'Ускользающий на воду', variant26: 'Дикий кряк', variant27: 'Мощь клюва',
        variant28: 'Плавный ритм внезапно', variant29: 'Каменное перо', variant30: 'Кряк разросся',
        variant31: 'Крякающий рывок', variant32: 'Живучее перо', variant33: 'Неутомимый ритм',
        variant34: 'Крякающая прыть', variant35: 'Крякающая выносливость'
    },
    enem4: {
        variant1: 'Лебединый удар', variant2: 'Белое перо', variant3: 'Лебединая сила',
        variant4: 'Белоснежная защита', variant5: 'Величавая раскачка', variant6: 'Шип лебедя',
        variant7: 'Лебединая мощь', variant8: 'Белое оперение', variant9: 'Величавая широкая раскачка',
        variant10: 'Живучий Белокрыл', variant11: 'Цепкое крыло', variant12: 'Раскачка и на воду',
        variant13: 'Толстое оперение', variant14: 'Неутомимый Белокрыл', variant15: 'Белое крыло пружинит',
        variant16: 'Меткое перо', variant17: 'Лебединая хватка', variant18: 'Гордый взгляд лебедя',
        variant19: 'Величавая раскачка вмиг', variant20: 'Белоснежный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Белокрыл', variant23: 'Лебединая стойкость', variant24: 'Чуткое крыло',
        variant25: 'Ускользающая раскачка', variant26: 'Дикий шип', variant27: 'Мощь шипения',
        variant28: 'Широкая раскачка внезапно', variant29: 'Каменное оперение', variant30: 'Размах крыла разросся',
        variant31: 'Лебединый рывок', variant32: 'Живучее оперение', variant33: 'Неутомимая раскачка',
        variant34: 'Лебединая прыть', variant35: 'Лебединая выносливость'
    },
    enem5: {
        variant1: 'Трубный удар', variant2: 'Клюв-копьё', variant3: 'Трубная сила',
        variant4: 'Защита цапли', variant5: 'Прямой напор', variant6: 'Трубный клич',
        variant7: 'Трубная мощь', variant8: 'Серое оперение цапли', variant9: 'Плавный разгон в напор',
        variant10: 'Живучий Горлотруб', variant11: 'Клюв-копьё вмиг', variant12: 'Напор и на воду',
        variant13: 'Толстое оперение', variant14: 'Неутомимый Горлотруб', variant15: 'Длинная шея пружинит',
        variant16: 'Меткий клюв-копьё', variant17: 'Трубная хватка', variant18: 'Взгляд с высоты',
        variant19: 'Трубный клич вмиг', variant20: 'Небесный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Горлотруб', variant23: 'Трубная стойкость', variant24: 'Чуткая шея',
        variant25: 'Ускользающий напор', variant26: 'Дикий трубный клич', variant27: 'Мощь клича',
        variant28: 'Прямой напор внезапно', variant29: 'Каменное оперение', variant30: 'Трубный клич разросся',
        variant31: 'Трубный рывок', variant32: 'Живучее оперение', variant33: 'Разгон в напор вновь',
        variant34: 'Трубная прыть', variant35: 'Трубная выносливость'
    }
};
