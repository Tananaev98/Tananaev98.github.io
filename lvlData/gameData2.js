let lvlNumber = 2; 
let countZlat = lvlNumber *5;


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
        baseHP: 2600,                      // Базовое здоровье
        baseSpeed: 0,                  // Относительная скорость (умножается на BASE_SPEED)
        baseDamage: 21,                    // Базовый урон по крепости
        spawnWeight: 5,                   // Вес для рандомного выбора (чем больше, тем чаще)
		baseExp: 250,                      //Опыт за врага 
        size: '25%'                        // Размер изображения на экране
    },
    enem2: {  
        name: 'enem2',
		dispName:  'Груздь',
        image: 'images/enemies/regions/1_smesh_les/lvl2/2.webp',
        baseHP: 4200,
        baseSpeed: 0,
        baseDamage: 31,
        spawnWeight: 15,                  
		baseExp: 400, 
        size: '25%'
    },
    enem3: {  
        name: 'enem3',
		dispName:  'Рыжик',
        image: 'images/enemies/regions/1_smesh_les/lvl2/3.webp',
        baseHP: 21000,
        baseSpeed: 0,
        baseDamage: 41,
        spawnWeight: 20,
		baseExp: 600, 
        size: '25%'                        
    }, 
	
	enem4: {  
        name: 'enem4',
		dispName:  'Подберезовик',
        image: 'images/enemies/regions/1_smesh_les/lvl2/4.webp',
        baseHP: 62000,
        baseSpeed: 0,
        baseDamage: 71,
        spawnWeight: 10,
		baseExp: 800, 
        size: '25%'                        
    },
	
	enem5: {  
        name: 'enem5',
		dispName:  'Лисичка',
        image: 'images/enemies/regions/1_smesh_les/lvl2/5.webp',
        baseHP: 76000,
        baseSpeed: 0,
        baseDamage: 81,
        spawnWeight: 5,
		baseExp: 0, 
        size: '25%'                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;
 
  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)
 //spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
 const bossAbilities = [
    { boss: 'enem1', type: 'enem11', xPos: 10, yPos: 10, customHP: 1, customDamage:  50, customSpeed: 10}, //0
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage:  50, customSpeed: 10}, //1
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 10, customHP: 1, customDamage:  50, customSpeed: 10}, //2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage:  50, customSpeed: 10}, //3
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 10, customHP: 1, customDamage:  50, customSpeed: 10}, //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 10, customHP: 1, customDamage:  50, customSpeed: 10}, //5
	
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 30, customHP: 1, customDamage:  150, customSpeed: 5}, 
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage:  150, customSpeed: 6}, 
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage:  150, customSpeed: 6}, 
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 10, customHP: 1, customDamage:  150, customSpeed: 15}, 
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 20, customHP: 1, customDamage:  150, customSpeed: 3}, 
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 15, customHP: 1, customDamage:  150, customSpeed: 4}, 
	
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 10, customHP: 1, customDamage:  200, customSpeed: 5}, 
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 20, customHP: 1, customDamage:  200, customSpeed: 6}, 
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 10, customHP: 1, customDamage:  200, customSpeed: 6}, 
	{ boss: 'enem3', type: 'enem33', xPos: 73, yPos: 40, customHP: 1, customDamage:  200, customSpeed: 4}, 
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage:  200, customSpeed: 6}, 
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 20, customHP: 1, customDamage:  200, customSpeed: 7}, 
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 30, customHP: 1, customDamage:  200, customSpeed: 8}, 
		
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 11, customHP: 1, customDamage:  250, customSpeed: 3}, 
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 21, customHP: 1, customDamage:  250, customSpeed: 6}, 
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 12, customHP: 1, customDamage:  250, customSpeed: 6}, 
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 42, customHP: 1, customDamage:  250, customSpeed: 4}, 
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 13, customHP: 1, customDamage:  250, customSpeed: 2}, 
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 24, customHP: 1, customDamage:  250, customSpeed: 7}, 
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 35, customHP: 1, customDamage:  250, customSpeed: 8}, 
	
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 9, customHP: 1, customDamage:  300, customSpeed: 5}, 
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 17, customHP: 1, customDamage:  300, customSpeed: 16}, 
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 16, customHP: 1, customDamage:  300, customSpeed: 6}, 
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 31, customHP: 1, customDamage:  300, customSpeed: 4}, 
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 20, customHP: 1, customDamage:  300, customSpeed: 6}, 
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 20, customHP: 1, customDamage:  300, customSpeed: 7}, 
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 35, customHP: 1, customDamage:  300, customSpeed: 8}, 
	
		
];

 const mBossDelayAb = [
    { boss: 'enem1', bossDelayAb: 1000, bossDelayAbDop: 6000 },
	{ boss: 'enem2', bossDelayAb: 100, bossDelayAbDop: 7000},
	{ boss: 'enem3', bossDelayAb: 400, bossDelayAbDop: 5000},
	{ boss: 'enem4', bossDelayAb: 50, bossDelayAbDop: 6500},
	{ boss: 'enem5', bossDelayAb: 150, bossDelayAbDop: 4500},
];


  const bossAbilitiesDop = [
    { boss: 'enem1', indexAbilities: [0, 1, 2]},
	{ boss: 'enem1', indexAbilities: [3, 4, 5]}, 
	{ boss: 'enem1', indexAbilities: [5, 1, 2]}, 
	{ boss: 'enem1', indexAbilities: [3, 1, 1]}, 
	{ boss: 'enem1', indexAbilities: [0, 1, 5]},

	{ boss: 'enem2', indexAbilities: [0, 1, 1, 2]},
	{ boss: 'enem2', indexAbilities: [3, 4, 5]}, 
	{ boss: 'enem2', indexAbilities: [2, 2, 2, 3, 1]}, 
	{ boss: 'enem2', indexAbilities: [4, 2, 1]}, 
	{ boss: 'enem2', indexAbilities: [1, 1, 3]}, 
	
	{ boss: 'enem3', indexAbilities: [4, 4, 1, 2]},
	{ boss: 'enem3', indexAbilities: [0, 3, 6]}, 
	{ boss: 'enem3', indexAbilities: [0, 0, 1, 5, 2]}, 
	{ boss: 'enem3', indexAbilities: [4, 2, 1, 3, 3]}, 
	{ boss: 'enem3', indexAbilities: [1, 1, 3, 4, 5]},
	{ boss: 'enem3', indexAbilities: [1, 1, 3,0]},	
	
	{ boss: 'enem4', indexAbilities: [4, 4, 1, 2]},
	{ boss: 'enem4', indexAbilities: [0, 3, 6]}, 
	{ boss: 'enem4', indexAbilities: [0, 0, 1, 5, 2]}, 
	{ boss: 'enem4', indexAbilities: [4, 2, 1, 3, 3]}, 
	{ boss: 'enem4', indexAbilities: [1, 1, 3, 4, 5]},
	{ boss: 'enem4', indexAbilities: [1, 1, 3,0]},	
	
	{ boss: 'enem5', indexAbilities: [4, 4, 1, 2]},
	{ boss: 'enem5', indexAbilities: [0, 3, 6]}, 
	{ boss: 'enem5', indexAbilities: [0, 0, 1, 5, 2]}, 
	{ boss: 'enem5', indexAbilities: [4, 2, 1, 3, 3]}, 
	{ boss: 'enem5', indexAbilities: [1, 1, 3, 4, 5]},
	{ boss: 'enem5', indexAbilities: [1, 1, 3,0]},	
	
];