// Уровень 68 (черновое название «Звериная тропа» из lvlData/areas.js не
// совпадает с реально сгенерированным артом — см. раздел 12 lvlData/Правила
// создания уровня.txt: «картинка — истина, документ поправлен под неё»).
// Реальный арт изображает пять деревянно-соломенных оберегов/чучел
// пограничной линии — рабочее авторское название этого конкретного
// наполнения: «Дозорный вал». Третий уровень области VI «Глухой край»
// («Засечный лес»), обычный уровень (пять разных монстров), продолжает
// сквозную механику «Баррикада» (раздел 16).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен перед записью:
// полная история 1-67 (335 строк) прогнана эквивалентом живого
// классификатора панели (scratchpad/panelHistory.js, тот же
// classifyChainShape/extractComments, что и в admin-boss-pattern-panel.html,
// исполнен через vm вместо браузера). Пространство пар форм цепи (25/25)
// по-прежнему исчерпано для всех пяти ролей — раздел 13.8 применяется явно
// для каждого босса ниже.
//
// АРТ (images/enemies/regions/6_zasech_les/lvl68/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — фигура из рваной мешковины с резным деревянным лицом-оберегом
//   под капюшоном, красные ленты треплются на ветру, копьё в руке — суть в
//   ТРЕПЕЩУЩЕЙ НА ВЕТРУ ТКАНИ, что маскирует направление удара копья.
// 2.webp — круглый деревянный щит-голова с прибитыми гвоздями досками,
//   крест-накрест сшитая рана и когтистые лапы, из щелей сочится смола —
//   суть в ЖИВОМ ЩИТЕ, что держит оборону и бьёт когтем из-за укрытия.
// 3.webp — шаровидная фигура, целиком утыканная заострёнными деревянными
//   кольями во все стороны (буквальный «ёж» засечной линии), оскаленное
//   лицо в центре — суть в КАТЯЩЕМСЯ КОМЕ КОЛЬЕВ без единой безопасной
//   стороны для приближения.
// 4.webp — лучник в стёганом красном доспехе с плетёным колпаком, целится
//   из настоящего лука — суть в ПРИЦЕЛЬНОМ, ОДИНОЧНОМ ВЫСТРЕЛЕ, а не в
//   ближнем бою.
// 5.webp (финал) — коренастый деревянный идол в резной броне с боевой
//   палицей в одной руке и глиняным дымящимся горшком, притороченным за
//   спиной, — суть в МЕДЛИТЕЛЬНОМ, НО ВЗРЫВНОМ последнем защитнике вала.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА УРОВНЯ — ожившие обереги и снаряжение сторожевого вала засечной
// черты: копейщик-идол, живой щит, кольевой ёж-обстрел, лучник и, наконец,
// защитник с палицей и зажигательным горшком — пять РАЗНЫХ ролей одного и
// того же гарнизона (не пять случайных лесных существ).
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Лохмень (от «лохмотья» —
// материал ткани, не словарное «чучело»); Щитень (от «щит» — материал,
// суффикс по образцу «Засечень»/«Смоляк», не словарное «голем»); Шипень
// (от «шип» — материал, не словарное «ёж»/«игольник» — «ёж» ИСТОРИЧЕСКИ
// сам является названием засечного заграждения, поэтому взят описательный
// материал, а не готовый термин); Тетивень (от «тетива» — деталь оружия,
// не словарное «лучник»); Чадень (от «чад» — материал/явление, отличное от
// «дым»/«Дымокор» уровня 66, не словарное «идол»). Проверено программно
// (grep по всем dispName всей кампании) — ни одно имя не встречается ранее.
//
// ЧЕТЫРЕ ВОПРОСА ГЕЙМДИЗАЙНЕРА — письменно, ДО геометрии, для каждого:
//
// Лохмень (enem1, movementStyle: wave, архетип «зигзаг L-R без нижней
// стены»):
//   1. Кто/почему: оберег-идол в рваной мешковине с трепещущими на ветру
//      красными лентами — атаки читаются через ткань, что мотает из
//      стороны в сторону сама по себе, а не по направлению копья.
//   2. Хитрость: волновой зигзаг специально ВЫСОКОЙ частоты у ленточных
//      атак (в отличие от типично широкой плавной волны прошлых wave-боссов)
//      — игрок, привыкший вести взгляд по плавной синусоиде, теряет
//      быстрый ленточный зигзаг из виду, если ждёт «широкий размах».
//   3. Привычка игрока: прошлые wave-атаки кампании были в основном
//      широкими и редкими по смене направления — рефлекс «одна плавная
//      дуга» не готов к частому мельканию стороны.
//   4. Честность: телеграф длинный (роль «спокойный»), сама траектория
//      видна целиком и непрерывно — наказывается инерция ожидания
//      «плавности», а не скорость реакции.
//
// Щитень (enem2, movementStyle: straight, архетип «давление снизу»):
//   1. Кто/почему: круглый деревянный щит на когтистых лапах, что просто
//      неотвратимо надвигается прямой стеной снизу — щит не финтит, он
//      давит массой.
//   2. Хитрость: почти всегда честный прямой напор снизу — но одна редкая
//      сигнатурная серия [12,13] прерывается ОДИНОЧНЫМ фланговым когтем
//      сбоку в момент, когда стена снизу должна была продолжиться —
//      «разбивание чанка» (раздел 1.1 п.4): выученная безопасная пауза
//      посреди знакомой стены оказывается не пустой.
//   3. Привычка игрока: после нескольких повторов стены снизу игрок ждёт
//      предсказуемого ритма и отвлекается на других боссов уровня в паузах
//      между волнами стены — Щитень наказывает именно это отвлечение.
//   4. Честность: сигнатурная серия редкая (раздел 11), фланговый коготь
//      телеграфирован так же честно, как обычная атака — наказывается
//      потеря концентрации, не реакция.
//
// Шипень (enem3, movementStyle: accelerate, архетип «только углы»):
//   1. Кто/почему: шаровидный ком заострённых кольев — атакует только из
//      углов поля, буквально «выкатываясь» с любой стороны без предпочтения.
//   2. Хитрость: угол появления каждый раз честно случаен среди всех
//      четырёх, но customSpeed у углового броска ВСЕГДА одинаков —
//      привычный рефлекс «разная скорость = разная опасность» не работает,
//      единственный переменный параметр — САМ угол, а не темп.
//   3. Привычка игрока: игрок оценивает опасность атаки по её скорости
//      (усвоено на всех предыдущих боссах уровня и кампании) — здесь
//      скорость ничего не говорит, важно только откуда покатится ком.
//   4. Честность: все четыре угла телеграфируются одинаково честно и
//      заранее видимым кружком — наказывается привычка судить по скорости
//      вместо взгляда на источник, не сама реакция.
//
// Тетивень (enem4, movementStyle: lateRush, архетип «направленный подъём
// или спуск по краю»):
//   1. Кто/почему: дисциплинированный лучник — стрела всегда идёт вдоль
//      одного края поля (подъём или спуск), а не поперёк, как у ближних
//      бойцов.
//   2. Хитрость: лучник долго держит натянутую тетиву (долгий wind-up
//      lateRush) перед каждым выстрелом — обычные серии этого босса
//      стреляют по одной стрелe с одного края за раз, приучая читать
//      каждый долгий натяг как отдельное, законченное решение. Сигнатурная
//      серия [12,13] запускает тот же долгий натяг почти впритык с ДВУХ
//      противоположных краёв сразу (разрыв старта — один шаг cadence,
//      порядка 200мс, на грани человеческой реакции) — второй выстрел
//      прилетает, пока игрок ещё разбирается с первым.
//   3. Привычка игрока: остальные атаки этого же босса — одна стрела на
//      один долгий натяг — приучает реагировать на угрозу целиком, начиная
//      и заканчивая одним решением, прежде чем искать следующую.
//   4. Честность: оба выстрела телеграфированы так же честно и длинно, как
//      и одиночные (раздел 5.1: интервал между быстрыми фланговыми
//      выстрелами по-прежнему соблюдён) — наказывается допущение «раз я
//      уже отбил один долгий натяг — свободен», а не скорость реакции.
//
// Чадень (enem5, финал уровня, movementStyle: drift, архетип «редкие
// mid-only»):
//   1. Кто/почему: последний, самый медлительный защитник вала — бьёт
//      редко, но по центру поля мощными ударами палицы и горшками с чадом,
//      как и подобает финалу, проверяет навыки всех предыдущих четырёх
//      (правило K) и добавляет один новый поворот.
//   2. Хитрость: обучающая тройка [0,1,2] приучает, что атаки из центра —
//      это ТРИ слабых, медленных тычка подряд (customSpeed 5 у всех трёх).
//      Сигнатурная атака [12] бьёт из той же центральной зоны, но ОДНИМ
//      заметно более быстрым ударом (customSpeed 13) — то же место, другой
//      ритм: не три слабых, а один настоящий.
//   3. Привычка игрока: после нескольких повторов тройного центрального
//      тычка игрок расслабляется при виде ЛЮБОЙ атаки из этой зоны,
//      ожидая ту же слабую тройку — Чадень наказывает именно перенос
//      вывода «центр = тройной тычок» на одиночную, более резкую атаку
//      из того же места.
//   4. Честность: телеграф самый долгий на уровне (роль «финал»), редкая
//      частота (раздел 11) — наказывается перенос вывода с обучающей
//      тройки, не скорость реакции на сам удар.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-67 (см.
// scratchpad/panelHistory.js): Лохмень — wave (роль enem1: не использовался
// в последних 3 уровнях); Щитень — straight (роль enem2: не использовался
// в последних 6 уровнях подряд — там были pause/weave/drift/lateRush);
// Шипень — accelerate (роль enem3: свежий выбор); Тетивень — lateRush
// (роль enem4: не использовался в последних 6, где преобладал straight);
// Чадень — drift (роль enem5: самый низкий бакет роли, усиленно нужен).
// Пять стилей уровня различны между собой.
//
// ЦЕПИ (13.6/13.7/13.8) — пространство пар форм (25/25) по-прежнему
// исчерпано для всех ролей — применяется раздел 13.8:
// Лохмень — zigzag(7)+arc(6), источник zigzag+arc — уровень 46 (@4+3) —
//   исключение: длина увеличена почти вдвое (7+6 vs 4+3);
// Щитень — vertical(6)+vertical(7), источник — уровень 58 (@3+4) —
//   исключение: удвоенная длина (6+7 vs 3+4);
// Шипень — zigzag(7)+vertical(7), источник zigzag+vertical — уровень 48
//   (@4+4) — исключение: удвоенная длина (7+7 vs 4+4);
// Тетивень — zigzag(7)+diagonal(6), источник zigzag+diagonal — уровень 62
//   (@4+3) — исключение: длина увеличена почти вдвое (7+6 vs 4+3);
// Чадень — vertical(6)+diagonal(7), источник vertical+diagonal — уровень 54
//   (@3+4) — исключение: удвоенная длина (6+7 vs 3+4).
// Формы всех пяти пар подтверждены программным классификатором ДО записи
// (scratchpad/shapeVerify67-69.js). Скорость вдоль каждой цепи
// невозрастающая (лесенка 18→…→6/7), yPos всех звеньев — 26 (граница
// движка CHAIN_MAX_SPAWN_Y). Ни одна barricade-способность не входит в
// isChain-комбо (ограничение раздела 16.4).
//
// БАРРИКАДЫ (раздел 16) — у каждого из пяти противников ровно ОДНА
// barricade-способность, эскалация 1:1 с ролью: Лохмень 3 удара/1200мс,
// Щитень 4/1600, Шипень 5/2000, Тетивень 6/2400, Чадень 7/2800 —
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
let lvlNumber = 68;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.051,
	damageMultiplier: 1.826,
	minWaveDelay: 2635,
	minShotDelay: 177,
	minTelegraphMs: 630,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.58, cadence: 0.968, speed: 0.994, damage: 0.972, telegraphMultiplier: 1.001, surpriseChance: 0.041, maxActiveAttacks: 12 },
		{ phase: 2, minHp: 0.355, cadence: 0.844, speed: 1.008, damage: 1.127, telegraphMultiplier: 0.968, surpriseChance: 0.1315, maxActiveAttacks: 11 },
		{ phase: 3, minHp: 0.00, cadence: 0.751, speed: 1.087, damage: 1.251, telegraphMultiplier: 0.926, surpriseChance: 0.2145, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { signatureEvery: 4,
			movementStyle: 'wave', cadence: 1.025, telegraphMs: 970, speedMultiplier: 0.875, damageMultiplier: 0.970,
			speedVariance: [0.90, 1.01, 1.12, 1.23, 1.34]
		}, // Лохмень: RAG_FLUTTER — трепещущие ленты, частый узкий зигзаг вместо плавной дуги
		enem2: { signatureEvery: 4,
			movementStyle: 'straight', cadence: 0.875, telegraphMs: 775, speedMultiplier: 1.105, damageMultiplier: 1.065,
			speedVariance: [0.86, 0.96, 1.06, 1.16, 1.26]
		}, // Щитень: SHIELD_PRESS — неотвратимая прямая стена снизу
		enem3: { signatureEvery: 4,
			movementStyle: 'accelerate', cadence: 1.035, telegraphMs: 715, speedMultiplier: 0.995, damageMultiplier: 1.095,
			speedVariance: [0.90, 0.99, 1.08, 1.17, 1.26]
		}, // Шипень: SPIKE_ROLL — ком кольев катится строго из углов
		enem4: { signatureEvery: 4,
			movementStyle: 'lateRush', cadence: 1.150, telegraphMs: 835, speedMultiplier: 1.015, damageMultiplier: 1.135,
			speedVariance: [0.84, 0.91, 0.98, 1.05, 1.12]
		}, // Тетивень: EDGE_LOOSE — долгий натяг, выстрел строго вдоль края
		enem5: { signatureEvery: 4,
			movementStyle: 'drift', cadence: 0.865, telegraphMs: 975, speedMultiplier: 1.115, damageMultiplier: 1.250,
			speedVariance: [0.90, 1.00, 1.10, 1.20, 1.30]
		} // Чадень: EMBER_POT — редкий, тяжёлый удар палицей и горшком по центру
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl68/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl68/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl68/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl68/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl68/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1',
		dispName: 'Лохмень',
		image: 'images/enemies/regions/6_zasech_les/lvl68/1.webp',
		baseHP: 17824,
		baseSpeed: 0,
		baseDamage: 20.30,
		spawnWeight: 5,
		baseExp: 250,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem2: {
		name: 'enem2',
		dispName: 'Щитень',
		image: 'images/enemies/regions/6_zasech_les/lvl68/2.webp',
		baseHP: 44561,
		baseSpeed: 0,
		baseDamage: 21.80,
		spawnWeight: 15,
		baseExp: 400,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 900 }
	},
	enem3: {
		name: 'enem3',
		dispName: 'Шипень',
		image: 'images/enemies/regions/6_zasech_les/lvl68/3.webp',
		baseHP: 78838,
		baseSpeed: 0,
		baseDamage: 24.20,
		spawnWeight: 20,
		baseExp: 600,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem4: {
		name: 'enem4',
		dispName: 'Тетивень',
		image: 'images/enemies/regions/6_zasech_les/lvl68/4.webp',
		baseHP: 126827,
		baseSpeed: 0,
		baseDamage: 25.90,
		spawnWeight: 10,
		baseExp: 800,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 950 }
	},
	enem5: {
		name: 'enem5',
		dispName: 'Чадень',
		image: 'images/enemies/regions/6_zasech_les/lvl68/5.webp',
		baseHP: 191954,
		baseSpeed: 0,
		baseDamage: 28.30,
		spawnWeight: 5,
		baseExp: 0,
		size: '32%',
		deathAnimation: { preset: 'default', durationMs: 1000 }
	},

};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 15;
const bossInterval = 5;

//spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

// Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
// speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

const bossAbilities = [
	// ===== Лохмень: RAG_FLUTTER — трепещущие ленты, частый узкий зигзаг =====
	// Раздел 0.1 lvlData/Правила создания уровня.txt: 'wave' без явных полей
	// даёт лишь дефолт движка (amplitude 6, frequency 1.2) — тот же, что и
	// у любого другого wave-босса кампании, а не заявленную «частую узкую»
	// раскачку. Ниже КАЖДАЯ атака получает собственные явные waveAmplitude
	// (5, у'же дефолта — лента мотает туго, не широким размахом) и
	// waveFrequency (2.6, заметно выше дефолта 1.2 — частая смена стороны).
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13, waveAmplitude: 5, waveFrequency: 2.6, wavePhase: 0 }, //0
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14, waveAmplitude: 5, waveFrequency: 2.6, wavePhase: 0 }, //1
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18, waveAmplitude: 5, waveFrequency: 2.6, wavePhase: 0 }, //2
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19, waveAmplitude: 5, waveFrequency: 2.6, wavePhase: 0 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13, waveAmplitude: 5, waveFrequency: 2.4, wavePhase: 0 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14, waveAmplitude: 5, waveFrequency: 2.4, wavePhase: 0 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17, waveAmplitude: 5, waveFrequency: 2.6, wavePhase: 0 }, //6 — нежданчик: узкий частый зигзаг по центру, а не по флангу
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10, waveAmplitude: 5, waveFrequency: 1.2, wavePhase: 0 }, //7 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11, waveAmplitude: 8, waveFrequency: 0.9, wavePhase: 0 }, //8 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18, waveAmplitude: 9, waveFrequency: 1.3, wavePhase: 0 }, //9 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.4, wavePhase: 0 }, //10 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5, waveAmplitude: 8, waveFrequency: 1.5, wavePhase: 0 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 53, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4, waveAmplitude: 8, waveFrequency: 1, wavePhase: 0 }, //12 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 57, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11, waveAmplitude: 9, waveFrequency: 1.5, wavePhase: 0 }, //13 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 47, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14, waveAmplitude: 5, waveFrequency: 1.1, wavePhase: 0 }, //14 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15, waveAmplitude: 5, waveFrequency: 1.4, wavePhase: 0 }, //15 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //16 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19, waveAmplitude: 7, waveFrequency: 1, wavePhase: 0 }, //17 — быстрая атака
	// БАРРИКАДА (раздел 16): узел из туго стянутых лент и мешковины —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 ,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.185 }, //18b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+arc переиспользована
	// из уровня 46 (@4+3), длина увеличена почти вдвое (7+6).
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //19 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //20 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //21 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //22 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //23 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //24 цепь-A звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //25 цепь-A звено 7
	// звенья цепи B — arc(6): подъём, затем спуск.
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //26 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 33, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //27 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //28 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //29 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //30 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 37, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //31 цепь-B звено 6

	// ===== Щитень: SHIELD_PRESS — неотвратимая прямая стена снизу =====
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6 — сигнатура: одиночный коготь слева вместо продолжения стены
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7 — сигнатура: тот же фланговый коготь справа
	{ boss: 'enem2', type: 'enem22', xPos: 54, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21 }, //8 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //9 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 79, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 }, //10 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 43, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 66, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //13 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //14 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //15 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 46, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //16 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //17 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 39, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //18 — быстрая атака
	// БАРРИКАДА (раздел 16): цельная доска щита, вбитая гвоздями — требует
	// несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.320 }, //19b
	// звенья цепи A — vertical(6): раздел 13.8, пара vertical+vertical
	// переиспользована из уровня 58 (@3+4), длина увеличена вдвое (6+7).
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //21 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //22 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //24 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //25 цепь-A звено 6
	// звенья цепи B — vertical(7): вторая, чуть смещённая колонна.
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //26 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 73, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //27 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //28 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //29 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //30 цепь-B звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //31 цепь-B звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //32 цепь-B звено 7

	// ===== Шипень: SPIKE_ROLL — ком кольев катится строго из углов =====
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //0 — угол ЛВ
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //1 — угол ПВ
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //2 — нежданчик: тот же «угловой» темп, но ПО ЦЕНТРУ (не из угла)
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //3 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 }, //4 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 56, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23 }, //5 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //6 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 34, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 27, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //9 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //10 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, //12 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// БАРРИКАДА (раздел 16): особо крупный шип-балка — требует несколько
	// ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.430 }, //13b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+vertical
	// переиспользована из уровня 48 (@4+4), длина увеличена вдвое (7+7).
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //14 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //15 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //16 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //17 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //20 цепь-A звено 7
	// звенья цепи B — vertical(7): почти неподвижный xPos.
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //22 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 57, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //24 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 56, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //25 цепь-B звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //26 цепь-B звено 6
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //27 цепь-B звено 7

	// ===== Тетивень: EDGE_LOOSE — долгий натяг, выстрел строго вдоль края =====
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //2 — сигнатура: прицел держится у левого края
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //3 — сигнатура: выстрел на деле уходит вдоль правого края
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 }, //4 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 74, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //5 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 57, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //6 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //8 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 27, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //9 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 53, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //11 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 }, //12 — средняя нижняя атака
	// БАРРИКАДА (раздел 16): полный колчан стрел, брошенный поперёк пути —
	// требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.475 }, //13b
	// звенья цепи A — zigzag(7): раздел 13.8, пара zigzag+diagonal
	// переиспользована из уровня 62 (@4+3), длина увеличена почти вдвое (7+6).
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //14 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //15 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //16 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //17 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //18 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 6
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //20 цепь-A звено 7
	// звенья цепи B — diagonal(6): монотонный снос.
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 56, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //23 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 44, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //24 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //25 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //26 цепь-B звено 6

	// ===== Чадень: EMBER_POT — редкий, тяжёлый удар палицей и горшком по
	// центру =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //0 — сигнатура: та же центральная зона, что и тройной тычок [0,1,2], но одним заметно более быстрым ударом
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 }, //1 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //2 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, //3 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //4 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //5 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //6 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 56, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //7 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //8 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //9 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //10 — средняя нижняя атака
	// БАРРИКАДА (раздел 16): цельный ком горящей золы и углей — самая
	// крупная и стойкая баррикада уровня, финальная роль.
	{ boss: 'enem5', type: 'enem55', xPos: 44, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.595 }, //11b
	// звенья цепи A — vertical(6): раздел 13.8, пара vertical+diagonal
	// переиспользована из уровня 54 (@3+4), длина увеличена вдвое (6+7).
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //12 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //13 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //14 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //15 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //16 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //17 цепь-A звено 6
	// звенья цепи B — diagonal(7): монотонный снос через всё поле.
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //18 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //19 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //20 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //21 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //22 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //23 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //24 цепь-B звено 7
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 287, bossDelayAbDop: 5250, firstWaveDelayMs: 2400 }, // частый узкий трепет
	{ boss: 'enem2', bossDelayAb: 247, bossDelayAbDop: 4475, firstWaveDelayMs: 2148 }, // неотвратимый ровный напор
	{ boss: 'enem3', bossDelayAb: 226, bossDelayAbDop: 3750, firstWaveDelayMs: 1800 }, // частые угловые броски
	{ boss: 'enem4', bossDelayAb: 408, bossDelayAbDop: 6650, firstWaveDelayMs: 2400 }, // самый долгий отдых — долгий натяг тетивы
	{ boss: 'enem5', bossDelayAb: 283, bossDelayAbDop: 5650, firstWaveDelayMs: 2400 }, // собранный, редкий, тяжёлый финал
];

const bossAbilitiesDop = [
	// Лохмень — RAG_FLUTTER
	{ boss: 'enem1', indexAbilities: [6, 4, 5] }, // нежданчик: узкий зигзаг по центру
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] }, // сигнатурная: частый трепет с обеих сторон подряд
	{ boss: 'enem1', indexAbilities: [16] }, // одиночная приманка
	{ boss: 'enem1', indexAbilities: [12] }, // одиночная приманка
	{ boss: 'enem1', indexAbilities: [13, 15] }, // средняя серия — разброс ~218мс
	{ boss: 'enem1', indexAbilities: [17, 14] }, // смешанная серия — разброс ~522мс
	{ boss: 'enem1', indexAbilities: [8, 7] }, // средняя серия — разброс ~263мс
	{ boss: 'enem1', indexAbilities: [11, 9] }, // приманка + быстрый довесок — разброс ~673мс
	{ boss: 'enem1', indexAbilities: [16, 10] }, // приманка + быстрый довесок — разброс ~476мс
	{ boss: 'enem1', indexAbilities: [13, 10, 15] }, // смешанная серия — разброс ~550мс
	{ boss: 'enem1', indexAbilities: [14, 17, 7, 8] }, // смешанная серия — разброс ~979мс
	{ boss: 'enem1', indexAbilities: [18], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29, 30, 31], isChain: true }, // ← цепь-B (6, раздел 13.8)

	// Щитень — SHIELD_PRESS
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] }, // сигнатурная: полная стена и в довесок медленный центр
	{ boss: 'enem2', indexAbilities: [6, 7] }, // нежданчик: фланговый коготь ВМЕСТО продолжения стены
	{ boss: 'enem2', indexAbilities: [10] }, // одиночная приманка
	{ boss: 'enem2', indexAbilities: [13, 14] }, // смешанная серия — разброс ~317мс
	{ boss: 'enem2', indexAbilities: [8, 9] }, // быстрая серия — разброс ~133мс
	{ boss: 'enem2', indexAbilities: [17, 18] }, // смешанная серия — разброс ~238мс
	{ boss: 'enem2', indexAbilities: [15, 12] }, // смешанная серия — разброс ~364мс
	{ boss: 'enem2', indexAbilities: [11, 16] }, // приманка + быстрый довесок — разброс ~899мс
	{ boss: 'enem2', indexAbilities: [19], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29, 30, 31, 32], isChain: true }, // ← цепь-B (7, раздел 13.8)

	// Шипень — SPIKE_ROLL
	{ boss: 'enem3', indexAbilities: [0, 1] }, // урезано по разделу 9.1 из более длинной сигнатурной серии (исходная растягивала прилёты на секунды)
	{ boss: 'enem3', indexAbilities: [2] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [4] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [11] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [3, 6, 5] }, // приманка + быстрый довесок — разброс ~1593мс
	{ boss: 'enem3', indexAbilities: [9, 12] }, // приманка + быстрый довесок — разброс ~279мс
	{ boss: 'enem3', indexAbilities: [8, 10] }, // приманка + быстрый довесок — разброс ~293мс
	{ boss: 'enem3', indexAbilities: [7, 9] }, // приманка + быстрый довесок — разброс ~637мс
	{ boss: 'enem3', indexAbilities: [10, 5] }, // смешанная серия — разброс ~289мс
	{ boss: 'enem3', indexAbilities: [5, 8] }, // приманка + быстрый довесок — разброс ~1261мс
	{ boss: 'enem3', indexAbilities: [3, 10] }, // приманка + быстрый довесок — разброс ~1136мс
	{ boss: 'enem3', indexAbilities: [10, 6] }, // смешанная серия — разброс ~231мс
	{ boss: 'enem3', indexAbilities: [13], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], isChain: true }, // ← цепь-B (7, раздел 13.8)

	// Тетивень — EDGE_LOOSE
	{ boss: 'enem4', indexAbilities: [0, 1] }, // нежданчик: медленный центр после долгого натяга
	{ boss: 'enem4', indexAbilities: [2, 3] }, // сигнатурная: обманный перенос прицела на противоположный край
	{ boss: 'enem4', indexAbilities: [7] }, // одиночная приманка
	{ boss: 'enem4', indexAbilities: [4] }, // одиночная приманка
	{ boss: 'enem4', indexAbilities: [9, 5] }, // смешанная серия — разброс ~771мс
	{ boss: 'enem4', indexAbilities: [11, 10, 6] }, // быстрая серия — разброс ~908мс
	{ boss: 'enem4', indexAbilities: [12, 10, 8] }, // смешанная серия — разброс ~883мс
	{ boss: 'enem4', indexAbilities: [13], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (7, раздел 13.8)
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (6, раздел 13.8)

	// Чадень — EMBER_POT, финальный облик
	{ boss: 'enem5', indexAbilities: [0] }, // одиночная приманка
	{ boss: 'enem5', indexAbilities: [2] }, // одиночная приманка
	{ boss: 'enem5', indexAbilities: [5] }, // одиночная приманка
	{ boss: 'enem5', indexAbilities: [9, 1, 6] }, // приманка + быстрый довесок — разброс ~924мс
	{ boss: 'enem5', indexAbilities: [3, 10] }, // приманка + быстрый довесок — разброс ~390мс
	{ boss: 'enem5', indexAbilities: [8, 7] }, // быстрая серия — разброс ~444мс
	{ boss: 'enem5', indexAbilities: [4, 9] }, // приманка + быстрый довесок — разброс ~1421мс
	{ boss: 'enem5', indexAbilities: [3, 1, 10] }, // приманка + быстрый довесок — разброс ~985мс
	{ boss: 'enem5', indexAbilities: [11], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17], isChain: true }, // ← цепь-A (6, раздел 13.8)
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (7, раздел 13.8)
];

// Лорные названия связок временных улучшений — пять оберегов одного
// дозорного вала, словарь каждого строго завязан на его реальный облик и
// материал (правило 12.1): лохмотья и лента, щит и гвоздь, шип и кол,
// тетива и оперение, чад и зола. Полных совпадений фраз между монстрами
// нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
	// Лохмень — рваный оберег: лента, мешковина, капюшон, копьё.
	enem1: {
		variant1: 'Лохмотный кураж', variant2: 'Ленточная хватка', variant3: 'Копьё-таран',
		variant4: 'Трепетный напор', variant5: 'Меткий трепет', variant6: 'Бешеный трепет',
		variant7: 'Лохмотный норов', variant8: 'Крепкий капюшон', variant9: 'Ударный трепет',
		variant10: 'Живучая лента', variant11: 'Колючая мешковина', variant12: 'Трепет и в темноту',
		variant13: 'Плотная мешковина', variant14: 'Неутомимый трепет', variant15: 'Пружинистый трепет',
		variant16: 'Резной лик, зоркий глаз', variant17: 'Лохмотная удача', variant18: 'Верный трепет',
		variant19: 'Молниеносный трепет', variant20: 'Лохмотный нюх', variant21: 'Цепкая лента',
		variant22: 'Юркий, несмотря на балахон', variant23: 'Лохмотная стойкость', variant24: 'Долгий трепет, зоркий глаз',
		variant25: 'Ускользающий трепет', variant26: 'Дикий трепет', variant27: 'Стойкая мешковина',
		variant28: 'Трепет наповал', variant29: 'Крепкий лохмень', variant30: 'Ленточная мощь',
		variant31: 'Трепет с оглядкой', variant32: 'Живучий капюшон', variant33: 'Юркий и лохмотный',
		variant34: 'Ленточная прыть', variant35: 'Быстрый трепет, плотная мешковина'
	},
	// Щитень — живой щит: доска, гвоздь, коготь, смола.
	enem2: {
		variant1: 'Дощатый кураж', variant2: 'Гвоздевая хватка', variant3: 'Коготь-таран',
		variant4: 'Щитовой напор', variant5: 'Меткий напор', variant6: 'Бешеный напор',
		variant7: 'Дощатый норов', variant8: 'Крепкая доска', variant9: 'Ударный напор',
		variant10: 'Живучий коготь', variant11: 'Колючий гвоздь', variant12: 'Напор и в темноту',
		variant13: 'Толстая доска', variant14: 'Неутомимый напор', variant15: 'Пружинистый напор',
		variant16: 'Смоляная щель, зоркий глаз', variant17: 'Дощатая удача', variant18: 'Верный напор',
		variant19: 'Молниеносный напор', variant20: 'Дощатый нюх', variant21: 'Цепкий гвоздь',
		variant22: 'Юркий, несмотря на доску', variant23: 'Дощатая стойкость', variant24: 'Тяжёлый напор, зоркий глаз',
		variant25: 'Ускользающий напор', variant26: 'Дикий напор', variant27: 'Стойкая доска',
		variant28: 'Напор наповал', variant29: 'Крепкий щитень', variant30: 'Дощатая мощь',
		variant31: 'Напор с оглядкой', variant32: 'Живучая доска', variant33: 'Юркий и дощатый',
		variant34: 'Дощатая прыть', variant35: 'Быстрый напор, крепкая доска'
	},
	// Шипень — кольевой ёж: шип, кол, щепка, оскал.
	enem3: {
		variant1: 'Шипастый кураж', variant2: 'Кольевая хватка', variant3: 'Шип-таран',
		variant4: 'Катковый напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
		variant7: 'Шипастый норов', variant8: 'Крепкий кол', variant9: 'Ударный бросок',
		variant10: 'Живучий шип', variant11: 'Колючая щепка', variant12: 'Бросок и в темноту',
		variant13: 'Толстый кол', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
		variant16: 'Оскаленный лик, зоркий глаз', variant17: 'Шипастая удача', variant18: 'Верный бросок',
		variant19: 'Молниеносный бросок', variant20: 'Шипастый нюх', variant21: 'Цепкий кол',
		variant22: 'Юркий, несмотря на шипы', variant23: 'Шипастая стойкость', variant24: 'Долгий разгон, зоркий глаз',
		variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкий кол',
		variant28: 'Бросок наповал', variant29: 'Крепкий шипень', variant30: 'Катковая мощь',
		variant31: 'Бросок с оглядкой', variant32: 'Живучая щепка', variant33: 'Юркий и шипастый',
		variant34: 'Катковая прыть', variant35: 'Быстрый бросок, крепкий кол'
	},
	// Тетивень — дозорный лучник: тетива, стрела, колчан, оперение.
	enem4: {
		variant1: 'Тетивный кураж', variant2: 'Тетивная хватка', variant3: 'Стрела-таран',
		variant4: 'Прицельный напор', variant5: 'Меткий выстрел', variant6: 'Бешеный выстрел',
		variant7: 'Тетивный норов', variant8: 'Крепкий колчан', variant9: 'Ударный выстрел',
		variant10: 'Живучее оперение', variant11: 'Колючее оперение', variant12: 'Выстрел и в темноту',
		variant13: 'Толстый колчан', variant14: 'Неутомимый выстрел', variant15: 'Пружинистый выстрел',
		variant16: 'Плетёный колпак, зоркий глаз', variant17: 'Тетивная удача', variant18: 'Верный выстрел',
		variant19: 'Молниеносный выстрел', variant20: 'Тетивный нюх', variant21: 'Цепкое оперение',
		variant22: 'Юркий, несмотря на доспех', variant23: 'Тетивная стойкость', variant24: 'Долгий натяг, зоркий глаз',
		variant25: 'Ускользающий выстрел', variant26: 'Дикий выстрел', variant27: 'Стойкий колчан',
		variant28: 'Выстрел наповал', variant29: 'Крепкий тетивень', variant30: 'Прицельная мощь',
		variant31: 'Выстрел с оглядкой', variant32: 'Живучий колчан', variant33: 'Юркий и тетивный',
		variant34: 'Прицельная прыть', variant35: 'Быстрый выстрел, крепкий колчан'
	},
	// Чадень — последний защитник: чад, зола, палица, горшок.
	enem5: {
		variant1: 'Чадный кураж', variant2: 'Зольная хватка', variant3: 'Палица-таран',
		variant4: 'Горшковый напор', variant5: 'Меткий удар палицей', variant6: 'Бешеный удар палицей',
		variant7: 'Чадный норов', variant8: 'Крепкий горшок', variant9: 'Ударный замах',
		variant10: 'Живучая зола', variant11: 'Колючая зола', variant12: 'Удар палицей и в темноту',
		variant13: 'Толстый горшок', variant14: 'Неутомимый удар палицей', variant15: 'Пружинистый удар палицей',
		variant16: 'Резная броня, зоркий глаз', variant17: 'Чадная удача', variant18: 'Верный удар палицей',
		variant19: 'Молниеносный удар палицей', variant20: 'Чадный нюх', variant21: 'Цепкая зола',
		variant22: 'Юркий, несмотря на груз', variant23: 'Чадная стойкость', variant24: 'Тяжёлый замах, зоркий глаз',
		variant25: 'Ускользающий удар палицей', variant26: 'Дикий удар палицей', variant27: 'Стойкий горшок',
		variant28: 'Удар палицей наповал', variant29: 'Крепкий чадень', variant30: 'Горшковая мощь',
		variant31: 'Удар палицей с оглядкой', variant32: 'Живучий горшок', variant33: 'Юркий и чадный',
		variant34: 'Горшковая прыть', variant35: 'Быстрый удар палицей, крепкий горшок'
	}
};
