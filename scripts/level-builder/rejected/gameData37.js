let lvlNumber = 37;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 37 — «Гроза над рекой», Область IV «Реки и озёра», продолжение.
// Картинки сверены напрямую — состав совпадает с идея-документом. 'wave' у четырёх:
// Клешнач боком перебирает тугой волной, Долгонос дёргано мечется у кромки воды,
// Громонос клубится тяжёлой раскатистой волной, Фонарник (финал) качается на волнах
// как настоящий бакен. Треснодуб — единственный не-wave (pause): дерево замирает
// в трещине от разряда, а затем срывается — честная пауза-разрядка вместо колебания.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.85, damageMultiplier: 2.2, minWaveDelay: 2000, minShotDelay: 138, minTelegraphMs: 515,
	phases: [
		{ phase: 1, minHp: 0.668, cadence: 0.982, speed: 0.984, damage: 1, telegraphMultiplier: 1.018, surpriseChance: 0.165, maxActiveAttacks: 17 },
		{ phase: 2, minHp: 0.318, cadence: 0.8, speed: 1.16, damage: 1.19, telegraphMultiplier: 0.87, surpriseChance: 0.302, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0, cadence: 0.65, speed: 1.29, damage: 1.33, telegraphMultiplier: 0.78, surpriseChance: 0.41, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "Две клешни и возврат", combatTrick: "Обычные серии заставляют несколько раз переносить прицел между краями. Фирменный захват меняет чередование на левый удар, два правых и обратный левый; после первого правого нельзя возвращаться раньше времени.", signatureEvery: 4, movementStyle: 'wave', cadence: 1.024, telegraphMs: 830, speedMultiplier: 1.004, damageMultiplier: 0.9, speedVariance: [1.017, 1.042, 1.067, 1.092, 1.117] },
		enem2: { combatIdentity: "Пробежка по кромке", combatTrick: "Кулик чередует левую сторону с правой серединой; длинная серия сдваивает правый удар, а последняя заканчивается двумя левыми, меняя привычный ритм. Медленная правая угроза остаётся среди быстрых перебросов. Попытка отбивать в постоянном темпе или по порядку появления оставляет угрозу позади.", signatureEvery: 4, movementStyle: 'wave', cadence: 1.08, telegraphMs: 783, speedMultiplier: 1.11, damageMultiplier: 0.92, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem3: { combatIdentity: "Разряд с боковым раскатом", combatTrick: "Два разряда правой середины сменяются левым ударом и правым продолжением; длинные серии добавляют второй правый хвост. Нельзя считать первые две молнии всей атакой и уходить бить тучу.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.9, telegraphMs: 960, speedMultiplier: 1.11, damageMultiplier: 1.14, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem4: { combatIdentity: "Задержавшаяся ветвь", combatTrick: "Остановившиеся в полёте ветви продолжают атаку. Правое вступление обычно сменяется двумя левыми и возвратом вправо, но фирменная первая серия чередует стороны без левой пары. Нельзя считать паузу безопасным концом атаки.", signatureEvery: 4, movementStyle: 'pause', cadence: 0.88, telegraphMs: 780, speedMultiplier: 1.101, damageMultiplier: 1.08, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem5: { combatIdentity: "Багор с обратной подачей", combatTrick: "Бакенщик даёт два левых удара, правое закрытие и левое продолжение. Длинные серии добавляют второй левый после возврата: уходить бить босса после привычной пары рано. Медленный правый огонь требует отдельного внимания по срочности.", signatureEvery: 4, movementStyle: 'wave', cadence: 0.819, telegraphMs: 690, speedMultiplier: 1.122, damageMultiplier: 1.1, speedVariance: [1.06, 1.08, 1.1, 1.12, 1.14] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl37/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl37/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl37/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl37/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl37/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Клешнач', image: 'images/enemies/regions/4_rech_ozer/lvl37/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 310, xPos: 50, size: '25%',
		deathAnimation: { preset: 'clawCrack', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Долгонос', image: 'images/enemies/regions/4_rech_ozer/lvl37/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 450, xPos: 50, size: '23%',
		deathAnimation: { preset: 'featherScatter', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Громонос', image: 'images/enemies/regions/4_rech_ozer/lvl37/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 570, xPos: 50, size: '28%',
		deathAnimation: { preset: 'smokeDisperse', durationMs: 1450 }
	},
	enem4: {
		name: 'enem4', dispName: 'Треснодуб', image: 'images/enemies/regions/4_rech_ozer/lvl37/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 710, xPos: 50, size: '28%',
		deathAnimation: { preset: 'trunkSplit', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Фонарник', image: 'images/enemies/regions/4_rech_ozer/lvl37/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'lanternSnuff', durationMs: 1550 }
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
let timeNextBoss = 7;
const bossInterval = 8;

const bossAbilities = [
	// ===== Клешнач =====
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 6.56, waveFrequency: 2.42, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 8.09, waveFrequency: 2.02, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.6, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.6, wavePhase: 0 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 8.09, waveFrequency: 1.6, wavePhase: 0 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 6.56, waveFrequency: 2.42, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 2.02, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 2.02, wavePhase: 0 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 2.02, wavePhase: 0 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 8.09, waveFrequency: 1.6, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 2.42, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 2.42, wavePhase: 0 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 2.42, wavePhase: 0 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 6.56, waveFrequency: 2.02, wavePhase: 0.5 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 8.09, waveFrequency: 1.6, wavePhase: 1.1 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0.3 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 1.2, wavePhase: 0 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 8.09, waveFrequency: 1.2, wavePhase: 0 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 2.42, wavePhase: 0.5 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 6.56, waveFrequency: 2.02, wavePhase: 1.1 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 1.6, wavePhase: 0.3 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.6, wavePhase: 0 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 6.56, waveFrequency: 1.6, wavePhase: 0 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 8.09, waveFrequency: 1.2, wavePhase: 0.5 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 2.42, wavePhase: 1.1 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 2.02, wavePhase: 0.3 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 2.02, wavePhase: 0 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 5.07, waveFrequency: 2.02, wavePhase: 0 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 6.56, waveFrequency: 1.6, wavePhase: 0.5 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 8.09, waveFrequency: 1.2, wavePhase: 1.1 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 2.42, wavePhase: 0.3 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.56, waveFrequency: 2.42, wavePhase: 0 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 8.09, waveFrequency: 2.42, wavePhase: 0 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 5.07, waveFrequency: 2.02, wavePhase: 0.5 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11, waveAmplitude: 6.56, waveFrequency: 1.6, wavePhase: 1.1 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 8.09, waveFrequency: 1.2, wavePhase: 0.3 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 5.07, waveFrequency: 1.2, wavePhase: 0 }, // 39 h

	// ===== Долгонос =====
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 4.08, waveFrequency: 1.2, wavePhase: 0 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.57, waveFrequency: 3.02, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.06, waveFrequency: 2.42, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.08, waveFrequency: 1.78, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.57, waveFrequency: 1.78, wavePhase: 0 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 9.06, waveFrequency: 1.78, wavePhase: 0 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 4.08, waveFrequency: 1.2, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.57, waveFrequency: 3.02, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.06, waveFrequency: 2.42, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.08, waveFrequency: 2.42, wavePhase: 0 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 6.57, waveFrequency: 2.42, wavePhase: 0 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.06, waveFrequency: 1.78, wavePhase: 0.5 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.08, waveFrequency: 1.2, wavePhase: 1.1 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.57, waveFrequency: 3.02, wavePhase: 0.3 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.06, waveFrequency: 3.02, wavePhase: 0 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 4.08, waveFrequency: 2.42, wavePhase: 0.5 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 6.57, waveFrequency: 1.2, wavePhase: 0 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.06, waveFrequency: 3.02, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.08, waveFrequency: 2.42, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.57, waveFrequency: 1.78, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.06, waveFrequency: 1.78, wavePhase: 0 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 4.08, waveFrequency: 1.78, wavePhase: 0 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.57, waveFrequency: 1.2, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.06, waveFrequency: 3.02, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.08, waveFrequency: 2.42, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.57, waveFrequency: 2.42, wavePhase: 0 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 9.06, waveFrequency: 2.42, wavePhase: 0 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 4.08, waveFrequency: 1.78, wavePhase: 0.5 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.57, waveFrequency: 1.2, wavePhase: 1.1 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.06, waveFrequency: 3.02, wavePhase: 0.3 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 4.08, waveFrequency: 3.02, wavePhase: 0 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 6.57, waveFrequency: 3.02, wavePhase: 0 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 9.06, waveFrequency: 2.42, wavePhase: 0.5 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.08, waveFrequency: 1.78, wavePhase: 1.1 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 6.57, waveFrequency: 1.2, wavePhase: 0.3 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 9.06, waveFrequency: 1.2, wavePhase: 0 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 39, customHP: 1, customDamage: 31, customSpeed: 5, waveAmplitude: 4.08, waveFrequency: 1.2, wavePhase: 0 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12, waveAmplitude: 6.57, waveFrequency: 3.02, wavePhase: 0.5 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 9.06, waveFrequency: 2.42, wavePhase: 1.1 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 13, waveAmplitude: 4.08, waveFrequency: 1.78, wavePhase: 0.3 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 14, waveAmplitude: 6.57, waveFrequency: 1.78, wavePhase: 0 }, // 40 h

	// ===== Громонос =====
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.34, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 1.19, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 13.06, waveFrequency: 0.92, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.62, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 0.62, wavePhase: 0 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 13.06, waveFrequency: 0.62, wavePhase: 0 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.34, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 9.07, waveFrequency: 1.19, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 13.06, waveFrequency: 0.92, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.92, wavePhase: 0 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.62, wavePhase: 0.5 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 13.06, waveFrequency: 1.19, wavePhase: 0 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.92, wavePhase: 0.5 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 9.07, waveFrequency: 0.62, wavePhase: 1.1 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 13.06, waveFrequency: 0.34, wavePhase: 0.3 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.34, wavePhase: 0 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.34, wavePhase: 0 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 13.06, waveFrequency: 1.19, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 5.08, waveFrequency: 0.92, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 0.62, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 13.06, waveFrequency: 0.62, wavePhase: 0 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.34, wavePhase: 0.5 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 9.07, waveFrequency: 0.92, wavePhase: 0 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 13.06, waveFrequency: 0.62, wavePhase: 0.5 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 5.08, waveFrequency: 0.34, wavePhase: 1.1 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 1.19, wavePhase: 0.3 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 13.06, waveFrequency: 1.19, wavePhase: 0 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 0 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.92, wavePhase: 0.5 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 13.06, waveFrequency: 0.62, wavePhase: 1.1 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.34, wavePhase: 0.3 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 0.34, wavePhase: 0 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 13.06, waveFrequency: 1.19, wavePhase: 0.5 }, // 32 f
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 5.08, waveFrequency: 0.62, wavePhase: 0 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 9.07, waveFrequency: 0.34, wavePhase: 0.5 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 13.06, waveFrequency: 1.19, wavePhase: 1.1 }, // 35 g
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 0.92, wavePhase: 0.3 }, // 36 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 9.07, waveFrequency: 0.92, wavePhase: 0 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 39, customHP: 1, customDamage: 38, customSpeed: 5, waveAmplitude: 13.06, waveFrequency: 0.92, wavePhase: 0 }, // 38 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12, waveAmplitude: 5.08, waveFrequency: 0.62, wavePhase: 0.5 }, // 39 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13, waveAmplitude: 9.07, waveFrequency: 0.34, wavePhase: 1.1 }, // 40 h
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 13.06, waveFrequency: 1.19, wavePhase: 0.3 }, // 41 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14, waveAmplitude: 5.08, waveFrequency: 1.19, wavePhase: 0 }, // 42 h

	// ===== Треснодуб =====
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 15.5 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 37, customHP: 1, customDamage: 34, customSpeed: 5 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 16.5 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 17.5 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 17.5 }, // 41 h

	// ===== Фонарник =====
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 5.09, waveFrequency: 0.39, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 2.18, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 13.09, waveFrequency: 1.61, wavePhase: 1.1 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 5.09, waveFrequency: 1, wavePhase: 0.3 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 1, wavePhase: 0 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 13.09, waveFrequency: 1, wavePhase: 0 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 0.39, wavePhase: 0.5 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 2.18, wavePhase: 1.1 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 13.09, waveFrequency: 1.61, wavePhase: 0.3 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.09, waveFrequency: 1.61, wavePhase: 0 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1, wavePhase: 0.5 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 13.09, waveFrequency: 2.18, wavePhase: 0 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 1.61, wavePhase: 0.5 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 1, wavePhase: 1.1 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 13.09, waveFrequency: 0.39, wavePhase: 0.3 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.09, waveFrequency: 0.39, wavePhase: 0 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 9.08, waveFrequency: 0.39, wavePhase: 0 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 13.09, waveFrequency: 2.18, wavePhase: 0.5 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.09, waveFrequency: 1.61, wavePhase: 1.1 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 9.08, waveFrequency: 1, wavePhase: 0.3 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 13.09, waveFrequency: 1, wavePhase: 0 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 5.09, waveFrequency: 1, wavePhase: 0 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 0.39, wavePhase: 0.5 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 13.09, waveFrequency: 2.18, wavePhase: 1.1 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 5.09, waveFrequency: 1.61, wavePhase: 0.3 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 1.61, wavePhase: 0 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 13.09, waveFrequency: 1, wavePhase: 0.5 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 5.09, waveFrequency: 2.18, wavePhase: 0 }, // 27 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.61, wavePhase: 0.5 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 13.09, waveFrequency: 1, wavePhase: 1.1 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 5.09, waveFrequency: 0.39, wavePhase: 0.3 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 0.39, wavePhase: 0 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 13.09, waveFrequency: 0.39, wavePhase: 0 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 2.18, wavePhase: 0.5 }, // 33 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 1.61, wavePhase: 1.1 }, // 34 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 13.09, waveFrequency: 1, wavePhase: 0.3 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.09, waveFrequency: 1, wavePhase: 0 }, // 36 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 0.39, wavePhase: 0.5 }, // 37 g
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 38, customHP: 1, customDamage: 46, customSpeed: 5, waveAmplitude: 13.09, waveFrequency: 1.61, wavePhase: 0 }, // 38 h
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 5.09, waveFrequency: 1, wavePhase: 0.5 }, // 39 h
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 9.08, waveFrequency: 0.39, wavePhase: 1.1 }, // 40 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16, waveAmplitude: 13.09, waveFrequency: 2.18, wavePhase: 0.3 }, // 41 h
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15, waveAmplitude: 5.09, waveFrequency: 2.18, wavePhase: 0 }, // 42 h
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 14, waveAmplitude: 9.08, waveFrequency: 1.61, wavePhase: 0.5 }, // 43 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 162, bossDelayAbDop: 6797, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 169, bossDelayAbDop: 6797, firstWaveDelayMs: 2065 }, // 
	{ boss: 'enem3', bossDelayAb: 168, bossDelayAbDop: 7100, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 169, bossDelayAbDop: 7201, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 169, bossDelayAbDop: 8001, firstWaveDelayMs: 2376 }, // 
];

const bossAbilitiesDop = [
	// Клешнач
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 300, 300, 600], openingOrder: 0, label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 300, 300, 450], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [300, 300, 300, 600], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [300, 300, 300, 600], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [300, 300, 300, 600], label: "Медленный справа, справа, слева, справа и слева" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 300, 300], openingOrder: 1, label: "Медленный справа, слева, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33, 34], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 300, 300], label: "Медленный справа, слева, дважды справа и слева" },
	{ boss: 'enem1', indexAbilities: [35, 36, 37, 38, 39], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 0, 600, 0], label: "Медленный справа, слева, дважды справа и слева" },

	// Долгонос
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 300, 600, 600], openingOrder: 0, label: "Слева, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 600, 0, 600], label: "Слева, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [600, 300, 300, 450, 0], label: "Слева, медленный справа, два в центр, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [0, 300, 600, 600], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [0, 300, 600, 600], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 600, 600], openingOrder: 1, label: "Слева, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 600, 0, 600], label: "Слева, в центр, медленный справа, слева и в центр" },
	{ boss: 'enem2', indexAbilities: [36, 37, 38, 39, 40], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 450, 0, 300], label: "Слева, медленный справа, в центр и дважды слева" },

	// Громонос
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 600, 300, 0], openingOrder: 0, label: "В центр, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [300, 600, 300, 0, 0], label: "В центр, медленный справа, в центр, слева и два в центр" },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [300, 0, 600, 300], label: "Два в центр, медленный справа, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [300, 600, 300, 0, 0], label: "В центр, медленный справа, в центр, слева и два в центр" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25, 26], shotGapsMs: [300, 600, 300, 0], label: "В центр, медленный справа, в центр, слева и в центр" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 600, 300, 0], openingOrder: 1, label: "Два в центр, медленный справа, слева и два в центр" },
	{ boss: 'enem3', indexAbilities: [33, 34, 35, 36, 37], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600], label: "Два в центр, слева, медленный справа и в центр" },
	{ boss: 'enem3', indexAbilities: [38, 39, 40, 41, 42], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 600, 0], label: "Два в центр, медленный справа, слева и в центр" },

	// Треснодуб
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 0], label: "В центр, дважды слева, в центр и медленный справа" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 600, 600, 300], openingOrder: 0, label: "В центр, слева, медленный справа, слева и в центр" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 300, 600, 300], label: "В центр, дважды слева, медленный справа и в центр" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [0, 300, 300, 300, 300], label: "В центр, слева, два в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [300, 0, 600, 600], label: "В центр, дважды слева, медленный справа и в центр" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600], openingOrder: 1, label: "В центр, слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 0, 300, 600], label: "Два в центр, слева, в центр, медленный справа и слева" },
	{ boss: 'enem4', indexAbilities: [37, 38, 39, 40, 41], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 600, 300], label: "В центр, дважды слева, медленный справа и в центр" },

	// Фонарник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 300, 600], openingOrder: 0, label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [0, 300, 300, 600, 0], label: "Дважды слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [300, 0, 300, 600], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [300, 0, 300, 600], label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [300, 0, 300, 600, 300], label: "Дважды слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600], openingOrder: 1, label: "Дважды слева, в центр, медленный справа и слева" },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 300, 600, 0], label: "Дважды слева, в центр, медленный справа и дважды слева" },
	{ boss: 'enem5', indexAbilities: [38, 39, 40, 41, 42, 43], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 300, 600, 300], label: "Дважды слева, в центр, медленный справа и дважды слева" },

];

// Лорные названия связок. Уровень 37 — прибрежная нежить: Клешнач (рак), Долгонос
// (жук-долгоносик), Громонос (грозовой дух), Треснодуб (треснувший дуб), Фонарник
// (буй-фонарь, финал).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Клешнёвый удар', variant2: 'Боковой шаг', variant3: 'Клешнёвая сила',
        variant4: 'Панцирная броня', variant5: 'Боковая волна', variant6: 'Илистая слизь',
        variant7: 'Клешнёвая мощь', variant8: 'Плотный панцирь', variant9: 'Тесная боковая волна',
        variant10: 'Живучий Клешнач', variant11: 'Цепкая клешня', variant12: 'Волна вбок и в ил',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый Клешнач', variant15: 'Клешня пружинит',
        variant16: 'Меткий щипок', variant17: 'Клешнёвая хватка', variant18: 'Немигающий взгляд',
        variant19: 'Боковая волна вмиг', variant20: 'Прибрежный дух', variant21: 'Панцирь стойкий',
        variant22: 'Юркий Клешнач', variant23: 'Клешнёвая стойкость', variant24: 'Чуткая клешня',
        variant25: 'Ускользающий бок', variant26: 'Дикая боковая волна', variant27: 'Мощь слизи',
        variant28: 'Боковая волна внезапно', variant29: 'Каменный панцирь', variant30: 'Клешня разрослась',
        variant31: 'Клешнёвый рывок', variant32: 'Живучий панцирь', variant33: 'Неутомимая боковая волна',
        variant34: 'Клешнёвая прыть', variant35: 'Клешнёвая выносливость'
    },
    enem2: {
        variant1: 'Клювенный удар', variant2: 'Дрожащий шаг', variant3: 'Клювенная сила',
        variant4: 'Жёсткое перо', variant5: 'Дёрганая волна', variant6: 'Прибрежный пух',
        variant7: 'Клювенная мощь', variant8: 'Плотное перо', variant9: 'Мелкая дёрганая волна',
        variant10: 'Живучий Долгонос', variant11: 'Цепкий клюв', variant12: 'Дёрганая волна и в ил',
        variant13: 'Толстое перо', variant14: 'Неутомимый Долгонос', variant15: 'Клюв пружинит',
        variant16: 'Меткий прокол', variant17: 'Клювенная хватка', variant18: 'Косой взгляд',
        variant19: 'Дёрганая волна вмиг', variant20: 'Береговой дух', variant21: 'Перо стойкое',
        variant22: 'Юркий Долгонос', variant23: 'Клювенная стойкость', variant24: 'Чуткий клюв',
        variant25: 'Ускользающая дрожь', variant26: 'Дикая дёрганая волна', variant27: 'Мощь пуха',
        variant28: 'Дёрганая волна внезапно', variant29: 'Каменное перо', variant30: 'Клюв удлинился',
        variant31: 'Клювенный рывок', variant32: 'Живучее перо', variant33: 'Неутомимая дёрганая волна',
        variant34: 'Клювенная прыть', variant35: 'Клювенная выносливость'
    },
    enem3: {
        variant1: 'Громовой удар', variant2: 'Тяжёлый шаг', variant3: 'Громовая сила',
        variant4: 'Дождевая шкура', variant5: 'Раскатистая волна', variant6: 'Грозовая изморось',
        variant7: 'Громовая мощь', variant8: 'Плотная дождевая шкура', variant9: 'Широкая раскатистая волна',
        variant10: 'Живучий Громонос', variant11: 'Цепкий удар грома', variant12: 'Раскат и в глубину',
        variant13: 'Толстая шкура', variant14: 'Неутомимый Громонос', variant15: 'Удар грома пружинит',
        variant16: 'Меткий разряд', variant17: 'Громовая хватка', variant18: 'Грозовой взгляд',
        variant19: 'Раскатистая волна вмиг', variant20: 'Грозовой дух', variant21: 'Дождевая шкура стойкая',
        variant22: 'Юркий вопреки грому', variant23: 'Громовая стойкость', variant24: 'Чуткий удар грома',
        variant25: 'Ускользающий раскат', variant26: 'Дикая гроза', variant27: 'Мощь изморози',
        variant28: 'Раскатистая волна внезапно', variant29: 'Каменная шкура', variant30: 'Раскат разросся',
        variant31: 'Громовой рывок', variant32: 'Живучая дождевая шкура', variant33: 'Неутомимая раскатистая волна',
        variant34: 'Громовая прыть', variant35: 'Громовая выносливость'
    },
    enem4: {
        variant1: 'Дубовый удар', variant2: 'Треск коры', variant3: 'Дубовая сила',
        variant4: 'Толстая кора', variant5: 'Пауза и рывок', variant6: 'Смолистая труха',
        variant7: 'Дубовая мощь', variant8: 'Крепкая кора', variant9: 'Короткая пауза перед рывком',
        variant10: 'Живучий Треснодуб', variant11: 'Цепкий сук', variant12: 'Рывок и в трещину',
        variant13: 'Толстая кора вдвойне', variant14: 'Неутомимый Треснодуб', variant15: 'Сук пружинит',
        variant16: 'Меткая щепка', variant17: 'Дубовая хватка', variant18: 'Немигающий взгляд коры',
        variant19: 'Пауза и рывок мгновенно', variant20: 'Лесной дух', variant21: 'Кора держит',
        variant22: 'Юркий вопреки трещине', variant23: 'Дубовая стойкость', variant24: 'Чуткая трещина',
        variant25: 'Ускользающая пауза', variant26: 'Дикий рывок из трещины', variant27: 'Мощь смолы',
        variant28: 'Рывок из трещины внезапно', variant29: 'Каменная кора', variant30: 'Трещина разрослась',
        variant31: 'Дубовый рывок', variant32: 'Живучая кора', variant33: 'Неутомимая пауза перед рывком',
        variant34: 'Дубовая прыть', variant35: 'Дубовая выносливость'
    },
    enem5: {
        variant1: 'Фонарный удар', variant2: 'Раскачка на волне', variant3: 'Фонарная сила',
        variant4: 'Просмолённый бок', variant5: 'Плавная качка', variant6: 'Болотный чад',
        variant7: 'Фонарная мощь', variant8: 'Плотный просмолённый бок', variant9: 'Широкая плавная качка',
        variant10: 'Живучий Фонарник', variant11: 'Цепкий крюк-подвес', variant12: 'Качка и в туман',
        variant13: 'Толстая просмолённая обшивка', variant14: 'Неутомимый Фонарник', variant15: 'Подвес пружинит',
        variant16: 'Меткий блик', variant17: 'Фонарная хватка', variant18: 'Немигающий свет',
        variant19: 'Плавная качка вмиг', variant20: 'Болотный дух', variant21: 'Обшивка держит',
        variant22: 'Юркий вопреки весу', variant23: 'Фонарная стойкость', variant24: 'Чуткий блик',
        variant25: 'Ускользающий свет', variant26: 'Дикая качка', variant27: 'Мощь чада',
        variant28: 'Плавная качка внезапно', variant29: 'Каменная обшивка', variant30: 'Свет разросся',
        variant31: 'Фонарный рывок', variant32: 'Живучая обшивка', variant33: 'Неутомимая качка',
        variant34: 'Фонарная прыть', variant35: 'Фонарная выносливость'
    }
};
