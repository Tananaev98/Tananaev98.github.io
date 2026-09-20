// Уровень 71 «Разбитая застава» — пятый уровень области VI «Глухой край»
// («Засечный лес»), обычный уровень (пять разных монстров). Продолжает
// сквозную механику «Баррикада» (раздел 16 lvlData/Правила создания
// уровня.txt) и цепи (13.6/13.7/13.8).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью:
// полная история 1-70 (350 строк) прогнана scratchpad/panelHistory.js —
// movementStyle по роли не повторяет последние 3 уровня (66-69) ни для одной
// роли, все 5 стилей уровня различны между собой. Пространство пар форм
// цепи (25/25) исчерпано для всех пяти ролей — применяется раздел 13.8:
// каждая пара реального сочетания форм повторно взята из более раннего
// (не 67-69) уровня с явным увеличением длины.
//
// АРТ (images/enemies/regions/6_zasech_les/lvl71/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — гуманоид из кольев и досок, шипастый шлем, держит деревянную
//   колотушку и дощатый щит, скалится — суть в СТОРОЖЕ ЧАСТОКОЛА, что стоит
//   за щитом и добивает колотушкой.
// 2.webp — связка брёвен на верёвочной обвязке с единым злым лицом на торце,
//   когтистые лапы — суть в КАТЯЩЕЙСЯ ПОД УКЛОН ВЯЗАНКЕ, отдельно от Вязня
//   (уровень 69, тащится по земле): здесь бревно именно КАТИТСЯ, набирая ход.
// 3.webp — четырёхлапое существо из толстых дубовых веток с длинными
//   когтями-прутьями на концах конечностей вместо кистей — суть в ПОДВИЖНОЙ
//   ЗАСТАВЕ ИЗ РОГУЛИН, что сама выглядит как ожившее заграждение.
// 4.webp — круглый гуманоид в лоскутной коре-броне, держит настоящий лук со
//   стрелой — суть в ЛУЧНИКЕ ЗАСТАВЫ, что целится на ходу, слегка вертясь.
// 5.webp (финал) — крупная фигура в остроконечном дощатом шлеме-крыше и
//   красном облачении, держит секач, раскрыт в яростном крике — суть в
//   РУБАКЕ У ВОРОТ БАШНИ, самом «прямом и честном на вид» бойце уровня.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА УРОВНЯ — «Разбитая застава»: сторож у частокола держит рубеж
// (Частокольник), с горы срываются катки (Колодень), сама изгородь оживает
// и хватает (Развилень), из бойницы бьёт лучник (Стёгач), а у самых ворот
// стоит последний рубака без единой хитрости в движении (Воротень) — пять
// защитников одной разбитой заставы, а не пять случайных монстров.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Частокольник (от
// «частокол» — сооружение, не словарное «сторож»/«страж»); Колодень (от
// «колода/каток» — материал/действие, отличное от «Вязень», уровень 69,
// который тащится, а не катится); Развилень (от «развилка/рогулина» —
// форма конечностей, не словарное «барьер»/«заграда»); Стёгач (от
// «стёганый» — деталь доспеха, не словарное «лучник»/«стрелок»); Воротень
// (от «ворота» — место службы, не словарное «рубака»/«воин»). Проверено
// программно (grep по всем dispName всей кампании) — ни одно имя не
// встречается ранее.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА — письменно, ДО геометрии, для каждого:
//
// Частокольник (enem1, movementStyle: lateRush, архетип «кажущаяся
// медлительность»):
//   1. Кто/почему: сторож частокола держит строй за дощатым щитом — удар
//      колотушкой кажется размеренным, но у самой цели рывком довершается
//      (движковый эффект lateRush).
//   2. Хитрость: игрок, что оценивает время блока по видимой (начальной)
//      скорости удара, читает его как медленный и безопасный дольше
//      положенного — реальный момент прилёта резко ближе, чем подсказывает
//      начальный темп.
//   3. Привычка игрока: lateRush на прошлых уровнях (Прыгач/Клепоклюв/
//      Телегарь/Жезловник) читался как «рывок = сам монстр срывается с
//      места» — здесь тот же эффект применяется к брошенному оружию, уже
//      летящему, а не к прыжку самого монстра.
//   4. Честность: телеграф перед броском не короче обычного, сам рывок — не
//      более резкий, чем у любого другого lateRush-босса кампании (тот же
//      движковый эффект, не усиленный) — наказывается недооценка кажущейся
//      начальной медлительности, не скорость реакции.
//
// Колодень (enem2, movementStyle: accelerate, архетип «непредсказуемый
// порядок прилёта»):
//   1. Кто/почему: связка брёвен, что неудержимо катится под уклон —
//      стартует лениво, но набирает скорость с каждым метром (accelerate).
//   2. Хитрость: сигнатурная серия комбинирует бревно с ПОЗДНИМ стартом (по
//      порядку появления второе), но заметно более высокой скоростью — оно
//      не просто нагоняет, а полностью обгоняет бревно, стартовавшее
//      первым, и прилетает раньше него.
//   3. Привычка игрока: порядок появления обычно подсказывает порядок
//      прилёта (кто спавнился первым — тот и прилетит первым) — здесь
//      порядок прилёта ПРОТИВОПОЛОЖЕН порядку появления: разница в скорости
//      с запасом перекрывает разницу в старте.
//   4. Честность: оба бревна летят по заранее заданной, неизменной
//      траектории без вмешательства — наказывается предположение о порядке
//      по одному лишь моменту появления, не скорость реакции.
//
// Развилень (enem3, movementStyle: drift, архетип «снос пересекает
// середину поля»):
//   1. Кто/почему: подвижная застава из дубовых рогулин — каждый взмах
//      соскальзывает вбок по ходу падения (движковый эффект drift), будто
//      сама рогулина ползёт, а не просто торчит на месте.
//   2. Хитрость: drift в game.js всегда сносит атаку К ЦЕНТРУ поля
//      (driftDirection = movementOriginX < 50 ? 1 : -1) — у всех прежних
//      drift-боссов (Вязень, Дымокор, Катыш, Чадень) старт был далеко от
//      центра, поэтому снос лишь ПРИБЛИЖАЛ атаку к середине, не более.
//      Сигнатурная пара Развиленя стартует совсем БЛИЗКО к центру (44 и 56
//      при центре 50) — те же честные до 10 единиц сноса уносят каждый
//      взмах НАСКВОЗЬ, на противоположную от старта половину поля.
//   3. Привычка игрока: на прежних drift-боссах снос никогда не пересекал
//      середину — игрок, что блокирует по стартовой стороне, промахивается
//      мимо конечной точки, оказавшейся на другой половине поля.
//   4. Честность: снос считается тем же самым правилом движка, что и у
//      любого другого drift-босса кампании (не усилен и не изменён
//      специально для этого босса) — наказывается перенос вывода «снос
//      никогда не пересекает центр», не скорость реакции.
//
// Стёгач (enem4, movementStyle: weave, архетип «фиксированная амплитуда
// сводит раздельные цели вместе»):
//   1. Кто/почему: лучник заставы в стёганом кафтане — стрела виляет в
//      полёте (weave), будто лучник довёртывается вместе с выстрелом.
//   2. Хитрость: амплитуда и частота weave — фиксированная движковая
//      константа (±5.5% от стартовой xPos, Math.sin(swayTime×1.35)×5.5 в
//      game.js, не индивидуальный параметр атаки) — виляет одинаково
//      КАЖДАЯ weave-стрела кампании, включая стрелы Стёгача. Сигнатурная
//      пара стартует всего в 8% друг от друга по xPos — при таком узком
//      разрыве суммарный размах виляния (11%) регулярно сводит траектории
//      двух формально раздельных стрел вместе на part пути.
//   3. Привычка игрока: игрок, что видит две стрелы, стартовавшие в разных
//      точках, ждёт, что они и прилетят раздельно — здесь фиксированная
//      амплитуда виляния временами визуально сливает их в одну угрозу,
//      хотя опасны обе по отдельности.
//   4. Честность: амплитуда виляния не увеличена и не уменьшена относительно
//      любого другого weave-босса кампании (тот же движковый эффект,
//      единственная переменная — узкий стартовый разрыв) — наказывается
//      недооценка того, что обе стрелы всё ещё раздельно опасны, не
//      скорость реакции.
//
// Воротень (enem5, финал уровня, movementStyle: straight, архетип
// «отсутствие трюка как сам трюк»):
//   1. Кто/почему: тяжёлый рубака у ворот башни — рубит по прямой без
//      единого движкового эффекта, самый «честный на вид» боец уровня; как
//      финал, обязан проверить навыки предыдущих четырёх и добавить
//      собственный поворот (правило K).
//   2. Хитрость: все четыре предыдущих босса прятали подвох именно в СВОЁМ
//      движковом эффекте — игрок закономерно ищет аналогичный трюк и у
//      Воротеня. Трюка в движении нет: вместо этого bossDelayAb этого облика
//      — самый низкий на уровне (интервал между атаками короче, чем у любого
//      другого босса), то есть подвох перенесён из геометрии в ЧАСТОТУ.
//   3. Привычка игрока: игрок распределяет внимание, ожидая читать движковый
//      эффект каждой новой атаки — здесь читать нечего, и именно поэтому
//      легко потерять счёт тому, как часто прилетают безобидные на вид
//      прямые удары.
//   4. Честность: интервал между атаками — сознательно выбранная частота, не
//      рывок движка, каждый удар читается нормально — наказывается
//      недооценка частоты, не скорость реакции.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-70, ГДЕ
// «последние 3 уровня» роли — 68/69/70 (level 70 многофазный, но его пять
// обликов занимают те же слоты enem1-enem5, что и обычный уровень, и
// учитываются в ротации наравне с ним): Частокольник — lateRush (роль
// enem1: 68 wave, 69 pause, 70 straight — не использовался); Колодень —
// accelerate (роль enem2: 68 straight, 69 drift, 70 lateRush — не
// использовался); Развилень — drift (роль enem3: 68 accelerate, 69
// straight, 70 pause — не использовался); Стёгач — weave (роль enem4: 68
// lateRush, 69 accelerate, 70 wave — не использовался); Воротень — straight
// (роль enem5: 68 drift, 69 wave, 70 accelerate — не использовался). Пять
// стилей уровня различны между собой.
//
// ЦЕПИ (13.6/13.7/13.8) — пространство пар форм (25/25) по-прежнему
// исчерпано для всех ролей — применяется раздел 13.8, источники сознательно
// взяты НЕ из непосредственно предыдущих уровней 67-69 (уже использовавших
// свежие источники), а из более ранней истории:
// Частокольник — arc(7)+irregular(6), источник arc+irregular — уровень 44
//   (@3+5) — исключение: длина увеличена (7+6 vs 3+5);
// Колодень — irregular(6)+diagonal(7), источник irregular+diagonal — уровень
//   47 (@5+3) — исключение: длина увеличена (6+7 vs 5+3);
// Развилень — zigzag(7)+vertical(6), источник zigzag+vertical — уровень 48
//   (@4+4) — исключение: длина увеличена (7+6 vs 4+4);
// Стёгач — irregular(6)+vertical(7), источник irregular+vertical — уровень
//   46 (@5+4) — исключение: длина увеличена (6+7 vs 5+4);
// Воротень — irregular(7)+zigzag(7), источник irregular+zigzag — уровень 50
//   (@5+7) — исключение: удлинена короткая цепь до максимума (7+7 vs 5+7).
// Формы всех пяти пар подтверждены программным классификатором ДО записи
// (тот же алгоритм classifyChainShape, что и в panelHistory.js/панели).
// Скорость вдоль каждой цепи невозрастающая (лесенка 18→…→6/7), yPos всех
// звеньев — 26 (граница движка CHAIN_MAX_SPAWN_Y). Ни одна
// barricade-способность не входит в isChain-комбо (ограничение раздела
// 16.4).
//
// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — КАЖДОЕ комбо из 2+ способностей ниже
// посчитано реальными формулами движка (scratchpad/designCalc.js, те же
// TARGET_Y/BASE_SPEED/ENEMY_BASE_SPEED, что и game.js) ДО записи файла, а
// после записи повторно прогнано целиком через scripts/combo-audit.js —
// разброс прилётов у каждого комбо в пределах 65-1561мс (см. трейлинг-
// комментарии у каждого комбо ниже), ни одно комбо не состоит из двух и
// более genuinely медленных (customSpeed≤8) атак без быстрого элемента —
// урок уровня 70 применён с самого начала проектирования, а не по факту.
//
// БАРРИКАДЫ (раздел 16) — у каждого из пяти противников ровно ОДНА
// barricade-способность, эскалация 1:1 с ролью: Частокольник 3 удара/1200мс,
// Колодень 4/1600, Развилень 5/2000, Стёгач 6/2400, Воротень 7/2800 —
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
let lvlNumber = 71;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.010,
	damageMultiplier: 1.855,
	minWaveDelay: 2715,
	minShotDelay: 167,
	minTelegraphMs: 598,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.565, cadence: 1.036, speed: 0.955, damage: 1.012, telegraphMultiplier: 0.976, surpriseChance: 0.046, maxActiveAttacks: 10 },
		{ phase: 2, minHp: 0.335, cadence: 0.872, speed: 1.004, damage: 1.072, telegraphMultiplier: 0.965, surpriseChance: 0.094, maxActiveAttacks: 15 },
		{ phase: 3, minHp: 0.00, cadence: 0.704, speed: 1.07, damage: 1.205, telegraphMultiplier: 0.841, surpriseChance: 0.1535, maxActiveAttacks: 18 }
	],
	bosses: {
		enem1: { combatIdentity: "Частокол пропускает удар", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.885, telegraphMs: 895, speedMultiplier: 0.995, damageMultiplier: 0.985,
			speedVariance: [0.83, 0.91, 0.99, 1.07, 1.15]
		}, // Частокольник: STAKE_GUARD — колотушка кажется размеренной, но рывком довершается у самой цели
		enem2: { combatIdentity: "Бревно догоняет первый толчок", combatTrick: "короткий первый заход продолжается более быстрым довеском с прежнего края", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.010, telegraphMs: 765, speedMultiplier: 0.975, damageMultiplier: 0.945,
			speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18]
		}, // Колодень: LOG_ROLL — поздний старт полностью обгоняет ранний за счёт разгона
		enem3: { combatIdentity: "Развилка закрывает середину", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'drift', cadence: 0.850, telegraphMs: 945, speedMultiplier: 0.965, damageMultiplier: 1.115,
			speedVariance: [0.84, 0.91, 0.98, 1.05, 1.12]
		}, // Развилень: FORK_DRIFT — снос к центру, начатый вплотную к середине, уносит взмах на противоположную половину поля
		enem4: { combatIdentity: "Стёжка с обратным ходом", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'weave', cadence: 1.035, telegraphMs: 805, speedMultiplier: 1.035, damageMultiplier: 1.145,
			speedVariance: [0.90, 0.99, 1.08, 1.17, 1.26]
		}, // Стёгач: QUILT_LOOSE — фиксированная амплитуда weave сводит узко разнесённые цели
		enem5: { combatIdentity: "Ворота захлопываются вторым ходом", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4, movementStyle: 'straight', cadence: 1.070, telegraphMs: 835, speedMultiplier: 1.025, damageMultiplier: 1.275,
			speedVariance: [0.79, 0.89, 0.99, 1.09, 1.19]
		} // Воротень: GATE_CLEAVE — без единого движкового трюка, подвох в самой частой на уровне частоте атак
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl71/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl71/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl71/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl71/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl71/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Частокольник',
		image: 'images/enemies/regions/6_zasech_les/lvl71/1.webp',
		baseHP: 18854,
		baseSpeed: 0,
		baseDamage: 19.65,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Колодень',
		image: 'images/enemies/regions/6_zasech_les/lvl71/2.webp',
		baseHP: 47135,
		baseSpeed: 0,
		baseDamage: 22.35,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Развилень',
		image: 'images/enemies/regions/6_zasech_les/lvl71/3.webp',
		baseHP: 83393,
		baseSpeed: 0,
		baseDamage: 24.30,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Стёгач',
		image: 'images/enemies/regions/6_zasech_les/lvl71/4.webp',
		baseHP: 134155,
		baseSpeed: 0,
		baseDamage: 26.35,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Воротень',
		image: 'images/enemies/regions/6_zasech_les/lvl71/5.webp',
		baseHP: 203045,
		baseSpeed: 0,
		baseDamage: 27.65,
		spawnWeight: 5,
		baseExp: 0,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 1000 }
	},

};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 8;
const bossInterval = 15;

//spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

// Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
// speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

const bossAbilities = [
	// ===== Частокольник: STAKE_GUARD — колотушка кажется размеренной, но
	// рывком довершается у самой цели =====
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //0 — сигнатура: удар колотушкой, часть 1
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //1 — сигнатура: довершающий рывок, часть 2
	{ boss: 'enem1', type: 'enem11', xPos: 33, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21 }, //2 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 23 }, //3 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //4 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //5 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //6 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 57, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// БАРРИКАДА (раздел 16): щит и колья, сбитые вместе — требует несколько
	// ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem1', type: 'enem11', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.235 }, //9b
	// звенья цепи A — arc(7): раздел 13.8, пара arc+irregular
	// переиспользована из уровня 44 (@3+5), длина увеличена (7+6).
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //10 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //11 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 56, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 59, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //13 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //14 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //15 цепь-A звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //16 цепь-A звено 7
	// звенья цепи B — irregular(6): непредсказуемый разброс с несколькими
	// сменами направления.
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //17 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //18 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //19 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //20 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //21 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //22 цепь-B звено 6

	// ===== Колодень: LOG_ROLL — поздний старт полностью обгоняет ранний за
	// счёт разгона =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //0 — сигнатура: левое бревно, часть 1 (обычный темп)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //1 — сигнатура: правое бревно, часть 2 (позже стартует, но разогналось)
	{ boss: 'enem2', type: 'enem22', xPos: 66, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 47, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //3 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21 }, //4 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //5 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 62, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //6 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 64, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //7 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, //9 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 }, //10 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //12 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21 }, //14 — быстрая атака
	// БАРРИКАДА (раздел 16): особо смолистый ком, что не рассыпается сразу.
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.265 }, //15b
	// звенья цепи A — irregular(6): раздел 13.8, пара irregular+diagonal
	// переиспользована из уровня 47 (@5+3), длина увеличена (6+7).
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //21 цепь-A звено 6
	// звенья цепи B — diagonal(7): монотонный снос через всё поле.
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //22 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //23 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //24 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //25 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 37, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //26 цепь-B звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //27 цепь-B звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //28 цепь-B звено 7

	// ===== Развилень: FORK_DRIFT — снос к центру, начатый вплотную к
	// середине, уносит взмах на противоположную половину поля =====
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //0 — сигнатура: старт слева от центра, снос уносит вправо
	{ boss: 'enem3', type: 'enem33', xPos: 56, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //1 — сигнатура: старт справа от центра, снос уносит влево
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //2 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, //3 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //4 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //5 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 48, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, //8 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, //9 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, //10 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 63, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //12 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //13 — средняя атака
	// БАРРИКАДА (раздел 16): плотный узел рогулин, что держится крепче
	// обычного заграждения.
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.425 }, //14b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+vertical
	// переиспользована из уровня 48 (@4+4), длина увеличена (7+6).
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //15 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //16 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //18 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //19 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //20 цепь-A звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //21 цепь-A звено 7
	// звенья цепи B — vertical(6): узкая колонна почти на месте.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //22 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //23 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //24 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //25 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //26 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //27 цепь-B звено 6

	// ===== Стёгач: QUILT_LOOSE — фиксированная амплитуда weave сводит узко
	// разнесённые цели =====
	// Раздел 0.1: явные waveAmplitude/waveFrequency не нужны — Стёгач
	// использует weave (боковое покачивание), а не wave; смещение центра
	// колебания задаётся самой геометрией xPos ниже, не отдельным полем.
	{ boss: 'enem4', type: 'enem44', xPos: 47, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //0 — сигнатура: узкий разрыв (8%) — фиксированная амплитуда weave (11%) сводит траектории
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //1 — сигнатура: вторая раздельная цель того же узкого разрыва
	{ boss: 'enem4', type: 'enem44', xPos: 53, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21 }, //2 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 56, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //3 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //4 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //5 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 73, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 26, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 23 }, //8 — быстрая атака
	// БАРРИКАДА (раздел 16): вязанка кольев с натянутой тетивой поперёк —
	// требует больше ударов, чем у прежних трёх ролей.
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.535 }, //9b
	// звенья цепи A — irregular(6): раздел 13.8, пара irregular+vertical
	// переиспользована из уровня 46 (@5+4), длина увеличена (6+7).
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //10 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //11 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //12 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 44, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //13 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //14 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //15 цепь-A звено 6
	// звенья цепи B — vertical(7): узкая колонна почти на месте.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //17 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //18 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //19 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //20 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //21 цепь-B звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //22 цепь-B звено 7

	// ===== Воротень: GATE_CLEAVE — без единого движкового трюка, подвох в
	// самой частой на уровне частоте атак =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //0 — сигнатура: прямой удар, часть 1
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //1 — сигнатура: почти идентичный удар вплотную следом, часть 2
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19 }, //2 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //3 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //4 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 56, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //8 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //9 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //10 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 33, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //11 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //12 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// БАРРИКАДА (раздел 16): дощатые ворота, окованные железом — самая
	// крупная и стойкая баррикада уровня, финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.565 }, //14b
	// звенья цепи A — irregular(7): раздел 13.8, пара irregular+zigzag
	// переиспользована из уровня 50 (@5+7), короткая цепь удлинена до
	// максимума (7+7).
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //15 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //16 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //18 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //19 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //20 цепь-A звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //21 цепь-A звено 7
	// звенья цепи B — zigzag(7): резкий частый разброс, тревожная концовка.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //22 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //23 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //24 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //25 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //26 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //27 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //28 цепь-B звено 7

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 20,yPos: 12,customHP: 1,customDamage: 19.65,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 32,yPos: 20,customHP: 1,customDamage: 19.65,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 80,yPos: 6,customHP: 1,customDamage: 19.65,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 20,yPos: 40,customHP: 1,customDamage: 19.65,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 20,yPos: 8,customHP: 1,customDamage: 19.65,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 88,yPos: 12,customHP: 1,customDamage: 19.65,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 82,yPos: 12,customHP: 1,customDamage: 22.35,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 74,yPos: 20,customHP: 1,customDamage: 22.35,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 16,yPos: 6,customHP: 1,customDamage: 22.35,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 82,yPos: 40,customHP: 1,customDamage: 22.35,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 82,yPos: 8,customHP: 1,customDamage: 22.35,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 28,yPos: 12,customHP: 1,customDamage: 22.35,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 18,yPos: 12,customHP: 1,customDamage: 24.3,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 48,yPos: 20,customHP: 1,customDamage: 24.3,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 84,yPos: 6,customHP: 1,customDamage: 24.3,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 18,yPos: 40,customHP: 1,customDamage: 24.3,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 18,yPos: 8,customHP: 1,customDamage: 24.3,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 48,yPos: 12,customHP: 1,customDamage: 24.3,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 12,customHP: 1,customDamage: 26.35,customSpeed: 16},
    {boss: "enem4",type: "enem44",xPos: 66,yPos: 20,customHP: 1,customDamage: 26.35,customSpeed: 14},
    {boss: "enem4",type: "enem44",xPos: 40,yPos: 6,customHP: 1,customDamage: 26.35,customSpeed: 21},
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 40,customHP: 1,customDamage: 26.35,customSpeed: 7},
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 8,customHP: 1,customDamage: 26.35,customSpeed: 20},
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 12,customHP: 1,customDamage: 26.35,customSpeed: 18},
    {boss: "enem5",type: "enem55",xPos: 24,yPos: 12,customHP: 1,customDamage: 27.65,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 38,yPos: 20,customHP: 1,customDamage: 27.65,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 84,yPos: 6,customHP: 1,customDamage: 27.65,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 24,yPos: 40,customHP: 1,customDamage: 27.65,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 24,yPos: 8,customHP: 1,customDamage: 27.65,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 64,yPos: 12,customHP: 1,customDamage: 27.65,customSpeed: 18}
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 298, bossDelayAbDop: 5482, firstWaveDelayMs: 2400 }, // неспешный сторож, что подгадывает момент рывка
	{ boss: 'enem2', bossDelayAb: 259, bossDelayAbDop: 4166, firstWaveDelayMs: 2000 }, // частое, неудержимое качение
	{ boss: 'enem3', bossDelayAb: 279, bossDelayAbDop: 5358, firstWaveDelayMs: 2400 }, // неспешные, но далеко достающие взмахи рогулин
	{ boss: 'enem4', bossDelayAb: 251, bossDelayAbDop: 3683, firstWaveDelayMs: 1768 }, // частые, но лёгкие на вид выстрелы
	{ boss: 'enem5', bossDelayAb: 198, bossDelayAbDop: 3794, firstWaveDelayMs: 1821 }, // самый частый интервал уровня, скрытый за отсутствием трюка
];

// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — у каждого комбо из 2+ способностей ниже
// в трейлинг-комментарии указан реальный разброс прилётов, посчитанный
// scratchpad/designCalc.js ДО записи и повторно проверенный
// scripts/combo-audit.js ПОСЛЕ записи (level 71: 0 проблем).
const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0,1]},
    {boss: "enem1",indexAbilities: [8],openingOrder: 0},
    {boss: "enem1",indexAbilities: [6,3,7]},
    {boss: "enem1",indexAbilities: [4,5]},
    {boss: "enem1",indexAbilities: [23,27,24],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Частокол пропускает удар — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [23,27,25],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Частокол пропускает удар — иной конец"},
    {boss: "enem1",indexAbilities: [28,25,28,24],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Частокол пропускает удар — завершение"},
    {boss: "enem1",indexAbilities: [9],barricade: true},
    {boss: "enem1",indexAbilities: [10,11,12,13,14,15,16],isChain: true},
    {boss: "enem1",indexAbilities: [17,18,19,20,21,22],isChain: true},
    {boss: "enem2",indexAbilities: [0,1]},
    {boss: "enem2",indexAbilities: [10],openingOrder: 0},
    {boss: "enem2",indexAbilities: [9]},
    {boss: "enem2",indexAbilities: [6,14]},
    {boss: "enem2",indexAbilities: [7,12]},
    {boss: "enem2",indexAbilities: [13,4]},
    {boss: "enem2",indexAbilities: [32,33,29],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Бревно догоняет первый толчок — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [32,33,31],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Бревно догоняет первый толчок — иной конец"},
    {boss: "enem2",indexAbilities: [34,30,34,31,29],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Бревно догоняет первый толчок — завершение"},
    {boss: "enem2",indexAbilities: [15],barricade: true},
    {boss: "enem2",indexAbilities: [16,17,18,19,20,21],isChain: true},
    {boss: "enem2",indexAbilities: [22,23,24,25,26,27,28],isChain: true},
    {boss: "enem3",indexAbilities: [0,1]},
    {boss: "enem3",indexAbilities: [6],openingOrder: 0},
    {boss: "enem3",indexAbilities: [7]},
    {boss: "enem3",indexAbilities: [4,11,3,9]},
    {boss: "enem3",indexAbilities: [28,30,33],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Развилка закрывает середину — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [28,30,29],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Развилка закрывает середину — иной конец"},
    {boss: "enem3",indexAbilities: [32,30,33,29],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Развилка закрывает середину — завершение"},
    {boss: "enem3",indexAbilities: [14],barricade: true},
    {boss: "enem3",indexAbilities: [15,16,17,18,19,20,21],isChain: true},
    {boss: "enem3",indexAbilities: [22,23,24,25,26,27],isChain: true},
    {boss: "enem4",indexAbilities: [0,1]},
    {boss: "enem4",indexAbilities: [6],openingOrder: 0},
    {boss: "enem4",indexAbilities: [7]},
    {boss: "enem4",indexAbilities: [4,8]},
    {boss: "enem4",indexAbilities: [23,24,25],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Стёжка с обратным ходом — знакомство",openingOrder: 1},
    {boss: "enem4",indexAbilities: [23,24,27],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Стёжка с обратным ходом — иной конец"},
    {boss: "enem4",indexAbilities: [28,25,24,27],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Стёжка с обратным ходом — завершение"},
    {boss: "enem4",indexAbilities: [9],barricade: true},
    {boss: "enem4",indexAbilities: [10,11,12,13,14,15],isChain: true},
    {boss: "enem4",indexAbilities: [16,17,18,19,20,21,22],isChain: true},
    {boss: "enem5",indexAbilities: [0,1]},
    {boss: "enem5",indexAbilities: [7],openingOrder: 0},
    {boss: "enem5",indexAbilities: [2,3]},
    {boss: "enem5",indexAbilities: [6,12]},
    {boss: "enem5",indexAbilities: [4,9]},
    {boss: "enem5",indexAbilities: [29,31,30,34],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Ворота захлопываются вторым ходом — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [29,31,33],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Ворота захлопываются вторым ходом — иной конец"},
    {boss: "enem5",indexAbilities: [30,34,29,31],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Ворота захлопываются вторым ходом — завершение"},
    {boss: "enem5",indexAbilities: [14],barricade: true},
    {boss: "enem5",indexAbilities: [15,16,17,18,19,20,21],isChain: true},
    {boss: "enem5",indexAbilities: [22,23,24,25,26,27,28],isChain: true}
];

// Лорные названия связок временных улучшений — пять защитников одной
// разбитой заставы, словарь каждого строго завязан на его реальный облик и
// материал (правило 12.1): частокол и колотушка, катящееся бревно и
// верёвка, дубовые рогулины и кора, стёганый кафтан и лук, секач и дощатый
// шлем-крыша. Полных совпадений фраз между монстрами нет (проверено вручную
// построчно).
const UPGRADE_VARIANT_NAMES = {
	// Частокольник — сторож частокола: кол, колотушка, щит, шип.
	enem1: {
		variant1: 'Частокольный кураж', variant2: 'Щитовая хватка', variant3: 'Колотушка-таран',
		variant4: 'Сторожевой напор', variant5: 'Меткий удар колотушкой', variant6: 'Бешеный удар колотушкой',
		variant7: 'Частокольный норов', variant8: 'Крепкий щит', variant9: 'Ударный размах',
		variant10: 'Живучий кол', variant11: 'Колючий шип', variant12: 'Удар колотушкой и в темноту',
		variant13: 'Толстый щит', variant14: 'Неутомимый удар колотушкой', variant15: 'Пружинистый удар колотушкой',
		variant16: 'Шипастый шлем, зоркий глаз', variant17: 'Частокольная удача', variant18: 'Верный удар колотушкой',
		variant19: 'Молниеносный удар колотушкой', variant20: 'Частокольный нюх', variant21: 'Цепкая доска',
		variant22: 'Юркий, несмотря на щит', variant23: 'Частокольная стойкость', variant24: 'Долгий рывок, зоркий глаз',
		variant25: 'Ускользающий удар колотушкой', variant26: 'Дикий удар колотушкой', variant27: 'Стойкий щит',
		variant28: 'Удар колотушкой наповал', variant29: 'Крепкий частокольник', variant30: 'Сторожевая мощь',
		variant31: 'Удар колотушкой с оглядкой', variant32: 'Живучий щит', variant33: 'Юркий и частокольный',
		variant34: 'Сторожевая прыть', variant35: 'Быстрый удар колотушкой, крепкий щит'
	},
	// Колодень — катящийся каток: бревно, верёвка, кора, разгон.
	enem2: {
		variant1: 'Колодный кураж', variant2: 'Верёвочная хватка', variant3: 'Бревно-таран',
		variant4: 'Раскатистый напор', variant5: 'Меткий наезд', variant6: 'Бешеный наезд',
		variant7: 'Колодный норов', variant8: 'Крепкое бревно', variant9: 'Ударный разгон',
		variant10: 'Живучая обвязка', variant11: 'Колючая щепа', variant12: 'Наезд и в темноту',
		variant13: 'Толстое бревно', variant14: 'Неутомимый наезд', variant15: 'Пружинистый наезд',
		variant16: 'Тугая обвязка, зоркий глаз', variant17: 'Колодная удача', variant18: 'Верный наезд',
		variant19: 'Молниеносный наезд', variant20: 'Колодный нюх', variant21: 'Цепкая верёвка',
		variant22: 'Юркий, несмотря на вес', variant23: 'Колодная стойкость', variant24: 'Долгий разгон, зоркий глаз',
		variant25: 'Ускользающий наезд', variant26: 'Дикий наезд', variant27: 'Стойкое бревно',
		variant28: 'Наезд наповал', variant29: 'Крепкий колодень', variant30: 'Раскатистая мощь',
		variant31: 'Наезд с оглядкой', variant32: 'Живучая верёвка', variant33: 'Юркий и колодный',
		variant34: 'Раскатистая прыть', variant35: 'Быстрый наезд, крепкое бревно'
	},
	// Развилень — ожившее заграждение: рогулина, кора, коготь-прут.
	enem3: {
		variant1: 'Развилый кураж', variant2: 'Прутовая хватка', variant3: 'Рогулина-таран',
		variant4: 'Заградный напор', variant5: 'Меткий взмах', variant6: 'Бешеный взмах',
		variant7: 'Развилый норов', variant8: 'Крепкая рогулина', variant9: 'Ударный взмах',
		variant10: 'Живучая кора', variant11: 'Колючий прут', variant12: 'Взмах и в темноту',
		variant13: 'Толстая рогулина', variant14: 'Неутомимый взмах', variant15: 'Пружинистый взмах',
		variant16: 'Двойной коготь, зоркий глаз', variant17: 'Развилая удача', variant18: 'Верный взмах',
		variant19: 'Молниеносный взмах', variant20: 'Развилый нюх', variant21: 'Цепкий прут',
		variant22: 'Юркий, несмотря на ветви', variant23: 'Развилая стойкость', variant24: 'Долгая засада, зоркий глаз',
		variant25: 'Ускользающий взмах', variant26: 'Дикий взмах', variant27: 'Стойкая рогулина',
		variant28: 'Взмах наповал', variant29: 'Крепкий развилень', variant30: 'Заградная мощь',
		variant31: 'Взмах с оглядкой', variant32: 'Живучий прут', variant33: 'Юркий и развилый',
		variant34: 'Заградная прыть', variant35: 'Быстрый взмах, крепкая рогулина'
	},
	// Стёгач — лучник заставы: кафтан, лук, тетива, кора-панцирь.
	enem4: {
		variant1: 'Стёганый кураж', variant2: 'Тетивная хватка', variant3: 'Стрела-таран',
		variant4: 'Прицельный напор', variant5: 'Меткий выстрел', variant6: 'Бешеный выстрел',
		variant7: 'Стёганый норов', variant8: 'Крепкий кафтан', variant9: 'Ударный выстрел',
		variant10: 'Живучий подклад', variant11: 'Колючая кора', variant12: 'Выстрел и в темноту',
		variant13: 'Толстый кафтан', variant14: 'Неутомимый выстрел', variant15: 'Пружинистый выстрел',
		variant16: 'Тугой лук, зоркий глаз', variant17: 'Стёганая удача', variant18: 'Верный выстрел',
		variant19: 'Молниеносный выстрел', variant20: 'Стёганый нюх', variant21: 'Цепкая тетива',
		variant22: 'Юркий, несмотря на кафтан', variant23: 'Стёганая стойкость', variant24: 'Долгий прицел, зоркий глаз',
		variant25: 'Ускользающий выстрел', variant26: 'Дикий выстрел', variant27: 'Стойкий кафтан',
		variant28: 'Выстрел наповал', variant29: 'Крепкий стёгач', variant30: 'Прицельная мощь',
		variant31: 'Выстрел с оглядкой', variant32: 'Живучая тетива', variant33: 'Юркий и стёганый',
		variant34: 'Прицельная прыть', variant35: 'Быстрый выстрел, крепкий кафтан'
	},
	// Воротень — рубака у ворот: секач, шлем-крыша, доспех, ворота.
	enem5: {
		variant1: 'Воротный кураж', variant2: 'Секачная хватка', variant3: 'Секач-таран',
		variant4: 'Надвратный напор', variant5: 'Меткий рубящий удар', variant6: 'Бешеный рубящий удар',
		variant7: 'Воротный норов', variant8: 'Крепкий шлем-крыша', variant9: 'Ударный замах секачом',
		variant10: 'Живучая кайма', variant11: 'Колючая кромка', variant12: 'Рубящий удар и в темноту',
		variant13: 'Толстый доспех', variant14: 'Неутомимый рубящий удар', variant15: 'Пружинистый рубящий удар',
		variant16: 'Красный доспех, зоркий глаз', variant17: 'Воротная удача', variant18: 'Верный рубящий удар',
		variant19: 'Молниеносный рубящий удар', variant20: 'Воротный нюх', variant21: 'Цепкий секач',
		variant22: 'Юркий, несмотря на доспех', variant23: 'Воротная стойкость', variant24: 'Частый замах, зоркий глаз',
		variant25: 'Ускользающий рубящий удар', variant26: 'Дикий рубящий удар', variant27: 'Стойкий шлем-крыша',
		variant28: 'Рубящий удар наповал', variant29: 'Крепкий воротень', variant30: 'Надвратная мощь',
		variant31: 'Рубящий удар с оглядкой', variant32: 'Живучий доспех', variant33: 'Юркий и воротный',
		variant34: 'Надвратная прыть', variant35: 'Быстрый рубящий удар, крепкий доспех'
	}
};
