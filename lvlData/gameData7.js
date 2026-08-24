let lvlNumber = 7;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.88, damageMultiplier: 1.09, minWaveDelay: 2370, minShotDelay: 155, minTelegraphMs: 530,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.97, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.09, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.31, cadence: 0.83, speed: 1.07, damage: 1.10, telegraphMultiplier: 0.93, surpriseChance: 0.18, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0.00, cadence: 0.70, speed: 1.16, damage: 1.20, telegraphMultiplier: 0.87, surpriseChance: 0.26, maxActiveAttacks: 18 }
	],
	bosses: {
		enem1: { movementStyle: 'accelerate', cadence: 1.06, telegraphMs: 860, speedMultiplier: 0.98, damageMultiplier: 1.02, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.22] }, // LEFT_COLUMN: рубящая вертикаль
		enem2: { movementStyle: 'lateRush', cadence: 1.12, telegraphMs: 960, speedMultiplier: 0.90, damageMultiplier: 1.14, speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18] }, // BOTTOM_MOW: коса проходит по низу
		enem3: { movementStyle: 'pause', cadence: 0.96, telegraphMs: 780, speedMultiplier: 1.06, damageMultiplier: 1.08, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.26] }, // TWINS_NO_WALL: пары хватают после паузы
		enem4: { movementStyle: 'drift', cadence: 0.80, telegraphMs: 600, speedMultiplier: 1.20, damageMultiplier: 1.09, speedVariance: [0.96, 1.06, 1.16, 1.24, 1.30] }, // RIGHT_FLOOD: быстрый поток справа
		enem5: { movementStyle: 'weave', cadence: 0.74, telegraphMs: 650, speedMultiplier: 1.16, damageMultiplier: 1.18, speedVariance: [0.78, 0.92, 1.06, 1.20, 1.32] } // TOP_DENSE: верхний дождь с рывками
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
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 7 — Склад сбежал (ожившие лесные находки)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤12); медленные могут ниже (~46–56).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [

	// ===== Колунчик: LEFT_COLUMN — почти все атаки x=8..14; фаст 2 слева + 1 справа; без полной стены =====
	// столбик щепок слева
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //7
	// редкий низ слева — не полная стена
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //9
	// быстрый колун — два слева, один сюрприз справа
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //12
	// микс: столбик + удар
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //15

	// ===== Свистуха: BOTTOM_MOW — единственная полная стена снизу (6 точек); дуги по флангам; фаст 3 асимметрично =====
	// полный покос у крепости
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 58, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //5
	// средние дуги по флангам
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //9
	// быстрый свист — два слева, один справа (асимметрия)
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //12
	// микс: покос + свист
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //15

	// ===== Хваталка: TWINS_NO_WALL — пары L+R на одной Y в середине; без дна; фаст 2 =====
	// симметричные захваты — пары на одной высоте
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //7
	// быстрый хлопок крышки — два удара
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //9
	// микс: пара + хлопок (без нижней стены)
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //15

	// ===== Лапоток: RIGHT_FLOOD — ≥8 на правом фланге x=86..94; слева ≤2; фаст 3 справа сверху =====
	// поток справа (8 точек)
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //7
	// редкие слева
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //9
	// быстрый топот — три справа сверху
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //12
	// микс: поток + пинок
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //15

	// ===== Пыхтелкин: TOP_DENSE — редкие пары в середине ≤4; дождь 6 быстрых; низ ≤2 =====
	// редкие парные клапаны в середине (4 точки = 2 пары)
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //3
	// плотный дождь пара сверху — шесть быстрых
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 23 }, //9
	// редкий низ — две точки
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 74, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //11
	// микс: пара + струя
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // рубка столбиком, щепки летят часто
	{ boss: 'enem2', bossDelayAb: 290, bossDelayAbDop: 6400 }, // покос медленный, свист резкий
	{ boss: 'enem3', bossDelayAb: 240, bossDelayAbDop: 5100 }, // захваты синхронны, хлопок мгновенный
	{ boss: 'enem4', bossDelayAb: 220, bossDelayAbDop: 4900 }, // топот справа не стихает
	{ boss: 'enem5', bossDelayAb: 190, bossDelayAbDop: 4600 }, // пар густой, клапаны редки
];

// Способности: медленные / средние / быстрые / микс
const bossAbilitiesDop = [
	// Колунчик — левый столбик
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12] },
	{ boss: 'enem1', indexAbilities: [10, 12, 11] },
	{ boss: 'enem1', indexAbilities: [0, 10, 4, 12] },
	{ boss: 'enem1', indexAbilities: [8, 9, 14, 11] },
	{ boss: 'enem1', indexAbilities: [2, 6, 13, 15, 10] },

	// Свистуха — покос снизу
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4] },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12] },
	{ boss: 'enem2', indexAbilities: [10, 12, 11] },
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 11] },
	{ boss: 'enem2', indexAbilities: [1, 6, 12, 15, 8] },

	// Хваталка — пары без стены
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [0, 8, 1, 9] },
	{ boss: 'enem3', indexAbilities: [4, 5, 12, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 15] },
	{ boss: 'enem3', indexAbilities: [2, 8, 13, 14, 11] },

	// Лапоток — правый поток
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [10, 12, 11] },
	{ boss: 'enem4', indexAbilities: [0, 10, 8, 12] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 11] },
	{ boss: 'enem4', indexAbilities: [1, 9, 14, 7, 10] },

	// Пыхтелкин — плотный верх
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7, 8, 9] },
	{ boss: 'enem5', indexAbilities: [4, 6, 8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 4, 1, 8] },
	{ boss: 'enem5', indexAbilities: [10, 11, 5, 7] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem5', indexAbilities: [2, 6, 13, 11, 9] },
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
