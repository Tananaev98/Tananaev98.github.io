let lvlNumber = 4; 
let factorChar = (lvlNumber*5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.94, damageMultiplier: 1.05, minWaveDelay: 2480, minShotDelay: 164, minTelegraphMs: 565,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.96, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.08, maxActiveAttacks: 12 },
		{ phase: 2, minHp: 0.31, cadence: 0.85, speed: 1.05, damage: 1.09, telegraphMultiplier: 0.94, surpriseChance: 0.15, maxActiveAttacks: 15 },
		{ phase: 3, minHp: 0.00, cadence: 0.73, speed: 1.13, damage: 1.17, telegraphMultiplier: 0.88, surpriseChance: 0.23, maxActiveAttacks: 17 }
	],
	bosses: {
		enem1: { movementStyle: 'pause', cadence: 1.04, telegraphMs: 900, speedMultiplier: 0.96, damageMultiplier: 1.04, speedVariance: [0.80, 0.92, 1.04, 1.16, 1.24] }, // AXE_COLUMNS: тяжёлый замах → удар
		enem2: { movementStyle: 'drift', cadence: 1.08, telegraphMs: 940, speedMultiplier: 0.90, damageMultiplier: 1.02, speedVariance: [0.82, 0.92, 1.02, 1.12, 1.20] }, // SPORE_CLOUD: плавающее облако
		enem3: { movementStyle: 'straight', cadence: 0.92, telegraphMs: 700, speedMultiplier: 1.10, damageMultiplier: 1.08, speedVariance: [0.92, 1.00, 1.08, 1.16, 1.22] }, // AIM_PAIRS: точные прямые выстрелы
		enem4: { movementStyle: 'weave', cadence: 1.12, telegraphMs: 1020, speedMultiplier: 0.86, damageMultiplier: 1.16, speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12] }, // HERD_WALL: медленное смещение стада
		enem5: { movementStyle: 'accelerate', cadence: 0.82, telegraphMs: 680, speedMultiplier: 1.12, damageMultiplier: 1.14, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26] } // KEY_PATHS: быстро закрывает пути
	}
};


const ENEMY_TYPES = {
	
	enem11: {  
        name: 'enem11',                     
        image: 'images/enemies/regions/1_smesh_les/lvl4/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },
	
	enem22: {  
        name: 'enem22',                     
        image: 'images/enemies/regions/1_smesh_les/lvl4/22.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                        
    },
	
	enem33: {  
        name: 'enem33',                     
        image: 'images/enemies/regions/1_smesh_les/lvl4/33.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '6%'                        
    },
	
	enem44: {  
        name: 'enem44',                     
        image: 'images/enemies/regions/1_smesh_les/lvl4/44.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                       
        size: '6%'                       
    },
	
	enem55: {  
        name: 'enem55',                     
        image: 'images/enemies/regions/1_smesh_les/lvl4/55.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                       
    },
	
    enem1: {  
        name: 'enem1',                     
		dispName:  'Дровосек',
        image: 'images/enemies/regions/1_smesh_les/lvl4/1.webp',  
        baseHP: (3900) + (3900 * factorChar),
        baseSpeed: 0,                  
        baseDamage: (20)+(20)*factorChar,                      
        spawnWeight: 5,                  
		baseExp: 250,
		xPos: 38,
        size: '24%',
        deathAnimation: { preset: 'fleeStretch', durationMs: 1000 }                        
    },
    enem2: {  
        name: 'enem2',
		dispName:  'Грибник',
        image: 'images/enemies/regions/1_smesh_les/lvl4/2.webp',
        baseHP: (15000) + (15000 * factorChar),
        baseSpeed: 0,
        baseDamage: (22)+(22)*factorChar,
        spawnWeight: 15,                  
		baseExp: 400, 
		xPos: 36,
        size: '28%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1150 }
    },
    enem3: {  
        name: 'enem3',
		dispName:  'Охотник',
        image: 'images/enemies/regions/1_smesh_les/lvl4/3.webp',
        baseHP: (21000) + (21000) *factorChar,
        baseSpeed: 0,
        baseDamage: (24)+(24)*factorChar,
        spawnWeight: 20,
		baseExp: 600,
		xPos: 37,		
        size: '26%',
        deathAnimation: { preset: 'packBurst', durationMs: 1000 }                        
    }, 
	
	enem4: {  
        name: 'enem4',
		dispName:  'Пастух',
        image: 'images/enemies/regions/1_smesh_les/lvl4/4.webp',
        baseHP: (62000)+(62000)*factorChar,
        baseSpeed: 0,
        baseDamage: (26)+(26)*factorChar,
        spawnWeight: 10,
		baseExp: 800,
		xPos: 35,
        size: '25%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1100 }                        
    },
	
	enem5: {  
        name: 'enem5',
		dispName:  'Лесник',
        image: 'images/enemies/regions/1_smesh_les/lvl4/5.webp',
        baseHP: (76000)+(76000)*factorChar,
        baseSpeed: 0,
        baseDamage: (28)+(28)*factorChar,
        spawnWeight: 5,
		baseExp: 0,
		xPos: 34,		
        size: '28%',
        deathAnimation: { preset: 'heavySink', durationMs: 1400 }                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;
 
 // Уровень 4 — Самозанятые в чаще
 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые — y≤12.

 const bossAbilities = [
	// ===== Дровосек: AXE_COLUMNS — рубка столбиками слева/справа =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //15

	// ===== Грибник: SPORE_CLOUD — споры по флангам + выброс сверху =====
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //15

	// ===== Охотник: AIM_PAIRS — прицелы парами + выстрелы сверху =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15

	// ===== Пастух: HERD_WALL — стадо снизу (единственная стена на уровне) + кнут с краёв =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //15

	// ===== Лесник: KEY_PATHS — тропы-столбики без нижней стены; 3 быстрых из углов =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 6,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 25 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 23 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //15
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 350, bossDelayAbDop: 5800 },
	{ boss: 'enem2', bossDelayAb: 400, bossDelayAbDop: 6200 },
	{ boss: 'enem3', bossDelayAb: 280, bossDelayAbDop: 5000 },
	{ boss: 'enem4', bossDelayAb: 220, bossDelayAbDop: 6800 },
	{ boss: 'enem5', bossDelayAb: 300, bossDelayAbDop: 5200 },
];

 const bossAbilitiesDop = [
	// Дровосек
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [6, 8, 7, 9] },
	{ boss: 'enem1', indexAbilities: [0, 6, 1, 7] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem1', indexAbilities: [14, 6, 15, 9, 2] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },

	// Грибник
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [0, 2, 3, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem2', indexAbilities: [6, 8, 7, 9] },
	{ boss: 'enem2', indexAbilities: [0, 6, 3, 7] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem2', indexAbilities: [1, 9, 10, 7, 14] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2] },

	// Охотник
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [4, 6, 5, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem3', indexAbilities: [0, 4, 2, 6] },
	{ boss: 'enem3', indexAbilities: [1, 5, 8, 9, 12] },
	{ boss: 'enem3', indexAbilities: [3, 7, 10, 11, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1] },

	// Пастух
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 6, 2, 8, 4, 10] },
	{ boss: 'enem4', indexAbilities: [12, 13] },
	{ boss: 'enem4', indexAbilities: [12, 14, 15, 13] },
	{ boss: 'enem4', indexAbilities: [1, 7, 3, 9, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },

	// Лесник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 6, 8, 9] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14] },
	{ boss: 'enem5', indexAbilities: [12, 14, 13] },
	{ boss: 'enem5', indexAbilities: [0, 12, 4, 13] },
	{ boss: 'enem5', indexAbilities: [8, 12, 10, 13] },
	{ boss: 'enem5', indexAbilities: [1, 14, 9, 15, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2] },
];

// Лорные названия связок (см. принцип в lvlData/gameData1.js). Уровень 4 — лесной люд:
// Дровосек (топор), Грибник (корзина, споры), Охотник (прицел), Пастух (посох, отара),
// Лесник (капканы, тропы).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Рубящий удар', variant2: 'Заточенное лезвие', variant3: 'Дровосецкая мощь',
        variant4: 'Кора-мозоль', variant5: 'Меткий замах', variant6: 'Щепящий удар',
        variant7: 'Топорная сила', variant8: 'Дубовые плечи', variant9: 'Стремительный замах',
        variant10: 'Живучий дровосек', variant11: 'Цепкий хват топорища', variant12: 'Удар и в чащу',
        variant13: 'Широкие плечи', variant14: 'Неутомимый рубщик', variant15: 'Пружинистый замах',
        variant16: 'Меткий раскол', variant17: 'Дровосецкая хватка', variant18: 'Верный удар',
        variant19: 'Мгновенный взмах', variant20: 'Лесной нюх', variant21: 'Стойкий к мозолям',
        variant22: 'Юркий лесоруб', variant23: 'Дровосецкая стойкость', variant24: 'Слух дровосека',
        variant25: 'Ускользающий в чащу', variant26: 'Дикий замах', variant27: 'Щепящая мощь',
        variant28: 'Внезапный взмах', variant29: 'Каменные плечи', variant30: 'Разросшаяся сила',
        variant31: 'Дровосецкий рывок', variant32: 'Живучие мозоли', variant33: 'Неутомимый взмах',
        variant34: 'Дровосецкая прыть', variant35: 'Дровосецкая выносливость'
    },
    enem2: {
        variant1: 'Споровый плевок', variant2: 'Едкое облако', variant3: 'Грибниковая сила',
        variant4: 'Корзина-щит', variant5: 'Меткий взмах корзины', variant6: 'Жгучие споры',
        variant7: 'Грибниковая мощь', variant8: 'Плотный плащ', variant9: 'Стремительный сбор',
        variant10: 'Живучие споры', variant11: 'Цепкая корзина', variant12: 'Плевок и в чащу',
        variant13: 'Крепкий плащ', variant14: 'Неутомимый грибник', variant15: 'Плавающее облако',
        variant16: 'Меткая спора', variant17: 'Грибниковая хватка', variant18: 'Нюх на грибы',
        variant19: 'Мгновенное облако', variant20: 'Лесной нюх', variant21: 'Стойкий к яду',
        variant22: 'Юркий грибник', variant23: 'Грибниковая стойкость', variant24: 'Взгляд под листвой',
        variant25: 'Ускользающее облако', variant26: 'Дикие споры', variant27: 'Едкая мощь',
        variant28: 'Внезапное облако', variant29: 'Плетёная броня', variant30: 'Разросшееся облако',
        variant31: 'Грибниковый рывок', variant32: 'Живучий плащ', variant33: 'Неутомимое облако',
        variant34: 'Грибниковая прыть', variant35: 'Грибниковая выносливость'
    },
    enem3: {
        variant1: 'Меткий выстрел', variant2: 'Разрывная стрела', variant3: 'Охотничья сила',
        variant4: 'Кожаная броня', variant5: 'Прицельный залп', variant6: 'Ядовитый наконечник',
        variant7: 'Охотничья мощь', variant8: 'Колчан-щит', variant9: 'Стремительный выстрел',
        variant10: 'Живучий охотник', variant11: 'Цепкий силок', variant12: 'Выстрел и в засаду',
        variant13: 'Плотная куртка', variant14: 'Неутомимый следопыт', variant15: 'Пружинистый шаг',
        variant16: 'Меткий прицел', variant17: 'Охотничья хватка', variant18: 'Верный глаз',
        variant19: 'Мгновенный выстрел', variant20: 'Охотничий нюх', variant21: 'Стойкий к погоне',
        variant22: 'Юркий следопыт', variant23: 'Охотничья стойкость', variant24: 'Чуткое ухо',
        variant25: 'Ускользающий в засаду', variant26: 'Дикий выстрел', variant27: 'Ядовитая мощь',
        variant28: 'Внезапный залп', variant29: 'Каменная выдержка', variant30: 'Разросшийся арсенал',
        variant31: 'Охотничий рывок', variant32: 'Живучая куртка', variant33: 'Неутомимый прицел',
        variant34: 'Охотничья прыть', variant35: 'Охотничья выносливость'
    },
    enem4: {
        variant1: 'Пастуший удар', variant2: 'Колючий посох', variant3: 'Пастушья сила',
        variant4: 'Овчинная броня', variant5: 'Меткий взмах посоха', variant6: 'Едкий дёготь',
        variant7: 'Пастушья мощь', variant8: 'Плотная овчина', variant9: 'Стадный напор',
        variant10: 'Живучий пастух', variant11: 'Крюк посоха', variant12: 'Удар и в отару',
        variant13: 'Толстая овчина', variant14: 'Неутомимый пастух', variant15: 'Медлительный, но верный',
        variant16: 'Меткий бросок посоха', variant17: 'Пастушья хватка', variant18: 'Взгляд на стадо',
        variant19: 'Мгновенный окрик', variant20: 'Пастуший нюх', variant21: 'Стойкая отара',
        variant22: 'Юркий подпасок', variant23: 'Пастушья стойкость', variant24: 'Чуткий колокольчик',
        variant25: 'Ускользающая овца', variant26: 'Дикая отара', variant27: 'Едкий посох',
        variant28: 'Внезапный окрик', variant29: 'Каменный посох', variant30: 'Разросшаяся отара',
        variant31: 'Пастуший рывок', variant32: 'Живучая овчина', variant33: 'Неутомимая отара',
        variant34: 'Пастушья прыть', variant35: 'Пастушья выносливость'
    },
    enem5: {
        variant1: 'Лесничий удар', variant2: 'Капкан-укус', variant3: 'Лесничья сила',
        variant4: 'Кожух-броня', variant5: 'Меткий обход', variant6: 'Едкая смола',
        variant7: 'Лесничья мощь', variant8: 'Плотный кожух', variant9: 'Стремительный обход',
        variant10: 'Живучий лесник', variant11: 'Цепкий капкан', variant12: 'Удар и на тропу',
        variant13: 'Крепкий кожух', variant14: 'Неутомимый обходчик', variant15: 'Пружинистый шаг лесника',
        variant16: 'Меткий засов', variant17: 'Лесничья хватка', variant18: 'Верный обход',
        variant19: 'Перекрытие тропы', variant20: 'Лесничий нюх', variant21: 'Стойкий страж',
        variant22: 'Юркий лесник', variant23: 'Лесничья стойкость', variant24: 'Страж троп',
        variant25: 'Ускользающая тропа', variant26: 'Дикая чаща', variant27: 'Мощь смолы',
        variant28: 'Внезапное перекрытие', variant29: 'Каменный кожух', variant30: 'Разросшийся обход',
        variant31: 'Лесничий рывок', variant32: 'Живучий кожух', variant33: 'Неутомимый страж',
        variant34: 'Лесничья прыть', variant35: 'Лесничья выносливость'
    }
};
