let lvlNumber = 31;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 31 — «Камышовые берега», первый уровень Области IV «Реки и озёра».
// Первый уровень региона, где официально используется новый тип движения 'wave'
// (введён в game.js этой ревизией — см. lvlData/Правила создания уровня.txt §0.1):
// в отличие от остальных 6 типов, его траектория задаётся ПОЛНОСТЬЮ per-атаку через
// поля waveAmplitude/waveFrequency/wavePhase прямо в bossAbilities, а не зашита в движке.
// Здесь этим типом идут сразу два босса (enem1 и enem2) — и у них НАМЕРЕННО разные
// «почерки» волны: у Резака (заставка/интро-роль) волна широкая и медленная, у
// Клыкокрыла (быстрые серии) — тугая и нервная. Плюс внутри каждого набора атак
// сами amplitude/frequency ещё и меняются от атаки к атаке — чтобы не превращалось
// в очередной фиксированный 'weave' с другими цифрами.
//
// Картинки (см. правило §12 — сверено напрямую, а не с идеи-документа): реальный
// образ enem2 — не «стрекоза-коромысло» из идеи-документа, а чешуйчатый клыкастый
// летун с перепончатыми крыльями (нечто среднее между гарпией и мелким змеем) —
// идея-документ для этого слота устарел, картинка признана истиной (тот же принцип,
// что и с дыней на уровне 28), imя подобрано под реально нарисованное.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.92, damageMultiplier: 2.00, minWaveDelay: 2150, minShotDelay: 150, minTelegraphMs: 545,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.15, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.30, cadence: 0.85, speed: 1.12, damage: 1.15, telegraphMultiplier: 0.90, surpriseChance: 0.26, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0.00, cadence: 0.70, speed: 1.24, damage: 1.28, telegraphMultiplier: 0.82, surpriseChance: 0.36, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { movementStyle: 'wave',     cadence: 1.00, telegraphMs: 880, speedMultiplier: 0.95, damageMultiplier: 0.88, speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18] }, // Резак: широкая медленная волна, тростник качается на течении
		enem2: { movementStyle: 'wave',     cadence: 0.95, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 0.95, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] }, // Клыкокрыл: тугая нервная волна, рваный полёт летуна
		enem3: { movementStyle: 'lateRush', cadence: 1.15, telegraphMs: 980, speedMultiplier: 0.85, damageMultiplier: 1.15, speedVariance: [0.77, 0.87, 0.98, 1.09, 1.20] }, // Древогрыз: тяжёлый замах-разгон бобровой дубины
		enem4: { movementStyle: 'accelerate', cadence: 0.90, telegraphMs: 750, speedMultiplier: 1.05, damageMultiplier: 1.05, speedVariance: [0.83, 0.93, 1.04, 1.15, 1.26] }, // Корнеход: медленный шаг корнями → резкий рывок
		enem5: { movementStyle: 'straight', cadence: 0.85, telegraphMs: 700, speedMultiplier: 1.08, damageMultiplier: 1.10, speedVariance: [0.84, 0.94, 1.05, 1.16, 1.27] }  // Шестовик: честные прямые удары шестом, финал без движкового трюка
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl31/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl31/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl31/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl31/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl31/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Резак', image: 'images/enemies/regions/4_rech_ozer/lvl31/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 250, xPos: 50, size: '25%',
		deathAnimation: { preset: 'reedCollapse', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Клыкокрыл', image: 'images/enemies/regions/4_rech_ozer/lvl31/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 390, xPos: 50, size: '24%',
		deathAnimation: { preset: 'wingFold', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Древогрыз', image: 'images/enemies/regions/4_rech_ozer/lvl31/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 510, xPos: 50, size: '27%',
		deathAnimation: { preset: 'heavyTopple', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Корнеход', image: 'images/enemies/regions/4_rech_ozer/lvl31/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 650, xPos: 50, size: '28%',
		deathAnimation: { preset: 'rootCrumble', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Шестовик', image: 'images/enemies/regions/4_rech_ozer/lvl31/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'cloakSink', durationMs: 1550 }
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
	// ===== Резак: 'wave', широкая медленная волна — тростник качается на течении =====
	// amplitude/frequency разные у каждой атаки (см. §0.1) — не единый фиксированный 'weave'.
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 6,  waveFrequency: 0.7 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 0.8 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 0.9 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 27, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 9,  waveFrequency: 0.6 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 11, waveAmplitude: 5,  waveFrequency: 1.1 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 17, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 6,  waveFrequency: 1.0 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15, waveAmplitude: 8,  waveFrequency: 0.8 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 9,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16, waveAmplitude: 7,  waveFrequency: 0.9 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 18, waveAmplitude: 10, waveFrequency: 0.6 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 19, waveAmplitude: 9,  waveFrequency: 0.7 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 4,  waveAmplitude: 5,  waveFrequency: 0.5 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 47, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.6 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4,  waveAmplitude: 11, waveFrequency: 0.5 },  //12 самая широкая волна уровня, честный долгий телеграф
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 6,  waveFrequency: 1.2 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.1 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20, waveAmplitude: 9,  waveFrequency: 0.9 }   //15 нежданчик

	,
	// ===== Клыкокрыл: 'wave', тугая нервная волна — рваный полёт летуна =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 30, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 7,  waveFrequency: 2.4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 9,  waveFrequency: 2.1 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14, waveAmplitude: 6,  waveFrequency: 2.8 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15, waveAmplitude: 8,  waveFrequency: 2.5 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19, waveAmplitude: 10, waveFrequency: 1.9 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20, waveAmplitude: 11, waveFrequency: 2.0 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23, waveAmplitude: 6,  waveFrequency: 3.2 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24, waveAmplitude: 7,  waveFrequency: 3.0 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7,  waveAmplitude: 5,  waveFrequency: 1.7 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7,  waveAmplitude: 5,  waveFrequency: 1.8 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 8,  waveFrequency: 2.2 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 9,  waveFrequency: 2.3 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5,  waveAmplitude: 4,  waveFrequency: 1.4 },  //12 контраст: медленный центр
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17, waveAmplitude: 10, waveFrequency: 2.6 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17, waveAmplitude: 9,  waveFrequency: 2.7 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25, waveAmplitude: 8,  waveFrequency: 3.1 }   //15 нежданчик — самый резкий рывок центром

	,
	// ===== Древогрыз: тяжёлый замах-разгон бобровой дубины (lateRush) =====
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
	// ===== Корнеход: медленный шаг корнями → резкий рывок (accelerate) =====
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 25, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 17, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 24 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 26 }  //15 нежданчик — самый резкий рывок

	,
	// ===== Шестовик: честные прямые удары шестом, финал без движкового трюка (straight) =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 22 }, //0
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 23 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 13, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 18 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 19 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 22, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 14 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 21, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 14 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12 контраст: центр
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 15, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 14, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 27 }  //15 нежданчик — второй центр-верх
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 360, bossDelayAbDop: 5900 }, // широкая медленная волна, честная передышка
	{ boss: 'enem2', bossDelayAb: 230, bossDelayAbDop: 4300 }, // тугая нервная волна, быстрые серии
	{ boss: 'enem3', bossDelayAb: 400, bossDelayAbDop: 6300 }, // тяжёлый разгон дубины
	{ boss: 'enem4', bossDelayAb: 280, bossDelayAbDop: 5000 }, // медленный шаг → резкий рывок
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4600 }, // честный финал без трюка
];

const bossAbilitiesDop = [
	// Резак
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem1', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Клыкокрыл
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0, 1] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem2', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Древогрыз
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 12] },
	{ boss: 'enem3', indexAbilities: [6, 7, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 1, 10, 11] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem3', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem3', indexAbilities: [8, 9, 14, 15] }, // смешанная поздняя

	// Корнеход
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem4', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Шестовик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 10, 11] },
	{ boss: 'enem5', indexAbilities: [6, 7, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem5', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem5', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem5', indexAbilities: [10, 11, 13, 14, 15] }, // смешанная поздняя
];
