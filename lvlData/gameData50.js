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
			// Кикимора: SPINDLE_ARC — плавные атаки по дуге, наматывает нить на невидимое веретено
			movementStyle: 'pause', cadence: 1.03, telegraphMs: 900, speedMultiplier: 0.95, damageMultiplier: 0.92,
			speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Кто оставил кудель без пригляда?!',
			phaseMessages: { 2: 'Спутаю всё, что плохо лежит!', 3: 'Ни одна нить не уйдёт от меня!' }
		}, // Кикимора: SPINDLE_ARC — плавные атаки по дуге, наматывает нить на невидимое веретено
		enem2: {
			// Спутанная: SNATCH_TANGLE — быстрые хватающие рывки, как выдёргивание запутанной нити
			movementStyle: 'weave', cadence: 0.95, telegraphMs: 800, speedMultiplier: 1.02, damageMultiplier: 0.98,
			speedVariance: [0.88, 0.96, 1.04, 1.12, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Ты сам себя запутал!',
			phaseMessages: { 2: 'Нити крепче, чем кажется!', 3: 'Не развяжешь — не уйдёшь!' }
		}, // Спутанная: SNATCH_TANGLE — быстрые хватающие рывки, как выдёргивание запутанной нити
		enem3: {
			// Клохчущая: OMEN_HUSH — аномально долгая тишина вместо кудахтанья, затем резкий удар
			movementStyle: 'pause', cadence: 1.17, telegraphMs: 1050, speedMultiplier: 0.80, damageMultiplier: 1.19,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12], healthMultiplier: 1.50,
			appearMessage: 'Слышишь, как я хохочу?',
			phaseMessages: { 2: 'Тишина — это ты меня не услышал!', 3: 'Последний смех — за мной!' }
		}, // Клохчущая: OMEN_HUSH — аномально долгая тишина вместо кудахтанья, затем резкий удар
		enem4: {
			// Свалявшаяся: MATTED_LASH — свалявшийся ком гривы хлещет непредсказуемо во все стороны
			movementStyle: 'drift', cadence: 0.86, telegraphMs: 680, speedMultiplier: 1.12, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24], healthMultiplier: 1.50,
			appearMessage: 'Уже не распутать!',
			phaseMessages: { 2: 'Свалялась намертво!', 3: 'Последний узел — твой!' }
		}, // Свалявшаяся: MATTED_LASH — свалявшийся ком гривы хлещет непредсказуемо во все стороны
		enem5: {
			// Кудельная: FULL_UNRAVEL — самая длинная нить-цепь всего боя + тяжёлый удар валька
			movementStyle: 'lateRush', cadence: 0.80, telegraphMs: 1040, speedMultiplier: 1.05, damageMultiplier: 1.12,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20], healthMultiplier: 1.50,
			appearMessage: 'Вся я — один клубок ярости!',
			phaseMessages: { 2: 'Пряжа рвётся — и я с ней!', 3: 'Последняя нить оборвётся на тебе!' }
		} // Кудельная: FULL_UNRAVEL — самая длинная нить-цепь всего боя + тяжёлый удар валька
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Кикимора: SPINDLE_ARC — плавная дуга слева направо, будто
	// наматывает нить на невидимое веретено, спокойный темп знакомства =====
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0  дуга: левый край
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1  дуга: левая треть
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2  дуга: вершина
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3  дуга: правая треть
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4  дуга: правый край
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //13 — нежданчик: дуга вдруг рвётся обратным рывком с середины
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — ровная нить в одну сторону, дважды
	// (diagonal+diagonal), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //21 цепь-B звено 3

	// ===== Спутанная: SNATCH_TANGLE — быстрые хватающие рывки, как
	// выдёргивание запутанной нити =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: двойной рывок с одной стороны вместо чередования
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 2 },  //15
	// звенья «атакующей цепи» — хаотичное спутывание вперемешку с прямым
	// уколом (irregular+irregular), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Клохчущая: OMEN_HUSH — аномально долгая тишина вместо
	// привычного кудахтанья, затем один резкий закручивающий удар =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: удар прилетает РАНЬШЕ привычной долгой тишины
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — дуга закручивающегося разворота, дважды
	// (arc+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //22 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //23 цепь-B звено 5

	// ===== Свалявшаяся: MATTED_LASH — свалявшийся ком гривы хлещет
	// непредсказуемо во все стороны разом =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: ком хлещет одновременно с двух сторон разом
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — резкий зигзаг спутанной массы, эскалация
	// хаотичности с уроном (zigzag+zigzag), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //25 цепь-B звено 6

	// ===== Кудельная: FULL_UNRAVEL — самая длинная нить-цепь всего боя +
	// тяжёлый прямой удар валька как кульминация =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: валёк бьёт без единого мгновения предупреждения
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — самая длинная и хаотичная нить всего боя,
	// полностью размотавшийся клубок (irregular+irregular), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова, длина 7)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //26 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //27 цепь-B звено 7
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5600 }, // спокойное наматывание нити
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 6200 }, // короткая атака, долгая пауза — суть SNATCH_TANGLE
	{ boss: 'enem3', bossDelayAb: 390, bossDelayAbDop: 6600 }, // самый долгий отдых — гробовая тишина
	{ boss: 'enem4', bossDelayAb: 200, bossDelayAbDop: 3800 }, // самый частый — стихийное дёрганье без передышки
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 5200 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Кикимора — SPINDLE_ARC
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: дуга вдруг рвётся обратным рывком с середины
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: полная дуга слева направо разом

	// Спутанная — SNATCH_TANGLE
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной рывок с одной стороны
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия хватающих рывков по всему полю подряд

	// Клохчущая — OMEN_HUSH
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: удар раньше привычной долгой тишины
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: закручивающий удар с обеих сторон разом

	// Свалявшаяся — MATTED_LASH
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [6, 7, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (6)
	{ boss: 'enem4', indexAbilities: [13, 10] }, // нежданчик: ком хлещет с двух сторон разом
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: хаотичный хлёст на полной скорости через всё поле

	// Кудельная — FULL_UNRAVEL, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10] },
	{ boss: 'enem5', indexAbilities: [13, 14] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], isChain: true }, // ← цепь-B (7, максимум)
	{ boss: 'enem5', indexAbilities: [11, 12] }, // нежданчик: удар валька без единого мгновения предупреждения
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 9, 1, 3, 10, 15] }, // сигнатурная кульминация: последняя нить рвётся по всему полю разом, предваряется самым долгим телеграфом уровня (telegraphMs 1040)
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
