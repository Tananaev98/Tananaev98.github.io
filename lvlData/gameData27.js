let lvlNumber = 27;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 27 — «Огородная гряда» (см. lvlData/areas.js/LEVEL_WORKING_TITLES и
// description/идеи по уровням.txt), Область III «Плодородные земли», продолжение.
// Картинки — огородные овощи (не гусеница/скворец/сторож из старого плана в
// «идеи по уровням.txt» — тот план устарел, реальные ассеты другие; см. также
// расхождение по 28/29). Сверено с admin-boss-pattern-panel.html перед написанием.
//
// РЕГИОНАЛЬНАЯ МЕХАНИКА «синхронный рывок» на этом уровне несёт Кочерыжка (enem3,
// была на enem1 в 26-м) — по плану region-signature намеренно кочует по ролям
// (enem1→26, enem3→27, enem4→28, enem5→29), чтобы «кто несёт приём» тоже не стало
// новым клише. Сигнатурная серия длиннее, чем на 26-м (6 синхронных вместо 5) —
// нарастание цепочки к концу региона, как и задумано.
//
// Пять архетипов (movementStyle взят по наименее используемым для роли — сверено
// с живой таблицей на момент написания):
// enem1 Пупырчик — accelerate. Огуречные усики медленно раскручиваются и
//                  разгоняются — спокойное начало без явной угрозы в старте.
// enem2 Сочень    — drift. Томатный сок расползается вбок, быстрые серии.
// enem3 Кочерыжка — pause, несёт синхронный рывок («листья разворачиваются разом»).
// enem4 Дёргач    — straight. Морковь без движкового трюка — нервность идёт через
//                  ритм (самый короткий bossDelayAb на уровне), не через траекторию.
// enem5 Пустоглав — weave. Пустая тыква-фонарь мотается непредсказуемо, финал
//                  смешивает четырёх предыдущих по-своему (без клише «впервые
//                  перекрывает низ поля разом»).
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.889, damageMultiplier: 1.78, minWaveDelay: 2120, minShotDelay: 157, minTelegraphMs: 550,
	phases: [
		{ phase: 1, minHp: 0.654, cadence: 1.012, speed: 1.01, damage: 1, telegraphMultiplier: 0.988, surpriseChance: 0.142, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.316, cadence: 0.862, speed: 1.103, damage: 1.14, telegraphMultiplier: 0.932, surpriseChance: 0.239, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0, cadence: 0.73, speed: 1.19, damage: 1.26, telegraphMultiplier: 0.798, surpriseChance: 0.34, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { combatIdentity: "Усики огурца", combatTrick: "центр и левый край сменяют друг друга быстрыми ударами, а справа висит медленный побег", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.06, telegraphMs: 890, speedMultiplier: 1.001, damageMultiplier: 0.88, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem2: { combatIdentity: "Брызги спелой мякоти", combatTrick: "быстрые удары чередуют левый край и центр, пока справа дрейфует медленный побег; в завершении они идут вплотную", signatureEvery: 4, movementStyle: 'drift', cadence: 0.959, telegraphMs: 771, speedMultiplier: 1.199, damageMultiplier: 0.97, speedVariance: [0.95, 0.99, 1.03, 1.07, 1.11] },
		enem3: { combatIdentity: "Кочан раскрывает следующий лист", combatTrick: "после центральной пары левый край добивает почти сразу, а медленный правый лист остаётся фоном", signatureEvery: 4, movementStyle: 'pause', cadence: 1.159, telegraphMs: 990, speedMultiplier: 1.4, damageMultiplier: 1.2, speedVariance: [0.99, 1.02, 1.05, 1.08, 1.11] },
		enem4: { combatIdentity: "Морковный рывок", combatTrick: "центр сменяется парой быстрых ударов слева подряд, медленный правый корень висит фоном", signatureEvery: 4, movementStyle: 'straight', cadence: 0.78, telegraphMs: 630, speedMultiplier: 1.198, damageMultiplier: 0.76, speedVariance: [1, 1.04, 1.08, 1.12, 1.16] },
		enem5: { combatIdentity: "Пустая тыква даёт отзвук", combatTrick: "удары разлетаются между левым и правым краями при медленном правом побеге, в завершении эхо идёт слева", signatureEvery: 4, movementStyle: 'weave', cadence: 0.861, telegraphMs: 711, speedMultiplier: 1, damageMultiplier: 1.1, speedVariance: [1.05, 1.065, 1.08, 1.095, 1.11] }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/3_plod_zemli/lvl27/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/3_plod_zemli/lvl27/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/3_plod_zemli/lvl27/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/3_plod_zemli/lvl27/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/3_plod_zemli/lvl27/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Пупырчик', image: 'images/enemies/regions/3_plod_zemli/lvl27/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 220, xPos: 50, size: '23%',
		deathAnimation: { preset: 'curlWither', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Сочень', image: 'images/enemies/regions/3_plod_zemli/lvl27/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 350, xPos: 50, size: '25%',
		deathAnimation: { preset: 'splatBurst', durationMs: 1100 }
	},
	enem3: {
		name: 'enem3', dispName: 'Кочерыжка', image: 'images/enemies/regions/3_plod_zemli/lvl27/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 470, xPos: 50, size: '28%',
		deathAnimation: { preset: 'leafPeelSink', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Дёргач', image: 'images/enemies/regions/3_plod_zemli/lvl27/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 610, xPos: 50, size: '24%',
		deathAnimation: { preset: 'yankSnap', durationMs: 1000 }
	},
	enem5: {
		name: 'enem5', dispName: 'Пустоглав', image: 'images/enemies/regions/3_plod_zemli/lvl27/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '28%',
		deathAnimation: { preset: 'hollowCollapse', durationMs: 1500 }
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
let timeNextBoss = 7;
const bossInterval = 5;

const bossAbilities = [
	// ===== Пупырчик =====
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 24 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy, customSpeed: 5 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 29 g
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 34 h
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 67, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem1.light, customSpeed: 13 }, // 37 h

	// ===== Сочень =====
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 66, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 67, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 9, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 64, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 66, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 63, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 18 e
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 62, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 23 f
	{ boss: 'enem2', type: 'enem22', xPos: 64, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 24 f
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 6, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 61, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 }, // 27 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 28 g
	{ boss: 'enem2', type: 'enem22', xPos: 63, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 29 g
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 7, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, // 32 h
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 33 h
	{ boss: 'enem2', type: 'enem22', xPos: 62, yPos: 5, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, // 34 h
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 8, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, // 35 h

	// ===== Кочерыжка =====
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 63, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 61, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 8, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 59, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 9, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 27, customHP: 1, customDamage: attackDamage.enem3.heavy, customSpeed: 5 }, // 32 h
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 7, customHP: 1, customDamage: attackDamage.enem3.light, customSpeed: 13 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 6, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, // 35 h

	// ===== Дёргач =====
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 63, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 61, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 4, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 8, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy, customSpeed: 5 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 9, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 14 }, // 34 h
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem4.light, customSpeed: 13 }, // 36 h

	// ===== Пустоглав =====
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 13 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 13 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 96, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 13 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 26 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 7, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 13 }, // 29 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 13 }, // 32 g
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 42, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 }, // 33 h
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 11 }, // 34 h
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 6, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 35 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 36 h
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 12 }, // 37 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 181, bossDelayAbDop: 5701, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 151, bossDelayAbDop: 5100, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 160, bossDelayAbDop: 6899, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 155, bossDelayAbDop: 7101, firstWaveDelayMs: 1920 }, // 
	{ boss: 'enem5', bossDelayAb: 175, bossDelayAbDop: 6700, firstWaveDelayMs: 2208 }, // 
];

const bossAbilitiesDop = [
	// Пупырчик
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 600, 300, 0], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [600, 0, 0, 600, 600] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14], shotGapsMs: [0, 300, 0] },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [600, 0, 300, 300] },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], shotGapsMs: [0, 600, 0] },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 0], openingOrder: 1, label: "Усики огурца — знакомство" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31, 32, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 600, 0, 0, 600], label: "Усики огурца — иной конец" },
	{ boss: 'enem1', indexAbilities: [34, 35, 36, 37], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 0], label: "Усики огурца — завершение" },

	// Сочень
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 300, 600, 600], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], shotGapsMs: [300, 0, 600] },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [0, 600, 600, 300] },
	{ boss: 'enem2', indexAbilities: [14, 15, 16, 17], shotGapsMs: [0, 0, 600] },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21], shotGapsMs: [300, 300, 300] },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 300, 600, 600], openingOrder: 1, label: "Брызги спелой мякоти — знакомство" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 600, 0, 600], label: "Брызги спелой мякоти — иной конец" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 300], label: "Брызги спелой мякоти — завершение" },

	// Кочерыжка
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 0, 300] },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 300], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12], shotGapsMs: [300, 0, 0] },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17], shotGapsMs: [0, 300, 0, 300] },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21], shotGapsMs: [0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Кочан раскрывает следующий лист — знакомство" },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 0, 0], label: "Кочан раскрывает следующий лист — иной конец" },
	{ boss: 'enem3', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 0], label: "Кочан раскрывает следующий лист — завершение" },

	// Дёргач
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 300, 600], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [0, 0, 0, 300] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12], shotGapsMs: [600, 0, 600] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 16, 17, 18], shotGapsMs: [300, 300, 0, 600, 600] },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22], shotGapsMs: [300, 0, 0] },
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 0, 600], openingOrder: 1, label: "Морковный рывок — знакомство" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 600, 300, 0, 0], label: "Морковный рывок — иной конец" },
	{ boss: 'enem4', indexAbilities: [33, 34, 35, 36], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 600], label: "Морковный рывок — завершение" },

	// Пустоглав
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 300, 0, 300], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 300] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12], shotGapsMs: [0, 0, 300] },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16, 17], shotGapsMs: [300, 300, 300, 0] },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21], shotGapsMs: [0, 0, 300] },
	{ boss: 'enem5', indexAbilities: [22, 23, 24, 25, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 300, 0, 0], openingOrder: 1, label: "Пустая тыква даёт отзвук — знакомство" },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 300, 0, 300], label: "Пустая тыква даёт отзвук — иной конец" },
	{ boss: 'enem5', indexAbilities: [33, 34, 35, 36, 37], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 300, 0], label: "Пустая тыква даёт отзвук — завершение" },

];

// Лорные названия связок. Уровень 27 — грядка: Пупырчик (огурец), Сочень (помидор),
// Кочерыжка (капуста), Дёргач (лук), Пустоглав (тыква-фонарь).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Пупырчатый удар', variant2: 'Острый усик', variant3: 'Пупырчатая сила',
        variant4: 'Бугристая кожица', variant5: 'Бросок усиком', variant6: 'Сок огурца',
        variant7: 'Пупырчатая мощь', variant8: 'Плотная кожица', variant9: 'Раскручивающийся усик',
        variant10: 'Живучий Пупырчик', variant11: 'Цепкий усик', variant12: 'Бросок и в грядку',
        variant13: 'Толстая кожица', variant14: 'Неутомимый Пупырчик', variant15: 'Пружинистый усик',
        variant16: 'Меткая бугристость', variant17: 'Пупырчатая хватка', variant18: 'Взгляд сквозь листья',
        variant19: 'Бросок усика вмиг', variant20: 'Огуречный дух', variant21: 'Стойкая кожица',
        variant22: 'Юркий Пупырчик', variant23: 'Пупырчатая стойкость', variant24: 'Чуткий усик',
        variant25: 'Ускользающий усик', variant26: 'Дикий усик', variant27: 'Мощь сока',
        variant28: 'Внезапный разгон усика', variant29: 'Каменная кожица', variant30: 'Разросшийся усик',
        variant31: 'Пупырчатый рывок', variant32: 'Живучая кожица', variant33: 'Неутомимый разгон',
        variant34: 'Пупырчатая прыть', variant35: 'Пупырчатая выносливость'
    },
    enem2: {
        variant1: 'Сочный удар', variant2: 'Острая плодоножка', variant3: 'Сочная сила',
        variant4: 'Тонкая кожица', variant5: 'Плевок сока', variant6: 'Томатный сок',
        variant7: 'Сочная мощь', variant8: 'Плотная мякоть', variant9: 'Расползающийся сок вбок',
        variant10: 'Живучий Сочень', variant11: 'Цепкая плодоножка', variant12: 'Плевок и в грядку',
        variant13: 'Толстая мякоть', variant14: 'Неутомимый Сочень', variant15: 'Пружинистая мякоть',
        variant16: 'Меткий плевок', variant17: 'Сочная хватка', variant18: 'Красный взгляд',
        variant19: 'Плевок сока вмиг', variant20: 'Томатный дух', variant21: 'Стойкая кожица',
        variant22: 'Юркий Сочень', variant23: 'Сочная стойкость', variant24: 'Чуткая плодоножка',
        variant25: 'Ускользающий сок', variant26: 'Дикий плевок', variant27: 'Мощь сока',
        variant28: 'Сок вбок внезапно', variant29: 'Каменная мякоть', variant30: 'Разросшаяся мякоть',
        variant31: 'Сочный рывок', variant32: 'Живучая мякоть', variant33: 'Неутомимый расплеск',
        variant34: 'Сочная прыть', variant35: 'Сочная выносливость'
    },
    enem3: {
        variant1: 'Кочанный удар', variant2: 'Лист капусты', variant3: 'Кочанная сила',
        variant4: 'Листовая защита', variant5: 'Синхронный лист', variant6: 'Капустный сок',
        variant7: 'Кочанная мощь', variant8: 'Плотные листья', variant9: 'Синхронное разворачивание',
        variant10: 'Живучая Кочерыжка', variant11: 'Цепкий лист', variant12: 'Разворот и в грядку',
        variant13: 'Толстые листья', variant14: 'Неутомимая Кочерыжка', variant15: 'Пружинистый кочан',
        variant16: 'Меткий лист капусты', variant17: 'Кочанная хватка', variant18: 'Взгляд из кочана',
        variant19: 'Синхронный разворот вмиг', variant20: 'Капустный дух', variant21: 'Стойкие листья',
        variant22: 'Юркая Кочерыжка', variant23: 'Кочанная стойкость', variant24: 'Чуткий лист',
        variant25: 'Ускользающий лист', variant26: 'Дикий разворот', variant27: 'Мощь сока',
        variant28: 'Разворот внезапно', variant29: 'Каменный кочан', variant30: 'Разросшийся кочан',
        variant31: 'Кочанный рывок', variant32: 'Живучие листья', variant33: 'Неутомимый разворот',
        variant34: 'Кочанная прыть', variant35: 'Кочанная выносливость'
    },
    enem4: {
        variant1: 'Дёргающий удар', variant2: 'Морковная кожица', variant3: 'Дёргающая сила',
        variant4: 'Кожица-защита', variant5: 'Рывок-дёрг', variant6: 'Морковный сок',
        variant7: 'Дёргающая мощь', variant8: 'Плотная кожица', variant9: 'Нервный ритм рывков',
        variant10: 'Живучий Дёргач', variant11: 'Цепкий корешок', variant12: 'Дёрг и в грядку',
        variant13: 'Толстая кожица', variant14: 'Неутомимый Дёргач', variant15: 'Пружинистый дёрг',
        variant16: 'Меткий корешок', variant17: 'Дёргающая хватка', variant18: 'Оранжевый прищур',
        variant19: 'Мгновенный дёрг', variant20: 'Морковный дух', variant21: 'Стойкая кожица',
        variant22: 'Юркий Дёргач', variant23: 'Дёргающая стойкость', variant24: 'Чуткий корешок',
        variant25: 'Ускользающий дёрг', variant26: 'Дикий ритм рывков', variant27: 'Мощь сока',
        variant28: 'Нервный дёрг внезапно', variant29: 'Каменная кожица', variant30: 'Разросшаяся ботва',
        variant31: 'Дёргающий рывок', variant32: 'Живучая кожица', variant33: 'Неутомимый ритм',
        variant34: 'Дёргающая прыть', variant35: 'Дёргающая выносливость'
    },
    enem5: {
        variant1: 'Пустой удар', variant2: 'Зубчатый вырез', variant3: 'Пустоглавая сила',
        variant4: 'Тыквенная корка', variant5: 'Мотание фонаря', variant6: 'Тыквенная мякоть',
        variant7: 'Пустоглавая мощь', variant8: 'Толстая корка', variant9: 'Непредсказуемое мотание',
        variant10: 'Живучий Пустоглав', variant11: 'Цепкий вырез', variant12: 'Мотание и в грядку',
        variant13: 'Плотная корка', variant14: 'Неутомимый Пустоглав', variant15: 'Пружинистое мотание',
        variant16: 'Меткий вырез', variant17: 'Пустоглавая хватка', variant18: 'Пустой взгляд изнутри',
        variant19: 'Мотание вмиг', variant20: 'Тыквенный дух', variant21: 'Стойкая корка',
        variant22: 'Юркий Пустоглав', variant23: 'Пустоглавая стойкость', variant24: 'Чуткая пустота',
        variant25: 'Ускользающее мотание', variant26: 'Дикое мотание', variant27: 'Мощь мякоти',
        variant28: 'Мотание фонаря внезапно', variant29: 'Каменная корка', variant30: 'Разросшаяся пустота',
        variant31: 'Пустоглавый рывок', variant32: 'Живучая корка', variant33: 'Непредсказуемое мотание вновь',
        variant34: 'Пустоглавая прыть', variant35: 'Пустоглавая выносливость'
    }
};
