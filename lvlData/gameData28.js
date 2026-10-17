let lvlNumber = 28;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 28 — «Ягодная поляна» (см. lvlData/areas.js/LEVEL_WORKING_TITLES и
// description/идеи по уровням.txt — сверять именно с ними перед правкой, не по памяти).
// Область III «Плодородные земли».
// Картинки — ягоды/бахча (клубника/малина/смородина/дыня/арбуз), не пчёлы/пасечник
// из старого плана — тот план устарел (см. также расхождение по 27/29).
//
// РЕГИОНАЛЬНАЯ МЕХАНИКА «синхронный рывок» на этом уровне несёт Сеточка (enem4) —
// намеренная смена роли-носителя (enem1→26, enem3→27, enem4→28, следующий enem5→29):
// «кто несёт приём» тоже не должно стать новым клише. Интересный поворот: обычно
// enem4 — самый нервный и быстрый архетип, а тут его нервная энергия выражается
// именно через синхронный рывок — сеть дынных плетей натягивается и лопается разом.
//
// Пять архетипов (movementStyle — по наименее используемым для роли на момент
// написания, сверено с admin-boss-pattern-panel.html):
// enem1 Алевка     — lateRush. Клубника: спокойный наплыв, поздний рывок на середине.
// enem2 Колючница  — straight. Малиновые шипы без движкового трюка, быстрые серии.
// enem3 Гроздяна   — drift. Смородиновая гроздь сносится вбок тяжёлыми ягодами.
// enem4 Сеточка    — pause, несёт синхронный рывок («плети натягиваются и лопаются»).
// enem5 Полосатень — accelerate. Арбуз медленно раскатывается, набирая ход к удару —
//                  финал смешивает четырёх предыдущих по-своему.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.881, damageMultiplier: 1.83, minWaveDelay: 2101, minShotDelay: 158, minTelegraphMs: 544,
	phases: [
		{ phase: 1, minHp: 0.656, cadence: 0.988, speed: 1.011, damage: 1, telegraphMultiplier: 1.013, surpriseChance: 0.14, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.304, cadence: 0.86, speed: 1.1, damage: 1.14, telegraphMultiplier: 0.93, surpriseChance: 0.24, maxActiveAttacks: 15 },
		{ phase: 3, minHp: 0, cadence: 0.72, speed: 1.2, damage: 1.27, telegraphMultiplier: 0.803, surpriseChance: 0.35, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { combatIdentity: "Ягода срывается с ветки", combatTrick: "быстрые удары левого края и центра идут парами, а справа висит медленный побег", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.032, telegraphMs: 800, speedMultiplier: 1.2, damageMultiplier: 0.9, speedVariance: [0.96, 0.995, 1.03, 1.065, 1.1] },
		enem2: { combatIdentity: "Шип после ягодки", combatTrick: "быстрый шип из центра прилетает раньше, чем успеваешь к левому краю, а медленная ягода справа остаётся фоном", signatureEvery: 4, movementStyle: 'straight', cadence: 0.94, telegraphMs: 759, speedMultiplier: 1.202, damageMultiplier: 0.98, speedVariance: [1.02, 1.045, 1.07, 1.095, 1.12] },
		enem3: { combatIdentity: "Гроздь рассыпается", combatTrick: "медленные гроздья дрейфуют между левым и правым краями, а у правого края висит ещё одна", signatureEvery: 4, movementStyle: 'drift', cadence: 1.171, telegraphMs: 1000, speedMultiplier: 1.001, damageMultiplier: 1.21, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "Сетка кожуры рвётся", combatTrick: "центр и левый край сменяют друг друга быстрыми шагами, пока справа висит медленная нить", signatureEvery: 4, movementStyle: 'pause', cadence: 0.901, telegraphMs: 700, speedMultiplier: 1.25, damageMultiplier: 0.8, speedVariance: [0.98, 1.02, 1.06, 1.1, 1.14] },
		enem5: { combatIdentity: "Полосатый раскат", combatTrick: "левый край и центр бьют парами, а медленный правый раскат остаётся фоном", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.87, telegraphMs: 715, speedMultiplier: 1.099, damageMultiplier: 1.11, speedVariance: [1.04, 1.06, 1.08, 1.1, 1.12] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/3_plod_zemli/lvl28/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/3_plod_zemli/lvl28/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/3_plod_zemli/lvl28/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/3_plod_zemli/lvl28/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/3_plod_zemli/lvl28/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Алевка', image: 'images/enemies/regions/3_plod_zemli/lvl28/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 230, xPos: 50, size: '22%',
		deathAnimation: { preset: 'juiceSquash', durationMs: 1100 }
	},
	enem2: {
		name: 'enem2', dispName: 'Колючница', image: 'images/enemies/regions/3_plod_zemli/lvl28/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 360, xPos: 50, size: '24%',
		deathAnimation: { preset: 'thornCurlWither', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Гроздяна', image: 'images/enemies/regions/3_plod_zemli/lvl28/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 480, xPos: 50, size: '27%',
		deathAnimation: { preset: 'clusterScatter', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Сеточка', image: 'images/enemies/regions/3_plod_zemli/lvl28/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 620, xPos: 50, size: '25%',
		deathAnimation: { preset: 'netSnap', durationMs: 1050 }
	},
	enem5: {
		name: 'enem5', dispName: 'Полосатень', image: 'images/enemies/regions/3_plod_zemli/lvl28/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'rindCrack', durationMs: 1550 }
	}
};

const attackDamage = {
	enem1: { light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.28), medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.40), heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.52) },
	enem2: { light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.26), medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.36), heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.48) },
	enem3: { light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.30), medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.42), heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.58) },
	enem4: { light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.22), medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.30), heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.40) },
	enem5: { light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.56) }
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 8;
const bossInterval = 5;

const bossAbilities = [
	// ===== Алевка =====
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 24 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 27 g
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 14 }, // 29 g
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 32 h
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 16 }, // 33 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 34 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 15 }, // 35 h

	// ===== Колючница =====
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 24 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 28 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 29 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 5 }, // 34 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 17 }, // 35 h
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 12 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 11 }, // 37 h

	// ===== Гроздяна =====
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 95, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 96, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 32 h
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 11 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 36 h

	// ===== Сеточка =====
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 31, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 34 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 37 h

	// ===== Полосатень =====
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 29 g
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 17 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 27, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5 }, // 33 h
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 34 h
	{ boss: 'enem5', type: 'enem55', xPos: 61, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15 }, // 35 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16 }, // 36 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 160, bossDelayAbDop: 5602, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 160, bossDelayAbDop: 6000, firstWaveDelayMs: 2112 }, // 
	{ boss: 'enem3', bossDelayAb: 150, bossDelayAbDop: 6500, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 165, bossDelayAbDop: 7100, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 170, bossDelayAbDop: 6701, firstWaveDelayMs: 2160 }, // 
];

const bossAbilitiesDop = [
	// Алевка
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 600, 600], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 600] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12], shotGapsMs: [300, 300, 300] },
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16, 17, 18], shotGapsMs: [300, 600, 300, 300, 600] },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], shotGapsMs: [0, 0, 300] },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 0], openingOrder: 1, label: "Ягода срывается с ветки — знакомство" },
	{ boss: 'enem1', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 600, 300], label: "Ягода срывается с ветки — иной конец" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 300], label: "Ягода срывается с ветки — завершение" },

	// Колючница
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 600, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], shotGapsMs: [600, 0, 300] },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12, 13, 14], shotGapsMs: [300, 0, 600, 0, 300] },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18], shotGapsMs: [600, 0, 300] },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], shotGapsMs: [600, 0, 0, 300] },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 0, 0], openingOrder: 1, label: "Шип после ягодки — знакомство" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 0, 300, 300], label: "Шип после ягодки — иной конец" },
	{ boss: 'enem2', indexAbilities: [34, 35, 36, 37], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 0], label: "Шип после ягодки — завершение" },

	// Гроздяна
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 600, 300, 300], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8], shotGapsMs: [600, 300, 0] },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 600, 300, 300] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17], shotGapsMs: [600, 300, 0] },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22], shotGapsMs: [600, 600, 0, 300] },
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 300, 600], openingOrder: 1, label: "Гроздь рассыпается — знакомство" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 600, 0], label: "Гроздь рассыпается — иной конец" },
	{ boss: 'enem3', indexAbilities: [32, 33, 34, 35, 36], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 600, 0, 600], label: "Гроздь рассыпается — завершение" },

	// Сеточка
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 600, 0] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 600], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12, 13, 14], shotGapsMs: [300, 0, 0, 300, 600] },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18], shotGapsMs: [0, 0, 600] },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22], shotGapsMs: [0, 0, 600] },
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 0, 300], openingOrder: 1, label: "Сетка кожуры рвётся — знакомство" },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 300, 300, 300, 0], label: "Сетка кожуры рвётся — иной конец" },
	{ boss: 'enem4', indexAbilities: [34, 35, 36, 37], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 600], label: "Сетка кожуры рвётся — завершение" },

	// Полосатень
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 0, 600], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [0, 0, 0, 0] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12], shotGapsMs: [300, 0, 600] },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16, 17, 18], shotGapsMs: [0, 300, 300, 600, 0] },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22], shotGapsMs: [300, 300, 0] },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 600], openingOrder: 1, label: "Полосатый раскат — знакомство" },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 300, 300, 600], label: "Полосатый раскат — иной конец" },
	{ boss: 'enem5', indexAbilities: [33, 34, 35, 36], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 600], label: "Полосатый раскат — завершение" },

];

// Лорные названия связок. Уровень 28 — ягодник и бахча: Алевка (алая ягода), Колючница
// (крыжовник), Гроздяна (виноград), Сеточка (мускусная дыня), Полосатень (арбуз).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Алый удар', variant2: 'Острая косточка', variant3: 'Алая сила',
        variant4: 'Тонкая кожица', variant5: 'Меткий наплыв', variant6: 'Кислый сок',
        variant7: 'Алая мощь', variant8: 'Гроздь кожицы', variant9: 'Поздний рывок наплыва',
        variant10: 'Живучая Алевка', variant11: 'Цепкая веточка', variant12: 'Наплыв и в куст',
        variant13: 'Толстая кожица', variant14: 'Неутомимая Алевка', variant15: 'Пружинистая веточка',
        variant16: 'Меткая косточка', variant17: 'Алая хватка', variant18: 'Алый блеск взгляда',
        variant19: 'Наплыв вмиг', variant20: 'Ягодный дух', variant21: 'Стойкая кожица',
        variant22: 'Юркая Алевка', variant23: 'Алая стойкость', variant24: 'Чуткая веточка',
        variant25: 'Ускользающий наплыв', variant26: 'Дикий наплыв', variant27: 'Мощь кислоты',
        variant28: 'Поздний рывок внезапно', variant29: 'Каменная кожица', variant30: 'Разросшаяся гроздь',
        variant31: 'Алый рывок', variant32: 'Живучая кожица', variant33: 'Неутомимый наплыв',
        variant34: 'Алая прыть', variant35: 'Алая выносливость'
    },
    enem2: {
        variant1: 'Колючий удар', variant2: 'Шип куста', variant3: 'Колючая сила',
        variant4: 'Шипастая защита', variant5: 'Быстрая серия', variant6: 'Кислый сок ягоды',
        variant7: 'Колючая мощь', variant8: 'Плотные шипы', variant9: 'Быстрая серия уколов',
        variant10: 'Живучая Колючница', variant11: 'Цепкий шип', variant12: 'Укол и в куст',
        variant13: 'Толстые шипы', variant14: 'Неутомимая Колючница', variant15: 'Пружинистые шипы',
        variant16: 'Меткий шип куста', variant17: 'Колючая хватка', variant18: 'Колкий взгляд',
        variant19: 'Серия уколов вмиг', variant20: 'Кустовой дух', variant21: 'Стойкие шипы',
        variant22: 'Юркая Колючница', variant23: 'Колючая стойкость', variant24: 'Чуткие шипы',
        variant25: 'Ускользающий укол', variant26: 'Дикая серия', variant27: 'Мощь сока',
        variant28: 'Быстрая серия внезапно', variant29: 'Каменные шипы', variant30: 'Разросшиеся шипы',
        variant31: 'Колючий рывок', variant32: 'Живучие шипы', variant33: 'Неутомимая серия',
        variant34: 'Колючая прыть', variant35: 'Колючая выносливость'
    },
    enem3: {
        variant1: 'Гроздевой удар', variant2: 'Черешок винограда', variant3: 'Гроздевая сила',
        variant4: 'Восковая кожица', variant5: 'Снос грозди', variant6: 'Виноградный сок',
        variant7: 'Гроздевая мощь', variant8: 'Плотная гроздь', variant9: 'Тяжёлый снос вбок',
        variant10: 'Живучая Гроздяна', variant11: 'Цепкая гроздь', variant12: 'Снос и в лозу',
        variant13: 'Кожица ягод', variant14: 'Неутомимая Гроздяна', variant15: 'Пружинистая лоза',
        variant16: 'Меткая ягода', variant17: 'Гроздевая хватка', variant18: 'Сладкий взгляд',
        variant19: 'Снос вмиг', variant20: 'Виноградный дух', variant21: 'Стойкая кожица',
        variant22: 'Юркая Гроздяна', variant23: 'Гроздевая стойкость', variant24: 'Чуткая лоза',
        variant25: 'Ускользающая гроздь', variant26: 'Дикий снос', variant27: 'Мощь сока',
        variant28: 'Тяжёлый снос внезапно', variant29: 'Каменная гроздь', variant30: 'Разросшаяся лоза',
        variant31: 'Гроздевой рывок', variant32: 'Живучая лоза', variant33: 'Неутомимый снос',
        variant34: 'Гроздевая прыть', variant35: 'Гроздевая выносливость'
    },
    enem4: {
        variant1: 'Сетчатый удар', variant2: 'Край сетки', variant3: 'Сетчатая сила',
        variant4: 'Сетчатая кожура', variant5: 'Синхронный рывок сетки', variant6: 'Мускусный сок',
        variant7: 'Сетчатая мощь', variant8: 'Плотная кожура', variant9: 'Синхронный рывок дыни',
        variant10: 'Живучая Сеточка', variant11: 'Цепкая сетка', variant12: 'Рывок и на бахчу',
        variant13: 'Толстая кожура', variant14: 'Неутомимая Сеточка', variant15: 'Пружинистая сетка',
        variant16: 'Узор сетки', variant17: 'Сетчатая хватка', variant18: 'Ароматный взгляд',
        variant19: 'Синхронный рывок вмиг', variant20: 'Мускусный дух', variant21: 'Стойкая кожура',
        variant22: 'Юркая Сеточка', variant23: 'Сетчатая стойкость', variant24: 'Чуткая сетка',
        variant25: 'Ускользающая сетка', variant26: 'Дикий рывок сетки', variant27: 'Мощь сока',
        variant28: 'Синхронный рывок внезапно', variant29: 'Каменная кожура', variant30: 'Разросшаяся сетка',
        variant31: 'Сетчатый рывок', variant32: 'Живучая кожура', variant33: 'Синхронный рывок вновь',
        variant34: 'Сетчатая прыть', variant35: 'Сетчатая выносливость'
    },
    enem5: {
        variant1: 'Полосатый удар', variant2: 'Острая семечка', variant3: 'Полосатая сила',
        variant4: 'Толстая корка', variant5: 'Меткий раскат', variant6: 'Сладкий сок',
        variant7: 'Полосатая мощь', variant8: 'Прочная корка', variant9: 'Разгон к удару',
        variant10: 'Живучий Полосатень', variant11: 'Цепкая семечка', variant12: 'Раскат и на бахчу',
        variant13: 'Зелёная корка', variant14: 'Неутомимый Полосатень', variant15: 'Пружинистый раскат',
        variant16: 'Меткая полоса', variant17: 'Полосатая хватка', variant18: 'Сладкий взгляд',
        variant19: 'Разгон к удару вмиг', variant20: 'Бахчевой дух', variant21: 'Стойкая корка',
        variant22: 'Юркий Полосатень', variant23: 'Полосатая стойкость', variant24: 'Чуткая полоса',
        variant25: 'Ускользающий раскат', variant26: 'Дикий раскат', variant27: 'Мощь сладости',
        variant28: 'Разгон внезапно', variant29: 'Каменная корка', variant30: 'Полосатая корка разрослась',
        variant31: 'Полосатый рывок', variant32: 'Живучая корка', variant33: 'Неутомимый раскат',
        variant34: 'Полосатая прыть', variant35: 'Полосатая выносливость'
    }
};
