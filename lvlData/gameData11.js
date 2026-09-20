let lvlNumber = 11;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.82, damageMultiplier: 0.613, minWaveDelay: 2260, minShotDelay: 147, minTelegraphMs: 490,
	phases: [
		{ phase: 1, minHp: 0.659, cadence: 0.999, speed: 0.99, damage: 1, telegraphMultiplier: 0.998, surpriseChance: 0.11, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.309, cadence: 0.791, speed: 1.099, damage: 1.12, telegraphMultiplier: 0.909, surpriseChance: 0.221, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0, cadence: 0.661, speed: 1.201, damage: 1.24, telegraphMultiplier: 0.851, surpriseChance: 0.3, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { combatIdentity: "Удар и искры", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'straight', cadence: 1.12, telegraphMs: 881, speedMultiplier: 0.941, damageMultiplier: 1.16, speedVariance: [0.78, 0.88, 0.98, 1.1, 1.2] },
		enem2: { combatIdentity: "Пропил и обратный ход", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'weave', cadence: 0.8, telegraphMs: 580, speedMultiplier: 1.22, damageMultiplier: 1.09, speedVariance: [0.94, 1.04, 1.14, 1.24, 1.34] },
		enem3: { combatIdentity: "Осколки горшка", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.941, telegraphMs: 721, speedMultiplier: 1.1, damageMultiplier: 1.14, speedVariance: [0.86, 0.98, 1.1, 1.22, 1.3] },
		enem4: { combatIdentity: "Переплетение нити", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.841, telegraphMs: 585, speedMultiplier: 1.18, damageMultiplier: 1.12, speedVariance: [0.9, 1.02, 1.14, 1.26, 1.34] },
		enem5: { combatIdentity: "Замыкание обруча", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4, movementStyle: 'drift', cadence: 0.721, telegraphMs: 621, speedMultiplier: 1.2, damageMultiplier: 1.22, speedVariance: [0.74, 0.9, 1.08, 1.26, 1.38] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl11/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl11/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl11/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl11/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl11/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Молотобой',
		image: 'images/enemies/regions/1_smesh_les/lvl11/1.webp',
		baseHP: (4800) + (4800 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'heavySink', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Пильщик',
		image: 'images/enemies/regions/1_smesh_les/lvl11/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'shatterBurst', durationMs: 1050 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Горшечник',
		image: 'images/enemies/regions/1_smesh_les/lvl11/3.webp',
		baseHP: (27000) + (27000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Ниточник',
		image: 'images/enemies/regions/1_smesh_les/lvl11/4.webp',
		baseHP: (74000) + (74000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'fleeStretch', durationMs: 1000 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Обручник',
		image: 'images/enemies/regions/1_smesh_les/lvl11/5.webp',
		baseHP: (88000) + (88000 * factorChar),
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
let timeNextBoss = 6;
const bossInterval = 4;

// Уровень 11 — Цех без ОТК (лесные ремесленники)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥20) стартуют высоко (y≤10); средние 10–15; медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [
	// ===== Молотобой =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 2 b
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, // 23 g

	// ===== Пильщик =====
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 24 g

	// ===== Горшечник =====
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 13 e
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 14 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, // 21 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, // 23 g

	// ===== Ниточник =====
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 6 c
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 }, // 9 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 10 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 12 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 13 e
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 14 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 16 f
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 17 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 g
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 21 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 23 g

	// ===== Обручник =====
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 10 d
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 14 e
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 17 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 21 g
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 24 g

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 281, bossDelayAbDop: 5401, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 239, bossDelayAbDop: 5601, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 261, bossDelayAbDop: 5200, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 310, bossDelayAbDop: 5800, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 251, bossDelayAbDop: 5099, firstWaveDelayMs: 2400 }, // 
];

// Способности: основной архетип / дно / быстрые / микс (~7 сетов)
const bossAbilitiesDop = [
	// Молотобой
	{ boss: 'enem1', indexAbilities: [0, 1], shotGapsMs: [250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12] },
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Удар и искры — знакомство" },
	{ boss: 'enem1', indexAbilities: [17, 18, 19], signature: true, minPhase: 2, recoveryMs: 650, label: "Удар и искры — иной конец" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 3, recoveryMs: 950, label: "Удар и искры — завершение" },

	// Пильщик
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 250, 400, 0] },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], shotGapsMs: [250, 250, 400] },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12], shotGapsMs: [0, 850, 0] },
	{ boss: 'enem2', indexAbilities: [13, 14], shotGapsMs: [250], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0], openingOrder: 1, label: "Пропил и обратный ход — знакомство" },
	{ boss: 'enem2', indexAbilities: [18, 19, 20], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [250, 250], label: "Пропил и обратный ход — иной конец" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 550], label: "Пропил и обратный ход — завершение" },

	// Горшечник
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4, 5, 6], shotGapsMs: [0, 400, 0] },
	{ boss: 'enem3', indexAbilities: [7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 250], openingOrder: 1, label: "Осколки горшка — знакомство" },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [550, 0, 0], label: "Осколки горшка — иной конец" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 400], label: "Осколки горшка — завершение" },

	// Ниточник
	{ boss: 'enem4', indexAbilities: [0, 1, 2], shotGapsMs: [0, 0] },
	{ boss: 'enem4', indexAbilities: [3, 4, 5], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [6, 7, 8], shotGapsMs: [250, 250] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11], shotGapsMs: [900, 350] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 250, 0], openingOrder: 1, label: "Переплетение нити — знакомство" },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 0], label: "Переплетение нити — иной конец" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [250, 0, 250], label: "Переплетение нити — завершение" },

	// Обручник
	{ boss: 'enem5', indexAbilities: [0, 1, 2], shotGapsMs: [0, 250] },
	{ boss: 'enem5', indexAbilities: [3, 4, 5, 6], shotGapsMs: [0, 0, 550] },
	{ boss: 'enem5', indexAbilities: [7, 8, 9], shotGapsMs: [400, 400] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13], shotGapsMs: [550, 0, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [250, 0], openingOrder: 1, label: "Замыкание обруча — знакомство" },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 250, 400], label: "Замыкание обруча — иной конец" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 250, 550], label: "Замыкание обруча — завершение" },

];

// Лорные названия связок. Уровень 11 — деревенские мастеровые: Молотобой (кузнец),
// Пильщик (пила), Горшечник (гончарный круг), Ниточник (пряжа), Обручник (бондарь).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Молотовый удар', variant2: 'Раскалённый гвоздь', variant3: 'Молотовая сила',
        variant4: 'Кузнечный фартук', variant5: 'Замах молота', variant6: 'Едкая окалина',
        variant7: 'Молотовая мощь', variant8: 'Фартук-щит', variant9: 'Тяжёлый замах',
        variant10: 'Живучий молотобой', variant11: 'Рукоять молота', variant12: 'Удар и в горн',
        variant13: 'Прочный фартук', variant14: 'Неутомимый молотобой', variant15: 'Пружинистый замах',
        variant16: 'Меткий гвоздь', variant17: 'Молотовая хватка', variant18: 'Взгляд сквозь искры',
        variant19: 'Удар молота', variant20: 'Кузнечный дух', variant21: 'Стойкий фартук',
        variant22: 'Юркий подмастерье', variant23: 'Молотовая стойкость', variant24: 'Чуткая наковальня',
        variant25: 'Ускользающая искра', variant26: 'Дикий замах', variant27: 'Мощь окалины',
        variant28: 'Внезапный удар', variant29: 'Каменная наковальня', variant30: 'Разросшаяся мощь',
        variant31: 'Молотовый рывок', variant32: 'Живучий фартук', variant33: 'Неутомимый замах',
        variant34: 'Молотовая прыть', variant35: 'Молотовая выносливость'
    },
    enem2: {
        variant1: 'Пилящий удар', variant2: 'Зазубренное лезвие', variant3: 'Пилящая сила',
        variant4: 'Опилочная защита', variant5: 'Меткий распил', variant6: 'Едкие опилки',
        variant7: 'Пилящая мощь', variant8: 'Рама пилы', variant9: 'Набирающая обороты пила',
        variant10: 'Живучий пильщик', variant11: 'Цепкие зубья', variant12: 'Распил и в опилки',
        variant13: 'Прочная рама', variant14: 'Неутомимый пильщик', variant15: 'Пружинящее полотно',
        variant16: 'Зуб пилы', variant17: 'Пилящая хватка', variant18: 'Прищур сквозь опилки',
        variant19: 'Мгновенный распил', variant20: 'Опилочный нюх', variant21: 'Стойкие зубья',
        variant22: 'Юркий пильщик', variant23: 'Пилящая стойкость', variant24: 'Чуткое полотно',
        variant25: 'Ускользающие опилки', variant26: 'Дикий распил', variant27: 'Мощь зубьев',
        variant28: 'Внезапный распил', variant29: 'Каменные зубья', variant30: 'Разросшееся полотно',
        variant31: 'Пилящий рывок', variant32: 'Живучие зубья', variant33: 'Неутомимый распил',
        variant34: 'Пилящая прыть', variant35: 'Пилящая выносливость'
    },
    enem3: {
        variant1: 'Гончарный удар', variant2: 'Острый черепок', variant3: 'Гончарная сила',
        variant4: 'Глиняная броня', variant5: 'Кривой бросок', variant6: 'Едкая глазурь',
        variant7: 'Гончарная мощь', variant8: 'Обожжённая глина', variant9: 'Стремительный бросок',
        variant10: 'Живучий горшечник', variant11: 'Цепкая глина', variant12: 'Бросок и вдребезги',
        variant13: 'Толстый черепок', variant14: 'Неутомимый горшечник', variant15: 'Вращающийся круг',
        variant16: 'Меткий черепок', variant17: 'Гончарная хватка', variant18: 'Взгляд у печи',
        variant19: 'Мгновенный бросок', variant20: 'Глиняный дух', variant21: 'Стойкий обжиг',
        variant22: 'Юркий горшечник', variant23: 'Гончарная стойкость', variant24: 'Пальцы у круга',
        variant25: 'Ускользающий черепок', variant26: 'Дикий бросок', variant27: 'Мощь глазури',
        variant28: 'Внезапный бросок', variant29: 'Обожжённость', variant30: 'Ком глины',
        variant31: 'Гончарный рывок', variant32: 'Живучая глина', variant33: 'Неутомимый круг',
        variant34: 'Гончарная прыть', variant35: 'Гончарная выносливость'
    },
    enem4: {
        variant1: 'Нитяной удар', variant2: 'Острая игла', variant3: 'Нитяная сила',
        variant4: 'Тканая защита', variant5: 'Меткий стежок', variant6: 'Едкая нить',
        variant7: 'Нитяная мощь', variant8: 'Плотное полотно', variant9: 'Переплетающийся рывок',
        variant10: 'Живучий ниточник', variant11: 'Цепкая нить', variant12: 'Стежок и в клубок',
        variant13: 'Толстое полотно', variant14: 'Неутомимый ниточник', variant15: 'Пружинящая нить',
        variant16: 'Меткая игла', variant17: 'Нитяная хватка', variant18: 'Взгляд сквозь нити',
        variant19: 'Мгновенный стежок', variant20: 'Тканый нюх', variant21: 'Стойкое полотно',
        variant22: 'Юркий ниточник', variant23: 'Нитяная стойкость', variant24: 'Чуткая нить',
        variant25: 'Ускользающая нить', variant26: 'Дикое плетение', variant27: 'Мощь иглы',
        variant28: 'Внезапный стежок', variant29: 'Каменное полотно', variant30: 'Разросшийся клубок',
        variant31: 'Нитяной рывок', variant32: 'Живучее полотно', variant33: 'Неутомимое плетение',
        variant34: 'Нитяная прыть', variant35: 'Нитяная выносливость'
    },
    enem5: {
        variant1: 'Обручевый удар', variant2: 'Острый обод', variant3: 'Обручевая сила',
        variant4: 'Клёпка-щит', variant5: 'Бросок обруча', variant6: 'Смола клёпки',
        variant7: 'Обручевая мощь', variant8: 'Прочная клёпка', variant9: 'Замыкающийся рывок',
        variant10: 'Живучий обручник', variant11: 'Цепкий обод', variant12: 'Бросок и в бочку',
        variant13: 'Толстая клёпка', variant14: 'Неутомимый обручник', variant15: 'Пружинистый обруч',
        variant16: 'Меткий обод', variant17: 'Обручевая хватка', variant18: 'Взгляд сквозь обручи',
        variant19: 'Замыкание дуги', variant20: 'Дубовый дух', variant21: 'Стойкая клёпка',
        variant22: 'Юркий обручник', variant23: 'Обручевая стойкость', variant24: 'Чуткий обод',
        variant25: 'Ускользающий обруч', variant26: 'Дикий обруч', variant27: 'Мощь смолы',
        variant28: 'Внезапное замыкание', variant29: 'Каменная клёпка', variant30: 'Разросшийся обруч',
        variant31: 'Обручевый рывок', variant32: 'Живучая клёпка', variant33: 'Неутомимая дуга',
        variant34: 'Обручевая прыть', variant35: 'Обручевая выносливость'
    }
};
