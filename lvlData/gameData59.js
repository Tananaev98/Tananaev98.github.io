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
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 1.782,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 0.95, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 10 },
		{ phase: 2, minHp: 0.31, cadence: 0.90, speed: 1.05, damage: 1.12, telegraphMultiplier: 0.95, surpriseChance: 0.12, maxActiveAttacks: 12 },
		{ phase: 3, minHp: 0.00, cadence: 0.80, speed: 1.12, damage: 1.22, telegraphMultiplier: 0.90, surpriseChance: 0.18, maxActiveAttacks: 14 }
	],
	bosses: {
		enem1: {
			// Хрустяш: PICKLE_JAB — резкий колкий укол-выпад, соль и хруст
			movementStyle: 'lateRush', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Хрустяш: PICKLE_JAB — резкий колкий укол-выпад, соль и хруст
		enem2: {
			// Плевунец: FILLING_SPIT — набирает сгусток начинки — пауза — дискретный плевок
			movementStyle: 'pause', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Плевунец: FILLING_SPIT — набирает сгусток начинки — пауза — дискретный плевок
		enem3: {
			// Пенослив: FOAM_POUR — ровный непрерывный пенный поток, не рывками
			movementStyle: 'drift', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Пенослив: FOAM_POUR — ровный непрерывный пенный поток, не рывками
		enem4: {
			// Кипяш: PORRIDGE_BOIL — пузыри лопаются пассивно, ложка бьёт прямо и просто
			movementStyle: 'straight', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Кипяш: PORRIDGE_BOIL — пузыри лопаются пассивно, ложка бьёт прямо и просто
		enem5: {
			// Громозвон: FEAST_ROAR — гвалт застолья во все стороны, затем громовой удар половником
			movementStyle: 'lateRush', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Громозвон: FEAST_ROAR — гвалт застолья во все стороны, затем громовой удар половником
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
        size: '20%',
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
        size: '24%',
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
        size: '24%',
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
        size: '24%',
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
        size: '26%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Хрустяш: PICKLE_JAB — резкий колкий укол-выпад, соль и хруст =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: укол сразу без привычного замаха
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — резкий колкий выпад по диагонали, затем
	// колючий непредсказуемый град уколов (diagonal+irregular), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //23 цепь-B звено 5

	// ===== Плевунец: FILLING_SPIT — набирает сгусток начинки — пауза —
	// дискретный плевок =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: плевок сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — плевки-сгустки летят рывками то влево, то
	// вправо, во второй серии ещё гуще (zigzag+zigzag), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5

	// ===== Пенослив: FOAM_POUR — ровный непрерывный пенный поток,
	// не рывками =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: струя раньше привычного долгого набора давления
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — струя льётся прямо вниз, затем шире вбок
	// при наклоне кувшина (vertical+diagonal), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Кипяш: PORRIDGE_BOIL — пузыри лопаются пассивно, ложка бьёт
	// прямо и просто =====
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: удар ложкой разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — пузырь лопается прямо вверх, затем широкий
	// взмах ложкой дугой (vertical+arc), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Громозвон: FEAST_ROAR — гвалт застолья взмывает во все стороны
	// разом, затем один громовой удар половником =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: удар половником без единого мгновения крика
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — хаотичный гвалт застолья взмывает во все
	// стороны разом, а завершает один решительный взмах половником по
	// широкой дуге (irregular+arc), раздел 13.7 — финальная кульминация,
	// без превышения безопасного потолка 6 звеньев (раздел 13.5).
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //26 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // резкие, но короткие колкие уколы
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — набор-пауза-плевок
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — ровный неспешный поток
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частые пузыри плюс удары ложкой
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Хрустяш — PICKLE_JAB
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким уколом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: укол сразу без привычного замаха
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: град колких уколов через всё поле разом

	// Плевунец — FILLING_SPIT
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных плевков подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной плевок с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия плевков по всему полю подряд

	// Пенослив — FOAM_POUR
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальней струёй
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: струя раньше привычного долгого набора давления
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: поток с обеих сторон разом

	// Кипяш — PORRIDGE_BOIL
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним ударом ложкой
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: удар разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: кипящий шквал пузырей через всё поле

	// Громозвон — FEAST_ROAR, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (6)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: удар половником без единого мгновения крика
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: гвалт и удар половником через весь стол разом
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
