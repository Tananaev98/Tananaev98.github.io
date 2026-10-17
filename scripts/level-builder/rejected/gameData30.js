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
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.76, damageMultiplier: 1.9, minWaveDelay: 3300, minShotDelay: 127, minTelegraphMs: 499,
	phases: [
		{ phase: 1, minHp: 0.643, cadence: 0.987, speed: 1.012, damage: 1, telegraphMultiplier: 1.014, surpriseChance: 0.163, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.293, cadence: 0.76, speed: 1.161, damage: 1.2, telegraphMultiplier: 0.851, surpriseChance: 0.321, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0, cadence: 0.6, speed: 1.301, damage: 1.38, telegraphMultiplier: 0.761, surpriseChance: 0.441, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'straight', cadence: 0.953, telegraphMs: 852, speedMultiplier: 1.002, damageMultiplier: 0.85, speedVariance: [1.03, 1.055, 1.08, 1.105, 1.13], healthMultiplier: 1.5, appearMessage: "ПРЕЗРИТЕЛЬНО СМЕЁТСЯ" },
		enem2: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.048, telegraphMs: 801, speedMultiplier: 1.049, damageMultiplier: 0.95, speedVariance: [1, 1.03, 1.06, 1.09, 1.12], healthMultiplier: 1.5, appearMessage: "ЯРОСТЬ РВЁТСЯ ЧЕРЕЗ ТРЕЩИНУ" },
		enem3: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'weave', cadence: 1.098, telegraphMs: 900, speedMultiplier: 1.201, damageMultiplier: 1.05, speedVariance: [1.05, 1.075, 1.1, 1.13, 1.16], healthMultiplier: 1.5, appearMessage: "В ГНЕВЕ ЗОВЁТ СТРАЖУ" },
		enem4: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'drift', cadence: 1, telegraphMs: 950, speedMultiplier: 1.001, damageMultiplier: 1.2, speedVariance: [1.03, 1.05, 1.07, 1.09, 1.11], healthMultiplier: 1.5, appearMessage: "ПЫШЕТ ГНЕВНЫМИ ИСКРАМИ" },
		enem5: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'pause', cadence: 0.821, telegraphMs: 720, speedMultiplier: 1.102, damageMultiplier: 0.82, speedVariance: [1, 1.03, 1.06, 1.09, 1.12], healthMultiplier: 1.5, appearMessage: "ОБЕЗУМЕЛ ОТ ГНЕВА" }
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
let timeNextBoss = 12;
const bossInterval = 7;

const bossAbilities = [
	// ===== Царь Горох =====
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 40 h

	// ===== Треснувший Царь Горох =====
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 19 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 20 g
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 22 h
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 23 h
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 24 h

	// ===== Израненный Царь Горох =====
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 35 g
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 38 h

	// ===== Пылающий Царь Горох =====
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 42, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 34 h

	// ===== Гневный Царь Горох =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 36 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 37 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 38 g
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 39 h
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 40 h
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 41 h
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 42 h
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 43 h
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 44 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 18 }, // 45 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 46 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 165, bossDelayAbDop: 8600, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 161, bossDelayAbDop: 7300, firstWaveDelayMs: 2318 }, // 
	{ boss: 'enem3', bossDelayAb: 170, bossDelayAbDop: 7300, firstWaveDelayMs: 2383 }, // 
	{ boss: 'enem4', bossDelayAb: 151, bossDelayAbDop: 7200, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 202, bossDelayAbDop: 11400, firstWaveDelayMs: 2400 }, // 
];

const bossAbilitiesDop = [
	// Царь Горох
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 600, 0, 600], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8], shotGapsMs: [300, 300, 0] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [0, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17, 18], shotGapsMs: [600, 0, 0, 300] },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [600, 600, 0, 0, 600, 0] },
	{ boss: 'enem1', indexAbilities: [26, 1, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 600, 760, 0], openingOrder: 1, label: "Ягода срывается с ветки — знакомство" },
	{ boss: 'enem1', indexAbilities: [30, 1, 31, 7, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 0, 760, 0, 300], label: "Ягода срывается с ветки — иной конец" },
	{ boss: 'enem1', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 760, 0, 0], label: "Ягода срывается с ветки — завершение" },

	// Треснувший Царь Горох
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 600, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 300] },
	{ boss: 'enem2', indexAbilities: [9, 10, 2, 11, 3, 2], shotGapsMs: [300, 600, 300, 300, 300] },
	{ boss: 'enem2', indexAbilities: [12, 2, 3, 2, 13], shotGapsMs: [0, 0, 300, 0] },
	{ boss: 'enem2', indexAbilities: [14, 2, 3, 15, 16, 4], shotGapsMs: [0, 0, 600, 0, 0] },
	{ boss: 'enem2', indexAbilities: [17, 1, 18, 2, 3], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 600, 0], openingOrder: 1, label: "Шип после ягодки — знакомство" },
	{ boss: 'enem2', indexAbilities: [19, 20, 2, 3, 21], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 0, 600], label: "Шип после ягодки — иной конец" },
	{ boss: 'enem2', indexAbilities: [22, 1, 2, 3, 23, 24, 2], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 600, 300, 0, 300, 0], label: "Шип после ягодки — завершение" },

	// Израненный Царь Горох
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 0, 600], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [600, 300, 0, 300] },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12, 13, 14], shotGapsMs: [600, 300, 300, 300, 300] },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [300, 600, 600, 0, 600] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [0, 0, 0, 300] },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 0], openingOrder: 1, label: "Гроздь рассыпается — знакомство" },
	{ boss: 'enem3', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 0, 0, 0], label: "Гроздь рассыпается — иной конец" },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 5, 7, 17], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 600, 0, 0], label: "Гроздь рассыпается — завершение" },

	// Пылающий Царь Горох
	{ boss: 'enem4', indexAbilities: [0, 1, 2], shotGapsMs: [600, 0] },
	{ boss: 'enem4', indexAbilities: [3, 4, 5, 6], shotGapsMs: [300, 0, 600], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 9], shotGapsMs: [0, 0, 600, 300] },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [600, 300, 300, 300] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [300, 0, 300, 600] },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600], openingOrder: 1, label: "Сетка кожуры рвётся — знакомство" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 300, 300], label: "Сетка кожуры рвётся — иной конец" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 9, 34], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 600, 0], label: "Сетка кожуры рвётся — завершение" },

	// Гневный Царь Горох
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 300, 300] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13, 14], shotGapsMs: [0, 300, 300, 600, 300] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [0, 0, 0, 300, 600] },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [0, 0, 300, 0] },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 0, 0, 300], openingOrder: 1, label: "Полосатый раскат — знакомство" },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37, 38], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 300, 600, 300, 300], label: "Полосатый раскат — иной конец" },
	{ boss: 'enem5', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 1, 46], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 0, 0, 0, 300, 0, 0], label: "Полосатый раскат — завершение" },

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
