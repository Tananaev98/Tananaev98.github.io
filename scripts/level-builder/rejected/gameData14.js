let lvlNumber = 14;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 14 переосмыслен: перед Бабой-ягой (уровень 15) игрок встречает её домашнюю
// свору — Кот-Баюн, Ворон, цепной Пёс, Ступа и, наконец, сама Избушка на курьих ножках
// как хранитель порога. Архетипы Баюнища/Каркуна/Ступолёта унаследованы с прежнего
// уровня 15 (тот же персонаж — тот же почерк), Цепняк и Избач спроектированы заново.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.721, damageMultiplier: 1.76, minWaveDelay: 2701, minShotDelay: 135, minTelegraphMs: 470,
	phases: [
		{ phase: 1, minHp: 0.663, cadence: 1.003, speed: 1.002, damage: 1, telegraphMultiplier: 1.004, surpriseChance: 0.141, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.313, cadence: 0.771, speed: 1.131, damage: 1.15, telegraphMultiplier: 0.902, surpriseChance: 0.271, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0, cadence: 0.63, speed: 1.251, damage: 1.3, telegraphMultiplier: 0.831, surpriseChance: 0.381, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { combatIdentity: "Заговорённый", combatTrick: "атаки зависают в полёте и падают разом; связки чередуют край и центр", signatureEvery: 4, movementStyle: 'pause', cadence: 1.019, telegraphMs: 820, speedMultiplier: 1.02, damageMultiplier: 0.96, speedVariance: [0.84, 0.94, 1.02, 1.1, 1.18] },
		enem2: { combatIdentity: "Дурной знак", combatTrick: "атаки уходят к центру по пути; свои и чужие удары сходятся по времени", signatureEvery: 4, movementStyle: 'drift', cadence: 0.921, telegraphMs: 721, speedMultiplier: 1.079, damageMultiplier: 0.84, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] },
		enem3: { combatIdentity: "Звено за звеном", combatTrick: "атаки летят прямо и быстро; связки по три-четыре удара сходятся у линии героя", signatureEvery: 4, movementStyle: 'straight', cadence: 1.05, telegraphMs: 781, speedMultiplier: 0.98, damageMultiplier: 1.1, speedVariance: [0.82, 0.92, 1.02, 1.12, 1.22] },
		enem4: { combatIdentity: "Топот на разгоне", combatTrick: "атаки разгоняются к концу полёта; серии по четыре-пять ударов сжимаются", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.839, telegraphMs: 651, speedMultiplier: 1.121, damageMultiplier: 0.68, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26] },
		enem5: { combatIdentity: "Налёт стаей", combatTrick: "в конце полёта атаки рвутся вперёд; серии из пяти ударов идут плотно", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.749, telegraphMs: 641, speedMultiplier: 1.141, damageMultiplier: 1.08, speedVariance: [0.8, 0.94, 1.08, 1.22, 1.36] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Баюнище',
		image: 'images/enemies/regions/1_smesh_les/lvl14/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 36,
		size: '27%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Каркун-Вещун',
		image: 'images/enemies/regions/1_smesh_les/lvl14/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 36,
		size: '25%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Цепняк',
		image: 'images/enemies/regions/1_smesh_les/lvl14/3.webp',
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
		dispName: 'Ступолёт',
		image: 'images/enemies/regions/1_smesh_les/lvl14/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 38,
		size: '23%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Избач',
		image: 'images/enemies/regions/1_smesh_les/lvl14/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '29%',
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
let timeNextBoss = 9;
const bossInterval = 4;

// Уровень 14 — Дозор Бабы-яги. Архетипы: круги из центра / дуга по периметру /
// низкий забег с одного бока / направленный пролёт метлы / хранитель порога,
// который впервые на уровне перекрывает всю нижнюю полосу разом.
const bossAbilities = [
	// ===== Баюнище =====
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 12 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 18 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: 12, customSpeed: 20 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 12 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 4, customHP: 1, customDamage: 16, customSpeed: 17 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 20 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 13 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 14 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 19 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 5, customHP: 1, customDamage: 12, customSpeed: 20 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 12, customSpeed: 19 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: 12, customSpeed: 20 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 12, customHP: 1, customDamage: 16, customSpeed: 11 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: 16, customSpeed: 12 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 4, customHP: 1, customDamage: 16, customSpeed: 17 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 20 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 12, customHP: 1, customDamage: 16, customSpeed: 11 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 10, customHP: 1, customDamage: 16, customSpeed: 13 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 18 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 6, customHP: 1, customDamage: 12, customSpeed: 20 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 12 }, // 25 h
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 10, customHP: 1, customDamage: 16, customSpeed: 13 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 4, customHP: 1, customDamage: 16, customSpeed: 17 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 20 }, // 28 h

	// ===== Каркун-Вещун =====
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 16 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 5, customHP: 1, customDamage: 10, customSpeed: 18 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 13 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 17 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: 10, customSpeed: 18 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 10, customHP: 1, customDamage: 14, customSpeed: 12 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 4, customHP: 1, customDamage: 14, customSpeed: 13 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 4, customHP: 1, customDamage: 10, customSpeed: 18 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 10, customHP: 1, customDamage: 14, customSpeed: 12 }, // 9 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 4, customHP: 1, customDamage: 14, customSpeed: 16 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 4, customHP: 1, customDamage: 10, customSpeed: 18 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12 }, // 12 e
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 13 }, // 13 e
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 17 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 5, customHP: 1, customDamage: 10, customSpeed: 18 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 13 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 16 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 5, customHP: 1, customDamage: 10, customSpeed: 18 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 17 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12 }, // 20 g
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 14 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 17 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 10, customSpeed: 18 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 13 }, // 24 h
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 16 }, // 25 h
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 17 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 5, customHP: 1, customDamage: 10, customSpeed: 18 }, // 27 h

	// ===== Цепняк =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: 16, customSpeed: 15 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 17 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 8, customHP: 1, customDamage: 12, customSpeed: 19 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: 16, customSpeed: 16 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 19 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 12, customSpeed: 20 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 15 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 18 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 6, customHP: 1, customDamage: 12, customSpeed: 20 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 17 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 7, customHP: 1, customDamage: 12, customSpeed: 19 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: 16, customSpeed: 16 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 18 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: 16, customSpeed: 16 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 18 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 17 }, // 21 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 18 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 15 }, // 24 h
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 4, customHP: 1, customDamage: 12, customSpeed: 18 }, // 25 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9, customHP: 1, customDamage: 12, customSpeed: 19 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: 12, customSpeed: 20 }, // 27 h

	// ===== Ступолёт =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 8, customHP: 1, customDamage: 15, customSpeed: 11 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 16 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 17 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 7, customHP: 1, customDamage: 15, customSpeed: 11 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 15 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 17 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 16 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 6, customHP: 1, customDamage: 15, customSpeed: 11 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 6, customHP: 1, customDamage: 15, customSpeed: 12 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 16 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 17 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 17 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 13 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 7, customHP: 1, customDamage: 15, customSpeed: 11 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 13 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 16 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 17 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 17 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 8, customHP: 1, customDamage: 15, customSpeed: 11 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 13 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 16 }, // 34 h
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: 15, customSpeed: 16 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17 }, // 36 h

	// ===== Избач =====
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 37, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 27, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 35 h
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14 }, // 39 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 339, bossDelayAbDop: 6001, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 301, bossDelayAbDop: 5500, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 310, bossDelayAbDop: 5400, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 291, bossDelayAbDop: 6800, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 249, bossDelayAbDop: 8301, firstWaveDelayMs: 2016 }, // 
];

const bossAbilitiesDop = [
	// Баюнище
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], label: "Трижды слева и в центр" },
	{ boss: 'enem1', indexAbilities: [4, 5, 6], label: "Слева, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9], label: "Слева и два в центр" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12], shotGapsMs: [700, 250], label: "Слева, в центр и справа" },
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [400, 700, 0], openingOrder: 1, label: "Слева, в центр, справа и в центр" },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 2, recoveryMs: 650, label: "Трижды слева и в центр" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24], signature: true, minPhase: 3, recoveryMs: 950, label: "Дважды слева, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28], label: "Слева, в центр, слева и в центр" },

	// Каркун-Вещун
	{ boss: 'enem2', indexAbilities: [0, 1, 2], shotGapsMs: [250, 250], label: "В центр и дважды справа" },
	{ boss: 'enem2', indexAbilities: [3, 4, 5], shotGapsMs: [0, 550], label: "Дважды справа и в центр" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8], label: "В центр, справа и в центр" },
	{ boss: 'enem2', indexAbilities: [9, 10, 11], label: "Трижды справа" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [700, 0, 700], openingOrder: 1, label: "Дважды справа, в центр и справа" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [700, 250, 400], label: "Справа, в центр, справа и в центр" },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [700, 0, 250], label: "Дважды справа и два в центр" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27], shotGapsMs: [0, 400, 400], label: "Дважды справа, в центр и справа" },

	// Цепняк
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], label: "Два в центр и дважды слева" },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7], label: "В центр, справа и два в центр" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10], label: "В центр и дважды справа" },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14], label: "В центр и трижды справа" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Два в центр и слева" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20], signature: true, minPhase: 2, recoveryMs: 650, label: "Два в центр и справа" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23], signature: true, minPhase: 3, recoveryMs: 950, label: "3 в центр" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27], label: "В центр, дважды слева и в центр" },

	// Ступолёт
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 0, 400], label: "Слева, в центр и дважды слева" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], label: "В центр, дважды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], label: "Два в центр и дважды слева" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16], label: "В центр, трижды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 550, 0, 0], openingOrder: 1, label: "В центр, слева, в центр и дважды слева" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [550, 0, 250, 550], label: "Дважды слева, в центр, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "В центр, трижды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35, 36], label: "В центр, дважды слева, в центр и слева" },

	// Избач
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [250, 250, 0, 550], label: "Трижды слева, в центр и слева" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [550, 250, 0, 0], label: "Справа, в центр и трижды справа" },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 0, 250], label: "Дважды слева, два в центр и слева" },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [250, 250, 250, 250], label: "Справа, в центр, справа, в центр и справа" },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 250, 0, 0], openingOrder: 1, label: "Дважды слева, в центр и дважды слева" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 0, 0], label: "Дважды справа, в центр и дважды справа" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 0, 0], label: "Слева, 3 в центр и слева" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39], shotGapsMs: [0, 0, 250, 0], label: "Два в центр и трижды слева" },

];

// Лорные названия связок. Уровень 14 — свита Бабы-Яги: Баюнище (Кот-Баюн, усыпляющий),
// Каркун-Вещун (вещий ворон), Цепняк (цепной дух), Ступолёт (ступа с метлой), Избач
// (домовой-страж порога).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Мурлычущий удар', variant2: 'Гипнотический коготь', variant3: 'Баюнья сила',
        variant4: 'Сказочная шёрстка', variant5: 'Меткий мурлык', variant6: 'Едкая колыбельная',
        variant7: 'Баюнья мощь', variant8: 'Плотная шерсть', variant9: 'Круги мурлыканья',
        variant10: 'Живучий Баюн', variant11: 'Цепкий коготь', variant12: 'Мурлык и в дрёму',
        variant13: 'Толстая шерсть', variant14: 'Неутомимая колыбельная', variant15: 'Пружинистый прыжок',
        variant16: 'Меткий гипноз', variant17: 'Баюнья хватка', variant18: 'Усыпляющий взгляд',
        variant19: 'Мгновенный гипноз', variant20: 'Сказочный дух', variant21: 'Стойкая к пробуждению',
        variant22: 'Юркий Баюн', variant23: 'Баюнья стойкость', variant24: 'Чуткое мурлыканье',
        variant25: 'Ускользающий сон', variant26: 'Дикое мурлыканье', variant27: 'Мощь колыбельной',
        variant28: 'Внезапный гипноз', variant29: 'Каменный сон', variant30: 'Волны сна',
        variant31: 'Баюний рывок', variant32: 'Живучая шерсть', variant33: 'Круг сна',
        variant34: 'Баюнья прыть', variant35: 'Баюнья выносливость'
    },
    enem2: {
        variant1: 'Вещий удар', variant2: 'Пророческий клюв', variant3: 'Вещая сила',
        variant4: 'Чёрное оперение', variant5: 'Меткий облёт', variant6: 'Едкий грай',
        variant7: 'Вещая мощь', variant8: 'Плотные чёрные перья', variant9: 'Дуга полёта',
        variant10: 'Живучий Каркун', variant11: 'Цепкий клюв', variant12: 'Грай и в облёт',
        variant13: 'Толстое оперение', variant14: 'Неутомимый вещун', variant15: 'Пружинистый взлёт',
        variant16: 'Меткий грай', variant17: 'Вещая хватка', variant18: 'Всевидящий взгляд',
        variant19: 'Мгновенный облёт', variant20: 'Пророческий нюх', variant21: 'Стойкое оперение',
        variant22: 'Юркий Каркун', variant23: 'Вещая стойкость', variant24: 'Ухо к судьбе',
        variant25: 'Ускользающая дуга', variant26: 'Дикий грай', variant27: 'Мощь клюва',
        variant28: 'Внезапный облёт', variant29: 'Каменное пророчество', variant30: 'Разросшаяся дуга',
        variant31: 'Вещий рывок', variant32: 'Живучее оперение', variant33: 'Неутомимый облёт',
        variant34: 'Вещая прыть', variant35: 'Вещая выносливость'
    },
    enem3: {
        variant1: 'Цепной удар', variant2: 'Ржавое звено', variant3: 'Цепная сила',
        variant4: 'Кандальная защита', variant5: 'Рывок цепи', variant6: 'Едкая ржавчина',
        variant7: 'Цепная мощь', variant8: 'Прочные кандалы', variant9: 'Низкий забег',
        variant10: 'Живучий Цепняк', variant11: 'Цепкое звено', variant12: 'Рывок и во тьму',
        variant13: 'Толстые кандалы', variant14: 'Неутомимый Цепняк', variant15: 'Пружинистая цепь',
        variant16: 'Меткое звено', variant17: 'Цепная хватка', variant18: 'Звенящий взгляд',
        variant19: 'Рывок цепи вмиг', variant20: 'Ржавый дух', variant21: 'Стойкие кандалы',
        variant22: 'Юркий Цепняк', variant23: 'Цепная стойкость', variant24: 'Чуткое звено',
        variant25: 'Ускользающая цепь', variant26: 'Дикий рывок', variant27: 'Мощь ржавчины',
        variant28: 'Внезапный рывок', variant29: 'Каменные кандалы', variant30: 'Разросшаяся цепь',
        variant31: 'Цепной рывок', variant32: 'Живучие кандалы', variant33: 'Неутомимый забег',
        variant34: 'Цепная прыть', variant35: 'Цепная выносливость'
    },
    enem4: {
        variant1: 'Ступный удар', variant2: 'Острый край ступы', variant3: 'Ступная сила',
        variant4: 'Чугунная броня', variant5: 'Взмах метлы', variant6: 'Зола из ступы',
        variant7: 'Ступная мощь', variant8: 'Прочный чугун', variant9: 'Пролёт метлой',
        variant10: 'Живучий Ступолёт', variant11: 'Цепкая метла', variant12: 'Взмах и в облака',
        variant13: 'Толстый чугун', variant14: 'Неутомимый полёт', variant15: 'Взлёт ступы',
        variant16: 'Меткий взмах', variant17: 'Ступная хватка', variant18: 'Взгляд из ступы',
        variant19: 'Мгновенный пролёт', variant20: 'Ветреный дух', variant21: 'Стойкий чугун',
        variant22: 'Юркий Ступолёт', variant23: 'Ступная стойкость', variant24: 'Чуткая метла',
        variant25: 'Ускользающий пролёт', variant26: 'Дикий полёт', variant27: 'Мощь золы',
        variant28: 'Внезапный пролёт', variant29: 'Каменный чугун', variant30: 'Размах метлы',
        variant31: 'Ступный рывок', variant32: 'Живучий чугун', variant33: 'Неутомимый пролёт',
        variant34: 'Ступная прыть', variant35: 'Ступная выносливость'
    },
    enem5: {
        variant1: 'Топот курьих ног', variant2: 'Резной коготь', variant3: 'Избяная сила',
        variant4: 'Бревенчатая защита', variant5: 'Разворот на ногах', variant6: 'Дым из трубы',
        variant7: 'Избяная мощь', variant8: 'Прочные брёвна', variant9: 'Рывок на курьих ногах',
        variant10: 'Живучий сруб', variant11: 'Цепкий коготь', variant12: 'Топот и приседание',
        variant13: 'Толстые брёвна', variant14: 'Страж порога', variant15: 'Скрип половиц',
        variant16: 'Меткий удар крыльцом', variant17: 'Когтистая хватка', variant18: 'Взгляд окон-глаз',
        variant19: 'Мгновенный разворот', variant20: 'Домовой дух сруба', variant21: 'Стойкие брёвна',
        variant22: 'Юркий на курьих ногах', variant23: 'Избяная стойкость', variant24: 'Чуткий скрип крыльца',
        variant25: 'Ускользающий разворот', variant26: 'Дикий топот', variant27: 'Мощь дыма из трубы',
        variant28: 'Внезапный разворот', variant29: 'Каменный фундамент', variant30: 'Разросшийся сруб',
        variant31: 'Рывок на когтях', variant32: 'Живучие брёвна', variant33: 'Неутомимый топот',
        variant34: 'Избяная прыть', variant35: 'Избяная выносливость'
    }
};
