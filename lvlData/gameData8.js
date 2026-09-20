let lvlNumber = 8;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.93, damageMultiplier: 1.11, minWaveDelay: 2420, minShotDelay: 164, minTelegraphMs: 527,
	phases: [
		{ phase: 1, minHp: 0.641, cadence: 0.98, speed: 0.965, damage: 1, telegraphMultiplier: 0.975, surpriseChance: 0.09, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.285, cadence: 0.851, speed: 1.091, damage: 1.11, telegraphMultiplier: 0.925, surpriseChance: 0.165, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0, cadence: 0.731, speed: 1.16, damage: 1.21, telegraphMultiplier: 0.875, surpriseChance: 0.245, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { combatIdentity: "Румяный пирожок: жар с одного края, остуда с другого — медленный удар, — и снова жар с первого", combatTrick: "жар слева, медленная остуда справа, и снова жар слева — игрок гасит жар и забывает про медленный удар", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.948, telegraphMs: 802, speedMultiplier: 0.74, damageMultiplier: 1.03, speedVariance: [0.84, 0.95, 1.06, 1.16, 1.24] },
		enem2: { combatIdentity: "Масляный блин: скользит по боковым полосам — то у самой кромки, то ближе к середине", combatTrick: "блин скользит по боковым полосам, игрок идёт за ним — и вдруг уходит в центр", signatureEvery: 5, movementStyle: 'drift', cadence: 1.002, telegraphMs: 561, speedMultiplier: 0.74, damageMultiplier: 1.06, speedVariance: [0.9, 1, 1.1, 1.2, 1.28] },
		enem3: { combatIdentity: "Тяжёлый каравай: давит двумя парами боков — медленный удар с одного края, пара быстрых с другого", combatTrick: "тяжёлый бок слева появляется первым, пара быстрых справа прилетает раньше него", signatureEvery: 4, movementStyle: 'pause', cadence: 1.151, telegraphMs: 901, speedMultiplier: 0.74, damageMultiplier: 1.24, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.14] },
		enem4: { combatIdentity: "Катящееся яблочко: разгоняется и таранит, каждый следующий удар чаще предыдущего", combatTrick: "первый удар приходит неспешно, а каждый следующий всё быстрее — темп ускоряется прямо в комбо", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.751, telegraphMs: 563, speedMultiplier: 0.74, damageMultiplier: 1.1, speedVariance: [0.78, 0.92, 1.08, 1.22, 1.34] },
		enem5: { combatIdentity: "Стреляющий орех: скорлупа щёлкает три раза в одну полосу, а потом стреляет с другой стороны", combatTrick: "три щелчка подряд в одну полосу приучают стоять в другой — и удар туда", signatureEvery: 3, movementStyle: 'straight', cadence: 0.848, telegraphMs: 559, speedMultiplier: 0.761, damageMultiplier: 1.18, speedVariance: [0.92, 1.02, 1.12, 1.22, 1.3] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl8/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl8/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl8/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl8/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl8/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Жарёныш',
		image: 'images/enemies/regions/1_smesh_les/lvl8/1.webp',
		baseHP: (4350) + (4350 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'ashFade', durationMs: 1150 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Скользыш',
		image: 'images/enemies/regions/1_smesh_les/lvl8/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'meltDown', durationMs: 1200 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Буханка',
		image: 'images/enemies/regions/1_smesh_les/lvl8/3.webp',
		baseHP: (24000) + (24000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'puffPop', durationMs: 1000 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Катёныш',
		image: 'images/enemies/regions/1_smesh_les/lvl8/4.webp',
		baseHP: (68000) + (68000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'rollOff', durationMs: 1250 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Щелкун',
		image: 'images/enemies/regions/1_smesh_les/lvl8/5.webp',
		baseHP: (82000) + (82000 * factorChar),
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'shatterBurst', durationMs: 1050 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 3;
const bossInterval = 6;

// Уровень 8 — Кухня взбунтовалась (ожившая еда)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤10); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [
	// ===== Жарёныш =====
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, // 17 e
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 77, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 72, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 29 h

	// ===== Скользыш =====
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 29 h

	// ===== Буханка =====
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 95, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 30 h

	// ===== Катёныш =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 27, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 77, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 29 h

	// ===== Щелкун =====
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 27, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 27, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 30 h

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 232, bossDelayAbDop: 5101, firstWaveDelayMs: 2328 }, // жар накатывает волнами
	{ boss: 'enem2', bossDelayAb: 191, bossDelayAbDop: 4968, firstWaveDelayMs: 2400 }, // блин скользит неторопливо
	{ boss: 'enem3', bossDelayAb: 229, bossDelayAbDop: 5951, firstWaveDelayMs: 2400 }, // каравай давит неторопливо
	{ boss: 'enem4', bossDelayAb: 186, bossDelayAbDop: 4589, firstWaveDelayMs: 2285 }, // яблочко разгоняется
	{ boss: 'enem5', bossDelayAb: 199, bossDelayAbDop: 4256, firstWaveDelayMs: 2400 }, // щелчки без остановки
];

// Способности: медленные / средние / быстрые / микс
const bossAbilitiesDop = [
	// Жарёныш
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "Слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5, 6, 7], label: "Дважды справа и трижды слева" },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Жар — знакомство: дважды слева, медленный справа и в центр" },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16], label: "В центр, дважды слева, справа и в центр" },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11, 17], signature: true, minPhase: 2, label: "Жар — иной конец: дважды слева, медленный справа, в центр и справа" },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22, 23], minPhase: 3, label: "Слева, справа, дважды слева, медленный слева и в центр" },
	{ boss: 'enem1', indexAbilities: [24, 25, 26], label: "В центр и дважды справа" },
	{ boss: 'enem1', indexAbilities: [27, 28, 29], minPhase: 2, label: "Слева, в центр и справа" },

	// Скользыш
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], label: "Дважды слева и дважды справа" },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7], label: "Дважды справа, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Скольжение — знакомство: дважды слева, справа и в центр" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15], label: "Справа, два в центр и слева" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 16], signature: true, minPhase: 2, label: "Скольжение — иной конец: дважды слева и дважды справа" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21], minPhase: 3, label: "Дважды справа, дважды слева и в центр" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25], label: "Слева, дважды справа и в центр" },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29], minPhase: 2, label: "Слева, в центр и дважды справа" },

	// Буханка
	{ boss: 'enem3', indexAbilities: [0, 1, 2], label: "Справа, слева и медленный справа" },
	{ boss: 'enem3', indexAbilities: [3, 4, 5, 6], label: "Дважды справа, слева и медленный слева" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Каравай — знакомство: дважды слева, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14, 15], label: "Дважды справа, в центр и дважды слева" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 16], signature: true, minPhase: 2, label: "Каравай — иной конец: дважды слева, в центр и медленный справа" },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20, 21], minPhase: 3, label: "Трижды справа, медленный слева и в центр" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25], label: "Слева и трижды справа" },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "В центр, справа и трижды слева" },

	// Катёныш
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], label: "Дважды слева, в центр и справа" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], label: "Справа, в центр и дважды слева" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Разгон — знакомство: трижды слева и справа" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15], label: "В центр, слева, в центр и слева" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11, 16], signature: true, minPhase: 2, label: "Разгон — иной конец: трижды слева, справа и в центр" },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21], minPhase: 3, label: "5 раза слева" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25], label: "В центр, справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29], minPhase: 2, label: "Дважды справа и дважды слева" },

	// Щелкун
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], label: "Трижды слева и в центр" },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7], label: "В центр, дважды слева и справа" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12], signature: true, minPhase: 1, label: "Щелчки — знакомство: трижды слева, в центр и справа" },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16], label: "3 в центр и слева" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 17, 18], signature: true, minPhase: 2, label: "Щелчки — иной конец: трижды слева, справа и слева" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23], minPhase: 3, label: "4 раза слева и справа" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27], label: "Слева, два в центр и справа" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30], minPhase: 2, label: "Справа и дважды слева" },

];

// Лорные названия связок. Уровень 8: Жарёныш (масло, корка), Скользыш (слизь),
// Буханка (хлеб, закваска), Катёныш (круглый, подскоки), Щелкун (жвалы, скорлупа).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Жарящий удар', variant2: 'Кипящее масло', variant3: 'Жареная сила',
        variant4: 'Хрустящая корка', variant5: 'Плевок масла', variant6: 'Обжигающий укус',
        variant7: 'Жареная мощь', variant8: 'Панированная броня', variant9: 'Стремительный жар',
        variant10: 'Живучий жарёныш', variant11: 'Цепкая корочка', variant12: 'Плевок и в масло',
        variant13: 'Плотная корка', variant14: 'Неутомимый жар', variant15: 'Подскок на сковороде',
        variant16: 'Брызг масла', variant17: 'Жареная хватка', variant18: 'Румяный прищур',
        variant19: 'Мгновенный плевок', variant20: 'Масляный нюх', variant21: 'Стойкая корка',
        variant22: 'Юркий жарёныш', variant23: 'Жареная стойкость', variant24: 'Чуткая корочка',
        variant25: 'Ускользающий в масло', variant26: 'Дикое шкварчание', variant27: 'Обжигающая мощь',
        variant28: 'Внезапный плевок', variant29: 'Каменная корка', variant30: 'Разросшийся жар',
        variant31: 'Жареный рывок', variant32: 'Живучая корка', variant33: 'Неутомимое шкварчание',
        variant34: 'Жареная прыть', variant35: 'Жареная выносливость'
    },
    enem2: {
        variant1: 'Скользящий удар', variant2: 'Обжигающая корочка', variant3: 'Блинная сила',
        variant4: 'Поджаристая корочка', variant5: 'Меткое скольжение', variant6: 'Горячее масло',
        variant7: 'Блинная мощь', variant8: 'Плотное тесто', variant9: 'Стремительное скольжение',
        variant10: 'Живучий скользыш', variant11: 'Цепкое тесто', variant12: 'Скольжение и в тень',
        variant13: 'Толстое тесто', variant14: 'Неутомимое скольжение', variant15: 'Пружинистое скольжение',
        variant16: 'Плевок горячего масла', variant17: 'Скользкая хватка', variant18: 'Немигающий блеск',
        variant19: 'Мгновенное скольжение', variant20: 'Румяный аромат', variant21: 'Стойкое тесто',
        variant22: 'Юркий скользыш', variant23: 'Скользкая стойкость', variant24: 'Чуткая корочка',
        variant25: 'Неуловимый скользыш', variant26: 'Дикое скольжение', variant27: 'Мощь горячего масла',
        variant28: 'Внезапное скольжение', variant29: 'Подгоревшая корочка', variant30: 'Разросшийся блин',
        variant31: 'Скользящий рывок', variant32: 'Живучее тесто', variant33: 'Неутомимый скользыш',
        variant34: 'Скользкая прыть', variant35: 'Скользкая выносливость'
    },
    enem3: {
        variant1: 'Хлебный удар', variant2: 'Зачерствевшая корка', variant3: 'Хлебная сила',
        variant4: 'Мякоть-щит', variant5: 'Бросок горбушки', variant6: 'Кислая закваска',
        variant7: 'Хлебная мощь', variant8: 'Толстая корка', variant9: 'Тяжёлый навал',
        variant10: 'Живучая буханка', variant11: 'Цепкий мякиш', variant12: 'Крошки и в норку',
        variant13: 'Плотный мякиш', variant14: 'Неутомимая выпечка', variant15: 'Пружинистый мякиш',
        variant16: 'Меткая горбушка', variant17: 'Хлебная хватка', variant18: 'Взгляд из-под корки',
        variant19: 'Мгновенный навал', variant20: 'Хлебный дух', variant21: 'Стойкая корка',
        variant22: 'Юркая горбушка', variant23: 'Хлебная стойкость', variant24: 'Чуткий мякиш',
        variant25: 'Ускользающие крошки', variant26: 'Дикая закваска', variant27: 'Кислая мощь',
        variant28: 'Внезапный навал', variant29: 'Каменная корка', variant30: 'Разбухшая сила',
        variant31: 'Хлебный рывок', variant32: 'Живучая корка', variant33: 'Неутомимый навал',
        variant34: 'Хлебная прыть', variant35: 'Хлебная выносливость'
    },
    enem4: {
        variant1: 'Катящийся удар', variant2: 'Острый скол', variant3: 'Катящаяся сила',
        variant4: 'Круглая защита', variant5: 'Меткий подскок', variant6: 'Едкий скол',
        variant7: 'Катящаяся мощь', variant8: 'Прочная скорлупа', variant9: 'Стремительный подскок',
        variant10: 'Живучий катёныш', variant11: 'Цепкая скорлупа', variant12: 'Скол и вкатился',
        variant13: 'Толстая скорлупа', variant14: 'Неутомимое качение', variant15: 'Пружинистый подскок',
        variant16: 'Скол-бросок', variant17: 'Катящаяся хватка', variant18: 'Зависший взгляд',
        variant19: 'Мгновенное падение', variant20: 'Пыльный нюх', variant21: 'Стойкая скорлупа',
        variant22: 'Юркий катёныш', variant23: 'Катящаяся стойкость', variant24: 'Чуткая скорлупа',
        variant25: 'Ускользающий подскок', variant26: 'Дикое качение', variant27: 'Мощь скола',
        variant28: 'Внезапное падение', variant29: 'Каменная скорлупа', variant30: 'Разросшийся подскок',
        variant31: 'Катящийся рывок', variant32: 'Живучая скорлупа', variant33: 'Неутомимое падение',
        variant34: 'Катящаяся прыть', variant35: 'Катящаяся выносливость'
    },
    enem5: {
        variant1: 'Щёлкающий удар', variant2: 'Раскалывающая трещина', variant3: 'Щёлкающая сила',
        variant4: 'Скорлупа-щит', variant5: 'Меткий щелчок', variant6: 'Ядровый сок',
        variant7: 'Щёлкающая мощь', variant8: 'Прочная скорлупа', variant9: 'Стремительный щелчок',
        variant10: 'Живучий щелкун', variant11: 'Цепкие когти скорлупы', variant12: 'Щелчок и в кору',
        variant13: 'Толстая скорлупа', variant14: 'Неутомимый щелчок', variant15: 'Ритмичный подскок',
        variant16: 'Меткий коготь скорлупы', variant17: 'Щёлкающая хватка', variant18: 'Взгляд из трещины',
        variant19: 'Мгновенный щелчок', variant20: 'Ореховый нюх', variant21: 'Стойкая скорлупа',
        variant22: 'Юркий щелкун', variant23: 'Щёлкающая стойкость', variant24: 'Чуткое ядро',
        variant25: 'Ускользающий щелчок', variant26: 'Дикий треск', variant27: 'Мощь ядра',
        variant28: 'Внезапный щелчок', variant29: 'Каменная скорлупа', variant30: 'Разросшееся ядро',
        variant31: 'Щёлкающий рывок', variant32: 'Живучая скорлупа', variant33: 'Неутомимый треск',
        variant34: 'Щёлкающая прыть', variant35: 'Щёлкающая выносливость'
    }
};
