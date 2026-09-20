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
// последних 3 уровнях), pause (роль enem2, окно 67-69 сверено повторно по
// всем уровням 61-74), weave (роль enem3, там же), wave (роль
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
let lvlNumber = 70;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.995,
	damageMultiplier: 1.817,
	minWaveDelay: 2460,
	minShotDelay: 172,
	minTelegraphMs: 601,
	attackChains: false,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.625, cadence: 0.965, speed: 0.903, damage: 0.986, telegraphMultiplier: 1.034, surpriseChance: 0.085, maxActiveAttacks: 11 },
		{ phase: 2, minHp: 0.35, cadence: 0.867, speed: 1.053, damage: 1.078, telegraphMultiplier: 0.922, surpriseChance: 0.122, maxActiveAttacks: 14 },
		{ phase: 3, minHp: 0.00, cadence: 0.801, speed: 1.162, damage: 1.271, telegraphMultiplier: 0.913, surpriseChance: 0.1805, maxActiveAttacks: 18 }
	],
	bosses: {
		enem1: { signatureEvery: 4,
			// Тугарин Змей: COLD_RECKONING — холодный расчёт, честная левофланговая закономерность
			movementStyle: 'straight', cadence: 1.105, telegraphMs: 885, speedMultiplier: 0.850, damageMultiplier: 0.820,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22], healthMultiplier: 1.50,
			appearMessage: 'Дань неба — за мной должок!',
			phaseMessages: { 2: 'Крепче держишься, чем я думал!', 3: 'Хватит играть — получай сталью!' }
		}, // Тугарин Змей: COLD_RECKONING — холодный расчёт, честная левофланговая закономерность
		enem2: { signatureEvery: 4,
			// Хищный: RISING_APPETITE — правый коготь редок и слаб, укрепляет ложный вывод
			movementStyle: 'lateRush', cadence: 1.180, telegraphMs: 895, speedMultiplier: 0.845, damageMultiplier: 0.995,
			speedVariance: [0.85, 0.94, 1.03, 1.12, 1.21], healthMultiplier: 1.50,
			appearMessage: 'Аппетит проснулся — не уйдёшь!',
			phaseMessages: { 2: 'Кровь горячит сильнее вина!', 3: 'Последний кусок — самый сладкий!' }
		}, // Хищный: RISING_APPETITE — правый коготь редок и слаб, укрепляет ложный вывод
		enem3: { signatureEvery: 4,
			// Чадящий: SMOKE_GATHER — долгая стойка копит жар, барrikada этого уровня
			movementStyle: 'pause', cadence: 0.950, telegraphMs: 915, speedMultiplier: 0.935, damageMultiplier: 1.105,
			speedVariance: [0.85, 0.94, 1.03, 1.12, 1.21], healthMultiplier: 1.50,
			appearMessage: 'Чую жар — сейчас полыхнёт!',
			phaseMessages: { 2: 'Дым уже щиплет глаза — не мои!', 3: 'Задержу дыхание — и ударю!' }
		}, // Чадящий: SMOKE_GATHER — долгая стойка копит жар, барrikada этого уровня
		enem4: { signatureEvery: 4,
			// Огнедышащий: BROKEN_DISCIPLINE — то же начало, что и три облика подряд, но конец с другого края
			movementStyle: 'wave', cadence: 0.915, telegraphMs: 765, speedMultiplier: 1.090, damageMultiplier: 1.165,
			speedVariance: [0.86, 0.97, 1.08, 1.19, 1.30], healthMultiplier: 1.50,
			appearMessage: 'Хватит дыма — вот тебе пламя!',
			phaseMessages: { 2: 'Огонь рвётся наружу сам!', 3: 'Сгоришь раньше, чем упадёшь!' }
		}, // Огнедышащий: BROKEN_DISCIPLINE — то же начало, что и три облика подряд, но конец с другого края
		enem5: { signatureEvery: 4,
			// Испепеляющий: FINAL_ECHO — повтор того же обмана ещё раз, финальное подтверждение
			movementStyle: 'accelerate', cadence: 0.785, telegraphMs: 1045, speedMultiplier: 1.135, damageMultiplier: 1.260,
			speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18], healthMultiplier: 1.50,
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
		baseDamage: 19.70,
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
		baseDamage: 21.70,
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
		baseDamage: 24.25,
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
		baseDamage: 26.25,
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
		baseDamage: 28.35,
		spawnWeight: 5,
		baseExp: 0,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 1000 }
	},

};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 7;
const bossInterval = 10;

//spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

// Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
// speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

const bossAbilities = [
	// ===== Тугарин Змей: COLD_RECKONING — честная левофланговая закономерность,
	// клинок бьёт размеренно с одной, узнаваемой стороны =====
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //0
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //1
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //2
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //4 — сигнатурный «почерк»: этот заход (xPos13/speed17) вернётся в обликах 4 и 5 как приманка
	{ boss: 'enem1', type: 'enem11', xPos: 51, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //5 — нежданчик: редкий центральный удар, тонкий намёк, что клинок способен и на другое
	{ boss: 'enem1', type: 'enem11', xPos: 59, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //6 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 58, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //7 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 27, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //9 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, //10 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //12 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //13 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 51, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //14 — средняя атака
	// БАРРИКАДА (раздел 16): клинок замирает в верхней точке замаха, тяжёлый и
	// неподвижный — требует несколько ударов, прежде чем обрушится.
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.225 }, //15b

	// ===== Хищный Тугарин Змей: RISING_APPETITE — правый коготь редок и слаб,
	// клинковая сторона по-прежнему ведущая =====
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //2 — правый коготь, всё ещё скромный
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //3 — тот же «почерк» облика 1, продолжает укреплять левый вывод
	{ boss: 'enem2', type: 'enem22', xPos: 83, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //4 — нежданчик: первый по-настоящему быстрый удар справа, всё ещё честно телеграфирован
	{ boss: 'enem2', type: 'enem22', xPos: 58, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //5 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //6 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 54, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 64, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 23 }, //9 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //10 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //12 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //13 — средняя атака
	// БАРРИКАДА (раздел 16): коготь замирает, вцепившись в воздух — требует
	// несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.275 }, //14b

	// ===== Чадящий Тугарин Змей: SMOKE_GATHER — долгая стойка копит жар,
	// одинаковый замах иногда резолвится 1, 2 или 3 уколами подряд =====
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //0 — одиночный укол
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //1 — второй укол той же стойки
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //5 — нежданчик: третий укол той же стойки, редкий
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //6 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //7 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, //8 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //9 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 }, //10 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //12 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 }, //13 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //14 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 34, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //15 — быстрая атака
	// БАРРИКАДА (раздел 16): дым сгущается в плотный ком у самого клинка —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.395 }, //16b

	// ===== Огнедышащий Тугарин Змей: BROKEN_DISCIPLINE — то же самое начало,
	// что и три облика подряд, но конец с другого края =====
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 57, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //3 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //4 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //5 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 37, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //7 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //8 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //9 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //10 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //11 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //12 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //13 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //14 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //15 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// БАРРИКАДА (раздел 16): пламя вспыхивает и на миг застревает плотным
	// сгустком в воздухе — требует несколько ударов, прежде чем сорвётся.
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 ,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.525 }, //16b

	// ===== Испепеляющий Тугарин Змей: FINAL_ECHO — тот же обман повторяется
	// ещё раз как финальное подтверждение всего урока уровня =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //0 — зона 3 (центр)
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19 }, //4 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 63, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //5 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //7 — средняя нижняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, //9 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 79, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //10 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 53, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //11 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //12 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //13 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 79, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //14 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //15 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// БАРРИКАДА (раздел 16): самый плотный, самый тёмный сгусток дыма и
	// огня уровня — финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.635 }, //16b
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
	{ boss: 'enem1', bossDelayAb: 286, bossDelayAbDop: 5175, firstWaveDelayMs: 2400 }, // спокойный, размеренный расчёт
	{ boss: 'enem2', bossDelayAb: 252, bossDelayAbDop: 4775, firstWaveDelayMs: 2292 }, // растущий аппетит
	{ boss: 'enem3', bossDelayAb: 312, bossDelayAbDop: 6075, firstWaveDelayMs: 2400 }, // накопление жара, самый долгий отдых
	{ boss: 'enem4', bossDelayAb: 232, bossDelayAbDop: 4125, firstWaveDelayMs: 1980 }, // вырвавшееся пламя
	{ boss: 'enem5', bossDelayAb: 208, bossDelayAbDop: 3925, firstWaveDelayMs: 1884 }, // собранный, самый частый финал
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
	{ boss: 'enem1', indexAbilities: [5, 1, 2] }, // нежданчик: центральный удар + плотный кластер следом, разброс ~941мс
	{ boss: 'enem1', indexAbilities: [4, 0, 3] }, // сигнатурная: «почерк» + плотный кластер, разброс ~407мс
	{ boss: 'enem1', indexAbilities: [11] }, // одиночная приманка
	{ boss: 'enem1', indexAbilities: [10, 8] }, // приманка + быстрый довесок — разброс ~518мс
	{ boss: 'enem1', indexAbilities: [9, 12] }, // смешанная серия — разброс ~502мс
	{ boss: 'enem1', indexAbilities: [14, 7, 13] }, // средняя серия — разброс ~703мс
	{ boss: 'enem1', indexAbilities: [13, 6] }, // средняя серия — разброс ~173мс
	{ boss: 'enem1', indexAbilities: [12, 13, 9] }, // смешанная серия — разброс ~925мс
	{ boss: 'enem1', indexAbilities: [11, 9] }, // приманка + быстрый довесок — разброс ~435мс
	{ boss: 'enem1', indexAbilities: [13, 10, 14] }, // приманка + быстрый довесок — разброс ~903мс
	{ boss: 'enem1', indexAbilities: [9, 10, 12, 8] }, // приманка + быстрый довесок — разброс ~1226мс
	{ boss: 'enem1', indexAbilities: [15], barricade: true }, // ← баррикада (раздел 16)

	// Хищный Тугарин Змей — RISING_APPETITE
	{ boss: 'enem2', indexAbilities: [2, 4] }, // нежданчик: правый коготь впервые бьёт по-настоящему быстро, разброс ~242мс
	{ boss: 'enem2', indexAbilities: [3, 1, 0] }, // сигнатурная: та же левофланговая связка, плотный кластер вместо растянутых пяти атак — разброс ~927мс (было ~5229мс)
	{ boss: 'enem2', indexAbilities: [8] }, // одиночная приманка
	{ boss: 'enem2', indexAbilities: [7] }, // одиночная приманка
	{ boss: 'enem2', indexAbilities: [10, 9, 5] }, // быстрая серия — разброс ~533мс
	{ boss: 'enem2', indexAbilities: [11, 13] }, // средняя серия — разброс ~459мс
	{ boss: 'enem2', indexAbilities: [12, 6, 9] }, // смешанная серия — разброс ~883мс
	{ boss: 'enem2', indexAbilities: [6, 13, 11] }, // средняя серия — разброс ~236мс
	{ boss: 'enem2', indexAbilities: [14], barricade: true }, // ← баррикада (раздел 16)

	// Чадящий Тугарин Змей — SMOKE_GATHER
	{ boss: 'enem3', indexAbilities: [0, 1, 5] }, // нежданчик: та же стойка резолвится ТРЕТЬИМ уколом, разброс ~537мс
	{ boss: 'enem3', indexAbilities: [2, 3, 4] }, // сигнатурная: три метких удара через всё поле подряд, разброс ~433мс
	{ boss: 'enem3', indexAbilities: [11] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [10] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [13, 6] }, // средняя серия — разброс ~545мс
	{ boss: 'enem3', indexAbilities: [14, 7, 15] }, // смешанная серия — разброс ~783мс
	{ boss: 'enem3', indexAbilities: [12, 8] }, // смешанная серия — разброс ~336мс
	{ boss: 'enem3', indexAbilities: [6, 9, 12] }, // смешанная серия — разброс ~937мс
	{ boss: 'enem3', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)

	// Огнедышащий Тугарин Змей — BROKEN_DISCIPLINE
	{ boss: 'enem4', indexAbilities: [0, 1, 2] }, // нежданчик: центр закрывается следом за флангами, разброс ~897мс
	{ boss: 'enem4', indexAbilities: [4] }, // одиночная приманка
	{ boss: 'enem4', indexAbilities: [15] }, // одиночная приманка
	{ boss: 'enem4', indexAbilities: [3, 9] }, // быстрая серия — разброс ~291мс
	{ boss: 'enem4', indexAbilities: [14, 12, 5] }, // приманка + быстрый довесок — разброс ~997мс
	{ boss: 'enem4', indexAbilities: [8, 11] }, // смешанная серия — разброс ~737мс
	{ boss: 'enem4', indexAbilities: [6, 13] }, // приманка + быстрый довесок — разброс ~608мс
	{ boss: 'enem4', indexAbilities: [7, 10, 11, 6] }, // приманка + быстрый довесок — разброс ~488мс
	{ boss: 'enem4', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)

	// Испепеляющий Тугарин Змей — FINAL_ECHO, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 3] }, // нежданчик: центр закрывается на пределе скорости
	{ boss: 'enem5', indexAbilities: [1, 2] }, // сигнатурная-филлер: симметричные быстрые углы
	{ boss: 'enem5', indexAbilities: [9] }, // одиночная приманка
	{ boss: 'enem5', indexAbilities: [13, 5, 8] }, // приманка + быстрый довесок — разброс ~733мс
	{ boss: 'enem5', indexAbilities: [12, 10, 14, 4] }, // быстрая серия — разброс ~396мс
	{ boss: 'enem5', indexAbilities: [15, 6] }, // приманка + быстрый довесок — разброс ~1556мс
	{ boss: 'enem5', indexAbilities: [4, 13, 11, 7] }, // смешанная серия — разброс ~931мс
	{ boss: 'enem5', indexAbilities: [6, 5] }, // смешанная серия — разброс ~694мс
	{ boss: 'enem5', indexAbilities: [8, 7] }, // приманка + быстрый довесок — разброс ~145мс
	{ boss: 'enem5', indexAbilities: [5, 10] }, // быстрая серия — разброс ~239мс
	{ boss: 'enem5', indexAbilities: [6, 11, 14, 4] }, // смешанная серия — разброс ~484мс
	{ boss: 'enem5', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
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
