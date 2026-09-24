let lvlNumber = 22;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 22 — «Богатырская пахота», область II «Золотые поля».
// Пять архетипов: низкий забег лемеха с одного бока / давление снизу тяжёлого
// плуга / редкие удары рогом с долгой паузой / направленный бросок пластов
// земли / финал смешивает почерк всех четверых и впервые перекрывает всю
// нижнюю полосу разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.841, damageMultiplier: 1.613, minWaveDelay: 2804, minShotDelay: 137, minTelegraphMs: 523,
	phases: [
		{ phase: 1, minHp: 0.638, cadence: 0.992, speed: 1.006, damage: 1, telegraphMultiplier: 0.992, surpriseChance: 0.162, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.289, cadence: 0.801, speed: 1.129, damage: 1.18, telegraphMultiplier: 0.881, surpriseChance: 0.281, maxActiveAttacks: 21 },
		{ phase: 3, minHp: 0, cadence: 0.671, speed: 1.219, damage: 1.3, telegraphMultiplier: 0.809, surpriseChance: 0.379, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "Подрез борозды", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'weave', cadence: 1.048, telegraphMs: 780, speedMultiplier: 0.99, damageMultiplier: 1.11, speedVariance: [0.83, 0.93, 1.03, 1.13, 1.23] },
		enem2: { combatIdentity: "Сошник и отвал", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.2, telegraphMs: 960, speedMultiplier: 0.83, damageMultiplier: 1.16, speedVariance: [0.77, 0.87, 0.97, 1.09, 1.2] },
		enem3: { combatIdentity: "Два рога и копыто", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4, movementStyle: 'pause', cadence: 1.02, telegraphMs: 810, speedMultiplier: 0.95, damageMultiplier: 0.94, speedVariance: [0.87, 0.94, 1.02, 1.1, 1.18] },
		enem4: { combatIdentity: "Пласт земли перекрывает проход", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'drift', cadence: 0.83, telegraphMs: 640, speedMultiplier: 1.151, damageMultiplier: 0.65, speedVariance: [0.87, 0.98, 1.09, 1.2, 1.31] },
		enem5: { combatIdentity: "Микулина обратная борозда", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'straight', cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.17, damageMultiplier: 1.1, speedVariance: [0.8, 0.93, 1.06, 1.19, 1.32] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl22/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Лемешок',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '25%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Плугарь',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/2.webp',
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
		dispName: 'Бодень',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Бороздень',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/4.webp',
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
		dispName: 'Микула',
		image: 'images/enemies/regions/2_zolot_polya/lvl22/5.webp',
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
let timeNextBoss = 18;
const bossInterval = 4;

const bossAbilities = [
	// ===== Лемешок =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 43, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 17 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 39, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 29 h

	// ===== Плугарь =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 18 e
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 23 f
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 20 }, // 27 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 30 h

	// ===== Бодень =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 14 e
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 30 h

	// ===== Бороздень =====
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 61, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 39, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 36, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 32 h

	// ===== Микула =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 51, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 51, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 53, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 30 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 199, bossDelayAbDop: 4989, firstWaveDelayMs: 2395 }, // 
	{ boss: 'enem2', bossDelayAb: 175, bossDelayAbDop: 5865, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 206, bossDelayAbDop: 5949, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 259, bossDelayAbDop: 5405, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 248, bossDelayAbDop: 4830, firstWaveDelayMs: 2318 }, // 
];

const bossAbilitiesDop = [
	// Лемешок
	{ boss: 'enem1', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Подрез борозды — знакомство" },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Подрез борозды — иной конец" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 3, recoveryMs: 950, label: "Подрез борозды — завершение" },

	// Плугарь
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Сошник и отвал — знакомство" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Сошник и отвал — иной конец" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30], signature: true, minPhase: 3, recoveryMs: 950, label: "Сошник и отвал — завершение" },

	// Бодень
	{ boss: 'enem3', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Два рога и копыто — знакомство" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Два рога и копыто — иной конец" },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 3, recoveryMs: 950, label: "Два рога и копыто — завершение" },

	// Бороздень
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [250, 250, 400] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], shotGapsMs: [700, 250, 250] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], shotGapsMs: [400, 0, 250], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15], shotGapsMs: [0, 400, 250] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Пласт земли перекрывает проход — знакомство" },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [400, 250, 700], label: "Пласт земли перекрывает проход — иной конец" },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 550, 0, 250], label: "Пласт земли перекрывает проход — завершение" },

	// Микула
	{ boss: 'enem5', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [3, 4, 5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Микулина обратная борозда — знакомство" },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, label: "Микулина обратная борозда — иной конец" },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30], signature: true, minPhase: 3, recoveryMs: 950, label: "Микулина обратная борозда — завершение" },

];

// Лорные названия связок. Уровень 22 — пахота: Лемешок (лемех), Плугарь (пахарь),
// Бодень (рогатый), Бороздень (пласты земли), Микула (богатырь-пахарь Селянинович).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Лемеховый удар', variant2: 'Острый лемех', variant3: 'Лемеховая сила',
        variant4: 'Земляная защита', variant5: 'Меткий подрез', variant6: 'Едкая глина',
        variant7: 'Лемеховая мощь', variant8: 'Прочный лемех', variant9: 'Низкий забег с бока',
        variant10: 'Живучий Лемешок', variant11: 'Цепкий лемех', variant12: 'Подрез и в борозду',
        variant13: 'Толстый лемех', variant14: 'Неутомимый Лемешок', variant15: 'Пружинистый лемех',
        variant16: 'Подрез земли', variant17: 'Лемеховая хватка', variant18: 'Взгляд из борозды',
        variant19: 'Редкий центральный удар', variant20: 'Земляной дух', variant21: 'Стойкий лемех',
        variant22: 'Юркий Лемешок', variant23: 'Лемеховая стойкость', variant24: 'Чуткий лемех',
        variant25: 'Ускользающий подрез', variant26: 'Дикий подрез', variant27: 'Мощь глины',
        variant28: 'Внезапный подрез сбоку', variant29: 'Каменный лемех', variant30: 'Разросшийся лемех',
        variant31: 'Лемеховый рывок', variant32: 'Живучий лемех', variant33: 'Забег сбоку вновь',
        variant34: 'Лемеховая прыть', variant35: 'Лемеховая выносливость'
    },
    enem2: {
        variant1: 'Плужный удар', variant2: 'Нож плуга', variant3: 'Плужная сила',
        variant4: 'Упряжь-щит', variant5: 'Давление плуга', variant6: 'Едкая земля плуга',
        variant7: 'Плужная мощь', variant8: 'Прочная упряжь', variant9: 'Тяжёлое давление снизу',
        variant10: 'Живучий Плугарь', variant11: 'Плужный нож-крюк', variant12: 'Давление и в борозду',
        variant13: 'Толстая упряжь', variant14: 'Неутомимый Плугарь', variant15: 'Пружинистый плуг',
        variant16: 'Меткий нож плуга', variant17: 'Плужная хватка', variant18: 'Взгляд резного бруса',
        variant19: 'Мгновенное давление', variant20: 'Пахотный дух', variant21: 'Стойкая упряжь',
        variant22: 'Юркий Плугарь', variant23: 'Плужная стойкость', variant24: 'Чуткая упряжь',
        variant25: 'Ускользающее давление', variant26: 'Дикое давление', variant27: 'Мощь земли плуга',
        variant28: 'Внезапное тяжёлое давление', variant29: 'Каменная упряжь', variant30: 'Разросшееся давление',
        variant31: 'Плужный рывок', variant32: 'Живучая упряжь', variant33: 'Давление снизу вновь',
        variant34: 'Плужная прыть', variant35: 'Плужная выносливость'
    },
    enem3: {
        variant1: 'Бодающий удар', variant2: 'Острый рог', variant3: 'Бодающая сила',
        variant4: 'Шкурная защита', variant5: 'Удар рогом', variant6: 'Едкая слюна',
        variant7: 'Бодающая мощь', variant8: 'Прочная шкура', variant9: 'Долгая пауза перед рогом',
        variant10: 'Живучий Бодень', variant11: 'Цепкий рог', variant12: 'Удар и в загон',
        variant13: 'Толстая шкура', variant14: 'Неутомимый Бодень', variant15: 'Разбег перед боданием',
        variant16: 'Меткий рог', variant17: 'Бодающая хватка', variant18: 'Упрямый взгляд',
        variant19: 'Удар рогом вмиг', variant20: 'Загонный дух', variant21: 'Стойкая шкура',
        variant22: 'Юркий Бодень', variant23: 'Бодающая стойкость', variant24: 'Чуткие рога',
        variant25: 'Ускользающий рог', variant26: 'Дикий удар рогом', variant27: 'Мощь слюны',
        variant28: 'Внезапный редкий удар', variant29: 'Каменные рога', variant30: 'Разросшиеся рога',
        variant31: 'Бодающий рывок', variant32: 'Живучая шкура', variant33: 'Пауза-удар вновь',
        variant34: 'Бодающая прыть', variant35: 'Бодающая выносливость'
    },
    enem4: {
        variant1: 'Пластовый удар', variant2: 'Ком земли', variant3: 'Пластовая сила',
        variant4: 'Земляная броня', variant5: 'Бросок пласта', variant6: 'Едкая глина пласта',
        variant7: 'Пластовая мощь', variant8: 'Прочный пласт', variant9: 'Направленный бросок земли',
        variant10: 'Живучий Бороздень', variant11: 'Цепкий пласт', variant12: 'Бросок и в борозду',
        variant13: 'Толстый пласт', variant14: 'Неутомимый Бороздень', variant15: 'Пружинистый пласт',
        variant16: 'Меткий ком', variant17: 'Пластовая хватка', variant18: 'Взгляд из борозды',
        variant19: 'Бросок пласта вмиг', variant20: 'Дух борозды', variant21: 'Стойкий пласт',
        variant22: 'Юркий Бороздень', variant23: 'Пластовая стойкость', variant24: 'Чуткий пласт',
        variant25: 'Ускользающий пласт', variant26: 'Дикий бросок земли', variant27: 'Мощь глины',
        variant28: 'Направленный бросок вмиг', variant29: 'Каменный пласт', variant30: 'Разросшийся пласт',
        variant31: 'Пластовый рывок', variant32: 'Живучий пласт', variant33: 'Бросок земли вновь',
        variant34: 'Пластовая прыть', variant35: 'Пластовая выносливость'
    },
    enem5: {
        variant1: 'Богатырский удар', variant2: 'Неподъёмная соха', variant3: 'Богатырская сила',
        variant4: 'Кольчуга пахаря', variant5: 'Удар сохой', variant6: 'Пот богатыря',
        variant7: 'Богатырская мощь', variant8: 'Несокрушимая кольчуга', variant9: 'Борозда через всё поле',
        variant10: 'Живучий Микула', variant11: 'Хватка сохи', variant12: 'Удар и вся борозда',
        variant13: 'Могучая кольчуга', variant14: 'Неутомимый Микула', variant15: 'Шаг богатыря',
        variant16: 'Меткая соха', variant17: 'Богатырская хватка', variant18: 'Взгляд силача',
        variant19: 'Мгновенный удар сохой', variant20: 'Дух земли-матушки', variant21: 'Несокрушимая стойкость',
        variant22: 'Юркий для богатыря', variant23: 'Богатырская стойкость', variant24: 'Ухо земли',
        variant25: 'Ускользающая соха', variant26: 'Мощь пахаря', variant27: 'Мощь пота',
        variant28: 'Внезапный прямой удар', variant29: 'Каменная кольчуга', variant30: 'Мощь земли разрослась',
        variant31: 'Богатырский рывок', variant32: 'Живучая кольчуга', variant33: 'Борозда вновь',
        variant34: 'Богатырская прыть', variant35: 'Богатырская выносливость'
    }
};
