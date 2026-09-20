// Уровень 73 «Свистовые западни» — восьмой уровень области VI «Глухой
// край» («Засечный лес»), обычный уровень (пять разных монстров).
// Продолжает сквозную механику «Баррикада» (раздел 16) и цепи (13.6/13.7/
// 13.8).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью:
// полная история 1-72 прогнана scratchpad/panelHistory.js — movementStyle по
// роли сверен с ПРАВИЛЬНЫМ окном последних 3 уровней (70/71/72). Пространство
// пар форм цепи (25/25) исчерпано для всех пяти ролей — раздел 13.8 применён
// с источниками, отличными от уровней 71-72.
//
// АРТ (images/enemies/regions/6_zasech_les/lvl73/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — берестяной свёрток-рожок с сердитым лицом, дует воздух из
//   раструба — суть в БЕРЕСТЯНОЙ СВИСТУЛЬКЕ, что копит дыхание перед свистом.
// 2.webp — согнутая дугой берёзовая жердь с натянутой тетивой, держит лук
//   двумя ветвями-руками, злое лицо на стволе — суть в ПОДРЕЗАННОЙ ЖЕРДИ,
//   спружиненной лесной ловушке-луке.
// 3.webp — деревянный самострел на четырёх когтистых ножках с раструбом-
//   рожком сверху и злым лицом — суть в СВИСТЯЩЕМ СТРЕЛОМЁТЕ, механической
//   ловушке-арбалете.
// 4.webp — гуманоид в остроконечном лиственном капюшоне, с костяным манком
//   во рту, держит посох — суть в РАЗБОЙНИКЕ-МАНКЕ, что подражает свисту
//   приманки.
// 5.webp (финал) — крупный гуманоид в меховой шапке с сигнальными рожками на
//   поясе, держит большой рог, красный кушак — суть в ДЕСЯТНИКЕ, что
//   командует всей свистовой западнёй.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА УРОВНЯ — «Свистовые западни»: свист копится в берестяном рожке
// (Берестень), спружиненная жердь-лук ждёт добычу (Жердень), механический
// самострел целится (Стрелень), разбойник подражает приманке (Подманень), а
// десятник командует всей сетью свистовых сигналов (Рожковень) — пять
// звеньев одной сигнальной системы, а не пять случайных монстров.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Берестень (от «береста»
// — материал, не словарное «свисток»/«свистулька»); Жердень (от «жердь» —
// материал ловушки, не словарное «лук»/«самострел»); Стрелень (от «стрела»
// — снаряд, не словарное «самострел»/«арбалет»); Подманень (от «подманивать»
// — действие, не словарное «манок»/«приманка» напрямую); Рожковень (от
// «рожок» — материал/инструмент, не словарное «десятник»/«главарь»).
// Проверено программно (grep по всем dispName всей кампании) — ни одно имя
// не встречается ранее.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА — письменно, ДО геометрии, для каждого:
//
// Берестень (enem1, movementStyle: pause, архетип «доля пути, а не
// расстояние»):
//   1. Кто/почему: берестяная свистулька — набирает воздух и держит его
//      (pause: полная остановка на 420мс при 42% ПРОЙДЕННОГО ПУТИ, game.js),
//      прежде чем издать свист.
//   2. Хитрость: 42% — это ДОЛЯ пути, а не абсолютное расстояние. Свистулька,
//      что появилась совсем близко к игроку (высокий yPos), проходит свои
//      42% почти сразу и застывает буквально через миг после спавна — та же
//      атака, начатая издалека (низкий yPos), успевает пролететь заметный
//      путь, прежде чем замереть.
//   3. Привычка игрока: игрок, привыкший, что pause-атака сперва заметно
//      летит, а потом застывает (все прежние pause-боссы стартовали издалека
//      — Дёгтень, Дозорник), не ждёт мгновенной заморозки у цели, что
//      появилась рядом.
//   4. Честность: правило 42% — одно и то же для обеих атак без исключений,
//      момент заморозки просто зависит от стартовой высоты — наказывается
//      перенос ожидания «сначала долгий полёт», не скорость реакции.
//
// Жердень (enem2, movementStyle: wave, архетип «ширина виляния не значит
// точность»):
//   1. Кто/почему: подрезанная жердь — согнутый лук, что раскачивается в
//      полёте (wave), как распрямляющаяся ветвь.
//   2. Хитрость: у wave амплитуда — параметр КАЖДОЙ атаки отдельно (как и
//      частота — см. Силовень, уровень 72). Сигнатурная пара пускает рядом
//      две жерди с одинаковой частотой, но разной амплитудой (одна виляет
//      широко, другая — едва заметно) — прилетают они почти одновременно,
//      хотя широко viляющая выглядит гораздо неувереннее узкой.
//   3. Привычка игрока: игрок оценивает управляемость атаки по ширине
//      видимого виляния (широкое = хаотичное, скоро собьётся; узкое =
//      уверенное, точно по курсу) — амплитуда не влияет ни на курс попадания,
//      ни на время прилёта.
//   4. Честность: амплитуда каждой жерди задана явно и не меняется в полёте
//      — наказывается перенос «широкое виляние = менее точное/медленное», не
//      скорость реакции.
//
// (Примечание по честности данных: движковый `wavePhase` НЕ используется для
// синхронизации пары атак друг с другом — `swayTime` каждой custom-сущности
// стартует со СЛУЧАЙНОГО значения при спавне (`Math.random()*2π`, game.js) и
// никогда не сбрасывается, поэтому заданный в данных сдвиг фазы не даёт
// гарантированного, воспроизводимого соотношения между двумя РАЗНЫМИ
// атаками — только между последовательными кадрами ОДНОЙ и той же атаки.
// Раньше здесь была не так сформулированная версия этого босса, полагавшаяся
// на «противофазу» как на детерминированный эффект — исправлено до того, как
// стало частью финальной версии файла.)
//
// Стрелень (enem3, movementStyle: straight, архетип «сломанная альтернация»):
//   1. Кто/почему: свистящий стреломёт — деревянная механическая ловушка на
//      верёвочном взводе, стреляет строго по прямой (straight, без единого
//      движкового эффекта на скорость или позицию).
//   2. Хитрость: большинство серий этого босса чередуют стороны строго через
//      одну (лево-право) — сигнатурная серия ломает этот ритм, стреляя
//      ДВАЖДЫ подряд с одной стороны, прежде чем наконец переключиться.
//   3. Привычка игрока: после нескольких чередующихся серий игрок предугадывает
//      сторону следующего болта по чистой альтернации — здесь альтернация на
//      миг ломается, и «предсказанная» сторона пустует, а угроза приходит
//      оттуда же, откуда только что была.
//   4. Честность: каждый болт телеграфирован одинаково честно (обычный
//      telegraphMs) — наказывается слепое доверие шаблону чередования, не
//      скорость реакции.
//
// Подманень (enem4, movementStyle: lateRush, архетип «опасная приманка»):
//   1. Кто/почему: разбойник с костяным манком — подражает беспомощному
//      свисту-приманке, но у самой цели рывком довершает бросок (lateRush:
//      порог 55% пути — движковая константа, та же, что у Частокольника и
//      Лареня, не выбор конкретного босса).
//   2. Хитрость: на прочих уровнях кампании «медленная приманка»
//      (customSpeed≤8, раздел 9.1) была честным медленным фоном без подвоха
//      — Подманень нарочно даёт своей приманке lateRush, поэтому её кажущаяся
//      низкая начальная скорость почти удваивается ближе к цели, в отличие
//      от честных приманок других боссов.
//   3. Привычка игрока: игрок, что научился игнорировать медленную приманку
//      как безопасный фон за прошлые уровни, переносит эту привычку сюда —
//      здесь «приманка» опаснее, чем кажется её начальный темп.
//   4. Честность: рывок применяется тем же самым правилом движка, что и у
//      любой lateRush-атаки кампании (без исключений специально для
//      приманки) — наказывается слепое доверие категории «приманка =
//      безопасно», не скорость реакции.
//
// Рожковень (enem5, финал уровня, movementStyle: weave, архетип «край поля
// ломает симметрию»):
//   1. Кто/почему: десятник с рожками на поясе — трубит сигналы, виляя
//      (weave), как и предыдущие weave-боссы уровня, но сам выходит у самого
//      края тропы; как финал, обязан проверить навыки предыдущих четырёх и
//      добавить собственный поворот (правило K).
//   2. Хитрость: движковый предел поля (`clampHorizontal`, game.js: держит
//      спрайт внутри 0.5-93.5%) обрезает размах weave у самого края.
//      Сигнатурная пара стартует у обеих границ поля (≈4% и ≈90%) — фикси-
//      рованный размах weave (±5.5%) в сторону ближнего края упирается в
//      предел и обрезается, а в сторону центра идёт полностью: раскачка
//      становится ЗАМЕТНО НЕСИММЕТРИЧНОЙ, в отличие от любой центральной
//      weave-атаки уровня (Жердень качается через wave, а не weave, но тот же
//      принцип демонстрировался бы и у него, будь он weave-боссом).
//   3. Привычка игрока: игрок, что видел ровное симметричное виляние weave у
//      предыдущего weave-боссов кампании (Стёгач, уровень 71), интерпретирует
//      любое отклонение как случайный шум — здесь асимметрия постоянна и
//      предсказуема (обрезка всегда с ближней к краю стороны).
//   4. Честность: обрезка — следствие того же самого предела поля, что
//      действует для ЛЮБОЙ атаки кампании у края экрана (не исключение для
//      Рожковеня) — наказывается недооценка того, что атака с края всё ещё
//      полноценно опасна с «открытой» стороны, не скорость реакции.
//
// ДВИЖЕНИЕ (movementStyle) — окно «последние 3» = 70/71/72: Берестень —
// pause (роль enem1: 70 straight, 71 lateRush, 72 wave — не использовался);
// Жердень — wave (роль enem2: 70 lateRush, 71 accelerate, 72 weave — не
// использовался); Стрелень — straight (роль enem3: 70 pause, 71 drift, 72
// lateRush — не использовался); Подманень — lateRush (роль enem4: 70 wave,
// 71 weave, 72 pause — не использовался); Рожковень — weave (роль enem5: 70
// accelerate, 71 straight, 72 drift — не использовался). Пять стилей уровня
// различны между собой.
//
// ЦЕПИ (13.6/13.7/13.8) — пространство пар форм (25/25) исчерпано для всех
// ролей — источники сознательно взяты НЕ из уровней 71-72 (свежесть):
// Берестень — zigzag(7)+irregular(6), источник zigzag+irregular — уровень 47
//   (@4+5) — исключение: длина увеличена (7+6 vs 4+5);
// Жердень — vertical(6)+arc(7), источник vertical+arc — уровень 48 (@4+3) —
//   исключение: длина увеличена (6+7 vs 4+3);
// Стрелень — zigzag(7)+arc(6), источник zigzag+arc — уровень 49 (@4+3) —
//   исключение: длина увеличена (7+6 vs 4+3);
// Подманень — zigzag(6)+irregular(7), источник zigzag+irregular — уровень 50
//   (@4+6) — исключение: вторая цепь удлинена (7 vs 6);
// Рожковень — arc(7)+diagonal(7), источник arc+diagonal — уровень 51 (@3+4)
//   — исключение: длина увеличена (7+7 vs 3+4).
// Формы всех пяти пар подтверждены программным классификатором ДО записи
// (scratchpad/verifyShapes.js). Скорость вдоль каждой цепи невозрастающая
// (лесенка 18→…→6/7), yPos всех звеньев — 26 (граница движка
// CHAIN_MAX_SPAWN_Y). Ни одна barricade-способность не входит в isChain-
// комбо (ограничение раздела 16.4).
//
// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — КАЖДОЕ комбо из 2+ способностей
// посчитано scratchpad/designCalc.js ДО записи и повторно прогнано целиком
// через scripts/combo-audit.js — разброс прилётов у каждого комбо в пределах 73-1552мс (см. трейлинг-комментарии), ни одно комбо не состоит из
// двух и более genuinely медленных (customSpeed≤8) атак без быстрого
// элемента.
//
// БАРРИКАДЫ (раздел 16) — эскалация 1:1 с ролью: Берестень 3 удара/1200мс,
// Жердень 4/1600, Стрелень 5/2000, Подманень 6/2400, Рожковень 7/2800 —
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
let lvlNumber = 73;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.976,
	damageMultiplier: 1.726,
	minWaveDelay: 2425,
	minShotDelay: 185,
	minTelegraphMs: 638,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.645, cadence: 0.957, speed: 0.988, damage: 1.009, telegraphMultiplier: 1.049, surpriseChance: 0.0505, maxActiveAttacks: 10 },
		{ phase: 2, minHp: 0.275, cadence: 0.821, speed: 1.023, damage: 1.117, telegraphMultiplier: 0.996, surpriseChance: 0.1215, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.721, speed: 1.086, damage: 1.272, telegraphMultiplier: 0.915, surpriseChance: 0.203, maxActiveAttacks: 13 }
	],
	bosses: {
		enem1: { combatIdentity: "Дыхание за берестой", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4, movementStyle: 'pause', cadence: 0.915, telegraphMs: 1025, speedMultiplier: 1.010, damageMultiplier: 0.840,
			speedVariance: [0.87, 0.95, 1.03, 1.11, 1.19]
		}, // Берестень: BREATH_NEAR — заморозка на той же доле пути, но момент зависит от стартовой высоты
		enem2: { combatIdentity: "Жердь возвращается", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'wave', cadence: 0.935, telegraphMs: 840, speedMultiplier: 1.085, damageMultiplier: 1.005,
			speedVariance: [0.83, 0.90, 0.97, 1.04, 1.11]
		}, // Жердень: POLE_AMPLITUDE — широкое виляние не означает менее точный или более медленный удар
		enem3: { combatIdentity: "Стрела нарушает чередование", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'straight', cadence: 1.015, telegraphMs: 750, speedMultiplier: 1.025, damageMultiplier: 1.110,
			speedVariance: [0.87, 0.96, 1.05, 1.14, 1.23]
		}, // Стрелень: BOLT_RHYTHM — сломанная альтернация сторон
		enem4: { combatIdentity: "Приманка перед рывком", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.065, telegraphMs: 875, speedMultiplier: 0.985, damageMultiplier: 1.085,
			speedVariance: [0.87, 0.95, 1.03, 1.11, 1.19]
		}, // Подманень: LURE_RUSH — «приманка» с тем же движковым рывком, что и обычная атака
		enem5: { combatIdentity: "Рог меняет направление облавы", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'weave', cadence: 1.035, telegraphMs: 805, speedMultiplier: 0.990, damageMultiplier: 1.255,
			speedVariance: [0.80, 0.87, 0.94, 1.01, 1.08]
		} // Рожковень: EDGE_CLAMP — предел поля обрезает размах у самого края
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl73/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl73/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl73/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl73/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl73/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Берестень',
		image: 'images/enemies/regions/6_zasech_les/lvl73/1.webp',
		baseHP: 19567,
		baseSpeed: 0,
		baseDamage: 20.15,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Жердень',
		image: 'images/enemies/regions/6_zasech_les/lvl73/2.webp',
		baseHP: 48917,
		baseSpeed: 0,
		baseDamage: 21.75,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Стрелень',
		image: 'images/enemies/regions/6_zasech_les/lvl73/3.webp',
		baseHP: 86546,
		baseSpeed: 0,
		baseDamage: 24.40,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Подманень',
		image: 'images/enemies/regions/6_zasech_les/lvl73/4.webp',
		baseHP: 139226,
		baseSpeed: 0,
		baseDamage: 26.40,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Рожковень',
		image: 'images/enemies/regions/6_zasech_les/lvl73/5.webp',
		baseHP: 210721,
		baseSpeed: 0,
		baseDamage: 27.70,
		spawnWeight: 5,
		baseExp: 0,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 1000 }
	},

};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 12;
const bossInterval = 3;

//spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

// Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
// speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

const bossAbilities = [
	// ===== Берестень: BREATH_NEAR — заморозка на той же доле пути, но
	// момент зависит от стартовой высоты =====
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //0 — сигнатура: близкий спавн — заморозка почти мгновенно
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //1 — сигнатура: далёкий спавн — заметный полёт до заморозки
	{ boss: 'enem1', type: 'enem11', xPos: 61, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //2 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 44, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //3 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //4 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 57, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //5 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //8 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //9 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //10 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 44, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //11 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 57, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //12 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 67, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //13 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //14 — быстрая атака
	// БАРРИКАДА (раздел 16): смолистый сверток бересты, что не разгорается
	// сразу.
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.165 }, //15b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+irregular
	// переиспользована из уровня 47 (@4+5), длина увеличена (7+6).
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 64, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 36, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //20 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //21 цепь-A звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //22 цепь-A звено 7
	// звенья цепи B — irregular(6): непредсказуемый разброс.
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //23 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //24 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //25 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //26 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 27, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //27 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //28 цепь-B звено 6

	// ===== Жердень: POLE_AMPLITUDE — широкое виляние не означает менее
	// точный или более медленный удар =====
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11, waveAmplitude: 3,  waveFrequency: 1.2, wavePhase: 0 }, //0 — сигнатура: узкое, «уверенное» виляние
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12, waveAmplitude: 11, waveFrequency: 1.2, wavePhase: 0 }, //1 — сигнатура: широкое, «хаотичное» виляние — та же точность и скорость
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17, waveAmplitude: 9, waveFrequency: 1.2, wavePhase: 0 }, //2 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18, waveAmplitude: 9, waveFrequency: 1.1, wavePhase: 0 }, //3 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13, waveAmplitude: 5, waveFrequency: 1.5, wavePhase: 0 }, //4 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 47, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1, wavePhase: 0 }, //5 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 33, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6, waveAmplitude: 5, waveFrequency: 1, wavePhase: 0 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5, waveAmplitude: 6, waveFrequency: 1.3, wavePhase: 0 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 62, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19, waveAmplitude: 9, waveFrequency: 1.5, wavePhase: 0 }, //8 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17, waveAmplitude: 5, waveFrequency: 1.4, wavePhase: 0 }, //9 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13, waveAmplitude: 8, waveFrequency: 1.5, wavePhase: 0 }, //10 — средняя атака
	// БАРРИКАДА (раздел 16): согнутая жердь, что не распрямляется сразу.
	{ boss: 'enem2', type: 'enem22', xPos: 46, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 ,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.270 }, //11b
	// звенья цепи A — vertical(6): раздел 13.8, пара vertical+arc
	// переиспользована из уровня 48 (@4+3), длина увеличена (6+7).
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //12 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //13 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //14 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //15 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //16 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //17 цепь-A звено 6
	// звенья цепи B — arc(7): подъём, затем спуск.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //18 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //19 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 28, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //20 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //21 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 36, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //22 цепь-B звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //23 цепь-B звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 26, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //24 цепь-B звено 7

	// ===== Стрелень: BOLT_RHYTHM — сломанная альтернация сторон =====
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //0 — сигнатура: левый болт, часть 1
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //1 — сигнатура: тот же левый борт, часть 2 (ломает альтернацию)
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, //2 — сигнатура: наконец переключение вправо
	{ boss: 'enem3', type: 'enem33', xPos: 43, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, //3 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //4 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //5 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //6 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //10 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //11 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 73, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, //12 — быстрая атака
	// БАРРИКАДА (раздел 16): застрявшая в ложе стрела, что заклинило
	// механизм.
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.365 }, //13b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+arc
	// переиспользована из уровня 49 (@4+3), длина увеличена (7+6).
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //14 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //15 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 37, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //16 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 57, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //17 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 33, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //20 цепь-A звено 7
	// звенья цепи B — arc(6): подъём, затем спуск.
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //23 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //24 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //25 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //26 цепь-B звено 6

	// ===== Подманень: LURE_RUSH — «приманка» с тем же движковым рывком, что
	// и обычная атака =====
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //0 — сигнатура: кажущаяся приманка, у цели рывком ускоряется
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //1 — сигнатура: обычная атака рядом для контраста
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 23 }, //2 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 41, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21 }, //3 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 57, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //4 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //5 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 37, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //8 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //9 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //10 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //11 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 44, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 23 }, //12 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //13 — средняя атака
	// БАРРИКАДА (раздел 16): вязанка ветвей у капюшона, что не поддаётся
	// сразу.
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.460 }, //14b
	// звенья цепи A — zigzag(6): раздел 13.8, пара zigzag+irregular
	// переиспользована из уровня 50 (@4+6), первая цепь такой же длины (6).
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //15 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //16 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //17 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //20 цепь-A звено 6
	// звенья цепи B — irregular(7): непредсказуемый разброс.
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //22 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //24 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //25 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //26 цепь-B звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //27 цепь-B звено 7

	// ===== Рожковень: EDGE_CLAMP — предел поля обрезает размах у самого
	// края =====
	{ boss: 'enem5', type: 'enem55', xPos: 4,  yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //0 — сигнатура: у левого края, размах в поле обрезан
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //1 — сигнатура: у правого края, обрезка зеркальная
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //2 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //3 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //4 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 73, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 37, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //8 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //9 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //10 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //11 — быстрая атака
	// БАРРИКАДА (раздел 16): вбитый пограничный столб с рожками — самая
	// крупная и стойкая баррикада уровня, финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.570 }, //12b
	// звенья цепи A — arc(7): раздел 13.8, пара arc+diagonal переиспользована
	// из уровня 51 (@3+4), длина увеличена (7+7).
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //14 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //15 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //16 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //17 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 41, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //18 цепь-A звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //19 цепь-A звено 7
	// звенья цепи B — diagonal(7): монотонный снос через всё поле.
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //25 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //26 цепь-B звено 7

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 12,customHP: 1,customDamage: 20.15,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 32,yPos: 20,customHP: 1,customDamage: 20.15,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 74,yPos: 6,customHP: 1,customDamage: 20.15,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 40,customHP: 1,customDamage: 20.15,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 8,customHP: 1,customDamage: 20.15,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 86,yPos: 12,customHP: 1,customDamage: 20.15,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 12,customHP: 1,customDamage: 21.75,customSpeed: 16, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem2",type: "enem22",xPos: 66,yPos: 20,customHP: 1,customDamage: 21.75,customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem2",type: "enem22",xPos: 40,yPos: 6,customHP: 1,customDamage: 21.75,customSpeed: 21, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 40,customHP: 1,customDamage: 21.75,customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 8,customHP: 1,customDamage: 21.75,customSpeed: 20, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem2",type: "enem22",xPos: 14,yPos: 12,customHP: 1,customDamage: 21.75,customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 12,customHP: 1,customDamage: 24.4,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 34,yPos: 20,customHP: 1,customDamage: 24.4,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 78,yPos: 6,customHP: 1,customDamage: 24.4,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 40,customHP: 1,customDamage: 24.4,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 8,customHP: 1,customDamage: 24.4,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 88,yPos: 12,customHP: 1,customDamage: 24.4,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 82,yPos: 12,customHP: 1,customDamage: 26.4,customSpeed: 16},
    {boss: "enem4",type: "enem44",xPos: 20,yPos: 20,customHP: 1,customDamage: 26.4,customSpeed: 14},
    {boss: "enem4",type: "enem44",xPos: 66,yPos: 6,customHP: 1,customDamage: 26.4,customSpeed: 21},
    {boss: "enem4",type: "enem44",xPos: 82,yPos: 24,customHP: 1,customDamage: 26.4,customSpeed: 7},
    {boss: "enem4",type: "enem44",xPos: 82,yPos: 8,customHP: 1,customDamage: 26.4,customSpeed: 20},
    {boss: "enem4",type: "enem44",xPos: 36,yPos: 12,customHP: 1,customDamage: 26.4,customSpeed: 18},
    {boss: "enem5",type: "enem55",xPos: 14,yPos: 12,customHP: 1,customDamage: 27.7,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 48,yPos: 20,customHP: 1,customDamage: 27.7,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 6,customHP: 1,customDamage: 27.7,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 14,yPos: 40,customHP: 1,customDamage: 27.7,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 14,yPos: 8,customHP: 1,customDamage: 27.7,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 48,yPos: 12,customHP: 1,customDamage: 27.7,customSpeed: 18}
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 341, bossDelayAbDop: 5711, firstWaveDelayMs: 2400 }, // долгий вдох перед свистом
	{ boss: 'enem2', bossDelayAb: 281, bossDelayAbDop: 4876, firstWaveDelayMs: 2340 }, // ровная спружиненная раскачка
	{ boss: 'enem3', bossDelayAb: 216, bossDelayAbDop: 3937, firstWaveDelayMs: 1890 }, // механически частые выстрелы
	{ boss: 'enem4', bossDelayAb: 228, bossDelayAbDop: 4522, firstWaveDelayMs: 2171 }, // манящие броски вперемешку с рывками
	{ boss: 'enem5', bossDelayAb: 221, bossDelayAbDop: 3712, firstWaveDelayMs: 1782 }, // самый частый, командный финал
];

// ДАВЛЕНИЕ ПО ВРЕМЕНИ (раздел 9.1) — у каждого комбо из 2+ способностей ниже
// в трейлинг-комментарии указан реальный разброс прилётов, посчитанный
// scratchpad/designCalc.js ДО записи и повторно проверенный
// scripts/combo-audit.js ПОСЛЕ записи (level 73: 0 проблем).
const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0,1]},
    {boss: "enem1",indexAbilities: [7],openingOrder: 0},
    {boss: "enem1",indexAbilities: [11,2]},
    {boss: "enem1",indexAbilities: [3,6,13]},
    {boss: "enem1",indexAbilities: [29,33,31,34],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Дыхание за берестой — знакомство",openingOrder: 1,shotGapsMs: [360,900,360]},
    {boss: "enem1",indexAbilities: [29,33,34],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Дыхание за берестой — иной конец",shotGapsMs: [360,900,360]},
    {boss: "enem1",indexAbilities: [31,34,29,33],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Дыхание за берестой — завершение",shotGapsMs: [360,900,360]},
    {boss: "enem1",indexAbilities: [15],barricade: true},
    {boss: "enem1",indexAbilities: [16,17,18,19,20,21,22],isChain: true},
    {boss: "enem1",indexAbilities: [23,24,25,26,27,28],isChain: true},
    {boss: "enem2",indexAbilities: [0,1]},
    {boss: "enem2",indexAbilities: [6],openingOrder: 0},
    {boss: "enem2",indexAbilities: [7]},
    {boss: "enem2",indexAbilities: [9,4]},
    {boss: "enem2",indexAbilities: [5,2,10]},
    {boss: "enem2",indexAbilities: [8,4,3]},
    {boss: "enem2",indexAbilities: [3,2]},
    {boss: "enem2",indexAbilities: [5,9]},
    {boss: "enem2",indexAbilities: [25,26,27],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Жердь возвращается — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [25,26,29],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Жердь возвращается — иной конец"},
    {boss: "enem2",indexAbilities: [30,27,26,29],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Жердь возвращается — завершение"},
    {boss: "enem2",indexAbilities: [11],barricade: true},
    {boss: "enem2",indexAbilities: [12,13,14,15,16,17],isChain: true},
    {boss: "enem2",indexAbilities: [18,19,20,21,22,23,24],isChain: true},
    {boss: "enem3",indexAbilities: [0,1,2]},
    {boss: "enem3",indexAbilities: [8],openingOrder: 0},
    {boss: "enem3",indexAbilities: [4,12,10]},
    {boss: "enem3",indexAbilities: [11,5]},
    {boss: "enem3",indexAbilities: [6,9,3,7]},
    {boss: "enem3",indexAbilities: [6,11,8,4]},
    {boss: "enem3",indexAbilities: [5,8]},
    {boss: "enem3",indexAbilities: [27,31,28],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Стрела нарушает чередование — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [27,31,29],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Стрела нарушает чередование — иной конец"},
    {boss: "enem3",indexAbilities: [32,29,32,28],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Стрела нарушает чередование — завершение"},
    {boss: "enem3",indexAbilities: [13],barricade: true},
    {boss: "enem3",indexAbilities: [14,15,16,17,18,19,20],isChain: true},
    {boss: "enem3",indexAbilities: [21,22,23,24,25,26],isChain: true},
    {boss: "enem4",indexAbilities: [0,1]},
    {boss: "enem4",indexAbilities: [6],openingOrder: 0},
    {boss: "enem4",indexAbilities: [11,13]},
    {boss: "enem4",indexAbilities: [8,5]},
    {boss: "enem4",indexAbilities: [3,7]},
    {boss: "enem4",indexAbilities: [9,10]},
    {boss: "enem4",indexAbilities: [31,30],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Приманка перед рывком — знакомство",openingOrder: 1},
    {boss: "enem4",indexAbilities: [31,30,32],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Приманка перед рывком — иной конец"},
    {boss: "enem4",indexAbilities: [31,33,30,32],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Приманка перед рывком — завершение"},
    {boss: "enem4",indexAbilities: [14],barricade: true},
    {boss: "enem4",indexAbilities: [15,16,17,18,19,20],isChain: true},
    {boss: "enem4",indexAbilities: [21,22,23,24,25,26,27],isChain: true},
    {boss: "enem5",indexAbilities: [0,1]},
    {boss: "enem5",indexAbilities: [7],openingOrder: 0},
    {boss: "enem5",indexAbilities: [2,10]},
    {boss: "enem5",indexAbilities: [3,6,11]},
    {boss: "enem5",indexAbilities: [5,8,4,9]},
    {boss: "enem5",indexAbilities: [3,11,4]},
    {boss: "enem5",indexAbilities: [11,6,9,2]},
    {boss: "enem5",indexAbilities: [8,4,10]},
    {boss: "enem5",indexAbilities: [27,29,32],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Рог меняет направление облавы — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [27,29,28],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Рог меняет направление облавы — иной конец"},
    {boss: "enem5",indexAbilities: [31,29,32,28],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Рог меняет направление облавы — завершение"},
    {boss: "enem5",indexAbilities: [12],barricade: true},
    {boss: "enem5",indexAbilities: [13,14,15,16,17,18,19],isChain: true},
    {boss: "enem5",indexAbilities: [20,21,22,23,24,25,26],isChain: true}
];

// Лорные названия связок временных улучшений — пять звеньев одной свистовой
// системы, словарь каждого строго завязан на его реальный облик и материал
// (правило 12.1): берестяной рожок и дыхание, согнутая жердь и тетива,
// деревянный самострел и болт, костяной манок и посох, большой рог и рожки
// на поясе. Полных совпадений фраз между монстрами нет (проверено вручную
// построчно).
const UPGRADE_VARIANT_NAMES = {
	// Берестень — берестяная свистулька: дыхание, береста, раструб, свист.
	enem1: {
		variant1: 'Берестяной кураж', variant2: 'Раструбная хватка', variant3: 'Свист-таран',
		variant4: 'Дыхательный напор', variant5: 'Меткий свист', variant6: 'Бешеный свист',
		variant7: 'Берестяной норов', variant8: 'Крепкая береста', variant9: 'Ударный свист',
		variant10: 'Живучий раструб', variant11: 'Колючий срез', variant12: 'Свист и в темноту',
		variant13: 'Толстая береста', variant14: 'Неутомимый свист', variant15: 'Пружинистый свист',
		variant16: 'Долгий вдох, зоркий глаз', variant17: 'Берестяная удача', variant18: 'Верный свист',
		variant19: 'Молниеносный свист', variant20: 'Берестяной нюх', variant21: 'Цепкий узел бересты',
		variant22: 'Юркий, несмотря на раструб', variant23: 'Берестяная стойкость', variant24: 'Задержанный выдох, зоркий глаз',
		variant25: 'Ускользающий свист', variant26: 'Дикий свист', variant27: 'Стойкая береста',
		variant28: 'Свист наповал', variant29: 'Крепкий берестень', variant30: 'Дыхательная мощь',
		variant31: 'Свист с оглядкой', variant32: 'Живучая береста', variant33: 'Юркий и берестяной',
		variant34: 'Дыхательная прыть', variant35: 'Быстрый свист, крепкая береста'
	},
	// Жердень — подрезанная жердь-лук: тетива, изгиб, ветвь, стрела.
	enem2: {
		variant1: 'Жердяной кураж', variant2: 'Тетивная хватка', variant3: 'Изгиб-таран',
		variant4: 'Спружиненный напор', variant5: 'Меткий выстрел жердью', variant6: 'Бешеный выстрел жердью',
		variant7: 'Жердяной норов', variant8: 'Крепкий изгиб', variant9: 'Ударный выстрел жердью',
		variant10: 'Живучая ветвь', variant11: 'Колючий сук', variant12: 'Выстрел жердью и в темноту',
		variant13: 'Толстый изгиб', variant14: 'Неутомимый выстрел жердью', variant15: 'Пружинистый выстрел жердью',
		variant16: 'Тугая тетива, зоркий глаз', variant17: 'Жердяная удача', variant18: 'Верный выстрел жердью',
		variant19: 'Молниеносный выстрел жердью', variant20: 'Жердяной нюх', variant21: 'Цепкий узел тетивы',
		variant22: 'Юркий, несмотря на изгиб', variant23: 'Жердяная стойкость', variant24: 'Долгий натяг, зоркий глаз',
		variant25: 'Ускользающий выстрел жердью', variant26: 'Дикий выстрел жердью', variant27: 'Стойкий изгиб',
		variant28: 'Выстрел жердью наповал', variant29: 'Крепкий жердень', variant30: 'Спружиненная мощь',
		variant31: 'Выстрел жердью с оглядкой', variant32: 'Живучая тетива', variant33: 'Юркий и жердяной',
		variant34: 'Спружиненная прыть', variant35: 'Быстрый выстрел жердью, крепкий изгиб'
	},
	// Стрелень — свистящий стреломёт: болт, ложе, взвод, наконечник.
	enem3: {
		variant1: 'Стрелевой кураж', variant2: 'Ложевая хватка', variant3: 'Болт-таран',
		variant4: 'Взводной напор', variant5: 'Меткий болт', variant6: 'Бешеный болт',
		variant7: 'Стрелевой норов', variant8: 'Крепкое ложе', variant9: 'Ударный болт',
		variant10: 'Живучий взвод', variant11: 'Колючий наконечник', variant12: 'Болт и в темноту',
		variant13: 'Толстое ложе', variant14: 'Неутомимый болт', variant15: 'Пружинистый болт',
		variant16: 'Точный прицел, зоркий глаз', variant17: 'Стрелевая удача', variant18: 'Верный болт',
		variant19: 'Молниеносный болт', variant20: 'Стрелевой нюх', variant21: 'Цепкий рычаг',
		variant22: 'Юркий, несмотря на ложе', variant23: 'Стрелевая стойкость', variant24: 'Двойной взвод, зоркий глаз',
		variant25: 'Ускользающий болт', variant26: 'Дикий болт', variant27: 'Стойкое ложе',
		variant28: 'Болт наповал', variant29: 'Крепкий стрелень', variant30: 'Взводная мощь',
		variant31: 'Болт с оглядкой', variant32: 'Живучее ложе', variant33: 'Юркий и стрелевой',
		variant34: 'Взводная прыть', variant35: 'Быстрый болт, крепкое ложе'
	},
	// Подманень — разбойник-манок: манок, посох, капюшон, свист-приманка.
	enem4: {
		variant1: 'Манящий кураж', variant2: 'Манковая хватка', variant3: 'Посох-таран',
		variant4: 'Приманочный напор', variant5: 'Меткий манок', variant6: 'Бешеный манок',
		variant7: 'Манящий норов', variant8: 'Крепкий посох', variant9: 'Ударный манок',
		variant10: 'Живучий капюшон', variant11: 'Колючий сук посоха', variant12: 'Манок и в темноту',
		variant13: 'Толстый посох', variant14: 'Неутомимый манок', variant15: 'Пружинистый манок',
		variant16: 'Костяной манок, зоркий глаз', variant17: 'Манящая удача', variant18: 'Верный манок',
		variant19: 'Молниеносный манок', variant20: 'Манящий нюх', variant21: 'Цепкий капюшон',
		variant22: 'Юркий, несмотря на посох', variant23: 'Манящая стойкость', variant24: 'Обманный рывок, зоркий глаз',
		variant25: 'Ускользающий манок', variant26: 'Дикий манок', variant27: 'Стойкий посох',
		variant28: 'Манок наповал', variant29: 'Крепкий подманень', variant30: 'Приманочная мощь',
		variant31: 'Манок с оглядкой', variant32: 'Живучий посох', variant33: 'Юркий и манящий',
		variant34: 'Приманочная прыть', variant35: 'Быстрый манок, крепкий посох'
	},
	// Рожковень — десятник со свистовыми рожками: рог, кушак, шапка, сигнал.
	enem5: {
		variant1: 'Рожковый кураж', variant2: 'Рожковая хватка', variant3: 'Рог-таран',
		variant4: 'Командный напор', variant5: 'Меткий сигнал рогом', variant6: 'Бешеный сигнал рогом',
		variant7: 'Рожковый норов', variant8: 'Крепкий кушак', variant9: 'Ударный сигнал рогом',
		variant10: 'Живучая шапка', variant11: 'Колючий рожок', variant12: 'Сигнал рогом и в темноту',
		variant13: 'Толстый кушак', variant14: 'Неутомимый сигнал рогом', variant15: 'Пружинистый сигнал рогом',
		variant16: 'Большой рог, зоркий глаз', variant17: 'Рожковая удача', variant18: 'Верный сигнал рогом',
		variant19: 'Молниеносный сигнал рогом', variant20: 'Рожковый нюх', variant21: 'Цепкий пояс',
		variant22: 'Юркий, несмотря на рожки', variant23: 'Рожковая стойкость', variant24: 'Частый зов, зоркий глаз',
		variant25: 'Ускользающий сигнал рогом', variant26: 'Дикий сигнал рогом', variant27: 'Стойкая шапка',
		variant28: 'Сигнал рогом наповал', variant29: 'Крепкий рожковень', variant30: 'Командная мощь',
		variant31: 'Сигнал рогом с оглядкой', variant32: 'Живучий кушак', variant33: 'Юркий и рожковый',
		variant34: 'Командная прыть', variant35: 'Быстрый сигнал рогом, крепкий кушак'
	}
};
