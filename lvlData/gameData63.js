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
			// Прыгач: FROG_LEAP — внезапный прыжок из неподвижного приседа
			movementStyle: 'lateRush', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Прыгач: FROG_LEAP — внезапный прыжок из неподвижного приседа
		enem2: {
			// Крякуша: NOISY_SPLASH — шумная хаотичная мокрая возня
			movementStyle: 'weave', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Крякуша: NOISY_SPLASH — шумная хаотичная мокрая возня
		enem3: {
			// Чешуяк: LAZY_LUNGE — тяжёлая ленивая масса выжидает перед редким броском
			movementStyle: 'pause', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Чешуяк: LAZY_LUNGE — тяжёлая ленивая масса выжидает перед редким броском
		enem4: {
			// Тиноброд: NET_CAST — сеть тянут и забрасывают по прямой
			movementStyle: 'straight', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Тиноброд: NET_CAST — сеть тянут и забрасывают по прямой
		enem5: {
			// Глубинник: AMBUSH_STRIKE — взрывной бросок из полной неподвижности засады
			movementStyle: 'accelerate', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Глубинник: AMBUSH_STRIKE — взрывной бросок из полной неподвижности засады
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
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '19%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Крякуша',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/2.webp',
        baseHP: 40519,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '21%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Чешуяк',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/3.webp',
        baseHP: 71688,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '23%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Тиноброд',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/4.webp',
        baseHP: 115324,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Глубинник',
        image: 'images/enemies/regions/5_dom_dvor/lvl63/5.webp',
        baseHP: 174544,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '27%',
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
	// ===== Прыгач: FROG_LEAP — внезапный прыжок из неподвижного приседа,
	// затем скачущая суета приземления =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: прыжок сразу без привычного долгого приседа
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — прямой прыжок вверх, затем непредсказуемая
	// скачущая суета приземления (vertical+irregular), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //22 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //23 цепь-B звено 5

	// ===== Крякуша: NOISY_SPLASH — шумная хаотичная мокрая возня, затем
	// решительный нырок =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: возня сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — хаотичное мокрое метание, затем решительный
	// нырок по диагонали (zigzag+diagonal), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //22 цепь-B звено 3

	// ===== Чешуяк: LAZY_LUNGE — тяжёлая ленивая масса выжидает, затем
	// редкий тяжёлый бросок кормиться =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: бросок раньше привычного долгого затишья
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — ленивый широкий разворот тяжёлого тела в
	// одну сторону, затем в другую (arc+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Тиноброд: NET_CAST — сеть мечется рывками при забросе, затем
	// прямое падение груза вниз =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: заброс разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — сеть мечется, забрасываемая рывками, затем
	// прямое падение груза вниз (zigzag+vertical), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //22 цепь-B звено 3

	// ===== Глубинник: AMBUSH_STRIKE — один решительный бросок из засады,
	// затем яростное метание при захвате добычи =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: бросок без единого мгновения затишья засады
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — один решительный бросок из засады по
	// диагонали, затем яростное метание при захвате (diagonal+zigzag),
	// раздел 13.7 — финальная кульминация, самая длинная цепь уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //23 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //24 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // редкие резкие прыжки
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — шумная непрерывная возня
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — сонное затишье
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частые рывки заброса сети
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Прыгач — FROG_LEAP
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким прыжком
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: прыжок сразу без привычного долгого приседа
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: серия прыжков через всё поле разом

	// Крякуша — NOISY_SPLASH
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных всплесков подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem2', indexAbilities: [20, 21, 22], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной всплеск с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия хаотичных всплесков по всему полю

	// Чешуяк — LAZY_LUNGE
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним броском
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: бросок раньше привычного долгого затишья
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: бросок с обеих сторон разом

	// Тиноброд — NET_CAST
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним забросом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: заброс разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: сплошной невод через всё поле

	// Глубинник — AMBUSH_STRIKE, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним броском
	{ boss: 'enem5', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (6, максимум уровня)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: бросок без единого мгновения затишья засады
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: взрывной бросок через весь пруд разом
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
