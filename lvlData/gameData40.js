let lvlNumber = 40;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 40 — «Владыка омута», ФИНАЛ Области IV «Реки и озёра» (isRegionFinal).
// Картинка сверена напрямую (см. §12): толстобрюхий сомовый дед с усами-тиной и
// вершой на голове, от фазы к фазе набухает водой (растёт объём/давление живота),
// накапливает ссадины без сброса, в 5-й фазе — красные светящиеся глаза и ДРУГАЯ
// стойка, чем в 4-й (разворот корпуса, опора, рука — не повтор), как и требует
// идея-документ. Пять фаз — пять РАЗНЫХ понятий физической эскалации, а не лестница
// интенсивности одного слова (см. §1.1): ВОДЯНОЙ (спокоен, но никогда не добр) →
// РАЗБУХШИЙ (тело набухает) → НАПОРНЫЙ (давление прорывается наружу) → РЕВУЩИЙ
// (рёв сотрясает омут) → РАЗЪЯРЁННЫЙ (истинный берсерк, красные глаза — свежее
// слово, не повторяет финалы 15/25/30/39).
//
// Первая фаза называется голым именем «Водяной», без эпитета (см. §12). Большинство
// обликов — 'wave' (родная стихия Водяного), но НЕ все пять одинаковы: Разбухший
// идёт на 'accelerate' (давление растёт медленно, потом прорывается рывком), Ревущий —
// на 'pause' (набирает воздух для рёва и застывает перед ударом). Финал — «Потоп»:
// волна с нарастающим внутри серии градиентом скорости (не плоская стена — урок
// Царя Гороха/Русалки, см. gameData30.js и gameData39.js) и с нежданчиком сразу
// после кульминации, чтобы расслабляться было нельзя. Боевые тексты — художественные
// боевые выкрики о его состоянии (тело/рёв/ярость/глаза), не пересказ параметров
// движка и не пейзаж омута (см. §12, ловушки 1 и 2).
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.78, damageMultiplier: 2.35, minWaveDelay: 2550, minShotDelay: 132, minTelegraphMs: 502,
	phases: [
		{ phase: 1, minHp: 0.671, cadence: 1.021, speed: 1, damage: 1, telegraphMultiplier: 0.981, surpriseChance: 0.16, maxActiveAttacks: 19 },
		{ phase: 2, minHp: 0.3, cadence: 0.77, speed: 1.18, damage: 1.21, telegraphMultiplier: 0.85, surpriseChance: 0.32, maxActiveAttacks: 23 },
		{ phase: 3, minHp: 0, cadence: 0.61, speed: 1.32, damage: 1.37, telegraphMultiplier: 0.76, surpriseChance: 0.44, maxActiveAttacks: 28 }
	],
	bosses: {
		enem1: { combatIdentity: "Противоток меняет начало", combatTrick: "Медленная левая волна пересекается с активными струями между двумя берегами. Фирменный короткий противоток обходится без приманки и быстро перебрасывает прицел между левым берегом и правой серединой. Поздние связки вставляют внутренний укол в широкий обмен. Нельзя всегда ждать долгого вступления или отбивать угрозы по порядку появления.", signatureEvery: 3, movementStyle: 'wave', cadence: 1.011, telegraphMs: 858, speedMultiplier: 1.055, damageMultiplier: 0.85, speedVariance: [1, 1.005, 1.01, 1.015, 1.02], healthMultiplier: 1.5, appearMessage: "ДОВОЛЬНО УХМЫЛЯЕТСЯ", phaseMessages: {"2":"ЖИВОТ НАЛИВАЕТСЯ СИЛОЙ", "3":"РЫЧИТ ИЗ ГЛУБИНЫ ОМУТА"} },
		enem2: { combatIdentity: "Давление в три толчка", combatTrick: "Ускоряющиеся пузыри собираются в тройной толчок правой середины, обрамлённый левыми сбросами. Одни серии открываются двойным левым толчком, другие заканчиваются двумя левыми ответами. Нельзя уходить после первого правого пузыря или считать первый левый сброс концом давления.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 1.031, telegraphMs: 869, speedMultiplier: 1.041, damageMultiplier: 0.98, speedVariance: [1.02, 1.035, 1.05, 1.065, 1.08], healthMultiplier: 1.5, appearMessage: "РАЗБУХАЕТ ОТ ЯРОСТИ", phaseMessages: {"2":"ДАВЛЕНИЕ РАСТЁТ", "3":"ГОТОВ ЛОПНУТЬ ОТ ЗЛОБЫ"} },
		enem3: { combatIdentity: "Схождение струй с переменой выхода", combatTrick: "Сводит атаки из правой середины к разным левым точкам и снова размыкает течение. Фирменная серия переводит левый ответ от дальнего края к ближней полосе; поздний выход меняется между левым и правым. Последняя связка сначала сдваивает правую середину, затем даёт два разнесённых левых удара и правое замыкание. Нельзя держать прицел в одной левой точке.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.99, telegraphMs: 831, speedMultiplier: 1.14, damageMultiplier: 1.05, speedVariance: [1.02, 1.035, 1.05, 1.065, 1.08], healthMultiplier: 1.5, appearMessage: "ХЛЕЩЕТ ВОДЯНЫМ НАПОРОМ", phaseMessages: {"2":"НАПОР УСИЛИВАЕТСЯ", "3":"ОМУТ КИПИТ ОТ ЯРОСТИ"} },
		enem4: { combatIdentity: "Рёв оставляет отзвук", combatTrick: "Атаки замирают в полёте, затем продолжают движение. Правый разряд перемежается с левыми парами, а поздний рёв повторяет правую пару и оставляет ещё два левых удара. Нельзя считать неподвижную угрозу безопасной или идти бить босса после первого разряда.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.97, telegraphMs: 796, speedMultiplier: 1.091, damageMultiplier: 1.15, speedVariance: [1.02, 1.035, 1.05, 1.065, 1.08], healthMultiplier: 1.5, appearMessage: "РЁВ СОТРЯСАЕТ ОМУТ", phaseMessages: {"2":"РЁВ СТАНОВИТСЯ ГРОМЧЕ", "3":"ЯРОСТЬ РВЁТСЯ НАРУЖУ"} },
		enem5: { combatIdentity: "Потоп прорывает правый берег", combatTrick: "Два удара правой середины запускают левый вал через дальнюю, среднюю и ближнюю точки; медленная левая волна остаётся внутри обмена. Затем поток возвращается вправо. В кульминации девять угроз: правый заход, левый вал и правое смыкание с последним ударом у правого края. Короткая серия не даёт медленного вступления. Нельзя закончить защиту после левого вала или удерживать прицел только в правой середине.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.93, telegraphMs: 741, speedMultiplier: 1.181, damageMultiplier: 0.85, speedVariance: [1.02, 1.035, 1.05, 1.065, 1.08], healthMultiplier: 1.5, appearMessage: "ГЛАЗА ПЫЛАЮТ КРАСНЫМ ОГНЁМ", phaseMessages: {"2":"ПОТОП РВЁТСЯ НАРУЖУ", "3":"ПОТОП!"} }
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Реки и озёра» пройдена!'
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl40/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl40/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl40/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl40/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl40/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 360, xPos: 50, size: '27%',
		deathAnimation: { preset: 'ripplesCollapse', durationMs: 1300 }
	},
	enem2: {
		name: 'enem2', dispName: 'Разбухший Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 510, xPos: 50, size: '28%',
		deathAnimation: { preset: 'bellyBurst', durationMs: 1300 }
	},
	enem3: {
		name: 'enem3', dispName: 'Напорный Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 630, xPos: 50, size: '29%',
		deathAnimation: { preset: 'waterCollapse', durationMs: 1450 }
	},
	enem4: {
		name: 'enem4', dispName: 'Ревущий Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 770, xPos: 50, size: '30%',
		deathAnimation: { preset: 'roarFade', durationMs: 1500 }
	},
	enem5: {
		name: 'enem5', dispName: 'Разъярённый Водяной', image: 'images/enemies/regions/4_rech_ozer/lvl40/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '33%',
		deathAnimation: { preset: 'floodDissolve', durationMs: 1800 }
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
let timeNextBoss = 10;
const bossInterval = 8;

const bossAbilities = [
	// ===== Водяной =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 16.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 18.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 16.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 15.5, waveAmplitude: 5.53, waveFrequency: 1.37, wavePhase: 0.45 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.59, waveFrequency: 1.91, wavePhase: 0.95 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.5, waveAmplitude: 3.47, waveFrequency: 0.83, wavePhase: 0 }, // 41 h

	// ===== Разбухший Водяной =====
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 34 f
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 41 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 29, customHP: 1, customDamage: 33, customSpeed: 5 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 14.25 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 12.25 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.25 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11.25 }, // 48 h

	// ===== Напорный Водяной =====
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 32 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 35 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 36 g
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 37, customHP: 1, customDamage: 40, customSpeed: 5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 41 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 42 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 43 h
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12.5, waveAmplitude: 7.53, waveFrequency: 1.63, wavePhase: 0.45 }, // 44 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13.5, waveAmplitude: 9.59, waveFrequency: 2.09, wavePhase: 0.95 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 14.5, waveAmplitude: 5.47, waveFrequency: 1.05, wavePhase: 0 }, // 46 h

	// ===== Ревущий Водяной =====
	{ boss: 'enem4', type: 'enem44', xPos: 79, yPos: 37, customHP: 1, customDamage: 36, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 37, customHP: 1, customDamage: 36, customSpeed: 5 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 77, yPos: 37, customHP: 1, customDamage: 36, customSpeed: 5 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 37, customHP: 1, customDamage: 36, customSpeed: 5 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 27, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 37, customHP: 1, customDamage: 36, customSpeed: 5 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.5 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 18.5 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.5 }, // 41 h

	// ===== Разъярённый Водяной =====
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 35, customHP: 1, customDamage: 49, customSpeed: 5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 35, customHP: 1, customDamage: 49, customSpeed: 5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 35, customHP: 1, customDamage: 49, customSpeed: 5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 35, customHP: 1, customDamage: 49, customSpeed: 5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 35, customHP: 1, customDamage: 49, customSpeed: 5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 35, customHP: 1, customDamage: 49, customSpeed: 5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 11.59, waveFrequency: 2.27, wavePhase: 0.95 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.47, waveFrequency: 1.27, wavePhase: 0 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 9.53, waveFrequency: 1.89, wavePhase: 0.45 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 35, customHP: 1, customDamage: 49, customSpeed: 5, waveAmplitude: 3.71, waveFrequency: 1.27, wavePhase: 0 }, // 49 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 5.73, waveFrequency: 1.89, wavePhase: 0.45 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.79, waveFrequency: 2.27, wavePhase: 0.95 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13.5, waveAmplitude: 3.71, waveFrequency: 1.27, wavePhase: 0 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 5.73, waveFrequency: 1.89, wavePhase: 0.45 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.79, waveFrequency: 2.27, wavePhase: 0.95 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 3.71, waveFrequency: 1.27, wavePhase: 0 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 14.5, waveAmplitude: 5.73, waveFrequency: 1.89, wavePhase: 0.45 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15.5, waveAmplitude: 7.79, waveFrequency: 2.27, wavePhase: 0.95 }, // 57 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 159, bossDelayAbDop: 8700, firstWaveDelayMs: 2400 }, // Противоток с перебросом
	{ boss: 'enem2', bossDelayAb: 157, bossDelayAbDop: 9400, firstWaveDelayMs: 2400 }, // Давление держит правый берег
	{ boss: 'enem3', bossDelayAb: 158, bossDelayAbDop: 9400, firstWaveDelayMs: 2400 }, // Схождение и размыкание струй
	{ boss: 'enem4', bossDelayAb: 158, bossDelayAbDop: 10700, firstWaveDelayMs: 2400 }, // Рёв с задержанным возвратом
	{ boss: 'enem5', bossDelayAb: 159, bossDelayAbDop: 12800, firstWaveDelayMs: 2400 }, // Потоп в три переката
];

const bossAbilitiesDop = [
	// Водяной
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 300, 300], openingOrder: 0, label: "Правый противоток" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 300, 300, 600], label: "Противоток не закончился" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [600, 0, 300, 300], label: "Обратная срочность" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [600, 0, 600, 200, 0], label: "Дополнительный правый перекат" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [600, 0, 0, 300], label: "Левый противоток" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [200, 200, 600], openingOrder: 1, label: "Противоток: внутренняя струя" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 600, 0, 0, 0], label: "Противоток: укол за волной" },
	{ boss: 'enem1', indexAbilities: [36, 37, 38, 39, 40, 41], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 300, 0, 0], label: "Противоток: перемена русла" },

	// Разбухший Водяной
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 300, 0, 300, 300], openingOrder: 0, label: "Давление прижимает берег" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [600, 300, 0, 0, 300], label: "Накопление перед прорывом" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16], shotGapsMs: [600, 300, 0, 300], label: "Короткий сброс" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [600, 300, 0, 0, 0], label: "Правое давление с возвратом" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [600, 300, 0, 600, 0], label: "Пузырь под напором" },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32, 33, 34], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 300, 300, 300], openingOrder: 1, label: "Давление: три толчка" },
	{ boss: 'enem2', indexAbilities: [35, 36, 37, 38, 39, 40, 41], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 300, 0, 300, 300], label: "Давление: двойной левый сброс" },
	{ boss: 'enem2', indexAbilities: [42, 43, 44, 45, 46, 47, 48], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 600, 0, 300, 300, 0], label: "Давление: последняя струя" },

	// Напорный Водяной
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 600, 300, 300, 0], openingOrder: 0, label: "Струи сходятся" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [300, 300, 300, 0], label: "Короткое схождение" },
	{ boss: 'enem3', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [600, 600, 300, 300, 0], label: "Узкое русло" },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 0, 0, 0, 600], label: "Русло вновь размыкается" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27, 28], shotGapsMs: [0, 300, 600, 0], label: "Смена глубины" },
	{ boss: 'enem3', indexAbilities: [29, 30, 31, 32, 33, 34], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 300, 600, 300, 0], openingOrder: 1, label: "Схождение: от края к середине" },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 300, 300, 600, 0], label: "Схождение: иной выход" },
	{ boss: 'enem3', indexAbilities: [41, 42, 43, 44, 45, 46], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [400, 200, 200, 200, 400], label: "Схождение: обратный сброс" },

	// Ревущий Водяной
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 0, 0, 0, 600], openingOrder: 0, label: "Рёв после вдоха" },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 0, 300, 0], label: "Рёв приходит дважды" },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [0, 0, 0, 300, 300, 600], label: "Задержанный обратный рёв" },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 11, 24], shotGapsMs: [300, 0, 300, 300, 300, 0], label: "Два удара после рёва" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29, 2], shotGapsMs: [300, 0, 0, 300, 0], label: "Рёв меняет очередь" },
	{ boss: 'enem4', indexAbilities: [0, 30, 11, 31, 32, 8], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 0, 300, 300], openingOrder: 1, label: "Рёв: левый ответ" },
	{ boss: 'enem4', indexAbilities: [0, 33, 2, 34, 35, 36, 8], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 300, 300, 300, 0], label: "Рёв: двойной левый ответ" },
	{ boss: 'enem4', indexAbilities: [0, 37, 2, 38, 39, 40, 5, 41], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 0, 300, 300, 300, 0], label: "Рёв: отзвук в середине" },

	// Разъярённый Водяной
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 0, 600, 300, 0, 0], openingOrder: 0, label: "Первый вал потопа" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [300, 300, 300, 300, 300, 0], label: "Встречный вал" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [300, 300, 300, 0, 300, 300], label: "Перевёрнутый вал" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [600, 300, 0, 300, 600, 0], label: "Два русла потопа" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32, 33], shotGapsMs: [0, 0, 0, 300, 300], label: "Потоп без предупреждающего прилива" },
	{ boss: 'enem5', indexAbilities: [34, 35, 36, 37, 38, 39, 40], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 0, 0, 600, 300], openingOrder: 1, label: "Потоп: правый натиск и левый вал" },
	{ boss: 'enem5', indexAbilities: [41, 42, 43, 44, 45, 46, 47, 48], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 300, 300, 300, 300, 0], label: "Потоп: обратный перекат" },
	{ boss: 'enem5', indexAbilities: [49, 50, 51, 52, 53, 54, 55, 56, 57], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 0, 200, 0, 0, 600, 0, 0], label: "Потоп: три русла сходятся" },

];

// Лорные названия связок. Уровень 40 — эскалация одной сущности: Водяной → Разбухший →
// Напорный → Ревущий → Разъярённый (финал области). Стиль имени нарастает от тины
// омута до полного речного гнева, но остаётся одним и тем же хозяином воды на всех стадиях.
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Тинный удар', variant2: 'Илистый шаг', variant3: 'Тинная сила',
        variant4: 'Илистая шкура', variant5: 'Тягучая волна', variant6: 'Болотная ряска',
        variant7: 'Тинная мощь', variant8: 'Плотная илистая шкура', variant9: 'Медленная тягучая волна',
        variant10: 'Живучий Водяной', variant11: 'Цепкий ил', variant12: 'Волна и на самое дно',
        variant13: 'Толстая илистая шкура', variant14: 'Неутомимый Водяной', variant15: 'Ил пружинит',
        variant16: 'Меткий всплеск тины', variant17: 'Тинная хватка', variant18: 'Мутный взгляд',
        variant19: 'Тягучая волна вмиг', variant20: 'Омутный дух', variant21: 'Илистая шкура стойкая',
        variant22: 'Юркий вопреки илу', variant23: 'Тинная стойкость', variant24: 'Чуткий ил',
        variant25: 'Ускользающая тина', variant26: 'Дикая тягучая волна', variant27: 'Мощь ряски',
        variant28: 'Тягучая волна внезапно', variant29: 'Каменная илистая шкура', variant30: 'Тина разрослась',
        variant31: 'Тинный рывок', variant32: 'Живучая илистая шкура', variant33: 'Неутомимая тягучая волна',
        variant34: 'Тинная прыть', variant35: 'Тинная выносливость'
    },
    enem2: {
        variant1: 'Разбухший удар', variant2: 'Раздутый шаг', variant3: 'Разбухшая сила',
        variant4: 'Вздутая шкура', variant5: 'Резкий разгонный рывок', variant6: 'Пузырчатая тина',
        variant7: 'Разбухшая мощь', variant8: 'Плотная вздутая шкура', variant9: 'Ускоряющийся разгонный рывок',
        variant10: 'Живучий Разбухший', variant11: 'Цепкий раздутый захват', variant12: 'Рывок и на самое дно',
        variant13: 'Толстая вздутая шкура', variant14: 'Неутомимый Разбухший', variant15: 'Раздутый захват пружинит',
        variant16: 'Меткий пузырь', variant17: 'Разбухшая хватка', variant18: 'Одутловатый взгляд',
        variant19: 'Разгонный рывок вмиг', variant20: 'Разбухший омутный дух', variant21: 'Вздутая шкура стойкая',
        variant22: 'Юркий вопреки объёму', variant23: 'Разбухшая стойкость', variant24: 'Чуткий раздутый захват',
        variant25: 'Ускользающий разгон', variant26: 'Дикий разгонный рывок', variant27: 'Мощь пузырей',
        variant28: 'Разгонный рывок внезапно', variant29: 'Каменная вздутая шкура', variant30: 'Разбухание разрослось',
        variant31: 'Разбухший рывок', variant32: 'Живучая вздутая шкура', variant33: 'Неутомимый разгонный рывок',
        variant34: 'Разбухшая прыть', variant35: 'Разбухшая выносливость'
    },
    enem3: {
        variant1: 'Напорный удар', variant2: 'Давящий шаг', variant3: 'Напорная сила',
        variant4: 'Плотная водяная шкура', variant5: 'Мощная волна давления', variant6: 'Речной ил под напором',
        variant7: 'Напорная мощь', variant8: 'Плотнейшая водяная шкура', variant9: 'Тугая волна давления',
        variant10: 'Живучий Напорный', variant11: 'Цепкий водяной захват', variant12: 'Давление и на самое дно',
        variant13: 'Толстая водяная шкура', variant14: 'Неутомимый Напорный', variant15: 'Водяной захват пружинит',
        variant16: 'Меткий поток', variant17: 'Напорная хватка', variant18: 'Давящий взгляд',
        variant19: 'Волна давления вмиг', variant20: 'Напорный речной дух', variant21: 'Водяная шкура стойкая',
        variant22: 'Юркий вопреки напору', variant23: 'Напорная стойкость', variant24: 'Чуткий водяной захват',
        variant25: 'Ускользающий поток', variant26: 'Дикая волна давления', variant27: 'Мощь речного ила',
        variant28: 'Волна давления внезапно', variant29: 'Каменная водяная шкура', variant30: 'Напор разросся',
        variant31: 'Напорный рывок', variant32: 'Живучая водяная шкура', variant33: 'Неутомимая волна давления',
        variant34: 'Напорная прыть', variant35: 'Напорная выносливость'
    },
    enem4: {
        variant1: 'Ревущий удар', variant2: 'Грозный застой', variant3: 'Ревущая сила',
        variant4: 'Бурлящая шкура', variant5: 'Пауза и потоп', variant6: 'Штормовая муть',
        variant7: 'Ревущая мощь', variant8: 'Плотная бурлящая шкура', variant9: 'Долгая пауза перед потопом',
        variant10: 'Живучий Ревущий', variant11: 'Цепкий бурлящий захват', variant12: 'Потоп и на самое дно',
        variant13: 'Толстая бурлящая шкура', variant14: 'Неутомимый Ревущий', variant15: 'Бурлящий захват пружинит',
        variant16: 'Меткий рёв', variant17: 'Ревущая хватка', variant18: 'Штормовой взгляд',
        variant19: 'Пауза и потоп мгновенно', variant20: 'Ревущий речной дух', variant21: 'Бурлящая шкура стойкая',
        variant22: 'Юркий вопреки рёву', variant23: 'Ревущая стойкость', variant24: 'Чуткий бурлящий захват',
        variant25: 'Ускользающая пауза', variant26: 'Дикий потоп из паузы', variant27: 'Мощь штормовой мути',
        variant28: 'Потоп внезапно', variant29: 'Каменная бурлящая шкура', variant30: 'Рёв разросся',
        variant31: 'Ревущий рывок', variant32: 'Живучая бурлящая шкура', variant33: 'Неутомимая пауза перед потопом',
        variant34: 'Ревущая прыть', variant35: 'Ревущая выносливость'
    },
    enem5: {
        variant1: 'Разъярённый удар', variant2: 'Хозяйский шаг', variant3: 'Разъярённая сила',
        variant4: 'Изумрудная чешуйчатая шкура', variant5: 'Полный потоп', variant6: 'Гневная речная муть',
        variant7: 'Разъярённая мощь', variant8: 'Плотная чешуйчатая шкура', variant9: 'Нарастающий полный потоп',
        variant10: 'Живучий Разъярённый', variant11: 'Цепкая хозяйская хватка', variant12: 'Потоп и в бездну навсегда',
        variant13: 'Толстая чешуйчатая шкура', variant14: 'Неутомимый Разъярённый', variant15: 'Хозяйская хватка пружинит',
        variant16: 'Меткий гнев', variant17: 'Разъярённая хватка', variant18: 'Хозяйский взгляд реки',
        variant19: 'Полный потоп вмиг', variant20: 'Разъярённый речной дух', variant21: 'Чешуйчатая шкура стойкая',
        variant22: 'Юркий вопреки ярости', variant23: 'Разъярённая стойкость', variant24: 'Чуткая хозяйская хватка',
        variant25: 'Ускользающая ярость', variant26: 'Дикий полный потоп', variant27: 'Мощь гневной мути',
        variant28: 'Полный потоп внезапно', variant29: 'Каменная чешуйчатая шкура', variant30: 'Ярость разрослась',
        variant31: 'Разъярённый рывок', variant32: 'Живучая чешуйчатая шкура', variant33: 'Неутомимый полный потоп',
        variant34: 'Разъярённая прыть', variant35: 'Разъярённая выносливость'
    }
};
