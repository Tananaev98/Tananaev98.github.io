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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.739, damageMultiplier: 1.824, minWaveDelay: 5200, minShotDelay: 111, minTelegraphMs: 563,
	phases: [
		{ phase: 1, minHp: 0.699, cadence: 1.016, speed: 1.046, damage: 0.956, telegraphMultiplier: 1.044, surpriseChance: 0.122, maxActiveAttacks: 38 },
		{ phase: 2, minHp: 0.351, cadence: 0.769, speed: 1.189, damage: 1.092, telegraphMultiplier: 0.884, surpriseChance: 0.219, maxActiveAttacks: 42 },
		{ phase: 3, minHp: 0, cadence: 0.636, speed: 1.309, damage: 1.242, telegraphMultiplier: 0.778, surpriseChance: 0.322, maxActiveAttacks: 46 }
	],
	bosses: {
		enem1: { combatIdentity: "Тройной прокол и извлечение из шва", combatTrick: "После трёх участков прокола игла ещё выходит из шва. Ошибка — бить после кончика, бросив выход. Окно после полного движения.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.993, telegraphMs: 967, speedMultiplier: 1.024, damageMultiplier: 0.89, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Отдача петли и затяжка после заминки", combatTrick: "Два участка отпущенной нити ещё стягиваются после заминки. Ошибка — бить на остановке либо закончить только первую сторону. Все участки видимы.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.837, telegraphMs: 887, speedMultiplier: 1.019, damageMultiplier: 1.03, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Две опоры, перемычка и возвращённый зубец", combatTrick: "Узор оставляет две более долгие опоры под быстрыми зубцами перемычки. Ошибка — уйти по новому стежку и бросить вернувшийся зубец. Закончить нужно весь узор.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.659, telegraphMs: 1027, speedMultiplier: 1.031, damageMultiplier: 1.16, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Ряд стежков с отдельной закрепкой", combatTrick: "Волнистые стежки не заканчивают работу: после ряда остаётся закрепка на другой полосе. Ошибка — бить после ряда, пропустив закрепляющий возврат.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.956, telegraphMs: 853, speedMultiplier: 1.042, damageMultiplier: 1.075, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Бросок полотна, вторая лапа и хвостовой конец", combatTrick: "После бокового броска остаются вторая лапа и самостоятельный хвостовой конец. Ошибка — бить после замаха либо забыть конец полотна после возврата.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.952, telegraphMs: 1017, speedMultiplier: 1.08, damageMultiplier: 1.185, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 24;
 const bossInterval = 27;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Прошивень =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.071 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.071 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.071 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.571 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.471 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.372 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.372 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.372 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.872 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.772 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.791 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.373 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.373 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.373 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.873 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.773 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.791 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.374 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.374 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.374 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.874 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.774 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.791 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.375 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.375 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.375 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.875 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.575 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.775 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.731 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.481 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.231 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.981 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.791 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.377 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.377 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.377 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.877 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.577 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.777 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.791 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.378 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.378 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.378 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.878 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.578 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.778 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.831 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.581 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.331 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.081 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.831 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.581 }, // 52 i

	// ===== Опутыш =====
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.271 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.271 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.271 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.771 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.971 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.272 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.272 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.272 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.772 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.972 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.793 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.273 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.273 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.273 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.773 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.973 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.793 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.274 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.274 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.274 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.774 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.974 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.793 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.275 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.275 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.275 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.775 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.975 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.475 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.713 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.463 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.213 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.793 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.277 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.277 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.277 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.777 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.977 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.477 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.793 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.278 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.278 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.278 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.778 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.978 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.478 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.678 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.813 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.563 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.313 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.063 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.813 }, // 51 i

	// ===== Узорник =====
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.411 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.411 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.411 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.411 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.911 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.611 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.412 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.412 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.412 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.412 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.912 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.612 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.795 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.413 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.413 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.413 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.413 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.913 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.613 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.795 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.414 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.414 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.414 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.414 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.914 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.614 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.795 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.415 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.415 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.415 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.415 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.915 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.615 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.691 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.441 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.191 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.941 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.795 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.417 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.417 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.417 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.417 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.917 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.617 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.817 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.795 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.418 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.418 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.418 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.418 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.918 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.618 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.818 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.791 }, // 53 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.541 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.291 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.041 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.791 }, // 57 i

	// ===== Вышивень =====
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.111, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.111, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.611, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.311, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.811, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.111, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.81 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.112, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.112, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.612, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.312, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.812, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.112, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.81 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.797, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.113, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.113, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.613, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.313, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.813, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.81 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.113, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 2.11 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.797, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.114, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.114, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.614, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.314, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.814, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.81 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.114, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 2.11 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.797, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.115, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.115, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.615, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.115, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 2.11 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.671, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.421, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.171, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.921, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.671, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.797, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.117, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.117, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.617, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.317, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.817, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.81 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.117, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 2.11 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.317, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 2.41 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.797, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.118, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.118, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.618, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.318, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.818, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.81 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.118, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 2.11 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.318, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 2.41 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.771, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.31 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.521, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 0.61 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.271, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 0.91 }, // 54 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.021, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.21 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.771, waveAmplitude: 2.31, waveFrequency: 1.41, wavePhase: 1.51 }, // 56 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.521, waveAmplitude: 2.71, waveFrequency: 1.71, wavePhase: 1.81 }, // 57 i

	// ===== Тканыш =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.799 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.511 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.511 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.511 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.811 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.811 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.511 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.211 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.799 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.912 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.912 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.512 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.212 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.212 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.912 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.612 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.112 }, // 16 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.799 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.913 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.913 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.513 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.213 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.213 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.913 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.613 }, // 24 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.113 }, // 25 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.799 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.914 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.914 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.514 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.214 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.214 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.914 }, // 32 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.614 }, // 33 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.114 }, // 34 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.799 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.915 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.915 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.515 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.215 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.215 }, // 40 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.915 }, // 41 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.615 }, // 42 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.115 }, // 43 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.251 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.001 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.751 }, // 46 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.501 }, // 47 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.251 }, // 48 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.001 }, // 49 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.917 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.917 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.517 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.217 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.217 }, // 54 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.917 }, // 55 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.117 }, // 56 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.918 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.918 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.119 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.218 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.218 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.918 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.533 }, // 63 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.351 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.101 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.851 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.601 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.351 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.101 }, // 69 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.851 }, // 70 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 189, bossDelayAbDop: 13301, firstWaveDelayMs: 2810 }, // Тройной прокол и извлечение из шва
	{ boss: 'enem2', bossDelayAb: 188, bossDelayAbDop: 16900, firstWaveDelayMs: 2810 }, // Отдача петли и затяжка после заминки
	{ boss: 'enem3', bossDelayAb: 191, bossDelayAbDop: 17001, firstWaveDelayMs: 2810 }, // Две опоры, перемычка и возвращённый зубец
	{ boss: 'enem4', bossDelayAb: 170, bossDelayAbDop: 12301, firstWaveDelayMs: 2810 }, // Ряд стежков с отдельной закрепкой
	{ boss: 'enem5', bossDelayAb: 149, bossDelayAbDop: 16500, firstWaveDelayMs: 2810 }, // Бросок полотна, вторая лапа и хвостовой конец
];

 const bossAbilitiesDop = [
	// Прошивень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 300, 450], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 150, 450] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [450, 0, 0, 600, 600] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [150, 0, 0, 450, 600] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27, 28], shotGapsMs: [0, 0, 0, 600, 0, 300] },
	{ boss: 'enem1', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 347, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Тройной прокол и извлечение из шва — знакомство" },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [0, 0, 0, 650, 0, 500] },
	{ boss: 'enem1', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [0, 0, 0, 600, 0, 450] },
	{ boss: 'enem1', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 379, shotGapsMs: [0, 0, 0, 0, 0], label: "Тройной прокол и извлечение из шва — завершение" },

	// Опутыш
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 0, 600], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 300, 0, 600] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [650, 0, 500, 0, 0] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 0, 650, 0, 0] },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27, 28], shotGapsMs: [450, 0, 0, 0, 0, 0] },
	{ boss: 'enem2', indexAbilities: [29, 30, 31], signature: true, isChain: true, shotDelayMs: 389, shotGapsMs: [0, 0], openingOrder: 1, label: "Отдача петли и затяжка после заминки — знакомство" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [600, 0, 150, 0, 300, 0] },
	{ boss: 'enem2', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [600, 0, 150, 0, 0, 450, 0] },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51], signature: true, isChain: true, minPhase: 3, shotDelayMs: 409, shotGapsMs: [0, 0, 0, 0], label: "Отдача петли и затяжка после заминки — завершение" },

	// Узорник
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [250, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [250, 250, 0, 0, 250, 650] },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [0, 250, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30, 31, 32], shotGapsMs: [500, 0, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 363, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Две опоры, перемычка и возвращённый зубец — знакомство" },
	{ boss: 'enem3', indexAbilities: [37, 38, 39, 40, 41, 42, 43, 44], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0, 250, 0] },
	{ boss: 'enem3', indexAbilities: [45, 46, 47, 48, 49, 50, 51, 52], minPhase: 3, shotGapsMs: [0, 250, 0, 0, 0, 500, 0] },
	{ boss: 'enem3', indexAbilities: [53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 397, shotGapsMs: [0, 0, 0, 0], label: "Две опоры, перемычка и возвращённый зубец — завершение" },

	// Вышивень
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 0, 300, 0, 450], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [300, 0, 300, 0, 450] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [600, 0, 0, 450, 0, 600] },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [450, 0, 0, 600, 0, 300] },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30], shotGapsMs: [0, 600, 0, 0] },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34, 35], signature: true, isChain: true, shotDelayMs: 353, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Ряд стежков с отдельной закрепкой — знакомство" },
	{ boss: 'enem4', indexAbilities: [36, 37, 38, 39, 40, 41, 42, 43], minPhase: 2, shotGapsMs: [0, 250, 0, 500, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [44, 45, 46, 47, 48, 49, 50, 51], minPhase: 3, shotGapsMs: [450, 0, 0, 600, 0, 300, 0] },
	{ boss: 'enem4', indexAbilities: [52, 53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [0, 0, 0, 0, 0], label: "Ряд стежков с отдельной закрепкой — завершение" },

	// Тканыш
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [500, 0, 0, 650, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15, 16], shotGapsMs: [250, 0, 0, 650, 0, 0, 0, 250] },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22, 23, 24, 25], shotGapsMs: [250, 0, 0, 0, 0, 0, 250, 650] },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 0, 0, 150, 0, 300, 450, 0] },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40, 41, 42, 43], shotGapsMs: [500, 0, 0, 650, 0, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [44, 45, 46, 47, 48, 49], signature: true, isChain: true, shotDelayMs: 371, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Бросок полотна, вторая лапа и хвостовой конец — знакомство" },
	{ boss: 'enem5', indexAbilities: [8, 50, 51, 52, 53, 54, 55, 56], minPhase: 2, shotGapsMs: [600, 0, 0, 150, 0, 300, 450] },
	{ boss: 'enem5', indexAbilities: [8, 57, 58, 59, 60, 61, 62, 63], minPhase: 3, shotGapsMs: [450, 0, 0, 0, 0, 300, 600] },
	{ boss: 'enem5', indexAbilities: [64, 65, 66, 67, 68, 69, 70], signature: true, isChain: true, minPhase: 3, shotDelayMs: 401, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Бросок полотна, вторая лапа и хвостовой конец — завершение" },

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
