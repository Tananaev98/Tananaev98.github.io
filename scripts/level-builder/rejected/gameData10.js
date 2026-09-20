let lvlNumber = 10;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.899, damageMultiplier: 0.608, minWaveDelay: 2360, minShotDelay: 161, minTelegraphMs: 526,
	phases: [
		{ phase: 1, minHp: 0.631, cadence: 0.97, speed: 0.975, damage: 1, telegraphMultiplier: 0.965, surpriseChance: 0.1, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.276, cadence: 0.841, speed: 1.111, damage: 1.12, telegraphMultiplier: 0.915, surpriseChance: 0.175, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0, cadence: 0.719, speed: 1.181, damage: 1.23, telegraphMultiplier: 0.865, surpriseChance: 0.255, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: { combatIdentity: "Душащая тина: интервалы между ударами растут, и последний удар запаздывает", combatTrick: "удары идут всё реже, игрок привыкает к затишью — а последний, самый запоздавший, приходит с другой стороны", signatureEvery: 4, movementStyle: 'pause', cadence: 1.051, telegraphMs: 851, speedMultiplier: 0.75, damageMultiplier: 1.04, speedVariance: [0.84, 0.96, 1.08, 1.2, 1.3] },
		enem2: { combatIdentity: "Прыгучая кочка: прыгает по диагонали через всё поле — то слева направо, то справа налево", combatTrick: "кочка прыгает по диагонали, и игрок ждёт следующего прыжка на своём пути — а он уже с противоположного края", signatureEvery: 3, movementStyle: 'straight', cadence: 0.851, telegraphMs: 562, speedMultiplier: 0.62, damageMultiplier: 1.08, speedVariance: [0.74, 0.9, 1.06, 1.22, 1.36] },
		enem3: { combatIdentity: "Обманная ряска: манит на берег — и бьёт оттуда, откуда не ждёшь: с противоположного края", combatTrick: "удар у края манит игрока туда, и следующий приходит с противоположного края через поле", signatureEvery: 4, movementStyle: 'drift', cadence: 1.149, telegraphMs: 561, speedMultiplier: 0.67, damageMultiplier: 1.26, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.16] },
		enem4: { combatIdentity: "Режущая осока: лезвия режут парами — сначала пара с одного края, потом пара с другого", combatTrick: "пара лезвий слева, и почти сразу пара справа — руку с одного края на другой надо переносить между парами", signatureEvery: 3, movementStyle: 'weave', cadence: 0.851, telegraphMs: 564, speedMultiplier: 0.73, damageMultiplier: 1.12, speedVariance: [0.94, 1.04, 1.14, 1.24, 1.32] },
		enem5: { combatIdentity: "Болотник: медленный удар из глубины, а над ним быстрая серия — быстрые долетают первыми", combatTrick: "медленный удар из глубины появляется первым, но быстрая серия над ним прилетает раньше", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.799, telegraphMs: 801, speedMultiplier: 0.72, damageMultiplier: 1.2, speedVariance: [0.9, 1.02, 1.14, 1.26, 1.34] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl10/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl10/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl10/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl10/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl10/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Утяжка',
		image: 'images/enemies/regions/1_smesh_les/lvl10/1.webp',
		baseHP: (4650) + (4650 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'meltDown', durationMs: 1200 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Прыгунец',
		image: 'images/enemies/regions/1_smesh_les/lvl10/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1100 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Обманка',
		image: 'images/enemies/regions/1_smesh_les/lvl10/3.webp',
		baseHP: (26000) + (26000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'spinAway', durationMs: 1150 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Лезвилка',
		image: 'images/enemies/regions/1_smesh_les/lvl10/4.webp',
		baseHP: (72000) + (72000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'shatterBurst', durationMs: 1000 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Ильник',
		image: 'images/enemies/regions/1_smesh_les/lvl10/5.webp',
		baseHP: (86000) + (86000 * factorChar),
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1350 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 4;
const bossInterval = 9;

// Уровень 10 — Топь зовёт (трясина)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤10); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [
	// ===== Утяжка =====
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 73, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 73, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 73, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 24 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 27, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 30 h
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 31 h

	// ===== Прыгунец =====
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 23 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 27 g
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 30 h
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 31 h

	// ===== Обманка =====
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 32 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 36 h

	// ===== Лезвилка =====
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 27, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 28 h

	// ===== Ильник =====
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 27, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 32 h

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 240, bossDelayAbDop: 5084, firstWaveDelayMs: 2400 }, // тина душит неторопливо
	{ boss: 'enem2', bossDelayAb: 170, bossDelayAbDop: 4764, firstWaveDelayMs: 2376 }, // кочка скачет без остановки
	{ boss: 'enem3', bossDelayAb: 195, bossDelayAbDop: 6100, firstWaveDelayMs: 2400 }, // ряска выжидает и бьёт очередями
	{ boss: 'enem4', bossDelayAb: 201, bossDelayAbDop: 4809, firstWaveDelayMs: 2275 }, // лезвия режут парами без пауз
	{ boss: 'enem5', bossDelayAb: 209, bossDelayAbDop: 4650, firstWaveDelayMs: 2400 }, // болотник бьёт из глубины и без остановки
];

// Способности: архетип / подмножество / дно / быстрые / микс
const bossAbilitiesDop = [
	// Утяжка
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], label: "Центр, слева и удар справа с запозданием" },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7, 8], label: "Три справа и удар слева" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12], signature: true, minPhase: 1, label: "Тина — знакомство: центр, слева, справа и запоздавший удар слева" },
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16, 17], label: "Слева, слева, центр и запоздавший центр" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 18, 19], signature: true, minPhase: 2, label: "Тина — иной конец: после справа ещё удар справа и слева" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24], minPhase: 3, label: "Два справа, слева, слева и запоздавший справа" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28], label: "Справа, слева, центр и запоздавший слева" },
	{ boss: 'enem1', indexAbilities: [29, 30, 31], minPhase: 2, label: "Слева, справа и запоздавший центр" },

	// Прыгунец
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], label: "Справа, центр и дважды слева" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], label: "Диагональ справа налево" },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12], signature: true, minPhase: 1, label: "Кочка — знакомство: две слева и прыжок через поле на две справа" },
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 16], label: "Две справа и прыжок через поле на две слева" },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 17], signature: true, minPhase: 2, label: "Кочка — иной конец: после двух справа прыжок в центр" },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22, 23], minPhase: 3, label: "Прыжки через всё поле: слева, центр, справа, центр, слева и справа" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27], label: "Центр, слева, центр и слева" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31], minPhase: 2, label: "Справа, слева и дважды справа" },

	// Обманка
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], label: "Берег слева и справа по очереди" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9], label: "Справа, центр, слева, центр и справа" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14], signature: true, minPhase: 1, label: "Обман — знакомство: берег слева, центр, справа и центр и снова слева" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19], label: "Справа, слева, справа, центр и слева" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 20], signature: true, minPhase: 2, label: "Обман — иной конец: после круга слева ещё удар слева" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26], minPhase: 3, label: "Берега слева и справа по очереди и два в центр" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31], label: "Центр, справа, слева, справа и слева" },
	{ boss: 'enem3', indexAbilities: [32, 33, 34, 35, 36], minPhase: 2, label: "Справа, центр и дважды справа" },

	// Лезвилка
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], label: "Пара слева и справа с центром" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8], label: "Пара справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12], signature: true, minPhase: 1, label: "Осока — знакомство: пара слева, центр и слева" },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 16, 17], label: "Пара справа, пара слева и центр" },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12, 18], signature: true, minPhase: 2, label: "Осока — иной конец: после пары слева, центра и слева ещё один слева" },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22], minPhase: 3, label: "Пара слева, пара справа и слева" },
	{ boss: 'enem4', indexAbilities: [23, 24, 25], label: "Центр и два справа" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28], minPhase: 2, label: "Справа, центр и слева" },

	// Ильник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], label: "Медленный из центра, две слева быстрее него и справа" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8], label: "Справа, слева, справа и слева" },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13], signature: true, minPhase: 1, label: "Глубина — знакомство: медленный слева и быстрая серия справа раньше него" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17], label: "Справа, слева, центр и справа" },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 18, 19], signature: true, minPhase: 2, label: "Глубина — иной конец: после серии справа два слева" },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], minPhase: 3, label: "Медленный справа, слева быстрее него, центр и справа" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28], label: "Слева, справа и слева" },
	{ boss: 'enem5', indexAbilities: [29, 30, 31, 32], minPhase: 2, label: "Справа, центр и справа" },

];

// Лорные названия связок. Уровень 10 — топь и камыши: Утяжка (тянущая петля), Прыгунец
// (лягушонок-попрыгун), Обманка (мутная притворщица), Лезвилка (осока), Ильник (ил).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Тянущий удар', variant2: 'Затягивающая петля', variant3: 'Тянущая сила',
        variant4: 'Тростниковая защита', variant5: 'Рывок вверх', variant6: 'Едкая тина',
        variant7: 'Тянущая мощь', variant8: 'Плотный стебель', variant9: 'Ускоряющийся подъём',
        variant10: 'Живучая утяжка', variant11: 'Цепкая петля', variant12: 'Рывок и на дно',
        variant13: 'Толстый стебель', variant14: 'Неутомимый подъём', variant15: 'Пружинистый стебель',
        variant16: 'Меткая петля', variant17: 'Тянущая хватка', variant18: 'Взгляд из глубины',
        variant19: 'Мгновенный рывок', variant20: 'Болотный нюх', variant21: 'Стойкий стебель',
        variant22: 'Юркая утяжка', variant23: 'Тянущая стойкость', variant24: 'Чуткий стебель',
        variant25: 'Ускользающая петля', variant26: 'Дикий рывок', variant27: 'Мощь тины',
        variant28: 'Внезапный рывок', variant29: 'Каменный стебель', variant30: 'Разросшийся стебель',
        variant31: 'Тянущий рывок', variant32: 'Живучий стебель', variant33: 'Неутомимая петля',
        variant34: 'Тянущая прыть', variant35: 'Тянущая выносливость'
    },
    enem2: {
        variant1: 'Прыжковый удар', variant2: 'Острая лапка', variant3: 'Прыгучая сила',
        variant4: 'Панцирная защита', variant5: 'Меткий прыжок', variant6: 'Едкий укол',
        variant7: 'Прыгучая мощь', variant8: 'Прочный панцирь', variant9: 'Рывок после прыжка',
        variant10: 'Живучий прыгунец', variant11: 'Цепкие лапки', variant12: 'Прыжок и в камыш',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый прыгунец', variant15: 'Пружинистые лапки',
        variant16: 'Меткая лапка', variant17: 'Прыгучая хватка', variant18: 'Выжидающий взгляд',
        variant19: 'Мгновенный прыжок', variant20: 'Болотный нюх', variant21: 'Стойкий панцирь',
        variant22: 'Юркий прыгунец', variant23: 'Прыгучая стойкость', variant24: 'Чуткие лапки',
        variant25: 'Ускользающий прыжок', variant26: 'Дикий прыжок', variant27: 'Мощь укола',
        variant28: 'Внезапный прыжок', variant29: 'Каменный панцирь', variant30: 'Разросшиеся лапки',
        variant31: 'Прыгучий рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимый прыжок',
        variant34: 'Прыгучая прыть', variant35: 'Прыгучая выносливость'
    },
    enem3: {
        variant1: 'Обманчивый удар', variant2: 'Скрытое жало', variant3: 'Обманная сила',
        variant4: 'Илистая защита', variant5: 'Меткий подвох', variant6: 'Едкая муть',
        variant7: 'Обманная мощь', variant8: 'Плотная муть', variant9: 'Внезапный подвох',
        variant10: 'Живучая обманка', variant11: 'Цепкая муть', variant12: 'Подвох и на дно',
        variant13: 'Толстая муть', variant14: 'Неутомимый обман', variant15: 'Вязкий рывок',
        variant16: 'Меткий обман', variant17: 'Обманная хватка', variant18: 'Взгляд из мути',
        variant19: 'Мгновенный подвох', variant20: 'Илистый нюх', variant21: 'Стойкая муть',
        variant22: 'Юркая обманка', variant23: 'Обманная стойкость', variant24: 'Чуткая муть',
        variant25: 'Ускользающая в муть', variant26: 'Дикий подвох', variant27: 'Мощь мути',
        variant28: 'Внезапная муть', variant29: 'Каменное дно', variant30: 'Разросшаяся муть',
        variant31: 'Обманный рывок', variant32: 'Живучая муть', variant33: 'Неутомимая муть',
        variant34: 'Обманная прыть', variant35: 'Илистая выносливость'
    },
    enem4: {
        variant1: 'Режущий удар', variant2: 'Острое лезвие', variant3: 'Режущая сила',
        variant4: 'Травяная защита', variant5: 'Меткий разрез', variant6: 'Сок травы',
        variant7: 'Режущая мощь', variant8: 'Плотные стебли', variant9: 'Разрез с траекторией',
        variant10: 'Живучая лезвилка', variant11: 'Цепкое лезвие', variant12: 'Разрез и в камыш',
        variant13: 'Толстые стебли', variant14: 'Неутомимый разрез', variant15: 'Пружинистые стебли',
        variant16: 'Меткое лезвие', variant17: 'Режущая хватка', variant18: 'Взгляд из травы',
        variant19: 'Мгновенный разрез', variant20: 'Травяной нюх', variant21: 'Стойкие стебли',
        variant22: 'Юркая лезвилка', variant23: 'Режущая стойкость', variant24: 'Чуткие стебли',
        variant25: 'Ускользающее лезвие', variant26: 'Дикий разрез', variant27: 'Мощь сока',
        variant28: 'Внезапный разрез', variant29: 'Каменные стебли', variant30: 'Разросшиеся стебли',
        variant31: 'Режущий рывок', variant32: 'Живучие стебли', variant33: 'Пара лезвий',
        variant34: 'Режущая прыть', variant35: 'Режущая выносливость'
    },
    enem5: {
        variant1: 'Илистый удар', variant2: 'Вязкое жало', variant3: 'Илистая сила',
        variant4: 'Тинистая защита', variant5: 'Бросок ила', variant6: 'Едкий ил',
        variant7: 'Илистая мощь', variant8: 'Плотный ил', variant9: 'Асимметричный рывок',
        variant10: 'Живучий ильник', variant11: 'Цепкий ил', variant12: 'Бросок и в тину',
        variant13: 'Толстый ил', variant14: 'Неутомимый ильник', variant15: 'Вязкий рывок',
        variant16: 'Ком ила', variant17: 'Илистая хватка', variant18: 'Мутный взгляд',
        variant19: 'Мгновенный бросок', variant20: 'Болотный нюх', variant21: 'Стойкий ил',
        variant22: 'Юркий ильник', variant23: 'Илистая стойкость', variant24: 'Чуткий ил',
        variant25: 'Ускользающий в ил', variant26: 'Дикий ил', variant27: 'Мощь тины',
        variant28: 'Внезапный бросок', variant29: 'Каменный ил', variant30: 'Разросшийся ил',
        variant31: 'Илистый рывок', variant32: 'Живучий ил', variant33: 'Неутомимые камыши',
        variant34: 'Илистая прыть', variant35: 'Илистая выносливость'
    }
};
