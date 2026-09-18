// Уровень 70 «Налёт с огненного неба» — пятый уровень области VI «Глухой
// край» («Засечный лес»), ОСОБЫЙ многофазный уровень (правило 13.6/13.1):
// один персонаж, Тугарин Змей, в пяти нарастающих обликах. Первый
// многофазный уровень области VI — продолжает сквозную механику «Баррикада»
// (раздел 16), а не «Атакующую цепь» (та была сквозной только для области V,
// раздел 13.6, и на область VI не распространяется).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью:
// полная история 1-69 (345 строк) прогнана эквивалентом живого
// классификатора панели (scratchpad/panelHistory.js). Цепей в области VI
// нет — сверка ограничена movementStyle-распределением по ролям и общими
// архетипами геометрии.
//
// АРТ (images/enemies/regions/6_zasech_les/lvl70/) — все 5 картинок открыты
// и сверены лично, чёткая сквозная эскалация ОДНОГО и того же существа:
// 1.webp — крупный крылатый ящер-богатырь в чешуйчатой броне, кривая сабля
//   в руке опущена, поза спокойная и уверенная, дым отсутствует — суть в
//   ХОЛОДНОМ РАСЧЁТЕ матёрого налётчика, не в звериной ярости.
// 2.webp — та же фигура, поза чуть агрессивнее, сабля приподнята, крылья
//   раскрыты шире, на перепонках крыльев больше кровавых подпалин — суть в
//   ПРОСНУВШЕМСЯ АППЕТИТЕ хищника.
// 3.webp — сабля занесена высоко для удара, у плеча и брони впервые
//   появляются лёгкие дымные завитки — суть в ПЕРВОМ НАКОПЛЕНИИ ЖАРА,
//   прямая связь с механикой «Баррикада» этого уровня (раздел 16).
// 4.webp — пасть раскрыта в рёве, из-за плеч и головы валит уже плотный
//   дым, когтистая лапа тянется вперёд, броня выглядит потрёпанной — суть
//   в ВЫРВАВШЕМСЯ НАРУЖУ ПЛАМЕНИ, дисциплина щита и клинка отброшена.
// 5.webp (финал) — самый густой, тёмный, почти чёрный дым окутывает голову
//   и когти, поза — тотальный, всесокрушающий рывок — суть в СУЩЕСТВЕ, ЧТО
//   ВОТ-ВОТ ВЗОРВЁТСЯ ОГНЁМ, кульминация всего накопленного жара уровня.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ИСТОЧНИК ИМЕНИ И ТЕМЫ — description/игра №2 доп материалы/идеи по
// уровням.txt, уровень 70: «Тугарин Змей (крылатый богатырь в дымных
// латах)». Тугарин Змеевич/Тугарин Змей — подлинный фольклорный противник
// русских былин, змееподобный или крылатый налётчик, обременяющий землю
// данью, — имя не изобретено заново, взято из первоисточника (в отличие от
// обычных монстров уровня, раздел 12 здесь не требует придумывать новое
// слово, т.к. Тугарин — не словарное животное/растение, а именной
// персонаж). ПЕРВЫЙ облик носит голое каноническое имя без эпитета (раздел
// 12, требование для персонажей-в-пяти-обликах).
//
// ЭПИТЕТЫ ФАЗ 2-5 — сверены с полной историей всех уже сделанных уровней
// такого типа (15, 25, 30, 39, 45, 50, 55, 60, 65 — раздел 12) программно
// (grep по всем dispName): ни один из пяти выбранных эпитетов (Хищный,
// Чадящий, Огнедышащий, Испепеляющий) не встречается там ни разу, включая
// однокоренные слова. Эпитеты — РАЗНЫЕ понятия, а не лестница интенсивности
// одного слова (раздел 12): Хищный — про растущий аппетit, не про огонь;
// Чадящий — про первый дым; Огнедышащий — про вырвавшееся пламя;
// Испепеляющий — про итог (то, что после огня остаётся пепел). Финальный
// эпитет «Испепеляющий» проверен отдельно против ВСЕХ финальных эпитетов
// прежних многофазных уровней (Обезумевшая/Истинная/Гневный/Испарившийся/
// Кудельная/Одичавший/Раскрытый/Адский) — не совпадает и не близкородственен
// ни одному из них.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА — письменно, ДО геометрии, для каждого из
// пяти ОБЛИКОВ (не пяти разных монстров, а пяти стадий одного и того же
// персонажа — поэтому вопрос 1 у всех общий «почему именно такой мувсет
// НА ЭТОЙ СТАДИИ», а вопросы 2-3 выстроены в единую сквозную интригу через
// весь бой, не по одному изолированному трюку на каждый облик):
//
// СКВОЗНАЯ ИНТРИГА ВСЕХ ПЯТИ ФАЗ (общий трюк уровня, не по кусочкам):
// Тугарин Змей держит саблю в ЛЕВОЙ руке и все первые три облика бьёт
// почти исключительно с левого фланга (архетип «только левый фланг» у
// облика 1, «асимметрия лево/право» у облика 2 — правая сторона существует,
// но подчёркнуто слабая и редкая). Облик 4 (Огнедышащий) впервые ломает этот
// вывод: сигнатурная серия начинается ТЕМИ ЖЕ ДВУМЯ атаками, что открывали
// фирменную левую серию обликов 1-3 (тот же xPos/customSpeed, узнаваемый
// «почерк»), но заканчивается ударом с ДАЛЬНЕГО ПРАВОГО края — «одинаковое
// начало, разный конец» (раздел 1.1 п.3), применённое не к одному комбо
// внутри уровня, а ко всей многофазной дуге персонажа целиком. Облик 5
// (Испепеляющий) закольцовывает: та же связка встречается ЕЩЁ РАЗ как
// финальный сигнатурный приём всего уровня.
//
// УТОЧНЕНИЕ 2026-09-16 (после жалобы «проходится на раз-два»): реальный
// прогон scripts/balance-sim/run.js показал, что при верном по формуле
// суммарном HP облики 1-3 живут коротко (≈4.7с/11.7с/20.8с при эталонном
// DPS) — облик 1 физически не успевает дать больше ~1-2 серий атак ни при
// каком bossDelayAbDop (упирается в движковый minWaveDelay=2600мс), обликам
// 2-3 достаётся ~2 и ~3.6 серии. Это ПРАВДА и стоит иметь в виду при чтении
// формулировки выше («три полных облика подряд приучают») — честнее
// говорить, что облик 1 даёт лишь ПЕРВЫЙ намёк, облики 2-3 закрепляют его
// за несколько (не десятки) повторов. Но частота волн — НЕ причина жалобы
// «нет сложности»: пользователь прямо отверг это как объяснение (числа/HP
// тут ни при чём), реальная причина была в композиции самих комбо (раздел
// 9.1 lvlData/Правила создания уровня.txt, правка ниже у bossAbilitiesDop) —
// mBossDelayAb оставлен таким, как был скопирован по обычной конвенции
// уровня, специально под эту жалобу не трогался.
//
// Облик 1 — Тугарин Змей (enem1, movementStyle: straight, архетип «только
// левый фланг»):
//   1. Кто/почему: матёрый крылатый налётчик в начале боя — спокоен,
//      уверен в своей силе, бьёт размеренно с клинковой (левой) стороны.
//   2. Хитрость: пока намеренно НЕТ обмана — это честная установочная фаза,
//      которая производит настоящую, не выдуманную закономерность («бьёт
//      слева»), на которой построена интрига всех следующих обликов.
//   3. Привычка: закладывается впервые (наказывать пока нечего) — но игрок,
//      не глядя, начинает считать левый фланг «источником всей опасности».
//   4. Честность: полностью честная и щедрая по телеграфам фаза — ровно
//      то, чем и должен быть первый облик (раздел 0, «спокойнее, длинный
//      телеграф»).
//
// Облик 2 — Хищный Тугарин Змей (enem2, movementStyle: lateRush, архетип
// «асимметрия: лево не равно право»):
//   1. Кто/почему: аппетит просыпается — крылья раскрываются шире, темп
//      растёт, но клинковая рука по-прежнему ведущая.
//   2. Хитрость: правый коготь начинает бить, но только редко и слабо —
//      полуправда, что тайно укрепляет вывод «право не опасно», не
//      опровергая его прямо (обман станет явным только в облике 4).
//   3. Привычка: усиливает вывод облика 1 ещё сильнее, добавляя иллюзию
//      «я уже видел и правую сторону — она не в счёт».
//   4. Честность: даже слабые правые атаки полностью честно
//      телеграфированы — ни одного скрытого урона.
//
// Облик 3 — Чадящий Тугарин Змей (enem3, movementStyle: pause, архетип
// «короткие одиночные удары с длинными паузами»):
//   1. Кто/почему: первый дым — сабля заносится и на миг застывает, пока
//      жар копится; прямая связь между образом (дым у плеча) и механикой
//      «Баррикада» этого уровня.
//   2. Хитрость: тот же приём, что и у Дёгтеня/Плетеника области VI —
//      одна и та же долгая стойка иногда резолвится одним уколом, иногда
//      двумя, иногда (нежданчик) тремя подряд.
//   3. Привычка: приученный за 65 уровней кампании к «долгий телеграф = один
//      соразмерный удар», игрок расслабляется после первого попадания.
//   4. Честность: каждый следующий укол читается так же ясно, как первый —
//      наказывается ранняя потеря концентрации, не скорость реакции.
//
// Облик 4 — Огнедышащий Тугарин Змей (enem4, movementStyle: wave, архетип
// «зигзаг L-R без нижней стены»):
//   1. Кто/почему: дисциплина щита и клинка сломана — пасть раскрыта в
//      рёве, атакует уже обеими лапами вперемешку, без прежней стороны.
//   2. Хитрость: ГЛАВНЫЙ поворот всего уровня — сигнатурная серия [0,1,2]
//      начинается ТЕМИ ЖЕ атаками, что открывали фирменную левую серию
//      обликов 1-3 (см. сквозную интригу выше), но заканчивается ударом с
//      дальнего правого края.
//   3. Привычка: прямое наказание вывода, что усердно строился три облика
//      подряд («Тугарин бьёт слева») — ровно то самое ломание ожиданий,
//      которого требует блок «ты — геймдизайнер» в начале этого файла.
//   4. Честность: завершающий удар справа телеграфирован так же нормально
//      (не короче и не быстрее обычного) — наказывается слепое доверие
//      узнанному «почерку», а не скорость реакции.
//
// Облик 5 — Испепеляющий Тугарин Змей (enem5, финал уровня, movementStyle:
// accelerate, архетип «последовательное закрытие безопасных зон»):
//   1. Кто/почему: густой, почти чёрный дым, тотальный рывок — как финал
//      уровня обязан проверить навыки всех предыдущих обликов и добавить
//      свой поворот (правило K).
//   2. Хитрость: сигнатурная серия [12,13,14] — ТА ЖЕ связка «начало слева,
//      удар справа» из облика 4, повторённая ЕЩЁ РАЗ как финальное
//      подтверждение: сторона тела ничего не гарантирует, единственный
//      надёжный сигнал — круговой телеграф конкретной атаки.
//   3. Привычка: наказывает игрока, который для этого одного облика решил,
//      что «раз обман уже раскрыт в облике 4, дальше можно расслабиться»,
//      — обман повторяется, а не исчезает после первого раскрытия.
//   4. Честность: телеграф самый долгий на уровне (роль «финал»), приём —
//      не новый, а узнаваемый повтор уже виденного один раз — наказывается
//      забывчивость, а не реакция.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-69 (см.
// scratchpad/panelHistory.js): straight (роль enem1, не использовался в
// последних 3 уровнях), lateRush (роль enem2, не использовался в последних
// 2), pause (роль enem3, не использовался в последних 6 подряд), wave (роль
// enem4, свежий выбор), accelerate (роль enem5, не использовался в
// последних 3). Пять стилей уровня различны между собой.
//
// БАРРИКАДЫ (раздел 16) — у каждого из пяти обликов ровно ОДНА
// barricade-способность (раздел 16.3, та же формулировка, что и для цепей
// области V, распространена явно и на многофазных боссов области VI),
// эскалация 1:1 с обликом: Тугарин Змей 3 удара/1200мс, Хищный 4/1600,
// Чадящий 5/2000, Огнедышащий 6/2400, Испепеляющий 7/2800 —
// barricadePauseMs = barricadeHits×400 (раздел 16.2) без исключений.
// Ни одна barricade-способность не входит в isChain-комбо — цепей на
// уровне вообще нет (механика чужая для области VI, раздел 13.6).
//
// МНОГОФАЗНОСТЬ (раздел 13.1) — healthMultiplier: 1.50 на КАЖДОМ из пяти
// обликов с самого начала (не только на финальном), musicMood: 'heroic' на
// всём уровне (единственно допустимое для этого типа уровней). Уровень НЕ
// является финалом области (isRegionFinal — только уровень 95), поэтому
// regionFinalMultiplier движком не применяется и levelCompletionConfig не
// нужен.
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — художественные боевые
// выкрики о состоянии/угрозе Тугарина прямо сейчас (аппетит/дым/пламя), не
// пересказ параметров движка и не пейзаж неба (раздел 12).
let lvlNumber = 70;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 1.782,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	attackChains: false,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 0.95, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 10 },
		{ phase: 2, minHp: 0.31, cadence: 0.90, speed: 1.05, damage: 1.12, telegraphMultiplier: 0.95, surpriseChance: 0.12, maxActiveAttacks: 12 },
		{ phase: 3, minHp: 0.00, cadence: 0.80, speed: 1.12, damage: 1.22, telegraphMultiplier: 0.90, surpriseChance: 0.18, maxActiveAttacks: 14 }
	],
	bosses: {
		enem1: {
			// Тугарин Змей: COLD_RECKONING — холодный расчёт, честная левофланговая закономерность
			movementStyle: 'straight', cadence: 1.05, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 0.88,
			speedVariance: [0.82, 0.90, 1.00, 1.10, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Дань неба — за мной должок!',
			phaseMessages: { 2: 'Крепче держишься, чем я думал!', 3: 'Хватит играть — получай сталью!' }
		}, // Тугарин Змей: COLD_RECKONING — холодный расчёт, честная левофланговая закономерность
		enem2: {
			// Хищный: RISING_APPETITE — правый коготь редок и слаб, укрепляет ложный вывод
			movementStyle: 'lateRush', cadence: 1.15, telegraphMs: 820, speedMultiplier: 0.85, damageMultiplier: 1.00,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12], healthMultiplier: 1.50,
			appearMessage: 'Аппетит проснулся — не уйдёшь!',
			phaseMessages: { 2: 'Кровь горячит сильнее вина!', 3: 'Последний кусок — самый сладкий!' }
		}, // Хищный: RISING_APPETITE — правый коготь редок и слаб, укрепляет ложный вывод
		enem3: {
			// Чадящий: SMOKE_GATHER — долгая стойка копит жар, барrikada этого уровня
			movementStyle: 'pause', cadence: 0.95, telegraphMs: 900, speedMultiplier: 0.95, damageMultiplier: 1.08,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20], healthMultiplier: 1.50,
			appearMessage: 'Чую жар — сейчас полыхнёт!',
			phaseMessages: { 2: 'Дым уже щиплет глаза — не мои!', 3: 'Задержу дыхание — и ударю!' }
		}, // Чадящий: SMOKE_GATHER — долгая стойка копит жар, барrikada этого уровня
		enem4: {
			// Огнедышащий: BROKEN_DISCIPLINE — то же начало, что и три облика подряд, но конец с другого края
			movementStyle: 'wave', cadence: 0.88, telegraphMs: 750, speedMultiplier: 1.08, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.96, 1.06, 1.16, 1.26], healthMultiplier: 1.50,
			appearMessage: 'Хватит дыма — вот тебе пламя!',
			phaseMessages: { 2: 'Огонь рвётся наружу сам!', 3: 'Сгоришь раньше, чем упадёшь!' }
		}, // Огнедышащий: BROKEN_DISCIPLINE — то же начало, что и три облика подряд, но конец с другого края
		enem5: {
			// Испепеляющий: FINAL_ECHO — повтор того же обмана ещё раз, финальное подтверждение
			movementStyle: 'accelerate', cadence: 0.80, telegraphMs: 1000, speedMultiplier: 1.12, damageMultiplier: 1.22,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.28], healthMultiplier: 1.50,
			appearMessage: 'Небо горит — и ты сгоришь с ним!',
			phaseMessages: { 2: 'Пепел — вот всё, что от тебя останется!', 3: 'Последний вздох — мой, не твой!' }
		} // Испепеляющий: FINAL_ECHO — повтор того же обмана ещё раз, финальное подтверждение
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl70/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl70/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl70/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl70/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl70/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Тугарин Змей',
		image: 'images/enemies/regions/6_zasech_les/lvl70/1.webp',
		baseHP: 27759,
		baseSpeed: 0,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Хищный Тугарин Змей',
		image: 'images/enemies/regions/6_zasech_les/lvl70/2.webp',
		baseHP: 69396,
		baseSpeed: 0,
		baseDamage: 22,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Чадящий Тугарин Змей',
		image: 'images/enemies/regions/6_zasech_les/lvl70/3.webp',
		baseHP: 122778,
		baseSpeed: 0,
		baseDamage: 24,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Огнедышащий Тугарин Змей',
		image: 'images/enemies/regions/6_zasech_les/lvl70/4.webp',
		baseHP: 197513,
		baseSpeed: 0,
		baseDamage: 26,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Испепеляющий Тугарин Змей',
		image: 'images/enemies/regions/6_zasech_les/lvl70/5.webp',
		baseHP: 298939,
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
	// ===== Тугарин Змей: COLD_RECKONING — честная левофланговая закономерность,
	// клинок бьёт размеренно с одной, узнаваемой стороны =====
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //0
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //1
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //2
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //12 — сигнатурный «почерк»: этот заход (xPos13/speed17) вернётся в обликах 4 и 5 как приманка
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: редкий центральный удар, тонкий намёк, что клинок способен и на другое
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): клинок замирает в верхней точке замаха, тяжёлый и
	// неподвижный — требует несколько ударов, прежде чем обрушится.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.2 }, //16b

	// ===== Хищный Тугарин Змей: RISING_APPETITE — правый коготь редок и слаб,
	// клинковая сторона по-прежнему ведущая =====
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3 — слабый редкий коготь справа
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 6,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //10 — правый коготь, всё ещё скромный
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //12 — тот же «почерк» облика 1, продолжает укреплять левый вывод
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //13 — нежданчик: первый по-настоящему быстрый удар справа, всё ещё честно телеграфирован
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): коготь замирает, вцепившись в воздух — требует
	// несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.3 }, //16b

	// ===== Чадящий Тугарин Змей: SMOKE_GATHER — долгая стойка копит жар,
	// одинаковый замах иногда резолвится 1, 2 или 3 уколами подряд =====
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //0 — одиночный укол
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //1 — второй укол той же стойки
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //13 — нежданчик: третий укол той же стойки, редкий
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): дым сгущается в плотный ком у самого клинка —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.4 }, //16b

	// ===== Огнедышащий Тугарин Змей: BROKEN_DISCIPLINE — то же самое начало,
	// что и три облика подряд, но конец с другого края =====
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //0 — точная копия «почерка» обликов 1-3 (xPos13/speed17)
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //1 — продолжает влево, как ожидается по трём предыдущим обликам
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //2 — ОБМАН: реальный третий удар прилетает с дальнего правого края
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //15
	// БАРРИКАДА (раздел 16): пламя вспыхивает и на миг застревает плотным
	// сгустком в воздухе — требует несколько ударов, прежде чем сорвётся.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.5 }, //16b

	// ===== Испепеляющий Тугарин Змей: FINAL_ECHO — тот же обман повторяется
	// ещё раз как финальное подтверждение всего урока уровня =====
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //0 — зона 1 (левый край)
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19 }, //1 — зона 2 (правый край)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //2 — зона 3 (центр)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //3 — зона 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4 — зона 5
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //12 — тот же «почерк» обликов 1-3, финальный повтор приманки
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //13 — продолжает влево, как в обликах 1-3
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19 }, //14 — ОБМАН повторяется: финальный удар снова с дальнего правого края
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //15
	// БАРРИКАДА (раздел 16): самый плотный, самый тёмный сгусток дыма и
	// огня уровня — финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.6 }, //16b
];

// ИСТОРИЯ ПРАВКИ (2026-09-16): после жалобы «нет никакой сложности —
// проходится на раз-два» первой гипотезой была частота волн (ранние обликы
// живут секунды при эталонном DPS и почти не успевают дать серию атак).
// Пользователь прямо отверг это как причину ИМЕННО этой жалобы («баланс hp
// и атак тут не при чём — не трогай числа») — настоящая причина оказалась в
// композиции самих комбо (см. большой комментарий у bossAbilitiesDop ниже и
// раздел 9.1 файла правил). Правка bossDelayAbDop, сделанная под первую
// (отвергнутую) гипотезу, отменена вместе с правилом, которое под неё
// заводилось — значения возвращены к исходным (скопированным по обычной
// конвенции уровня), трогать частоту здесь не требовалось.
const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5500 }, // спокойный, размеренный расчёт
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 4800 }, // растущий аппетит
	{ boss: 'enem3', bossDelayAb: 320, bossDelayAbDop: 6000 }, // накопление жара, самый долгий отдых
	{ boss: 'enem4', bossDelayAb: 220, bossDelayAbDop: 4200 }, // вырвавшееся пламя
	{ boss: 'enem5', bossDelayAb: 200, bossDelayAbDop: 4000 }, // собранный, самый частый финал
];

// ВТОРОЙ, БОЛЕЕ ВАЖНЫЙ ПОДТВЕРЖДЁННЫЙ БАГ (2026-09-16, тот же день, третье
// уточнение пользователя после первого фикса частоты волн): «баланс hp и
// атак тут не при чём — не трогай числа! Дело в атаках босса которые
// заблочить не составляет труда и больших окнах между атаками». Разбор
// показал: правка частоты волн (mBossDelayAb выше) не решала главную
// проблему — сами КОМБО внутри волны были составлены из атак, которые
// сами по себе не создают никакого давления по времени. Пример, посчитанный
// РЕАЛЬНЫМИ формулами движка (spawnDelay = i×shotDelay, travelTime =
// (TARGET_Y-yPos)/(baseSpeed×customSpeed×speedMultiplier×phase.speed×
// BASE_SPEED), см. scratchpad/comboPressure.js — тот же расчёт, что и
// getProjectedAttackSpeed в scripts/boss-readability-report.js, не
// переизобретён): старое сигнатурное комбо облика 2 [12,9,11,14,15] давало
// первый прилёт на 1901мс, а последний (три атаки на customSpeed=6) — на
// 7130мс: ПОЧТИ СЕМЬ СЕКУНД на одно комбо, где последние три «атаки» —
// одна медленная точка за другой с большими паузами, каждую из которых
// игрок блокирует за долю секунды без всякого труда. Раздел 13.7 уже
// требует минимально-достаточный (не «с запасом») зазор для isChain —
// тот же принцип НИ РАЗУ не был применён к обычным (не-цепным) комбо этого
// уровня. Ниже — комбо переписаны так, чтобы РЕАЛЬНЫЙ разброс прилётов
// внутри одного комбо был плотным (150-1000мс между первым и последним, не
// секунды), давая игроку одновременно НЕСКОЛЬКО целей, которые нужно
// разобрать одну за другой, пока летят остальные, — это и есть «давление по
// времени» из ГЛАВНОГО ПРИНЦИПА файла, а не разнообразие xPos/speed само по
// себе. Пары из двух genuinely медленных атак (speed 3-4) убраны как
// самостоятельные комбо всюду, где они стояли изолированно (были в каждом
// без исключения облике — систематическая, не разовая ошибка шаблона);
// медленная атака оставлена только там, где она играет роль приманки рядом
// с быстрым «довеском», который приходит, пока игрок ещё разбирается с
// приманкой (см. комментарии у конкретных комбо ниже).
const bossAbilitiesDop = [
	// Тугарин Змей — COLD_RECKONING
	{ boss: 'enem1', indexAbilities: [0, 1, 2] }, // учебное: разброс прилётов ~17мс — три цели почти разом
	{ boss: 'enem1', indexAbilities: [2, 3, 4] }, // плотный быстрый кластер: разброс ~792мс
	{ boss: 'enem1', indexAbilities: [9, 7, 8] }, // нарастающая скорость: разброс ~996мс
	{ boss: 'enem1', indexAbilities: [5, 11] }, // медленная приманка (сн.4, ~3.7с) + быстрый довесок (сн.19, ~2.1с) — приманку нельзя игнорировать, пока разбираешься с довеском
	{ boss: 'enem1', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится третьей целью почти в том же окне (~159мс разброс)
	{ boss: 'enem1', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem1', indexAbilities: [13, 7, 8] }, // нежданчик: центральный удар + плотный кластер следом, разброс ~996мс
	{ boss: 'enem1', indexAbilities: [12, 4, 11] }, // сигнатурная: «почерк» + плотный кластер, разброс ~447мс

	// Хищный Тугарин Змей — RISING_APPETITE
	{ boss: 'enem2', indexAbilities: [0, 1, 8] }, // плотный левый кластер: разброс ~714мс
	{ boss: 'enem2', indexAbilities: [5, 6, 9] }, // плотный левый кластер 2: разброс ~1415мс
	{ boss: 'enem2', indexAbilities: [3, 13] }, // слабая медленная приманка справа (сн.4, ~3.9с) + быстрый довесок оттуда же (сн.19, ~1.9с)
	{ boss: 'enem2', indexAbilities: [7, 8] }, // разброс ~567мс
	{ boss: 'enem2', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится ранним разгоном
	{ boss: 'enem2', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem2', indexAbilities: [10, 13] }, // нежданчик: правый коготь впервые бьёт по-настоящему быстро, разброс ~201мс
	{ boss: 'enem2', indexAbilities: [12, 9, 1] }, // сигнатурная: та же левофланговая связка, плотный кластер вместо растянутых пяти атак — разброс ~904мс (было ~5229мс)

	// Чадящий Тугарин Змей — SMOKE_GATHER
	{ boss: 'enem3', indexAbilities: [0] }, // одиночный укол — честная, единичная угроза (сама механика паузы уже даёт непредсказуемость длины)
	{ boss: 'enem3', indexAbilities: [0, 1] }, // same-start с [0]: тот же замах, второй укол следом, разброс ~110мс
	{ boss: 'enem3', indexAbilities: [2, 3] }, // разброс близкий, обе атаки среднего темпа
	{ boss: 'enem3', indexAbilities: [4, 5] }, // быстрая пара
	{ boss: 'enem3', indexAbilities: [4, 11, 12] }, // плотный кластер вместо изолированной медленной пары (было [6,7], разброс ~1150мс с прилётом на 3.5-4.6с) — теперь разброс ~839мс, первый прилёт ~1.6с
	{ boss: 'enem3', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem3', indexAbilities: [0, 1, 13] }, // нежданчик: та же стойка резолвится ТРЕТЬИМ уколом, разброс ~575мс
	{ boss: 'enem3', indexAbilities: [8, 9, 10] }, // сигнатурная: три метких удара через всё поле подряд, разброс ~800мс

	// Огнедышащий Тугарин Змей — BROKEN_DISCIPLINE
	{ boss: 'enem4', indexAbilities: [3, 4] }, // средняя пара, разброс умеренный
	{ boss: 'enem4', indexAbilities: [5, 6] }, // быстрая пара
	{ boss: 'enem4', indexAbilities: [15, 3, 4] }, // плотный кластер вместо изолированной медленной пары (было [8,9], оба сн.4, прилёт на 3.0-3.2с) — теперь разброс ~319мс, первый прилёт ~1.7с
	{ boss: 'enem4', indexAbilities: [10, 11] }, // быстрая пара
	{ boss: 'enem4', indexAbilities: [0, 1] }, // same-start сам по себе: выглядит точь-в-точь как открытие обликов 1-3
	{ boss: 'enem4', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem4', indexAbilities: [12, 13, 14] }, // нежданчик: центр закрывается следом за флангами, разброс ~854мс
	{ boss: 'enem4', indexAbilities: [0, 1, 2] }, // ГЛАВНЫЙ ПОВОРОТ УРОВНЯ: тот же «почерк», финиш с дальнего правого края — разброс ~297мс, уже плотный без правок
	{ boss: 'enem4', indexAbilities: [10, 11, 12] }, // доп. плотный кластер через центр

	// Испепеляющий Тугарин Змей — FINAL_ECHO, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] }, // разброс небольшой, оба фланга быстрые
	{ boss: 'enem5', indexAbilities: [3, 4, 15] }, // плотный кластер вместо изолированной медленной пары (было [8,9], оба сн.4, прилёт на 2.9-3.1с) — теперь разброс ~191мс, первый прилёт ~1.4с
	{ boss: 'enem5', indexAbilities: [10, 11, 0] }, // плотный кластер, разброс ~480мс
	{ boss: 'enem5', indexAbilities: [3, 4] }, // средняя симметричная пара
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым разгоном — разброс ~96мс, уже плотный без правок
	{ boss: 'enem5', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem5', indexAbilities: [2, 7] }, // нежданчик: центр закрывается на пределе скорости
	{ boss: 'enem5', indexAbilities: [5, 6] }, // сигнатурная-филлер: симметричные быстрые углы
	{ boss: 'enem5', indexAbilities: [12, 13, 14] }, // ФИНАЛЬНОЕ ЭХО: тот же «почерк» и тот же обман — снова финиш справа, разброс ~275мс, уже плотный без правок
];

// Лорные названия связок временных улучшений — пять стадий одного и того
// же существа, поэтому словарь ЭВОЛЮЦИОНИРУЕТ вместе с ним (правило 12.1):
// облики 1-2 — чешуя, крыло, коготь, клинок, без дыма; облик 3 впервые
// вводит дым; облики 4-5 — уже пламя и пепел. Полных совпадений фраз между
// пятью обликами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
	// Тугарин Змей — холодный расчёт: клинок, чешуя, крыло, коготь.
	enem1: {
		variant1: 'Змеиный кураж', variant2: 'Чешуйчатая хватка', variant3: 'Клинок-таран',
		variant4: 'Крылатый напор', variant5: 'Меткий взмах', variant6: 'Бешеный взмах',
		variant7: 'Змеиный норов', variant8: 'Крепкая чешуя', variant9: 'Ударный взмах',
		variant10: 'Живучее крыло', variant11: 'Колючий коготь', variant12: 'Взмах и в темноту',
		variant13: 'Толстая чешуя', variant14: 'Неутомимый взмах', variant15: 'Пружинистый взмах',
		variant16: 'Кривой клинок, зоркий глаз', variant17: 'Змеиная удача', variant18: 'Верный взмах',
		variant19: 'Молниеносный взмах', variant20: 'Змеиный нюх', variant21: 'Цепкий коготь',
		variant22: 'Юркий, несмотря на вес', variant23: 'Змеиная стойкость', variant24: 'Расчётливый взмах, зоркий глаз',
		variant25: 'Ускользающий взмах', variant26: 'Дикий взмах', variant27: 'Стойкая чешуя',
		variant28: 'Взмах наповал', variant29: 'Крепкий Тугарин', variant30: 'Крылатая мощь',
		variant31: 'Взмах с оглядкой', variant32: 'Живучий коготь', variant33: 'Юркий и змеиный',
		variant34: 'Крылатая прыть', variant35: 'Быстрый взмах, крепкая чешуя'
	},
	// Хищный — просыпающийся аппетит: та же чешуя/крыло/коготь, но злее.
	enem2: {
		variant1: 'Хищный кураж', variant2: 'Когтевая хватка', variant3: 'Клык-таран',
		variant4: 'Аппетитный напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
		variant7: 'Хищный норов', variant8: 'Крепкий клык', variant9: 'Ударный бросок',
		variant10: 'Живучая пасть', variant11: 'Колючее крыло', variant12: 'Бросок и в темноту',
		variant13: 'Толстый клык', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
		variant16: 'Раскрытая пасть, зоркий глаз', variant17: 'Хищная удача', variant18: 'Верный бросок',
		variant19: 'Молниеносный бросок', variant20: 'Хищный нюх', variant21: 'Цепкий клык',
		variant22: 'Юркий, несмотря на голод', variant23: 'Хищная стойкость', variant24: 'Долгий разгон, зоркий глаз',
		variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкая шкура',
		variant28: 'Бросок наповал', variant29: 'Крепкий хищник', variant30: 'Аппетитная мощь',
		variant31: 'Бросок с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и хищный',
		variant34: 'Аппетитная прыть', variant35: 'Быстрый бросок, крепкая шкура'
	},
	// Чадящий — первый дым: жар, копоть, зола, тление.
	enem3: {
		variant1: 'Чадный кураж', variant2: 'Дымная хватка', variant3: 'Жар-таран',
		variant4: 'Тлеющий напор', variant5: 'Меткий укол', variant6: 'Бешеный укол',
		variant7: 'Чадный норов', variant8: 'Крепкая копоть', variant9: 'Ударный укол',
		variant10: 'Живучий жар', variant11: 'Колючая зола', variant12: 'Укол и в темноту',
		variant13: 'Толстая копоть', variant14: 'Неутомимый укол', variant15: 'Пружинистый укол',
		variant16: 'Дымный завиток, зоркий глаз', variant17: 'Чадная удача', variant18: 'Верный укол',
		variant19: 'Молниеносный укол', variant20: 'Чадный нюх', variant21: 'Цепкий жар',
		variant22: 'Юркий, несмотря на дым', variant23: 'Чадная стойкость', variant24: 'Долгое накопление, зоркий глаз',
		variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Стойкая копоть',
		variant28: 'Укол наповал', variant29: 'Крепкий чадящий', variant30: 'Тлеющая мощь',
		variant31: 'Укол с оглядкой', variant32: 'Живучая зола', variant33: 'Юркий и чадный',
		variant34: 'Тлеющая прыть', variant35: 'Быстрый укол, крепкая копоть'
	},
	// Огнедышащий — вырвавшееся пламя: огонь, пасть, рёв, пепел.
	enem4: {
		variant1: 'Огненный кураж', variant2: 'Пламенная хватка', variant3: 'Пасть-таран',
		variant4: 'Рёвный напор', variant5: 'Меткий выдох', variant6: 'Бешеный выдох',
		variant7: 'Огненный норов', variant8: 'Крепкий рёв', variant9: 'Ударный выдох',
		variant10: 'Живучее пламя', variant11: 'Колючий пепел', variant12: 'Выдох и в темноту',
		variant13: 'Толстая шкура', variant14: 'Неутомимый выдох', variant15: 'Пружинистый выдох',
		variant16: 'Разинутая пасть, зоркий глаз', variant17: 'Огненная удача', variant18: 'Верный выдох',
		variant19: 'Молниеносный выдох', variant20: 'Огненный нюх', variant21: 'Цепкий пепел',
		variant22: 'Юркий, несмотря на пламя', variant23: 'Огненная стойкость', variant24: 'Яростный выдох, зоркий глаз',
		variant25: 'Ускользающий выдох', variant26: 'Дикий выдох', variant27: 'Стойкий рёв',
		variant28: 'Выдох наповал', variant29: 'Крепкий огнедышащий', variant30: 'Рёвная мощь',
		variant31: 'Выдох с оглядкой', variant32: 'Живучий пепел', variant33: 'Юркий и огненный',
		variant34: 'Рёвная прыть', variant35: 'Быстрый выдох, крепкий рёв'
	},
	// Испепеляющий — итог: пепел, зной, головня, чёрный дым.
	enem5: {
		variant1: 'Пепельный кураж', variant2: 'Зольная хватка', variant3: 'Головня-таран',
		variant4: 'Испепеляющий напор', variant5: 'Меткий зной', variant6: 'Бешеный зной',
		variant7: 'Пепельный норов', variant8: 'Крепкая головня', variant9: 'Ударный зной',
		variant10: 'Живучий чёрный дым', variant11: 'Колючий уголь', variant12: 'Зной и в темноту',
		variant13: 'Толстая головня', variant14: 'Неутомимый зной', variant15: 'Пружинистый зной',
		variant16: 'Чёрное марево, зоркий глаз', variant17: 'Пепельная удача', variant18: 'Верный зной',
		variant19: 'Молниеносный зной', variant20: 'Пепельный нюх', variant21: 'Цепкий уголь',
		variant22: 'Юркий, несмотря на пепел', variant23: 'Пепельная стойкость', variant24: 'Тотальный зной, зоркий глаз',
		variant25: 'Ускользающий зной', variant26: 'Дикий зной', variant27: 'Стойкая головня',
		variant28: 'Зной наповал', variant29: 'Крепкий испепеляющий', variant30: 'Чёрная мощь',
		variant31: 'Зной с оглядкой', variant32: 'Живучий уголь', variant33: 'Юркий и пепельный',
		variant34: 'Чёрная прыть', variant35: 'Быстрый зной, крепкая головня'
	}
};
