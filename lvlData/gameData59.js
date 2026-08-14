// ЗАГЛУШКА уровня 59 — контент ещё не написан, это ПОЛНАЯ КОПИЯ механик
// gameData1.js (расстановка атак, комбо, спрайты — всё как на уровне 1). Единственное,
// что реально отличается от уровня 1 — damageMultiplier и HP боссов ниже: они посчитаны
// по формулам, уже используемым в проекте для этой цели (см. scripts/balance-report.js
// bossHealthMultiplier для HP и историю getBossDamageProgressionMultiplier в saveData.js
// для урона — revision 9 убрала эту кривую из движка и перенесла в данные, здесь она и
// применена). Уровень безопасно проходим (числа посчитаны, не взяты с потолка), но
// ИГРОВОГО ДИЗАЙНА тут нет — просто более сильная версия уровня 1.
//
// ПОМЕТКА ДЛЯ ТОГО, КТО (человек или ИИ) будет переписывать механики этого уровня:
// при замене расстановки атак/комбо НЕ меняйте баланс сложности произвольно — сверяйтесь
// с тем, на каком уровне героя игрок примерно окажется к этой точке кампании (см.
// buildFocusedHeroProgression / focusedProgression в scripts/boss-damage-report.js,
// scripts/temporary-upgrade-report.js — экономика злата уже посчитана) и с его текущими
// HP/защитой/DPS на этом уровне героя (scripts/balance-report.js, admin-balance-panel.html
// — там реальная симуляция боя). Итоговый урон удара считается как
// customDamage × bossMultiplier × phaseMultiplier × damageMultiplier (см.
// calculateBossAttackDamage в saveData.js) — если поднимаете урон конкретной атаки/босса/фазы, проверяйте, что герой всё ещё
// не гибнет от одного удара и не тонет в комбо на своём типичном для этого уровня HP,
// иначе уровень станет непроходимым.
let lvlNumber = 59; 

// Полный профиль боя уровня: движок только исполняет эти настройки.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 2.278,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.76, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { movementStyle: 'lateRush', cadence: 1.03, telegraphMs: 920, speedMultiplier: 0.94, damageMultiplier: 0.92, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] }, // TOP_HOPS: спокойный прыжок → рывок
		enem2: { movementStyle: 'drift', cadence: 1.00, telegraphMs: 860, speedMultiplier: 0.98, damageMultiplier: 0.97, speedVariance: [0.90, 0.96, 1.02, 1.08, 1.14] }, // PACK_PAIRS: пары сходятся к центру
		enem3: { movementStyle: 'pause', cadence: 1.18, telegraphMs: 1080, speedMultiplier: 0.78, damageMultiplier: 1.18, speedVariance: [0.80, 0.86, 0.93, 1.00, 1.08] }, // HEAVY_PRESS: тяжёлые остановки
		enem4: { movementStyle: 'accelerate', cadence: 0.90, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 1.02, speedVariance: [0.88, 0.98, 1.08, 1.16, 1.22] }, // ASYM_FOX: резкая смена давления
		enem5: { movementStyle: 'weave', cadence: 0.82, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 1.10, speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20] } // EDGE_ROLL: катится вдоль краёв
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
        baseHP: 10301,                      
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
        baseHP: 61808,
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
        baseHP: 82411,
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
        baseHP: 247233,
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
        baseHP: 309041,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0, 
        size: '25%',
        deathAnimation: { preset: 'rollOff', durationMs: 1300 }                        
    },

	
};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;
 
  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)
 //spawnEnemyWithParams('enem4', 40, 20, 1, 200, 40 )
 
 
 
 // Уровень 1 — звери и Колобок
 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые (speed≥16) — y≤12.
 // У каждого босса свой архетип под образ.

 const bossAbilities = [
	// ===== Побегайчик: TOP_HOPS — заячьи скачки сверху с краёв =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	// быстрые скачки — 5 сверху
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 28 }, //10
	// микс: лапка + рывок
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //15

	// ===== Любитель бочков: PACK_PAIRS — волчья стая, пары L+R на одной Y =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //7
	// рывок стаи — 3 быстрых сверху с обоих краёв
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //10
	// микс: пара + рывок
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15

	// ===== Косолапый: HEAVY_PRESS — тяжёлые лапы снизу + редкий рык сверху =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //7
	// рык — 2 быстрых сверху
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //9
	// микс: лапа + рык
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15

	// ===== Сестричка: ASYM_FOX — хитрая: густо слева, сюрприз справа =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //5
	// редкие «обманки» справа
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //7
	// сюрприз-рывки — 4 справа сверху
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //11
	// микс: левый хвост + правый рывок
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //15

	// ===== Колобок: EDGE_ROLL — катится по периметру флангов =====
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //7
	// ускорение качения — 3 быстрых сверху
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //10
	// микс: оборот + рывок
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //15
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 280, bossDelayAbDop: 5200 }, // скачет часто
	{ boss: 'enem2', bossDelayAb: 320, bossDelayAbDop: 5600 }, // стая давит ритмом
	{ boss: 'enem3', bossDelayAb: 380, bossDelayAbDop: 6400 }, // тяжёлый, длинная пауза
	{ boss: 'enem4', bossDelayAb: 260, bossDelayAbDop: 5000 }, // хитрая вспышка
	{ boss: 'enem5', bossDelayAb: 240, bossDelayAbDop: 4800 }, // катится без остановки
];

 const bossAbilitiesDop = [
	// Побегайчик
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [6, 8, 10, 7, 9] },
	{ boss: 'enem1', indexAbilities: [0, 6, 2, 9] },
	{ boss: 'enem1', indexAbilities: [4, 5, 13, 14] },
	{ boss: 'enem1', indexAbilities: [11, 13, 12, 14, 15] },
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3] },

	// Любитель бочков
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9] },
	{ boss: 'enem2', indexAbilities: [2, 8, 3, 9] },
	{ boss: 'enem2', indexAbilities: [11, 13, 12, 14, 15] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4] },
	{ boss: 'enem2', indexAbilities: [1, 3, 5] },

	// Косолапый
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 5, 6] },
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [5, 8, 6, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [1, 7, 11, 14, 15] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4] },
	{ boss: 'enem3', indexAbilities: [5, 7] },

	// Сестричка
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [8, 10, 9, 11] },
	{ boss: 'enem4', indexAbilities: [1, 8, 5, 11] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [6, 7] },

	// Колобок
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10] },
	{ boss: 'enem5', indexAbilities: [0, 8, 4, 9] },
	{ boss: 'enem5', indexAbilities: [11, 13, 12, 14, 15] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2] },
	{ boss: 'enem5', indexAbilities: [4, 5, 6] },
];
