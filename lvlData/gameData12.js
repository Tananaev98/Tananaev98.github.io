let lvlNumber = 12;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.80, damageMultiplier: 0.702, minWaveDelay: 2250, minShotDelay: 145, minTelegraphMs: 480,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.12, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.31, cadence: 0.78, speed: 1.11, damage: 1.13, telegraphMultiplier: 0.90, surpriseChance: 0.23, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.64, speed: 1.21, damage: 1.25, telegraphMultiplier: 0.84, surpriseChance: 0.32, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { movementStyle: 'weave', cadence: 0.96, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 1.06, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.28] }, // PACK_LEFT_THEN_RIGHT: строевой залп
		enem2: { movementStyle: 'accelerate', cadence: 0.98, telegraphMs: 760, speedMultiplier: 0.94, damageMultiplier: 0.62, speedVariance: [0.82, 0.90, 0.98, 1.06, 1.14] }, // TOP_RAIN: частый, но дробный дождь; не складывать скорость+плотность+урон
		enem3: { movementStyle: 'lateRush', cadence: 1.18, telegraphMs: 920, speedMultiplier: 0.88, damageMultiplier: 1.30, speedVariance: [0.76, 0.86, 0.96, 1.08, 1.18] }, // HEAVY_MID: замах дубиной
		enem4: { movementStyle: 'pause', cadence: 0.94, telegraphMs: 700, speedMultiplier: 1.05, damageMultiplier: 0.58, speedVariance: [0.84, 0.92, 1.00, 1.08, 1.16] }, // FAST_ZIG_HIGH: быстрая серия с одной доминирующей стороной
		enem5: { movementStyle: 'straight', cadence: 0.68, telegraphMs: 600, speedMultiplier: 1.22, damageMultiplier: 1.24, speedVariance: [0.86, 1.00, 1.14, 1.28, 1.40] } // RHYTHM_PULSE: барабанный пульс L/R
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
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 12 — Дисциплина и дубина (военные)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥20) стартуют высоко (y≤10); средние 10–15; медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [

	// ===== Строевик: PACK_LEFT_THEN_RIGHT — залп влево, потом вправо + наступление L→R снизу =====
	// левый залп — 6 volley
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //0
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //1
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //2
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //5
	// правый залп — 5 volley (6-й повтор в сете)
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //10
	// наступление снизу — 3 точки L→R (не стена)
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 44, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 72, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //13
	// быстрый выстрел — 2
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //15

	// ===== Колчанчик: TOP_RAIN — дождь сверху доминирует, фланги ≤3, дно ≤1 =====
	// быстрый дождь сверху — 6+ varied
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	// средние фланги — 3
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //8
	// дно — 1
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	// доп. дождь сверху
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //13
	// микс
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //15

	// ===== Дубинщик: HEAVY_MID — тяжёлые удары по краям (разные Y), без пар L+R =====
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //0 L
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //1 R
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //2 L
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //3 R
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //4 L
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //5 R
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //6 L
	// заряд снизу — 3 (не стена)
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //9
	// быстрый удар — 2
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //11
	// микс
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //15

	// ===== Сабелька: FAST_ZIG_HIGH — зигзаг по краям y≤16, без дна + рывок сверху =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0 L
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //1 R
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //2 L
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //3 R
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //4 L
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //5 R
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 4,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //6 L
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //7 R
	// быстрый рывок — 3 charge top
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 4,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //10
	// микс зигзаг + рывок (без дна)
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //15

	// ===== Барабань: RHYTHM_PULSE — два уровня Y пульсируют L/R, удар снизу =====
	// пульс y=12 и y=24 — чередование L/R с разными скоростями
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //0 L
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //1 R
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //2 L
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //3 R
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4 L alt
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //5 R alt
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //6 L alt
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //7 R alt
	// ударная волна снизу — 2 (не стена)
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9
	// быстрый beat — 2
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //11
	// микс
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 270, bossDelayAbDop: 5600 }, // залп L потом R
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 5400 }, // дождь сверху: время прочитать и расчистить полосу
	{ boss: 'enem3', bossDelayAb: 320, bossDelayAbDop: 5800 }, // тяжёлые удары, пауза после
	{ boss: 'enem4', bossDelayAb: 280, bossDelayAbDop: 5200 }, // быстро, но игрок успевает сменить сторону
	{ boss: 'enem5', bossDelayAb: 210, bossDelayAbDop: 4800 }, // пульс L/R непрерывный
];

// Способности: основной архетип / дно / быстрые / микс (~7 сетов)
const bossAbilitiesDop = [
	// Строевик — PACK_LEFT_THEN_RIGHT
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 6] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13] },
	{ boss: 'enem1', indexAbilities: [14, 15] },
	{ boss: 'enem1', indexAbilities: [0, 1, 6, 7, 11] },
	{ boss: 'enem1', indexAbilities: [2, 8, 12, 14] },
	{ boss: 'enem1', indexAbilities: [4, 10, 13, 15] },

	// Колчанчик — TOP_RAIN
	{ boss: 'enem2', indexAbilities: [0, 2, 4] },
	{ boss: 'enem2', indexAbilities: [1, 3, 5] },
	{ boss: 'enem2', indexAbilities: [10, 12, 11, 13] },
	{ boss: 'enem2', indexAbilities: [6, 7, 8] },
	{ boss: 'enem2', indexAbilities: [9] },
	{ boss: 'enem2', indexAbilities: [14, 10, 15] },
	{ boss: 'enem2', indexAbilities: [1, 6, 11, 9] },

	// Дубинщик — HEAVY_MID
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem3', indexAbilities: [0, 7, 3, 10] },
	{ boss: 'enem3', indexAbilities: [2, 9, 5, 11, 14] },

	// Сабелька — FAST_ZIG_HIGH
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem4', indexAbilities: [1, 3, 5, 7] },
	{ boss: 'enem4', indexAbilities: [8, 14] },
	{ boss: 'enem4', indexAbilities: [9, 10, 15] },
	{ boss: 'enem4', indexAbilities: [0, 2, 9] },
	{ boss: 'enem4', indexAbilities: [1, 3, 14] },
	{ boss: 'enem4', indexAbilities: [11, 13, 12] },

	// Барабань — RHYTHM_PULSE
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9] },
	{ boss: 'enem5', indexAbilities: [10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 8, 1, 11, 9] },
];
