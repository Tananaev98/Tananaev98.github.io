let lvlNumber = 15;
let factorChar = (lvlNumber * 5) / 100;

// Финал Смешанного леса переосмыслен: это больше не пять разных хранителей, а одна
// Баба-яга, показанная в пяти нарастающих обликах — от ведьмы с посохом до полного
// слияния с избушкой. Архетипы построены так же, как и обычная пятёрка боссов
// (иначе движок не читает уровень), но каждый следующий приём — явный шаг её
// перерождения, а финал сводит воедино приёмы всех четырёх предыдущих обликов.
const bossCombatConfig = {
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.7, damageMultiplier: 1.75, minWaveDelay: 2800, minShotDelay: 130, minTelegraphMs: 460,
	phases: [
		{ phase: 1, minHp: 0.657, cadence: 0.997, speed: 1.02, damage: 1, telegraphMultiplier: 0.996, surpriseChance: 0.161, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.307, cadence: 0.74, speed: 1.151, damage: 1.16, telegraphMultiplier: 0.891, surpriseChance: 0.301, maxActiveAttacks: 21 },
		{ phase: 3, minHp: 0, cadence: 0.601, speed: 1.281, damage: 1.34, telegraphMultiplier: 0.821, surpriseChance: 0.421, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'drift', cadence: 1.049, telegraphMs: 879, speedMultiplier: 0.921, damageMultiplier: 0.92, speedVariance: [0.86, 0.94, 1.02, 1.1, 1.18], healthMultiplier: 1.5, phaseMessages: {"2":"ПОСОХ ЖАЖДЕТ КРОВИ", "3":"ПОСОХ НЕ ЗНАЕТ ПОЩАДЫ"} },
		enem2: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'straight', cadence: 0.899, telegraphMs: 741, speedMultiplier: 1.061, damageMultiplier: 0.9, speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25], healthMultiplier: 1.5, appearMessage: "ВЗБЕСИЛАСЬ ОТ ЗЛОСТИ", phaseMessages: {"2":"КОГТИ РВУТСЯ В БОЙ", "3":"КОГТИ ЖАЖДУТ КРОВИ"} },
		enem3: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'weave', cadence: 1.179, telegraphMs: 981, speedMultiplier: 0.851, damageMultiplier: 1.18, speedVariance: [0.76, 0.86, 0.98, 1.1, 1.22], healthMultiplier: 1.5, appearMessage: "ПРОКЛЯТЬЯ КЛОКОЧУТ В ГОРЛЕ", phaseMessages: {"2":"ПРОКЛЯТЬЯ КИПЯТ", "3":"ОХВАЧЕНА БЕЗУМИЕМ"} },
		enem4: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.761, telegraphMs: 611, speedMultiplier: 1.201, damageMultiplier: 0.66, speedVariance: [0.9, 1.03, 1.16, 1.29, 1.42], healthMultiplier: 1.5, appearMessage: "ВЗОРВАЛАСЬ ЯРОСТЬЮ", phaseMessages: {"2":"ПЫШЕТ ОГНЁМ", "3":"ПЫЛАЕТ ЯРОСТЬЮ"} },
		enem5: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'pause', cadence: 0.719, telegraphMs: 639, speedMultiplier: 1.151, damageMultiplier: 1.1, speedVariance: [0.84, 0.97, 1.1, 1.23, 1.36], healthMultiplier: 1.5, appearMessage: "ОБЕЗУМЕЛА ОКОНЧАТЕЛЬНО", phaseMessages: {"2":"БЕЗУМИЕ РАСТЁТ", "3":"БЕЗУМИЕ БЕЗ ГРАНИЦ"} }
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Смешанный лес» пройдена!'
};

const ENEMY_TYPES = {
	enem11: {
		name: 'enem11',
		image: 'images/enemies/regions/1_smesh_les/lvl15/11.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem22: {
		name: 'enem22',
		image: 'images/enemies/regions/1_smesh_les/lvl15/22.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem33: {
		name: 'enem33',
		image: 'images/enemies/regions/1_smesh_les/lvl15/33.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem44: {
		name: 'enem44',
		image: 'images/enemies/regions/1_smesh_les/lvl15/44.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem55: {
		name: 'enem55',
		image: 'images/enemies/regions/1_smesh_les/lvl15/55.webp',
		baseHP: 100,
		baseSpeed: 0.020,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 0,
		size: '6%'
	},

	enem1: {
		name: 'enem1',
		dispName: 'Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Злая Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Очень злая Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '29%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Взбешенная Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '30%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Обезумевшая Баба-Яга',
		image: 'images/enemies/regions/1_smesh_les/lvl15/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '31%',
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
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.48)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 10;
const bossInterval = 4;

// Уровень 15 — пять обликов Бабы-яги. Архетипы: зигзаг посоха / парные когтистые
// выпады с флангов / редкие тяжёлые проклятия с долгой паузой / нервные вспышки
// только из углов / финальное перерождение, сводящее воедино приёмы всех обликов
// и впервые перекрывающее всю нижнюю полосу — лес смыкается вокруг героя.
const bossAbilities = [
	// ===== Баба-Яга =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 2 b
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 3 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 5 c
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 6 c
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 7 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 37, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 6 }, // 8 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 9 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 10 d
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 11 d
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 53, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 12 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 13 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 14 e
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 15 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 16 f
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 17 f
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 20 }, // 18 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 33, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 }, // 19 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 17 }, // 20 g
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 19 }, // 21 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 22 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 24, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 }, // 23 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 24 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 18 }, // 25 h
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 21 }, // 26 h

	// ===== Злая Баба-Яга =====
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 49, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 49, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 2 b
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 3 b
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 4 c
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13 }, // 5 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 6 }, // 6 c
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 7 d
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 8 d
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 52, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 9 d
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 10 d
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 49, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 11 e
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 12 e
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 13 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 14 e
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 15 f
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 49, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 16 f
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 17 f
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 18 f
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 43, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 19 g
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 40, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 6 }, // 20 g
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 49, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 21 g
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 22 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 23 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 15 }, // 24 h
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14 }, // 25 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 16 }, // 26 h
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 4, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 18 }, // 27 h

	// ===== Очень злая Баба-Яга =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 19 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 22 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 19 }, // 2 b
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 21 }, // 3 b
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 23 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 19 }, // 5 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 21 }, // 6 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 23 }, // 7 c
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 19 }, // 8 d
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 21 }, // 9 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 23 }, // 10 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 19 }, // 11 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 21 }, // 12 e
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 23 }, // 13 e
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 18 }, // 14 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 20 }, // 15 f
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 22 }, // 16 f
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 23 }, // 17 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 18 }, // 18 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 20 }, // 19 g
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 22 }, // 20 g
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 23 }, // 21 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 18 }, // 22 h
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 20 }, // 23 h
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 22 }, // 24 h

	// ===== Взбешенная Баба-Яга =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 3 b
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 7 c
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 8 c
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 11 d
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 12 d
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 16 e
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 17 e
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 20 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 24 g
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 25 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 29 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 30 h
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 32 h

	// ===== Обезумевшая Баба-Яга =====
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 3 b
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 6 c
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 7 c
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 41, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 10 d
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 11 d
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 12 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 50, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 14 e
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 15 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 16 e
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 18 f
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 19 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 23 g
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 24 g
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 4 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 4, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 28 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14 }, // 29 h
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 54, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 31 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 321, bossDelayAbDop: 6201, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 279, bossDelayAbDop: 5001, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 301, bossDelayAbDop: 6801, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 229, bossDelayAbDop: 5500, firstWaveDelayMs: 2208 }, // 
	{ boss: 'enem5', bossDelayAb: 271, bossDelayAbDop: 5600, firstWaveDelayMs: 2064 }, // 
];

const bossAbilitiesDop = [
	// Баба-Яга
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10, 11], shotGapsMs: [400, 400, 700] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 2, recoveryMs: 650 },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], signature: true, minPhase: 3, recoveryMs: 950 },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26] },

	// Злая Баба-Яга
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18], signature: true, minPhase: 2, recoveryMs: 650 },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], signature: true, minPhase: 3, recoveryMs: 950 },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27] },

	// Очень злая Баба-Яга
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7], shotGapsMs: [450, 0] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10], shotGapsMs: [450, 0] },
	{ boss: 'enem3', indexAbilities: [11, 12, 13], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 250, 700] },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21], signature: true, minPhase: 3, recoveryMs: 950 },
	{ boss: 'enem3', indexAbilities: [22, 23, 24] },

	// Взбешенная Баба-Яга
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [3, 4, 5, 6] },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10] },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], signature: true, minPhase: 2, recoveryMs: 650 },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 3, recoveryMs: 950 },
	{ boss: 'enem4', indexAbilities: [29, 30, 31, 32] },

	// Обезумевшая Баба-Яга
	{ boss: 'enem5', indexAbilities: [0, 1, 2] },
	{ boss: 'enem5', indexAbilities: [3, 4, 5] },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17], signature: true, minPhase: 1, recoveryMs: 650, openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22], signature: true, minPhase: 2, recoveryMs: 650 },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 3, recoveryMs: 950 },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31] },

];

// Лорные названия связок. Уровень 15 — Баба-Яга (одна сущность, 5 нарастающих стадий
// гнева): от спокойной ведьмы до обезумевшей — словарь один и тот же персонаж, но
// интенсивность растёт от стадии к стадии (не переиспользуем слова между стадиями).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Ведьмин удар', variant2: 'Костяная нога', variant3: 'Ведьмина сила',
        variant4: 'Заговорённая шаль', variant5: 'Меткий помёл', variant6: 'Едкое зелье',
        variant7: 'Ведьмина мощь', variant8: 'Крепкая шаль', variant9: 'Полёт в ступе',
        variant10: 'Живучая Яга', variant11: 'Цепкие пальцы', variant12: 'Зелье и в лес',
        variant13: 'Плотная шаль', variant14: 'Неутомимая Яга', variant15: 'Прыжок в ступе',
        variant16: 'Меткое зелье', variant17: 'Ведьмина хватка', variant18: 'Колдовской прищур',
        variant19: 'Мгновенное заклятие', variant20: 'Колдовской дух', variant21: 'Стойкая к заклятьям',
        variant22: 'Юркая на костяной ноге', variant23: 'Ведьмина стойкость', variant24: 'Ухо на избушку',
        variant25: 'Ускользающая в чащу', variant26: 'Дикое зелье', variant27: 'Мощь заклятья',
        variant28: 'Внезапное заклятие', variant29: 'Кость ноги', variant30: 'Разросшееся колдовство',
        variant31: 'Ведьмин рывок', variant32: 'Живучая шаль', variant33: 'Неутомимый полёт',
        variant34: 'Ведьмина прыть', variant35: 'Ведьмина выносливость'
    },
    enem2: {
        variant1: 'Злобный удар', variant2: 'Ядовитая клюка', variant3: 'Злая сила',
        variant4: 'Колючая шаль', variant5: 'Бросок клюки', variant6: 'Проклятое зелье',
        variant7: 'Злая мощь', variant8: 'Клюка-щит', variant9: 'Разгневанный полёт',
        variant10: 'Живучая злоба', variant11: 'Костлявые когти', variant12: 'Проклятие и в чащу',
        variant13: 'Толстая шаль', variant14: 'Неутомимая злоба', variant15: 'Резкий взмах клюки',
        variant16: 'Меткое проклятие', variant17: 'Злая хватка', variant18: 'Испепеляющий взгляд',
        variant19: 'Мгновенное проклятие', variant20: 'Злобный дух', variant21: 'Стойкая к гневу',
        variant22: 'Юркая в гневе', variant23: 'Злая стойкость', variant24: 'Чуткая к обиде',
        variant25: 'Ускользающая в злобе', variant26: 'Дикая злоба', variant27: 'Мощь проклятья',
        variant28: 'Внезапное проклятие', variant29: 'Каменная злость', variant30: 'Разросшийся гнев',
        variant31: 'Злой рывок', variant32: 'Живучая клюка', variant33: 'Неутомимый гнев',
        variant34: 'Злая прыть', variant35: 'Злая выносливость'
    },
    enem3: {
        variant1: 'Яростный удар', variant2: 'Огненная клюка', variant3: 'Ярая сила',
        variant4: 'Грозовая шаль', variant5: 'Грозовой бросок', variant6: 'Кипящее зелье',
        variant7: 'Ярая мощь', variant8: 'Пылающая клюка', variant9: 'Взбешенный полёт',
        variant10: 'Живучая ярость', variant11: 'Раскалённые когти', variant12: 'Проклятие и в бурю',
        variant13: 'Грозовая шаль-щит', variant14: 'Неутомимая ярость', variant15: 'Молниеносный взмах',
        variant16: 'Проклятие бури', variant17: 'Ярая хватка', variant18: 'Пылающий взгляд',
        variant19: 'Грозовое проклятие', variant20: 'Грозовой дух', variant21: 'Стойкая к буре',
        variant22: 'Юркая в буре', variant23: 'Ярая стойкость', variant24: 'Чуткая к молнии',
        variant25: 'Ускользающая в грозе', variant26: 'Дикая буря', variant27: 'Кипящая мощь',
        variant28: 'Внезапная буря', variant29: 'Каменная ярость', variant30: 'Разросшаяся буря',
        variant31: 'Яростный рывок', variant32: 'Клюка бури', variant33: 'Неутомимая буря',
        variant34: 'Ярая прыть', variant35: 'Ярая выносливость'
    },
    enem4: {
        variant1: 'Безумный удар', variant2: 'Клюка хаоса', variant3: 'Безумная сила',
        variant4: 'Рваная шаль', variant5: 'Хаотичный бросок', variant6: 'Бурлящее зелье',
        variant7: 'Безумная мощь', variant8: 'Треснувшая клюка', variant9: 'Бешеный полёт',
        variant10: 'Живучее безумие', variant11: 'Скрюченные когти', variant12: 'Проклятие и в хаос',
        variant13: 'Изодранная шаль', variant14: 'Неутомимое безумие', variant15: 'Судорожный взмах',
        variant16: 'Хаотичное проклятие', variant17: 'Безумная хватка', variant18: 'Обезумевший взгляд',
        variant19: 'Мгновенный хаос', variant20: 'Дух безумия', variant21: 'Стойкая к боли',
        variant22: 'Юркая в бешенстве', variant23: 'Безумная стойкость', variant24: 'Чуткая к хаосу',
        variant25: 'Ускользающая в бешенстве', variant26: 'Дикое бешенство', variant27: 'Бурлящая мощь',
        variant28: 'Внезапный хаос', variant29: 'Каменное безумие', variant30: 'Разросшийся хаос',
        variant31: 'Безумный рывок', variant32: 'Треснувшая клюка-щит', variant33: 'Неутомимый хаос',
        variant34: 'Безумная прыть', variant35: 'Безумная выносливость'
    },
    enem5: {
        variant1: 'Последний удар', variant2: 'Клюка судьбы', variant3: 'Нечеловеческая сила',
        variant4: 'Испепелённая шаль', variant5: 'Смертельный бросок', variant6: 'Адское зелье',
        variant7: 'Нечеловеческая мощь', variant8: 'Обугленная клюка', variant9: 'Апокалиптический полёт',
        variant10: 'Неубиваемое безумие', variant11: 'Когти рока', variant12: 'Проклятие и в бездну',
        variant13: 'Тлеющая шаль', variant14: 'Вечное безумие', variant15: 'Последний взмах',
        variant16: 'Смертельное проклятие', variant17: 'Хватка рока', variant18: 'Взгляд бездны',
        variant19: 'Мгновенная гибель', variant20: 'Дух бездны', variant21: 'Неуязвимая к боли',
        variant22: 'Юркая в безумии', variant23: 'Нечеловеческая стойкость', variant24: 'Чуткая к року',
        variant25: 'Ускользающая в бездну', variant26: 'Апокалиптическое безумие', variant27: 'Адская мощь',
        variant28: 'Внезапная гибель', variant29: 'Каменное проклятие', variant30: 'Бездонный хаос',
        variant31: 'Последний рывок', variant32: 'Тлеющая клюка', variant33: 'Вечный хаос',
        variant34: 'Нечеловеческая прыть', variant35: 'Нечеловеческая выносливость'
    }
};
