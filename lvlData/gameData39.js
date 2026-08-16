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
	levelCadence: 0.80, damageMultiplier: 2.30, minWaveDelay: 1950, minShotDelay: 134, minTelegraphMs: 505,
	musicMood: 'cunning',
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.16, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.30, cadence: 0.78, speed: 1.17, damage: 1.20, telegraphMultiplier: 0.86, surpriseChance: 0.31, maxActiveAttacks: 20 },
		{ phase: 3, minHp: 0.00, cadence: 0.62, speed: 1.31, damage: 1.36, telegraphMultiplier: 0.77, surpriseChance: 0.43, maxActiveAttacks: 25 }
	],
	bosses: {
		enem1: {
			movementStyle: 'wave', cadence: 0.95, telegraphMs: 900, speedMultiplier: 0.92, damageMultiplier: 0.85,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20],
			appearMessage: 'ПОДНИМАЕТ ВОЛНЫ'
		}, // ЗАЗЫВНАЯ РУСАЛКА: широкая медленная манящая волна, самый честный телеграф уровня
		enem2: {
			movementStyle: 'wave', cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.00, damageMultiplier: 0.95,
			speedVariance: [0.85, 0.95, 1.05, 1.15, 1.25],
			appearMessage: 'СКАЛИТ ЗУБЫ'
		}, // СУЛЯЩАЯ РУСАЛКА: волна короче и быстрее, ложная щедрость
		enem3: {
			movementStyle: 'weave', cadence: 1.10, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 1.05,
			speedVariance: [0.83, 0.94, 1.05, 1.16, 1.27],
			appearMessage: 'ВЗБЕСИЛАСЬ ОТ ОБМАНА'
		}, // ОБМАННАЯ РУСАЛКА: zигзаг вместо волны — символ двуличия, честная смена архетипа
		enem4: {
			movementStyle: 'pause', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.08, damageMultiplier: 1.12,
			speedVariance: [0.82, 0.94, 1.07, 1.20, 1.33], minFastSideSwitchMs: 800,
			appearMessage: 'ГЛАЗА ГОРЯТ ПРОКЛЯТЬЕМ'
		}, // ПРОКЛЯТАЯ РУСАЛКА: проклятие буквально замораживает её на миг перед рывком
		enem5: {
			movementStyle: 'wave', cadence: 0.80, telegraphMs: 680, speedMultiplier: 1.15, damageMultiplier: 0.85,
			healthMultiplier: 1.15,
			speedVariance: [0.85, 0.99, 1.13, 1.27, 1.41],
			appearMessage: 'ХВОСТ ХЛЕЩЕТ БЕЗ ПОЩАДЫ'
		} // ЩУЧЬЯ ВЕДЬМА: истинный лик, катящийся хлёст хвоста с нарастающей скоростью
		  // внутри серии + нежданчик сразу после кульминации — не единая плоская стена
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
		name: 'enem2', dispName: 'Сулящая Русалка', image: 'images/enemies/regions/4_rech_ozer/lvl39/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 480, xPos: 50, size: '26%',
		deathAnimation: { preset: 'tailCoilFade', durationMs: 1250 }
	},
	enem3: {
		name: 'enem3', dispName: 'Обманная Русалка', image: 'images/enemies/regions/4_rech_ozer/lvl39/3.webp',
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
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	// ===== Зазывная Русалка: 'wave', широкая медленная манящая волна =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 9,  waveFrequency: 0.6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 37, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6,  waveAmplitude: 10, waveFrequency: 0.5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8,  waveAmplitude: 7,  waveFrequency: 0.8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 27, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 0.7 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 11, waveFrequency: 0.4 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 13, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14, waveAmplitude: 12, waveFrequency: 0.4 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 18, waveAmplitude: 6,  waveFrequency: 1.1 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 19, waveAmplitude: 7,  waveFrequency: 1.0 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 7,  waveFrequency: 0.9 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 12, waveAmplitude: 8,  waveFrequency: 0.8 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4,  waveAmplitude: 13, waveFrequency: 0.35 }, //12 самая широкая манящая волна, честный долгий телеграф
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 15, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 7,  waveFrequency: 1.0 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13, waveAmplitude: 8,  waveFrequency: 0.9 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20, waveAmplitude: 6,  waveFrequency: 1.2 }   //15 нежданчик: первый намёк, что зов манит не к добру

	,
	// ===== Сулящая Русалка: 'wave', волна короче и быстрее — ложная щедрость =====
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 30, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9,  waveAmplitude: 7,  waveFrequency: 1.3 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 29, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10, waveAmplitude: 8,  waveFrequency: 1.2 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13, waveAmplitude: 5,  waveFrequency: 1.7 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 19, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14, waveAmplitude: 6,  waveFrequency: 1.6 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18, waveAmplitude: 9,  waveFrequency: 1.0 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19, waveAmplitude: 10, waveFrequency: 0.9 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23, waveAmplitude: 5,  waveFrequency: 2.0 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24, waveAmplitude: 6,  waveFrequency: 1.9 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 5,  waveFrequency: 0.8 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 6,  waveAmplitude: 5,  waveFrequency: 0.9 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 33, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 7,  waveFrequency: 1.4 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11, waveAmplitude: 8,  waveFrequency: 1.3 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 0.7 },  //12 «щедрый» медленный дар в центре — обманчиво честный
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16, waveAmplitude: 9,  waveFrequency: 1.5 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 16, waveAmplitude: 8,  waveFrequency: 1.6 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25, waveAmplitude: 6,  waveFrequency: 2.1 }   //15 нежданчик: обещание срывается в резкий укол

	,
	// ===== Обманная Русалка: 'weave', зигзаг вместо волны — символ двуличия =====
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 24, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10 }, //0  Row A: «щедрый дар» (same-start)
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 23, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10 }, //1  Row A
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 33, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //2  Row A → мягкий финал («дар» сдержан)
	{ boss: 'enem3', type: 'enem33', xPos: 74, yPos: 32, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //3  Row A → мягкий финал
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22 }, //4  Row B → тот же старт, но обман: резкий укол вместо дара
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 23 }, //5  Row B
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 19, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 18, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 14 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 15, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 14, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 5,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 24 }  //15 нежданчик

	,
	// ===== Проклятая Русалка: 'pause', проклятие замораживает на миг перед рывком =====
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 30, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 29, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 10 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 76, yPos: 19, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 10 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 15 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 17, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 24 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 25 }  //15 нежданчик

	,
	// ===== Щучья Ведьма: 'wave', хлёст хвоста — растущая скорость внутри серии, финал =====
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 1.2 },  //0  Труба прибоя (2-sync герольд)
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7,  waveAmplitude: 8,  waveFrequency: 1.2 },  //1  герольд
	{ boss: 'enem5', type: 'enem55', xPos: 5,  yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4,  waveAmplitude: 6,  waveFrequency: 1.0 },  //2  ХЛЁСТ ХВОСТА — старт волны, медленно
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5,  waveAmplitude: 6,  waveFrequency: 1.1 },  //3  хлёст
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 6,  waveAmplitude: 7,  waveFrequency: 1.3 },  //4  хлёст
	{ boss: 'enem5', type: 'enem55', xPos: 41, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 7,  waveAmplitude: 7,  waveFrequency: 1.4 },  //5  хлёст
	{ boss: 'enem5', type: 'enem55', xPos: 53, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 8,  waveAmplitude: 8,  waveFrequency: 1.6 },  //6  хлёст
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 9,  waveAmplitude: 8,  waveFrequency: 1.7 },  //7  хлёст
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 10, waveAmplitude: 9,  waveFrequency: 1.9 },  //8  хлёст
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 11, waveAmplitude: 9,  waveFrequency: 2.0 },  //9  хлёст — конец ряда, самый быстрый край
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 7,  waveAmplitude: 12, waveFrequency: 0.7 }, //10 solo — по-настоящему тяжёлый одиночный удар, честный долгий телеграф
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 22, waveAmplitude: 6,  waveFrequency: 2.3 },  //11 нежданчик: бьёт сразу после хлёста, асимметрично
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 10, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23, waveAmplitude: 7,  waveFrequency: 2.4 },  //12 второй асимметричный нежданчик
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 13, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16, waveAmplitude: 7,  waveFrequency: 1.8 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17, waveAmplitude: 8,  waveFrequency: 1.9 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 27, waveAmplitude: 6,  waveFrequency: 2.6 }   //15 финальный самый резкий выстрел, чистый центр
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 380, bossDelayAbDop: 6000 }, // манящая широкая волна, щедрая передышка
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 4500 }, // ложная щедрость, темп чуть плотнее
	{ boss: 'enem3', bossDelayAb: 220, bossDelayAbDop: 4000 }, // двуличный зигзаг, самый быстрый темп уровня
	{ boss: 'enem4', bossDelayAb: 400, bossDelayAbDop: 6300 }, // проклятие-заморозка, долгая пауза перед рывком
	{ boss: 'enem5', bossDelayAb: 200, bossDelayAbDop: 6600 }, // внутри хлёста плотно, отдых после кульминации — самый долгий во всём уровне
];

const bossAbilitiesDop = [
	// Зазывная Русалка
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 10] },
	{ boss: 'enem1', indexAbilities: [4, 5, 11] },
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem1', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Сулящая Русалка
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0, 1] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem2', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Обманная Русалка — «одинаковое начало, разный конец» как буквальное воплощение обмана
	{ boss: 'enem3', indexAbilities: [0, 1] }, // герольд-пара
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3] }, // «щедрый дар»: тот же старт, мягкий финал
	{ boss: 'enem3', indexAbilities: [0, 1, 4, 5] }, // «обман»: тот же старт [0,1], но резкий укол вместо дара — опасная сигнатурная
	{ boss: 'enem3', indexAbilities: [6, 7, 12] },
	{ boss: 'enem3', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem3', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Проклятая Русалка
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem4', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Щучья Ведьма — «Хлёст хвоста», кульминация уровня (2-sync герольд → 8-sync хлёст → мгновенный нежданчик)
	{ boss: 'enem5', indexAbilities: [0, 1] }, // Труба прибоя (2-sync)
	{ boss: 'enem5', indexAbilities: [10] }, // solo — по-настоящему тяжёлый одиночный удар
	{ boss: 'enem5', indexAbilities: [13, 14] }, // асимметричная пара — опасность не только по краям
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4] }, // хвост начинает собираться (5-sync, промежуточная)
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 10] }, // ритмическая: сборка → тяжёлый одиночный
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5, 6, 7, 8, 9, 11] }, // ХЛЁСТ ХВОСТА + мгновенный нежданчик сразу после (опасная сигнатурная, кульминация уровня)
	{ boss: 'enem5', indexAbilities: [2, 3, 4, 5] }, // chunk-break: обрывается на середине хлёста
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15] }, // смешанная поздняя: герольд + полный хлёст + оба нежданчика, самая длинная связка уровня
];
