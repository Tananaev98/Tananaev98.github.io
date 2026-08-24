let lvlNumber = 40;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 40 — «Владыка омута», ФИНАЛ Области IV «Реки и озёра» (isRegionFinal).
// Картинка сверена напрямую (см. §12): толстобрюхий сомовый дед с усами-тиной и
// вершой на голове, от фазы к фазе набухает водой (растёт объём/давление живота),
// накапливает ссадины без сброса, в 5-й фазе — красные светящиеся глаза и ДРУГАЯ
// стойка, чем в 4-й (разворот корпуса, опора, рука — не повтор), как и требует
// идея-документ. Пять фаз — пять РАЗНЫХ понятий физической эскалации, а не лестница
// интенсивности одного слова (см. §1.1): ВОДЯНОЙ (спокоен, но никогда не добр) →
// РАЗБУХШИЙ (тело набухает) → НАПОРНЫЙ (давление прорывается наружу) → РЕВУЩИЙ
// (рёв сотрясает омут) → РАЗЪЯРЁННЫЙ (истинный берсерк, красные глаза — свежее
// слово, не повторяет финалы 15/25/30/39).
//
// Первая фаза называется голым именем «Водяной», без эпитета (см. §12). Большинство
// обликов — 'wave' (родная стихия Водяного), но НЕ все пять одинаковы: Разбухший
// идёт на 'accelerate' (давление растёт медленно, потом прорывается рывком), Ревущий —
// на 'pause' (набирает воздух для рёва и застывает перед ударом). Финал — «Потоп»:
// волна с нарастающим внутри серии градиентом скорости (не плоская стена — урок
// Царя Гороха/Русалки, см. gameData30.js и gameData39.js) и с нежданчиком сразу
// после кульминации, чтобы расслабляться было нельзя. Боевые тексты — художественные
// боевые выкрики о его состоянии (тело/рёв/ярость/глаза), не пересказ параметров
// движка и не пейзаж омута (см. §12, ловушки 1 и 2).
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.78, damageMultiplier: 2.35, minWaveDelay: 1920, minShotDelay: 132, minTelegraphMs: 500,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.77, speed: 1.18, damage: 1.21, telegraphMultiplier: 0.85, surpriseChance: 0.32, maxActiveAttacks: 21 },
		{ phase: 3, minHp: 0.00, cadence: 0.61, speed: 1.32, damage: 1.37, telegraphMultiplier: 0.76, surpriseChance: 0.44, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: {
			movementStyle: 'wave', cadence: 0.95, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 0.85,
			healthMultiplier: 1.50,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20],
			appearMessage: 'ДОВОЛЬНО УХМЫЛЯЕТСЯ',
			phaseMessages: { 2: 'ЖИВОТ НАЛИВАЕТСЯ СИЛОЙ', 3: 'РЫЧИТ ИЗ ГЛУБИНЫ ОМУТА' }
		}, // ВОДЯНОЙ: широкий медленный водяной свилл, самый честный телеграф уровня
		enem2: {
			movementStyle: 'accelerate', cadence: 1.05, telegraphMs: 800, speedMultiplier: 0.95, damageMultiplier: 0.98,
			healthMultiplier: 1.50,
			speedVariance: [0.82, 0.93, 1.04, 1.15, 1.26],
			appearMessage: 'РАЗБУХАЕТ ОТ ЯРОСТИ',
			phaseMessages: { 2: 'ДАВЛЕНИЕ РАСТЁТ', 3: 'ГОТОВ ЛОПНУТЬ ОТ ЗЛОБЫ' }
		}, // РАЗБУХШИЙ ВОДЯНОЙ: давление копится медленно, потом прорывается рывком
		enem3: {
			movementStyle: 'wave', cadence: 1.00, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 1.05,
			healthMultiplier: 1.50,
			speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25],
			appearMessage: 'ХЛЕЩЕТ ВОДЯНЫМ НАПОРОМ',
			phaseMessages: { 2: 'НАПОР УСИЛИВАЕТСЯ', 3: 'ОМУТ КИПИТ ОТ ЯРОСТИ' }
		}, // НАПОРНЫЙ ВОДЯНОЙ: тугая быстрая волна давления
		enem4: {
			movementStyle: 'pause', cadence: 0.90, telegraphMs: 750, speedMultiplier: 1.10, damageMultiplier: 1.15,
			healthMultiplier: 1.50,
			speedVariance: [0.82, 0.94, 1.07, 1.20, 1.33], minFastSideSwitchMs: 800,
			appearMessage: 'РЁВ СОТРЯСАЕТ ОМУТ',
			phaseMessages: { 2: 'РЁВ СТАНОВИТСЯ ГРОМЧЕ', 3: 'ЯРОСТЬ РВЁТСЯ НАРУЖУ' }
		}, // РЕВУЩИЙ ВОДЯНОЙ: набирает воздух и застывает перед рёвом-рывком
		enem5: {
			movementStyle: 'wave', cadence: 0.78, telegraphMs: 670, speedMultiplier: 1.15, damageMultiplier: 0.85,
			healthMultiplier: 1.50,
			speedVariance: [0.85, 0.99, 1.13, 1.27, 1.41],
			appearMessage: 'ГЛАЗА ПЫЛАЮТ КРАСНЫМ ОГНЁМ',
			phaseMessages: { 2: 'ПОТОП РВЁТСЯ НАРУЖУ', 3: 'ПОТОП!' }
		} // РАЗЪЯРЁННЫЙ ВОДЯНОЙ: «Потоп» — растущий градиент скорости внутри серии
		  // + нежданчик сразу после кульминации, финал области
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Реки и озёра» пройдена!'
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl40/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl40/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl40/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl40/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl40/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 360, xPos: 50, size: '27%',
		deathAnimation: { preset: 'ripplesCollapse', durationMs: 1300 }
	},
	enem2: {
		name: 'enem2', dispName: 'Разбухший Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 510, xPos: 50, size: '28%',
		deathAnimation: { preset: 'bellyBurst', durationMs: 1300 }
	},
	enem3: {
		name: 'enem3', dispName: 'Напорный Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 630, xPos: 50, size: '29%',
		deathAnimation: { preset: 'waterCollapse', durationMs: 1450 }
	},
	enem4: {
		name: 'enem4', dispName: 'Ревущий Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 770, xPos: 50, size: '30%',
		deathAnimation: { preset: 'roarFade', durationMs: 1500 }
	},
	enem5: {
		name: 'enem5', dispName: 'Разъярённый Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '33%',
		deathAnimation: { preset: 'floodDissolve', durationMs: 1800 }
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
	// ===== Водяной: 'wave', широкий медленный водяной свилл =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 9,  waveFrequency: 0.6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 37, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 10, waveFrequency: 0.5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 0.8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 27, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 0.7 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 11, waveFrequency: 0.4 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14, waveAmplitude: 12, waveFrequency: 0.4 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 18, waveAmplitude: 6,  waveFrequency: 1.1 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 19, waveAmplitude: 7,  waveFrequency: 1.0 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 7,  waveFrequency: 0.9 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 8,  waveFrequency: 0.8 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4,  waveAmplitude: 13, waveFrequency: 0.35 }, //12 самый широкий свилл, честный долгий телеграф
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 15, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.0 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 8,  waveFrequency: 0.9 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 1.2 }   //15 нежданчик

	,
	// ===== Разбухший Водяной: давление копится → прорывается рывком (accelerate) =====
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 25, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 13, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 46, yPos: 17, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 12 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 54, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 12 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 4 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 4 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 31, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 31, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 26 }  //15 нежданчик — самый резкий прорыв давления

	,
	// ===== Напорный Водяной: 'wave', тугая быстрая волна давления =====
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9,  waveAmplitude: 7,  waveFrequency: 1.4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 29, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10, waveAmplitude: 8,  waveFrequency: 1.3 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 13, waveAmplitude: 5,  waveFrequency: 1.8 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 74, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 14, waveAmplitude: 6,  waveFrequency: 1.7 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 9,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 19, waveAmplitude: 9,  waveFrequency: 1.1 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20, waveAmplitude: 10, waveFrequency: 1.0 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 24, waveAmplitude: 5,  waveFrequency: 2.1 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 25, waveAmplitude: 6,  waveFrequency: 2.0 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 0.9 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6,  waveAmplitude: 4,  waveFrequency: 1.0 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 33, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 1.5 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 32, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11, waveAmplitude: 8,  waveFrequency: 1.4 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.8 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 16, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17, waveAmplitude: 9,  waveFrequency: 1.6 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 15, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17, waveAmplitude: 8,  waveFrequency: 1.7 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 26, waveAmplitude: 6,  waveFrequency: 2.2 }   //15 нежданчик

	,
	// ===== Ревущий Водяной: набирает воздух и застывает перед рёвом (pause) =====
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 29, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 10 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 19, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 10 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 17, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 24 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 25 }  //15 нежданчик

	,
	// ===== Разъярённый Водяной: 'wave', «Потоп» — растущая скорость внутри серии, финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 1.2 },  //0  герольд
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 1.2 },  //1  герольд
	{ boss: 'enem5', type: 'enem55', xPos: 5,  yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4,  waveAmplitude: 6,  waveFrequency: 1.0 },  //2  ПОТОП — старт волны, медленно
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 1.1 },  //3  потоп
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 6,  waveAmplitude: 7,  waveFrequency: 1.3 },  //4  потоп
	{ boss: 'enem5', type: 'enem55', xPos: 41, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 7,  waveAmplitude: 7,  waveFrequency: 1.4 },  //5  потоп
	{ boss: 'enem5', type: 'enem55', xPos: 53, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 1.6 },  //6  потоп
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 1.7 },  //7  потоп
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 10, waveAmplitude: 9,  waveFrequency: 1.9 },  //8  потоп
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 11, waveAmplitude: 9,  waveFrequency: 2.0 },  //9  потоп — конец ряда, самый быстрый край
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 7,  waveAmplitude: 12, waveFrequency: 0.7 }, //10 solo — по-настоящему тяжёлый удар, честный долгий телеграф
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 22, waveAmplitude: 6,  waveFrequency: 2.3 },  //11 нежданчик: бьёт сразу после потопа, асимметрично
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23, waveAmplitude: 7,  waveFrequency: 2.4 },  //12 второй асимметричный нежданчик
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 13, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16, waveAmplitude: 7,  waveFrequency: 1.8 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17, waveAmplitude: 8,  waveFrequency: 1.9 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 27, waveAmplitude: 6,  waveFrequency: 2.6 }   //15 финальный самый резкий удар, чистый центр
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 380, bossDelayAbDop: 6000 }, // широкий медленный свилл, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 400, bossDelayAbDop: 6300 }, // давление копится долго, потом рывок
	{ boss: 'enem3', bossDelayAb: 220, bossDelayAbDop: 4000 }, // тугая быстрая волна давления, самый плотный темп
	{ boss: 'enem4', bossDelayAb: 420, bossDelayAbDop: 6600 }, // набирает воздух перед рёвом, долгая пауза
	{ boss: 'enem5', bossDelayAb: 200, bossDelayAbDop: 6700 }, // внутри потопа плотно, отдых после кульминации — самый долгий на уровне
];

const bossAbilitiesDop = [
	// Водяной
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem1', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Разбухший Водяной
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem2', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Напорный Водяной
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [2, 3, 10] },
	{ boss: 'enem3', indexAbilities: [4, 5, 11] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 1, 12, 13] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem3', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem3', indexAbilities: [8, 9, 14, 15] }, // смешанная поздняя

	// Ревущий Водяной
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem4', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Разъярённый Водяной — «Потоп», кульминация уровня (2-sync герольд → 8-sync потоп → мгновенный нежданчик)
	{ boss: 'enem5', indexAbilities: [0, 1] }, // герольд (2-sync)
	{ boss: 'enem5', indexAbilities: [10] }, // solo — по-настоящему тяжёлый одиночный удар
	{ boss: 'enem5', indexAbilities: [13, 14] }, // асимметричная пара — опасность не только по краям
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4] }, // потоп начинает собираться (5-sync, промежуточная)
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 10] }, // ритмическая: сборка → тяжёлый одиночный
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5, 6, 7, 8, 9, 11] }, // ПОТОП + мгновенный нежданчик сразу после (опасная сигнатурная, кульминация)
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5] }, // chunk-break: обрывается на середине потопа
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15] }, // смешанная поздняя: герольд + полный потоп + оба нежданчика, самая длинная связка области
];

// Лорные названия связок. Уровень 40 — эскалация одной сущности: Водяной → Разбухший →
// Напорный → Ревущий → Разъярённый (финал области). Стиль имени нарастает от тины
// омута до полного речного гнева, но остаётся одним и тем же хозяином воды на всех стадиях.
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Тинный удар', variant2: 'Илистый шаг', variant3: 'Тинная сила',
        variant4: 'Илистая шкура', variant5: 'Тягучая волна', variant6: 'Болотная ряска',
        variant7: 'Тинная мощь', variant8: 'Плотная илистая шкура', variant9: 'Медленная тягучая волна',
        variant10: 'Живучий Водяной', variant11: 'Цепкий ил', variant12: 'Волна и на самое дно',
        variant13: 'Толстая илистая шкура', variant14: 'Неутомимый Водяной', variant15: 'Ил пружинит',
        variant16: 'Меткий всплеск тины', variant17: 'Тинная хватка', variant18: 'Мутный взгляд',
        variant19: 'Тягучая волна вмиг', variant20: 'Омутный дух', variant21: 'Илистая шкура стойкая',
        variant22: 'Юркий вопреки илу', variant23: 'Тинная стойкость', variant24: 'Чуткий ил',
        variant25: 'Ускользающая тина', variant26: 'Дикая тягучая волна', variant27: 'Мощь ряски',
        variant28: 'Тягучая волна внезапно', variant29: 'Каменная илистая шкура', variant30: 'Тина разрослась',
        variant31: 'Тинный рывок', variant32: 'Живучая илистая шкура', variant33: 'Неутомимая тягучая волна',
        variant34: 'Тинная прыть', variant35: 'Тинная выносливость'
    },
    enem2: {
        variant1: 'Разбухший удар', variant2: 'Раздутый шаг', variant3: 'Разбухшая сила',
        variant4: 'Вздутая шкура', variant5: 'Резкий разгонный рывок', variant6: 'Пузырчатая тина',
        variant7: 'Разбухшая мощь', variant8: 'Плотная вздутая шкура', variant9: 'Ускоряющийся разгонный рывок',
        variant10: 'Живучий Разбухший', variant11: 'Цепкий раздутый захват', variant12: 'Рывок и на самое дно',
        variant13: 'Толстая вздутая шкура', variant14: 'Неутомимый Разбухший', variant15: 'Раздутый захват пружинит',
        variant16: 'Меткий пузырь', variant17: 'Разбухшая хватка', variant18: 'Одутловатый взгляд',
        variant19: 'Разгонный рывок вмиг', variant20: 'Разбухший омутный дух', variant21: 'Вздутая шкура стойкая',
        variant22: 'Юркий вопреки объёму', variant23: 'Разбухшая стойкость', variant24: 'Чуткий раздутый захват',
        variant25: 'Ускользающий разгон', variant26: 'Дикий разгонный рывок', variant27: 'Мощь пузырей',
        variant28: 'Разгонный рывок внезапно', variant29: 'Каменная вздутая шкура', variant30: 'Разбухание разрослось',
        variant31: 'Разбухший рывок', variant32: 'Живучая вздутая шкура', variant33: 'Неутомимый разгонный рывок',
        variant34: 'Разбухшая прыть', variant35: 'Разбухшая выносливость'
    },
    enem3: {
        variant1: 'Напорный удар', variant2: 'Давящий шаг', variant3: 'Напорная сила',
        variant4: 'Плотная водяная шкура', variant5: 'Мощная волна давления', variant6: 'Речной ил под напором',
        variant7: 'Напорная мощь', variant8: 'Плотнейшая водяная шкура', variant9: 'Тугая волна давления',
        variant10: 'Живучий Напорный', variant11: 'Цепкий водяной захват', variant12: 'Давление и на самое дно',
        variant13: 'Толстая водяная шкура', variant14: 'Неутомимый Напорный', variant15: 'Водяной захват пружинит',
        variant16: 'Меткий поток', variant17: 'Напорная хватка', variant18: 'Давящий взгляд',
        variant19: 'Волна давления вмиг', variant20: 'Напорный речной дух', variant21: 'Водяная шкура стойкая',
        variant22: 'Юркий вопреки напору', variant23: 'Напорная стойкость', variant24: 'Чуткий водяной захват',
        variant25: 'Ускользающий поток', variant26: 'Дикая волна давления', variant27: 'Мощь речного ила',
        variant28: 'Волна давления внезапно', variant29: 'Каменная водяная шкура', variant30: 'Напор разросся',
        variant31: 'Напорный рывок', variant32: 'Живучая водяная шкура', variant33: 'Неутомимая волна давления',
        variant34: 'Напорная прыть', variant35: 'Напорная выносливость'
    },
    enem4: {
        variant1: 'Ревущий удар', variant2: 'Грозный застой', variant3: 'Ревущая сила',
        variant4: 'Бурлящая шкура', variant5: 'Пауза и потоп', variant6: 'Штормовая муть',
        variant7: 'Ревущая мощь', variant8: 'Плотная бурлящая шкура', variant9: 'Долгая пауза перед потопом',
        variant10: 'Живучий Ревущий', variant11: 'Цепкий бурлящий захват', variant12: 'Потоп и на самое дно',
        variant13: 'Толстая бурлящая шкура', variant14: 'Неутомимый Ревущий', variant15: 'Бурлящий захват пружинит',
        variant16: 'Меткий рёв', variant17: 'Ревущая хватка', variant18: 'Штормовой взгляд',
        variant19: 'Пауза и потоп мгновенно', variant20: 'Ревущий речной дух', variant21: 'Бурлящая шкура стойкая',
        variant22: 'Юркий вопреки рёву', variant23: 'Ревущая стойкость', variant24: 'Чуткий бурлящий захват',
        variant25: 'Ускользающая пауза', variant26: 'Дикий потоп из паузы', variant27: 'Мощь штормовой мути',
        variant28: 'Потоп внезапно', variant29: 'Каменная бурлящая шкура', variant30: 'Рёв разросся',
        variant31: 'Ревущий рывок', variant32: 'Живучая бурлящая шкура', variant33: 'Неутомимая пауза перед потопом',
        variant34: 'Ревущая прыть', variant35: 'Ревущая выносливость'
    },
    enem5: {
        variant1: 'Разъярённый удар', variant2: 'Хозяйский шаг', variant3: 'Разъярённая сила',
        variant4: 'Изумрудная чешуйчатая шкура', variant5: 'Полный потоп', variant6: 'Гневная речная муть',
        variant7: 'Разъярённая мощь', variant8: 'Плотная чешуйчатая шкура', variant9: 'Нарастающий полный потоп',
        variant10: 'Живучий Разъярённый', variant11: 'Цепкая хозяйская хватка', variant12: 'Потоп и в бездну навсегда',
        variant13: 'Толстая чешуйчатая шкура', variant14: 'Неутомимый Разъярённый', variant15: 'Хозяйская хватка пружинит',
        variant16: 'Меткий гнев', variant17: 'Разъярённая хватка', variant18: 'Хозяйский взгляд реки',
        variant19: 'Полный потоп вмиг', variant20: 'Разъярённый речной дух', variant21: 'Чешуйчатая шкура стойкая',
        variant22: 'Юркий вопреки ярости', variant23: 'Разъярённая стойкость', variant24: 'Чуткая хозяйская хватка',
        variant25: 'Ускользающая ярость', variant26: 'Дикий полный потоп', variant27: 'Мощь гневной мути',
        variant28: 'Полный потоп внезапно', variant29: 'Каменная чешуйчатая шкура', variant30: 'Ярость разрослась',
        variant31: 'Разъярённый рывок', variant32: 'Живучая чешуйчатая шкура', variant33: 'Неутомимый полный потоп',
        variant34: 'Разъярённая прыть', variant35: 'Разъярённая выносливость'
    }
};
