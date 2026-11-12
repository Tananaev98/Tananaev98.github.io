// Уровень 54 «Крыльцо» — четырнадцатый уровень области V, обычный (пять
// разных монстров, как 41-44/46-49/51-53). Последний обычный уровень перед
// многофазным уровнем 55 (Домовой).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 265 строк, уровни 1-53.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl54/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — плоская доска-ступень, пасть-трещина во всю длину, гвоздь
//   торчит из спины, низкая горизонтальная стойка. Архетип — короткий
//   скрип-телеграф, затем внезапный ОДИН хлопок пасти снизу (роль enem1,
//   знакомство) — сверено: CREAK_SNAP новый.
// 2.webp — медное дверное кольцо-колотушка, зажатое в зверином оскале.
//   Обоснование скорости роли: сама природа колотушки — частый повторный
//   стук по ОДНОЙ точке (двери), не перемещение. Архетип — очень частые
//   повторные удары почти в одну и ту же точку, ритм стука (роль enem2,
//   быстрые серии) — сверено: KNOCK_RAPID новый.
// 3.webp — резная лавка на четырёх точёных ножках. Архетип — редкие
//   тяжёлые удары ПАРАМИ ног (передние две, затем задние две), долгое
//   накопление хода между ударами — устойчивая четвероногая поступь,
//   буквально то, чем лавка и является (роль enem3) — сверено:
//   FOUR_LEG_STOMP новый.
// 4.webp — одноглазый дозорный со щитом-воротником и длинным копьём.
//   Архетип — цикл «высматривает» (короткая пауза-обзор) → точный быстрый
//   укол копьём туда, куда «смотрел» глаз — вигильная точность, а не
//   хаос (роль enem4, нервный) — сверено: SENTRY_JAB новый; отличен от
//   HAWKER_BARRAGE Горлопана (53, несмолкающий поток) и WIND_FLAP Драняка
//   (51, порыв-затишье) тем, что здесь ритм задаёт наблюдение и прицел, а
//   не выносливость или ветер.
// 5.webp — резной конёк с крыши, четвероногая лошадиная стойка с гребнем
//   вдоль спины, самая динамичная поза уровня. Обоснование финала: это
//   первый по-настоящему БЕГУЩИЙ противник уровня (доска, кольцо, лавка и
//   дозорный статичны или переступают на месте) — конёк в буквальном
//   смысле скачет. Архетип — стремительный галоп через ВСЮ ширину поля
//   одним неразрывным проходом, с ритмом ударов копыт по пути (роль
//   enem5, финал) — сверено: GALLOP_CHARGE новый, отличен от WHEEL_ROTATION
//   Вертеня (52) и SEAL_AND_DECREE Печатника (53) — оба про точки на месте
//   или вращение, здесь — единственный на уровне сквозной пробег.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-53 (все роли
// ≤23% до этого уровня): Скрипень — accelerate (скрип ускоряется в хлопок)
// 11%→13.5%; Бряцало — lateRush (стук рвётся вперёд) 15%→17.6%; Скамейник —
// straight (устойчивая прямая четвероногая поступь) 13%→15.8%; Глазок —
// drift (взгляд скользит, высматривая) 15%→17.6%; Стрешень — lateRush
// (разгон в галоп) 17%→18.9%.
//
// ЦЕПИ (13.6/13.7) — форма выбрана ИЗ образа и сверена с полным
// распределением: Скрипень — diagonal(3)+arc(4): трещина ведёт в одну
// сторону, затем дугой захлопывается (у enem1 обе были 19% — низкие, ЧИНЯТ
// пограничный vertical 23%, доля падает до 21.4%); Бряцало —
// zigzag(4)+irregular(5): кольцо мечется от стука зигзагом, затем хаотично
// дребезжит (у enem2 обе были 19% — низкие, ЧИНЯТ пограничный vertical 23%,
// доля падает до 21.4%); Скамейник — vertical(3)+arc(4): передние ноги
// бьют по одной оси, задние — дугой следом (у enem3 обе были 19% — низкие,
// ЧИНЯТ пограничный diagonal 23%, доля падает до 21.4%); Глазок —
// zigzag(4)+irregular(5): копьё дёргается зигзагом высматривания, затем
// непредсказуемый укол (у enem4 обе были 19% — низкие, ЧИНЯТ пограничный
// diagonal 23%, доля падает до 21.4%); Стрешень — vertical(3)+diagonal(4):
// копыта бьют по одной оси на разгоне, затем прямой галоп в сторону (у
// enem5 обе были 19% — низкие, ЧИНЯТ пограничный zigzag 23%, доля падает
// до 21.4%).
let lvlNumber = 54;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.745, damageMultiplier: 1.782, minWaveDelay: 4700, minShotDelay: 107, minTelegraphMs: 543,
	phases: [
		{ phase: 1, minHp: 0.691, cadence: 0.969, speed: 1.041, damage: 1, telegraphMultiplier: 1.036, surpriseChance: 0.111, maxActiveAttacks: 31 },
		{ phase: 2, minHp: 0.341, cadence: 0.774, speed: 1.175, damage: 1.12, telegraphMultiplier: 0.866, surpriseChance: 0.211, maxActiveAttacks: 35 },
		{ phase: 3, minHp: 0, cadence: 0.624, speed: 1.287, damage: 1.22, telegraphMultiplier: 0.766, surpriseChance: 0.311, maxActiveAttacks: 39 }
	],
	bosses: {
		enem1: { combatIdentity: "Раскрытие щепок не отменяет последнего хлопка", combatTrick: "Доска выгибается с заминкой, раскрывается щепками и заканчивает хлопком. Ошибка — атаковать доску после первых щепок, пока раскрытие ещё не завершилось.", signatureEvery: 3, movementStyle: 'pause', cadence: 1.034, telegraphMs: 949, speedMultiplier: 1.031, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Стук удерживает точку до закрытия края пасти", combatTrick: "Несколько ударов кольца идут в одно место. После стука край звериной пасти требует другого ответа. Ошибка — уйти после второго удара или переводить прицел на каждый повтор.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 1.005, telegraphMs: 859, speedMultiplier: 1.064, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Передние и задние ножки, затем перекладина", combatTrick: "Передняя пара ножек не завершает переступание: остаются задняя пара и перекладина. Ошибка — атаковать лавку после первых двух опор.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.819, telegraphMs: 1029, speedMultiplier: 1.021, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Направленная группа уколов до перевода взгляда", combatTrick: "Предупреждение задаёт направление укола, но за ним остаётся повтор и обратный укол. Ошибка — уходить после первого попадания или считать обзор концом группы.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.959, telegraphMs: 819, speedMultiplier: 1.084, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Довести проход копыт до последнего внешнего края", combatTrick: "Копыта передают проход через левые точки в правую середину и внешний край. Первый выход вправо не завершает галоп: остаётся последнее внешнее копыто. Ошибка — вернуться к левому началу до завершения прохода.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.936, telegraphMs: 651, speedMultiplier: 1.092, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl54/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl54/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl54/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl54/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl54/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Скрипень',
        image: 'images/enemies/regions/5_dom_dvor/lvl54/1.webp',
        baseHP: 14620,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Бряцало',
        image: 'images/enemies/regions/5_dom_dvor/lvl54/2.webp',
        baseHP: 36552,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Скамейник',
        image: 'images/enemies/regions/5_dom_dvor/lvl54/3.webp',
        baseHP: 64676,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Глазок',
        image: 'images/enemies/regions/5_dom_dvor/lvl54/4.webp',
        baseHP: 103975,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Стрешень',
        image: 'images/enemies/regions/5_dom_dvor/lvl54/5.webp',
        baseHP: 157453,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 17;
 const bossInterval = 20;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Скрипень =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.73 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.71 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.71 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.71 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.71 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.71 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.73 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.71 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.71 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.71 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.71 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.71 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.73 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.71 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.71 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.71 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.71 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.71 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.73 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.71 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.71 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.71 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.71 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.71 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.73 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.71 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.71 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.71 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.71 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.71 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.83 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.58 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.33 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.08 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.83 }, // 34 f
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.73 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.71 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.71 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.71 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.71 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.71 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.71 }, // 41 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.73 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.71 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.71 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.71 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.71 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.71 }, // 47 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.71 }, // 48 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.93 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.68 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.43 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.18 }, // 52 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.93 }, // 53 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.68 }, // 54 i

	// ===== Бряцало =====
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.13 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.63 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.13 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.13 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.63 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.13 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.75 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.13 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.63 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.13 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.75 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.13 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.63 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.13 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.75 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.13 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.63 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.13 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.75 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.5 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.25 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.03 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.65 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.13 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.63 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.13 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.75 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.63 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.13 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.63 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.13 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.85 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.6 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.35 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.1 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.85 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.6 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.35 }, // 53 i

	// ===== Скамейник =====
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.77 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.91 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.21 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.77 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.91 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.41 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.11 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.85 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.91 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.11 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.77 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.31 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.91 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.11 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.77 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.91 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.11 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.65 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.4 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.15 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.9 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.77 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.91 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.11 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.21 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.77 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.31 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.91 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.91 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.91 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.11 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.21 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.75 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.5 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.25 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.01 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.75 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.5 }, // 60 i

	// ===== Глазок =====
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.77 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.77 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.27 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.27 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.77 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.27 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.27 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.77 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.77 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.27 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.27 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.77 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.27 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.27 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.77 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.77 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.27 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.27 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.97 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.55 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.3 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.05 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.81 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.77 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.77 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.27 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.27 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.27 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.81 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.77 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.77 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.77 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.27 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.27 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.27 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.65 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.4 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.15 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.9 }, // 48 i

	// ===== Стрешень =====
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.57 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.79 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.87 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.87 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.57 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.79 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.87 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.87 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.47 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.79 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.87 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.87 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.79 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.87 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.87 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.87 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.57 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.87 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.79 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.87 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.87 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.67 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.47 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.22 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.97 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.72 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.47 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.67 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.79 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.87 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.87 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.87 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.57 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.79 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.87 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.87 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.87 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.87 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.53 }, // 60 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.28 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.03 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.78 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.53 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.28 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.03 }, // 66 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 182, bossDelayAbDop: 13900, firstWaveDelayMs: 2670 }, // Раскрытие щепок не отменяет последнего хлопка
	{ boss: 'enem2', bossDelayAb: 183, bossDelayAbDop: 11150, firstWaveDelayMs: 2670 }, // Стук удерживает точку до закрытия края пасти
	{ boss: 'enem3', bossDelayAb: 181, bossDelayAbDop: 16701, firstWaveDelayMs: 2670 }, // Передние и задние ножки, затем перекладина
	{ boss: 'enem4', bossDelayAb: 188, bossDelayAbDop: 9000, firstWaveDelayMs: 2670 }, // Направленная группа уколов до перевода взгляда
	{ boss: 'enem5', bossDelayAb: 177, bossDelayAbDop: 15100, firstWaveDelayMs: 2670 }, // Довести проход копыт до последнего внешнего края
];

 const bossAbilitiesDop = [
	// Скрипень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 250, 0, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [500, 250, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [500, 0, 250, 0, 500] },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [250, 0, 500, 500, 0] },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [250, 0, 500, 500, 250] },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 349, shotGapsMs: [0, 0, 0, 0], openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [35, 36, 37, 38, 39, 40, 41], minPhase: 2, shotGapsMs: [0, 250, 0, 0, 250, 0] },
	{ boss: 'enem1', indexAbilities: [42, 43, 44, 45, 46, 47, 48], minPhase: 3, shotGapsMs: [250, 0, 0, 250, 250, 250] },
	{ boss: 'enem1', indexAbilities: [49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 349, shotGapsMs: [0, 0, 0, 0, 0] },

	// Бряцало
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 0, 250] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 0, 500] },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [0, 0, 0, 0, 500] },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [500, 0, 0, 500, 250] },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 349, shotGapsMs: [0, 0, 0], openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [250, 0, 250, 0, 500, 0] },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [250, 250, 250, 250, 500, 0] },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51, 52, 53], signature: true, isChain: true, minPhase: 3, shotDelayMs: 349, shotGapsMs: [0, 0, 0, 0, 0, 0] },

	// Скамейник
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [250, 0, 500, 500, 250, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [500, 250, 0, 250, 250, 0] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [250, 0, 500, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 500, 0, 0, 500, 250] },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38], signature: true, isChain: true, shotDelayMs: 349, shotGapsMs: [0, 0, 0], openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 46], minPhase: 2, shotGapsMs: [250, 250, 250, 0, 250, 0, 0] },
	{ boss: 'enem3', indexAbilities: [47, 48, 49, 50, 51, 52, 53, 54], minPhase: 3, shotGapsMs: [0, 0, 250, 250, 250, 500, 0] },
	{ boss: 'enem3', indexAbilities: [55, 56, 57, 58, 59, 60], signature: true, isChain: true, minPhase: 3, shotDelayMs: 349, shotGapsMs: [0, 0, 0, 0, 0] },

	// Глазок
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 250, 250, 250], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [250, 250, 250, 250] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [0, 0, 250, 0, 250] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 0, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [250, 250, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [28, 29, 30], signature: true, isChain: true, shotDelayMs: 349, shotGapsMs: [0, 0], openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [0, 0, 0, 250, 250, 500] },
	{ boss: 'enem4', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [0, 0, 0, 250, 250, 500] },
	{ boss: 'enem4', indexAbilities: [45, 46, 47, 48], signature: true, isChain: true, minPhase: 3, shotDelayMs: 349, shotGapsMs: [0, 0, 0] },

	// Стрешень
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [0, 0, 250, 250, 620, 100, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14], shotGapsMs: [0, 250, 0, 620, 100, 0] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18, 19, 20, 21, 22], shotGapsMs: [0, 0, 0, 0, 620, 100, 0] },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26, 27, 28, 29], shotGapsMs: [0, 250, 0, 620, 0, 100] },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34, 35, 36, 37, 38], shotGapsMs: [0, 250, 250, 0, 250, 620, 100, 0] },
	{ boss: 'enem5', indexAbilities: [39, 40, 41, 42, 43], signature: true, isChain: true, shotDelayMs: 349, shotGapsMs: [0, 0, 0, 0], openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [44, 45, 46, 47, 48, 49, 50, 51], minPhase: 2, shotGapsMs: [0, 0, 0, 620, 0, 100, 0] },
	{ boss: 'enem5', indexAbilities: [52, 53, 54, 55, 56, 57, 58, 59], minPhase: 3, shotGapsMs: [0, 250, 620, 0, 100, 0, 0] },
	{ boss: 'enem5', indexAbilities: [60, 61, 62, 63, 64, 65, 66], signature: true, isChain: true, minPhase: 3, shotDelayMs: 349, shotGapsMs: [0, 0, 0, 0, 0, 0] },

];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Скрипень — доска-ступень: скрип, трещина, гвоздь, доска, хлопок.
    enem1: {
        variant1: 'Скрипучий кураж', variant2: 'Трещинная хватка', variant3: 'Гвоздь-таран',
        variant4: 'Хлопковый напор', variant5: 'Меткий хлопок', variant6: 'Бешеный хлопок',
        variant7: 'Скрипенев норов', variant8: 'Крепкая доска', variant9: 'Ударный хлопок',
        variant10: 'Живучая трещина', variant11: 'Колючая заноза', variant12: 'Хлопок и в темноту',
        variant13: 'Толстая доска', variant14: 'Неутомимый хлопок', variant15: 'Пружинистый хлопок',
        variant16: 'Острый гвоздь, зоркий глаз', variant17: 'Скрипучая удача', variant18: 'Верный хлопок',
        variant19: 'Молниеносный хлопок', variant20: 'Скрипучий нюх', variant21: 'Цепкая заноза',
        variant22: 'Юркий для своей длины', variant23: 'Дощатая стойкость', variant24: 'Долгий скрип, зоркий глаз',
        variant25: 'Ускользающий хлопок', variant26: 'Дикий хлопок', variant27: 'Стойкая доска',
        variant28: 'Хлопок наповал', variant29: 'Крепкий скрипень', variant30: 'Дощатая мощь',
        variant31: 'Хлопок с оглядкой', variant32: 'Живучая доска', variant33: 'Юркий и скрипучий',
        variant34: 'Дощатая прыть', variant35: 'Быстрый хлопок, крепкий гвоздь'
    },
    // Бряцало — дверное кольцо: медь, стук, оскал, дребезг, кольцо.
    enem2: {
        variant1: 'Стуковый кураж', variant2: 'Оскальная хватка', variant3: 'Кольцо-таран',
        variant4: 'Дребезжащий напор', variant5: 'Меткий стук', variant6: 'Бешеный стук',
        variant7: 'Бряцалов норов', variant8: 'Крепкая медь', variant9: 'Ударный стук',
        variant10: 'Живучий оскал', variant11: 'Колючий клык', variant12: 'Стук и в темноту',
        variant13: 'Толстое кольцо', variant14: 'Неутомимый стук', variant15: 'Пружинистый стук',
        variant16: 'Острый клык, зоркий глаз', variant17: 'Медная удача', variant18: 'Верный стук',
        variant19: 'Молниеносный стук', variant20: 'Медный нюх', variant21: 'Цепкий оскал',
        variant22: 'Юркий на дверной раме', variant23: 'Стуковая стойкость', variant24: 'Долгий дребезг, зоркий глаз',
        variant25: 'Ускользающий стук', variant26: 'Дикий стук', variant27: 'Стойкое кольцо',
        variant28: 'Стук наповал', variant29: 'Крепкое бряцало', variant30: 'Дребезжащая мощь',
        variant31: 'Стук с оглядкой', variant32: 'Живучая медь', variant33: 'Юркий и медный',
        variant34: 'Стуковая прыть', variant35: 'Быстрый стук, крепкое кольцо'
    },
    // Скамейник — резная лавка: ножка, резьба, обивка, поступь, коготь.
    enem3: {
        variant1: 'Резной кураж', variant2: 'Ножковая хватка', variant3: 'Коготь-таран',
        variant4: 'Поступный напор', variant5: 'Меткий топот', variant6: 'Бешеный топот',
        variant7: 'Скамейников норов', variant8: 'Крепкая ножка', variant9: 'Ударный топот',
        variant10: 'Живучая резьба', variant11: 'Колючий коготь', variant12: 'Топот и в темноту',
        variant13: 'Толстая обивка', variant14: 'Неутомимый топот', variant15: 'Пружинистый топот',
        variant16: 'Острый коготь, зоркий глаз', variant17: 'Резная удача', variant18: 'Верный топот',
        variant19: 'Молниеносный топот', variant20: 'Резной нюх', variant21: 'Цепкая ножка',
        variant22: 'Юркий на четырёх ножках', variant23: 'Резная стойкость', variant24: 'Долгая поступь, зоркий глаз',
        variant25: 'Ускользающий топот', variant26: 'Дикий топот', variant27: 'Стойкая обивка',
        variant28: 'Топот наповал', variant29: 'Крепкий скамейник', variant30: 'Резная мощь',
        variant31: 'Топот с оглядкой', variant32: 'Живучая ножка', variant33: 'Юркий и резной',
        variant34: 'Резная прыть', variant35: 'Быстрый топот, крепкая ножка'
    },
    // Глазок — одноглазый дозорный: глаз, копьё, щит, дозор, укол.
    enem4: {
        variant1: 'Дозорный кураж', variant2: 'Щитовая хватка', variant3: 'Копьё-таран',
        variant4: 'Вигильный напор', variant5: 'Меткий укол', variant6: 'Бешеный укол',
        variant7: 'Глазков норов', variant8: 'Крепкий щит', variant9: 'Ударный укол',
        variant10: 'Живучий глаз', variant11: 'Колючее копьё', variant12: 'Укол и в темноту',
        variant13: 'Толстый щит', variant14: 'Неутомимый укол', variant15: 'Пружинистый укол',
        variant16: 'Острое копьё, зоркий глаз', variant17: 'Дозорная удача', variant18: 'Верный укол',
        variant19: 'Молниеносный укол', variant20: 'Дозорный нюх', variant21: 'Цепкий щит',
        variant22: 'Юркий, несмотря на щит', variant23: 'Дозорная стойкость', variant24: 'Долгий обзор, зоркий глаз',
        variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Стойкий щит',
        variant28: 'Укол наповал', variant29: 'Крепкий глазок', variant30: 'Вигильная мощь',
        variant31: 'Укол с оглядкой', variant32: 'Живучий щит', variant33: 'Юркий и зоркий',
        variant34: 'Дозорная прыть', variant35: 'Быстрый укол, острое копьё'
    },
    // Стрешень — резной конёк: грива, копыто, гребень, галоп, роспись.
    enem5: {
        variant1: 'Гривастый кураж', variant2: 'Копытная хватка', variant3: 'Гребень-таран',
        variant4: 'Галопный напор', variant5: 'Меткий скок', variant6: 'Бешеный скок',
        variant7: 'Стрешенев норов', variant8: 'Крепкий гребень', variant9: 'Ударное копыто',
        variant10: 'Живучая грива', variant11: 'Колючий гребень', variant12: 'Скок и в темноту',
        variant13: 'Толстая роспись', variant14: 'Неутомимый скок', variant15: 'Пружинистый скок',
        variant16: 'Острое копыто, зоркий глаз', variant17: 'Галопная удача', variant18: 'Верный скок',
        variant19: 'Молниеносный скок', variant20: 'Галопный нюх', variant21: 'Цепкое копыто',
        variant22: 'Юркий на полном скаку', variant23: 'Галопная стойкость', variant24: 'Долгий разгон, зоркий глаз',
        variant25: 'Ускользающий скок', variant26: 'Дикий скок', variant27: 'Стойкая роспись',
        variant28: 'Скок наповал', variant29: 'Крепкий стрешень', variant30: 'Галопная мощь',
        variant31: 'Скок с оглядкой', variant32: 'Живучий гребень', variant33: 'Юркий и гривастый',
        variant34: 'Галопная прыть', variant35: 'Быстрый скок, крепкое копыто'
    }
};
