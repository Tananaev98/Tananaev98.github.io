let lvlNumber = 36;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 36 — «Хищница глубин», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом (рыбы-гуманоиды).
// 'wave' у трёх: Серебрянка мечется мелкой блестящей волной, Полосатик держит
// среднюю уверенную волну, Усач тяжело переваливается широкой донной волной.
// Красноплав — не-wave (accelerate): круглый и юркий, бьёт короткими разгонными
// бросками, а не колебанием. Зубарь (финал, щука) — lateRush: долгая неподвижная
// засада и внезапный хищный рывок — вместо волны честная прямая атака из засады.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.86, damageMultiplier: 2.17, minWaveDelay: 2020, minShotDelay: 140, minTelegraphMs: 520,
	phases: [
		{ phase: 1, minHp: 0.633, cadence: 1.018, speed: 1.016, damage: 1, telegraphMultiplier: 0.983, surpriseChance: 0.156, maxActiveAttacks: 17 },
		{ phase: 2, minHp: 0.283, cadence: 0.81, speed: 1.159, damage: 1.18, telegraphMultiplier: 0.869, surpriseChance: 0.29, maxActiveAttacks: 21 },
		{ phase: 3, minHp: 0, cadence: 0.66, speed: 1.28, damage: 1.32, telegraphMultiplier: 0.79, surpriseChance: 0.4, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { combatIdentity: "Серебряный переброс", combatTrick: "Медленный блеск справа появляется раньше быстрых перебросов между краями. Часть быстрых ударов его обгоняет: нельзя отбивать всю серию по появлению или забыть последний возврат после короткого блика.", signatureEvery: 4, movementStyle: 'wave', cadence: 1.054, telegraphMs: 810, speedMultiplier: 0.997, damageMultiplier: 0.87, speedVariance: [1.02, 1.04, 1.06, 1.08, 1.1] },
		enem2: { combatIdentity: "Парный разгон", combatTrick: "Два левых выпада разгоняются перед правым ответом и левым продолжением. Ранний перенос вправо оставляет второй левый удар, а медленная правая угроза вынуждает отдельно перечитать очередь прилёта.", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.98, telegraphMs: 762, speedMultiplier: 0.986, damageMultiplier: 0.96, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem3: { combatIdentity: "Колючий перебой", combatTrick: "Удары чередуют левую сторону и правую середину с разными паузами; одна длинная серия заменяет чередование двумя левыми до и после правого. Равномерный перенос прицела по выученному ритму оставляет повторный удар.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.94, telegraphMs: 850, speedMultiplier: 1.103, damageMultiplier: 1.04, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "Усатое закрытие", combatTrick: "После правого вступления сом даёт два левых удара и возврат к правой середине. Последняя длинная серия меняет акцент на два правых, левый и правое продолжение. Нельзя завершать защиту после первой знакомой пары.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.898, telegraphMs: 940, speedMultiplier: 1.048, damageMultiplier: 1.16, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "Зубастый обратный рывок", combatTrick: "Левый бросок сменяется двумя ударами правой середины и левым возвратом; длинные серии требуют ещё одного правого ответа. Поздний рывок меняет срочность медленной правой приманки: начальная скорость не показывает, что отбивать следующим.", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.802, telegraphMs: 1001, speedMultiplier: 1.097, damageMultiplier: 1.08, speedVariance: [1.112, 1.127, 1.142, 1.157, 1.172] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl36/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl36/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl36/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl36/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl36/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Серебрянка', image: 'images/enemies/regions/4_rech_ozer/lvl36/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 300, xPos: 50, size: '23%',
		deathAnimation: { preset: 'scaleFlash', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Красноплав', image: 'images/enemies/regions/4_rech_ozer/lvl36/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 440, xPos: 50, size: '24%',
		deathAnimation: { preset: 'finCrumple', durationMs: 1200 }
	},
	enem3: {
		name: 'enem3', dispName: 'Полосатик', image: 'images/enemies/regions/4_rech_ozer/lvl36/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 560, xPos: 50, size: '26%',
		deathAnimation: { preset: 'stripeFade', durationMs: 1350 }
	},
	enem4: {
		name: 'enem4', dispName: 'Усач', image: 'images/enemies/regions/4_rech_ozer/lvl36/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 700, xPos: 50, size: '29%',
		deathAnimation: { preset: 'heavySink', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Зубарь', image: 'images/enemies/regions/4_rech_ozer/lvl36/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'jawSnapFade', durationMs: 1550 }
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
let timeNextBoss = 6;
const bossInterval = 8;

const bossAbilities = [
	// ===== Серебрянка =====
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.06, waveFrequency: 2.6, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 2.15, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.65, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 1.65, wavePhase: 0 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 1.65, wavePhase: 0 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.06, waveFrequency: 2.6, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 2.15, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 2.15, wavePhase: 0 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 7.06, waveFrequency: 2.15, wavePhase: 0 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.65, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 2.6, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 2.15, wavePhase: 0 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 1.65, wavePhase: 0.5 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.06, waveFrequency: 1.2, wavePhase: 1.1 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 2.6, wavePhase: 0.3 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 2.6, wavePhase: 0 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 7.06, waveFrequency: 2.15, wavePhase: 1.1 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.65, wavePhase: 0.3 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.65, wavePhase: 0 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 1.2, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 2.6, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 2.15, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 7.06, waveFrequency: 1.65, wavePhase: 0 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.2, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 2.6, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 2.15, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 2.15, wavePhase: 0 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.65, wavePhase: 1.1 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.06, waveFrequency: 1.2, wavePhase: 0.3 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.2, wavePhase: 0 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 2.6, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.06, waveFrequency: 2.15, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.65, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 42, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.06, waveFrequency: 2.6, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 2.15, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.65, wavePhase: 0.3 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 1.65, wavePhase: 0 }, // 40 h

	// ===== Красноплав =====
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 31, customHP: 1, customDamage: 31, customSpeed: 5 }, // 35 h
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14.5 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 12.5 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13.5 }, // 39 h

	// ===== Полосатик =====
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 5.09, waveFrequency: 1.19, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.55, waveFrequency: 2.21, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 8.05, waveFrequency: 1.86, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 1.52, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.55, waveFrequency: 1.52, wavePhase: 0 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 8.05, waveFrequency: 1.52, wavePhase: 0 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.09, waveFrequency: 1.19, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.55, waveFrequency: 2.21, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.05, waveFrequency: 1.86, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 1.86, wavePhase: 0 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 6.55, waveFrequency: 1.86, wavePhase: 0 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 1.52, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.09, waveFrequency: 1.19, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.55, waveFrequency: 2.21, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.05, waveFrequency: 2.21, wavePhase: 0 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 5.09, waveFrequency: 2.21, wavePhase: 0 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.55, waveFrequency: 1.86, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 8.05, waveFrequency: 1.52, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 1.19, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.55, waveFrequency: 1.19, wavePhase: 0 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 2.21, wavePhase: 0.5 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 5.09, waveFrequency: 1.52, wavePhase: 0 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.55, waveFrequency: 1.19, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 8.05, waveFrequency: 2.21, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 1.86, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.55, waveFrequency: 1.86, wavePhase: 0 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 8.05, waveFrequency: 1.86, wavePhase: 0 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.09, waveFrequency: 1.52, wavePhase: 0.5 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.55, waveFrequency: 1.19, wavePhase: 1.1 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.05, waveFrequency: 2.21, wavePhase: 0.3 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 2.21, wavePhase: 0 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 6.55, waveFrequency: 2.21, wavePhase: 0 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 1.86, wavePhase: 0.5 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.09, waveFrequency: 1.52, wavePhase: 1.1 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.55, waveFrequency: 1.19, wavePhase: 0.3 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.05, waveFrequency: 1.19, wavePhase: 0 }, // 35 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.09, waveFrequency: 2.21, wavePhase: 0.5 }, // 36 g
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 6.55, waveFrequency: 1.52, wavePhase: 0 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 1.19, wavePhase: 0.5 }, // 38 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.09, waveFrequency: 2.21, wavePhase: 1.1 }, // 39 h
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.55, waveFrequency: 1.86, wavePhase: 0.3 }, // 40 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.05, waveFrequency: 1.86, wavePhase: 0 }, // 41 h

	// ===== Усач =====
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 0.39, wavePhase: 0 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 1.2, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.91, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 5.07, waveFrequency: 0.67, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 0.67, wavePhase: 0 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 10.06, waveFrequency: 0.67, wavePhase: 0 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 0.39, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 1.2, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 10.06, waveFrequency: 0.91, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 0.91, wavePhase: 0 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 0.91, wavePhase: 0 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.67, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 0.39, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 7.56, waveFrequency: 1.2, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 1.2, wavePhase: 0 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 0.91, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.67, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 5.07, waveFrequency: 0.39, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 0.39, wavePhase: 0 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 10.06, waveFrequency: 0.39, wavePhase: 0 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 0.91, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 10.06, waveFrequency: 0.67, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 0.67, wavePhase: 0 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 0.67, wavePhase: 0 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.39, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 7.56, waveFrequency: 0.91, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.91, wavePhase: 0 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 0.91, wavePhase: 0 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 0.67, wavePhase: 0.5 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.39, wavePhase: 1.1 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0.3 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 1.2, wavePhase: 0 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 10.06, waveFrequency: 1.2, wavePhase: 0 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 0.91, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 0.67, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16, waveAmplitude: 10.06, waveFrequency: 0.39, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 0.39, wavePhase: 0 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 1.2, wavePhase: 0.5 }, // 40 h

	// ===== Зубарь =====
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 36 g
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 32, customHP: 1, customDamage: 45, customSpeed: 5 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15.5 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 39 h
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16.5 }, // 40 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 168, bossDelayAbDop: 6803, firstWaveDelayMs: 2208 }, // 
	{ boss: 'enem2', bossDelayAb: 162, bossDelayAbDop: 6803, firstWaveDelayMs: 2164 }, // 
	{ boss: 'enem3', bossDelayAb: 163, bossDelayAbDop: 6796, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 162, bossDelayAbDop: 6797, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 162, bossDelayAbDop: 8000, firstWaveDelayMs: 2400 }, // 
];

const bossAbilitiesDop = [
	// Серебрянка
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 300, 300], openingOrder: 0, label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 300, 300, 300], label: "Справа, медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13], shotGapsMs: [0, 0, 300], label: "Справа, медленный справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17, 18], shotGapsMs: [0, 300, 300, 300], label: "Справа, медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23, 24], shotGapsMs: [300, 0, 300, 300, 300], label: "Медленный справа, слева, дважды справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 300, 300], openingOrder: 1, label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 600, 300, 300, 300], label: "Справа, медленный справа, слева, справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 300, 300], label: "Справа, медленный справа, слева, справа и слева" },

	// Красноплав
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 300, 300], openingOrder: 0, label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 0, 300, 300], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [300, 300, 0, 300], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [300, 300, 0, 300], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [0, 300, 600, 0], label: "Дважды слева, медленный справа, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 0, 300], openingOrder: 1, label: "Дважды слева, в центр, слева и медленный справа" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 0, 300], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 300, 300], label: "Дважды слева, в центр, медленный справа и слева" },

	// Полосатик
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 600, 600], openingOrder: 0, label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 300, 600, 300], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 600, 600, 0], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [300, 0, 600, 0, 600], label: "Дважды слева, медленный справа, в центр и дважды слева" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [0, 600, 600, 0], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 600, 600], openingOrder: 1, label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [31, 32, 33, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 600, 0, 0], label: "Слева, медленный справа, в центр, слева, в центр и слева" },
	{ boss: 'enem3', indexAbilities: [37, 38, 39, 40, 41], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 600, 300], label: "Слева, в центр, медленный справа, слева и в центр" },

	// Усач
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 600, 0, 300], label: "В центр, медленный справа, дважды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 300, 300, 300], openingOrder: 0, label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [600, 600, 0, 300], label: "В центр, медленный справа, дважды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [600, 600, 0, 300], label: "В центр, медленный справа, дважды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [600, 600, 0, 300], label: "В центр, медленный справа, дважды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 300, 300], openingOrder: 1, label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 0, 600], label: "В центр, дважды слева, медленный справа и в центр" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 600, 300, 0, 0], label: "В центр, медленный справа, в центр, слева и два в центр" },

	// Зубарь
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 300, 0, 600], openingOrder: 0, label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [600, 300, 300, 0], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [0, 0, 600, 300, 300], label: "Слева, два в центр, слева, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [600, 300, 300, 0], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [600, 0, 0, 300], label: "Слева, два в центр, слева и медленный справа" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 600, 600, 0, 0], openingOrder: 1, label: "Слева, в центр, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem5', indexAbilities: [32, 33, 2, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 600, 0, 300, 300], label: "Слева, два в центр, слева, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [37, 38, 2, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 0, 300], label: "Слева, два в центр, слева и медленный справа" },

];

// Лорные названия связок. Уровень 36 — рыбий косяк: Серебрянка (уклейка), Красноплав
// (краснопёрка), Полосатик (окунь), Усач (сом), Зубарь (щука, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Серебристый удар', variant2: 'Острый плавник', variant3: 'Серебристая сила',
        variant4: 'Блестящая чешуя', variant5: 'Блестящая волна', variant6: 'Речная соль',
        variant7: 'Серебристая мощь', variant8: 'Плотная чешуя', variant9: 'Мелкая блестящая волна',
        variant10: 'Живучая Серебрянка', variant11: 'Цепкий плавник', variant12: 'Волна и на глубину',
        variant13: 'Толстая чешуя', variant14: 'Неутомимая Серебрянка', variant15: 'Пружинистый плавник',
        variant16: 'Меткая чешуйка', variant17: 'Серебристая хватка', variant18: 'Блестящий взгляд',
        variant19: 'Блестящая волна вмиг', variant20: 'Речной дух', variant21: 'Стойкая чешуя',
        variant22: 'Юркая Серебрянка', variant23: 'Серебристая стойкость', variant24: 'Чуткий плавник',
        variant25: 'Ускользающий блеск', variant26: 'Дикая волна', variant27: 'Мощь соли',
        variant28: 'Блестящая волна внезапно', variant29: 'Каменная чешуя', variant30: 'Разросшийся блеск',
        variant31: 'Серебристый рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая волна',
        variant34: 'Серебристая прыть', variant35: 'Серебристая выносливость'
    },
    enem2: {
        variant1: 'Алоплавниковый удар', variant2: 'Красный плавник', variant3: 'Алоплавниковая сила',
        variant4: 'Красная чешуя', variant5: 'Разгонный бросок', variant6: 'Рыбья кровь',
        variant7: 'Алоплавниковая мощь', variant8: 'Плотная красная чешуя', variant9: 'Короткий разгонный бросок',
        variant10: 'Живучий Красноплав', variant11: 'Цепкий красный плавник', variant12: 'Бросок и на глубину',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Красноплав', variant15: 'Красный плавник пружинит',
        variant16: 'Меткий бросок', variant17: 'Алоплавниковая хватка', variant18: 'Алый взгляд',
        variant19: 'Разгонный бросок вмиг', variant20: 'Кровавый речной дух', variant21: 'Стойкая красная чешуя',
        variant22: 'Юркий Красноплав', variant23: 'Алоплавниковая стойкость', variant24: 'Чуткий красный плавник',
        variant25: 'Ускользающий разгон', variant26: 'Дикий бросок', variant27: 'Мощь крови',
        variant28: 'Разгонный бросок внезапно', variant29: 'Каменная красная чешуя', variant30: 'Плавник разросся',
        variant31: 'Алоплавниковый рывок', variant32: 'Живучая красная чешуя', variant33: 'Неутомимый разгон',
        variant34: 'Алоплавниковая прыть', variant35: 'Алоплавниковая выносливость'
    },
    enem3: {
        variant1: 'Полосатый удар', variant2: 'Колючий плавник', variant3: 'Полосатая сила',
        variant4: 'Полосатая чешуя', variant5: 'Уверенная волна', variant6: 'Колючая слизь',
        variant7: 'Полосатая мощь', variant8: 'Плотная полосатая чешуя', variant9: 'Средняя уверенная волна',
        variant10: 'Живучий Полосатик', variant11: 'Колючий плавник-крюк', variant12: 'Волна и в камыш',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Полосатик', variant15: 'Колючий плавник пружинит',
        variant16: 'Меткий колючий шип', variant17: 'Полосатая хватка', variant18: 'Уверенный взгляд',
        variant19: 'Уверенная волна вмиг', variant20: 'Полосатый дух', variant21: 'Полосатая чешуя стойка',
        variant22: 'Юркий Полосатик', variant23: 'Полосатая стойкость', variant24: 'Чуткий колючий плавник',
        variant25: 'Ускользающая волна', variant26: 'Дикая полосатая волна', variant27: 'Мощь слизи',
        variant28: 'Уверенная волна внезапно', variant29: 'Каменная полосатая чешуя', variant30: 'Полосы разрослись',
        variant31: 'Полосатый рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая волна',
        variant34: 'Полосатая прыть', variant35: 'Полосатая выносливость'
    },
    enem4: {
        variant1: 'Усатый удар', variant2: 'Ус-хлыст', variant3: 'Усатая сила',
        variant4: 'Илистая кожа', variant5: 'Тяжёлый навал', variant6: 'Донный ил',
        variant7: 'Усатая мощь', variant8: 'Прочная илистая кожа', variant9: 'Тяжёлая широкая донная волна',
        variant10: 'Живучий Усач', variant11: 'Цепкий ус', variant12: 'Навал и в тину',
        variant13: 'Толстая кожа', variant14: 'Неутомимый Усач', variant15: 'Пружинистый ус',
        variant16: 'Ус-хлыст вмиг', variant17: 'Усатая хватка', variant18: 'Донный взгляд',
        variant19: 'Тяжёлый навал мгновенно', variant20: 'Донный дух', variant21: 'Илистая кожа стойка',
        variant22: 'Юркий вопреки размеру', variant23: 'Усатая стойкость', variant24: 'Чуткий ус',
        variant25: 'Ускользающий в тину', variant26: 'Дикий навал', variant27: 'Мощь ила',
        variant28: 'Донная волна внезапно', variant29: 'Каменная кожа', variant30: 'Усы разрослись',
        variant31: 'Усатый рывок', variant32: 'Живучая кожа', variant33: 'Неутомимая донная волна',
        variant34: 'Усатая прыть', variant35: 'Усатая выносливость'
    },
    enem5: {
        variant1: 'Зубастый удар', variant2: 'Ряд зубов', variant3: 'Зубастая сила',
        variant4: 'Пятнистая защита', variant5: 'Хищный рывок', variant6: 'Хищная слюна',
        variant7: 'Зубастая мощь', variant8: 'Пятнистая чешуя', variant9: 'Засада и хищный рывок',
        variant10: 'Живучий Зубарь', variant11: 'Цепкий ряд зубов', variant12: 'Рывок и в глубину',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Зубарь', variant15: 'Хищный рывок пружинит',
        variant16: 'Меткий зуб', variant17: 'Зубастая хватка', variant18: 'Хищный неподвижный взгляд',
        variant19: 'Хищный рывок вмиг', variant20: 'Хищный дух', variant21: 'Пятнистая чешуя стойка',
        variant22: 'Юркий Зубарь', variant23: 'Зубастая стойкость', variant24: 'Чуткий ряд зубов',
        variant25: 'Ускользающий хищный рывок', variant26: 'Дикая засада', variant27: 'Мощь слюны',
        variant28: 'Рывок после засады внезапно', variant29: 'Каменная чешуя', variant30: 'Засада разрослась',
        variant31: 'Зубастый рывок', variant32: 'Живучая пятнистая чешуя', variant33: 'Неутомимая засада',
        variant34: 'Зубастая прыть', variant35: 'Зубастая выносливость'
    }
};
