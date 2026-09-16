// Уровень 67 «Гиблый бурелом» — второй уровень области VI «Глухой край»
// («Засечный лес»), обычный уровень (пять разных монстров). Продолжает
// сквозную механику «Баррикада» (раздел 16 lvlData/Правила создания
// уровня.txt), заложенную на уровне 66.
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью
// этого файла: полная история 1-66 (330 строк) прогнана эквивалентом живого
// классификатора панели (тот же classifyChainShape/extractComments, что и в
// admin-boss-pattern-panel.html, исполнен в Node через vm вместо браузера —
// см. scratchpad/panelHistory.js). Установлено: пространство пар форм цепи
// (5 форм × 2 цепи = 25) уже ИСЧЕРПАНО (25/25 занято) для ВСЕХ ПЯТИ ролей
// к уровню 66 — раздел 13.8 применяется ниже explicit-но для каждого босса
// (переиспользуется существующая пара форм, но с ЗАМЕТНО другой длиной —
// не на 1 звено, а фактическим удвоением или близким к нему).
//
// АРТ (images/enemies/regions/6_zasech_les/lvl67/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — ухмыляющаяся тёмно-серая грозовая туча-моток с пурпурно-бирюзовыми
//   языками электрического пламени по краю и торчащими из тела щепками —
//   суть в НЕБЕСНОЙ ГРОЗЕ, что и повалила лес (буквальная причина бурелома).
// 2.webp — плотная тёмная птица (сова/ворон) с металлической клёпаной
//   скобой на клюве (когда-то намордник, теперь трофей ярости) и крупными
//   когтями — суть в ЗАСАДНОМ БРОСКЕ подраненного, но оттого более злого
//   хищника, а не в чистом клевке.
// 3.webp — иссохшее мёртвое дерево с светящимся дуплом-глазом на стволе,
//   голыми скрюченными ветвями и оскаленной корой-мордой — суть в
//   КАЧАНИИ РАЗБИТЫХ ВЕТВЕЙ на разной высоте, а не в едином ударе ствола.
// 4.webp — фигура из соломы и лозы в остроконечном плетёном капюшоне,
//   с верёвочными обмотками и копьём в руке — суть в ДИСЦИПЛИНИРОВАННОМ
//   ЧАСОВОМ, который держит стойку и колет редко, но метко.
// 5.webp (финал) — исполинская тёмная хищная птица с широким размахом
//   крыльев и оскаленным клювом — суть в ВЕТРЕ-ХИЩНИКЕ, что парит на
//   грозовых потоках Грозовика и довершает разгром бурелома.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА УРОВНЯ — «Гиблый бурелом»: настоящая гроза (Грозовик) повалила лес,
// в завале поселился одичавший хищник (Клепоклюв), сама древесина ожила от
// злобы (Сушняк), пограничная стража поставила часового среди завала
// (Плетеник), а над всем этим кружит крылатый хищник бури (Ветрокрыл) —
// каждый противник объясняет РАЗНУЮ причину/следствие одного и того же
// бурелома, а не пять случайных монстров леса.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Грозовик (от «гроза»,
// не словарное «туча»); Клепоклюв (составное «клёпаный клюв», не словарное
// «сова»/«ворон»); Сушняк (от «сухостой/сушь» — материал, не словарное
// «дерево», по аналогии со «Смоляк» уровня 66); Плетеник (от «плетень/
// плести» — материал, не словарное «чучело»); Ветрокрыл (составное «ветер+
// крыло», не словарное «орёл»/«сова»). Проверено программно (grep по всем
// dispName всей кампании) — ни одно имя не встречается ранее.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА (блок в начале Правил создания уровня.txt) —
// письменно, ДО геометрии, для КАЖДОГО из пяти протagonистов:
//
// Грозовик (enem1, movementStyle: accelerate, архетип «дождь сверху»):
//   1. Кто/почему: грозовая туча, что буквально повалила лес — её атаки
//      это гонимый ветром мусор/град, падающий сверху по всей ширине поля.
//   2. Хитрость: атаки, что ВЫГЛЯДЯТ как типичная «медленная» угроза (низкий
//      customSpeed, длинный телеграф — ровно то, чему учат все предыдущие
//      уровни: «медленное = можно отвлечься»), но movementStyle=accelerate
//      заметно разгоняет их именно на последней трети полёта. Привычный
//      сигнал «медленно» перестаёт значить «есть время отвлечься».
//   3. Привычка игрока: за 66 уровней игрок обучен переключать внимание С
//      медленных атак НА быстрые, доверяя первому впечатлению о скорости.
//      Грозовик наказывает именно это доверие первому кадру полёта.
//   4. Честность: телеграф длинный (900мс, роль «спокойный»), ускорение
//      происходит КАЖДЫЙ раз одинаково (не рандомно) — внимательный игрок,
//      досматривающий полёт целиком, а не только старт, спокойно читает
//      угрозу; наказывается только ранний отвод взгляда.
//
// Клепоклюв (enem2, movementStyle: lateRush, архетип «только фланги»):
//   1. Кто/почему: одичавший хищник в завале, чей клюв скован клёпаной
//      скобой — не может бить точным клевком, поэтому атакует всем телом,
//      резким броском с одного из флангов (буквально «только фланги»).
//   2. Хитрость: пара атак [12,13] — абсолютно ОДИНАКОВЫЙ по виду и
//      длительности замах запускается с обеих сторон почти впритык друг к
//      другу (реальный разрыв старта — около одного шага cadence, порядка
//      190-220мс, то есть на грани человеческой реакции: практически
//      неразличимо «что было раньше» в потоке боя) — и только в момент
//      самого рывка становится ясно, с какой стороны реальная угроза
//      (комбинация читается как «нужно ждать рывка», а не «нужно целиться
//      заранее»). Числа проверены: это НЕ буквально один и тот же кадр
//      (движок разносит атаки одного комбо на шаг cadence), но разрыв
//      короче типичного времени выбора стороны, поэтому на экране это
//      ощущается как одна и та же угроза с двух сторон сразу.
//   3. Привычка игрока: у предыдущих флангово-ориентированных боссов кампании
//      сторона атаки обычно читалась ДО начала замаха (по тому, какая
//      сторона поля «активна») — здесь обе стороны почти сразу становятся
//      «активны», и попытка выбрать сторону заранее — угадывание 50/50.
//   4. Честность: телеграф длинный (760-1050мс по фазе), после начала
//      реального рывка остаётся честное время среагировать (тот же 720мс+
//      честный интервал между флангами, раздел 5.1) — наказывается
//      преждевременный выбор стороны, не реакция как таковая.
//
// Сушняк (enem3, movementStyle: wave, архетип «скрещённые высоты на
// флангах»):
//   1. Кто/почему: мёртвое дерево, чьи уцелевшие ветви качаются на разной,
//      «скрещённой» высоте слева и справа (не симметрично) — прямое
//      следствие того, что часть веток обломана бурей неравномерно.
//   2. Хитрость: пара волновых атак [10,11] запущена с намеренно
//      противоположной фазой качания (в отличие от типичных «синхронных»
//      парных атак прошлых уровней) — если следить за одной и
//      экстраполировать, что вторая качается в такт первой, обе НЕ
//      совпадут в момент, когда игрок ждёт.
//   3. Привычка игрока: парные одинаковые атаки почти всегда воспринимаются
//      как зеркальные копии друг друга (так было у большинства прошлых
//      парных комбо кампании) — здесь это предположение конкретно ломается.
//   4. Честность: обе волны видны одновременно и непрерывно (не скрыты
//      друг за другом) — внимательный игрок, отслеживающий каждую волну
//      независимо, читает и отбивает обе по очереди; наказывается именно
//      допущение синхронности, не скорость реакции.
//
// Плетеник (enem4, movementStyle: pause, архетип «короткие одиночные удары
// с длинными паузами»):
//   1. Кто/почему: дисциплинированный плетёный часовой на посту — держит
//      стойку и колет копьём редко, но каждый укол значим (буквальная суть
//      «часового», не преследователя).
//   2. Хитрость: один и тот же долгий замах (движение «pause») иногда
//      резолвится ОДНИМ уколом, а иногда ДВУМЯ подряд почти без визуальной
//      разницы в самом замахе — вплоть до редкого ТРЕТЬЕГО укола-нежданчика
//      (комбо [0,1,13]).
//   3. Привычка игрока: боссы с movementStyle pause на прошлых уровнях
//      (например Смоляк, уровень 66) стабильно резолвили замах РОВНО одним
//      ударом — приученный к этому игрок расслабляется сразу после первого
//      укола Плетеника.
//   4. Честность: каждый следующий укол читается так же ясно, как первый
//      (не быстрее, не короче телеграфирован) — это дополнительный честный
//      удар, а не скрытая ловушка; наказывается преждевременное
//      расслабление, а не скорость реакции на сам укол.
//
// Ветрокрыл (enem5, финал уровня, movementStyle: weave, архетип
// «последовательное закрытие безопасных зон»):
//   1. Кто/почему: крылатый хищник, что парит на грозовых потоках Грозовика
//      и довершает разгром бурелома — как финал уровня, обязан проверить
//      навыки, выученные на предыдущих четверых, и добавить свой поворот
//      (правило K).
//   2. Хитрость: сигнатурная атака [12] буквально комбинирует хитрость
//      Грозовика (кажется медленной/безопасной по стартовой скорости) и
//      Клепоклюва (симметрично неопределима по стороне благодаря weave-
//      покачиванию) — но, в отличие от них по отдельности, здесь ОБА
//      эффекта работают ОДНОВРЕМЕННО на одной атаке.
//   3. Привычка игрока: игрок, только что «решивший» Грозовика и Клепоклюва
//      как отдельные уроки этого же уровня, склонен применять только ОДИН
//      выученный урок за раз — Ветрокрыл наказывает именно переключение
//      между уроками по очереди вместо одновременной бдительности к обоим.
//   4. Честность: телеграф самый долгий на уровне (970-1000мс по роли
//      «финал»), опасная сигнатурная комбинация — редкая (раздел 11), с
//      безопасным коридором в остальных комбо; наказывается инерция
//      «я уже понял этот уровень», а не честная реакция.
//
// ДВИЙЖЕНИЕ (movementStyle) — сверено с полным распределением 1-66 (см.
// scratchpad/panelHistory.js): Грозовик — accelerate (роль enem1: 8/66=12%,
// не использовался в последних 6 уровнях подряд, свежий выбор); Клепоклюв —
// lateRush (роль enem2: 10/66=15%, не использовался в последних 6);
// Сушняк — wave (роль enem3: 8/66=12%, самый низкий бакет роли, не
// использовался в последних 6); Плетеник — pause (роль enem4: 9/66=14%, не
// использовался в последних 6, где было straight×3); Ветрокрыл — weave
// (роль enem5: 5/66=8%, самый низкий бакет роли, усиленно нужен). Пять
// стилей уровня различны между собой.
//
// ЦЕПИ (13.6/13.7/13.8) — пространство пар форм (25/25) исчерпано для всех
// ролей к уровню 66 (пересчитано скриптом, не предположено) — применяется
// раздел 13.8: переиспользуется существующая пара форм, но с ЗАМЕТНО другой
// (кратно увеличенной) длиной, помечено явно у каждого босса ниже:
// Грозовик — diagonal(6)+diagonal(7), источник пары diagonal+diagonal —
//   уровень 45 (@3+3) — исключение: удвоенная длина (6+7 vs 3+3);
// Клепоклюв — diagonal(6)+vertical(7), источник — уровень 45 (@3+4) —
//   исключение: удвоенная длина (6+7 vs 3+4);
// Сушняк — arc(6)+diagonal(6), источник — уровень 64 (@3+3) — исключение:
//   удвоенная длина (6+6 vs 3+3);
// Плетеник — diagonal(6)+arc(7), источник — уровень 51 (@3+4) —
//   исключение: удвоенная длина (6+7 vs 3+4);
// Ветрокрыл — arc(7)+vertical(7), источник arc+vertical — уровень 48
//   (@3+3) — исключение: удвоенная длина (7+7 vs 3+3), максимальная длина
//   обеих цепей уместна для финала уровня.
// Формы всех пяти пар подтверждены программным классификатором ДО записи
// (scratchpad/shapeVerify67-69.js) — каждая xPos-последовательность даёт
// именно заявленную форму, не предположена на глаз. Скорость вдоль каждой
// цепи невозрастающая (лесенка 18→…→6/7, тот же приём, что и на уровне 66),
// yPos всех звеньев — 26 (граница движка CHAIN_MAX_SPAWN_Y, тот же приём,
// что и на всех уровнях области V/VI). Ни одна barricade-способность не
// входит в isChain-комбо (ограничение раздела 16.4).
//
// БАРРИКАДЫ (раздел 16) — у каждого из пяти противников ровно ОДНА
// barricade-способность, эскалация 1:1 с ролью (как на уровне 66):
// Грозовик 3 удара/1200мс, Клепоклюв 4/1600, Сушняк 5/2000, Плетеник
// 6/2400, Ветрокрыл 7/2800 — barricadePauseMs = barricadeHits×400 (раздел
// 16.2) для каждого без исключений.
let lvlNumber = 67;

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
			movementStyle: 'accelerate', cadence: 1.00, telegraphMs: 900, speedMultiplier: 0.92, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Грозовик: STORM_RAIN — гонимый ветром мусор, кажется медленным, разгоняется в конце
		enem2: {
			movementStyle: 'lateRush', cadence: 1.10, telegraphMs: 820, speedMultiplier: 1.00, damageMultiplier: 1.02,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20]
		}, // Клепоклюв: MAULED_LUNGE — скованный клюв, резкий бросок всем телом с фланга
		enem3: {
			movementStyle: 'wave', cadence: 0.93, telegraphMs: 800, speedMultiplier: 0.96, damageMultiplier: 1.08,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20]
		}, // Сушняк: DEADWOOD_SWAY — обломанные ветви качаются на скрещённой высоте
		enem4: {
			movementStyle: 'pause', cadence: 0.88, telegraphMs: 880, speedMultiplier: 1.05, damageMultiplier: 1.10,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		}, // Плетеник: SENTRY_JAB — долгая стойка, редкий, но меткий укол копьём
		enem5: {
			movementStyle: 'weave', cadence: 0.83, telegraphMs: 980, speedMultiplier: 1.06, damageMultiplier: 1.17,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		} // Ветрокрыл: STORM_STOOP — парит на грозовых потоках, комбинирует уловки всего уровня
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl67/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl67/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl67/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl67/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl67/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Грозовик',
		image: 'images/enemies/regions/6_zasech_les/lvl67/1.webp',
		baseHP: 17491,
		baseSpeed: 0,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Клепоклюв',
		image: 'images/enemies/regions/6_zasech_les/lvl67/2.webp',
		baseHP: 43728,
		baseSpeed: 0,
		baseDamage: 22,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Сушняк',
		image: 'images/enemies/regions/6_zasech_les/lvl67/3.webp',
		baseHP: 77365,
		baseSpeed: 0,
		baseDamage: 24,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Плетеник',
		image: 'images/enemies/regions/6_zasech_les/lvl67/4.webp',
		baseHP: 124457,
		baseSpeed: 0,
		baseDamage: 26,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Ветрокрыл',
		image: 'images/enemies/regions/6_zasech_les/lvl67/5.webp',
		baseHP: 188367,
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
	// ===== Грозовик: STORM_RAIN — дождь сверху, гонимый ветром мусор =====
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: капля точно по центру на «быстрой» скорости, ломает шаблон «края уровня = быстро, центр = медленно»
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// БАРРИКАДА (раздел 16): плотный ком мусора и щепок, гонимый ветром —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.2 }, //16b
	// звенья «атакующей цепи» A — diagonal(6): раздел 13.8, пара
	// diagonal+diagonal переиспользована из уровня 45 (@3+3), но с
	// заметно (вдвое) большей длиной — 6+7 против 3+3.
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //19 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 46, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //20 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //21 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //22 цепь-A звено 6
	// звенья цепи B — diagonal(7), встречное направление.
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //24 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //25 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //26 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //27 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //28 цепь-B звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //29 цепь-B звено 7

	// ===== Клепоклюв: MAULED_LUNGE — скованный клюв, бросок всем телом с
	// одного из флангов =====
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 5,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 7,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 9,  yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //12 — сигнатура: симметричный замах слева
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13 — сигнатура: тот же замах справа, неотличим от 12 до самого рывка
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //15
	// БАРРИКАДА (раздел 16): вырванный с корнем ком подлеска, зажатый в
	// когтях — плотный, требует несколько ударов.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.3 }, //16b
	// звенья цепи A — diagonal(6): раздел 13.8, пара diagonal+vertical
	// переиспользована из уровня 45 (@3+4), длина увеличена вдвое (6+7).
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 27, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //19 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //20 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //21 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //22 цепь-A звено 6
	// звенья цепи B — vertical(7): почти неподвижный xPos, чистый удар вниз.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //24 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //25 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //26 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //27 цепь-B звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //28 цепь-B звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //29 цепь-B звено 7

	// ===== Сушняк: DEADWOOD_SWAY — обломанные ветви качаются на скрещённой
	// высоте слева и справа =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //1
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16,
	  waveAmplitude: 9, waveFrequency: 1.4, wavePhase: 0 },                                                                          //10 — сигнатура: волна-A, фаза 0 (явно задана, не отдана на откуп случайному дефолту)
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16,
	  waveAmplitude: 9, waveFrequency: 1.4, wavePhase: 3.14 },                                                                        //11 — сигнатура: волна-B, явная противофаза (wavePhase сдвинут на π от звена 10)
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13,
	  waveAmplitude: 9, waveFrequency: 1.4, wavePhase: 0 },                                                                           //12 — нежданчик: та же явная пара фаз (0/π), но по центру
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14,
	  waveAmplitude: 9, waveFrequency: 1.4, wavePhase: 3.14 },                                                                        //13
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): обломок толстого сука, застрявший в трещине —
	// плотный, требует несколько ударов.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.4 }, //16b
	// звенья цепи A — arc(6): раздел 13.8, пара arc+diagonal переиспользована
	// из уровня 64 (@3+3), длина увеличена вдвое (6+6).
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //19 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //20 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //21 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //22 цепь-A звено 6
	// звенья цепи B — diagonal(6), встречное направление.
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 73, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //24 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //25 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //26 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 37, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //27 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //28 цепь-B звено 6

	// ===== Плетеник: SENTRY_JAB — долгая стойка часового, редкий, но меткий
	// укол копьём =====
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0 — одиночный укол
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //1 — второй укол той же стойки
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //13 — нежданчик: третий укол той же стойки, редкий
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): вязанка кольев, брошенная поперёк пути —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.5 }, //16b
	// звенья цепи A — diagonal(6): раздел 13.8, пара diagonal+arc
	// переиспользована из уровня 51 (@3+4), длина увеличена вдвое (6+7).
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 36, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //19 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //20 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //21 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //22 цепь-A звено 6
	// звенья цепи B — arc(7): подъём, затем спуск.
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //24 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //25 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //26 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //27 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //28 цепь-B звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //29 цепь-B звено 7

	// ===== Ветрокрыл: STORM_STOOP — парит на грозовых потоках, комбинирует
	// хитрости всего уровня =====
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //0 — зона 1 (левый край)
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //1 — зона 2 (правый край)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //2 — зона 3 (центр)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //3 — зона 4 (левая середина)
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //4 — зона 5 (правая середина)
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //12 — сигнатура: центр, «медленная на вид» weave-скорость, ускорение и направление раскрываются только в последней трети полёта
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// БАРРИКАДА (раздел 16): цельный вырванный корень, самая крупная и
	// стойкая баррикада уровня — финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.6 }, //16b
	// звенья цепи A — arc(7): раздел 13.8, пара arc+vertical переиспользована
	// из уровня 48 (@3+3), длина увеличена более чем вдвое (7+7) — финал
	// уровня уместно получает самую длинную и весомую цепь.
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //18 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //19 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //20 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //21 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //22 цепь-A звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //23 цепь-A звено 7
	// звенья цепи B — vertical(7): почти неподвижный xPos.
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //24 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //25 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //26 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //27 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //28 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //29 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //30 цепь-B звено 7
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 320, bossDelayAbDop: 5600 }, // редкий, «ленивый» на вид дождь
	{ boss: 'enem2', bossDelayAb: 215, bossDelayAbDop: 4100 }, // частые засадные броски
	{ boss: 'enem3', bossDelayAb: 425, bossDelayAbDop: 7100 }, // самый долгий отдых — неспешное качание
	{ boss: 'enem4', bossDelayAb: 190, bossDelayAbDop: 3400 }, // частые, но короткие уколы
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 5200 }, // собранный финал
];

const bossAbilitiesDop = [
	// Грозовик — STORM_RAIN
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [11, 12] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится ранним разгоном
	{ boss: 'enem1', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27, 28, 29], isChain: true }, // ← цепь-B (7, раздел 13.8)
	{ boss: 'enem1', indexAbilities: [13, 7, 8] }, // нежданчик: капля по центру на «быстрой» скорости
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: полный дождь по всей ширине плюс лишняя капля

	// Клепоклюв — MAULED_LUNGE
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится ранним рывком
	{ boss: 'enem2', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28, 29], isChain: true }, // ← цепь-B (7, раздел 13.8)
	{ boss: 'enem2', indexAbilities: [10, 11] }, // нежданчик: медленный обманный подход с обеих сторон
	{ boss: 'enem2', indexAbilities: [12, 13] }, // сигнатурная: симметричный рывок — сторона неясна до последнего мгновения

	// Сушняк — DEADWOOD_SWAY
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым флангом
	{ boss: 'enem3', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20, 21, 22], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26, 27, 28], isChain: true }, // ← цепь-B (6, раздел 13.8)
	{ boss: 'enem3', indexAbilities: [12, 13] }, // нежданчик: противофазная волна по центру
	{ boss: 'enem3', indexAbilities: [10, 11] }, // сигнатурная: противофазные волны на флангах — синхронность обманчива

	// Плетеник — SENTRY_JAB
	{ boss: 'enem4', indexAbilities: [0] },
	{ boss: 'enem4', indexAbilities: [0, 1] }, // same-start с [0]: тот же замах, второй укол следом
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21, 22], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26, 27, 28, 29], isChain: true }, // ← цепь-B (7, раздел 13.8)
	{ boss: 'enem4', indexAbilities: [0, 1, 13] }, // нежданчик: та же стойка резолвится ТРЕТЬИМ уколом
	{ boss: 'enem4', indexAbilities: [8, 9, 10] }, // сигнатурная: три метких укола через всё поле подряд

	// Ветрокрыл — STORM_STOOP, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым разгоном
	{ boss: 'enem5', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22, 23], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29, 30], isChain: true }, // ← цепь-B (7, раздел 13.8)
	{ boss: 'enem5', indexAbilities: [12] }, // нежданчик/сигнатура: комбинированная уловка Грозовика и Клепоклюва разом
	{ boss: 'enem5', indexAbilities: [2, 7, 8, 9] }, // сигнатурная кульминация: последовательное закрытие зон — центр, затем тройной разгон
];

// Лорные названия связок временных улучшений — пять существ одного бурелома,
// словарь каждого строго завязан на его реальный облик и материал (правило
// 12.1): туча грохочет громом и ветром, хищник — клёпаным клювом и когтем,
// сушняк — трухой и корой, часовой — лозой и копьём, крылатый хищник —
// пером и бурей. Полных совпадений фраз между монстрами нет (проверено
// вручную построчно).
const UPGRADE_VARIANT_NAMES = {
	// Грозовик — грозовая туча: гром, молния, ветер, ливень.
	enem1: {
		variant1: 'Грозовой кураж', variant2: 'Громовая хватка', variant3: 'Молния-таран',
		variant4: 'Ветряной напор', variant5: 'Меткий разряд', variant6: 'Бешеный разряд',
		variant7: 'Грозовой норов', variant8: 'Крепкая туча', variant9: 'Ударный разряд',
		variant10: 'Живучая туча', variant11: 'Колючий град', variant12: 'Разряд и в темноту',
		variant13: 'Плотная туча', variant14: 'Неутомимый разряд', variant15: 'Пружинистый разряд',
		variant16: 'Багровый отблеск, зоркий глаз', variant17: 'Грозовая удача', variant18: 'Верный разряд',
		variant19: 'Молниеносный разряд', variant20: 'Грозовой нюх', variant21: 'Цепкий град',
		variant22: 'Юркая, несмотря на тучность', variant23: 'Грозовая стойкость', variant24: 'Долгий раскат, зоркий глаз',
		variant25: 'Ускользающий разряд', variant26: 'Дикий разряд', variant27: 'Стойкая туча',
		variant28: 'Разряд наповал', variant29: 'Крепкий грозовик', variant30: 'Ветряная мощь',
		variant31: 'Разряд с оглядкой', variant32: 'Живучий раскат', variant33: 'Юркая и грозовая',
		variant34: 'Грозовая прыть', variant35: 'Быстрый разряд, плотная туча'
	},
	// Клепоклюв — скованный клюв: клёпка, коготь, перо, ярость.
	enem2: {
		variant1: 'Клёпаный кураж', variant2: 'Когтевая хватка', variant3: 'Клюв-таран',
		variant4: 'Яростный напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
		variant7: 'Клёпаный норов', variant8: 'Крепкая скоба', variant9: 'Ударный бросок',
		variant10: 'Живучий коготь', variant11: 'Колючее перо', variant12: 'Бросок и в темноту',
		variant13: 'Толстая скоба', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
		variant16: 'Ржавая клёпка, зоркий глаз', variant17: 'Клёпаная удача', variant18: 'Верный бросок',
		variant19: 'Молниеносный бросок', variant20: 'Клёпаный нюх', variant21: 'Цепкий коготь',
		variant22: 'Юркий, несмотря на скобу', variant23: 'Клёпаная стойкость', variant24: 'Долгий замах, зоркий глаз',
		variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкая скоба',
		variant28: 'Бросок наповал', variant29: 'Крепкий клепоклюв', variant30: 'Яростная мощь',
		variant31: 'Бросок с оглядкой', variant32: 'Живучая скоба', variant33: 'Юркий и клёпаный',
		variant34: 'Яростная прыть', variant35: 'Быстрый бросок, крепкая скоба'
	},
	// Сушняк — сухое мёртвое дерево: сук, кора, труха, дупло.
	enem3: {
		variant1: 'Сухостойный кураж', variant2: 'Сучковая хватка', variant3: 'Сук-таран',
		variant4: 'Трухлявый напор', variant5: 'Меткое качание', variant6: 'Бешеное качание',
		variant7: 'Сухостойный норов', variant8: 'Крепкая кора', variant9: 'Ударное качание',
		variant10: 'Живучий сук', variant11: 'Колючий сук', variant12: 'Качание и в темноту',
		variant13: 'Толстая кора', variant14: 'Неутомимое качание', variant15: 'Пружинистое качание',
		variant16: 'Светящееся дупло, зоркий глаз', variant17: 'Сухостойная удача', variant18: 'Верное качание',
		variant19: 'Молниеносное качание', variant20: 'Сухостойный нюх', variant21: 'Цепкий сук',
		variant22: 'Юркий, несмотря на сушь', variant23: 'Сухостойная стойкость', variant24: 'Долгий скрип, зоркий глаз',
		variant25: 'Ускользающее качание', variant26: 'Дикое качание', variant27: 'Стойкая кора',
		variant28: 'Качание наповал', variant29: 'Крепкий сушняк', variant30: 'Трухлявая мощь',
		variant31: 'Качание с оглядкой', variant32: 'Живучая кора', variant33: 'Юркий и сухостойный',
		variant34: 'Трухлявая прыть', variant35: 'Быстрое качание, крепкая кора'
	},
	// Плетеник — плетёный часовой: лоза, солома, верёвка, копьё.
	enem4: {
		variant1: 'Плетёный кураж', variant2: 'Лозовая хватка', variant3: 'Копьё-таран',
		variant4: 'Часовой напор', variant5: 'Меткий укол', variant6: 'Бешеный укол',
		variant7: 'Плетёный норов', variant8: 'Крепкая лоза', variant9: 'Ударный укол',
		variant10: 'Живучая солома', variant11: 'Колючая солома', variant12: 'Укол и в темноту',
		variant13: 'Толстая лоза', variant14: 'Неутомимый укол', variant15: 'Пружинистый укол',
		variant16: 'Острое копьё, зоркий глаз', variant17: 'Плетёная удача', variant18: 'Верный укол',
		variant19: 'Молниеносный укол', variant20: 'Плетёный нюх', variant21: 'Цепкая верёвка',
		variant22: 'Юркий, несмотря на стойку', variant23: 'Плетёная стойкость', variant24: 'Долгая стойка, зоркий глаз',
		variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Стойкая лоза',
		variant28: 'Укол наповал', variant29: 'Крепкий плетеник', variant30: 'Часовая мощь',
		variant31: 'Укол с оглядкой', variant32: 'Живучая верёвка', variant33: 'Юркий и плетёный',
		variant34: 'Часовая прыть', variant35: 'Быстрый укол, крепкая лоза'
	},
	// Ветрокрыл — крылатый хищник бури: перо, крыло, буря, коготь.
	enem5: {
		variant1: 'Ветряной кураж', variant2: 'Крылатая хватка', variant3: 'Коготь-таран',
		variant4: 'Буревой напор', variant5: 'Меткое пике', variant6: 'Бешеное пике',
		variant7: 'Ветряной норов', variant8: 'Крепкое перо', variant9: 'Ударное пике',
		variant10: 'Живучее крыло', variant11: 'Колючий коготь', variant12: 'Пике и в темноту',
		variant13: 'Толстое перо', variant14: 'Неутомимое пике', variant15: 'Пружинистое пике',
		variant16: 'Тёмное оперение, зоркий глаз', variant17: 'Ветряная удача', variant18: 'Верное пике',
		variant19: 'Молниеносное пике', variant20: 'Ветряной нюх', variant21: 'Хваткий размах',
		variant22: 'Юркий, несмотря на размах', variant23: 'Ветряная стойкость', variant24: 'Долгий парящий полёт, зоркий глаз',
		variant25: 'Ускользающее пике', variant26: 'Дикое пике', variant27: 'Стойкое перо',
		variant28: 'Пике наповал', variant29: 'Крепкий ветрокрыл', variant30: 'Буревая мощь',
		variant31: 'Пике с оглядкой', variant32: 'Живучий размах', variant33: 'Юркий и ветряной',
		variant34: 'Буревая прыть', variant35: 'Быстрое пике, крепкое перо'
	}
};
