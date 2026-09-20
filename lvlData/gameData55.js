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
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 1.782,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	attackChains: true,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.76, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { combatIdentity: "Веник сметает к порогу", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4,
			// Домовой: UNSEEN_TIDY — спокойные ритмичные атаки ровным «подметающим» проходом
			movementStyle: 'pause', cadence: 1.03, telegraphMs: 900, speedMultiplier: 0.95, damageMultiplier: 0.92,
			speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Кто топчет мой порог без спросу?!',
			phaseMessages: { 2: 'Непорядок в доме — берегись!', 3: 'Хозяин здесь я, а не ты!' }
		}, // Домовой: UNSEEN_TIDY — спокойные ритмичные атаки ровным «подметающим» проходом
		enem2: { combatIdentity: "Щипок после обиды", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4,
			// Оскорблённый: SPITEFUL_PINCH — точные короткие одиночные мстительные «щипки»
			movementStyle: 'accelerate', cadence: 0.95, telegraphMs: 800, speedMultiplier: 1.02, damageMultiplier: 0.98,
			speedVariance: [0.88, 0.96, 1.04, 1.12, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Оскорбил хозяина — поплатишься!',
			phaseMessages: { 2: 'Обида жжёт крепче углей!', 3: 'Последнее унижение — твоё!' }
		}, // Оскорблённый: SPITEFUL_PINCH — точные короткие одиночные мстительные «щипки»
		enem3: { combatIdentity: "Шест перекрывает проход", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4,
			// Всеоружный: STAFF_SWEEP — редкий тяжёлый широкий взмах шестом-веником после стойки готовности
			movementStyle: 'pause', cadence: 1.17, telegraphMs: 1050, speedMultiplier: 0.80, damageMultiplier: 1.19,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12], healthMultiplier: 1.50,
			appearMessage: 'Веник в моих руках — оружие хозяина!',
			phaseMessages: { 2: 'Дом обороняю до последнего!', 3: 'Никто не пройдёт мимо метлы!' }
		}, // Всеоружный: STAFF_SWEEP — редкий тяжёлый широкий взмах шестом-веником после стойки готовности
		enem4: { combatIdentity: "Беспорядок возвращает вещи", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4,
			// Взъерошенный: POLTERGEIST_FRENZY — нервные непредсказуемые атаки сразу с нескольких направлений
			movementStyle: 'weave', cadence: 0.86, telegraphMs: 680, speedMultiplier: 1.12, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24], healthMultiplier: 1.50,
			appearMessage: 'Шерсть дыбом — не совладать с гневом!',
			phaseMessages: { 2: 'Дом ходит ходуном от моей ярости!', 3: 'Последний бросок — во всех сразу!' }
		}, // Взъерошенный: POLTERGEIST_FRENZY — нервные непредсказуемые атаки сразу с нескольких направлений
		enem5: { combatIdentity: "Последний взмах дома", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4,
			// Одичавший: FULL_SWEEP — редкий максимально широкий взмах через всё поле разом
			movementStyle: 'straight', cadence: 0.80, telegraphMs: 1040, speedMultiplier: 1.05, damageMultiplier: 1.12,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20], healthMultiplier: 1.50,
			appearMessage: 'Я больше не хозяин — я буря!',
			phaseMessages: { 2: 'Все ключи потеряны, осталась только злоба!', 3: 'Последний взмах — весь дом в щепки!' }
		} // Одичавший: FULL_SWEEP — редкий максимально широкий взмах через всё поле разом
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Домовой: UNSEEN_TIDY — спокойные ритмичные атаки ровным
	// «подметающим» проходом слева направо =====
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0  подмёл слева
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1  подмёл дальше
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2  подмёл центр
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3  подмёл дальше
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4  подмёл справа
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //13 — нежданчик: подметание вдруг идёт в обратную сторону
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — правка 2026-09-16: пространство пар форм для
	// enem1 доказанно исчерпано — та же пара "diagonal+arc", что и на уровне
	// 54, но с явно другой длиной (6 и 6 звеньев вместо 3 и 4) — Домовой
	// после ссоры метёт куда дольше и настойчивее. Раздел 13.8.
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, diagonal×6)
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 74, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //21 цепь-A звено 6
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //22 цепь-B звено 1 (голова, arc×6)
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //23 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //24 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //25 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //26 цепь-B звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //27 цепь-B звено 6

	// ===== Оскорблённый: SPITEFUL_PINCH — точные короткие одиночные
	// мстительные «щипки» туда, где только что был игрок =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: двойной щипок с одной стороны подряд
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 2 },  //15
	// звенья «атакующей цепи» — правка 2026-09-16: пространство пар форм для
	// enem2 доказанно исчерпано — та же пара "vertical+arc", что и на уровне
	// 49, но с явно другой длиной (6 и 5 звеньев вместо 4 и 3) — обиженный
	// щипок бьёт заметно дольше и настойчивее. Раздел 13.8.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, vertical×6)
	{ boss: 'enem2', type: 'enem22', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //21 цепь-A звено 6
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //22 цепь-B звено 1 (голова, arc×5)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //23 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //24 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //25 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //26 цепь-B звено 5

	// ===== Всеоружный: STAFF_SWEEP — редкий тяжёлый широкий взмах
	// шестом-веником, явная стойка готовности перед ударом =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: взмах раньше привычной долгой стойки готовности
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — шест мечется зигзагом перед ударом, затем
	// решительный взмах в сторону (zigzag+diagonal), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Взъерошенный: POLTERGEIST_FRENZY — нервные непредсказуемые
	// атаки сразу с нескольких направлений, как летающая по дому посуда =====
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: атаки разом с обеих сторон без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — предметы летят хаотично, затем зигзагом
	// разлетаются по всему полю (irregular+zigzag), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5

	// ===== Одичавший: FULL_SWEEP — редкий максимально широкий взмах через
	// всё поле разом, кульминация подметающего жеста Ф1 =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: взмах без единого мгновения стойки готовности
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — широкая дуга полного взмаха, затем
	// разлетающийся во все стороны хаос (arc+irregular), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова, длина 7)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //25 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //26 цепь-B звено 7

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 12,customHP: 1,customDamage: 20,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 36,yPos: 20,customHP: 1,customDamage: 20,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 64,yPos: 6,customHP: 1,customDamage: 20,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 40,customHP: 1,customDamage: 20,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 8,customHP: 1,customDamage: 20,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 86,yPos: 12,customHP: 1,customDamage: 20,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 82,yPos: 12,customHP: 1,customDamage: 22,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 74,yPos: 20,customHP: 1,customDamage: 22,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 14,yPos: 6,customHP: 1,customDamage: 22,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 82,yPos: 40,customHP: 1,customDamage: 22,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 82,yPos: 8,customHP: 1,customDamage: 22,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 28,yPos: 12,customHP: 1,customDamage: 22,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 22,yPos: 12,customHP: 1,customDamage: 24,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 50,yPos: 20,customHP: 1,customDamage: 24,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 80,yPos: 6,customHP: 1,customDamage: 24,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 22,yPos: 40,customHP: 1,customDamage: 24,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 22,yPos: 8,customHP: 1,customDamage: 24,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 50,yPos: 12,customHP: 1,customDamage: 24,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 16,yPos: 12,customHP: 1,customDamage: 26,customSpeed: 16},
    {boss: "enem4",type: "enem44",xPos: 30,yPos: 20,customHP: 1,customDamage: 26,customSpeed: 14},
    {boss: "enem4",type: "enem44",xPos: 76,yPos: 6,customHP: 1,customDamage: 26,customSpeed: 21},
    {boss: "enem4",type: "enem44",xPos: 16,yPos: 40,customHP: 1,customDamage: 26,customSpeed: 7},
    {boss: "enem4",type: "enem44",xPos: 16,yPos: 8,customHP: 1,customDamage: 26,customSpeed: 20},
    {boss: "enem4",type: "enem44",xPos: 88,yPos: 12,customHP: 1,customDamage: 26,customSpeed: 18},
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 12,customHP: 1,customDamage: 28,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 66,yPos: 20,customHP: 1,customDamage: 28,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 12,yPos: 6,customHP: 1,customDamage: 28,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 40,customHP: 1,customDamage: 28,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 8,customHP: 1,customDamage: 28,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 52,yPos: 12,customHP: 1,customDamage: 28,customSpeed: 18}
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5534, firstWaveDelayMs: 2400 }, // спокойное подметание
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 5474, firstWaveDelayMs: 2400 }, // короткая атака, долгая пауза — суть SPITEFUL_PINCH
	{ boss: 'enem3', bossDelayAb: 390, bossDelayAbDop: 5610, firstWaveDelayMs: 2400 }, // самый долгий отдых — стойка готовности
	{ boss: 'enem4', bossDelayAb: 200, bossDelayAbDop: 4370, firstWaveDelayMs: 2098 }, // самый частый — полтергейст без передышки
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 4938, firstWaveDelayMs: 2370 }, // собранный финал
 ];

 const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0,1,2,3,4]},
    {boss: "enem1",indexAbilities: [5,6],openingOrder: 0},
    {boss: "enem1",indexAbilities: [7,8]},
    {boss: "enem1",indexAbilities: [9,10]},
    {boss: "enem1",indexAbilities: [28,29,30],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Веник сметает к порогу — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [28,29,32],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Веник сметает к порогу — иной конец"},
    {boss: "enem1",indexAbilities: [33,30,29,32],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Веник сметает к порогу — завершение"},
    {boss: "enem1",indexAbilities: [16,17,18,19,20,21],isChain: true},
    {boss: "enem1",indexAbilities: [22,23,24,25,26,27],isChain: true},
    {boss: "enem2",indexAbilities: [0],openingOrder: 0},
    {boss: "enem2",indexAbilities: [1]},
    {boss: "enem2",indexAbilities: [2]},
    {boss: "enem2",indexAbilities: [3,4]},
    {boss: "enem2",indexAbilities: [8,9]},
    {boss: "enem2",indexAbilities: [27,31],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Щипок после обиды — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [27,31,29],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Щипок после обиды — иной конец"},
    {boss: "enem2",indexAbilities: [32,28,32,29],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Щипок после обиды — завершение"},
    {boss: "enem2",indexAbilities: [16,17,18,19,20,21],isChain: true},
    {boss: "enem2",indexAbilities: [22,23,24,25,26],isChain: true},
    {boss: "enem3",indexAbilities: [0,1,2]},
    {boss: "enem3",indexAbilities: [3,4],openingOrder: 0},
    {boss: "enem3",indexAbilities: [5,6]},
    {boss: "enem3",indexAbilities: [7,8]},
    {boss: "enem3",indexAbilities: [9,10]},
    {boss: "enem3",indexAbilities: [24,26,29],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Шест перекрывает проход — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [24,26,25],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Шест перекрывает проход — иной конец"},
    {boss: "enem3",indexAbilities: [28,26,29,25],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Шест перекрывает проход — завершение"},
    {boss: "enem3",indexAbilities: [16,17,18,19],isChain: true},
    {boss: "enem3",indexAbilities: [20,21,22,23],isChain: true},
    {boss: "enem4",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem4",indexAbilities: [2,3]},
    {boss: "enem4",indexAbilities: [4,5]},
    {boss: "enem4",indexAbilities: [8,9]},
    {boss: "enem4",indexAbilities: [6,7,11,12]},
    {boss: "enem4",indexAbilities: [25,29,26],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Беспорядок возвращает вещи — знакомство",openingOrder: 1},
    {boss: "enem4",indexAbilities: [25,29,27],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Беспорядок возвращает вещи — иной конец"},
    {boss: "enem4",indexAbilities: [30,27,30,26],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Беспорядок возвращает вещи — завершение"},
    {boss: "enem4",indexAbilities: [16,17,18,19],isChain: true},
    {boss: "enem4",indexAbilities: [20,21,22,23,24],isChain: true},
    {boss: "enem5",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem5",indexAbilities: [2,3]},
    {boss: "enem5",indexAbilities: [5,6]},
    {boss: "enem5",indexAbilities: [7,8]},
    {boss: "enem5",indexAbilities: [9,10]},
    {boss: "enem5",indexAbilities: [13,14]},
    {boss: "enem5",indexAbilities: [27,28,32],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Последний взмах дома — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [27,28,31],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Последний взмах дома — иной конец"},
    {boss: "enem5",indexAbilities: [29,32,28,31],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Последний взмах дома — завершение"},
    {boss: "enem5",indexAbilities: [16,17,18,19],isChain: true},
    {boss: "enem5",indexAbilities: [20,21,22,23,24,25,26],isChain: true}
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
