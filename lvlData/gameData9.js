let lvlNumber = 9;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.84, damageMultiplier: 1.12, minWaveDelay: 2310, minShotDelay: 150, minTelegraphMs: 510,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.98, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.10, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.31, cadence: 0.81, speed: 1.09, damage: 1.11, telegraphMultiplier: 0.92, surpriseChance: 0.20, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0.00, cadence: 0.68, speed: 1.18, damage: 1.22, telegraphMultiplier: 0.86, surpriseChance: 0.28, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { movementStyle: 'pause', cadence: 0.94, telegraphMs: 740, speedMultiplier: 1.10, damageMultiplier: 1.02, speedVariance: [0.84, 0.96, 1.08, 1.20, 1.30] }, // ALT_WHIP: хлёсткая смена флангов
		enem2: { movementStyle: 'drift', cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.04, damageMultiplier: 1.08, speedVariance: [0.86, 0.98, 1.10, 1.20, 1.28] }, // CORNERS_BURST: сходится из углов
		enem3: { movementStyle: 'straight', cadence: 0.78, telegraphMs: 570, speedMultiplier: 1.22, damageMultiplier: 1.10, speedVariance: [0.94, 1.04, 1.14, 1.24, 1.32] }, // TWIN_JETS_MID: частые ускоряющиеся струи
		enem4: { movementStyle: 'weave', cadence: 0.88, telegraphMs: 680, speedMultiplier: 1.16, damageMultiplier: 1.14, speedVariance: [0.76, 0.90, 1.06, 1.22, 1.34] }, // RIGHT_STABS: колющий выпад справа
		enem5: { movementStyle: 'lateRush', cadence: 0.80, telegraphMs: 650, speedMultiplier: 1.14, damageMultiplier: 1.20, speedVariance: [0.82, 0.94, 1.06, 1.20, 1.32] } // SEQ_WRAP: пауза между обхватами
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
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 9 — Грядка зла (растения)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤10); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [

	// ===== Жгучка — ALT_WHIP: поочерёдные хлещущие удары L/R по mid, без дна =====
	{ boss: 'enem1', type: 'enem11', xPos: 6,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //0 L
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //1 R
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //2 L
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //3 R
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //4 L
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //5 R
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //6 L
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //7 R
	// быстрые 4 — разные x/y, скорости 20/23/27/21
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 4,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 23 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 27 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21 }, //11
	// микс плети + быстрые
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 23 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 27 }, //15

	// ===== Цеплялка — CORNERS_BURS: 4 угла + краевые репейники mid, без стены =====
	{ boss: 'enem2', type: 'enem22', xPos: 4,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //0 угол TL
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1 угол TR
	{ boss: 'enem2', type: 'enem22', xPos: 4,  yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2 угол BL
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3 угол BR
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //4 bur L
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //5 bur R
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //6 bur L
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //7 bur R
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8 bur L
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9 bur R
	// быстрые 2
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 25 }, //11
	// микс углы + bur + fast
	{ boss: 'enem2', type: 'enem22', xPos: 4,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 25 }, //15

	// ===== Брызгун — TWIN_JETS_MID: струи L+R на одной Y mid, дно редкое =====
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //0
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //1
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //7
	// дно редкое — 3 точки
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //10
	// быстрые 3
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 48, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //13
	// микс
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //15

	// ===== Шиповка — RIGHT_STABS: почти все уколы справа, дно только слева =====
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //6 единственный L
	// дно только слева — 3
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //9
	// быстрые 2 — правый верх
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //11
	// микс
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //15

	// ===== Хлестун — SEQ_WRAP: L потом R на одной Y (через волны), дно 2, fast 3 слева =====
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0 L y14
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //1 R y14
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2 L y22
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //3 R y22
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //4 L y30
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //5 R y30
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //6 L y38
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //7 R y38
	// дно 2
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //9
	// быстрые 3 — лево тяжелее
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //12
	// микс
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 250, bossDelayAbDop: 5200 }, // плети хлещут по одной
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 5900 }, // репей цепляется из углов
	{ boss: 'enem3', bossDelayAb: 210, bossDelayAbDop: 4800 }, // струи брызжут часто
	{ boss: 'enem4', bossDelayAb: 280, bossDelayAbDop: 6000 }, // шипы бьют справа
	{ boss: 'enem5', bossDelayAb: 230, bossDelayAbDop: 5100 }, // лоза обвивает по очереди
];

// Способности: архетип / подмножество / дно / быстрые / микс
const bossAbilitiesDop = [
	// Жгучка — ALT_WHIP
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [1, 3, 5, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem1', indexAbilities: [8, 10, 9, 11] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [0, 8, 2, 11] },

	// Цеплялка — CORNERS_BURS
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7, 8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 4, 1, 5, 2, 6] },
	{ boss: 'enem2', indexAbilities: [10, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem2', indexAbilities: [0, 10, 4, 11] },
	{ boss: 'enem2', indexAbilities: [2, 5, 8, 11] },

	// Брызгун — TWIN_JETS_MID
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [14, 11, 15, 13] },
	{ boss: 'enem3', indexAbilities: [0, 8, 1, 12, 10] },

	// Шиповка — RIGHT_STABS
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem4', indexAbilities: [7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [0, 7, 10, 8] },
	{ boss: 'enem4', indexAbilities: [1, 9, 11, 5] },

	// Хлестун — SEQ_WRAP (L-волны, потом R-волны)
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem5', indexAbilities: [1, 3, 5, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 10] },
	{ boss: 'enem5', indexAbilities: [0, 8, 10] },
	{ boss: 'enem5', indexAbilities: [4, 9, 12] },
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
