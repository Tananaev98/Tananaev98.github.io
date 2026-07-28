let lvlNumber = 6;
let factorChar = (lvlNumber * 5) / 100;


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl6/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl6/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl6/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl6/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl6/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Шипелка',
		image: 'images/enemies/regions/1_smesh_les/lvl6/1.webp',
		baseHP: (2700) + (2700 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%'
	},

	enem2: {
		name: 'enem2',
		dispName: 'Висячий',
		image: 'images/enemies/regions/1_smesh_les/lvl6/2.webp',
		baseHP: (4400) + (4400 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%'
	},

	enem3: {
		name: 'enem3',
		dispName: 'Жужжалка',
		image: 'images/enemies/regions/1_smesh_les/lvl6/3.webp',
		baseHP: (22000) + (22000) * factorChar,
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%'
	},

	enem4: {
		name: 'enem4',
		dispName: 'Квакуша',
		image: 'images/enemies/regions/1_smesh_les/lvl6/4.webp',
		baseHP: (64000) + (64000) * factorChar,
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '28%'
	},

	enem5: {
		name: 'enem5',
		dispName: 'Присоска',
		image: 'images/enemies/regions/1_smesh_les/lvl6/5.webp',
		baseHP: (78000) + (78000) * factorChar,
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '26%'
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 6 — Мокрые дела (болотная живность)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤12); медленные могут ниже (~46–58).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [

	// ===== Гадюшка: S-волна по флангам + клыки сверху =====
	// медленная «змейка» — ступени слева/справа
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	// быстрые клыки — только сверху
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 28 }, //9
	// микс: кольцо у крепости + клык
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //15

	// ===== Паучище: якоря в углах + нити по краям + сброс сверху =====
	// медленные углы паутины
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	// средние «нити» строго по флангам
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //7
	// быстрый сброс с потолка — только сверху
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //11
	// микс угол + сброс
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //15

	// ===== Жужжалка: плотный рой по краям + дождь сверху =====
	// медленный рой — кучные точки на флангах
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	// быстрый дождь — плотно сверху с краёв
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28 }, //9
	// микс: низкий рой у крепости + пике
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //15

	// ===== Квакуша: язык с флангов + лужи ниже + прыжки сверху =====
	// медленные «языки» с краёв
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //3
	// медленные лужи-давление у крепости
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //7
	// быстрые прыжки — только сверху
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28 }, //11
	// микс язык + прыжок
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //15

	// ===== Присоска: ползучее давление снизу + хваты с краёв + отрыв сверху =====
	// медленное «прилипание» у крепости
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 56, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 56, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //4
	// средние хваты по флангам
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //8
	// быстрый отрыв/хлёст — только сверху
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12
	// микс прилипание + отрыв
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 320, bossDelayAbDop: 5600 }, // S-волна читается, пауза между витками
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 5400 }, // нити быстро, окно после паутины
	{ boss: 'enem3', bossDelayAb: 200, bossDelayAbDop: 4800 }, // рой частый, мало отдыха
	{ boss: 'enem4', bossDelayAb: 280, bossDelayAbDop: 6400 }, // лужи плотные, длинное окно
	{ boss: 'enem5', bossDelayAb: 240, bossDelayAbDop: 5000 }, // прилипание + резкий отрыв
];

// Способности: медленные / средние / быстрые / микс
const bossAbilitiesDop = [
	// Гадюшка
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [6, 8, 7, 9] },
	{ boss: 'enem1', indexAbilities: [0, 6, 3, 8] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem1', indexAbilities: [14, 6, 15, 9, 2] },

	// Паучище
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9, 11] },
	{ boss: 'enem2', indexAbilities: [0, 8, 1, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem2', indexAbilities: [2, 9, 3, 10, 5] },

	// Жужжалка
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [0, 2, 3, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [6, 8, 7, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [0, 6, 3, 9] },
	{ boss: 'enem3', indexAbilities: [1, 7, 14, 8, 15] },

	// Квакуша
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [8, 10, 9, 11] },
	{ boss: 'enem4', indexAbilities: [0, 8, 2, 11] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [4, 9, 6, 10, 1] },

	// Присоска
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [9, 11, 10, 12] },
	{ boss: 'enem5', indexAbilities: [0, 9, 2, 12] },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 10] },
	{ boss: 'enem5', indexAbilities: [1, 6, 3, 11, 14] },
];
