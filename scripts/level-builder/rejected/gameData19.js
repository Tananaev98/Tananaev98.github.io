let lvlNumber = 19;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 19 — «Пожиратели урожая», область II «Золотые поля».
// Пять архетипов: плотный рой сверху / встречные зигзаг-тараны панциря /
// одиночные вылазки из нор по углам / горизонтальные пары с одного бока /
// финал смешивает почерк всех четверых и впервые перекрывает низ поля разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.891, damageMultiplier: 1.997, minWaveDelay: 2798, minShotDelay: 153, minTelegraphMs: 541,
	phases: [
		{ phase: 1, minHp: 0.652, cadence: 0.994, speed: 1.004, damage: 1, telegraphMultiplier: 1.007, surpriseChance: 0.151, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.302, cadence: 0.829, speed: 1.098, damage: 1.15, telegraphMultiplier: 0.898, surpriseChance: 0.251, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0, cadence: 0.701, speed: 1.189, damage: 1.27, telegraphMultiplier: 0.83, surpriseChance: 0.351, maxActiveAttacks: 25 }
	],
	bosses: {
		enem1: { combatIdentity: "Два всплеска роя", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'pause', cadence: 0.998, telegraphMs: 720, speedMultiplier: 1.05, damageMultiplier: 0.86, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.26] },
		enem2: { combatIdentity: "Панцирь и укус", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4, movementStyle: 'drift', cadence: 0.902, telegraphMs: 781, speedMultiplier: 0.981, damageMultiplier: 1.02, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] },
		enem3: { combatIdentity: "Нора и запасной выход", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'weave', cadence: 0.78, telegraphMs: 600, speedMultiplier: 1.18, damageMultiplier: 0.64, speedVariance: [0.9, 1.02, 1.14, 1.26, 1.38] },
		enem4: { combatIdentity: "Кража зерна с разворотом", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.879, telegraphMs: 730, speedMultiplier: 1.06, damageMultiplier: 0.88, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] },
		enem5: { combatIdentity: "Голодное схождение", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.741, telegraphMs: 629, speedMultiplier: 1.121, damageMultiplier: 1.08, speedVariance: [0.82, 0.95, 1.08, 1.21, 1.34] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl19/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Прожорень',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/1.webp',
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
		dispName: 'Латник',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/2.webp',
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
		dispName: 'Зубоскал',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Хлебокрад',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 65,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1350 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Ненасыть',
		image: 'images/enemies/regions/2_zolot_polya/lvl19/5.webp',
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

// Урон по проверенной лестнице light/medium/heavy — та же, что и на соседних уровнях.
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
let timeNextBoss = 15;
const bossInterval = 4;

const bossAbilities = [
	// ===== Прожорень =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 39, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 17 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 33, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 43, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 27 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 30 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 31 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 32 h

	// ===== Латник =====
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 18 e
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 23 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 27 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 30 h
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 31 h

	// ===== Зубоскал =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 30 h
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 31 h

	// ===== Хлебокрад =====
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 34 h
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 19 }, // 35 h

	// ===== Ненасыть =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 39, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 43, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 32 h
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 33 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 201, bossDelayAbDop: 4601, firstWaveDelayMs: 2208 }, // 
	{ boss: 'enem2', bossDelayAb: 232, bossDelayAbDop: 5099, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 240, bossDelayAbDop: 4500, firstWaveDelayMs: 2160 }, // 
	{ boss: 'enem4', bossDelayAb: 290, bossDelayAbDop: 5001, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 257, bossDelayAbDop: 5601, firstWaveDelayMs: 2016 }, // 
];

const bossAbilitiesDop = [
	// Прожорень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Два всплеска роя — знакомство" },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Два всплеска роя — иной конец" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [550, 250, 0, 250], label: "Два всплеска роя — завершение" },

	// Латник
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7], shotGapsMs: [0, 0, 400] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15], shotGapsMs: [700, 0, 400] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 400, 400], openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Панцирь и укус — знакомство" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Панцирь и укус — иной конец" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "Панцирь и укус — завершение" },

	// Зубоскал
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 250, 700], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11], shotGapsMs: [0, 400, 250] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 400, 400], openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [250, 0, 250], openingOrder: 1, label: "Нора и запасной выход — знакомство" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Нора и запасной выход — иной конец" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "Нора и запасной выход — завершение" },

	// Хлебокрад
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 250, 550, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [250, 250, 550, 0] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 250, 0, 550] },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 0, 0, 550] },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 250, 400], openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 400, 250], openingOrder: 1, label: "Кража зерна с разворотом — знакомство" },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, label: "Кража зерна с разворотом — иной конец" },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, label: "Кража зерна с разворотом — завершение" },

	// Ненасыть
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Голодное схождение — знакомство" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 2, recoveryMs: 650, label: "Голодное схождение — иной конец" },
	{ boss: 'enem5', indexAbilities: [29, 30, 31, 32, 33], signature: true, minPhase: 3, recoveryMs: 950, label: "Голодное схождение — завершение" },

];

// Лорные названия связок. Уровень 19 — вредители урожая: Прожорень (рой саранчи),
// Латник (жук-таран), Зубоскал (зубастый нора-житель), Хлебокрад (ворующий грызун),
// Ненасыть (пожирает всё поле разом).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Роевой укус', variant2: 'Жвалы саранчи', variant3: 'Роевая сила',
        variant4: 'Хитиновая защита', variant5: 'Укус роя', variant6: 'Слюна саранчи',
        variant7: 'Роевая мощь', variant8: 'Плотный хитин', variant9: 'Плотный дождь роя',
        variant10: 'Живучий Прожорень', variant11: 'Цепкие жвалы', variant12: 'Укус и в тучу',
        variant13: 'Толстый хитин', variant14: 'Неутомимый рой', variant15: 'Пружинистые крылья',
        variant16: 'Меткие жвалы', variant17: 'Роевая хватка', variant18: 'Взгляд роя',
        variant19: 'Мгновенный дождь роя', variant20: 'Голодный дух', variant21: 'Стойкий хитин',
        variant22: 'Юркий Прожорень', variant23: 'Роевая стойкость', variant24: 'Чуткие крылья',
        variant25: 'Ускользающий рой', variant26: 'Дикий голод роя', variant27: 'Мощь слюны',
        variant28: 'Внезапный дождь', variant29: 'Каменный хитин', variant30: 'Разросшийся рой',
        variant31: 'Роевой рывок', variant32: 'Живучий хитин', variant33: 'Дождь роя вновь',
        variant34: 'Роевая прыть', variant35: 'Роевая выносливость'
    },
    enem2: {
        variant1: 'Таранный удар', variant2: 'Рог панциря', variant3: 'Таранная сила',
        variant4: 'Панцирная броня', variant5: 'Меткий таран', variant6: 'Слизь панциря',
        variant7: 'Таранная мощь', variant8: 'Прочный панцирь', variant9: 'Зигзагующий таран',
        variant10: 'Живучий Латник', variant11: 'Цепкие лапки', variant12: 'Таран и в землю',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый Латник', variant15: 'Пружинистый разгон',
        variant16: 'Меткий рог', variant17: 'Таранная хватка', variant18: 'Взгляд из-под панциря',
        variant19: 'Мгновенный таран', variant20: 'Панцирный дух', variant21: 'Стойкий панцирь',
        variant22: 'Юркий Латник', variant23: 'Таранная стойкость', variant24: 'Чуткие усики',
        variant25: 'Ускользающий таран', variant26: 'Дикий таран', variant27: 'Мощь слизи',
        variant28: 'Внезапный таран', variant29: 'Панцирь-камень', variant30: 'Разросшийся панцирь',
        variant31: 'Таранный рывок', variant32: 'Живучий панцирь', variant33: 'Зигзаг тарана вновь',
        variant34: 'Таранная прыть', variant35: 'Таранная выносливость'
    },
    enem3: {
        variant1: 'Зубастый укус', variant2: 'Острый резец', variant3: 'Зубастая сила',
        variant4: 'Защита норы', variant5: 'Вылазка из норы', variant6: 'Едкая слюна',
        variant7: 'Зубастая мощь', variant8: 'Прочная нора', variant9: 'Нервная вылазка из угла',
        variant10: 'Живучий Зубоскал', variant11: 'Цепкие резцы', variant12: 'Укус и в нору',
        variant13: 'Крепкая нора', variant14: 'Неутомимый Зубоскал', variant15: 'Выскок из норы',
        variant16: 'Меткий резец', variant17: 'Зубастая хватка', variant18: 'Оскаленный взгляд',
        variant19: 'Мгновенная вылазка', variant20: 'Земляной дух', variant21: 'Стойкая нора',
        variant22: 'Юркий Зубоскал', variant23: 'Зубастая стойкость', variant24: 'Чуткие усы',
        variant25: 'Ускользающий в нору', variant26: 'Дикий оскал', variant27: 'Мощь слюны',
        variant28: 'Внезапная вылазка из угла', variant29: 'Каменная нора', variant30: 'Разросшаяся нора',
        variant31: 'Зубастый рывок', variant32: 'Живучая нора', variant33: 'Неутомимая вылазка',
        variant34: 'Зубастая прыть', variant35: 'Зубастая выносливость'
    },
    enem4: {
        variant1: 'Ворующий укус', variant2: 'Резец-клюв воришки', variant3: 'Воровская сила',
        variant4: 'Пуховая защита', variant5: 'Налёт парой', variant6: 'Едкая крошка',
        variant7: 'Воровская мощь', variant8: 'Плотное оперение', variant9: 'Горизонтальный налёт',
        variant10: 'Живучий Хлебокрад', variant11: 'Коготки воришки', variant12: 'Налёт и в колосья',
        variant13: 'Толстое оперение', variant14: 'Неутомимый Хлебокрад', variant15: 'Прыжок к добыче',
        variant16: 'Меткий резец-клюв', variant17: 'Воровская хватка', variant18: 'Взгляд на крошки',
        variant19: 'Мгновенный налёт', variant20: 'Хлебный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Хлебокрад', variant23: 'Воровская стойкость', variant24: 'Клюв на крошки',
        variant25: 'Ускользающий с крошкой', variant26: 'Дикий налёт', variant27: 'Мощь клюва',
        variant28: 'Внезапный налёт парой', variant29: 'Закрома воришки', variant30: 'Разросшиеся запасы',
        variant31: 'Воровской рывок', variant32: 'Живучее оперение', variant33: 'Неутомимый налёт',
        variant34: 'Воровская прыть', variant35: 'Воровская выносливость'
    },
    enem5: {
        variant1: 'Ненасытный укус', variant2: 'Острая пасть', variant3: 'Ненасытная сила',
        variant4: 'Всеядная защита', variant5: 'Захват поля', variant6: 'Едкий голод',
        variant7: 'Ненасытная мощь', variant8: 'Шкура обжоры', variant9: 'Рывок отовсюду',
        variant10: 'Живучая Ненасыть', variant11: 'Цепкая пасть', variant12: 'Захват и всё поле',
        variant13: 'Толстая шкура', variant14: 'Неутомимая Ненасыть', variant15: 'Бросок голода',
        variant16: 'Укус отовсюду', variant17: 'Ненасытная хватка', variant18: 'Взгляд на всё поле',
        variant19: 'Мгновенный захват', variant20: 'Всепоглощающий дух', variant21: 'Шкура-стойкость',
        variant22: 'Юркая Ненасыть', variant23: 'Ненасытная стойкость', variant24: 'Чуткий голод',
        variant25: 'Ускользающая прожорливость', variant26: 'Дикий голод', variant27: 'Мощь пасти',
        variant28: 'Внезапный захват поля', variant29: 'Каменная ненасытность', variant30: 'Разросшийся голод',
        variant31: 'Ненасытный рывок', variant32: 'Живучая шкура', variant33: 'Неутомимая прожорливость',
        variant34: 'Ненасытная прыть', variant35: 'Ненасытная выносливость'
    }
};
