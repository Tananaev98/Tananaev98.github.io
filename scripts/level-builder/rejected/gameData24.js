let lvlNumber = 24;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 24 — «Старая ветряная мельница», область II «Золотые поля».
// Пять архетипов: редкие тяжёлые удары мешка с долгой паузой / давление снизу
// катящегося жёрнова / зигзаг ковша без нижней стены / щелчки лопастей
// только из четырёх углов / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.81, damageMultiplier: 1.568, minWaveDelay: 2805, minShotDelay: 131, minTelegraphMs: 516,
	phases: [
		{ phase: 1, minHp: 0.63, cadence: 0.991, speed: 1.008, damage: 1, telegraphMultiplier: 0.991, surpriseChance: 0.17, maxActiveAttacks: 17 },
		{ phase: 2, minHp: 0.29, cadence: 0.782, speed: 1.149, damage: 1.2, telegraphMultiplier: 0.871, surpriseChance: 0.299, maxActiveAttacks: 22 },
		{ phase: 3, minHp: 0, cadence: 0.651, speed: 1.241, damage: 1.32, telegraphMultiplier: 0.799, surpriseChance: 0.401, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "Мешок и россыпь", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.21, telegraphMs: 1000, speedMultiplier: 0.82, damageMultiplier: 1.2, speedVariance: [0.74, 0.84, 0.96, 1.08, 1.2] },
		enem2: { combatIdentity: "Жернов делает второй оборот", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'pause', cadence: 1.03, telegraphMs: 815, speedMultiplier: 0.94, damageMultiplier: 0.93, speedVariance: [0.87, 0.94, 1.02, 1.1, 1.18] },
		enem3: { combatIdentity: "Мука расходится веером", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'straight', cadence: 0.91, telegraphMs: 720, speedMultiplier: 1.04, damageMultiplier: 0.92, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] },
		enem4: { combatIdentity: "Лопасть возвращается", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'weave', cadence: 0.77, telegraphMs: 605, speedMultiplier: 1.21, damageMultiplier: 0.62, speedVariance: [0.92, 1.05, 1.18, 1.31, 1.44] },
		enem5: { combatIdentity: "Мельничный подхват", combatTrick: "короткий первый заход продолжается более быстрым довеском с прежнего края", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.7, telegraphMs: 600, speedMultiplier: 1.19, damageMultiplier: 1.12, speedVariance: [0.78, 0.91, 1.04, 1.17, 1.3] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl24/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Мешкач',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/1.webp',
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
		dispName: 'Жерновень',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Мучень',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1350 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Крылорез',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Белоручка',
		image: 'images/enemies/regions/2_zolot_polya/lvl24/5.webp',
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
let timeNextBoss = 20;
const bossInterval = 5;

const bossAbilities = [
	// ===== Мешкач =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 33, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 17 e
	{ boss: 'enem1', type: 'enem11', xPos: 36, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 37, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 30 h
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 31 h

	// ===== Жерновень =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 22 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 22 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 22 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 22 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 22 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 21 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 22 }, // 29 h

	// ===== Мучень =====
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 30 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 31 h

	// ===== Крылорез =====
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 50, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 50, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 49, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 6 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 43, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 10 d
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 63, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 14 e
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 43, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 15 e
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 37, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 61, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 43, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 43, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 39, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 43, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 4 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 59, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 33 h

	// ===== Белоручка =====
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 37, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 6 c
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 59, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 10 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 59, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 14 e
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 43, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 24, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 39, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 24, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 58, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 35, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 58, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 79, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 32 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 174, bossDelayAbDop: 5950, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 204, bossDelayAbDop: 5780, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 232, bossDelayAbDop: 5495, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 221, bossDelayAbDop: 5060, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 245, bossDelayAbDop: 5700, firstWaveDelayMs: 2263 }, // 
];

const bossAbilitiesDop = [
	// Мешкач
	{ boss: 'enem1', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Мешок и россыпь — знакомство" },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, label: "Мешок и россыпь — иной конец" },
	{ boss: 'enem1', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "Мешок и россыпь — завершение" },

	// Жерновень
	{ boss: 'enem2', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem2', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Жернов делает второй оборот — знакомство" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Жернов делает второй оборот — иной конец" },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 3, recoveryMs: 950, label: "Жернов делает второй оборот — завершение" },

	// Мучень
	{ boss: 'enem3', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [3, 4, 5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14] },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Мука расходится веером — знакомство" },
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, label: "Мука расходится веером — иной конец" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "Мука расходится веером — завершение" },

	// Крылорез
	{ boss: 'enem4', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [3, 4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13], shotGapsMs: [250, 250, 400] },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [550, 0, 250, 250], openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 250, 250, 550], openingOrder: 1, label: "Лопасть возвращается — знакомство" },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [250, 550, 550, 0], label: "Лопасть возвращается — иной конец" },
	{ boss: 'enem4', indexAbilities: [29, 30, 31, 32, 33], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [250, 550, 550, 0], label: "Лопасть возвращается — завершение" },

	// Белоручка
	{ boss: 'enem5', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [3, 4, 5] },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 250, 550, 0], openingOrder: 1, label: "Мельничный подхват — знакомство" },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [250, 250, 550, 550], label: "Мельничный подхват — иной конец" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, label: "Мельничный подхват — завершение" },

];

// Лорные названия связок. Уровень 24 — мельница: Мешкач (мешок), Жерновень (жёрнов),
// Мучень (ковш муки), Крылорез (крыло мельницы), Белоручка (ленивая, но копит рывок).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Мешковый удар', variant2: 'Завязка мешка', variant3: 'Мешковая сила',
        variant4: 'Холщовая защита', variant5: 'Удар мешком', variant6: 'Мучная пыль',
        variant7: 'Мешковая мощь', variant8: 'Холстина мешка', variant9: 'Долгая пауза перед ударом',
        variant10: 'Живучий Мешкач', variant11: 'Цепкая завязка', variant12: 'Удар и в амбар',
        variant13: 'Толстая холстина', variant14: 'Неутомимый Мешкач', variant15: 'Пружинистый мешок',
        variant16: 'Меткая завязка', variant17: 'Мешковая хватка', variant18: 'Взгляд из-под мешка',
        variant19: 'Тяжёлый удар вмиг', variant20: 'Мучной дух', variant21: 'Стойкая холстина',
        variant22: 'Юркий Мешкач', variant23: 'Мешковая стойкость', variant24: 'Чуткая завязка',
        variant25: 'Ускользающий мешок', variant26: 'Дикий удар мешком', variant27: 'Мощь пыли',
        variant28: 'Внезапный тяжёлый удар', variant29: 'Каменная холстина', variant30: 'Разросшийся мешок',
        variant31: 'Мешковый рывок', variant32: 'Живучая холстина', variant33: 'Пауза-удар вновь',
        variant34: 'Мешковая прыть', variant35: 'Мешковая выносливость'
    },
    enem2: {
        variant1: 'Жерновой удар', variant2: 'Скол камня', variant3: 'Жерновая сила',
        variant4: 'Каменная защита', variant5: 'Давление жёрнова', variant6: 'Мучная крошка',
        variant7: 'Жерновая мощь', variant8: 'Прочный камень', variant9: 'Катящееся давление снизу',
        variant10: 'Живучий Жерновень', variant11: 'Цепкий скол', variant12: 'Давление и в муку',
        variant13: 'Толстый камень', variant14: 'Неутомимый Жерновень', variant15: 'Пружинистое качение',
        variant16: 'Меткий скол', variant17: 'Жерновая хватка', variant18: 'Тяжёлый каменный взгляд',
        variant19: 'Давление вмиг', variant20: 'Мучной дух жёрнова', variant21: 'Стойкий камень',
        variant22: 'Юркий Жерновень', variant23: 'Жерновая стойкость', variant24: 'Чуткий скол',
        variant25: 'Ускользающее качение', variant26: 'Дикое давление снизу', variant27: 'Мощь крошки',
        variant28: 'Катящееся давление вмиг', variant29: 'Жёрнов-камень вдвойне', variant30: 'Разросшийся жёрнов',
        variant31: 'Жерновой рывок', variant32: 'Живучий камень', variant33: 'Качение вновь',
        variant34: 'Жерновая прыть', variant35: 'Жерновая выносливость'
    },
    enem3: {
        variant1: 'Мучной удар', variant2: 'Край ковша', variant3: 'Мучная сила',
        variant4: 'Пыльная защита', variant5: 'Зигзаг ковша', variant6: 'Мука в глаза',
        variant7: 'Мучная мощь', variant8: 'Прочный ковш', variant9: 'Зигзаг без опоры внизу',
        variant10: 'Живучий Мучень', variant11: 'Цепкий ковш', variant12: 'Взмах и в мешок',
        variant13: 'Толстый ковш', variant14: 'Неутомимый Мучень', variant15: 'Пружинистый ковш',
        variant16: 'Край ковша вмиг', variant17: 'Мучная хватка', variant18: 'Взгляд сквозь муку',
        variant19: 'Мгновенный зигзаг', variant20: 'Мучной дух', variant21: 'Стойкий ковш',
        variant22: 'Юркий Мучень', variant23: 'Мучная стойкость', variant24: 'Чуткий ковш',
        variant25: 'Зигзаг ковша ускользает', variant26: 'Дикий зигзаг', variant27: 'Мощь муки',
        variant28: 'Внезапный зигзаг', variant29: 'Каменный ковш', variant30: 'Разросшийся ковш',
        variant31: 'Мучной рывок', variant32: 'Живучий ковш', variant33: 'Зигзаг ковша вновь',
        variant34: 'Мучная прыть', variant35: 'Мучная выносливость'
    },
    enem4: {
        variant1: 'Лопастный удар', variant2: 'Острая лопасть', variant3: 'Лопастная сила',
        variant4: 'Защита крыла', variant5: 'Щелчок лопасти', variant6: 'Щепа лопасти',
        variant7: 'Лопастная мощь', variant8: 'Прочная лопасть', variant9: 'Щелчок из угла крыла',
        variant10: 'Живучий Крылорез', variant11: 'Цепкая лопасть', variant12: 'Щелчок и в жернова',
        variant13: 'Толстая лопасть', variant14: 'Неутомимый Крылорез', variant15: 'Пружинистое крыло',
        variant16: 'Меткая лопасть', variant17: 'Лопастная хватка', variant18: 'Взгляд с высоты крыла',
        variant19: 'Щелчок лопасти вмиг', variant20: 'Ветреный дух мельницы', variant21: 'Стойкая лопасть',
        variant22: 'Юркий Крылорез', variant23: 'Лопастная стойкость', variant24: 'Чуткая лопасть',
        variant25: 'Ускользающий щелчок', variant26: 'Щелчок из углов дикий', variant27: 'Мощь щепы',
        variant28: 'Щелчок из угла вмиг', variant29: 'Каменная лопасть', variant30: 'Разросшееся крыло',
        variant31: 'Лопастный рывок', variant32: 'Живучая лопасть', variant33: 'Щелчок из четырёх углов',
        variant34: 'Лопастная прыть', variant35: 'Лопастная выносливость'
    },
    enem5: {
        variant1: 'Ленивый удар', variant2: 'Коготок в крайности', variant3: 'Скрытая сила',
        variant4: 'Перчатка-защита', variant5: 'Удар из угла', variant6: 'Едкая лень',
        variant7: 'Скрытая мощь', variant8: 'Мягкая перчатка', variant9: 'Разгон только в крайности',
        variant10: 'Живучая Белоручка', variant11: 'Цепкая перчатка', variant12: 'Удар и в тень',
        variant13: 'Плотная перчатка', variant14: 'Неутомимая лень', variant15: 'Рывок из безделья',
        variant16: 'Меткий ленивый удар', variant17: 'Скрытая хватка', variant18: 'Ленивый прищур',
        variant19: 'Рывок в крайности вмиг', variant20: 'Дух безделья', variant21: 'Стойкая к труду лень',
        variant22: 'Юркая, когда припрёт', variant23: 'Скрытая стойкость', variant24: 'Чуткая к опасности лень',
        variant25: 'Ускользающая от работы', variant26: 'Рывок в последний миг', variant27: 'Мощь лени',
        variant28: 'Внезапный разгон', variant29: 'Каменная лень', variant30: 'Собранный жерновой вес',
        variant31: 'Ленивый рывок', variant32: 'Живучая перчатка', variant33: 'Последний рывок вновь',
        variant34: 'Скрытая прыть', variant35: 'Скрытая выносливость'
    }
};
