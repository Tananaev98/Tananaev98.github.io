let lvlNumber = 4; 
let factorChar = (lvlNumber*5) / 100;


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
        baseHP: (2600) +(2600*factorChar),
        baseSpeed: 0,                  
        baseDamage: (20)+(20)*factorChar,                      
        spawnWeight: 5,                  
		baseExp: 250,
		xPos: 38,
        size: '24%'                        
    },
    enem2: {  
        name: 'enem2',
		dispName:  'Грибник',
        image: 'images/enemies/regions/1_smesh_les/lvl4/2.webp',
        baseHP: (4200) + (4200*factorChar),
        baseSpeed: 0,
        baseDamage: (22)+(22)*factorChar,
        spawnWeight: 15,                  
		baseExp: 400, 
		xPos: 36,
        size: '28%'
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
        size: '26%'                        
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
        size: '25%'                        
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
        size: '28%'                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;
 
 // Уровень 4 — Самозанятые в чаще
 // Боссы стоят примерно в зоне x 34–70, y 13–42.
 // Атаки по краям (x≤18 / x≥78) или ниже босса.
 // Правило честности: быстрые (speed≥16) стартуют высоко (y≤12),
 // чтобы было время среагировать; медленные могут появляться ниже.
 // customSpeed: медленные 2–6, средние 10–15, быстрые 20–28
 
 const bossAbilities = [
    // ===== Дровосек =====
	// медленные тяжёлые удары
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4},  //0
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5},  //1
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4},  //2
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5},  //3
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4},  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5},  //5
	// быстрые рубки — только сверху
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22}, //6
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26}, //7
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22}, //8
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26}, //9
	// размах: медленные ниже, быстрые выше
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6},  //10
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18}, //11
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8},  //12
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24}, //13
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12}, //14
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14}, //15
	
	// ===== Грибник =====
	// медленные споры
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3},  //0
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4},  //1
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4},  //3
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3},  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5},  //5
	// быстрый выброс — только сверху
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24}, //6
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26}, //7
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22}, //8
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28}, //9
	// ловушки: медленные низко, быстрые высоко
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4},  //10
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20}, //11
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6},  //12
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16}, //13
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10}, //14
	
	// ===== Охотник =====
	// медленные «прицелы»
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5},  //0
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4},  //1
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5},  //2
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4},  //3
	// быстрые выстрелы — только сверху
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24}, //4
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28}, //5
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24}, //6
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 28}, //7
	// собака: медленная ниже, рывок сверху
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6},  //8
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26}, //9
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6},  //10
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26}, //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14}, //12
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12}, //13
	
	// ===== Пастух =====
	// медленное стадо
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3},  //0
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4},  //1
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5},  //3
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4},  //4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3},  //5
	// быстрый разгон стада — стартует сверху
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20}, //6
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24}, //7
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22}, //8
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26}, //9
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20}, //10
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24}, //11
	// кнут — микс
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28}, //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6},  //13
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5},  //14
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22}, //15
	
	// ===== Лесник =====
	// медленные тропы
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4},  //0
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5},  //1
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4},  //3
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5},  //4
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3},  //5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4},  //6
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5},  //7
	// стена у крепости — очень медленная
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 55, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2},  //8
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 55, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3},  //9
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 55, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2},  //10
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 55, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3},  //11
	// быстрый обход — только сверху
	{ boss: 'enem5', type: 'enem55', xPos: 5,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24}, //12
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26}, //13
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22}, //14
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28}, //15
];



 const mBossDelayAb = [
    { boss: 'enem1', bossDelayAb: 350, bossDelayAbDop: 5800 },
	{ boss: 'enem2', bossDelayAb: 400, bossDelayAbDop: 6200 },
	{ boss: 'enem3', bossDelayAb: 280, bossDelayAbDop: 5000 },
	{ boss: 'enem4', bossDelayAb: 220, bossDelayAbDop: 6800 },
	{ boss: 'enem5', bossDelayAb: 300, bossDelayAbDop: 5200 },
];

// Способности: набор медленных / набор быстрых / микс (медленно+быстро)
  const bossAbilitiesDop = [
    // Дровосек
    { boss: 'enem1', indexAbilities: [0, 1, 2, 3]},
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5]},
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9]},
	{ boss: 'enem1', indexAbilities: [6, 8, 7, 9]},
	{ boss: 'enem1', indexAbilities: [0, 6, 1, 7]},
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13]},
	{ boss: 'enem1', indexAbilities: [14, 6, 15, 9, 2]},

	// Грибник
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4]},
	{ boss: 'enem2', indexAbilities: [0, 2, 3, 5]},
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9]},
	{ boss: 'enem2', indexAbilities: [6, 8, 7, 9]},
	{ boss: 'enem2', indexAbilities: [0, 6, 3, 7]},
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13]},
	{ boss: 'enem2', indexAbilities: [1, 9, 10, 7, 14]},
	
	// Охотник
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3]},
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7]},
	{ boss: 'enem3', indexAbilities: [4, 6, 5, 7]},
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11]},
	{ boss: 'enem3', indexAbilities: [0, 4, 2, 6]},
	{ boss: 'enem3', indexAbilities: [1, 5, 8, 9, 12]},
	{ boss: 'enem3', indexAbilities: [3, 7, 10, 11, 13]},
	
	// Пастух
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5]},
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11]},
	{ boss: 'enem4', indexAbilities: [0, 6, 2, 8, 4, 10]},
	{ boss: 'enem4', indexAbilities: [12, 13]},
	{ boss: 'enem4', indexAbilities: [12, 14, 15, 13]},
	{ boss: 'enem4', indexAbilities: [1, 7, 3, 9, 12]},
	
	// Лесник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5]},
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11]},
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15]},
	{ boss: 'enem5', indexAbilities: [0, 12, 4, 13]},
	{ boss: 'enem5', indexAbilities: [8, 12, 10, 13]},
	{ boss: 'enem5', indexAbilities: [1, 14, 9, 15, 3]},
	{ boss: 'enem5', indexAbilities: [2, 6, 12, 13, 8]},
	
];
