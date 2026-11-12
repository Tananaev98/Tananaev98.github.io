// Уровень 58 «Скотный двор» — двадцатый уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51-54/56-57).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 285 строк, уровни 1-57 (включая свежую
// историю уровня 57).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl58/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — пятнистый телёнок: солома в шерсти и на макушке, малые рожки-
//   бугорки, крупные когти, приземистая ПРУЖИНИСТАЯ поза — играет, а не
//   охотится, но лапы уже опасные.
// 2.webp — круторогий баран: тяжёлые закрученные рога, косматая белая
//   шерсть, широкая низкая стойка — весь силуэт заточен под ОДНО прямое
//   действие: удар рогами в лоб.
// 3.webp — бодливая коза: длинные откинутые назад рога, реденькая бородка,
//   хитрый прищур и ухмылка — не таранит в лоб как баран, а лукаво метит
//   исподтишка.
// 4.webp — буйный хряк: грязно-бурая щетина, длинные кривые клыки, доска
//   от изгороди застряла на загривке — крушит всё сплошным напролом,
//   вспышками неконтролируемой ярости.
// 5.webp (финал) — чёрный племенной бык: самый крупный силуэт, острые
//   прямые рога, МЕДНОЕ КОЛЬЦО в носу (прямая деталь идеи-документа) —
//   символ порванного контроля: то, что раньше держало его на привязи,
//   теперь висит просто так, пока он крушит двор.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА — реальное поведение каждого животного, не общий шаблон роли:
// телёнок ещё играет и неуклюже прыгает (детская энергия) → баран бьёт
// строго прямо и предсказуемо (лобовой таран) → коза хитрит и финтит,
// прежде чем боднуть (упрямая смекалка) → хряк крушит сплошным напролом
// без разбора (слепая ярость) → бык объединяет мощь и контроль, СОРВАВШИЙСЯ
// с кольца (финал — сила, которую больше никто не держит).
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные клички самих животных):
// Топотун (от «топотать» — детский неуклюжий топот телёнка); Бодалень (от
// «бодать» — прямой таранный удар барана); Бородань (от «борода» — реденькая
// бородка козы, а не словарное «козёл»/«упрямец»); Клычень (от «клык» —
// кривые клыки хряка, а не словарное «хряк»/«кабан»); Кольценос (составное
// изобретённое слово — медное кольцо в носу быка, ключевая деталь идеи-
// документа).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-57: Топотун —
// weave (неуклюжее виляние ещё не окрепших ног) 9%→10%, самый низкий бакет
// роли; Бодалень — straight (лобовой таран без единого финта) 12%→13%,
// самый низкий бакет роли; Бородань — weave (хитрое виляние перед ложным
// выпадом) 12%→13%; Клычень — lateRush (внезапный рывок ярости из ниоткуда)
// 14%→15%; Кольценос — accelerate (неудержимо набирает разгон, сорвавшись с
// кольца) 16%→17%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (см. урок уровня 56,
// закреплённый на уровне 57 — пары проверяются ДО записи файла): Топотун —
// zigzag(4)+zigzag(5): неуклюжий детский топот мечется туда-сюда, во второй
// связке ещё шире и увереннее (пара с нулевой историей для enem1); Бодалень
// — vertical(3)+vertical(4): два прямых лобовых удара подряд с разных точек
// — предсказуемость барана буквально в повторе одной и той же прямой формы
// (пара с нулевой историей для enem2, повтор формы — сознательный приём, как
// у Домового/Одичавшего на уровне 55); Бородань — diagonal(4)+irregular(5):
// подход по диагонали как обманный манёвр, затем непредсказуемый бросок —
// коза хитрит (пара с нулевой историей для enem3); Клычень — arc(4)+
// irregular(5): широкий удар клыками с разворота, затем неуправляемый
// рывок напролом (пара с нулевой историей для enem4); Кольценос — arc(4)+
// arc(6): широкий взмах рогами с одной стороны, затем ещё шире с другой —
// круговой снос всего, что попадается (пара с нулевой историей для enem5;
// длина ограничена 6 звеньями, а не историческим максимумом 7 — раздел
// 13.5 «половина самой длинной цепи» у Милы/Елисея упирается в потолок
// именно на 7-м звене при текущих постоянных статах врагов области, см.
// комментарий уровня 57 в lvlData/areas.js). Формы всех пяти пар
// подтверждены живым классификатором панели ПОСЛЕ записи файла (verify58.js
// + STEP 2), не только ручным расчётом.
let lvlNumber = 58;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.75, damageMultiplier: 1.782, minWaveDelay: 4950, minShotDelay: 106, minTelegraphMs: 553,
	phases: [
		{ phase: 1, minHp: 0.696, cadence: 0.963, speed: 1.048, damage: 1, telegraphMultiplier: 1.04, surpriseChance: 0.116, maxActiveAttacks: 35 },
		{ phase: 2, minHp: 0.347, cadence: 0.797, speed: 1.183, damage: 1.12, telegraphMultiplier: 0.876, surpriseChance: 0.216, maxActiveAttacks: 39 },
		{ phase: 3, minHp: 0, cadence: 0.633, speed: 1.294, damage: 1.22, telegraphMultiplier: 0.775, surpriseChance: 0.316, maxActiveAttacks: 43 }
	],
	bosses: {
		enem1: { combatIdentity: "Передний топот и незавершённый задний удар", combatTrick: "Топот через близкие точки заканчивается отдельным задним ударом и подхватом. Ошибка — бить после передних копыт, не закончив заднюю часть топота.", signatureEvery: 3, movementStyle: 'weave', cadence: 0.994, telegraphMs: 956, speedMultiplier: 1.036, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Лобовой разбег и повторный нажим рогов", combatTrick: "После первого лобового контакта остаётся повторный нажим группы рогов. Ошибка — бить после первого контакта либо метаться на каждый рог вместо завершения нажима.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 1.011, telegraphMs: 868, speedMultiplier: 1.052, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Задержанный бодок и обратный рог", combatTrick: "Задержанный бодок пропускает вперёд другой контакт и возвращает старую угрозу. Ошибка — бить в заминке или уйти за первым быстрым рогом, не закончив обратный.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.829, telegraphMs: 1076, speedMultiplier: 1.022, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Прорыв дернины перекрыт быстрыми клыками", combatTrick: "Более долгий прорыв дернины перекрывается быстрыми клыками. Ошибка — вести прицел только за клыками, забыв незавершённый прорыв.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.972, telegraphMs: 839, speedMultiplier: 1.075, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Подкоп, фронт рогов и завершающий снос плечом", combatTrick: "Подкоп и фронт рогов заканчиваются сносом плечом. Короткая ветка меняет привычное начало без длинного подкопа. Ошибка — бить после первых рогов либо ждать подкоп, когда начался короткий приём.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.951, telegraphMs: 1005, speedMultiplier: 1.088, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl58/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl58/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl58/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl58/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl58/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Топотун',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/1.webp',
        baseHP: 14708,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Бодалень',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/2.webp',
        baseHP: 36769,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Бородань',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/3.webp',
        baseHP: 65054,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Клычень',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/4.webp',
        baseHP: 104651,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Кольценос',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/5.webp',
        baseHP: 158391,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 21;
 const bossInterval = 24;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Топотун =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.27 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.27 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.27 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.77 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.77 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.27 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.27 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.27 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.77 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.77 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.33 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.27 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.27 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.27 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.77 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.77 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.33 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.27 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.27 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.27 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.77 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.77 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 24 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.33 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.27 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.27 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.27 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.77 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.77 }, // 30 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 31 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.87 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.62 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 34 f
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.12 }, // 35 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.87 }, // 36 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.33 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.27 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.27 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.27 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.77 }, // 41 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.77 }, // 42 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 43 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.47 }, // 44 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.33 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.27 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.27 }, // 47 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.27 }, // 48 h
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.77 }, // 49 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.77 }, // 50 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.97 }, // 51 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.47 }, // 52 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.97 }, // 53 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.72 }, // 54 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.47 }, // 55 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.22 }, // 56 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.97 }, // 57 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.72 }, // 58 i

	// ===== Бодалень =====
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.53 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.53 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.35 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.53 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.35 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.53 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.35 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.53 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.71 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.46 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.21 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.35 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.53 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.913 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.35 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.53 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.81 }, // 45 i
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.56 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.31 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.06 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.81 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.56 }, // 50 i

	// ===== Бородань =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.37 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.193 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.27 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.47 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.37 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.77 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.27 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.47 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.37 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.77 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.27 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.47 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.37 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.173 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.27 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.47 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.37 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.77 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.27 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.47 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.61 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.36 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.11 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.37 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.77 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.27 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.47 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.97 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.37 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.77 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.27 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.47 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.97 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.71 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.46 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.21 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.96 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.71 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.46 }, // 59 i

	// ===== Клычень =====
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.39 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.519 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.79 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.99 }, // 6 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.19 }, // 7 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.39 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.49 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.79 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.547 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 12 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.513 }, // 13 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.99 }, // 14 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.19 }, // 15 b
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.39 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.693 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.79 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 19 c
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 20 c
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 21 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.99 }, // 22 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.19 }, // 23 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.39 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.49 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.49 }, // 26 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.593 }, // 27 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 28 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.537 }, // 29 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.99 }, // 30 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.19 }, // 31 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.39 }, // 32 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.49 }, // 33 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.49 }, // 34 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.637 }, // 35 e
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 36 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.563 }, // 37 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.99 }, // 38 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.19 }, // 39 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.37 }, // 40 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.12 }, // 41 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.87 }, // 42 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.62 }, // 43 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.37 }, // 44 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.39 }, // 45 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.49 }, // 46 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.49 }, // 47 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 48 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 49 g
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 50 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.99 }, // 51 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.19 }, // 52 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.39 }, // 53 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.39 }, // 54 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.49 }, // 55 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.49 }, // 56 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.683 }, // 57 h
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 58 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.587 }, // 59 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.99 }, // 60 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.19 }, // 61 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.39 }, // 62 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.47 }, // 63 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.22 }, // 64 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.97 }, // 65 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.72 }, // 66 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.47 }, // 67 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.22 }, // 68 i

	// ===== Кольценос =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.41 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.63 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.83 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.41 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.63 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.83 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.41 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.63 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.83 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.41 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.63 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.83 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.41 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.63 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.83 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.31 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.06 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.81 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.56 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.31 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.06 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.41 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.63 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.83 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 54 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.41 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.63 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.83 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 63 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.41 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.16 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.91 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.66 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.41 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.16 }, // 69 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.91 }, // 70 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.93 }, // 71 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.13 }, // 72 j
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.13 }, // 73 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.63 }, // 74 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.23 }, // 75 j
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.43 }, // 76 j

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 186, bossDelayAbDop: 13100, firstWaveDelayMs: 2750 }, // Передний топот и незавершённый задний удар
	{ boss: 'enem2', bossDelayAb: 154, bossDelayAbDop: 11500, firstWaveDelayMs: 2750 }, // Лобовой разбег и повторный нажим рогов
	{ boss: 'enem3', bossDelayAb: 187, bossDelayAbDop: 17600, firstWaveDelayMs: 2750 }, // Задержанный бодок и обратный рог
	{ boss: 'enem4', bossDelayAb: 194, bossDelayAbDop: 15600, firstWaveDelayMs: 2750 }, // Прорыв дернины перекрыт быстрыми клыками
	{ boss: 'enem5', bossDelayAb: 184, bossDelayAbDop: 17300, firstWaveDelayMs: 2750 }, // Подкоп, фронт рогов и завершающий снос плечом
];

 const bossAbilitiesDop = [
	// Топотун
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [0, 250, 0, 250, 0] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15, 16, 17], shotGapsMs: [500, 0, 500, 0, 500, 250] },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22, 23, 24], shotGapsMs: [500, 0, 500, 0, 500, 0] },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29, 30, 31], shotGapsMs: [250, 0, 0, 500, 500, 250] },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 351, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Передний топот и незавершённый задний удар — знакомство" },
	{ boss: 'enem1', indexAbilities: [37, 38, 39, 40, 41, 42, 43, 44], minPhase: 2, shotGapsMs: [500, 0, 250, 0, 500, 0, 0] },
	{ boss: 'enem1', indexAbilities: [45, 46, 47, 48, 49, 50, 51, 52], minPhase: 3, shotGapsMs: [500, 0, 250, 0, 500, 0, 0] },
	{ boss: 'enem1', indexAbilities: [53, 54, 55, 56, 57, 58], signature: true, isChain: true, minPhase: 3, shotDelayMs: 381, shotGapsMs: [0, 0, 0, 0, 0], label: "Передний топот и незавершённый задний удар — завершение" },

	// Бодалень
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 500, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [250, 0, 250, 0] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 250, 0, 250] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [500, 0, 250, 0, 0] },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [500, 0, 250, 0, 500] },
	{ boss: 'enem2', indexAbilities: [28, 29, 30], signature: true, isChain: true, shotDelayMs: 357, shotGapsMs: [0, 0], openingOrder: 1, label: "Лобовой разбег и повторный нажим рогов — знакомство" },
	{ boss: 'enem2', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [500, 0, 250, 0, 500, 500] },
	{ boss: 'enem2', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [500, 0, 0, 0, 500, 250] },
	{ boss: 'enem2', indexAbilities: [45, 46, 47, 48, 49, 50], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [0, 0, 0, 0, 0], label: "Лобовой разбег и повторный нажим рогов — завершение" },

	// Бородань
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 0, 0, 500, 0, 500], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [0, 250, 0, 500, 0, 250] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [0, 500, 0, 250, 0, 250] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [250, 0, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [35, 36, 37], signature: true, isChain: true, shotDelayMs: 407, shotGapsMs: [0, 0], openingOrder: 1, label: "Задержанный бодок и обратный рог — знакомство" },
	{ boss: 'enem3', indexAbilities: [38, 39, 40, 41, 42, 43, 44, 45], minPhase: 2, shotGapsMs: [0, 0, 0, 500, 0, 0, 250] },
	{ boss: 'enem3', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53], minPhase: 3, shotGapsMs: [0, 250, 0, 250, 0, 500, 500] },
	{ boss: 'enem3', indexAbilities: [54, 55, 56, 57, 58, 59], signature: true, isChain: true, minPhase: 3, shotDelayMs: 419, shotGapsMs: [0, 0, 0, 0, 0], label: "Задержанный бодок и обратный рог — завершение" },

	// Клычень
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [0, 500, 250, 0, 500, 0, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [0, 0, 500, 0, 500, 0, 250] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 0, 0, 250, 500, 500] },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27, 28, 29, 30, 31], shotGapsMs: [500, 0, 500, 0, 250, 0, 250] },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39], shotGapsMs: [0, 500, 0, 0, 500, 0, 250] },
	{ boss: 'enem4', indexAbilities: [40, 41, 42, 43, 44], signature: true, isChain: true, shotDelayMs: 367, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Прорыв дернины перекрыт быстрыми клыками — знакомство" },
	{ boss: 'enem4', indexAbilities: [45, 46, 47, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [0, 0, 250, 0, 500, 0, 500, 250] },
	{ boss: 'enem4', indexAbilities: [54, 55, 56, 57, 58, 59, 60, 61, 62], minPhase: 3, shotGapsMs: [0, 250, 500, 0, 250, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [63, 64, 65, 66, 67, 68], signature: true, isChain: true, minPhase: 3, shotDelayMs: 389, shotGapsMs: [0, 0, 0, 0, 0], label: "Прорыв дернины перекрыт быстрыми клыками — завершение" },

	// Кольценос
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [0, 0, 500, 0, 500, 0, 500], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 500, 0, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 0, 0, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29, 30, 31], shotGapsMs: [500, 250, 500, 0, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39], shotGapsMs: [500, 0, 500, 0, 500, 0, 0] },
	{ boss: 'enem5', indexAbilities: [40, 41, 42, 43, 44, 45], signature: true, isChain: true, shotDelayMs: 377, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Подкоп, фронт рогов и завершающий снос плечом — знакомство" },
	{ boss: 'enem5', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53, 54], minPhase: 2, shotGapsMs: [250, 250, 250, 0, 500, 0, 500, 0] },
	{ boss: 'enem5', indexAbilities: [55, 56, 57, 58, 59, 60, 61, 62, 63], minPhase: 3, shotGapsMs: [0, 250, 500, 0, 250, 0, 500, 0] },
	{ boss: 'enem5', indexAbilities: [64, 65, 66, 67, 68, 69, 70], signature: true, isChain: true, minPhase: 3, shotDelayMs: 401, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Подкоп, фронт рогов и завершающий снос плечом — завершение" },
	{ boss: 'enem5', indexAbilities: [71, 72, 73, 74, 75, 76], minPhase: 2, shotGapsMs: [0, 0, 250, 0, 250] },

];

// Лорные названия связок временных улучшений — пять разных животных
// одного скотного двора, словарь каждого строго завязан на его реальное
// поведение (правило 12.1): телёнок топочет и прыгает, баран таранит в
// лоб, коза хитрит и виляет, хряк крушит клыками напролом, а бык рвётся
// с кольца на полном разгоне. Полных совпадений фраз между монстрами нет
// (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Топотун — резвый телёнок: солома, топот, прыть, рожки.
    enem1: {
        variant1: 'Соломенный кураж', variant2: 'Телячья хватка', variant3: 'Рожки-таран',
        variant4: 'Резвый напор', variant5: 'Меткий топот', variant6: 'Бешеный топот',
        variant7: 'Телячий норов', variant8: 'Крепкое копытце', variant9: 'Ударный топот',
        variant10: 'Живучая солома', variant11: 'Колючий рожок', variant12: 'Топот и в темноту',
        variant13: 'Толстая солома', variant14: 'Неутомимый топот', variant15: 'Пружинистый топот',
        variant16: 'Соломенный вихор, зоркий глаз', variant17: 'Телячья удача', variant18: 'Верный топот',
        variant19: 'Молниеносный топот', variant20: 'Телячий нюх', variant21: 'Цепкое копытце',
        variant22: 'Юркий, несмотря на возраст', variant23: 'Телячья стойкость', variant24: 'Долгий скок, зоркий глаз',
        variant25: 'Ускользающий топот', variant26: 'Дикий топот', variant27: 'Стойкая солома',
        variant28: 'Топот наповал', variant29: 'Крепкий топотун', variant30: 'Резвая мощь',
        variant31: 'Топот с оглядкой', variant32: 'Живучее копытце', variant33: 'Юркий и телячий',
        variant34: 'Телячья прыть', variant35: 'Быстрый топот, крепкое копытце'
    },
    // Бодалень — круторогий баран: рога, лоб, шерсть, таран.
    enem2: {
        variant1: 'Рогатый кураж', variant2: 'Лобовая хватка', variant3: 'Рога-таран',
        variant4: 'Таранный напор', variant5: 'Меткий удар лбом', variant6: 'Бешеный удар лбом',
        variant7: 'Рогатый норов', variant8: 'Крепкий лоб', variant9: 'Ударный таран',
        variant10: 'Живучая шерсть', variant11: 'Колючий завиток', variant12: 'Таран и в темноту',
        variant13: 'Толстая шерсть', variant14: 'Неутомимый таран', variant15: 'Пружинистый таран',
        variant16: 'Крутой завиток, зоркий глаз', variant17: 'Рогатая удача', variant18: 'Верный таран',
        variant19: 'Молниеносный таран', variant20: 'Рогатый нюх', variant21: 'Цепкий завиток',
        variant22: 'Юркий, несмотря на рога', variant23: 'Рогатая стойкость', variant24: 'Долгий разбег, зоркий глаз',
        variant25: 'Ускользающий таран', variant26: 'Дикий таран', variant27: 'Стойкая шерсть',
        variant28: 'Таран наповал', variant29: 'Крепкий бодалень', variant30: 'Таранная мощь',
        variant31: 'Таран с оглядкой', variant32: 'Живучий лоб', variant33: 'Юркий и рогатый',
        variant34: 'Рогатая прыть', variant35: 'Быстрый таран, крепкий лоб'
    },
    // Бородань — бодливая коза: бородка, хитрость, финт, упрямство.
    enem3: {
        variant1: 'Бородатый кураж', variant2: 'Хитрая хватка', variant3: 'Финт-таран',
        variant4: 'Упрямый напор', variant5: 'Меткий выпад', variant6: 'Бешеный выпад',
        variant7: 'Бородатый норов', variant8: 'Крепкая бородка', variant9: 'Ударный выпад',
        variant10: 'Живучая хитрость', variant11: 'Колючая бородка', variant12: 'Выпад и в темноту',
        variant13: 'Толстая бородка', variant14: 'Неутомимый выпад', variant15: 'Пружинистый выпад',
        variant16: 'Хитрый прищур, зоркий глаз', variant17: 'Бородатая удача', variant18: 'Верный выпад',
        variant19: 'Молниеносный выпад', variant20: 'Бородатый нюх', variant21: 'Цепкая бородёнка',
        variant22: 'Юркий, несмотря на упрямство', variant23: 'Бородатая стойкость', variant24: 'Долгий финт, зоркий глаз',
        variant25: 'Ускользающий выпад', variant26: 'Дикий выпад', variant27: 'Стойкая бородка',
        variant28: 'Выпад наповал', variant29: 'Крепкий бородань', variant30: 'Хитрая мощь',
        variant31: 'Выпад с оглядкой', variant32: 'Живучая бородка', variant33: 'Юркий и бородатый',
        variant34: 'Бородатая прыть', variant35: 'Быстрый выпад, крепкая бородка'
    },
    // Клычень — буйный хряк: клыки, щетина, грязь, ярость.
    enem4: {
        variant1: 'Клыкастый кураж', variant2: 'Щетинистая хватка', variant3: 'Клык-таран',
        variant4: 'Яростный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Клыкастый норов', variant8: 'Крепкая щетина', variant9: 'Ударный рывок',
        variant10: 'Живучая грязь', variant11: 'Колючая щетина', variant12: 'Рывок и в темноту',
        variant13: 'Толстая щетина', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Кривой клык, дикий взгляд', variant17: 'Клыкастая удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Клыкастый нюх', variant21: 'Цепкий клык',
        variant22: 'Юркий, несмотря на тушу', variant23: 'Клыкастая стойкость', variant24: 'Долгий разгон, дикий взгляд',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкая щетина',
        variant28: 'Рывок наповал', variant29: 'Крепкий клычень', variant30: 'Яростная мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая щетина', variant33: 'Юркий и клыкастый',
        variant34: 'Яростная прыть', variant35: 'Быстрый рывок, крепкий клык'
    },
    // Кольценос — чёрный племенной бык: кольцо, рога, разгон, воля.
    enem5: {
        variant1: 'Кольцевой кураж', variant2: 'Медная хватка', variant3: 'Рог-таран',
        variant4: 'Разгонный напор', variant5: 'Меткий снос', variant6: 'Бешеный снос',
        variant7: 'Кольцевой норов', variant8: 'Крепкое кольцо', variant9: 'Ударный снос',
        variant10: 'Живучий разгон', variant11: 'Колючий рог', variant12: 'Снос и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый снос', variant15: 'Пружинистый снос',
        variant16: 'Порванное кольцо, дикий взор', variant17: 'Кольцевая удача', variant18: 'Верный снос',
        variant19: 'Молниеносный снос', variant20: 'Кольцевой нюх', variant21: 'Цепкий рог',
        variant22: 'Юркий, несмотря на массу', variant23: 'Кольцевая стойкость', variant24: 'Долгий замах, раскалённый взор',
        variant25: 'Ускользающий снос', variant26: 'Дикий снос', variant27: 'Стойкая шкура',
        variant28: 'Снос наповал', variant29: 'Крепкий кольценос', variant30: 'Разгонная мощь',
        variant31: 'Снос с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и кольцевой',
        variant34: 'Разгонная прыть', variant35: 'Быстрый снос, крепкое кольцо'
    }
};
