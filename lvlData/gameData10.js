let lvlNumber = 10;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.83, damageMultiplier: 0.608, minWaveDelay: 2280, minShotDelay: 148, minTelegraphMs: 500,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.99, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.11, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.31, cadence: 0.80, speed: 1.10, damage: 1.12, telegraphMultiplier: 0.91, surpriseChance: 0.21, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0.00, cadence: 0.67, speed: 1.19, damage: 1.23, telegraphMultiplier: 0.85, surpriseChance: 0.29, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { movementStyle: 'drift', cadence: 0.98, telegraphMs: 760, speedMultiplier: 1.08, damageMultiplier: 1.04, speedVariance: [0.84, 0.96, 1.08, 1.20, 1.30] }, // CLIMB_UP: ускоряется по мере подъёма
		enem2: { movementStyle: 'straight', cadence: 0.86, telegraphMs: 640, speedMultiplier: 1.16, damageMultiplier: 1.08, speedVariance: [0.74, 0.90, 1.06, 1.22, 1.36] }, // SPARSE_HOPS: редкий прыжок → рывок
		enem3: { movementStyle: 'weave', cadence: 1.20, telegraphMs: 980, speedMultiplier: 0.86, damageMultiplier: 1.26, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.16] }, // BOTTOM_DENSE: вязкое плотное дно
		enem4: { movementStyle: 'accelerate', cadence: 0.82, telegraphMs: 600, speedMultiplier: 1.20, damageMultiplier: 1.12, speedVariance: [0.94, 1.04, 1.14, 1.24, 1.32] }, // H_PAIRS_MID: режущие пары меняют траекторию
		enem5: { movementStyle: 'pause', cadence: 0.74, telegraphMs: 630, speedMultiplier: 1.18, damageMultiplier: 1.20, speedVariance: [0.90, 1.02, 1.14, 1.26, 1.34] } // UNEVEN_REEDS: асимметричные камыши
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
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 10 — Топь зовёт (трясина)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤10); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [

	// ===== Утяжка — CLIMB_UP: ползучий подъём по краям y40→10, дно ≤2, fast 2 =====
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //0 L climb
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5 R stagger
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //7
	// дно 2
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //9
	// быстрые 2
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 25 }, //11
	// микс
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 25 }, //15

	// ===== Прыгунец — SPARSE_HOPS: ~6 mid-прыжков L-R, дно 2, fast 3 slam =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //5
	// дно 2
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 2 },  //7
	// быстрые 3 — slam сверху
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 4,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //10
	// микс
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 4,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //15

	// ===== Обманка — BOTTOM_DENSE: только дно (два ряда y), без mid-флангов; фаст 2 =====
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 56, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 56, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //9
	// быстрые 2 — только края сверху
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 27 }, //11
	// микс: куски стены + рывок
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 27 }, //15

	// ===== Лезвилка — H_PAIRS_MID: горизонтальные пары на флангах mid, дно ≤2, fast 3 =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //1 pair L y18
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //3 pair R y26
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //5 pair L y36
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //7 pair R y44
	// дно 2
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //9
	// быстрые 3
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //12
	// микс
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //15

	// ===== Ильник — UNEVEN_REEDS: неровные фланги обе стороны, дно 3, fast 4 асимметрия =====
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0 L
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1 L
	{ boss: 'enem5', type: 'enem55', xPos: 6,  yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //2 L
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3 L
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //4 R
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //5 R
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //6 R
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //7 R
	// дно 3
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //10
	// быстрые 4 — асимметричные скорости
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19 }, //11 L
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 23 }, //12 L
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 4,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 27 }, //13 R
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //14 R
	// микс
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 330, bossDelayAbDop: 5900 }, // тина ползёт вверх
	{ boss: 'enem2', bossDelayAb: 240, bossDelayAbDop: 5100 }, // кочки прыгают редко
	{ boss: 'enem3', bossDelayAb: 350, bossDelayAbDop: 6500 }, // приманки — плотная стена
	{ boss: 'enem4', bossDelayAb: 260, bossDelayAbDop: 5400 }, // лезвия режут парами
	{ boss: 'enem5', bossDelayAb: 280, bossDelayAbDop: 5600 }, // тростник неровный
];

// Способности: архетип / подмножество / дно / быстрые / микс
const bossAbilitiesDop = [
	// Утяжка — CLIMB_UP
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 5, 6] },
	{ boss: 'enem1', indexAbilities: [8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [2, 8, 10, 7] },

	// Прыгунец — SPARSE_HOPS
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4] },
	{ boss: 'enem2', indexAbilities: [1, 3, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15] },
	{ boss: 'enem2', indexAbilities: [0, 6, 9, 3] },

	// Обманка — BOTTOM_DENSE (только дно)
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6, 8, 9] },
	{ boss: 'enem3', indexAbilities: [1, 3, 5, 7, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [0, 10, 5, 11] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem3', indexAbilities: [8, 10, 9, 11, 2] },

	// Лезвилка — H_PAIRS_MID
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4, 5] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 10] },
	{ boss: 'enem4', indexAbilities: [1, 8, 11, 7] },

	// Ильник — UNEVEN_REEDS
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10] },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14] },
	{ boss: 'enem5', indexAbilities: [11, 13, 12, 14] },
	{ boss: 'enem5', indexAbilities: [1, 8, 5, 13, 15] },
];
