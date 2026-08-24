let lvlNumber = 2; 
let factorChar = (lvlNumber*5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.98, damageMultiplier: 1.02, minWaveDelay: 2550, minShotDelay: 170, minTelegraphMs: 590,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.95, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.07, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.87, speed: 1.04, damage: 1.08, telegraphMultiplier: 0.95, surpriseChance: 0.13, maxActiveAttacks: 14 },
		{ phase: 3, minHp: 0.00, cadence: 0.75, speed: 1.11, damage: 1.15, telegraphMultiplier: 0.89, surpriseChance: 0.21, maxActiveAttacks: 16 }
	],
	bosses: {
		enem1: { movementStyle: 'accelerate', cadence: 1.10, telegraphMs: 950, speedMultiplier: 0.90, damageMultiplier: 0.95, speedVariance: [0.82, 0.90, 0.98, 1.06, 1.14] }, // LEFT_COLUMN: ровное давление колонной
		enem2: { movementStyle: 'lateRush', cadence: 0.98, telegraphMs: 820, speedMultiplier: 1.02, damageMultiplier: 1.00, speedVariance: [0.88, 0.97, 1.05, 1.13, 1.20] }, // RIGHT_SPILL: растекается с правого края
		enem3: { movementStyle: 'pause', cadence: 1.06, telegraphMs: 900, speedMultiplier: 0.96, damageMultiplier: 1.08, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.22] }, // RING_PAIRS: раскачивающиеся пары
		enem4: { movementStyle: 'drift', cadence: 0.90, telegraphMs: 710, speedMultiplier: 1.10, damageMultiplier: 1.04, speedVariance: [0.90, 1.00, 1.10, 1.18, 1.24] }, // DUAL_ASCENT: ускоряющийся подъём
		enem5: { movementStyle: 'straight', cadence: 0.80, telegraphMs: 740, speedMultiplier: 1.08, damageMultiplier: 1.12, speedVariance: [0.80, 0.92, 1.04, 1.16, 1.26] } // WAVE_TOP: дождь с поздним рывком
	}
};


const ENEMY_TYPES = {
	
	enem11: {  
        name: 'enem11',                     
        image: 'images/enemies/regions/1_smesh_les/lvl2/11.webp',  
        baseHP: 100,                     
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '6%'                        
    },
	
	enem22: {  
        name: 'enem22',                     
        image: 'images/enemies/regions/1_smesh_les/lvl2/22.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                        
    },
	
	enem33: {  
        name: 'enem33',                     
        image: 'images/enemies/regions/1_smesh_les/lvl2/33.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '6%'                        
    },
	
	enem44: {  
        name: 'enem44',                     
        image: 'images/enemies/regions/1_smesh_les/lvl2/44.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                       
        size: '6%'                       
    },
	
	enem55: {  
        name: 'enem55',                     
        image: 'images/enemies/regions/1_smesh_les/lvl2/55.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                       
    },
	
    enem1: {  
        name: 'enem1',                     // Название типа
		dispName:  'Боровик',
        image: 'images/enemies/regions/1_smesh_les/lvl2/1.webp',  // Путь к изображению
        baseHP: (3900) + (3900 * factorChar),                      // Базовое здоровье
        baseSpeed: 0,                  
        baseDamage: (20)+(20)*factorChar,                   
        spawnWeight: 5,                   
		baseExp: 250,                     
        size: '25%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1200 }                        
    },
    enem2: {  
        name: 'enem2',
		dispName:  'Груздь',
        image: 'images/enemies/regions/1_smesh_les/lvl2/2.webp',
        baseHP: (15000) + (15000 * factorChar),
        baseSpeed: 0,
        baseDamage: (22)+(22)*factorChar,
        spawnWeight: 15,                  
		baseExp: 400, 
        size: '25%',
        deathAnimation: { preset: 'puffPop', durationMs: 900 }
    },
    enem3: {  
        name: 'enem3',
		dispName:  'Рыжик',
        image: 'images/enemies/regions/1_smesh_les/lvl2/3.webp',
        baseHP: (21000) + (21000) *factorChar,
        baseSpeed: 0,
        baseDamage: (24)+(24)*factorChar,
        spawnWeight: 20,
		baseExp: 600, 
        size: '25%',
        deathAnimation: { preset: 'meltDown', durationMs: 1300 }                        
    }, 
	
	enem4: {  
        name: 'enem4',
		dispName:  'Подберезовик',
        image: 'images/enemies/regions/1_smesh_les/lvl2/4.webp',
        baseHP: (62000)+(62000)*factorChar,
        baseSpeed: 0,
        baseDamage: (26)+(26)*factorChar,
        spawnWeight: 10,
		baseExp: 800, 
        size: '25%',
        deathAnimation: { preset: 'tumbleFall', durationMs: 1150 }                        
    },
	
	enem5: {  
        name: 'enem5',
		dispName:  'Лисичка',
        image: 'images/enemies/regions/1_smesh_les/lvl2/5.webp',
        baseHP: (76000)+(76000)*factorChar,
        baseSpeed: 0,
        baseDamage: (28)+(28)*factorChar,
        spawnWeight: 5,
		baseExp: 0, 
        size: '25%',
        deathAnimation: { preset: 'spinAway', durationMs: 1250 }                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;
 
  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)
 //spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
 // Уровень 2 — грибное семейство (не клон L1)
 // Атаки по краям / ниже босса; быстрые — сверху.

 const bossAbilities = [
	// ===== Боровик: LEFT_COLUMN — толстая ножка-столбик слева =====
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //7
	// шляпка рвётся — 3 быстрых слева сверху
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15

	// ===== Груздь: RIGHT_SPILL — молочный разлив справа =====
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //7
	// брызги — 4 быстрых справа сверху
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15

	// ===== Рыжик: RING_PAIRS — круги на шляпке: пары на скрещённых высотах =====
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //7
	// вспышка кругов — 3 быстрых сверху
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //15

	// ===== Подберезовик: DUAL_ASCENT — высокая ножка: подъём слева, потом справа =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //7
	// срыв шляпки — 2 быстрых сверху
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //15

	// ===== Лисичка: WAVE_TOP — волнистая шляпка: дождь сверху асимметрично =====
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //5
	// волна — 6 быстрых сверху (волнистая линия)
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //15
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 340, bossDelayAbDop: 5800 }, // толстый, размеренный
	{ boss: 'enem2', bossDelayAb: 280, bossDelayAbDop: 6200 }, // разлив плотный
	{ boss: 'enem3', bossDelayAb: 300, bossDelayAbDop: 5400 }, // круги вспыхивают
	{ boss: 'enem4', bossDelayAb: 260, bossDelayAbDop: 5600 }, // подъём по ножке
	{ boss: 'enem5', bossDelayAb: 220, bossDelayAbDop: 4800 }, // волна сыплется часто
];

 const bossAbilitiesDop = [
	// Боровик
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [8, 10, 9, 12] },
	{ boss: 'enem1', indexAbilities: [1, 8, 5, 12] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },
	{ boss: 'enem1', indexAbilities: [3, 4, 5] },

	// Груздь
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 6] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9, 11] },
	{ boss: 'enem2', indexAbilities: [1, 8, 5, 13] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 7] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2] },
	{ boss: 'enem2', indexAbilities: [3, 4, 5] },

	// Рыжик
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [8, 10, 9, 13] },
	{ boss: 'enem3', indexAbilities: [2, 8, 3, 9] },
	{ boss: 'enem3', indexAbilities: [11, 13, 12, 14, 15] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4] },
	{ boss: 'enem3', indexAbilities: [1, 3, 5] },

	// Подберезовик
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [0, 8, 4, 9] },
	{ boss: 'enem4', indexAbilities: [10, 12, 11, 13, 14] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6] },

	// Лисичка
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [6, 8, 10, 7, 9, 11] },
	{ boss: 'enem5', indexAbilities: [0, 6, 2, 9] },
	{ boss: 'enem5', indexAbilities: [4, 5, 14, 15] },
	{ boss: 'enem5', indexAbilities: [12, 14, 13, 15, 4] },
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
];

// Лорные названия связок временных улучшений (см. lvlData/gameData1.js — тот же принцип:
// у каждого босса свой авторский список из 35 названий, без общего трейт+падеж шаблона).
// Уровень 2 — грибной лес: Боровик (лесной царь-гриб), Груздь (солёный, млечный сок),
// Рыжик (рыжий, шустрый), Подберёзовик (высокий, тонконогий), Лисичка (золотая, хитрая).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Царский удар', variant2: 'Ядовитый плевок', variant3: 'Мощная ножка',
        variant4: 'Толстая шляпка', variant5: 'Меткий выброс спор', variant6: 'Едкий укус',
        variant7: 'Царская мощь', variant8: 'Бронированная шляпка', variant9: 'Стремительный гриб',
        variant10: 'Живучие споры', variant11: 'Цепкий мицелий', variant12: 'Плевок и в тень',
        variant13: 'Дубовая ножка', variant14: 'Неутомимый рост', variant15: 'Пружинистая шляпка',
        variant16: 'Меткие споры', variant17: 'Царская хватка', variant18: 'Верный прицел',
        variant19: 'Мгновенный выброс', variant20: 'Грибной дух', variant21: 'Стойкий яд',
        variant22: 'Юркая спора', variant23: 'Царская стойкость', variant24: 'Чуткие поры',
        variant25: 'Ускользающая тень', variant26: 'Дикий гриб', variant27: 'Едкая мощь',
        variant28: 'Внезапный выброс', variant29: 'Каменный боровик', variant30: 'Разросшаяся сила',
        variant31: 'Царский рывок', variant32: 'Живучая шляпка', variant33: 'Неутомимый мицелий',
        variant34: 'Грибная прыть', variant35: 'Царская выносливость'
    },
    enem2: {
        variant1: 'Молочный удар', variant2: 'Едкий сок', variant3: 'Солёная мощь',
        variant4: 'Просоленная кожица', variant5: 'Быстрый срез', variant6: 'Жгучий сок',
        variant7: 'Груздевая сила', variant8: 'Кадка-броня', variant9: 'Стремительный рост',
        variant10: 'Живучий сок', variant11: 'Цепкая мякоть', variant12: 'Капля и в землю',
        variant13: 'Плотная мякоть', variant14: 'Неутомимый груздь', variant15: 'Упругий бочок',
        variant16: 'Меткая капля', variant17: 'Молочная хватка', variant18: 'Верный надрез',
        variant19: 'Мгновенный сок', variant20: 'Земляной дух', variant21: 'Стойкий яд грибницы',
        variant22: 'Юркий подгруздок', variant23: 'Груздевая стойкость', variant24: 'Чуткие жабры',
        variant25: 'Ускользающая шляпка', variant26: 'Дикая горечь', variant27: 'Жгучая мощь',
        variant28: 'Внезапный надрез', variant29: 'Каменный груздь', variant30: 'Разбухшая сила',
        variant31: 'Солёный рывок', variant32: 'Живучая мякоть', variant33: 'Рост в темноте',
        variant34: 'Груздевая прыть', variant35: 'Солёная выносливость'
    },
    enem3: {
        variant1: 'Рыжий кураж', variant2: 'Огненный укус', variant3: 'Оранжевая сила',
        variant4: 'Плотная кожица', variant5: 'Меткий рывок', variant6: 'Едкий укол',
        variant7: 'Рыжая мощь', variant8: 'Прочная шляпка', variant9: 'Быстрый рыжик',
        variant10: 'Живучий огонёк', variant11: 'Цепкие поры', variant12: 'Укол и в мох',
        variant13: 'Крепкий бочок', variant14: 'Тот ещё непоседа', variant15: 'Пружинистый рыжик',
        variant16: 'Меткая искра', variant17: 'Рыжая хватка', variant18: 'Огненный прищур',
        variant19: 'Мгновенная вспышка', variant20: 'Грибной чуй', variant21: 'Стойкий румянец',
        variant22: 'Юркий рыжик', variant23: 'Рыжая стойкость', variant24: 'Чуткий бочок',
        variant25: 'Ускользающий огонёк', variant26: 'Дикий румянец', variant27: 'Огненная мощь',
        variant28: 'Внезапная вспышка', variant29: 'Каменный рыжик', variant30: 'Разгоревшаяся сила',
        variant31: 'Рыжий рывок', variant32: 'Живучая кожица', variant33: 'Неутомимый рыжик',
        variant34: 'Рыжая прыть', variant35: 'Огненная выносливость'
    },
    enem4: {
        variant1: 'Берёзовый удар', variant2: 'Колкий укол', variant3: 'Стройная сила',
        variant4: 'Крепкая ножка', variant5: 'Меткий взмах', variant6: 'Едкая пыльца',
        variant7: 'Берёзовая мощь', variant8: 'Кора-броня', variant9: 'Высокий рывок',
        variant10: 'Живучий стебель', variant11: 'Цепкие корни', variant12: 'Укол и в чащу',
        variant13: 'Прочный стебель', variant14: 'Неутомимый рост вверх', variant15: 'Гибкий стебель',
        variant16: 'Меткая пыльца', variant17: 'Берёзовая хватка', variant18: 'Верный взгляд',
        variant19: 'Мгновенный взмах', variant20: 'Лесной чуй', variant21: 'Стойкая кора',
        variant22: 'Юркий стебелёк', variant23: 'Берёзовая стойкость', variant24: 'Чуткие корешки',
        variant25: 'Тень берёзы', variant26: 'Дикий рост', variant27: 'Пыльца-отрава',
        variant28: 'Внезапный взмах', variant29: 'Каменный стебель', variant30: 'Вытянувшаяся сила',
        variant31: 'Берёзовый рывок', variant32: 'Живучая кора', variant33: 'Неутомимый подберёзовик',
        variant34: 'Берёзовая прыть', variant35: 'Берёзовая выносливость'
    },
    enem5: {
        variant1: 'Золотой кураж', variant2: 'Хитрый укус', variant3: 'Золотая сила',
        variant4: 'Волнистая броня', variant5: 'Лисий рывок', variant6: 'Едкий обман',
        variant7: 'Золотая мощь', variant8: 'Прочная волна', variant9: 'Стремительная лисичка',
        variant10: 'Живучая хитрость', variant11: 'Цепкая волна', variant12: 'Укус и в мох',
        variant13: 'Плотная волна', variant14: 'Неутомимая лисичка', variant15: 'Гибкий изгиб',
        variant16: 'Меткий блеск', variant17: 'Золотая хватка', variant18: 'Верный отблеск',
        variant19: 'Мгновенный блеск', variant20: 'Мшистый чуй', variant21: 'Стойкий обман',
        variant22: 'Юркая лисичка', variant23: 'Золотая стойкость', variant24: 'Чуткая волна',
        variant25: 'Ускользающий блеск', variant26: 'Дикий блеск', variant27: 'Едкая хитрость',
        variant28: 'Внезапный обман', variant29: 'Каменная лисичка', variant30: 'Разросшаяся волна',
        variant31: 'Золотой рывок', variant32: 'Живучая волна', variant33: 'Неутомимый блеск',
        variant34: 'Лисья прыть', variant35: 'Золотая выносливость'
    }
};
