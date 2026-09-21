let lvlNumber = 13;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.79, damageMultiplier: 0.629, minWaveDelay: 2701, minShotDelay: 145, minTelegraphMs: 480,
	phases: [
		{ phase: 1, minHp: 0.658, cadence: 0.998, speed: 0.999, damage: 1, telegraphMultiplier: 0.997, surpriseChance: 0.119, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.308, cadence: 0.779, speed: 1.121, damage: 1.14, telegraphMultiplier: 0.899, surpriseChance: 0.229, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0, cadence: 0.639, speed: 1.221, damage: 1.26, telegraphMultiplier: 0.842, surpriseChance: 0.319, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { combatIdentity: "Хват когтями", combatTrick: "в конце полёта когти резко ускоряются; связки чередуют край и центр", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.021, telegraphMs: 781, speedMultiplier: 1.04, damageMultiplier: 1.04, speedVariance: [0.88, 0.96, 1.04, 1.12, 1.2] },
		enem2: { combatIdentity: "Ухающий налёт", combatTrick: "атаки зависают в середине полёта; пятиударные серии сходятся по времени в конце", signatureEvery: 4, movementStyle: 'pause', cadence: 0.961, telegraphMs: 700, speedMultiplier: 1.081, damageMultiplier: 1.06, speedVariance: [0.82, 0.94, 1.06, 1.16, 1.26] },
		enem3: { combatIdentity: "Скользящий налёт", combatTrick: "атаки уходят к центру по пути; быстрые броски догоняют более ранние", signatureEvery: 4, movementStyle: 'drift', cadence: 1.14, telegraphMs: 899, speedMultiplier: 0.9, damageMultiplier: 1.28, speedVariance: [0.76, 0.88, 1, 1.12, 1.22] },
		enem4: { combatIdentity: "Долбёжка", combatTrick: "атаки качаются; серии из четырёх-пяти ударов с одного края и центра", signatureEvery: 4, movementStyle: 'weave', cadence: 0.881, telegraphMs: 621, speedMultiplier: 1.141, damageMultiplier: 0.72, speedVariance: [0.92, 1, 1.08, 1.16, 1.24] },
		enem5: { combatIdentity: "Токование", combatTrick: "атаки разгоняются к концу полёта; пятиударные серии идут очень плотно", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.701, telegraphMs: 611, speedMultiplier: 1.161, damageMultiplier: 1.2, speedVariance: [0.84, 0.98, 1.12, 1.24, 1.34] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl13/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl13/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl13/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl13/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl13/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Когтехват',
		image: 'images/enemies/regions/1_smesh_les/lvl13/1.webp',
		baseHP: (3400) + (3400 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'packBurst', durationMs: 1000 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Ухух',
		image: 'images/enemies/regions/1_smesh_les/lvl13/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1200 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Хаптун',
		image: 'images/enemies/regions/1_smesh_les/lvl13/3.webp',
		baseHP: (29000) + (29000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1100 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Долбун',
		image: 'images/enemies/regions/1_smesh_les/lvl13/4.webp',
		baseHP: (78000) + (78000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'shatterBurst', durationMs: 1050 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Токовик',
		image: 'images/enemies/regions/1_smesh_les/lvl13/5.webp',
		baseHP: (92000) + (92000 * factorChar),
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'spinAway', durationMs: 1250 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 8;
const bossInterval = 4;

// Уровень 13 — Хищные птицы
// Архетипы отличны от 10–12: правый спуск / только углы / закрытие полос / левая колонна / веер+бум.
// Без нижней стены у enem1 и enem4. Быстрые ≥20 стартуют y≤10.

const bossAbilities = [
	// ===== Когтехват =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 8 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 11 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 12 e
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 15 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 19 g
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, // 22 g

	// ===== Ухух =====
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 18 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, // 23 f
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, // 26 g

	// ===== Хаптун =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 9 d
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 11 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, // 12 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 13 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, // 14 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, // 15 f
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, // 17 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, // 18 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, // 19 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, // 20 g

	// ===== Долбун =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, // 31 g

	// ===== Токовик =====
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 34 g

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 290, bossDelayAbDop: 5599, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 250, bossDelayAbDop: 5201, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 341, bossDelayAbDop: 6001, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 231, bossDelayAbDop: 6600, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 213, bossDelayAbDop: 8301, firstWaveDelayMs: 2256 }, // 
];

const bossAbilitiesDop = [
	// Когтехват
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "В центр и дважды слева" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5], label: "Дважды слева и в центр" },
	{ boss: 'enem1', indexAbilities: [6, 7], label: "Слева и в центр" },
	{ boss: 'enem1', indexAbilities: [8, 9, 10], shotGapsMs: [550, 0], label: "Справа, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 700], openingOrder: 1, label: "В центр, слева, в центр и справа" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 2, recoveryMs: 650, label: "Дважды слева и два в центр" },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 3, recoveryMs: 950, label: "Трижды слева и в центр" },

	// Ухух
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], label: "Справа, в центр, дважды справа и в центр" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], label: "Справа, в центр и дважды справа" },
	{ boss: 'enem2', indexAbilities: [9, 10, 11], label: "Два в центр и справа" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15], label: "Дважды справа и два в центр" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Дважды справа и два в центр" },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 2, recoveryMs: 650, label: "Трижды справа и в центр" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26], signature: true, minPhase: 3, recoveryMs: 950, label: "Справа, в центр и справа" },

	// Хаптун
	{ boss: 'enem3', indexAbilities: [0, 1, 2], label: "В центр и дважды слева" },
	{ boss: 'enem3', indexAbilities: [3, 4, 5], label: "Слева и два в центр" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8], label: "В центр и дважды справа" },
	{ boss: 'enem3', indexAbilities: [9, 10], label: "Справа и в центр" },
	{ boss: 'enem3', indexAbilities: [11, 12, 13], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Два в центр и слева" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16], signature: true, minPhase: 2, recoveryMs: 650, label: "Два в центр и справа" },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 3, recoveryMs: 950, label: "В центр, дважды слева и в центр" },

	// Долбун
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [400, 0, 700], label: "Дважды слева, в центр и слева" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], label: "Дважды слева и два в центр" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], shotGapsMs: [400, 0, 700], label: "Слева, два в центр и слева" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16], shotGapsMs: [0, 0, 250, 550], label: "Дважды слева, в центр, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 0, 550], openingOrder: 1, label: "Трижды слева и два в центр" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 250, 250, 550], label: "В центр, трижды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 250, 250], label: "Дважды слева, два в центр и слева" },

	// Токовик
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [250, 250, 250, 0], label: "Трижды слева, в центр и слева" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [250, 0, 0, 0], label: "Трижды справа, в центр и справа" },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 250, 0], label: "В центр, слева, в центр и дважды слева" },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 250, 250, 250], label: "В центр, дважды справа, в центр и справа" },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [250, 0, 550, 0], openingOrder: 1, label: "Дважды слева, в центр и дважды слева" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 250, 0, 0], label: "Справа, в центр и трижды справа" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 250, 0, 0], label: "Слева, 3 в центр и слева" },

];

// Лорные названия связок. Уровень 13 — лесные птицы: Когтехват (хищник-когтевик), Ухух
// (молчаливый ночной охотник из угла), Хаптун (хватающий из засады), Долбун (дятел),
// Токовик (глухарь на току).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Когтистый удар', variant2: 'Разрывающий коготь', variant3: 'Хватательная сила',
        variant4: 'Пуховая защита', variant5: 'Захват когтем', variant6: 'Едкий клёв',
        variant7: 'Хватательная мощь', variant8: 'Плотное оперение', variant9: 'Тихий спуск',
        variant10: 'Живучий когтехват', variant11: 'Впившиеся когти', variant12: 'Захват и в небо',
        variant13: 'Крепкие перья', variant14: 'Охотник неба', variant15: 'Пружинистый взлёт',
        variant16: 'Меткий коготь', variant17: 'Хватка когтя', variant18: 'Взгляд с высоты',
        variant19: 'Мгновенный захват', variant20: 'Небесный нюх', variant21: 'Стойкое оперение',
        variant22: 'Юркий когтехват', variant23: 'Хватательная стойкость', variant24: 'Чуткий слух',
        variant25: 'Ускользающая тень', variant26: 'Дикий захват', variant27: 'Мощь клюва',
        variant28: 'Внезапный захват', variant29: 'Каменные когти', variant30: 'Разросшийся размах',
        variant31: 'Хватательный рывок', variant32: 'Живучее оперение', variant33: 'Неутомимый захват',
        variant34: 'Хватательная прыть', variant35: 'Хватательная выносливость'
    },
    enem2: {
        variant1: 'Шёпот-удар', variant2: 'Беззвучный коготь', variant3: 'Затаившаяся сила',
        variant4: 'Теневая защита', variant5: 'Бросок из угла', variant6: 'Шип во тьме',
        variant7: 'Затаившаяся мощь', variant8: 'Тёмное оперение', variant9: 'Бросок из тени',
        variant10: 'Живучий ухух', variant11: 'Цепкая тень', variant12: 'Бросок и в темноту',
        variant13: 'Плотная тень', variant14: 'Неутомимое ожидание', variant15: 'Рывок из угла',
        variant16: 'Меткий шип', variant17: 'Хватка из мрака', variant18: 'Взгляд из темноты',
        variant19: 'Мгновенный бросок', variant20: 'Ночной шёпот', variant21: 'Стойкое терпение',
        variant22: 'Юркий ухух', variant23: 'Затаившаяся стойкость', variant24: 'Чуткий шёпот',
        variant25: 'Ускользающая тень угла', variant26: 'Дикий шёпот', variant27: 'Мощь мрака',
        variant28: 'Внезапный шёпот', variant29: 'Каменное терпение', variant30: 'Разросшаяся тьма',
        variant31: 'Теневой рывок', variant32: 'Живучая тьма', variant33: 'Неутомимая пауза',
        variant34: 'Теневая прыть', variant35: 'Теневая выносливость'
    },
    enem3: {
        variant1: 'Хапающий удар', variant2: 'Разрывающий захват', variant3: 'Хапающая сила',
        variant4: 'Пернатая броня', variant5: 'Закрытие пути', variant6: 'Едкий плевок',
        variant7: 'Хапающая мощь', variant8: 'Прочные перья', variant9: 'Тяжёлое закрытие',
        variant10: 'Живучий хаптун', variant11: 'Цепкий захват', variant12: 'Хап и в чащу',
        variant13: 'Плотные перья', variant14: 'Неутомимый хаптун', variant15: 'Пружинистый рывок',
        variant16: 'Меткий хап', variant17: 'Хапающая хватка', variant18: 'Голодный взгляд',
        variant19: 'Мгновенный хап', variant20: 'Голодный нюх', variant21: 'Стойкие перья',
        variant22: 'Юркий хаптун', variant23: 'Хапающая стойкость', variant24: 'Чуткие перья',
        variant25: 'Ускользающий хап', variant26: 'Дикий хап', variant27: 'Мощь плевка',
        variant28: 'Внезапное закрытие', variant29: 'Каменные перья', variant30: 'Разросшийся размах',
        variant31: 'Хапающий рывок', variant32: 'Живучие перья', variant33: 'Неутомимое закрытие',
        variant34: 'Хапающая прыть', variant35: 'Хапающая выносливость'
    },
    enem4: {
        variant1: 'Долбящий удар', variant2: 'Острый клюв', variant3: 'Долбящая сила',
        variant4: 'Дятловая защита', variant5: 'Меткий стук', variant6: 'Скол коры',
        variant7: 'Долбящая мощь', variant8: 'Прочный клюв', variant9: 'Частый стук',
        variant10: 'Живучий долбун', variant11: 'Когти на стволе', variant12: 'Стук и в дупло',
        variant13: 'Крепкий клюв', variant14: 'Неутомимый стук', variant15: 'Пружинистая шея',
        variant16: 'Меткий скол', variant17: 'Долбящая хватка', variant18: 'Взгляд с ветки',
        variant19: 'Мгновенный стук', variant20: 'Древесный нюх', variant21: 'Стойкий клюв',
        variant22: 'Юркий долбун', variant23: 'Долбящая стойкость', variant24: 'Чуткий стук',
        variant25: 'Ускользающий на ствол', variant26: 'Дикий стук', variant27: 'Мощь скола',
        variant28: 'Внезапный стук', variant29: 'Каменный клюв', variant30: 'Разросшийся стук',
        variant31: 'Долбящий рывок', variant32: 'Живучий клюв', variant33: 'Колонна стука',
        variant34: 'Долбящая прыть', variant35: 'Долбящая выносливость'
    },
    enem5: {
        variant1: 'Токующий удар', variant2: 'Веер хвоста', variant3: 'Токующая сила',
        variant4: 'Оперённая защита', variant5: 'Меткий веер', variant6: 'Бой крыльями',
        variant7: 'Токующая мощь', variant8: 'Оперение хвоста', variant9: 'Раскрывающийся веер',
        variant10: 'Живучий токовик', variant11: 'Перья хвоста', variant12: 'Веер и в грохот',
        variant13: 'Толстое оперение', variant14: 'Неутомимый ток', variant15: 'Разбег перед взлётом',
        variant16: 'Бой крыла', variant17: 'Токующая хватка', variant18: 'Гордый взгляд',
        variant19: 'Мгновенный грохот', variant20: 'Брачный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий токовик', variant23: 'Токующая стойкость', variant24: 'Ухо на току',
        variant25: 'Ускользающий веер', variant26: 'Дикий ток', variant27: 'Мощь боя крыльями',
        variant28: 'Внезапный грохот', variant29: 'Каменный веер', variant30: 'Разросшийся хвост',
        variant31: 'Токующий рывок', variant32: 'Оперение-щит', variant33: 'Неутомимый грохот',
        variant34: 'Токующая прыть', variant35: 'Токующая выносливость'
    }
};
