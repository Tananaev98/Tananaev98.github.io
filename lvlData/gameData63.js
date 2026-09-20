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
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.957,
	damageMultiplier: 1.816,
	minWaveDelay: 2820,
	minShotDelay: 189,
	minTelegraphMs: 593,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.615, cadence: 0.993, speed: 0.991, damage: 1.033, telegraphMultiplier: 0.959, surpriseChance: 0.0425, maxActiveAttacks: 9 },
		{ phase: 2, minHp: 0.32, cadence: 0.905, speed: 1.067, damage: 1.108, telegraphMultiplier: 0.948, surpriseChance: 0.141, maxActiveAttacks: 12 },
		{ phase: 3, minHp: 0.00, cadence: 0.743, speed: 1.117, damage: 1.177, telegraphMultiplier: 0.844, surpriseChance: 0.2085, maxActiveAttacks: 17 }
	],
	bosses: {
		enem1: { combatIdentity: "Прыжок возвращается к берегу", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4,
			// Прыгач: FROG_LEAP — внезапный прыжок из неподвижного приседа
			movementStyle: 'lateRush', cadence: 1.015, telegraphMs: 930, speedMultiplier: 0.965, damageMultiplier: 0.965,
			speedVariance: [0.89, 1.00, 1.11, 1.22, 1.33]
		}, // Прыгач: FROG_LEAP — внезапный прыжок из неподвижного приседа
		enem2: { combatIdentity: "Всплеск утки", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4,
			// Крякуша: NOISY_SPLASH — шумная хаотичная мокрая возня
			movementStyle: 'weave', cadence: 0.945, telegraphMs: 755, speedMultiplier: 1.015, damageMultiplier: 1.015,
			speedVariance: [0.89, 0.98, 1.07, 1.16, 1.25]
		}, // Крякуша: NOISY_SPLASH — шумная хаотичная мокрая возня
		enem3: { combatIdentity: "Ленивый бросок с обманом", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4,
			// Чешуяк: LAZY_LUNGE — тяжёлая ленивая масса выжидает перед редким броском
			movementStyle: 'pause', cadence: 1.205, telegraphMs: 1015, speedMultiplier: 0.865, damageMultiplier: 1.125,
			speedVariance: [0.79, 0.88, 0.97, 1.06, 1.15]
		}, // Чешуяк: LAZY_LUNGE — тяжёлая ленивая масса выжидает перед редким броском
		enem4: { combatIdentity: "Сеть тянут обратно", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4,
			// Тиноброд: NET_CAST — сеть тянут и забрасывают по прямой
			movementStyle: 'straight', cadence: 0.890, telegraphMs: 715, speedMultiplier: 1.105, damageMultiplier: 1.035,
			speedVariance: [0.85, 0.93, 1.01, 1.09, 1.17]
		}, // Тиноброд: NET_CAST — сеть тянут и забрасывают по прямой
		enem5: { combatIdentity: "Засада за первым гребком", combatTrick: "двойной выпад иногда получает третий укус с другой стороны", signatureEvery: 4,
			// Глубинник: AMBUSH_STRIKE — взрывной бросок из полной неподвижности засады
			movementStyle: 'accelerate', cadence: 0.835, telegraphMs: 995, speedMultiplier: 1.075, damageMultiplier: 1.210,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
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
 let timeNextBoss = 11;
 const bossInterval = 7;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Прыгач: FROG_LEAP — внезапный прыжок из неподвижного приседа,
	// затем скачущая суета приземления =====
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //0 — нежданчик: прыжок сразу без привычного долгого приседа
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 }, //1 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 }, //2 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //3 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 44, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //4 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //5 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 41, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //6 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 27, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //7 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 23 }, //8 — быстрая атака
	// звенья «атакующей цепи» — прямой прыжок вверх, затем непредсказуемая
	// скачущая суета приземления (vertical+irregular), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //9 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //10 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //11 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //12 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //13 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //14 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //15 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //16 цепь-B звено 5

	// ===== Крякуша: NOISY_SPLASH — шумная хаотичная мокрая возня, затем
	// решительный нырок =====
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //0 — нежданчик: возня сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 38, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, //1 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 67, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, //2 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //3 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //4 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //5 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //6 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 77, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //7 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 23 }, //8 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //9 — быстрая атака
	// звенья «атакующей цепи» — хаотичное мокрое метание, затем решительный
	// нырок по диагонали (zigzag+diagonal), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //10 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //11 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //12 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //13 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //14 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //15 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //16 цепь-B звено 3

	// ===== Чешуяк: LAZY_LUNGE — тяжёлая ленивая масса выжидает, затем
	// редкий тяжёлый бросок кормиться =====
	{ boss: 'enem3', type: 'enem33', xPos: 27, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //0 — нежданчик: бросок раньше привычного долгого затишья
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //1 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //2 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //3 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //4 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 }, //5 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //6 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// звенья «атакующей цепи» — ленивый широкий разворот тяжёлого тела в
	// одну сторону, затем в другую (arc+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //8 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //9 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //10 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //11 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //12 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //13 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //14 цепь-B звено 4

	// ===== Тиноброд: NET_CAST — сеть мечется рывками при забросе, затем
	// прямое падение груза вниз =====
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 62, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 6,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //5 — нежданчик: заброс разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21 }, //7 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //8 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //9 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 64, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //10 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 23 }, //11 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //12 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 37, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 }, //14 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 }, //15 — средняя нижняя атака
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
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //0
	{ boss: 'enem5', type: 'enem55', xPos: 32, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //3 — нежданчик: бросок без единого мгновения затишья засады
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //6 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //7 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 44, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //8 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 58, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //9 — средняя нижняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 74, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //10 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 74, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //12 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 41, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //14 — средняя атака
	// звенья «атакующей цепи» — один решительный бросок из засады по
	// диагонали, затем яростное метание при захвате (diagonal+zigzag),
	// раздел 13.7 — финальная кульминация, самая длинная цепь уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //15 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //16 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //17 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //18 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //19 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //20 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //21 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //22 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //23 цепь-B звено 6

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 12,customHP: 1,customDamage: 19.85,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 32,yPos: 20,customHP: 1,customDamage: 19.85,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 78,yPos: 6,customHP: 1,customDamage: 19.85,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 40,customHP: 1,customDamage: 19.85,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 8,customHP: 1,customDamage: 19.85,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 88,yPos: 12,customHP: 1,customDamage: 19.85,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 24,yPos: 12,customHP: 1,customDamage: 21.85,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 50,yPos: 20,customHP: 1,customDamage: 21.85,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 6,customHP: 1,customDamage: 21.85,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 24,yPos: 40,customHP: 1,customDamage: 21.85,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 24,yPos: 8,customHP: 1,customDamage: 21.85,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 50,yPos: 12,customHP: 1,customDamage: 21.85,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 82,yPos: 12,customHP: 1,customDamage: 24.05,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 16,yPos: 20,customHP: 1,customDamage: 24.05,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 66,yPos: 6,customHP: 1,customDamage: 24.05,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 82,yPos: 24,customHP: 1,customDamage: 24.05,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 82,yPos: 8,customHP: 1,customDamage: 24.05,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 34,yPos: 12,customHP: 1,customDamage: 24.05,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 12,customHP: 1,customDamage: 25.85,customSpeed: 16},
    {boss: "enem4",type: "enem44",xPos: 64,yPos: 20,customHP: 1,customDamage: 25.85,customSpeed: 14},
    {boss: "enem4",type: "enem44",xPos: 38,yPos: 6,customHP: 1,customDamage: 25.85,customSpeed: 21},
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 40,customHP: 1,customDamage: 25.85,customSpeed: 7},
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 8,customHP: 1,customDamage: 25.85,customSpeed: 20},
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 12,customHP: 1,customDamage: 25.85,customSpeed: 18},
    {boss: "enem5",type: "enem55",xPos: 20,yPos: 12,customHP: 1,customDamage: 28.1,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 30,yPos: 20,customHP: 1,customDamage: 28.1,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 80,yPos: 6,customHP: 1,customDamage: 28.1,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 20,yPos: 40,customHP: 1,customDamage: 28.1,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 20,yPos: 8,customHP: 1,customDamage: 28.1,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 70,yPos: 12,customHP: 1,customDamage: 28.1,customSpeed: 18}
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 318, bossDelayAbDop: 4654, firstWaveDelayMs: 2234 }, // редкие резкие прыжки
	{ boss: 'enem2', bossDelayAb: 228, bossDelayAbDop: 4368, firstWaveDelayMs: 2097 }, // самый частый — шумная непрерывная возня
	{ boss: 'enem3', bossDelayAb: 394, bossDelayAbDop: 5801, firstWaveDelayMs: 2400 }, // самый долгий отдых — сонное затишье
	{ boss: 'enem4', bossDelayAb: 209, bossDelayAbDop: 4255, firstWaveDelayMs: 2042 }, // частые рывки заброса сети
	{ boss: 'enem5', bossDelayAb: 267, bossDelayAbDop: 4818, firstWaveDelayMs: 2313 }, // собранный финал
 ];

 const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0],openingOrder: 0},
    {boss: "enem1",indexAbilities: [1]},
    {boss: "enem1",indexAbilities: [6,5]},
    {boss: "enem1",indexAbilities: [7,8]},
    {boss: "enem1",indexAbilities: [17,21,18],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Прыжок возвращается к берегу — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [17,21,19],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Прыжок возвращается к берегу — иной конец"},
    {boss: "enem1",indexAbilities: [22,19,22,18],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Прыжок возвращается к берегу — завершение"},
    {boss: "enem1",indexAbilities: [9,10,11],isChain: true},
    {boss: "enem1",indexAbilities: [12,13,14,15,16],isChain: true},
    {boss: "enem2",indexAbilities: [0],openingOrder: 0},
    {boss: "enem2",indexAbilities: [1]},
    {boss: "enem2",indexAbilities: [2]},
    {boss: "enem2",indexAbilities: [6,3,7,9]},
    {boss: "enem2",indexAbilities: [5,4]},
    {boss: "enem2",indexAbilities: [5,6,8]},
    {boss: "enem2",indexAbilities: [5,2,3,7]},
    {boss: "enem2",indexAbilities: [4,7,8]},
    {boss: "enem2",indexAbilities: [17,19,22],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Всплеск утки — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [17,19,18],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Всплеск утки — иной конец"},
    {boss: "enem2",indexAbilities: [21,19,22,18],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Всплеск утки — завершение"},
    {boss: "enem2",indexAbilities: [10,11,12,13],isChain: true},
    {boss: "enem2",indexAbilities: [14,15,16],isChain: true},
    {boss: "enem3",indexAbilities: [0],openingOrder: 0},
    {boss: "enem3",indexAbilities: [3]},
    {boss: "enem3",indexAbilities: [7,6,5]},
    {boss: "enem3",indexAbilities: [4,2]},
    {boss: "enem3",indexAbilities: [1,4]},
    {boss: "enem3",indexAbilities: [6,4]},
    {boss: "enem3",indexAbilities: [3,5]},
    {boss: "enem3",indexAbilities: [18,17],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Ленивый бросок с обманом — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [18,17,19],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Ленивый бросок с обманом — иной конец"},
    {boss: "enem3",indexAbilities: [18,20,17,19],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Ленивый бросок с обманом — завершение"},
    {boss: "enem3",indexAbilities: [8,9,10],isChain: true},
    {boss: "enem3",indexAbilities: [11,12,13,14],isChain: true},
    {boss: "enem4",indexAbilities: [5,6]},
    {boss: "enem4",indexAbilities: [0,2,4,1,3]},
    {boss: "enem4",indexAbilities: [14],openingOrder: 0},
    {boss: "enem4",indexAbilities: [9,13,8]},
    {boss: "enem4",indexAbilities: [10,12]},
    {boss: "enem4",indexAbilities: [7,11,15]},
    {boss: "enem4",indexAbilities: [15,11]},
    {boss: "enem4",indexAbilities: [9,10,13]},
    {boss: "enem4",indexAbilities: [23,24,25],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Сеть тянут обратно — знакомство",openingOrder: 1},
    {boss: "enem4",indexAbilities: [23,24,27],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Сеть тянут обратно — иной конец"},
    {boss: "enem4",indexAbilities: [28,25,24,27],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Сеть тянут обратно — завершение"},
    {boss: "enem4",indexAbilities: [16,17,18,19],isChain: true},
    {boss: "enem4",indexAbilities: [20,21,22],isChain: true},
    {boss: "enem5",indexAbilities: [0,1,2,4]},
    {boss: "enem5",indexAbilities: [3],openingOrder: 0},
    {boss: "enem5",indexAbilities: [13]},
    {boss: "enem5",indexAbilities: [12]},
    {boss: "enem5",indexAbilities: [5,6]},
    {boss: "enem5",indexAbilities: [24,28],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Засада за первым гребком — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [24,28,26],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Засада за первым гребком — иной конец"},
    {boss: "enem5",indexAbilities: [29,25,29,26],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Засада за первым гребком — завершение"},
    {boss: "enem5",indexAbilities: [15,16,17],isChain: true},
    {boss: "enem5",indexAbilities: [18,19,20,21,22,23],isChain: true}
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
