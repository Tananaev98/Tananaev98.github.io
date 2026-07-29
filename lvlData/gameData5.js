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

        size: '6%'                        

    },

	

	enem22: {  

        name: 'enem22',                     

        image: 'images/enemies/regions/1_smesh_les/lvl5/22.webp',  

        baseHP: 100,                      

        baseSpeed: 0.020,                  

        baseDamage: 20,                    

        spawnWeight: 5,                  

		baseExp: 0,                      

        size: '6%'                        

    },

	

	enem33: {  

        name: 'enem33',                     

        image: 'images/enemies/regions/1_smesh_les/lvl5/33.webp',  

        baseHP: 100,                      

        baseSpeed: 0.020,                 

        baseDamage: 20,                    

        spawnWeight: 5,                  

		baseExp: 0,                     

        size: '6%'                        

    },

	

	enem44: {  

        name: 'enem44',                     

        image: 'images/enemies/regions/1_smesh_les/lvl5/44.webp',  

        baseHP: 100,                      

        baseSpeed: 0.020,                 

        baseDamage: 20,                    

        spawnWeight: 5,                  

		baseExp: 0,                       

        size: '6%'                       

    },

	

	enem55: {  

        name: 'enem55',                     

        image: 'images/enemies/regions/1_smesh_les/lvl5/55.webp',  

        baseHP: 100,                      

        baseSpeed: 0.020,                 

        baseDamage: 20,                    

        spawnWeight: 5,                  

		baseExp: 0,                      

        size: '6%'                       

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

// Уровень 5 — Ночная смена
// Атаки по краям / ниже босса; быстрые — сверху. Один архетип на босса.

const bossAbilities = [
	// ===== УУ-х (филин): TOP_FEATHER — перья сверху доминируют =====
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 28 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //15

	// ===== Мурка: BOTTOM_CROUCH — засада снизу слева + прыжок справа сверху =====
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 28 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //15

	// ===== Секач: BOTTOM_WALL — таран-стена снизу (единственная на уровне) + клин =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //15

	// ===== Царапка: LEFT_SCRATCH — когти густо слева =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //15

	// ===== Волчок: CONVERGE_FLANKS — стая сходится с флангов, без стены =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //7
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //15
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 320, bossDelayAbDop: 5600 },
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 5000 },
	{ boss: 'enem3', bossDelayAb: 220, bossDelayAbDop: 6800 },
	{ boss: 'enem4', bossDelayAb: 240, bossDelayAbDop: 5200 },
	{ boss: 'enem5', bossDelayAb: 280, bossDelayAbDop: 4800 },
];

const bossAbilitiesDop = [
	// УУ-х
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11] },
	{ boss: 'enem1', indexAbilities: [6, 8, 10, 7, 9, 11] },
	{ boss: 'enem1', indexAbilities: [0, 6, 2, 9] },
	{ boss: 'enem1', indexAbilities: [4, 5, 14, 15] },
	{ boss: 'enem1', indexAbilities: [12, 14, 13, 15, 4] },

	// Мурка
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8, 9] },
	{ boss: 'enem2', indexAbilities: [7, 9, 8, 11] },
	{ boss: 'enem2', indexAbilities: [1, 7, 10, 11] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 5] },

	// Секач
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 6, 8] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem3', indexAbilities: [2, 10, 9, 11] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] },

	// Царапка
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [8, 10, 12, 9, 11] },
	{ boss: 'enem4', indexAbilities: [1, 8, 5, 12] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 11, 3] },

	// Волчок
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem5', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [8, 10, 12, 9, 11] },
	{ boss: 'enem5', indexAbilities: [2, 8, 3, 10] },
	{ boss: 'enem5', indexAbilities: [13, 12, 14, 15, 6] },
];
