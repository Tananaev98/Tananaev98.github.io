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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.773, damageMultiplier: 1.782, minWaveDelay: 4301, minShotDelay: 174, minTelegraphMs: 503,
	phases: [
		{ phase: 1, minHp: 0.676, cadence: 1.024, speed: 1.025, damage: 1, telegraphMultiplier: 1.024, surpriseChance: 0.097, maxActiveAttacks: 21 },
		{ phase: 2, minHp: 0.326, cadence: 0.773, speed: 1.148, damage: 1.07, telegraphMultiplier: 0.853, surpriseChance: 0.197, maxActiveAttacks: 25 },
		{ phase: 3, minHp: 0, cadence: 0.613, speed: 1.282, damage: 1.14, telegraphMultiplier: 0.753, surpriseChance: 0.297, maxActiveAttacks: 29 }
	],
	bosses: {
		enem1: { combatIdentity: "Крыло задерживает щипок", combatTrick: "Гусь задерживает перо в полёте, пока с другого края идёт щипок. После левой пары остаётся внутренний правый ответ. Ошибка — принять остановленное перо за завершённый взмах.", signatureEvery: 3, movementStyle: 'pause', cadence: 1.026, telegraphMs: 891, speedMultiplier: 1.053, damageMultiplier: 0.93, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Гнездо отвечает изнутри", combatTrick: "Большинство клевков собирается у правой середины, но короткий левый выпад разрывает эту привычку. Цепь переносит голову с гнезда наружу и возвращает обратно. Ошибка — держать прицел неподвижно на гнезде.", signatureEvery: 3, movementStyle: 'straight', cadence: 1.009, telegraphMs: 855, speedMultiplier: 1.017, damageMultiplier: 0.98, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Скорлупа перекатывается обратно", combatTrick: "Волнистые осколки меняют сторону после короткой левой пары. Медленная скорлупка остаётся внутри обмена; цепь не заканчивается первым правым возвратом. Ошибка — заранее ждать осколки только с одной стороны.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.989, telegraphMs: 829, speedMultiplier: 1.037, damageMultiplier: 1.19, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Веер складывается в укол", combatTrick: "Перья разгоняются после напыщенного старта: левый веер переходит в правую середину и отвечает с другой левой точки. Цепь разворачивает веер в обратную сторону. Ошибка — запомнить только один конец веера.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.979, telegraphMs: 794, speedMultiplier: 1.083, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Крик предупреждает двойную шпору", combatTrick: "Самый долгий телеграф уровня предупреждает серию: правые шпоры сменяются левым размахом, затем возвращаются к правому проходу. Поздняя серия добавляет медленную угрозу слева и повторный правый удар. Ошибка — закончить защиту после первой пары шпор.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.949, telegraphMs: 996, speedMultiplier: 1.107, damageMultiplier: 1.12, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 15;
 const bossInterval = 9;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5 правил уровня: speed≥20
 // → yPos 5-10; speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).
 // xPos внутри одной стороны разнесены (не в узком диапазоне), см. урок 3.1.

 const bossAbilities = [
	// ===== Шипучка =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.51 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.59 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.51 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.59 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.51 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.59 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.51 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.59 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.51 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.59 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.01 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.76 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.51 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.26 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.01 }, // 34 f
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.51 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.59 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.51 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.59 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.59 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.59 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.59 }, // 47 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.91 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.66 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.41 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.16 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.91 }, // 52 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.66 }, // 53 i
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.41 }, // 54 i

	// ===== Квочка =====
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.53 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.53 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.53 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 17 c
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.53 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 23 d
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.53 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 29 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.17 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.92 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.67 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.42 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.53 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.53 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.73 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.07 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.82 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.57 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.32 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.07 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.82 }, // 53 i

	// ===== Треснушка =====
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.55, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.55, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.55, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.55, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.55, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.93, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.68, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.43, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 32 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.18, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.93, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.68, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.55, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 36 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.55, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 43 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 44 h
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.37, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.37, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.87, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.83, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 50 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.58, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 51 i
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.33, waveAmplitude: 4.37, waveFrequency: 2.23, wavePhase: 0.9 }, // 52 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.08, waveAmplitude: 2.31, waveFrequency: 1.23, wavePhase: 0 }, // 53 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.83, waveAmplitude: 3.33, waveFrequency: 1.83, wavePhase: 0.4 }, // 54 i

	// ===== Пыхтун =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.61 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.61 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.71 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.46 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.21 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.96 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.71 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.46 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.61 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.61 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.37 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.69 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.44 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.19 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.94 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.69 }, // 49 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.44 }, // 50 i
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.19 }, // 51 i

	// ===== Кукарекало =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.43 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.43 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.43 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.63 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.43 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.43 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.47 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.43 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.18 }, // 32 f
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.93 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.68 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.43 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.18 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.93 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.63 }, // 38 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.43 }, // 39 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.63 }, // 44 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.43 }, // 45 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 46 h
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 47 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 48 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 49 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.43 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.41 }, // 51 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.16 }, // 52 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.91 }, // 53 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.66 }, // 54 i
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.41 }, // 55 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.16 }, // 56 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.91 }, // 57 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 158, bossDelayAbDop: 9600, firstWaveDelayMs: 2300 }, // Крыло задерживает щипок
	{ boss: 'enem2', bossDelayAb: 156, bossDelayAbDop: 10200, firstWaveDelayMs: 2300 }, // Гнездо отвечает изнутри
	{ boss: 'enem3', bossDelayAb: 154, bossDelayAbDop: 10801, firstWaveDelayMs: 2300 }, // Скорлупа перекатывается обратно
	{ boss: 'enem4', bossDelayAb: 182, bossDelayAbDop: 7800, firstWaveDelayMs: 2300 }, // Веер складывается в укол
	{ boss: 'enem5', bossDelayAb: 158, bossDelayAbDop: 11800, firstWaveDelayMs: 2300 }, // Крик предупреждает двойную шпору
];

 const bossAbilitiesDop = [
	// Шипучка
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 300, 300, 300], openingOrder: 0, label: "Щипок за замершим крылом" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [600, 300, 300, 300, 300], label: "Перо возвращается к шее" },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [0, 0, 0, 300, 600], label: "Двойное перо и левый щипок" },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [300, 300, 300, 0, 600], label: "Шея не закончила выпад" },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [600, 0, 0, 600, 0], label: "Гусь щиплет повторно" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь крыла и клюва" },
	{ boss: 'enem1', indexAbilities: [35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [0, 300, 0, 0, 600], label: "Левое крыло держит ответ" },
	{ boss: 'enem1', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [600, 600, 0, 0, 0, 300], label: "Последний щипок после крыльев" },
	{ boss: 'enem1', indexAbilities: [48, 49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь рассерженного гуся" },

	// Квочка
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 0, 0, 300, 600], openingOrder: 0, label: "Три клевка и выпад из гнезда" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 0, 0, 600], label: "Клевок за левым отводом" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [600, 600, 0, 300, 0], label: "Гнездо возвращает прицел" },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [300, 300, 300, 0, 0], label: "Четвёртый клевок не последний" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [0, 300, 0, 0, 0], label: "Левый выпад перед гнездом" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 305, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь гнездовых клевков" },
	{ boss: 'enem2', indexAbilities: [34, 35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [300, 300, 0, 0, 0, 0], label: "Гнездо оставляет левое перо" },
	{ boss: 'enem2', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [600, 0, 0, 0, 0, 0], label: "Левый выпад возвращается дважды" },
	{ boss: 'enem2', indexAbilities: [48, 49, 50, 51, 52, 53], signature: true, isChain: true, minPhase: 3, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь с выносом из гнезда" },

	// Треснушка
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 300, 0, 0, 300], openingOrder: 0, label: "Скорлупка катится назад" },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [600, 300, 300, 0, 0], label: "Перекат с правым возвратом" },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [300, 0, 0, 300, 600], label: "Левый перекат и правое эхо" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [600, 0, 300, 300, 0], label: "Скорлупа не уходит с края" },
	{ boss: 'enem3', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [300, 600, 300, 300, 300], label: "Осколок за правой парой" },
	{ boss: 'enem3', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, isChain: true, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь перекатов скорлупы" },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 39, 40, 41, 42], minPhase: 2, shotGapsMs: [300, 0, 300, 600, 0, 300], label: "Третий перекат меняет край" },
	{ boss: 'enem3', indexAbilities: [43, 44, 45, 46, 47, 48, 49], minPhase: 3, shotGapsMs: [600, 0, 0, 300, 0, 0], label: "Правый осколок раскалывается" },
	{ boss: 'enem3', indexAbilities: [50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0], label: "Обратная цепь треснувшего яйца" },

	// Пыхтун
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Веер с правым концом" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 300], label: "Перо после левого веера" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 300, 0], label: "Правый веер возвращается влево" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [300, 0, 0, 0, 600], label: "Два правых пера раскрывают левый край" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [600, 300, 300, 300, 300], label: "Веер оставляет правую пару" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь раскрытого хвоста" },
	{ boss: 'enem4', indexAbilities: [33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [0, 0, 600, 600, 0], label: "Укол внутри сложенного веера" },
	{ boss: 'enem4', indexAbilities: [39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [0, 0, 0, 300, 600], label: "Последнее перо меняет конец" },
	{ boss: 'enem4', indexAbilities: [45, 46, 47, 48, 49, 50, 51], signature: true, isChain: true, minPhase: 3, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Обратная цепь индюшачьего веера" },

	// Кукарекало
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 0, label: "Крик перед правой парой" },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 11, 12], shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Три левых шпоры и ответ" },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16, 17, 18], shotGapsMs: [0, 0, 0, 0, 0], label: "Петух смыкает проходы" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24], shotGapsMs: [0, 0, 0, 0, 0], label: "Шпоры с повторным разворотом" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28, 29, 30], shotGapsMs: [0, 0, 0, 0, 0], label: "Три правых удара не конец" },
	{ boss: 'enem5', indexAbilities: [31, 32, 33, 34, 35, 36, 37], signature: true, isChain: true, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь петушиного размаха" },
	{ boss: 'enem5', indexAbilities: [38, 39, 40, 41, 42, 43], minPhase: 2, shotGapsMs: [300, 0, 600, 0, 600], label: "Шпора после правого смыкания" },
	{ boss: 'enem5', indexAbilities: [44, 45, 46, 47, 48, 49, 50], minPhase: 3, shotGapsMs: [600, 0, 0, 300, 0, 0], label: "Последний удар петушиного крика" },
	{ boss: 'enem5', indexAbilities: [51, 52, 53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 305, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь обратной петушиной атаки" },

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
