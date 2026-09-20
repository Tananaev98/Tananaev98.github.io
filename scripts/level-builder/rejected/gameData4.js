let lvlNumber = 4; 
let factorChar = (lvlNumber*5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.99, damageMultiplier: 1.05, minWaveDelay: 2561, minShotDelay: 176, minTelegraphMs: 529,
	phases: [
		{ phase: 1, minHp: 0.661, cadence: 1.005, speed: 0.945, damage: 1, telegraphMultiplier: 0.999, surpriseChance: 0.07, maxActiveAttacks: 12 },
		{ phase: 2, minHp: 0.311, cadence: 0.875, speed: 1.051, damage: 1.09, telegraphMultiplier: 0.951, surpriseChance: 0.14, maxActiveAttacks: 15 },
		{ phase: 3, minHp: 0, cadence: 0.756, speed: 1.121, damage: 1.17, telegraphMultiplier: 0.895, surpriseChance: 0.22, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { combatIdentity: "Дровосек с тяжёлым топором: щепки летят в одну сторону, потом короткая тишина и удар с другой", combatTrick: "три щепки подряд с одного бока, короткая тишина — и удар с противоположного", signatureEvery: 4, movementStyle: 'pause', cadence: 0.999, telegraphMs: 721, speedMultiplier: 0.799, damageMultiplier: 1.04, speedVariance: [0.8, 0.92, 1.04, 1.16, 1.24] },
		enem2: { combatIdentity: "Грибник с корзиной: тянет игрока к центру тропинки, а потом бьёт с края", combatTrick: "удары ведут игрока к центру тропинки — а следом удар с дальнего края", signatureEvery: 5, movementStyle: 'drift', cadence: 0.951, telegraphMs: 850, speedMultiplier: 0.801, damageMultiplier: 1.02, speedVariance: [0.82, 0.92, 1.02, 1.12, 1.2] },
		enem3: { combatIdentity: "Охотник с ружьём и собакой: собака бросается раньше, чем прилетит выстрел", combatTrick: "выстрел слева появляется первым, но собака справа его обгоняет и прилетает раньше", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.901, telegraphMs: 559, speedMultiplier: 0.799, damageMultiplier: 1.08, speedVariance: [0.92, 1, 1.08, 1.16, 1.22] },
		enem4: { combatIdentity: "Пастух с кнутом и рожком: щелчки неровным ритмом — то часто, то с паузой", combatTrick: "два щелчка подряд, пауза, снова два — игрок привыкает к ритму, а он рвётся", signatureEvery: 4, movementStyle: 'weave', cadence: 1.051, telegraphMs: 559, speedMultiplier: 0.799, damageMultiplier: 1.16, speedVariance: [0.8, 0.88, 0.96, 1.04, 1.12] },
		enem5: { combatIdentity: "Лесник со связкой ключей: удары зеркальными парами — слева и справа почти разом", combatTrick: "слева и тут же зеркально справа, а вторая пара — наоборот: игрок не успевает решить, какой стороне верить", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.849, telegraphMs: 650, speedMultiplier: 0.799, damageMultiplier: 1.14, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26] }
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
 let timeNextBoss = 9;
 const bossInterval = 5;
 
 // Уровень 4 — Самозанятые в чаще
 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые — y≤12.

 const bossAbilities = [
	// ===== Дровосек =====
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 25 h
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 29 h

	// ===== Грибник =====
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 29 h

	// ===== Охотник =====
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 21 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 25 h
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 96, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 28 h

	// ===== Пастух =====
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 34 h

	// ===== Лесник =====
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 32 h

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 234, bossDelayAbDop: 5528, firstWaveDelayMs: 2400 }, // ровные размашистые удары
	{ boss: 'enem2', bossDelayAb: 231, bossDelayAbDop: 6459, firstWaveDelayMs: 2400 }, // неторопливо, у корзины
	{ boss: 'enem3', bossDelayAb: 214, bossDelayAbDop: 4684, firstWaveDelayMs: 2400 }, // выстрелы без передышки
	{ boss: 'enem4', bossDelayAb: 206, bossDelayAbDop: 6647, firstWaveDelayMs: 2400 }, // щелчки неровными очередями
	{ boss: 'enem5', bossDelayAb: 205, bossDelayAbDop: 4596, firstWaveDelayMs: 2328 }, // ключи звенят без остановки
];

 const bossAbilitiesDop = [
	// Дровосек
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "Дважды слева и справа" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5, 6], label: "Трижды справа и слева" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Замах — знакомство: трижды слева и справа" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14], label: "Слева, в центр, справа и слева" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Замах — иной конец: трижды слева, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20], minPhase: 3, label: "Дважды слева, дважды справа и дважды слева" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24], label: "В центр, справа и дважды слева" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29], minPhase: 2, label: "Справа, слева, справа и дважды слева" },

	// Грибник
	{ boss: 'enem2', indexAbilities: [0, 1, 2], label: "Справа и дважды слева" },
	{ boss: 'enem2', indexAbilities: [3, 4, 5, 6], label: "Справа, в центр, справа и слева" },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Тропинка — знакомство: слева, два в центр и справа" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14], label: "Два в центр, справа и слева" },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Тропинка — иной конец: слева, 3 в центр и слева" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], minPhase: 3, label: "Дважды слева, два в центр и дважды справа" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25], label: "Два в центр и дважды слева" },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29], label: "Справа, слева, справа и в центр" },

	// Охотник
	{ boss: 'enem3', indexAbilities: [0, 1, 2], label: "Дважды справа и медленный слева" },
	{ boss: 'enem3', indexAbilities: [3, 4, 5, 6], label: "Трижды справа и медленный слева" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Засада — знакомство: дважды справа, в центр и медленный слева" },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14], label: "Справа, слева, справа и слева" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 15], signature: true, minPhase: 2, label: "Засада — иной конец: дважды справа, в центр, слева и медленный слева" },
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19, 20], minPhase: 3, label: "Трижды справа, дважды слева и медленный слева" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24], label: "В центр, дважды слева и в центр" },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28], minPhase: 2, label: "Слева, трижды справа и в центр" },

	// Пастух
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], label: "Дважды справа и слева" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], label: "Слева, справа и дважды слева" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13], signature: true, minPhase: 1, label: "Кнут — знакомство: 4 раза справа и медленный слева" },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18], label: "Слева, в центр, слева, в центр и справа" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 19], signature: true, minPhase: 2, label: "Кнут — иной конец: 5 раза справа и слева" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], minPhase: 3, label: "Дважды справа, трижды слева и медленный справа" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29], label: "В центр, слева, справа и слева" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], minPhase: 2, label: "Слева, трижды справа и слева" },

	// Лесник
	{ boss: 'enem5', indexAbilities: [0, 1, 2], label: "Слева, в центр и слева" },
	{ boss: 'enem5', indexAbilities: [3, 4, 5, 6, 7], label: "Дважды справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Ключи — знакомство: слева, дважды справа и слева" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16], label: "Дважды справа, дважды слева и в центр" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 17], signature: true, minPhase: 2, label: "Ключи — иной конец: слева, дважды справа, слева и справа" },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22], minPhase: 3, label: "Слева, справа, слева, справа, слева и справа" },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26, 27], label: "В центр, дважды справа и слева" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32], minPhase: 2, label: "Слева, справа, слева и в центр" },

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
