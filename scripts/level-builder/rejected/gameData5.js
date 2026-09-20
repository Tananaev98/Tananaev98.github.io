let lvlNumber = 5; 

let factorChar = (lvlNumber*5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.975, damageMultiplier: 1.06, minWaveDelay: 2520, minShotDelay: 171, minTelegraphMs: 532,
	phases: [
		{ phase: 1, minHp: 0.655, cadence: 0.995, speed: 0.951, damage: 1, telegraphMultiplier: 0.99, surpriseChance: 0.075, maxActiveAttacks: 12 },
		{ phase: 2, minHp: 0.301, cadence: 0.865, speed: 1.061, damage: 1.09, telegraphMultiplier: 0.941, surpriseChance: 0.15, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0, cadence: 0.745, speed: 1.13, damage: 1.18, telegraphMultiplier: 0.89, surpriseChance: 0.23, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { combatIdentity: "Филин: раскрывает крылья веером от центра к краю — сначала в одну сторону, потом в другую", combatTrick: "крыло раскрывается от центра влево, игрок идёт за ним — а следом удар справа", signatureEvery: 4, movementStyle: 'weave', cadence: 0.951, telegraphMs: 560, speedMultiplier: 0.78, damageMultiplier: 0.98, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] },
		enem2: { combatIdentity: "Рысь: три когтя почти разом с одного бока, а потом прыжок на другой", combatTrick: "три когтя подряд с одного бока приучают держаться другого — и тут же резкий прыжок в центр", signatureEvery: 5, movementStyle: 'lateRush', cadence: 0.901, telegraphMs: 699, speedMultiplier: 0.78, damageMultiplier: 1.05, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.16] },
		enem3: { combatIdentity: "Кабан-секач: таранит через всё поле — слева, снизу, справа, тяжёлый удар всегда запаздывает", combatTrick: "тяжёлый таран с одного края появляется первым, а быстрые бросаться успевают раньше него", signatureEvery: 4, movementStyle: 'straight', cadence: 1.099, telegraphMs: 640, speedMultiplier: 0.781, damageMultiplier: 1.2, speedVariance: [0.76, 0.88, 1, 1.14, 1.26] },
		enem4: { combatIdentity: "Росомаха: медленный замах с одной стороны, а рывок с другой", combatTrick: "медленный замах слева появляется первым, а рывок справа прилетает раньше него", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.849, telegraphMs: 562, speedMultiplier: 0.78, damageMultiplier: 1.07, speedVariance: [0.94, 1.04, 1.14, 1.22, 1.28] },
		enem5: { combatIdentity: "Волколак: притворяется человеком — короткая пауза, затем волчий бросок серией", combatTrick: "два удара, пауза чуть дольше прежних — и вдруг серия из трёх подряд", signatureEvery: 3, movementStyle: 'drift', cadence: 0.801, telegraphMs: 570, speedMultiplier: 0.781, damageMultiplier: 1.15, speedVariance: [0.86, 0.98, 1.1, 1.2, 1.28] }
	}
};

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

        baseHP: (3900) + (3900 * factorChar),

        baseSpeed: 0,                  

        baseDamage: (20)+(20)*factorChar,                      

        spawnWeight: 5,                  

		baseExp: 250,

		xPos: 38,

        size: '24%',
        deathAnimation: { preset: 'ashFade', durationMs: 1200 }                        

    },

    enem2: {  

        name: 'enem2',

		dispName:  'Мурка',

        image: 'images/enemies/regions/1_smesh_les/lvl5/2.webp',

        baseHP: (15000) + (15000 * factorChar),

        baseSpeed: 0,

        baseDamage: (22)+(22)*factorChar,

        spawnWeight: 15,                  

		baseExp: 400, 

		xPos: 36,

        size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1150 }

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

        size: '30%',
        deathAnimation: { preset: 'heavySink', durationMs: 1450 }                        

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

        size: '28%',
        deathAnimation: { preset: 'fleeStretch', durationMs: 1000 }                        

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

        size: '30%',
        deathAnimation: { preset: 'rollOff', durationMs: 1300 }                        

    },

	

};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 6;
const bossInterval = 9;

// Уровень 5 — Ночная смена
// Атаки по краям / ниже босса; быстрые — сверху. Один архетип на босса.

const bossAbilities = [
	// ===== УУ-х =====
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 72, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 77, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 29 h

	// ===== Мурка =====
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 29 h

	// ===== Секач =====
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 73, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 27, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 30 h

	// ===== Царапка =====
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 77, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 73, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 34 h

	// ===== Волчок =====
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 79, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 32 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 237, bossDelayAbDop: 5100, firstWaveDelayMs: 2400 }, // взмахи ровными волнами
	{ boss: 'enem2', bossDelayAb: 201, bossDelayAbDop: 5621, firstWaveDelayMs: 2400 }, // когти без пауз
	{ boss: 'enem3', bossDelayAb: 201, bossDelayAbDop: 6350, firstWaveDelayMs: 2400 }, // тяжёлые заходы
	{ boss: 'enem4', bossDelayAb: 204, bossDelayAbDop: 4614, firstWaveDelayMs: 2352 }, // рывки без остановки
	{ boss: 'enem5', bossDelayAb: 195, bossDelayAbDop: 4305, firstWaveDelayMs: 2280 }, // человек-тишина, волк-бросок
];

const bossAbilitiesDop = [
	// УУ-х
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "Справа, в центр и справа" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5, 6], label: "Справа, слева, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Веер — знакомство: в центр, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14], label: "Справа, в центр, справа и слева" },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 15, 16], signature: true, minPhase: 2, label: "Веер — иной конец: в центр, слева и трижды справа" },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], minPhase: 3, label: "В центр, дважды слева, в центр и дважды справа" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25], label: "Справа, слева и в центр" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29], minPhase: 2, label: "Справа, в центр, слева и в центр" },

	// Мурка
	{ boss: 'enem2', indexAbilities: [0, 1, 2], label: "Трижды справа" },
	{ boss: 'enem2', indexAbilities: [3, 4, 5, 6], label: "Трижды слева и в центр" },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10], signature: true, minPhase: 1, label: "Когти — знакомство: трижды справа и в центр" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14], label: "Слева, справа и дважды слева" },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 15, 16], signature: true, minPhase: 2, label: "Когти — иной конец: трижды справа и дважды слева" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], minPhase: 3, label: "4 раза слева и дважды справа" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26], label: "Слева, два в центр и справа" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29], minPhase: 2, label: "Трижды справа" },

	// Секач
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], label: "Дважды справа и в центр" },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7], label: "Слева, дважды справа и медленный слева" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Таран — знакомство: в центр, дважды слева и медленный справа" },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15], label: "В центр, слева, справа и в центр" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 16], signature: true, minPhase: 2, label: "Таран — иной конец: в центр, слева, справа, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20, 21], minPhase: 3, label: "Справа, в центр, справа, дважды слева и медленный слева" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25, 26], label: "Справа, слева и дважды справа" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30], label: "В центр, справа и слева" },

	// Царапка
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], label: "Дважды слева, в центр и медленный справа" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], label: "Слева, дважды справа и слева" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11, 12], signature: true, minPhase: 1, label: "Замах — знакомство: 4 раза справа и медленный справа" },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 16, 17], label: "Слева, справа, слева, справа и в центр" },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11, 18, 19], signature: true, minPhase: 2, label: "Замах — иной конец: трижды справа, слева, справа и медленный справа" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24, 25], minPhase: 3, label: "Дважды справа, дважды слева, в центр и медленный справа" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29], label: "Слева, справа, в центр и слева" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], minPhase: 2, label: "Слева, в центр, дважды справа и слева" },

	// Волчок
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], label: "Дважды справа и в центр" },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7, 8], label: "Слева и трижды справа" },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13], signature: true, minPhase: 1, label: "Бросок — знакомство: дважды слева и трижды справа" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17], label: "Трижды справа, слева и в центр" },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 18], signature: true, minPhase: 2, label: "Бросок — иной конец: дважды слева, дважды справа и слева" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24], minPhase: 3, label: "6 раза слева" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28], label: "В центр, слева и дважды справа" },
	{ boss: 'enem5', indexAbilities: [29, 30, 31, 32], minPhase: 2, label: "Справа, в центр, слева и справа" },

];

// Лорные названия связок. Уровень 5: УУ-х (сова), Мурка (кошка), Секач (кабан),
// Царапка (дикий когтистый зверёк), Волчок (юркий вихрем кружащий волчонок).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Совиный удар', variant2: 'Когтистый захват', variant3: 'Совиная сила',
        variant4: 'Пуховая защита', variant5: 'Пикирующий удар', variant6: 'Едкий клёв',
        variant7: 'Совиная мощь', variant8: 'Плотное оперение', variant9: 'Бесшумный полёт',
        variant10: 'Живучие перья', variant11: 'Цепкие когти', variant12: 'Клёв и в ночь',
        variant13: 'Крепкие крылья', variant14: 'Неутомимый ночной полёт', variant15: 'Пружинистый взлёт',
        variant16: 'Взгляд во тьме', variant17: 'Совиная хватка', variant18: 'Немигающий взгляд',
        variant19: 'Мгновенное пике', variant20: 'Ночной слух', variant21: 'Стойкое оперение',
        variant22: 'Юркий летун', variant23: 'Совиная стойкость', variant24: 'Слух совы',
        variant25: 'Ускользающая тень', variant26: 'Дикий клёкот', variant27: 'Мощь клюва',
        variant28: 'Внезапное пике', variant29: 'Каменные перья', variant30: 'Размах крыльев',
        variant31: 'Совиный рывок', variant32: 'Живучее оперение', variant33: 'Неутомимый полёт',
        variant34: 'Совиная прыть', variant35: 'Совиная выносливость'
    },
    enem2: {
        variant1: 'Кошачий удар', variant2: 'Царапающий выпад', variant3: 'Кошачья сила',
        variant4: 'Пушистая шубка', variant5: 'Меткий прыжок', variant6: 'Едкое шипение',
        variant7: 'Кошачья мощь', variant8: 'Плотная шёрстка', variant9: 'Стремительный прыжок',
        variant10: 'Живучая мурка', variant11: 'Цепкие лапки', variant12: 'Царап и под лавку',
        variant13: 'Мягкие но крепкие лапы', variant14: 'Неутомимая охотница', variant15: 'Пружинистая присядка',
        variant16: 'Меткий коготок', variant17: 'Кошачья хватка', variant18: 'Пронзительный взгляд',
        variant19: 'Мгновенный бросок', variant20: 'Кошачий нюх', variant21: 'Стойкая к падениям',
        variant22: 'Юркая мурка', variant23: 'Кошачья стойкость', variant24: 'Чуткие усы',
        variant25: 'Ускользающий хвост', variant26: 'Дикое мяуканье', variant27: 'Мощь когтей',
        variant28: 'Внезапный бросок', variant29: 'Выдержка перед прыжком', variant30: 'Разросшиеся когти',
        variant31: 'Кошачий рывок', variant32: 'Живучая шёрстка', variant33: 'Неутомимая присядка',
        variant34: 'Кошачья прыть', variant35: 'Девять жизней'
    },
    enem3: {
        variant1: 'Клыкастый удар', variant2: 'Разрывающий клык', variant3: 'Кабанья сила',
        variant4: 'Грязевая шкура', variant5: 'Меткий наскок', variant6: 'Едкая слюна',
        variant7: 'Кабанья мощь', variant8: 'Толстая щетина', variant9: 'Тяжёлый разгон',
        variant10: 'Живучий секач', variant11: 'Цепкие клыки', variant12: 'Клык и в грязь',
        variant13: 'Прочная щетина', variant14: 'Неутомимый секач', variant15: 'Разгоняющийся наскок',
        variant16: 'Меткий клык', variant17: 'Кабанья хватка', variant18: 'Налитые кровью глаза',
        variant19: 'Мгновенный наскок', variant20: 'Кабаний нюх', variant21: 'Стойкая щетина',
        variant22: 'Юркий для своего веса', variant23: 'Кабанья стойкость', variant24: 'Чуткий пятачок',
        variant25: 'Ускользающий в чащу', variant26: 'Дикая ярость', variant27: 'Мощь клыков',
        variant28: 'Внезапный разгон', variant29: 'Каменная толща', variant30: 'Разросшиеся клыки',
        variant31: 'Кабаний рывок', variant32: 'Живучая щетина', variant33: 'Неутомимый разгон',
        variant34: 'Кабанья прыть', variant35: 'Кабанья выносливость'
    },
    enem4: {
        variant1: 'Дикий царап', variant2: 'Рваный коготь', variant3: 'Дикая сила',
        variant4: 'Свалявшаяся шерсть', variant5: 'Росчерк когтя', variant6: 'Слюна дикарки',
        variant7: 'Дикая мощь', variant8: 'Колючая шерсть', variant9: 'Учащающийся царап',
        variant10: 'Живучая царапка', variant11: 'Впившиеся когти', variant12: 'Царап и в нору',
        variant13: 'Свалявшаяся шкура', variant14: 'Неутомимая царапка', variant15: 'Пружинистый рывок',
        variant16: 'Меткий росчерк', variant17: 'Дикая хватка', variant18: 'Взгляд из кустов',
        variant19: 'Мгновенный росчерк', variant20: 'Дикий нюх', variant21: 'Стойкая к боли',
        variant22: 'Юркая царапка', variant23: 'Дикая стойкость', variant24: 'Чуткие усы царапки',
        variant25: 'Ускользающая в кусты', variant26: 'Дикий визг', variant27: 'Мощь когтей',
        variant28: 'Внезапный росчерк', variant29: 'Выдержка дикарки', variant30: 'Учащающаяся сила',
        variant31: 'Дикий рывок', variant32: 'Свалявшаяся живучесть', variant33: 'Неутомимый царап',
        variant34: 'Дикая прыть', variant35: 'Дикая выносливость'
    },
    enem5: {
        variant1: 'Волчий вихрь', variant2: 'Кружащий клык', variant3: 'Волчковая сила',
        variant4: 'Свернувшаяся шкура', variant5: 'Меткий вихрь', variant6: 'Укус на вертушке',
        variant7: 'Волчковая мощь', variant8: 'Плотный мех', variant9: 'Раскручивающийся рывок',
        variant10: 'Живучий волчок', variant11: 'Когти вертушки', variant12: 'Укус на кружении',
        variant13: 'Крепкий загривок', variant14: 'Неутомимое кружение', variant15: 'Пружинистое верчение',
        variant16: 'Бросок с разворота', variant17: 'Волчковая хватка', variant18: 'Головокружительный взгляд',
        variant19: 'Мгновенный вихрь', variant20: 'Волчий нюх', variant21: 'Стойкое кружение',
        variant22: 'Юркий волчок', variant23: 'Волчковая стойкость', variant24: 'Ухо на вертушке',
        variant25: 'Ускользающее кружение', variant26: 'Дикий вихрь', variant27: 'Мощь клыка',
        variant28: 'Внезапный вихрь', variant29: 'Каменная устойчивость', variant30: 'Разгоняющееся кружение',
        variant31: 'Волчковый рывок', variant32: 'Живучий мех', variant33: 'Неутомимый вихрь',
        variant34: 'Волчковая прыть', variant35: 'Волчковая выносливость'
    }
};
