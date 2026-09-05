// Уровень 44 «Птичник» — четвёртый уровень области V «Беспокойная деревня».
// Роспись персонажей (images/enemies/regions/5_dom_dvor/lvl44/) подобрана по
// РЕАЛЬНО сгенерированному арту (правило 12 lvlData/Правила создания уровня.txt),
// все 5 картинок открыты и сверены лично перед выбором имён:
// 1.webp — кремово-белая перьевая тварь с широко раскинутыми крыльями-когтями
//   и оскаленным клювом ("Белая гусыня, шипит, растопырив крылья" — совпадает);
// 2.webp — рябая бурая наседка с гребешком, приземистая, готовая к прыжку
//   ("Крапчатая несушка" — совпадает);
// 3.webp — растрескавшееся ЖИВОЕ ЯЙЦО с оскаленной мордой и когтистыми
//   руками-отростками — В ДОКУМЕНТЕ-ИДЕЕ ТАКОГО НЕТ ВООБЩЕ (там были только
//   куры/гусь/индюк/петух). Картинка признана истиной (тот же принцип, что
//   уровень 28 — дыня вместо крыжовника, и уровень 41 — гусак вместо
//   несуществующей "воротной цепи"): яйцо тематически идеально для птичника,
//   заменяет собой пятый слот без потери духа уровня;
// 4.webp — грузный индюк с раскрытым пёстрым веером хвоста и красным зобом
//   ("Надутый индюк" — совпадает);
// 5.webp — golden-золотистый петух с алым гребнем, тёмным хвостом, самый
//   крупный и грозный из пяти ("Петух-хозяин" — совпадает, закономерно финал).
// Имена — придуманные, ироничные, НЕ буквальные копии документа (правило 12,
// урок уровня 41): Шипучка, Квочка, Треснушка, Пыхтун, Кукарекало.
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2, обязательна ДО и ПОСЛЕ) — ШАГ 1
// выполнен 2026-09-05 через admin-boss-pattern-panel.html по ВСЕЙ таблице
// (1-43, 215 строк), обе панели распределения (movementStyle И форма цепи).
// Архетипы и цепи ниже выбраны ИЗ ОБРАЗА каждой птицы, затем сверены с полной
// историей той же роли — ни один не повторяет то, что эта роль уже делала:
// Шипучка (enem1) — "давление снизу" (гусь щиплет за ноги понизу) — у enem1
//   такого архетипа ещё не было ни разу за 43 уровня;
// Квочка (enem2) — "редкие mid-only" (высиживает гнездо, бьёт прямо перед
//   собой, а не по флангам) — у enem2 такого не было;
// Треснушка (enem3) — WOBBLE_ROLL, свой архетип: яйцо перекатывается по нижней
//   трети поля, непредсказуемо покачиваясь перед броском — не давление снизу
//   Тулупыча/Растрёпы (у тех — методичный снос в одну сторону), а рваное
//   покачивание в обе стороны;
// Пыхтун (enem4) — "скрещённые высоты на флангах" (веер хвоста — перья разной
//   длины то слева выше, то справа) — у enem4 такого не было (был только у
//   enem3/Липуна, другая роль);
// Кукарекало (enem5) — CROW_HERALD: шпоры бьют зигзагом понизу, а САМУЮ
//   опасную серию предваряет намеренно самый долгий и честный телеграф всего
//   уровня (петушиный крик — предупреждение, а не украшение, раздел 1.1 п.1
//   Dark Souls) — новый поворот, ни разу не использованный ни одним enem5.
//
// movementStyle — из ПОВЕДЕНИЯ птицы, затем сверен (ни один не создаёт новый
// перекос >30%): Шипучка — pause (ждёт и щиплет), Квочка — straight (почти не
// двигается, высиживает), Треснушка — wave (покачивание яйца — буквально то,
// что 'wave' умеет), Пыхтун — accelerate (медленный напых → внезапный бросок
// пера), Кукарекало — lateRush (стойка перед прыжком шпорой).
//
// Атакующая цепь (правило 13.6/13.7) — у каждого своя форма, ни одна не
// повторяет то, что эта роль уже делала за 43 уровня (см. таблицу формы цепи
// admin-boss-pattern-panel.html): Шипучка arc+irregular (крыло-взмах, потом
// паническое хлопанье), Квочка vertical+diagonal (прямой клевок, потом бросок
// наискось к гнезду), Треснушка arc+irregular (перекат туда-обратно, потом
// рваные скачки при неудачной попытке укатиться), Пыхтун arc+vertical (веер
// хвоста дугой, потом отдельные перья падают прямо вниз), Кукарекало
// diagonal+irregular (направленный удар шпорой наискось, потом хаотичная
// добивающая свалка при кульминации).
let lvlNumber = 44;

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
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.76, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { movementStyle: 'pause',      cadence: 1.03, telegraphMs: 900,  speedMultiplier: 0.96, damageMultiplier: 0.93, speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18] }, // Шипучка: GROUND_NIP — щиплет понизу, ждёт и бьёт (давление снизу)
		enem2: { movementStyle: 'straight',   cadence: 0.97, telegraphMs: 790,  speedMultiplier: 1.02, damageMultiplier: 0.98, speedVariance: [0.88, 0.96, 1.04, 1.12, 1.18] }, // Квочка: NEST_GUARD — редкие mid-only клевки прямо перед собой
		enem3: { movementStyle: 'wave',       cadence: 1.17, telegraphMs: 1050, speedMultiplier: 0.80, damageMultiplier: 1.19, speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12] }, // Треснушка: WOBBLE_ROLL — перекат по низу с непредсказуемым покачиванием
		enem4: { movementStyle: 'accelerate', cadence: 0.86, telegraphMs: 680,  speedMultiplier: 1.12, damageMultiplier: 1.04, speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24] }, // Пыхтун: FAN_CROSS — скрещённые высоты на флангах, веер хвоста
		enem5: { movementStyle: 'lateRush',   cadence: 0.80, telegraphMs: 1040, speedMultiplier: 1.05, damageMultiplier: 1.12, speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20] }  // Кукарекало: CROW_HERALD — шпоры зигзагом понизу, самый честный телеграф уровня перед сигнатурной серией
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl44/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl44/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl44/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl44/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl44/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Шипучка',
        image: 'images/enemies/regions/5_dom_dvor/lvl44/1.webp',
        baseHP: 7124,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '24%',
        deathAnimation: { preset: 'featherScatter', durationMs: 1100 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Квочка',
        image: 'images/enemies/regions/5_dom_dvor/lvl44/2.webp',
        baseHP: 42747,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '24%',
        deathAnimation: { preset: 'nestCollapse', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Треснушка',
        image: 'images/enemies/regions/5_dom_dvor/lvl44/3.webp',
        baseHP: 56995,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '23%',
        deathAnimation: { preset: 'shellCrack', durationMs: 1200 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Пыхтун',
        image: 'images/enemies/regions/5_dom_dvor/lvl44/4.webp',
        baseHP: 170986,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '27%',
        deathAnimation: { preset: 'tailFanCollapse', durationMs: 1200 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Кукарекало',
        image: 'images/enemies/regions/5_dom_dvor/lvl44/5.webp',
        baseHP: 213733,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '28%',
        deathAnimation: { preset: 'goldenPlumeFall', durationMs: 1300 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5 правил уровня: speed≥20
 // → yPos 5-10; speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).
 // xPos внутри одной стороны разнесены (не в узком диапазоне), см. урок 3.1.

 const bossAbilities = [
	// ===== Шипучка: GROUND_NIP — щиплет понизу широким веером, редкий
	// шипящий рывок сверху =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //10 шипящий рывок — редкий акцент
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //11 шипящий рывок — редкий акцент
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 5,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //15
	// звенья «атакующей цепи» — крыло-взмах дугой, затем паническое рваное
	// хлопанье (arc+irregular), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //22 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //23 цепь-B звено 5

	// ===== Квочка: NEST_GUARD — редкие mid-only клевки прямо перед собой,
	// изредка полноразмашистый рывок с обоих флангов =====
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 58, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //9  редкий полноразмашистый рывок
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //10 редкий полноразмашистый рывок
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 38, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 62, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — прямой клевок вниз, затем бросок наискось к
	// гнезду (vertical+diagonal), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Треснушка: WOBBLE_ROLL — перекат по нижней трети поля с
	// непредсказуемым покачиванием, редкий отскок вверх =====
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //8  редкий отскок вверх
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //9  редкий отскок вверх
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //15
	// звенья «атакующей цепи» — перекат туда-обратно дугой, затем рваные
	// скачки неудачной попытки укатиться (arc+irregular), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова, длина 6)
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //22 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //23 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //24 цепь-B звено 6

	// ===== Пыхтун: FAN_CROSS — скрещённые высоты на флангах (перья веера то
	// слева выше, то справа), редкий бросок пера через всё поле =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0  слева высоко
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //1  слева высоко
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //2  справа низко
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //3  справа низко
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //4  справа высоко (крест)
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //5  слева низко (крест)
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8  fast accent
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //9  fast accent
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //10 fast accent
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //14 бросок пера через всё поле — нежданчик
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — веер хвоста дугой, потом перья падают прямо
	// вниз по одному (arc+vertical), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //22 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //24 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //25 цепь-B звено 5

	// ===== Кукарекало: CROW_HERALD — шпоры бьют зигзагом понизу, самая
	// опасная серия предваряется самым долгим и честным телеграфом уровня =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4  fast L
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //5  fast R
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8  fast L
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //9  fast R
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //15
	// звенья «атакующей цепи» — направленный удар шпорой наискось, затем
	// хаотичная добивающая свалка на кульминации (diagonal+irregular).
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова, максимум длины 7)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //26 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //27 цепь-B звено 7
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5600 }, // выжидает и щиплет, спокойный ритм знакомства
	{ boss: 'enem2', bossDelayAb: 240, bossDelayAbDop: 4400 }, // короткие клевки, редкие резкие всплески
	{ boss: 'enem3', bossDelayAb: 390, bossDelayAbDop: 6800 }, // тяжёлая, самая долгая пауза уровня — перекат медленный
	{ boss: 'enem4', bossDelayAb: 200, bossDelayAbDop: 3800 }, // самый частый и нервный ритм уровня
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 5200 }, // собранный, но не самый частый — финал
 ];

 const bossAbilitiesDop = [
	// Шипучка — GROUND_NIP
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11] },
	{ boss: 'enem1', indexAbilities: [0, 1, 10] }, // same-start с [0,1], расходится быстрым шипением
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem1', indexAbilities: [12, 13, 7, 8] }, // нежданчик: два шипящих рывка сверху вместо привычного низа
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5, 14] }, // сигнатурная: широкий веер щипков разом

	// Квочка — NEST_GUARD
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6, 13] },
	{ boss: 'enem2', indexAbilities: [7, 8] },
	{ boss: 'enem2', indexAbilities: [9, 10] },
	{ boss: 'enem2', indexAbilities: [0, 1, 9] }, // same-start с [0,1], расходится полноразмашистым рывком
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь (4)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь (5)
	{ boss: 'enem2', indexAbilities: [9, 10, 11] }, // нежданчик: редкий полноразмашистый рывок с обоих флангов вместо привычного центра
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 12] }, // сигнатурная: полный клевок по центру и обеим сторонам разом

	// Треснушка — WOBBLE_ROLL
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6, 12, 13] },
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [0, 1, 8] }, // same-start с [0,1], расходится отскоком вверх
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23, 24], isChain: true }, // ← цепь (6)
	{ boss: 'enem3', indexAbilities: [14, 10, 11] }, // нежданчик: резкий отскок вверх посреди неспешного переката
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 5, 6, 7, 15] }, // сигнатурная: перекат по всей нижней трети разом

	// Пыхтун — FAN_CROSS
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 8] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь (5)
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], isChain: true }, // ← цепь (5)
	{ boss: 'enem4', indexAbilities: [14, 12, 13] }, // нежданчик: перо летит через всё поле вместо привычного креста флангов
	{ boss: 'enem4', indexAbilities: [0, 4, 2, 5, 8, 9, 10, 11] }, // сигнатурная: полный крест высот на полной скорости

	// Кукарекало — CROW_HERALD, финальный босс
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [10, 11] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [8, 9] },
	{ boss: 'enem5', indexAbilities: [6, 7, 13, 14] },
	{ boss: 'enem5', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь (5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], isChain: true }, // ← цепь (7, максимум)
	{ boss: 'enem5', indexAbilities: [15] }, // нежданчик: впервые одиночный удар из самого центра поля
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная кульминация: оба фланга шпорами на полной скорости — предваряется самым долгим телеграфом уровня (telegraphMs 1040)
 ];

// Лорные названия связок временных улучшений — свой словарь образов на
// каждого босса (перо/шип у гусыни, но скорлупа/трещина у яйца), см. правило
// 12.1 lvlData/Правила создания уровня.txt. Адъектив на одной позиции у
// нескольких боссов может рифмоваться (как в gameData1.js) — это отражает
// общий combo статов на этой позиции, не шаблонность; полных совпадений фраз
// между боссами нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Шипучка — белая гусыня: перо, шип, крыло, клюв, гогот.
    enem1: {
        variant1: 'Гусиный кураж', variant2: 'Перьевая хватка', variant3: 'Крыло-таран',
        variant4: 'Шипящий напор', variant5: 'Меткий щип', variant6: 'Бешеный гогот',
        variant7: 'Гусиный норов', variant8: 'Крепкое перо', variant9: 'Ударный щип',
        variant10: 'Живучее крыло', variant11: 'Колючий пух', variant12: 'Щип и в камыши',
        variant13: 'Толстый пух', variant14: 'Неутомимый гогот', variant15: 'Пружинистый гогот',
        variant16: 'Острый клюв, зоркий глаз', variant17: 'Гусиная удача', variant18: 'Верный щип',
        variant19: 'Молниеносный выпад', variant20: 'Гусиный нюх', variant21: 'Цепкое крыло',
        variant22: 'Юркая для своего веса', variant23: 'Гусиная стойкость', variant24: 'Долгий шип, зоркий глаз',
        variant25: 'Ускользающий гогот', variant26: 'Дикий гогот', variant27: 'Стойкий пух',
        variant28: 'Щип наповал', variant29: 'Крепкая гусыня', variant30: 'Перьевая мощь',
        variant31: 'Щип с оглядкой', variant32: 'Живучий пух', variant33: 'Юркая и шипящая',
        variant34: 'Гусиная прыть', variant35: 'Быстрый щип, крепкое крыло'
    },
    // Квочка — рябая наседка: гнездо, перо, гребешок, клекот, скорлупа.
    enem2: {
        variant1: 'Наседкин кураж', variant2: 'Гнездовая хватка', variant3: 'Клюв-таран',
        variant4: 'Клекочущий напор', variant5: 'Меткий клевок', variant6: 'Бешеный клекот',
        variant7: 'Наседкин норов', variant8: 'Крепкое гнездо', variant9: 'Ударный клевок',
        variant10: 'Живучий клюв', variant11: 'Колючее перо', variant12: 'Клевок в упор',
        variant13: 'Толстое оперение', variant14: 'Неутомимый клекот', variant15: 'Пружинистый клевок',
        variant16: 'Острый взгляд, крепкий гребень', variant17: 'Наседкина удача', variant18: 'Верный клевок',
        variant19: 'Молниеносный клевок', variant20: 'Наседкин нюх', variant21: 'Цепкое гнездо',
        variant22: 'Юркая для своих габаритов', variant23: 'Наседкина стойкость', variant24: 'Долгое сидение, зоркий глаз',
        variant25: 'Ускользающий клевок', variant26: 'Дикий клекот', variant27: 'Стойкое гнездо',
        variant28: 'Клевок наповал', variant29: 'Крепкая наседка', variant30: 'Гнездовая мощь',
        variant31: 'Клевок с оглядкой', variant32: 'Живучее гнездо', variant33: 'Юркая и клекочущая',
        variant34: 'Наседкина прыть', variant35: 'Быстрый клевок, крепкое гнездо'
    },
    // Треснушка — живое яйцо: скорлупа, трещина, желток, перекат, хруст.
    enem3: {
        variant1: 'Скорлупный кураж', variant2: 'Трещинная хватка', variant3: 'Скорлупа-таран',
        variant4: 'Перекатный напор', variant5: 'Меткий хруст', variant6: 'Бешеный треск',
        variant7: 'Скорлупный норов', variant8: 'Крепкая скорлупа', variant9: 'Ударный хруст',
        variant10: 'Живучий желток', variant11: 'Колючий скол', variant12: 'Хруст и вкатиться',
        variant13: 'Толстая скорлупа', variant14: 'Неутомимый треск', variant15: 'Пружинистый перекат',
        variant16: 'Острый взгляд, крепкий скол', variant17: 'Скорлупная удача', variant18: 'Верный хруст',
        variant19: 'Молниеносный перекат', variant20: 'Желтковый нюх', variant21: 'Цепкий скол',
        variant22: 'Юркая, несмотря на вес', variant23: 'Скорлупная стойкость', variant24: 'Долгий перекат, зоркий глаз',
        variant25: 'Ускользающий перекат', variant26: 'Дикий треск', variant27: 'Стойкий скол',
        variant28: 'Хруст наповал', variant29: 'Крепкая треснушка', variant30: 'Желтковая мощь',
        variant31: 'Перекат с оглядкой', variant32: 'Живучая скорлупа', variant33: 'Юркая и трескучая',
        variant34: 'Скорлупная прыть', variant35: 'Тяжёлый перекат, крепкий скол'
    },
    // Пыхтун — надутый индюк: зоб, веер, перо, бородка, пых.
    enem4: {
        variant1: 'Веерный кураж', variant2: 'Зобная хватка', variant3: 'Веер-таран',
        variant4: 'Пыхтящий напор', variant5: 'Меткий взмах', variant6: 'Бешеный пых',
        variant7: 'Индюшачий норов', variant8: 'Крепкий зоб', variant9: 'Ударный взмах',
        variant10: 'Живучий веер', variant11: 'Колючая бородка', variant12: 'Взмах наповал',
        variant13: 'Толстый зоб', variant14: 'Неутомимый пых', variant15: 'Пружинистый взмах',
        variant16: 'Острый взгляд, пёстрый веер', variant17: 'Индюшачья удача', variant18: 'Верный взмах',
        variant19: 'Молниеносный взмах', variant20: 'Индюшачий нюх', variant21: 'Цепкая бородка',
        variant22: 'Юркий, несмотря на хвост', variant23: 'Индюшачья стойкость', variant24: 'Долгий пых, зоркий глаз',
        variant25: 'Ускользающий взмах', variant26: 'Дикий пых', variant27: 'Стойкий зоб',
        variant28: 'Взмах наповал дважды', variant29: 'Крепкий пыхтун', variant30: 'Веерная мощь',
        variant31: 'Взмах с оглядкой', variant32: 'Живучий зоб', variant33: 'Юркий и пёстрый',
        variant34: 'Веерная прыть', variant35: 'Тяжёлый взмах, крепкая бородка'
    },
    // Кукарекало — золотистый петух: гребень, шпора, крик, хвост, коготь.
    enem5: {
        variant1: 'Гребневый кураж', variant2: 'Шпорная хватка', variant3: 'Гребень-таран',
        variant4: 'Крикливый напор', variant5: 'Меткий удар шпорой', variant6: 'Бешеное кукареканье',
        variant7: 'Петушиный норов', variant8: 'Крепкая шпора', variant9: 'Ударный выпад',
        variant10: 'Живучий гребень', variant11: 'Колючая шпора', variant12: 'Выпад наповал',
        variant13: 'Толстый хвост', variant14: 'Неутомимое кукареканье', variant15: 'Пружинистый выпад',
        variant16: 'Острый взгляд, крепкая шпора', variant17: 'Петушиная удача', variant18: 'Верный выпад',
        variant19: 'Молниеносная шпора', variant20: 'Петушиный нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий для своих габаритов', variant23: 'Петушиная стойкость', variant24: 'Долгий крик, зоркий глаз',
        variant25: 'Ускользающий выпад', variant26: 'Дикое кукареканье', variant27: 'Стойкий хвост',
        variant28: 'Выпад наповал дважды', variant29: 'Крепкое кукарекало', variant30: 'Золотистая мощь',
        variant31: 'Выпад с оглядкой', variant32: 'Живучий хвост', variant33: 'Юркий и звонкий',
        variant34: 'Петушиная прыть', variant35: 'Громкий крик, крепкая шпора'
    }
};
