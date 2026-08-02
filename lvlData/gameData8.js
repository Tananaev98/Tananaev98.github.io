let lvlNumber = 8;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.86, damageMultiplier: 1.11, minWaveDelay: 2340, minShotDelay: 153, minTelegraphMs: 520,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.98, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.10, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.31, cadence: 0.82, speed: 1.08, damage: 1.11, telegraphMultiplier: 0.92, surpriseChance: 0.19, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0.00, cadence: 0.69, speed: 1.17, damage: 1.21, telegraphMultiplier: 0.86, surpriseChance: 0.27, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { movementStyle: 'straight', cadence: 1.04, telegraphMs: 830, speedMultiplier: 1.00, damageMultiplier: 1.03, speedVariance: [0.84, 0.95, 1.06, 1.16, 1.24] }, // RIGHT_COLUMN: ровная жарящая колонна
		enem2: { movementStyle: 'drift', cadence: 0.92, telegraphMs: 720, speedMultiplier: 1.12, damageMultiplier: 1.06, speedVariance: [0.90, 1.00, 1.10, 1.20, 1.28] }, // LEFT_SLIDE: скользит с левого края
		enem3: { movementStyle: 'pause', cadence: 1.18, telegraphMs: 1000, speedMultiplier: 0.86, damageMultiplier: 1.24, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.14] }, // BOTTOM_CRUSH: тяжёлое хлебное давление
		enem4: { movementStyle: 'lateRush', cadence: 0.80, telegraphMs: 600, speedMultiplier: 1.20, damageMultiplier: 1.10, speedVariance: [0.78, 0.92, 1.08, 1.22, 1.34] }, // HIGH_BOUNCE: зависание → падение
		enem5: { movementStyle: 'accelerate', cadence: 0.76, telegraphMs: 650, speedMultiplier: 1.16, damageMultiplier: 1.18, speedVariance: [0.92, 1.02, 1.12, 1.22, 1.30] } // H_PAIRS: ритмичные щелчки парами
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
		size: '24%'
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
		size: '26%'
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
		size: '28%'
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
		size: '26%'
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
		size: '28%'
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 8 — Кухня взбунтовалась (ожившая еда)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤10); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [

	// ===== Жарёныш: RIGHT_COLUMN — почти все x=86..94; фаст 2 справа + 1 слева =====
	// столбик жара справа
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //7
	// быстрые искры — два справа, один слева
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //10
	// редкий низ + микс
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //15

	// ===== Скользыш: LEFT_SLIDE — каскад слева средними скоростями; низ 3 точки (не стена); фаст 2 =====
	// каскад масла по левому флангу
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //4
	// три точки снизу — не полная стена
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //7
	// быстрый подброс — два удара
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9
	// микс: каскад + подброс
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //15

	// ===== Буханка: BOTTOM_CRUSH — единственная полная стена (8 точек); mid ≤2; фаст 2 =====
	// тяжёлая стена у крепости
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 46, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //7
	// два крошечных фланговых
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //9
	// два быстрых удара буханкой
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //11
	// микс: стена + удар
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //15

	// ===== Катёныш: HIGH_BOUNCE — чередование краёв y5–28; без дна; фаст 3 (21/25/23) =====
	// отскоки по краям на высоте
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //7
	// быстрые отскоки — нечётные скорости
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 25 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 23 }, //10
	// микс: отскок + рывок (без нижней стены)
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 25 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //15

	// ===== Щелкун: H_PAIRS — горизонтальные пары на одном фланге; низ ≤2; фаст 3 =====
	// горизонтальные пары слева
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	// горизонтальные пары справа
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3
	// ещё пара слева ниже
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //5
	// редкий низ — две точки
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //7
	// быстрый щелчок — три удара
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //10
	// микс: пара + щелчок
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 260, bossDelayAbDop: 5300 }, // жар шипит часто, остывает медленно
	{ boss: 'enem2', bossDelayAb: 235, bossDelayAbDop: 5900 }, // масло стекает, подброс внезапный
	{ boss: 'enem3', bossDelayAb: 320, bossDelayAbDop: 6500 }, // буханка тяжёлая, стена давит долго
	{ boss: 'enem4', bossDelayAb: 210, bossDelayAbDop: 4700 }, // каток прыгает без передышки
	{ boss: 'enem5', bossDelayAb: 275, bossDelayAbDop: 5200 }, // щелчки ритмичны, пауза между парами
];

// Способности: медленные / средние / быстрые / микс
const bossAbilitiesDop = [
	// Жарёныш — правый столбик
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [8, 10, 9] },
	{ boss: 'enem1', indexAbilities: [0, 8, 4, 10] },
	{ boss: 'enem1', indexAbilities: [11, 13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [2, 9, 12, 14, 6] },

	// Скользыш — левый каскад
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 8, 2, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11, 14, 15] },
	{ boss: 'enem2', indexAbilities: [1, 5, 9, 13, 11] },

	// Буханка — стена снизу
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [2, 10, 9, 11] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem3', indexAbilities: [0, 8, 14, 5, 10] },

	// Катёныш — высокие отскоки
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10] },
	{ boss: 'enem4', indexAbilities: [8, 10, 9] },
	{ boss: 'enem4', indexAbilities: [0, 8, 3, 10] },
	{ boss: 'enem4', indexAbilities: [11, 12, 14, 15] },
	{ boss: 'enem4', indexAbilities: [2, 9, 13, 14, 6] },

	// Щелкун — горизонтальные пары
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 2, 3] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10] },
	{ boss: 'enem5', indexAbilities: [8, 10, 9] },
	{ boss: 'enem5', indexAbilities: [0, 8, 2, 10] },
	{ boss: 'enem5', indexAbilities: [6, 7, 13, 15] },
	{ boss: 'enem5', indexAbilities: [4, 6, 9, 14, 11] },
];
