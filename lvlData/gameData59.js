// Уровень 59 «Застолье» — двадцать первый уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51-54/56-58) — последний перед
// многофазным уровнем 60 (Бабай).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 290 строк, уровни 1-58 (включая свежую
// историю уровня 58).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl59/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — бугристый солёный огурец с укропом и усами из зелени, откушенная
//   верхушка, крупные острые когти-занозы — резкий, колючий, ХРУСТКИЙ.
// 2.webp — круглый пирог с плетёной корочкой и пастилой-розой сверху,
//   изо рта бьёт СТРУЯ ГОРЯЧЕЙ НАЧИНКИ отдельными плевками-сгустками —
//   прямая деталь идеи-документа «плюётся горячей начинкой».
// 3.webp — глиняный кувшин кваса с волнистым узором и колосьями, из
//   треснутого горлышка ЛЬЁТСЯ ПЕНИСТАЯ СТРУЯ непрерывным потоком — прямая
//   деталь идеи-документа «заливает всё пеной».
// 4.webp — пузатый горшок с кипящей гречневой кашей, льющейся через край,
//   кусок масла сверху, в руке деревянная ложка как палица — сочетает
//   КИПЕНИЕ (пассивные пузыри) и УДАР ЛОЖКОЙ (оружие) — прямая деталь идеи-
//   документа «кипит в пузатом горшке».
// 5.webp (финал) — самый крупный силуэт, лицо-маска из досок бочки (та же
//   условность, что у Скрутихи на уровне 56), венок из колосьев, связка
//   бубликов на поясе, ОГРОМНЫЙ ПОЛОВНИК занесён как палица, рот раскрыт в
//   зычном крике — прямая деталь идеи-документа «громогласный хозяин».
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА — реальная физическая природа каждого блюда/напитка, не общий
// шаблон роли: огурец резкий и колючий (соль, хруст) → пирог плюётся
// начинкой отдельными сгустками (дискретные плевки) → квас льётся
// непрерывной пенной струёй (не сгустками, а потоком) → каша кипит и
// плюс бьёт ложкой (пассивное бурление + оружие) → хозяин застолья
// объединяет громкую команду и удар половником, венчая весь стол.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные названия блюд): Хрустяш
// (от «хрустеть» — колкость и хруст солёного огурца); Плевунец (от
// «плевать» — дискретные плевки горячей начинки); Пенослив (составное
// изобретённое слово — пенная струя, льющаяся из кувшина); Кипяш (от
// «кипеть» — бурление каши в горшке); Громозвон (составное изобретённое
// слово — гром голоса и звон половника разом).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-58: Хрустяш
// — lateRush (резкий колкий укол-выпад) 10%→11%, самый низкий бакет роли;
// Плевунец — pause (набирает сгусток начинки — пауза — плевок) 10%→11%,
// самый низкий бакет роли; Пенослив — drift (ровный непрерывный поток, не
// рывками) 14%→15%; Кипяш — straight (прямой безыскусный удар ложкой)
// 12%→13%, самый низкий бакет роли; Громозвон — lateRush (внезапный
// громовой удар половником после нарастающего крика) 17%→18%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (метод закреплён на
// уровнях 57-58 — пары проверяются ДО записи файла): Хрустяш — diagonal(3)+
// irregular(5): резкий колкий выпад по диагонали, затем колючий
// непредсказуемый град мелких уколов (пара с нулевой историей для enem1);
// Плевунец — zigzag(4)+zigzag(5): плевки-сгустки летят рывками то влево,
// то вправо, во второй серии ещё гуще (пара с нулевой историей для enem2,
// повтор формы — сознательный приём, как у Топотуна на уровне 58); Пенослив
// — vertical(3)+diagonal(4): струя льётся прямо вниз, затем шире вбок при
// наклоне кувшина (пара с нулевой историей для enem3); Кипяш — vertical(4)+
// arc(4): пузырь лопается прямо вверх, затем широкий взмах ложкой дугой
// (пара с нулевой историей для enem4); Громозвон — irregular(5)+arc(6):
// хаотичный гвалт застолья взмывает во все стороны разом, а завершает
// один решительный взмах половником по широкой дуге — крик, затем удар
// (пара с нулевой историей для enem5; длина финальной цепи снова ограничена
// 6 звеньями, а не историческим максимумом 7 — раздел 13.5, см. вывод
// уровня 57). Формы всех пяти пар подтверждены живым классификатором
// панели ПОСЛЕ записи файла (verify59.js + STEP 2), не только ручным
// расчётом.
let lvlNumber = 59;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.754, damageMultiplier: 1.782, minWaveDelay: 5000, minShotDelay: 108, minTelegraphMs: 556,
	phases: [
		{ phase: 1, minHp: 0.697, cadence: 0.961, speed: 1.049, damage: 1, telegraphMultiplier: 1.042, surpriseChance: 0.117, maxActiveAttacks: 36 },
		{ phase: 2, minHp: 0.348, cadence: 0.798, speed: 1.184, damage: 1.12, telegraphMultiplier: 0.877, surpriseChance: 0.217, maxActiveAttacks: 40 },
		{ phase: 3, minHp: 0, cadence: 0.634, speed: 1.296, damage: 1.22, telegraphMultiplier: 0.776, surpriseChance: 0.317, maxActiveAttacks: 44 }
	],
	bosses: {
		enem1: { combatIdentity: "Хрустящий скол и обратный колкий укол", combatTrick: "После хрустящего укола остаются скол и обратный колкий конец. Ошибка — бить после первого хруста, не закончив обратный укол.", signatureEvery: 3, movementStyle: 'straight', cadence: 1.02, telegraphMs: 959, speedMultiplier: 1.037, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Порции горячей начинки и закрывающий плевок", combatTrick: "Начинка летит отдельными сгустками, между которыми остаётся закрывающий плевок. Ошибка — уйти после первой порции или принять последнюю крошку за весь плевок.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 1.012, telegraphMs: 875, speedMultiplier: 1.076, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Растянутая струя и оставшийся пенный край", combatTrick: "Следующий участок струи уже льётся, пока прежний пенный край ещё не завершён. Ошибка — бить после первого очищенного участка или бросить пену ради видимого нового потока.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.725, telegraphMs: 1079, speedMultiplier: 0.987, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Кипящие пузыри, выход каши и завершающая ложка", combatTrick: "Более долгие пузыри перекрываются быстрым выходом каши, ложка завершает кипение. Ошибка — бить после пузыря либо следить только за быстрым краем, забыв ложку и оставшийся пузырь.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.909, telegraphMs: 845, speedMultiplier: 1.087, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Подача под растянутой командой и последний половник", combatTrick: "Подача уже идёт, пока тянется команда хозяина; половник завершает речь отдельным ударом. Короткое распоряжение не начинается длинной речью. Ошибка — считать конец команды концом подачи.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.956, telegraphMs: 1009, speedMultiplier: 1.087, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl59/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl59/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl59/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl59/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl59/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Хрустяш',
        image: 'images/enemies/regions/5_dom_dvor/lvl59/1.webp',
        baseHP: 14999,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Плевунец',
        image: 'images/enemies/regions/5_dom_dvor/lvl59/2.webp',
        baseHP: 37497,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Пенослив',
        image: 'images/enemies/regions/5_dom_dvor/lvl59/3.webp',
        baseHP: 66341,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Кипяш',
        image: 'images/enemies/regions/5_dom_dvor/lvl59/4.webp',
        baseHP: 106722,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Громозвон',
        image: 'images/enemies/regions/5_dom_dvor/lvl59/5.webp',
        baseHP: 161526,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 22;
 const bossInterval = 25;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Хрустяш =====
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.09 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.79 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.09 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.79 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.53 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.09 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.79 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.53 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.09 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.79 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.53 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.09 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.79 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.83 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.58 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.33 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.08 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.53 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.09 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.79 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.09 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.53 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.09 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.79 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.09 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.93 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.68 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.43 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.18 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.93 }, // 50 i

	// ===== Плевунец =====
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.17 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.57 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.17 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.55 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.17 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.55 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.17 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.55 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.17 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.683 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.69 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.44 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.19 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.94 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.55 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.383 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.17 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.77 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.55 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.17 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.77 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.63 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.38 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.13 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.88 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.63 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.38 }, // 52 i

	// ===== Пенослив =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.57 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.57 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.57 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.57 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.473 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.57 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.63 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.38 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.88 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.63 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.57 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.59 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.57 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.59 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.73 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.48 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.23 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.98 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.73 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.48 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.23 }, // 61 i

	// ===== Кипяш =====
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.59, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.97, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 6 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 7 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.59, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.97, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 12 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 13 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 14 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 15 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.59, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.97, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 19 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 20 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 21 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 22 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 23 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.59, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.97, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 26 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 27 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 28 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 29 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 30 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 31 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.59, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 32 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 33 e
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.97, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 34 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 35 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 36 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 37 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 38 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 39 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.39, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 40 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.14, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 41 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.89, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 42 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.64, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 43 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.59, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 44 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 45 g
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.97, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 46 g
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 47 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 48 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 49 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 50 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 51 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 52 g
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.59, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 53 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 54 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.97, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 55 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 56 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.97, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 57 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 58 h
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 59 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 60 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 61 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.49, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 62 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.24, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 63 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.99, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 64 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.74, waveAmplitude: 3.13, waveFrequency: 1.43, wavePhase: 0.43 }, // 65 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.49, waveAmplitude: 4.13, waveFrequency: 1.93, wavePhase: 1.43 }, // 66 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.24, waveAmplitude: 5.13, waveFrequency: 2.43, wavePhase: 2.43 }, // 67 i

	// ===== Громозвон =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.61 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.61 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.61 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.283 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.61 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.813 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 4, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.61 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.09 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.84 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.59 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.34 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.09 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.84 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.61 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.61 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.19 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.94 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.69 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.44 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.19 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.94 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.69 }, // 69 i
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 70 j
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 71 j
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 72 j
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.97 }, // 73 j
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 74 j

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 187, bossDelayAbDop: 13300, firstWaveDelayMs: 2770 }, // Хрустящий скол и обратный колкий укол
	{ boss: 'enem2', bossDelayAb: 152, bossDelayAbDop: 11600, firstWaveDelayMs: 2770 }, // Порции горячей начинки и закрывающий плевок
	{ boss: 'enem3', bossDelayAb: 188, bossDelayAbDop: 17800, firstWaveDelayMs: 2770 }, // Растянутая струя и оставшийся пенный край
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 15700, firstWaveDelayMs: 2770 }, // Кипящие пузыри, выход каши и завершающая ложка
	{ boss: 'enem5', bossDelayAb: 179, bossDelayAbDop: 16000, firstWaveDelayMs: 2770 }, // Подача под растянутой командой и последний половник
];

 const bossAbilitiesDop = [
	// Хрустяш
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [250, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 250] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 0, 500, 500] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 500, 0, 0, 250] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [500, 0, 250, 250, 250] },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 355, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Хрустящий скол и обратный колкий укол — знакомство" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [500, 250, 0, 500, 500, 0] },
	{ boss: 'enem1', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [500, 500, 0, 250, 500, 0] },
	{ boss: 'enem1', indexAbilities: [46, 47, 48, 49, 50], signature: true, isChain: true, minPhase: 3, shotDelayMs: 383, shotGapsMs: [0, 0, 0, 0], label: "Хрустящий скол и обратный колкий укол — завершение" },

	// Плевунец
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 250, 250] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [250, 0, 250, 250, 500] },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [250, 0, 250, 250, 500] },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [500, 0, 0, 0, 500] },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 359, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Порции горячей начинки и закрывающий плевок — знакомство" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [250, 0, 250, 250, 500, 250] },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [500, 0, 250, 250, 500, 0] },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 397, shotGapsMs: [0, 0, 0, 0, 0], label: "Порции горячей начинки и закрывающий плевок — завершение" },

	// Пенослив
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 0, 500, 0, 500, 500], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [0, 0, 250, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [500, 0, 0, 250, 0, 250] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [500, 0, 0, 500, 0, 500] },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 500, 0, 500, 0, 0] },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38], signature: true, isChain: true, shotDelayMs: 409, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Растянутая струя и оставшийся пенный край — знакомство" },
	{ boss: 'enem3', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 46], minPhase: 2, shotGapsMs: [0, 0, 250, 0, 0, 500, 0] },
	{ boss: 'enem3', indexAbilities: [47, 48, 49, 50, 51, 52, 53, 54], minPhase: 3, shotGapsMs: [0, 0, 500, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [55, 56, 57, 58, 59, 60, 61], signature: true, isChain: true, minPhase: 3, shotDelayMs: 421, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Растянутая струя и оставшийся пенный край — завершение" },

	// Кипяш
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [0, 0, 0, 250, 250, 0, 500], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [250, 250, 0, 0, 500, 0, 500] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21, 22, 23], shotGapsMs: [500, 0, 0, 0, 500, 0, 250] },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27, 28, 29, 30, 31], shotGapsMs: [250, 0, 0, 0, 500, 0, 500] },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39], shotGapsMs: [500, 250, 0, 500, 250, 0, 250] },
	{ boss: 'enem4', indexAbilities: [40, 41, 42, 43], signature: true, isChain: true, shotDelayMs: 371, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Кипящие пузыри, выход каши и завершающая ложка — знакомство" },
	{ boss: 'enem4', indexAbilities: [44, 45, 46, 47, 48, 49, 50, 51, 52], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 500, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [53, 54, 55, 56, 57, 58, 59, 60, 61], minPhase: 3, shotGapsMs: [0, 250, 0, 500, 0, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [62, 63, 64, 65, 66, 67], signature: true, isChain: true, minPhase: 3, shotDelayMs: 391, shotGapsMs: [0, 0, 0, 0, 0], label: "Кипящие пузыри, выход каши и завершающая ложка — завершение" },

	// Громозвон
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [500, 0, 500, 500, 0, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10, 11, 12, 13, 14], shotGapsMs: [250, 0, 500, 250, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18, 19, 20, 21, 22], shotGapsMs: [250, 0, 500, 250, 250, 0, 0] },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26, 27, 28, 29, 30], shotGapsMs: [250, 500, 0, 155, 0, 500, 0] },
	{ boss: 'enem5', indexAbilities: [31, 32, 33, 34, 35, 36, 37, 38], shotGapsMs: [0, 500, 0, 500, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [39, 40, 41, 42, 43, 44], signature: true, isChain: true, shotDelayMs: 379, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Подача под растянутой командой и последний половник — знакомство" },
	{ boss: 'enem5', indexAbilities: [45, 46, 47, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [0, 0, 250, 500, 0, 250, 0, 0] },
	{ boss: 'enem5', indexAbilities: [54, 55, 56, 57, 58, 59, 60, 61, 62], minPhase: 3, shotGapsMs: [250, 0, 250, 0, 0, 500, 0, 0] },
	{ boss: 'enem5', indexAbilities: [63, 64, 65, 66, 67, 68, 69], signature: true, isChain: true, minPhase: 3, shotDelayMs: 403, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Подача под растянутой командой и последний половник — завершение" },
	{ boss: 'enem5', indexAbilities: [70, 71, 72, 73, 74], minPhase: 2, shotGapsMs: [500, 0, 250, 0] },

];

// Лорные названия связок временных улучшений — пять разных яств одного
// застолья, словарь каждого строго завязан на его реальную физическую
// природу (правило 12.1): огурец хрустит и колется солью, пирог плюётся
// начинкой, квас льётся пенной струёй, каша кипит и бьёт ложкой, а хозяин
// застолья ревёт и разит половником. Полных совпадений фраз между
// монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Хрустяш — солёный огурец: соль, хруст, укроп, колючка.
    enem1: {
        variant1: 'Солёный кураж', variant2: 'Укропная хватка', variant3: 'Пупырь-таран',
        variant4: 'Хрусткий напор', variant5: 'Меткий укол', variant6: 'Бешеный укол',
        variant7: 'Солёный норов', variant8: 'Крепкая корка', variant9: 'Ударный укол',
        variant10: 'Живучий рассол', variant11: 'Колючий пупырь', variant12: 'Укол и в темноту',
        variant13: 'Толстая корка', variant14: 'Неутомимый укол', variant15: 'Пружинистый укол',
        variant16: 'Хрусткая корка, зоркий глаз', variant17: 'Солёная удача', variant18: 'Верный укол',
        variant19: 'Молниеносный укол', variant20: 'Солёный нюх', variant21: 'Цепкий укроп',
        variant22: 'Юркий, несмотря на пупыри', variant23: 'Солёная стойкость', variant24: 'Долгий рассол, зоркий глаз',
        variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Стойкая корка',
        variant28: 'Укол наповал', variant29: 'Крепкий хрустяш', variant30: 'Рассольная мощь',
        variant31: 'Укол с оглядкой', variant32: 'Живучая корка', variant33: 'Юркий и солёный',
        variant34: 'Солёная прыть', variant35: 'Быстрый укол, крепкая корка'
    },
    // Плевунец — начинённый пирог: начинка, плевок, корочка, пастила.
    enem2: {
        variant1: 'Начиночный кураж', variant2: 'Корочная хватка', variant3: 'Плевок-таран',
        variant4: 'Плевучий напор', variant5: 'Меткий плевок', variant6: 'Бешеный плевок',
        variant7: 'Начиночный норов', variant8: 'Крепкая корочка', variant9: 'Ударный плевок',
        variant10: 'Живучая начинка', variant11: 'Колючая пастила', variant12: 'Плевок и в темноту',
        variant13: 'Толстая корочка', variant14: 'Неутомимый плевок', variant15: 'Пружинистый плевок',
        variant16: 'Горячая начинка, зоркий глаз', variant17: 'Начиночная удача', variant18: 'Верный плевок',
        variant19: 'Молниеносный плевок', variant20: 'Начиночный нюх', variant21: 'Цепкая пастила',
        variant22: 'Юркий, несмотря на корочку', variant23: 'Начиночная стойкость', variant24: 'Долгий плевок, зоркий глаз',
        variant25: 'Ускользающий плевок', variant26: 'Дикий плевок', variant27: 'Стойкая корочка',
        variant28: 'Плевок наповал', variant29: 'Крепкий плевунец', variant30: 'Плевучая мощь',
        variant31: 'Плевок с оглядкой', variant32: 'Живучая корочка', variant33: 'Юркий и начиночный',
        variant34: 'Начиночная прыть', variant35: 'Быстрый плевок, крепкая корочка'
    },
    // Пенослив — кувшин кваса: пена, струя, глина, колос.
    enem3: {
        variant1: 'Пенный кураж', variant2: 'Глиняная хватка', variant3: 'Струя-таран',
        variant4: 'Заливной напор', variant5: 'Меткий плеск', variant6: 'Бешеный плеск',
        variant7: 'Пенный норов', variant8: 'Крепкий кувшин', variant9: 'Ударный плеск',
        variant10: 'Живучая пена', variant11: 'Колючий черепок', variant12: 'Плеск и в темноту',
        variant13: 'Толстая глина', variant14: 'Неутомимый плеск', variant15: 'Пружинистый плеск',
        variant16: 'Пенный колос, зоркий глаз', variant17: 'Пенная удача', variant18: 'Верный плеск',
        variant19: 'Молниеносный плеск', variant20: 'Пенный нюх', variant21: 'Цепкая ручка',
        variant22: 'Юркий, несмотря на кувшин', variant23: 'Пенная стойкость', variant24: 'Долгий поток, зоркий глаз',
        variant25: 'Ускользающий плеск', variant26: 'Дикий плеск', variant27: 'Стойкая глина',
        variant28: 'Плеск наповал', variant29: 'Крепкий пенослив', variant30: 'Заливная мощь',
        variant31: 'Плеск с оглядкой', variant32: 'Живучая глина', variant33: 'Юркий и пенный',
        variant34: 'Пенная прыть', variant35: 'Быстрый плеск, крепкий кувшин'
    },
    // Кипяш — гречневая каша: кипение, пузырь, ложка, масло.
    enem4: {
        variant1: 'Кипящий кураж', variant2: 'Ложечная хватка', variant3: 'Ложка-таран',
        variant4: 'Кипучий напор', variant5: 'Меткий удар ложкой', variant6: 'Бешеный удар ложкой',
        variant7: 'Кипящий норов', variant8: 'Крепкий горшок', variant9: 'Ударный замах ложкой',
        variant10: 'Живучий пузырь', variant11: 'Колючий пузырь', variant12: 'Удар ложкой и в темноту',
        variant13: 'Толстый горшок', variant14: 'Неутомимый удар ложкой', variant15: 'Пружинистый удар ложкой',
        variant16: 'Масляный блеск, зоркий глаз', variant17: 'Кипящая удача', variant18: 'Верный удар ложкой',
        variant19: 'Молниеносный удар ложкой', variant20: 'Кипящий нюх', variant21: 'Цепкая ложка',
        variant22: 'Юркий, несмотря на горшок', variant23: 'Кипящая стойкость', variant24: 'Долгое бурление, зоркий глаз',
        variant25: 'Ускользающий удар ложкой', variant26: 'Дикий удар ложкой', variant27: 'Стойкий горшок',
        variant28: 'Удар ложкой наповал', variant29: 'Крепкий кипяш', variant30: 'Кипучая мощь',
        variant31: 'Удар ложкой с оглядкой', variant32: 'Живучий горшок', variant33: 'Юркий и кипящий',
        variant34: 'Кипучая прыть', variant35: 'Быстрый удар ложкой, крепкий горшок'
    },
    // Громозвон — распорядитель застолья: рёв, половник, бублики, венок.
    enem5: {
        variant1: 'Громовой кураж', variant2: 'Половничная хватка', variant3: 'Половник-таран',
        variant4: 'Зычный напор', variant5: 'Меткий рёв', variant6: 'Бешеный рёв',
        variant7: 'Громовой норов', variant8: 'Крепкий венок', variant9: 'Ударный рёв',
        variant10: 'Живучий гвалт', variant11: 'Колючий бублик', variant12: 'Рёв и в темноту',
        variant13: 'Толстый венок', variant14: 'Неутомимый рёв', variant15: 'Пружинистый рёв',
        variant16: 'Бочковая маска, зоркий взгляд', variant17: 'Громовая удача', variant18: 'Верный рёв',
        variant19: 'Молниеносный рёв', variant20: 'Громовой нюх', variant21: 'Цепкий бублик',
        variant22: 'Юркий, несмотря на стать', variant23: 'Громовая стойкость', variant24: 'Долгий гвалт, зоркий взгляд',
        variant25: 'Ускользающий рёв', variant26: 'Дикий рёв', variant27: 'Стойкий венок',
        variant28: 'Рёв наповал', variant29: 'Крепкий громозвон', variant30: 'Зычная мощь',
        variant31: 'Рёв с оглядкой', variant32: 'Живучий венок', variant33: 'Юркий и громовой',
        variant34: 'Зычная прыть', variant35: 'Быстрый рёв, крепкий половник'
    }
};
