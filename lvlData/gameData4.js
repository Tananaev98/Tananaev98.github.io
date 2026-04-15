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
        size: '10%'                        
    },
	
	enem22: {  
        name: 'enem22',                     
        image: 'images/enemies/regions/1_smesh_les/lvl4/22.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '9%'                        
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
        size: '8%'                       
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
        baseHP: (2600) +(2600*factorChar),                      // Базовое здоровье
        baseSpeed: 0,                  
        baseDamage: (20)+(20)*factorChar,                      
        spawnWeight: 5,                  
		baseExp: 250,                      
        size: '22%'                        
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
		xPos: 30,
        size: '40%'
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
		xPos: 33,		
        size: '35%'                        
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
		xPos: 20,
        size: '60%'                        
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
		xPos: 20,		
        size: '60%'                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;
 
  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)
 //spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
 //Ниже прописаны условные "атаки босса"параметры: 
 //boss атака какого босса? 
 //type какой атака (иконка атаки)? 
 //xpos позиция атаки по x - стартовая точка появления 
 //yPos позиция атаки по y - стартовая точка появления? 
 //customHp - сколько хп у атаки? сможет ли игрок одним ударом ее отбить? 
 //customDamage сколько урона нанесет атака при попадании? 
 //customSpeed с какой скоростью летит атака? 
 const bossAbilities = [
    { boss: 'enem1', type: 'enem11', xPos: 10, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem1.baseDamage, customSpeed: 12}, //0
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem1.baseDamage, customSpeed: 12}, //1
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem1.baseDamage, customSpeed: 12}, //2

	
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 30, customHP: 1, customDamage:  ENEMY_TYPES.enem2.baseDamage, customSpeed: 20}, 
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem2.baseDamage, customSpeed: 6}, 
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage:   ENEMY_TYPES.enem2.baseDamage, customSpeed: 6}, 
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 40, customHP: 1, customDamage:  ENEMY_TYPES.enem2.baseDamage, customSpeed: 15}, 
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 50, customHP: 1, customDamage:  ENEMY_TYPES.enem2.baseDamage, customSpeed: 3}, 
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 15, customHP: 1, customDamage:  ENEMY_TYPES.enem2.baseDamage, customSpeed: 4}, 
	
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem3.baseDamage, customSpeed: 13}, 
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 20, customHP: 1, customDamage:  ENEMY_TYPES.enem3.baseDamage, customSpeed: 14}, 
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem3.baseDamage, customSpeed: 15}, 
	{ boss: 'enem3', type: 'enem33', xPos: 73, yPos: 40, customHP: 1, customDamage:  ENEMY_TYPES.enem3.baseDamage, customSpeed: 16}, 
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem3.baseDamage, customSpeed: 17}, 
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 20, customHP: 1, customDamage:  ENEMY_TYPES.enem3.baseDamage, customSpeed: 18}, 
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 30, customHP: 1, customDamage:  ENEMY_TYPES.enem3.baseDamage, customSpeed: 19}, 
		
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 8, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 3}, 
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 14, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 8}, 
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 20, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 12}, 
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 30, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 14}, 
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 40, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 16}, 
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 18}, 
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 20, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 20}, 
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 30, customHP: 1, customDamage:  ENEMY_TYPES.enem4.baseDamage, customSpeed: 22}, 
	
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 55, customHP: 1, customDamage:   ENEMY_TYPES.enem5.baseDamage, customSpeed: 3}, 
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 55, customHP: 1, customDamage:  ENEMY_TYPES.enem5.baseDamage, customSpeed: 3}, 
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 55, customHP: 1, customDamage:  ENEMY_TYPES.enem5.baseDamage, customSpeed: 3}, 
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 55, customHP: 1, customDamage:  ENEMY_TYPES.enem5.baseDamage, customSpeed: 3}, 
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 20, customHP: 1, customDamage:  ENEMY_TYPES.enem5.baseDamage, customSpeed: 20}, 
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 20, customHP: 1, customDamage:  ENEMY_TYPES.enem5.baseDamage, customSpeed: 25}, 
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 10, customHP: 1, customDamage:  ENEMY_TYPES.enem5.baseDamage, customSpeed: 26}, 	
];



 //Ниже прописаны параметры атак каждого босса: 
 //bossDelayAb: интервал между атаками: когда босс применяет способность с какой задержкой он спавнит атаки?
//bossDelayAbDop: интервал между способностями: какая задержка между применением способностей у босса? (длительность безопасных окон для атаки) 

 const mBossDelayAb = [
    { boss: 'enem1', bossDelayAb: 1000, bossDelayAbDop: 6000 },
	{ boss: 'enem2', bossDelayAb: 500, bossDelayAbDop: 7000},
	{ boss: 'enem3', bossDelayAb: 400, bossDelayAbDop: 5000},
	{ boss: 'enem4', bossDelayAb: 700, bossDelayAbDop: 6500},
	{ boss: 'enem5', bossDelayAb: 400, bossDelayAbDop: 5500},
];

//Ниже перечислены способности босса: способность представляет из себя набор атак босса, ссылки на индексы массива bossAbilities
//например способность { boss: 'enem1', indexAbilities: [0, 1, 2, 5, 5]} 
//при настройках { boss: 'enem1', bossDelayAb: 1000, bossDelayAbDop: 6000 } отработает следующим образом: 
//способности босса выбираются рандомно, допустим что нам выпала эта способность под индексом 0
//когда босс будет использовать эту способность он будет спавнить bossAbilities по индексам [0, 1, 2, 5, 5] указанных в способности { boss: 'enem1', indexAbilities: [0, 1, 2, 5, 5]}
//с задержкой указанной в bossDelayAb
//как только все он заспавнит все атаки с указанной задержкой закончится массив индексов(([0, 1, 2, 5, 5]))
//он перестанет применять способности пока не пройдет время указанное в bossDelayAbDop (безопасное окно для атаки игрока) 
//далее когда время пройдет он снова выберет случайную способность допустим в этот раз выпадет boss: 'enem1', indexAbilities: [0, 1, 5,4,4,4,4,4]
//он снова будет спавнить атаки с интервалом указанным в bossDelayAb до тех пор пока не заспавнит их все
//затем снова уйдет на кд указанное в bossDelayAbDop
// и так по кругу пока игрок не убъет босса
  const bossAbilitiesDop = [
    { boss: 'enem1', indexAbilities: [0, 1, 2]},
	{ boss: 'enem1', indexAbilities: [2, 2, 2]}, 
	{ boss: 'enem1', indexAbilities: [0, 0, 1]}, 
	{ boss: 'enem1', indexAbilities: [0, 1, 1]}, 
	{ boss: 'enem1', indexAbilities: [0, 1, 1, 2, 0, 2]},

	{ boss: 'enem2', indexAbilities: [0, 1, 1, 2]},
	{ boss: 'enem2', indexAbilities: [3, 4, 5]}, 
	{ boss: 'enem2', indexAbilities: [2, 2, 2, 3, 1]}, 
	{ boss: 'enem2', indexAbilities: [4, 2, 1]}, 
	{ boss: 'enem2', indexAbilities: [1, 1, 3,0,0]}, 
	
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
	
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3]},
	{ boss: 'enem5', indexAbilities: [0, 3, 6]}, 
	{ boss: 'enem5', indexAbilities: [0, 0, 1, 5, 2]}, 
	{ boss: 'enem5', indexAbilities: [4, 2, 1, 3, 3]}, 
	{ boss: 'enem5', indexAbilities: [1, 1, 3, 4, 5]},
	{ boss: 'enem5', indexAbilities: [1, 1, 3,0]},	
	
];