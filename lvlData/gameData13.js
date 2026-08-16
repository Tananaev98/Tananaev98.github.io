let lvlNumber = 13;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.79, damageMultiplier: 0.629, minWaveDelay: 2230, minShotDelay: 145, minTelegraphMs: 480,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.12, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.31, cadence: 0.78, speed: 1.12, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.23, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.64, speed: 1.22, damage: 1.26, telegraphMultiplier: 0.84, surpriseChance: 0.32, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { movementStyle: 'lateRush', cadence: 1.02, telegraphMs: 780, speedMultiplier: 1.04, damageMultiplier: 1.04, speedVariance: [0.88, 0.96, 1.04, 1.12, 1.20] }, // RIGHT_DESCENT: спокойный спуск справа
		enem2: { movementStyle: 'pause', cadence: 0.96, telegraphMs: 700, speedMultiplier: 1.08, damageMultiplier: 1.06, speedVariance: [0.82, 0.94, 1.06, 1.16, 1.26] }, // CORNER_WHISPER: углы с паузой
		enem3: { movementStyle: 'drift', cadence: 1.14, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 1.28, speedVariance: [0.76, 0.88, 1.00, 1.12, 1.22] }, // LANE_CLOSE: редкие тяжёлые закрытия
		enem4: { movementStyle: 'weave', cadence: 0.88, telegraphMs: 620, speedMultiplier: 1.14, damageMultiplier: 0.72, speedVariance: [0.92, 1.00, 1.08, 1.16, 1.24] }, // LEFT_COLUMN: частая колонна, дробный урон
		enem5: { movementStyle: 'accelerate', cadence: 0.70, telegraphMs: 610, speedMultiplier: 1.16, damageMultiplier: 1.20, speedVariance: [0.84, 0.98, 1.12, 1.24, 1.34] } // FAN_THEN_BOOM: веер + удар
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl13/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl13/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl13/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl13/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl13/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Когтехват',
		image: 'images/enemies/regions/1_smesh_les/lvl13/1.webp',
		baseHP: (3400) + (3400 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'packBurst', durationMs: 1000 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Ухух',
		image: 'images/enemies/regions/1_smesh_les/lvl13/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1200 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Хаптун',
		image: 'images/enemies/regions/1_smesh_les/lvl13/3.webp',
		baseHP: (29000) + (29000 * factorChar),
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1100 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Долбун',
		image: 'images/enemies/regions/1_smesh_les/lvl13/4.webp',
		baseHP: (78000) + (78000 * factorChar),
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'shatterBurst', durationMs: 1050 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Токовик',
		image: 'images/enemies/regions/1_smesh_les/lvl13/5.webp',
		baseHP: (92000) + (92000 * factorChar),
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'spinAway', durationMs: 1250 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 13 — Хищные птицы
// Архетипы отличны от 10–12: правый спуск / только углы / закрытие полос / левая колонна / веер+бум.
// Без нижней стены у enem1 и enem4. Быстрые ≥20 стартуют y≤10.

const bossAbilities = [

	// ===== Когтехват: RIGHT_DESCENT — только правый фланг, спуск y8→40 =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //0
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //1
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //7
	// быстрый клевок сверху справа
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	// средние акценты
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //11
	// одиночный медленный «хвост»
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //15

	// ===== Ухух: CORNER_WHISPER — только углы, смена ритма =====
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //0 TL
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //1 TR
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //2 BL
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //3 BR
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //4 TL mid
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //5 TR mid
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //6 BL mid
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //7 BR mid
	// быстрые углы сверху
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //11
	// ритм-смесь
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15

	// ===== Хаптун: LANE_CLOSE — последовательное закрытие безопасных полос =====
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //0 L mid
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //1 C mid
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //2 R mid
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //3 L low
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //4 C low
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //5 R low
	{ boss: 'enem3', type: 'enem33', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //7
	// дно — 2 точки (не стена)
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //9
	// быстрый «угон» сверху
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15

	// ===== Долбун: LEFT_COLUMN — колонна слева, дробный peck сверху =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //7
	// peck сверху (дробный)
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //11
	// одиночный выход вправо (нежданчик)
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //15

	// ===== Токовик: FAN_THEN_BOOM — веер сверху + удар снизу (экзамен) =====
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //0
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //4
	// фланги из прошлых уроков
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //8
	// boom снизу — 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	// быстрый крик
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //15
];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 290, bossDelayAbDop: 5600 }, // спокойный спуск
	{ boss: 'enem2', bossDelayAb: 250, bossDelayAbDop: 5200 }, // углы: смена ритма
	{ boss: 'enem3', bossDelayAb: 340, bossDelayAbDop: 6000 }, // тяжёлые закрытия
	{ boss: 'enem4', bossDelayAb: 230, bossDelayAbDop: 5000 }, // peck-колонна
	{ boss: 'enem5', bossDelayAb: 210, bossDelayAbDop: 4700 }, // веер + boom
];

const bossAbilitiesDop = [
	// Когтехват — RIGHT_DESCENT
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },
	{ boss: 'enem1', indexAbilities: [3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [8, 9] },
	{ boss: 'enem1', indexAbilities: [6, 10, 11] },
	{ boss: 'enem1', indexAbilities: [12, 14] },
	{ boss: 'enem1', indexAbilities: [2, 7, 15, 8] },

	// Ухух — CORNER_WHISPER
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [0, 3, 1, 2] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [4, 5, 10] },
	{ boss: 'enem2', indexAbilities: [12, 13] },
	{ boss: 'enem2', indexAbilities: [0, 1, 15, 9] },

	// Хаптун — LANE_CLOSE
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [0, 6, 2, 7] },
	{ boss: 'enem3', indexAbilities: [1, 4, 8, 11, 15] },

	// Долбун — LEFT_COLUMN
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [5, 7, 14] },
	{ boss: 'enem4', indexAbilities: [0, 2, 12] },
	{ boss: 'enem4', indexAbilities: [3, 6, 13, 15] },

	// Токовик — FAN_THEN_BOOM
	{ boss: 'enem5', indexAbilities: [0, 1, 2] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [9, 10] },
	{ boss: 'enem5', indexAbilities: [11, 12] },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8] },
	{ boss: 'enem5', indexAbilities: [2, 9, 13] },
	{ boss: 'enem5', indexAbilities: [0, 4, 10, 11, 15] },
];
