let lvlNumber = 6;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.96, damageMultiplier: 1.08, minWaveDelay: 2480, minShotDelay: 170, minTelegraphMs: 528,
	phases: [
		{ phase: 1, minHp: 0.651, cadence: 0.99, speed: 0.956, damage: 1, telegraphMultiplier: 0.985, surpriseChance: 0.08, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.296, cadence: 0.861, speed: 1.07, damage: 1.1, telegraphMultiplier: 0.935, surpriseChance: 0.155, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0, cadence: 0.741, speed: 1.14, damage: 1.19, telegraphMultiplier: 0.886, surpriseChance: 0.235, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { combatIdentity: "Гадюка: выпад с одной стороны, и запоздавший выпад с зеркальной", combatTrick: "выпад слева, а зеркальный выпад справа приходит с запозданием — игрок уже перевёл прицел обратно", signatureEvery: 4, movementStyle: 'straight', cadence: 0.949, telegraphMs: 801, speedMultiplier: 0.781, damageMultiplier: 0.99, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] },
		enem2: { combatIdentity: "Паук-крестовик: тянет нить вдоль одного края, а кусает с другого", combatTrick: "нить тянется по правому краю к центру, игрок идёт за ней — и укус там, где он уже не ждёт", signatureEvery: 5, movementStyle: 'weave', cadence: 0.999, telegraphMs: 560, speedMultiplier: 0.781, damageMultiplier: 1.04, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.22] },
		enem3: { combatIdentity: "Рой оводов: очередь жал в разные места одного фланга без пауз, потом рой перелетает на другой", combatTrick: "очередь жал по одному флангу не даёт передохнуть, а рой уже перелетает на другой бок", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.8, telegraphMs: 530, speedMultiplier: 0.76, damageMultiplier: 1.08, speedVariance: [0.92, 1.02, 1.12, 1.22, 1.3] },
		enem4: { combatIdentity: "Жаба-великан: два медленных прыжка, а два быстрых языка прилетают раньше", combatTrick: "два тяжёлых прыжка появляются первыми, но быстрые языки бьют раньше них", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.1, telegraphMs: 899, speedMultiplier: 0.781, damageMultiplier: 1.2, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.14] },
		enem5: { combatIdentity: "Пиявка-душитель: ползёт по диагонали, присасываясь всё ниже и ближе к центру", combatTrick: "удары ползут по диагонали от края к центру — и вдруг присасывается с дальнего края", signatureEvery: 3, movementStyle: 'pause', cadence: 0.852, telegraphMs: 560, speedMultiplier: 0.76, damageMultiplier: 1.16, speedVariance: [0.8, 0.92, 1.04, 1.18, 1.3] }
	}
};


const ENEMY_TYPES = {

	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl6/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl6/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl6/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl6/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl6/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Шипелка',
		image: 'images/enemies/regions/1_smesh_les/lvl6/1.webp',
		baseHP: (4050) + (4050 * factorChar),
		baseSpeed: 0,
		baseDamage: (20) + (20) * factorChar,
		spawnWeight: 5,
		baseExp: 250,
		xPos: 38,
		size: '24%',
        deathAnimation: { preset: 'meltDown', durationMs: 1200 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Висячий',
		image: 'images/enemies/regions/1_smesh_les/lvl6/2.webp',
		baseHP: (15000) + (15000 * factorChar),
		baseSpeed: 0,
		baseDamage: (22) + (22) * factorChar,
		spawnWeight: 15,
		baseExp: 400,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1300 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Жужжалка',
		image: 'images/enemies/regions/1_smesh_les/lvl6/3.webp',
		baseHP: (22000) + (22000) * factorChar,
		baseSpeed: 0,
		baseDamage: (24) + (24) * factorChar,
		spawnWeight: 20,
		baseExp: 600,
		xPos: 35,
		size: '28%',
        deathAnimation: { preset: 'puffPop', durationMs: 950 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Квакуша',
		image: 'images/enemies/regions/1_smesh_les/lvl6/4.webp',
		baseHP: (64000) + (64000) * factorChar,
		baseSpeed: 0,
		baseDamage: (26) + (26) * factorChar,
		spawnWeight: 10,
		baseExp: 800,
		xPos: 34,
		size: '28%',
        deathAnimation: { preset: 'hopCollapse', durationMs: 1100 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Присоска',
		image: 'images/enemies/regions/1_smesh_les/lvl6/5.webp',
		baseHP: (78000) + (78000) * factorChar,
		baseSpeed: 0,
		baseDamage: (28) + (28) * factorChar,
		spawnWeight: 5,
		baseExp: 0,
		xPos: 34,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1250 }
	},

};


let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 6;

// Уровень 6 — Мокрые дела (болотная живность)
// Боссы по центру; атаки — края (x≤18 / x≥78) и/или ниже босса.
// Быстрые (speed≥16) стартуют высоко (y≤12); медленные могут ниже (~46–58).
// У каждого босса свой рисунок угрозы — не копия прошлых уровней.

const bossAbilities = [
	// ===== Шипелка =====
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 30 h

	// ===== Висячий =====
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 27, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, // 29 h

	// ===== Жужжалка =====
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 74, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 79, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 79, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 37 h

	// ===== Квакуша =====
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 73, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 53, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 41, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 27, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 77, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 43, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 34 h
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 35 h

	// ===== Присоска =====
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 54, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 27, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 32 h

];


const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 233, bossDelayAbDop: 5251, firstWaveDelayMs: 2390 }, // выпады ровными очередями
	{ boss: 'enem2', bossDelayAb: 237, bossDelayAbDop: 5809, firstWaveDelayMs: 2400 }, // нить тянется неспешно
	{ boss: 'enem3', bossDelayAb: 190, bossDelayAbDop: 4150, firstWaveDelayMs: 2342 }, // рой не даёт отдышаться
	{ boss: 'enem4', bossDelayAb: 216, bossDelayAbDop: 6450, firstWaveDelayMs: 2400 }, // прыжки тяжело и не спеша
	{ boss: 'enem5', bossDelayAb: 201, bossDelayAbDop: 4668, firstWaveDelayMs: 2266 }, // ползёт без остановки
];

// Способности: медленные / средние / быстрые / микс
const bossAbilitiesDop = [
	// Шипелка
	{ boss: 'enem1', indexAbilities: [0, 1, 2], label: "Дважды слева и справа" },
	{ boss: 'enem1', indexAbilities: [3, 4, 5], label: "Справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9], signature: true, minPhase: 1, label: "Выпады — знакомство: слева и трижды справа" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], label: "В центр, слева, справа, в центр и слева" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 15], signature: true, minPhase: 2, label: "Выпады — иной конец: слева и трижды справа" },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20], minPhase: 3, label: "Дважды слева и трижды справа" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24, 25], label: "Трижды справа и дважды слева" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29, 30], minPhase: 2, label: "В центр, справа и трижды слева" },

	// Висячий
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], label: "В центр, дважды справа и слева" },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7], label: "Справа, в центр, слева и справа" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11], signature: true, minPhase: 1, label: "Нить — знакомство: трижды справа и в центр" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16], label: "Слева, два в центр и дважды справа" },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 17], signature: true, minPhase: 2, label: "Нить — иной конец: трижды справа и слева" },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22], minPhase: 3, label: "Дважды слева, в центр и дважды справа" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26], label: "Дважды справа, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29], minPhase: 2, label: "Справа, в центр и слева" },

	// Жужжалка
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], label: "Трижды слева и дважды справа" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9], label: "4 раза справа и слева" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14], signature: true, minPhase: 1, label: "Рой — знакомство: трижды слева, справа и в центр" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19], label: "Два в центр и трижды справа" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 20, 21], signature: true, minPhase: 2, label: "Рой — иной конец: трижды слева и дважды справа" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25, 26, 27], minPhase: 3, label: "В центр, 4 раза слева и справа" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32], label: "Справа, трижды слева и в центр" },
	{ boss: 'enem3', indexAbilities: [33, 34, 35, 36, 37], label: "В центр, дважды слева и дважды справа" },

	// Квакуша
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], label: "Дважды справа и медленный слева" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7, 8], label: "Дважды справа и трижды слева" },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12, 13], signature: true, minPhase: 1, label: "Прыжки — знакомство: трижды справа, медленный справа и медленный слева" },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18], label: "В центр, дважды справа и дважды слева" },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 19, 20], signature: true, minPhase: 2, label: "Прыжки — иной конец: дважды справа, слева, в центр и медленный справа" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], minPhase: 3, label: "Справа, в центр, справа, в центр и слева" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30], label: "Дважды слева, дважды справа и в центр" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34, 35], minPhase: 2, label: "В центр, справа, дважды слева и в центр" },

	// Присоска
	{ boss: 'enem5', indexAbilities: [0, 1, 2], label: "Слева, в центр и справа" },
	{ boss: 'enem5', indexAbilities: [3, 4, 5, 6], label: "Слева, в центр, слева и в центр" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10, 11], signature: true, minPhase: 1, label: "Присоска — знакомство: трижды слева, в центр и слева" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16], label: "Трижды справа и два в центр" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10, 17, 18], signature: true, minPhase: 2, label: "Присоска — иной конец: трижды слева, два в центр и справа" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24], minPhase: 3, label: "Трижды слева, два в центр и справа" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28], label: "Справа, дважды слева и справа" },
	{ boss: 'enem5', indexAbilities: [29, 30, 31, 32], minPhase: 2, label: "Два в центр, справа и слева" },

];

// Лорные названия связок. Уровень 6 — мелкая нечисть: Шипелка (гадюка), Висячий (паук),
// Жужжалка (пчелиный рой), Квакуша (жаба), Присоска (пиявка).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Зигзаг-укус', variant2: 'Ядовитое жало', variant3: 'Шипящая сила',
        variant4: 'Чешуйчатый щит', variant5: 'Меткий зигзаг', variant6: 'Жгучий укус',
        variant7: 'Шипелкина мощь', variant8: 'Прочная чешуйка', variant9: 'Стремительный зигзаг',
        variant10: 'Живучий яд', variant11: 'Цепкий укус', variant12: 'Укус и в нору',
        variant13: 'Плотная чешуя', variant14: 'Неутомимое шипение', variant15: 'Извилистый рывок',
        variant16: 'Меткое жало', variant17: 'Шипящая хватка', variant18: 'Прищур гадюки',
        variant19: 'Мгновенный зигзаг', variant20: 'Змеиный нюх', variant21: 'Стойкий к укусам',
        variant22: 'Юркая шипелка', variant23: 'Шипелкина стойкость', variant24: 'Чуткий язычок',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикое шипение', variant27: 'Жгучая мощь',
        variant28: 'Внезапный зигзаг', variant29: 'Каменная чешуя', variant30: 'Разросшийся яд',
        variant31: 'Шипелкин рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимый зигзаг',
        variant34: 'Шипелкина прыть', variant35: 'Шипелкина выносливость'
    },
    enem2: {
        variant1: 'Паучий укус', variant2: 'Липкая паутина', variant3: 'Паучья сила',
        variant4: 'Хитиновый панцирь', variant5: 'Бросок паутины', variant6: 'Ядовитый укус',
        variant7: 'Паучья мощь', variant8: 'Прочный хитин', variant9: 'Стремительный спуск',
        variant10: 'Живучий паук', variant11: 'Цепкая паутина', variant12: 'Укус из тени угла',
        variant13: 'Плотный хитин', variant14: 'Неутомимое плетение', variant15: 'Пружинистая нить',
        variant16: 'Меткая нить', variant17: 'Паучья хватка', variant18: 'Восемь глаз в темноте',
        variant19: 'Мгновенный спуск', variant20: 'Паучий нюх', variant21: 'Стойкая паутина',
        variant22: 'Юркий висячий', variant23: 'Паучья стойкость', variant24: 'Чуткая нить',
        variant25: 'Ускользающий в угол', variant26: 'Дикое плетение', variant27: 'Едкий яд',
        variant28: 'Внезапный спуск', variant29: 'Каменный хитин', variant30: 'Разросшаяся паутина',
        variant31: 'Паучий рывок', variant32: 'Живучий хитин', variant33: 'Неутомимый спуск',
        variant34: 'Паучья прыть', variant35: 'Паучья выносливость'
    },
    enem3: {
        variant1: 'Жалящий укус', variant2: 'Ядовитая слюна', variant3: 'Роевая сила',
        variant4: 'Хитиновые латы', variant5: 'Меткий укус', variant6: 'Едкая слюна',
        variant7: 'Роевая мощь', variant8: 'Прочные латы', variant9: 'Стремительный рой',
        variant10: 'Живучий рой', variant11: 'Цепкие лапки', variant12: 'Укус и в падаль',
        variant13: 'Плотный панцирь', variant14: 'Неутомимый рой', variant15: 'Гудящий разгон',
        variant16: 'Меткий укус вслепую', variant17: 'Роевая хватка', variant18: 'Тысяча фасеточных глаз',
        variant19: 'Мгновенный укус', variant20: 'Падальный нюх', variant21: 'Стойкий рой',
        variant22: 'Юркая жужжалка', variant23: 'Роевая стойкость', variant24: 'Чуткие крылышки',
        variant25: 'Ускользающий рой', variant26: 'Дикое гудение', variant27: 'Яд слюны',
        variant28: 'Внезапный укус', variant29: 'Каменные латы', variant30: 'Разросшийся рой',
        variant31: 'Роевой рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимое гудение',
        variant34: 'Роевая прыть', variant35: 'Роевая выносливость'
    },
    enem4: {
        variant1: 'Квакающий удар', variant2: 'Ядовитая слизь', variant3: 'Болотная сила',
        variant4: 'Слизистая кожа', variant5: 'Меткий язык', variant6: 'Едкая слизь',
        variant7: 'Болотная мощь', variant8: 'Пупырчатая броня', variant9: 'Стремительный прыжок',
        variant10: 'Живучая квакуша', variant11: 'Липкий язык', variant12: 'Плевок и в тину',
        variant13: 'Плотная кожа', variant14: 'Неутомимое кваканье', variant15: 'Пружинистый прыжок',
        variant16: 'Меткий плевок', variant17: 'Болотная хватка', variant18: 'Выпученный взгляд',
        variant19: 'Мгновенный язык', variant20: 'Болотный нюх', variant21: 'Стойкая к яду',
        variant22: 'Юркая квакуша', variant23: 'Болотная стойкость', variant24: 'Чуткая кожа',
        variant25: 'Ускользающий в тину', variant26: 'Дикое кваканье', variant27: 'Мощь слизи',
        variant28: 'Внезапный прыжок', variant29: 'Каменная кочка', variant30: 'Разросшееся горло',
        variant31: 'Болотный рывок', variant32: 'Живучая слизь', variant33: 'Неутомимый прыжок',
        variant34: 'Болотная прыть', variant35: 'Болотная выносливость'
    },
    enem5: {
        variant1: 'Присасывающий укус', variant2: 'Ядовитая слюна', variant3: 'Тянущая сила',
        variant4: 'Скользкая шкурка', variant5: 'Меткое присасывание', variant6: 'Едкая слизь',
        variant7: 'Тянущая мощь', variant8: 'Слизистая броня', variant9: 'Стремительный бросок',
        variant10: 'Живучая присоска', variant11: 'Цепкая присоска', variant12: 'Укус и на дно',
        variant13: 'Плотная слизь', variant14: 'Неутомимое высасывание', variant15: 'Извивающийся рывок',
        variant16: 'Меткий укус', variant17: 'Мёртвая хватка', variant18: 'Незаметный подход',
        variant19: 'Мгновенное присасывание', variant20: 'Болотный нюх', variant21: 'Стойкая к отрыву',
        variant22: 'Юркая присоска', variant23: 'Тянущая стойкость', variant24: 'Чуткая слизь',
        variant25: 'Ускользающая на дно', variant26: 'Дикое высасывание', variant27: 'Мощь слюны',
        variant28: 'Внезапный укус', variant29: 'Каменная выдержка', variant30: 'Разросшаяся жажда',
        variant31: 'Присасывающий рывок', variant32: 'Живучая слизь', variant33: 'Неутомимая присоска',
        variant34: 'Скользкая прыть', variant35: 'Тянущая выносливость'
    }
};
