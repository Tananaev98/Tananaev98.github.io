let lvlNumber = 11;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.82, damageMultiplier: 1.15, minWaveDelay: 2260, minShotDelay: 146, minTelegraphMs: 490,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.99, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.11, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.31, cadence: 0.79, speed: 1.10, damage: 1.12, telegraphMultiplier: 0.91, surpriseChance: 0.22, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0.00, cadence: 0.66, speed: 1.20, damage: 1.24, telegraphMultiplier: 0.85, surpriseChance: 0.30, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { movementStyle: 'pause', cadence: 1.12, telegraphMs: 880, speedMultiplier: 0.94, damageMultiplier: 1.16, speedVariance: [0.78, 0.88, 0.98, 1.10, 1.20] }, // ALT_HAMMER: пауза перед молотом
		enem2: { movementStyle: 'accelerate', cadence: 0.80, telegraphMs: 580, speedMultiplier: 1.22, damageMultiplier: 1.09, speedVariance: [0.94, 1.04, 1.14, 1.24, 1.34] }, // LEFT_SAW: пила набирает обороты
		enem3: { movementStyle: 'drift', cadence: 0.94, telegraphMs: 720, speedMultiplier: 1.10, damageMultiplier: 1.14, speedVariance: [0.86, 0.98, 1.10, 1.22, 1.30] }, // ASYM_THROWS: кривые броски
		enem4: { movementStyle: 'weave', cadence: 0.84, telegraphMs: 610, speedMultiplier: 1.18, damageMultiplier: 1.12, speedVariance: [0.90, 1.02, 1.14, 1.26, 1.34] }, // CROSSED_THREADS: переплетающиеся нити
		enem5: { movementStyle: 'lateRush', cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.20, damageMultiplier: 1.22, speedVariance: [0.74, 0.90, 1.08, 1.26, 1.38] } // ARC_SIDES: дуги замыкаются рывком
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
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 11 — Цех без ОТК (лесные ремесленники)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥20) стартуют высоко (y≤10); средние 10–15; медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [

	// ===== Молотобой: ALT_HAMMER — чередующиеся одиночные удары L→R на разных Y (не столбики) =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //0 L mid
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //1 R mid
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //2 L mid
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //3 R mid
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //4 L mid
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //5 R mid
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //6 L mid
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //7 R mid
	// искры снизу — 3 редкие точки
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //10
	// быстрый удар — только левый верх (2)
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //12
	// микс: искра + удар + фланг
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //15

	// ===== Пильщик: LEFT_SAW — лестница по левому краю y 8→40, опилки справа снизу =====
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //6
	// опилки — только правый низ (3)
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	// быстрый пропил — только правый верх (2)
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //11
	// микс: пила + опилки + пропил
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15

	// ===== Горшечник: ASYM_THROWS — асимметричные броски (лево ≠ право) + черепки =====
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //0 L
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //1 R
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //2 L
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //3 R
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //4 L
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //5 R
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //6 L
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //7 R
	// черепки снизу — 3 редкие
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 54, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //10
	// быстрый размах — 3 смешанных (L/R/L)
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //13
	// микс
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //15

	// ===== Ниточник: CROSSED_THREADS — скрещённые высоты L(18,34) R(12,28,40) + ткачество =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0 L
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1 L
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //2 R
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //3 R
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //4 R
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //5 L
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //6 L
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //7 R
	// ткачество снизу — 3 точки
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //10
	// быстрая петля — 2
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //12
	// микс
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //15

	// ===== Обручник: ARC_SIDES — дуги L(10,22,34) R(14,26,38) + кольца снизу =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //0 L arc
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //1 L arc
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //2 L arc
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //3 R arc
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //4 R arc
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //5 R arc
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //6 L fill
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //7 R fill
	// кольца снизу — 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //9
	// быстрый обруч — 3 (L/R/L)
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //12
	// микс
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 280, bossDelayAbDop: 5400 }, // чередование L→R одиночных ударов
	{ boss: 'enem2', bossDelayAb: 240, bossDelayAbDop: 5600 }, // лестница пилы по левому краю
	{ boss: 'enem3', bossDelayAb: 260, bossDelayAbDop: 5200 }, // асимметричные броски
	{ boss: 'enem4', bossDelayAb: 310, bossDelayAbDop: 5800 }, // скрещённые нити, медленное ткачество
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5100 }, // дуги обручей частые
];

// Способности: основной архетип / дно / быстрые / микс (~7 сетов)
const bossAbilitiesDop = [
	// Молотобой — ALT_HAMMER
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [11, 12] },
	{ boss: 'enem1', indexAbilities: [13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [0, 11, 1, 12, 9] },

	// Пильщик — LEFT_SAW
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 5, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem2', indexAbilities: [1, 7, 10, 14] },
	{ boss: 'enem2', indexAbilities: [3, 8, 11, 15] },

	// Горшечник — ASYM_THROWS
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [14, 11, 15, 13] },
	{ boss: 'enem3', indexAbilities: [0, 8, 3, 12, 10] },

	// Ниточник — CROSSED_THREADS
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10] },
	{ boss: 'enem4', indexAbilities: [11, 12] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [0, 8, 3, 11, 9] },

	// Обручник — ARC_SIDES
	{ boss: 'enem5', indexAbilities: [0, 1, 2] },
	{ boss: 'enem5', indexAbilities: [3, 4, 5] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [13, 14, 15] },
	{ boss: 'enem5', indexAbilities: [0, 8, 3, 11, 9] },
];
