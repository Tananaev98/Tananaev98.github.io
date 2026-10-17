let lvlNumber = 38;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 38 — «Сокровища речного дна», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом. 'wave' у четырёх:
// Жемчужник качается вязкой донной волной, Чекан крутится и виляет мелкой быстрой
// волной как монета на ребре, Осетрыч (финал) идёт мощной синусоидой матёрой рыбы.
// Скрыня — единственный не-wave (lateRush): тяжёлый сундук не колеблется, а
// перекатывается-переваливается резким рывком. Глубинник — 'wave' тоже (пловец
// гребёт волнообразно), но с самой резкой короткой амплитудой уровня.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.84, damageMultiplier: 2.23, minWaveDelay: 1980, minShotDelay: 136, minTelegraphMs: 510,
	phases: [
		{ phase: 1, minHp: 0.632, cadence: 1.019, speed: 1.017, damage: 1, telegraphMultiplier: 0.982, surpriseChance: 0.155, maxActiveAttacks: 17 },
		{ phase: 2, minHp: 0.282, cadence: 0.79, speed: 1.171, damage: 1.2, telegraphMultiplier: 0.861, surpriseChance: 0.3, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0, cadence: 0.64, speed: 1.3, damage: 1.34, telegraphMultiplier: 0.771, surpriseChance: 0.42, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: { combatIdentity: "Раскрытие жемчужного затвора", combatTrick: "Первый медленный правый всплеск обгоняют быстрые перебросы между краями. Одни серии заканчиваются двумя правыми, другие двумя левыми ударами: нельзя ни гасить всё по появлению, ни автоматически возвращаться после одного удара.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.98, telegraphMs: 903, speedMultiplier: 0.996, damageMultiplier: 0.92, speedVariance: [1.01, 1.04, 1.07, 1.1, 1.13] },
		enem2: { combatIdentity: "Водяной рез с откликом", combatTrick: "Левый рез подводит к двум ударам правой середины и возврату влево; длинные серии требуют ещё одного правого ответа. Часть серий начинается двумя левыми, ломая привычку сразу переносить прицел вправо.", signatureEvery: 4, movementStyle: 'wave', cadence: 1.1, telegraphMs: 769, speedMultiplier: 1.099, damageMultiplier: 0.94, speedVariance: [1.012, 1.042, 1.072, 1.102, 1.132] },
		enem3: { combatIdentity: "Двойное грузило", combatTrick: "Обычные серии чередуют правую середину и левую сторону с меняющимся ритмом. Фирменное грузило заменяет чередование двумя левыми ударами перед правым возвратом. Нельзя одинаково переносить прицел после первого левого удара каждой серии.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.999, telegraphMs: 820, speedMultiplier: 1.097, damageMultiplier: 1, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "Затвор с поздним выбросом", combatTrick: "Сундук чередует левую сторону и правую середину, ускоряя атаки в конце пути. Сначала медленная атака может стать срочной перед очередным переносом: нельзя оценивать оставшееся время по скорости раскрытия.", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.903, telegraphMs: 970, speedMultiplier: 1.061, damageMultiplier: 1.18, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "Щитки с переменой окончания", combatTrick: "Короткая серия даёт правый, левый и два правых удара. Длинный фирменный натиск начинается двумя левыми, переходит вправо и возвращается двумя левыми; другой длинный вариант сдваивает правую сторону до и после левого. Окончание нужно дочитывать до последнего парного удара.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.798, telegraphMs: 681, speedMultiplier: 1.1, damageMultiplier: 1.08, speedVariance: [1.065, 1.085, 1.105, 1.125, 1.145] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl38/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl38/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl38/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl38/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl38/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Жемчужник', image: 'images/enemies/regions/4_rech_ozer/lvl38/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 320, xPos: 50, size: '24%',
		deathAnimation: { preset: 'shellSplit', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Чекан', image: 'images/enemies/regions/4_rech_ozer/lvl38/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 460, xPos: 50, size: '23%',
		deathAnimation: { preset: 'coinSpinFade', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Глубинник', image: 'images/enemies/regions/4_rech_ozer/lvl38/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 580, xPos: 50, size: '26%',
		deathAnimation: { preset: 'ragSink', durationMs: 1350 }
	},
	enem4: {
		name: 'enem4', dispName: 'Скрыня', image: 'images/enemies/regions/4_rech_ozer/lvl38/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 720, xPos: 50, size: '27%',
		deathAnimation: { preset: 'lidBurst', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Осетрыч', image: 'images/enemies/regions/4_rech_ozer/lvl38/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '30%',
		deathAnimation: { preset: 'plateShedSink', durationMs: 1600 }
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
let timeNextBoss = 8;
const bossInterval = 6;

const bossAbilities = [
	// ===== Жемчужник =====
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 0.51, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.07, waveFrequency: 1.4, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.12, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 0.81, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 0.81, wavePhase: 0 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.81, wavePhase: 0 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 0.51, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.07, waveFrequency: 1.4, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.12, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.12, wavePhase: 0 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 7.07, waveFrequency: 1.12, wavePhase: 0 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 0.81, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 0.51, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 1.4, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.4, wavePhase: 0 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.12, wavePhase: 0 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 0.81, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.51, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 1.4, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.07, waveFrequency: 1.4, wavePhase: 0 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.12, wavePhase: 0.5 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 0.81, wavePhase: 0 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.07, waveFrequency: 0.51, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.4, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.12, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 1.12, wavePhase: 0 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 1.12, wavePhase: 0 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 0.81, wavePhase: 0.5 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.07, waveFrequency: 0.51, wavePhase: 1.1 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.4, wavePhase: 0.3 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.4, wavePhase: 0 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 7.07, waveFrequency: 1.4, wavePhase: 0 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.12, wavePhase: 0.5 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 0.81, wavePhase: 1.1 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 0.51, wavePhase: 0.3 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.51, wavePhase: 0 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 0.51, wavePhase: 0 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 7.07, waveFrequency: 1.4, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 9.07, waveFrequency: 1.12, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 0.81, wavePhase: 0.3 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 0.81, wavePhase: 0 }, // 40 h

	// ===== Чекан =====
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 4.06, waveFrequency: 1.21, wavePhase: 0 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 6.07, waveFrequency: 3.2, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 8.06, waveFrequency: 2.53, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 4.06, waveFrequency: 1.87, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 6.07, waveFrequency: 1.87, wavePhase: 0 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 8.06, waveFrequency: 1.87, wavePhase: 0 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.06, waveFrequency: 1.21, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 6.07, waveFrequency: 3.2, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 8.06, waveFrequency: 2.53, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 2.53, wavePhase: 0 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 6.07, waveFrequency: 2.53, wavePhase: 0 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.06, waveFrequency: 1.87, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 4.06, waveFrequency: 1.21, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 6.07, waveFrequency: 3.2, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 8.06, waveFrequency: 3.2, wavePhase: 0 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.06, waveFrequency: 2.53, wavePhase: 0.5 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 6.07, waveFrequency: 1.21, wavePhase: 0 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.06, waveFrequency: 3.2, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 4.06, waveFrequency: 2.53, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 6.07, waveFrequency: 1.87, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 8.06, waveFrequency: 1.87, wavePhase: 0 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 4.06, waveFrequency: 1.87, wavePhase: 0 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 6.07, waveFrequency: 1.21, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 8.06, waveFrequency: 3.2, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 4.06, waveFrequency: 2.53, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 6.07, waveFrequency: 2.53, wavePhase: 0 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 8.06, waveFrequency: 2.53, wavePhase: 0 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.06, waveFrequency: 1.87, wavePhase: 0.5 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 6.07, waveFrequency: 1.21, wavePhase: 1.1 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 8.06, waveFrequency: 3.2, wavePhase: 0.3 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 3.2, wavePhase: 0 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 6.07, waveFrequency: 2.53, wavePhase: 0.5 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 8.06, waveFrequency: 1.21, wavePhase: 0 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.06, waveFrequency: 3.2, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 6.07, waveFrequency: 2.53, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 8.06, waveFrequency: 1.87, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 1.87, wavePhase: 0 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 38, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 6.07, waveFrequency: 1.87, wavePhase: 0 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.06, waveFrequency: 1.21, wavePhase: 0.5 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 4.06, waveFrequency: 3.2, wavePhase: 1.1 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 6.07, waveFrequency: 2.53, wavePhase: 0.3 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 8.06, waveFrequency: 2.53, wavePhase: 0 }, // 41 h

	// ===== Глубинник =====
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.05, waveFrequency: 2.3, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 1.93, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.55, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 7.05, waveFrequency: 1.18, wavePhase: 0 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 9.08, waveFrequency: 2.3, wavePhase: 0.5 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.07, waveFrequency: 1.93, wavePhase: 1.1 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 7.05, waveFrequency: 1.55, wavePhase: 0.3 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.55, wavePhase: 0 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.55, wavePhase: 0 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.05, waveFrequency: 1.18, wavePhase: 0.5 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 2.3, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.93, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 7.05, waveFrequency: 1.93, wavePhase: 0 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 1.93, wavePhase: 0 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.55, wavePhase: 0.5 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 7.05, waveFrequency: 1.18, wavePhase: 1.1 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 2.3, wavePhase: 0.3 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 2.3, wavePhase: 0 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 7.05, waveFrequency: 2.3, wavePhase: 0 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 9.08, waveFrequency: 1.93, wavePhase: 0.5 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.07, waveFrequency: 1.55, wavePhase: 1.1 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 7.05, waveFrequency: 1.18, wavePhase: 0.3 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.18, wavePhase: 0 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 0 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.05, waveFrequency: 2.3, wavePhase: 0.5 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.08, waveFrequency: 1.93, wavePhase: 1.1 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.55, wavePhase: 0.3 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 7.05, waveFrequency: 1.55, wavePhase: 0 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 1.55, wavePhase: 0 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 0.5 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 7.05, waveFrequency: 2.3, wavePhase: 1.1 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.93, wavePhase: 0.3 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.93, wavePhase: 0 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 39, customSpeed: 5, waveAmplitude: 7.05, waveFrequency: 1.93, wavePhase: 0 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 9.08, waveFrequency: 1.55, wavePhase: 0.5 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 1.1 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 7.05, waveFrequency: 2.3, wavePhase: 0.3 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 2.3, wavePhase: 0 }, // 38 h

	// ===== Скрыня =====
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 33, customHP: 1, customDamage: 35, customSpeed: 5 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.75 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 16.75 }, // 39 h

	// ===== Осетрыч =====
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 0.51, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 2.59, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 14.05, waveFrequency: 1.9, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 0 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 14.05, waveFrequency: 1.18, wavePhase: 0 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 0.51, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 2.59, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 14.05, waveFrequency: 1.9, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 1.9, wavePhase: 0 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 0.5 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 14.05, waveFrequency: 2.59, wavePhase: 0 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.9, wavePhase: 0.5 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 1.1 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 14.05, waveFrequency: 0.51, wavePhase: 0.3 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 0.51, wavePhase: 0 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 9.58, waveFrequency: 0.51, wavePhase: 0 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 14.05, waveFrequency: 2.59, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 1.9, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 14.05, waveFrequency: 1.18, wavePhase: 0 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 0 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 0.51, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 14.05, waveFrequency: 2.59, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 5.07, waveFrequency: 1.9, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 1.9, wavePhase: 0 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 14.05, waveFrequency: 1.9, wavePhase: 0 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 0.5 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.51, wavePhase: 1.1 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 14.05, waveFrequency: 2.59, wavePhase: 0.3 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 2.59, wavePhase: 0 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.9, wavePhase: 0.5 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 14.05, waveFrequency: 0.51, wavePhase: 0 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 2.59, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 1.9, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 14.05, waveFrequency: 1.18, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 1.18, wavePhase: 0 }, // 36 g
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: 47, customSpeed: 5, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 0 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 14.05, waveFrequency: 0.51, wavePhase: 0.5 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.07, waveFrequency: 2.59, wavePhase: 1.1 }, // 39 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 9.58, waveFrequency: 1.9, wavePhase: 0.3 }, // 40 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 14.05, waveFrequency: 1.9, wavePhase: 0 }, // 41 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 169, bossDelayAbDop: 6804, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 159, bossDelayAbDop: 6804, firstWaveDelayMs: 2000 }, // 
	{ boss: 'enem3', bossDelayAb: 162, bossDelayAbDop: 6805, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 161, bossDelayAbDop: 6804, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 161, bossDelayAbDop: 7999, firstWaveDelayMs: 2374 }, // 
];

const bossAbilitiesDop = [
	// Жемчужник
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 300, 600], openingOrder: 0, label: "Справа, медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 0, 0, 300], label: "Медленный справа, дважды слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 300, 600], label: "Справа, медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [600, 0, 300, 300, 300], label: "Медленный справа, слева, справа, дважды слева и справа" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [300, 300, 300, 300], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 300, 600], openingOrder: 1, label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 300, 0], label: "Медленный справа, слева, справа и дважды слева" },
	{ boss: 'enem1', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 600, 0], label: "Справа, медленный справа, слева, справа и слева" },

	// Чекан
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 0, 600], openingOrder: 0, label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 600, 600], label: "Слева, в центр, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [300, 300, 300, 300, 300], label: "Слева, два в центр, медленный справа, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [600, 300, 0, 300], label: "Слева, медленный справа, два в центр и слева" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [0, 0, 600, 600], label: "Слева, в центр, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 0, 300, 300], openingOrder: 1, label: "Слева, медленный справа, два в центр, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 600, 600, 0], label: "Слева, в центр, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [37, 38, 39, 40, 41], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 0, 600], label: "Дважды слева, в центр, медленный справа и слева" },

	// Глубинник
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 300, 600], openingOrder: 0, label: "В центр, слева, медленный справа и в центр" },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [0, 650, 650, 200], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [0, 450, 650, 450], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18], shotGapsMs: [0, 450, 450, 450], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23], shotGapsMs: [300, 300, 600, 600], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 0, 600], openingOrder: 1, label: "В центр, дважды слева, медленный справа и в центр" },
	{ boss: 'enem3', indexAbilities: [29, 30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [450, 450, 650, 450], label: "В центр, медленный справа, слева, в центр и слева" },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37, 38], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 0, 600], label: "В центр, дважды слева, медленный справа и в центр" },

	// Скрыня
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 600, 600, 300], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 600, 0, 600], openingOrder: 0, label: "Слева, в центр, слева, медленный справа и в центр" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [600, 600, 0, 300], label: "Слева, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 600, 600, 300], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [600, 600, 300, 300], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 0, 600], openingOrder: 1, label: "Слева, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 600, 300], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 600, 0, 300], label: "Слева, в центр, слева, медленный справа и в центр" },

	// Осетрыч
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 600, 600, 0], openingOrder: 0, label: "В центр, слева, медленный справа и два в центр" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [600, 600, 300, 300, 0], label: "В центр, медленный справа, в центр, слева и два в центр" },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [0, 300, 300, 600], label: "В центр, слева, в центр, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [0, 300, 300, 600], label: "В центр, слева, в центр, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [300, 600, 600, 0], label: "В центр, слева, медленный справа и два в центр" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 600, 600, 0], openingOrder: 1, label: "Дважды слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 0, 600], label: "В центр, слева, в центр, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [37, 38, 39, 40, 41], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 600, 600, 0], label: "В центр, слева, медленный справа и два в центр" },

];

// Лорные названия связок. Уровень 38 — глубинная стража: Жемчужник (моллюск),
// Чекан (мелкая монетная нежить), Глубинник (донный житель), Скрыня (сундук),
// Осетрыч (осётр, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Жемчужный удар', variant2: 'Вязкий шаг', variant3: 'Жемчужная сила',
        variant4: 'Куполообразный панцирь', variant5: 'Донная тягучая волна', variant6: 'Илистая слизь',
        variant7: 'Жемчужная мощь', variant8: 'Плотный панцирь', variant9: 'Густая донная волна',
        variant10: 'Живучий Жемчужник', variant11: 'Цепкая лапа', variant12: 'Волна и в глубокий ил',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый Жемчужник', variant15: 'Лапа пружинит',
        variant16: 'Меткий укол', variant17: 'Жемчужная хватка', variant18: 'Немигающий взгляд из ила',
        variant19: 'Донная волна вмиг', variant20: 'Донный дух', variant21: 'Панцирь стойкий',
        variant22: 'Юркий вопреки тяжести', variant23: 'Жемчужная стойкость', variant24: 'Чуткая лапа',
        variant25: 'Ускользающая тягучая волна', variant26: 'Дикая вязкая волна', variant27: 'Мощь ила',
        variant28: 'Донная волна внезапно', variant29: 'Каменный панцирь', variant30: 'Жемчуг разросся',
        variant31: 'Жемчужный рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимая донная волна',
        variant34: 'Жемчужная прыть', variant35: 'Жемчужная выносливость'
    },
    enem2: {
        variant1: 'Чеканный удар', variant2: 'Быстрый край', variant3: 'Чеканная сила',
        variant4: 'Медный бок', variant5: 'Краевая волна', variant6: 'Ржавая пыль',
        variant7: 'Чеканная мощь', variant8: 'Плотный медный бок', variant9: 'Мелкая быстрая краевая волна',
        variant10: 'Живучий Чекан', variant11: 'Цепкий острый край', variant12: 'Краевая волна и вглубь',
        variant13: 'Толстый медный бок', variant14: 'Неутомимый Чекан', variant15: 'Острый край пружинит',
        variant16: 'Меткий чекан', variant17: 'Чеканная хватка', variant18: 'Блеск в глазах',
        variant19: 'Краевая волна вмиг', variant20: 'Кладовый дух', variant21: 'Медь стойкая',
        variant22: 'Юркий Чекан', variant23: 'Чеканная стойкость', variant24: 'Чуткий острый край',
        variant25: 'Ускользающий чекан', variant26: 'Дикая краевая волна', variant27: 'Мощь ржавчины',
        variant28: 'Краевая волна внезапно', variant29: 'Каменная медь', variant30: 'Чекан разросся',
        variant31: 'Чеканный рывок', variant32: 'Живучая медь', variant33: 'Неутомимая краевая волна',
        variant34: 'Чеканная прыть', variant35: 'Чеканная выносливость'
    },
    enem3: {
        variant1: 'Донный удар', variant2: 'Короткий гребок', variant3: 'Донная сила',
        variant4: 'Тёмная шкура', variant5: 'Резкая волна', variant6: 'Придонная муть',
        variant7: 'Донная мощь', variant8: 'Плотная тёмная шкура', variant9: 'Короткая резкая волна',
        variant10: 'Живучий Глубинник', variant11: 'Цепкий гребок', variant12: 'Резкая волна и в муть',
        variant13: 'Толстая шкура', variant14: 'Неутомимый Глубинник', variant15: 'Гребок пружинит',
        variant16: 'Меткий укол из тьмы', variant17: 'Донная хватка', variant18: 'Взгляд из глубины',
        variant19: 'Резкая волна вмиг', variant20: 'Глубинный дух', variant21: 'Шкура стойкая',
        variant22: 'Юркий Глубинник', variant23: 'Донная стойкость', variant24: 'Чуткий гребок',
        variant25: 'Ускользающий в муть', variant26: 'Дикая резкая волна', variant27: 'Мощь мути',
        variant28: 'Резкая волна внезапно', variant29: 'Каменная шкура', variant30: 'Тьма разрослась',
        variant31: 'Донный рывок', variant32: 'Живучая шкура', variant33: 'Неутомимая резкая волна',
        variant34: 'Донная прыть', variant35: 'Донная выносливость'
    },
    enem4: {
        variant1: 'Сундучный удар', variant2: 'Тяжёлый крен', variant3: 'Сундучная сила',
        variant4: 'Кованая крышка', variant5: 'Перекатный рывок', variant6: 'Ржавая труха',
        variant7: 'Сундучная мощь', variant8: 'Плотная кованая крышка', variant9: 'Тяжёлый широкий перекат',
        variant10: 'Живучая Скрыня', variant11: 'Цепкий замок', variant12: 'Перекат и в ил',
        variant13: 'Толстая кованая крышка', variant14: 'Неутомимая Скрыня', variant15: 'Замок пружинит',
        variant16: 'Меткий засов', variant17: 'Сундучная хватка', variant18: 'Немигающий замочный глаз',
        variant19: 'Перекатный рывок мгновенно', variant20: 'Кладовый дух вдвойне', variant21: 'Крышка держит',
        variant22: 'Юркая вопреки весу', variant23: 'Сундучная стойкость', variant24: 'Чуткий замок',
        variant25: 'Ускользающий перекат', variant26: 'Дикий перекатный рывок', variant27: 'Мощь ржавчины вдвойне',
        variant28: 'Перекатный рывок внезапно', variant29: 'Каменная крышка', variant30: 'Замок разросся',
        variant31: 'Сундучный рывок', variant32: 'Живучая крышка', variant33: 'Неутомимый перекат',
        variant34: 'Сундучная прыть', variant35: 'Сундучная выносливость'
    },
    enem5: {
        variant1: 'Осетровый удар', variant2: 'Мощная синусоида', variant3: 'Осетровая сила',
        variant4: 'Костяная броня', variant5: 'Волновой размах', variant6: 'Речная муть',
        variant7: 'Осетровая мощь', variant8: 'Плотная костяная броня', variant9: 'Широкий волновой размах',
        variant10: 'Живучий Осетрыч', variant11: 'Цепкий костяной гребень', variant12: 'Размах и на глубину',
        variant13: 'Толстая костяная броня', variant14: 'Неутомимый Осетрыч', variant15: 'Гребень пружинит',
        variant16: 'Меткий гребень', variant17: 'Осетровая хватка', variant18: 'Царственный взгляд',
        variant19: 'Волновой размах вмиг', variant20: 'Речной царственный дух', variant21: 'Броня стойкая',
        variant22: 'Юркий вопреки мощи', variant23: 'Осетровая стойкость', variant24: 'Чуткий гребень',
        variant25: 'Ускользающий размах', variant26: 'Дикая синусоида', variant27: 'Мощь мути вдвойне',
        variant28: 'Волновой размах внезапно', variant29: 'Каменная броня', variant30: 'Размах разросся',
        variant31: 'Осетровый рывок', variant32: 'Живучая броня', variant33: 'Неутомимая синусоида',
        variant34: 'Осетровая прыть', variant35: 'Осетровая выносливость'
    }
};
