let lvlNumber = 25;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 25 — финал области II «Золотые поля». Это не пять разных тварей,
// а одна сущность — Полудница — в пяти нарастающих обликах: от простого
// зноя над бороздой до полностью раскрытого истинного облика. Слово
// «Полудница» есть в каждом имени, чтобы сразу было ясно, что это один
// и тот же противник, но эпитет перед ним меняется по явлению, а не по
// формуле «злая / очень злая / взбешенная» (зной → марево → угли → венец).
const bossCombatConfig = {
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.72, damageMultiplier: 1.44, minWaveDelay: 3200, minShotDelay: 129, minTelegraphMs: 501,
	phases: [
		{ phase: 1, minHp: 0.653, cadence: 1.011, speed: 0.992, damage: 1, telegraphMultiplier: 0.989, surpriseChance: 0.158, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.297, cadence: 0.778, speed: 1.139, damage: 1.18, telegraphMultiplier: 0.882, surpriseChance: 0.289, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0, cadence: 0.642, speed: 1.239, damage: 1.32, telegraphMultiplier: 0.802, surpriseChance: 0.399, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "Серп в полуденном мареве", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'drift', cadence: 1.003, telegraphMs: 902, speedMultiplier: 0.899, damageMultiplier: 0.95, speedVariance: [0.86, 0.94, 1.02, 1.1, 1.18], healthMultiplier: 1.5, phaseMessages: {"2":"ЗНОЙ СВОДИТ С УМА", "3":"МАРЕВО ГУСТЕЕТ УГРОЗОЙ"} },
		enem2: { combatIdentity: "Отражённый замах", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'weave', cadence: 0.88, telegraphMs: 871, speedMultiplier: 1.2, damageMultiplier: 0.92, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.3], healthMultiplier: 1.5, appearMessage: "ДВОИТСЯ ОТ ЗЛОБЫ", phaseMessages: {"2":"ОТРАЖЕНИЯ ОБЕЗУМЕЛИ", "3":"МАРЕВО ЖАЖДЕТ ДОБЫЧИ"} },
		enem3: { combatIdentity: "Жар между борозд", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.22, telegraphMs: 1081, speedMultiplier: 1.101, damageMultiplier: 1.22, speedVariance: [0.75, 0.86, 0.98, 1.1, 1.22], healthMultiplier: 1.5, appearMessage: "УГЛИ ПЫШУТ ЖАРОМ", phaseMessages: {"2":"УГЛИ РАЗГОРАЮТСЯ СИЛЬНЕЕ", "3":"ГОРИТ БЕЗ ПОЩАДЫ"} },
		enem4: { combatIdentity: "Венец раскрывается", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.74, telegraphMs: 681, speedMultiplier: 1.202, damageMultiplier: 0.68, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.3], healthMultiplier: 1.5, appearMessage: "ВЕНЕЦ ПЫЛАЕТ ЗЛОБОЙ", phaseMessages: {"2":"ВЕНЕЦ ПЫШЕТ ЖАРОМ", "3":"ВЕНЕЦ ГОРИТ БЕЗ ПОЩАДЫ"} },
		enem5: { combatIdentity: "Последний солнечный обман", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'pause', cadence: 0.68, telegraphMs: 699, speedMultiplier: 1.201, damageMultiplier: 1.16, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.3], healthMultiplier: 1.5, appearMessage: "ЯВИЛА ИСТИННЫЙ ГНЕВ", phaseMessages: {"2":"ЗНОЙ СТАНОВИТСЯ НЕСТЕРПИМЫМ", "3":"ПОЛДЕНЬ ПЫЛАЕТ БЕЗ ПОЩАДЫ"} }
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Золотые поля» пройдена!'
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl25/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '25%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Маревая Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Жаровая Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Венценосная Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Истинная Полудница',
		image: 'images/enemies/regions/2_zolot_polya/lvl25/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '35%',
        deathAnimation: { preset: 'heavySink', durationMs: 1600 }
	}
};

// Урон по проверенной лестнице light/medium/heavy — та же, что и на соседних уровнях.
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
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.63)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 12;
const bossInterval = 6;

// Уровень 25 — Полудница, финал области «Золотые поля». Архетипы: зигзаг марева
// без нижней стены / симметричные удары-двойники / редкие тяжёлые вспышки углей
// с долгой паузой / нервные лучи только из углов / истинный облик сводит воедино
// приёмы всех четырёх и впервые перекрывает всю нижнюю полосу разом.
const bossAbilities = [
	// ===== Полудница =====
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 8 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 39, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 39, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 15 e
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 16 e
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 19 f
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 20 f
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 21 f
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 23 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 24 g
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 25 h
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 26 h
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 27 h

	// ===== Маревая Полудница =====
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 34, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 34, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 35, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 35 h
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 36, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 39 h

	// ===== Жаровая Полудница =====
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 79, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 34, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 77, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 16 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14 }, // 38 h
	{ boss: 'enem3', type: 'enem33', xPos: 77, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 15 }, // 39 h

	// ===== Венценосная Полудница =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 18 f
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 19 f
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 22 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 23 g
	{ boss: 'enem4', type: 'enem44', xPos: 36, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 27 h
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 28 h
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 29 h

	// ===== Истинная Полудница =====
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 37, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 79, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 39, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 74, yPos: 33, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 35 h
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 38 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 210, bossDelayAbDop: 6806, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 278, bossDelayAbDop: 7200, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 173, bossDelayAbDop: 5780, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 225, bossDelayAbDop: 5175, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 253, bossDelayAbDop: 8200, firstWaveDelayMs: 2263 }, // 
];

const bossAbilitiesDop = [
	// Полудница
	{ boss: 'enem1', indexAbilities: [0, 1, 2], shotGapsMs: [0, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [3, 4, 5], shotGapsMs: [150, 700] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8], shotGapsMs: [900, 150] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12], shotGapsMs: [700, 250, 700] },
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [700, 250, 700], openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 550, 550], openingOrder: 1, label: "Серп в полуденном мареве — знакомство" },
	{ boss: 'enem1', indexAbilities: [22, 23, 24], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [250, 900], label: "Серп в полуденном мареве — иной конец" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [250, 550], label: "Серп в полуденном мареве — завершение" },

	// Маревая Полудница
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [250, 0, 550, 550], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [550, 550, 550, 0] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [550, 550, 550, 550] },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [250, 550, 0, 550] },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [250, 550, 550, 0], openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [550, 550, 550, 0], openingOrder: 1, label: "Отражённый замах — знакомство" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 250, 550, 0], label: "Отражённый замах — иной конец" },
	{ boss: 'enem2', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [250, 0, 550, 550], label: "Отражённый замах — завершение" },

	// Жаровая Полудница
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [550, 250, 550, 250], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [550, 250, 0, 250] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 550, 550, 250] },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 550, 550, 250] },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [550, 0, 250, 550], openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 550, 550, 250], openingOrder: 1, label: "Жар между борозд — знакомство" },
	{ boss: 'enem3', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [550, 250, 250, 550], label: "Жар между борозд — иной конец" },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [550, 0, 250, 550], label: "Жар между борозд — завершение" },

	// Венценосная Полудница
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [400, 700, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7], shotGapsMs: [700, 0, 250] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11], shotGapsMs: [400, 400, 0] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15], shotGapsMs: [400, 700, 250] },
	{ boss: 'enem4', indexAbilities: [16, 17], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [550], openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [400, 400, 0], openingOrder: 1, label: "Венец раскрывается — знакомство" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [550, 250, 250, 250], label: "Венец раскрывается — иной конец" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [450, 350], label: "Венец раскрывается — завершение" },

	// Истинная Полудница
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [550, 550, 250, 550], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 250, 550, 250] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [550, 250, 550, 250] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [550, 550, 250, 550] },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [250, 250, 250, 550], openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [550, 550, 250, 550], openingOrder: 1, label: "Последний солнечный обман — знакомство" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 250, 250, 550], label: "Последний солнечный обман — иной конец" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [250, 250, 0], label: "Последний солнечный обман — завершение" },

];

// Лорные названия связок. Уровень 25 — Полудница (одна сущность, 5 нарастающих
// стадий): от полуденного зноя до истинного облика — тот же принцип эскалации, что у
// Бабы-Яги на уровне 15, свой словарь на каждую стадию.
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Полуденный удар', variant2: 'Острый серп', variant3: 'Полуденная сила',
        variant4: 'Льняная защита', variant5: 'Взмах серпа', variant6: 'Едкий зной',
        variant7: 'Полуденная мощь', variant8: 'Плотный лён', variant9: 'Стремительный зной',
        variant10: 'Живучая Полудница', variant11: 'Цепкий серп', variant12: 'Взмах и в марево',
        variant13: 'Толстый лён', variant14: 'Неутомимая Полудница', variant15: 'Шаг в мареве',
        variant16: 'Меткий серп', variant17: 'Полуденная хватка', variant18: 'Взгляд полдня',
        variant19: 'Мгновенный зной', variant20: 'Полевой полуденный дух', variant21: 'Стойкий к зною лён',
        variant22: 'Юркая в мареве', variant23: 'Полуденная стойкость', variant24: 'Чуткая к жаре',
        variant25: 'Ускользающая в зное', variant26: 'Дикий зной', variant27: 'Мощь серпа',
        variant28: 'Внезапный зной', variant29: 'Стойкость к жаре', variant30: 'Разросшееся марево',
        variant31: 'Полуденный рывок', variant32: 'Живучий лён', variant33: 'Неутомимый зной',
        variant34: 'Полуденная прыть', variant35: 'Полуденная выносливость'
    },
    enem2: {
        variant1: 'Марный удар', variant2: 'Дрожащий серп', variant3: 'Марная сила',
        variant4: 'Дымчатая защита', variant5: 'Бросок сквозь марево', variant6: 'Зелье зноя',
        variant7: 'Марная мощь', variant8: 'Струящаяся защита', variant9: 'Мерцающий рывок',
        variant10: 'Живучее марево', variant11: 'Цепкая дымка', variant12: 'Бросок и в дрожь воздуха',
        variant13: 'Плотная дымка', variant14: 'Неутомимое марево', variant15: 'Струящийся шаг',
        variant16: 'Меткий мираж', variant17: 'Марная хватка', variant18: 'Двоящийся взгляд',
        variant19: 'Мгновенное мерцание', variant20: 'Дух миража', variant21: 'Дымка не развеивается',
        variant22: 'Юркая в мареве', variant23: 'Марная стойкость', variant24: 'Дрожание воздуха',
        variant25: 'Ускользающий мираж', variant26: 'Дикое мерцание', variant27: 'Обманчивая мощь',
        variant28: 'Внезапный мираж', variant29: 'Каменное марево', variant30: 'Разросшееся мерцание',
        variant31: 'Марный рывок', variant32: 'Живучая дымка', variant33: 'Неутомимое мерцание',
        variant34: 'Марная прыть', variant35: 'Марная выносливость'
    },
    enem3: {
        variant1: 'Жаровой удар', variant2: 'Раскалённый серп', variant3: 'Жаровая сила',
        variant4: 'Обугленная защита', variant5: 'Огненный взмах', variant6: 'Кипящий зной',
        variant7: 'Жаровая мощь', variant8: 'Пылающая защита', variant9: 'Обжигающий рывок',
        variant10: 'Живучий жар', variant11: 'Раскалённая хватка серпа', variant12: 'Взмах и в пекло',
        variant13: 'Плотное пламя', variant14: 'Неутомимый жар', variant15: 'Огненный шаг',
        variant16: 'Меткий уголь', variant17: 'Жаровая хватка', variant18: 'Испепеляющий взгляд',
        variant19: 'Мгновенный жар', variant20: 'Дух пекла', variant21: 'Стойкая к огню броня',
        variant22: 'Юркая в пламени', variant23: 'Жаровая стойкость', variant24: 'Чуткая к искре',
        variant25: 'Ускользающее пламя', variant26: 'Дикий жар', variant27: 'Кипящая мощь',
        variant28: 'Внезапное пекло', variant29: 'Каменный жар', variant30: 'Разросшееся пламя',
        variant31: 'Жаровой рывок', variant32: 'Живучее пламя', variant33: 'Неутомимое пекло',
        variant34: 'Жаровая прыть', variant35: 'Жаровая выносливость'
    },
    enem4: {
        variant1: 'Венценосный удар', variant2: 'Золотой серп', variant3: 'Венценосная сила',
        variant4: 'Царственная защита', variant5: 'Царский взмах', variant6: 'Венец зноя',
        variant7: 'Венценосная мощь', variant8: 'Сияющая защита', variant9: 'Царственный рывок',
        variant10: 'Живучая корона', variant11: 'Хватка золотого серпа', variant12: 'Взмах и в свиту зноя',
        variant13: 'Плотная корона', variant14: 'Неутомимая венценосная', variant15: 'Величавый шаг',
        variant16: 'Меткий венец', variant17: 'Венценосная хватка', variant18: 'Властный взгляд',
        variant19: 'Мгновенный царский удар', variant20: 'Дух владычицы полдня', variant21: 'Несокрушимая корона',
        variant22: 'Юркая при всей величавости', variant23: 'Венценосная стойкость', variant24: 'Чуткая к неповиновению',
        variant25: 'Ускользающая свита', variant26: 'Дикая власть', variant27: 'Мощь отравленного венца',
        variant28: 'Внезапный царский удар', variant29: 'Каменная корона', variant30: 'Разросшаяся власть',
        variant31: 'Венценосный рывок', variant32: 'Живучая корона', variant33: 'Неутомимая власть',
        variant34: 'Венценосная прыть', variant35: 'Венценосная выносливость'
    },
    enem5: {
        variant1: 'Истинный удар', variant2: 'Серп судьбы', variant3: 'Нечеловеческая сила',
        variant4: 'Пепельная защита', variant5: 'Смертельный взмах', variant6: 'Испепеляющий зной',
        variant7: 'Нечеловеческая мощь', variant8: 'Обугленная корона', variant9: 'Апокалиптический зной',
        variant10: 'Неубиваемая истинная сущность', variant11: 'Хватка серпа судьбы', variant12: 'Взмах и в бездну зноя',
        variant13: 'Тлеющая защита', variant14: 'Вечный зной', variant15: 'Последний шаг',
        variant16: 'Смертельный серп', variant17: 'Хватка истинной сущности', variant18: 'Взгляд полудня',
        variant19: 'Мгновенная гибель в зное', variant20: 'Дух истинного полдня', variant21: 'Неуязвимая сущность',
        variant22: 'Юркая в истинном обличье', variant23: 'Нечеловеческая стойкость', variant24: 'Чуткая к року',
        variant25: 'Ускользающая в бездну зноя', variant26: 'Апокалиптический зной вновь', variant27: 'Испепеляющая мощь',
        variant28: 'Внезапная гибель', variant29: 'Каменная истинная сущность', variant30: 'Бездонный зной',
        variant31: 'Истинный рывок', variant32: 'Тлеющая корона', variant33: 'Вечный зной снова',
        variant34: 'Нечеловеческая прыть', variant35: 'Нечеловеческая выносливость'
    }
};
