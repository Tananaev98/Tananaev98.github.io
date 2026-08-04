let lvlNumber = 14;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.78, damageMultiplier: 1.19, minWaveDelay: 2210, minShotDelay: 145, minTelegraphMs: 480,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.12, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.31, cadence: 0.77, speed: 1.12, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.24, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.63, speed: 1.23, damage: 1.27, telegraphMultiplier: 0.83, surpriseChance: 0.33, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { movementStyle: 'accelerate', cadence: 1.04, telegraphMs: 800, speedMultiplier: 1.02, damageMultiplier: 1.05, speedVariance: [0.86, 0.96, 1.06, 1.14, 1.22] }, // LEFT_RISE: подъём слева
		enem2: { movementStyle: 'drift', cadence: 0.94, telegraphMs: 720, speedMultiplier: 1.10, damageMultiplier: 1.08, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.28] }, // ANTLER_SWEEP: снос правым краем
		enem3: { movementStyle: 'pause', cadence: 1.22, telegraphMs: 980, speedMultiplier: 0.84, damageMultiplier: 1.32, speedVariance: [0.74, 0.84, 0.96, 1.08, 1.18] }, // BOTTOM_RAM: тяжёлый таран снизу
		enem4: { movementStyle: 'weave', cadence: 0.86, telegraphMs: 640, speedMultiplier: 1.12, damageMultiplier: 0.68, speedVariance: [0.90, 0.98, 1.06, 1.14, 1.22] }, // PACK_CHASE: быстрая погоня с одной стороной
		enem5: { movementStyle: 'lateRush', cadence: 0.72, telegraphMs: 600, speedMultiplier: 1.18, damageMultiplier: 1.22, speedVariance: [0.78, 0.92, 1.08, 1.22, 1.34] } // CANOPY_AMBUSH: mid + рывок
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl14/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl14/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl14/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl14/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl14/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Шатун',
		image: 'images/enemies/regions/1_smesh_les/lvl14/1.webp',
		baseHP: (3500) + (3500 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '26%',
        deathAnimation: { preset: 'heavySink', durationMs: 1450 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Сохатый',
		image: 'images/enemies/regions/1_smesh_les/lvl14/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '28%',
        deathAnimation: { preset: 'tumbleFall', durationMs: 1200 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Зубрило',
		image: 'images/enemies/regions/1_smesh_les/lvl14/3.webp',
		baseHP: (30000) + (30000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '30%',
        deathAnimation: { preset: 'packBurst', durationMs: 1050 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Вожак',
		image: 'images/enemies/regions/1_smesh_les/lvl14/4.webp',
		baseHP: (80000) + (80000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'fleeStretch', durationMs: 1100 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Прыгунья',
		image: 'images/enemies/regions/1_smesh_les/lvl14/5.webp',
		baseHP: (94000) + (94000 * factorChar),
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1150 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 14 — Альфа-звери
// Архетипы: подъём слева / снос справа / таран снизу / погоня одной стороной / mid-засада.
// Отличны от 11–13. Без нижней стены у enem1 и enem4. Один крупный — Зубрило 30%.

const bossAbilities = [

	// ===== Шатун: LEFT_RISE — направленный подъём по левому краю y40→8 =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //7
	// быстрый удар сверху
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //15

	// ===== Сохатый: ANTLER_SWEEP — горизонтальные пары только справа =====
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //7
	// быстрый рог сверху
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //10
	// дно — 1–2
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //12
	// нежданчик: одиночный выход слева
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //15

	// ===== Зубрило: BOTTOM_RAM — давление снизу, редкие тяжёлые =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //7
	// mid-предупреждение перед тараном
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //9
	// быстрый рог
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //15

	// ===== Вожак: PACK_CHASE — зигзаг с доминирующей левой стороной, без дна =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0 L
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //1 L
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //2 L
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //3 L
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //4 L
	// завершающий перевод вправо (1 удар после серии)
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //5 R
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //6 R
	// быстрые
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //15

	// ===== Прыгунья: CANOPY_AMBUSH — редкие mid + рывок сверху (экзамен темы) =====
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //0 mid
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //1 mid
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //2 mid
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //4
	// подъём/спуск из прошлых
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //8
	// дно — 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	// canopy dive
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5700 }, // подъём
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 5300 }, // снос справа
	{ boss: 'enem3', bossDelayAb: 360, bossDelayAbDop: 6200 }, // тяжёлый таран
	{ boss: 'enem4', bossDelayAb: 240, bossDelayAbDop: 5000 }, // погоня, дробный урон
	{ boss: 'enem5', bossDelayAb: 210, bossDelayAbDop: 4600 }, // mid-засада
];

const bossAbilitiesDop = [
	// Шатун — LEFT_RISE
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11] },
	{ boss: 'enem1', indexAbilities: [5, 7, 13] },
	{ boss: 'enem1', indexAbilities: [2, 12, 14] },
	{ boss: 'enem1', indexAbilities: [0, 4, 8, 15] },

	// Сохатый — ANTLER_SWEEP
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 6] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [11] },
	{ boss: 'enem2', indexAbilities: [2, 7, 13] },
	{ boss: 'enem2', indexAbilities: [0, 3, 10, 14] },

	// Зубрило — BOTTOM_RAM
	{ boss: 'enem3', indexAbilities: [0, 2] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [1, 8, 10, 15] },

	// Вожак — PACK_CHASE
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 5] },
	{ boss: 'enem4', indexAbilities: [7, 8] },
	{ boss: 'enem4', indexAbilities: [7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [3, 4, 11] },
	{ boss: 'enem4', indexAbilities: [0, 2, 10, 15] },

	// Прыгунья — CANOPY_AMBUSH
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2] },
	{ boss: 'enem5', indexAbilities: [11, 12] },
	{ boss: 'enem5', indexAbilities: [9, 10] },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8] },
	{ boss: 'enem5', indexAbilities: [3, 4, 14] },
	{ boss: 'enem5', indexAbilities: [1, 9, 13, 15] },
];
