let lvlNumber = 7;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.945, damageMultiplier: 1.09, minWaveDelay: 2450, minShotDelay: 168, minTelegraphMs: 533,
	phases: [
		{ phase: 1, minHp: 0.646, cadence: 0.985, speed: 0.96, damage: 1, telegraphMultiplier: 0.98, surpriseChance: 0.086, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.291, cadence: 0.855, speed: 1.079, damage: 1.1, telegraphMultiplier: 0.931, surpriseChance: 0.16, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0, cadence: 0.735, speed: 1.151, damage: 1.2, telegraphMultiplier: 0.881, surpriseChance: 0.24, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { combatIdentity: "Рубящий топор: скачет на рукояти неровными прыжками — то часто, то с заминкой", combatTrick: "два прыжка подряд, заминка и третий с другой стороны — ритм рвётся именно там, где игрок расслабился", signatureEvery: 4, movementStyle: 'weave', cadence: 0.952, telegraphMs: 799, speedMultiplier: 0.76, damageMultiplier: 1.02, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.22] },
		enem2: { combatIdentity: "Коса, летающая низко: взмахи по кругу — слева, через центр, справа и обратно, и каждый круг чаще", combatTrick: "взмахи идут по кругу слева-центр-справа-центр, и каждый следующий приходит быстрее предыдущего", signatureEvery: 5, movementStyle: 'drift', cadence: 1.049, telegraphMs: 530, speedMultiplier: 0.76, damageMultiplier: 1.14, speedVariance: [0.8, 0.9, 1, 1.1, 1.18] },
		enem3: { combatIdentity: "Плетёная корзина: зев смыкается с краёв внутрь — сначала дальние края, потом всё ближе к центру", combatTrick: "удары приходят парами с краёв и с каждой парой стягиваются к центру — пока игрок не окажется зажат", signatureEvery: 4, movementStyle: 'straight', cadence: 0.951, telegraphMs: 851, speedMultiplier: 0.761, damageMultiplier: 1.08, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.26] },
		enem4: { combatIdentity: "Беглый лапоть: пинает дважды в одно место — второй пинок вдогонку первому", combatTrick: "два пинка подряд в одну точку — игрок гасит первый и уводит прицел, а второй уже летит", signatureEvery: 4, movementStyle: 'pause', cadence: 0.8, telegraphMs: 558, speedMultiplier: 0.76, damageMultiplier: 1.09, speedVariance: [0.96, 1.06, 1.16, 1.24, 1.3] },
		enem5: { combatIdentity: "Медный самовар: пыхтит парой ударов и тут же повторяет ту же пару", combatTrick: "пара ударов, и ровно такая же пара следом — а в другой раз после повтора бьёт с другого бока", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.751, telegraphMs: 561, speedMultiplier: 0.75, damageMultiplier: 1.18, speedVariance: [0.78, 0.92, 1.06, 1.2, 1.32] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl7/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl7/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl7/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl7/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl7/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Колунчик',
		image: 'images/enemies/regions/1_smesh_les/lvl7/1.webp',
		baseHP: (4200) + (4200 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'shatterBurst', durationMs: 1000 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Свистуха',
		image: 'images/enemies/regions/1_smesh_les/lvl7/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'fleeStretch', durationMs: 1050 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Хваталка',
		image: 'images/enemies/regions/1_smesh_les/lvl7/3.webp',
		baseHP: (23000) + (23000) * factorChar,
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'packBurst', durationMs: 1000 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Лапоток',
		image: 'images/enemies/regions/1_smesh_les/lvl7/4.webp',
		baseHP: (66000) + (66000) * factorChar,
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'tumbleFall', durationMs: 1150 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Пыхтелкин',
		image: 'images/enemies/regions/1_smesh_les/lvl7/5.webp',
		baseHP: (80000) + (80000) * factorChar,
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'puffPop', durationMs: 1100 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 4;
const bossInterval = 7;

// Уровень 7 — Склад сбежал (ожившие лесные находки)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤12); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [
	// ===== Колунчик =====
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 77, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 28 h

	// ===== Свистуха =====
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 27, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 25 h
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 27 h

	// ===== Хваталка =====
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 77, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 30 h

	// ===== Лапоток =====
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 17 f
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 77, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 29 h

	// ===== Пыхтелкин =====
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 74, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 73, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 30 h

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 238, bossDelayAbDop: 5833, firstWaveDelayMs: 2352 }, // прыжки неровными очередями
	{ boss: 'enem2', bossDelayAb: 190, bossDelayAbDop: 6260, firstWaveDelayMs: 2304 }, // круги набирают темп
	{ boss: 'enem3', bossDelayAb: 231, bossDelayAbDop: 4601, firstWaveDelayMs: 2400 }, // зев смыкается ровно
	{ boss: 'enem4', bossDelayAb: 191, bossDelayAbDop: 4494, firstWaveDelayMs: 2400 }, // пинки без передышки
	{ boss: 'enem5', bossDelayAb: 185, bossDelayAbDop: 4163, firstWaveDelayMs: 2400 }, // самовар пыхтит без остановки
];

// Способности: медленные / средние / быстрые / микс
const bossAbilitiesDop = [
	// Колунчик
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "Слева, в центр и справа" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5, 6], label: "Справа, дважды слева и справа" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Прыжки — знакомство: слева, справа, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14], label: "Слева, справа и два в центр" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Прыжки — иной конец: слева, справа, в центр и дважды слева" },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20], minPhase: 3, label: "Справа, в центр, слева, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24, 25], label: "4 раза слева и в центр" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28], minPhase: 2, label: "В центр, слева и справа" },

	// Свистуха
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], label: "Слева, два в центр и слева" },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7], label: "Справа, два в центр и слева" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Круг — знакомство: слева, в центр, справа и в центр" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15], label: "Слева, в центр, справа и в центр" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 16], signature: true, minPhase: 2, label: "Круг — иной конец: слева, в центр и дважды справа" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21], minPhase: 3, label: "Дважды слева, два в центр и справа" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24], label: "Справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [25, 26, 27], label: "В центр, справа и слева" },

	// Хваталка
	{ boss: 'enem3', indexAbilities: [0, 1, 2], label: "Справа и дважды слева" },
	{ boss: 'enem3', indexAbilities: [3, 4, 5, 6, 7], label: "Дважды слева, в центр и дважды справа" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Зев — знакомство: трижды слева и справа" },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15], label: "Справа, в центр и дважды слева" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 16, 17], signature: true, minPhase: 2, label: "Зев — иной конец: трижды слева и два в центр" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22, 23], minPhase: 3, label: "4 раза слева и два в центр" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27], label: "Дважды справа, в центр и слева" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30], minPhase: 2, label: "Дважды справа и в центр" },

	// Лапоток
	{ boss: 'enem4', indexAbilities: [0, 1, 2], label: "Дважды слева и справа" },
	{ boss: 'enem4', indexAbilities: [3, 4, 5, 6], label: "Дважды справа, в центр и справа" },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Пинки — знакомство: дважды слева, в центр и справа" },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14], label: "Два в центр, слева и справа" },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Пинки — иной конец: дважды слева, в центр, справа и в центр" },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], minPhase: 3, label: "Трижды слева, в центр и дважды справа" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25], label: "Дважды справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29], minPhase: 2, label: "В центр, справа, в центр и слева" },

	// Пыхтелкин
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], label: "В центр, дважды слева и справа" },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7], label: "В центр, дважды справа и слева" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Пыхтение — знакомство: 4 раза слева" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15], label: "4 раза справа" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 16], signature: true, minPhase: 2, label: "Пыхтение — иной конец: 5 раза слева" },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21], minPhase: 3, label: "Трижды слева и дважды справа" },
	{ boss: 'enem5', indexAbilities: [22, 23, 24, 25], label: "Справа, слева, справа и слева" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "Дважды справа, в центр и дважды слева" },

];

// Лорные названия связок. Уровень 7: Колунчик (топорик-клин), Свистуха (коса, ветер),
// Хваталка (клешни), Лапоток (быстроногий), Пыхтелкин (пар, дым).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Раскалывающий удар', variant2: 'Острый скол', variant3: 'Колунная сила',
        variant4: 'Деревянная защита', variant5: 'Меткий вруб', variant6: 'Едкая щепа',
        variant7: 'Колунная мощь', variant8: 'Крепкий обух', variant9: 'Стремительный вруб',
        variant10: 'Живучий колунчик', variant11: 'Цепкое лезвие', variant12: 'Скол и в щепки',
        variant13: 'Плотная рукоять', variant14: 'Неутомимый раскол', variant15: 'Пружинистый замах',
        variant16: 'Меткий скол', variant17: 'Колунная хватка', variant18: 'Верный вруб',
        variant19: 'Мгновенный раскол', variant20: 'Древесный нюх', variant21: 'Стойкий обух',
        variant22: 'Юркий колунчик', variant23: 'Колунная стойкость', variant24: 'Чуткая рукоять',
        variant25: 'Ускользающий скол', variant26: 'Дикий вруб', variant27: 'Мощь щепы',
        variant28: 'Внезапный скол', variant29: 'Каменный обух', variant30: 'Разросшийся раскол',
        variant31: 'Колунный рывок', variant32: 'Живучая рукоять', variant33: 'Неутомимый вруб',
        variant34: 'Колунная прыть', variant35: 'Колунная выносливость'
    },
    enem2: {
        variant1: 'Косящий удар', variant2: 'Свистящее лезвие', variant3: 'Косящая сила',
        variant4: 'Плетёная защита', variant5: 'Взмах косы', variant6: 'Едкий посвист',
        variant7: 'Косящая мощь', variant8: 'Прочное древко', variant9: 'Стремительный взмах',
        variant10: 'Живучая свистуха', variant11: 'Лезвие косы', variant12: 'Взмах и в траву',
        variant13: 'Крепкое древко', variant14: 'Неутомимый покос', variant15: 'Пружинистый взмах',
        variant16: 'Меткий свист', variant17: 'Косящая хватка', variant18: 'Пронзительный свист',
        variant19: 'Мгновенный взмах', variant20: 'Ветреный нюх', variant21: 'Стойкое древко',
        variant22: 'Юркая свистуха', variant23: 'Косящая стойкость', variant24: 'Чуткий свист',
        variant25: 'Ускользающий свист', variant26: 'Дикий посвист', variant27: 'Мощь свиста',
        variant28: 'Внезапный взмах', variant29: 'Каменное древко', variant30: 'Разросшийся покос',
        variant31: 'Косящий рывок', variant32: 'Живучее древко', variant33: 'Неутомимый свист',
        variant34: 'Свистящая прыть', variant35: 'Косящая выносливость'
    },
    enem3: {
        variant1: 'Плетёный удар', variant2: 'Впивающиеся зубья крышки', variant3: 'Плетёная сила',
        variant4: 'Лозовая защита', variant5: 'Меткий захлоп', variant6: 'Сок лозы',
        variant7: 'Плетёная мощь', variant8: 'Прочное плетение', variant9: 'Стремительный захлоп',
        variant10: 'Живучее лукошко', variant11: 'Цепкая лоза', variant12: 'Захлоп и в траву',
        variant13: 'Плотное плетение', variant14: 'Неутомимый захлоп', variant15: 'Выжидающий рывок',
        variant16: 'Меткая крышка', variant17: 'Мёртвая хватка', variant18: 'Терпеливый прищур',
        variant19: 'Мгновенный захлоп', variant20: 'Древесный скрип', variant21: 'Стойкое плетение',
        variant22: 'Юркая хваталка', variant23: 'Плетёная стойкость', variant24: 'Чуткая лоза',
        variant25: 'Ускользающий захлоп', variant26: 'Дикий захлоп', variant27: 'Мощь лозы',
        variant28: 'Внезапный захлоп', variant29: 'Каменное плетение', variant30: 'Разросшаяся лоза',
        variant31: 'Плетёный рывок', variant32: 'Живучее плетение', variant33: 'Неутомимая пауза',
        variant34: 'Плетёная прыть', variant35: 'Плетёная выносливость'
    },
    enem4: {
        variant1: 'Топочущий удар', variant2: 'Острый узел шнурка', variant3: 'Лапоточная сила',
        variant4: 'Плетёная защита', variant5: 'Меткий топот', variant6: 'Едкий укол',
        variant7: 'Лапоточная мощь', variant8: 'Прочная подошва', variant9: 'Стремительный поток',
        variant10: 'Живучий лапоток', variant11: 'Цепкие шнурки', variant12: 'Укол и в поток',
        variant13: 'Крепкая подошва', variant14: 'Неутомимый бег', variant15: 'Пружинистый шаг',
        variant16: 'Меткий узел', variant17: 'Лапоточная хватка', variant18: 'Верный шаг',
        variant19: 'Мгновенный поток', variant20: 'Речной нюх', variant21: 'Стойкая подошва',
        variant22: 'Юркий лапоток', variant23: 'Лапоточная стойкость', variant24: 'Чуткая подошва',
        variant25: 'Ускользающий поток', variant26: 'Дикий бег', variant27: 'Мощь потока',
        variant28: 'Внезапный поток', variant29: 'Каменная подошва', variant30: 'Разросшийся поток',
        variant31: 'Лапоточный рывок', variant32: 'Живучая подошва', variant33: 'Неутомимый поток',
        variant34: 'Лапоточная прыть', variant35: 'Лапоточная выносливость'
    },
    enem5: {
        variant1: 'Пыхтящий удар', variant2: 'Обжигающий пар', variant3: 'Пыхтелкина сила',
        variant4: 'Дымчатая защита', variant5: 'Залп пара', variant6: 'Едкий пар',
        variant7: 'Пыхтелкина мощь', variant8: 'Плотный дым', variant9: 'Стремительный пых',
        variant10: 'Живучий пыхтелкин', variant11: 'Цепкий пар', variant12: 'Пых и в облако',
        variant13: 'Плотное облако', variant14: 'Неутомимое пыхтение', variant15: 'Пружинистый пых',
        variant16: 'Струя пара', variant17: 'Пыхтелкина хватка', variant18: 'Прищур сквозь пар',
        variant19: 'Мгновенный залп', variant20: 'Дымный нюх', variant21: 'Стойкий к жару',
        variant22: 'Юркий пыхтелкин', variant23: 'Пыхтелкина стойкость', variant24: 'Чуткий пар',
        variant25: 'Ускользающий в дым', variant26: 'Дикое пыхтение', variant27: 'Мощь пара',
        variant28: 'Внезапный залп', variant29: 'Каменное облако', variant30: 'Разросшееся облако',
        variant31: 'Пыхтелкин рывок', variant32: 'Живучий дым', variant33: 'Неутомимый залп',
        variant34: 'Пыхтелкина прыть', variant35: 'Пыхтелкина выносливость'
    }
};
