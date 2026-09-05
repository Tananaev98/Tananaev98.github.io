// Уровень 45 «Баня» — пятый уровень области V, ОСОБЫЙ: один персонаж (Банник,
// дух-хозяин бани) в ПЯТИ нарастающих обликах, а не пять разных боссов
// (раздел 13.1/12 lvlData/Правила создания уровня.txt, тот же тип, что Баба-
// Яга/Полудница/Царь Горох/Русалка/Водяной). Пользователь явно попросил
// повышенную старательность для этого уровня — ниже каждое решение проверено
// и обосновано отдельно, не по шаблону "ещё один многофазный".
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl45/) — все 5 картинок открыты и
// сверены лично, читается чёткая эскалация ЧЕРЕЗ ОДНУ ТЕМУ (пар/ожоги), не
// через рост злости (урок §1.1 — «зной→марево→угли→венец», не «злая→очень
// злая»):
// 1.webp — мохнатый дух, борода-пар, спокойно-угрожающая стойка (базовый
//   облик, без эпитета — совпадает с документом: "мохнатый дух с паром
//   вместо бороды");
// 2.webp — та же тварь, но на морде и плече уже есть свежий алый ожог/шрам —
//   первый физический след пара как оружия против него самого;
// 3.webp — ожогов больше, ОДНА (не обе) когтистая лапа стала грубой,
//   ороговевшей — деталь, которая напрямую определяет архетип фазы (см. ниже);
// 4.webp — ожоги разбросаны уже по всему телу, шерсть дыбом, поза симметрично
//   агрессивная обеими лапами разом — одичал от боли;
// 5.webp — тело почти полностью РАСТВОРИЛОСЬ в паре: голова и лапы плавают
//   отдельно внутри клубящегося облака — он сам стал паром.
//
// ЭПИТЕТЫ (раздел 12) — первый облик БЕЗ эпитета (canonical), 2-5 РАЗНЫЕ
// понятия эскалации ожога/пара (не лестница интенсивности одного слова),
// сверены со всеми прошлыми многофазными уровнями (15/25/30/39/40) —
// «Ошпаренный/Задубевший/Обугленный/Испарившийся» ни разу не встречаются:
// Баба-Яга: Злая/Очень злая/Взбешенная/Обезумевшая; Полудница: Маревая/
// Жаровая/Венценосная/Истинная; Царь Горох: Треснувший/Израненный/Пылающий/
// Гневный; Русалка: Скалящаяся/Бешеная/Проклятая/Щучья Ведьма; Водяной:
// Разбухший/Напорный/Ревущий/Разъярённый. ФИНАЛЬНЫЙ эпитет "Испарившийся" —
// новая, ни разу не занятая концепция (превращение в пар, а не просто рост
// ярости/истинная форма).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-05 по
// всей таблице admin-boss-pattern-panel.html (1-44, 220 строк, обе панели
// распределения). Архетипы/movementStyle/цепи ниже выбраны ИЗ конкретной
// детали каждого облика, ЗАТЕМ сверены с полной историей той же роли —
// каждый выбран так, чтобы попасть в 0% для этой роли на момент проверки:
// Банник (enem1) — "только один фланг за раз" (пар идёт то с одной стены
//   бани, то с другой) — у enem1 такого архетипа не было;
// Ошпаренный (enem2) — "короткие одиночные удары с долгими паузами" (внезапный
//   ожог, потом ничего) — у enem2 не было;
// Задубевший (enem3) — "асимметрия" (только ОДНА, ороговевшая лапа бьёт
//   тяжело и часто, другая — редко и слабо) — у enem3 не было, и это ПРЯМО
//   читается из детали на картинке (одна лапа другая), не из шаблона роли;
// Обугленный (enem4) — "зигзаг L-R без стены" (мечется в агонии всем телом) —
//   у enem4 такого не было;
// Испарившийся (enem5) — STEAM_FLOOD, пар заполняет поле со всех сторон
//   разом, включая редкие удары из центра — свой архетип, не «дождь сверху»
//   в чистом виде (не только сверху, а отовсюду, потому что он сам — облако).
// movementStyle — тоже из образа, ни один не создаёт перекос >30%: Банник —
//   drift (пар сносит в сторону), Ошпаренный — pause (замирает от боли,
//   потом бьёт), Задубевший — lateRush (медленный тяжёлый замах ороговевшей
//   лапой → рывок), Обугленный — straight (агония и так видна в геометрии
//   зигзага, без лишней раскачки), Испарившийся — wave (буквально клубится).
//
// ЦЕПИ (13.6/13.7) — обязательны у ВСЕХ ПЯТИ обликов, ДЛИНА РАСТЁТ вместе с
// эскалацией эпитетов (3+3 → 3+4 → 4+5 → 4+6 → 5+7), форма — из образа,
// ЗАТЕМ явно сверена с реальным распределением панели (levels 1-45,
// "Распределение формы «атакующей цепи» по роли") — правило 1.2 требует
// не просто «своей» формы, а формы, которая НЕ усугубляет уже перекошенную
// историю роли. Первый черновик для Ошпаренного (enem2) был arc+arc, но
// панель показала arc/zigzag у enem2 УЖЕ на ~37-38% каждая до этого уровня —
// добавление ещё двух arc довело бы до 50%, это было бы ухудшением, а не
// диверсификацией; заменено на diagonal+vertical (обе категории были
// заметно ниже, под 15%), см. итоговые значения ниже:
// Банник diagonal+diagonal (пар сносит в одну сторону, дважды — простейший
// урок; у enem1 doминировала vertical, diagonal был свободен), Ошпаренный
// diagonal+vertical (первый ожог — резкий рывок в сторону, второй — прямая
// обжигающая струя пара на одном месте; выбрано после проверки панели, см.
// выше), Задубевший zigzag+irregular (ороговевшая лапа бьёт всё резче и
// хаотичнее по мере урона — эскалация ВНУТРИ одного облика; у enem3
// доминировала diagonal, эти категории были свободны), Обугленный
// diagonal+diagonal (мечется в одном направлении агонии, дважды; свободная
// категория для enem4), Испарившийся vertical+vertical (сплошная стена пара
// сверху донизу, дважды — на кульминации; свободная категория для enem5).
//
// МНОГОФАЗНЫЕ БОССЫ ОБЛАСТИ (13.1) — healthMultiplier 1.50 на КАЖДОМ из пяти
// обликов с самого начала (не только на финальном), musicMood: 'heroic' —
// единственно допустимое для этого типа уровня.
//
// БОЕВЫЕ ТЕКСТЫ (раздел 12) — художественный боевой выкрик о состоянии
// персонажа прямо сейчас, не пейзаж и не патчноут (см. примеры "хорошо/плохо"
// в правилах): appearMessage на каждый из пяти обликов + phaseMessages на
// внутренние фазы 2/3 каждого обличья.
let lvlNumber = 45;

const bossCombatConfig = {
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
		enem1: {
			// Банник: ONE_WALL_STEAM — пар идёт то с одной стены, то с другой, по одному фронту за раз
			movementStyle: 'drift', cadence: 1.03, telegraphMs: 900, speedMultiplier: 0.95, damageMultiplier: 0.92,
			speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Не ходи в мой пар без спросу!',
			phaseMessages: { 2: 'Жарче поддам!', 3: 'Из бани живым не выйдешь!' }
		}, // Банник: ONE_WALL_STEAM — пар идёт то с одной стены, то с другой
		enem2: {
			// Ошпаренный: SCALD_STING — редкий, но резкий одиночный ожог, потом долгая пауза
			movementStyle: 'pause', cadence: 0.95, telegraphMs: 800, speedMultiplier: 1.02, damageMultiplier: 0.98,
			speedVariance: [0.88, 0.96, 1.04, 1.12, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Ошпарю — стой смирно!',
			phaseMessages: { 2: 'Больно — и тебе будет!', 3: 'Кожа слезает, а зло только крепнет!' }
		}, // Ошпаренный: SCALD_STING — редкий резкий одиночный ожог, потом долгая пауза
		enem3: {
			// Задубевший: HARDENED_ASYMMETRY — одна ороговевшая лапа бьёт тяжело и часто, другая редко
			movementStyle: 'lateRush', cadence: 1.17, telegraphMs: 1050, speedMultiplier: 0.80, damageMultiplier: 1.19,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12], healthMultiplier: 1.50,
			appearMessage: 'Эта лапа уже не чувствует боли!',
			phaseMessages: { 2: 'Задубел — и не согнусь!', 3: 'Кулак крепче камня!' }
		}, // Задубевший: HARDENED_ASYMMETRY — одна ороговевшая лапа тяжело и часто, другая редко
		enem4: {
			// Обугленный: AGONY_ZIGZAG — мечется всем телом в агонии, зигзаг без стены
			movementStyle: 'straight', cadence: 0.86, telegraphMs: 680, speedMultiplier: 1.12, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24], healthMultiplier: 1.50,
			appearMessage: 'Горю — и жгу в ответ!',
			phaseMessages: { 2: 'Пепел сыплется, а я всё стою!', 3: 'Обугленный, но не сломленный!' }
		}, // Обугленный: AGONY_ZIGZAG — мечется всем телом в агонии, зигзаг без стены
		enem5: {
			// Испарившийся: STEAM_FLOOD — пар заполняет поле отовсюду разом, редко бьёт из центра
			movementStyle: 'wave', cadence: 0.80, telegraphMs: 1040, speedMultiplier: 1.05, damageMultiplier: 1.12,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20], healthMultiplier: 1.50,
			appearMessage: 'Меня уже не удержать — я весь пар!',
			phaseMessages: { 2: 'Дыши мною — это последнее, что ты сделаешь!', 3: 'Баня — это я!' }
		} // Испарившийся: STEAM_FLOOD — пар заполняет поле отовсюду разом, редко бьёт из центра
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl45/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl45/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl45/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl45/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl45/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Банник',
        image: 'images/enemies/regions/5_dom_dvor/lvl45/1.webp',
        baseHP: 7124,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '25%',
        deathAnimation: { preset: 'steamDissolve', durationMs: 1100 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Ошпаренный Банник',
        image: 'images/enemies/regions/5_dom_dvor/lvl45/2.webp',
        baseHP: 42747,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '25%',
        deathAnimation: { preset: 'steamDissolve', durationMs: 1100 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Задубевший Банник',
        image: 'images/enemies/regions/5_dom_dvor/lvl45/3.webp',
        baseHP: 56995,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '25%',
        deathAnimation: { preset: 'steamDissolve', durationMs: 1200 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Обугленный Банник',
        image: 'images/enemies/regions/5_dom_dvor/lvl45/4.webp',
        baseHP: 170986,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '26%',
        deathAnimation: { preset: 'steamDissolve', durationMs: 1200 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Испарившийся Банник',
        image: 'images/enemies/regions/5_dom_dvor/lvl45/5.webp',
        baseHP: 213733,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '27%',
        deathAnimation: { preset: 'steamDissolve', durationMs: 1400 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5 правил уровня: speed≥20
 // → yPos 5-10; speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Банник: ONE_WALL_STEAM — пар идёт то с одной стены, то с другой,
	// редкий рывок высокой температуры =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0  L
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //1  L
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2  L
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3  L
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4  R
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5  R
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //6  R
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //7  R
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //8  L low
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //9  R low
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //10 L fast accent
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //11 R fast accent
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //12 L med
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //13 R med
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //15
	// звенья «атакующей цепи» — пар сносит по диагонали в одну сторону, дважды
	// (diagonal+diagonal), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //21 цепь-B звено 3

	// ===== Ошпаренный: SCALD_STING — редкий резкий одиночный ожог, потом
	// долгая пауза, изредка двойной ожог с обеих сторон =====
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — первый ожог резким рывком в сторону
	// (diagonal), второй — прямая обжигающая струя на одном месте (vertical);
	// заменено с изначального arc+arc после проверки панели (см. комментарий
	// в начале файла — arc/zigzag у enem2 уже были перегружены историей).
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //22 цепь-B звено 4

	// ===== Задубевший: HARDENED_ASYMMETRY — ороговевшая ЛЕВАЯ лапа бьёт
	// тяжело и часто, правая — редко и слабо =====
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //0  L тяжёлая
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //1  L тяжёлая
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2  L тяжёлая
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //3  L тяжёлая
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //4  L тяжёлая
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //5  L тяжёлая, быстрый акцент
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //6  L тяжёлая, быстрый акцент
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //7  R редкая лёгкая
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //8  R редкая лёгкая
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //9  L
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //10 L
	{ boss: 'enem3', type: 'enem33', xPos: 6,  yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //11 L
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //12 L
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //13 R редкий быстрый акцент — нежданчик
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //14 L тяжёлая, быстрый акцент
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //15 L тяжёлая
	// звенья «атакующей цепи» — резкий зигзаг лапой, затем всё более хаотичные
	// рывки по мере урона (zigzag+irregular), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова, длина 5)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //23 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Обугленный: AGONY_ZIGZAG — мечется всем телом в агонии зигзагом
	// без нижней стены =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //14 бросок через всё поле — нежданчик
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — мечется в одном направлении агонии, дважды
	// (diagonal+diagonal).
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова, длина 6)
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //24 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //25 цепь-B звено 6

	// ===== Испарившийся: STEAM_FLOOD — пар заполняет поле отовсюду разом,
	// изредка бьёт из самого центра =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //11 редкий удар из центра — нежданчик
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //12 редкий удар из центра
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //15
	// звенья «атакующей цепи» — сплошная стена пара сверху донизу, дважды на
	// кульминации (vertical+vertical, самые длинные цепи уровня).
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова, максимум длины 7)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //26 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //27 цепь-B звено 7
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5600 }, // спокойный ритм знакомства
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 6200 }, // короткая атака, ОЧЕНЬ долгая пауза — суть SCALD_STING
	{ boss: 'enem3', bossDelayAb: 390, bossDelayAbDop: 6600 }, // тяжёлая, долгая пауза уровня
	{ boss: 'enem4', bossDelayAb: 200, bossDelayAbDop: 3800 }, // самый частый, агония без передышки
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 5200 }, // собранный, но не самый частый — финал
 ];

 const bossAbilitiesDop = [
	// Банник — ONE_WALL_STEAM
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem1', indexAbilities: [10, 11] },
	{ boss: 'enem1', indexAbilities: [8, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1, 10] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21], isChain: true }, // ← цепь (3)
	{ boss: 'enem1', indexAbilities: [12, 13, 7, 8] }, // нежданчик: обе стены разом вместо привычной одной
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 14] }, // сигнатурная: вся левая стена разом

	// Ошпаренный — SCALD_STING
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [7, 8] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь (4)
	{ boss: 'enem2', indexAbilities: [9, 10] }, // нежданчик: двойной ожог с обеих сторон почти разом вместо привычного одиночного
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 11, 12, 13] }, // сигнатурная: серия одиночных ожогов по всему полю подряд

	// Задубевший — HARDENED_ASYMMETRY
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [9, 10, 12] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] }, // редкая правая, слабая
	{ boss: 'enem3', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь (4)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь (5)
	{ boss: 'enem3', indexAbilities: [13] }, // нежданчик: впервые быстрый удар именно правой (слабой) лапой
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 11, 6, 14] }, // сигнатурная: вся левая тяжёлая лапа на полной скорости

	// Обугленный — AGONY_ZIGZAG
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [6, 7, 12, 13] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь (6)
	{ boss: 'enem4', indexAbilities: [14, 10, 11] }, // нежданчик: бросок через всё поле вместо привычного зигзага по краям
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: зигзаг на полной скорости через всё поле

	// Испарившийся — STEAM_FLOOD, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10] },
	{ boss: 'enem5', indexAbilities: [13, 14] },
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь (5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], isChain: true }, // ← цепь (7, максимум)
	{ boss: 'enem5', indexAbilities: [11, 12] }, // нежданчик: впервые удар из самого центра — пар теперь и там
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 9, 1, 3, 10, 15] }, // сигнатурная кульминация: пар заполняет поле полностью, предваряется самым долгим телеграфом уровня (telegraphMs 1040)
 ];

// Лорные названия связок временных улучшений — один и тот же персонаж, но
// словарь ЭСКАЛИРУЕТ вместе с обликом (пар/борода → ожог → мозоль → уголь →
// собственно пар как стихия), см. правило 12.1 lvlData/Правила создания
// уровня.txt. Адъектив на одной позиции у нескольких обликов может
// рифмоваться (как в gameData1.js) — полных совпадений фраз между обликами
// нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Банник — базовый облик: пар, борода, коготь, полок, каменка.
    enem1: {
        variant1: 'Банный кураж', variant2: 'Парная хватка', variant3: 'Коготь-таран',
        variant4: 'Парной напор', variant5: 'Меткий пар', variant6: 'Бешеный пар',
        variant7: 'Банный норов', variant8: 'Крепкая борода', variant9: 'Ударный пар',
        variant10: 'Живучий коготь', variant11: 'Колючий пар', variant12: 'Пар и в темноту',
        variant13: 'Толстая шерсть', variant14: 'Неутомимый пар', variant15: 'Пружинистый выпад',
        variant16: 'Острый коготь, зоркий глаз', variant17: 'Банная удача', variant18: 'Верный пар',
        variant19: 'Молниеносный пар', variant20: 'Банный нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий для своего веса', variant23: 'Банная стойкость', variant24: 'Долгий пар, зоркий глаз',
        variant25: 'Ускользающий пар', variant26: 'Дикий пар', variant27: 'Стойкая борода',
        variant28: 'Пар наповал', variant29: 'Крепкий банник', variant30: 'Парная мощь',
        variant31: 'Выпад с оглядкой', variant32: 'Живучая борода', variant33: 'Юркий и парной',
        variant34: 'Банная прыть', variant35: 'Быстрый пар, крепкий коготь'
    },
    // Ошпаренный Банник — свежий ожог: шрам, волдырь, кипяток, боль, рубец.
    enem2: {
        variant1: 'Ожоговый кураж', variant2: 'Шрамовая хватка', variant3: 'Рубец-таран',
        variant4: 'Кипящий напор', variant5: 'Меткий ожог', variant6: 'Бешеный вскрик',
        variant7: 'Ошпаренный норов', variant8: 'Крепкий волдырь', variant9: 'Ударный ожог',
        variant10: 'Живучий шрам', variant11: 'Колючий волдырь', variant12: 'Ожог и в темноту',
        variant13: 'Толстый рубец', variant14: 'Неутомимый вскрик', variant15: 'Пружинистый рывок',
        variant16: 'Острый взгляд, свежий шрам', variant17: 'Ошпаренная удача', variant18: 'Верный ожог',
        variant19: 'Молниеносный ожог', variant20: 'Кипящий нюх', variant21: 'Цепкий волдырь',
        variant22: 'Юркий, несмотря на боль', variant23: 'Ошпаренная стойкость', variant24: 'Долгая боль, зоркий глаз',
        variant25: 'Ускользающий рывок', variant26: 'Дикий вскрик', variant27: 'Стойкий рубец',
        variant28: 'Ожог наповал', variant29: 'Крепкий ошпаренный', variant30: 'Кипящая мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучий волдырь', variant33: 'Юркий и болючий',
        variant34: 'Ошпаренная прыть', variant35: 'Быстрый ожог, свежий рубец'
    },
    // Задубевший Банник — ороговевшая лапа: мозоль, кость, камень, дуб, кулак.
    enem3: {
        variant1: 'Мозольный кураж', variant2: 'Костяная хватка', variant3: 'Кулак-таран',
        variant4: 'Дубовый напор', variant5: 'Меткий кулак', variant6: 'Бешеный треск кости',
        variant7: 'Задубевший норов', variant8: 'Крепкая мозоль', variant9: 'Ударный кулак',
        variant10: 'Живучая кость', variant11: 'Колючая мозоль', variant12: 'Кулак и в камень',
        variant13: 'Толстая мозоль', variant14: 'Неутомимый треск', variant15: 'Пружинистый кулак',
        variant16: 'Острый взгляд, каменный кулак', variant17: 'Дубовая удача', variant18: 'Верный кулак',
        variant19: 'Молниеносный кулак', variant20: 'Дубовый нюх', variant21: 'Цепкая кость',
        variant22: 'Юркий, несмотря на вес', variant23: 'Дубовая стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий кулак', variant26: 'Дикий треск кости', variant27: 'Стойкая мозоль',
        variant28: 'Кулак наповал', variant29: 'Крепкий задубевший', variant30: 'Каменная мощь',
        variant31: 'Кулак с оглядкой', variant32: 'Живучая мозоль', variant33: 'Юркий и каменный',
        variant34: 'Дубовая прыть', variant35: 'Тяжёлый кулак, крепкая мозоль'
    },
    // Обугленный Банник — сажа, зола, уголь, пепел, копоть.
    enem4: {
        variant1: 'Угольный кураж', variant2: 'Зольная хватка', variant3: 'Уголь-таран',
        variant4: 'Пепельный напор', variant5: 'Меткий уголь', variant6: 'Бешеный треск углей',
        variant7: 'Обугленный норов', variant8: 'Крепкая сажа', variant9: 'Ударный уголь',
        variant10: 'Живучая зола', variant11: 'Колючая сажа', variant12: 'Уголь и в темноту',
        variant13: 'Толстая копоть', variant14: 'Неутомимый треск углей', variant15: 'Пружинистый бросок',
        variant16: 'Острый взгляд, горящий уголь', variant17: 'Угольная удача', variant18: 'Верный бросок',
        variant19: 'Молниеносный бросок', variant20: 'Угольный нюх', variant21: 'Цепкая зола',
        variant22: 'Юркий, несмотря на ожоги', variant23: 'Угольная стойкость', variant24: 'Долгий чад, зоркий глаз',
        variant25: 'Ускользающий бросок', variant26: 'Дикий треск углей', variant27: 'Стойкая копоть',
        variant28: 'Уголь наповал', variant29: 'Крепкий обугленный', variant30: 'Пепельная мощь',
        variant31: 'Бросок с оглядкой', variant32: 'Живучая сажа', variant33: 'Юркий и чадящий',
        variant34: 'Угольная прыть', variant35: 'Быстрый бросок, горящий уголь'
    },
    // Испарившийся Банник — сам пар: облако, туман, марево, дымка, вихрь.
    enem5: {
        variant1: 'Облачный кураж', variant2: 'Туманная хватка', variant3: 'Вихрь-таран',
        variant4: 'Марёвый напор', variant5: 'Меткий вихрь', variant6: 'Бешеный вихрь',
        variant7: 'Испарившийся норов', variant8: 'Крепкое облако', variant9: 'Ударный вихрь',
        variant10: 'Живучий туман', variant11: 'Колючая дымка', variant12: 'Вихрь и в никуда',
        variant13: 'Толстое облако', variant14: 'Неутомимый вихрь', variant15: 'Пружинистый вихрь',
        variant16: 'Острый взгляд, плотный туман', variant17: 'Облачная удача', variant18: 'Верный вихрь',
        variant19: 'Молниеносный вихрь', variant20: 'Марёвый нюх', variant21: 'Цепкий туман',
        variant22: 'Юркий, несмотря на бесплотность', variant23: 'Облачная стойкость', variant24: 'Долгое марево, зоркий глаз',
        variant25: 'Ускользающий вихрь', variant26: 'Дикий вихрь', variant27: 'Стойкая дымка',
        variant28: 'Вихрь наповал', variant29: 'Крепкий испарившийся', variant30: 'Туманная мощь',
        variant31: 'Вихрь с оглядкой', variant32: 'Живучее облако', variant33: 'Юркий и бесплотный',
        variant34: 'Облачная прыть', variant35: 'Быстрый вихрь, плотное облако'
    }
};
