let lvlNumber = 17;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 17 — «Стражи посевов», область II «Золотые поля».
// Пять архетипов без повторов: одиночные вылазки из борозды / колонна с одного бока /
// давление снизу редкими тяжёлыми ударами / только четыре угла поля / финал смешивает
// мотивы всех четверых и впервые на уровне закрывает всю нижнюю полосу разом.
const bossCombatConfig = {
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.921, damageMultiplier: 1.96, minWaveDelay: 2799, minShotDelay: 152, minTelegraphMs: 551,
	phases: [
		{ phase: 1, minHp: 0.649, cadence: 0.996, speed: 1.003, damage: 1, telegraphMultiplier: 1.006, surpriseChance: 0.131, maxActiveAttacks: 12 },
		{ phase: 2, minHp: 0.306, cadence: 0.849, speed: 1.089, damage: 1.13, telegraphMultiplier: 0.919, surpriseChance: 0.232, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0, cadence: 0.722, speed: 1.182, damage: 1.25, telegraphMultiplier: 0.849, surpriseChance: 0.331, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { combatIdentity: "Вылазка перепёлки", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'weave', cadence: 1.052, telegraphMs: 899, speedMultiplier: 0.901, damageMultiplier: 0.93, speedVariance: [0.88, 0.95, 1.02, 1.09, 1.16] },
		enem2: { combatIdentity: "Щёки с зерном", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.85, telegraphMs: 720, speedMultiplier: 1.082, damageMultiplier: 0.88, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] },
		enem3: { combatIdentity: "Выпад из норы", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.25, telegraphMs: 982, speedMultiplier: 0.821, damageMultiplier: 1.15, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] },
		enem4: { combatIdentity: "Треск и обратный щелчок", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'drift', cadence: 0.75, telegraphMs: 600, speedMultiplier: 1.22, damageMultiplier: 0.62, speedVariance: [0.9, 1.02, 1.14, 1.26, 1.38] },
		enem5: { combatIdentity: "Соломенный размах", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'straight', cadence: 0.722, telegraphMs: 619, speedMultiplier: 1.101, damageMultiplier: 1.05, speedVariance: [0.86, 0.97, 1.09, 1.21, 1.33] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Притайка',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/1.webp',
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
		dispName: 'Щекан',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 65,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Столбик',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Трещотник',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/4.webp',
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
		dispName: 'Шуршало',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/5.webp',
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

// Урон унаследован от проверенного распределения уровня 16: та же лестница
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
let timeNextBoss = 13;
const bossInterval = 5;

// Уровень 17 — Стражи посевов. Архетипы: одиночные вылазки из борозды / колонна мешков
// с одного бока / давление снизу редкими тяжёлыми ударами / только четыре угла поля /
// финал смешивает почерк всех четверых и впервые перекрывает всю нижнюю полосу разом.
const bossAbilities = [
	// ===== Притайка =====
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 2 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 4 c
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 43, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 5 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 7 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 43, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 8 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 10 e
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 11 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 12 e
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 24 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 14 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 15 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 23 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 40, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 18 g
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 19 g
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 22 h
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 23 h
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 24 h
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 22 }, // 25 h

	// ===== Щекан =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 2 b
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 4 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 5 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 7 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 8 d
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 9 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 11 e
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 12 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 13 e
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 15 f
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 19 g
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 20 g
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, // 23 h
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 24 h
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 25 h
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 19 }, // 26 h

	// ===== Столбик =====
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 22 }, // 2 b
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 4 c
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 5 c
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 7 d
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 8 d
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 9 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 10 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 11 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 12 e
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 13 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 14 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 15 f
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 16 g
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 17 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 26 }, // 18 g
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 21 }, // 19 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 23 }, // 20 h
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 25 }, // 21 h
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 27 }, // 22 h

	// ===== Трещотник =====
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 6 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 10 d
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 14 e
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 15 e
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 26 h
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 29 h

	// ===== Шуршало =====
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 43, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 6 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 43, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 6 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 52, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 6 c
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 10 d
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 14 e
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 22 g
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 26 h
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 50, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 27 h
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 29 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 334, bossDelayAbDop: 6400, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 299, bossDelayAbDop: 4701, firstWaveDelayMs: 2256 }, // 
	{ boss: 'enem3', bossDelayAb: 282, bossDelayAbDop: 7001, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 241, bossDelayAbDop: 4600, firstWaveDelayMs: 2208 }, // 
	{ boss: 'enem5', bossDelayAb: 261, bossDelayAbDop: 4300, firstWaveDelayMs: 2064 }, // 
];

const bossAbilitiesDop = [
	// Притайка
	{ boss: 'enem1', indexAbilities: [0, 1], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Вылазка перепёлки — знакомство" },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 2, recoveryMs: 650, label: "Вылазка перепёлки — иной конец" },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 3, recoveryMs: 950, label: "Вылазка перепёлки — завершение" },

	// Щекан
	{ boss: 'enem2', indexAbilities: [0, 1], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Щёки с зерном — знакомство" },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 2, recoveryMs: 650, label: "Щёки с зерном — иной конец" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [700, 700, 250], label: "Щёки с зерном — завершение" },

	// Столбик
	{ boss: 'enem3', indexAbilities: [0, 1], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [13, 14, 15], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Выпад из норы — знакомство" },
	{ boss: 'enem3', indexAbilities: [16, 17, 18], signature: true, minPhase: 2, recoveryMs: 650, label: "Выпад из норы — иной конец" },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 3, recoveryMs: 950, label: "Выпад из норы — завершение" },

	// Трещотник
	{ boss: 'enem4', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [3, 4, 5], shotGapsMs: [350, 0] },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9], shotGapsMs: [250, 250, 400] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Треск и обратный щелчок — знакомство" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Треск и обратный щелчок — иной конец" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 3, recoveryMs: 950, label: "Треск и обратный щелчок — завершение" },

	// Шуршало
	{ boss: 'enem5', indexAbilities: [0, 1, 2], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [3, 4, 5] },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1, label: "Соломенный размах — знакомство" },
	{ boss: 'enem5', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 2, recoveryMs: 650, label: "Соломенный размах — иной конец" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 3, recoveryMs: 950, label: "Соломенный размах — завершение" },

];

// Лорные названия связок. Уровень 17 — полевая живность: Притайка (перепёлка в
// борозде), Щекан (хомяк с мешками), Столбик (суслик-часовой), Трещотник (трещотка),
// Шуршало (пугало).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Затаившийся удар', variant2: 'Клюв из борозды', variant3: 'Затаившаяся сила',
        variant4: 'Пёстрая защита', variant5: 'Меткая вылазка', variant6: 'Укол из укрытия',
        variant7: 'Затаившаяся мощь', variant8: 'Плотное оперение', variant9: 'Редкая точная вылазка',
        variant10: 'Живучая Притайка', variant11: 'Цепкий коготок', variant12: 'Вылазка и в борозду',
        variant13: 'Крепкое оперение', variant14: 'Ожидание в борозде', variant15: 'Пружинистый выскок',
        variant16: 'Меткий выскок', variant17: 'Затаившаяся хватка', variant18: 'Взгляд из борозды',
        variant19: 'Мгновенная вылазка', variant20: 'Полевой дух', variant21: 'Стойкое оперение',
        variant22: 'Юркая Притайка', variant23: 'Затаившаяся стойкость', variant24: 'Ухо в борозде',
        variant25: 'Ускользающая в борозду', variant26: 'Дикая вылазка', variant27: 'Мощь укола',
        variant28: 'Внезапная вылазка', variant29: 'Каменное терпение', variant30: 'Разросшееся укрытие',
        variant31: 'Затаившийся рывок', variant32: 'Живучее оперение', variant33: 'Неутомимая вылазка',
        variant34: 'Затаившаяся прыть', variant35: 'Затаившаяся выносливость'
    },
    enem2: {
        variant1: 'Мешковый удар', variant2: 'Острый резец', variant3: 'Хомячья сила',
        variant4: 'Мешковатая защита', variant5: 'Бросок мешка', variant6: 'Пыль зерна',
        variant7: 'Хомячья мощь', variant8: 'Плотный мешок', variant9: 'Колонна волочения',
        variant10: 'Живучий Щекан', variant11: 'Лапки-мешочки', variant12: 'Бросок и в нору',
        variant13: 'Щёки-мешки', variant14: 'Неутомимый хомяк', variant15: 'Рывок с мешком',
        variant16: 'Меткий резец', variant17: 'Хомячья хватка', variant18: 'Жадный взгляд',
        variant19: 'Мгновенный бросок мешка', variant20: 'Зерновой дух', variant21: 'Стойкие щёки',
        variant22: 'Юркий Щекан', variant23: 'Хомячья стойкость', variant24: 'Чуткие щёки',
        variant25: 'Ускользающий с добычей', variant26: 'Дикая жадность', variant27: 'Мощь пыли',
        variant28: 'Внезапный бросок', variant29: 'Каменные закрома', variant30: 'Разросшиеся закрома',
        variant31: 'Хомячий рывок', variant32: 'Живучие щёки', variant33: 'Неутомимая колонна',
        variant34: 'Хомячья прыть', variant35: 'Хомячья выносливость'
    },
    enem3: {
        variant1: 'Стоечный удар', variant2: 'Резец суслика', variant3: 'Стоечная сила',
        variant4: 'Защита норы', variant5: 'Удар из стойки', variant6: 'Писк тревоги',
        variant7: 'Стоечная мощь', variant8: 'Нора-щит', variant9: 'Давление снизу',
        variant10: 'Живучий Столбик', variant11: 'Цепкие коготки', variant12: 'Удар и в нору',
        variant13: 'Крепкая нора', variant14: 'Неутомимая стойка', variant15: 'Стойка столбиком',
        variant16: 'Меткий резец', variant17: 'Стоечная хватка', variant18: 'Взгляд с холмика',
        variant19: 'Удар из стойки вмиг', variant20: 'Дух норы', variant21: 'Стойкая нора',
        variant22: 'Юркий Столбик', variant23: 'Стоечная стойкость', variant24: 'Чуткий писк',
        variant25: 'Ускользающий в нору', variant26: 'Дикий писк', variant27: 'Мощь резца',
        variant28: 'Внезапный удар снизу', variant29: 'Каменная нора', variant30: 'Разросшаяся нора',
        variant31: 'Стоечный рывок', variant32: 'Живучая нора', variant33: 'Неутомимое давление',
        variant34: 'Стоечная прыть', variant35: 'Стоечная выносливость'
    },
    enem4: {
        variant1: 'Трещащий удар', variant2: 'Щепка трещотки', variant3: 'Трещащая сила',
        variant4: 'Деревянная защита', variant5: 'Меткий треск', variant6: 'Едкий скрип',
        variant7: 'Трещащая мощь', variant8: 'Дерево трещотки', variant9: 'Щелчок из угла',
        variant10: 'Живучий Трещотник', variant11: 'Цепкая щепка', variant12: 'Треск и в угол',
        variant13: 'Толстое дерево', variant14: 'Неутомимый треск', variant15: 'Пружинистая трещотка',
        variant16: 'Меткая щепка', variant17: 'Трещащая хватка', variant18: 'Дребезжащий взгляд',
        variant19: 'Мгновенный треск', variant20: 'Деревянный дух', variant21: 'Стойкое дерево',
        variant22: 'Юркий Трещотник', variant23: 'Трещащая стойкость', variant24: 'Чуткий скрип',
        variant25: 'Ускользающий треск', variant26: 'Треск из всех углов', variant27: 'Мощь скрипа',
        variant28: 'Внезапный треск', variant29: 'Каменная трещотка', variant30: 'Разросшийся треск',
        variant31: 'Трещащий рывок', variant32: 'Живучее дерево', variant33: 'Неутомимый щелчок',
        variant34: 'Трещащая прыть', variant35: 'Трещащая выносливость'
    },
    enem5: {
        variant1: 'Шуршащий удар', variant2: 'Острая солома', variant3: 'Шуршащая сила',
        variant4: 'Мешковинная защита', variant5: 'Взмах рукава', variant6: 'Запах гнилой соломы',
        variant7: 'Шуршащая мощь', variant8: 'Плотная мешковина', variant9: 'Закрытие зоны',
        variant10: 'Живучее Шуршало', variant11: 'Цепкая солома', variant12: 'Взмах и в поле',
        variant13: 'Толстая мешковина', variant14: 'Неутомимое Шуршало', variant15: 'Пружинистый шест',
        variant16: 'Меткая солома', variant17: 'Шуршащая хватка', variant18: 'Взгляд из-под шляпы',
        variant19: 'Мгновенное закрытие', variant20: 'Соломенный дух', variant21: 'Стойкая мешковина',
        variant22: 'Юркое Шуршало', variant23: 'Шуршащая стойкость', variant24: 'Чуткий шелест',
        variant25: 'Ускользающее в поле', variant26: 'Дикий шелест', variant27: 'Мощь гнили',
        variant28: 'Закрытие зоны вмиг', variant29: 'Каменный шест', variant30: 'Разросшаяся солома',
        variant31: 'Шуршащий рывок', variant32: 'Живучая мешковина', variant33: 'Неутомимое закрытие',
        variant34: 'Шуршащая прыть', variant35: 'Шуршащая выносливость'
    }
};
