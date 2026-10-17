let lvlNumber = 39;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 39 — «Исполнение желаний», предфинальный уровень Области IV «Реки и озёра»
// (финал области — 40-й, Водяной). Это не пять разных боссов, а одна Русалка —
// Щучья ведьма — в пяти нарастающих обликах (тот же приём, что Баба-яга/Полудница/
// Царь Горох), НЕ регион-финал сама по себе (isRegionFinal не ставится, x10-бонус
// не положен), но по прямому требованию должна быть по-настоящему сложным,
// небанальным боем — не рядовым уровнем с одним боссом вместо пяти.
//
// Картинка сверена напрямую (см. §12): одна голова, две руки, один цельный длинный
// щучий хвост без самопересечений и петель ни в одной из 5 фаз — длина хвоста
// постоянна, меняются изгиб/сжатие/направление удара; ссадины, порванная одежда
// и шипы на хвосте нарастают от фазы к фазе. Пять обликов — пять РАЗНЫХ понятий
// сказочного мотива «исполнения желаний», а не лестница «злее предыдущей» (см. §1.1):
// ЗАЗЫВ → ОБЕЩАНИЕ → ОБМАН → ПРОКЛЯТИЕ → ИСТИННЫЙ ЛИК.
//
// Большая часть обликов — 'wave' (хвост русалки создан для этого архетипа), но
// НЕ пять одинаковых волн: Зазывная качает широко и медленно, Сулящая — короче и
// быстрее, Обманная переключается на 'weave' (зигзаг как символ двуличия),
// Проклятая — 'pause' (проклятие буквально замораживает её на миг), Щучья Ведьма —
// снова 'wave', но с НАРАСТАЮЩИМ градиентом скорости внутри одной серии (не единая
// плоская стена — урок с Царём Горохом, см. gameData30.js) и с нежданчиком сразу
// после кульминационной серии, чтобы расслабляться было нельзя.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.8, damageMultiplier: 2.3, minWaveDelay: 2451, minShotDelay: 134, minTelegraphMs: 505,
	phases: [
		{ phase: 1, minHp: 0.669, cadence: 0.981, speed: 0.983, damage: 1, telegraphMultiplier: 1.019, surpriseChance: 0.166, maxActiveAttacks: 18 },
		{ phase: 2, minHp: 0.319, cadence: 0.78, speed: 1.17, damage: 1.2, telegraphMultiplier: 0.86, surpriseChance: 0.31, maxActiveAttacks: 22 },
		{ phase: 3, minHp: 0, cadence: 0.62, speed: 1.31, damage: 1.36, telegraphMultiplier: 0.77, surpriseChance: 0.43, maxActiveAttacks: 27 }
	],
	bosses: {
		enem1: { combatIdentity: "Парный зов с уколом из омута", combatTrick: "Показывает парные гребки у двух берегов, но медленная правая волна вклинивается между левыми ударами. В фирменном зове добавляет укол правой середины перед правой парой; поздние связки возвращают прицел на уже покинутый берег. Нельзя ни отбивать по появлению, ни автоматически уходить после первого гребка.", signatureEvery: 3, movementStyle: 'wave', cadence: 1.016, telegraphMs: 921, speedMultiplier: 1.1, damageMultiplier: 0.85, speedVariance: [1, 1.01, 1.02, 1.03, 1.04], healthMultiplier: 1.5, appearMessage: "ПОДНИМАЕТ ВОЛНЫ" },
		enem2: { combatIdentity: "Обещание с лишним укусом", combatTrick: "После выхода в правую середину заставляет вернуться на левый берег дважды, а затем трижды. Один вариант заканчивает левую группу, другой дописывает правый ответ. Медленная правая волна остаётся внутри обмена: нельзя считать первый возврат завершением серии.", signatureEvery: 3, movementStyle: 'wave', cadence: 1.04, telegraphMs: 861, speedMultiplier: 1.08, damageMultiplier: 0.95, speedVariance: [1.06, 1.075, 1.09, 1.105, 1.12], healthMultiplier: 1.5, appearMessage: "СКАЛИТ ЗУБЫ" },
		enem3: { combatIdentity: "Отражение множит ответ", combatTrick: "Сдваивает правые отражения и левые когти, качая атаки поперёк курса. Сначала правых отражений два, затем три; в последнем рисунке очередное правое отражение обгоняет левую пару и требует задержаться справа перед двумя левыми группами. Нельзя переносить прицел по числу появившихся угроз.", signatureEvery: 3, movementStyle: 'weave', cadence: 1.06, telegraphMs: 821, speedMultiplier: 1.12, damageMultiplier: 1.05, speedVariance: [1, 1.02, 1.04, 1.06, 1.08], healthMultiplier: 1.5, appearMessage: "ВЗБЕСИЛАСЬ!" },
		enem4: { combatIdentity: "Узлы замершего хвоста", combatTrick: "Атаки останавливаются в полёте, затем продолжают движение. Между левыми возвратами повторяет пары ударов правой середины; поздние узлы меняют окончание и добавляют ещё один левый ответ. Нельзя считать зависшую атаку исчезнувшей или начинать бить босса после первой пары.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.98, telegraphMs: 790, speedMultiplier: 1.099, damageMultiplier: 1.12, speedVariance: [1, 1.02, 1.04, 1.06, 1.08], healthMultiplier: 1.5, appearMessage: "ГЛАЗА ГОРЯТ ПРОКЛЯТЬЕМ" },
		enem5: { combatIdentity: "Две челюсти омута", combatTrick: "Три левых зуба нарастают по скорости, за ними смыкаются два удара правой середины и возвращается левый укус. Короткий вариант обходится без медленного вступления. В кульминации восемь угроз: левая тройка, правая пара, медленный левый обман и ещё два левых удара; нельзя заканчивать защиту после правого смыкания.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.94, telegraphMs: 750, speedMultiplier: 1.202, damageMultiplier: 0.85, speedVariance: [1.05, 1.06, 1.07, 1.08, 1.09], healthMultiplier: 1.5, appearMessage: "ХВОСТ ХЛЕЩЕТ БЕЗ ПОЩАДЫ" }
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/4_rech_ozer/lvl39/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/4_rech_ozer/lvl39/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/4_rech_ozer/lvl39/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/4_rech_ozer/lvl39/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/4_rech_ozer/lvl39/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Русалка', image: 'images/enemies/regions/4_rech_ozer/lvl39/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 340, xPos: 50, size: '26%',
		deathAnimation: { preset: 'ripplesDissolve', durationMs: 1250 }
	},
	enem2: {
		name: 'enem2', dispName: 'Скалящаяся Русалка', image: 'images/enemies/regions/4_rech_ozer/lvl39/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 480, xPos: 50, size: '26%',
		deathAnimation: { preset: 'tailCoilFade', durationMs: 1250 }
	},
	enem3: {
		name: 'enem3', dispName: 'Бешеная Русалка', image: 'images/enemies/regions/4_rech_ozer/lvl39/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 600, xPos: 50, size: '27%',
		deathAnimation: { preset: 'clawSlash', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Проклятая Русалка', image: 'images/enemies/regions/4_rech_ozer/lvl39/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 740, xPos: 50, size: '28%',
		deathAnimation: { preset: 'curseShatter', durationMs: 1450 }
	},
	enem5: {
		name: 'enem5', dispName: 'Щучья Ведьма', image: 'images/enemies/regions/4_rech_ozer/lvl39/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '31%',
		deathAnimation: { preset: 'scaleWitherSink', durationMs: 1700 }
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
let timeNextBoss = 9;
const bossInterval = 7;

const bossAbilities = [
	// ===== Русалка =====
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 4.13, waveFrequency: 0.71, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 0.71, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 0.71, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.13, waveFrequency: 1.13, wavePhase: 0 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 1.13, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 8.19, waveFrequency: 0.71, wavePhase: 0.9 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 4.13, waveFrequency: 1.13, wavePhase: 0 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 6.17, waveFrequency: 1.13, wavePhase: 0.4 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.13, wavePhase: 0.9 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 4.13, waveFrequency: 1.61, wavePhase: 0 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 6.17, waveFrequency: 1.13, wavePhase: 0.4 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.13, wavePhase: 0.9 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 4.13, waveFrequency: 1.61, wavePhase: 0 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 1.61, wavePhase: 0.4 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.61, wavePhase: 0.9 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 4.13, waveFrequency: 1.61, wavePhase: 0 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 1.61, wavePhase: 0.4 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.61, wavePhase: 0.9 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 4.13, waveFrequency: 0.71, wavePhase: 0 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 6.17, waveFrequency: 0.71, wavePhase: 0.4 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 8.19, waveFrequency: 1.61, wavePhase: 0.9 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.13, waveFrequency: 0.71, wavePhase: 0 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 0.71, wavePhase: 0.4 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 0.71, wavePhase: 0.9 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 4.13, waveFrequency: 1.13, wavePhase: 0 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 4.13, waveFrequency: 0.71, wavePhase: 0 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 1.13, wavePhase: 0.4 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.61, wavePhase: 0.9 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 4.13, waveFrequency: 0.71, wavePhase: 0 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 1.13, wavePhase: 0.4 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.61, wavePhase: 0.9 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 4.13, waveFrequency: 1.13, wavePhase: 0 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 6.17, waveFrequency: 1.13, wavePhase: 0.4 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.19, waveFrequency: 1.13, wavePhase: 0.9 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.13, waveFrequency: 1.61, wavePhase: 0 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 1.61, wavePhase: 0.4 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.61, wavePhase: 0.9 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 39, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 4.13, waveFrequency: 0.71, wavePhase: 0 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 6.17, waveFrequency: 0.71, wavePhase: 0.4 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 8.19, waveFrequency: 0.71, wavePhase: 0.9 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 4.13, waveFrequency: 1.13, wavePhase: 0 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 11, waveAmplitude: 6.17, waveFrequency: 1.13, wavePhase: 0.4 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 8.19, waveFrequency: 1.13, wavePhase: 0.9 }, // 42 h

	// ===== Скалящаяся Русалка =====
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.17, waveFrequency: 0.9, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 9.19, waveFrequency: 0.9, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 1.36, wavePhase: 0 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 9.19, waveFrequency: 0.9, wavePhase: 0.9 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 1.36, wavePhase: 0 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 9.19, waveFrequency: 1.36, wavePhase: 0.9 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 1.78, wavePhase: 0 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.17, waveFrequency: 1.78, wavePhase: 0.4 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 9.19, waveFrequency: 1.78, wavePhase: 0.9 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 7.17, waveFrequency: 0.9, wavePhase: 0.4 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.19, waveFrequency: 0.9, wavePhase: 0.9 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.13, waveFrequency: 1.36, wavePhase: 0 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 9.19, waveFrequency: 1.36, wavePhase: 0.9 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 1.78, wavePhase: 0 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 7.17, waveFrequency: 1.78, wavePhase: 0.4 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 9.19, waveFrequency: 1.78, wavePhase: 0.9 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.19, waveFrequency: 1.78, wavePhase: 0.9 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.19, waveFrequency: 1.78, wavePhase: 0.9 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 9.19, waveFrequency: 1.36, wavePhase: 0.9 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 5.13, waveFrequency: 1.78, wavePhase: 0 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 7.17, waveFrequency: 1.78, wavePhase: 0.4 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 9.19, waveFrequency: 1.78, wavePhase: 0.9 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 9.19, waveFrequency: 1.36, wavePhase: 0 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0.4 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 7.17, waveFrequency: 1.78, wavePhase: 0.9 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.19, waveFrequency: 1.36, wavePhase: 0 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0.4 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 7.17, waveFrequency: 1.78, wavePhase: 0.9 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 40, customHP: 1, customDamage: 32, customSpeed: 5, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15, waveAmplitude: 9.19, waveFrequency: 1.78, wavePhase: 0.9 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 12, waveAmplitude: 7.17, waveFrequency: 1.36, wavePhase: 0.4 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 9.19, waveFrequency: 1.78, wavePhase: 0.9 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 13, waveAmplitude: 5.13, waveFrequency: 0.9, wavePhase: 0 }, // 46 h

	// ===== Бешеная Русалка =====
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 15.25 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 15.25 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 15.25 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 32 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: 24, customSpeed: 14.25 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 38, customHP: 1, customDamage: 40, customSpeed: 5 }, // 44 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 24, customSpeed: 15.25 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: 24, customSpeed: 15.25 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 12.25 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 24, customSpeed: 13.25 }, // 51 h

	// ===== Проклятая Русалка =====
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 16.25 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 96, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 16.25 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 81, yPos: 37, customHP: 1, customDamage: 35, customSpeed: 5 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 18.25 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: 17, customSpeed: 17.25 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: 17, customSpeed: 15.25 }, // 50 h

	// ===== Щучья Ведьма =====
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 35, customHP: 1, customDamage: 48, customSpeed: 5, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 35, customHP: 1, customDamage: 48, customSpeed: 5, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 35, customHP: 1, customDamage: 48, customSpeed: 5, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 35, customHP: 1, customDamage: 48, customSpeed: 5, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 35, customHP: 1, customDamage: 48, customSpeed: 5, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 32 f
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 35, customHP: 1, customDamage: 48, customSpeed: 5, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 39 g
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 35, customHP: 1, customDamage: 48, customSpeed: 5, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 47 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 13.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 48 h
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 49 h
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 8.37, waveFrequency: 2.29, wavePhase: 0.9 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 15.25, waveAmplitude: 4.31, waveFrequency: 1.47, wavePhase: 0 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: 28, customSpeed: 14.25, waveAmplitude: 6.33, waveFrequency: 2.05, wavePhase: 0.4 }, // 54 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 161, bossDelayAbDop: 8601, firstWaveDelayMs: 2400 }, // Два манящих гребка
	{ boss: 'enem2', bossDelayAb: 158, bossDelayAbDop: 8600, firstWaveDelayMs: 2400 }, // Обещанный выход закрыт
	{ boss: 'enem3', bossDelayAb: 159, bossDelayAbDop: 9000, firstWaveDelayMs: 2400 }, // Отражение раздваивает ответ
	{ boss: 'enem4', bossDelayAb: 159, bossDelayAbDop: 10000, firstWaveDelayMs: 2400 }, // Проклятие задерживает расплату
	{ boss: 'enem5', bossDelayAb: 160, bossDelayAbDop: 11200, firstWaveDelayMs: 2400 }, // Две челюсти омута
];

const bossAbilitiesDop = [
	// Русалка
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 600, 300, 0], openingOrder: 0, label: "Левый зов в два гребка" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 600], label: "Правый зов в два гребка" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [300, 600, 0, 600], label: "Перевёрнутый гребок" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [300, 0, 300, 600], label: "Задержись у правого берега" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [0, 0, 600, 600], label: "Задержись у левого берега" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29, 30], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 600, 600, 0, 0], openingOrder: 1, label: "Зазыв: два гребка и перенос" },
	{ boss: 'enem1', indexAbilities: [31, 32, 33, 34, 35, 36], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 300, 0, 0], label: "Зазыв: ответ после переноса" },
	{ boss: 'enem1', indexAbilities: [37, 38, 39, 40, 41, 42], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 0, 0, 0], label: "Зазыв: обратный ответ" },

	// Скалящаяся Русалка
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 0, 0], openingOrder: 0, label: "Обещание: возврат кусается дважды" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [300, 600, 0, 0, 300], label: "Обещание с правой припиской" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [0, 600, 300, 300, 300], label: "Ложный выход" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21], shotGapsMs: [600, 300, 0, 0], label: "Незаконченный договор" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [0, 200, 400, 200, 200], label: "Обещание начинается справа" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32, 33], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 0, 300, 0, 600], openingOrder: 1, label: "Обещание: двойная расплата" },
	{ boss: 'enem2', indexAbilities: [34, 35, 36, 37, 38, 39], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 400, 0, 0, 0], label: "Обещание: ещё один возврат" },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 0, 0, 300, 0, 600], label: "Обещание: последняя приписка" },

	// Бешеная Русалка
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 600, 300, 300, 300], openingOrder: 0, label: "Два отражения и два когтя" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [600, 300, 0, 300, 0], label: "Отражение меняет начало" },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [600, 300, 0, 600, 300], label: "Разбитое отражение" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22, 23, 24], shotGapsMs: [600, 300, 300, 300, 300, 0], label: "Ложный последний отблеск" },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28, 29, 30], shotGapsMs: [300, 0, 0, 600, 300], label: "Коготь за отражением" },
	{ boss: 'enem3', indexAbilities: [31, 32, 33, 34, 35, 36], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300, 300, 300, 300], openingOrder: 1, label: "Обман: сдвоенное отражение" },
	{ boss: 'enem3', indexAbilities: [37, 38, 39, 40, 41, 42, 43], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 0, 300, 300, 300, 300], label: "Обман: возвращающийся коготь" },
	{ boss: 'enem3', indexAbilities: [44, 45, 46, 47, 48, 49, 50, 51], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 300, 300, 0, 0, 0, 300], label: "Обман: две стороны осколка" },

	// Проклятая Русалка
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 600, 600], openingOrder: 0, label: "Замерший хвост: два узла" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [300, 0, 300, 600, 0], label: "Узел держит левый берег" },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [600, 0, 0, 600, 600], label: "Смена стороны проклятия" },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [600, 0, 600, 600, 0], label: "Два проклятых следа" },
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [0, 300, 300, 300, 300], label: "Проклятие приходит справа" },
	{ boss: 'enem4', indexAbilities: [29, 30, 31, 32, 33, 34, 35], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 600, 0, 0, 300, 0], openingOrder: 1, label: "Проклятие: двойной узел" },
	{ boss: 'enem4', indexAbilities: [36, 37, 38, 39, 40, 41, 42], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 300, 300, 0, 0, 300], label: "Проклятие: хвост возвращается" },
	{ boss: 'enem4', indexAbilities: [43, 44, 45, 46, 47, 48, 49, 50], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 600, 0, 0, 0, 0, 300], label: "Проклятие: третий узел" },

	// Щучья Ведьма
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 600, 0, 300, 300], openingOrder: 0, label: "Щучья пасть раскрывается" },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 600, 0, 300, 0], label: "Три зуба и две чешуи" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [600, 600, 0, 300, 300, 0], label: "Обратная челюсть" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [0, 0, 0, 300, 0, 600], label: "Пасть не закрылась" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31], shotGapsMs: [400, 0, 0, 0, 0], label: "Зуб за краем пасти" },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37, 38], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 0, 0, 300, 300], openingOrder: 1, label: "Истинный лик: первый укус" },
	{ boss: 'enem5', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 46], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 300, 0, 0, 0, 300], label: "Истинный лик: встречный укус" },
	{ boss: 'enem5', indexAbilities: [47, 48, 49, 50, 51, 52, 53, 54], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 0, 0, 300, 300, 0], label: "Омут смыкает обе челюсти" },

];

// Лорные названия связок. Уровень 39 — эскалация одной сущности: Русалка → Скалящаяся →
// Бешеная → Проклятая → Щучья Ведьма (финал). Стиль имени нарастает от чарующего
// омута к настоящему колдовству, но остаётся одной и той же героиней на всех стадиях.
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Русалочий удар', variant2: 'Плавный гребок', variant3: 'Русалочья сила',
        variant4: 'Чешуйчатый хвост', variant5: 'Манящая волна', variant6: 'Речная дымка',
        variant7: 'Русалочья мощь', variant8: 'Плотная чешуя хвоста', variant9: 'Тихая манящая волна',
        variant10: 'Живучая Русалка', variant11: 'Цепкий гребок', variant12: 'Волна и на глубину',
        variant13: 'Толстая чешуя', variant14: 'Неутомимая Русалка', variant15: 'Гребок пружинит',
        variant16: 'Меткий всплеск', variant17: 'Русалочья хватка', variant18: 'Манящий взгляд',
        variant19: 'Манящая волна вмиг', variant20: 'Речной дух', variant21: 'Чешуя стойкая',
        variant22: 'Юркая Русалка', variant23: 'Русалочья стойкость', variant24: 'Чуткий гребок',
        variant25: 'Ускользающая манящая волна', variant26: 'Дикий речной всплеск', variant27: 'Мощь дымки',
        variant28: 'Манящая волна внезапно', variant29: 'Каменная чешуя', variant30: 'Хвост разросся',
        variant31: 'Русалочий рывок', variant32: 'Живучая чешуя', variant33: 'Неутомимая манящая волна',
        variant34: 'Русалочья прыть', variant35: 'Русалочья выносливость'
    },
    enem2: {
        variant1: 'Оскаленный удар', variant2: 'Насмешливый гребок', variant3: 'Оскаленная сила',
        variant4: 'Острая чешуя', variant5: 'Издевательская волна', variant6: 'Ядовитая дымка',
        variant7: 'Оскаленная мощь', variant8: 'Плотная острая чешуя', variant9: 'Тихая издевательская волна',
        variant10: 'Живучая Скалящаяся', variant11: 'Цепкий насмешливый гребок', variant12: 'Волна с ухмылкой в глубину',
        variant13: 'Толстая острая чешуя', variant14: 'Неутомимая Скалящаяся', variant15: 'Насмешливый гребок пружинит',
        variant16: 'Меткий острый зуб', variant17: 'Оскаленная хватка', variant18: 'Издевательский взгляд',
        variant19: 'Издевательская волна вмиг', variant20: 'Насмешливый речной дух', variant21: 'Острая чешуя стойкая',
        variant22: 'Юркая Скалящаяся', variant23: 'Оскаленная стойкость', variant24: 'Чуткая ухмылка',
        variant25: 'Ускользающая насмешка', variant26: 'Дикая издевательская волна', variant27: 'Мощь яда',
        variant28: 'Издевательская волна внезапно', variant29: 'Каменная острая чешуя', variant30: 'Оскал разросся',
        variant31: 'Оскаленный рывок', variant32: 'Живучая острая чешуя', variant33: 'Неутомимая издевательская волна',
        variant34: 'Оскаленная прыть', variant35: 'Оскаленная выносливость'
    },
    enem3: {
        variant1: 'Бешеный удар', variant2: 'Рваный гребок', variant3: 'Бешеная сила',
        variant4: 'Взъерошенная чешуя', variant5: 'Хаотичный виток', variant6: 'Кровавая пена',
        variant7: 'Бешеная мощь', variant8: 'Плотная взъерошенная чешуя', variant9: 'Резкий хаотичный виток',
        variant10: 'Живучая Бешеная', variant11: 'Цепкий рваный гребок', variant12: 'Виток и в водоворот',
        variant13: 'Толстая взъерошенная чешуя', variant14: 'Неутомимая Бешеная', variant15: 'Рваный гребок пружинит',
        variant16: 'Меткий вихрь', variant17: 'Бешеная хватка', variant18: 'Безумный взгляд',
        variant19: 'Хаотичный виток вмиг', variant20: 'Яростный речной дух', variant21: 'Чешуя дыбом стойкая',
        variant22: 'Юркая Бешеная', variant23: 'Бешеная стойкость', variant24: 'Чуткий рваный гребок',
        variant25: 'Ускользающий вихрь', variant26: 'Дикий хаотичный виток', variant27: 'Мощь пены',
        variant28: 'Хаотичный виток внезапно', variant29: 'Каменная взъерошенная чешуя', variant30: 'Ярость разрослась',
        variant31: 'Бешеный рывок', variant32: 'Живучая взъерошенная чешуя', variant33: 'Неутомимый хаотичный виток',
        variant34: 'Бешеная прыть', variant35: 'Бешеная выносливость'
    },
    enem4: {
        variant1: 'Проклятый удар', variant2: 'Тихая засада', variant3: 'Проклятая сила',
        variant4: 'Тёмная чешуя', variant5: 'Пауза и рывок из тьмы', variant6: 'Могильная сырость',
        variant7: 'Проклятая мощь', variant8: 'Плотная тёмная чешуя', variant9: 'Долгая пауза перед рывком',
        variant10: 'Живучая Проклятая', variant11: 'Цепкий коготь из тьмы', variant12: 'Рывок и в омут забвения',
        variant13: 'Толстая тёмная чешуя', variant14: 'Неутомимая Проклятая', variant15: 'Коготь из тьмы пружинит',
        variant16: 'Меткое проклятие', variant17: 'Проклятая хватка', variant18: 'Мертвенный взгляд',
        variant19: 'Пауза и рывок мгновенно', variant20: 'Могильный речной дух', variant21: 'Тёмная чешуя стойкая',
        variant22: 'Юркая Проклятая', variant23: 'Проклятая стойкость', variant24: 'Чуткая тьма',
        variant25: 'Ускользающая пауза', variant26: 'Дикий рывок из тьмы', variant27: 'Мощь сырости',
        variant28: 'Рывок из тьмы внезапно', variant29: 'Каменная тёмная чешуя', variant30: 'Проклятие разрослось',
        variant31: 'Проклятый рывок', variant32: 'Живучая тёмная чешуя', variant33: 'Неутомимая пауза перед рывком',
        variant34: 'Проклятая прыть', variant35: 'Проклятая выносливость'
    },
    enem5: {
        variant1: 'Щучий удар', variant2: 'Ведьмин гребок', variant3: 'Щучья сила',
        variant4: 'Костяная чешуя', variant5: 'Хлёст хвоста', variant6: 'Колдовская муть',
        variant7: 'Щучья мощь', variant8: 'Плотная костяная чешуя', variant9: 'Резкий хлёст хвоста',
        variant10: 'Живучая Щучья Ведьма', variant11: 'Цепкий клык', variant12: 'Хлёст и в омут навсегда',
        variant13: 'Толстая костяная чешуя', variant14: 'Неутомимая Щучья Ведьма', variant15: 'Клык пружинит',
        variant16: 'Меткий щучий клык', variant17: 'Щучья хватка', variant18: 'Колдовской взгляд',
        variant19: 'Хлёст хвоста вмиг', variant20: 'Ведьмин речной дух', variant21: 'Костяная чешуя стойкая',
        variant22: 'Юркая вопреки древности', variant23: 'Щучья стойкость', variant24: 'Чуткий клык',
        variant25: 'Ускользающая ведьма', variant26: 'Дикий хлёст хвоста', variant27: 'Мощь колдовства',
        variant28: 'Хлёст хвоста внезапно', variant29: 'Каменная костяная чешуя', variant30: 'Колдовство разрослось',
        variant31: 'Щучий рывок', variant32: 'Живучая костяная чешуя', variant33: 'Неутомимый хлёст хвоста',
        variant34: 'Щучья прыть', variant35: 'Щучья выносливость'
    }
};
