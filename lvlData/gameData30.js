let lvlNumber = 30;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 30 — «Гороховый престол», финал Области III «Плодородные земли».
// Это не пять разных боссов, а один персонаж — Царь Горох — в пяти нарастающих
// обликах (тот же приём, что и Баба-яга на 15-м и Полудница на 25-м; движок
// технически всё равно ждёт структуру из пяти "боссов", но по смыслу это одна
// нарастающая история). Пять обликов — пять РАЗНЫХ понятий, а не просто "злее
// предыдущего" (см. lvlData/Правила создания уровня.txt §1.1, урок с Полудницей):
// ТРОН → ТРЕЩИНА → РАНЫ → ИСКРЫ → ГНЕВ. Каждое понятие даёт свой движковый
// архетип, честно читаемый по картинке (см. правило §12). Имя финального
// облика — «Гневный», НЕ «Истинный»: «Истинная Полудница» на 25-м уже занял
// это слово, повторять эпитет региона-финала нельзя (см. §1.1).
//
// РЕГИОНАЛЬНАЯ МЕХАНИКА «синхронный рывок» здесь достигает кульминации ВСЕЙ
// области (не только уровня): цепочка росла 5→6→7→8 синхронных ударов на
// уровнях 26→27→28→29, здесь она разом скачет до 10 — «Царский залп», вся
// гороховая рать бьёт разом по команде гневного облика короля. Это последний
// и самый большой синхронный приём региона, поэтому у него самый честный из
// всех телеграф на уровне и самая долгая пауза-отдых после него.
//
// РЕВИЗИЯ ПОСЛЕ ПЛЕЙТЕСТА: первая версия боя оказалась слишком лёгкой и
// слишком быстрой для финала области — HP всех пяти обликов поднято на +40%
// через healthMultiplier, темп и давление фаз общего bossCombatConfig.phases
// подтянуты, паузы-отдых между сериями сокращены. Финал региона обязан быть
// испытанием, а не рядовым уровнем — см. §13.1.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.76, damageMultiplier: 1.90, minWaveDelay: 1900, minShotDelay: 132, minTelegraphMs: 500,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 17 },
		{ phase: 2, minHp: 0.30, cadence: 0.76, speed: 1.16, damage: 1.20, telegraphMultiplier: 0.85, surpriseChance: 0.32, maxActiveAttacks: 21 },
		{ phase: 3, minHp: 0.00, cadence: 0.60, speed: 1.30, damage: 1.38, telegraphMultiplier: 0.76, surpriseChance: 0.44, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: {
			movementStyle: 'straight', cadence: 0.95, telegraphMs: 850, speedMultiplier: 0.95, damageMultiplier: 0.85,
			healthMultiplier: 1.50,
			speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18],
			appearMessage: 'ПРЕЗРИТЕЛЬНО СМЕЁТСЯ'
		}, // ЦАРЬ ГОРОХ: THRONE_ROLL — ровные ленивые залпы с трона, самый честный телеграф уровня
		enem2: {
			movementStyle: 'accelerate', cadence: 1.05, telegraphMs: 800, speedMultiplier: 1.00, damageMultiplier: 0.95,
			healthMultiplier: 1.50,
			speedVariance: [0.82, 0.93, 1.05, 1.17, 1.29],
			appearMessage: 'ЯРОСТЬ РВЁТСЯ ЧЕРЕЗ ТРЕЩИНУ'
		}, // ТРЕСНУВШИЙ ЦАРЬ ГОРОХ: CRACK_SHOT — гнев прорывается через трещину ускоряющимися выстрелами
		enem3: {
			movementStyle: 'weave', cadence: 1.10, telegraphMs: 900, speedMultiplier: 0.92, damageMultiplier: 1.05,
			healthMultiplier: 1.50,
			speedVariance: [0.80, 0.90, 1.01, 1.12, 1.23],
			appearMessage: 'В ГНЕВЕ ЗОВЁТ СТРАЖУ'
		}, // ИЗРАНЕННЫЙ ЦАРЬ ГОРОХ: GUARD_VOLLEY — рваные зигзаги гороховой стражи, менее предсказуемые пути
		enem4: {
			movementStyle: 'drift', cadence: 1.00, telegraphMs: 950, speedMultiplier: 0.85, damageMultiplier: 1.20,
			healthMultiplier: 1.50,
			speedVariance: [0.77, 0.87, 0.98, 1.09, 1.20],
			appearMessage: 'ПЫШЕТ ГНЕВНЫМИ ИСКРАМИ'
		}, // ПЫЛАЮЩИЙ ЦАРЬ ГОРОХ: EMBER_DRIFT — тяжёлые сносимые вбок искры, самый долгий честный телеграф уровня
		enem5: {
			movementStyle: 'pause', cadence: 0.82, telegraphMs: 720, speedMultiplier: 1.10, damageMultiplier: 0.82,
			healthMultiplier: 1.50,
			speedVariance: [0.83, 0.96, 1.09, 1.22, 1.35], minFastSideSwitchMs: 850,
			appearMessage: 'ОБЕЗУМЕЛ ОТ ГНЕВА'
		} // ГНЕВНЫЙ ЦАРЬ ГОРОХ: ROYAL_SALUTE — несёт кульминацию региона. Первая версия читалась как
		  // «стена слева + стена справа, блокируется в два действия» — исправлено: залп теперь
		  // катится волной слева направо (нарастающая скорость внутри одной серии, а не единый
		  // синхронный щелчок), а сразу после волны следует нежданчик с короткого телеграфа —
		  // расслабляться после залпа нельзя. См. bossAbilitiesDop combo 6.
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Плодородные земли» пройдена!'
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/3_plod_zemli/lvl30/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/3_plod_zemli/lvl30/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/3_plod_zemli/lvl30/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/3_plod_zemli/lvl30/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/3_plod_zemli/lvl30/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Царь Горох', image: 'images/enemies/regions/3_plod_zemli/lvl30/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 240, xPos: 50, size: '24%',
		deathAnimation: { preset: 'royalCrack', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Треснувший Царь Горох', image: 'images/enemies/regions/3_plod_zemli/lvl30/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 380, xPos: 50, size: '25%',
		deathAnimation: { preset: 'crackShatter', durationMs: 1200 }
	},
	enem3: {
		name: 'enem3', dispName: 'Израненный Царь Горох', image: 'images/enemies/regions/3_plod_zemli/lvl30/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 500, xPos: 50, size: '27%',
		deathAnimation: { preset: 'wornCollapse', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Пылающий Царь Горох', image: 'images/enemies/regions/3_plod_zemli/lvl30/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 640, xPos: 50, size: '28%',
		deathAnimation: { preset: 'emberBurst', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Гневный Царь Горох', image: 'images/enemies/regions/3_plod_zemli/lvl30/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '33%',
		deathAnimation: { preset: 'crownShatter', durationMs: 1800 }
	}
};

const attackDamage = {
	enem1: { light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.28), medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.40), heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.54) },
	enem2: { light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.26), medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.36), heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50) },
	enem3: { light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.52) },
	enem4: { light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.22), medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.32), heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.48) },
	enem5: { light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.58) }
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	// ===== Державный Царь Горох: THRONE_ROLL — ровные ленивые залпы с трона, честный телеграф =====
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 27, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 11 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 15 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //12 редкий тяжёлый залп с трона, самый честный телеграф
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 15, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 19 }, //15 нежданчик: первый намёк, что трон не так уж спокоен

	// ===== Треснувший Царь Горох: CRACK_SHOT — гнев прорывается через трещину ускоряющимися выстрелами =====
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 30, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 10 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 11 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //12 контраст: медленный тяжёлый по центру
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 26 }, //15 нежданчик: самый быстрый прорыв трещины, прямо по центру

	// ===== Израненный Царь Горох: GUARD_VOLLEY — рваные зигзаги гороховой стражи =====
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 24, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 23, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 33, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 13 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 9,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 17, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 20 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22 }, //15 нежданчик: стража рвёт строй, второй тяжёлый сверху

	// ===== Пылающий Царь Горох: EMBER_DRIFT — тяжёлые искры, сносимые вбок, самый долгий телеграф =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22 }, //15 нежданчик высоко

	// ===== Гневный Царь Горох: ROYAL_SALUTE — «Царский залп» катится волной слева направо =====
	// Первая версия делала весь ряд одной customSpeed — залп бился одним синхронным щелчком и
	// читался как «стена слева + стена справа», блокируемая в два действия. Теперь скорость внутри
	// ряда нарастает слева направо (4→9) — залп идёт настоящей прокатывающейся волной, требует
	// непрерывного слежения по всей ширине поля, а не одной реакции на статичные края.
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //0  Труба возвещает (2-sync герольд)
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //1  Труба возвещает (2-sync герольд)
	{ boss: 'enem5', type: 'enem55', xPos: 5,  yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //2  ЦАРСКИЙ ЗАЛП — волна, старт слева, медленнее всех
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //3  Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //4  Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 6 },  //5  Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 6 },  //6  Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 7 },  //7  Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 7 },  //8  Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 8 },  //9  Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 8 },  //10 Царский залп
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 9 },  //11 Царский залп — правый край, самый быстрый в ряду
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 7 },  //12 solo — теперь по-настоящему тяжёлый одиночный удар в центре, честный долгий телеграф
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 22 }, //13 нежданчик: бьёт сразу после волны, асимметрично — не по центру и не по краям
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23 }, //14 второй асимметричный нежданчик
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26 }  //15 финальный самый резкий выстрел, чистый центр
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 340, bossDelayAbDop: 5400 }, // державное спокойствие, самая щедрая передышка первой фазы
	{ boss: 'enem2', bossDelayAb: 240, bossDelayAbDop: 4200 }, // гнев прорывается через трещину
	{ boss: 'enem3', bossDelayAb: 280, bossDelayAbDop: 4700 }, // стража перестраивается
	{ boss: 'enem4', bossDelayAb: 390, bossDelayAbDop: 5900 }, // тяжёлые искры, пауза перед новой волной короче, чем в первой версии боя
	{ boss: 'enem5', bossDelayAb: 190, bossDelayAbDop: 6200 }, // гневный облик: внутри залпа плотно, отдых после него — самый долгий во всей области, но уже не такой щедрый, как в первой версии
];

const bossAbilitiesDop = [
	// Царь Горох
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] }, // ритмическая: ровное нарастание
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem1', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Треснувший Царь Горох
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0, 1] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem2', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Израненный Царь Горох
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 12] },
	{ boss: 'enem3', indexAbilities: [6, 7, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 1, 14, 15] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem3', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11] }, // смешанная поздняя

	// Пылающий Царь Горох
	{ boss: 'enem4', indexAbilities: [0, 2] },
	{ boss: 'enem4', indexAbilities: [1, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 12] },
	{ boss: 'enem4', indexAbilities: [6, 7, 13] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 5] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 2, 10, 11] }, // опасная сигнатурная — same-start с [0,2]
	{ boss: 'enem4', indexAbilities: [0, 2] }, // chunk-break
	{ boss: 'enem4', indexAbilities: [8, 9, 14, 15] }, // смешанная поздняя

	// Гневный Царь Горох — «Царский залп», кульминация всей области III (2-sync герольд → 5-sync строй → 10-sync волна)
	{ boss: 'enem5', indexAbilities: [0, 1] }, // Труба возвещает (2-sync)
	{ boss: 'enem5', indexAbilities: [12] }, // solo — теперь по-настоящему тяжёлый одиночный удар, не пустышка
	{ boss: 'enem5', indexAbilities: [13, 14] }, // асимметричная пара нежданчиков сама по себе — опасность не только по краям поля
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4] }, // Стража строится (5-sync, промежуточная)
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 12] }, // ритмическая: строй → тяжёлый одиночный
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13] }, // ЦАРСКИЙ ЗАЛП + мгновенный нежданчик сразу после волны — расслабляться нельзя (опасная сигнатурная, кульминация области)
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5] }, // chunk-break: обрывается на четверти сигнатурной
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15] }, // смешанная поздняя: герольд + полная волна + оба нежданчика, самая длинная связка во всей игре
];

// Лорные названия связок. Уровень 30 — Царь Горох (одна сущность, 5 нарастающих
// стадий, финал огородной арки): от царственного стручка до гневного истинного
// облика — тот же принцип эскалации, что у Бабы-Яги и Полудницы.
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Гороховый удар', variant2: 'Острый стручок', variant3: 'Гороховая сила',
        variant4: 'Стручковая защита', variant5: 'Бросок горошины', variant6: 'Гороховый сок',
        variant7: 'Гороховая мощь', variant8: 'Плотный стручок', variant9: 'Царственный рывок',
        variant10: 'Живучий Царь Горох', variant11: 'Усик стручка', variant12: 'Бросок и на грядку',
        variant13: 'Толстый стручок', variant14: 'Неутомимый Царь Горох', variant15: 'Пружинистый стручок',
        variant16: 'Меткая горошина', variant17: 'Гороховая хватка', variant18: 'Царственный взгляд',
        variant19: 'Бросок горошины вмиг', variant20: 'Гороховый дух', variant21: 'Стойкий стручок',
        variant22: 'Юркий Царь Горох', variant23: 'Гороховая стойкость', variant24: 'Чуткий усик',
        variant25: 'Ускользающая горошина', variant26: 'Дикий бросок', variant27: 'Мощь сока',
        variant28: 'Царственный рывок внезапно', variant29: 'Каменный стручок', variant30: 'Разросшийся стручок',
        variant31: 'Гороховый рывок', variant32: 'Живучий стручок', variant33: 'Неутомимый рывок',
        variant34: 'Гороховая прыть', variant35: 'Гороховая выносливость'
    },
    enem2: {
        variant1: 'Треснувший удар', variant2: 'Расколотый стручок', variant3: 'Треснувшая сила',
        variant4: 'Надтреснутая защита', variant5: 'Бросок сквозь трещину', variant6: 'Вытекающий сок',
        variant7: 'Треснувшая мощь', variant8: 'Скреплённый стручок', variant9: 'Рывок через трещину',
        variant10: 'Живучий треснувший панцирь', variant11: 'Осколок стручка', variant12: 'Бросок и в щель',
        variant13: 'Треснувшая толщина', variant14: 'Неутомимый треснувший', variant15: 'Пружинящая трещина',
        variant16: 'Меткий осколок', variant17: 'Хватка сквозь трещину', variant18: 'Раскол во взгляде',
        variant19: 'Бросок сквозь трещину вмиг', variant20: 'Дух надлома', variant21: 'Скреплённая стойкость',
        variant22: 'Юркий сквозь трещину', variant23: 'Треснувшая стойкость', variant24: 'Чуткая трещина',
        variant25: 'Ускользающий осколок', variant26: 'Дикий раскол', variant27: 'Мощь вытекающего сока',
        variant28: 'Рывок сквозь трещину внезапно', variant29: 'Каменный раскол', variant30: 'Разросшаяся трещина',
        variant31: 'Треснувший рывок', variant32: 'Живучий скреплённый панцирь', variant33: 'Неутомимый раскол',
        variant34: 'Треснувшая прыть', variant35: 'Треснувшая выносливость'
    },
    enem3: {
        variant1: 'Израненный удар', variant2: 'Зазубренный осколок', variant3: 'Израненная сила',
        variant4: 'Перевязанная защита', variant5: 'Удар сквозь рану', variant6: 'Кровоточащий сок',
        variant7: 'Израненная мощь', variant8: 'Перевязанный панцирь', variant9: 'Яростный рывок раненого',
        variant10: 'Живучий вопреки ранам', variant11: 'Зазубренный осколок-крюк', variant12: 'Удар и в кровь',
        variant13: 'Толстая повязка', variant14: 'Неутомимый вопреки ранам', variant15: 'Пружинящая боль',
        variant16: 'Меткая зазубрина', variant17: 'Хватка сквозь боль', variant18: 'Яростный взгляд раненого',
        variant19: 'Удар сквозь рану вмиг', variant20: 'Дух раненого воина', variant21: 'Перевязка держится',
        variant22: 'Юркий несмотря на раны', variant23: 'Израненная стойкость', variant24: 'Чуткость к боли',
        variant25: 'Ускользающий раненый', variant26: 'Дикая ярость раненого', variant27: 'Мощь кровоточащего сока',
        variant28: 'Яростный рывок внезапно', variant29: 'Каменная перевязка', variant30: 'Разросшаяся рана',
        variant31: 'Израненный рывок', variant32: 'Живучая повязка', variant33: 'Ярость раненого вновь',
        variant34: 'Израненная прыть', variant35: 'Израненная выносливость'
    },
    enem4: {
        variant1: 'Пылающий удар', variant2: 'Огненный осколок', variant3: 'Пылающая сила',
        variant4: 'Обугленная защита', variant5: 'Огненный бросок', variant6: 'Кипящий гороховый сок',
        variant7: 'Пылающая мощь', variant8: 'Раскалённый панцирь', variant9: 'Огненный рывок',
        variant10: 'Живучее пламя', variant11: 'Раскалённый осколок', variant12: 'Бросок и в пекло',
        variant13: 'Пылающая толщина', variant14: 'Неутомимое пламя', variant15: 'Пружинящий огонь',
        variant16: 'Меткий уголь', variant17: 'Пылающая хватка', variant18: 'Испепеляющий взгляд',
        variant19: 'Огненный бросок вмиг', variant20: 'Дух пламени', variant21: 'Обугленность стойка к огню',
        variant22: 'Юркое пламя', variant23: 'Пылающая стойкость', variant24: 'Чуткая к искре',
        variant25: 'Ускользающее пламя', variant26: 'Дикий огонь', variant27: 'Кипящая мощь',
        variant28: 'Огненный рывок внезапно', variant29: 'Каменное пламя', variant30: 'Разросшийся пожар',
        variant31: 'Пылающий рывок', variant32: 'Живучий раскалённый панцирь', variant33: 'Неутомимый пожар',
        variant34: 'Пылающая прыть', variant35: 'Пылающая выносливость'
    },
    enem5: {
        variant1: 'Гневный удар', variant2: 'Осколок ярости', variant3: 'Гневная сила',
        variant4: 'Ярость-защита', variant5: 'Смертельный бросок', variant6: 'Кипящая ярость',
        variant7: 'Гневная мощь', variant8: 'Панцирь ярости', variant9: 'Всесокрушающий рывок',
        variant10: 'Неубиваемый гнев', variant11: 'Хватка ярости', variant12: 'Бросок и в бурю гнева',
        variant13: 'Несокрушимая толщина', variant14: 'Вечный гнев', variant15: 'Последний рывок',
        variant16: 'Смертельный осколок', variant17: 'Хватка неудержимого гнева', variant18: 'Взгляд ярости',
        variant19: 'Гибель от гнева вмиг', variant20: 'Дух ярости царя', variant21: 'Неуязвимая ярость',
        variant22: 'Юркий в неистовстве', variant23: 'Гневная стойкость', variant24: 'Чуткость к неповиновению',
        variant25: 'Ускользающая ярость', variant26: 'Апокалиптический гнев', variant27: 'Мощь кипящей ярости',
        variant28: 'Гибель от гнева внезапно', variant29: 'Каменная ярость', variant30: 'Бездонный гнев',
        variant31: 'Гневный рывок', variant32: 'Живучая несокрушимая ярость', variant33: 'Вечный гнев вновь',
        variant34: 'Гневная прыть', variant35: 'Гневная выносливость'
    }
};
