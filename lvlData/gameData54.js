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
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 1.782,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 0.95, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 10 },
		{ phase: 2, minHp: 0.31, cadence: 0.90, speed: 1.05, damage: 1.12, telegraphMultiplier: 0.95, surpriseChance: 0.12, maxActiveAttacks: 12 },
		{ phase: 3, minHp: 0.00, cadence: 0.80, speed: 1.12, damage: 1.22, telegraphMultiplier: 0.90, surpriseChance: 0.18, maxActiveAttacks: 14 }
	],
	bosses: {
		enem1: {
			// Скрипень: CREAK_SNAP — короткий скрип-телеграф, затем внезапный одиночный хлопок пасти
			movementStyle: 'accelerate', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Скрипень: CREAK_SNAP — короткий скрип-телеграф, затем внезапный одиночный хлопок пасти
		enem2: {
			// Бряцало: KNOCK_RAPID — очень частые повторные удары почти в одну и ту же точку
			movementStyle: 'lateRush', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Бряцало: KNOCK_RAPID — очень частые повторные удары почти в одну и ту же точку
		enem3: {
			// Скамейник: FOUR_LEG_STOMP — редкие тяжёлые удары парами ног, передние затем задние
			movementStyle: 'straight', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Скамейник: FOUR_LEG_STOMP — редкие тяжёлые удары парами ног, передние затем задние
		enem4: {
			// Глазок: SENTRY_JAB — цикл наблюдения и точного укола копьём туда, куда смотрел глаз
			movementStyle: 'drift', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Глазок: SENTRY_JAB — цикл наблюдения и точного укола копьём туда, куда смотрел глаз
		enem5: {
			// Стрешень: GALLOP_CHARGE — стремительный галоп через всю ширину поля одним проходом
			movementStyle: 'lateRush', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Стрешень: GALLOP_CHARGE — стремительный галоп через всю ширину поля одним проходом
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
        size: '22%',
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
        size: '22%',
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
        size: '24%',
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
        size: '24%',
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
        size: '26%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Скрипень: CREAK_SNAP — короткий скрип-телеграф, затем внезапный
	// одиночный хлопок пасти снизу =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: хлопок сразу, без привычного скрипа
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — трещина ведёт в одну сторону, затем дугой
	// захлопывается (diagonal+arc), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Бряцало: KNOCK_RAPID — очень частые повторные удары почти в
	// одну и ту же точку, ритм стука =====
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0  точка стука
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1  та же точка
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2  та же точка
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: тройной стук подряд быстрее обычного
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — кольцо мечется от стука зигзагом, затем
	// хаотично дребезжит (zigzag+irregular), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Скамейник: FOUR_LEG_STOMP — редкие тяжёлые удары парами ног,
	// передние затем задние =====
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0  передняя пара
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1  передняя пара
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2  задняя пара
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3  задняя пара
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: обе пары ног разом раньше привычного чередования
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — передние ноги бьют по одной оси, задние —
	// дугой следом (vertical+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Глазок: SENTRY_JAB — цикл наблюдения и точного укола копьём
	// туда, куда смотрел глаз =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: укол без обычного цикла высматривания
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — копьё дёргается зигзагом высматривания,
	// затем непредсказуемый укол (zigzag+irregular), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Стрешень: GALLOP_CHARGE — стремительный галоп через всю ширину
	// поля одним неразрывным проходом, ритм ударов копыт по пути =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //0  начало галопа
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //1  копыто
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //2  копыто
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //3  копыто
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //4  конец галопа
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //13 — нежданчик: галоп начинается с обратного конца поля
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //15
	// звенья «атакующей цепи» — копыта бьют по одной оси на разгоне, затем
	// прямой галоп в сторону (vertical+diagonal), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 315, bossDelayAbDop: 5800 }, // скрипучее ожидание
	{ boss: 'enem2', bossDelayAb: 200, bossDelayAbDop: 3900 }, // самый частый — быстрый стук
	{ boss: 'enem3', bossDelayAb: 420, bossDelayAbDop: 7000 }, // самый долгий отдых — устойчивая поступь
	{ boss: 'enem4', bossDelayAb: 210, bossDelayAbDop: 3600 }, // вигильный цикл наблюдения
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Скрипень — CREAK_SNAP
	{ boss: 'enem1', indexAbilities: [0, 2] },
	{ boss: 'enem1', indexAbilities: [1, 2] },
	{ boss: 'enem1', indexAbilities: [3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 2, 5] }, // same-start с [0,2], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, diagonal)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, arc)
	{ boss: 'enem1', indexAbilities: [13, 14] }, // нежданчик: хлопок сразу, без привычного скрипа
	{ boss: 'enem1', indexAbilities: [0, 1, 3, 4, 2] }, // сигнатурная: полный хлопок пасти по всей длине доски

	// Бряцало — KNOCK_RAPID
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [1, 2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6] },
	{ boss: 'enem2', indexAbilities: [9, 10, 13, 14] },
	{ boss: 'enem2', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem2', indexAbilities: [12, 0, 2] }, // нежданчик: тройной стук подряд быстрее обычного
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 0, 1, 2] }, // сигнатурная: непрерывная дробь стука в одну точку

	// Скамейник — FOUR_LEG_STOMP
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5] },
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [6, 7, 12, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1, 8] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, vertical)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, arc)
	{ boss: 'enem3', indexAbilities: [14, 15] }, // нежданчик: обе пары ног разом раньше привычного чередования
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 10, 11] }, // сигнатурная: полный четвероногий топот разом

	// Глазок — SENTRY_JAB
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [6, 7, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: укол без обычного цикла высматривания
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: серия точных уколов по всему полю

	// Стрешень — GALLOP_CHARGE, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [9, 10] },
	{ boss: 'enem5', indexAbilities: [11, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, vertical)
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, diagonal)
	{ boss: 'enem5', indexAbilities: [13] }, // нежданчик: галоп начинается с обратного конца поля
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 14, 15] }, // сигнатурная кульминация: полный галоп через всё поле разом
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
