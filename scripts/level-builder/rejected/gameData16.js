let lvlNumber = 16;
let factorChar = (lvlNumber * 5) / 100;

// Открытие Области II «Золотые поля». Свежий старт региона, поэтому темп чуть
// мягче финала Смешанного леса, но геометрия и почерк каждого босса — новые.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.94, damageMultiplier: 1.941, minWaveDelay: 2801, minShotDelay: 155, minTelegraphMs: 560,
	phases: [
		{ phase: 1, minHp: 0.664, cadence: 1.004, speed: 0.998, damage: 1, telegraphMultiplier: 1.005, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.314, cadence: 0.859, speed: 1.08, damage: 1.12, telegraphMultiplier: 0.929, surpriseChance: 0.22, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0, cadence: 0.729, speed: 1.17, damage: 1.24, telegraphMultiplier: 0.861, surpriseChance: 0.32, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { combatIdentity: "Шаг сеятеля", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'straight', cadence: 1.002, telegraphMs: 882, speedMultiplier: 0.951, damageMultiplier: 0.95, speedVariance: [0.86, 0.94, 1.02, 1.1, 1.18] },
		enem2: { combatIdentity: "Зёрна из лукошка", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'weave', cadence: 0.881, telegraphMs: 739, speedMultiplier: 1.1, damageMultiplier: 0.85, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26] },
		enem3: { combatIdentity: "Пикирование жаворонка", combatTrick: "короткий первый заход продолжается более быстрым довеском с прежнего края", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.2, telegraphMs: 979, speedMultiplier: 0.849, damageMultiplier: 1.12, speedVariance: [0.76, 0.86, 0.96, 1.06, 1.16] },
		enem4: { combatIdentity: "Двойной приказ", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'pause', cadence: 0.781, telegraphMs: 619, speedMultiplier: 1.199, damageMultiplier: 0.65, speedVariance: [0.92, 1.02, 1.12, 1.22, 1.3] },
		enem5: { combatIdentity: "Зубья бороны", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'drift', cadence: 0.75, telegraphMs: 640, speedMultiplier: 1.081, damageMultiplier: 1.06, speedVariance: [0.84, 0.96, 1.08, 1.2, 1.32] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl16/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Босовик',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Сеюшка',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Звонец',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 38,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Дед-Всевсей',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 36,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1550 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Зубец',
		image: 'images/enemies/regions/2_zolot_polya/lvl16/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 36,
		size: '30%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

// Роли ролей сохранены с уровня 15: интро мягче, финал жёстче, но фракции
// собственные — сеятели и жаворонок бьют иначе, чем избушка и Баюнище.
const attackDamage = {
	enem1: {
		light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.34),
		medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.46),
		heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.58)
	},
	enem2: {
		light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.28),
		medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.38),
		heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50)
	},
	enem3: {
		light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.30),
		medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.40),
		heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.48)
	},
	enem4: {
		light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.24),
		medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.33),
		heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.42)
	},
	enem5: {
		light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.26),
		medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.36),
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.48)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 11;
const bossInterval = 3;

// Уровень 16 — Пробуждение нивы, старт области «Золотые поля».
// Архетипы: ровный шаг сеятеля / веерный разброс зерна / редкие пикирования жаворонка /
// нервная скороговорка распорядителя / финальный ряд бороны. Полной нижней стены
// почти нет — только у финального босса, и только в одной сигнатурной комбинации.
const bossAbilities = [
	// ===== Босовик =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 23 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 39, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 2 b
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 39, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 5 c
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 40, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 8 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 51, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 12 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 23 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 25, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 15 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 40, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 19 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 37, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 23 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 24 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 25 h

	// ===== Сеюшка =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 2 b
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 4 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 5 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 7 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 8 d
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 9 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 10 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 11 e
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 12 e
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 13 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 14 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 15 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 17 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 18 g
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 19 g
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 20 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 21 h
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 22 h
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 23 h
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 24 h

	// ===== Звонец =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 2 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 4 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 5 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 8 d
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 24 }, // 9 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 11 e
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 12 e
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 13 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 14 f
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 15 f
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 18 g
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 19 g
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 20 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 21 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 22 h
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 23 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 24 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 25 h

	// ===== Дед-Всевсей =====
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 31 h

	// ===== Зубец =====
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 53, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 51, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 43, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 32 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 342, bossDelayAbDop: 6200, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 282, bossDelayAbDop: 5000, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 219, bossDelayAbDop: 6799, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 250, bossDelayAbDop: 4800, firstWaveDelayMs: 2304 }, // 
	{ boss: 'enem5', bossDelayAb: 270, bossDelayAbDop: 4400, firstWaveDelayMs: 2112 }, // 
];

const bossAbilitiesDop = [
	// Босовик
	{ boss: 'enem1', indexAbilities: [0, 1], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Шаг сеятеля — знакомство" },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 2, recoveryMs: 650, label: "Шаг сеятеля — иной конец" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25], signature: true, minPhase: 3, recoveryMs: 950, label: "Шаг сеятеля — завершение" },

	// Сеюшка
	{ boss: 'enem2', indexAbilities: [0, 1], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Зёрна из лукошка — знакомство" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 2, recoveryMs: 650, label: "Зёрна из лукошка — иной конец" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [400, 700, 0], label: "Зёрна из лукошка — завершение" },

	// Звонец
	{ boss: 'enem3', indexAbilities: [0, 1], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [11, 12, 13], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Пикирование жаворонка — знакомство" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 2, recoveryMs: 650, label: "Пикирование жаворонка — иной конец" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 3, recoveryMs: 950, label: "Пикирование жаворонка — завершение" },

	// Дед-Всевсей
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Двойной приказ — знакомство" },
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Двойной приказ — иной конец" },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "Двойной приказ — завершение" },

	// Зубец
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [4, 5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Зубья бороны — знакомство" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 2, recoveryMs: 650, label: "Зубья бороны — иной конец" },
	{ boss: 'enem5', indexAbilities: [29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, label: "Зубья бороны — завершение" },

];

// Лорные названия связок. Уровень 16 — страда: Босовик (сеятель), Сеюшка (сеятельница),
// Звонец (жаворонок), Дед-Всевсей (надзиратель сева), Зубец (борона).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Сеющий удар', variant2: 'Острое зерно', variant3: 'Сеющая сила',
        variant4: 'Холщовая защита', variant5: 'Меткая горсть', variant6: 'Едкая шелуха',
        variant7: 'Сеющая мощь', variant8: 'Плотная холстина', variant9: 'Ровный шаг сеятеля',
        variant10: 'Живучий Босовик', variant11: 'Цепкая горсть', variant12: 'Бросок и в борозду',
        variant13: 'Толстая холстина', variant14: 'Неутомимый сеятель', variant15: 'Пружинистый шаг',
        variant16: 'Меткое зерно', variant17: 'Сеющая хватка', variant18: 'Взгляд на борозду',
        variant19: 'Мгновенная горсть', variant20: 'Земляной дух', variant21: 'Стойкая холстина',
        variant22: 'Юркий Босовик', variant23: 'Сеющая стойкость', variant24: 'Чуткая борозда',
        variant25: 'Ускользающая горсть', variant26: 'Дикий бросок зерна', variant27: 'Мощь шелухи',
        variant28: 'Внезапная горсть', variant29: 'Каменная борозда', variant30: 'Разросшийся посев',
        variant31: 'Сеющий рывок', variant32: 'Живучая холстина', variant33: 'Неутомимый шаг',
        variant34: 'Сеющая прыть', variant35: 'Сеющая выносливость'
    },
    enem2: {
        variant1: 'Веерный удар', variant2: 'Зубастое плетение', variant3: 'Веерная сила',
        variant4: 'Плотная плетёнка', variant5: 'Веер зерна', variant6: 'Едкая пыль зерна',
        variant7: 'Веерная мощь', variant8: 'Крепкая лоза плетения', variant9: 'Меняющийся ритм броска',
        variant10: 'Живучая Сеюшка', variant11: 'Цепкая лоза-рука', variant12: 'Веер и в землю',
        variant13: 'Крепкая плетёнка', variant14: 'Неутомимая Сеюшка', variant15: 'Взмах лозяной руки',
        variant16: 'Меткое зёрнышко', variant17: 'Хватка лозяных рук', variant18: 'Оскал в плетении',
        variant19: 'Мгновенный веер', variant20: 'Зерновой дух короба', variant21: 'Стойкая плетёнка',
        variant22: 'Юркая Сеюшка', variant23: 'Веерная стойкость', variant24: 'Чуткий разброс',
        variant25: 'Ускользающий веер', variant26: 'Дикий разброс', variant27: 'Мощь пыли зерна',
        variant28: 'Внезапный веер', variant29: 'Каменная лоза', variant30: 'Разросшийся короб',
        variant31: 'Веерный рывок', variant32: 'Живучая плетёнка', variant33: 'Неутомимый разброс',
        variant34: 'Веерная прыть', variant35: 'Веерная выносливость'
    },
    enem3: {
        variant1: 'Пикирующий удар', variant2: 'Острый клюв', variant3: 'Жаворонковая сила',
        variant4: 'Пёстрая защита', variant5: 'Меткое пике', variant6: 'Едкий писк',
        variant7: 'Жаворонковая мощь', variant8: 'Плотное оперение', variant9: 'Тяжёлое пике',
        variant10: 'Живучий Звонец', variant11: 'Цепкий коготок', variant12: 'Пике и в небо',
        variant13: 'Крепкое оперение', variant14: 'Неутомимый жаворонок', variant15: 'Пружинистый взлёт',
        variant16: 'Меткий коготок', variant17: 'Жаворонковая хватка', variant18: 'Взгляд с высоты',
        variant19: 'Мгновенное пике', variant20: 'Небесный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Звонец', variant23: 'Жаворонковая стойкость', variant24: 'Звонкая трель',
        variant25: 'Ускользающее пике', variant26: 'Дикое пике', variant27: 'Мощь клюва',
        variant28: 'Внезапное пике', variant29: 'Каменное оперение', variant30: 'Разросшийся взлёт',
        variant31: 'Жаворонковый рывок', variant32: 'Живучее оперение', variant33: 'Неутомимое пике',
        variant34: 'Жаворонковая прыть', variant35: 'Жаворонковая выносливость'
    },
    enem4: {
        variant1: 'Дедовский удар', variant2: 'Острый посох сева', variant3: 'Дедовская сила',
        variant4: 'Кафтанная защита', variant5: 'Меткий окрик', variant6: 'Едкий табак',
        variant7: 'Дедовская мощь', variant8: 'Прочный кафтан', variant9: 'Скороговорка распорядителя',
        variant10: 'Живучий Дед-Всевсей', variant11: 'Цепкий посох', variant12: 'Окрик и в поле',
        variant13: 'Толстый кафтан', variant14: 'Неутомимый распорядитель', variant15: 'Пружинистая походка',
        variant16: 'Меткий посох', variant17: 'Дедовская хватка', variant18: 'Взгляд надзирателя',
        variant19: 'Мгновенный окрик', variant20: 'Полевой дух', variant21: 'Стойкий кафтан',
        variant22: 'Юркий не по годам', variant23: 'Дедовская стойкость', variant24: 'Чуткий на всё поле',
        variant25: 'Ускользающий в рядах', variant26: 'Дикая скороговорка', variant27: 'Мощь табака',
        variant28: 'Внезапный окрик', variant29: 'Выдержка деда', variant30: 'Разросшийся надзор',
        variant31: 'Дедовский рывок', variant32: 'Живучий кафтан', variant33: 'Неутомимая скороговорка',
        variant34: 'Дедовская прыть', variant35: 'Дедовская выносливость'
    },
    enem5: {
        variant1: 'Боронящий удар', variant2: 'Острый зуб бороны', variant3: 'Боронящая сила',
        variant4: 'Рама-щит', variant5: 'Проход бороны', variant6: 'Едкая земля',
        variant7: 'Боронящая мощь', variant8: 'Прочная рама', variant9: 'Финальный ряд',
        variant10: 'Живучий Зубец', variant11: 'Зубья бороны', variant12: 'Проход и в землю',
        variant13: 'Толстая рама', variant14: 'Неутомимая борона', variant15: 'Пружинистые зубья',
        variant16: 'Меткий зуб', variant17: 'Боронящая хватка', variant18: 'Взгляд на весь ряд',
        variant19: 'Мгновенный проход', variant20: 'Дух бороны', variant21: 'Стойкая рама',
        variant22: 'Юркий Зубец', variant23: 'Боронящая стойкость', variant24: 'Чуткий зуб',
        variant25: 'Ускользающий ряд', variant26: 'Дикий проход', variant27: 'Мощь земли',
        variant28: 'Внезапный проход', variant29: 'Каменные зубья', variant30: 'Разросшаяся борона',
        variant31: 'Боронящий рывок', variant32: 'Живучая рама', variant33: 'Неутомимый ряд',
        variant34: 'Боронящая прыть', variant35: 'Боронящая выносливость'
    }
};
