let lvlNumber = 21;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 21 — «Душистый сенокос», область II «Золотые поля».
// Пять архетипов: зигзаг косы без нижней стены / симметричные взмахи грабельных
// рук с флангов / редкие тяжёлые удары копны с долгой паузой / направленный
// пролёт перегруженного воза / финал смешивает почерк всех четверых и впервые
// перекрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.861, damageMultiplier: 1.599, minWaveDelay: 2797, minShotDelay: 139, minTelegraphMs: 524,
	phases: [
		{ phase: 1, minHp: 0.642, cadence: 1.008, speed: 0.995, damage: 1, telegraphMultiplier: 1.008, surpriseChance: 0.159, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.303, cadence: 0.811, speed: 1.119, damage: 1.17, telegraphMultiplier: 0.892, surpriseChance: 0.269, maxActiveAttacks: 22 },
		{ phase: 3, minHp: 0, cadence: 0.681, speed: 1.21, damage: 1.29, telegraphMultiplier: 0.811, surpriseChance: 0.371, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "Первый покос", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'straight', cadence: 1.029, telegraphMs: 862, speedMultiplier: 0.929, damageMultiplier: 0.93, speedVariance: [0.87, 0.94, 1.01, 1.08, 1.15] },
		enem2: { combatIdentity: "Обратный взмах ворошилки", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'weave', cadence: 0.891, telegraphMs: 729, speedMultiplier: 1.069, damageMultiplier: 0.89, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] },
		enem3: { combatIdentity: "Сено и скрытый ком", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.19, telegraphMs: 991, speedMultiplier: 0.84, damageMultiplier: 1.19, speedVariance: [0.75, 0.85, 0.97, 1.09, 1.21] },
		enem4: { combatIdentity: "Тележный толчок", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'pause', cadence: 0.852, telegraphMs: 645, speedMultiplier: 1.139, damageMultiplier: 0.66, speedVariance: [0.88, 0.99, 1.1, 1.21, 1.32] },
		enem5: { combatIdentity: "Вторая коса после первой", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'drift', cadence: 0.73, telegraphMs: 625, speedMultiplier: 1.16, damageMultiplier: 1.09, speedVariance: [0.81, 0.94, 1.07, 1.2, 1.33] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl21/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Космаль',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/1.webp',
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
		dispName: 'Ворошень',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Копнуша',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Возило',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 38,
		size: '25%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Двукос',
		image: 'images/enemies/regions/2_zolot_polya/lvl21/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '29%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

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
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.62)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 17;
const bossInterval = 5;

const bossAbilities = [
	// ===== Космаль =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 23 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 17 e
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 23 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 25 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 23 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 27 h
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 28 h
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 29 h
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 30 h

	// ===== Ворошень =====
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 7 c
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 8 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 11 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 12 d
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 13 d
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 15 e
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 16 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 19 f
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 20 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 21 f
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 24 g
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 25 g
	{ boss: 'enem2', type: 'enem22', xPos: 67, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 27 g
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 28 h
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 29 h
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 30 h
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 31 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 32 h

	// ===== Копнуша =====
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 11 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 6 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 15 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 6 }, // 16 e
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 19 f
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 20 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 21 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 23 g
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 24 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 25 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 17 }, // 27 h
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 19 }, // 28 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 29 h
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 30 h

	// ===== Возило =====
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 41, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 37, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 41, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 31 h

	// ===== Двукос =====
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 31 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 204, bossDelayAbDop: 5355, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 292, bossDelayAbDop: 5487, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 176, bossDelayAbDop: 5864, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 239, bossDelayAbDop: 5290, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 259, bossDelayAbDop: 4946, firstWaveDelayMs: 2374 }, // 
];

const bossAbilitiesDop = [
	// Космаль
	{ boss: 'enem1', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [3, 4, 5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14] },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Первый покос — знакомство" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, label: "Первый покос — иной конец" },
	{ boss: 'enem1', indexAbilities: [27, 28, 29, 30], signature: true, minPhase: 3, recoveryMs: 950, label: "Первый покос — завершение" },

	// Ворошень
	{ boss: 'enem2', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9], shotGapsMs: [250, 250, 250] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem2', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [550, 250, 250, 0], openingOrder: 1, label: "Обратный взмах ворошилки — знакомство" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Обратный взмах ворошилки — иной конец" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 250, 250], label: "Обратный взмах ворошилки — завершение" },

	// Копнуша
	{ boss: 'enem3', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [3, 4, 5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14] },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Сено и скрытый ком — знакомство" },
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, label: "Сено и скрытый ком — иной конец" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30], signature: true, minPhase: 3, recoveryMs: 950, label: "Сено и скрытый ком — завершение" },

	// Возило
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Тележный толчок — знакомство" },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 2, recoveryMs: 650, label: "Тележный толчок — иной конец" },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, label: "Тележный толчок — завершение" },

	// Двукос
	{ boss: 'enem5', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [3, 4, 5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14], shotGapsMs: [0, 0, 700] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Вторая коса после первой — знакомство" },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [400, 700, 0], label: "Вторая коса после первой — иной конец" },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 550, 550], label: "Вторая коса после первой — завершение" },

];

// Лорные названия связок. Уровень 21 — сенокос: Космаль (косматая коса), Ворошень
// (грабли-ворошилка), Копнуша (стог), Возило (телега с сеном), Двукос (двойная коса).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Косматый удар', variant2: 'Лезвие косы', variant3: 'Косматая сила',
        variant4: 'Соломенная грива', variant5: 'Зигзаг косы', variant6: 'Сок травы',
        variant7: 'Косматая мощь', variant8: 'Плотная грива', variant9: 'Зигзаг без опоры',
        variant10: 'Живучий Космаль', variant11: 'Цепкая грива', variant12: 'Взмах и в стог',
        variant13: 'Толстая грива', variant14: 'Неутомимый Космаль', variant15: 'Пружинистая коса',
        variant16: 'Меткое лезвие', variant17: 'Косматая хватка', variant18: 'Взгляд из-под гривы',
        variant19: 'Мгновенный зигзаг', variant20: 'Травяной дух', variant21: 'Стойкая грива',
        variant22: 'Юркий Космаль', variant23: 'Косматая стойкость', variant24: 'Чуткая грива',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикий зигзаг', variant27: 'Мощь сока',
        variant28: 'Внезапный зигзаг', variant29: 'Каменная грива', variant30: 'Разросшаяся грива',
        variant31: 'Косматый рывок', variant32: 'Живучая грива', variant33: 'Зигзаг косы вновь',
        variant34: 'Косматая прыть', variant35: 'Косматая выносливость'
    },
    enem2: {
        variant1: 'Ворошащий удар', variant2: 'Грабельные пальцы', variant3: 'Ворошащая сила',
        variant4: 'Сенная защита', variant5: 'Симметричный взмах рук', variant6: 'Едкое сено',
        variant7: 'Ворошащая мощь', variant8: 'Плотное сено', variant9: 'Парный взмах с флангов',
        variant10: 'Живучий Ворошень', variant11: 'Пальцы-грабли', variant12: 'Взмах и в стог',
        variant13: 'Толстое сено', variant14: 'Неутомимый Ворошень', variant15: 'Пружинистые руки',
        variant16: 'Меткий палец', variant17: 'Ворошащая хватка', variant18: 'Взгляд из сена',
        variant19: 'Мгновенный взмах', variant20: 'Сенной дух', variant21: 'Стойкое сено',
        variant22: 'Юркий Ворошень', variant23: 'Ворошащая стойкость', variant24: 'Чуткие пальцы',
        variant25: 'Ускользающий взмах', variant26: 'Дикий взмах', variant27: 'Мощь сена',
        variant28: 'Симметричный взмах вмиг', variant29: 'Каменное сено', variant30: 'Разросшееся сено',
        variant31: 'Ворошащий рывок', variant32: 'Живучие пальцы', variant33: 'Неутомимая симметрия',
        variant34: 'Ворошащая прыть', variant35: 'Ворошащая выносливость'
    },
    enem3: {
        variant1: 'Стоговой удар', variant2: 'Острая соломинка', variant3: 'Стоговая сила',
        variant4: 'Защита стога', variant5: 'Меткий тяжёлый удар', variant6: 'Едкая труха',
        variant7: 'Стоговая мощь', variant8: 'Плотный стог', variant9: 'Долгая пауза перед ударом',
        variant10: 'Живучая Копнуша', variant11: 'Солома стога', variant12: 'Удар и в труху',
        variant13: 'Толстый стог', variant14: 'Неутомимая Копнуша', variant15: 'Пружинистый стог',
        variant16: 'Меткая соломинка', variant17: 'Стоговая хватка', variant18: 'Дремлющий взгляд',
        variant19: 'Тяжёлый удар вмиг', variant20: 'Сенной дух стога', variant21: 'Стойкий стог',
        variant22: 'Юркая Копнуша', variant23: 'Стоговая стойкость', variant24: 'Чуткая труха',
        variant25: 'Ускользающая солома', variant26: 'Дикий стог', variant27: 'Мощь трухи',
        variant28: 'Внезапный тяжёлый удар', variant29: 'Каменный стог', variant30: 'Разросшийся стог',
        variant31: 'Стоговой рывок', variant32: 'Живучий стог', variant33: 'Пауза-удар вновь',
        variant34: 'Стоговая прыть', variant35: 'Стоговая выносливость'
    },
    enem4: {
        variant1: 'Возовый удар', variant2: 'Спица колеса', variant3: 'Возовая сила',
        variant4: 'Дощатая защита', variant5: 'Пролёт телеги', variant6: 'Дёготь оси',
        variant7: 'Возовая мощь', variant8: 'Прочные доски', variant9: 'Чёткий вход и выход',
        variant10: 'Живучее Возило', variant11: 'Цепкая ось', variant12: 'Пролёт и в сено',
        variant13: 'Толстые доски', variant14: 'Неутомимое Возило', variant15: 'Пружинистые рессоры',
        variant16: 'Меткая спица', variant17: 'Возовая хватка', variant18: 'Взгляд с телеги',
        variant19: 'Мгновенный пролёт', variant20: 'Дегтярный дух', variant21: 'Стойкие доски',
        variant22: 'Юркое Возило', variant23: 'Возовая стойкость', variant24: 'Чуткая ось',
        variant25: 'Ускользающий пролёт', variant26: 'Дикий пролёт', variant27: 'Мощь дёгтя',
        variant28: 'Направленный пролёт вмиг', variant29: 'Каменные доски', variant30: 'Разросшаяся телега',
        variant31: 'Возовый рывок', variant32: 'Живучие доски', variant33: 'Вход-выход вновь',
        variant34: 'Возовая прыть', variant35: 'Возовая выносливость'
    },
    enem5: {
        variant1: 'Двойной удар косы', variant2: 'Два лезвия', variant3: 'Двукосая сила',
        variant4: 'Двойная защита', variant5: 'Заход с двух флангов', variant6: 'Сок двух кос',
        variant7: 'Двукосая мощь', variant8: 'Двойная грива', variant9: 'Двойной зигзаг сразу',
        variant10: 'Живучий Двукос', variant11: 'Две цепкие косы', variant12: 'Двойной взмах и в стог',
        variant13: 'Двойная толщина', variant14: 'Неутомимый Двукос', variant15: 'Двойная пружинистая коса',
        variant16: 'Два метких лезвия', variant17: 'Двукосая хватка', variant18: 'Двойной взгляд',
        variant19: 'Мгновенный двойной зигзаг', variant20: 'Двойной травяной дух', variant21: 'Двойная стойкость',
        variant22: 'Юркий Двукос', variant23: 'Двукосая стойкость', variant24: 'Двойная чуткость',
        variant25: 'Двойной зигзаг ускользает', variant26: 'Дикий двойной зигзаг', variant27: 'Мощь двух лезвий',
        variant28: 'Заход с обоих флангов', variant29: 'Двойная каменная грива', variant30: 'Две гривы разрослись',
        variant31: 'Двукосый рывок', variant32: 'Живучие две косы', variant33: 'Двойной зигзаг вновь',
        variant34: 'Двукосая прыть', variant35: 'Двукосая выносливость'
    }
};
