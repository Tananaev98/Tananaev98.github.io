let lvlNumber = 34;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 34 — «Лебединая заводь», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом (утки/цапля/лебеди).
// Все четыре первых босса — 'wave' с разным почерком полёта: Свистун мелко хлопает
// крыльями частой нервной волной, Клюворез шагает редкими широкими взмахами,
// Крякун держит средний плавный ритм, Белокрыл раскачивается величаво перед финалом.
// Горлотруб (финал) — единственный не-wave: после долгого плавного разгона резко
// ускоряется (accelerate) — самый крупный лебедь бьёт не колебанием, а прямым напором.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.88, damageMultiplier: 2.11, minWaveDelay: 2060, minShotDelay: 144, minTelegraphMs: 530,
	phases: [
		{ phase: 1, minHp: 0.634, cadence: 1.017, speed: 0.986, damage: 1, telegraphMultiplier: 0.984, surpriseChance: 0.157, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.284, cadence: 0.818, speed: 1.152, damage: 1.17, telegraphMultiplier: 0.878, surpriseChance: 0.28, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0, cadence: 0.669, speed: 1.271, damage: 1.31, telegraphMultiplier: 0.8, surpriseChance: 0.38, maxActiveAttacks: 25 }
	],
	bosses: {
		enem1: { combatIdentity: "Свист с перебросом", combatTrick: "Медленный всплеск справа остаётся фоном; короткие удары бросают прицел справа налево и обратно. Ошибка — принять первый быстрый удар за завершение серии и забыть всплеск.", signatureEvery: 4, movementStyle: 'wave', cadence: 1.047, telegraphMs: 831, speedMultiplier: 1.039, damageMultiplier: 0.87, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem2: { combatIdentity: "Копьё и двойной докол", combatTrick: "Выпад из правой середины сменяется левым, затем двумя доколами в одну полосу. В последней фазе после возврата к середине следуют ещё два левых удара: нельзя уходить бить босса после привычной пары.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.979, telegraphMs: 900, speedMultiplier: 0.951, damageMultiplier: 0.98, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem3: { combatIdentity: "Двойное кряканье", combatTrick: "Два удара справа от середины приучают задержаться там; левый вклинивается между ними и продолжением справа. Медленный правый всплеск требует отдельного возврата, а не отбоя в порядке появления.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.939, telegraphMs: 790, speedMultiplier: 1.181, damageMultiplier: 1, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "Крылья с обратным взмахом", combatTrick: "Первый взмах слева переводит прицел к двум ударам правой середины, затем следует обратный удар слева. Двойной правый удар надо дочитать до конца, но не забыть медленный всплеск у правого края.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.902, telegraphMs: 850, speedMultiplier: 1.049, damageMultiplier: 1.08, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "Трубный разгон", combatTrick: "Первые ускоряющиеся удары из правой середины ведут к паре слева и возврату вправо. Медленный правый удар меняет место в очереди прилёта по мере ускорения фаз; отбивать по срочности, а не по появлению.", signatureEvery: 4, movementStyle: 'accelerate', cadence: 0.84, telegraphMs: 703, speedMultiplier: 1.103, damageMultiplier: 1.12, speedVariance: [1.04, 1.06, 1.08, 1.1, 1.12] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl34/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl34/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl34/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl34/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl34/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Свистун', image: 'images/enemies/regions/4_rech_ozer/lvl34/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 280, xPos: 50, size: '23%',
		deathAnimation: { preset: 'featherScatter', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Клюворез', image: 'images/enemies/regions/4_rech_ozer/lvl34/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 420, xPos: 50, size: '25%',
		deathAnimation: { preset: 'wingFold', durationMs: 1200 }
	},
	enem3: {
		name: 'enem3', dispName: 'Крякун', image: 'images/enemies/regions/4_rech_ozer/lvl34/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 540, xPos: 50, size: '26%',
		deathAnimation: { preset: 'plumageDrop', durationMs: 1350 }
	},
	enem4: {
		name: 'enem4', dispName: 'Белокрыл', image: 'images/enemies/regions/4_rech_ozer/lvl34/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 680, xPos: 50, size: '28%',
		deathAnimation: { preset: 'wingCollapse', durationMs: 1400 }
	},
	enem5: {
		name: 'enem5', dispName: 'Горлотруб', image: 'images/enemies/regions/4_rech_ozer/lvl34/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '31%',
		deathAnimation: { preset: 'wingBurst', durationMs: 1600 }
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
const bossInterval = 9;

const bossAbilities = [
	// ===== Свистун =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 4.07, waveFrequency: 1.19, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 6.05, waveFrequency: 2.49, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 8.07, waveFrequency: 2.08, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 1.64, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 6.05, waveFrequency: 1.19, wavePhase: 0 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 8.07, waveFrequency: 2.49, wavePhase: 0.5 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 2.08, wavePhase: 1.1 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 6.05, waveFrequency: 1.64, wavePhase: 0.3 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 8.07, waveFrequency: 1.64, wavePhase: 0 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 4.07, waveFrequency: 2.49, wavePhase: 0 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 6.05, waveFrequency: 2.08, wavePhase: 0.5 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 8.07, waveFrequency: 1.64, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 1.19, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 6.05, waveFrequency: 1.19, wavePhase: 0 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 8.07, waveFrequency: 2.08, wavePhase: 0 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.64, wavePhase: 0.5 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 6.05, waveFrequency: 1.19, wavePhase: 1.1 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 8.07, waveFrequency: 2.49, wavePhase: 0.3 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 2.49, wavePhase: 0 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 6.05, waveFrequency: 1.64, wavePhase: 0 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 8.07, waveFrequency: 1.19, wavePhase: 0.5 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 2.49, wavePhase: 1.1 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 6.05, waveFrequency: 2.08, wavePhase: 0.3 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 8.07, waveFrequency: 2.08, wavePhase: 0 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.64, wavePhase: 0.5 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 6.05, waveFrequency: 2.49, wavePhase: 0 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 8.07, waveFrequency: 2.08, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.64, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 6.05, waveFrequency: 1.19, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 8.07, waveFrequency: 1.19, wavePhase: 0 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 4.07, waveFrequency: 2.08, wavePhase: 0 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 6.05, waveFrequency: 1.64, wavePhase: 0.5 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 8.07, waveFrequency: 1.19, wavePhase: 1.1 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 2.49, wavePhase: 0.3 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 6.05, waveFrequency: 2.49, wavePhase: 0 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 41, customHP: 1, customDamage: 29, customSpeed: 5, waveAmplitude: 8.07, waveFrequency: 1.64, wavePhase: 0 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 4.07, waveFrequency: 1.19, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 11, waveAmplitude: 6.05, waveFrequency: 2.49, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 8.07, waveFrequency: 2.08, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 12, waveAmplitude: 4.07, waveFrequency: 2.08, wavePhase: 0 }, // 39 h

	// ===== Клюворез =====
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.05, waveFrequency: 0.51, wavePhase: 0 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 1.21, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.97, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 5.05, waveFrequency: 0.75, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 1.21, wavePhase: 0 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.97, wavePhase: 0.5 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 5.05, waveFrequency: 0.75, wavePhase: 1.1 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 7.56, waveFrequency: 0.51, wavePhase: 0.3 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17, waveAmplitude: 10.06, waveFrequency: 0.51, wavePhase: 0 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.05, waveFrequency: 0.97, wavePhase: 0 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 0.75, wavePhase: 0.5 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.51, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 5.05, waveFrequency: 1.21, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17, waveAmplitude: 7.56, waveFrequency: 1.21, wavePhase: 0 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 10.06, waveFrequency: 0.75, wavePhase: 0 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 5.05, waveFrequency: 0.51, wavePhase: 0.5 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 1.21, wavePhase: 1.1 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 10.06, waveFrequency: 0.97, wavePhase: 0.3 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17, waveAmplitude: 5.05, waveFrequency: 0.97, wavePhase: 0 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 0.51, wavePhase: 0 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 1.21, wavePhase: 0.5 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 5.05, waveFrequency: 0.97, wavePhase: 1.1 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 7.56, waveFrequency: 0.75, wavePhase: 0.3 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17, waveAmplitude: 10.06, waveFrequency: 0.75, wavePhase: 0 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.05, waveFrequency: 0.51, wavePhase: 0 }, // 24 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 1.21, wavePhase: 0.5 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.97, wavePhase: 1.1 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 5.05, waveFrequency: 0.75, wavePhase: 0.3 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 1.21, wavePhase: 0 }, // 28 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.97, wavePhase: 0.5 }, // 29 g
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 5.05, waveFrequency: 0.75, wavePhase: 1.1 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 7.56, waveFrequency: 0.51, wavePhase: 0.3 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 15, customSpeed: 17, waveAmplitude: 10.06, waveFrequency: 0.51, wavePhase: 0 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 44, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.05, waveFrequency: 0.75, wavePhase: 0 }, // 33 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 0.51, wavePhase: 0.5 }, // 34 h
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 1.21, wavePhase: 1.1 }, // 35 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 5.05, waveFrequency: 0.97, wavePhase: 0.3 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 17, waveAmplitude: 7.56, waveFrequency: 0.97, wavePhase: 0 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.75, wavePhase: 0.5 }, // 38 h

	// ===== Крякун =====
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.69, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.42, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 8.09, waveFrequency: 1.08, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.99, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.56, waveFrequency: 1.99, wavePhase: 0 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 1.69, wavePhase: 0.5 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 95, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.69, wavePhase: 0 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.42, wavePhase: 0.5 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 8.09, waveFrequency: 1.08, wavePhase: 1.1 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.99, wavePhase: 0.3 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 8.09, waveFrequency: 1.99, wavePhase: 0 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 1.69, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.56, waveFrequency: 1.42, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.09, waveFrequency: 1.08, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.08, wavePhase: 0 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 1.42, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.08, waveFrequency: 1.08, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.56, waveFrequency: 1.99, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.09, waveFrequency: 1.99, wavePhase: 0 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.42, wavePhase: 0 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.08, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 8.09, waveFrequency: 1.99, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.69, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 1.42, wavePhase: 0 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 1.08, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.08, waveFrequency: 1.99, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.09, waveFrequency: 1.69, wavePhase: 0 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 1.42, wavePhase: 0.5 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 8.09, waveFrequency: 1.69, wavePhase: 0 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 1.42, wavePhase: 0.5 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.56, waveFrequency: 1.08, wavePhase: 1.1 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.09, waveFrequency: 1.99, wavePhase: 0.3 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.99, wavePhase: 0 }, // 35 g
	{ boss: 'enem3', type: 'enem33', xPos: 95, yPos: 36, customHP: 1, customDamage: 36, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 1.42, wavePhase: 0 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 1.08, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.08, waveFrequency: 1.99, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.56, waveFrequency: 1.69, wavePhase: 0.3 }, // 39 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 8.09, waveFrequency: 1.69, wavePhase: 0 }, // 40 h

	// ===== Белокрыл =====
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.39, wavePhase: 0 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.94, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 0.67, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 9.58, waveFrequency: 0.39, wavePhase: 0 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 13.07, waveFrequency: 1.18, wavePhase: 0.5 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 0.94, wavePhase: 1.1 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 9.58, waveFrequency: 0.67, wavePhase: 0.3 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.67, wavePhase: 0 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 1.18, wavePhase: 0 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 0.94, wavePhase: 0.5 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.67, wavePhase: 1.1 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 0.39, wavePhase: 0.3 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.39, wavePhase: 0 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 13.07, waveFrequency: 0.94, wavePhase: 0 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.67, wavePhase: 0.5 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.39, wavePhase: 1.1 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 13.07, waveFrequency: 1.18, wavePhase: 0.3 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 1.18, wavePhase: 0 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 0.94, wavePhase: 0.5 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 13.07, waveFrequency: 0.39, wavePhase: 0 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 1.18, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.94, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 13.07, waveFrequency: 0.67, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.39, wavePhase: 0 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 0.5 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 0.94, wavePhase: 1.1 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 6.09, waveFrequency: 0.67, wavePhase: 0.3 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.67, wavePhase: 0 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 13.07, waveFrequency: 1.18, wavePhase: 0 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.94, wavePhase: 0.5 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 9.58, waveFrequency: 0.67, wavePhase: 1.1 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 13.07, waveFrequency: 0.39, wavePhase: 0.3 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 0.39, wavePhase: 0 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 41, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 9.58, waveFrequency: 0.94, wavePhase: 0 }, // 34 h
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 14, waveAmplitude: 13.07, waveFrequency: 0.67, wavePhase: 0.5 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 6.09, waveFrequency: 0.39, wavePhase: 1.1 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 16, waveAmplitude: 9.58, waveFrequency: 1.18, wavePhase: 0.3 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 15, customSpeed: 15, waveAmplitude: 13.07, waveFrequency: 1.18, wavePhase: 0 }, // 38 h

	// ===== Горлотруб =====
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 4 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 13.5 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 28, customHP: 1, customDamage: 44, customSpeed: 5 }, // 34 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 35 h
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14.5 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: 18, customSpeed: 15.5 }, // 38 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 163, bossDelayAbDop: 6802, firstWaveDelayMs: 2263 }, // 
	{ boss: 'enem2', bossDelayAb: 163, bossDelayAbDop: 6802, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 164, bossDelayAbDop: 6797, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 163, bossDelayAbDop: 6798, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 163, bossDelayAbDop: 6802, firstWaveDelayMs: 2273 }, // 
];

const bossAbilitiesDop = [
	// Свистун
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 0, 0], openingOrder: 0, label: "Дважды справа, медленный справа и слева" },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [600, 0, 600, 0], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 0, 300, 300], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17, 18], shotGapsMs: [0, 300, 300, 300], label: "Справа, медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23, 24], shotGapsMs: [300, 0, 300, 600, 300], label: "Справа, медленный справа, слева, справа, слева и справа" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600], openingOrder: 1, label: "Справа, медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 600, 0], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 0, 600, 0], label: "Медленный справа, справа, слева, справа и слева" },

	// Клюворез
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 300, 0], openingOrder: 0, label: "В центр, дважды слева и медленный справа" },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [300, 600, 300, 300], label: "В центр, медленный справа, слева и два в центр" },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [300, 600, 300, 0], label: "В центр, медленный справа, слева и два в центр" },
	{ boss: 'enem2', indexAbilities: [14, 15, 16, 17, 18], shotGapsMs: [300, 600, 300, 0], label: "В центр, медленный справа, слева и два в центр" },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], shotGapsMs: [300, 600, 300, 0], label: "В центр, медленный справа, слева и два в центр" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 0], openingOrder: 1, label: "В центр, дважды слева и медленный справа" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 0, 300], label: "В центр, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 600, 600, 0], label: "В центр, слева, медленный справа, в центр и дважды слева" },

	// Крякун
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 300, 600, 300, 0], openingOrder: 0, label: "Два в центр, слева, медленный справа и два в центр" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9], shotGapsMs: [600, 600, 300], label: "В центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 600, 600], label: "Два в центр, слева, медленный справа и в центр" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [600, 300, 600, 0], label: "Два в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [300, 600, 0, 300], label: "Два в центр, слева, медленный справа и в центр" },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 600, 0, 300, 0], openingOrder: 1, label: "Два в центр, слева, медленный справа и два в центр" },
	{ boss: 'enem3', indexAbilities: [31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 600, 300], label: "Два в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 600, 300, 600], label: "Два в центр, слева, медленный справа и в центр" },

	// Белокрыл
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 300, 600], label: "Слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [300, 300, 300, 300], openingOrder: 0, label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 300, 0, 300], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18, 19], shotGapsMs: [600, 300, 600, 300, 300], label: "Слева, в центр, медленный справа, дважды слева и в центр" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], shotGapsMs: [300, 300, 600], label: "Слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 600, 0, 0], openingOrder: 1, label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [29, 30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 600, 0, 0], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [34, 35, 36, 37, 38], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 600, 0, 0], label: "Слева, два в центр, медленный справа и слева" },

	// Горлотруб
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 600, 0], openingOrder: 0, label: "Справа, в центр, слева и медленный справа" },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [300, 300, 600, 600], label: "В центр, дважды слева, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 600, 0, 0], label: "В центр, медленный справа, дважды слева и в центр" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18, 19], shotGapsMs: [0, 0, 600, 0, 300], label: "В центр, слева, два в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [300, 0, 0, 300], label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 300, 600], openingOrder: 1, label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 0], label: "Два в центр, слева и медленный справа" },
	{ boss: 'enem5', indexAbilities: [34, 35, 36, 37, 38], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 300, 600], label: "В центр, дважды слева, в центр и медленный справа" },

];

// Лорные названия связок. Уровень 34 — водоплавающие: Свистун (крикливая птица),
// Клюворез (цапля), Крякун (утка), Белокрыл (лебедь), Горлотруб (журавль, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Свистящий удар', variant2: 'Острое перо', variant3: 'Свистящая сила',
        variant4: 'Пуховая защита', variant5: 'Взмах крыла', variant6: 'Едкий свист',
        variant7: 'Свистящая мощь', variant8: 'Плотный пух', variant9: 'Нервная волна крыльев',
        variant10: 'Живучий Свистун', variant11: 'Цепкое перо', variant12: 'Взмах и в камыш',
        variant13: 'Толстый пух', variant14: 'Неутомимый Свистун', variant15: 'Пружинистое крыло',
        variant16: 'Меткое перо', variant17: 'Свистящая хватка', variant18: 'Пронзительный взгляд',
        variant19: 'Свист вмиг', variant20: 'Речной дух', variant21: 'Стойкий пух',
        variant22: 'Юркий Свистун', variant23: 'Свистящая стойкость', variant24: 'Чуткое перо',
        variant25: 'Ускользающий свист', variant26: 'Дикий свист', variant27: 'Мощь крика',
        variant28: 'Нервная волна внезапно', variant29: 'Каменный пух', variant30: 'Оперение разрослось',
        variant31: 'Свистящий рывок', variant32: 'Живучий пух', variant33: 'Неутомимая волна крыльев',
        variant34: 'Свистящая прыть', variant35: 'Свистящая выносливость'
    },
    enem2: {
        variant1: 'Режущий удар клювом', variant2: 'Клюв-нож', variant3: 'Клюворезная сила',
        variant4: 'Защита оперения', variant5: 'Широкий взмах', variant6: 'Рыбный дух',
        variant7: 'Клюворезная мощь', variant8: 'Серое оперение', variant9: 'Редкий широкий взмах',
        variant10: 'Живучий Клюворез', variant11: 'Цепкий клюв', variant12: 'Удар и в камыш',
        variant13: 'Толстое оперение', variant14: 'Неутомимый Клюворез', variant15: 'Пружинистая шея',
        variant16: 'Клюв-нож вмиг', variant17: 'Клюворезная хватка', variant18: 'Взгляд рыболова',
        variant19: 'Широкий взмах мгновенно', variant20: 'Рыболовный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Клюворез', variant23: 'Клюворезная стойкость', variant24: 'Чуткий клюв',
        variant25: 'Ускользающий взмах', variant26: 'Дикий удар клювом', variant27: 'Мощь духа',
        variant28: 'Редкий взмах внезапно', variant29: 'Каменное оперение', variant30: 'Размах крыльев разросся',
        variant31: 'Клюворезный рывок', variant32: 'Живучее оперение', variant33: 'Неутомимый широкий взмах',
        variant34: 'Клюворезная прыть', variant35: 'Клюворезная выносливость'
    },
    enem3: {
        variant1: 'Крякающий удар', variant2: 'Клюв утки', variant3: 'Крякающая сила',
        variant4: 'Пёстрая защита', variant5: 'Плавный удар', variant6: 'Едкий кряк',
        variant7: 'Крякающая мощь', variant8: 'Плотное перо', variant9: 'Средний плавный ритм',
        variant10: 'Живучий Крякун', variant11: 'Цепкая лапка', variant12: 'Удар и на воду',
        variant13: 'Толстое перо', variant14: 'Неутомимый Крякун', variant15: 'Пружинистая лапка',
        variant16: 'Меткий кряк', variant17: 'Крякающая хватка', variant18: 'Довольный взгляд',
        variant19: 'Плавный удар вмиг', variant20: 'Утиный дух', variant21: 'Стойкое перо',
        variant22: 'Юркий Крякун', variant23: 'Крякающая стойкость', variant24: 'Чуткий кряк',
        variant25: 'Ускользающий на воду', variant26: 'Дикий кряк', variant27: 'Мощь клюва',
        variant28: 'Плавный ритм внезапно', variant29: 'Каменное перо', variant30: 'Кряк разросся',
        variant31: 'Крякающий рывок', variant32: 'Живучее перо', variant33: 'Неутомимый ритм',
        variant34: 'Крякающая прыть', variant35: 'Крякающая выносливость'
    },
    enem4: {
        variant1: 'Лебединый удар', variant2: 'Белое перо', variant3: 'Лебединая сила',
        variant4: 'Белоснежная защита', variant5: 'Величавая раскачка', variant6: 'Шип лебедя',
        variant7: 'Лебединая мощь', variant8: 'Белое оперение', variant9: 'Величавая широкая раскачка',
        variant10: 'Живучий Белокрыл', variant11: 'Цепкое крыло', variant12: 'Раскачка и на воду',
        variant13: 'Толстое оперение', variant14: 'Неутомимый Белокрыл', variant15: 'Белое крыло пружинит',
        variant16: 'Меткое перо', variant17: 'Лебединая хватка', variant18: 'Гордый взгляд лебедя',
        variant19: 'Величавая раскачка вмиг', variant20: 'Белоснежный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Белокрыл', variant23: 'Лебединая стойкость', variant24: 'Чуткое крыло',
        variant25: 'Ускользающая раскачка', variant26: 'Дикий шип', variant27: 'Мощь шипения',
        variant28: 'Широкая раскачка внезапно', variant29: 'Каменное оперение', variant30: 'Размах крыла разросся',
        variant31: 'Лебединый рывок', variant32: 'Живучее оперение', variant33: 'Неутомимая раскачка',
        variant34: 'Лебединая прыть', variant35: 'Лебединая выносливость'
    },
    enem5: {
        variant1: 'Трубный удар', variant2: 'Клюв-копьё', variant3: 'Трубная сила',
        variant4: 'Защита цапли', variant5: 'Прямой напор', variant6: 'Трубный клич',
        variant7: 'Трубная мощь', variant8: 'Серое оперение цапли', variant9: 'Плавный разгон в напор',
        variant10: 'Живучий Горлотруб', variant11: 'Клюв-копьё вмиг', variant12: 'Напор и на воду',
        variant13: 'Толстое оперение', variant14: 'Неутомимый Горлотруб', variant15: 'Длинная шея пружинит',
        variant16: 'Меткий клюв-копьё', variant17: 'Трубная хватка', variant18: 'Взгляд с высоты',
        variant19: 'Трубный клич вмиг', variant20: 'Небесный дух', variant21: 'Стойкое оперение',
        variant22: 'Юркий Горлотруб', variant23: 'Трубная стойкость', variant24: 'Чуткая шея',
        variant25: 'Ускользающий напор', variant26: 'Дикий трубный клич', variant27: 'Мощь клича',
        variant28: 'Прямой напор внезапно', variant29: 'Каменное оперение', variant30: 'Трубный клич разросся',
        variant31: 'Трубный рывок', variant32: 'Живучее оперение', variant33: 'Разгон в напор вновь',
        variant34: 'Трубная прыть', variant35: 'Трубная выносливость'
    }
};
