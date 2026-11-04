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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.777, damageMultiplier: 1.782, minWaveDelay: 4000, minShotDelay: 169, minTelegraphMs: 507,
	phases: [
		{ phase: 1, minHp: 0.674, cadence: 1.023, speed: 1.03, damage: 1, telegraphMultiplier: 1.023, surpriseChance: 0.096, maxActiveAttacks: 20 },
		{ phase: 2, minHp: 0.324, cadence: 0.777, speed: 1.132, damage: 1.07, telegraphMultiplier: 0.852, surpriseChance: 0.195, maxActiveAttacks: 24 },
		{ phase: 3, minHp: 0, cadence: 0.617, speed: 1.222, damage: 1.14, telegraphMultiplier: 0.752, surpriseChance: 0.295, maxActiveAttacks: 28 }
	],
	bosses: {
		enem1: { combatIdentity: "Пузырь лопается второй каплей", combatTrick: "Правая пара кипящих капель распадается на левый плевок и обратное правое эхо. Цепь пара собирается вокруг повторного выброса. Ошибка — отбить первую каплю и принять вторую за её след.", signatureEvery: 3, movementStyle: 'weave', cadence: 1.013, telegraphMs: 886, speedMultiplier: 1.047, damageMultiplier: 0.93, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Зацеп продолжает замах", combatTrick: "Раздвоенный ухват задерживает один зацеп, пока второй проходит к другому краю. Цепь меняет плечо после пары звеньев. Ошибка — уйти с неподвижного зацепа до продолжения полёта.", signatureEvery: 3, movementStyle: 'pause', cadence: 1.007, telegraphMs: 849, speedMultiplier: 1.077, damageMultiplier: 0.98, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Тесто тянется за быстрым комом", combatTrick: "Медленная тягучая клякса справа прикрыта комками, переходящими между левой полосой и правой серединой. Цепь рвёт привычку считать последний левый ком концом замеса. Ошибка — заранее уйти бить квашню.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.987, telegraphMs: 819, speedMultiplier: 1.027, damageMultiplier: 1.19, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Скалка меняет край раскатки", combatTrick: "Короткий левый прокат сменяется правым уколом, затем возвращается к иной левой точке. В поздних сериях меняется конец проката. Ошибка — держать прицел на прежнем левом конце.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.977, telegraphMs: 785, speedMultiplier: 1.127, damageMultiplier: 1.03, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Половник возвращает разлив", combatTrick: "Сначала проходят две струи правой середины, затем левый разлив и правое смыкание. Медленная капля остаётся внутри обмена. Основная цепь держит парный ритм, альтернативная разрывает его возвратами. Ошибка — закончить защиту после первого разлива.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.947, telegraphMs: 755, speedMultiplier: 1.147, damageMultiplier: 1.12, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 14;
 const bossInterval = 9;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5 правил уровня: speed≥20
 // → yPos 5-10; speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).
 // xPos внутри одной стороны разнесены (не в узком диапазоне), см. урок 3.1
 // (стрелы Луки в одну точку на уровне 16) — resolveAwayFromBoss не создаёт
 // разброс сам, если авторские xPos уже скучены.

 const bossAbilities = [
	// ===== Чугунец =====
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.73 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.48 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.23 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.98 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.73 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.41 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.43 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.43 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.43 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.83 }, // 44 i
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.58 }, // 45 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.33 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.08 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.83 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.58 }, // 49 i

	// ===== Рогатень =====
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.33 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.47 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.33 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.47 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.47 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.33 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.47 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.47 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.33 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.47 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.33 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.47 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.67 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.42 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.17 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.92 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.33 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.47 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.47 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.33 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.47 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.47 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.57 }, // 44 i
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.32 }, // 45 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.07 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.82 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.57 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.32 }, // 49 i

	// ===== Липун =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.37 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.37 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.37 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.37 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.37 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.82 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.57 }, // 32 f
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.32 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.07 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.82 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.37 }, // 36 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.37 }, // 42 h
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 43 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 44 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.19 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.19 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.69 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 49 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.72 }, // 50 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 51 i
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.22 }, // 52 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.97 }, // 53 i
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.72 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.47 }, // 55 i

	// ===== Скалкина =====
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.37, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.12, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.87, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.62, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.37, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.12, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.43, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 37, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.43, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.47, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 43 i
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.22, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 44 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.97, waveAmplitude: 4.29, waveFrequency: 2.17, wavePhase: 0.9 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.72, waveAmplitude: 2.23, waveFrequency: 1.17, wavePhase: 0 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.47, waveAmplitude: 3.27, waveFrequency: 1.79, wavePhase: 0.4 }, // 47 i

	// ===== Черпак =====
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.39 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.39 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.39 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.39 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.39 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.43 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.18 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.93 }, // 32 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.68 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.43 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.18 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.93 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.39 }, // 37 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 38 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 39 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.39 }, // 44 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 45 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 46 h
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 47 h
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.39 }, // 48 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.39 }, // 49 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.39 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.53 }, // 51 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.28 }, // 52 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.03 }, // 53 i
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.78 }, // 54 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.53 }, // 55 i
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.28 }, // 56 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 157, bossDelayAbDop: 9300, firstWaveDelayMs: 2300 }, // Пузырь лопается второй каплей
	{ boss: 'enem2', bossDelayAb: 172, bossDelayAbDop: 10300, firstWaveDelayMs: 2300 }, // Зацеп продолжает замах
	{ boss: 'enem3', bossDelayAb: 157, bossDelayAbDop: 10800, firstWaveDelayMs: 2300 }, // Тесто тянется за быстрым комом
	{ boss: 'enem4', bossDelayAb: 184, bossDelayAbDop: 8000, firstWaveDelayMs: 2300 }, // Скалка меняет край раскатки
	{ boss: 'enem5', bossDelayAb: 157, bossDelayAbDop: 12300, firstWaveDelayMs: 2300 }, // Половник возвращает разлив
];

 const bossAbilitiesDop = [
	// Чугунец
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 300], openingOrder: 0, label: "Двойная капля с возвратом" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 0], label: "Кипение меняет столб" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 300, 0], label: "Второй пузырь держит край" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [300, 0, 0, 0], label: "Разрыв кипящей пары" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24, 25], shotGapsMs: [0, 0, 0, 0, 300], label: "Капли уходят влево" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29, 30], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь пузырей вокруг столба" },
	{ boss: 'enem1', indexAbilities: [31, 32, 33, 34, 35, 36], minPhase: 2, shotGapsMs: [0, 0, 0, 300, 0], label: "Третий выброс у края" },
	{ boss: 'enem1', indexAbilities: [37, 38, 39, 40, 41, 42, 43], minPhase: 3, shotGapsMs: [600, 0, 0, 600, 0, 300], label: "Пузырь после правого эха" },
	{ boss: 'enem1', indexAbilities: [44, 45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0], label: "Обратная цепь кипения" },

	// Рогатень
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 0], openingOrder: 0, label: "Зацеп после паузы" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [600, 0, 300, 300, 300], label: "Ухват возвращает левое плечо" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 0, 600], label: "Два зубца держат проход" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [600, 0, 0, 0, 0], label: "Ухват цепляет повторно" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27], shotGapsMs: [300, 0, 300, 300], label: "Кочерга отвечает справа" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь парных зацепов" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [300, 0, 0, 300, 600], label: "Рука за застывшим зубцом" },
	{ boss: 'enem2', indexAbilities: [38, 39, 40, 41, 42, 43], minPhase: 3, shotGapsMs: [600, 300, 300, 300, 600], label: "Зацеп с двойным концом" },
	{ boss: 'enem2', indexAbilities: [44, 45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0], label: "Рваная цепь железного хвата" },

	// Липун
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 0, 300], openingOrder: 0, label: "Клякса следует за комком" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [600, 300, 0, 0, 0], label: "Тесто тянется назад" },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [600, 600, 0, 300, 300], label: "Два комка и правая вязь" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 300, 600, 300], label: "Замес с повторным возвратом" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [600, 0, 0, 300, 300], label: "Левый ком не последний" },
	{ boss: 'enem3', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь липкого замеса" },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 39, 40, 41], minPhase: 2, shotGapsMs: [0, 0, 300, 600, 300], label: "Двойной правый разрыв" },
	{ boss: 'enem3', indexAbilities: [42, 43, 44, 45, 46, 47, 48], minPhase: 3, shotGapsMs: [300, 300, 0, 0, 300, 600], label: "Замес прилипает повторно" },
	{ boss: 'enem3', indexAbilities: [49, 50, 51, 52, 53, 54, 55], signature: true, isChain: true, minPhase: 3, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь порванного теста" },

	// Скалкина
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Прокат меняет левый конец" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 0], label: "Скалка возвращается к столу" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 300, 0], label: "Правый укол внутри проката" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 0, 0, 0], label: "Двойной удар по столу" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [0, 0, 0, 0], label: "Правый конец остаётся" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29, 30], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь раскатанных комков" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34, 35, 36], minPhase: 2, shotGapsMs: [0, 300, 300, 300, 600], label: "Прокат после правого укола" },
	{ boss: 'enem4', indexAbilities: [37, 38, 39, 40, 41, 42], minPhase: 3, shotGapsMs: [600, 300, 300, 0, 300], label: "Последний прокат возвращается" },
	{ boss: 'enem4', indexAbilities: [43, 44, 45, 46, 47], signature: true, isChain: true, minPhase: 3, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0], label: "Обратная цепь скалки" },

	// Черпак
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 0, label: "Черпак разливает обратно" },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 0, 300, 300], label: "Струя возвращается в котёл" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [0, 600, 300, 0, 0], label: "Капля за левым разливом" },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [600, 300, 0, 0, 600], label: "Двойной правый половник" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [300, 300, 300, 300, 0], label: "Левый разлив не окончен" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь парных разливов" },
	{ boss: 'enem5', indexAbilities: [37, 38, 39, 40, 41, 42, 43], minPhase: 2, shotGapsMs: [300, 0, 300, 0, 0, 600], label: "Половник смыкает дважды" },
	{ boss: 'enem5', indexAbilities: [44, 45, 46, 47, 48, 49, 50], minPhase: 3, shotGapsMs: [600, 600, 0, 0, 0, 0], label: "Третий разлив кухни" },
	{ boss: 'enem5', indexAbilities: [51, 52, 53, 54, 55, 56], signature: true, isChain: true, minPhase: 3, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь разбитого ритма" },

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
