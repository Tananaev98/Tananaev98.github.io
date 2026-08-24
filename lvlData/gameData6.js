let lvlNumber = 6;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.90, damageMultiplier: 1.08, minWaveDelay: 2400, minShotDelay: 158, minTelegraphMs: 540,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.97, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.09, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.31, cadence: 0.84, speed: 1.07, damage: 1.10, telegraphMultiplier: 0.93, surpriseChance: 0.17, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0.00, cadence: 0.71, speed: 1.15, damage: 1.19, telegraphMultiplier: 0.87, surpriseChance: 0.25, maxActiveAttacks: 18 }
	],
	bosses: {
		enem1: { movementStyle: 'straight', cadence: 0.96, telegraphMs: 780, speedMultiplier: 1.06, damageMultiplier: 0.99, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] }, // ZIGZAG: усиленная змейка
		enem2: { movementStyle: 'weave', cadence: 1.02, telegraphMs: 850, speedMultiplier: 1.00, damageMultiplier: 1.04, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.22] }, // CORNERS: угрозы выползают из углов
		enem3: { movementStyle: 'accelerate', cadence: 0.82, telegraphMs: 620, speedMultiplier: 1.18, damageMultiplier: 1.08, speedVariance: [0.92, 1.02, 1.12, 1.22, 1.30] }, // LEFT_SWARM: быстрый пчелиный рой
		enem4: { movementStyle: 'lateRush', cadence: 1.16, telegraphMs: 1040, speedMultiplier: 0.84, damageMultiplier: 1.20, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.14] }, // BOTTOM_WALL: вязкое болотное давление
		enem5: { movementStyle: 'pause', cadence: 0.80, telegraphMs: 680, speedMultiplier: 1.13, damageMultiplier: 1.16, speedVariance: [0.80, 0.92, 1.04, 1.18, 1.30] } // MID_ONLY: присасывается после заминки
	}
};


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
		baseHP: (4050) + (4050 * factorChar),
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
		dispName: 'Висячий',
		image: 'images/enemies/regions/1_smesh_les/lvl6/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1300 }
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
		size: '28%',
        deathAnimation: { preset: 'puffPop', durationMs: 950 }
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
		size: '28%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1100 }
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
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1250 }
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

	// ===== Шипелка: ZIGZAG — зигзаг L↔R по флангам, y 10–42; низ ≤2; фаст 3 слева (20/24/22) =====
	// зигзаг по флангам — только середина экрана
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	// редкий низ — не более двух точек
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //7
	// быстрые укусы — три слева, скорости 20/24/22
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //10
	// микс: зигзаг + левый рывок
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //15

	// ===== Висячий: CORNERS — четыре угла + нити по краям; низ угловой; фаст 3 из верхних углов =====
	// якоря в четырёх углах
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	// средние нити строго по флангам
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //7
	// быстрый сброс — только из верхних углов
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //10
	// два нижних угловых «узла»
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //12
	// микс: угол + нить + сброс
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //15

	// ===== Жужжалка: LEFT_SWARM — рой слева x=8..14; справа ≤2; дождь 5 быстрых сверху =====
	// плотный рой на левом фланге (8 точек)
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //7
	// редкие одиночные справа
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //9
	// дождь сверху — пять быстрых, скорости 20–28
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //14
	// микс: рой + дождь
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15

	// ===== Квакуша: BOTTOM_WALL — единственная полная стена снизу (8 точек); языки ≤2; фаст 2 =====
	// полная болотная стена у крепости
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 36, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //7
	// два «языка» с флангов
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //9
	// два быстрых прыжка
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //11
	// микс: стена + язык + прыжок
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 2 },  //15

	// ===== Присоска: MID_ONLY — подъём по обоим флангам y16–40; низ ≤2; фаст 3 справа =====
	// подъём по левому флангу
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3
	// подъём по правому флангу
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //7
	// редкий низ — две точки
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //9
	// быстрый отрыв — три справа
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //12
	// микс: подъём + правый рывок
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 340, bossDelayAbDop: 5800 }, // зигзаг — пауза между витками
	{ boss: 'enem2', bossDelayAb: 270, bossDelayAbDop: 6200 }, // паутина натянута, сброс резкий
	{ boss: 'enem3', bossDelayAb: 180, bossDelayAbDop: 4500 }, // рой жужжит без передышки
	{ boss: 'enem4', bossDelayAb: 300, bossDelayAbDop: 6800 }, // болото набирает, долгая пауза
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5400 }, // присоска цепляется ритмично
];

// Способности: медленные / средние / быстрые / микс
const bossAbilitiesDop = [
	// Шипелка — зигзаг
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [8, 10, 9] },
	{ boss: 'enem1', indexAbilities: [0, 8, 3, 10] },
	{ boss: 'enem1', indexAbilities: [6, 7, 11, 13] },
	{ boss: 'enem1', indexAbilities: [2, 9, 14, 15, 4] },

	// Висячий — углы
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9] },
	{ boss: 'enem2', indexAbilities: [0, 8, 1, 10] },
	{ boss: 'enem2', indexAbilities: [11, 12, 9, 14] },
	{ boss: 'enem2', indexAbilities: [2, 5, 10, 15, 7] },

	// Жужжалка — левый рой
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14] },
	{ boss: 'enem3', indexAbilities: [10, 12, 14, 11, 13] },
	{ boss: 'enem3', indexAbilities: [0, 10, 3, 14] },
	{ boss: 'enem3', indexAbilities: [8, 9, 11, 13] },
	{ boss: 'enem3', indexAbilities: [1, 7, 12, 15, 5] },

	// Квакуша — стена снизу
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 6, 8] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [2, 10, 9, 11] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [4, 9, 14, 1, 7] },

	// Присоска — mid-only
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [10, 12, 11] },
	{ boss: 'enem5', indexAbilities: [1, 10, 5, 12] },
	{ boss: 'enem5', indexAbilities: [8, 9, 14, 11] },
	{ boss: 'enem5', indexAbilities: [3, 7, 13, 15, 10] },
];

// Лорные названия связок. Уровень 6 — мелкая нечисть: Шипелка (гадюка), Висячий (паук),
// Жужжалка (пчелиный рой), Квакуша (жаба), Присоска (пиявка).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Зигзаг-укус', variant2: 'Ядовитое жало', variant3: 'Шипящая сила',
        variant4: 'Чешуйчатый щит', variant5: 'Меткий зигзаг', variant6: 'Жгучий укус',
        variant7: 'Шипелкина мощь', variant8: 'Прочная чешуйка', variant9: 'Стремительный зигзаг',
        variant10: 'Живучий яд', variant11: 'Цепкий укус', variant12: 'Укус и в нору',
        variant13: 'Плотная чешуя', variant14: 'Неутомимое шипение', variant15: 'Извилистый рывок',
        variant16: 'Меткое жало', variant17: 'Шипящая хватка', variant18: 'Прищур гадюки',
        variant19: 'Мгновенный зигзаг', variant20: 'Змеиный нюх', variant21: 'Стойкий к укусам',
        variant22: 'Юркая шипелка', variant23: 'Шипелкина стойкость', variant24: 'Чуткий язычок',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикое шипение', variant27: 'Жгучая мощь',
        variant28: 'Внезапный зигзаг', variant29: 'Каменная чешуя', variant30: 'Разросшийся яд',
        variant31: 'Шипелкин рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимый зигзаг',
        variant34: 'Шипелкина прыть', variant35: 'Шипелкина выносливость'
    },
    enem2: {
        variant1: 'Паучий укус', variant2: 'Липкая паутина', variant3: 'Паучья сила',
        variant4: 'Хитиновый панцирь', variant5: 'Бросок паутины', variant6: 'Ядовитый укус',
        variant7: 'Паучья мощь', variant8: 'Прочный хитин', variant9: 'Стремительный спуск',
        variant10: 'Живучий паук', variant11: 'Цепкая паутина', variant12: 'Укус из тени угла',
        variant13: 'Плотный хитин', variant14: 'Неутомимое плетение', variant15: 'Пружинистая нить',
        variant16: 'Меткая нить', variant17: 'Паучья хватка', variant18: 'Восемь глаз в темноте',
        variant19: 'Мгновенный спуск', variant20: 'Паучий нюх', variant21: 'Стойкая паутина',
        variant22: 'Юркий висячий', variant23: 'Паучья стойкость', variant24: 'Чуткая нить',
        variant25: 'Ускользающий в угол', variant26: 'Дикое плетение', variant27: 'Едкий яд',
        variant28: 'Внезапный спуск', variant29: 'Каменный хитин', variant30: 'Разросшаяся паутина',
        variant31: 'Паучий рывок', variant32: 'Живучий хитин', variant33: 'Неутомимый спуск',
        variant34: 'Паучья прыть', variant35: 'Паучья выносливость'
    },
    enem3: {
        variant1: 'Жалящий укус', variant2: 'Ядовитая слюна', variant3: 'Роевая сила',
        variant4: 'Хитиновые латы', variant5: 'Меткий укус', variant6: 'Едкая слюна',
        variant7: 'Роевая мощь', variant8: 'Прочные латы', variant9: 'Стремительный рой',
        variant10: 'Живучий рой', variant11: 'Цепкие лапки', variant12: 'Укус и в падаль',
        variant13: 'Плотный панцирь', variant14: 'Неутомимый рой', variant15: 'Гудящий разгон',
        variant16: 'Меткий укус вслепую', variant17: 'Роевая хватка', variant18: 'Тысяча фасеточных глаз',
        variant19: 'Мгновенный укус', variant20: 'Падальный нюх', variant21: 'Стойкий рой',
        variant22: 'Юркая жужжалка', variant23: 'Роевая стойкость', variant24: 'Чуткие крылышки',
        variant25: 'Ускользающий рой', variant26: 'Дикое гудение', variant27: 'Яд слюны',
        variant28: 'Внезапный укус', variant29: 'Каменные латы', variant30: 'Разросшийся рой',
        variant31: 'Роевой рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимое гудение',
        variant34: 'Роевая прыть', variant35: 'Роевая выносливость'
    },
    enem4: {
        variant1: 'Квакающий удар', variant2: 'Ядовитая слизь', variant3: 'Болотная сила',
        variant4: 'Слизистая кожа', variant5: 'Меткий язык', variant6: 'Едкая слизь',
        variant7: 'Болотная мощь', variant8: 'Пупырчатая броня', variant9: 'Стремительный прыжок',
        variant10: 'Живучая квакуша', variant11: 'Липкий язык', variant12: 'Плевок и в тину',
        variant13: 'Плотная кожа', variant14: 'Неутомимое кваканье', variant15: 'Пружинистый прыжок',
        variant16: 'Меткий плевок', variant17: 'Болотная хватка', variant18: 'Выпученный взгляд',
        variant19: 'Мгновенный язык', variant20: 'Болотный нюх', variant21: 'Стойкая к яду',
        variant22: 'Юркая квакуша', variant23: 'Болотная стойкость', variant24: 'Чуткая кожа',
        variant25: 'Ускользающий в тину', variant26: 'Дикое кваканье', variant27: 'Мощь слизи',
        variant28: 'Внезапный прыжок', variant29: 'Каменная кочка', variant30: 'Разросшееся горло',
        variant31: 'Болотный рывок', variant32: 'Живучая слизь', variant33: 'Неутомимый прыжок',
        variant34: 'Болотная прыть', variant35: 'Болотная выносливость'
    },
    enem5: {
        variant1: 'Присасывающий укус', variant2: 'Ядовитая слюна', variant3: 'Тянущая сила',
        variant4: 'Скользкая шкурка', variant5: 'Меткое присасывание', variant6: 'Едкая слизь',
        variant7: 'Тянущая мощь', variant8: 'Слизистая броня', variant9: 'Стремительный бросок',
        variant10: 'Живучая присоска', variant11: 'Цепкая присоска', variant12: 'Укус и на дно',
        variant13: 'Плотная слизь', variant14: 'Неутомимое высасывание', variant15: 'Извивающийся рывок',
        variant16: 'Меткий укус', variant17: 'Мёртвая хватка', variant18: 'Незаметный подход',
        variant19: 'Мгновенное присасывание', variant20: 'Болотный нюх', variant21: 'Стойкая к отрыву',
        variant22: 'Юркая присоска', variant23: 'Тянущая стойкость', variant24: 'Чуткая слизь',
        variant25: 'Ускользающая на дно', variant26: 'Дикое высасывание', variant27: 'Мощь слюны',
        variant28: 'Внезапный укус', variant29: 'Каменная выдержка', variant30: 'Разросшаяся жажда',
        variant31: 'Присасывающий рывок', variant32: 'Живучая слизь', variant33: 'Неутомимая присоска',
        variant34: 'Скользкая прыть', variant35: 'Тянущая выносливость'
    }
};
