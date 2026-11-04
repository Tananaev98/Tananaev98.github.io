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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.751, damageMultiplier: 1.782, minWaveDelay: 4200, minShotDelay: 126, minTelegraphMs: 509,
	phases: [
		{ phase: 1, minHp: 0.677, cadence: 1.025, speed: 1.026, damage: 1, telegraphMultiplier: 1.025, surpriseChance: 0.092, maxActiveAttacks: 22 },
		{ phase: 2, minHp: 0.327, cadence: 0.776, speed: 1.153, damage: 1.07, telegraphMultiplier: 0.857, surpriseChance: 0.191, maxActiveAttacks: 26 },
		{ phase: 3, minHp: 0, cadence: 0.618, speed: 1.278, damage: 1.14, telegraphMultiplier: 0.757, surpriseChance: 0.291, maxActiveAttacks: 30 }
	],
	bosses: {
		enem1: { combatIdentity: "Пар от стены оставляет обратный удар", combatTrick: "Левый паровой фронт заставляет перейти в правую середину и вернуться к стене. Медленная завеса прикрыта ударами с другой стороны. Ошибка — уйти бить Банника после первого переноса.", signatureEvery: 3, movementStyle: 'drift', cadence: 1.027, telegraphMs: 940, speedMultiplier: 1.011, damageMultiplier: 0.92, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Не ходи в мой пар без спросу!", phaseMessages: {"2":"Жарче поддам!","3":"Из бани живым не выйдешь!"} },
		enem2: { combatIdentity: "Кипяток возвращается за завесой", combatTrick: "Зависшая струя прикрывает обжигающую пару. После правого ответа приходится снова вернуться влево, а затем проверить каменку. Ошибка — отбить пар и пропустить горячий ответ.", signatureEvery: 3, movementStyle: 'pause', cadence: 1, telegraphMs: 910, speedMultiplier: 1.033, damageMultiplier: 0.98, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Ошпарю — стой смирно!", phaseMessages: {"2":"Больно — и тебе будет!","3":"Кожа слезает, а зло только крепнет!"} },
		enem3: { combatIdentity: "Лапа дважды захлопывает один проход", combatTrick: "Тяжёлая лапа повторяет удар у левой стены, короткий правый выпад отвлекает от третьего захлопа. Ошибка — после одного удара начать попеременно ждать стороны; лапа остаётся в прежнем проходе.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.981, telegraphMs: 1021, speedMultiplier: 1.057, damageMultiplier: 1.19, speedVariance: [1, 1.0004, 1.0008, 1.0012, 1.0016], healthMultiplier: 1.5, appearMessage: "Эта лапа уже не чувствует боли!", phaseMessages: {"2":"Задубел — и не согнусь!","3":"Кулак крепче камня!"} },
		enem4: { combatIdentity: "Угли пересекают выученный проход", combatTrick: "За знакомой парой правых выбросов идут левые угли и новый правый бросок. Медленный уголь задерживается под прикрытием. Ошибка — переносить выученный тройной левый захлоп на этот облик.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.961, telegraphMs: 880, speedMultiplier: 1.082, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Горю — и жгу в ответ!", phaseMessages: {"2":"Пепел сыплется, а я всё стою!","3":"Обугленный, но не сломленный!"} },
		enem5: { combatIdentity: "Весь пар замыкает баню", combatTrick: "Паровой выброс проходит правую середину, левую стену и снова смыкает правый проход. Последняя серия соединяет завесу, повтор лапы и обратный выброс. Ошибка — считать первую правую пару окончанием боя: пар возвращается с обоих концов.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.942, telegraphMs: 1080, speedMultiplier: 1.109, damageMultiplier: 1.12, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Меня уже не удержать — я весь пар!", phaseMessages: {"2":"Дыши мною — это последнее, что ты сделаешь!","3":"Баня — это я!"} }
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
 let timeNextBoss = 17;
 const bossInterval = 11;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5 правил уровня: speed≥20
 // → yPos 5-10; speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Банник =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.71 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.11 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.61 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.61 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.11 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.61 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.61 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.71 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.11 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.71 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.11 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.71 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.81 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.11 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.97 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.72 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.47 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.71 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.11 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.71 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.11 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.61 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.61 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.11 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.87 }, // 45 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.62 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.12 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.87 }, // 49 i

	// ===== Ошпаренный Банник =====
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.73 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.73 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.79 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.54 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.29 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.04 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.73 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.73 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.71 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.71 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.71 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.89 }, // 44 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.64 }, // 45 i
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.39 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.14 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.89 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.64 }, // 49 i

	// ===== Задубевший Банник =====
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.75 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.75 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.75 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.75 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.8 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.76 }, // 32 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.72 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.68 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.64 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.75 }, // 36 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.75 }, // 43 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 44 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.81 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.31 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.81 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.8 }, // 50 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.76 }, // 51 i
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.72 }, // 52 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.68 }, // 53 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.64 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.6 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10.56 }, // 56 i

	// ===== Обугленный Банник =====
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.77 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 12 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.77 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 19 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.77 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 26 d
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.77 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 32 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 33 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.49 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.24 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.99 }, // 36 f
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.74 }, // 37 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.49 }, // 38 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.24 }, // 39 f
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.77 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 44 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 45 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 46 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 47 g
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.77 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.91 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.91 }, // 52 h
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.91 }, // 53 h
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.21 }, // 54 h
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.39 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.14 }, // 56 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.89 }, // 57 i
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.64 }, // 58 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.39 }, // 59 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.14 }, // 60 i

	// ===== Испарившийся Банник =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.79 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.79 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 23 e
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.19 }, // 28 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.94 }, // 29 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.69 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.44 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.19 }, // 32 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.94 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.69 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.79 }, // 35 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 36 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 37 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 38 g
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 39 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.79 }, // 42 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 43 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 44 h
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 45 h
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 46 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.99 }, // 47 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.99 }, // 48 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 49 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.29 }, // 50 i
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.04 }, // 51 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.79 }, // 52 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.54 }, // 53 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.29 }, // 54 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.04 }, // 55 i
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.79 }, // 56 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 170, bossDelayAbDop: 10500, firstWaveDelayMs: 2300 }, // Пар от стены оставляет обратный удар
	{ boss: 'enem2', bossDelayAb: 173, bossDelayAbDop: 10900, firstWaveDelayMs: 2300 }, // Кипяток возвращается за завесой
	{ boss: 'enem3', bossDelayAb: 186, bossDelayAbDop: 11100, firstWaveDelayMs: 2300 }, // Лапа дважды захлопывает один проход
	{ boss: 'enem4', bossDelayAb: 177, bossDelayAbDop: 11800, firstWaveDelayMs: 2300 }, // Угли пересекают выученный проход
	{ boss: 'enem5', bossDelayAb: 181, bossDelayAbDop: 11801, firstWaveDelayMs: 2300 }, // Весь пар замыкает баню
];

 const bossAbilitiesDop = [
	// Банник
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 600, 300, 0, 300], openingOrder: 0, label: "Пар открывает левую стену" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 0, 300], label: "Возврат от каменки к стене" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [600, 0, 300, 300, 300], label: "Струя за левым фронтом" },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [600, 300, 300, 0, 600], label: "Пар не закончился на переносе" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [0, 200, 200, 400, 600], label: "От стены обратно к каменке" },
	{ boss: 'enem1', indexAbilities: [29, 30, 31], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0], openingOrder: 1, label: "Цепь первого пара" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [0, 600, 0, 0, 0], label: "Вторая струя после возврата" },
	{ boss: 'enem1', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [300, 300, 300, 300, 0, 0], label: "Левый фронт не отпускает" },
	{ boss: 'enem1', indexAbilities: [45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0], label: "Цепь возврата к каменке" },

	// Ошпаренный Банник
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Кипяток после завесы" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 300, 0], label: "Горячий ответ за спиной" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 0, 0], label: "Двойной возврат кипятка" },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [300, 300, 300, 600, 0], label: "Завеса прячет повторный ожог" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [300, 0, 600, 300, 0], label: "Ожог следует за левой парой" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь горячего возврата" },
	{ boss: 'enem2', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [300, 300, 300, 300, 300, 0], label: "Кипяток снова бьёт от стены" },
	{ boss: 'enem2', indexAbilities: [38, 39, 40, 41, 42, 43], minPhase: 3, shotGapsMs: [300, 300, 600, 300, 300], label: "Последний ожог за паром" },
	{ boss: 'enem2', indexAbilities: [44, 45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь двух обжигающих возвратов" },

	// Задубевший Банник
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 0], openingOrder: 0, label: "Лапа дважды бьёт стену" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9, 10, 11], shotGapsMs: [600, 0, 0, 0, 300, 300], label: "Лапа возвращается в прежний проход" },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [600, 0, 600, 0, 300], label: "Правый выпад не отменяет захлоп" },
	{ boss: 'enem3', indexAbilities: [18, 19, 20, 21, 22, 23, 24], shotGapsMs: [300, 0, 0, 300, 300, 300], label: "Удар от каменки в левый зажим" },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28, 29, 30], shotGapsMs: [300, 300, 0, 300, 300], label: "Тройной захлоп отпускает вправо" },
	{ boss: 'enem3', indexAbilities: [31, 32, 33, 34, 35], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь трёх захлопов лапы" },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 39, 40, 41, 42], minPhase: 2, shotGapsMs: [300, 300, 0, 600, 0, 300], label: "Пар прикрывает третий захлоп" },
	{ boss: 'enem3', indexAbilities: [43, 44, 45, 46, 47, 48, 49], minPhase: 3, shotGapsMs: [600, 600, 300, 0, 0, 0], label: "Лапа запирает весь левый проход" },
	{ boss: 'enem3', indexAbilities: [50, 51, 52, 53, 54, 55, 56], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь повторного захлопа" },

	// Обугленный Банник
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 0, 0, 0, 300], openingOrder: 0, label: "Угли пересекают проход" },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11, 12], shotGapsMs: [0, 600, 300, 0, 0, 0], label: "Угольный возврат к каменке" },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 16, 17, 18, 19], shotGapsMs: [300, 0, 300, 300, 300, 600], label: "Угли замыкаются правой парой" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24, 25, 26], shotGapsMs: [0, 600, 300, 0, 0, 0], label: "Уголь под прикрытием двух выбросов" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31, 32, 33], shotGapsMs: [300, 0, 300, 300, 0, 600], label: "Левый уголь заставляет вернуться" },
	{ boss: 'enem4', indexAbilities: [34, 35, 36, 37, 38, 39], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь раскалённых проходов" },
	{ boss: 'enem4', indexAbilities: [40, 41, 42, 43, 44, 45, 46, 47], minPhase: 2, shotGapsMs: [300, 300, 300, 0, 0, 0, 0], label: "Уголь после второго пересечения" },
	{ boss: 'enem4', indexAbilities: [48, 49, 50, 51, 52, 53, 54], minPhase: 3, shotGapsMs: [0, 0, 0, 600, 300, 0], label: "Обратный бросок через полок" },
	{ boss: 'enem4', indexAbilities: [55, 56, 57, 58, 59, 60], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь угольного обратного броска" },

	// Испарившийся Банник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Пар смыкает оба прохода" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 300, 300], label: "Облако возвращается к каменке" },
	{ boss: 'enem5', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [300, 0, 0, 0], label: "Правый заслон после трёх левых ударов" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [300, 300, 300, 600, 0, 300], label: "Завеса превращается в замок" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [600, 0, 300, 300, 300, 300], label: "Из левого пара захлопывается правая стена" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь запертой бани" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40, 41], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 300, 0], label: "Баня — это я: возврат всей силы" },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 3, shotGapsMs: [300, 300, 300, 300, 300, 0, 0], label: "Баня — это я: два замыкающих выброса" },
	{ boss: 'enem5', indexAbilities: [50, 51, 52, 53, 54, 55, 56], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь последнего парового захлопа" },

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
