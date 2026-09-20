// Уровень 74 «Разбойничья дубрава» — девятый уровень области VI «Глухой
// край» («Засечный лес»), обычный уровень (пять разных монстров), последний
// перед многофазным финалом области — уровнем 75 («Соловей-разбойник»).
// Продолжает сквозную механику «Баррикада» (раздел 16) и цепи (13.6/13.7/
// 13.8).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью:
// полная история 1-73 прогнана scratchpad/panelHistory.js — movementStyle по
// роли сверен с ПРАВИЛЬНЫМ окном последних 3 уровней (71/72/73). Пространство
// пар форм цепи (25/25) исчерпано для всех пяти ролей — раздел 13.8 применён
// с источниками, отличными от уровней 71-73.
//
// АРТ (images/enemies/regions/6_zasech_les/lvl74/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — крупная тёмная птица с пёстрым (чёрно-красно-белым) оперением,
//   когтистыми лапами, разинутым клювом — суть в ЧЕРНОБРОВОМ ТЕТЕРЕВЕ, что
//   взлетает при каждом громком свисте.
// 2.webp — гуманоид, укрытый плотным лиственным капюшоном до глаз, держит
//   боевой топор — суть в ДОЗОРЩИКЕ, что прячется среди ветвей.
// 3.webp — круглоголовое существо-пень с длинными когтистыми ветвями-руками,
//   без ног, приземистое, сердитое лицо — суть в ОЖИВШЕЙ ЗАСАДЕ, что хватает
//   проходящих.
// 4.webp — крупный бородатый гуманоид в меховой шапке с пером, держит
//   большой рог, на поясе кошели и подвески — суть в АТАМАНЕ С ТРЕМЯ
//   СИГНАЛЬНЫМИ РОЖКАМИ, что командует облавой.
// 5.webp (финал) — массивная фигура с полым пнём вместо головы (дупло),
//   выдувает воздух изо рта, когтистые руки, подвески на поясе — суть в
//   ПРИСПЕШНИКЕ СОЛОВЬЯ, чей свист валит с ног (прямая связь с уровнем 75,
//   «Соловей-разбойник»).
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА УРОВНЯ — «Разбойничья дубрава»: тетерев поднимает тревогу
// (Черноклюв), дозорщик прячется в листве (Шелестень), сама дубрава хватает
// когтями (Корчень), атаман командует облавой (Рожище), а его приспешник уже
// служит будущему хозяину леса — Соловью-разбойнику (Дуплень) — пять шагов
// приближения к главному злодею области, а не пять случайных монстров.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Черноклюв (от «чёрный
// клюв» — материал/окрас, не словарное «тетерев»); Шелестень (от «шелест»
// листвы — звук/материал маскировки, не словарное «дозорщик»/«разбойник»);
// Корчень (от «корч/коряга» — материал пня, не словарное «пень»/«засада», и
// не совпадает со «Коряга», уже занятым другим уровнем кампании); Рожище
// (аугментативная форма «рог» — суффикс по образцу «Урожаище»/«Баюнище», не
// словарное «атаман»/«главарь»); Дуплень (от «дупло» — материал полого
// пня, не словарное «приспешник»/«пень»). Проверено программно (grep по
// всем dispName всей кампании) — ни одно имя не встречается ранее.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА — письменно, ДО геометрии, для каждого:
//
// Черноклюв (enem1, movementStyle: weave, архетип «короткая колонна»):
//   1. Кто/почему: чернобровый тетерев — грузная птица, что взлетает при
//      каждом громком свисте, виляя в воздухе (weave).
//   2. Хитрость: сигнатурная серия открывает уровень тем же приёмом, что не
//      раз встречался в кампании — колонна ударов с одной стороны,
//      завершающаяся ударом с другой (same-start-different-end) — но здесь
//      колонна короче обычного (всего 2 удара до переключения, а не 3+),
//      поэтому переключение происходит раньше, чем игрок успевает
//      распознать в ней колонну.
//   3. Привычка игрока: игрок ждёт минимум 3 повтора, прежде чем
//      классифицировать серию как «колонну с одной стороны» (по опыту
//      прошлых уровней, где такие серии были длиннее) — здесь для перехода
//      достаточно всего одного повтора.
//   4. Честность: оба удара телеграфированы одинаково честно — наказывается
//      недооценка того, что даже короткая пара уже может готовить разворот,
//      не скорость реакции.
//
// Шелестень (enem2, movementStyle: pause, архетип «доля пути, а не
// расстояние, на грани порога»):
//   1. Кто/почему: дозорщик в лиственном капюшоне — прячется среди ветвей,
//      замирает (pause: остановка на 420мс при 42% пути), затем довершает
//      бросок.
//   2. Хитрость: порог паузы (42% пути) соответствует конкретной высоте
//      спавна (~yPos 36 при стандартной геометрии поля, см. Берестень,
//      уровень 73, — тот же порог, другая демонстрация). Сигнатурная пара
//      стартует ВСЕГО в 4% друг от друга по высоте (yPos 38 и 34) — одна уже
//      выше порога и замирает почти сразу, другая ещё ниже порога и должна
//      пролететь заметный путь первой.
//   3. Привычка игрока: игрок, видящий две почти одинаковые по высоте старта
//      атаки, ожидает от них почти одинакового поведения — здесь
//      незначительная разница высоты (всего 4%) полностью меняет момент
//      заморозки одной из них.
//   4. Честность: порог 42% — движковая константа, одна и та же для обеих
//      атак без исключений — наказывается предположение «раз высоты почти
//      совпадают — поведение тоже совпадёт», не скорость реакции.
//
// Корчень (enem3, movementStyle: accelerate, архетип «нет спокойной фазы
// вообще»):
//   1. Кто/почему: ожившая засада — коряжистый пень с длинными когтями, что
//      тянется к цели, набирая скорость по ходу движения (accelerate).
//   2. Хитрость: accelerate (0.72x→1.62x) разгоняется НЕПРЕРЫВНО с самого
//      первого кадра полёта — в отличие от lateRush (Частокольник/Ларень/
//      Подманень, уровни 71-73), где скорость держится РОВНОЙ до 55% пути и
//      лишь потом скачком меняется. У Корченя «спокойной фазы» нет вообще —
//      он уже разгоняется в момент, когда кажется, что только появился.
//   3. Привычка игрока: игрок, что научился на lateRush-боссах ждать
//      «плоский старт, потом скачок», переносит это ожидание на любую атаку,
//      которая визуально начинает «спокойно» — коготь Корченя обманывает
//      именно эту привычку, поскольку спокойного участка у него никогда не
//      было.
//   4. Честность: разгон работает по одной и той же непрерывной формуле для
//      каждой атаки этого босса без исключений — наказывается перенос
//      lateRush-ожидания на другой движковый эффект, не скорость реакции.
//
// Рожище (enem4, movementStyle: wave, архетип «тревожность на вид не значит
// ближе»):
//   1. Кто/почему: атаман с большим рогом — трубит сигнал, что усиливается с
//      каждым эхом, виляя в полёте (wave).
//   2. Хитрость: сигнатурная серия — три сигнала подряд с НАРАСТАЮЩИМИ
//      амплитудой И частотой одновременно (в отличие от Силовеня, уровень
//      72, менявшего только частоту, и Жерденя, уровень 73, менявшего
//      только амплитуду) — визуально каждый следующий сигнал выглядит
//      заметно тревожнее предыдущего, но интервал появления и скорость
//      падения не меняются вовсе.
//   3. Привычка игрока: нарастающая визуальная тревожность заставляет игрока
//      готовиться к ускоряющейся угрозе — на деле темп прилёта абсолютно
//      ровный на всём протяжении серии.
//   4. Честность: амплитуда и частота — единственное, что меняется;
//      интервал появления и скорость падения одинаковы для всех трёх
//      сигналов — наказывается вывод «выглядит тревожнее — значит, ближе»,
//      не скорость реакции.
//
// Дуплень (enem5, финал уровня, movementStyle: lateRush, архетип «порог
// движения зависит от высоты спавна» — капстоун всей связки 71-74):
//   1. Кто/почему: приспешник Соловья-разбойника — дуплистый пень, что
//      выдувает воздух через дупло, довершая бросок рывком (lateRush); как
//      финал уровня, обязан проверить навыки предыдущих четырёх и завершить
//      сквозную линию порогов движения (pause@42% у Шелестеня, здесь —
//      lateRush@55%).
//   2. Хитрость: порог рывка (55% пути) соответствует высоте спавна
//      ~yPos 45 — сигнатурная атака стартует ВЫШЕ этого порога (yPos 50), а
//      значит рывок (1.48x) действует уже с ПЕРВОГО КАДРА полёта:
//      «спокойной» фазы, которую игрок привык видеть у Частокольника/
//      Лареня/Подманеня (уровни 71-73), здесь попросту не существует
//      физически — она вся «срезана» стартовой высотой, парная атака рядом
//      стартует ниже порога (yPos 20) и честно показывает спокойную фазу
//      для контраста.
//   3. Привычка игрока: за три предыдущих lateRush-боссов игрок выучил
//      «сначала спокойно, потом рывок» как универсальное правило этого
//      движкового эффекта — здесь высота спавна делает калиброванную часть
//      правила («сначала») невидимой, хотя правило по сути то же самое.
//   4. Честность: порог 55% — та же самая движковая константа, что и у
//      любого lateRush-босса кампании (не исключение для Дупленя) —
//      наказывается уверенность, что «спокойная фаза» гарантированно видна,
//      не скорость реакции.
//
// ДВИЖЕНИЕ (movementStyle) — окно «последние 3» = 71/72/73: Черноклюв —
// weave (роль enem1: 71 lateRush, 72 wave, 73 pause — не использовался);
// Шелестень — pause (роль enem2: 71 accelerate, 72 weave, 73 wave — не
// использовался); Корчень — accelerate (роль enem3: 71 drift, 72 lateRush,
// 73 straight — не использовался); Рожище — wave (роль enem4: 71 weave, 72
// pause, 73 lateRush — не использовался); Дуплень — lateRush (роль enem5:
// 71 straight, 72 drift, 73 weave — не использовался). Пять стилей уровня
// различны между собой.
//
// ЦЕПИ (13.6/13.7/13.8) — пространство пар форм (25/25) исчерпано для всех
// ролей — источники сознательно взяты НЕ из уровней 71-73 (свежесть):
// Черноклюв — vertical(7)+zigzag(6), источник vertical+zigzag — уровень 52
//   (@3+4) — исключение: длина увеличена (7+6 vs 3+4);
// Шелестень — irregular(6)+irregular(7), источник irregular+irregular —
//   уровень 53 (@5+5) — исключение: длина увеличена (6+7 vs 5+5);
// Корчень — vertical(7)+zigzag(7), источник vertical+zigzag — уровень 54
//   (@6+7) — исключение: первая цепь удлинена (7 vs 6);
// Рожище — arc(6)+zigzag(7), источник arc+zigzag — уровень 55 (@4+5) —
//   исключение: длина увеличена (6+7 vs 4+5);
// Дуплень — vertical(7)+irregular(7), источник vertical+irregular —
//   уровень 56 (@4+6) — исключение: длина увеличена (7+7 vs 4+6).
// Формы всех пяти пар подтверждены программным классификатором ДО записи
// (scratchpad/verifyShapes.js). Скорость вдоль каждой цепи невозрастающая
// (лесенка 18→…→6/7), yPos всех звеньев — 26 (граница движка
// CHAIN_MAX_SPAWN_Y). Ни одна barricade-способность не входит в isChain-
// комбо (ограничение раздела 16.4).
//
// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — КАЖДОЕ комбо из 2+ способностей
// посчитано scratchpad/designCalc.js ДО записи и повторно прогнано целиком
// через scripts/combo-audit.js — разброс прилётов у каждого комбо в пределах 112-1499мс (см. трейлинг-комментарии), ни одно комбо не состоит из
// двух и более genuinely медленных (customSpeed≤8) атак без быстрого
// элемента.
//
// БАРРИКАДЫ (раздел 16) — эскалация 1:1 с ролью: Черноклюв 3 удара/1200мс,
// Шелестень 4/1600, Корчень 5/2000, Рожище 6/2400, Дуплень 7/2800 —
// barricadePauseMs = barricadeHits×400 (раздел 16.2) без исключений.
// ПЕРЕРАСКЛАДКА ПО ВСЕМ ПЕРЕМЕННЫМ БОЯ (2026-09-19, по прямому требованию «никаких
// повторов от уровня к уровню»): скаляры уровня, фазы, профили боссов, паузы
// между атаками, множители рывка баррикад, геометрия филлерных атак и
// структура комбо выбраны уникальными относительно всех уровней 61-74
// (scripts/level-diversity-report.js — 0 повторов). Сигнатурные атаки и их
// комбо (описанные в 4 вопросах ниже) не тронуты — только слегка
// подправлены скорость/xPos там, где новая модель времени (растяжка быстрых
// противоположных флангов движком + все три фазы, scripts/combo-model.js)
// этого требовала. Числа разброса в трейлинг-комментариях комбо ниже
// пересчитаны заново по этой модели (фаза 1).
let lvlNumber = 74;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.016,
	damageMultiplier: 1.707,
	minWaveDelay: 2870,
	minShotDelay: 166,
	minTelegraphMs: 644,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.685, cadence: 1.026, speed: 0.985, damage: 0.971, telegraphMultiplier: 1.02, surpriseChance: 0.0615, maxActiveAttacks: 11 },
		{ phase: 2, minHp: 0.36, cadence: 0.94, speed: 1.042, damage: 1.144, telegraphMultiplier: 0.97, surpriseChance: 0.1025, maxActiveAttacks: 15 },
		{ phase: 3, minHp: 0.00, cadence: 0.747, speed: 1.156, damage: 1.192, telegraphMultiplier: 0.939, surpriseChance: 0.168, maxActiveAttacks: 14 }
	],
	bosses: {
		enem1: { combatIdentity: "Короткий взлёт черноклюва", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4, movementStyle: 'weave', cadence: 0.910, telegraphMs: 1005, speedMultiplier: 0.910, damageMultiplier: 1.005,
			speedVariance: [0.83, 0.94, 1.05, 1.16, 1.27]
		}, // Черноклюв: WING_FEINT — короткая (2 удара) колонна на одной стороне, переключение раньше ожидаемого
		enem2: { combatIdentity: "Шелест перед двойным выходом", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'pause', cadence: 0.905, telegraphMs: 965, speedMultiplier: 0.915, damageMultiplier: 1.085,
			speedVariance: [0.85, 0.92, 0.99, 1.06, 1.13]
		}, // Шелестень: THRESHOLD_EDGE — крошечная разница высоты спавна возле порога паузы полностью меняет поведение
		enem3: { combatIdentity: "Корч тянется и перехватывает", combatTrick: "короткий первый заход продолжается более быстрым довеском с прежнего края", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.010, telegraphMs: 785, speedMultiplier: 1.035, damageMultiplier: 1.145,
			speedVariance: [0.79, 0.86, 0.93, 1.00, 1.07]
		}, // Корчень: CLAW_CREEP — непрерывный разгон с первого кадра, без «спокойной» фазы lateRush
		enem4: { combatIdentity: "Рожок зовёт ответ с другого края", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'wave', cadence: 1.005, telegraphMs: 825, speedMultiplier: 1.000, damageMultiplier: 1.125,
			speedVariance: [0.82, 0.93, 1.04, 1.15, 1.26]
		}, // Рожище: HORN_CRESCENDO — растущие амплитуда и частота не меняют реальный темп прилёта
		enem5: { combatIdentity: "Дупло возвращает удар", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.065, telegraphMs: 875, speedMultiplier: 0.995, damageMultiplier: 1.075,
			speedVariance: [0.81, 0.90, 0.99, 1.08, 1.17]
		} // Дуплень: HOLLOW_RUSH — старт выше порога рывка убирает «спокойную» фазу целиком
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl74/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl74/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl74/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl74/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl74/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Черноклюв',
		image: 'images/enemies/regions/6_zasech_les/lvl74/1.webp',
		baseHP: 19931,
		baseSpeed: 0,
		baseDamage: 19.60,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Шелестень',
		image: 'images/enemies/regions/6_zasech_les/lvl74/2.webp',
		baseHP: 49829,
		baseSpeed: 0,
		baseDamage: 21.60,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Корчень',
		image: 'images/enemies/regions/6_zasech_les/lvl74/3.webp',
		baseHP: 88158,
		baseSpeed: 0,
		baseDamage: 23.60,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Рожище',
		image: 'images/enemies/regions/6_zasech_les/lvl74/4.webp',
		baseHP: 141820,
		baseSpeed: 0,
		baseDamage: 25.60,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Дуплень',
		image: 'images/enemies/regions/6_zasech_les/lvl74/5.webp',
		baseHP: 214646,
		baseSpeed: 0,
		baseDamage: 28.40,
		spawnWeight: 5,
		baseExp: 0,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 1000 }
	},

};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 10;
const bossInterval = 6;

//spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

// Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
// speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

const bossAbilities = [
	// ===== Черноклюв: WING_FEINT — короткая (2 удара) колонна на одной
	// стороне, переключение раньше ожидаемого =====
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //0 — сигнатура: левый удар, часть 1
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //1 — сигнатура: тот же левый, часть 2 (короткая колонна)
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //2 — сигнатура: переключение вправо
	{ boss: 'enem1', type: 'enem11', xPos: 37, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 23 }, //3 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 27, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 23 }, //4 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //5 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 36, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //6 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //9 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 23 }, //10 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 64, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, //11 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //12 — быстрая атака
	// БАРРИКАДА (раздел 16): плотный ком перьев, что не разлетается сразу.
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.160 }, //13b
	// звенья цепи A — vertical(7): раздел 13.8, пара vertical+zigzag
	// переиспользована из уровня 52 (@3+4), длина увеличена (7+6).
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //14 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //15 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //16 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //17 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //18 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //19 цепь-A звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //20 цепь-A звено 7
	// звенья цепи B — zigzag(6): резкий частый разброс.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //23 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //26 цепь-B звено 6

	// ===== Шелестень: THRESHOLD_EDGE — крошечная разница высоты спавна
	// возле порога паузы полностью меняет поведение =====
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //0 — сигнатура: чуть выше порога — замирает почти сразу
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //1 — сигнатура: чуть ниже порога — заметно летит первой
	{ boss: 'enem2', type: 'enem22', xPos: 38, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //2 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //3 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //4 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //5 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 38, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 44, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //8 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //9 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 23 }, //10 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //11 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 57, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 }, //12 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// БАРРИКАДА (раздел 16): плотный ворох листвы, что не поддаётся сразу.
	{ boss: 'enem2', type: 'enem22', xPos: 64, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.335 }, //14b
	// звенья цепи A — irregular(6): раздел 13.8, пара irregular+irregular
	// переиспользована из уровня 53 (@5+5), длина увеличена (6+7).
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //15 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 37, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //16 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //17 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 44, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //18 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 57, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //19 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //20 цепь-A звено 6
	// звенья цепи B — irregular(7): непредсказуемый разброс.
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 43, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //24 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //25 цепь-B звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //26 цепь-B звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //27 цепь-B звено 7

	// ===== Корчень: CLAW_CREEP — непрерывный разгон с первого кадра, без
	// «спокойной» фазы lateRush =====
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //0 — сигнатура: непрерывный разгон, часть 1
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //1 — сигнатура: непрерывный разгон, часть 2
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //2 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 39, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, //3 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 79, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //4 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //5 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //9 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //10 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 74, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //11 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //12 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 59, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //13 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //14 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //15 — средняя атака
	// БАРРИКАДА (раздел 16): узловатый корень, что не выкорчевывается сразу.
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.445 }, //16b
	// звенья цепи A — vertical(7): раздел 13.8, пара vertical+zigzag
	// переиспользована из уровня 54 (@6+7), первая цепь увеличена (7 vs 6).
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //19 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //20 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 59, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //21 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //22 цепь-A звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //23 цепь-A звено 7
	// звенья цепи B — zigzag(7): резкий частый разброс.
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //24 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //25 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //26 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 59, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //27 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //28 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //29 цепь-B звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //30 цепь-B звено 7

	// ===== Рожище: HORN_CRESCENDO — растущие амплитуда и частота не меняют
	// реальный темп прилёта =====
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 5, waveFrequency: 0.9, wavePhase: 0 }, //0 — сигнатура: первый сигнал, тихий
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 8, waveFrequency: 1.3, wavePhase: 0 }, //1 — сигнатура: второй сигнал, громче
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 11, waveFrequency: 1.7, wavePhase: 0 }, //2 — сигнатура: третий сигнал, самый тревожный на вид, тот же темп прилёта
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21, waveAmplitude: 5, waveFrequency: 1.5, wavePhase: 0 }, //3 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 47, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20, waveAmplitude: 8, waveFrequency: 1.4, wavePhase: 0 }, //4 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13, waveAmplitude: 6, waveFrequency: 1.5, wavePhase: 0 }, //5 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 9, waveFrequency: 1.1, wavePhase: 0 }, //6 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5, waveAmplitude: 8, waveFrequency: 1.5, wavePhase: 0 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 23, waveAmplitude: 8, waveFrequency: 1.5, wavePhase: 0 }, //9 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20, waveAmplitude: 9, waveFrequency: 1.1, wavePhase: 0 }, //10 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 5, waveFrequency: 1.2, wavePhase: 0 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 56, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24, waveAmplitude: 8, waveFrequency: 1.5, wavePhase: 0 }, //12 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //13 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17, waveAmplitude: 7, waveFrequency: 1.4, wavePhase: 0 }, //14 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19, waveAmplitude: 8, waveFrequency: 1.3, wavePhase: 0 }, //15 — быстрая атака
	// БАРРИКАДА (раздел 16): вбитый рог-сигнал, что не срывается сразу.
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 ,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.545 }, //16b
	// звенья цепи A — arc(6): раздел 13.8, пара arc+zigzag переиспользована
	// из уровня 55 (@4+5), длина увеличена (6+7).
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //18 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 57, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //19 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //20 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //21 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //22 цепь-A звено 6
	// звенья цепи B — zigzag(7): резкий частый разброс.
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //24 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //25 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //26 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //27 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //28 цепь-B звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 6,  yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //29 цепь-B звено 7

	// ===== Дуплень: HOLLOW_RUSH — старт выше порога рывка убирает
	// «спокойную» фазу целиком =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //0 — сигнатура: выше порога рывка — рывок с первого кадра
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //1 — сигнатура: ниже порога — честная спокойная фаза для контраста
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //2 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //3 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //4 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //8 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //9 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //10 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //11 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //12 — быстрая атака
	// БАРРИКАДА (раздел 16): дуплистый ствол, наглухо забитый ветками —
	// самая крупная и стойкая баррикада уровня, финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 56, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.645 }, //13b
	// звенья цепи A — vertical(7): раздел 13.8, пара vertical+irregular
	// переиспользована из уровня 56 (@4+6), длина увеличена (7+7).
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //14 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //15 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //16 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 41, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //17 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //18 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //19 цепь-A звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //20 цепь-A звено 7
	// звенья цепи B — irregular(7): непредсказуемый разброс, финальная
	// концовка.
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //26 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //27 цепь-B звено 7

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 12,customHP: 1,customDamage: 19.6,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 28,yPos: 20,customHP: 1,customDamage: 19.6,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 82,yPos: 6,customHP: 1,customDamage: 19.6,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 40,customHP: 1,customDamage: 19.6,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 8,customHP: 1,customDamage: 19.6,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 70,yPos: 12,customHP: 1,customDamage: 19.6,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 12,customHP: 1,customDamage: 21.6,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 24,yPos: 20,customHP: 1,customDamage: 21.6,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 68,yPos: 6,customHP: 1,customDamage: 21.6,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 24,customHP: 1,customDamage: 21.6,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 8,customHP: 1,customDamage: 21.6,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 38,yPos: 12,customHP: 1,customDamage: 21.6,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 14,yPos: 12,customHP: 1,customDamage: 23.6,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 26,yPos: 20,customHP: 1,customDamage: 23.6,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 78,yPos: 6,customHP: 1,customDamage: 23.6,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 14,yPos: 40,customHP: 1,customDamage: 23.6,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 14,yPos: 8,customHP: 1,customDamage: 23.6,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 88,yPos: 12,customHP: 1,customDamage: 23.6,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 22,yPos: 12,customHP: 1,customDamage: 25.6,customSpeed: 16, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 34,yPos: 20,customHP: 1,customDamage: 25.6,customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 72,yPos: 6,customHP: 1,customDamage: 25.6,customSpeed: 21, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 22,yPos: 40,customHP: 1,customDamage: 25.6,customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 22,yPos: 8,customHP: 1,customDamage: 25.6,customSpeed: 20, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 12,customHP: 1,customDamage: 25.6,customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 12,customHP: 1,customDamage: 28.4,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 64,yPos: 20,customHP: 1,customDamage: 28.4,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 12,yPos: 6,customHP: 1,customDamage: 28.4,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 40,customHP: 1,customDamage: 28.4,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 8,customHP: 1,customDamage: 28.4,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 50,yPos: 12,customHP: 1,customDamage: 28.4,customSpeed: 18}
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 272, bossDelayAbDop: 4921, firstWaveDelayMs: 2362 }, // тревожный, но не самый частый взлёт
	{ boss: 'enem2', bossDelayAb: 289, bossDelayAbDop: 5383, firstWaveDelayMs: 2400 }, // долгая засадная пауза
	{ boss: 'enem3', bossDelayAb: 243, bossDelayAbDop: 4142, firstWaveDelayMs: 1988 }, // ровный, безостановочный разгон
	{ boss: 'enem4', bossDelayAb: 197, bossDelayAbDop: 3917, firstWaveDelayMs: 1880 }, // частые тревожные сигналы
	{ boss: 'enem5', bossDelayAb: 224, bossDelayAbDop: 3373, firstWaveDelayMs: 1619 }, // самый частый, финальный перед Соловьём
];

// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — у каждого комбо из 2+ способностей ниже
// в трейлинг-комментарии указан реальный разброс прилётов, посчитанный
// scratchpad/designCalc.js ДО записи и повторно проверенный
// scripts/combo-audit.js ПОСЛЕ записи (level 74: 0 проблем).
const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0,1,2]},
    {boss: "enem1",indexAbilities: [8],openingOrder: 0},
    {boss: "enem1",indexAbilities: [5,7,3]},
    {boss: "enem1",indexAbilities: [9,6,10,4]},
    {boss: "enem1",indexAbilities: [11,12]},
    {boss: "enem1",indexAbilities: [7,11,3]},
    {boss: "enem1",indexAbilities: [4,5]},
    {boss: "enem1",indexAbilities: [7,12]},
    {boss: "enem1",indexAbilities: [27,31],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Короткий взлёт черноклюва — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [27,31,29],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Короткий взлёт черноклюва — иной конец"},
    {boss: "enem1",indexAbilities: [32,28,32,29],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Короткий взлёт черноклюва — завершение"},
    {boss: "enem1",indexAbilities: [13],barricade: true},
    {boss: "enem1",indexAbilities: [14,15,16,17,18,19,20],isChain: true},
    {boss: "enem1",indexAbilities: [21,22,23,24,25,26],isChain: true},
    {boss: "enem2",indexAbilities: [0,1]},
    {boss: "enem2",indexAbilities: [7],openingOrder: 0},
    {boss: "enem2",indexAbilities: [4,11]},
    {boss: "enem2",indexAbilities: [9,6]},
    {boss: "enem2",indexAbilities: [2,3]},
    {boss: "enem2",indexAbilities: [8,5]},
    {boss: "enem2",indexAbilities: [10,13]},
    {boss: "enem2",indexAbilities: [12,4]},
    {boss: "enem2",indexAbilities: [31,30],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Шелест перед двойным выходом — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [31,30,32],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Шелест перед двойным выходом — иной конец"},
    {boss: "enem2",indexAbilities: [31,33,30,32],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Шелест перед двойным выходом — завершение"},
    {boss: "enem2",indexAbilities: [14],barricade: true},
    {boss: "enem2",indexAbilities: [15,16,17,18,19,20],isChain: true},
    {boss: "enem2",indexAbilities: [21,22,23,24,25,26,27],isChain: true},
    {boss: "enem3",indexAbilities: [0,1]},
    {boss: "enem3",indexAbilities: [7],openingOrder: 0},
    {boss: "enem3",indexAbilities: [6]},
    {boss: "enem3",indexAbilities: [11,4,13]},
    {boss: "enem3",indexAbilities: [2,8]},
    {boss: "enem3",indexAbilities: [14,5]},
    {boss: "enem3",indexAbilities: [34,35,31],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Корч тянется и перехватывает — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [34,35,33],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Корч тянется и перехватывает — иной конец"},
    {boss: "enem3",indexAbilities: [36,32,36,33,31],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Корч тянется и перехватывает — завершение"},
    {boss: "enem3",indexAbilities: [16],barricade: true},
    {boss: "enem3",indexAbilities: [17,18,19,20,21,22,23],isChain: true},
    {boss: "enem3",indexAbilities: [24,25,26,27,28,29,30],isChain: true},
    {boss: "enem4",indexAbilities: [0,1,2]},
    {boss: "enem4",indexAbilities: [7],openingOrder: 0},
    {boss: "enem4",indexAbilities: [8]},
    {boss: "enem4",indexAbilities: [11,6,4]},
    {boss: "enem4",indexAbilities: [5,14,3,9]},
    {boss: "enem4",indexAbilities: [15,12,10]},
    {boss: "enem4",indexAbilities: [13,3]},
    {boss: "enem4",indexAbilities: [30,34,32,35],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Рожок зовёт ответ с другого края — знакомство",openingOrder: 1,shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [30,34,35],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Рожок зовёт ответ с другого края — иной конец",shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [32,35,30,34],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Рожок зовёт ответ с другого края — завершение",shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [16],barricade: true},
    {boss: "enem4",indexAbilities: [17,18,19,20,21,22],isChain: true},
    {boss: "enem4",indexAbilities: [23,24,25,26,27,28,29],isChain: true},
    {boss: "enem5",indexAbilities: [0,1]},
    {boss: "enem5",indexAbilities: [7],openingOrder: 0},
    {boss: "enem5",indexAbilities: [4,3,9,12]},
    {boss: "enem5",indexAbilities: [5,8,11]},
    {boss: "enem5",indexAbilities: [10,2]},
    {boss: "enem5",indexAbilities: [6,5]},
    {boss: "enem5",indexAbilities: [4,2]},
    {boss: "enem5",indexAbilities: [28,29,33],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Дупло возвращает удар — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [28,29,32],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Дупло возвращает удар — иной конец"},
    {boss: "enem5",indexAbilities: [30,33,29,32],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Дупло возвращает удар — завершение"},
    {boss: "enem5",indexAbilities: [13],barricade: true},
    {boss: "enem5",indexAbilities: [14,15,16,17,18,19,20],isChain: true},
    {boss: "enem5",indexAbilities: [21,22,23,24,25,26,27],isChain: true}
];

// Лорные названия связок временных улучшений — пять шагов приближения к
// Соловью-разбойнику, словарь каждого строго завязан на его реальный облик и
// материал (правило 12.1): пёстрое оперение и коготь, лиственный капюшон и
// топор, коряжистые ветви-руки, большой рог и рожки на поясе, дуплистый
// ствол и подвески. Полных совпадений фраз между монстрами нет (проверено
// вручную построчно).
const UPGRADE_VARIANT_NAMES = {
	// Черноклюв — чернобровый тетерев: клюв, перо, коготь, взлёт.
	enem1: {
		variant1: 'Черноклювый кураж', variant2: 'Перьевая хватка', variant3: 'Клюв-таран',
		variant4: 'Взлётный напор', variant5: 'Меткий удар клювом', variant6: 'Бешеный удар клювом',
		variant7: 'Черноклювый норов', variant8: 'Крепкое перо', variant9: 'Ударный взмах крылом',
		variant10: 'Живучий коготь', variant11: 'Колючее перо', variant12: 'Удар клювом и в темноту',
		variant13: 'Толстое перо', variant14: 'Неутомимый удар клювом', variant15: 'Пружинистый удар клювом',
		variant16: 'Пёстрый хохолок, зоркий глаз', variant17: 'Черноклювая удача', variant18: 'Верный удар клювом',
		variant19: 'Молниеносный удар клювом', variant20: 'Черноклювый нюх', variant21: 'Цепкий коготь',
		variant22: 'Юркий, несмотря на вес', variant23: 'Черноклювая стойкость', variant24: 'Внезапный взлёт, зоркий глаз',
		variant25: 'Ускользающий удар клювом', variant26: 'Дикий удар клювом', variant27: 'Стойкое перо',
		variant28: 'Удар клювом наповал', variant29: 'Крепкий черноклюв', variant30: 'Взлётная мощь',
		variant31: 'Удар клювом с оглядкой', variant32: 'Живучее перо', variant33: 'Юркий и черноклювый',
		variant34: 'Взлётная прыть', variant35: 'Быстрый удар клювом, крепкое перо'
	},
	// Шелестень — дозорщик в листве: капюшон, топор, ветвь, шелест.
	enem2: {
		variant1: 'Шелестящий кураж', variant2: 'Капюшонная хватка', variant3: 'Топор-таран',
		variant4: 'Засадный напор', variant5: 'Меткий удар топором', variant6: 'Бешеный удар топором',
		variant7: 'Шелестящий норов', variant8: 'Крепкий капюшон', variant9: 'Ударный удар топором',
		variant10: 'Живучая ветвь', variant11: 'Колючий лист', variant12: 'Удар топором и в темноту',
		variant13: 'Толстый капюшон', variant14: 'Неутомимый удар топором', variant15: 'Пружинистый удар топором',
		variant16: 'Тихий шелест, зоркий глаз', variant17: 'Шелестящая удача', variant18: 'Верный удар топором',
		variant19: 'Молниеносный удар топором', variant20: 'Шелестящий нюх', variant21: 'Цепкий лист',
		variant22: 'Юркий, несмотря на капюшон', variant23: 'Шелестящая стойкость', variant24: 'Долгая слежка, зоркий глаз',
		variant25: 'Ускользающий удар топором', variant26: 'Дикий удар топором', variant27: 'Стойкий капюшон',
		variant28: 'Удар топором наповал', variant29: 'Крепкий шелестень', variant30: 'Засадная мощь',
		variant31: 'Удар топором с оглядкой', variant32: 'Живучий капюшон', variant33: 'Юркий и шелестящий',
		variant34: 'Засадная прыть', variant35: 'Быстрый удар топором, крепкий капюшон'
	},
	// Корчень — ожившая засада: корч, ветвь-рука, коготь, хватка.
	enem3: {
		variant1: 'Корчевый кураж', variant2: 'Хватательная хватка', variant3: 'Коготь-таран',
		variant4: 'Хватательный напор', variant5: 'Меткий хват', variant6: 'Бешеный хват',
		variant7: 'Корчевый норов', variant8: 'Крепкая ветвь-рука', variant9: 'Ударный хват',
		variant10: 'Живучий корень', variant11: 'Колючий коготь', variant12: 'Хват и в темноту',
		variant13: 'Толстая ветвь-рука', variant14: 'Неутомимый хват', variant15: 'Пружинистый хват',
		variant16: 'Длинный коготь, зоркий глаз', variant17: 'Корчевая удача', variant18: 'Верный хват',
		variant19: 'Молниеносный хват', variant20: 'Корчевый нюх', variant21: 'Цепкий корень',
		variant22: 'Юркий, несмотря на корч', variant23: 'Корчевая стойкость', variant24: 'Непрерывный разгон, зоркий глаз',
		variant25: 'Ускользающий хват', variant26: 'Дикий хват', variant27: 'Стойкая ветвь-рука',
		variant28: 'Хват наповал', variant29: 'Крепкий корчень', variant30: 'Хватательная мощь',
		variant31: 'Хват с оглядкой', variant32: 'Живучая цепкость', variant33: 'Юркий и корчевый',
		variant34: 'Хватательная прыть', variant35: 'Быстрый хват, крепкая ветвь-рука'
	},
	// Рожище — атаман с рогами: рог, кушак, шапка, эхо.
	enem4: {
		variant1: 'Рожищевый кураж', variant2: 'Роговая хватка', variant3: 'Рог-таран',
		variant4: 'Командный напор', variant5: 'Меткий сигнал эхом', variant6: 'Бешеный сигнал эхом',
		variant7: 'Рожищевый норов', variant8: 'Крепкий кушак', variant9: 'Ударный сигнал эхом',
		variant10: 'Живучая шапка', variant11: 'Колючее перо шапки', variant12: 'Сигнал эхом и в темноту',
		variant13: 'Толстый кушак', variant14: 'Неутомимый сигнал эхом', variant15: 'Пружинистый сигнал эхом',
		variant16: 'Тройной рожок, зоркий глаз', variant17: 'Рожищевая удача', variant18: 'Верный сигнал эхом',
		variant19: 'Молниеносный сигнал эхом', variant20: 'Рожищевый нюх', variant21: 'Цепкий пояс',
		variant22: 'Юркий, несмотря на рог', variant23: 'Рожищевая стойкость', variant24: 'Растущее эхо, зоркий глаз',
		variant25: 'Ускользающий сигнал эхом', variant26: 'Дикий сигнал эхом', variant27: 'Стойкая шапка',
		variant28: 'Сигнал эхом наповал', variant29: 'Крепкий рожище', variant30: 'Командная мощь',
		variant31: 'Сигнал эхом с оглядкой', variant32: 'Живучий кушак', variant33: 'Юркий и рожищевый',
		variant34: 'Командная прыть', variant35: 'Быстрый сигнал эхом, крепкий кушак'
	},
	// Дуплень — приспешник Соловья: дупло, выдох, подвеска, коготь.
	enem5: {
		variant1: 'Дуплистый кураж', variant2: 'Дупловая хватка', variant3: 'Выдох-таран',
		variant4: 'Полостной напор', variant5: 'Меткий выдох', variant6: 'Бешеный выдох',
		variant7: 'Дуплистый норов', variant8: 'Крепкое дупло', variant9: 'Ударный выдох',
		variant10: 'Живучая подвеска', variant11: 'Колючая кора дупла', variant12: 'Выдох и в темноту',
		variant13: 'Толстая кора дупла', variant14: 'Неутомимый выдох', variant15: 'Пружинистый выдох',
		variant16: 'Гулкое дупло, зоркий глаз', variant17: 'Дуплистая удача', variant18: 'Верный выдох',
		variant19: 'Молниеносный выдох', variant20: 'Дуплистый нюх', variant21: 'Цепкий выступ',
		variant22: 'Юркий, несмотря на дупло', variant23: 'Дуплистая стойкость', variant24: 'Срезанный разгон, зоркий глаз',
		variant25: 'Ускользающий выдох', variant26: 'Дикий выдох', variant27: 'Стойкое дупло',
		variant28: 'Выдох наповал', variant29: 'Крепкий дуплень', variant30: 'Полостная мощь',
		variant31: 'Выдох с оглядкой', variant32: 'Живучее дупло', variant33: 'Юркий и дуплистый',
		variant34: 'Полостная прыть', variant35: 'Быстрый выдох, крепкое дупло'
	}
};
