let lvlNumber = 35;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 35 — «Лунный омут», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом. Здесь 'wave'
// у четырёх из пяти: Гребешок бьёт тугой гребенчатой волной, Белоцвет качается
// широко и плавно, Плакальщица свисает длинными печальными взмахами, Огнепёр
// (финал) сияет самой яркой и быстрой волной уровня. Улитень — единственный
// не-wave (drift): улитка ползёт направленным сносом, а не колеблется — тягучий,
// но неотвратимый снос вбок, самый медленный архетип уровня.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.87, damageMultiplier: 2.14, minWaveDelay: 2040, minShotDelay: 142, minTelegraphMs: 525,
	phases: [
		{ phase: 1, minHp: 0.667, cadence: 0.983, speed: 1.015, damage: 1, telegraphMultiplier: 1.017, surpriseChance: 0.164, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.317, cadence: 0.82, speed: 1.15, damage: 1.18, telegraphMultiplier: 0.88, surpriseChance: 0.292, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0, cadence: 0.67, speed: 1.27, damage: 1.31, telegraphMultiplier: 0.791, surpriseChance: 0.39, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { combatIdentity: "След с двойным изгибом", combatTrick: "Ползущий правый след прикрыт перебросом влево, двумя правыми ударами и возвратом влево. Смещение атак к середине не отменяет возврата: нельзя уходить бить босса после первого правого удара.", signatureEvery: 4, movementStyle: 'drift', cadence: 1.15, telegraphMs: 990, speedMultiplier: 1, damageMultiplier: 0.9, speedVariance: [1.013, 1.043, 1.073, 1.103, 1.133] },
		enem2: { combatIdentity: "Ускользающий гребень", combatTrick: "Выпады чередуют правую середину и левую сторону, но короткие серии заканчиваются двумя левыми ударами. Медленная правая угроза остаётся отдельно: нельзя механически чередовать стороны до конца.", signatureEvery: 4, movementStyle: 'wave', cadence: 1.021, telegraphMs: 819, speedMultiplier: 1.101, damageMultiplier: 0.98, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem3: { combatIdentity: "Лепесток с двойным ответом", combatTrick: "Левый удар открывает пару в правой середине, за которой возвращается левый. Медленный правый круг вклинивается в очередь прилёта. Ранний уход влево после одного правого удара оставляет второй неотбитым.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.92, telegraphMs: 870, speedMultiplier: 1.098, damageMultiplier: 1.02, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "Плети с коротким обратным хлестом", combatTrick: "Ива бьёт дважды слева перед переносом к правой середине и обратным левым хлестом; короткие варианты меняют рисунок на одиночный левый, правый и левый. Нельзя одинаково возвращать прицел после первого удара каждой серии.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.882, telegraphMs: 900, speedMultiplier: 1.052, damageMultiplier: 1.1, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "Кольца с левым разрывом", combatTrick: "Два удара правой середины подводят к левому разрыву и правому продолжению. Короткая серия обрывается слева, длинная требует ещё вернуться вправо; медленный крайний круг не позволяет отбивать всё по порядку появления.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.83, telegraphMs: 689, speedMultiplier: 1.149, damageMultiplier: 1.05, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl35/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl35/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl35/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl35/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl35/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Улитень', image: 'images/enemies/regions/4_rech_ozer/lvl35/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 290, xPos: 50, size: '24%',
		deathAnimation: { preset: 'shellCrack', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Гребешок', image: 'images/enemies/regions/4_rech_ozer/lvl35/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 430, xPos: 50, size: '25%',
		deathAnimation: { preset: 'crestWither', durationMs: 1200 }
	},
	enem3: {
		name: 'enem3', dispName: 'Белоцвет', image: 'images/enemies/regions/4_rech_ozer/lvl35/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 550, xPos: 50, size: '27%',
		deathAnimation: { preset: 'petalFall', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Плакальщица', image: 'images/enemies/regions/4_rech_ozer/lvl35/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 690, xPos: 50, size: '28%',
		deathAnimation: { preset: 'branchDroop', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Огнепёр', image: 'images/enemies/regions/4_rech_ozer/lvl35/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'scaleGlowFade', durationMs: 1550 }
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
let timeNextBoss = 6;
const bossInterval = 6;

const bossAbilities = [
	// ===== Улитень =====
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 24 f
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 29 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 41, customHP: 1, customDamage: 30, customSpeed: 5 }, // 34 h
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 6, customHP: 1, customDamage: 22, customSpeed: 11.5 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: 22, customSpeed: 12.5 }, // 37 h

	// ===== Гребешок =====
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 2.8, wavePhase: 1.1 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 7.07, waveFrequency: 2.27, wavePhase: 0.3 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 2.27, wavePhase: 0 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.74, wavePhase: 0.5 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 1.22, wavePhase: 1.1 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 2.8, wavePhase: 0.3 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.22, wavePhase: 0 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 2.8, wavePhase: 0.5 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 2.27, wavePhase: 1.1 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.07, waveFrequency: 1.74, wavePhase: 0.3 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 9.09, waveFrequency: 1.22, wavePhase: 0 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 2.8, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 7.07, waveFrequency: 2.27, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 1.74, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.74, wavePhase: 0 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 2.27, wavePhase: 0 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 1.74, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 1.22, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.07, waveFrequency: 2.8, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 7.07, waveFrequency: 2.8, wavePhase: 0 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 7.07, waveFrequency: 1.22, wavePhase: 0 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.09, waveFrequency: 2.8, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.07, waveFrequency: 2.27, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 7.07, waveFrequency: 1.74, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.09, waveFrequency: 1.74, wavePhase: 0 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 9.09, waveFrequency: 2.27, wavePhase: 0 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.74, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 7.07, waveFrequency: 1.22, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 2.8, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 2.8, wavePhase: 0 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 2.8, wavePhase: 1.1 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 7.07, waveFrequency: 2.27, wavePhase: 0.3 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 2.27, wavePhase: 0 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 5.07, waveFrequency: 1.74, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 1.22, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 2.8, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 38, customHP: 1, customDamage: 30, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.22, wavePhase: 0 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 7.07, waveFrequency: 2.8, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.09, waveFrequency: 2.27, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 5.07, waveFrequency: 1.74, wavePhase: 0.3 }, // 39 h

	// ===== Белоцвет =====
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.21, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 12.09, waveFrequency: 0.96, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.72, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 0.72, wavePhase: 0 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.96, wavePhase: 0 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 12.09, waveFrequency: 0.72, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 1.21, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 12.09, waveFrequency: 1.21, wavePhase: 0 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 12.09, waveFrequency: 0.51, wavePhase: 0 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.09, waveFrequency: 1.21, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.07, waveFrequency: 0.96, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 12.09, waveFrequency: 0.72, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.72, wavePhase: 0 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.96, wavePhase: 0 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.72, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 12.09, waveFrequency: 0.51, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 1.21, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 1.21, wavePhase: 0 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.51, wavePhase: 0 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 12.09, waveFrequency: 1.21, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.09, waveFrequency: 0.96, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 0.72, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 12.09, waveFrequency: 0.72, wavePhase: 0 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 12.09, waveFrequency: 0.96, wavePhase: 0 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.09, waveFrequency: 0.72, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.07, waveFrequency: 0.51, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 12.09, waveFrequency: 1.21, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 1.21, wavePhase: 0 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 0 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.21, wavePhase: 0.5 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 12.09, waveFrequency: 0.96, wavePhase: 1.1 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.09, waveFrequency: 0.72, wavePhase: 0.3 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 0.72, wavePhase: 0 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 38, customHP: 1, customDamage: 37, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.96, wavePhase: 0 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 12.09, waveFrequency: 0.72, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.09, waveFrequency: 0.51, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 1.21, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 12.09, waveFrequency: 1.21, wavePhase: 0 }, // 39 h

	// ===== Плакальщица =====
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 6.06, waveFrequency: 0.34, wavePhase: 0 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 1.22, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 14.06, waveFrequency: 0.93, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 6.06, waveFrequency: 0.62, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 14.06, waveFrequency: 0.34, wavePhase: 0 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.06, waveFrequency: 1.22, wavePhase: 0.5 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.93, wavePhase: 1.1 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 14.06, waveFrequency: 0.62, wavePhase: 0.3 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.06, waveFrequency: 0.62, wavePhase: 0 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.34, wavePhase: 0.5 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 14.06, waveFrequency: 0.34, wavePhase: 0 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.06, waveFrequency: 1.22, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.93, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 14.06, waveFrequency: 0.62, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.06, waveFrequency: 0.62, wavePhase: 0 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 6.06, waveFrequency: 0.93, wavePhase: 0 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.62, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 14.06, waveFrequency: 0.34, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 6.06, waveFrequency: 1.22, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 14.06, waveFrequency: 0.93, wavePhase: 0 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.06, waveFrequency: 0.62, wavePhase: 0.5 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.34, wavePhase: 1.1 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 14.06, waveFrequency: 1.22, wavePhase: 0.3 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.06, waveFrequency: 1.22, wavePhase: 0 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 0.93, wavePhase: 0.5 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 14.06, waveFrequency: 0.93, wavePhase: 0 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.06, waveFrequency: 0.62, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.34, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 14.06, waveFrequency: 1.22, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.06, waveFrequency: 1.22, wavePhase: 0 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 6.06, waveFrequency: 0.34, wavePhase: 0 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 10.06, waveFrequency: 1.22, wavePhase: 0.5 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 14.06, waveFrequency: 0.93, wavePhase: 1.1 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 6.06, waveFrequency: 0.62, wavePhase: 0.3 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 10.06, waveFrequency: 0.62, wavePhase: 0 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 40, customHP: 1, customDamage: 33, customSpeed: 5, waveAmplitude: 10.06, waveFrequency: 0.93, wavePhase: 0 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 14.06, waveFrequency: 0.62, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 6.06, waveFrequency: 0.34, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16, waveAmplitude: 10.06, waveFrequency: 1.22, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15, waveAmplitude: 14.06, waveFrequency: 1.22, wavePhase: 0 }, // 39 h

	// ===== Огнепёр =====
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 2.81, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 10.09, waveFrequency: 2.27, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 5.08, waveFrequency: 1.73, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 1.73, wavePhase: 0 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 2.27, wavePhase: 0 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 10.09, waveFrequency: 1.73, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 7.56, waveFrequency: 2.81, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 10.09, waveFrequency: 2.81, wavePhase: 0 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 10.09, waveFrequency: 1.19, wavePhase: 0 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 2.81, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 2.27, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 10.09, waveFrequency: 1.73, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 5.08, waveFrequency: 1.73, wavePhase: 0 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 1.19, wavePhase: 0.5 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 10.09, waveFrequency: 1.19, wavePhase: 0 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 2.81, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 2.27, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 10.09, waveFrequency: 1.73, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 5.08, waveFrequency: 1.73, wavePhase: 0 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 2.27, wavePhase: 0 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 1.73, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 10.09, waveFrequency: 1.19, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 5.08, waveFrequency: 2.81, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 2.81, wavePhase: 0 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 7.56, waveFrequency: 1.19, wavePhase: 0 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 10.09, waveFrequency: 2.81, wavePhase: 0.5 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 5.08, waveFrequency: 2.27, wavePhase: 1.1 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 7.56, waveFrequency: 1.73, wavePhase: 0.3 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 0 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 2.81, wavePhase: 0.5 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 10.09, waveFrequency: 2.27, wavePhase: 1.1 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 5.08, waveFrequency: 1.73, wavePhase: 0.3 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 1.73, wavePhase: 0 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 10.09, waveFrequency: 1.19, wavePhase: 0.5 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 36, customHP: 1, customDamage: 45, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 0 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 18, customSpeed: 14, waveAmplitude: 7.56, waveFrequency: 2.81, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 10.09, waveFrequency: 2.27, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 18, customSpeed: 16, waveAmplitude: 5.08, waveFrequency: 1.73, wavePhase: 0.3 }, // 39 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 18, customSpeed: 15, waveAmplitude: 7.56, waveFrequency: 1.73, wavePhase: 0 }, // 40 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 151, bossDelayAbDop: 6798, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 168, bossDelayAbDop: 6798, firstWaveDelayMs: 2083 }, // 
	{ boss: 'enem3', bossDelayAb: 167, bossDelayAbDop: 6804, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 168, bossDelayAbDop: 6803, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 168, bossDelayAbDop: 6798, firstWaveDelayMs: 2208 }, // 
];

const bossAbilitiesDop = [
	// Улитень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 300, 300], openingOrder: 0, label: "Медленный справа, слева, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 0, 300, 0], label: "Слева, медленный справа, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [600, 0, 300, 0], label: "Медленный справа, слева, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [600, 0, 300, 300], label: "Медленный справа, слева, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], shotGapsMs: [600, 0, 300], label: "Медленный справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 0, 300, 300], openingOrder: 1, label: "Медленный справа, слева, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [29, 30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 300, 0], label: "Слева, медленный справа, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [34, 35, 36, 37], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 300], label: "Слева, медленный справа, справа и слева" },

	// Гребешок
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 600, 0, 600, 0], openingOrder: 0, label: "В центр, медленный справа, слева, два в центр и слева" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9], shotGapsMs: [0, 600, 300], label: "В центр, слева, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 600, 0, 600], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 300, 300, 600], label: "В центр, слева, в центр, медленный справа и слева" },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [0, 300, 600, 600], label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 600, 0, 600], openingOrder: 1, label: "В центр, слева, медленный справа, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 0, 600, 0], label: "В центр, медленный справа, в центр, слева, в центр и слева" },
	{ boss: 'enem2', indexAbilities: [36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 600], label: "В центр, слева, медленный справа и слева" },

	// Белоцвет
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 0, 600], openingOrder: 0, label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 300, 0, 600], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 300, 0, 600], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 300, 0, 600], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [300, 300, 300, 300], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 0, 600], openingOrder: 1, label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 300, 300], label: "Слева, два в центр, медленный справа и слева" },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 600, 0], label: "Слева, два в центр, медленный справа и слева" },

	// Плакальщица
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 600, 600], label: "Слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7, 8, 9], shotGapsMs: [0, 300, 300, 600, 0], openingOrder: 0, label: "Дважды слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 300, 300, 600], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18], shotGapsMs: [600, 300, 600], label: "Слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 24], shotGapsMs: [0, 300, 300, 600, 0], label: "Дважды слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600], openingOrder: 1, label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 300, 600], label: "Дважды слева, в центр, медленный справа и слева" },

	// Огнепёр
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 300, 600, 300], openingOrder: 0, label: "Два в центр, слева, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 300], label: "Два в центр, слева, в центр и медленный справа" },
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [300, 0, 300, 600, 0], label: "Два в центр, слева, медленный справа и два в центр" },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [0, 600, 600, 300], label: "Два в центр, слева, медленный справа и в центр" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [300, 0, 0, 600], label: "Два в центр, слева, в центр и медленный справа" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 600], openingOrder: 1, label: "Два в центр, слева и медленный справа" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 600, 300, 0], label: "Два в центр, слева, медленный справа и два в центр" },
	{ boss: 'enem5', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 600, 600, 300], label: "Два в центр, слева, медленный справа и в центр" },

];

// Лорные названия связок. Уровень 35 — заводь: Улитень (улитка), Гребешок (ракушка),
// Белоцвет (кувшинка), Плакальщица (плакучая ива), Огнепёр (огненная жар-птица, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Слизистый удар', variant2: 'Рог улитки', variant3: 'Улиточная сила',
        variant4: 'Ракушечная защита', variant5: 'Тягучий бросок', variant6: 'Едкая слизь',
        variant7: 'Улиточная мощь', variant8: 'Прочная ракушка', variant9: 'Тягучий неотвратимый снос',
        variant10: 'Живучий Улитень', variant11: 'Цепкая слизь', variant12: 'Бросок и под ракушку',
        variant13: 'Толстая ракушка', variant14: 'Неутомимый Улитень', variant15: 'Пружинистые рожки',
        variant16: 'Меткий рожок', variant17: 'Улиточная хватка', variant18: 'Неотвратимый взгляд',
        variant19: 'Тягучий бросок вмиг', variant20: 'Илистый дух', variant21: 'Стойкая ракушка',
        variant22: 'Юркий вопреки медлительности', variant23: 'Улиточная стойкость', variant24: 'Чуткие рожки',
        variant25: 'Ускользающий в ракушку', variant26: 'Дикая слизь', variant27: 'Мощь слизи',
        variant28: 'Неотвратимый снос внезапно', variant29: 'Каменная ракушка', variant30: 'Разросшаяся ракушка',
        variant31: 'Улиточный рывок', variant32: 'Живучая ракушка', variant33: 'Неутомимый снос',
        variant34: 'Улиточная прыть', variant35: 'Улиточная выносливость'
    },
    enem2: {
        variant1: 'Гребенчатый удар', variant2: 'Зубец гребня', variant3: 'Гребенчатая сила',
        variant4: 'Чешуйчатая защита', variant5: 'Гребенчатая волна', variant6: 'Едкая слюна',
        variant7: 'Гребенчатая мощь', variant8: 'Прочная чешуя', variant9: 'Тугая гребенчатая волна',
        variant10: 'Живучий Гребешок', variant11: 'Цепкий зубец', variant12: 'Волна и на дно',
        variant13: 'Толстая чешуя', variant14: 'Неутомимый Гребешок', variant15: 'Пружинистый хвост',
        variant16: 'Зубец гребня вмиг', variant17: 'Гребенчатая хватка', variant18: 'Немигающий взгляд',
        variant19: 'Гребенчатая волна вмиг', variant20: 'Ящеричный дух', variant21: 'Стойкая чешуя',
        variant22: 'Юркий Гребешок', variant23: 'Гребенчатая стойкость', variant24: 'Чуткий зубец',
        variant25: 'Ускользающая волна', variant26: 'Дикая волна', variant27: 'Мощь слюны',
        variant28: 'Тугая волна внезапно', variant29: 'Каменная чешуя', variant30: 'Разросшийся гребень',
        variant31: 'Гребенчатый рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая волна',
        variant34: 'Гребенчатая прыть', variant35: 'Гребенчатая выносливость'
    },
    enem3: {
        variant1: 'Цветочный удар', variant2: 'Острый лепесток', variant3: 'Цветочная сила',
        variant4: 'Лепестковая защита', variant5: 'Широкая раскачка', variant6: 'Цветочный сок',
        variant7: 'Цветочная мощь', variant8: 'Плотные лепестки', variant9: 'Широкая плавная раскачка',
        variant10: 'Живучий Белоцвет', variant11: 'Цепкий лепесток', variant12: 'Раскачка и под воду',
        variant13: 'Толстые лепестки', variant14: 'Неутомимый Белоцвет', variant15: 'Стебель кувшинки пружинит',
        variant16: 'Меткий лепесток', variant17: 'Цветочная хватка', variant18: 'Безмятежный взгляд',
        variant19: 'Широкая раскачка вмиг', variant20: 'Цветочный дух', variant21: 'Стойкие лепестки',
        variant22: 'Юркий Белоцвет', variant23: 'Цветочная стойкость', variant24: 'Чуткий лепесток',
        variant25: 'Ускользающая раскачка', variant26: 'Дикая раскачка', variant27: 'Мощь сока',
        variant28: 'Плавная раскачка внезапно', variant29: 'Каменные лепестки', variant30: 'Разросшийся цветок',
        variant31: 'Цветочный рывок', variant32: 'Живучие лепестки', variant33: 'Неутомимая раскачка',
        variant34: 'Цветочная прыть', variant35: 'Цветочная выносливость'
    },
    enem4: {
        variant1: 'Плачущий удар', variant2: 'Плакучая ветвь', variant3: 'Плакучая сила',
        variant4: 'Ивовая защита', variant5: 'Печальный взмах', variant6: 'Едкая слеза',
        variant7: 'Плакучая мощь', variant8: 'Ветви ивы', variant9: 'Длинные печальные взмахи',
        variant10: 'Живучая Плакальщица', variant11: 'Цепкая ветвь', variant12: 'Взмах и в тень ивы',
        variant13: 'Толстые ветви', variant14: 'Неутомимая Плакальщица', variant15: 'Плакучая ветвь пружинит',
        variant16: 'Меткая ветвь', variant17: 'Плакучая хватка', variant18: 'Печальный взгляд',
        variant19: 'Печальный взмах вмиг', variant20: 'Плакучий дух', variant21: 'Стойкие ветви',
        variant22: 'Юркая Плакальщица', variant23: 'Плакучая стойкость', variant24: 'Чуткая ветвь',
        variant25: 'Ускользающий взмах', variant26: 'Дикий плач', variant27: 'Мощь слезы',
        variant28: 'Длинный взмах внезапно', variant29: 'Каменные ветви', variant30: 'Плакучие ветви разрослись',
        variant31: 'Плакучий рывок', variant32: 'Живучие ветви', variant33: 'Неутомимый печальный взмах',
        variant34: 'Плакучая прыть', variant35: 'Плакучая выносливость'
    },
    enem5: {
        variant1: 'Огненный удар', variant2: 'Пылающее перо', variant3: 'Огнепёрная сила',
        variant4: 'Жаркая защита', variant5: 'Яркая волна', variant6: 'Огненный след',
        variant7: 'Огнепёрная мощь', variant8: 'Огненные перья', variant9: 'Яркая быстрая волна',
        variant10: 'Живучий Огнепёр', variant11: 'Цепкое перо', variant12: 'Волна и в пламя',
        variant13: 'Толстые огненные перья', variant14: 'Неутомимый Огнепёр', variant15: 'Пылающее крыло пружинит',
        variant16: 'Меткое перо', variant17: 'Огнепёрная хватка', variant18: 'Пылающий взгляд',
        variant19: 'Яркая волна вмиг', variant20: 'Огненный дух', variant21: 'Стойкие перья',
        variant22: 'Юркий Огнепёр', variant23: 'Огнепёрная стойкость', variant24: 'Чуткое перо',
        variant25: 'Ускользающая яркая волна', variant26: 'Дикое пламя', variant27: 'Мощь огня',
        variant28: 'Быстрая волна внезапно', variant29: 'Каменные перья', variant30: 'Разросшееся пламя',
        variant31: 'Огнепёрный рывок', variant32: 'Живучие перья', variant33: 'Неутомимая яркая волна',
        variant34: 'Огнепёрная прыть', variant35: 'Огнепёрная выносливость'
    }
};
