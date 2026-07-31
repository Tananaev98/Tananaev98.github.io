let lvlNumber = 3; 
let factorChar = (lvlNumber*5) / 100;

const bossCombatConfig = {
	levelCadence: 0.96, damageMultiplier: 1.03, minWaveDelay: 2520, minShotDelay: 168, minTelegraphMs: 580,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.95, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.07, maxActiveAttacks: 12 },
		{ phase: 2, minHp: 0.31, cadence: 0.86, speed: 1.05, damage: 1.08, telegraphMultiplier: 0.95, surpriseChance: 0.14, maxActiveAttacks: 14 },
		{ phase: 3, minHp: 0.00, cadence: 0.74, speed: 1.12, damage: 1.16, telegraphMultiplier: 0.89, surpriseChance: 0.22, maxActiveAttacks: 16 }
	],
	bosses: {
		enem1: { movementStyle: 'accelerate', cadence: 0.96, telegraphMs: 800, speedMultiplier: 1.06, damageMultiplier: 0.96, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] }, // NEEDLE_BURST: короткие ускоряющиеся иглы
		enem2: { movementStyle: 'drift', cadence: 1.02, telegraphMs: 850, speedMultiplier: 1.00, damageMultiplier: 1.01, speedVariance: [0.88, 0.98, 1.07, 1.15, 1.22] }, // RIGHT_HISS: угрозы сползают справа
		enem3: { movementStyle: 'weave', cadence: 1.10, telegraphMs: 970, speedMultiplier: 0.88, damageMultiplier: 1.15, speedVariance: [0.82, 0.91, 1.00, 1.10, 1.18] }, // HEAT_GUST: волнообразные порывы
		enem4: { movementStyle: 'lateRush', cadence: 0.92, telegraphMs: 760, speedMultiplier: 1.08, damageMultiplier: 1.06, speedVariance: [0.80, 0.92, 1.05, 1.18, 1.28] }, // DROP_FRUIT: падение → внезапный разгон
		enem5: { movementStyle: 'pause', cadence: 1.14, telegraphMs: 1040, speedMultiplier: 0.86, damageMultiplier: 1.18, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.16] } // BOTTOM_WALL: вязкая кисельная стена
	}
};


const ENEMY_TYPES = {
	
	enem11: {  
        name: 'enem11',                     
        image: 'images/enemies/regions/1_smesh_les/lvl3/11.webp',  
        baseHP: 100,                     
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '6%'                        
    },
	
	enem22: {  
        name: 'enem22',                     
        image: 'images/enemies/regions/1_smesh_les/lvl3/22.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                        
    },
	
	enem33: {  
        name: 'enem33',                     
        image: 'images/enemies/regions/1_smesh_les/lvl3/33.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '6%'                        
    },
	
	enem44: {  
        name: 'enem44',                     
        image: 'images/enemies/regions/1_smesh_les/lvl3/44.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                       
        size: '6%'                       
    },
	
	enem55: {  
        name: 'enem55',                     
        image: 'images/enemies/regions/1_smesh_les/lvl3/55.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                       
    },
	
    enem1: {  
        name: 'enem1',                     
		dispName:  'Колючий',
        image: 'images/enemies/regions/1_smesh_les/lvl3/1.webp',  
        baseHP: (3900) + (3900 * factorChar),                      // Базовое здоровье
        baseSpeed: 0,                  
        baseDamage: (20)+(20)*factorChar,                      
        spawnWeight: 5,                  
		baseExp: 250,                      
        size: '25%'                        
    },
    enem2: {  
        name: 'enem2',
		dispName:  'Шипун',
        image: 'images/enemies/regions/1_smesh_les/lvl3/2.webp',
        baseHP: (15000) + (15000 * factorChar),
        baseSpeed: 0,
        baseDamage: (22)+(22)*factorChar,
        spawnWeight: 15,                  
		baseExp: 400, 
		xPos: 36,
        size: '28%'
    },
    enem3: {  
        name: 'enem3',
		dispName:  'Уф',
        image: 'images/enemies/regions/1_smesh_les/lvl3/3.webp',
        baseHP: (21000) + (21000) *factorChar,
        baseSpeed: 0,
        baseDamage: (24)+(24)*factorChar,
        spawnWeight: 20,
		baseExp: 600,
		xPos: 36,		
        size: '28%'                        
    }, 
	
	enem4: {  
        name: 'enem4',
		dispName:  'Румяная',
        image: 'images/enemies/regions/1_smesh_les/lvl3/4.webp',
        baseHP: (62000)+(62000)*factorChar,
        baseSpeed: 0,
        baseDamage: (26)+(26)*factorChar,
        spawnWeight: 10,
		baseExp: 800,
		xPos: 35,
        size: '30%'                        
    },
	
	enem5: {  
        name: 'enem5',
		dispName:  'Кисельный берег',
        image: 'images/enemies/regions/1_smesh_les/lvl3/5.webp',
        baseHP: (76000)+(76000)*factorChar,
        baseSpeed: 0,
        baseDamage: (28)+(28)*factorChar,
        spawnWeight: 5,
		baseExp: 0,
		xPos: 34,		
        size: '30%'                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;
 
  // Уровень 3 — Гуси-лебеди (сказка)
 // Размеры боссов ≤30%; атаки по краям / снизу; быстрые — сверху.

 const bossAbilities = [
	// ===== Колючий: NEEDLE_BURST — иголки короткими вспышками с обоих краёв =====
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //7
	// россыпь иголок — 5 быстрых сверху
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 28 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //15

	// ===== Шипун: RIGHT_HISS — шипение/плевок только справа =====
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //7
	// струя — 4 быстрых справа сверху
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15

	// ===== Уф: HEAT_GUST — жар печи: порывы с обоих флангов + вспышка сверху =====
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //7
	// вспышка — 3 быстрых сверху
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //15

	// ===== Румяная: DROP_FRUIT — яблоки падают столбиком слева, потом справа =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //9
	// сорванные плоды — 3 быстрых сверху
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //15

	// ===== Кисельный берег: BOTTOM_WALL — вязкая стена снизу (единственная на уровне) =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //9
	// всплеск — 2 быстрых сверху
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //15
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5400 }, // иголки сыплются
	{ boss: 'enem2', bossDelayAb: 280, bossDelayAbDop: 6000 }, // шипение справа
	{ boss: 'enem3', bossDelayAb: 320, bossDelayAbDop: 5600 }, // жар волнами
	{ boss: 'enem4', bossDelayAb: 340, bossDelayAbDop: 6200 }, // плоды падают размеренно
	{ boss: 'enem5', bossDelayAb: 300, bossDelayAbDop: 6800 }, // кисель набирает, долгая пауза
];

 const bossAbilitiesDop = [
	// Колючий
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11, 12] },
	{ boss: 'enem1', indexAbilities: [8, 10, 12, 9, 11] },
	{ boss: 'enem1', indexAbilities: [0, 8, 2, 10] },
	{ boss: 'enem1', indexAbilities: [13, 12, 14, 15, 6] },

	// Шипун
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9, 11] },
	{ boss: 'enem2', indexAbilities: [1, 8, 5, 13] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 7] },

	// Уф
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [0, 3, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [8, 10, 9, 13] },
	{ boss: 'enem3', indexAbilities: [1, 8, 4, 9] },
	{ boss: 'enem3', indexAbilities: [11, 13, 12, 14, 15] },

	// Румяная
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 10, 4, 11] },
	{ boss: 'enem4', indexAbilities: [8, 13, 9, 14, 15] },

	// Кисельный берег
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 6, 8] },
	{ boss: 'enem5', indexAbilities: [10, 11] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [2, 10, 9, 11] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15] },
];