let lvlNumber = 3; 
let factorChar = (lvlNumber*5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 1.008, damageMultiplier: 1.03, minWaveDelay: 2601, minShotDelay: 182, minTelegraphMs: 531,
	phases: [
		{ phase: 1, minHp: 0.665, cadence: 1.01, speed: 0.939, damage: 1, telegraphMultiplier: 1.011, surpriseChance: 0.065, maxActiveAttacks: 11 },
		{ phase: 2, minHp: 0.315, cadence: 0.885, speed: 1.04, damage: 1.08, telegraphMultiplier: 0.955, surpriseChance: 0.131, maxActiveAttacks: 15 },
		{ phase: 3, minHp: 0, cadence: 0.766, speed: 1.11, damage: 1.16, telegraphMultiplier: 0.901, surpriseChance: 0.21, maxActiveAttacks: 17 }
	],
	bosses: {
		enem1: { combatIdentity: "Ёж-проводник: выпускает иглы веером с одного бока и вдруг колет с другого", combatTrick: "веер игл с левого бока приучает держать левую сторону — и игла с правого прилетает следом", signatureEvery: 4, movementStyle: 'drift', cadence: 1.001, telegraphMs: 861, speedMultiplier: 0.801, damageMultiplier: 0.96, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] },
		enem2: { combatIdentity: "Гусь-лебедь: шипит с одной стороны, а стая налетает с другой", combatTrick: "одиночный шип слева, а следом стая налетает справа", signatureEvery: 5, movementStyle: 'weave', cadence: 0.931, telegraphMs: 701, speedMultiplier: 0.8, damageMultiplier: 1.01, speedVariance: [0.88, 0.98, 1.07, 1.15, 1.22] },
		enem3: { combatIdentity: "Печка: выстреливает углями всё реже и медленнее — последний уголь самый вялый и запаздывает", combatTrick: "угли идут всё реже и медленнее, и игрок привыкает к замедлению — а последний приходит совсем не там", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.101, telegraphMs: 1051, speedMultiplier: 0.801, damageMultiplier: 1.15, speedVariance: [0.82, 0.91, 1, 1.1, 1.18] },
		enem4: { combatIdentity: "Яблоня: осыпает яблоками полосы между краем и стволом, а самое тяжёлое яблоко падает сбоку", combatTrick: "яблоки падают у ствола, и вдруг тяжёлое яблоко падает с краю, когда игрок стоит у ствола", signatureEvery: 4, movementStyle: 'straight', cadence: 1.001, telegraphMs: 901, speedMultiplier: 0.801, damageMultiplier: 1.06, speedVariance: [0.8, 0.92, 1.05, 1.18, 1.28] },
		enem5: { combatIdentity: "Вязкие волны накатывают парами: два удара с одной стороны почти разом, потом пара с другой", combatTrick: "пара слева, пара справа, а в другой раз вторая пара рвётся: один справа, дальше центр и снова слева", signatureEvery: 3, movementStyle: 'pause', cadence: 0.9, telegraphMs: 800, speedMultiplier: 0.801, damageMultiplier: 1.18, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.16] }
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
        size: '28%',
        deathAnimation: { preset: 'shatterBurst', durationMs: 1050 }                        
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
        size: '35%',
        deathAnimation: { preset: 'ashFade', durationMs: 1200 }
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
        size: '28%',
        deathAnimation: { preset: 'heavySink', durationMs: 1400 }                        
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
        size: '44%',
        deathAnimation: { preset: 'meltDown', durationMs: 1250 }                        
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
        size: '40%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1450 }                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 8;
 
  // Уровень 3 — Гуси-лебеди (сказка)
 // Размеры боссов ≤30%; атаки по краям / снизу; быстрые — сверху.

 const bossAbilities = [
	// ===== Колючий =====
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 27, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 30 h

	// ===== Шипун =====
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 30 h

	// ===== Уф =====
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 2 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 14 e
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 30 h

	// ===== Румяная =====
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 77, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 73, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 27, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 33 h

	// ===== Кисельный берег =====
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 73, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 29 g
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 32 h
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 33 h

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 236, bossDelayAbDop: 4742, firstWaveDelayMs: 2400 }, // колючий ритм без пауз
	{ boss: 'enem2', bossDelayAb: 226, bossDelayAbDop: 6020, firstWaveDelayMs: 2352 }, // налёты короткими волнами
	{ boss: 'enem3', bossDelayAb: 200, bossDelayAbDop: 5123, firstWaveDelayMs: 2400 }, // печь остывает между залпами
	{ boss: 'enem4', bossDelayAb: 215, bossDelayAbDop: 5218, firstWaveDelayMs: 2400 }, // яблоки падают неспешно
	{ boss: 'enem5', bossDelayAb: 216, bossDelayAbDop: 7878, firstWaveDelayMs: 2400 }, // вязкие волны накатывают без остановки
];

 const bossAbilitiesDop = [
	// Колючий
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], label: "Две иглы с разных боков и в центр" },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7], label: "Справа, две слева и снова справа" },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Веер — знакомство: три иглы слева и колющий удар справа" },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15], label: "Справа, слева и снова два справа" },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 16], signature: true, minPhase: 2, label: "Веер — иной конец: после трёх слева укол в центр и вправо" },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], minPhase: 3, label: "Веер слева и веер справа" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25], label: "Слева, справа, слева" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "Иглы вперемешку и последняя в центр" },

	// Шипун
	{ boss: 'enem2', indexAbilities: [0, 1, 2], label: "Шип слева и налёт справа" },
	{ boss: 'enem2', indexAbilities: [3, 4, 5, 6], label: "Справа и стая слева" },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Стая — знакомство: шип слева и три налёта справа" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14], label: "Из центра вправо, влево и в центр" },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 15], signature: true, minPhase: 2, label: "Стая — иной конец: после трёх справа стая уходит налево" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], minPhase: 3, label: "Налёты то справа, то слева" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25], label: "Слева, в центр и справа" },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "Два справа, два слева и снова справа" },

	// Уф
	{ boss: 'enem3', indexAbilities: [0, 1], label: "Два угля: справа и слева" },
	{ boss: 'enem3', indexAbilities: [2, 3, 4, 5], label: "Угли остывают: центр, центр, слева, справа" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9], signature: true, minPhase: 1, label: "Остывание — знакомство: три остывающих угля и самый вялый слева последним" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13], label: "Справа, центр, слева и центр" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 14, 15], signature: true, minPhase: 2, label: "Остывание — иной конец: после трёх углей ещё два, слева и справа" },
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19, 20, 21], minPhase: 3, label: "Шесть углей, каждый чуть медленнее прежнего" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25], label: "Центр, слева, центр и справа" },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "Слева, центр, справа, центр и снова слева" },

	// Румяная
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], label: "Три яблока у ствола" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], label: "С края и от ствола вперемешку" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Падение — знакомство: три яблока у ствола и тяжёлое справа с краю" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16], label: "Яблоки у ствола, справа и слева вперемешку" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 17, 18], signature: true, minPhase: 2, label: "Падение — иной конец: тяжёлого нет, яблоки уходят налево и направо" },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 24], minPhase: 3, label: "Полный сбор яблок, тяжёлое справа падает последним" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28], label: "Два слева и два у ствола" },
	{ boss: 'enem4', indexAbilities: [29, 30, 31, 32, 33], minPhase: 2, label: "У ствола, справа, слева и снова справа" },

	// Кисельный берег
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], label: "Пара слева" },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7], label: "Пара справа, пара слева" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Волна — знакомство: пара слева и пара справа" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16], label: "Две пары и удар в центр" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 17, 18], signature: true, minPhase: 2, label: "Волна — иной конец: после пары слева и одного справа — центр и снова слева" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24], minPhase: 3, label: "Три пары: справа, слева, справа" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28, 29], label: "Центр, пара справа и слева" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33], minPhase: 2, label: "Пара слева, центр и справа" },

];

// Лорные названия связок (см. принцип в lvlData/gameData1.js). Уровень 3: Колючий (ёж,
// иглы), Шипун (гусь-лебедь, шипение и крылья — НЕ змей, см. картинку), Уф (огненное
// существо, жар/дым), Румяная (наливное яблочко из сказки), Кисельный берег (вязкая
// кисельная топь).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Колкий удар', variant2: 'Ядовитая игла', variant3: 'Игольчатая мощь',
        variant4: 'Колючий панцирь', variant5: 'Меткий бросок игл', variant6: 'Едкий укол',
        variant7: 'Игольчатая сила', variant8: 'Частокол игл', variant9: 'Стремительный бросок',
        variant10: 'Живучие иглы', variant11: 'Цепкие шипы', variant12: 'Укол и в кусты',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый ёж', variant15: 'Пружинистый клубок',
        variant16: 'Меткая игла', variant17: 'Колючая хватка', variant18: 'Верный бросок',
        variant19: 'Мгновенный залп игл', variant20: 'Колючий нюх', variant21: 'Стойкие шипы',
        variant22: 'Юркий клубок', variant23: 'Игольчатая стойкость', variant24: 'Чуткие шипы',
        variant25: 'Ускользающий клубок', variant26: 'Дикий частокол', variant27: 'Едкая игла',
        variant28: 'Внезапный залп', variant29: 'Каменный панцирь', variant30: 'Разросшиеся шипы',
        variant31: 'Колючий рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимые иглы',
        variant34: 'Колючая прыть', variant35: 'Игольчатая выносливость'
    },
    enem2: {
        variant1: 'Клювенный удар', variant2: 'Шипящий выпад', variant3: 'Крылатая сила',
        variant4: 'Перьевая броня', variant5: 'Хлёсткий взмах крыла', variant6: 'Едкий пух',
        variant7: 'Крылатая мощь', variant8: 'Плотное перо', variant9: 'Стремительный взмах',
        variant10: 'Живучая шея', variant11: 'Цепкий клюв', variant12: 'Щипок и наутёк',
        variant13: 'Толстое оперение', variant14: 'Неутомимое шипение', variant15: 'Изгибающаяся шея',
        variant16: 'Меткий клевок', variant17: 'Гусиная хватка', variant18: 'Холодный птичий взгляд',
        variant19: 'Мгновенный выпад шеи', variant20: 'Гусиный клёкот', variant21: 'Стойкое оперение',
        variant22: 'Юркий гусь-лебедь', variant23: 'Крылатая стойкость', variant24: 'Чуткий клюв',
        variant25: 'Ускользающий след крыла', variant26: 'Дикое шипение', variant27: 'Едкая мощь пуха',
        variant28: 'Внезапный удар крылом', variant29: 'Каменное перо', variant30: 'Разросшийся размах крыльев',
        variant31: 'Крылатый рывок', variant32: 'Живучее перо', variant33: 'Неутомимый взмах',
        variant34: 'Крылатая прыть', variant35: 'Крылатая выносливость'
    },
    enem3: {
        variant1: 'Печной удар', variant2: 'Огненный плевок из топки', variant3: 'Кирпичная сила',
        variant4: 'Кладка-броня', variant5: 'Жаркий рывок', variant6: 'Едкая зола',
        variant7: 'Печная мощь', variant8: 'Прочная кладка', variant9: 'Короткий огненный плевок',
        variant10: 'Живучая труба', variant11: 'Цепкая заслонка', variant12: 'Плевок и в золу',
        variant13: 'Толстая кладка', variant14: 'Неутомимая топка', variant15: 'Заслонка пружинит',
        variant16: 'Меткий уголёк', variant17: 'Печная хватка', variant18: 'Немигающий взгляд из топки',
        variant19: 'Огненный плевок вмиг', variant20: 'Печной дух', variant21: 'Кладка стойкая',
        variant22: 'Юркая вопреки весу', variant23: 'Печная стойкость', variant24: 'Чуткая заслонка',
        variant25: 'Ускользающий жар', variant26: 'Дикий жар из топки', variant27: 'Мощь золы',
        variant28: 'Огненный плевок внезапно', variant29: 'Каменная кладка', variant30: 'Труба разрослась',
        variant31: 'Печной рывок', variant32: 'Живучая кладка', variant33: 'Неутомимый жар',
        variant34: 'Печная прыть', variant35: 'Печная выносливость'
    },
    enem4: {
        variant1: 'Ветвяной удар', variant2: 'Кислый укус', variant3: 'Древесная сила',
        variant4: 'Крепкая кора', variant5: 'Бросок яблок', variant6: 'Терпкий сок',
        variant7: 'Древесная мощь', variant8: 'Плотная кора', variant9: 'Короткий бросок яблок',
        variant10: 'Живучие корни', variant11: 'Цепкая ветвь', variant12: 'Бросок и в листву',
        variant13: 'Толстая кора', variant14: 'Неутомимый сад', variant15: 'Ветвь пружинит',
        variant16: 'Меткое яблочко', variant17: 'Ветвяная хватка', variant18: 'Немигающий взгляд из кроны',
        variant19: 'Мгновенное падение яблока', variant20: 'Садовый дух', variant21: 'Кора стойкая',
        variant22: 'Юркая вопреки корням', variant23: 'Древесная стойкость', variant24: 'Чуткий черенок',
        variant25: 'Ускользающий румянец', variant26: 'Дикая кислинка', variant27: 'Терпкая мощь',
        variant28: 'Внезапное падение яблока', variant29: 'Каменное яблоко', variant30: 'Крона разрослась',
        variant31: 'Ветвяной рывок', variant32: 'Живучая кора', variant33: 'Неутомимые корни',
        variant34: 'Румяная прыть', variant35: 'Наливная выносливость'
    },
    enem5: {
        variant1: 'Вязкий удар', variant2: 'Липкий плевок', variant3: 'Кисельная мощь',
        variant4: 'Густая броня', variant5: 'Скользкий рывок', variant6: 'Едкий кисель',
        variant7: 'Кисельная сила', variant8: 'Загустевшая шкура', variant9: 'Растекающийся рывок',
        variant10: 'Живучий кисель', variant11: 'Цепкая тина', variant12: 'Плевок и в трясину',
        variant13: 'Плотная тина', variant14: 'Неутомимое течение', variant15: 'Волнистый берег',
        variant16: 'Меткая капля киселя', variant17: 'Кисельная хватка', variant18: 'Верный разлив',
        variant19: 'Мгновенный всплеск', variant20: 'Болотный дух', variant21: 'Стойкая трясина',
        variant22: 'Юркая волна', variant23: 'Кисельная стойкость', variant24: 'Чуткая рябь',
        variant25: 'Ускользающий берег', variant26: 'Дикое течение', variant27: 'Едкая тина',
        variant28: 'Внезапный разлив', variant29: 'Каменный кисель', variant30: 'Разлившаяся мощь',
        variant31: 'Кисельный рывок', variant32: 'Живучая тина', variant33: 'Неутомимый берег',
        variant34: 'Кисельная прыть', variant35: 'Кисельная выносливость'
    }
};
