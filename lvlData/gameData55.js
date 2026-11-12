// Уровень 55 «Домашнее хозяйство» — пятнадцатый уровень области V, ОСОБЫЙ
// многофазный уровень (правило 13.6): один персонаж Домовой в пяти
// нарастающих обликах, не пять разных монстров.
//
// План согласован с пользователем 2026-09-12 перед записью файла (см. диалог
// сессии) — обоснование каждого решения ниже и есть тот план.
//
// ИССЛЕДОВАНИЕ ПЕРСОНАЖА (правило 12, AGENTS.md — ядро персонажа берётся из
// реальной традиции, не из шаблона роли): Домовой — славянский хозяин/страж
// дома, живёт за печью или у порога. В отличие от Кикиморы (тема пряжи и
// беспорядка), Домовой доброжелателен, ПОКА в доме порядок и уважение к
// нему — и становится мстительным именно от ОБИДЫ/неуважения, не от
// врождённого зла. Классические фольклорные черты: двигает вещи по ночам
// незримой рукой (порядок), за обиду мстит ТОЧЕЧНО (щипки, спрятанные
// вещи — не сразу буйство), в высшей ярости превращается в буквального
// полтергейста (посуда летает, двери хлопают сами). Игра-документ
// подтверждает эту привязку к дому/очагу независимо — «Помрачённый Домовой
// (несёт горящий домашний очаг)» упомянут как более поздний искажённый
// эхо-босс, то есть тема уже заложена в каноне проекта, не выдумана заново.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl55/) — все 5 фаз открыты и
// сверены лично, сквозная деталь всех пяти — ВЕНИК (сперва инструмент,
// затем оружие) и связка ДОМАШНИХ КЛЮЧЕЙ на поясе:
// 1.webp — спокойная стойка, веник в одной руке как обычный инструмент,
//   полная связка ключей — ещё настоящий хозяин, наводящий порядок.
// 2.webp — свежий шрам на лице, светящийся синий камень в когтях — первая
//   нанесённая ему обида.
// 3.webp — веник перехвачен ОБЕИМИ руками поперёк, как боевой шест —
//   инструмент порядка стал оружием.
// 4.webp — шерсть взрывается дыбом во все стороны, веник занесён над
//   головой как палица.
// 5.webp (финал) — дичайшая грива, веник снова в обеих руках, но из всей
//   связки остался только ОДИН ключ — хозяин перестал быть хозяином.
// 11-55.webp — круглые медальоны-портреты каждой фазы (та же конвенция,
//   что у Банника и Кикиморы, не обычные атакующие спрайты — сверено).
//
// ЭПИТЕТЫ (раздел 12: фаза 1 голая, 2-5 разные ПОНЯТИЯ, не лестница
// интенсивности; финал не должен повторять прошлые финалы):
// Домовой (голая) → Оскорблённый (фольклорный триггер гнева — именно ОБИДА,
// не безумие; шрам Ф2 — прямое отражение нанесённой обиды) → Всеоружный
// («во всеоружии» — инструмент стал оружием, поза Ф3) → Взъерошенный
// (шерсть буквально дыбом, Ф4 — физическое состояние, отдельное понятие от
// обиды и оружия) → Одичавший (потерял почти все ключи, перестал быть
// хозяином, стал диким зверем; сверено с прошлыми финалами —
// Обезумевшая(15)/Истинная(25)/Гневный(30)/Щучья Ведьма(39)/Разъярённый(40)/
// Испарившийся(45)/Кудельная(50) — концепция «одичание/потеря
// цивилизованности» ни разу не занята, в отличие от безумия/истины/гнева/
// ярости/испарения/материала).
//
// ГЛАВНАЯ ИДЕЯ БОЯ: обязательная механика «Атакующая цепь» здесь — это
// взмах его веника, широкая дуга подметания. Как у Кикиморы цепь была её
// пряжей, здесь цепь — сам жест «подметания», растущий в длину и ярость
// вместе с потерей контроля. Длина цепей растёт вместе с эскалацией
// эпитетов (3+3→3+4→4+5→4+6→5+7, как у Банника и Кикиморы).
//
// АРХЕТИПЫ ПО ФАЗАМ (обоснование через характер, не шаблон роли; сверено с
// admin-boss-pattern-panel.html, 270 строк, уровни 1-54, ШАГ 1 правила 1.2 —
// распределение уже сбалансировано 18-21% по каждой форме/стилю, любой
// осмысленный выбор безопасен статистически):
// Ф1 Домовой (роль «знакомство») — UNSEEN_TIDY: спокойные ритмичные атаки
//   ровным «подметающим» проходом слева направо, предсказуемо, как незримая
//   рука наводит порядок по ночам. movementStyle: pause — рука замирает
//   между взмахами (17% для enem1, не создаёт перекоса). Цепь: diagonal+arc
//   (у enem1 обе были 21%/21% — среднее, не усугубляют ничего).
// Ф2 Оскорблённый (роль «быстрые серии») — SPITEFUL_PINCH: точные короткие
//   ОДИНОЧНЫЕ мстительные «щипки» туда, где только что был игрок — прямая
//   отсылка к фольклорной точечной мести за неуважение, а не хаос.
//   movementStyle: accelerate — щипок ускоряется в последний миг (17%).
//   Цепь: vertical+irregular (у enem2 vertical 21%, irregular 21% —
//   среднее).
// Ф3 Всеоружный (роль «тяжёлые редкие») — STAFF_SWEEP: редкий тяжёлый
//   широкий горизонтальный взмах шестом-веником с явной стойкой готовности
//   перед ударом. movementStyle: pause — стойка готовности перед взмахом
//   (17%). Цепь: zigzag+diagonal (у enem3 обе были 21% — среднее).
// Ф4 Взъерошенный (роль «нервный») — POLTERGEIST_FRENZY: нервные
//   непредсказуемые атаки сразу с нескольких направлений, как летающая по
//   дому посуда — буквальный полтергейст из фольклора, шаг вверх по хаосу
//   от точечной мести Ф2. movementStyle: weave — мечущийся беспорядочный
//   полёт предметов (13%, не создаёт перекоса). Цепь: irregular+zigzag (у
//   enem4 irregular 21%, zigzag 21% — среднее).
// Ф5 Одичавший (финал) — FULL_SWEEP: редкий, максимально широкий взмах
//   через ВСЁ поле разом — та же «подметающая» природа, что и в Ф1, но
//   доведённая до огромного разрушительного масштаба — кольцевая
//   композиция всего боя (спокойный порядок → тотальное безумие того же
//   жеста). movementStyle: straight — прямой неотвратимый финальный взмах
//   (17%). Цепь: arc+irregular (у enem5 arc 18%, irregular 18% — низкие,
//   не создают перекоса).
//
// МНОГОФАЗНЫЕ БОССЫ ОБЛАСТИ (13.1) — healthMultiplier 1.50 на КАЖДОМ из
// пяти обликов, musicMood: 'heroic' — единственно допустимое.
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — да, пишутся: персонаж-в-
// обликах, единственный тип, для которого эти поля предусмотрены.
let lvlNumber = 55;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.741, damageMultiplier: 1.782, minWaveDelay: 4800, minShotDelay: 103, minTelegraphMs: 547,
	phases: [
		{ phase: 1, minHp: 0.693, cadence: 0.967, speed: 1.043, damage: 1, telegraphMultiplier: 1.037, surpriseChance: 0.113, maxActiveAttacks: 32 },
		{ phase: 2, minHp: 0.343, cadence: 0.772, speed: 1.177, damage: 1.07, telegraphMultiplier: 0.865, surpriseChance: 0.213, maxActiveAttacks: 36 },
		{ phase: 3, minHp: 0, cadence: 0.626, speed: 1.289, damage: 1.14, telegraphMultiplier: 0.765, surpriseChance: 0.313, maxActiveAttacks: 40 }
	],
	bosses: {
		enem1: { combatIdentity: "Закончить подметающий взмах и оставшийся домашний угол", combatTrick: "Размеренное подметание оставляет прежний угол незавершённым. Ошибка — бить хозяина после первого очищенного участка, пока остаются край и последний подхват.", signatureEvery: 3, movementStyle: 'pause', cadence: 1.036, telegraphMs: 952, speedMultiplier: 1.033, damageMultiplier: 0.92, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Кто топчет мой порог без спросу?!", phaseMessages: {"2":"Непорядок в доме — берегись!","3":"Хозяин здесь я, а не ты!"} },
		enem2: { combatIdentity: "Ответный щипок перебивает привычный обход", combatTrick: "Короткий ответ перебивает знакомый взмах и заставляет вернуться к оставленному краю. Ошибка — повторять спокойный обход, не закончив щипок. Точки заданы заранее, слежения за курсором нет.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 1.006, telegraphMs: 862, speedMultiplier: 1.066, damageMultiplier: 0.98, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Оскорбил хозяина — поплатишься!", phaseMessages: {"2":"Обида жжёт крепче углей!","3":"Последнее унижение — твоё!"} },
		enem3: { combatIdentity: "Двуручная поперечная стяжка удерживает оба края", combatTrick: "Веник в двух руках задерживает поперечную стяжку, пока края уже меняют приоритет. Ошибка — бить в заминке до завершения обеих сторон тяжёлого захвата.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.821, telegraphMs: 1062, speedMultiplier: 1.023, damageMultiplier: 1.19, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Веник в моих руках — оружие хозяина!", phaseMessages: {"2":"Дом обороняю до последнего!","3":"Никто не пройдёт мимо метлы!"} },
		enem4: { combatIdentity: "Несколько сгущений домашнего беспорядка в одном взмахе", combatTrick: "Домашний беспорядок собирается в несколько групп, но это один незаконченный взмах. Ошибка — уйти после первой группы или метаться на каждый отдельный бросок, оставив обратный конец.", signatureEvery: 3, movementStyle: 'weave', cadence: 0.96, telegraphMs: 822, speedMultiplier: 1.085, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Шерсть дыбом — не совладать с гневом!", phaseMessages: {"2":"Дом ходит ходуном от моей ярости!","3":"Последний бросок — во всех сразу!"} },
		enem5: { combatIdentity: "Полный силовой вымет с самостоятельным последним захватом", combatTrick: "Хозяин обращает весь подметающий жест в силовой вымет и оставляет отдельный заключительный захват. Ошибка — бить после первой половины большого взмаха, не закончив домашний край. Домовой остаётся хозяином дома, не превращается в обычного зверя.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.944, telegraphMs: 992, speedMultiplier: 1.111, damageMultiplier: 1.12, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Я больше не хозяин — я буря!", phaseMessages: {"2":"Все ключи потеряны, осталась только злоба!","3":"Последний взмах — весь дом в щепки!"} }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl55/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl55/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl55/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl55/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl55/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Домовой',
        image: 'images/enemies/regions/5_dom_dvor/lvl55/1.webp',
        baseHP: 20792,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Оскорблённый Домовой',
        image: 'images/enemies/regions/5_dom_dvor/lvl55/2.webp',
        baseHP: 51979,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Всеоружный Домовой',
        image: 'images/enemies/regions/5_dom_dvor/lvl55/3.webp',
        baseHP: 91973,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1100 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Взъерошенный Домовой',
        image: 'images/enemies/regions/5_dom_dvor/lvl55/4.webp',
        baseHP: 147977,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1100 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Одичавший Домовой',
        image: 'images/enemies/regions/5_dom_dvor/lvl55/5.webp',
        baseHP: 223990,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1300 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 18;
 const bossInterval = 21;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Домовой =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.83 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.97 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.97 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.47 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.47 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.83 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.97 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.97 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.47 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.47 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.83 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.97 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.97 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.47 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.47 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.83 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.97 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.97 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.47 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.47 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.83 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.97 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.97 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.47 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.47 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.89 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.64 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.39 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.83 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.97 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.97 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.47 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.47 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.07 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.83 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.97 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.97 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.47 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.47 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.07 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.99 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.74 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.49 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.24 }, // 50 i

	// ===== Оскорблённый Домовой =====
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.19 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.79 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.59 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.19 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.79 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.59 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.85 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.19 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.79 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.59 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.85 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.19 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.79 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.59 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.85 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.19 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.79 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.59 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.83 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.58 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.33 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.08 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.85 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.19 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.79 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.59 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.09 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.85 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.19 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.79 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.59 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.09 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.79 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.54 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.29 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.04 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.79 }, // 50 i

	// ===== Всеоружный Домовой =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.87 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.05 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.05 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.55 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.55 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.45 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.87 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.85 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.05 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.55 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.55 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.87 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.05 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.05 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.55 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.85 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.87 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.05 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.05 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.55 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.85 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.31 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.87 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.05 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.05 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.55 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.55 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.77 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.52 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.27 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.02 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.77 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.87 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.05 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.05 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.55 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.55 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.65 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.09 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.87 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.05 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.05 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.05 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.55 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.55 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.85 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.85 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.87 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.62 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.37 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.12 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.87 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.62 }, // 60 i

	// ===== Взъерошенный Домовой =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.89 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.95 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.95 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.45 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.45 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 6 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.89 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.95 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.95 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.45 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.45 }, // 12 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 13 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.89 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.95 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.95 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.45 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.45 }, // 19 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 20 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.89 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.95 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.95 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.45 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.45 }, // 26 d
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 27 d
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.89 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.95 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.95 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.45 }, // 32 e
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.45 }, // 33 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 34 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.55 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.3 }, // 36 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.05 }, // 37 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.8 }, // 38 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.55 }, // 39 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.3 }, // 40 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.89 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.95 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.95 }, // 44 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.45 }, // 45 g
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.45 }, // 46 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 47 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.85 }, // 48 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.29 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.95 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.95 }, // 52 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.45 }, // 53 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.45 }, // 54 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.95 }, // 55 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.85 }, // 56 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.65 }, // 57 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.4 }, // 58 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.15 }, // 59 i
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.9 }, // 60 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.65 }, // 61 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.4 }, // 62 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.15 }, // 63 i

	// ===== Одичавший Домовой =====
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.91 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.69 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.29 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.29 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.79 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.89 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.91 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.69 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.29 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.29 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.79 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.91 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.69 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.29 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.29 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.29 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.91 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.69 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.29 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.29 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.59 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.91 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.69 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.29 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.29 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.79 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.19 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.31 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.06 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.81 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.56 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.31 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.06 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.81 }, // 46 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.91 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.29 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.29 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.29 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.79 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 54 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 55 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.91 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.89 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.29 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.29 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.39 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 63 h
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 64 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.37 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.12 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.87 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.62 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.37 }, // 69 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.12 }, // 70 i
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.87 }, // 71 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 183, bossDelayAbDop: 13000, firstWaveDelayMs: 2690 }, // Закончить подметающий взмах и оставшийся домашний угол
	{ boss: 'enem2', bossDelayAb: 184, bossDelayAbDop: 11301, firstWaveDelayMs: 2690 }, // Ответный щипок перебивает привычный обход
	{ boss: 'enem3', bossDelayAb: 182, bossDelayAbDop: 17050, firstWaveDelayMs: 2690 }, // Двуручная поперечная стяжка удерживает оба края
	{ boss: 'enem4', bossDelayAb: 189, bossDelayAbDop: 12800, firstWaveDelayMs: 2690 }, // Несколько сгущений домашнего беспорядка в одном взмахе
	{ boss: 'enem5', bossDelayAb: 178, bossDelayAbDop: 16250, firstWaveDelayMs: 2690 }, // Полный силовой вымет с самостоятельным последним захватом
];

 const bossAbilitiesDop = [
	// Домовой
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 500, 0, 250, 0], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [250, 250, 0, 250, 0] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [500, 250, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [250, 0, 0, 0, 250] },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [500, 250, 0, 250, 250] },
	{ boss: 'enem1', indexAbilities: [30, 31, 32], signature: true, isChain: true, shotDelayMs: 419, shotGapsMs: [0, 0], openingOrder: 1, label: "Взмах к оставшемуся углу" },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [500, 0, 0, 500, 0, 0] },
	{ boss: 'enem1', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [250, 0, 0, 250, 0, 250] },
	{ boss: 'enem1', indexAbilities: [47, 48, 49, 50], signature: true, isChain: true, minPhase: 3, shotDelayMs: 367, shotGapsMs: [0, 0, 0], label: "Правый край домашнего взмаха" },

	// Оскорблённый Домовой
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 250, 250, 250], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 250, 250, 250] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [0, 250, 250, 500, 500] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [500, 500, 500, 250, 250] },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 250, 500, 500] },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 357, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Короткий ответ обиженного хозяина" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [0, 0, 0, 250, 500, 500] },
	{ boss: 'enem2', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [0, 250, 250, 250, 250, 500] },
	{ boss: 'enem2', indexAbilities: [46, 47, 48, 49, 50], signature: true, isChain: true, minPhase: 3, shotDelayMs: 409, shotGapsMs: [0, 0, 0, 0], label: "Щипок после обратного взмаха" },

	// Всеоружный Домовой
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [250, 0, 250, 0, 0, 250], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12], shotGapsMs: [500, 0, 0, 500, 0] },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17, 18, 19], shotGapsMs: [500, 250, 500, 0, 0, 250] },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24, 25, 26], shotGapsMs: [0, 0, 250, 500, 500, 250] },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31, 32, 33], shotGapsMs: [0, 250, 0, 0, 250, 250] },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37, 38], signature: true, isChain: true, shotDelayMs: 399, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Двуручная стяжка веника" },
	{ boss: 'enem3', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 46], minPhase: 2, shotGapsMs: [250, 250, 250, 0, 250, 250, 500] },
	{ boss: 'enem3', indexAbilities: [47, 48, 49, 50, 51, 52, 53, 54], minPhase: 3, shotGapsMs: [500, 250, 0, 0, 0, 0, 250] },
	{ boss: 'enem3', indexAbilities: [55, 56, 57, 58, 59, 60], signature: true, isChain: true, minPhase: 3, shotDelayMs: 379, shotGapsMs: [0, 0, 0, 0, 0], label: "Внешний конец поперечного захвата" },

	// Взъерошенный Домовой
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [500, 0, 250, 0, 250, 500], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [0, 0, 0, 250, 500, 500] },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [250, 0, 250, 500, 500, 250] },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [500, 0, 500, 500, 0, 250] },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 250, 250, 250, 250, 250] },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, isChain: true, shotDelayMs: 365, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Три сгущения одного взмаха" },
	{ boss: 'enem4', indexAbilities: [41, 42, 43, 44, 45, 46, 47, 48], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 250, 500, 250] },
	{ boss: 'enem4', indexAbilities: [49, 50, 51, 52, 53, 54, 55, 56], minPhase: 3, shotGapsMs: [0, 0, 250, 250, 250, 500, 250] },
	{ boss: 'enem4', indexAbilities: [57, 58, 59, 60, 61, 62, 63], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Беспорядок не закончен на правой паре" },

	// Одичавший Домовой
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [250, 250, 0, 500, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [0, 0, 0, 250, 250, 500, 500] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21, 22, 23], shotGapsMs: [0, 500, 250, 0, 500, 500, 0] },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29, 30, 31], shotGapsMs: [500, 0, 0, 0, 0, 500, 0] },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39], shotGapsMs: [0, 250, 0, 500, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [40, 41, 42, 43, 44, 45, 46], signature: true, isChain: true, shotDelayMs: 377, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Полный силовой вымет дома" },
	{ boss: 'enem5', indexAbilities: [47, 48, 49, 50, 51, 52, 53, 54, 55], minPhase: 2, shotGapsMs: [250, 500, 500, 0, 0, 500, 250, 0] },
	{ boss: 'enem5', indexAbilities: [56, 57, 58, 59, 60, 61, 62, 63, 64], minPhase: 3, shotGapsMs: [250, 500, 0, 250, 250, 500, 250, 250] },
	{ boss: 'enem5', indexAbilities: [65, 66, 67, 68, 69, 70, 71], signature: true, isChain: true, minPhase: 3, shotDelayMs: 421, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Последний домашний край" },

];

// Лорные названия связок временных улучшений — один и тот же персонаж, но
// словарь ЭСКАЛИРУЕТ вместе с обликом (порядок/веник → обида → оружие →
// ярость шерсти → одичание), см. правило 12.1. Один и тот же адъектив на
// одной позиции у нескольких обликов допустим (как в gameData1.js) —
// полных совпадений фраз между обликами нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Домовой — базовый облик: веник, ключи, порог, печь, порядок.
    enem1: {
        variant1: 'Хозяйский кураж', variant2: 'Ключевая хватка', variant3: 'Веник-таран',
        variant4: 'Домовой напор', variant5: 'Меткий взмах', variant6: 'Бешеный взмах',
        variant7: 'Домовитый норов', variant8: 'Крепкий порог', variant9: 'Ударный взмах',
        variant10: 'Живучая связка', variant11: 'Колючий прут', variant12: 'Взмах и в темноту',
        variant13: 'Толстая шуба', variant14: 'Неутомимый взмах', variant15: 'Пружинистый взмах',
        variant16: 'Острый коготь, зоркий глаз', variant17: 'Печная удача', variant18: 'Верный взмах',
        variant19: 'Молниеносный взмах', variant20: 'Печной нюх', variant21: 'Цепкий ключ',
        variant22: 'Юркий для своего роста', variant23: 'Хозяйская стойкость', variant24: 'Долгий обход, зоркий глаз',
        variant25: 'Ускользающий взмах', variant26: 'Дикий взмах', variant27: 'Стойкая шуба',
        variant28: 'Взмах наповал', variant29: 'Крепкий домовой', variant30: 'Печная мощь',
        variant31: 'Взмах с оглядкой', variant32: 'Живучая шуба', variant33: 'Юркий и хозяйский',
        variant34: 'Домовитая прыть', variant35: 'Быстрый взмах, крепкий веник'
    },
    // Оскорблённый — обида: шрам, камень, месть, щипок, уголёк.
    enem2: {
        variant1: 'Обидный кураж', variant2: 'Каменная хватка', variant3: 'Щипок-таран',
        variant4: 'Мстительный напор', variant5: 'Меткий щипок', variant6: 'Бешеный щипок',
        variant7: 'Оскорблённый норов', variant8: 'Крепкий шрам', variant9: 'Ударный щипок',
        variant10: 'Живучая обида', variant11: 'Колючий уголёк', variant12: 'Щипок и в темноту',
        variant13: 'Толстый рубец', variant14: 'Неутомимый щипок', variant15: 'Пружинистый щипок',
        variant16: 'Острый уголёк, зоркий глаз', variant17: 'Обидная удача', variant18: 'Верный щипок',
        variant19: 'Молниеносный щипок', variant20: 'Обидный нюх', variant21: 'Цепкий камень',
        variant22: 'Юркий, несмотря на рану', variant23: 'Обидная стойкость', variant24: 'Долгая месть, зоркий глаз',
        variant25: 'Ускользающий щипок', variant26: 'Дикий щипок', variant27: 'Стойкий рубец',
        variant28: 'Щипок наповал', variant29: 'Крепкий оскорблённый', variant30: 'Мстительная мощь',
        variant31: 'Щипок с оглядкой', variant32: 'Живучий рубец', variant33: 'Юркий и обидчивый',
        variant34: 'Мстительная прыть', variant35: 'Быстрый щипок, острый камень'
    },
    // Всеоружный — веник-оружие: шест, хват, оборона, замах, узел.
    enem3: {
        variant1: 'Шестовой кураж', variant2: 'Двуручная хватка', variant3: 'Шест-таран',
        variant4: 'Оборонный напор', variant5: 'Меткий замах', variant6: 'Бешеный замах',
        variant7: 'Всеоружный норов', variant8: 'Крепкий узел', variant9: 'Ударный шест',
        variant10: 'Живучий хват', variant11: 'Колючий шест', variant12: 'Замах и в темноту',
        variant13: 'Толстый шест', variant14: 'Неутомимый замах', variant15: 'Пружинистый замах',
        variant16: 'Острый прут, зоркий глаз', variant17: 'Оборонная удача', variant18: 'Верный замах',
        variant19: 'Молниеносный замах', variant20: 'Оборонный нюх', variant21: 'Цепкий узел',
        variant22: 'Юркий, несмотря на шест', variant23: 'Оборонная стойкость', variant24: 'Долгая стойка, зоркий глаз',
        variant25: 'Ускользающий замах', variant26: 'Дикий замах', variant27: 'Стойкий узел',
        variant28: 'Замах наповал', variant29: 'Крепкий всеоружный', variant30: 'Оборонная мощь',
        variant31: 'Замах с оглядкой', variant32: 'Живучий шест', variant33: 'Юркий и всеоружный',
        variant34: 'Оборонная прыть', variant35: 'Быстрый замах, крепкий шест'
    },
    // Взъерошенный — дыбом шерсть: полтергейст, шерсть, хаос, посуда, дверь.
    enem4: {
        variant1: 'Взъерошенный кураж', variant2: 'Шерстяная хватка', variant3: 'Коготь-таран',
        variant4: 'Полтергейстный напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
        variant7: 'Взъерошенный норов', variant8: 'Крепкая шерсть', variant9: 'Ударный бросок',
        variant10: 'Живучий хаос', variant11: 'Колючая шерсть', variant12: 'Бросок и в темноту',
        variant13: 'Толстая шерсть', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
        variant16: 'Острый коготь, дикий взгляд', variant17: 'Хаосная удача', variant18: 'Верный бросок',
        variant19: 'Молниеносный бросок', variant20: 'Хаосный нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий, несмотря на ярость', variant23: 'Взъерошенная стойкость', variant24: 'Долгий полтергейст, дикий взгляд',
        variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкая шерсть',
        variant28: 'Бросок наповал', variant29: 'Крепкий взъерошенный', variant30: 'Полтергейстная мощь',
        variant31: 'Бросок с оглядкой', variant32: 'Живучая шерсть', variant33: 'Юркий и взъерошенный',
        variant34: 'Хаосная прыть', variant35: 'Быстрый бросок, дыбом шерсть'
    },
    // Одичавший — дикий зверь: последний ключ, грива, рык, дичь, воля.
    enem5: {
        variant1: 'Дикий кураж', variant2: 'Гривастая хватка', variant3: 'Клык-таран',
        variant4: 'Одичавший напор', variant5: 'Меткий рык', variant6: 'Бешеный рык',
        variant7: 'Одичавший норов', variant8: 'Крепкая грива', variant9: 'Ударный рык',
        variant10: 'Живучий клык', variant11: 'Колючая грива', variant12: 'Рык и в темноту',
        variant13: 'Толстая грива', variant14: 'Неутомимый рык', variant15: 'Пружинистый рык',
        variant16: 'Острый клык, дикий взор', variant17: 'Дикая удача', variant18: 'Верный рык',
        variant19: 'Молниеносный рык', variant20: 'Дикий нюх', variant21: 'Цепкий последний ключ',
        variant22: 'Юркий, несмотря на массу', variant23: 'Дикая стойкость', variant24: 'Долгий рык, дикий взор',
        variant25: 'Ускользающий рык', variant26: 'Дикий рык наотмашь', variant27: 'Стойкая грива',
        variant28: 'Рык наповал', variant29: 'Крепкий одичавший', variant30: 'Дикая мощь',
        variant31: 'Рык с оглядкой', variant32: 'Живучая грива', variant33: 'Юркий и дикий',
        variant34: 'Дикая прыть', variant35: 'Быстрый рык, последний ключ'
    }
};
