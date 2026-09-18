// Уровень 72 «Разбойничьи следы» — седьмой уровень области VI «Глухой
// край» («Засечный лес»), обычный уровень (пять разных монстров).
// Продолжает сквозную механику «Баррикада» (раздел 16) и цепи (13.6/13.7/
// 13.8).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью:
// полная история 1-71 прогнана scratchpad/panelHistory.js — movementStyle по
// роли сверен с ПРАВИЛЬНЫМ окном последних 3 уровней (69/70/71, см. явный
// урок ниже), все 5 стилей уровня различны между собой. Пространство пар
// форм цепи (25/25) исчерпано для всех пяти ролей — раздел 13.8 применён с
// источниками, отличными от уровня 71.
//
// ИСПРАВЛЕННАЯ ОШИБКА РОТАЦИИ (важно для будущих уровней): при проектировании
// уровня 71 «последние 3 уровня» роли ошибочно считались как 67/68/69 —
// пропущен многофазный уровень 70, хотя его пять обликов занимают ТЕ ЖЕ
// слоты enem1-enem5, что и обычный уровень, и обязаны учитываться в ротации
// наравне с ним. Ошибка обнаружена и исправлена ДО публикации уровня 72
// (Развилень уровня 71 пришлось переделать с pause на drift) — здесь и на
// уровнях 73-74 окно считается верно: «последние 3» перед N — это N-3, N-2,
// N-1 без исключений для многофазных уровней.
//
// АРТ (images/enemies/regions/6_zasech_les/lvl72/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — Y-образное берёзовое деревце с верёвочной петлёй в «руках»-ветвях,
//   злое лицо на стволе — суть в ПРУЖИННОМ СИЛКЕ, что держит петлю наготове
//   между двумя стволами.
// 2.webp — свёрнутый кольцами толстый канат с оскаленной мордой на одном
//   конце, ползёт на когтистых культях — суть в ОБРЫВКЕ КАНАТА, что ползёт,
//   цепляясь узлами за корни (отдельно от Вязня, уровень 69, — там связка
//   БРЁВЕН, здесь чистая ВЕРЁВКА без единого полена).
// 3.webp — окованный железом деревянный сундук с рядом острых зубов вместо
//   петель, стоит на четырёх когтистых ножках — суть в УКРАДЕННОМ СУНДУКЕ,
//   что скачет на собственных ножках.
// 4.webp — гуманоид в остроконечном лоскутном капюшоне с ветвями вместо
//   перьев, держит трубу-дозорную рожок — суть в ДОЗОРНОМ РАЗБОЙНИКЕ, что
//   следит за тропой из засады.
// 5.webp (финал) — крупный бородатый гуманоид в остроконечном колпаке с
//   красной лентой, держит тяжёлую дубину-палицу с несколькими рожками на
//   поясе — суть в ГЛАВАРЕ-НАЛЁТЧИКЕ, самом тяжёлом и опытном бойце тропы.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА УРОВНЯ — «Разбойничьи следы»: сначала пружинный силок между деревьев
// (Силовень), затем обрывок каната от прежней жертвы (Вервень), украденный
// сундук на своих ножках (Ларень), дозорный на тропе (Дозорник) и, наконец,
// сам главарь налётчиков (Кряжевик) — пять улик одной разбойничьей тропы, а
// не пять случайных монстров.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Силовень (от «силок» —
// материал ловушки, не словарное «петля»/«ловушка»); Вервень (от архаичного
// «вервь» — толстая верёвка/канат, не словарное «канат»/«верёвка» напрямую
// и не пересекается с Вязенем уровня 69); Ларень (от «ларь» — сундук/короб,
// не словарное «сундук», и не пересекается со «Скрыня», уже занятым другим
// уровнем кампании); Дозорник (от «дозор» — служба, не словарное
// «разбойник»/«часовой»); Кряжевик (от «кряж» — крепкое, коренастое
// телосложение, не словарное «главарь»/«атаман»/«налётчик»). Проверено
// программно (grep по всем dispName всей кампании) — ни одно имя не
// встречается ранее.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА — письменно, ДО геометрии, для каждого:
//
// Силовень (enem1, movementStyle: wave, архетип «частота обманывает
// срочность»):
//   1. Кто/почему: пружинная петля — вылетев, продолжает мерно раскачиваться
//      (wave), как маятник на суку.
//   2. Хитрость: у wave частота и амплитуда — параметр КАЖДОЙ атаки отдельно
//      (waveFrequency/waveAmplitude в данных, не глобальная константа, в
//      отличие от weave — см. Стёгач, уровень 71). Сигнатурная пара пускает
//      рядом две петли с одинаковой амплитудой, но разной частотой раскачки
//      (одна — редкая, другая — частая) — прилетают они почти одновременно,
//      хотя частая выглядит заметно тревожнее редкой.
//   3. Привычка игрока: игрок оценивает срочность атаки по частоте видимого
//      дёргания (частое = скоро, редкое = не скоро) — здесь частота раскачки
//      никак не связана с реальным временем прилёта.
//   4. Честность: частота и амплитуда каждой петли заданы явно и не меняются
//      в полёте — наказывается перенос «частое дёргание = ближе к удару» с
//      других wave-атак, не скорость реакции.
//
// Вервень (enem2, movementStyle: weave, архетип «невидимая одинаковость»):
//   1. Кто/почему: обрывок каната, что ползёт, цепляясь узлами за корни —
//      виляет в полёте (weave), как и петля Силовеня, но тело — гибкий жгут,
//      не петля.
//   2. Хитрость: частота/амплитуда weave — фиксированная движковая константа
//      (±5.5%/1.35, см. Стёгач, уровень 71), а не параметр атаки. Сколько
//      РЕАЛЬНОГО времени атака проведёт в воздухе (и, значит, сколько раз
//      успеет вильнуть) зависит только от скорости падения — медленная
//      верёвка Вервеня успевает вильнуть несколько раз и выглядит «путано»,
//      а быстрая не успевает вильнуть почти ни разу и выглядит «прямо»,
//      хотя обе подчиняются ровно одной и той же формуле.
//   3. Привычка игрока: игрок судит о непредсказуемости атаки по количеству
//      видимых виляний за полёт — «прямая на вид» быстрая верёвка не менее
//      viляюча по своей природе, просто не успевает это показать.
//   4. Честность: формула виляния одна и та же для обеих скоростей без
//      исключений — наказывается вывод «раз не виляет — значит, летит
//      прямо», не скорость реакции.
//
// Ларень (enem3, movementStyle: lateRush, архетип «кажущаяся медлительность»
// на новом материале):
//   1. Кто/почему: украденный сундук на когтистых ножках — скачет спокойно,
//      но у самой цели рывком щёлкает зубастой крышкой (lateRush).
//   2. Хитрость: тот же движковый эффект, что у Частокольника (уровень 71,
//      колотушка) — здесь применён к прыжку сундука: видимый темп прыжка не
//      меняется до 55% пути, затем скачком (не разгоном) вырастает почти
//      вдвое на оставшейся части.
//   3. Привычка игрока: игрок, оценивающий время блока по видимому темпу
//      первой половины прыжка, недооценивает, насколько ближе окажется
//      сундук к моменту фактического прилёта.
//   4. Честность: телеграф и сам рывок — не короче и не резче, чем у любого
//      другого lateRush-босса кампании — наказывается недооценка кажущейся
//      начальной медлительности, не скорость реакции.
//
// Дозорник (enem4, movementStyle: pause, архетип «двойной результат одной
// паузы»):
//   1. Кто/почему: дозорный на тропе — застывает в засаде (pause: полная
//      остановка на 420мс при 42% пути), затем возобновляет бросок с
//      разгоном.
//   2. Хитрость: игрок уже видел pause как «долгая пауза = один сильный
//      удар в конце» (Плетеник, Чешуяк, Пересчётница, Дёгтень, уровень 69) —
//      здесь пауза сигнатурной серии разрешается в ДВА почти одновременных
//      броска с разных позиций, а не один.
//   3. Привычка игрока: за паузой игрок готовится блокировать один удар и
//      расслабляется сразу после первого блока — второй бросок прилетает
//      почти вплотную к первому.
//   4. Честность: оба броска читаются одинаково ясно, второй не мгновенный
//      и не короче по телеграфу — наказывается ложное расслабление после
//      первого блока, не скорость реакции.
//
// Кряжевик (enem5, финал уровня, movementStyle: drift, архетип «центр — не
// нейтральная точка»):
//   1. Кто/почему: бородатый глава разбойников с тяжёлой дубиной — финальный
//      боец, что бьёт точно из центра тропы; как финал, обязан проверить
//      навыки предыдущих четырёх и добавить собственный поворот (правило K).
//   2. Хитрость: движковое правило drift — `movementOriginX < 50 ? вправо :
//      влево` (game.js) — у атаки, запущенной РОВНО из центра (xPos=50),
//      сравнение «50 < 50» ложно, поэтому такая атака ВСЕГДА уходит влево,
//      а не остаётся на месте, как ожидал бы игрок от «удара из центра».
//   3. Привычка игрока: игрок считает центральный удар нейтральным («прилетит
//      там же, откуда стартовал») — здесь даже строго центральная атака
//      Кряжевика уходит в сторону.
//   4. Честность: это то же самое правило движка, что действует для любой
//      drift-атаки любого босса кампании (не исключение для Кряжевика,
//      см. также Развилень, уровень 71, где снос пересекает середину для
//      стартов ВБЛИЗИ центра — здесь же особый случай СТРОГО В центре) —
//      наказывается предположение о нейтральности центра, не скорость
//      реакции.
//
// ДВИЖЕНИЕ (movementStyle) — окно «последние 3» = 69/70/71 (см. исправление
// ошибки выше): Силовень — wave (роль enem1: 69 pause, 70 straight, 71
// lateRush — не использовался); Вервень — weave (роль enem2: 69 drift, 70
// lateRush, 71 accelerate — не использовался); Ларень — lateRush (роль
// enem3: 69 straight, 70 pause, 71 drift — не использовался); Дозорник —
// pause (роль enem4: 69 accelerate, 70 wave, 71 weave — не использовался);
// Кряжевик — drift (роль enem5: 69 wave, 70 accelerate, 71 straight — не
// использовался). Пять стилей уровня различны между собой.
//
// ЦЕПИ (13.6/13.7/13.8) — пространство пар форм (25/25) исчерпано для всех
// ролей — источники сознательно взяты НЕ из уровня 71 (свежесть):
// Силовень — arc(7)+vertical(7), источник arc+vertical — уровень 42 (@3+4)
//   — исключение: длина увеличена (7+7 vs 3+4);
// Вервень — arc(6)+zigzag(7), источник arc+zigzag — уровень 43 (@3+5) —
//   исключение: длина увеличена (6+7 vs 3+5);
// Ларень — arc(7)+irregular(6), источник arc+irregular — уровень 44 (@3+6)
//   — исключение: длина увеличена (7+6 vs 3+6);
// Дозорник — diagonal(6)+diagonal(7), источник diagonal+diagonal — уровень
//   45 (@4+6) — исключение: длина увеличена (6+7 vs 4+6);
// Кряжевик — zigzag(7)+vertical(7), источник zigzag+vertical — уровень 46
//   (@4+6) — исключение: длина увеличена (7+7 vs 4+6).
// Формы всех пяти пар подтверждены программным классификатором ДО записи
// (scratchpad/verifyShapes.js). Скорость вдоль каждой цепи невозрастающая
// (лесенка 18→…→6/7), yPos всех звеньев — 26 (граница движка
// CHAIN_MAX_SPAWN_Y). Ни одна barricade-способность не входит в isChain-
// комбо (ограничение раздела 16.4).
//
// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — КАЖДОЕ комбо из 2+ способностей
// посчитано scratchpad/designCalc.js ДО записи и повторно прогнано целиком
// через scratchpad/comboAudit.js — разброс прилётов у каждого комбо в
// пределах 94-1238мс (см. трейлинг-комментарии), ни одно комбо не состоит
// из двух и более genuinely медленных (customSpeed≤8) атак без быстрого
// элемента.
//
// БАРРИКАДЫ (раздел 16) — эскалация 1:1 с ролью: Силовень 3 удара/1200мс,
// Вервень 4/1600, Ларень 5/2000, Дозорник 6/2400, Кряжевик 7/2800 —
// barricadePauseMs = barricadeHits×400 (раздел 16.2) без исключений.
let lvlNumber = 72;

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
			movementStyle: 'wave', cadence: 0.92, telegraphMs: 900, speedMultiplier: 0.95, damageMultiplier: 0.92,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20]
		}, // Силовень: SNARE_SWING — разная частота раскачки не связана с реальным временем прилёта
		enem2: {
			movementStyle: 'weave', cadence: 1.00, telegraphMs: 780, speedMultiplier: 1.00, damageMultiplier: 1.02,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		}, // Вервень: COIL_CREEP — одна и та же формула виляния, разное время на её показ
		enem3: {
			movementStyle: 'lateRush', cadence: 0.95, telegraphMs: 900, speedMultiplier: 0.97, damageMultiplier: 1.08,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20]
		}, // Ларень: CHEST_SNAP — кажущаяся медлительность до 55% пути, затем рывок
		enem4: {
			movementStyle: 'pause', cadence: 0.90, telegraphMs: 950, speedMultiplier: 1.02, damageMultiplier: 1.13,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		}, // Дозорник: WATCH_HOLD — одна долгая пауза разрешается в два почти одновременных броска
		enem5: {
			movementStyle: 'drift', cadence: 1.05, telegraphMs: 820, speedMultiplier: 1.05, damageMultiplier: 1.19,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		} // Кряжевик: CENTER_BIAS — атака точно из центра всё равно уходит влево
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl72/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl72/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl72/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl72/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl72/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Силовень',
		image: 'images/enemies/regions/6_zasech_les/lvl72/1.webp',
		baseHP: 19208,
		baseSpeed: 0,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Вервень',
		image: 'images/enemies/regions/6_zasech_les/lvl72/2.webp',
		baseHP: 48020,
		baseSpeed: 0,
		baseDamage: 22,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Ларень',
		image: 'images/enemies/regions/6_zasech_les/lvl72/3.webp',
		baseHP: 84958,
		baseSpeed: 0,
		baseDamage: 24,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Дозорник',
		image: 'images/enemies/regions/6_zasech_les/lvl72/4.webp',
		baseHP: 136671,
		baseSpeed: 0,
		baseDamage: 26,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Кряжевик',
		image: 'images/enemies/regions/6_zasech_les/lvl72/5.webp',
		baseHP: 206854,
		baseSpeed: 0,
		baseDamage: 28,
		spawnWeight: 5,
		baseExp: 0,
		size: '32%',
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
	// ===== Силовень: SNARE_SWING — разная частота раскачки не связана с
	// реальным временем прилёта =====
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 0.9 }, //0 — сигнатура: редкая раскачка
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12, waveAmplitude: 6, waveFrequency: 1.6 }, //1 — сигнатура: частая раскачка, прилетает почти вместе
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20, waveAmplitude: 6, waveFrequency: 1.2 }, //2 — быстрый фланг
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22, waveAmplitude: 6, waveFrequency: 1.2 }, //3 — быстрый фланг
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12, waveAmplitude: 7, waveFrequency: 1.1 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13, waveAmplitude: 7, waveFrequency: 1.1 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5,  waveAmplitude: 8, waveFrequency: 1.0 }, //6 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4,  waveAmplitude: 8, waveFrequency: 1.0 }, //7 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.2 }, //8 — нежданчик: быстрый довесок к приманке
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.2 }, //10 — same-start-diverge
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11, waveAmplitude: 7, waveFrequency: 1.1 }, //11
	// БАРРИКАДА (раздел 16): туго свитая петля, что держит форму дольше
	// обычной.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.2 }, //12b
	// звенья цепи A — arc(7): раздел 13.8, пара arc+vertical переиспользована
	// из уровня 42 (@3+4), длина увеличена (7+7).
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //14 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //15 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //16 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 46, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //17 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 41, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //18 цепь-A звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 36, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //19 цепь-A звено 7
	// звенья цепи B — vertical(7): узкая колонна почти на месте.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //22 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //23 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //24 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //25 цепь-B звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //26 цепь-B звено 7

	// ===== Вервень: COIL_CREEP — одна и та же формула виляния, разное время
	// на её показ =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //0 — честная стена слева
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //1 — честная стена справа
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //2 — быстрый фланг
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //3 — быстрый фланг
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //6 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //7 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //8 — сигнатура: медленная, много виляний за долгий полёт
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //9 — сигнатура: быстрая, почти не виляет
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //10 — нежданчик: быстрый довесок к приманке
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //11
	// БАРРИКАДА (раздел 16): особо тугой узел, что не рассыпается сразу.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.3 }, //12b
	// звенья цепи A — arc(6): раздел 13.8, пара arc+zigzag переиспользована
	// из уровня 43 (@3+5), длина увеличена (6+7).
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //14 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //15 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 37, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //16 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //17 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 27, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //18 цепь-A звено 6
	// звенья цепи B — zigzag(7): резкий частый разброс.
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 59, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //22 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //23 цепь-B звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //24 цепь-B звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //25 цепь-B звено 7

	// ===== Ларень: CHEST_SNAP — кажущаяся медлительность до 55% пути, затем
	// рывок =====
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //0 — сигнатура: прыжок, часть 1
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //1 — сигнатура: рывок-довершение, часть 2
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //2 — быстрый фланг
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //3 — быстрый фланг
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //6 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //7 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //8 — нежданчик: быстрый довесок к приманке
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //10 — same-start-diverge
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //11
	// БАРРИКАДА (раздел 16): захлопнутая крышка, что не поддаётся с первого
	// удара.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.4 }, //12b
	// звенья цепи A — arc(7): раздел 13.8, пара arc+irregular переиспользована
	// из уровня 44 (@3+6), длина увеличена (7+6).
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //14 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //15 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //16 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //17 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 59, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //18 цепь-A звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //19 цепь-A звено 7
	// звенья цепи B — irregular(6): непредсказуемый разброс.
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //23 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //24 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //25 цепь-B звено 6

	// ===== Дозорник: WATCH_HOLD — одна долгая пауза разрешается в два
	// почти одновременных броска =====
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //0 — сигнатура: первый бросок после паузы
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //1 — сигнатура: второй, почти одновременный бросок
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //2 — быстрый фланг
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21 }, //3 — быстрый фланг
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //6 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //7 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //8 — нежданчик: быстрый довесок к приманке
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //10 — same-start-diverge
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //11
	// БАРРИКАДА (раздел 16): плотный ветвистый капюшон, набитый ветками —
	// требует больше ударов, чем у прежних трёх ролей.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.5 }, //12b
	// звенья цепи A — diagonal(6): раздел 13.8, пара diagonal+diagonal
	// переиспользована из уровня 45 (@4+6), первая цепь увеличена (6 vs 4).
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //14 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //15 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //16 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //17 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //18 цепь-A звено 6
	// звенья цепи B — diagonal(7): монотонный снос через всё поле в
	// противоположном направлении.
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //22 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //23 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //24 цепь-B звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //25 цепь-B звено 7

	// ===== Кряжевик: CENTER_BIAS — атака точно из центра всё равно уходит
	// влево =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //0 — сигнатура: строго центр, часть 1
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //1 — сигнатура: строго центр, часть 2
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //2 — быстрый фланг
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 23 }, //3 — быстрый фланг
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //6 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //7 — приманка (одиночная, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //8 — нежданчик: быстрый акцент
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19 }, //9 — нежданчик: быстрый довесок к приманке
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //11
	// БАРРИКАДА (раздел 16): вбитый в землю пограничный столб-идол — самая
	// крупная и стойкая баррикада уровня, финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.6 }, //12b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+vertical
	// переиспользована из уровня 46 (@4+6), первая цепь увеличена (7 vs 4).
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //14 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //15 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //16 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //17 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //18 цепь-A звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //19 цепь-A звено 7
	// звенья цепи B — vertical(7): узкая колонна почти на месте.
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 59, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //25 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //26 цепь-B звено 7
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 280, bossDelayAbDop: 5100 }, // петля успевает раскачаться перед новым броском
	{ boss: 'enem2', bossDelayAb: 235, bossDelayAbDop: 4200 }, // ровное, частое ползание
	{ boss: 'enem3', bossDelayAb: 270, bossDelayAbDop: 5000 }, // спокойные прыжки с редким рывком
	{ boss: 'enem4', bossDelayAb: 300, bossDelayAbDop: 5600 }, // долгая засадная пауза
	{ boss: 'enem5', bossDelayAb: 200, bossDelayAbDop: 3800 }, // самый частый, тяжёлый финал
];

// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — у каждого комбо из 2+ способностей ниже
// в трейлинг-комментарии указан реальный разброс прилётов, посчитанный
// scratchpad/designCalc.js ДО записи и повторно проверенный
// scratchpad/comboAudit.js ПОСЛЕ записи (level 72: 0 проблем).
const bossAbilitiesDop = [
	// Силовень — SNARE_SWING
	{ boss: 'enem1', indexAbilities: [0, 1] }, // сигнатурная: разная частота раскачки, почти одинаковый прилёт — разброс ~141мс
	{ boss: 'enem1', indexAbilities: [2, 3] }, // быстрый фланг — разброс ~145мс
	{ boss: 'enem1', indexAbilities: [4, 5] }, // средняя пара — разброс ~162мс
	{ boss: 'enem1', indexAbilities: [6] }, // приманка (одиночная)
	{ boss: 'enem1', indexAbilities: [7] }, // приманка (одиночная)
	{ boss: 'enem1', indexAbilities: [6, 8] }, // нежданчик: приманка + быстрый довесок — разброс ~812мс
	{ boss: 'enem1', indexAbilities: [9, 10] }, // быстрая пара акцентов — разброс ~174мс
	{ boss: 'enem1', indexAbilities: [12], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16, 17, 18, 19], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (7, раздел 13.8)

	// Вервень — COIL_CREEP
	{ boss: 'enem2', indexAbilities: [0, 1] }, // честная стена: обе верёвки с двух сторон — разброс ~143мс
	{ boss: 'enem2', indexAbilities: [2, 3] }, // быстрый фланг — разброс ~122мс
	{ boss: 'enem2', indexAbilities: [4, 5] }, // средняя пара — разброс ~157мс
	{ boss: 'enem2', indexAbilities: [6] }, // приманка (одиночная)
	{ boss: 'enem2', indexAbilities: [7] }, // приманка (одиночная)
	{ boss: 'enem2', indexAbilities: [8, 9] }, // сигнатурная: медленная и быстрая верёвка, одна формула виляния — разброс ~728мс
	{ boss: 'enem2', indexAbilities: [10, 11] }, // быстрая пара акцентов — разброс ~319мс
	{ boss: 'enem2', indexAbilities: [12], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 16, 17, 18], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (7, раздел 13.8)

	// Ларень — CHEST_SNAP
	{ boss: 'enem3', indexAbilities: [0, 1] }, // сигнатурная: кажущаяся медлительность, рывок в конце — разброс ~493мс
	{ boss: 'enem3', indexAbilities: [2, 3] }, // быстрый фланг — разброс ~144мс
	{ boss: 'enem3', indexAbilities: [4, 5] }, // средняя пара — разброс ~161мс
	{ boss: 'enem3', indexAbilities: [6] }, // приманка (одиночная)
	{ boss: 'enem3', indexAbilities: [7] }, // приманка (одиночная)
	{ boss: 'enem3', indexAbilities: [7, 9] }, // нежданчик: приманка + быстрый довесок — разброс ~1167мс
	{ boss: 'enem3', indexAbilities: [9, 10] }, // быстрая пара акцентов — разброс ~173мс
	{ boss: 'enem3', indexAbilities: [12], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17, 18, 19], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (6, раздел 13.8)

	// Дозорник — WATCH_HOLD
	{ boss: 'enem4', indexAbilities: [0, 1] }, // сигнатурная: пауза разрешается двумя почти одновременными бросками — разброс ~94мс
	{ boss: 'enem4', indexAbilities: [2, 3] }, // быстрый фланг — разброс ~221мс
	{ boss: 'enem4', indexAbilities: [4, 5] }, // средняя пара — разброс ~142мс
	{ boss: 'enem4', indexAbilities: [6] }, // приманка (одиночная)
	{ boss: 'enem4', indexAbilities: [7] }, // приманка (одиночная)
	{ boss: 'enem4', indexAbilities: [7, 8] }, // нежданчик: приманка + быстрый довесок — разброс ~1238мс
	{ boss: 'enem4', indexAbilities: [9, 10] }, // быстрая пара акцентов — разброс ~186мс
	{ boss: 'enem4', indexAbilities: [12], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 16, 17, 18], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (7, раздел 13.8)

	// Кряжевик — CENTER_BIAS, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] }, // сигнатурная: обе строго из центра, обе уходят влево — разброс ~114мс
	{ boss: 'enem5', indexAbilities: [2, 3] }, // быстрый фланг — разброс ~170мс
	{ boss: 'enem5', indexAbilities: [4, 5] }, // средняя пара — разброс ~132мс
	{ boss: 'enem5', indexAbilities: [6] }, // приманка (одиночная)
	{ boss: 'enem5', indexAbilities: [7] }, // приманка (одиночная)
	{ boss: 'enem5', indexAbilities: [6, 9] }, // нежданчик: приманка + быстрый довесок — разброс ~777мс
	{ boss: 'enem5', indexAbilities: [8, 9] }, // быстрая пара акцентов — разброс ~285мс
	{ boss: 'enem5', indexAbilities: [12], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16, 17, 18, 19], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (7, раздел 13.8)
];

// Лорные названия связок временных улучшений — пять улик одной разбойничьей
// тропы, словарь каждого строго завязан на его реальный облик и материал
// (правило 12.1): пружинная петля и ветви, толстая верёвка и узел, окованный
// сундук и замок, ветвистый капюшон и рожок, дубина и борода. Полных
// совпадений фраз между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
	// Силовень — пружинный силок: петля, ветвь, пружина, пенёк.
	enem1: {
		variant1: 'Силковый кураж', variant2: 'Петлевая хватка', variant3: 'Петля-таран',
		variant4: 'Пружинный напор', variant5: 'Меткий захлёст', variant6: 'Бешеный захлёст',
		variant7: 'Силковый норов', variant8: 'Крепкая ветвь', variant9: 'Ударный захлёст',
		variant10: 'Живучий пенёк', variant11: 'Колючий сук', variant12: 'Захлёст и в темноту',
		variant13: 'Толстая ветвь', variant14: 'Неутомимый захлёст', variant15: 'Пружинистый захлёст',
		variant16: 'Тугая петля, зоркий глаз', variant17: 'Силковая удача', variant18: 'Верный захлёст',
		variant19: 'Молниеносный захлёст', variant20: 'Силковый нюх', variant21: 'Цепкий сук',
		variant22: 'Юркий, несмотря на петлю', variant23: 'Силковая стойкость', variant24: 'Долгий взвод, зоркий глаз',
		variant25: 'Ускользающий захлёст', variant26: 'Дикий захлёст', variant27: 'Стойкая ветвь',
		variant28: 'Захлёст наповал', variant29: 'Крепкий силовень', variant30: 'Пружинная мощь',
		variant31: 'Захлёст с оглядкой', variant32: 'Живучая петля', variant33: 'Юркий и силковый',
		variant34: 'Пружинная прыть', variant35: 'Быстрый захлёст, крепкая ветвь'
	},
	// Вервень — обрывок каната: узел, верёвка, корень, петля-кольцо.
	enem2: {
		variant1: 'Вервяной кураж', variant2: 'Узловая хватка', variant3: 'Канат-таран',
		variant4: 'Ползучий напор', variant5: 'Меткий бросок кольцом', variant6: 'Бешеный бросок кольцом',
		variant7: 'Вервяной норов', variant8: 'Крепкий узел', variant9: 'Ударный бросок кольцом',
		variant10: 'Живучий корень', variant11: 'Колючая ворса', variant12: 'Бросок кольцом и в темноту',
		variant13: 'Толстый узел', variant14: 'Неутомимый бросок кольцом', variant15: 'Пружинистый бросок кольцом',
		variant16: 'Тугой виток, зоркий глаз', variant17: 'Вервяная удача', variant18: 'Верный бросок кольцом',
		variant19: 'Молниеносный бросок кольцом', variant20: 'Вервяной нюх', variant21: 'Цепкий корень',
		variant22: 'Юркий, несмотря на узел', variant23: 'Вервяная стойкость', variant24: 'Долгое сплетение, зоркий глаз',
		variant25: 'Ускользающий бросок кольцом', variant26: 'Дикий бросок кольцом', variant27: 'Стойкий узел',
		variant28: 'Бросок кольцом наповал', variant29: 'Крепкий вервень', variant30: 'Ползучая мощь',
		variant31: 'Бросок кольцом с оглядкой', variant32: 'Живучий узел', variant33: 'Юркий и вервяной',
		variant34: 'Ползучая прыть', variant35: 'Быстрый бросок кольцом, крепкий узел'
	},
	// Ларень — украденный сундук: замок, оковка, крышка, зуб.
	enem3: {
		variant1: 'Ларевый кураж', variant2: 'Замочная хватка', variant3: 'Крышка-таран',
		variant4: 'Скаковой напор', variant5: 'Меткий щёлк крышкой', variant6: 'Бешеный щёлк крышкой',
		variant7: 'Ларевый норов', variant8: 'Крепкая оковка', variant9: 'Ударный щёлк крышкой',
		variant10: 'Живучий замок', variant11: 'Колючая скоба', variant12: 'Щёлк крышкой и в темноту',
		variant13: 'Толстая оковка', variant14: 'Неутомимый щёлк крышкой', variant15: 'Пружинистый щёлк крышкой',
		variant16: 'Ржавый зуб, зоркий глаз', variant17: 'Ларевая удача', variant18: 'Верный щёлк крышкой',
		variant19: 'Молниеносный щёлк крышкой', variant20: 'Ларевый нюх', variant21: 'Цепкая скоба',
		variant22: 'Юркий, несмотря на оковку', variant23: 'Ларевая стойкость', variant24: 'Долгий прыжок, зоркий глаз',
		variant25: 'Ускользающий щёлк крышкой', variant26: 'Дикий щёлк крышкой', variant27: 'Стойкая оковка',
		variant28: 'Щёлк крышкой наповал', variant29: 'Крепкий ларень', variant30: 'Скаковая мощь',
		variant31: 'Щёлк крышкой с оглядкой', variant32: 'Живучая оковка', variant33: 'Юркий и ларевый',
		variant34: 'Скаковая прыть', variant35: 'Быстрый щёлк крышкой, крепкая оковка'
	},
	// Дозорник — дозорный на тропе: капюшон, рожок, ветвь-маскировка, плащ.
	enem4: {
		variant1: 'Дозорный кураж', variant2: 'Рожковая хватка', variant3: 'Рожок-таран',
		variant4: 'Засадный напор', variant5: 'Меткий бросок из засады', variant6: 'Бешеный бросок из засады',
		variant7: 'Дозорный норов', variant8: 'Крепкий капюшон', variant9: 'Ударный бросок из засады',
		variant10: 'Живучий плащ', variant11: 'Колючая ветвь-маска', variant12: 'Бросок из засады и в темноту',
		variant13: 'Толстый капюшон', variant14: 'Неутомимый бросок из засады', variant15: 'Пружинистый бросок из засады',
		variant16: 'Тихий шаг, зоркий глаз', variant17: 'Дозорная удача', variant18: 'Верный бросок из засады',
		variant19: 'Молниеносный бросок из засады', variant20: 'Дозорный нюх', variant21: 'Цепкий плащ',
		variant22: 'Юркий, несмотря на капюшон', variant23: 'Дозорная стойкость', variant24: 'Долгая слежка, зоркий глаз',
		variant25: 'Ускользающий бросок из засады', variant26: 'Дикий бросок из засады', variant27: 'Стойкий капюшон',
		variant28: 'Бросок из засады наповал', variant29: 'Крепкий дозорник', variant30: 'Засадная мощь',
		variant31: 'Бросок из засады с оглядкой', variant32: 'Живучий капюшон', variant33: 'Юркий и дозорный',
		variant34: 'Засадная прыть', variant35: 'Быстрый бросок из засады, крепкий капюшон'
	},
	// Кряжевик — глава налётчиков: дубина, борода, колпак, кряж.
	enem5: {
		variant1: 'Кряжевой кураж', variant2: 'Бородатая хватка', variant3: 'Дубина-таран',
		variant4: 'Главарский напор', variant5: 'Меткий удар дубиной', variant6: 'Бешеный удар дубиной',
		variant7: 'Кряжевой норов', variant8: 'Крепкий колпак', variant9: 'Ударный замах дубиной',
		variant10: 'Живучая борода', variant11: 'Колючая пряжка', variant12: 'Удар дубиной и в темноту',
		variant13: 'Толстый колпак', variant14: 'Неутомимый удар дубиной', variant15: 'Пружинистый удар дубиной',
		variant16: 'Алая лента, зоркий глаз', variant17: 'Кряжевая удача', variant18: 'Верный удар дубиной',
		variant19: 'Молниеносный удар дубиной', variant20: 'Кряжевой нюх', variant21: 'Цепкий пояс',
		variant22: 'Юркий, несмотря на кряж', variant23: 'Кряжевая стойкость', variant24: 'Частый навал, зоркий глаз',
		variant25: 'Ускользающий удар дубиной', variant26: 'Дикий удар дубиной', variant27: 'Стойкий колпак',
		variant28: 'Удар дубиной наповал', variant29: 'Крепкий кряжевик', variant30: 'Главарская мощь',
		variant31: 'Удар дубиной с оглядкой', variant32: 'Живучий колпак', variant33: 'Юркий и кряжевой',
		variant34: 'Главарская прыть', variant35: 'Быстрый удар дубиной, крепкий колпак'
	}
};
