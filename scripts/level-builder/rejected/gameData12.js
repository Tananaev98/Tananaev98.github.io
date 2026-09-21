let lvlNumber = 12;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.801, damageMultiplier: 0.702, minWaveDelay: 2700, minShotDelay: 143, minTelegraphMs: 481,
	phases: [
		{ phase: 1, minHp: 0.662, cadence: 1.002, speed: 1.001, damage: 1, telegraphMultiplier: 1.003, surpriseChance: 0.121, maxActiveAttacks: 17 },
		{ phase: 2, minHp: 0.312, cadence: 0.781, speed: 1.109, damage: 1.13, telegraphMultiplier: 0.901, surpriseChance: 0.231, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0, cadence: 0.641, speed: 1.211, damage: 1.25, telegraphMultiplier: 0.839, surpriseChance: 0.321, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { combatIdentity: "Строевой шаг", combatTrick: "атаки качаются; ряды из трёх-четырёх ударов чередуют край и центр — успевай переводить прицел", signatureEvery: 4, movementStyle: 'weave', cadence: 0.96, telegraphMs: 719, speedMultiplier: 1.08, damageMultiplier: 1.06, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.28] },
		enem2: { combatIdentity: "Стрелы на разгоне", combatTrick: "стрелы разгоняются к концу полёта; поздние быстрые стрелы прилетают раньше ранних медленных", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.981, telegraphMs: 761, speedMultiplier: 0.941, damageMultiplier: 0.62, speedVariance: [0.82, 0.9, 0.98, 1.06, 1.14] },
		enem3: { combatIdentity: "Замах и удар", combatTrick: "дубины идут вразвалку и в конце рвутся вперёд; порядок прилёта не совпадает с порядком появления", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.181, telegraphMs: 701, speedMultiplier: 0.881, damageMultiplier: 1.3, speedVariance: [0.76, 0.86, 0.96, 1.08, 1.18] },
		enem4: { combatIdentity: "Зависший клинок", combatTrick: "клинки зависают в полёте, а потом падают; считай момент падения, а не появления", signatureEvery: 4, movementStyle: 'pause', cadence: 0.94, telegraphMs: 701, speedMultiplier: 1.051, damageMultiplier: 0.58, speedVariance: [0.84, 0.92, 1, 1.08, 1.16] },
		enem5: { combatIdentity: "Барабанная дробь", combatTrick: "частые серии по четыре-пять ударов с одного края и центра; темп не оставляет пауз", signatureEvery: 4, movementStyle: 'straight', cadence: 0.681, telegraphMs: 601, speedMultiplier: 1.221, damageMultiplier: 1.24, speedVariance: [0.86, 1, 1.14, 1.28, 1.4] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl12/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl12/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl12/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl12/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl12/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Строевик',
		image: 'images/enemies/regions/1_smesh_les/lvl12/1.webp',
		baseHP: (4950) + (4950 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'tumbleFall', durationMs: 1150 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Колчанчик',
		image: 'images/enemies/regions/1_smesh_les/lvl12/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'fleeStretch', durationMs: 1000 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Дубинщик',
		image: 'images/enemies/regions/1_smesh_les/lvl12/3.webp',
		baseHP: (28000) + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'heavySink', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Сабелька',
		image: 'images/enemies/regions/1_smesh_les/lvl12/4.webp',
		baseHP: (76000) + (76000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Барабань',
		image: 'images/enemies/regions/1_smesh_les/lvl12/5.webp',
		baseHP: (90000) + (90000 * factorChar),
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'packBurst', durationMs: 1100 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 7;
const bossInterval = 3;

// Уровень 12 — Дисциплина и дубина (военные)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥20) стартуют высоко (y≤10); средние 10–15; медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [
	// ===== Строевик =====
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 23 g

	// ===== Колчанчик =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 9 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 }, // 13 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 23 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 19 g
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 20 g
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, // 22 g

	// ===== Дубинщик =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 9 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 12 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, // 13 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, // 14 e
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 19 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, // 20 g
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 21 g

	// ===== Сабелька =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, // 27 g

	// ===== Барабань =====
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 29 g
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 32 g

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 270, bossDelayAbDop: 5601, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 261, bossDelayAbDop: 5400, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 321, bossDelayAbDop: 5800, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 281, bossDelayAbDop: 5201, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 212, bossDelayAbDop: 6600, firstWaveDelayMs: 2304 }, // 
];

// Способности: основной архетип / дно / быстрые / микс (~7 сетов)
const bossAbilitiesDop = [
	// Строевик
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "Слева, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5], label: "Справа, в центр и справа" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8], label: "Дважды слева и в центр" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12], label: "Дважды слева, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [13, 14, 15], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "В центр и дважды слева" },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 2, recoveryMs: 650, label: "Дважды слева и два в центр" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 3, recoveryMs: 950, label: "Дважды справа и два в центр" },

	// Колчанчик
	{ boss: 'enem2', indexAbilities: [0, 1, 2], label: "Слева, в центр и справа" },
	{ boss: 'enem2', indexAbilities: [3, 4, 5], label: "Слева, справа и в центр" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8], label: "Слева и два в центр" },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12], label: "Два в центр и дважды слева" },
	{ boss: 'enem2', indexAbilities: [13, 14, 15], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [450, 1100], openingOrder: 1, label: "Слева, справа и медленный в центр" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18], signature: true, minPhase: 2, recoveryMs: 650, label: "Два в центр и справа" },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [400, 250, 0], label: "Слева, в центр, справа и в центр" },

	// Дубинщик
	{ boss: 'enem3', indexAbilities: [0, 1, 2], label: "В центр, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [3, 4, 5], label: "В центр, справа и в центр" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8], label: "Дважды слева и в центр" },
	{ boss: 'enem3', indexAbilities: [9, 10, 11], label: "Справа и два в центр" },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Трижды слева и в центр" },
	{ boss: 'enem3', indexAbilities: [16, 17, 18], signature: true, minPhase: 2, recoveryMs: 650, label: "В центр, справа и в центр" },
	{ boss: 'enem3', indexAbilities: [19, 20, 21], signature: true, minPhase: 3, recoveryMs: 950, label: "3 в центр" },

	// Сабелька
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [700, 0, 0], label: "Слева, в центр и дважды слева" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], label: "Справа, в центр и дважды справа" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], label: "Два в центр и дважды слева" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15], label: "В центр, слева, в центр и слева" },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Трижды слева и медленный справа" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 2, recoveryMs: 650, label: "Справа, в центр, справа и в центр" },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 250, 250], label: "Два в центр и дважды слева" },

	// Барабань
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], label: "Трижды слева, в центр и слева" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 0], label: "Трижды справа, в центр и справа" },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 250, 0], label: "Слева, в центр, слева, в центр и слева" },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 250, 250, 250], label: "Справа, в центр, справа, в центр и справа" },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 250, 0], openingOrder: 1, label: "Слева, в центр, слева и в центр" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 550, 0], label: "Дважды справа, в центр, справа и в центр" },
	{ boss: 'enem5', indexAbilities: [29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [400, 0, 0], label: "Трижды справа и в центр" },

];

// Лорные названия связок. Уровень 12 — потешное войско: Строевик (штык), Колчанчик
// (лучник), Дубинщик (дубина), Сабелька (клинок), Барабань (барабан).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Строевой удар', variant2: 'Штыковой укол', variant3: 'Строевая сила',
        variant4: 'Кольчужная защита', variant5: 'Меткий залп', variant6: 'Едкий порох',
        variant7: 'Строевая мощь', variant8: 'Прочная кольчуга', variant9: 'Слаженный рывок',
        variant10: 'Живучий строевик', variant11: 'Цепкий штык', variant12: 'Залп и в строй',
        variant13: 'Толстая кольчуга', variant14: 'Неутомимый марш', variant15: 'Шаг в ногу',
        variant16: 'Меткий штык', variant17: 'Строевая хватка', variant18: 'Взгляд по команде',
        variant19: 'Мгновенный залп', variant20: 'Пороховой дух', variant21: 'Стойкий строй',
        variant22: 'Юркий строевик', variant23: 'Строевая стойкость', variant24: 'Ухо к команде',
        variant25: 'Ускользающий строй', variant26: 'Дикий залп', variant27: 'Мощь пороха',
        variant28: 'Внезапный залп', variant29: 'Каменный строй', variant30: 'Разросшийся строй',
        variant31: 'Строевой рывок', variant32: 'Живучая кольчуга', variant33: 'Неутомимый строй',
        variant34: 'Строевая прыть', variant35: 'Строевая выносливость'
    },
    enem2: {
        variant1: 'Стрельчатый удар', variant2: 'Острая стрела', variant3: 'Колчанная сила',
        variant4: 'Колчан-щит', variant5: 'Меткий выстрел', variant6: 'Едкий наконечник',
        variant7: 'Колчанная мощь', variant8: 'Прочный колчан', variant9: 'Частая дробь стрел',
        variant10: 'Живучий колчанчик', variant11: 'Цепкая стрела', variant12: 'Выстрел и в чащу',
        variant13: 'Толстый колчан', variant14: 'Неутомимый лучник', variant15: 'Пружинистая тетива',
        variant16: 'Меткая стрела', variant17: 'Колчанная хватка', variant18: 'Прищур на прицеле',
        variant19: 'Мгновенный выстрел', variant20: 'Лучный нюх', variant21: 'Стойкая тетива',
        variant22: 'Юркий колчанчик', variant23: 'Колчанная стойкость', variant24: 'Чуткая тетива',
        variant25: 'Ускользающая стрела', variant26: 'Дикий выстрел', variant27: 'Мощь наконечника',
        variant28: 'Внезапный выстрел', variant29: 'Каменный колчан', variant30: 'Разросшийся колчан',
        variant31: 'Колчанный рывок', variant32: 'Живучий колчан', variant33: 'Дробь стрел',
        variant34: 'Колчанная прыть', variant35: 'Колчанная выносливость'
    },
    enem3: {
        variant1: 'Дубинный удар', variant2: 'Раскалывающий шип', variant3: 'Дубинная сила',
        variant4: 'Кожаный доспех', variant5: 'Замах дубиной', variant6: 'Смола дубины',
        variant7: 'Дубинная мощь', variant8: 'Прочный доспех', variant9: 'Тяжёлый замах',
        variant10: 'Живучий дубинщик', variant11: 'Цепкая дубина', variant12: 'Удар и наземь',
        variant13: 'Толстый доспех', variant14: 'Неутомимый дубинщик', variant15: 'Пружинистый замах',
        variant16: 'Меткий шип', variant17: 'Дубинная хватка', variant18: 'Тяжёлый взгляд',
        variant19: 'Мгновенный удар', variant20: 'Дубовый дух', variant21: 'Стойкий доспех',
        variant22: 'Юркий дубинщик', variant23: 'Дубинная стойкость', variant24: 'Чуткая рукоять',
        variant25: 'Ускользающая дубина', variant26: 'Дикий замах', variant27: 'Мощь шипов',
        variant28: 'Внезапный удар', variant29: 'Каменная дубина', variant30: 'Разросшаяся дубина',
        variant31: 'Дубинный рывок', variant32: 'Живучий доспех', variant33: 'Неутомимый замах',
        variant34: 'Дубинная прыть', variant35: 'Дубинная выносливость'
    },
    enem4: {
        variant1: 'Сабельный удар', variant2: 'Острый клинок', variant3: 'Сабельная сила',
        variant4: 'Ножны-щит', variant5: 'Взмах сабли', variant6: 'Едкая заточка',
        variant7: 'Сабельная мощь', variant8: 'Прочные ножны', variant9: 'Быстрая серия ударов',
        variant10: 'Живучая сабелька', variant11: 'Цепкий клинок', variant12: 'Взмах и в ножны',
        variant13: 'Толстые ножны', variant14: 'Неутомимая сабелька', variant15: 'Пружинистый взмах',
        variant16: 'Меткий клинок', variant17: 'Сабельная хватка', variant18: 'Блеск клинка',
        variant19: 'Мгновенный взмах', variant20: 'Стальной дух', variant21: 'Стойкий клинок',
        variant22: 'Юркая сабелька', variant23: 'Сабельная стойкость', variant24: 'Чуткий клинок',
        variant25: 'Ускользающий клинок', variant26: 'Дикий взмах', variant27: 'Мощь заточки',
        variant28: 'Внезапный взмах', variant29: 'Каменный клинок', variant30: 'Разросшийся напор',
        variant31: 'Сабельный рывок', variant32: 'Живучие ножны', variant33: 'Неутомимая серия',
        variant34: 'Сабельная прыть', variant35: 'Сабельная выносливость'
    },
    enem5: {
        variant1: 'Барабанный удар', variant2: 'Острая палочка', variant3: 'Барабанная сила',
        variant4: 'Кожа барабана', variant5: 'Меткий ритм', variant6: 'Едкий грохот',
        variant7: 'Барабанная мощь', variant8: 'Прочная кожа', variant9: 'Пульсирующий рывок',
        variant10: 'Живучий барабань', variant11: 'Цепкая палочка', variant12: 'Удар и в дробь',
        variant13: 'Толстая кожа', variant14: 'Неутомимый барабанщик', variant15: 'Пружинистый бой',
        variant16: 'Меткая палочка', variant17: 'Барабанная хватка', variant18: 'Взгляд в ритм',
        variant19: 'Мгновенный бой', variant20: 'Ритмичный дух', variant21: 'Стойкая кожа',
        variant22: 'Юркий барабань', variant23: 'Барабанная стойкость', variant24: 'Чуткий ритм',
        variant25: 'Ускользающий ритм', variant26: 'Дикий грохот', variant27: 'Мощь боя',
        variant28: 'Внезапный бой', variant29: 'Каменная дробь', variant30: 'Разросшийся грохот',
        variant31: 'Барабанный рывок', variant32: 'Живучая кожа', variant33: 'Неутомимый пульс',
        variant34: 'Барабанная прыть', variant35: 'Барабанная выносливость'
    }
};
