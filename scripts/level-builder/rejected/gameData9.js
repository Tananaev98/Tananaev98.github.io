let lvlNumber = 9;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.915, damageMultiplier: 1.12, minWaveDelay: 2390, minShotDelay: 163, minTelegraphMs: 534,
	phases: [
		{ phase: 1, minHp: 0.635, cadence: 0.975, speed: 0.97, damage: 1, telegraphMultiplier: 0.97, surpriseChance: 0.095, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.28, cadence: 0.845, speed: 1.101, damage: 1.11, telegraphMultiplier: 0.921, surpriseChance: 0.17, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0, cadence: 0.725, speed: 1.171, damage: 1.22, telegraphMultiplier: 0.871, surpriseChance: 0.25, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { combatIdentity: "Жгучая крапива: хлещет парой листьев — слева и рядом с центром — и тут же повторяет хлёст с другой стороны", combatTrick: "пара листьев слева, и зеркальная пара справа — игрок гасит первую и не успевает за второй", signatureEvery: 4, movementStyle: 'weave', cadence: 0.9, telegraphMs: 798, speedMultiplier: 0.65, damageMultiplier: 1.02, speedVariance: [0.84, 0.96, 1.08, 1.2, 1.3] },
		enem2: { combatIdentity: "Цепкий репей: цепляется дважды за одно и то же место — второй раз медленно, репей прилипает", combatTrick: "быстрый удар в точку, и в ту же точку вторым — медленный, прилипший; игрок уходит, а он ещё летит", signatureEvery: 5, movementStyle: 'pause', cadence: 1.052, telegraphMs: 559, speedMultiplier: 0.66, damageMultiplier: 1.08, speedVariance: [0.86, 0.98, 1.1, 1.2, 1.28] },
		enem3: { combatIdentity: "Едкий борщевик: брызги очередью с одного края, а ожог — медленный, тяжёлый — с другого", combatTrick: "очередь брызг слева, а ожог справа появляется позже, но прилетает последним", signatureEvery: 3, movementStyle: 'drift', cadence: 0.801, telegraphMs: 560, speedMultiplier: 0.68, damageMultiplier: 1.1, speedVariance: [0.94, 1.04, 1.14, 1.24, 1.32] },
		enem4: { combatIdentity: "Колючий шиповник: ветви расходятся веером от центра к краю — то влево, то вправо", combatTrick: "ветви веером влево от центра, игрок идёт за ними — и последняя вылетает на правый край", signatureEvery: 4, movementStyle: 'straight', cadence: 0.999, telegraphMs: 557, speedMultiplier: 0.66, damageMultiplier: 1.14, speedVariance: [0.76, 0.9, 1.06, 1.22, 1.34] },
		enem5: { combatIdentity: "Хлещущая лоза: опутывает флангами и закрывает середину — сначала края, потом центр", combatTrick: "сначала края, потом лоза сжимается к центру — и место в середине, где стоял игрок, закрывается", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.853, telegraphMs: 701, speedMultiplier: 0.68, damageMultiplier: 1.2, speedVariance: [0.82, 0.94, 1.06, 1.2, 1.32] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl9/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl9/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl9/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl9/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl9/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Жгучка',
		image: 'images/enemies/regions/1_smesh_les/lvl9/1.webp',
		baseHP: (4500) + (4500 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1250 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Цеплялка',
		image: 'images/enemies/regions/1_smesh_les/lvl9/2.webp',
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
		dispName: 'Брызгун',
		image: 'images/enemies/regions/1_smesh_les/lvl9/3.webp',
		baseHP: (25000) + (25000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'puffPop', durationMs: 950 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Шиповка',
		image: 'images/enemies/regions/1_smesh_les/lvl9/4.webp',
		baseHP: (70000) + (70000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1200 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Хлестун',
		image: 'images/enemies/regions/1_smesh_les/lvl9/5.webp',
		baseHP: (84000) + (84000 * factorChar),
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 7;
const bossInterval = 4;

// Уровень 9 — Грядка зла (растения)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤10); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [
	// ===== Жгучка =====
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 74, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, // 29 h

	// ===== Цеплялка =====
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 30 h

	// ===== Брызгун =====
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 96, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 79, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 74, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 96, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 73, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 73, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 96, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 27, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 30 h
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 31 h

	// ===== Шиповка =====
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 17 f
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 21 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 24 h
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 25 h
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 27 h

	// ===== Хлестун =====
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 30 h

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 200, bossDelayAbDop: 4850, firstWaveDelayMs: 2304 }, // хлёсты парами
	{ boss: 'enem2', bossDelayAb: 233, bossDelayAbDop: 5234, firstWaveDelayMs: 2400 }, // репей цепляется неторопливо
	{ boss: 'enem3', bossDelayAb: 185, bossDelayAbDop: 4275, firstWaveDelayMs: 2400 }, // брызги без передышки
	{ boss: 'enem4', bossDelayAb: 234, bossDelayAbDop: 4822, firstWaveDelayMs: 2400 }, // ветви расходятся неспешно
	{ boss: 'enem5', bossDelayAb: 211, bossDelayAbDop: 4384, firstWaveDelayMs: 2256 }, // лоза хлещет без остановки
];

// Способности: архетип / подмножество / дно / быстрые / микс
const bossAbilitiesDop = [
	// Жгучка
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "Пара слева-центр и удар справа" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5, 6], label: "Пара слева-центр и пара справа-центр" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Хлёст — знакомство: пара слева-центр и пара справа" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14], label: "Слева, центр, слева и справа вперемешку" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Хлёст — иной конец: после двух пар удар слева" },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], minPhase: 3, label: "Три пары хлёстов: слева, справа и снова слева" },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25], label: "Справа, слева и два справа" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29], minPhase: 2, label: "Центр, справа, слева и снова центр" },

	// Цеплялка
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], label: "Слева, то же место медленно и справа" },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7], label: "Слева, два справа и слева, крайние полосы" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Репей — знакомство: слева, то же место медленно, потом дважды справа" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16], label: "Справа, слева и снова справа-слева, крайние полосы" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 17], signature: true, minPhase: 2, label: "Репей — иной конец: после прилипшего снова слева" },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22], minPhase: 3, label: "Слева, то же место медленно, дважды в центр и справа" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26], label: "Слева, справа, центр и справа" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30], minPhase: 2, label: "Справа, центр и слева" },

	// Брызгун
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], label: "Брызги слева, справа и в центр" },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7], label: "Брызги справа, слева и снова справа" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11, 12], signature: true, minPhase: 1, label: "Брызги — знакомство: очередь слева и ожог справа последним" },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16], label: "Справа, центр и дважды слева" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 17, 18], signature: true, minPhase: 2, label: "Брызги — иной конец: после очереди слева ещё брызг в центр — он прилетает раньше ожога" },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23], minPhase: 3, label: "Брызги справа, очередь слева" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27], label: "Справа, слева, слева и справа" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31], minPhase: 2, label: "Слева и два справа" },

	// Шиповка
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], label: "Веер влево на две ветви и веер вправо" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], label: "Веер вправо на две ветви и удар слева" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Веер — знакомство: три ветви влево и последняя на правый край" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15], label: "Справа, две слева и в центр" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 16], signature: true, minPhase: 2, label: "Веер — иной конец: после трёх ветвей влево две ветви вправо" },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20], minPhase: 3, label: "Ветви влево, две вправо и снова влево" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23], label: "Слева и два в центр" },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27], minPhase: 2, label: "Справа, центр, справа и слева" },

	// Хлестун
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], label: "Края и потом центр" },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7], label: "Края справа-слева и центр" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12], signature: true, minPhase: 1, label: "Лоза — знакомство: края, центр и снова справа" },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16, 17], label: "Слева, два в центр и справа" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 18], signature: true, minPhase: 2, label: "Лоза — иной конец: после сжатия к центру снова край слева" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23], minPhase: 3, label: "Края по очереди и закрытая середина" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26], label: "Центр и два слева" },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30], minPhase: 2, label: "Справа, слева, справа и центр" },

];

// Лорные названия связок. Уровень 9 — злые растения: Жгучка (крапива), Цеплялка (репей),
// Брызгун (брызжущий сок), Шиповка (колючий куст), Хлестун (лиана-удав).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Жгучий хлёст', variant2: 'Обжигающий лист', variant3: 'Жгучая сила',
        variant4: 'Ворсистая защита', variant5: 'Меткий хлёст', variant6: 'Ядовитый ворс',
        variant7: 'Жгучая мощь', variant8: 'Плотные листья', variant9: 'Стремительный хлёст',
        variant10: 'Живучая жгучка', variant11: 'Цепкий стебель', variant12: 'Хлёст и в заросли',
        variant13: 'Толстый стебель', variant14: 'Неутомимый хлёст', variant15: 'Пружинистый стебель',
        variant16: 'Меткий ожог', variant17: 'Жгучая хватка', variant18: 'Взгляд из листвы',
        variant19: 'Мгновенный хлёст', variant20: 'Травяной дух', variant21: 'Стойкие листья',
        variant22: 'Юркая жгучка', variant23: 'Жгучая стойкость', variant24: 'Чуткий ворс',
        variant25: 'Ускользающий стебель', variant26: 'Дикий ожог', variant27: 'Ядовитая мощь',
        variant28: 'Внезапный хлёст', variant29: 'Каменный стебель', variant30: 'Разросшиеся листья',
        variant31: 'Жгучий рывок', variant32: 'Живучий ворс', variant33: 'Неутомимые заросли',
        variant34: 'Жгучая прыть', variant35: 'Жгучая выносливость'
    },
    enem2: {
        variant1: 'Цепляющий удар', variant2: 'Колючий репей', variant3: 'Цепкая сила',
        variant4: 'Колючая защита', variant5: 'Бросок репья', variant6: 'Едкий сок',
        variant7: 'Цепкая мощь', variant8: 'Плотные колючки', variant9: 'Стремительное сближение',
        variant10: 'Живучая цеплялка', variant11: 'Впившиеся колючки', variant12: 'Бросок и в чащу',
        variant13: 'Толстые колючки', variant14: 'Неутомимое цепляние', variant15: 'Пружинистый рывок',
        variant16: 'Меткий репей', variant17: 'Хватка репья', variant18: 'Взгляд из углов',
        variant19: 'Мгновенное сближение', variant20: 'Колючий нюх', variant21: 'Стойкие колючки',
        variant22: 'Юркая цеплялка', variant23: 'Цепкая стойкость', variant24: 'Чуткие колючки',
        variant25: 'Ускользающий репей', variant26: 'Дикое цепляние', variant27: 'Мощь сока',
        variant28: 'Внезапное сближение', variant29: 'Каменные колючки', variant30: 'Разросшиеся репьи',
        variant31: 'Цепляющий рывок', variant32: 'Живучие колючки', variant33: 'Неутомимое сближение',
        variant34: 'Цепкая прыть', variant35: 'Цепкая выносливость'
    },
    enem3: {
        variant1: 'Брызжущий удар', variant2: 'Едкая струя', variant3: 'Брызжущая сила',
        variant4: 'Мокрая защита', variant5: 'Меткая струя', variant6: 'Жгучий брызг',
        variant7: 'Брызжущая мощь', variant8: 'Плотная кожица', variant9: 'Стремительная струя',
        variant10: 'Живучий брызгун', variant11: 'Липкий брызг', variant12: 'Струя и в чащу',
        variant13: 'Тугая кожица', variant14: 'Неутомимая струя', variant15: 'Пружинистый выброс',
        variant16: 'Меткий выброс', variant17: 'Брызжущая хватка', variant18: 'Влажный прищур',
        variant19: 'Мгновенная струя', variant20: 'Сочный нюх', variant21: 'Стойкая кожица',
        variant22: 'Юркий брызгун', variant23: 'Брызжущая стойкость', variant24: 'Чуткая кожица',
        variant25: 'Ускользающий брызг', variant26: 'Дикая струя', variant27: 'Мощь струи',
        variant28: 'Внезапная струя', variant29: 'Каменная кожица', variant30: 'Разросшийся напор',
        variant31: 'Брызжущий рывок', variant32: 'Живучая кожица', variant33: 'Неутомимый напор',
        variant34: 'Брызжущая прыть', variant35: 'Брызжущая выносливость'
    },
    enem4: {
        variant1: 'Колющий выпад', variant2: 'Острый шип', variant3: 'Шиповая сила',
        variant4: 'Шипастая броня', variant5: 'Меткий укол', variant6: 'Ядовитый шип',
        variant7: 'Шиповая мощь', variant8: 'Плотные шипы', variant9: 'Стремительный укол',
        variant10: 'Живучая шиповка', variant11: 'Цепкий шип', variant12: 'Укол и в заросли',
        variant13: 'Толстые шипы', variant14: 'Неутомимый укол', variant15: 'Пружинистый выпад',
        variant16: 'Меткий шип', variant17: 'Шиповая хватка', variant18: 'Колючий взгляд',
        variant19: 'Мгновенный выпад', variant20: 'Шиповый нюх', variant21: 'Стойкие шипы',
        variant22: 'Юркая шиповка', variant23: 'Шиповая стойкость', variant24: 'Чуткие шипы',
        variant25: 'Ускользающий выпад', variant26: 'Дикий укол', variant27: 'Мощь шипа',
        variant28: 'Внезапный выпад', variant29: 'Каменные шипы', variant30: 'Разросшиеся шипы',
        variant31: 'Шиповый рывок', variant32: 'Живучие шипы', variant33: 'Неутомимый выпад',
        variant34: 'Шиповая прыть', variant35: 'Шиповая выносливость'
    },
    enem5: {
        variant1: 'Хлёсткий удар', variant2: 'Обвивающий стебель', variant3: 'Хлёсткая сила',
        variant4: 'Лиановая защита', variant5: 'Меткий обхват', variant6: 'Сок лианы',
        variant7: 'Хлёсткая мощь', variant8: 'Плотная лиана', variant9: 'Стремительный обхват',
        variant10: 'Живучий хлестун', variant11: 'Цепкая лиана', variant12: 'Обхват и в заросли',
        variant13: 'Толстая лиана', variant14: 'Неутомимый обхват', variant15: 'Выжидающий обхват',
        variant16: 'Хлёст лианы', variant17: 'Хлёсткая хватка', variant18: 'Взгляд из листвы',
        variant19: 'Мгновенный обхват', variant20: 'Лиановый нюх', variant21: 'Стойкая лиана',
        variant22: 'Юркий хлестун', variant23: 'Хлёсткая стойкость', variant24: 'Чуткая лиана',
        variant25: 'Ускользающая лиана', variant26: 'Дикий обхват', variant27: 'Мощь лианы',
        variant28: 'Внезапный обхват', variant29: 'Каменная лиана', variant30: 'Разросшаяся лиана',
        variant31: 'Хлёсткий рывок', variant32: 'Живучая лиана', variant33: 'Пауза-удар',
        variant34: 'Хлёсткая прыть', variant35: 'Хлёсткая выносливость'
    }
};
