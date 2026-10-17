let lvlNumber = 31;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 31 — «Камышовые берега», первый уровень Области IV «Реки и озёра».
// Первый уровень региона, где официально используется новый тип движения 'wave'
// (введён в game.js этой ревизией — см. lvlData/Правила создания уровня.txt §0.1):
// в отличие от остальных 6 типов, его траектория задаётся ПОЛНОСТЬЮ per-атаку через
// поля waveAmplitude/waveFrequency/wavePhase прямо в bossAbilities, а не зашита в движке.
// Здесь этим типом идут сразу два босса (enem1 и enem2) — и у них НАМЕРЕННО разные
// «почерки» волны: у Резака (заставка/интро-роль) волна широкая и медленная, у
// Клыкокрыла (быстрые серии) — тугая и нервная. Плюс внутри каждого набора атак
// сами amplitude/frequency ещё и меняются от атаки к атаке — чтобы не превращалось
// в очередной фиксированный 'weave' с другими цифрами.
//
// Картинки (см. правило §12 — сверено напрямую, а не с идеи-документа): реальный
// образ enem2 — не «стрекоза-коромысло» из идеи-документа, а чешуйчатый клыкастый
// летун с перепончатыми крыльями (нечто среднее между гарпией и мелким змеем) —
// идея-документ для этого слота устарел, картинка признана истиной (тот же принцип,
// что и с дыней на уровне 28), imя подобрано под реально нарисованное.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.92, damageMultiplier: 2, minWaveDelay: 2150, minShotDelay: 150, minTelegraphMs: 545,
	phases: [
		{ phase: 1, minHp: 0.637, cadence: 1.014, speed: 1.013, damage: 1, telegraphMultiplier: 0.986, surpriseChance: 0.148, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.288, cadence: 0.85, speed: 1.12, damage: 1.15, telegraphMultiplier: 0.9, surpriseChance: 0.26, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0, cadence: 0.7, speed: 1.24, damage: 1.28, telegraphMultiplier: 0.82, surpriseChance: 0.36, maxActiveAttacks: 24 }
	],
	bosses: {
		enem1: { combatIdentity: "Ягода с ветки", combatTrick: "медленная ягода висит на дальнем правом краю фоном, а быстрые удары перебрасывают прицел с левого края на правую сторону и обратно; с каждой фазой правая цель уходит ещё дальше к краю", signatureEvery: 4, movementStyle: 'wave', cadence: 1, telegraphMs: 880, speedMultiplier: 0.998, damageMultiplier: 0.88, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem2: { combatIdentity: "Шип после ягодки", combatTrick: "правая середина и левая сторона бьют попарно в одном ритме под фоновой медленной ягодой справа; в поздних фазах левая цель уезжает на дальний край, а в завершении правая середина бьёт дважды вокруг одного левого удара", signatureEvery: 4, movementStyle: 'wave', cadence: 0.952, telegraphMs: 782, speedMultiplier: 1.091, damageMultiplier: 0.95, speedVariance: [1.01, 1.04, 1.07, 1.1, 1.13] },
		enem3: { combatIdentity: "Гроздь рассыпается", combatTrick: "удары висят медленно и рвутся вперёд поздним рывком; во второй фазе два удара подряд приходят с левого края, в завершении два удара подряд — с правой середины между левыми", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.152, telegraphMs: 980, speedMultiplier: 1.28, damageMultiplier: 1.15, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "Сетка кожуры", combatTrick: "разгоняющиеся удары: сначала правый край и правая середина, затем два левых подряд; в завершении порядок ломается — левый удар вклинивается между правыми", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.899, telegraphMs: 751, speedMultiplier: 0.999, damageMultiplier: 1.05, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "Полосатый раскат", combatTrick: "быстрые удары идут от левого края к правой середине и обратно, а в конце комбо два удара почти одновременно падают на одну сторону; в поздних фазах левая пара сближается", signatureEvery: 4, movementStyle: 'straight', cadence: 0.854, telegraphMs: 702, speedMultiplier: 1.199, damageMultiplier: 1.1, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl31/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl31/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl31/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl31/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl31/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Резак', image: 'images/enemies/regions/4_rech_ozer/lvl31/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 250, xPos: 50, size: '25%',
		deathAnimation: { preset: 'reedCollapse', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Клыкокрыл', image: 'images/enemies/regions/4_rech_ozer/lvl31/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 390, xPos: 50, size: '24%',
		deathAnimation: { preset: 'wingFold', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Древогрыз', image: 'images/enemies/regions/4_rech_ozer/lvl31/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 510, xPos: 50, size: '27%',
		deathAnimation: { preset: 'heavyTopple', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Корнеход', image: 'images/enemies/regions/4_rech_ozer/lvl31/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 650, xPos: 50, size: '28%',
		deathAnimation: { preset: 'rootCrumble', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Шестовик', image: 'images/enemies/regions/4_rech_ozer/lvl31/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'cloakSink', durationMs: 1550 }
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
const bossInterval = 5;

const bossAbilities = [
	// ===== Резак =====
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.52, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.08, waveFrequency: 1.21, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 11.05, waveFrequency: 0.97, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.74, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 8.08, waveFrequency: 0.52, wavePhase: 0 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 11.05, waveFrequency: 1.21, wavePhase: 0.5 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.97, wavePhase: 1.1 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.08, waveFrequency: 0.74, wavePhase: 0.3 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 11.05, waveFrequency: 0.74, wavePhase: 0 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.08, waveFrequency: 0.97, wavePhase: 0.5 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 11.05, waveFrequency: 0.74, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.52, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.08, waveFrequency: 0.52, wavePhase: 0 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 11.05, waveFrequency: 0.52, wavePhase: 0 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0.5 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.08, waveFrequency: 0.97, wavePhase: 1.1 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 11.05, waveFrequency: 0.74, wavePhase: 0.3 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.74, wavePhase: 0 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.08, waveFrequency: 0.52, wavePhase: 0.5 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 11.05, waveFrequency: 0.52, wavePhase: 0 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.08, waveFrequency: 0.97, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 11.05, waveFrequency: 0.74, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.74, wavePhase: 0 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 8.08, waveFrequency: 0.52, wavePhase: 1.1 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 11.05, waveFrequency: 1.21, wavePhase: 0.3 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 0 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.08, waveFrequency: 0.97, wavePhase: 0.5 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 11.05, waveFrequency: 0.74, wavePhase: 1.1 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.52, wavePhase: 0.3 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 8.08, waveFrequency: 0.74, wavePhase: 0 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 11.05, waveFrequency: 0.52, wavePhase: 0.5 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 1.21, wavePhase: 1.1 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.08, waveFrequency: 0.97, wavePhase: 0.3 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 42, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 11.05, waveFrequency: 0.74, wavePhase: 0 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 5.08, waveFrequency: 0.52, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.08, waveFrequency: 1.21, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 11.05, waveFrequency: 0.97, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.97, wavePhase: 0 }, // 39 h

	// ===== Клыкокрыл =====
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.06, waveFrequency: 3.2, wavePhase: 1.1 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 7.56, waveFrequency: 2.59, wavePhase: 0.3 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 11.05, waveFrequency: 2.59, wavePhase: 0 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 2.01, wavePhase: 0.5 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 7.56, waveFrequency: 1.39, wavePhase: 1.1 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 11.05, waveFrequency: 3.2, wavePhase: 0.3 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.06, waveFrequency: 2.59, wavePhase: 0 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 7.56, waveFrequency: 2.01, wavePhase: 0.5 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 11.05, waveFrequency: 1.39, wavePhase: 1.1 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 3.2, wavePhase: 0.3 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 3.2, wavePhase: 0 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 11.05, waveFrequency: 2.01, wavePhase: 0 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 4.06, waveFrequency: 1.39, wavePhase: 0.5 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 7.56, waveFrequency: 3.2, wavePhase: 1.1 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 11.05, waveFrequency: 2.59, wavePhase: 0.3 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 2.59, wavePhase: 0 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 1.39, wavePhase: 0 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 11.05, waveFrequency: 3.2, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 4.06, waveFrequency: 2.59, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 2.01, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 11.05, waveFrequency: 2.01, wavePhase: 0 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.06, waveFrequency: 2.59, wavePhase: 1.1 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 7.56, waveFrequency: 2.01, wavePhase: 0.3 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 11.05, waveFrequency: 2.01, wavePhase: 0 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 1.39, wavePhase: 0.5 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 7.56, waveFrequency: 3.2, wavePhase: 1.1 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 11.05, waveFrequency: 2.59, wavePhase: 0.3 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 4.06, waveFrequency: 2.01, wavePhase: 0 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 7.56, waveFrequency: 1.39, wavePhase: 0.5 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 11.05, waveFrequency: 3.2, wavePhase: 1.1 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 2.59, wavePhase: 0.3 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 2.59, wavePhase: 0 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 11.05, waveFrequency: 1.39, wavePhase: 0 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 4.06, waveFrequency: 3.2, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 7.56, waveFrequency: 2.59, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 11.05, waveFrequency: 2.01, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 4.06, waveFrequency: 2.01, wavePhase: 0 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 38, customHP: 1, customDamage: 28, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 3.2, wavePhase: 0 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12, waveAmplitude: 11.05, waveFrequency: 2.59, wavePhase: 0.5 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13, waveAmplitude: 4.06, waveFrequency: 2.01, wavePhase: 1.1 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 1.39, wavePhase: 0.3 }, // 40 h

	// ===== Древогрыз =====
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 7, customHP: 1, customDamage: 25, customSpeed: 14 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 14 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 14.5 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 14.5 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 25, customSpeed: 12.5 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 95, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 14 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 14.5 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 96, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 8, customHP: 1, customDamage: 25, customSpeed: 14 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 14 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 14.5 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 25, customSpeed: 14.5 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 28, customHP: 1, customDamage: 40, customSpeed: 5 }, // 32 h
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 11.5 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 13.5 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 25, customSpeed: 11.5 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 7, customHP: 1, customDamage: 25, customSpeed: 12 }, // 36 h

	// ===== Корнеход =====
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 11.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 11.5 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 73, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 6, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 7, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 8, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 77, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 9, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 30, customHP: 1, customDamage: 28, customSpeed: 5 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 11.5 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 20, customSpeed: 13.5 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 12.5 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 20, customSpeed: 11.5 }, // 40 h

	// ===== Шестовик =====
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 17.5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 17.5 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 17.5 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 17.5 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14.5 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 14.5 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 34, customHP: 1, customDamage: 28, customSpeed: 5 }, // 35 h
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 17.5 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 15.5 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 16.5 }, // 39 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 166, bossDelayAbDop: 6800, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 166, bossDelayAbDop: 6800, firstWaveDelayMs: 2064 }, // 
	{ boss: 'enem3', bossDelayAb: 165, bossDelayAbDop: 6802, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 166, bossDelayAbDop: 6801, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 166, bossDelayAbDop: 6800, firstWaveDelayMs: 2208 }, // 
];

const bossAbilitiesDop = [
	// Резак
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 300, 300], openingOrder: 0, label: "Медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [600, 300, 300, 600], label: "Медленный справа, слева, справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 0, 300, 600], label: "Медленный справа, слева, справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17, 18, 19], shotGapsMs: [300, 300, 0, 300, 600], label: "Медленный справа, дважды справа, дважды слева и справа" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [600, 0, 300, 600], label: "Медленный справа, слева, справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 300, 0, 300, 600], openingOrder: 1, label: "Медленный справа, справа, слева, справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 300], label: "Медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 300, 600], label: "Медленный справа, слева, справа, слева и справа" },

	// Клыкокрыл
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 0, 600, 600, 0], openingOrder: 0, label: "В центр, слева, медленный справа, два в центр и слева" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 300, 600, 600], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [0, 300, 600, 600], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [0, 300, 600, 600], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [600, 0, 600, 600, 0], label: "В центр, слева, медленный справа, два в центр и слева" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 600, 600, 0], openingOrder: 1, label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 600, 0], label: "В центр, медленный справа, слева, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 600], label: "В центр, слева, медленный справа и в центр" },

	// Древогрыз
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 300, 300], openingOrder: 0, label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 300, 600, 600], label: "В центр, слева, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [300, 0, 0, 0], label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 0, 600, 600], label: "В центр, дважды слева, медленный справа и в центр" },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23], shotGapsMs: [600, 0, 300], label: "Слева, в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [24, 25, 4, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 0, 600], openingOrder: 1, label: "Слева, в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 300, 300], label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem3', indexAbilities: [32, 4, 33, 34, 35, 36], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 0, 300, 300], label: "Два в центр, медленный справа, слева, в центр и слева" },

	// Корнеход
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 300, 300, 600, 300], label: "Справа, слева, медленный справа, справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9], shotGapsMs: [600, 0, 300], openingOrder: 0, label: "Справа, слева, медленный справа и справа" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [300, 0, 600, 0], label: "Справа, слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [600, 0, 600, 0], label: "Справа, слева, медленный справа, в центр и слева" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [300, 0, 600, 300], label: "Справа, слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 0, 300], openingOrder: 1, label: "Справа, в центр, дважды слева и медленный справа" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 0, 600], label: "Справа, в центр, слева, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 0, 600, 0, 0], label: "Справа, медленный справа, слева, в центр, слева и в центр" },

	// Шестовик
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], shotGapsMs: [600, 0, 300], openingOrder: 0, label: "Слева, два в центр и медленный справа" },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [600, 600, 300, 0], label: "Слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [0, 300, 600, 600], label: "Слева, в центр, слева, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18], shotGapsMs: [600, 600, 600, 0], label: "Слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23], shotGapsMs: [0, 600, 300, 600], label: "Слева, в центр, слева, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 300, 300, 600, 0], openingOrder: 1, label: "Слева, в центр, слева, медленный справа и два в центр" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 300, 300], label: "Слева, в центр, дважды слева и медленный справа" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 600, 0], label: "Слева, в центр, медленный справа и дважды слева" },

];

// Лорные названия связок. Уровень 31 — речной берег: Резак (тростник), Клыкокрыл
// (летучая тварь), Древогрыз (бобёр), Корнеход (коряга-ходок), Шестовик (перевозчик).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Тростниковый удар', variant2: 'Лист осоки', variant3: 'Тростниковая сила',
        variant4: 'Стеблевая защита', variant5: 'Волна тростника', variant6: 'Болотный сок',
        variant7: 'Тростниковая мощь', variant8: 'Плотный стебель', variant9: 'Широкая медленная волна',
        variant10: 'Живучий Резак', variant11: 'Цепкий лист', variant12: 'Волна и на дно',
        variant13: 'Толстый стебель', variant14: 'Неутомимый Резак', variant15: 'Пружинистый тростник',
        variant16: 'Меткий лист', variant17: 'Тростниковая хватка', variant18: 'Взгляд сквозь тростник',
        variant19: 'Мгновенная волна', variant20: 'Речной дух', variant21: 'Стойкий стебель',
        variant22: 'Юркий Резак', variant23: 'Тростниковая стойкость', variant24: 'Чуткий стебель',
        variant25: 'Ускользающая волна', variant26: 'Дикая волна', variant27: 'Мощь сока',
        variant28: 'Широкая волна внезапно', variant29: 'Каменный стебель', variant30: 'Разросшийся тростник',
        variant31: 'Тростниковый рывок', variant32: 'Живучий стебель', variant33: 'Неутомимая волна',
        variant34: 'Тростниковая прыть', variant35: 'Тростниковая выносливость'
    },
    enem2: {
        variant1: 'Клыкастый укус', variant2: 'Клык-крыло', variant3: 'Крылатая сила',
        variant4: 'Перепончатая защита', variant5: 'Рваный полёт', variant6: 'Едкая слюна',
        variant7: 'Крылатая мощь', variant8: 'Плотная перепонка', variant9: 'Тугая нервная волна',
        variant10: 'Живучий Клыкокрыл', variant11: 'Цепкий клык', variant12: 'Укус и в темноту',
        variant13: 'Толстая перепонка', variant14: 'Неутомимый Клыкокрыл', variant15: 'Пружинистое крыло',
        variant16: 'Меткий клык', variant17: 'Крылатая хватка', variant18: 'Ночной взгляд',
        variant19: 'Рваный полёт вмиг', variant20: 'Ночной дух', variant21: 'Стойкая перепонка',
        variant22: 'Юркий Клыкокрыл', variant23: 'Крылатая стойкость', variant24: 'Слух в темноте',
        variant25: 'Ускользающий полёт', variant26: 'Дикий рваный полёт', variant27: 'Мощь слюны',
        variant28: 'Нервная волна внезапно', variant29: 'Каменная перепонка', variant30: 'Разросшееся крыло',
        variant31: 'Крылатый рывок', variant32: 'Живучая перепонка', variant33: 'Неутомимая волна',
        variant34: 'Крылатая прыть', variant35: 'Крылатая выносливость'
    },
    enem3: {
        variant1: 'Грызущий удар', variant2: 'Резец бобра', variant3: 'Грызущая сила',
        variant4: 'Меховая защита', variant5: 'Замах хвостом-дубиной', variant6: 'Древесная смола',
        variant7: 'Грызущая мощь', variant8: 'Прочный мех', variant9: 'Тяжёлый разгон-замах',
        variant10: 'Живучий Древогрыз', variant11: 'Цепкий резец', variant12: 'Удар и под воду',
        variant13: 'Толстый мех', variant14: 'Неутомимый Древогрыз', variant15: 'Пружинистый хвост',
        variant16: 'Меткий резец', variant17: 'Грызущая хватка', variant18: 'Деловитый взгляд',
        variant19: 'Замах хвостом вмиг', variant20: 'Древесный дух', variant21: 'Стойкий мех',
        variant22: 'Юркий Древогрыз', variant23: 'Грызущая стойкость', variant24: 'Чуткий резец',
        variant25: 'Ускользающий под воду', variant26: 'Дикий замах', variant27: 'Мощь смолы',
        variant28: 'Тяжёлый замах внезапно', variant29: 'Каменный резец', variant30: 'Разросшаяся плотина',
        variant31: 'Грызущий рывок', variant32: 'Живучий мех', variant33: 'Неутомимый разгон',
        variant34: 'Грызущая прыть', variant35: 'Грызущая выносливость'
    },
    enem4: {
        variant1: 'Корневой удар', variant2: 'Корень-коготь', variant3: 'Корнеходная сила',
        variant4: 'Коряжистая защита', variant5: 'Шаг корнями', variant6: 'Сок корней',
        variant7: 'Корнеходная мощь', variant8: 'Прочная коряга', variant9: 'Резкий рывок после шага',
        variant10: 'Живучий Корнеход', variant11: 'Цепкий корень', variant12: 'Шаг и под воду',
        variant13: 'Толстая коряга', variant14: 'Неутомимый Корнеход', variant15: 'Пружинистый корень',
        variant16: 'Коготь-корень', variant17: 'Корнеходная хватка', variant18: 'Взгляд из коряг',
        variant19: 'Рывок после шага вмиг', variant20: 'Болотный дух', variant21: 'Стойкая коряга',
        variant22: 'Юркий Корнеход', variant23: 'Корнеходная стойкость', variant24: 'Чуткий корень',
        variant25: 'Ускользающий шаг', variant26: 'Дикий рывок', variant27: 'Мощь сока корней',
        variant28: 'Рывок после медленного шага', variant29: 'Каменная коряга', variant30: 'Разросшиеся корни',
        variant31: 'Корнеходный рывок', variant32: 'Живучая коряга', variant33: 'Неутомимый шаг-рывок',
        variant34: 'Корнеходная прыть', variant35: 'Корнеходная выносливость'
    },
    enem5: {
        variant1: 'Шестовой удар', variant2: 'Конец шеста', variant3: 'Шестовая сила',
        variant4: 'Просмолённая защита', variant5: 'Прямой удар шестом', variant6: 'Тина на шесте',
        variant7: 'Шестовая мощь', variant8: 'Прочный шест', variant9: 'Честный прямой удар',
        variant10: 'Живучий Шестовик', variant11: 'Цепкий шест', variant12: 'Удар и оттолкнулся',
        variant13: 'Толстый шест', variant14: 'Неутомимый Шестовик', variant15: 'Пружинистый шест',
        variant16: 'Конец шеста вмиг', variant17: 'Шестовая хватка', variant18: 'Взгляд перевозчика',
        variant19: 'Прямой удар мгновенно', variant20: 'Дух перевозчика', variant21: 'Стойкий шест',
        variant22: 'Юркий Шестовик', variant23: 'Шестовая стойкость', variant24: 'Чуткий шест',
        variant25: 'Ускользающий удар шестом', variant26: 'Дикий прямой удар', variant27: 'Мощь тины',
        variant28: 'Честный удар внезапно', variant29: 'Каменный шест', variant30: 'Размах шеста разросся',
        variant31: 'Шестовой рывок', variant32: 'Живучий шест', variant33: 'Неутомимый прямой удар',
        variant34: 'Шестовая прыть', variant35: 'Шестовая выносливость'
    }
};
