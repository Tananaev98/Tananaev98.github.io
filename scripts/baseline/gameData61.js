// Уровень 61 «Вышивальная светлица» — двадцать третий уровень области V,
// обычный (пять разных монстров, как 41-44/46-49/51-54/56-59).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-13 по
// admin-boss-pattern-panel.html, 300 строк, уровни 1-60 (включая свежую
// историю многофазного уровня 60).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl61/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — костяная игла с ушком, перевязанным алым бантом, тело обмотано
//   красной нитью как бинтами, острый кончик снизу — ВСЯ суть в точном
//   ПРОКАЛЫВАНИИ насквозь.
// 2.webp — деревянная катушка льна, нить дугой перекинута от одной руки к
//   другой, как готовая петля-аркан — ОПУТЫВАНИЕ, а не удар.
// 3.webp — круглые пяльцы с натянутой тканью, само ЛИЦО — вышитый крестом
//   зигзагообразный узор (ромбы-глаза, зигзаг-пасть) — буквально живой
//   узор, атакующий в форме самого себя.
// 4.webp — тряпичная фигура с мешковинным лицом (крестик-глаза, шов-рот),
//   держит вдетую иглу, между руками туго натянута алая нить — размеренное
//   ПРОШИВАНИЕ насквозь по прямой линии.
// 5.webp (финал) — хищник из сплошного вышитого полотна с народным орнам-
//   ентом оленей на боках, длинный вышитый шарф-хвост, низкая охотничья
//   стойка — сошедшее с полотна воплощение всей работы светлицы разом.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА — реальный процесс рукоделия, не общий шаблон роли: игла точно
// прокалывает насквозь → катушка опутывает петлёй нити → пяльцы атакуют
// собственным вышитым узором (зигзаг лица оживает буквально) → тихая
// вышивальщица размеренно прошивает по прямой → вышитый зверь объединяет
// всё ремесло разом, сойдя с готового полотна. Отличается от Кикиморы
// (уровень 50 — беспорядок и хаос пряжи) прямо противоположным настроением:
// здесь не хаос, а ТОЧНОСТЬ и МАСТЕРСТВО ремесла, доведённые до угрозы.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные названия предметов):
// Прошивень (от «прошивать» — насквозь, а не словарное «игла»); Опутыш (от
// «опутать» — петля нити, а не словарное «катушка»); Узорник (от «узор» —
// сам живой узор пялец); Вышивень (от «вышивать» — размеренное прошивание,
// а не словарное «вышивальщица»); Тканыш (от «ткань» — сотканное существо,
// а не словарное «зверь»).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-60: Прошивень
// — straight (игла не виляет, идёт строго прямо насквозь) 15%→16%; Опутыш —
// pause (петля выжидает и резко захлопывается, как силок) 12%→13%, самый
// низкий бакет роли; Узорник — weave (сам узор ломаный, зигзагообразный)
// 15%→16%; Вышивень — wave (игла ходит вверх-вниз через ткань размеренной
// волной стежка) 13%→14%; Тканыш — accelerate (хищник копит рывок перед
// прыжком с полотна) 17%→18%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (метод закреплён на
// уровнях 57-60 — пары проверяются ДО записи файла): Прошивень —
// diagonal(3)+vertical(3): укол наискось внутрь, затем прямое извлечение
// (пара с нулевой историей для enem1); Опутыш — arc(4)+arc(4): петля
// взлетает дугой в одну сторону, затем дугой в другую — симметричный
// аркан (пара с нулевой историей для enem2, повтор формы — сознательный
// приём, как у Опутыша-аркана самого по себе симметричен); Узорник —
// zigzag(4)+zigzag(5): собственный зубчатый узор атакует зигзагом, во
// второй связке ещё гуще (пара с нулевой историей для enem3, повтор формы
// оправдан буквальным самоповторением узора); Вышивень — diagonal(3)+
// zigzag(4): один размеренный стежок наискось, затем бегущий стежок
// зигзагом вдоль линии (пара с нулевой историей для enem4); Тканыш —
// irregular(5)+diagonal(6): хаотичный многонаправленный бросок всего
// полотна разом, затем один решительный диагональный рывок хищника (пара
// с нулевой историей для enem5, длина ограничена 6 звеньями по разделу
// 13.5). Формы всех пяти пар подтверждены живым классификатором панели
// ПОСЛЕ записи файла (verify61.js + STEP 2), не только ручным расчётом.
let lvlNumber = 61;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.974,
	damageMultiplier: 1.824,
	minWaveDelay: 2875,
	minShotDelay: 162,
	minTelegraphMs: 587,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.715, cadence: 1.016, speed: 0.993, damage: 0.956, telegraphMultiplier: 1.022, surpriseChance: 0.0555, maxActiveAttacks: 10 },
		{ phase: 2, minHp: 0.295, cadence: 0.899, speed: 1.057, damage: 1.092, telegraphMultiplier: 0.928, surpriseChance: 0.129, maxActiveAttacks: 11 },
		{ phase: 3, minHp: 0.00, cadence: 0.755, speed: 1.094, damage: 1.242, telegraphMultiplier: 0.856, surpriseChance: 0.185, maxActiveAttacks: 13 }
	],
	bosses: {
		enem1: { combatIdentity: "Игла прошивает дальше", combatTrick: "короткий первый заход продолжается более быстрым довеском с прежнего края", signatureEvery: 4,
			// Прошивень: NEEDLE_PIERCE — игла не виляет, идёт строго прямо насквозь
			movementStyle: 'straight', cadence: 1.035, telegraphMs: 865, speedMultiplier: 0.955, damageMultiplier: 0.890,
			speedVariance: [0.82, 0.92, 1.02, 1.12, 1.22]
		}, // Прошивень: NEEDLE_PIERCE — игла не виляет, идёт строго прямо насквозь
		enem2: { combatIdentity: "Петля смыкает края", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4,
			// Опутыш: SNARE_LOOP — петля выжидает и резко захлопывается, как силок
			movementStyle: 'pause', cadence: 0.895, telegraphMs: 795, speedMultiplier: 1.090, damageMultiplier: 1.030,
			speedVariance: [0.82, 0.89, 0.96, 1.03, 1.10]
		}, // Опутыш: SNARE_LOOP — петля выжидает и резко захлопывается, как силок
		enem3: { combatIdentity: "Узор возвращает стежок", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4,
			// Узорник: LIVING_ZIGZAG — сам узор ломаный, атакует в форме собственного лица
			movementStyle: 'weave', cadence: 1.155, telegraphMs: 1005, speedMultiplier: 0.795, damageMultiplier: 1.160,
			speedVariance: [0.80, 0.89, 0.98, 1.07, 1.16]
		}, // Узорник: LIVING_ZIGZAG — сам узор ломаный, атакует в форме собственного лица
		enem4: { combatIdentity: "Вышивка рвёт ритм", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4,
			// Вышивень: STITCH_RHYTHM — игла ходит вверх-вниз через ткань размеренной волной
			movementStyle: 'wave', cadence: 0.875, telegraphMs: 705, speedMultiplier: 1.175, damageMultiplier: 1.075,
			speedVariance: [0.84, 0.95, 1.06, 1.17, 1.28]
		}, // Вышивень: STITCH_RHYTHM — игла ходит вверх-вниз через ткань размеренной волной
		enem5: { combatIdentity: "Зверь с полотна", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4,
			// Тканыш: WOVEN_POUNCE — хищник с полотна копит рывок перед прыжком
			movementStyle: 'accelerate', cadence: 0.825, telegraphMs: 940, speedMultiplier: 1.065, damageMultiplier: 1.185,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.28]
		} // Тканыш: WOVEN_POUNCE — хищник с полотна копит рывок перед прыжком
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl61/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl61/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl61/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl61/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl61/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Прошивень',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/1.webp',
        baseHP: 15594,
        baseSpeed: 0,
        baseDamage: 19.95,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Опутыш',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/2.webp',
        baseHP: 38985,
        baseSpeed: 0,
        baseDamage: 22.05,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Узорник',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/3.webp',
        baseHP: 68974,
        baseSpeed: 0,
        baseDamage: 24.10,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Вышивень',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/4.webp',
        baseHP: 110958,
        baseSpeed: 0,
        baseDamage: 26.10,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Тканыш',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/5.webp',
        baseHP: 167937,
        baseSpeed: 0,
        baseDamage: 27.95,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 7;
 const bossInterval = 6;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Прошивень: NEEDLE_PIERCE — игла не виляет, идёт строго прямо
	// насквозь, точный укол без размаха =====
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //0 — нежданчик: укол сразу без привычного долгого замаха
	{ boss: 'enem1', type: 'enem11', xPos: 72, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 }, //1 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 54, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, //2 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //3 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //4 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //5 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 66, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //6 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21 }, //7 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, //8 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 66, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 57, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //10 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 67, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //11 — средняя атака
	// звенья «атакующей цепи» — укол наискось внутрь, затем прямое
	// извлечение (diagonal+vertical), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //12 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //13 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //14 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //15 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //16 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //17 цепь-B звено 3

	// ===== Опутыш: SNARE_LOOP — петля выжидает и резко захлопывается,
	// как силок, симметрично с обеих сторон =====
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //0 — нежданчик: петля захлопывается сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //1 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //2 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //3 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //4 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 63, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //5 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 74, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21 }, //6 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //7 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 23 }, //8 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //9 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, //10 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //12 — средняя нижняя атака
	// звенья «атакующей цепи» — петля взлетает дугой в одну сторону,
	// затем дугой в другую (arc+arc), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //14 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //15 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //16 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //17 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //18 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //19 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //20 цепь-B звено 4

	// ===== Узорник: LIVING_ZIGZAG — сам узор ломаный, атакует в форме
	// собственного зубчатого лица =====
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //0 — нежданчик: узор рвётся раньше привычного медленного нарастания
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //1 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //2 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //3 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 39, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //4 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 77, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //5 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //6 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// звенья «атакующей цепи» — собственный зубчатый узор атакует зигзагом,
	// во второй связке ещё гуще (zigzag+zigzag), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //10 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //11 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //12 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //13 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //14 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //15 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //16 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //17 цепь-B звено 5

	// ===== Вышивень: STITCH_RHYTHM — игла ходит вверх-вниз через ткань
	// размеренной волной, спокойно и без спешки =====
	{ boss: 'enem4', type: 'enem44', xPos: 41, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 61, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 9,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //5 — нежданчик: стежок разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //7 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //8 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //9 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //10 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //11 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //12 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 42, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //14 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //15 — средняя нижняя атака
	// звенья «атакующей цепи» — один размеренный стежок наискось, затем
	// бегущий стежок зигзагом вдоль линии (diagonal+zigzag), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //22 цепь-B звено 4

	// ===== Тканыш: WOVEN_POUNCE — хищник с полотна копит рывок перед
	// прыжком, объединяет все мотивы разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //0
	{ boss: 'enem5', type: 'enem55', xPos: 31, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //3 — нежданчик: прыжок без единого мгновения подготовки
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //5 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //6 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //7 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 23 }, //8 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 }, //9 — средняя нижняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 23 }, //10 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 72, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, //12 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 46, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //14 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 87, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //16 — быстрая атака
	// звенья «атакующей цепи» — хаотичный многонаправленный бросок всего
	// полотна разом, затем один решительный диагональный рывок хищника
	// (irregular+diagonal), раздел 13.7 — финальная кульминация.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //18 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //19 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //20 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //21 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //22 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //23 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //24 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //25 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //26 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //27 цепь-B звено 6

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 12,customHP: 1,customDamage: 19.95,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 28,yPos: 20,customHP: 1,customDamage: 19.95,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 82,yPos: 6,customHP: 1,customDamage: 19.95,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 40,customHP: 1,customDamage: 19.95,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 18,yPos: 8,customHP: 1,customDamage: 19.95,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 70,yPos: 12,customHP: 1,customDamage: 19.95,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 12,customHP: 1,customDamage: 22.05,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 68,yPos: 20,customHP: 1,customDamage: 22.05,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 16,yPos: 6,customHP: 1,customDamage: 22.05,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 40,customHP: 1,customDamage: 22.05,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 8,customHP: 1,customDamage: 22.05,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 34,yPos: 12,customHP: 1,customDamage: 22.05,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 12,customHP: 1,customDamage: 24.1,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 36,yPos: 20,customHP: 1,customDamage: 24.1,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 78,yPos: 6,customHP: 1,customDamage: 24.1,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 40,customHP: 1,customDamage: 24.1,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 8,customHP: 1,customDamage: 24.1,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 88,yPos: 12,customHP: 1,customDamage: 24.1,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 12,customHP: 1,customDamage: 26.1,customSpeed: 16, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 26,yPos: 20,customHP: 1,customDamage: 26.1,customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 72,yPos: 6,customHP: 1,customDamage: 26.1,customSpeed: 21, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 40,customHP: 1,customDamage: 26.1,customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 8,customHP: 1,customDamage: 26.1,customSpeed: 20, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 86,yPos: 12,customHP: 1,customDamage: 26.1,customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem5",type: "enem55",xPos: 82,yPos: 12,customHP: 1,customDamage: 27.95,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 64,yPos: 20,customHP: 1,customDamage: 27.95,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 18,yPos: 6,customHP: 1,customDamage: 27.95,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 82,yPos: 40,customHP: 1,customDamage: 27.95,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 82,yPos: 8,customHP: 1,customDamage: 27.95,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 51,yPos: 12,customHP: 1,customDamage: 27.95,customSpeed: 18}
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 326, bossDelayAbDop: 4781, firstWaveDelayMs: 2295 }, // точные редкие уколы
	{ boss: 'enem2', bossDelayAb: 236, bossDelayAbDop: 5003, firstWaveDelayMs: 2400 }, // самый частый — выжидающая петля
	{ boss: 'enem3', bossDelayAb: 399, bossDelayAbDop: 5844, firstWaveDelayMs: 2400 }, // самый долгий отдых — узор копит рисунок
	{ boss: 'enem4', bossDelayAb: 196, bossDelayAbDop: 4198, firstWaveDelayMs: 2015 }, // частые размеренные стежки
	{ boss: 'enem5', bossDelayAb: 263, bossDelayAbDop: 5102, firstWaveDelayMs: 2400 }, // собранный финал
 ];

 const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0],openingOrder: 0},
    {boss: "enem1",indexAbilities: [2]},
    {boss: "enem1",indexAbilities: [1]},
    {boss: "enem1",indexAbilities: [7,6]},
    {boss: "enem1",indexAbilities: [11,9]},
    {boss: "enem1",indexAbilities: [8,4,3]},
    {boss: "enem1",indexAbilities: [21,22,18],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Игла прошивает дальше — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [21,22,20],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Игла прошивает дальше — иной конец"},
    {boss: "enem1",indexAbilities: [23,19,23,20,18],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Игла прошивает дальше — завершение"},
    {boss: "enem1",indexAbilities: [12,13,14],isChain: true},
    {boss: "enem1",indexAbilities: [15,16,17],isChain: true},
    {boss: "enem2",indexAbilities: [0],openingOrder: 0},
    {boss: "enem2",indexAbilities: [10]},
    {boss: "enem2",indexAbilities: [11]},
    {boss: "enem2",indexAbilities: [9,12,6]},
    {boss: "enem2",indexAbilities: [5,8]},
    {boss: "enem2",indexAbilities: [21,23,22,26],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Петля смыкает края — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [21,23,25],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Петля смыкает края — иной конец"},
    {boss: "enem2",indexAbilities: [22,26,21,23],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Петля смыкает края — завершение"},
    {boss: "enem2",indexAbilities: [13,14,15,16],isChain: true},
    {boss: "enem2",indexAbilities: [17,18,19,20],isChain: true},
    {boss: "enem3",indexAbilities: [0],openingOrder: 0},
    {boss: "enem3",indexAbilities: [8]},
    {boss: "enem3",indexAbilities: [7]},
    {boss: "enem3",indexAbilities: [3,6,4,2]},
    {boss: "enem3",indexAbilities: [5,1]},
    {boss: "enem3",indexAbilities: [3,5]},
    {boss: "enem3",indexAbilities: [18,22,19],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Узор возвращает стежок — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [18,22,20],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Узор возвращает стежок — иной конец"},
    {boss: "enem3",indexAbilities: [23,20,23,19],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Узор возвращает стежок — завершение"},
    {boss: "enem3",indexAbilities: [9,10,11,12],isChain: true},
    {boss: "enem3",indexAbilities: [13,14,15,16,17],isChain: true},
    {boss: "enem4",indexAbilities: [5,6]},
    {boss: "enem4",indexAbilities: [0,2,4,1,3]},
    {boss: "enem4",indexAbilities: [14],openingOrder: 0},
    {boss: "enem4",indexAbilities: [23,27,25,28],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Вышивка рвёт ритм — знакомство",openingOrder: 1,shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [23,27,28],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Вышивка рвёт ритм — иной конец",shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [25,28,23,27],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Вышивка рвёт ритм — завершение",shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [16,17,18],isChain: true},
    {boss: "enem4",indexAbilities: [19,20,21,22],isChain: true},
    {boss: "enem5",indexAbilities: [0,1,2,4]},
    {boss: "enem5",indexAbilities: [3],openingOrder: 0},
    {boss: "enem5",indexAbilities: [12]},
    {boss: "enem5",indexAbilities: [13]},
    {boss: "enem5",indexAbilities: [6,15]},
    {boss: "enem5",indexAbilities: [11,14]},
    {boss: "enem5",indexAbilities: [28,29,33],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Зверь с полотна — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [28,29,32],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Зверь с полотна — иной конец"},
    {boss: "enem5",indexAbilities: [30,33,29,32],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Зверь с полотна — завершение"},
    {boss: "enem5",indexAbilities: [17,18,19,20,21],isChain: true},
    {boss: "enem5",indexAbilities: [22,23,24,25,26,27],isChain: true}
];

// Лорные названия связок временных улучшений — пять разных предметов одной
// светлицы, словарь каждого строго завязан на его реальный предмет и его
// конкретное действие (правило 12.1): игла прокалывает и режет, катушка
// опутывает нитью, пяльцы живут собственным узором, вышивальщица размеренно
// прошивает, а вышитый зверь объединяет всё ремесло. Полных совпадений
// фраз между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Прошивень — костяная игла: остриё, нить, ушко, бант.
    enem1: {
        variant1: 'Костяной кураж', variant2: 'Ниточная хватка', variant3: 'Остриё-таран',
        variant4: 'Прошивной напор', variant5: 'Меткий укол', variant6: 'Бешеный укол',
        variant7: 'Костяной норов', variant8: 'Крепкое ушко', variant9: 'Ударный укол',
        variant10: 'Живучая нить', variant11: 'Колючее остриё', variant12: 'Укол и в темноту',
        variant13: 'Толстая нить', variant14: 'Неутомимый укол', variant15: 'Пружинистый укол',
        variant16: 'Острый кончик, зоркий глаз', variant17: 'Костяная удача', variant18: 'Верный укол',
        variant19: 'Молниеносный укол', variant20: 'Костяной нюх', variant21: 'Цепкое ушко',
        variant22: 'Юркий, несмотря на длину', variant23: 'Костяная стойкость', variant24: 'Долгий прокол, зоркий глаз',
        variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Стойкая нить',
        variant28: 'Укол наповал', variant29: 'Крепкий прошивень', variant30: 'Прошивная мощь',
        variant31: 'Укол с оглядкой', variant32: 'Живучее ушко', variant33: 'Юркий и костяной',
        variant34: 'Костяная прыть', variant35: 'Быстрый укол, крепкое ушко'
    },
    // Опутыш — катушка льна: петля, нить, дерево, захлёст.
    enem2: {
        variant1: 'Льняной кураж', variant2: 'Петлевая хватка', variant3: 'Катушка-таран',
        variant4: 'Опутывающий напор', variant5: 'Меткий захлёст', variant6: 'Бешеный захлёст',
        variant7: 'Льняной норов', variant8: 'Крепкая петля', variant9: 'Ударный захлёст',
        variant10: 'Живучий моток', variant11: 'Колючий деревянный обод', variant12: 'Захлёст и в темноту',
        variant13: 'Толстый моток', variant14: 'Неутомимый захлёст', variant15: 'Пружинистый захлёст',
        variant16: 'Серебристая нить, зоркий глаз', variant17: 'Льняная удача', variant18: 'Верный захлёст',
        variant19: 'Молниеносный захлёст', variant20: 'Льняной нюх', variant21: 'Цепкая петля',
        variant22: 'Юркий, несмотря на моток', variant23: 'Льняная стойкость', variant24: 'Долгий обмот, зоркий глаз',
        variant25: 'Ускользающий захлёст', variant26: 'Дикий захлёст', variant27: 'Стойкий моток',
        variant28: 'Захлёст наповал', variant29: 'Крепкий опутыш', variant30: 'Опутывающая мощь',
        variant31: 'Захлёст с оглядкой', variant32: 'Живучая петля', variant33: 'Юркий и льняной',
        variant34: 'Льняная прыть', variant35: 'Быстрый захлёст, крепкая петля'
    },
    // Узорник — красные пяльца: узор, крест, рама, стежок.
    enem3: {
        variant1: 'Узорный кураж', variant2: 'Крестовая хватка', variant3: 'Рама-таран',
        variant4: 'Узорчатый напор', variant5: 'Меткий зубец', variant6: 'Бешеный зубец',
        variant7: 'Узорный норов', variant8: 'Крепкая рама', variant9: 'Ударный зубец',
        variant10: 'Живучий крест', variant11: 'Колючий зубец', variant12: 'Зубец и в темноту',
        variant13: 'Толстая рама', variant14: 'Неутомимый зубец', variant15: 'Пружинистый зубец',
        variant16: 'Зубчатый узор, зоркий глаз', variant17: 'Узорная удача', variant18: 'Верный зубец',
        variant19: 'Молниеносный зубец', variant20: 'Узорный нюх', variant21: 'Цепкий крест',
        variant22: 'Юркий, несмотря на раму', variant23: 'Узорная стойкость', variant24: 'Долгий узор, зоркий глаз',
        variant25: 'Ускользающий зубец', variant26: 'Дикий зубец', variant27: 'Стойкая рама',
        variant28: 'Зубец наповал', variant29: 'Крепкий узорник', variant30: 'Узорчатая мощь',
        variant31: 'Зубец с оглядкой', variant32: 'Живучая рама', variant33: 'Юркий и узорный',
        variant34: 'Узорная прыть', variant35: 'Быстрый зубец, крепкая рама'
    },
    // Вышивень — тихая вышивальщица: стежок, узел, мешковина, солома.
    enem4: {
        variant1: 'Стежковый кураж', variant2: 'Узловая хватка', variant3: 'Стежок-таран',
        variant4: 'Прошивочный напор', variant5: 'Меткий стежок', variant6: 'Бешеный стежок',
        variant7: 'Стежковый норов', variant8: 'Крепкий узел', variant9: 'Ударный стежок',
        variant10: 'Живучая мешковина', variant11: 'Колючая солома', variant12: 'Стежок и в темноту',
        variant13: 'Толстая мешковина', variant14: 'Неутомимый стежок', variant15: 'Пружинистый стежок',
        variant16: 'Ровный узел, зоркий глаз', variant17: 'Стежковая удача', variant18: 'Верный стежок',
        variant19: 'Молниеносный стежок', variant20: 'Стежковый нюх', variant21: 'Цепкий узел',
        variant22: 'Юркая, несмотря на мешковину', variant23: 'Стежковая стойкость', variant24: 'Долгий шов, зоркий глаз',
        variant25: 'Ускользающий стежок', variant26: 'Дикий стежок', variant27: 'Стойкая мешковина',
        variant28: 'Стежок наповал', variant29: 'Крепкий вышивень', variant30: 'Прошивочная мощь',
        variant31: 'Стежок с оглядкой', variant32: 'Живучий узел', variant33: 'Юркая и стежковая',
        variant34: 'Стежковая прыть', variant35: 'Быстрый стежок, крепкий узел'
    },
    // Тканыш — вышитый зверь: полотно, орнамент, бахрома, шарф-хвост.
    enem5: {
        variant1: 'Тканый кураж', variant2: 'Бахромчатая хватка', variant3: 'Клык-таран',
        variant4: 'Полотняный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Тканый норов', variant8: 'Крепкий орнамент', variant9: 'Ударный рывок',
        variant10: 'Живучая бахрома', variant11: 'Колючая бахрома', variant12: 'Рывок и в темноту',
        variant13: 'Толстое полотно', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Вышитый оскал, дикий взгляд', variant17: 'Тканая удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Тканый нюх', variant21: 'Цепкий шарф-хвост',
        variant22: 'Юркий, несмотря на полотно', variant23: 'Тканая стойкость', variant24: 'Долгий разгон, дикий взгляд',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкое полотно',
        variant28: 'Рывок наповал', variant29: 'Крепкий тканыш', variant30: 'Полотняная мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучий орнамент', variant33: 'Юркий и тканый',
        variant34: 'Тканая прыть', variant35: 'Быстрый рывок, крепкий орнамент'
    }
};
