let lvlNumber = 20;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 20 — «Сердце полей», область II «Золотые поля».
// Пять архетипов: колючие удары с одного бока за раз / симметричные вспышки
// улыбки с флангов / редкие горькие уколы с долгой паузой / давление снизу
// вспугнутого перепела / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.871, damageMultiplier: 1.656, minWaveDelay: 2803, minShotDelay: 141, minTelegraphMs: 536,
	phases: [
		{ phase: 1, minHp: 0.648, cadence: 1.007, speed: 1.005, damage: 1, telegraphMultiplier: 0.993, surpriseChance: 0.149, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.298, cadence: 0.819, speed: 1.112, damage: 1.16, telegraphMultiplier: 0.889, surpriseChance: 0.261, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0, cadence: 0.691, speed: 1.199, damage: 1.28, telegraphMultiplier: 0.819, surpriseChance: 0.361, maxActiveAttacks: 25 }
	],
	bosses: {
		enem1: { combatIdentity: "Колючий обмах василька", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'drift', cadence: 1.018, telegraphMs: 803, speedMultiplier: 0.961, damageMultiplier: 0.95, speedVariance: [0.86, 0.94, 1.02, 1.1, 1.18] },
		enem2: { combatIdentity: "Лепестки и зубы", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'straight', cadence: 0.898, telegraphMs: 740, speedMultiplier: 1.059, damageMultiplier: 0.9, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] },
		enem3: { combatIdentity: "Горький сок", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.182, telegraphMs: 970, speedMultiplier: 0.852, damageMultiplier: 1.17, speedVariance: [0.76, 0.86, 0.98, 1.1, 1.22] },
		enem4: { combatIdentity: "Вспугнутый перепел", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.79, telegraphMs: 622, speedMultiplier: 1.161, damageMultiplier: 0.68, speedVariance: [0.89, 1.02, 1.15, 1.28, 1.41] },
		enem5: { combatIdentity: "Полевой круг с разрывом", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'pause', cadence: 0.74, telegraphMs: 630, speedMultiplier: 1.13, damageMultiplier: 1.08, speedVariance: [0.83, 0.96, 1.09, 1.22, 1.35] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl20/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Колючень',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Белозубка',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Горчак',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Клохтун',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Полевик',
		image: 'images/enemies/regions/2_zolot_polya/lvl20/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '30%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

const attackDamage = {
	enem1: {
		light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.34),
		medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.46),
		heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.58)
	},
	enem2: {
		light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.28),
		medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.38),
		heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50)
	},
	enem3: {
		light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.30),
		medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.40),
		heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.48)
	},
	enem4: {
		light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.24),
		medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.33),
		heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.42)
	},
	enem5: {
		light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.26),
		medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.36),
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.62)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 16;
const bossInterval = 6;

const bossAbilities = [
	// ===== Колючень =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 37, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 29, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 17 e
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 27 g
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 30 h
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 31 h
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 32 h
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 33 h

	// ===== Белозубка =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 23 f
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 24 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 27 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 28 g
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 29 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 30 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 31 h
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 32 h
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 33 h
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 34 h

	// ===== Горчак =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 30 h
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 31 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 24 }, // 32 h

	// ===== Клохтун =====
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 37, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 36, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 63, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 37, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 34 h

	// ===== Полевик =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 41, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 49, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 61, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 50, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 50, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 31 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 206, bossDelayAbDop: 5522, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 285, bossDelayAbDop: 4853, firstWaveDelayMs: 2329 }, // 
	{ boss: 'enem3', bossDelayAb: 178, bossDelayAbDop: 5866, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 237, bossDelayAbDop: 5233, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 252, bossDelayAbDop: 4831, firstWaveDelayMs: 2318 }, // 
];

const bossAbilitiesDop = [
	// Колючень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Колючий обмах василька — знакомство" },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [250, 550, 250, 250], label: "Колючий обмах василька — иной конец" },
	{ boss: 'enem1', indexAbilities: [29, 30, 31, 32, 33], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 250, 250, 550], label: "Колючий обмах василька — завершение" },

	// Белозубка
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Лепестки и зубы — знакомство" },
	{ boss: 'enem2', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 2, recoveryMs: 650, label: "Лепестки и зубы — иной конец" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 3, recoveryMs: 950, label: "Лепестки и зубы — завершение" },

	// Горчак
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Горький сок — знакомство" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Горький сок — иной конец" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, label: "Горький сок — завершение" },

	// Клохтун
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Вспугнутый перепел — знакомство" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 2, recoveryMs: 650, label: "Вспугнутый перепел — иной конец" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 3, recoveryMs: 950, label: "Вспугнутый перепел — завершение" },

	// Полевик
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Полевой круг с разрывом — знакомство" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Полевой круг с разрывом — иной конец" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "Полевой круг с разрывом — завершение" },

];

// Лорные названия связок. Уровень 20 — завершение полевой арки: Колючень (репейник),
// Белозубка (землеройка), Горчак (полынь), Клохтун (вспугнутый перепел), Полевик
// (хозяин поля, финал арки).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Колкий удар', variant2: 'Острая колючка', variant3: 'Колючая сила',
        variant4: 'Шипастая защита', variant5: 'Укол сбоку', variant6: 'Сок колючки',
        variant7: 'Колючая мощь', variant8: 'Плотные шипы', variant9: 'Односторонний укол',
        variant10: 'Живучий Колючень', variant11: 'Цепкие шипы', variant12: 'Укол и в бурьян',
        variant13: 'Толстые шипы', variant14: 'Неутомимый Колючень', variant15: 'Пружинистые колючки',
        variant16: 'Меткий шип', variant17: 'Колючая хватка', variant18: 'Колкий взгляд',
        variant19: 'Укол сбоку вмиг', variant20: 'Бурьянный дух', variant21: 'Стойкие шипы',
        variant22: 'Юркий Колючень', variant23: 'Колючая стойкость', variant24: 'Чуткие шипы',
        variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Мощь сока',
        variant28: 'Внезапный укол сбоку', variant29: 'Каменные шипы', variant30: 'Разросшиеся шипы',
        variant31: 'Колючий рывок', variant32: 'Живучие шипы', variant33: 'Бок укола вновь',
        variant34: 'Колючая прыть', variant35: 'Колючая выносливость'
    },
    enem2: {
        variant1: 'Улыбка-удар', variant2: 'Острый белый зуб', variant3: 'Зубастая сила',
        variant4: 'Жёлтая лепестковая корона', variant5: 'Вспышка улыбки', variant6: 'Едкий укус',
        variant7: 'Зубастая мощь', variant8: 'Плотные лепестки', variant9: 'Симметрия лепестков с флангов',
        variant10: 'Живучая Белозубка', variant11: 'Цепкие зубки', variant12: 'Улыбка и в землю',
        variant13: 'Толстый стебель', variant14: 'Неутомимая Белозубка', variant15: 'Пружинистый прыжок',
        variant16: 'Меткий белый зуб', variant17: 'Зубастая хватка', variant18: 'Белозубая улыбка',
        variant19: 'Мгновенная вспышка', variant20: 'Полевой цветочный дух', variant21: 'Стойкий стебель',
        variant22: 'Юркая Белозубка', variant23: 'Зубастая стойкость', variant24: 'Чуткие корни',
        variant25: 'Ускользающая улыбка', variant26: 'Дикая улыбка', variant27: 'Мощь укуса',
        variant28: 'Вспышка с флангов вмиг', variant29: 'Каменные зубки', variant30: 'Разросшийся цветок',
        variant31: 'Зубастый рывок', variant32: 'Живучий стебель', variant33: 'Неутомимая симметрия',
        variant34: 'Зубастая прыть', variant35: 'Зубастая выносливость'
    },
    enem3: {
        variant1: 'Горький укол', variant2: 'Острый горький шип', variant3: 'Горькая сила',
        variant4: 'Полынная защита', variant5: 'Меткий горький укол', variant6: 'Едкая горечь',
        variant7: 'Горькая мощь', variant8: 'Плотная полынь', variant9: 'Долгая пауза перед уколом',
        variant10: 'Живучий Горчак', variant11: 'Горький шип-крюк', variant12: 'Укол и в полынь',
        variant13: 'Толстая полынь', variant14: 'Неутомимый Горчак', variant15: 'Пружинистая полынь',
        variant16: 'Меткая горечь', variant17: 'Горькая хватка', variant18: 'Горький взгляд',
        variant19: 'Мгновенный горький укол', variant20: 'Полынный дух', variant21: 'Стойкая полынь',
        variant22: 'Юркий Горчак', variant23: 'Горькая стойкость', variant24: 'Чуткая полынь',
        variant25: 'Ускользающая горечь', variant26: 'Дикая горечь', variant27: 'Мощь полыни',
        variant28: 'Внезапный горький укол', variant29: 'Каменная горечь', variant30: 'Разросшаяся полынь',
        variant31: 'Горький рывок', variant32: 'Живучая полынь', variant33: 'Пауза-укол вновь',
        variant34: 'Горькая прыть', variant35: 'Горькая выносливость'
    },
    enem4: {
        variant1: 'Клохчущий удар', variant2: 'Клюв клохтуна', variant3: 'Клохчущая сила',
        variant4: 'Пёстрое оперение', variant5: 'Давление снизу', variant6: 'Едкий клёкот',
        variant7: 'Клохчущая мощь', variant8: 'Плотное оперение', variant9: 'Вспугнутый напор снизу',
        variant10: 'Живучий Клохтун', variant11: 'Цепкий коготок', variant12: 'Клёкот и в траву',
        variant13: 'Крепкое оперение', variant14: 'Неутомимый Клохтун', variant15: 'Взлёт вспугнутого',
        variant16: 'Меткий клёкот', variant17: 'Клохчущая хватка', variant18: 'Испуганный взгляд',
        variant19: 'Давление снизу вмиг', variant20: 'Травяной дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Клохтун', variant23: 'Клохчущая стойкость', variant24: 'Чуткий клёкот',
        variant25: 'Ускользающий в траву', variant26: 'Дикий клёкот', variant27: 'Мощь клюва',
        variant28: 'Внезапное давление снизу', variant29: 'Каменное оперение', variant30: 'Разросшийся напор',
        variant31: 'Клохчущий рывок', variant32: 'Живучее оперение', variant33: 'Напор снизу вновь',
        variant34: 'Клохчущая прыть', variant35: 'Клохчущая выносливость'
    },
    enem5: {
        variant1: 'Полевой удар', variant2: 'Колос-нож', variant3: 'Полевая сила',
        variant4: 'Пшеничная защита', variant5: 'Удар хозяина поля', variant6: 'Горечь поля',
        variant7: 'Полевая мощь', variant8: 'Плотная пшеница', variant9: 'Обрушение всего разом',
        variant10: 'Живучий Полевик', variant11: 'Цепкие колосья', variant12: 'Удар и в поле целиком',
        variant13: 'Толстая пшеница', variant14: 'Хозяин поля', variant15: 'Пружинистое ожидание',
        variant16: 'Меткий колос', variant17: 'Полевая хватка', variant18: 'Взгляд хозяина',
        variant19: 'Мгновенное обрушение', variant20: 'Хозяйский дух', variant21: 'Стойкая пшеница',
        variant22: 'Юркий Полевик', variant23: 'Полевая стойкость', variant24: 'Чуткое поле',
        variant25: 'Ускользающий в колосьях', variant26: 'Дикое поле', variant27: 'Мощь горечи',
        variant28: 'Обрушение разом вмиг', variant29: 'Каменное поле', variant30: 'Разросшееся поле',
        variant31: 'Полевой рывок', variant32: 'Живучая пшеница', variant33: 'Ожидание хозяина',
        variant34: 'Полевая прыть', variant35: 'Полевая выносливость'
    }
};
