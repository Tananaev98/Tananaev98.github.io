// Уровень 41 «Двор и ворота» — первый уровень области V «Беспокойная деревня».
// Баланс (HP боссов, damageMultiplier, фазы) НЕ пересчитывался заново — он уже
// был посчитан для этой точки кампании по формулам проекта, трогать не нужно.
//
// ПОЛНЫЙ РЕДИЗАЙН ГЕОМЕТРИИ АТАК (2026-09-16) — исходная версия этого файла
// оставляла расстановку атак 1:1 унаследованной от уровня-заглушки, менялись
// только имена/образы. Живая проверка (admin-boss-pattern-panel.html) вскрыла
// каскад: уровень 42 буквально копировал форму цепи 41 (100% совпадение по
// всем пяти боссам), 43 — по четырём из пяти, и далее ещё 8 уровней области
// унаследовали отдельные повторы от этого же источника. Плюс у Бобика и
// Фонарницы в bossAbilitiesDop физически не было пары «одинаковое начало —
// разный конец» (обязательный приём раздела 1.1.3 lvlData/Правила создания
// уровня.txt), и ни у одного из пяти боссов не было ни сигнатурной атаки, ни
// нежданчика. Ниже — geometry с нуля, по разделу «ПРИ СОЗДАНИИ УРОВНЯ ТЫ —
// ГЕЙМДИЗАЙНЕР» (начало lvlData/Правила создания уровня.txt): для каждого
// босса явно отвечено на 4 обязательных вопроса.
//
// БОБИК (пёс на цепи, cм. арт — цепь как аксессуар):
// 1) Кто: сторожевой пёс, засеченный посреди двора на цепи с двумя фиксированными
//    «привязями» (левый и правый угол двора).
// 2) Хитрость: ОБМАНЧИВАЯ ДЛИНА ЦЕПИ. Первую половину знакомства с боссом он
//    бьёт медленно и ровно строго из тех же двух точек — выглядит как
//    ограниченный по радиусу, безопасный на расстоянии. Ключевые комбо (same-
//    start) начинаются ТЕМ ЖЕ медленным ударом из той же точки, но
//    заканчиваются внезапным быстрым рывком С ТОЙ ЖЕ позиции — то есть «цепь»
//    оказывается длиннее, чем игрок успел выучить.
// 3) Привычка игрока: после уровней 1-40 игрок судит об опасности по видимой
//    дистанции атаки — «далеко и медленно» читается как «пока не касается
//    меня». Бобик наказывает именно это: медленная привязанная атака и резкий
//    рывок стартуют из ОДНОЙ и той же точки.
// 4) Честность: рывок — тот же customSpeed/telegraphMs диапазон, что и у любой
//    другой быстрой атаки уровня, никакого сокращения телеграфа задним числом
//    — обманывает распределение (когда), а не тайминг конкретного удара.
//
// КЛЕВАЧ (драчливый селезень):
// 1) Кто: территориальная кряква, реальные утки перед укусом мотают головой
//    строго от фланга к флангу.
// 2) Хитрость: ЖЁСТКАЯ АЛЬТЕРНАЦИЯ, которую он сам же нарушает. Большинство
//    атак идёт строго через раз Л-П-Л-П — игрок быстро выучивает ритм и
//    начинает угадывать сторону наперёд. Комбо-твист повторяет тот же фланг
//    ДВАЖДЫ подряд именно в тот момент, когда смена стороны казалась
//    гарантированной.
// 3) Привычка: игрок начинает смотреть не на текущую атаку, а на «следующую
//    ожидаемую сторону» — Клевач наказывает предугадывание, а не реакцию.
// 4) Честность: нарушение ритма — это ДРУГАЯ атака с полным своим телеграфом,
//    не невидимая подмена уже летящей.
//
// РАСТРЁПА (ожившая метла):
// 1) Кто: метла/веник, гоняет пыль по двору длинными низкими взмахами.
// 2) Хитрость: НИЗ ОБМАНЧИВО БЕЗОПАСЕН. Подавляющее большинство взмахов идёт
//    по самому низу поля — игрок учится держаться повыше и расслабляется в
//    верхней части экрана. Черенок метлы иногда взлетает ВЫСОКО (тот же старт
//    комбо, что и у безопасного низового взмаха) — редкая, но настоящая
//    угроза сверху у «низового» с виду босса.
// 3) Привычка: «эта угроза только по полу» — обобщение по одной оси (высоте),
//    ровно то допущение, которое Растрёпа ломает.
// 4) Честность: высокий взмах — тот же телеграф, что у любой быстрой атаки,
//    просто с ДРУГОЙ, не примеченной игроком стартовой позиции.
//
// ФОНАРНИЦА (ночная дозорная с фонарём):
// 1) Кто: сторожиха обходит двор с фонарём, светлая сторона — где горит фонарь.
// 2) Хитрость: СВЕТ ОБМАНЫВАЕТ. Основной массив атак — с «освещённой»
//    (левой) стороны, где, кажется, сосредоточено всё внимание дозорной.
//    Реальная угроза иногда приходит с ТЁМНОЙ (правой, необжитой) стороны —
//    именно там, где взгляд игрока меньше всего задерживается.
// 3) Привычка: «свет = опасность, тьма = безопасно» — интуитивная, но ложная
//    ассоциация, которую Фонарница использует против игрока напрямую.
// 4) Честность: тёмная атака подана НЕ мгновенно и без предупреждения — у неё
//    свой полноценный телеграф, просто с непривычной стороны поля.
//
// КОРЯГА (великан из коры и корней, финал уровня — раздел 1, правило K):
// 1) Кто: медленный неотвратимый исполин, тело — сросшиеся корни и кора.
// 2) Хитрость: ТЕЛО МЕДЛЕННОЕ, КОНЕЧНОСТЬ БЫСТРАЯ (архетип «энт») — большая
//    часть ударов подчёркнуто медленная и предсказуемая, готовит игрока к
//    мысли «у меня масса времени». Один резкий рывок ветвью с той же позиции
//    рушит это ощущение. Сигнатурная атака НЕ описана клишированной фразой
//    «смешивает почерк всех четверых» — вместо этого она буквально
//    ПОВТОРЯЕТ, в одной серии, конкретные приёмы предыдущих четырёх боссов:
//    рывок-с-той-же-позиции Бобика → повтор фланга Клевача → атака с
//    непримеченной стороны Фонарницы → высокий охват Растрёпы — то есть
//    экзаменует буквально то, чему научили предыдущие четыре, а не косметически
//    ссылается на них.
// 3) Привычка: «большой и медленный = есть время» — и вся тема финала именно
//    в том, что это верно почти всегда, но не факт, что каждый раз.
// 4) Честность: резкий рывок использует тот же честный телеграф, что и любая
//    быстрая атака уровня — редкость момента, а не подмена кадра, делает его
//    угрозой.
//
// Роспись персонажей (images/enemies/regions/5_dom_dvor/lvl41/) подобрана по
// РЕАЛЬНО сгенерированному арту, а не 1:1 по черновому списку из "идеи по
// уровням.txt" — там перечислена "Воротная цепь" отдельным персонажем, но
// готовой картинки именно самостоятельного цепного монстра в папке нет (есть
// цепь как аксессуар у пса). Вместо неё использован драчливый селезень (не
// гусь — зелёная голова, белое кольцо на шее, плоский клюв, как у кряквы) —
// тоже готовый арт в этой же папке, тематически двор/птичник ничуть не хуже.
let lvlNumber = 41;

// Полный профиль боя уровня: движок только исполняет эти настройки.
const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.791, damageMultiplier: 1.782, minWaveDelay: 2599, minShotDelay: 159, minTelegraphMs: 514,
	phases: [
		{ phase: 1, minHp: 0.672, cadence: 0.979, speed: 1.018, damage: 1, telegraphMultiplier: 0.979, surpriseChance: 0.081, maxActiveAttacks: 18 },
		{ phase: 2, minHp: 0.322, cadence: 0.792, speed: 1.181, damage: 1.07, telegraphMultiplier: 0.859, surpriseChance: 0.18, maxActiveAttacks: 22 },
		{ phase: 3, minHp: 0, cadence: 0.631, speed: 1.321, damage: 1.14, telegraphMultiplier: 0.759, surpriseChance: 0.28, maxActiveAttacks: 26 }
	],
	bosses: {
		enem1: { combatIdentity: "Длина привязи", combatTrick: "Короткая цепь из трёх звеньев ведёт от левого края вправо и возвращается к ошейнику. Обычные рывки меняют дальность внутри левой полосы. Ошибка — бить хвост вместо отмеченной головы.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 1.009, telegraphMs: 848, speedMultiplier: 1.035, damageMultiplier: 0.92, speedVariance: [1, 1.005, 1.01, 1.015, 1.02] },
		enem2: { combatIdentity: "Клюв возвращается", combatTrick: "Четыре звена проходят левую и правую сторону, затем возвращаются вправо. Обычные клевки собираются парами; последний правый клевок не завершает защиту.", signatureEvery: 3, movementStyle: 'weave', cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.025, damageMultiplier: 0.97, speedVariance: [1, 1.005, 1.01, 1.015, 1.02] },
		enem3: { combatIdentity: "Метла заметает обратно", combatTrick: "Пять звеньев: двойной левый взмах, правый вынос и обратное заметание. Обычные ускоряющиеся щепки меняют ширину левого веера. Ошибка — остаться справа после выноса.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.991, telegraphMs: 800, speedMultiplier: 1.045, damageMultiplier: 1.18, speedVariance: [1, 1.005, 1.01, 1.015, 1.02] },
		enem4: { combatIdentity: "Свет ведёт по кругу", combatTrick: "Шесть звеньев начинают справа, обходят левый край и возвращаются через правую середину. Обычные угрозы замирают и возобновляют полёт. Ошибка — принять паузу за конец атаки.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.971, telegraphMs: 770, speedMultiplier: 1.066, damageMultiplier: 1.02, speedVariance: [1, 1.005, 1.01, 1.015, 1.02] },
		enem5: { combatIdentity: "Корни замыкают двор", combatTrick: "Семь звеньев стягивают обе стороны двора: правая пара, левый захват, возврат и последнее левое замыкание. Обычные корни смещаются в полёте и оставляют поздний ответ. Ошибка — уйти бить босса после первого возврата.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.941, telegraphMs: 739, speedMultiplier: 1.076, damageMultiplier: 1.1, speedVariance: [1, 1.005, 1.01, 1.015, 1.02] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        name: 'enem11',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        name: 'enem22',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        name: 'enem33',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        name: 'enem44',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        name: 'enem55',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

    enem1: {
        name: 'enem1',
		dispName: 'Бобик',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/1.webp',
        baseHP: 7124,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '25%',
        deathAnimation: { preset: 'chainCollapse', durationMs: 1100 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Клевач',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/2.webp',
        baseHP: 42747,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '25%',
        deathAnimation: { preset: 'featherBurst', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Растрёпа',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/3.webp',
        baseHP: 56995,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '25%',
        deathAnimation: { preset: 'strawScatter', durationMs: 1400 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Фонарница',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/4.webp',
        baseHP: 170986,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '25%',
        deathAnimation: { preset: 'lanternDrop', durationMs: 1200 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Коряга',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/5.webp',
        baseHP: 213733,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '25%',
        deathAnimation: { preset: 'timberFall', durationMs: 1300 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 12;
 const bossInterval = 9;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Уровень 41 — расстановка атак унаследована от уже проверенной (безопасной по
 // экрану) схемы предыдущей версии этого файла, только имена/образы сменены на
 // деревенские — сами xPos/yPos/customSpeed не трогались, чтобы не тащить за
 // собой новый непроверенный баланс сложности вместе с новой темой и новой
 // механикой связанных пар одновременно.
 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые (speed≥16) — y≤12.

 const bossAbilities = [
	// ===== Бобик =====
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.15 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.15 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.15 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.15 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.15 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.63 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.48 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.33 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 29 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.15 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 33 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 34 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.15 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.15 }, // 36 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.15 }, // 37 h

	// ===== Клевач =====
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.63 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.48 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.33 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.18 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.35 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.35 }, // 44 h

	// ===== Растрёпа =====
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.63 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.48 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.33 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.18 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.03 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.65 }, // 38 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.65 }, // 39 h

	// ===== Фонарница =====
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.07 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.35 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.07 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.35 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.07 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.35 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.07 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.35 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.07 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.35 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.23 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.08 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.93 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.78 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.63 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.48 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.07 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.35 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.07 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.35 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.35 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.35 }, // 44 h

	// ===== Коряга =====
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.03 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.03 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.03 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.23 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.08 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.93 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.78 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.63 }, // 32 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.48 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.33 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.03 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 36 g
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 37 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 38 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 39 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.03 }, // 41 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 42 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 43 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 44 h
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 45 h
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.65 }, // 46 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.65 }, // 47 h

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 153, bossDelayAbDop: 8200, firstWaveDelayMs: 2400 }, // Короткая привязь и возврат
	{ boss: 'enem2', bossDelayAb: 153, bossDelayAbDop: 9000, firstWaveDelayMs: 2400 }, // Клевок парами с последним возвратом
	{ boss: 'enem3', bossDelayAb: 153, bossDelayAbDop: 9600, firstWaveDelayMs: 2400 }, // Заметание с обратным выносом
	{ boss: 'enem4', bossDelayAb: 153, bossDelayAbDop: 10400, firstWaveDelayMs: 2400 }, // Пауза перед продолжением обхода
	{ boss: 'enem5', bossDelayAb: 153, bossDelayAbDop: 11201, firstWaveDelayMs: 2400 }, // Корни замыкают несколько проходов
];

 const bossAbilitiesDop = [
	// Бобик
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 300], openingOrder: 0, label: "Рывок с возвратом" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 300], label: "Ложная длина привязи" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 0, 300], label: "Натиск из правой середины" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 0, 300, 300], label: "Возврат к ошейнику" },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [0, 0, 300, 300], label: "Второй рывок слева" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0], openingOrder: 1, label: "Цепь: Длина привязи" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31, 32], minPhase: 2, shotGapsMs: [0, 0, 300, 0], label: "Привязь тянет обратно" },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36, 37], minPhase: 3, shotGapsMs: [0, 0, 0, 300], label: "Последний сторожевой рывок" },

	// Клевач
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 0, 0, 0, 0], openingOrder: 0, label: "Двойной клевок у ворот" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 300, 0], label: "Разворот к левой паре" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [300, 0, 0, 0, 300], label: "Клевок после отступления" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [0, 0, 0, 0, 300], label: "Возврат между парами" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [0, 0, 0, 0, 300], label: "Правое эхо клевка" },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь: Клюв возвращается" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0], label: "Две пары вокруг левого клевка" },
	{ boss: 'enem2', indexAbilities: [39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [0, 0, 300, 0, 0], label: "Клевок после правой пары" },

	// Растрёпа
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], shotGapsMs: [0, 0, 0], openingOrder: 0, label: "Щепки левого веера" },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7], shotGapsMs: [0, 0, 0], label: "Заметание от ворот" },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11, 12], shotGapsMs: [0, 300, 300, 0], label: "Обратный вынос мусора" },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17], shotGapsMs: [300, 300, 0, 0], label: "Пыль возвращается влево" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22], shotGapsMs: [0, 0, 300, 300], label: "Заметающий разворот" },
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26, 27], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь: Метла заметает обратно" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 300], label: "Щепки за правой парой" },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37, 38, 39], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 300], label: "Последний обратный взмах" },

	// Фонарница
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 300, 300], openingOrder: 0, label: "Фонарь оставляет левый след" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [600, 0, 300, 300], label: "Замерший свет у ворот" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [600, 300, 0, 0], label: "Правая пара и левый след" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [0, 300, 0, 300, 600], label: "Свет возвращается через двор" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], shotGapsMs: [300, 0, 300, 300], label: "Отблеск после паузы" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь: Свет ведёт по кругу" },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [0, 0, 300, 600, 0], label: "Два следа за отблеском" },
	{ boss: 'enem4', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 600, 0], label: "Последний обход фонаря" },

	// Коряга
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 0, 600, 300, 300], openingOrder: 0, label: "Корни охватывают левый край" },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [600, 0, 600, 600, 0], label: "Тройной узел у ворот" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [300, 0, 300, 300, 0], label: "Левый захват корней" },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [600, 300, 300, 0, 600], label: "Замыкание после левой пары" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27], shotGapsMs: [0, 300, 0], label: "Корень без медленного вступления" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 300, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь: Корни замыкают двор" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [300, 600, 0, 0, 600], label: "Корни оставляют левый отросток" },
	{ boss: 'enem5', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [600, 0, 600, 300, 300, 300], label: "Последнее замыкание двора" },

];

// Лорные названия связок временных улучшений (см. UPGRADE_VARIANTS/
// getUpgradeVariantDisplayName в game.js) — «игрок забирает часть силы побеждённого
// босса», поэтому названия это свойства/черты, а не предметы. variantN — стабильный id
// из движка (порядок комбинаторного перебора статов: damage, critChance, critMultiplier,
// woundChance, heroHP, heroDefense, fireRate — i<j<k). Полностью авторский список на
// каждого из 5 боссов по отдельности (не общий трейт-список с падежом, по правилу
// проекта) — свой словарь образов на боссу (цепь/ошейник у пса, клюв/перо у селезня,
// прут/черенок у метлы, ключи/фонарь у сторожихи, кора/оглобля у хозяина), при этом
// адъектив на одной и той же позиции у всех пятерых может рифмоваться (как и в
// gameData1.js между зайцем/волком) — это ЖЕЛАТЕЛЬНО, отражает семантику одного и
// того же combo статов, а не шаблонность.
const UPGRADE_VARIANT_NAMES = {
    // Бобик — сторожевой зверь: цепь, ошейник, клык, загривок, рывок.
    enem1: {
        variant1: 'Цепной кураж', variant2: 'Стальная хватка', variant3: 'Ошейник-страж',
        variant4: 'Рваная цепь', variant5: 'Меткий бросок', variant6: 'Бешеный оскал',
        variant7: 'Цепной норов', variant8: 'Крепкий загривок', variant9: 'Ударный рывок',
        variant10: 'Живучий клык', variant11: 'Колючий загривок', variant12: 'Кусь и на цепь',
        variant13: 'Толстый загривок', variant14: 'Неутомимый рывок', variant15: 'Пружинистый скачок',
        variant16: 'Острый клык, зоркий нюх', variant17: 'Цепная удача', variant18: 'Верный прицел',
        variant19: 'Молниеносный бросок', variant20: 'Живучий нюх', variant21: 'Мёртвая хватка',
        variant22: 'Юркий укус', variant23: 'Цепная стойкость', variant24: 'Длинная цепь, зоркий глаз',
        variant25: 'Ускользающий рывок', variant26: 'Дикий норов', variant27: 'Стойкий укус',
        variant28: 'Укусил и на цепь', variant29: 'Крепкий пёс', variant30: 'Рвущая мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и цепкий',
        variant34: 'Цепная прыть', variant35: 'Быстрые лапы, крепкий загривок'
    },
    // Клевач — драчливый селезень (кряква): клюв, крыло, перо, кряканье, щип.
    enem2: {
        variant1: 'Утиный кураж', variant2: 'Клювастый удар', variant3: 'Стальные крылья',
        variant4: 'Шипящий наскок', variant5: 'Меткий щип', variant6: 'Бешеное кряканье',
        variant7: 'Утиное сердце', variant8: 'Крепкое перо', variant9: 'Крылатый удар',
        variant10: 'Живучий забияка', variant11: 'Колючее перо', variant12: 'Щип и в кусты',
        variant13: 'Толстые перья', variant14: 'Неутомимое кряканье', variant15: 'Пружинистый наскок',
        variant16: 'Острый клюв, зоркий глаз', variant17: 'Утиная удача', variant18: 'Верный щип',
        variant19: 'Молниеносный клюв', variant20: 'Чуткий слух', variant21: 'Цепкий коготь',
        variant22: 'Юркий щип', variant23: 'Утиная стойкость', variant24: 'Длинная шея, зоркий глаз',
        variant25: 'Ускользающий наскок', variant26: 'Дикое кряканье', variant27: 'Стойкий клюв',
        variant28: 'Щип и в пруд', variant29: 'Утиный напор', variant30: 'Хлопковая мощь',
        variant31: 'Наскок с оглядкой', variant32: 'Живучее перо', variant33: 'Юркий и шипящий',
        variant34: 'Утиная прыть', variant35: 'Быстрые крылья, крепкое перо'
    },
    // Растрёпа — ожившая утварь: прутья, черенок, пыль, взмах, вихрь.
    enem3: {
        variant1: 'Метельный кураж', variant2: 'Хлёсткий взмах', variant3: 'Прутяная хватка',
        variant4: 'Пыльный вихрь', variant5: 'Меткий мазок', variant6: 'Бешеный замах',
        variant7: 'Метельный норов', variant8: 'Крепкий черенок', variant9: 'Ударный взмах',
        variant10: 'Живучий прут', variant11: 'Колючая солома', variant12: 'Взмах и в пыль',
        variant13: 'Толстый черенок', variant14: 'Неутомимый взмах', variant15: 'Пружинистый мазок',
        variant16: 'Острый прут, меткий глаз', variant17: 'Метельная удача', variant18: 'Верный мазок',
        variant19: 'Молниеносный взмах', variant20: 'Живучая солома', variant21: 'Цепкий прут',
        variant22: 'Юркий мазок', variant23: 'Метельная стойкость', variant24: 'Длинный черенок, меткий глаз',
        variant25: 'Ускользающий взмах', variant26: 'Дикий вихрь', variant27: 'Стойкий прут',
        variant28: 'Взмах и след пылью', variant29: 'Крепкая метла', variant30: 'Пыльная мощь',
        variant31: 'Замах с оглядкой', variant32: 'Живучий черенок', variant33: 'Юркая и хлёсткая',
        variant34: 'Метельная прыть', variant35: 'Быстрые прутья, крепкий черенок'
    },
    // Фонарница — дозорная с фонарём и ключами: обход, оклик, дубинка.
    enem4: {
        variant1: 'Дозорный кураж', variant2: 'Меткий оклик', variant3: 'Связка ключей',
        variant4: 'Фонарный блеск', variant5: 'Меткий удар', variant6: 'Бешеный оклик',
        variant7: 'Дозорный норов', variant8: 'Крепкая хватка', variant9: 'Ударная дубинка',
        variant10: 'Живучий дозор', variant11: 'Колючий взгляд', variant12: 'Оклик и в тень',
        variant13: 'Толстый плащ', variant14: 'Неутомимый дозор', variant15: 'Пружинистый обход',
        variant16: 'Острый взгляд, зоркий глаз', variant17: 'Дозорная удача', variant18: 'Верный оклик',
        variant19: 'Молниеносный оклик', variant20: 'Дозорный нюх', variant21: 'Цепкая хватка ключей',
        variant22: 'Юркий обход', variant23: 'Дозорная стойкость', variant24: 'Долгий обход, зоркий глаз',
        variant25: 'Ускользающий шаг', variant26: 'Дикий оклик', variant27: 'Стойкий дозор',
        variant28: 'Оклик и в дверь', variant29: 'Крепкая сторожиха', variant30: 'Фонарная мощь',
        variant31: 'Обход с оглядкой', variant32: 'Живучий плащ', variant33: 'Юркая и зоркая',
        variant34: 'Дозорная прыть', variant35: 'Быстрый шаг, крепкая хватка'
    },
    // Коряга — статный великан из коры и дерева: оглобля, кряж, поступь.
    enem5: {
        variant1: 'Хозяйский кураж', variant2: 'Дубовая хватка', variant3: 'Оглобля-таран',
        variant4: 'Кряжистый напор', variant5: 'Меткий замах', variant6: 'Бешеный рык',
        variant7: 'Хозяйский норов', variant8: 'Крепкая кора', variant9: 'Ударный замах',
        variant10: 'Живучий хозяин', variant11: 'Колючая кора', variant12: 'Замах наповал',
        variant13: 'Толстая кора', variant14: 'Неутомимый замах', variant15: 'Пружинистый шаг',
        variant16: 'Острый взгляд, тяжёлая рука', variant17: 'Хозяйская удача', variant18: 'Верный замах',
        variant19: 'Молниеносный удар', variant20: 'Хозяйский нюх', variant21: 'Кряжистая хватка',
        variant22: 'Юркий для своих габаритов', variant23: 'Хозяйская стойкость', variant24: 'Тяжёлый шаг, зоркий глаз',
        variant25: 'Ускользающий манёвр', variant26: 'Дикий рык', variant27: 'Стойкий хозяин',
        variant28: 'Замах наповал дважды', variant29: 'Крепкий хозяин', variant30: 'Дубовая мощь',
        variant31: 'Удар с оглядкой', variant32: 'Живучая кора', variant33: 'Неутомимый и грозный',
        variant34: 'Хозяйская прыть', variant35: 'Тяжёлая поступь, крепкая хватка'
    }
};
