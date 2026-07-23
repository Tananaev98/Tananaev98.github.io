let lvlNumber = 5; 
let factorChar = (lvlNumber*5) / 100;


const ENEMY_TYPES = {
	
	enem11: {  
        name: 'enem11',                     
        image: 'images/enemies/regions/1_smesh_les/lvl5/11.webp',  
        baseHP: 100,                     
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '7%'                        
    },
	
	enem22: {  
        name: 'enem22',                     
        image: 'images/enemies/regions/1_smesh_les/lvl5/22.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '7%'                        
    },
	
	enem33: {  
        name: 'enem33',                     
        image: 'images/enemies/regions/1_smesh_les/lvl5/33.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '7%'                        
    },
	
	enem44: {  
        name: 'enem44',                     
        image: 'images/enemies/regions/1_smesh_les/lvl5/44.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                       
        size: '7%'                       
    },
	
	enem55: {  
        name: 'enem55',                     
        image: 'images/enemies/regions/1_smesh_les/lvl5/55.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '7%'                       
    },
	
    enem1: {  
        name: 'enem1',                     
		dispName:  'УУ-х',
        image: 'images/enemies/regions/1_smesh_les/lvl5/1.webp',  
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
		dispName:  'Мурка',
        image: 'images/enemies/regions/1_smesh_les/lvl5/2.webp',
        baseHP: (4200) + (4200*factorChar),
        baseSpeed: 0,
        baseDamage: (22)+(22)*factorChar,
        spawnWeight: 15,                  
		baseExp: 400, 
		xPos: 36,
        size: '26%'
    },
    enem3: {  
        name: 'enem3',
		dispName:  'Секач',
        image: 'images/enemies/regions/1_smesh_les/lvl5/3.webp',
        baseHP: (21000) + (21000) *factorChar,
        baseSpeed: 0,
        baseDamage: (24)+(24)*factorChar,
        spawnWeight: 20,
		baseExp: 600,
		xPos: 35,		
        size: '30%'                        
    }, 
	
	enem4: {  
        name: 'enem4',
		dispName:  'Царапка',
        image: 'images/enemies/regions/1_smesh_les/lvl5/4.webp',
        baseHP: (62000)+(62000)*factorChar,
        baseSpeed: 0,
        baseDamage: (26)+(26)*factorChar,
        spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
        size: '28%'                        
    },
	
	enem5: {  
        name: 'enem5',
		dispName:  'Волчок',
        image: 'images/enemies/regions/1_smesh_les/lvl5/5.webp',
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
 
 // Уровень 5 — Ночные хищники
 // Боссы стоят примерно в зоне x 34–70, y 13–42.
 // Атаки по краям (x≤18 / x≥78) или ниже босса.
 // Правило честности: быстрые (speed≥16) стартуют высоко (y≤12),
 // чтобы было время среагировать; медленные могут появляться ниже.
 // customSpeed: медленные 2–6, средние 10–15, быстрые 20–28
 
 const bossAbilities = [
    // ===== Филин: сброс перьев с крыльев + пике =====
	// медленные перья с краёв (крылья)
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4},  //0
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5},  //1
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5},  //3
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4},  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3},  //5
	// быстрое пике — только сверху
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22}, //6
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26}, //7
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22}, //8
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26}, //9
	// V-сход: медленные ниже, быстрые сверху у краёв
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5},  //10
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24}, //11
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5},  //12
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24}, //13
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12}, //14
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14}, //15
	
	// ===== Рысь: засада — медленно уже близко; прыжок только сверху =====
	// медленная засада с флангов у крепости
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4},  //0
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5},  //1
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5},  //3
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4},  //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3},  //5
	// быстрый прыжок из кроны — только сверху
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24}, //6
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28}, //7
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24}, //8
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28}, //9
	// микс: медленная у крепости + рывок сверху
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6},  //10
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26}, //11
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6},  //12
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26}, //13
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12}, //14
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14}, //15
	
	// ===== Кабан: медленная стена-давление + быстрый клин сверху =====
	// медленная стена ниже босса (таран у крепости)
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3},  //0
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4},  //1
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5},  //3
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3},  //4
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4},  //5
	// быстрый клин-рывок — только сверху с краёв
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20}, //6
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24}, //7
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24}, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22}, //9
	// микс: кусок стены + рывок
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5},  //10
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26}, //11
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5},  //12
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26}, //13
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12}, //14
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14}, //15
	
	// ===== Росомаха: углы / диагонали с краёв / бешеный зигзаг сверху =====
	// медленные углы
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4},  //0
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5},  //1
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4},  //3
	// средние «диагонали» только по краям
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12}, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14}, //5
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10}, //6
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12}, //7
	// бешеный зигзаг — только сверху
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22}, //8
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26}, //9
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24}, //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28}, //11
	// микс угол + рывок
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5},  //12
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24}, //13
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5},  //14
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24}, //15
	
	// ===== Волколак: медленное кольцо-стая + быстрые фланги сверху + вой =====
	// медленное кольцо у крепости
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3},  //0
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4},  //1
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3},  //2
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4},  //3
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3},  //4
	// быстрый фланговый натиск — только сверху
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22}, //5
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26}, //6
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26}, //7
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24}, //8
	// сходимость / вой — микс
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5},  //9
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28}, //10
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5},  //11
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28}, //12
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12}, //13
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14}, //14
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16}, //15
];



 const mBossDelayAb = [
    { boss: 'enem1', bossDelayAb: 350, bossDelayAbDop: 5800 },  // перья сыплются, пауза между волнами
	{ boss: 'enem2', bossDelayAb: 280, bossDelayAbDop: 5000 },  // короткие вспышки засад
	{ boss: 'enem3', bossDelayAb: 220, bossDelayAbDop: 6800 },  // стена плотная, длинное окно после
	{ boss: 'enem4', bossDelayAb: 250, bossDelayAbDop: 5200 },  // хаотичный шквал
	{ boss: 'enem5', bossDelayAb: 300, bossDelayAbDop: 4500 },  // стая плотная, мало отдыха
];

// Способности: набор медленных / набор быстрых / микс (медленно+быстро)
  const bossAbilitiesDop = [
    // Филин
    { boss: 'enem1', indexAbilities: [0, 1, 2, 3]},
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5]},
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9]},
	{ boss: 'enem1', indexAbilities: [6, 8, 7, 9]},
	{ boss: 'enem1', indexAbilities: [0, 6, 3, 8]},
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13]},
	{ boss: 'enem1', indexAbilities: [14, 6, 15, 9, 2]},

	// Рысь
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4]},
	{ boss: 'enem2', indexAbilities: [0, 2, 3, 5]},
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9]},
	{ boss: 'enem2', indexAbilities: [6, 8, 7, 9]},
	{ boss: 'enem2', indexAbilities: [0, 6, 3, 8]},
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13]},
	{ boss: 'enem2', indexAbilities: [1, 9, 10, 7, 14]},
	
	// Кабан
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5]},
	{ boss: 'enem3', indexAbilities: [0, 2, 4]},
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9]},
	{ boss: 'enem3', indexAbilities: [6, 8, 7, 9]},
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13]},
	{ boss: 'enem3', indexAbilities: [0, 6, 3, 9]},
	{ boss: 'enem3', indexAbilities: [1, 7, 14, 8, 15]},
	
	// Росомаха
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3]},
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7]},
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11]},
	{ boss: 'enem4', indexAbilities: [8, 10, 9, 11]},
	{ boss: 'enem4', indexAbilities: [0, 8, 1, 11]},
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15]},
	{ boss: 'enem4', indexAbilities: [2, 9, 3, 10, 6]},
	
	// Волколак
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4]},
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8]},
	{ boss: 'enem5', indexAbilities: [5, 7, 6, 8]},
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12]},
	{ boss: 'enem5', indexAbilities: [0, 5, 2, 8]},
	{ boss: 'enem5', indexAbilities: [1, 6, 9, 10, 13]},
	{ boss: 'enem5', indexAbilities: [3, 7, 11, 12, 14, 15]},
	
];
