// Уровень 69 «Дым над заставой» — четвёртый уровень области VI «Глухой
// край» («Засечный лес»), обычный уровень (пять разных монстров).
// Продолжает сквозную механику «Баррикада» (раздел 16 lvlData/Правила
// создания уровня.txt).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью:
// полная история 1-68 (340 строк) прогнана эквивалентом живого
// классификатора панели (scratchpad/panelHistory.js, исполнен через vm
// вместо браузера). Пространство пар форм цепи (25/25) по-прежнему
// исчерпано для всех пяти ролей — раздел 13.8 применяется явно ниже.
//
// АРТ (images/enemies/regions/6_zasech_les/lvl69/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — деревянная бочка с металлическими обручами, оскаленным лицом и
//   когтистыми лапами, из одной лапы каплет тёмная смолистая жижа — суть
//   в БОЧКЕ КИПЯЩЕГО ДЁГТЯ, что копит каплю и швыряет её, как настоящая
//   застава обороняется кипящей смолой.
// 2.webp — связка нескольких брёвен, стянутых верёвкой, с единым злым
//   лицом на торце и когтистыми конечностями, ползущая на четвереньках —
//   суть в ВЯЗАНКЕ ДРОВ, что тащится неровно, а не идёт прямо.
// 3.webp — гуманоидный воин в дощатой броне с красным кушаком-поясом,
//   держит настоящий боевой топор — суть в ДИСЦИПЛИНИРОВАННОМ РУБЯЩЕМ
//   УДАРЕ солдата заставы, не в звериной ярости.
// 4.webp — красно-полосатая деревянная тумба-идол с верёвочной обвязкой,
//   держит копьё, вторая «рука» — обрубок без кисти — суть в
//   НЕПОДВИЖНОМ ПОГРАНИЧНОМ СТОЛБЕ, что колет только когда до него
//   дотягиваются.
// 5.webp (финал) — крупная бронированная хищная птица в доспехах с рогом-
//   трубой у клюва, трубит тревогу — суть в ГЛАШАТАЕ ТРЕВОГИ, чей сигнал
//   поднимает всю заставу и завершает уровень воем сирены.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА УРОВНЯ — «Дым над заставой»: тревога поднята, дёготь кипит
// (Дёгтень), дрова тащат к кострам (Вязень), солдат встаёт в строй
// (Кушачник), пограничный столб держит рубеж (Столбень), а над всем этим
// трубит сигнал тревоги (Трубень) — пять шагов одной сцены обороны
// заставы, а не пять случайных монстров.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Дёгтень (от «дёготь» —
// материал, отличный от «смола»/Смоляк уровня 66, не словарное «бочка»);
// Вязень (от «вязать/вязанка» — материал/действие, не словарное «полено»);
// Кушачник (от «кушак» — деталь одежды, не словарное «солдат»/«воин»);
// Столбень (от «столб» — материал, суффикс по образцу «Засечень»/«Смоляк»,
// не словарное «идол»/«тумба»); Трубень (от «труба/трубить» — действие, не
// словарное «орёл»/«сова»). Проверено программно (grep по всем dispName
// всей кампании) — ни одно имя не встречается ранее.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА — письменно, ДО геометрии, для каждого:
//
// Дёгтень (enem1, movementStyle: pause, архетип «короткие одиночные удары
// с длинными паузами»):
//   1. Кто/почему: бочка кипящего дёгтя — копит каплю в тишине, затем
//      единственным броском швыряет её; пауза — не бездействие, а само
//      накопление жижи для следующего броска.
//   2. Хитрость: капля, что копится дольше обычного (визуально заметно
//      дольше, чем у всех предыдущих pause-боссов кампании), резолвится в
//      ДВОЙНОЙ бросок подряд — редкий случай, когда самый долгий телеграф
//      уровня означает НЕ самую медленную угрозу, а самую двойную.
//   3. Привычка игрока: чем дольше телеграф — тем спокойнее игрок обычно
//      относится к результату (усвоено на десятках предыдущих боссов, где
//      длинный телеграф = один соразмерно сильный удар) — здесь длинный
//      телеграф специально предвещает не силу одного удара, а их число.
//   4. Честность: оба броска читаются одинаково ясно и с нормальной
//      скоростью — наказывается ложный вывод «длинный телеграф = можно
//      расслабиться после первого попадания», а не скорость реакции.
//
// Вязень (enem2, movementStyle: drift, архетип «давление снизу»):
//   1. Кто/почему: связка брёвен, что неровно тащится по земле, а не идёт
//      единым фронтом, как ровный щит Щитеня (уровень 68).
//   2. Хитрость: движковый эффект 'drift' (game.js, Enemy.update) плавно
//      сносит КАЖДОЕ полено к центру поля по ходу падения — бревно,
//      появившееся у самого края, к моменту падения оказывается заметно
//      ближе к центру, чем точка его спавна. Сигнатурная серия [12,13]
//      намеренно ставит рядом два полена с симметрично противоположным
//      стартом (xPos 35 и 65) — оба одинаково честно сносит к центру,
//      делая смещение особенно наглядным сразу на двух примерах разом.
//   3. Привычка игрока: после честной, буквально прямой стены Щитеня
//      (движется вдоль своего стартового xPos без смещения) игрок
//      переносит вывод «где появилось — там и будет» на Вязня — но здесь
//      конечная точка падения СИСТЕМАТИЧЕСКИ смещена к центру относительно
//      точки появления.
//   4. Честность: снос работает по одному и тому же правилу для каждой
//      атаки этого босса без исключений (не случайность) — внимательный
//      игрок, один раз заметивший закономерность, предсказывает конечную
//      точку любой атаки заранее; наказывается перенос вывода с другого
//      босса, не реакция.
//
// Кушачник (enem3, movementStyle: straight, архетип «колонна на одной
// стороне»):
//   1. Кто/почему: дисциплинированный солдат заставы — рубит топором
//      методичной колонной с ОДНОЙ стороны поля, держит строй, не мечется.
//   2. Хитрость: колонна всегда идёт с одной и той же (для конкретной
//      серии) стороны, и это ЧЕСТНО — но сигнатурная серия [12,13,14]
//      строит колонну на левой стороне, а ЗАВЕРШАЕТ её одним ударом с
//      правой — «одинаковое начало, разный конец» в чистом виде,
//      примерённое на архетип колонны, а не на парную атаку.
//   3. Привычка игрока: после нескольких повторов чистой односторонней
//      колонны игрок перестаёт следить за противоположной стороной поля
//      вовсе — Кушачник наказывает именно эту полную потерю внимания к
//      «безопасной» стороне.
//   4. Честность: завершающий удар с другой стороны телеграфирован так же
//      честно (нормальный telegraphMs, не мгновенный) — наказывается
//      полное отключение внимания от одной стороны поля, не реакция.
//
// Столбень (enem4, movementStyle: accelerate, архетип «асимметрия: лево не
// равно право»):
//   1. Кто/почему: неподвижный пограничный столб с копьём — стоит на
//      месте, колет только когда цель «дотягивается» до его радиуса; левая
//      и правая стороны его боя НАМЕРЕННО не равны (одна рука с копьём,
//      другая — обрубок), поэтому геометрия честно асимметрична.
//   2. Хитрость: атаки с «копейной» стороны — быстрые, короткие уколы;
//      атаки с «безрукой» стороны — редкие, но по-настоящему массивные
//      навалы всем телом. Игрок, читающий обе стороны как «одинаковую
//      угрозу разной интенсивности», ошибается в оценке риска: слабая на
//      вид сторона без видимого оружия периодически даёт САМЫЙ тяжёлый
//      удар уровня среди базовых атак.
//   3. Привычка игрока: симметричные боссы кампании приучают, что «правая
//      и левая версия одной атаки одинаково опасны» — Столбень ломает это
//      явным неравенством, требуя оценивать стороны отдельно, а не по
//      шаблону.
//   4. Честность: массивный навал «безрукой» стороны — редкий (раздел 11),
//      с телеграфом не короче обычного — наказывается недооценка более
//      скромной на вид стороны, не скорость реакции.
//
// Трубень (enem5, финал уровня, movementStyle: wave, архетип «дождь
// сверху»):
//   1. Кто/почему: глашатай тревоги — трубит сигнал, и с небес будто в
//      ответ сыплются перья и отголоски тревоги по всей ширине поля; как
//      финал, обязан проверить навыки предыдущих четырёх и добавить
//      собственный поворот (правило K).
//   2. Хитрость: сигнатурная атака [12] — единственная за весь бой, что
//      летит СОВСЕМ ОДНА, без единого соседнего снаряда рядом (все восемь
//      других комбо этого босса — серии из 2+ атак или цепи/баррикада).
//      За весь уровень игрок успевает выучить обратное правило на других
//      четырёх противниках: одиночная атака — это разгон/пауза перед или
//      после серии, то есть неопасный момент. Здесь единственная во всём
//      бою по-настоящему одинокая атака — не пауза, а сама угроза.
//   3. Привычка игрока: за уровень игрок привыкает мерить опасность числом
//      одновременно летящих снарядов (серии Дёгтеня/Вязня/Кушачника/
//      Столбеня — угроза почти всегда идёт пачкой) — Трубень наказывает
//      именно этот подсчёт: здесь ноль соседей не значит ноль риска.
//   4. Честность: сама атака летит с обычной для роли скоростью и
//      телеграфом (не короче и не быстрее прочих атак этого босса) —
//      наказывается вывод «раз я один снаряд вижу — можно расслабиться»,
//      а не скорость реакции на сам снаряд.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-68 (см.
// scratchpad/panelHistory.js): Дёгтень — pause (роль enem1: не
// использовался в последних 3 уровнях); Вязень — drift (роль enem2: не
// использовался в последних 3 уровнях); Кушачник — straight (роль enem3:
// не использовался в последних 5 уровнях); Столбень — accelerate (роль
// enem4: не использовался в последних 3 уровнях); Трубень — wave (роль
// enem5: свежий выбор, не совпадает с закрытием зон Ветрокрыла уровня 67,
// чтобы не повторять один и тот же финальный приём подряд). Пять стилей
// уровня различны между собой.
//
// ЦЕПИ (13.6/13.7/13.8) — пространство пар форм (25/25) по-прежнему
// исчерпано для всех ролей — применяется раздел 13.8:
// Дёгтень — vertical(6)+arc(6), источник vertical+arc — уровень 60 (@3+3)
//   — исключение: удвоенная длина (6+6 vs 3+3);
// Вязень — zigzag(7)+diagonal(6), источник zigzag+diagonal — уровень 63
//   (@4+3) — исключение: длина увеличена почти вдвое (7+6 vs 4+3);
// Кушачник — vertical(6)+diagonal(7), источник vertical+diagonal — уровень
//   59 (@3+4) — исключение: удвоенная длина (6+7 vs 3+4);
// Столбень — vertical(7)+arc(7), источник vertical+arc — уровень 59
//   (@4+4) — исключение: удвоенная длина (7+7 vs 4+4);
// Трубень — vertical(7)+zigzag(7), источник vertical+zigzag — уровень 53
//   (@4+4) — исключение: удвоенная длина (7+7 vs 4+4), максимальная длина
//   обеих цепей уместна для финала уровня.
// Формы всех пяти пар подтверждены программным классификатором ДО записи
// (scratchpad/shapeVerify67-69.js). Скорость вдоль каждой цепи
// невозрастающая (лесенка 18→…→6/7), yPos всех звеньев — 26 (граница
// движка CHAIN_MAX_SPAWN_Y). Ни одна barricade-способность не входит в
// isChain-комбо (ограничение раздела 16.4).
//
// БАРРИКАДЫ (раздел 16) — у каждого из пяти противников ровно ОДНА
// barricade-способность, эскалация 1:1 с ролью: Дёгтень 3 удара/1200мс,
// Вязень 4/1600, Кушачник 5/2000, Столбень 6/2400, Трубень 7/2800 —
// barricadePauseMs = barricadeHits×400 (раздел 16.2) без исключений.
let lvlNumber = 69;

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
			movementStyle: 'pause', cadence: 0.91, telegraphMs: 940, speedMultiplier: 0.95, damageMultiplier: 0.92,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Дёгтень: TAR_DRIP — капля копится дольше обычного, иногда бросок двойной
		enem2: {
			movementStyle: 'drift', cadence: 0.94, telegraphMs: 770, speedMultiplier: 1.00, damageMultiplier: 1.03,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		}, // Вязень: LOG_DRAG — каждое полено плавно сносит к центру по ходу падения
		enem3: {
			movementStyle: 'straight', cadence: 0.90, telegraphMs: 820, speedMultiplier: 1.02, damageMultiplier: 1.08,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20]
		}, // Кушачник: RANK_CHOP — дисциплинированная колонна с одной стороны
		enem4: {
			movementStyle: 'accelerate', cadence: 1.08, telegraphMs: 860, speedMultiplier: 0.96, damageMultiplier: 1.14,
			speedVariance: [0.84, 0.93, 1.02, 1.11, 1.20]
		}, // Столбень: LOPSIDED_GUARD — честная асимметрия: копьё быстрое, навал редкий и тяжёлый
		enem5: {
			movementStyle: 'wave', cadence: 0.82, telegraphMs: 1000, speedMultiplier: 1.09, damageMultiplier: 1.19,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		} // Трубень: ALARM_CALL — единственная за весь бой по-настоящему одинокая атака оказывается самой опасной
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl69/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl69/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl69/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl69/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl69/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Дёгтень',
		image: 'images/enemies/regions/6_zasech_les/lvl69/1.webp',
		baseHP: 18162,
		baseSpeed: 0,
		baseDamage: 20,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Вязень',
		image: 'images/enemies/regions/6_zasech_les/lvl69/2.webp',
		baseHP: 45406,
		baseSpeed: 0,
		baseDamage: 22,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Кушачник',
		image: 'images/enemies/regions/6_zasech_les/lvl69/3.webp',
		baseHP: 80334,
		baseSpeed: 0,
		baseDamage: 24,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Столбень',
		image: 'images/enemies/regions/6_zasech_les/lvl69/4.webp',
		baseHP: 129233,
		baseSpeed: 0,
		baseDamage: 26,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Трубень',
		image: 'images/enemies/regions/6_zasech_les/lvl69/5.webp',
		baseHP: 195596,
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
	// ===== Дёгтень: TAR_DRIP — капля копится дольше обычного, иногда бросок
	// двойной =====
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0 — одиночная капля
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1 — вторая капля той же серии
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //13 — нежданчик: третья капля после особо долгого накопления
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): застывший ком дёгтя, что не разбрызгивается
	// от первого удара — требует несколько ударов, прежде чем сорвётся.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.2 }, //16b
	// звенья цепи A — vertical(6): раздел 13.8, пара vertical+arc
	// переиспользована из уровня 60 (@3+3), длина увеличена вдвое (6+6).
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //19 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //20 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //21 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //22 цепь-A звено 6
	// звенья цепи B — arc(6): накопление (подъём), затем бросок (спуск).
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //24 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //25 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //26 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //27 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //28 цепь-B звено 6

	// ===== Вязень: LOG_DRAG — неровное давление снизу, каждое полено
	// плавно сносит к центру по ходу падения =====
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //12 — сигнатура: старт слева, честно сносит к центру (drift)
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //13 — сигнатура: соседнее звено обычного темпа, для контраста
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): особо тугая вязанка, что не рассыпается сразу —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.3 }, //16b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+diagonal
	// переиспользована из уровня 63 (@4+3), длина увеличена почти вдвое (7+6).
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //18 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //19 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //20 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //21 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //22 цепь-A звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //23 цепь-A звено 7
	// звенья цепи B — diagonal(6): монотонный снос.
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //24 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //25 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //26 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //27 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 37, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //28 цепь-B звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //29 цепь-B звено 6

	// ===== Кушачник: RANK_CHOP — дисциплинированная колонна ударов с одной
	// стороны =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //0 — колонна слева
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //3 — колонна справа
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //12 — сигнатура: начало левой колонны
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //13 — сигнатура: продолжение левой колонны
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //14 — сигнатура: завершающий удар с ПРАВОЙ стороны
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): плотный строй из двух брёвен, скреплённых —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.4 }, //16b
	// звенья цепи A — vertical(6): раздел 13.8, пара vertical+diagonal
	// переиспользована из уровня 59 (@3+4), длина увеличена вдвое (6+7).
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //19 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //20 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 43, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //21 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 46, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //22 цепь-A звено 6
	// звенья цепи B — diagonal(7): монотонный снос через всё поле.
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //24 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //25 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 46, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //26 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //27 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //28 цепь-B звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //29 цепь-B звено 7

	// ===== Столбень: LOPSIDED_GUARD — честная асимметрия: копьё быстрое,
	// навал редкий и тяжёлый =====
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //0 — копейная сторона: быстрый короткий укол
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //3 — безрукая сторона: редкий тяжёлый навал
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //12 — нежданчик: копейная серия
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //13 — нежданчик: самый тяжёлый навал уровня со «слабой» стороны
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //15
	// БАРРИКАДА (раздел 16): грубо отёсанный столб-обрубок, брошенный
	// поперёк — требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.5 }, //16b
	// звенья цепи A — vertical(7): раздел 13.8, пара vertical+arc
	// переиспользована из уровня 59 (@4+4), длина увеличена вдвое (7+7).
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //18 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //19 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //20 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //21 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //22 цепь-A звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //23 цепь-A звено 7
	// звенья цепи B — arc(7): подъём, затем спуск.
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //24 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //25 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //26 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //27 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //28 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //29 цепь-B звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //30 цепь-B звено 7

	// ===== Трубень: ALARM_CALL — единственная за весь бой по-настоящему
	// одинокая атака оказывается самой опасной =====
	// Раздел 0.1 lvlData/Правила создания уровня.txt: каждая wave-атака ниже
	// получает собственные явные waveAmplitude/waveFrequency — широкая,
	// неспешная раскачка пера (амплитуда 8, частота 1.1), заметно шире и
	// медленнее тугого ленточного трепета Лохменя (уровень 68) — разные
	// монстры, разный почерк волны, не дефолт движка по умолчанию.
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,  waveAmplitude: 8, waveFrequency: 1.1 }, //0
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7,  waveAmplitude: 8, waveFrequency: 1.1 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,  waveAmplitude: 8, waveFrequency: 1.1 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7,  waveAmplitude: 8, waveFrequency: 1.1 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,  waveAmplitude: 8, waveFrequency: 1.1 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22, waveAmplitude: 6, waveFrequency: 1.3 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24, waveAmplitude: 6, waveFrequency: 1.3 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26, waveAmplitude: 6, waveFrequency: 1.3 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4,  waveAmplitude: 8, waveFrequency: 1.0 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4,  waveAmplitude: 8, waveFrequency: 1.0 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18, waveAmplitude: 7, waveFrequency: 1.2 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19, waveAmplitude: 7, waveFrequency: 1.2 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16, waveAmplitude: 8, waveFrequency: 1.1 }, //12 — сигнатура: единственная за весь бой по-настоящему одинокая атака, без единого соседа
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17, waveAmplitude: 7, waveFrequency: 1.2 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18, waveAmplitude: 7, waveFrequency: 1.2 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13, waveAmplitude: 8, waveFrequency: 1.0 }, //15
	// БАРРИКАДА (раздел 16): щит из плотно сбитых перьев и доспеха —
	// самая крупная и стойкая баррикада уровня, финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.6 }, //16b
	// звенья цепи A — vertical(7): раздел 13.8, пара vertical+zigzag
	// переиспользована из уровня 53 (@4+4), длина увеличена вдвое (7+7).
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //18 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //19 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 57, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //20 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //21 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 56, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //22 цепь-A звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //23 цепь-A звено 7
	// звенья цепи B — zigzag(7): резкий частый разброс, тревожный сигнал.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //24 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //25 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //26 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //27 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //28 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //29 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //30 цепь-B звено 7
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 340, bossDelayAbDop: 6100 }, // самый долгий отдых — накопление капли
	{ boss: 'enem2', bossDelayAb: 235, bossDelayAbDop: 4200 }, // неровное, но частое давление снизу
	{ boss: 'enem3', bossDelayAb: 205, bossDelayAbDop: 3700 }, // частые дисциплинированные удары
	{ boss: 'enem4', bossDelayAb: 200, bossDelayAbDop: 4600 }, // частая копейная сторона, редкий тяжёлый навал
	{ boss: 'enem5', bossDelayAb: 265, bossDelayAbDop: 5300 }, // собранный финал
];

const bossAbilitiesDop = [
	// Дёгтень — TAR_DRIP
	{ boss: 'enem1', indexAbilities: [0] },
	{ boss: 'enem1', indexAbilities: [0, 1] }, // same-start с [0]: та же капля, вторая следом
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27, 28], isChain: true }, // ← цепь-B (6, раздел 13.8)
	{ boss: 'enem1', indexAbilities: [0, 1, 13] }, // нежданчик: третья капля после особо долгого накопления
	{ boss: 'enem1', indexAbilities: [8, 9, 10] }, // сигнатурная: три метких броска через всё поле подряд

	// Вязень — LOG_DRAG
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6] },
	{ boss: 'enem2', indexAbilities: [9, 10] },
	{ boss: 'enem2', indexAbilities: [7, 8] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 5] }, // same-start с [0,1,2], расходится быстрым флангом
	{ boss: 'enem2', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22, 23], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27, 28, 29], isChain: true }, // ← цепь-B (6, раздел 13.8)
	{ boss: 'enem2', indexAbilities: [11] }, // нежданчик: одиночный медленный центр после стены
	{ boss: 'enem2', indexAbilities: [12, 13] }, // сигнатурная: два симметричных старта (35/65) — оба честно сносит к центру разом

	// Кушачник — RANK_CHOP
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 6] }, // same-start с [0,1,2], расходится быстрым фланговым ударом
	{ boss: 'enem3', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20, 21, 22], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem3', indexAbilities: [23, 24, 25, 26, 27, 28, 29], isChain: true }, // ← цепь-B (7, раздел 13.8)
	{ boss: 'enem3', indexAbilities: [8, 9] }, // нежданчик: медленная пара по центру после колонны
	{ boss: 'enem3', indexAbilities: [12, 13, 14] }, // сигнатурная: левая колонна, завершение с правой стороны

	// Столбень — LOPSIDED_GUARD
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [3, 4] },
	{ boss: 'enem4', indexAbilities: [5, 6] },
	{ boss: 'enem4', indexAbilities: [9, 10] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 9] }, // same-start с [0,1,2], расходится ещё одним копейным уколом
	{ boss: 'enem4', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21, 22, 23], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27, 28, 29, 30], isChain: true }, // ← цепь-B (7, раздел 13.8)
	{ boss: 'enem4', indexAbilities: [7, 8] }, // нежданчик: медленная пара по центру
	{ boss: 'enem4', indexAbilities: [12, 13] }, // сигнатурная: копейная серия, затем самый тяжёлый навал уровня

	// Трубень — ALARM_CALL, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [10, 11] },
	{ boss: 'enem5', indexAbilities: [8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым разгоном
	{ boss: 'enem5', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22, 23], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29, 30], isChain: true }, // ← цепь-B (7, раздел 13.8)
	{ boss: 'enem5', indexAbilities: [7] }, // нежданчик: одиночный удар прямо по центру на пределе скорости
	{ boss: 'enem5', indexAbilities: [12] }, // сигнатурная: волновое перо-капля в момент сигнала трубы
];

// Лорные названия связок временных улучшений — пять шагов одной обороны
// заставы, словарь каждого строго завязан на его реальный облик и материал
// (правило 12.1): бочка с дёгтем и обручем, вязанка дров и верёвка, солдат
// с кушаком и топором, столб-идол с копьём, глашатай с трубой и пером.
// Полных совпадений фраз между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
	// Дёгтень — бочка кипящего дёгтя: обруч, жижа, капля, доска.
	enem1: {
		variant1: 'Дегтярный кураж', variant2: 'Обручевая хватка', variant3: 'Бочка-таран',
		variant4: 'Смолистый напор', variant5: 'Меткая капля', variant6: 'Бешеная капля',
		variant7: 'Дегтярный норов', variant8: 'Крепкий обруч', variant9: 'Ударная капля',
		variant10: 'Живучая доска', variant11: 'Колючий обод', variant12: 'Капля и в темноту',
		variant13: 'Толстая доска', variant14: 'Неутомимая капля', variant15: 'Пружинистая капля',
		variant16: 'Оскаленный обруч, зоркий глаз', variant17: 'Дегтярная удача', variant18: 'Верная капля',
		variant19: 'Молниеносная капля', variant20: 'Дегтярный нюх', variant21: 'Цепкая жижа',
		variant22: 'Юркая, несмотря на бочку', variant23: 'Дегтярная стойкость', variant24: 'Долгое накопление, зоркий глаз',
		variant25: 'Ускользающая капля', variant26: 'Дикая капля', variant27: 'Стойкий обруч',
		variant28: 'Капля наповал', variant29: 'Крепкий дёгтень', variant30: 'Смолистая мощь',
		variant31: 'Капля с оглядкой', variant32: 'Живучий обруч', variant33: 'Юркий и дегтярный',
		variant34: 'Смолистая прыть', variant35: 'Быстрая капля, крепкий обруч'
	},
	// Вязень — вязанка дров: бревно, верёвка, кора, мох.
	enem2: {
		variant1: 'Вязаный кураж', variant2: 'Верёвочная хватка', variant3: 'Бревно-таран',
		variant4: 'Волочильный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
		variant7: 'Вязаный норов', variant8: 'Крепкое бревно', variant9: 'Ударный рывок',
		variant10: 'Живучий мох', variant11: 'Колючая кора', variant12: 'Рывок и в темноту',
		variant13: 'Толстое бревно', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
		variant16: 'Тугой узел, зоркий глаз', variant17: 'Вязаная удача', variant18: 'Верный рывок',
		variant19: 'Молниеносный рывок', variant20: 'Вязаный нюх', variant21: 'Цепкая верёвка',
		variant22: 'Юркий, несмотря на груз', variant23: 'Вязаная стойкость', variant24: 'Долгое волочение, зоркий глаз',
		variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкое бревно',
		variant28: 'Рывок наповал', variant29: 'Крепкий вязень', variant30: 'Волочильная мощь',
		variant31: 'Рывок с оглядкой', variant32: 'Живучая верёвка', variant33: 'Юркий и вязаный',
		variant34: 'Волочильная прыть', variant35: 'Быстрый рывок, крепкое бревно'
	},
	// Кушачник — солдат заставы: кушак, топор, доспех, строй.
	enem3: {
		variant1: 'Кушачный кураж', variant2: 'Поясная хватка', variant3: 'Топор-таран',
		variant4: 'Строевой напор', variant5: 'Меткий удар топором', variant6: 'Бешеный удар топором',
		variant7: 'Кушачный норов', variant8: 'Крепкий доспех', variant9: 'Ударный замах',
		variant10: 'Живучий кушак', variant11: 'Колючая пряжка', variant12: 'Удар топором и в темноту',
		variant13: 'Толстый доспех', variant14: 'Неутомимый удар топором', variant15: 'Пружинистый удар топором',
		variant16: 'Алый кушак, зоркий глаз', variant17: 'Кушачная удача', variant18: 'Верный удар топором',
		variant19: 'Молниеносный удар топором', variant20: 'Кушачный нюх', variant21: 'Цепкий пояс',
		variant22: 'Юркий, несмотря на доспех', variant23: 'Кушачная стойкость', variant24: 'Дисциплинированный замах, зоркий глаз',
		variant25: 'Ускользающий удар топором', variant26: 'Дикий удар топором', variant27: 'Стойкий доспех',
		variant28: 'Удар топором наповал', variant29: 'Крепкий кушачник', variant30: 'Строевая мощь',
		variant31: 'Удар топором с оглядкой', variant32: 'Живучий доспех', variant33: 'Юркий и кушачный',
		variant34: 'Строевая прыть', variant35: 'Быстрый удар топором, крепкий доспех'
	},
	// Столбень — пограничный столб: копьё, верёвка, обрубок, полоса.
	enem4: {
		variant1: 'Столбовой кураж', variant2: 'Обвязочная хватка', variant3: 'Копьё-таран',
		variant4: 'Пограничный напор', variant5: 'Меткий укол', variant6: 'Бешеный укол',
		variant7: 'Столбовой норов', variant8: 'Крепкий обрубок', variant9: 'Ударный укол',
		variant10: 'Живучая полоса', variant11: 'Колючая обвязка', variant12: 'Укол и в темноту',
		variant13: 'Толстый обрубок', variant14: 'Неутомимый укол', variant15: 'Пружинистый укол',
		variant16: 'Красная полоса, зоркий глаз', variant17: 'Столбовая удача', variant18: 'Верный укол',
		variant19: 'Молниеносный укол', variant20: 'Столбовой нюх', variant21: 'Цепкая обвязка',
		variant22: 'Юркий, несмотря на стойку', variant23: 'Столбовая стойкость', variant24: 'Тяжёлый навал, зоркий глаз',
		variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Стойкий обрубок',
		variant28: 'Укол наповал', variant29: 'Крепкий столбень', variant30: 'Пограничная мощь',
		variant31: 'Укол с оглядкой', variant32: 'Живучая обвязка', variant33: 'Юркий и столбовой',
		variant34: 'Пограничная прыть', variant35: 'Быстрый укол, крепкий обрубок'
	},
	// Трубень — глашатай тревоги: труба, перо, доспех, сигнал.
	enem5: {
		variant1: 'Трубный кураж', variant2: 'Перьевая хватка', variant3: 'Клюв-таран',
		variant4: 'Тревожный напор', variant5: 'Меткий сигнал', variant6: 'Бешеный сигнал',
		variant7: 'Трубный норов', variant8: 'Крепкий рог', variant9: 'Ударный сигнал',
		variant10: 'Живучее перо', variant11: 'Колючее перо', variant12: 'Сигнал и в темноту',
		variant13: 'Толстое оперение', variant14: 'Неутомимый сигнал', variant15: 'Пружинистый сигнал',
		variant16: 'Гулкий рог, зоркий глаз', variant17: 'Трубная удача', variant18: 'Верный сигнал',
		variant19: 'Молниеносный сигнал', variant20: 'Трубный нюх', variant21: 'Цепкий коготь',
		variant22: 'Юркий, несмотря на латы', variant23: 'Трубная стойкость', variant24: 'Долгий зов, зоркий глаз',
		variant25: 'Ускользающий сигнал', variant26: 'Дикий сигнал', variant27: 'Стойкая кираса',
		variant28: 'Сигнал наповал', variant29: 'Крепкий трубень', variant30: 'Тревожная мощь',
		variant31: 'Сигнал с оглядкой', variant32: 'Живучее перо', variant33: 'Юркий и трубный',
		variant34: 'Тревожная прыть', variant35: 'Быстрый сигнал, крепкий доспех'
	}
};
