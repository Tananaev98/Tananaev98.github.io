let lvlNumber = 1; 

// Полный профиль боя уровня: движок только исполняет эти настройки.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 1.043, damageMultiplier: 1, minWaveDelay: 2685, minShotDelay: 181, minTelegraphMs: 521,
	phases: [
		{ phase: 1, minHp: 0.681, cadence: 1.02, speed: 0.93, damage: 1, telegraphMultiplier: 1.03, surpriseChance: 0.055, maxActiveAttacks: 10, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.331, cadence: 0.902, speed: 1.02, damage: 1.07, telegraphMultiplier: 0.971, surpriseChance: 0.11, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0, cadence: 0.78, speed: 1.09, damage: 1.14, telegraphMultiplier: 0.91, surpriseChance: 0.191, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { combatIdentity: "Заяц-беглец: быстрые скачки с фланга на фланг, а слева висит медленное ухо", combatTrick: "пока игрок отбивает быстрые лапы справа, ухо слева, появившееся первым, прилетает последним", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.031, telegraphMs: 931, speedMultiplier: 0.89, damageMultiplier: 0.92, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] },
		enem2: { combatIdentity: "Волк из стаи: ровный, размеренный напор средними клыками, центр закрыт заранее", combatTrick: "тихий удар в нижний центр появляется первым, но прилетает последним, пока игрок занят флангами", signatureEvery: 5, movementStyle: 'straight', cadence: 1.001, telegraphMs: 870, speedMultiplier: 0.92, damageMultiplier: 0.97, speedVariance: [0.9, 0.96, 1.02, 1.08, 1.14] },
		enem3: { combatIdentity: "Медведь: стена тяжёлых лап, которые падают с обоих флангов почти разом", combatTrick: "тяжёлые лапы летят долго, но падают пачкой с обоих боков — успеть погасить все на подлёте не даёт ширина поля", signatureEvery: 4, movementStyle: 'pause', cadence: 1.161, telegraphMs: 1075, speedMultiplier: 0.841, damageMultiplier: 1.18, speedVariance: [0.8, 0.86, 0.93, 1, 1.08] },
		enem4: { combatIdentity: "Лиса: быстрые укусы серией, тянет игрока за хвостом в одну сторону, а кусает с другой", combatTrick: "серия быстрых укусов идёт слева, последний тяжёлый — справа", signatureEvery: 4, movementStyle: 'drift', cadence: 0.92, telegraphMs: 560, speedMultiplier: 0.79, damageMultiplier: 1.02, speedVariance: [0.88, 0.98, 1.08, 1.16, 1.22] },
		enem5: { combatIdentity: "Колобок: катится по краям поля не спеша, но каждый оборот чаще", combatTrick: "слева, слева, справа, справа — интервалы сокращаются, и игрок не успевает перестроиться", signatureEvery: 3, movementStyle: 'weave', cadence: 0.851, telegraphMs: 790, speedMultiplier: 0.79, damageMultiplier: 1.1, speedVariance: [0.86, 0.94, 1.03, 1.12, 1.2] }
	}
};

const ENEMY_TYPES = {
	
	enem11: {  
        name: 'enem11',                     
        image: 'images/enemies/regions/1_smesh_les/lvl1/11.webp',  
        baseHP: 100,                     
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '6%'                        
    },
	
	enem22: {  
        name: 'enem22',                     
        image: 'images/enemies/regions/1_smesh_les/lvl1/22.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                  
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                        
    },
	
	enem33: {  
        name: 'enem33',                     
        image: 'images/enemies/regions/1_smesh_les/lvl1/33.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                     
        size: '6%'                        
    },
	
	enem44: {  
        name: 'enem44',                     
        image: 'images/enemies/regions/1_smesh_les/lvl1/44.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                       
        size: '6%'                       
    },
	
	enem55: {  
        name: 'enem55',                     
        image: 'images/enemies/regions/1_smesh_les/lvl1/55.webp',  
        baseHP: 100,                      
        baseSpeed: 0.020,                 
        baseDamage: 20,                    
        spawnWeight: 5,                  
		baseExp: 0,                      
        size: '6%'                       
    },
	
    enem1: {  
        name: 'enem1',                   
		dispName:  'Побегайчик',
        image: 'images/enemies/regions/1_smesh_les/lvl1/1.webp',  
        baseHP: 2500,                      
        baseSpeed: 0,                  
        baseDamage: 20,                    
        spawnWeight: 5,                   
		baseExp: 250,                      
        size: '25%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1100 }                        
    },
    enem2: {  
        name: 'enem2',
		dispName:  'Любитель бочков',
        image: 'images/enemies/regions/1_smesh_les/lvl1/2.webp',
        baseHP: 15000,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,                  
		baseExp: 400, 
        size: '25%',
        deathAnimation: { preset: 'packBurst', durationMs: 1000 }
    },
    enem3: {  
        name: 'enem3',
		dispName:  'Косолапый',
        image: 'images/enemies/regions/1_smesh_les/lvl1/3.webp',
        baseHP: 20000,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600, 
        size: '25%',
        deathAnimation: { preset: 'heavySink', durationMs: 1400 }                        
    }, 
	
	enem4: {  
        name: 'enem4',
		dispName:  'Сестричка',
        image: 'images/enemies/regions/1_smesh_les/lvl1/4.webp',
        baseHP: 60000,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800, 
        size: '25%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }                        
    },
	
	enem5: {  
        name: 'enem5',
		dispName:  'Колобок',
        image: 'images/enemies/regions/1_smesh_les/lvl1/5.webp',
        baseHP: 75000,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0, 
        size: '25%',
        deathAnimation: { preset: 'rollOff', durationMs: 1300 }                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 6;
 const bossInterval = 7;
 
  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)
 //spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
 
 
 
 // Уровень 1 — звери и Колобок
 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые (speed≥16) — y≤12.
 // У каждого босса свой архетип под образ.

 const bossAbilities = [
	// ===== Побегайчик: УШИ =====
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 2 b
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, // 5 c
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 74, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 14 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 15 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 23 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 24 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 25 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 27 h

	// ===== Любитель бочков: ЗАГОН =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 2 b
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 }, // 5 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 }, // 15 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 20 g
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 23 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 24 h
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 25 h
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 27 i
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 28 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 29 i
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 30 i

	// ===== Косолапый: ДВОЙНАЯ ЛАПА =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 2 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 14 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, // 15 f
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 21 g
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 24 h
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 25 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, // 27 h

	// ===== Сестричка: ЛОЖНЫЙ СЛЕД =====
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 17 f
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 29 h

	// ===== Колобок: КРУГ =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 2 b
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 16 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 }, // 17 f
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 22 g
	{ boss: 'enem5', type: 'enem55', xPos: 74, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 26 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, // 30 h

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 291, bossDelayAbDop: 4700, firstWaveDelayMs: 2256 }, // скачет часто, короткими заходами
	{ boss: 'enem2', bossDelayAb: 330, bossDelayAbDop: 5101, firstWaveDelayMs: 2400 }, // стая давит ритмом
	{ boss: 'enem3', bossDelayAb: 281, bossDelayAbDop: 5799, firstWaveDelayMs: 2400 }, // тяжёлые заходы, но без долгой тишины
	{ boss: 'enem4', bossDelayAb: 261, bossDelayAbDop: 4501, firstWaveDelayMs: 2160 }, // хитрая вспышка коротких заходов
	{ boss: 'enem5', bossDelayAb: 244, bossDelayAbDop: 4301, firstWaveDelayMs: 2064 }, // катится без остановки
];

 const bossAbilitiesDop = [
	// Побегайчик: УШИ
	{ boss: 'enem1', indexAbilities: [0, 1], label: "Слева и справа" },
	{ boss: 'enem1', indexAbilities: [2, 3, 4], label: "Слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8], signature: true, minPhase: 1, label: "Уши — знакомство: трижды справа и медленный слева" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12], label: "Справа, дважды слева и справа" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 13], signature: true, minPhase: 2, label: "Уши — иной конец: трижды справа, медленный слева и в центр" },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17, 18, 19], minPhase: 3, label: "4 раза слева, медленный справа и слева" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22], label: "Справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27], minPhase: 2, label: "Трижды слева и дважды справа" },

	// Любитель бочков: ЗАГОН
	{ boss: 'enem2', indexAbilities: [0, 1], label: "Слева и справа" },
	{ boss: 'enem2', indexAbilities: [2, 3, 4], label: "Дважды слева и справа" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], signature: true, minPhase: 1, label: "Загон — знакомство: дважды слева, справа, медленный в центр и справа" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13], minPhase: 2, label: "Слева, справа, слева и медленный справа" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9, 14], signature: true, minPhase: 2, label: "Загон — иной конец: дважды слева, справа, в центр, медленный в центр и справа" },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18, 19], minPhase: 3, label: "Дважды справа, слева, медленный в центр и слева" },
	{ boss: 'enem2', indexAbilities: [20, 21, 22], label: "Дважды справа и слева" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26], label: "Дважды слева, справа и в центр" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30], label: "Дважды справа, слева и в центр" },

	// Косолапый: ДВОЙНАЯ ЛАПА
	{ boss: 'enem3', indexAbilities: [0, 1], label: "Слева и справа" },
	{ boss: 'enem3', indexAbilities: [2, 3, 4, 5], label: "В центр, справа, медленный слева и медленный справа" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9], signature: true, minPhase: 1, label: "Двойная лапа — знакомство: дважды слева, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13], label: "Справа, слева, в центр и справа" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 14], signature: true, minPhase: 2, label: "Двойная лапа — иной конец: дважды слева, медленный справа и дважды слева" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19, 20], minPhase: 3, label: "Слева, дважды справа, медленный слева, медленный справа и медленный слева" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23], label: "В центр, справа и слева" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27], minPhase: 2, label: "Слева, справа, в центр и слева" },

	// Сестричка: ЛОЖНЫЙ СЛЕД
	{ boss: 'enem4', indexAbilities: [0, 1, 2], label: "Справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [3, 4, 5, 6], label: "Дважды справа и дважды слева" },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 11], signature: true, minPhase: 1, label: "Ложный след — знакомство: 4 раза слева и медленный справа" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15], label: "Дважды слева и дважды справа" },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 16], signature: true, minPhase: 2, label: "Ложный след — иной конец: трижды слева, в центр и медленный справа" },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21, 22], minPhase: 3, label: "5 раза слева и справа" },
	{ boss: 'enem4', indexAbilities: [23, 24, 25], label: "В центр, слева и справа" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29], minPhase: 2, label: "Трижды справа и слева" },

	// Колобок: КРУГ
	{ boss: 'enem5', indexAbilities: [0, 1], label: "Слева и справа" },
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5, 6], label: "Слева, дважды справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Круг — знакомство: слева, справа, медленный слева и медленный в центр" },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14], label: "Дважды справа, в центр и медленный слева" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 15], signature: true, minPhase: 2, label: "Круг — иной конец: слева, справа, медленный слева и в центр" },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21], minPhase: 3, label: "Слева, в центр, справа, медленный слева, медленный справа и медленный слева" },
	{ boss: 'enem5', indexAbilities: [22, 23, 24, 25], label: "Дважды справа, слева и справа" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "Слева, дважды справа и медленный слева" },

];

// Лорные названия связок временных улучшений (см. UPGRADE_VARIANTS/
// getUpgradeVariantDisplayName в game.js) — «игрок забирает часть силы побеждённого
// босса», поэтому названия это свойства/черты, а не предметы. variantN — стабильный id
// из движка (порядок комбинаторного перебора статов: damage, critChance, critMultiplier,
// woundChance, heroHP, heroDefense, fireRate — i<j<k). Без записи движок сам соберёт
// имя из статов (generic-фолбэк). Ниже — полностью авторский список на каждого из 5
// боссов по отдельности (не общий трейт-список с падежом — по решению пользователя
// шаблонность между боссами запрещена: «Ловкость волколака» и «Ловкость колобка» из
// одного трейта — плохо, у каждого босса свой словарь и свой стиль шутки).
const UPGRADE_VARIANT_NAMES = {
    // Побегайчик — заяц: уши, лапки, трусливая-но-быстрая повадка, «заячье сердце».
    enem1: {
        variant1: 'Заячий кураж', variant2: 'Кроличий укус', variant3: 'Стальные лапки',
        variant4: 'Броня из пуха', variant5: 'Меткий подскок', variant6: 'Бешеный укус',
        variant7: 'Заячье сердце', variant8: 'Крепкая шкурка', variant9: 'Ударный рывок',
        variant10: 'Живучий кусака', variant11: 'Колючий пух', variant12: 'Кусь и бежать',
        variant13: 'Толстые пятки', variant14: 'Неутомимый прыг', variant15: 'Пружинистый скок',
        variant16: 'Острый глаз, острый зуб', variant17: 'Заячья удача', variant18: 'Верный прицел',
        variant19: 'Молниеносный укус', variant20: 'Живучий нюх', variant21: 'Цепкая хватка',
        variant22: 'Юркий укус', variant23: 'Заячья стойкость', variant24: 'Длинные уши, зоркий глаз',
        variant25: 'Ускользающий взгляд', variant26: 'Дикий норов', variant27: 'Стойкий укус',
        variant28: 'Укусил и в кусты', variant29: 'Крепкий заяц', variant30: 'Скачущая мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая шкурка', variant33: 'Юркий и цепкий',
        variant34: 'Заячья прыть', variant35: 'Быстрые лапки, крепкая спинка'
    },
    // Любитель бочков — волк из стаи: клыки, погоня, бочонки, голод, вожак.
    enem2: {
        variant1: 'Волчий пир', variant2: 'Клыки стаи', variant3: 'Ненасытная пасть',
        variant4: 'Дубовый бочонок', variant5: 'Быстрый оскал', variant6: 'Рваная хватка',
        variant7: 'Волчий аппетит', variant8: 'Бочковая броня', variant9: 'Стремительный клык',
        variant10: 'Живучий клык', variant11: 'Цепкие когти', variant12: 'Кусь на бегу',
        variant13: 'Толстая шкура', variant14: 'Стайный напор', variant15: 'Прыжок из засады',
        variant16: 'Точный клык', variant17: 'Волчья хватка', variant18: 'Верный прицел стаи',
        variant19: 'Мгновенный бросок', variant20: 'Голодный нюх', variant21: 'Стальная челюсть',
        variant22: 'Юркий загонщик', variant23: 'Стойкий вожак', variant24: 'Чуткое ухо',
        variant25: 'Обходной манёвр', variant26: 'Дикая ярость стаи', variant27: 'Неукротимый клык',
        variant28: 'Смертельный наскок', variant29: 'Матёрый волк', variant30: 'Разгон стаи',
        variant31: 'Бросок вожака', variant32: 'Шкура матёрого', variant33: 'Неутомимый загон',
        variant34: 'Волчья повадка', variant35: 'Стальные лапы стаи'
    },
    // Косолапый — медведь: тяжёлая лапа, шуба, рёв, лесной хозяин, медленный-но-мощный.
    enem3: {
        variant1: 'Медвежий гнев', variant2: 'Когтистый удар', variant3: 'Лесной силач',
        variant4: 'Толстая шуба', variant5: 'Внезапный наскок', variant6: 'Рваная рана',
        variant7: 'Медвежья мощь', variant8: 'Каменная шкура', variant9: 'Тяжёлый рывок',
        variant10: 'Живучий когтистый', variant11: 'Дубовая лапа', variant12: 'Медленно, но метко',
        variant13: 'Хозяин леса', variant14: 'Разбуженный медведь', variant15: 'Неожиданная прыть',
        variant16: 'Меткий коготь', variant17: 'Медвежья хватка', variant18: 'Верный удар лапой',
        variant19: 'Внезапный удар', variant20: 'Косолапый нюх', variant21: 'Стальные когти',
        variant22: 'Неуклюжий, но верный', variant23: 'Зимняя спячка силы', variant24: 'Пробуждение силы',
        variant25: 'Косолапый манёвр', variant26: 'Дикий рёв', variant27: 'Медвежья ярость',
        variant28: 'Сокрушительный наскок', variant29: 'Гора мышц', variant30: 'Пробуждённая мощь',
        variant31: 'Внезапный медведь', variant32: 'Живучая шуба', variant33: 'Неутомимый косолапый',
        variant34: 'Косолапая прыть', variant35: 'Медвежья выносливость'
    },
    // Сестричка — лиса: хитрость, притворство, ложный след, коготки, прищур.
    enem4: {
        variant1: 'Лисья хитрость', variant2: 'Острые коготки', variant3: 'Плутовская удаль',
        variant4: 'Пушистая защита', variant5: 'Хитрый рывок', variant6: 'Коварный укус',
        variant7: 'Лисья удаль', variant8: 'Рыжая броня', variant9: 'Молниеносная плутовка',
        variant10: 'Живучая плутовка', variant11: 'Цепкие коготки', variant12: 'Укус и в нору',
        variant13: 'Крепкая сестричка', variant14: 'Неуловимая плутовка', variant15: 'Ускользающий манёвр',
        variant16: 'Меткий коготок', variant17: 'Лисья хватка', variant18: 'Верный прищур',
        variant19: 'Мгновенная уловка', variant20: 'Плутовской нюх', variant21: 'Обманчивая шкурка',
        variant22: 'Юркая плутовка', variant23: 'Стойкая хитрость', variant24: 'Лукавый взгляд',
        variant25: 'Ложный след', variant26: 'Дикая плутня', variant27: 'Коварная сестричка',
        variant28: 'Внезапная уловка', variant29: 'Хитрая сила', variant30: 'Плутовской рывок',
        variant31: 'Обманный манёвр', variant32: 'Живучая хитрость', variant33: 'Неутомимая плутовка',
        variant34: 'Лисья прыть', variant35: 'Плутовская выносливость'
    },
    // Колобок — сбежавший от бабушки хлеб: румяная корка, кувырок, «я ушёл» из сказки.
    enem5: {
        variant1: 'Румяный удар', variant2: 'Зубастая корка', variant3: 'Пышная сила',
        variant4: 'Крепкая корочка', variant5: 'Меткий кувырок', variant6: 'Обжигающий удар',
        variant7: 'Румяная мощь', variant8: 'Поджаристая броня', variant9: 'Стремительный кувырок',
        variant10: 'Живучая выпечка', variant11: 'Твёрдая корка', variant12: 'Кусь и укатился',
        variant13: 'Пышный каравай', variant14: 'Неутомимый кувырок', variant15: 'Пружинистый бок',
        variant16: 'Меткая корка', variant17: 'Колобковая хватка', variant18: 'Точный подкат',
        variant19: 'Молниеносный откат', variant20: 'Ушлый нюх', variant21: 'Стойкая корка',
        variant22: 'Юркий бок', variant23: 'От бабушки ушедший', variant24: 'Неуловимый кругляш',
        variant25: 'Ускользающий кувырок', variant26: 'Дикая закалка', variant27: 'Обожжённая корка',
        variant28: 'Стремительный откат', variant29: 'Каменный каравай', variant30: 'Разогнавшийся колобок',
        variant31: 'От лисы ушедший', variant32: 'Живучая корка', variant33: 'Неутомимый кругляш',
        variant34: 'Ловкость колобка', variant35: 'Перекатывание'
    }
};
