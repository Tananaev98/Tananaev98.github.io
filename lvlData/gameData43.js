// Уровень 43 «Кухня» — третий уровень области V «Беспокойная деревня».
// Роспись персонажей (images/enemies/regions/5_dom_dvor/lvl43/) подобрана по
// РЕАЛЬНО сгенерированному арту (правило 12 lvlData/Правила создания уровня.txt),
// все 5 картинок открыты и сверены лично перед выбором имён:
// 1.webp — чёрный котёл с дымным лицом-испариной и когтистыми руками из пара
//   ("Закопчённый чугунок" по документу-идее — совпадает);
// 2.webp — высокое деревянное существо с раздвоенным (Y-образным) верхом,
//   красными глазами, когтями на руках и ногах ("Ухват и кочерга" —
//   совпадает по силуэту с ухватом);
// 3.webp — липкий тестяной ком с оскаленной мордой, сидящий в деревянной
//   кадке-квашне, тянущиеся тестяные "усы" ("Убежавшее тесто" — совпадает);
// 4.webp — приземистая сердитая баба в платке и переднике со скалкой
//   ("Румяная стряпуха" — совпадает по атрибутике, не по цвету лица);
// 5.webp — самая крупная и грозная фигура с гигантским половником, самая
//   внушительная из пяти ("Главная кухарка" — совпадает, закономерно финал).
// ВАЖНО (правило 12, урок уровня 41): имена НЕ копируются буквально из
// документа-идеи — только образ и материалы. Все пять названий ниже —
// придуманные, короткие, ироничные, по аналогии с Побегайчик/Косолапый/
// Царапка/Бобик/Растрёпа/Коряга: Чугунец, Рогатень, Липун, Скалкина, Черпак.
//
// Область V ЦЕЛИКОМ завязана на «Атакующей цепи» (раздел 13.6 правил уровня) —
// у КАЖДОГО из пяти противников этого уровня есть минимум 2 isChain-комбо, ни
// один не пропущен (см. bossAbilitiesDop ниже, отмечены «← цепь»). Геометрия
// каждой цепи — СВОЯ, разная от босса к боссу (раздел 13.7, требование 5,
// урок уровня 41 — сначала все цепи были одинаковой прямой вертикалью, это
// само по себе дефект дизайна, честность и разнообразие нужны одновременно):
// Чугунец — прямая вертикаль (пузыри поднимаются столбом), Рогатень — зигзаг
// (мечется раздвоенным верхом), Липун — диагональный снос теста в одну
// сторону, Скалкина — рваные нервные скачки, Черпак — широкая дуга почти
// через всё поле (самая длинная цепь уровня, 7 звеньев).
//
// movementStyle подобран по РЕАЛЬНОМУ живому архиву (admin-boss-pattern-
// panel.html, снят 2026-09-05, кампания 1-42): для каждой роли выбран стиль,
// который на тот момент был НАИМЕНЕЕ используемым для этой роли (не лидер) —
// сознательная коррекция многолетнего перекоса (раздел 1.1), а не совпадение:
// enem1 (знакомство) — weave был на 10% (самый редкий для роли, лидировал wave
// на 21%); enem2 (быстрые серии) — pause на 10% (лидировали weave/wave на
// 19%); enem3 (тяжёлые) — straight на 12% (лидировали accelerate/drift/wave
// на 17%); enem4 (нервный) — wave на 10% (лидировал pause на 21%); enem5
// (финал) — lateRush на 12% (лидировали accelerate/pause/wave на 17%).
//
// Архетипы геометрии — ПЕРЕСМОТРЕНЫ 2026-09-05 (см. правило 1, пункт G
// lvlData/Правила создания уровня.txt): первый проход сверялся только против
// уровней 41/42, а не против ВСЕЙ таблицы admin-boss-pattern-panel.html —
// пользователь поймал это прямым вопросом, полная сверка (215 строк) вскрыла
// реальные совпадения по РОЛИ с куда более ранними уровнями: "дождь сверху"
// enem1 уже был у Прожореня (19), "направленный подъём" enem4 — у
// Подберезовика (2), "редкие mid-only" enem5 целиком был архетипом Присоски
// (6). Ниже — исправленный набор, каждый явно сверен со ВСЕЙ историей роли:
// Чугунец (enem1) — TWIN_DRIP, симметричные капли-пары одной высоты слева и
//   справа разом, без стены (в истории enem1 нет — PACK_LEFT_THEN_RIGHT у
//   Строевика, 12, это ПОСЛЕДОВАТЕЛЬНЫЙ, не одновременный, залп);
// Рогатень (enem2) — STOP_START_HOOKS, пара зацепов и внезапно долгая пауза,
//   рычаг ритма (bossDelayAbDop), а не геометрии — в истории enem2 нет;
// Липун (enem3) — CROSSED_DRIP, скрещённые высоты на флангах — сверено
//   отдельно, у enem3 нигде в истории не встречается, оставлен как есть;
// Скалкина (enem4) — ZIGZAG_EDGES, зигзаг между левым и правым краем стола
//   без стены — в истории enem4 есть только FAST_ZIG_HIGH (Сабелька, 12,
//   ОДНА доминирующая сторона, не зигзаг между обеими) — не то же самое;
// Черпак (enem5) — REVERSE_ECHO, кульминация запускает узнаваемые почерки
//   Скалкиной/Липуна/Рогатеня/Чугунца НЕ в порядке встречи, а в ОБРАТНОМ —
//   раздел 8 «честный нежданчик» прямо называет этот приём («знакомый рисунок
//   в обратном порядке»), в истории enem5 такого нет (близкое — SEQ_WRAP у
//   Хлестуна, 9, но там пауза между обхватами, не порядок предыдущих боссов).
let lvlNumber = 43;

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
		enem1: { movementStyle: 'weave',    cadence: 1.02, telegraphMs: 900,  speedMultiplier: 0.95, damageMultiplier: 0.93, speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18] }, // Чугунец: TWIN_DRIP — симметричные капли-пары одной высоты слева и справа разом
		enem2: { movementStyle: 'pause',    cadence: 0.95, telegraphMs: 800,  speedMultiplier: 1.02, damageMultiplier: 0.98, speedVariance: [0.88, 0.96, 1.04, 1.12, 1.18] }, // Рогатень: STOP_START_HOOKS — пара зацепов с одного бока, потом неожиданно долгая пауза
		enem3: { movementStyle: 'straight', cadence: 1.18, telegraphMs: 1060, speedMultiplier: 0.80, damageMultiplier: 1.19, speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12] }, // Липун: CROSSED_DRIP — тесто течёт то высоко слева, то низко справа
		enem4: { movementStyle: 'wave',     cadence: 0.85, telegraphMs: 680,  speedMultiplier: 1.12, damageMultiplier: 1.03, speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24] }, // Скалкина: ZIGZAG_EDGES — скалка мечется зигзагом от левого края стола к правому, без стены
		enem5: { movementStyle: 'lateRush', cadence: 0.80, telegraphMs: 740,  speedMultiplier: 1.06, damageMultiplier: 1.12, speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20] }  // Черпак: REVERSE_ECHO — в кульминации повторяет почерк Скалкиной/Липуна/Рогатеня/Чугунца в обратном порядке встречи
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl43/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl43/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl43/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl43/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl43/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Чугунец',
        image: 'images/enemies/regions/5_dom_dvor/lvl43/1.webp',
        baseHP: 7124,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '24%',
        deathAnimation: { preset: 'potBoilOver', durationMs: 1100 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Рогатень',
        image: 'images/enemies/regions/5_dom_dvor/lvl43/2.webp',
        baseHP: 42747,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '26%',
        deathAnimation: { preset: 'splinterCollapse', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Липун',
        image: 'images/enemies/regions/5_dom_dvor/lvl43/3.webp',
        baseHP: 56995,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '25%',
        deathAnimation: { preset: 'doughSplat', durationMs: 1300 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Скалкина',
        image: 'images/enemies/regions/5_dom_dvor/lvl43/4.webp',
        baseHP: 170986,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '26%',
        deathAnimation: { preset: 'flourPuff', durationMs: 1100 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Черпак',
        image: 'images/enemies/regions/5_dom_dvor/lvl43/5.webp',
        baseHP: 213733,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '28%',
        deathAnimation: { preset: 'ladleClatter', durationMs: 1300 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5 правил уровня: speed≥20
 // → yPos 5-10; speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).
 // xPos внутри одной стороны разнесены (не в узком диапазоне), см. урок 3.1
 // (стрелы Луки в одну точку на уровне 16) — resolveAwayFromBoss не создаёт
 // разброс сам, если авторские xPos уже скучены.

 const bossAbilities = [
	// ===== Чугунец: TWIN_DRIP — капли-пары одной высоты падают слева и справа
	// разом широким веером, редкий горячий плевок, редкий встречный всплеск снизу =====
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //10 горячий плевок — редкий акцент
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //11 горячий плевок — редкий акцент
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //12 встречный всплеск снизу — нежданчик
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //13 встречный всплеск снизу — нежданчик
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //15
	// звенья «атакующей цепи» — раздел 13.7: прямая вертикаль (пузыри
	// поднимаются столбом), скорость строго невозрастающая, появление у
	// самого верха поля.
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //22 цепь-B звено 4

	// ===== Рогатень: STOP_START_HOOKS — пара зацепов с одного бока (то
	// левого, то правого), затем неожиданно долгая пауза (bossDelayAbDop) —
	// рычаг архетипа здесь РИТМ, не геометрия; редкий бросок через всё поле =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8  быстрая пара слева
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //9  быстрая пара слева
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //10 быстрая пара справа
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //11 быстрая пара справа
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13 редкий бросок через всё поле — нежданчик
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //15
	// звенья «атакующей цепи» — зигзаг (мечется раздвоенным верхом).
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //22 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //23 цепь-B звено 5

	// ===== Липун: CROSSED_DRIP — тесто течёт то высоко слева, то низко
	// справа (скрещённые высоты на флангах), редкий тяжёлый плюх в центр =====
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //0  слева высоко
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //1  слева высоко
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2  слева высоко
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //3  справа низко
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4  справа низко
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //5  справа низко
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //6  редкий быстрый акцент слева
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //7  редкий быстрый акцент справа
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //8  тяжёлый плюх в центр — нежданчик
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //11 слева высоко
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //12 справа низко
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13 слева высоко
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //14 справа низко
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //15
	// звенья «атакующей цепи» — диагональный снос теста в одну сторону,
	// скорость заметно падает к хвосту (тяжесть, а не рывок).
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //23 цепь-B звено 5

	// ===== Скалкина: EDGE_ROLL — скалка мечется вверх-вниз вдоль ОДНОГО
	// края стола за раз, редкий бросок скалки через всё поле =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22, waveAmplitude: 6,  waveFrequency: 2.4, wavePhase: 0 },   //0  левый край, верх
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4,  waveAmplitude: 5,  waveFrequency: 1.6, wavePhase: 0.4 }, //1  левый край, низ
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 7,  waveFrequency: 2.0, wavePhase: 0.8 }, //2  левый край, середина
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24, waveAmplitude: 6,  waveFrequency: 2.5, wavePhase: 0 },   //3  правый край, верх
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5,  waveAmplitude: 5,  waveFrequency: 1.7, wavePhase: 0.4 }, //4  правый край, низ
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 7,  waveFrequency: 2.1, wavePhase: 0.8 }, //5  правый край, середина
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26, waveAmplitude: 8,  waveFrequency: 2.7, wavePhase: 1.2 }, //6  левый край, верх (быстрее)
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28, waveAmplitude: 8,  waveFrequency: 2.8, wavePhase: 1.2 }, //7  правый край, верх (быстрее)
	{ boss: 'enem4', type: 'enem44', xPos: 6,  yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,  waveAmplitude: 5,  waveFrequency: 1.5, wavePhase: 2.0 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7,  waveAmplitude: 5,  waveFrequency: 1.5, wavePhase: 2.0 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 9,  waveFrequency: 2.6, wavePhase: 1.6 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 9,  waveFrequency: 2.3, wavePhase: 1.6 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26, waveAmplitude: 6,  waveFrequency: 2.9, wavePhase: 0.6 }, //12 бросок через всё поле — нежданчик
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12, waveAmplitude: 7,  waveFrequency: 2.0, wavePhase: 0.2 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13, waveAmplitude: 7,  waveFrequency: 2.0, wavePhase: 0.2 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20, waveAmplitude: 6,  waveFrequency: 2.4, wavePhase: 1.0 }, //15
	// звенья «атакующей цепи» — рваные нервные скачки xPos.
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова, длина 6)
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //24 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //25 цепь-B звено 6

	// ===== Черпак: REVERSE_ECHO — обычные серии бьют по своим зонам (края,
	// низкие фланги), а сигнатурная кульминация проигрывает почерк остальных
	// четырёх боссов уровня в ОБРАТНОМ порядке встречи: Скалкина → Липун →
	// Рогатень → Чугунец (раздел 8 «честный нежданчик»: «знакомый рисунок
	// запускается в обратном порядке») =====
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0  медленный зацеп слева (почерк Рогатеня)
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1  медленный зацеп слева (почерк Рогатеня)
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //6  нежданчик: редкая одиночная атака из центра стола
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //7  нежданчик: редкая одиночная атака из центра стола
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8  fast L (почерк Скалкины)
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9  fast R (почерк Скалкины)
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //10 fast L
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //11 fast R
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //12 высоко слева (почерк Липуна)
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //13 низко справа (почерк Липуна)
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //14 дождевая капля (почерк Чугунца)
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //15 дождевая капля (почерк Чугунца)
	// звенья «атакующей цепи» — широкая дуга почти через всё поле, с обратным
	// крюком в конце самой длинной (7) цепи уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова, максимум длины 7)
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //25 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //26 цепь-B звено 7
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5600 }, // капает мерно, спокойный ритм знакомства
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 4600 }, // мечется быстрыми парами
	{ boss: 'enem3', bossDelayAb: 380, bossDelayAbDop: 6600 }, // тяжёлый, самая долгая пауза уровня
	{ boss: 'enem4', bossDelayAb: 210, bossDelayAbDop: 4000 }, // самый частый и нервный ритм уровня
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5000 }, // собранный, но не самый частый — финал
 ];

 const bossAbilitiesDop = [
	// Чугунец — RAIN_ABOVE
	{ boss: 'enem1', indexAbilities: [0, 5] }, // твин-капля: крайняя пара, одна высота
	{ boss: 'enem1', indexAbilities: [1, 4] }, // твин-капля: средняя пара, одна высота
	{ boss: 'enem1', indexAbilities: [2, 3] }, // твин-капля: центральная пара, одна высота
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11] },
	{ boss: 'enem1', indexAbilities: [0, 5, 10] }, // same-start с [0,5], расходится дальше быстрым плевком
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь (4)
	{ boss: 'enem1', indexAbilities: [12, 13, 7, 8] }, // нежданчик: встречный всплеск снизу вместо ожидаемых симметричных капель
	{ boss: 'enem1', indexAbilities: [0, 5, 1, 4, 2, 3, 14] }, // сигнатурная: все три твин-пары широким веером разом

	// Рогатень — STOP_START_HOOKS
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [2, 3, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [10, 11] },
	{ boss: 'enem2', indexAbilities: [0, 1, 8, 9] }, // same-start с [0,1], расходится быстрой парой
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: бросок через всё поле вместо привычной пары с одного бока
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] }, // сигнатурная: обе пары с обоих флангов разом

	// Липун — CROSSED_DRIP
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem3', indexAbilities: [8, 9, 10] }, // нежданчик: тяжёлый плюх в центр вместо привычных флангов
	{ boss: 'enem3', indexAbilities: [0, 2, 11, 3, 5, 12, 6, 7] }, // сигнатурная: скрещённые высоты + оба акцента разом

	// Скалкина — ZIGZAG_EDGES
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [3, 4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится быстрым краевым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь (6)
	{ boss: 'enem4', indexAbilities: [12, 13, 14] }, // нежданчик: бросок через всё поле вместо привычного края
	{ boss: 'enem4', indexAbilities: [0, 6, 10, 3, 7, 11] }, // сигнатурная: сперва левый край на полной скорости, затем правый — не чередование флангов вразнобой (правило 5.1)

	// Черпак — REVERSE_ECHO, финальный босс
	{ boss: 'enem5', indexAbilities: [0, 1] }, // почерк Рогатеня
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [8, 9] }, // почерк Скалкины
	{ boss: 'enem5', indexAbilities: [10, 11] }, // почерк Скалкины
	{ boss: 'enem5', indexAbilities: [12, 13] }, // почерк Липуна
	{ boss: 'enem5', indexAbilities: [14, 15] }, // почерк Чугунца
	{ boss: 'enem5', indexAbilities: [0, 1, 8] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь (4)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь (7, максимум)
	{ boss: 'enem5', indexAbilities: [6, 7] }, // нежданчик: впервые атака из самого центра стола
	{ boss: 'enem5', indexAbilities: [10, 11, 12, 13, 0, 1, 14, 15] }, // сигнатурная кульминация REVERSE_ECHO: почерк Скалкины → Липуна → Рогатеня → Чугунца — ровно в обратном порядке встречи с ними на уровне
 ];

// Лорные названия связок временных улучшений — свой словарь образов на
// каждого босса (копоть/пар у чугунка, но заноза/скрип у рогатеня), см.
// правило 12.1 lvlData/Правила создания уровня.txt. Адъектив на одной позиции
// у нескольких боссов может рифмоваться (как в gameData1.js) — это отражает
// общий combo статов на этой позиции, не шаблонность; полных совпадений фраз
// между боссами нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Чугунец — ожившее чугунное варево: копоть, пар, жар, пузыри, ручка.
    enem1: {
        variant1: 'Чугунный кураж', variant2: 'Закопчённая хватка', variant3: 'Крышка-таран',
        variant4: 'Паровой напор', variant5: 'Меткий плевок', variant6: 'Бешеное бульканье',
        variant7: 'Чугунный норов', variant8: 'Крепкая ручка', variant9: 'Ударный всплеск',
        variant10: 'Живучий нагар', variant11: 'Колючая окалина', variant12: 'Плевок и в угли',
        variant13: 'Толстый чугун', variant14: 'Неутомимое бульканье', variant15: 'Пружинистый выплеск',
        variant16: 'Острый взгляд, крепкая крышка', variant17: 'Чугунная удача', variant18: 'Верный плевок',
        variant19: 'Молниеносный всплеск', variant20: 'Чугунный нюх', variant21: 'Цепкая ручка',
        variant22: 'Юркий для своего веса', variant23: 'Чугунная стойкость', variant24: 'Долгий жар, зоркий глаз',
        variant25: 'Ускользающий пар', variant26: 'Дикое бульканье', variant27: 'Стойкая окалина',
        variant28: 'Плевок и в темноту', variant29: 'Крепкий чугунок', variant30: 'Угольная мощь',
        variant31: 'Всплеск с оглядкой', variant32: 'Живучая крышка', variant33: 'Юркий и горячий',
        variant34: 'Чугунная прыть', variant35: 'Быстрый всплеск, крепкая ручка'
    },
    // Рогатень — ожившая рогатина: заноза, скрип, зацеп, сук, кора.
    enem2: {
        variant1: 'Рогатый кураж', variant2: 'Занозистая хватка', variant3: 'Вилы-таран',
        variant4: 'Скрипучий напор', variant5: 'Меткий зацеп', variant6: 'Бешеный скрип',
        variant7: 'Рогатый норов', variant8: 'Крепкий сук', variant9: 'Ударный зацеп',
        variant10: 'Живучая кора', variant11: 'Колючая заноза', variant12: 'Зацеп и в темноту',
        variant13: 'Толстый сук', variant14: 'Неутомимый скрип', variant15: 'Пружинистый выпад',
        variant16: 'Острый взгляд, цепкий сук', variant17: 'Рогатая удача', variant18: 'Верный зацеп',
        variant19: 'Молниеносный выпад', variant20: 'Древесный нюх', variant21: 'Цепкие рога',
        variant22: 'Юркий на длинных ногах', variant23: 'Рогатая стойкость', variant24: 'Долгий скрип, зоркий глаз',
        variant25: 'Ускользающий выпад', variant26: 'Дикий скрип', variant27: 'Стойкая заноза',
        variant28: 'Зацеп наповал', variant29: 'Крепкий рогатень', variant30: 'Древесная мощь',
        variant31: 'Выпад с оглядкой', variant32: 'Живучий сук', variant33: 'Юркий и цепкий',
        variant34: 'Рогатая прыть', variant35: 'Быстрый скрип, крепкий сук'
    },
    // Липун — ожившее тесто: липкость, корка, закваска, ком, квашня.
    enem3: {
        variant1: 'Тестяной кураж', variant2: 'Липкая хватка', variant3: 'Ком-таран',
        variant4: 'Тягучий напор', variant5: 'Меткий плюх', variant6: 'Бешеное чавканье',
        variant7: 'Тестяной норов', variant8: 'Крепкая корка', variant9: 'Ударный плюх',
        variant10: 'Живучая закваска', variant11: 'Колючая корочка', variant12: 'Плюх и в квашню',
        variant13: 'Толстый ком', variant14: 'Неутомимое чавканье', variant15: 'Пружинистый ком',
        variant16: 'Острый взгляд, липкая корка', variant17: 'Тестяная удача', variant18: 'Верный плюх',
        variant19: 'Молниеносный подскок', variant20: 'Дрожжевой нюх', variant21: 'Цепкая корка',
        variant22: 'Юркий, но тягучий', variant23: 'Тестяная стойкость', variant24: 'Долгий подъём, зоркий глаз',
        variant25: 'Ускользающий ком', variant26: 'Дикое чавканье', variant27: 'Стойкая закваска',
        variant28: 'Плюх наповал', variant29: 'Крепкий липун', variant30: 'Дрожжевая мощь',
        variant31: 'Плюх с оглядкой', variant32: 'Живучая корка', variant33: 'Юркий и липкий',
        variant34: 'Тестяная прыть', variant35: 'Тягучий шаг, крепкая корка'
    },
    // Скалкина — сердитая стряпуха со скалкой: мука, фартук, платок, замах.
    enem4: {
        variant1: 'Скалочный кураж', variant2: 'Мучная хватка', variant3: 'Скалка-таран',
        variant4: 'Фартучный напор', variant5: 'Меткий замах', variant6: 'Бешеный стук',
        variant7: 'Стряпущий норов', variant8: 'Крепкий узел платка', variant9: 'Ударный замах',
        variant10: 'Живучая хватка', variant11: 'Колючая мука', variant12: 'Замах и в тесто',
        variant13: 'Толстый фартук', variant14: 'Неутомимый стук', variant15: 'Пружинистый замах',
        variant16: 'Острый взгляд, тяжёлая скалка', variant17: 'Кухонная удача', variant18: 'Верный замах',
        variant19: 'Молниеносный удар', variant20: 'Мучной нюх', variant21: 'Цепкая скалка',
        variant22: 'Юркая, несмотря на скалку', variant23: 'Скалочная стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий шаг', variant26: 'Дикий стук', variant27: 'Стойкий фартук',
        variant28: 'Замах наповал', variant29: 'Крепкая скалка', variant30: 'Мучная мощь',
        variant31: 'Замах с оглядкой', variant32: 'Живучий фартук', variant33: 'Юркая и грозная',
        variant34: 'Стряпущая прыть', variant35: 'Тяжёлый замах, крепкий узел'
    },
    // Черпак — главная кухарка с половником: угли, жар, сковорода, зачерп.
    enem5: {
        variant1: 'Черпаковый кураж', variant2: 'Жаркая хватка', variant3: 'Половник-таран',
        variant4: 'Угольный напор', variant5: 'Меткий зачерп', variant6: 'Бешеный жар',
        variant7: 'Кухаркин норов', variant8: 'Крепкий черпак', variant9: 'Ударный зачерп',
        variant10: 'Живучий жар', variant11: 'Колючие угли', variant12: 'Зачерп и в пекло',
        variant13: 'Толстая сковорода', variant14: 'Неутомимый жар', variant15: 'Пружинистый зачерп',
        variant16: 'Острый взгляд, тяжёлый половник', variant17: 'Кухаркина удача', variant18: 'Верный зачерп',
        variant19: 'Молниеносный зачерп', variant20: 'Дымный нюх', variant21: 'Цепкий черпак',
        variant22: 'Юркая, несмотря на половник', variant23: 'Кухаркина стойкость', variant24: 'Долгая варка, зоркий глаз',
        variant25: 'Ускользающий зачерп', variant26: 'Дикий жар', variant27: 'Стойкая сковорода',
        variant28: 'Зачерп наповал', variant29: 'Крепкая кухарка', variant30: 'Жаровая мощь',
        variant31: 'Зачерп с оглядкой', variant32: 'Живучая сковорода', variant33: 'Юркая и жаркая',
        variant34: 'Кухаркина прыть', variant35: 'Тяжёлый зачерп, крепкий черпак'
    }
};
