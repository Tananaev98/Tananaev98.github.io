let lvlNumber = 23;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 23 — «Тайна овина», область II «Золотые поля».
// Пять архетипов: зигзаг цепа без нижней стены / симметричные когтистые
// выпады решета с флангов / нервный дождь мякины сверху / щелчки серпов
// только из углов / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.83, damageMultiplier: 1.702, minWaveDelay: 2796, minShotDelay: 133, minTelegraphMs: 522,
	phases: [
		{ phase: 1, minHp: 0.64, cadence: 1.009, speed: 1.007, damage: 1, telegraphMultiplier: 1.009, surpriseChance: 0.171, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.292, cadence: 0.789, speed: 1.141, damage: 1.19, telegraphMultiplier: 0.879, surpriseChance: 0.291, maxActiveAttacks: 22 },
		{ phase: 3, minHp: 0, cadence: 0.659, speed: 1.23, damage: 1.31, telegraphMultiplier: 0.801, surpriseChance: 0.391, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "Обратный ход цепа", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.023, telegraphMs: 849, speedMultiplier: 0.939, damageMultiplier: 0.94, speedVariance: [0.86, 0.94, 1.02, 1.1, 1.18] },
		enem2: { combatIdentity: "Просев через решето", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.911, telegraphMs: 745, speedMultiplier: 1.051, damageMultiplier: 0.91, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] },
		enem3: { combatIdentity: "Пыль скрывает бросок", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'drift', cadence: 0.86, telegraphMs: 615, speedMultiplier: 1.19, damageMultiplier: 0.63, speedVariance: [0.91, 1.04, 1.17, 1.3, 1.43] },
		enem4: { combatIdentity: "Серпы из снопа", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4, movementStyle: 'straight', cadence: 1.03, telegraphMs: 620, speedMultiplier: 1.02, damageMultiplier: 1.13, speedVariance: [0.83, 0.93, 1.03, 1.13, 1.23] },
		enem5: { combatIdentity: "Огонь между снопами", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4, movementStyle: 'weave', cadence: 0.71, telegraphMs: 609, speedMultiplier: 1.18, damageMultiplier: 1.11, speedVariance: [0.79, 0.92, 1.05, 1.18, 1.31] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl23/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Хлыстень',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/1.webp',
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
		dispName: 'Решетень',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '25%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Пылюга',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1300 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Колосень',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Овинник',
		image: 'images/enemies/regions/2_zolot_polya/lvl23/5.webp',
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
let timeNextBoss = 19;
const bossInterval = 5;

const bossAbilities = [
	// ===== Хлыстень =====
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 17 e
	{ boss: 'enem1', type: 'enem11', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 27 g
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 30 h
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 31 h

	// ===== Решетень =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 34, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 36, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 18 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 34, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 30 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 31 h

	// ===== Пылюга =====
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 49, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 49, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 14 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 4 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 30 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 31 h

	// ===== Колосень =====
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 6 c
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 10 d
	{ boss: 'enem4', type: 'enem44', xPos: 36, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 14 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 15 e
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 20 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 18 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 20 }, // 31 h

	// ===== Овинник =====
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 39, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 39, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 79, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 37, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 37, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 32 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 207, bossDelayAbDop: 6024, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 229, bossDelayAbDop: 5362, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 225, bossDelayAbDop: 5061, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 235, bossDelayAbDop: 4270, firstWaveDelayMs: 2050 }, // 
	{ boss: 'enem5', bossDelayAb: 247, bossDelayAbDop: 5599, firstWaveDelayMs: 2291 }, // 
];

const bossAbilitiesDop = [
	// Хлыстень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], shotGapsMs: [400, 0, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7], shotGapsMs: [250, 250, 700] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11], shotGapsMs: [0, 400, 250] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [400, 0, 250], openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Обратный ход цепа — знакомство" },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Обратный ход цепа — иной конец" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 700], label: "Обратный ход цепа — завершение" },

	// Решетень
	{ boss: 'enem2', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [3, 4, 5, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14] },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Просев через решето — знакомство" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, label: "Просев через решето — иной конец" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 0, 550], label: "Просев через решето — завершение" },

	// Пылюга
	{ boss: 'enem3', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 700], openingOrder: 1, label: "Пыль скрывает бросок — знакомство" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 550, 550, 550], label: "Пыль скрывает бросок — иной конец" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [550, 0, 550, 0], label: "Пыль скрывает бросок — завершение" },

	// Колосень
	{ boss: 'enem4', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [3, 4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13], shotGapsMs: [700, 0, 0] },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [400, 250, 0], openingOrder: 1, label: "Серпы из снопа — знакомство" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 550, 250], label: "Серпы из снопа — иной конец" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 250, 250, 550], label: "Серпы из снопа — завершение" },

	// Овинник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Огонь между снопами — знакомство" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Огонь между снопами — иной конец" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, label: "Огонь между снопами — завершение" },

];

// Лорные названия связок. Уровень 23 — молотьба: Хлыстень (цеп), Решетень (решето),
// Пылюга (мякина-пыль), Колосень (серп), Овинник (дух овина-сушильни).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Цеповый удар', variant2: 'Звено цепа', variant3: 'Цеповая сила',
        variant4: 'Соломенная защита', variant5: 'Зигзаг цепа', variant6: 'Едкая мякина',
        variant7: 'Цеповая мощь', variant8: 'Прочное звено', variant9: 'Зигзаг без опоры',
        variant10: 'Живучий Хлыстень', variant11: 'Цепкое звено цепа', variant12: 'Взмах и в ток',
        variant13: 'Толстое звено', variant14: 'Неутомимый Хлыстень', variant15: 'Пружинистый цеп',
        variant16: 'Меткое звено', variant17: 'Цеповая хватка', variant18: 'Взгляд молотильщика',
        variant19: 'Зигзаг цепа вмиг', variant20: 'Хлебный дух тока', variant21: 'Стойкое звено',
        variant22: 'Юркий Хлыстень', variant23: 'Цеповая стойкость', variant24: 'Чуткое звено',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикий зигзаг цепа', variant27: 'Мощь мякины',
        variant28: 'Внезапный зигзаг', variant29: 'Каменное звено', variant30: 'Разросшийся цеп',
        variant31: 'Цеповый рывок', variant32: 'Живучее звено', variant33: 'Неутомимый зигзаг',
        variant34: 'Цеповая прыть', variant35: 'Цеповая выносливость'
    },
    enem2: {
        variant1: 'Решётчатый удар', variant2: 'Прут решета', variant3: 'Решётчатая сила',
        variant4: 'Плетёная защита', variant5: 'Выпад с флангов', variant6: 'Едкая пыль решета',
        variant7: 'Решётчатая мощь', variant8: 'Плотное плетение', variant9: 'Парный коготь с двух сторон',
        variant10: 'Живучий Решетень', variant11: 'Цепкие прутья', variant12: 'Выпад и в зерно',
        variant13: 'Толстое плетение', variant14: 'Неутомимый Решетень', variant15: 'Пружинистое решето',
        variant16: 'Меткий прут', variant17: 'Решётчатая хватка', variant18: 'Взгляд сквозь прутья',
        variant19: 'Мгновенный выпад', variant20: 'Зерновой дух', variant21: 'Стойкое плетение',
        variant22: 'Юркий Решетень', variant23: 'Решётчатая стойкость', variant24: 'Чуткие прутья',
        variant25: 'Ускользающий выпад', variant26: 'Дикий выпад', variant27: 'Мощь пыли решета',
        variant28: 'Симметричный выпад вмиг', variant29: 'Каменное плетение', variant30: 'Разросшееся решето',
        variant31: 'Решётчатый рывок', variant32: 'Живучее плетение', variant33: 'Симметрия когтей вновь',
        variant34: 'Решётчатая прыть', variant35: 'Решётчатая выносливость'
    },
    enem3: {
        variant1: 'Взмах лопаты', variant2: 'Бросок зерна', variant3: 'Веяльная сила',
        variant4: 'Соломенная защита', variant5: 'Дождь пыли', variant6: 'Едкая пыль',
        variant7: 'Веяльная мощь', variant8: 'Плотная солома', variant9: 'Нервный дождь сверху',
        variant10: 'Живучая Пылюга', variant11: 'Цепкая солома', variant12: 'Пыль и в глаза',
        variant13: 'Толстая солома', variant14: 'Неутомимая Пылюга', variant15: 'Облако пыли из лопаты',
        variant16: 'Меткий бросок зерна', variant17: 'Пыльная хватка', variant18: 'Взгляд сквозь пыль',
        variant19: 'Дождь пыли вмиг', variant20: 'Мякинный дух', variant21: 'Стойкая солома',
        variant22: 'Юркая Пылюга', variant23: 'Пыльная стойкость', variant24: 'Чуткая солома',
        variant25: 'Ускользающее облако', variant26: 'Дикий дождь пыли', variant27: 'Мощь пыли',
        variant28: 'Внезапный нервный дождь', variant29: 'Каменная лопата', variant30: 'Разросшееся облако',
        variant31: 'Взмах лопаты внахлёст', variant32: 'Живучая солома', variant33: 'Дождь сверху вновь',
        variant34: 'Пыльная прыть', variant35: 'Пыльная выносливость'
    },
    enem4: {
        variant1: 'Колосящий удар', variant2: 'Колос-серп', variant3: 'Колосящая сила',
        variant4: 'Зерновая защита', variant5: 'Щелчок серпа', variant6: 'Сок колоса',
        variant7: 'Колосящая мощь', variant8: 'Плотный колос', variant9: 'Щелчок из угла',
        variant10: 'Живучий Колосень', variant11: 'Цепкий колос', variant12: 'Щелчок и в закром',
        variant13: 'Толстый колос', variant14: 'Неутомимый Колосень', variant15: 'Пружинистый колос',
        variant16: 'Меткий щелчок', variant17: 'Колосящая хватка', variant18: 'Взгляд из четырёх углов',
        variant19: 'Щелчок серпа вмиг', variant20: 'Зерновой дух колоса', variant21: 'Стойкий колос',
        variant22: 'Юркий Колосень', variant23: 'Колосящая стойкость', variant24: 'Чуткий колос',
        variant25: 'Ускользающий щелчок', variant26: 'Дикий щелчок', variant27: 'Мощь сока колоса',
        variant28: 'Щелчок из угла вмиг', variant29: 'Каменный колос', variant30: 'Разросшийся колос',
        variant31: 'Колосящий рывок', variant32: 'Живучий колос', variant33: 'Щелчок из углов вновь',
        variant34: 'Колосящая прыть', variant35: 'Колосящая выносливость'
    },
    enem5: {
        variant1: 'Овинный удар', variant2: 'Уголёк овина', variant3: 'Овинная сила',
        variant4: 'Дымная защита', variant5: 'Бросок из снопов', variant6: 'Едкий дым овина',
        variant7: 'Овинная мощь', variant8: 'Плотный дым', variant9: 'Змейка меж снопами',
        variant10: 'Живучий Овинник', variant11: 'Цепкий уголёк', variant12: 'Бросок и в снопы',
        variant13: 'Толстый дым', variant14: 'Неутомимый Овинник', variant15: 'Снующий бег',
        variant16: 'Меткий уголёк', variant17: 'Овинная хватка', variant18: 'Взгляд из дыма',
        variant19: 'Мгновенный бросок', variant20: 'Дух овина', variant21: 'Стойкий дым',
        variant22: 'Юркий Овинник', variant23: 'Овинная стойкость', variant24: 'Чуткий дым',
        variant25: 'Ускользающий в снопы', variant26: 'Дикий дым', variant27: 'Мощь угля',
        variant28: 'Ловушка из дождя и когтей', variant29: 'Каменный уголёк', variant30: 'Разросшийся дым',
        variant31: 'Овинный рывок', variant32: 'Живучий дым', variant33: 'Ловушка вновь',
        variant34: 'Овинная прыть', variant35: 'Овинная выносливость'
    }
};
