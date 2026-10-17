let lvlNumber = 33;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 33 — «Новгородские сети», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом (рыбы поданы
// как гуманоиды, как и весь остальной бестиарий игры). Большинство боссов — 'wave'
// с разным почерком: Юркач дёргано мечется мелкими волнами, Сетевик колышется как
// поплавок на течении, Ладейник качается плавно и величаво (финал). Ершак —
// единственный не-wave: колючий ёрш идёт классическим тугим 'weave' — резкая,
// но геометрически иная волна, чтобы не сливаться с соседями. Струнобой — lateRush:
// гусляр после долгого перебора струн внезапно срывается в рывок.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.89, damageMultiplier: 2.08, minWaveDelay: 2080, minShotDelay: 146, minTelegraphMs: 535,
	phases: [
		{ phase: 1, minHp: 0.666, cadence: 0.984, speed: 1.014, damage: 1, telegraphMultiplier: 1.016, surpriseChance: 0.15, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.286, cadence: 0.83, speed: 1.14, damage: 1.17, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0, cadence: 0.68, speed: 1.26, damage: 1.3, telegraphMultiplier: 0.81, surpriseChance: 0.382, maxActiveAttacks: 25 }
	],
	bosses: {
		enem1: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'wave', cadence: 1.017, telegraphMs: 850, speedMultiplier: 1.003, damageMultiplier: 0.88, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem2: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'weave', cadence: 0.948, telegraphMs: 778, speedMultiplier: 1.062, damageMultiplier: 0.96, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem3: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'wave', cadence: 1.08, telegraphMs: 920, speedMultiplier: 1.102, damageMultiplier: 1.12, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.95, telegraphMs: 820, speedMultiplier: 1.036, damageMultiplier: 1.05, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "", combatTrick: "", signatureEvery: 4, movementStyle: 'wave', cadence: 0.85, telegraphMs: 698, speedMultiplier: 1.098, damageMultiplier: 1.1, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl33/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl33/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl33/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl33/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl33/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Юркач', image: 'images/enemies/regions/4_rech_ozer/lvl33/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 270, xPos: 50, size: '23%',
		deathAnimation: { preset: 'scaleFlicker', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Ершак', image: 'images/enemies/regions/4_rech_ozer/lvl33/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 410, xPos: 50, size: '24%',
		deathAnimation: { preset: 'spineWither', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Сетевик', image: 'images/enemies/regions/4_rech_ozer/lvl33/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 530, xPos: 50, size: '26%',
		deathAnimation: { preset: 'netTangle', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Струнобой', image: 'images/enemies/regions/4_rech_ozer/lvl33/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 670, xPos: 50, size: '27%',
		deathAnimation: { preset: 'stringSnap', durationMs: 1350 }
	},
	enem5: {
		name: 'enem5', dispName: 'Ладейник', image: 'images/enemies/regions/4_rech_ozer/lvl33/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'hullSink', durationMs: 1550 }
	}
};

const attackDamage = {
	enem1: { light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.28), medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.40), heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.54) },
	enem2: { light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.26), medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.36), heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50) },
	enem3: { light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.56) },
	enem4: { light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.22), medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.32), heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.46) },
	enem5: { light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.58) }
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 16;
const bossInterval = 8;

const bossAbilities = [
	// ===== Юркач =====
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 4.07, waveFrequency: 1.09, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 6.09, waveFrequency: 2.31, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 8.05, waveFrequency: 1.91, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 1.49, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 0 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 8.05, waveFrequency: 2.31, wavePhase: 0 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.91, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 1.09, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 4.07, waveFrequency: 2.31, wavePhase: 0 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 6.09, waveFrequency: 1.91, wavePhase: 0.5 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 8.05, waveFrequency: 1.49, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 1.09, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 2.31, wavePhase: 0 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 8.05, waveFrequency: 1.91, wavePhase: 0.5 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.49, wavePhase: 1.1 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 6.09, waveFrequency: 1.09, wavePhase: 0.3 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 1.09, wavePhase: 0 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 4.07, waveFrequency: 1.91, wavePhase: 0 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 0.5 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 8.05, waveFrequency: 1.09, wavePhase: 1.1 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 2.31, wavePhase: 0.3 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 6.09, waveFrequency: 2.31, wavePhase: 0 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 8.05, waveFrequency: 1.49, wavePhase: 0 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.09, wavePhase: 0.5 }, // 24 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 6.09, waveFrequency: 2.31, wavePhase: 1.1 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 1.91, wavePhase: 0.3 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 1.91, wavePhase: 0 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 2.31, wavePhase: 0 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 1.91, wavePhase: 0.5 }, // 29 g
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 1.49, wavePhase: 1.1 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 6.09, waveFrequency: 1.09, wavePhase: 0.3 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 8.05, waveFrequency: 1.09, wavePhase: 0 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 2.31, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 41, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 1.91, wavePhase: 0 }, // 34 h
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 8.05, waveFrequency: 1.49, wavePhase: 0.5 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.09, wavePhase: 1.1 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 6.09, waveFrequency: 2.31, wavePhase: 0.3 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12, waveAmplitude: 8.05, waveFrequency: 2.31, wavePhase: 0 }, // 38 h

	// ===== Ершак =====
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11.5 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14.5 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14.5 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14.5 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 14.5 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 39, customHP: 1, customDamage: attackDamage.enem2.heavy, customSpeed: 5 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12.5 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.light, customSpeed: 13.5 }, // 40 h

	// ===== Сетевик =====
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.71, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 1.52, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 1.21, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.95, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 7.06, waveFrequency: 0.95, wavePhase: 0 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 9.08, waveFrequency: 0.71, wavePhase: 0.5 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 0.95, wavePhase: 0.5 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 0.71, wavePhase: 1.1 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.52, wavePhase: 0.3 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 7.06, waveFrequency: 1.52, wavePhase: 0 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 0.95, wavePhase: 0 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.71, wavePhase: 0.5 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 7.06, waveFrequency: 1.52, wavePhase: 1.1 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.21, wavePhase: 0.3 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 0.95, wavePhase: 0.5 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 1.52, wavePhase: 0 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0.5 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 7.06, waveFrequency: 0.95, wavePhase: 1.1 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 0.71, wavePhase: 0.3 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.52, wavePhase: 0 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 1.21, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 0.95, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.71, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 7.06, waveFrequency: 0.71, wavePhase: 0 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 9.08, waveFrequency: 1.52, wavePhase: 0.5 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.95, wavePhase: 0 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 0.71, wavePhase: 0.5 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 1.52, wavePhase: 1.1 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0.3 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 7.06, waveFrequency: 1.21, wavePhase: 0 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 0.71, wavePhase: 0 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 1.52, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 7.06, waveFrequency: 1.21, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 0.95, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 38, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.71, wavePhase: 0 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12, waveAmplitude: 7.06, waveFrequency: 1.52, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 1.21, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.95, wavePhase: 0.3 }, // 39 h
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 14, waveAmplitude: 7.06, waveFrequency: 0.95, wavePhase: 0 }, // 40 h

	// ===== Струнобой =====
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16.5 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16.5 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 17.5 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16.5 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16.5 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16.5 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 16.5 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14.5 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 15.5 }, // 40 h

	// ===== Ладейник =====
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.41, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.49, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 1.14, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 0.77, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 9.58, waveFrequency: 0.41, wavePhase: 0 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 13.07, waveFrequency: 1.49, wavePhase: 0.5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 1.14, wavePhase: 1.1 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16, waveAmplitude: 9.58, waveFrequency: 0.77, wavePhase: 0.3 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.77, wavePhase: 0 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 0 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.14, wavePhase: 0.5 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.77, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 0.41, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.41, wavePhase: 0 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 13.07, waveFrequency: 0.41, wavePhase: 0 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 0.5 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.14, wavePhase: 1.1 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.77, wavePhase: 0.3 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.77, wavePhase: 0 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13, waveAmplitude: 9.58, waveFrequency: 0.41, wavePhase: 0.5 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 13.07, waveFrequency: 1.14, wavePhase: 0 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.77, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.41, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16, waveAmplitude: 13.07, waveFrequency: 1.49, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 0 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.14, wavePhase: 0.5 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 13.07, waveFrequency: 0.41, wavePhase: 0 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 0.5 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.14, wavePhase: 1.1 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.77, wavePhase: 0.3 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.77, wavePhase: 0 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 13, waveAmplitude: 9.58, waveFrequency: 0.41, wavePhase: 0.5 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 13.07, waveFrequency: 0.41, wavePhase: 0 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 1.49, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 1.14, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16, waveAmplitude: 13.07, waveFrequency: 0.77, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.heavy, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.41, wavePhase: 0 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.49, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 1.14, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 0.77, wavePhase: 0.3 }, // 39 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.light, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.77, wavePhase: 0 }, // 40 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 167, bossDelayAbDop: 6799, firstWaveDelayMs: 2274 }, // 
	{ boss: 'enem2', bossDelayAb: 167, bossDelayAbDop: 6799, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 166, bossDelayAbDop: 6803, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 167, bossDelayAbDop: 6802, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 167, bossDelayAbDop: 6799, firstWaveDelayMs: 2316 }, // 
];

const bossAbilitiesDop = [
	// Юркач
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 300, 600], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8], shotGapsMs: [300, 0, 300] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12], shotGapsMs: [0, 600, 0] },
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16, 17], shotGapsMs: [600, 0, 300, 300] },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22], shotGapsMs: [600, 300, 300, 300] },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 300, 600], openingOrder: 1, label: "Ягода срывается с ветки — знакомство" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600, 0], label: "Ягода срывается с ветки — иной конец" },
	{ boss: 'enem1', indexAbilities: [34, 35, 36, 37, 38], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 300, 600], label: "Ягода срывается с ветки — завершение" },

	// Ершак
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 0, 300], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7, 8, 9], shotGapsMs: [600, 300, 300, 300, 300] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 600, 600, 0] },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [600, 600, 0, 300, 600] },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [600, 0, 0, 600, 0] },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 0, 300], openingOrder: 1, label: "Шип после ягодки — знакомство" },
	{ boss: 'enem2', indexAbilities: [31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 0, 0], label: "Шип после ягодки — иной конец" },
	{ boss: 'enem2', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 600, 300], label: "Шип после ягодки — завершение" },

	// Сетевик
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 600, 600, 0, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [600, 300, 300, 0] },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [0, 600, 600, 0, 0] },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20], shotGapsMs: [300, 0, 600] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [0, 600, 600, 0, 0] },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 300, 0], openingOrder: 1, label: "Гроздь рассыпается — знакомство" },
	{ boss: 'enem3', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 600], label: "Гроздь рассыпается — иной конец" },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 300, 0], label: "Гроздь рассыпается — завершение" },

	// Струнобой
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 300, 0, 600, 300] },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 600, 300, 0, 600], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16], shotGapsMs: [600, 0, 600, 600] },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20], shotGapsMs: [600, 300, 300] },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [600, 0, 600, 600] },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 600], openingOrder: 1, label: "Сетка кожуры рвётся — знакомство" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 300, 600, 300], label: "Сетка кожуры рвётся — иной конец" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 600, 0, 300, 0], label: "Сетка кожуры рвётся — завершение" },

	// Ладейник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], shotGapsMs: [600, 300, 600], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [300, 300, 0, 600] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 300, 300, 300] },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18, 19], shotGapsMs: [600, 600, 600, 0, 0] },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25], shotGapsMs: [600, 300, 300, 600, 300] },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 600, 0, 0], openingOrder: 1, label: "Полосатый раскат — знакомство" },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 300, 600], label: "Полосатый раскат — иной конец" },
	{ boss: 'enem5', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 0, 600], label: "Полосатый раскат — завершение" },

];

// Лорные названия связок. Уровень 33 — рыбацкое: Юркач (юркая рыбка), Ершак (ёрш),
// Сетевик (сеть с поплавками), Струнобой (леска-струна), Ладейник (дух ладьи, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Юркий удар', variant2: 'Острый коготок', variant3: 'Юркая сила',
        variant4: 'Мелкая чешуя', variant5: 'Дёрганый бросок', variant6: 'Слизь юркача',
        variant7: 'Юркая мощь', variant8: 'Плотная чешуя', variant9: 'Мелкая дёрганая волна',
        variant10: 'Живучий Юркач', variant11: 'Цепкий коготок', variant12: 'Бросок и на глубину',
        variant13: 'Плотная чешуя-щит', variant14: 'Неутомимый Юркач', variant15: 'Пружинистый коготок',
        variant16: 'Меткий коготок', variant17: 'Юркая хватка', variant18: 'Быстрый взгляд',
        variant19: 'Дёрганый бросок вмиг', variant20: 'Болотный дух', variant21: 'Стойкая чешуя',
        variant22: 'Юркий вдвойне', variant23: 'Юркая стойкость', variant24: 'Чуткий коготок',
        variant25: 'Ускользающий бросок', variant26: 'Дикий дёрг', variant27: 'Мощь слизи',
        variant28: 'Дёрганая волна внезапно', variant29: 'Каменная чешуя', variant30: 'Коготь разросся',
        variant31: 'Юркий рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая волна',
        variant34: 'Юркая прыть', variant35: 'Юркая выносливость'
    },
    enem2: {
        variant1: 'Ершистый удар', variant2: 'Шип ерша', variant3: 'Ершистая сила',
        variant4: 'Колючая чешуя', variant5: 'Тугой зигзаг', variant6: 'Слизь ерша',
        variant7: 'Ершистая мощь', variant8: 'Колючки на спине', variant9: 'Классический тугой зигзаг',
        variant10: 'Живучий Ершак', variant11: 'Цепкий шип', variant12: 'Зигзаг и на дно',
        variant13: 'Толстые колючки', variant14: 'Неутомимый Ершак', variant15: 'Пружинистые колючки',
        variant16: 'Шип ерша вмиг', variant17: 'Ершистая хватка', variant18: 'Колючий взгляд',
        variant19: 'Тугой зигзаг мгновенно', variant20: 'Речной дух', variant21: 'Стойкие колючки',
        variant22: 'Юркий Ершак', variant23: 'Ершистая стойкость', variant24: 'Чуткие колючки',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикий зигзаг', variant27: 'Мощь слизи',
        variant28: 'Тугой зигзаг внезапно', variant29: 'Каменные колючки', variant30: 'Разросшиеся колючки',
        variant31: 'Ершистый рывок', variant32: 'Живучие колючки', variant33: 'Неутомимый зигзаг',
        variant34: 'Ершистая прыть', variant35: 'Ершистая выносливость'
    },
    enem3: {
        variant1: 'Сетевой удар', variant2: 'Острый поплавок', variant3: 'Сетевая сила',
        variant4: 'Плетёная сеть', variant5: 'Поплавковая волна', variant6: 'Тина в сетях',
        variant7: 'Сетевая мощь', variant8: 'Плотное плетение', variant9: 'Поплавковая волна на течении',
        variant10: 'Живучий Сетевик', variant11: 'Цепкая сеть', variant12: 'Волна и в глубину',
        variant13: 'Толстое плетение', variant14: 'Неутомимый Сетевик', variant15: 'Пружинистый поплавок',
        variant16: 'Меткий поплавок', variant17: 'Сетевая хватка', variant18: 'Взгляд сквозь сеть',
        variant19: 'Поплавковая волна вмиг', variant20: 'Рыбацкий дух', variant21: 'Стойкое плетение',
        variant22: 'Юркий Сетевик', variant23: 'Сетевая стойкость', variant24: 'Чуткая сеть',
        variant25: 'Ускользающий поплавок', variant26: 'Дикая волна', variant27: 'Мощь тины',
        variant28: 'Поплавковая волна внезапно', variant29: 'Каменное плетение', variant30: 'Разросшаяся сеть',
        variant31: 'Сетевой рывок', variant32: 'Живучее плетение', variant33: 'Неутомимая волна',
        variant34: 'Сетевая прыть', variant35: 'Сетевая выносливость'
    },
    enem4: {
        variant1: 'Струнный удар', variant2: 'Острая струна', variant3: 'Струнная сила',
        variant4: 'Резонансная защита', variant5: 'Перебор струн', variant6: 'Звон струны',
        variant7: 'Струнная мощь', variant8: 'Прочная струна', variant9: 'Перебор и внезапный рывок',
        variant10: 'Живучий Струнобой', variant11: 'Цепкая струна', variant12: 'Перебор и на дно',
        variant13: 'Толстая струна', variant14: 'Неутомимый Струнобой', variant15: 'Пружинистая струна',
        variant16: 'Меткий перебор', variant17: 'Струнная хватка', variant18: 'Звенящий взгляд',
        variant19: 'Перебор струн вмиг', variant20: 'Звенящий дух', variant21: 'Стойкая струна',
        variant22: 'Юркий Струнобой', variant23: 'Струнная стойкость', variant24: 'Чуткая струна',
        variant25: 'Ускользающий перебор', variant26: 'Дикий перебор', variant27: 'Мощь звона',
        variant28: 'Рывок после перебора внезапно', variant29: 'Каменная струна', variant30: 'Перебор разросся',
        variant31: 'Струнный рывок', variant32: 'Живучая струна', variant33: 'Неутомимый рывок',
        variant34: 'Струнная прыть', variant35: 'Струнная выносливость'
    },
    enem5: {
        variant1: 'Ладейный удар', variant2: 'Нос ладьи', variant3: 'Ладейная сила',
        variant4: 'Просмолённая обшивка', variant5: 'Величавая волна', variant6: 'Смола ладьи',
        variant7: 'Ладейная мощь', variant8: 'Прочная обшивка', variant9: 'Плавная величавая волна',
        variant10: 'Живучий Ладейник', variant11: 'Цепкий нос ладьи', variant12: 'Волна и в глубину',
        variant13: 'Толстая обшивка', variant14: 'Неутомимый Ладейник', variant15: 'Пружинистая ладья',
        variant16: 'Меткий нос', variant17: 'Ладейная хватка', variant18: 'Взгляд с носа ладьи',
        variant19: 'Величавая волна вмиг', variant20: 'Дух старой ладьи', variant21: 'Стойкая обшивка',
        variant22: 'Юркий Ладейник', variant23: 'Ладейная стойкость', variant24: 'Чуткая обшивка',
        variant25: 'Ускользающая волна', variant26: 'Дикая величавая волна', variant27: 'Мощь смолы',
        variant28: 'Плавная волна внезапно', variant29: 'Каменная обшивка', variant30: 'Разросшаяся ладья',
        variant31: 'Ладейный рывок', variant32: 'Живучая обшивка', variant33: 'Величавая волна вновь',
        variant34: 'Ладейная прыть', variant35: 'Ладейная выносливость'
    }
};
