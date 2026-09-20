let lvlNumber = 2; 
let factorChar = (lvlNumber*5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 1.025, damageMultiplier: 1.02, minWaveDelay: 2640, minShotDelay: 179, minTelegraphMs: 519,
	phases: [
		{ phase: 1, minHp: 0.67, cadence: 1.015, speed: 0.935, damage: 1, telegraphMultiplier: 1.021, surpriseChance: 0.061, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.321, cadence: 0.895, speed: 1.031, damage: 1.08, telegraphMultiplier: 0.966, surpriseChance: 0.121, maxActiveAttacks: 14 },
		{ phase: 3, minHp: 0, cadence: 0.77, speed: 1.101, damage: 1.15, telegraphMultiplier: 0.905, surpriseChance: 0.201, maxActiveAttacks: 16 }
	],
	bosses: {
		enem1: { combatIdentity: "Толстоногий гриб: бьёт столбом в одну и ту же полосу, а потом резко перескакивает на другой край", combatTrick: "три удара подряд в правую полосу приучают стоять справа — и тут же удар слева", signatureEvery: 4, movementStyle: 'straight', cadence: 0.97, telegraphMs: 901, speedMultiplier: 0.881, damageMultiplier: 0.95, speedVariance: [0.82, 0.9, 0.98, 1.06, 1.14] },
		enem2: { combatIdentity: "Грузный белый гриб: растекается поясом по полю — слева, через центр, и дальше либо вправо, либо обратно", combatTrick: "пояс идёт слева через центр, а вместо правого края капли вдруг сыплются обратно слева", signatureEvery: 5, movementStyle: 'weave', cadence: 1.051, telegraphMs: 890, speedMultiplier: 0.86, damageMultiplier: 1, speedVariance: [0.88, 0.97, 1.05, 1.13, 1.2] },
		enem3: { combatIdentity: "Рыжий гриб с кругами: удары расходятся кругами и возвращаются — пара слева-справа и та же пара сразу за ней", combatTrick: "пара ударов слева и справа, и та же пара следом — эхо, которое в другой раз обрывается ударом в центр", signatureEvery: 4, movementStyle: 'drift', cadence: 1.001, telegraphMs: 700, speedMultiplier: 0.839, damageMultiplier: 1.08, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.22] },
		enem4: { combatIdentity: "Длинноногий гриб: шагает от края к краю и возвращается, а на последнем шаге роняет тяжёлую шляпку", combatTrick: "шаги от края к краю, а последняя тяжёлая шляпка падает с опозданием, когда игрок уже переключился", signatureEvery: 4, movementStyle: 'pause', cadence: 0.93, telegraphMs: 561, speedMultiplier: 0.8, damageMultiplier: 1.04, speedVariance: [0.9, 1, 1.1, 1.18, 1.24] },
		enem5: { combatIdentity: "Золотистая лисичка: два хода, которые обгоняют друг друга — тихие тяжёлые слева, быстрые справа", combatTrick: "две медленные угрозы слева появляются первыми, но быстрые справа их обгоняют", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.881, telegraphMs: 840, speedMultiplier: 0.8, damageMultiplier: 1.12, speedVariance: [0.8, 0.92, 1.04, 1.16, 1.26] }
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
 let timeNextBoss = 8;
 const bossInterval = 7;
 
  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)
 //spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
 // Уровень 2 — грибное семейство (не клон L1)
 // Атаки по краям / ниже босса; быстрые — сверху.

 const bossAbilities = [
	// ===== Боровик: ПЕНЁК =====
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 2 b
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 5 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 15 f
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 25 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 29 h

	// ===== Груздь: МОЛОЧНЫЙ ПОЯС =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 30 h
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 31 h

	// ===== Рыжик: КРУГИ =====
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 2 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 5 c
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 9 d
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 13 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 14 f
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 15 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 19 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 20 g
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 21 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 23 h
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 24 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 25 h
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 27 h

	// ===== Подберезовик: ШАГИ =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 15 e
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 16 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 30 h

	// ===== Лисичка: ОБГОН =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 2 b
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 6 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, // 16 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 26 h
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 30 h

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 235, bossDelayAbDop: 6010, firstWaveDelayMs: 2400 }, // ровно, без спешки
	{ boss: 'enem2', bossDelayAb: 234, bossDelayAbDop: 5286, firstWaveDelayMs: 2400 }, // вязкий, тяжёлый ритм
	{ boss: 'enem3', bossDelayAb: 215, bossDelayAbDop: 5230, firstWaveDelayMs: 2400 }, // круги идут без долгой тишины
	{ boss: 'enem4', bossDelayAb: 205, bossDelayAbDop: 4946, firstWaveDelayMs: 2400 }, // шагает без остановки
	{ boss: 'enem5', bossDelayAb: 215, bossDelayAbDop: 3990, firstWaveDelayMs: 2328 }, // лисичка не даёт отдышаться
];

 const bossAbilitiesDop = [
	// Боровик: ПЕНЁК
	{ boss: 'enem1', indexAbilities: [0, 1], label: "Скачок с правого края на левый" },
	{ boss: 'enem1', indexAbilities: [2, 3, 4], label: "Два слева и один справа" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8], signature: true, minPhase: 1, label: "Пенёк — знакомство: три удара в правую полосу и резкий перескок на левый край" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12], label: "Слева, справа и два слева" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 13, 14], signature: true, minPhase: 2, label: "Пенёк — иной конец: после трёх справа удар в центр и перескок налево" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19, 20], minPhase: 3, label: "Два справа, три слева и тяжёлая шляпка справа последней" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24], label: "Слева, в центр и справа" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29], minPhase: 2, label: "Две в правую, две в левую и снова вправо" },

	// Груздь: МОЛОЧНЫЙ ПОЯС
	{ boss: 'enem2', indexAbilities: [0, 1, 2], label: "Две капли молока" },
	{ boss: 'enem2', indexAbilities: [3, 4, 5, 6, 7], label: "Слева, через центр и вправо" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11, 12], signature: true, minPhase: 1, label: "Молочный пояс — знакомство: слева, центр, справа" },
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 16], label: "Справа, центр, снова справа и налево" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 17], signature: true, minPhase: 2, label: "Молочный пояс — иной конец: пояс обрывается в центре, капли сыплются слева" },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22], minPhase: 3, label: "Капли вперемешку справа и слева" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26], label: "Из центра налево, направо и обратно" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30, 31], minPhase: 2, label: "Два слева, два справа и центр" },

	// Рыжик: КРУГИ
	{ boss: 'enem3', indexAbilities: [0, 1], label: "Круг слева и справа" },
	{ boss: 'enem3', indexAbilities: [2, 3, 4], label: "Слева и два справа" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8], signature: true, minPhase: 1, label: "Круги — знакомство: пара слева-справа и та же пара следом" },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12], label: "Эхо, начатое справа" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 13], signature: true, minPhase: 2, label: "Круги — иной конец: после трёх ударов эхо уходит в центр" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18], minPhase: 3, label: "Два слева, два справа, потом слева и справа" },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], label: "Центр, справа, слева и снова центр" },
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26, 27], minPhase: 2, label: "Кольцо: слева, справа, слева, справа и в центр" },

	// Подберезовик: ШАГИ
	{ boss: 'enem4', indexAbilities: [0, 1, 2], label: "Три шага: слева, справа, слева" },
	{ boss: 'enem4', indexAbilities: [3, 4, 5, 6], label: "Шаг вправо, потом два влево и вправо" },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Шаги — знакомство: слева, справа, снова справа и влево, тяжёлая шляпка справа" },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14], label: "Справа, слева, в центр и снова вправо" },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Шаги — иной конец: шляпки нет, шаг возвращается влево" },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], minPhase: 3, label: "Три пары шагов, тяжёлая шляпка слева опаздывает" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25], label: "Слева, в центр, справа и обратно в центр" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "Справа, два слева, справа и снова слева" },

	// Лисичка: ОБГОН
	{ boss: 'enem5', indexAbilities: [0, 1], label: "Ход и ответ" },
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5], label: "Два тяжёлых слева и два быстрых справа" },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10], signature: true, minPhase: 1, label: "Обгон — знакомство: два тяжёлых слева, три быстрых справа обгоняют их" },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14], label: "Справа, слева, два справа" },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Обгон — иной конец: после обгона ещё один удар в центр" },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21], minPhase: 3, label: "Тяжёлая слева появляется первой, а прилетает последней" },
	{ boss: 'enem5', indexAbilities: [22, 23, 24, 25], label: "Центр, справа, слева, справа" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "Ходы вперемешку слева и справа" },

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
