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
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 1.782,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	// Область V целиком: см. game.js executeBossEvent — комбо длиной 3-7 атак
	// на этом уровне автоматически становятся «атакующей цепью».
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.76, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { signatureEvery: 4, movementStyle: 'lateRush',   cadence: 1.03, telegraphMs: 920, speedMultiplier: 0.94, damageMultiplier: 0.92, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] }, // Бобик: CHAIN_REACH — та же точка привязи бьёт то медленно, то внезапным рывком
		enem2: { signatureEvery: 4, movementStyle: 'weave',      cadence: 1.00, telegraphMs: 860, speedMultiplier: 0.98, damageMultiplier: 0.97, speedVariance: [0.90, 0.96, 1.02, 1.08, 1.14] }, // Клевач: BROKEN_ALTERNATION — жёсткая Л-П альтернация, которую он сам же рвёт повтором фланга
		enem3: { signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.18, telegraphMs: 1080, speedMultiplier: 0.78, damageMultiplier: 1.18, speedVariance: [0.80, 0.86, 0.93, 1.00, 1.08] }, // Растрёпа: LOW_ILLUSION — низовые взмахи приучают не смотреть вверх, черенок иногда бьёт высоко
		enem4: { signatureEvery: 4, movementStyle: 'pause',      cadence: 0.90, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 1.02, speedVariance: [0.88, 0.98, 1.08, 1.16, 1.22] }, // Фонарница: LIGHT_DECEIT — свет фонаря ложно маркирует опасную сторону, угроза чаще из тьмы
		enem5: { signatureEvery: 4, movementStyle: 'drift',      cadence: 0.82, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 1.10, speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20] } // Коряга: SLOW_BODY_FAST_LIMB — экзамен: буквально повторяет приёмы предыдущих четырёх в одной серии
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Уровень 41 — расстановка атак унаследована от уже проверенной (безопасной по
 // экрану) схемы предыдущей версии этого файла, только имена/образы сменены на
 // деревенские — сами xPos/yPos/customSpeed не трогались, чтобы не тащить за
 // собой новый непроверенный баланс сложности вместе с новой темой и новой
 // механикой связанных пар одновременно.
 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые (speed≥16) — y≤12.

 const bossAbilities = [
	// ===== Бобик: CHAIN_REACH — та же точка привязи бьёт то медленно, то рывком =====
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0 привязь Л, медленно
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1 привязь П, медленно
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2 привязь Л, вариант
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3 привязь П, вариант
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //4 дремлет у будки Л
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //5 дремлет у будки П
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //6 РЫВОК с той же привязи Л
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //7 РЫВОК с той же привязи П
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8 РЫВОК Л, вариант
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 28 }, //9 РЫВОК П, вариант
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //10 цепь натягивается Л (переход)
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //11 цепь натягивается П (переход)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //12 дремлет по центру (редко)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //13 сорвался совсем — редкий центр
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //14 РЫВОК Л, ещё вариант
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //15 РЫВОК П, ещё вариант
	// звенья «атакующей цепи» — раздел 13.7. Цепь-A (irregular, 6): «сорвался с
	// цепи совсем» — рывок мечется по всему двору без единого шаблона, скорость
	// строго падает к хвосту. Цепь-B (vertical, 3): «натяжение у привязи» —
	// топчется почти на месте у одной точки.
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //20 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //21 цепь-A звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //22 цепь-B звено 1 (голова, vertical)
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //23 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //24 цепь-B звено 3

	// ===== Клевач: BROKEN_ALTERNATION — жёсткая Л-П альтернация, которую он сам рвёт =====
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //0 клюв Л
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //1 клюв П
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2 клюв Л, ниже
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //3 клюв П, ниже
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4 крыло Л, быстро
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5 крыло П, быстро
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //6 крыло Л, вариант
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7 крыло П, вариант
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //8 плавает по центру, спокойно
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 2 },  //9 плавает, вариант
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //10 наступает Л, средне
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //11 наступает П, средне
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 ПОВТОР Л (ломает альтернацию)
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //13 ПОВТОР П (ломает альтернацию)
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //14 берег Л
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15 берег П
	// звенья «атакующей цепи» — раздел 13.7. Цепь-A (irregular, 5): голова мечется
	// без явного шаблона, имитируя нервное мотание головой перед укусом. Цепь-B
	// (arc, 4): один плавный committed бросок-заход после всей нервотрёпки.
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //21 цепь-B звено 1 (голова, arc)
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4

	// ===== Растрёпа: LOW_ILLUSION — низ обманчиво безопасен, черенок бьёт высоко =====
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //0 низовой взмах Л
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //1 низовой взмах Ц
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2 низовой взмах П
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //3 низовой взмах, вариант Л
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4 низовой взмах, вариант П
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //5 пыльное облачко, спокойно
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //6 ВЫСОКИЙ взмах Л (та же стартовая позиция, что 0)
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //7 ВЫСОКИЙ взмах П
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //8 ВЫСОКИЙ взмах Ц, редкий и самый опасный
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //9 переходный, средняя высота Л
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //10 переходный, средняя высота П
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //11 широкий низовой Л
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //12 широкий низовой П
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 26 }, //13 ВЫСОКИЙ взмах Л, вариант
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //14 ВЫСОКИЙ взмах П, вариант
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //15 пыльное облачко, вариант
	// звенья «атакующей цепи» — раздел 13.7. Цепь-A (irregular, 5): дуга метлы
	// хаотично меняет направление у пола. Цепь-B (diagonal, 4): один долгий,
	// неотвратимый сметающий мазок через всё поле по прямой.
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem3', type: 'enem33', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //21 цепь-B звено 1 (голова, diagonal)
	{ boss: 'enem3', type: 'enem33', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //22 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //23 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //24 цепь-B звено 4

	// ===== Фонарница: LIGHT_DECEIT — свет ложно маркирует опасную сторону =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //0 патруль на свету
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //1 патруль на свету, вариант
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //2 патруль на свету, ниже
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //3 патруль на свету, у земли
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //4 резкий оклик, свет
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //5 резкий оклик, свет, вариант
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //6 удар ИЗ ТЬМЫ
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //7 удар ИЗ ТЬМЫ, вариант
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //8 спокойный обход, свет
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //9 спокойный обход, тьма (редкий)
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //10 переходный, свет
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //11 переходный, тьма
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //12 резкий оклик, свет, дальний
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //13 удар из тьмы, вариант
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //14 спокойный обход, свет, у земли
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //15 спокойный обход, тьма, у земли
	// звенья «атакующей цепи» — раздел 13.7. Цепь-A (irregular, 6): дозорная
	// мечется, свет мелькает то тут, то там без единого шаблона. Цепь-B
	// (zigzag, 4): резкая, чёткая проверка обоих флангов подряд.
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //20 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //21 цепь-A звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //22 цепь-B звено 1 (голова, zigzag)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //23 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //24 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //25 цепь-B звено 4

	// ===== Коряга: SLOW_BODY_FAST_LIMB — тело медленное, конечность быстрая =====
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0 медленный шаг Л
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1 медленный шаг П
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //2 медленный шаг Ц
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //3 медленный шаг Л, вариант
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //4 медленный шаг П, вариант
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //5 РЫВОК ветвью с той же позиции Л (эхо Бобика)
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //6 РЫВОК ветвью П
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //7 РЫВОК ветвью Ц, редкий
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 2 },  //8 скрип корней, спокойно
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //9 скрип корней, вариант
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //10 переходный Л
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //11 переходный П
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //12 ПОВТОР Л (эхо Клевача)
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //13 удар с дальней стороны (эхо Фонарницы)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //14 широкий охват сверху (эхо Растрёпы)
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //15 медленный шаг Л, у земли
	// звенья «атакующей цепи» — раздел 13.7. Цепь-A (diagonal, 5): медленное,
	// неотвратимое наступление корней через всё поле по прямой. Цепь-B
	// (vertical, 3): резкий, тесно локализованный рывок ветвью — тот самый
	// «быстрый конечность» на фоне «медленного тела».
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //16 цепь-A звено 1 (голова, diagonal)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 84, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //21 цепь-B звено 1 (голова, vertical)
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 280, bossDelayAbDop: 5200, firstWaveDelayMs: 2400 }, // рвётся с цепи часто
	{ boss: 'enem2', bossDelayAb: 320, bossDelayAbDop: 5600, firstWaveDelayMs: 2400 }, // мечется ритмично
	{ boss: 'enem3', bossDelayAb: 380, bossDelayAbDop: 6400, firstWaveDelayMs: 2400 }, // тяжёлая, долгая пауза между взмахами
	{ boss: 'enem4', bossDelayAb: 260, bossDelayAbDop: 5000, firstWaveDelayMs: 2400 }, // резкий оклик дозорной
	{ boss: 'enem5', bossDelayAb: 240, bossDelayAbDop: 4800, firstWaveDelayMs: 2304 }, // идёт без остановки
];

 const bossAbilitiesDop = [
	// ===== Бобик — CHAIN_REACH =====
	{ boss: 'enem1', indexAbilities: [0, 1] }, // обе привязи спокойно — знакомство
	{ boss: 'enem1', indexAbilities: [4, 5] }, // дремлет у обеих будок
	// same-start-diverging (раздел 1.1.3): [0] продолжается спокойно ИЛИ
	// внезапно рвётся рывком с ТОЙ ЖЕ позиции — это и есть вся хитрость Бобика.
	{ boss: 'enem1', indexAbilities: [0, 2] }, // продолжение: привязь держит
	{ boss: 'enem1', indexAbilities: [0, 6] }, // ОБМАН: та же привязь — рывок
	{ boss: 'enem1', indexAbilities: [1, 3] }, // симметрично для П
	{ boss: 'enem1', indexAbilities: [1, 7] }, // ОБМАН симметрично для П
	{ boss: 'enem1', indexAbilities: [10, 6, 11, 7] }, // сигнатурная: натяжение видно, оба рывка подряд
	{ boss: 'enem1', indexAbilities: [4, 13] }, // нежданчик: дремлет → сорвался в центр без натяжения
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], isChain: true }, // ← цепь: сорвался совсем (irregular, 6)
	{ boss: 'enem1', indexAbilities: [22, 23, 24], isChain: true }, // ← цепь: топчется у привязи (vertical, 3)

	// ===== Клевач — BROKEN_ALTERNATION =====
	{ boss: 'enem2', indexAbilities: [0, 1] }, // Л-П альтернация — знакомство с правилом
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] }, // альтернация продолжается медленнее
	{ boss: 'enem2', indexAbilities: [4, 5] }, // альтернация, быстрый вариант
	// same-start-diverging: [0,1] продолжается альтернацией ИЛИ рвётся повтором
	// того же фланга — прямой слом только что выученного ритма.
	{ boss: 'enem2', indexAbilities: [0, 1, 4, 5] }, // продолжение: альтернация держится
	{ boss: 'enem2', indexAbilities: [0, 1, 12] }, // ОБМАН: Л, П, снова Л (повтор)
	{ boss: 'enem2', indexAbilities: [1, 0, 13] }, // ОБМАН зеркально: П, Л, снова П
	{ boss: 'enem2', indexAbilities: [10, 4, 11, 5] }, // сигнатурная: медленное наступление в быструю альтернацию
	{ boss: 'enem2', indexAbilities: [8, 13] }, // нежданчик: спокойное плавание → внезапный повтор без альтернации
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь: нервное мотание головой (irregular, 5)
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24], isChain: true }, // ← цепь: committed заход после нервотрёпки (arc, 4)

	// ===== Растрёпа — LOW_ILLUSION =====
	{ boss: 'enem3', indexAbilities: [0, 1, 2] }, // низовые взмахи — знакомство, «он только по полу»
	{ boss: 'enem3', indexAbilities: [3, 4] }, // низовой вариант
	{ boss: 'enem3', indexAbilities: [5, 15] }, // пыльные облачка, спокойно
	// same-start-diverging: [0] продолжается низом ИЛИ взлетает высоко с той же
	// стартовой позиции — обман по оси «высота», а не по стороне.
	{ boss: 'enem3', indexAbilities: [0, 11] }, // продолжение: низ держится
	{ boss: 'enem3', indexAbilities: [0, 6] }, // ОБМАН: та же позиция — высокий взмах
	{ boss: 'enem3', indexAbilities: [2, 7] }, // ОБМАН симметрично справа
	{ boss: 'enem3', indexAbilities: [9, 6, 10, 7] }, // сигнатурная: подъём напряжения с обеих сторон в высокий взмах
	{ boss: 'enem3', indexAbilities: [1, 8] }, // нежданчик: спокойный центр → редчайший опасный высокий взмах в центре
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь: хаотичная дуга у пола (irregular, 5)
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24], isChain: true }, // ← цепь: неотвратимый сметающий мазок (diagonal, 4)

	// ===== Фонарница — LIGHT_DECEIT =====
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] }, // патруль на свету — «вот где опасность»
	{ boss: 'enem4', indexAbilities: [4, 5] }, // резкий оклик со света
	// same-start-diverging: [0,1] продолжается светом ИЛИ внезапно бьёт из тьмы
	// на противоположном фланге — обман по стороне поля, а не по позиции.
	{ boss: 'enem4', indexAbilities: [0, 1, 2] }, // продолжение: всё ещё на свету
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // ОБМАН: патруль на свету → удар из тьмы
	{ boss: 'enem4', indexAbilities: [0, 1, 7] }, // ОБМАН, вариант
	{ boss: 'enem4', indexAbilities: [10, 4, 11, 6] }, // сигнатурная: свет и тьма поднимают напряжение вместе, бьёт тьма
	{ boss: 'enem4', indexAbilities: [8, 9] }, // нежданчик: спокойный обход светом → спокойный обход тьмой (сам штиль — обман)
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], isChain: true }, // ← цепь: свет мелькает без шаблона (irregular, 6)
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25], isChain: true }, // ← цепь: резкая проверка обоих флангов (zigzag, 4)

	// ===== Коряга — SLOW_BODY_FAST_LIMB, финал уровня (правило K) =====
	{ boss: 'enem5', indexAbilities: [0, 1, 2] }, // медленные шаги — «у меня есть время»
	{ boss: 'enem5', indexAbilities: [3, 4] }, // медленный вариант
	{ boss: 'enem5', indexAbilities: [8, 9] }, // скрип корней, спокойно
	// same-start-diverging: [0] продолжается медленно ИЛИ внезапно рвётся
	// быстрой ветвью с той же позиции — прямой экзамен урока Бобика.
	{ boss: 'enem5', indexAbilities: [0, 3] }, // продолжение: всё ещё медленно
	{ boss: 'enem5', indexAbilities: [0, 5] }, // ОБМАН: та же позиция — рывок ветвью
	{ boss: 'enem5', indexAbilities: [1, 6] }, // ОБМАН симметрично
	{ boss: 'enem5', indexAbilities: [10, 11] }, // переходное напряжение с обеих сторон
	// сигнатурная кульминация уровня — НЕ клише «смешивает почерк всех
	// четверых»: буквально повторяет их конкретные приёмы одной серией —
	// рывок-с-той-же-позиции (Бобик) → повтор фланга (Клевач) → удар с дальней
	// стороны (Фонарница) → широкий охват сверху (Растрёпа).
	{ boss: 'enem5', indexAbilities: [5, 12, 13, 14] },
	{ boss: 'enem5', indexAbilities: [8, 7] }, // нежданчик: скрип корней → редкий опасный центральный рывок без разгона
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь: медленное неотвратимое наступление (diagonal, 5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23], isChain: true }, // ← цепь: резкий локализованный рывок ветвью (vertical, 3)
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
