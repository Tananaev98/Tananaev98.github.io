let lvlNumber = 9;
let factorChar = (lvlNumber * 5) / 100;


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
		baseHP: (3000) + (3000 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%'
	},

	enem2: {
		name: 'enem2',
		dispName: 'Цеплялка',
		image: 'images/enemies/regions/1_smesh_les/lvl9/2.webp',
		baseHP: (5000) + (5000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%'
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
		size: '28%'
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
		size: '26%'
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
		size: '28%'
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
