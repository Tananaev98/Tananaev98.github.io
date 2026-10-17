let lvlNumber = 32;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 32 — «Переправа через реку», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую (см. §12) — состав совпадает с идея-документом.
// Почти все боссы уровня — 'wave' с разными per-атака amplitude/frequency
// (движковый механизм из §0.1, введён на уровне 31): Мохогляд качается медленно
// и широко, Вёслыч гребёт равномерными взмахами, Крючень цепляет резкими рывками
// волны, Пагодник завершает плавной властной раскачкой. Зубоплот — единственный
// не-wave (drift): паром идёт направленным сносом поперёк течения, а не колышется.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.9, damageMultiplier: 2.05, minWaveDelay: 2100, minShotDelay: 148, minTelegraphMs: 540,
	phases: [
		{ phase: 1, minHp: 0.636, cadence: 0.986, speed: 0.987, damage: 1, telegraphMultiplier: 1.015, surpriseChance: 0.153, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.287, cadence: 0.84, speed: 1.13, damage: 1.16, telegraphMultiplier: 0.888, surpriseChance: 0.272, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0, cadence: 0.69, speed: 1.25, damage: 1.29, telegraphMultiplier: 0.812, surpriseChance: 0.37, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { combatIdentity: "Ягода с ветки", combatTrick: "медленная ягода висит на дальнем правом краю фоном, а быстрые удары чередуют левый край и дальнюю правую сторону; в первом выходе близкий правый удар прилетает сразу после последнего левого, в поздних фазах остаётся короткая тройка левый, правый, левый", signatureEvery: 4, movementStyle: 'wave', cadence: 0.981, telegraphMs: 870, speedMultiplier: 1.041, damageMultiplier: 0.87, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem2: { combatIdentity: "Шип после ягодки", combatTrick: "после медленной правой ягоды левый край открывает серию, правая середина бьёт дважды подряд, и левый удар её замыкает; от фазы к фазе левая цель сдвигается к краю, а серия начинается раньше", signatureEvery: 4, movementStyle: 'wave', cadence: 0.919, telegraphMs: 799, speedMultiplier: 1.12, damageMultiplier: 0.94, speedVariance: [0.99, 1.02, 1.05, 1.08, 1.11] },
		enem3: { combatIdentity: "Гроздь рассыпается", combatTrick: "дрейфующие удары: первой прилетает правая середина, затем две левые цели почти вплотную друг к другу, и правая середина замыкает комбо; во второй фазе левая пара отстаёт от первого удара больше чем на полсекунды", signatureEvery: 4, movementStyle: 'drift', cadence: 1.103, telegraphMs: 950, speedMultiplier: 1.15, damageMultiplier: 1.14, speedVariance: [0.98, 1.01, 1.04, 1.07, 1.1] },
		enem4: { combatIdentity: "Сетка кожуры", combatTrick: "левый край и правая середина чередуются, а в конце первого выхода правая середина бьёт два раза подряд; во второй фазе два удара правой середины падают почти разом, в завершении после правой середины идут два левых подряд", signatureEvery: 4, movementStyle: 'wave', cadence: 1.05, telegraphMs: 761, speedMultiplier: 1.081, damageMultiplier: 1.02, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "Полосатый раскат", combatTrick: "правая середина открывает серию, за ней два левых удара вплотную; во второй фазе порядок чередуется: центр, левый, центр, левый, а в завершении снова центр и два левых подряд", signatureEvery: 4, movementStyle: 'wave', cadence: 0.86, telegraphMs: 710, speedMultiplier: 1.119, damageMultiplier: 1.1, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl32/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl32/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl32/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl32/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl32/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Мохогляд', image: 'images/enemies/regions/4_rech_ozer/lvl32/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 260, xPos: 50, size: '25%',
		deathAnimation: { preset: 'mossCrumble', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Вёслыч', image: 'images/enemies/regions/4_rech_ozer/lvl32/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 400, xPos: 50, size: '24%',
		deathAnimation: { preset: 'ragCollapse', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Зубоплот', image: 'images/enemies/regions/4_rech_ozer/lvl32/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 520, xPos: 50, size: '28%',
		deathAnimation: { preset: 'plankBreak', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Крючень', image: 'images/enemies/regions/4_rech_ozer/lvl32/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 660, xPos: 50, size: '27%',
		deathAnimation: { preset: 'armorShatter', durationMs: 1400 }
	},
	enem5: {
		name: 'enem5', dispName: 'Пагодник', image: 'images/enemies/regions/4_rech_ozer/lvl32/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '30%',
		deathAnimation: { preset: 'roofCollapse', durationMs: 1550 }
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
const bossInterval = 7;

const bossAbilities = [
	// ===== Мохогляд =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.38, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 7.08, waveFrequency: 1.19, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 0.94, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.69, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 7.08, waveFrequency: 0.69, wavePhase: 0 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.38, wavePhase: 1.1 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 0.3 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 7.08, waveFrequency: 1.19, wavePhase: 0 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.94, wavePhase: 0.5 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.69, wavePhase: 1.1 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 7.08, waveFrequency: 0.38, wavePhase: 0.3 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.94, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.69, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 7.08, waveFrequency: 0.69, wavePhase: 0 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.38, wavePhase: 0.5 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 1.1 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 7.08, waveFrequency: 0.94, wavePhase: 0.3 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 1.19, wavePhase: 0 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.94, wavePhase: 0.5 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 7.08, waveFrequency: 0.69, wavePhase: 1.1 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.38, wavePhase: 0.3 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.38, wavePhase: 0 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 7.08, waveFrequency: 0.94, wavePhase: 0 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 0.69, wavePhase: 0.5 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.38, wavePhase: 1.1 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 7.08, waveFrequency: 1.19, wavePhase: 0.3 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.19, wavePhase: 0 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.38, wavePhase: 0 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 7.08, waveFrequency: 1.19, wavePhase: 0.5 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.94, wavePhase: 1.1 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.69, wavePhase: 0.3 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 7.08, waveFrequency: 0.69, wavePhase: 0 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.38, wavePhase: 0.5 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 0 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 7.08, waveFrequency: 0.94, wavePhase: 0.5 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 0.69, wavePhase: 1.1 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.38, wavePhase: 0.3 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 7.08, waveFrequency: 1.19, wavePhase: 0 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 0.94, wavePhase: 0.5 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.69, wavePhase: 1.1 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 14, customSpeed: 12, waveAmplitude: 7.08, waveFrequency: 0.38, wavePhase: 0.3 }, // 40 h

	// ===== Вёслыч =====
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.09, waveFrequency: 0.9, wavePhase: 0 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.05, waveFrequency: 1.44, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.09, waveFrequency: 1.15, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.56, waveFrequency: 1.15, wavePhase: 0 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.05, waveFrequency: 1.69, wavePhase: 0 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 4.09, waveFrequency: 1.44, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.56, waveFrequency: 1.15, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.05, waveFrequency: 0.9, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.09, waveFrequency: 0.9, wavePhase: 0 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 1.44, wavePhase: 0 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.05, waveFrequency: 1.15, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.09, waveFrequency: 0.9, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.05, waveFrequency: 1.69, wavePhase: 0 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 4.09, waveFrequency: 1.44, wavePhase: 0.5 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 0.9, wavePhase: 0 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.05, waveFrequency: 1.69, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.09, waveFrequency: 1.44, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.56, waveFrequency: 1.15, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.05, waveFrequency: 1.15, wavePhase: 0 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.09, waveFrequency: 1.69, wavePhase: 0 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.44, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.05, waveFrequency: 1.15, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.09, waveFrequency: 0.9, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.05, waveFrequency: 1.44, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.09, waveFrequency: 1.15, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.56, waveFrequency: 0.9, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.05, waveFrequency: 0.9, wavePhase: 0 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.09, waveFrequency: 1.44, wavePhase: 0 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.15, wavePhase: 0.5 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.05, waveFrequency: 0.9, wavePhase: 1.1 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.09, waveFrequency: 1.69, wavePhase: 0.3 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.05, waveFrequency: 1.15, wavePhase: 0 }, // 35 h
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 4.09, waveFrequency: 0.9, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.05, waveFrequency: 1.44, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.09, waveFrequency: 1.44, wavePhase: 0 }, // 39 h

	// ===== Зубоплот =====
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 95, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 96, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 21, customSpeed: 14.5 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 14.5 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 15.5 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 15.5 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 37, customHP: 1, customDamage: 28, customSpeed: 5 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 12.5 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: 21, customSpeed: 13.5 }, // 37 h

	// ===== Крючень =====
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.05, waveFrequency: 1.19, wavePhase: 0 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.57, waveFrequency: 2.61, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 9.06, waveFrequency: 2.13, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 4.05, waveFrequency: 1.68, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.57, waveFrequency: 1.68, wavePhase: 0 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.06, waveFrequency: 2.61, wavePhase: 0 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.05, waveFrequency: 2.13, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.57, waveFrequency: 1.68, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 9.06, waveFrequency: 1.19, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 4.05, waveFrequency: 1.19, wavePhase: 0 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.57, waveFrequency: 2.13, wavePhase: 0 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.06, waveFrequency: 1.68, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 4.05, waveFrequency: 1.19, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 6.57, waveFrequency: 2.61, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 9.06, waveFrequency: 2.61, wavePhase: 0 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.05, waveFrequency: 1.68, wavePhase: 0 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.57, waveFrequency: 1.19, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 9.06, waveFrequency: 2.61, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 4.05, waveFrequency: 2.13, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.57, waveFrequency: 2.13, wavePhase: 0 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.06, waveFrequency: 1.19, wavePhase: 0 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.05, waveFrequency: 2.61, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.57, waveFrequency: 2.13, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 9.06, waveFrequency: 1.68, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 4.05, waveFrequency: 1.68, wavePhase: 0 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.57, waveFrequency: 2.61, wavePhase: 0 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.06, waveFrequency: 2.13, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 4.05, waveFrequency: 1.68, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 6.57, waveFrequency: 1.19, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 9.06, waveFrequency: 1.19, wavePhase: 0 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.05, waveFrequency: 2.61, wavePhase: 0.5 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.57, waveFrequency: 1.68, wavePhase: 0 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.06, waveFrequency: 1.19, wavePhase: 0.5 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 4.05, waveFrequency: 2.61, wavePhase: 1.1 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 6.57, waveFrequency: 2.13, wavePhase: 0.3 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 40, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.06, waveFrequency: 1.68, wavePhase: 0 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.05, waveFrequency: 1.19, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.57, waveFrequency: 2.61, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 9.06, waveFrequency: 2.13, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 4.05, waveFrequency: 2.13, wavePhase: 0 }, // 39 h

	// ===== Пагодник =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 1.6, wavePhase: 1.1 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.25, wavePhase: 0.3 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 12.08, waveFrequency: 1.25, wavePhase: 0 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.88, wavePhase: 0.5 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 0.51, wavePhase: 1.1 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 12.08, waveFrequency: 1.6, wavePhase: 0.3 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 12.08, waveFrequency: 1.25, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.88, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 0.51, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16, waveAmplitude: 12.08, waveFrequency: 0.51, wavePhase: 0 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 1.6, wavePhase: 0.5 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 12.08, waveFrequency: 0.88, wavePhase: 0 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 0.5 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 1.6, wavePhase: 1.1 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16, waveAmplitude: 12.08, waveFrequency: 1.25, wavePhase: 0.3 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 1.25, wavePhase: 0 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 0.51, wavePhase: 0 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 13, waveAmplitude: 12.08, waveFrequency: 1.6, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 1.25, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 0.88, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 12.08, waveFrequency: 0.88, wavePhase: 0 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 13, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 0.5 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 1.25, wavePhase: 0 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 12.08, waveFrequency: 0.88, wavePhase: 0.5 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 1.1 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16, waveAmplitude: 9.08, waveFrequency: 1.6, wavePhase: 0.3 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 12.08, waveFrequency: 1.6, wavePhase: 0 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.88, wavePhase: 0 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 0.51, wavePhase: 0.5 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 12.08, waveFrequency: 1.6, wavePhase: 1.1 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 1.25, wavePhase: 0.3 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 0.88, wavePhase: 0 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 12.08, waveFrequency: 0.51, wavePhase: 0.5 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 1.6, wavePhase: 1.1 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16, waveAmplitude: 9.08, waveFrequency: 1.25, wavePhase: 0.3 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 12.08, waveFrequency: 1.25, wavePhase: 0 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 0 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.6, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15, waveAmplitude: 12.08, waveFrequency: 1.25, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 0.88, wavePhase: 0.3 }, // 39 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 164, bossDelayAbDop: 6801, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 164, bossDelayAbDop: 6801, firstWaveDelayMs: 2256 }, // 
	{ boss: 'enem3', bossDelayAb: 151, bossDelayAbDop: 6798, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 164, bossDelayAbDop: 6799, firstWaveDelayMs: 2064 }, // 
	{ boss: 'enem5', bossDelayAb: 164, bossDelayAbDop: 6801, firstWaveDelayMs: 2208 }, // 
];

const bossAbilitiesDop = [
	// Мохогляд
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 300, 300, 600], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [300, 300, 300, 600, 300] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [300, 300, 300, 600, 300] },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21], shotGapsMs: [600, 0, 300, 600] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26], shotGapsMs: [600, 300, 300, 600] },
	{ boss: 'enem1', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 600, 600, 0], openingOrder: 1, label: "Ягода срывается с ветки — знакомство" },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 300], label: "Ягода срывается с ветки — иной конец" },
	{ boss: 'enem1', indexAbilities: [37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 0, 300], label: "Ягода срывается с ветки — завершение" },

	// Вёслыч
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 300, 300, 300], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [600, 300, 300, 300] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [600, 600, 0, 300, 300] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [300, 300, 300, 300] },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24], shotGapsMs: [600, 300, 300] },
	{ boss: 'enem2', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 300, 300], openingOrder: 1, label: "Шип после ягодки — знакомство" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 300, 300], label: "Шип после ягодки — иной конец" },
	{ boss: 'enem2', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 300, 300], label: "Шип после ягодки — завершение" },

	// Зубоплот
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 600, 0, 300], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8], shotGapsMs: [300, 300, 600] },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 600, 0, 300] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17], shotGapsMs: [600, 300, 600] },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22], shotGapsMs: [600, 600, 0, 0] },
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Гроздь рассыпается — знакомство" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 0, 300], label: "Гроздь рассыпается — иной конец" },
	{ boss: 'enem3', indexAbilities: [33, 34, 35, 36, 37], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 300, 300], label: "Гроздь рассыпается — завершение" },

	// Крючень
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 300, 600, 0] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 300, 600, 600], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [600, 300, 600, 0] },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [300, 300, 600, 600] },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [600, 300, 600, 0] },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 600, 0, 0], openingOrder: 1, label: "Сетка кожуры рвётся — знакомство" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 300, 0], label: "Сетка кожуры рвётся — иной конец" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 600, 600], label: "Сетка кожуры рвётся — завершение" },

	// Пагодник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 600, 600, 0, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [600, 600, 600, 300] },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [600, 600, 600, 300] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 600, 600, 0, 0] },
	{ boss: 'enem5', indexAbilities: [22, 23, 24, 25, 26], shotGapsMs: [600, 600, 600, 300] },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 300], openingOrder: 1, label: "Полосатый раскат — знакомство" },
	{ boss: 'enem5', indexAbilities: [31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 300, 600], label: "Полосатый раскат — иной конец" },
	{ boss: 'enem5', indexAbilities: [36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 300], label: "Полосатый раскат — завершение" },

];

// Лорные названия связок. Уровень 32 — течение: Мохогляд (мшистый), Вёслыч (гребец),
// Зубоплот (зубастый плот), Крючень (багор), Пагодник (властелин омута, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Моховой удар', variant2: 'Ил-коготь', variant3: 'Моховая сила',
        variant4: 'Моховая шкура', variant5: 'Широкая волна', variant6: 'Болотный мох',
        variant7: 'Моховая мощь', variant8: 'Плотный мох', variant9: 'Медленная широкая волна',
        variant10: 'Живучий Мохогляд', variant11: 'Цепкий мох', variant12: 'Волна и в тину',
        variant13: 'Толстый мох', variant14: 'Неутомимый Мохогляд', variant15: 'Пружинистый мох',
        variant16: 'Меткий ил', variant17: 'Моховая хватка', variant18: 'Взгляд из мха',
        variant19: 'Широкая волна вмиг', variant20: 'Болотный дух', variant21: 'Стойкий мох',
        variant22: 'Юркий Мохогляд', variant23: 'Моховая стойкость', variant24: 'Чуткий мох',
        variant25: 'Ускользающий в мох', variant26: 'Дикая волна', variant27: 'Мощь ила',
        variant28: 'Широкая волна внезапно', variant29: 'Каменный мох', variant30: 'Разросшийся мох',
        variant31: 'Моховой рывок', variant32: 'Живучий мох', variant33: 'Неутомимая волна',
        variant34: 'Моховая прыть', variant35: 'Моховая выносливость'
    },
    enem2: {
        variant1: 'Весловой удар', variant2: 'Край весла', variant3: 'Весловая сила',
        variant4: 'Дощатая защита', variant5: 'Меткий гребок', variant6: 'Речная вода',
        variant7: 'Весловая мощь', variant8: 'Прочное весло', variant9: 'Равномерные гребки',
        variant10: 'Живучий Вёслыч', variant11: 'Цепкое весло', variant12: 'Гребок и на глубину',
        variant13: 'Толстое весло', variant14: 'Неутомимый Вёслыч', variant15: 'Пружинистое весло',
        variant16: 'Гребок веслом', variant17: 'Весловая хватка', variant18: 'Взгляд гребца',
        variant19: 'Мгновенный гребок', variant20: 'Дух гребца', variant21: 'Стойкое весло',
        variant22: 'Юркий Вёслыч', variant23: 'Весловая стойкость', variant24: 'Чуткое весло',
        variant25: 'Ускользающий гребок', variant26: 'Дикий гребок', variant27: 'Мощь воды',
        variant28: 'Равномерный гребок внезапно', variant29: 'Каменное весло', variant30: 'Размах весла разросся',
        variant31: 'Весловой рывок', variant32: 'Живучее весло', variant33: 'Неутомимый гребок',
        variant34: 'Весловая прыть', variant35: 'Весловая выносливость'
    },
    enem3: {
        variant1: 'Плотовый удар', variant2: 'Зуб плота', variant3: 'Плотовая сила',
        variant4: 'Брёвенная защита', variant5: 'Снос поперёк', variant6: 'Смола плота',
        variant7: 'Плотовая мощь', variant8: 'Прочные брёвна', variant9: 'Направленный снос течением',
        variant10: 'Живучий Зубоплот', variant11: 'Цепкий зуб', variant12: 'Снос и на мель',
        variant13: 'Толстые брёвна', variant14: 'Неутомимый Зубоплот', variant15: 'Пружинистый плот',
        variant16: 'Зуб плота вмиг', variant17: 'Плотовая хватка', variant18: 'Взгляд плывущего плота',
        variant19: 'Мгновенный снос', variant20: 'Дух плота', variant21: 'Стойкие брёвна',
        variant22: 'Юркий Зубоплот', variant23: 'Плотовая стойкость', variant24: 'Чуткий зуб',
        variant25: 'Ускользающий снос', variant26: 'Дикий снос', variant27: 'Мощь смолы',
        variant28: 'Снос поперёк внезапно', variant29: 'Каменные брёвна', variant30: 'Разросшийся плот',
        variant31: 'Плотовый рывок', variant32: 'Живучие брёвна', variant33: 'Неутомимый снос',
        variant34: 'Плотовая прыть', variant35: 'Плотовая выносливость'
    },
    enem4: {
        variant1: 'Крючковый удар', variant2: 'Острый багор', variant3: 'Крючковая сила',
        variant4: 'Ржавая защита', variant5: 'Рывок багром', variant6: 'Едкая ржавчина',
        variant7: 'Крючковая мощь', variant8: 'Прочный багор', variant9: 'Резкий тугой рывок',
        variant10: 'Живучий Крючень', variant11: 'Цепкий крюк', variant12: 'Рывок и на дно',
        variant13: 'Толстый багор', variant14: 'Неутомимый Крючень', variant15: 'Пружинистый крюк',
        variant16: 'Меткий крюк', variant17: 'Крючковая хватка', variant18: 'Цепкий взгляд',
        variant19: 'Рывок багром вмиг', variant20: 'Ржавый дух', variant21: 'Стойкий багор',
        variant22: 'Юркий Крючень', variant23: 'Крючковая стойкость', variant24: 'Чуткий крюк',
        variant25: 'Ускользающий рывок', variant26: 'Дикий тугой рывок', variant27: 'Мощь ржавчины',
        variant28: 'Резкий рывок внезапно', variant29: 'Каменный багор', variant30: 'Разросшийся крюк',
        variant31: 'Крючковый рывок', variant32: 'Живучий багор', variant33: 'Неутомимый тугой рывок',
        variant34: 'Крючковая прыть', variant35: 'Крючковая выносливость'
    },
    enem5: {
        variant1: 'Властный удар', variant2: 'Шип на крыше', variant3: 'Властная сила',
        variant4: 'Дощатая броня', variant5: 'Властная раскачка', variant6: 'Ржавые доспехи',
        variant7: 'Властная мощь', variant8: 'Прочная броня', variant9: 'Плавная властная раскачка',
        variant10: 'Живучий Пагодник', variant11: 'Цепкий шип крыши', variant12: 'Раскачка и удар щитом',
        variant13: 'Толстая броня', variant14: 'Неутомимый Пагодник', variant15: 'Пружинистый шип крыши',
        variant16: 'Меткий удар булавой', variant17: 'Властная хватка', variant18: 'Взгляд из-под крыши',
        variant19: 'Властная раскачка вмиг', variant20: 'Храмовый дух', variant21: 'Стойкая броня',
        variant22: 'Юркий Пагодник', variant23: 'Властная стойкость', variant24: 'Чуткий шип крыши',
        variant25: 'Ускользающая раскачка', variant26: 'Дикая властная раскачка', variant27: 'Мощь булавы',
        variant28: 'Плавная раскачка внезапно', variant29: 'Каменная броня', variant30: 'Крыша пагоды разрослась',
        variant31: 'Властный рывок', variant32: 'Живучая броня', variant33: 'Неутомимая раскачка',
        variant34: 'Властная прыть', variant35: 'Властная выносливость'
    }
};
