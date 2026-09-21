let lvlNumber = 18;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 18 — «Жатвенные орудия», область II «Золотые поля».
// Пять ожившых инструментов, пять непохожих почерков: зигзаг серпа без нижней стены /
// тройные уколы вил / асимметричные грабли, давящие с одного бока / частый дождь
// сноповязки сверху / финал скрещивает высоты флангов и впервые перекрывает низ разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.902, damageMultiplier: 1.908, minWaveDelay: 2802, minShotDelay: 149, minTelegraphMs: 546,
	phases: [
		{ phase: 1, minHp: 0.639, cadence: 1.006, speed: 0.997, damage: 1, telegraphMultiplier: 0.994, surpriseChance: 0.139, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.299, cadence: 0.839, speed: 1.102, damage: 1.14, telegraphMultiplier: 0.91, surpriseChance: 0.241, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0, cadence: 0.71, speed: 1.191, damage: 1.26, telegraphMultiplier: 0.838, surpriseChance: 0.341, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { combatIdentity: "Крюк серпа", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.022, telegraphMs: 859, speedMultiplier: 0.931, damageMultiplier: 0.94, speedVariance: [0.87, 0.94, 1.01, 1.08, 1.15] },
		enem2: { combatIdentity: "Три зубца вил", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.86, telegraphMs: 731, speedMultiplier: 1.071, damageMultiplier: 0.87, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25] },
		enem3: { combatIdentity: "Загребание зубьев", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'pause', cadence: 1.221, telegraphMs: 961, speedMultiplier: 0.842, damageMultiplier: 1.13, speedVariance: [0.79, 0.89, 0.99, 1.09, 1.19] },
		enem4: { combatIdentity: "Ремень сноповязки", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'straight', cadence: 0.76, telegraphMs: 610, speedMultiplier: 1.2, damageMultiplier: 0.63, speedVariance: [0.91, 1.03, 1.15, 1.27, 1.39] },
		enem5: { combatIdentity: "Обратный зуб шестерни", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'weave', cadence: 0.731, telegraphMs: 631, speedMultiplier: 1.11, damageMultiplier: 1.06, speedVariance: [0.87, 0.98, 1.1, 1.22, 1.34] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl18/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Кривозуб',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Тройчатка',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '18%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Чесалка',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 30,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Скрипуха',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1550 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Шестерило',
		image: 'images/enemies/regions/2_zolot_polya/lvl18/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '30%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

// Урон унаследован от проверенного распределения уровней 16-17: та же лестница
// light/medium/heavy на удар базового урона, только образы и геометрия — новые.
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
let timeNextBoss = 14;
const bossInterval = 5;

// Уровень 18 — Жатвенные орудия. Архетипы: зигзаг серпа без стены / тройные уколы вил /
// асимметричные грабли с одного бока / частый дождь сноповязки сверху / финал скрещивает
// высоты флангов, смешивает почерк всех четверых и впервые перекрывает низ поля разом.
const bossAbilities = [
	// ===== Кривозуб =====
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 54, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 4 }, // 12 e
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 15 f
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 24 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 19 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 24 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 23 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 24 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 25 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 24 }, // 26 h

	// ===== Тройчатка =====
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 9 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 13 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 25 h
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 27 h
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 28 h

	// ===== Чесалка =====
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 24 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 24 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 14 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 18 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 22 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 18 }, // 26 h
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 20 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 29 h

	// ===== Скрипуха =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 6 c
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 9 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 10 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 13 e
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 14 e
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 15 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 17 f
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 21 g
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 30 h

	// ===== Шестерило =====
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 49, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 6 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 39, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 9 d
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 10 d
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 13 e
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 14 e
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 17 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 21 g
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 22 g
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 26 h
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 49, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 30 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 205, bossDelayAbDop: 6300, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 291, bossDelayAbDop: 4650, firstWaveDelayMs: 2232 }, // 
	{ boss: 'enem3', bossDelayAb: 172, bossDelayAbDop: 6901, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 230, bossDelayAbDop: 4500, firstWaveDelayMs: 2160 }, // 
	{ boss: 'enem5', bossDelayAb: 254, bossDelayAbDop: 4250, firstWaveDelayMs: 2040 }, // 
];

const bossAbilitiesDop = [
	// Кривозуб
	{ boss: 'enem1', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Крюк серпа — знакомство" },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [250, 250, 400], label: "Крюк серпа — иной конец" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 3, recoveryMs: 950, label: "Крюк серпа — завершение" },

	// Тройчатка
	{ boss: 'enem2', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [3, 4, 5], shotGapsMs: [550, 0] },
	{ boss: 'enem2', indexAbilities: [6, 7, 8] },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12] },
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 400, 250], openingOrder: 1, label: "Три зубца вил — знакомство" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24], signature: true, minPhase: 2, recoveryMs: 650, label: "Три зубца вил — иной конец" },
	{ boss: 'enem2', indexAbilities: [25, 26, 27, 28], signature: true, minPhase: 3, recoveryMs: 950, label: "Три зубца вил — завершение" },

	// Чесалка
	{ boss: 'enem3', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Загребание зубьев — знакомство" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Загребание зубьев — иной конец" },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 3, recoveryMs: 950, label: "Загребание зубьев — завершение" },

	// Скрипуха
	{ boss: 'enem4', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [3, 4, 5], shotGapsMs: [250, 250] },
	{ boss: 'enem4', indexAbilities: [6, 7, 8] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Ремень сноповязки — знакомство" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Ремень сноповязки — иной конец" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 3, recoveryMs: 950, label: "Ремень сноповязки — завершение" },

	// Шестерило
	{ boss: 'enem5', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [3, 4, 5] },
	{ boss: 'enem5', indexAbilities: [6, 7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Обратный зуб шестерни — знакомство" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Обратный зуб шестерни — иной конец" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 3, recoveryMs: 950, label: "Обратный зуб шестерни — завершение" },

];

// Лорные названия связок. Уровень 18 — ожившие орудия жатвы: Кривозуб (серп), Тройчатка
// (вилы), Чесалка (грабли), Скрипуха (сноповязка), Шестерило (машина-молотилка).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Серповый удар', variant2: 'Лезвие серпа', variant3: 'Серповая сила',
        variant4: 'Соломенная защита', variant5: 'Зигзаг серпа', variant6: 'Ржавчина серпа',
        variant7: 'Серповая мощь', variant8: 'Рукоять серпа', variant9: 'Зигзагующий взмах',
        variant10: 'Живучий Кривозуб', variant11: 'Цепкое лезвие', variant12: 'Взмах и в стерню',
        variant13: 'Крепкая рукоять', variant14: 'Неутомимый Кривозуб', variant15: 'Пружинистый зигзаг',
        variant16: 'Лезвие серпа вмиг', variant17: 'Серповая хватка', variant18: 'Кривой прищур',
        variant19: 'Мгновенный зигзаг', variant20: 'Полевой дух серпа', variant21: 'Стойкая рукоять',
        variant22: 'Юркий Кривозуб', variant23: 'Серповая стойкость', variant24: 'Чуткое лезвие',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикий зигзаг', variant27: 'Мощь ржавчины',
        variant28: 'Внезапный зигзаг', variant29: 'Каменное лезвие', variant30: 'Разросшийся зигзаг',
        variant31: 'Серповый рывок', variant32: 'Живучая рукоять', variant33: 'Неутомимый зигзаг',
        variant34: 'Серповая прыть', variant35: 'Серповая выносливость'
    },
    enem2: {
        variant1: 'Тройной укол', variant2: 'Зубец вил', variant3: 'Тройчатая сила',
        variant4: 'Защита черенка', variant5: 'Меткий тройной укол', variant6: 'Едкий навоз',
        variant7: 'Тройчатая мощь', variant8: 'Прочный черенок', variant9: 'Растущий сет уколов',
        variant10: 'Живучая Тройчатка', variant11: 'Цепкие зубцы', variant12: 'Укол и в стог',
        variant13: 'Толстый черенок', variant14: 'Неутомимая Тройчатка', variant15: 'Пружинистый черенок',
        variant16: 'Меткий зубец', variant17: 'Тройчатая хватка', variant18: 'Прищур перед уколом',
        variant19: 'Мгновенный тройной укол', variant20: 'Сенной дух', variant21: 'Стойкий черенок',
        variant22: 'Юркая Тройчатка', variant23: 'Тройчатая стойкость', variant24: 'Чуткие зубцы',
        variant25: 'Ускользающий укол', variant26: 'Дикий тройной укол', variant27: 'Мощь навоза',
        variant28: 'Внезапный сет уколов', variant29: 'Каменные зубцы', variant30: 'Разросшийся сет',
        variant31: 'Тройчатый рывок', variant32: 'Живучий черенок', variant33: 'Растущий сет вновь',
        variant34: 'Тройчатая прыть', variant35: 'Тройчатая выносливость'
    },
    enem3: {
        variant1: 'Чешущий удар', variant2: 'Зубец грабель', variant3: 'Чесальная сила',
        variant4: 'Защита грабель', variant5: 'Давление справа', variant6: 'Едкая солома',
        variant7: 'Чесальная мощь', variant8: 'Черенок грабель', variant9: 'Давящий напор с бока',
        variant10: 'Живучая Чесалка', variant11: 'Зубья грабель', variant12: 'Давление и в стерню',
        variant13: 'Толстый черенок', variant14: 'Неутомимая Чесалка', variant15: 'Пружинистые зубья',
        variant16: 'Меткий зубец', variant17: 'Чесальная хватка', variant18: 'Взгляд справа',
        variant19: 'Редкий укол слева', variant20: 'Соломенный дух', variant21: 'Стойкие зубья',
        variant22: 'Юркая Чесалка', variant23: 'Чесальная стойкость', variant24: 'Чуткие зубья',
        variant25: 'Ускользающее давление', variant26: 'Дикое давление', variant27: 'Мощь соломы',
        variant28: 'Внезапный укол слева', variant29: 'Зубья грабель-камень', variant30: 'Разросшееся давление',
        variant31: 'Чесальный рывок', variant32: 'Живучие зубья', variant33: 'Неутомимое давление',
        variant34: 'Чесальная прыть', variant35: 'Чесальная выносливость'
    },
    enem4: {
        variant1: 'Скрипящий удар', variant2: 'Обрывок жгута', variant3: 'Скрипучая сила',
        variant4: 'Жестяная защита', variant5: 'Обрывок сверху', variant6: 'Машинная смазка',
        variant7: 'Скрипучая мощь', variant8: 'Прочная жесть', variant9: 'Нервный дождь обрывков',
        variant10: 'Живучая Скрипуха', variant11: 'Цепкий жгут', variant12: 'Обрывок и в солому',
        variant13: 'Толстая жесть', variant14: 'Неутомимая Скрипуха', variant15: 'Пружинистый механизм',
        variant16: 'Меткий обрывок', variant17: 'Скрипучая хватка', variant18: 'Скрежещущий взгляд',
        variant19: 'Дождь обрывков вмиг', variant20: 'Машинный дух', variant21: 'Стойкая жесть',
        variant22: 'Юркая Скрипуха', variant23: 'Скрипучая стойкость', variant24: 'Чуткий механизм',
        variant25: 'Ускользающий обрывок', variant26: 'Дикий скрип', variant27: 'Мощь смазки',
        variant28: 'Внезапный дождь', variant29: 'Каменная жесть', variant30: 'Дождь обрывков разросся',
        variant31: 'Скрипучий рывок', variant32: 'Живучая жесть', variant33: 'Неутомимый дождь',
        variant34: 'Скрипучая прыть', variant35: 'Скрипучая выносливость'
    },
    enem5: {
        variant1: 'Шестерённый удар', variant2: 'Зуб шестерни', variant3: 'Шестерённая сила',
        variant4: 'Стальная защита', variant5: 'Поворот шестерни', variant6: 'Машинное масло',
        variant7: 'Шестерённая мощь', variant8: 'Прочная сталь', variant9: 'Скрещивающийся рывок',
        variant10: 'Живучее Шестерило', variant11: 'Зуб шестерни-крюк', variant12: 'Поворот и в низ поля',
        variant13: 'Толстая сталь', variant14: 'Неутомимое Шестерило', variant15: 'Пружина механизма',
        variant16: 'Меткий зуб', variant17: 'Шестерённая хватка', variant18: 'Механический взгляд',
        variant19: 'Перекрытие низа', variant20: 'Машинный дух', variant21: 'Стойкая сталь',
        variant22: 'Юркое Шестерило', variant23: 'Шестерённая стойкость', variant24: 'Чуткий механизм',
        variant25: 'Ускользающий поворот', variant26: 'Дикий поворот', variant27: 'Мощь масла',
        variant28: 'Внезапное перекрытие', variant29: 'Каменная сталь', variant30: 'Разросшийся механизм',
        variant31: 'Шестерённый рывок', variant32: 'Живучая сталь', variant33: 'Неутомимое скрещивание',
        variant34: 'Шестерённая прыть', variant35: 'Шестерённая выносливость'
    }
};
