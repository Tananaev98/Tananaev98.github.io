// Уровень 50 «Беспорядок пряхи» — десятый уровень области V, ОСОБЫЙ
// многофазный уровень (правило 13.6): один персонаж Кикимора в пяти
// нарастающих обликах, не пять разных монстров.
//
// План согласован с пользователем 2026-09-12 перед записью файла (см. диалог
// сессии) — см. обоснование каждого решения ниже, оно и есть тот план.
//
// ИССЛЕДОВАНИЕ ПЕРСОНАЖА (правило 12, AGENTS.md дух исследовательского
// шлюза — ядро персонажа берётся из реальной традиции, не из шаблона роли):
// Кикимора — славянский домашний/дворовый дух женского рода, живёт за
// печью или в тёмном углу («хозяйка тёмного угла» — именно так её описывает
// свежая запись идеи-документа). Сигнатурная фольклорная черта — прядёт и
// путает пряжу по ночам, наказывая нерадивую хозяйку спутанными нитками;
// само название уровня «Беспорядок пряхи» и упоминание в документе гораздо
// более позднего босса «Искажённая Кикимора (опутана живой чёрной пряжей)»
// подтверждают, что тема пряжи — уже заложенный канон проекта, не выдумка
// с нуля. Второй устойчивый мотив — она тревожит кур и слышна раньше, чем
// видна (её звук — предвестие несчастья, тишина после обычного шума —
// самая дурная примета). Оба мотива положены в основу архетипов ниже.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl50/) — все 5 фаз открыты и
// сверены лично, эскалация читается как история одной пряхи:
// 1.webp — собранная стойка, деревянный ребристый валёк (реальный
//   инструмент выбивания белья) в одной руке, коготь в другой — спокойная,
//   но уже опасная прядильщица.
// 2.webp — низкий хватающий выпад когтем — будто выдёргивает нитку.
// 3.webp — резкая закрученная поза вполоборота, буквально поймана в
//   момент кружения/разворота на звук.
// 4.webp — волосы взрываются в спутанную гриву, читается как ком свалявшейся
//   пряжи, торчащей во все стороны разом.
// 5.webp — валёк занесён над головой как булава, грива дичайшая, поза самая
//   агрессивная — апофеоз размотавшегося беспорядка.
// 11-55.webp — круглые медальоны-портреты каждой фазы (та же конвенция, что
//   и у Банника, уровень 45, не обычные атакующие спрайты — сверено лично).
//
// ЭПИТЕТЫ (раздел 12: фаза 1 голая, 2-5 разные ПОНЯТИЯ, не лестница
// интенсивности одного слова; финал не должен повторять прошлые финалы):
// Кикимора (голая) → Спутанная (путает нитки — её прямая функция, поза Ф2 —
// хватающий рывок) → Клохчущая (тревожит кур, ЕЁ ГОЛОС — предвестие,
// поза Ф3 — резкий разворот на звук) → Свалявшаяся (пряжа свалялась в один
// ком навсегда — буквально то, что происходит с гривой на Ф4) → Кудельная
// (от «куделя», вычесанное волокно для пряжи — она сама стала сырым
// материалом собственного ремесла; сверено с прошлыми финалами —
// Обезумевшая(15)/Истинная(25)/Гневный(30)/Щучья Ведьма(39)/Разъярённый(40)/
// Испарившийся(45) — концепция «стала своим материалом» ни разу не занята,
// в отличие от безумия/истины/гнева/ярости).
//
// ГЛАВНАЯ ИДЕЯ БОЯ: обязательная механика «Атакующая цепь» (раздел 13.6) на
// этом уровне не бантик поверх — она и есть буквально ЕЁ ПРЯЖА, летящая
// звеном за звеном. Длина цепей растёт вместе с эскалацией эпитетов
// (3+3→3+4→4+5→4+6→5+7, как у Банника) — каждая фаза наматывает более
// длинную и опасную нить.
//
// АРХЕТИПЫ ПО ФАЗАМ (обоснование через характер, не шаблон роли; сверено с
// admin-boss-pattern-panel.html, 245 строк, уровни 1-49, ШАГ 1 правила 1.2):
// Ф1 Кикимора (роль «знакомство») — SPINDLE_ARC: плавные атаки по дуге,
//   будто наматывает нить на невидимое веретено. movementStyle: pause —
//   прялка на миг замирает перед новым обвивом (13→14.3% для enem1, не
//   ближайшая к перекосу категория). Цепь: diagonal (ровная нить в одну
//   сторону) — у enem1 diagonal было 17%, vertical уже раздут до 33%, этот
//   выбор его не усугубляет.
// Ф2 Спутанная (роль «быстрые серии») — SNATCH_TANGLE: быстрые хватающие
//   рывки с чередующихся ближних точек, как выдёргивание запутанной нити.
//   movementStyle: weave — сама нить извивается. Цепь: irregular (хаос
//   спутывания, у enem2 было 17%, самое низкое).
// Ф3 Клохчущая (роль «тяжёлые редкие») — OMEN_HUSH: аномально ДОЛГАЯ тишина
//   (самый длинный телеграф уровня) вместо привычного кудахтанья, затем
//   один резкий закручивающий удар — прямая связь с фольклором: именно
//   тишина после её обычного шума считается дурной приметой. movementStyle:
//   pause — гробовая тишина перед ударом. Цепь: arc (у enem3 diagonal уже
//   раздут до 33%, arc был 17%, этот выбор его не усугубляет).
// Ф4 Свалявшаяся (роль «нервный/самый быстрый») — MATTED_LASH: свалявшийся
//   ком гривы хлещет непредсказуемо во все стороны разом — уже не
//   контролируемая хватка Ф2, а стихийное дёрганье. movementStyle: drift —
//   ком мотает её саму. Цепь: zigzag (у enem4 было 22%).
// Ф5 Кудельная (финал) — FULL_UNRAVEL: самая длинная и опасная нить-цепь
//   всего боя («размоталась до конца») плюс тяжёлый прямой удар валька как
//   кульминация. movementStyle: lateRush — разгон и обрушение всей массы.
//   Цепь: irregular (полный хаос размотавшегося клубка, у enem5 было 17%).
//
// МНОГОФАЗНЫЕ БОССЫ ОБЛАСТИ (13.1) — healthMultiplier 1.50 на КАЖДОМ из
// пяти обликов, musicMood: 'heroic' — единственно допустимое.
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — да, пишутся: это персонаж-
// в-обликах, единственный тип, для которого эти поля предусмотрены (правка
// 2026-09-06 в разделе 12 — раньше по ошибке добавлялись и обычным боссам).
let lvlNumber = 50;

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
	levelCadence: 0.763, damageMultiplier: 1.782, minWaveDelay: 4500, minShotDelay: 119, minTelegraphMs: 508,
	phases: [
		{ phase: 1, minHp: 0.684, cadence: 1.028, speed: 1.029, damage: 1, telegraphMultiplier: 1.031, surpriseChance: 0.103, maxActiveAttacks: 27 },
		{ phase: 2, minHp: 0.334, cadence: 0.787, speed: 1.179, damage: 1.07, telegraphMultiplier: 0.872, surpriseChance: 0.203, maxActiveAttacks: 31 },
		{ phase: 3, minHp: 0, cadence: 0.632, speed: 1.291, damage: 1.14, telegraphMultiplier: 0.772, surpriseChance: 0.303, maxActiveAttacks: 35 }
	],
	bosses: {
		enem1: { combatIdentity: "Намотка оставляет обратный виток", combatTrick: "Нить проходит знакомую дугу и возвращается за пройденным витком. Ошибка — бить пряху после первой намотки, пока обратный виток ещё идёт.", signatureEvery: 3, movementStyle: 'pause', cadence: 1.007, telegraphMs: 950, speedMultiplier: 1.021, damageMultiplier: 0.92, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Кто оставил кудель без пригляда?!", phaseMessages: {"2":"Спутаю всё, что плохо лежит!","3":"Ни одна нить не уйдёт от меня!"} },
		enem2: { combatIdentity: "Перехват вытягивает нить из старого прохода", combatTrick: "Извивающаяся нить перехватывается в знакомой точке и снова тянется через старый проход. Ошибка — повторить первый обход, не заметив обратный захват.", signatureEvery: 3, movementStyle: 'weave', cadence: 0.993, telegraphMs: 872, speedMultiplier: 1.047, damageMultiplier: 0.98, speedVariance: [1, 1.0004, 1.0008, 1.0012, 1.0016], healthMultiplier: 1.5, appearMessage: "Ты сам себя запутал!", phaseMessages: {"2":"Нити крепче, чем кажется!","3":"Не развяжешь — не уйдёшь!"} },
		enem3: { combatIdentity: "Заминка обрывает выученный момент стяжки", combatTrick: "Перед стяжкой пряха замирает, затем вытягивает ещё один конец из прежнего прохода. Ошибка — принять остановку за передышку и уйти до обратного обрыва.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.813, telegraphMs: 1060, speedMultiplier: 1.002, damageMultiplier: 1.19, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Слышишь, как я хохочу?", phaseMessages: {"2":"Тишина — это ты меня не услышал!","3":"Последний смех — за мной!"} },
		enem4: { combatIdentity: "Сцепленные клоки сохраняют обратный рывок", combatTrick: "Пряжа сбилась в несколько клоков. Один клок завершает полёт, но сцепленный с ним возвращает удар в старую полосу. Ошибка — считать один кусок концом всей нити.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.953, telegraphMs: 821, speedMultiplier: 1.08, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Уже не распутать!", phaseMessages: {"2":"Свалялась намертво!","3":"Последний узел — твой!"} },
		enem5: { combatIdentity: "Полный роспуск оставляет последнее обрушение", combatTrick: "Вся нить распускается в нескольких проходах, но за обрывом остаётся смыкание под тяжёлый удар. Ошибка — уйти после первого обрушения, пока последний конец ещё идёт.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.933, telegraphMs: 990, speedMultiplier: 1.104, damageMultiplier: 1.12, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Вся я — один клубок ярости!", phaseMessages: {"2":"Пряжа рвётся — и я с ней!","3":"Последняя нить оборвётся на тебе!"} }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl50/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl50/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl50/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl50/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl50/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Кикимора',
        image: 'images/enemies/regions/5_dom_dvor/lvl50/1.webp',
        baseHP: 18800,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Спутанная Кикимора',
        image: 'images/enemies/regions/5_dom_dvor/lvl50/2.webp',
        baseHP: 46997,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '45%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Клохчущая Кикимора',
        image: 'images/enemies/regions/5_dom_dvor/lvl50/3.webp',
        baseHP: 83124,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '45%',
        deathAnimation: { preset: 'default', durationMs: 1100 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Свалявшаяся Кикимора',
        image: 'images/enemies/regions/5_dom_dvor/lvl50/4.webp',
        baseHP: 133706,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '26%',
        deathAnimation: { preset: 'default', durationMs: 1100 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Кудельная Кикимора',
        image: 'images/enemies/regions/5_dom_dvor/lvl50/5.webp',
        baseHP: 202391,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '27%',
        deathAnimation: { preset: 'default', durationMs: 1300 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 22;
 const bossInterval = 15;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Кикимора =====
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.33 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.33 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.33 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.59 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.34 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.09 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.33 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.33 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.53 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.53 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.53 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.69 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.44 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.19 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.94 }, // 49 i

	// ===== Спутанная Кикимора =====
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.35 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.35 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.35 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.87 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.83 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.79 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.75 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.35 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.67 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.35 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.69 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.61 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.61 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.11 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.97 }, // 45 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.93 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.89 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.85 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.81 }, // 49 i

	// ===== Клохчущая Кикимора =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.37 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.73 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 7 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17.33 }, // 8 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 14 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 15 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.83 }, // 16 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 21 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 22 c
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 23 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.83 }, // 24 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 28 d
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 29 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 30 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 31 d
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.37 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.73 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 35 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 36 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 37 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 38 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.89 }, // 39 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17.33 }, // 40 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.55 }, // 41 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.3 }, // 42 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.05 }, // 43 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.8 }, // 44 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.55 }, // 45 f
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 49 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 50 g
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 51 g
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 52 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 53 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.83 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 56 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.93 }, // 57 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 58 h
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 59 h
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 60 h
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.73 }, // 61 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.65 }, // 62 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.4 }, // 63 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.15 }, // 64 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.9 }, // 65 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.65 }, // 66 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.4 }, // 67 i

	// ===== Свалявшаяся Кикимора =====
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.41 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.41 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.71 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.41 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.41 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.71 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.42 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.42 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.72 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.42 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.42 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.73 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.73 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.44 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.44 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.74 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.44 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.44 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.74 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.45 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.45 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.75 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.45 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.45 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.75 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.49 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.24 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.99 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.74 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.49 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.24 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.77 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.77 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.39 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.48 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.48 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.78 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.48 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.48 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.78 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.59 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.34 }, // 49 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.09 }, // 50 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.84 }, // 51 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.59 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.34 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.09 }, // 54 i

	// ===== Кудельная Кикимора =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.79 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.37 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.12 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.87 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.62 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.37 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.12 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.87 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.91 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.85 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.41 }, // 58 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.73 }, // 59 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 60 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.77 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.73 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.73 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.73 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.43 }, // 67 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.18 }, // 68 j
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.93 }, // 69 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.68 }, // 70 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.43 }, // 71 j
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.18 }, // 72 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.93 }, // 73 j

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 176, bossDelayAbDop: 11700, firstWaveDelayMs: 2550 }, // Намотка оставляет обратный виток
	{ boss: 'enem2', bossDelayAb: 177, bossDelayAbDop: 11200, firstWaveDelayMs: 2550 }, // Перехват вытягивает нить из старого прохода
	{ boss: 'enem3', bossDelayAb: 175, bossDelayAbDop: 16800, firstWaveDelayMs: 2550 }, // Заминка обрывает выученный момент стяжки
	{ boss: 'enem4', bossDelayAb: 185, bossDelayAbDop: 10300, firstWaveDelayMs: 2550 }, // Сцепленные клоки сохраняют обратный рывок
	{ boss: 'enem5', bossDelayAb: 172, bossDelayAbDop: 15500, firstWaveDelayMs: 2550 }, // Полный роспуск оставляет последнее обрушение
];

 const bossAbilitiesDop = [
	// Кикимора
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 0, 0, 300, 0], openingOrder: 0, label: "Первый виток возвращается к пряхе" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 0, 0], label: "Обратная намотка из прежнего угла" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [600, 0, 300, 0, 600], label: "Оставленная пряжа за витком" },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [300, 0, 0, 0, 300], label: "Нить не закончилась на подхвате" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [600, 0, 0, 0, 0], label: "Подхват возвращает старый виток" },
	{ boss: 'enem1', indexAbilities: [29, 30, 31], signature: true, isChain: true, shotDelayMs: 403, shotGapsMs: [0, 0], openingOrder: 1, label: "Цепь первой намотки" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [0, 300, 300, 600, 300, 0], label: "Второй подхват после витка" },
	{ boss: 'enem1', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [0, 0, 0, 300, 0, 300], label: "Намотка вернулась за последним концом" },
	{ boss: 'enem1', indexAbilities: [46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 319, shotGapsMs: [0, 0, 0], label: "Цепь обратного витка" },

	// Спутанная Кикимора
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [250, 250, 250, 0], openingOrder: 0, label: "Перехват из старой намотки" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 500], label: "Запутанная нить требует обратного захвата" },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12, 13, 14], shotGapsMs: [250, 0, 250, 500, 500], label: "Старый конец не ушёл с перехватом" },
	{ boss: 'enem2', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [0, 0, 250, 500, 500], label: "Второй перехват прежней нити" },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [0, 0, 0, 0, 500], label: "Хватка тянется через левый узел" },
	{ boss: 'enem2', indexAbilities: [27, 28, 29, 30], signature: true, isChain: true, shotDelayMs: 319, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь первого спутанного захвата" },
	{ boss: 'enem2', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [500, 0, 500, 500, 250, 250], label: "Перехват вернулся к прежнему углу" },
	{ boss: 'enem2', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [0, 250, 250, 450, 500, 0], label: "Последний захват не отпускает нить" },
	{ boss: 'enem2', indexAbilities: [45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 319, shotGapsMs: [0, 0, 0, 0], label: "Цепь обратного перехвата" },

	// Клохчущая Кикимора
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7, 8], shotGapsMs: [0, 500, 0, 0, 250, 250, 0, 250], openingOrder: 0, label: "Заминка перед обратной стяжкой" },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 0, 200, 200, 200], label: "Нить дёрнулась после тишины" },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20, 21, 22, 23, 24], shotGapsMs: [0, 0, 0, 200, 200, 200, 200], label: "Остаток пряжи после стяжки" },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28, 29, 30, 31], shotGapsMs: [0, 0, 0, 200, 200, 200], label: "Пряха вытянула обратный конец" },
	{ boss: 'enem3', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39, 40], shotGapsMs: [0, 250, 0, 0, 500, 0, 250, 250], label: "Два оставшихся конца в заминке" },
	{ boss: 'enem3', indexAbilities: [41, 42, 43, 44, 45], signature: true, isChain: true, shotDelayMs: 383, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь задержанной стяжки" },
	{ boss: 'enem3', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [0, 0, 200, 200, 200, 200, 0], label: "Заминка оставляет второй обрыв" },
	{ boss: 'enem3', indexAbilities: [54, 55, 56, 57, 58, 59, 60, 61], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 0, 0], label: "Обратный конец прядётся дальше" },
	{ boss: 'enem3', indexAbilities: [62, 63, 64, 65, 66, 67], signature: true, isChain: true, minPhase: 3, shotDelayMs: 383, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь последнего стяжка" },

	// Свалявшаяся Кикимора
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 200, 200, 200, 200], openingOrder: 0, label: "Первый клок тащит обратный обрыв" },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 400, 200], label: "Сцепка возвращает клочья к углу" },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [200, 200, 200, 200, 200], label: "Правый клок держит левый конец" },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [0, 200, 200, 200, 200], label: "Левый ком дёргает сцепку обратно" },
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [0, 0, 200, 200, 200], label: "Неотпущенный ком за правой парой" },
	{ boss: 'enem4', indexAbilities: [29, 30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 319, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь сцепленных клоков" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [0, 0, 0, 200, 200], label: "Обратная сцепка двух клоков" },
	{ boss: 'enem4', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [500, 500, 0, 0, 500, 0], label: "Последний ком тащит прежнюю нить" },
	{ boss: 'enem4', indexAbilities: [48, 49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 319, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь разорванного клубка" },

	// Кудельная Кикимора
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [300, 300, 0, 300, 300, 600], openingOrder: 0, label: "Роспуск не завершился на первом обрыве" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [0, 0, 0, 250, 500, 250], label: "Тяжёлый удар за обратной нитью" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [0, 0, 250, 500, 0, 250], label: "Куделя закрывает старый проход" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [500, 250, 0, 0, 250, 500], label: "Два обрыва под поднятым вальком" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 0, 0, 0, 250, 500], label: "Оставшийся конец возвращает смыкание" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40, 41], signature: true, isChain: true, shotDelayMs: 319, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь полного роспуска" },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [500, 250, 250, 500, 0, 0, 0], label: "Новый обрыв поверх прежней стяжки" },
	{ boss: 'enem5', indexAbilities: [50, 51, 52, 53, 54, 55, 56, 57], minPhase: 3, shotGapsMs: [0, 0, 250, 250, 250, 250, 500], label: "Последний проход перед обрушением" },
	{ boss: 'enem5', indexAbilities: [58, 59, 60, 61, 62, 63, 64, 65, 66], minPhase: 3, shotGapsMs: [0, 200, 0, 0, 350, 0, 500, 0], label: "Кудельный обвал: ещё одно замыкание" },
	{ boss: 'enem5', indexAbilities: [67, 68, 69, 70, 71, 72, 73], signature: true, isChain: true, minPhase: 3, shotDelayMs: 319, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь последнего конца" },

];

// Лорные названия связок временных улучшений — один и тот же персонаж, но
// словарь ЭСКАЛИРУЕТ вместе с обликом (пряжа/нить → путы → голос-предвестие
// → свалявшийся ком → сырое волокно), см. правило 12.1. Один и тот же
// адъектив на одной позиции у нескольких обликов допустим (как в
// gameData1.js) — полных совпадений фраз между обликами нет (проверено
// программно).
const UPGRADE_VARIANT_NAMES = {
    // Кикимора — базовый облик: пряжа, веретено, нить, коготь, валёк.
    enem1: {
        variant1: 'Прядильный кураж', variant2: 'Веретённая хватка', variant3: 'Валёк-таран',
        variant4: 'Нитяной напор', variant5: 'Меткая нить', variant6: 'Бешеная нить',
        variant7: 'Кикиморин норов', variant8: 'Крепкая куделя', variant9: 'Ударный валёк',
        variant10: 'Живучее веретено', variant11: 'Колючая нить', variant12: 'Нить и в темноту',
        variant13: 'Толстая пряжа', variant14: 'Неутомимая нить', variant15: 'Пружинистый выпад',
        variant16: 'Острый коготь, зоркий глаз', variant17: 'Пряжевая удача', variant18: 'Верная нить',
        variant19: 'Молниеносная нить', variant20: 'Кикиморин нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркая для своего роста', variant23: 'Прядильная стойкость', variant24: 'Долгая нить, зоркий глаз',
        variant25: 'Ускользающая нить', variant26: 'Дикая нить', variant27: 'Стойкая куделя',
        variant28: 'Нить наповал', variant29: 'Крепкая кикимора', variant30: 'Веретённая мощь',
        variant31: 'Выпад с оглядкой', variant32: 'Живучая куделя', variant33: 'Юркая и нитяная',
        variant34: 'Прядильная прыть', variant35: 'Быстрая нить, крепкий валёк'
    },
    // Спутанная — путы: узел, петля, клубок, рывок, тугая нить.
    enem2: {
        variant1: 'Узловой кураж', variant2: 'Петлевая хватка', variant3: 'Узел-таран',
        variant4: 'Путаный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Спутанный норов', variant8: 'Крепкий узел', variant9: 'Ударная петля',
        variant10: 'Живучий клубок', variant11: 'Колючий узел', variant12: 'Рывок и в темноту',
        variant13: 'Тугая петля', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Острая петля, зоркий глаз', variant17: 'Путаная удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Путаный нюх', variant21: 'Цепкая петля',
        variant22: 'Юркая, несмотря на путы', variant23: 'Узловая стойкость', variant24: 'Долгий узел, зоркий глаз',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкий узел',
        variant28: 'Рывок наповал', variant29: 'Крепкая спутанная', variant30: 'Путаная мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая петля', variant33: 'Юркая и путаная',
        variant34: 'Узловая прыть', variant35: 'Быстрый рывок, тугой узел'
    },
    // Клохчущая — голос-предвестие: кудахтанье, тишина, эхо, шёпот, дурной знак.
    enem3: {
        variant1: 'Кудахчущий кураж', variant2: 'Шёпотная хватка', variant3: 'Хохот-таран',
        variant4: 'Голосовой напор', variant5: 'Меткий хохот', variant6: 'Бешеный хохот',
        variant7: 'Клохчущий норов', variant8: 'Крепкая тишина', variant9: 'Ударный хохот',
        variant10: 'Живучее эхо', variant11: 'Колючий шёпот', variant12: 'Хохот и в темноту',
        variant13: 'Толстая тишина', variant14: 'Неутомимый хохот', variant15: 'Пружинистый разворот',
        variant16: 'Острый слух, зоркий глаз', variant17: 'Предвестная удача', variant18: 'Верный хохот',
        variant19: 'Молниеносный разворот', variant20: 'Предвестный нюх', variant21: 'Цепкое эхо',
        variant22: 'Юркая, несмотря на смех', variant23: 'Голосовая стойкость', variant24: 'Долгая тишина, зоркий глаз',
        variant25: 'Ускользающий хохот', variant26: 'Дикий хохот', variant27: 'Стойкий шёпот',
        variant28: 'Хохот наповал', variant29: 'Крепкая клохчущая', variant30: 'Предвестная мощь',
        variant31: 'Разворот с оглядкой', variant32: 'Живучий шёпот', variant33: 'Юркая и голосистая',
        variant34: 'Голосовая прыть', variant35: 'Быстрый хохот, гробовая тишина'
    },
    // Свалявшаяся — ком: свалка, колтун, ком, хлёст, шерсть.
    enem4: {
        variant1: 'Колтунный кураж', variant2: 'Свалочная хватка', variant3: 'Ком-таран',
        variant4: 'Свалявшийся напор', variant5: 'Меткий хлёст', variant6: 'Бешеный хлёст',
        variant7: 'Свалявшийся норов', variant8: 'Крепкий колтун', variant9: 'Ударный ком',
        variant10: 'Живучая свалка', variant11: 'Колючий колтун', variant12: 'Хлёст и в темноту',
        variant13: 'Толстый колтун', variant14: 'Неутомимый хлёст', variant15: 'Пружинистый хлёст',
        variant16: 'Острый колтун, зоркий глаз', variant17: 'Свалочная удача', variant18: 'Верный хлёст',
        variant19: 'Молниеносный хлёст', variant20: 'Свалочный нюх', variant21: 'Цепкий ком',
        variant22: 'Юркая, несмотря на вес', variant23: 'Свалочная стойкость', variant24: 'Долгий хлёст, зоркий глаз',
        variant25: 'Ускользающий хлёст', variant26: 'Дикий хлёст', variant27: 'Стойкий колтун',
        variant28: 'Хлёст наповал', variant29: 'Крепкая свалявшаяся', variant30: 'Колтунная мощь',
        variant31: 'Хлёст с оглядкой', variant32: 'Живучий колтун', variant33: 'Юркая и колтунная',
        variant34: 'Свалочная прыть', variant35: 'Быстрый хлёст, крепкий колтун'
    },
    // Кудельная — сырое волокно: куделя, лён, размотка, нить без конца.
    enem5: {
        variant1: 'Кудельный кураж', variant2: 'Льняная хватка', variant3: 'Волокно-таран',
        variant4: 'Размоточный напор', variant5: 'Меткая размотка', variant6: 'Бешеная размотка',
        variant7: 'Кудельный норов', variant8: 'Крепкое волокно', variant9: 'Ударная размотка',
        variant10: 'Живучий лён', variant11: 'Колючее волокно', variant12: 'Размотка и в темноту',
        variant13: 'Толстая куделя', variant14: 'Неутомимая размотка', variant15: 'Пружинистая размотка',
        variant16: 'Острое волокно, зоркий глаз', variant17: 'Кудельная удача', variant18: 'Верная размотка',
        variant19: 'Молниеносная размотка', variant20: 'Льняной нюх', variant21: 'Цепкое волокно',
        variant22: 'Юркая, несмотря на массу', variant23: 'Кудельная стойкость', variant24: 'Долгая размотка, зоркий глаз',
        variant25: 'Ускользающая размотка', variant26: 'Дикая размотка', variant27: 'Стойкий лён',
        variant28: 'Размотка наповал', variant29: 'Крепкая кудельная', variant30: 'Льняная мощь',
        variant31: 'Размотка с оглядкой', variant32: 'Живучее волокно', variant33: 'Юркая и кудельная',
        variant34: 'Кудельная прыть', variant35: 'Быстрая размотка, крепкое волокно'
    }
};
