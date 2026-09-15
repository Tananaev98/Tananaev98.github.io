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
			// Прошивень: NEEDLE_PIERCE — игла не виляет, идёт строго прямо насквозь
			movementStyle: 'straight', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Прошивень: NEEDLE_PIERCE — игла не виляет, идёт строго прямо насквозь
		enem2: {
			// Опутыш: SNARE_LOOP — петля выжидает и резко захлопывается, как силок
			movementStyle: 'pause', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Опутыш: SNARE_LOOP — петля выжидает и резко захлопывается, как силок
		enem3: {
			// Узорник: LIVING_ZIGZAG — сам узор ломаный, атакует в форме собственного лица
			movementStyle: 'weave', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Узорник: LIVING_ZIGZAG — сам узор ломаный, атакует в форме собственного лица
		enem4: {
			// Вышивень: STITCH_RHYTHM — игла ходит вверх-вниз через ткань размеренной волной
			movementStyle: 'wave', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Вышивень: STITCH_RHYTHM — игла ходит вверх-вниз через ткань размеренной волной
		enem5: {
			// Тканыш: WOVEN_POUNCE — хищник с полотна копит рывок перед прыжком
			movementStyle: 'accelerate', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
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
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '18%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Опутыш',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/2.webp',
        baseHP: 38985,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '22%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Узорник',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/3.webp',
        baseHP: 68974,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '22%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Вышивень',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/4.webp',
        baseHP: 110958,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Тканыш',
        image: 'images/enemies/regions/5_dom_dvor/lvl61/5.webp',
        baseHP: 167937,
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
	// ===== Прошивень: NEEDLE_PIERCE — игла не виляет, идёт строго прямо
	// насквозь, точный укол без размаха =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: укол сразу без привычного долгого замаха
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — укол наискось внутрь, затем прямое
	// извлечение (diagonal+vertical), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //21 цепь-B звено 3

	// ===== Опутыш: SNARE_LOOP — петля выжидает и резко захлопывается,
	// как силок, симметрично с обеих сторон =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: петля захлопывается сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — петля взлетает дугой в одну сторону,
	// затем дугой в другую (arc+arc), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Узорник: LIVING_ZIGZAG — сам узор ломаный, атакует в форме
	// собственного зубчатого лица =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: узор рвётся раньше привычного медленного нарастания
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — собственный зубчатый узор атакует зигзагом,
	// во второй связке ещё гуще (zigzag+zigzag), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //24 цепь-B звено 5

	// ===== Вышивень: STITCH_RHYTHM — игла ходит вверх-вниз через ткань
	// размеренной волной, спокойно и без спешки =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: стежок разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — один размеренный стежок наискось, затем
	// бегущий стежок зигзагом вдоль линии (diagonal+zigzag), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Тканыш: WOVEN_POUNCE — хищник с полотна копит рывок перед
	// прыжком, объединяет все мотивы разом =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: прыжок без единого мгновения подготовки
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — хаотичный многонаправленный бросок всего
	// полотна разом, затем один решительный диагональный рывок хищника
	// (irregular+diagonal), раздел 13.7 — финальная кульминация.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //26 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // точные редкие уколы
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — выжидающая петля
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — узор копит рисунок
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частые размеренные стежки
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Прошивень — NEEDLE_PIERCE
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким уколом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: укол сразу без привычного долгого замаха
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: прошивка через всё поле разом

	// Опутыш — SNARE_LOOP
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных захлопов подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной захлоп с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия петель по всему полю подряд

	// Узорник — LIVING_ZIGZAG
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним зубцом узора
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: узор рвётся раньше привычного медленного нарастания
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: узор с обеих сторон разом

	// Вышивень — STITCH_RHYTHM
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним стежком
	{ boss: 'enem4', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: стежок разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: непрерывная строчка через всё поле

	// Тканыш — WOVEN_POUNCE, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним рывком
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (6, максимум уровня)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: прыжок без единого мгновения подготовки
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: вышитый зверь захватывает весь двор разом
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
