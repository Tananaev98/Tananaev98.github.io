// Уровень 64 «Свадебный двор» — двадцать шестой уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51-54/56-59/61-63) — последний
// перед многофазным финалом области, уровнем 65 (Чёрт).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-13 по
// admin-boss-pattern-panel.html, 315 строк, уровни 1-63 (включая свежую
// историю уровня 63).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl64/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — мешковинная маска-лицо в пышном алом головном уборе, в одной
//   руке свиток-список (даров/приданого), в другой когтистая хватка —
//   деловитая, ведёт учёт, а не просто угрожает.
// 2.webp — исполнитель в шкуре медведя с колокольцами и алым кушаком,
//   собственное соломенное лицо видно под мордой шкуры — плясун, ряженый
//   на потеху, чья пляска переходит в настоящую угрозу.
// 3.webp — скоморох в ярких полосатых одеждах и звенящем колпаке с бубенцом,
//   держит большую гармонь двумя когтистыми руками — вся суть в мехах
//   гармони: сжатие и растяжение, ритм, а не удар.
// 4.webp — рослая коряво-древесная фигура в венке из цветов, держит
//   украшенный лентами резной посох с птицей на навершии — ритуальный
//   страж-дружка с оберегающим жезлом, не просто драчун.
// 5.webp (финал) — самый нарядный и рослый силуэт, треугольный кокошник-
//   крыша с резными петухами, расписной жезл-трещотка с кольцом наверху,
//   огромная когтистая рука повелительно вытянута — распорядитель,
//   командующий всем праздником разом.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА — реальная обрядовая роль каждого участника свадьбы, не общий
// шаблон роли: сваха деловито ведёт счёт по списку → ряженый медведь
// пляшет и кружит на потеху → гармонист играет мехами в такт → дружка
// ритуально оберегает жезлом → распорядитель командует всем гулянием
// разом. Отличается от «Застолья» (уровень 59 — общий гвалт застолья) тем,
// что здесь не хаотичное чревоугодие, а СТРУКТУРИРОВАННЫЙ СВАДЕБНЫЙ ОБРЯД
// с чёткими ролями участников — более церемонное, ритуальное настроение.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные названия участников):
// Пересчётница (от «пересчитать» — деловитый счёт свахи по списку, не
// словарное «сваха»); Кружило (от «кружить» — пляска ряженого медведя, не
// словарное «медведь»/«плясун»); Мехач (от «мех» — гармонные мехи, не
// словарное «гармонист»); Посошник (от «посох» — ритуальный жезл дружки,
// не словарное «дружка»); Жезловник (от «жезл» — распорядительский жезл-
// трещотка, не словарное «распорядитель»).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-63:
// Пересчётница — pause (счёт останавливается на каждой отметке списка)
// 16%→17%; Кружило — weave (буквальное кружение пляски) 17%→18%; Мехач —
// accelerate (мехи гармони набирают сжатие перед нотой) 14%→15%;
// Посошник — straight (формальный, ритуально-прямой удар посохом)
// 14%→15%; Жезловник — lateRush (внезапный повелительный взмах жезлом)
// 19%→20%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (метод закреплён на
// уровнях 57-63 — пары проверяются ДО записи файла): Пересчётница —
// zigzag(4)+vertical(3): резкие зигзагом отметки по списку, затем твёрдая
// прямая черта окончательного счёта (пара с нулевой историей для enem1);
// Кружило — vertical(3)+zigzag(4): тяжёлый притоп на месте, затем кружащий
// зигзаг пляски (пара с нулевой историей для enem2); Мехач — arc(3)+
// diagonal(3): широкое дугообразное растяжение мехов, затем прямой
// диагональный аккорд (пара с нулевой историей для enem3); Посошник —
// arc(4)+arc(4): ритуальный обережный взмах посохом в одну сторону, затем
// в другую — как обведение защитного круга (пара с нулевой историей для
// enem4, повтор формы оправдан симметричным обрядовым жестом); Жезловник
// — zigzag(4)+diagonal(6): повелительный созывающий жест зигзагом всем
// гостям сразу, затем один решительный удар жезлом по диагонали — самая
// длинная цепь уровня, ограничена 6 звеньями по разделу 13.5 (пара с
// нулевой историей для enem5). Формы всех пяти пар подтверждены живым
// классификатором панели ПОСЛЕ записи файла (verify64.js + STEP 2), не
// только ручным расчётом.
let lvlNumber = 64;

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
			// Пересчётница: TALLY_COUNT — счёт останавливается на каждой отметке списка
			movementStyle: 'pause', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Пересчётница: TALLY_COUNT — счёт останавливается на каждой отметке списка
		enem2: {
			// Кружило: BEAR_DANCE — буквальное кружение пляски, тяжёлое и ритмичное
			movementStyle: 'weave', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Кружило: BEAR_DANCE — буквальное кружение пляски, тяжёлое и ритмичное
		enem3: {
			// Мехач: BELLOWS_SQUEEZE — мехи гармони набирают сжатие перед нотой
			movementStyle: 'accelerate', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Мехач: BELLOWS_SQUEEZE — мехи гармони набирают сжатие перед нотой
		enem4: {
			// Посошник: WARD_STRIKE — формальный, ритуально-прямой удар посохом
			movementStyle: 'straight', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Посошник: WARD_STRIKE — формальный, ритуально-прямой удар посохом
		enem5: {
			// Жезловник: COMMAND_SWING — внезапный повелительный взмах жезлом
			movementStyle: 'lateRush', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Жезловник: COMMAND_SWING — внезапный повелительный взмах жезлом
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl64/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl64/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl64/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl64/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl64/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Пересчётница',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/1.webp',
        baseHP: 16521,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '20%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Кружило',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/2.webp',
        baseHP: 41303,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Мехач',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/3.webp',
        baseHP: 73075,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '23%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Посошник',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/4.webp',
        baseHP: 117556,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Жезловник',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/5.webp',
        baseHP: 177922,
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
	// ===== Пересчётница: TALLY_COUNT — счёт останавливается на каждой
	// отметке списка, деловито и без спешки =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: отметка сразу без привычной долгой сверки
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — резкие зигзагом отметки по списку, затем
	// твёрдая прямая черта окончательного счёта (zigzag+vertical),
	// раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //21 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //22 цепь-B звено 3

	// ===== Кружило: BEAR_DANCE — тяжёлый притоп на месте, затем кружащий
	// зигзаг пляски =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: притоп сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — тяжёлый притоп на месте, затем кружащий
	// зигзаг пляски (vertical+zigzag), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Мехач: BELLOWS_SQUEEZE — широкое дугообразное растяжение
	// мехов, затем прямой диагональный аккорд =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: аккорд раньше привычного долгого растяжения мехов
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — широкое дугообразное растяжение мехов,
	// затем прямой диагональный аккорд (arc+diagonal), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //21 цепь-B звено 3

	// ===== Посошник: WARD_STRIKE — ритуальный обережный взмах посохом в
	// одну сторону, затем в другую, как обведение защитного круга =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: удар разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — обережный взмах посохом в одну сторону,
	// затем в другую (arc+arc), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Жезловник: COMMAND_SWING — повелительный созывающий жест всем
	// гостям сразу, затем один решительный удар жезлом =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: удар жезлом без единого мгновения созыва
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — повелительный созывающий жест зигзагом
	// всем гостям сразу, затем один решительный удар жезлом по диагонали
	// (zigzag+diagonal), раздел 13.7 — финальная кульминация, самая длинная
	// цепь уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //25 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // деловитый ровный счёт
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — непрерывная пляска
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — растянутые мехи
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частые формальные удары посохом
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Пересчётница — TALLY_COUNT
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резкой отметкой
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem1', indexAbilities: [20, 21, 22], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: отметка сразу без привычной долгой сверки
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: полная сверка списка через всё поле разом

	// Кружило — BEAR_DANCE
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных притопов подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной притоп с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: непрерывная пляска по всему полю подряд

	// Мехач — BELLOWS_SQUEEZE
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним аккордом
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: аккорд раньше привычного долгого растяжения мехов
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: аккорд с обеих сторон разом

	// Посошник — WARD_STRIKE
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: удар разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: обережный обход всего поля разом

	// Жезловник — COMMAND_SWING, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (6, максимум уровня)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: удар жезлом без единого мгновения созыва
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: повелительный взмах через весь двор разом
 ];

// Лорные названия связок временных улучшений — пять разных участников
// одной свадьбы, словарь каждого строго завязан на его реальную обрядовую
// роль (правило 12.1): сваха деловито считает и метит список, ряженый
// медведь пляшет и кружит, гармонист играет мехами, дружка обороняет
// посохом, а распорядитель командует жезлом всем гулянием. Полных
// совпадений фраз между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Пересчётница — деловитая сваха: список, лента, бубенец, счёт.
    enem1: {
        variant1: 'Деловитый кураж', variant2: 'Ленточная хватка', variant3: 'Свиток-таран',
        variant4: 'Счётный напор', variant5: 'Меткая отметка', variant6: 'Бешеная отметка',
        variant7: 'Деловитый норов', variant8: 'Крепкий список', variant9: 'Ударная отметка',
        variant10: 'Живучий бубенец', variant11: 'Колючая лента', variant12: 'Отметка и в темноту',
        variant13: 'Толстый список', variant14: 'Неутомимая отметка', variant15: 'Пружинистая отметка',
        variant16: 'Алая лента, зоркий глаз', variant17: 'Деловитая удача', variant18: 'Верная отметка',
        variant19: 'Молниеносная отметка', variant20: 'Деловитый нюх', variant21: 'Цепкий свиток',
        variant22: 'Юркая, несмотря на список', variant23: 'Деловитая стойкость', variant24: 'Долгая сверка, зоркий глаз',
        variant25: 'Ускользающая отметка', variant26: 'Дикая отметка', variant27: 'Стойкий список',
        variant28: 'Отметка наповал', variant29: 'Крепкая пересчётница', variant30: 'Счётная мощь',
        variant31: 'Отметка с оглядкой', variant32: 'Живучий список', variant33: 'Юркая и деловитая',
        variant34: 'Деловитая прыть', variant35: 'Быстрая отметка, крепкий список'
    },
    // Кружило — ряженый медведь: шкура, колокольцы, притоп, кушак.
    enem2: {
        variant1: 'Ряженый кураж', variant2: 'Шкурная хватка', variant3: 'Притоп-таран',
        variant4: 'Плясовой напор', variant5: 'Меткий притоп', variant6: 'Бешеный притоп',
        variant7: 'Ряженый норов', variant8: 'Крепкий кушак', variant9: 'Ударный притоп',
        variant10: 'Живучий колокольчик', variant11: 'Колючая шкура', variant12: 'Притоп и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый притоп', variant15: 'Пружинистый притоп',
        variant16: 'Звонкий колокольчик, зоркий глаз', variant17: 'Ряженая удача', variant18: 'Верный притоп',
        variant19: 'Молниеносный притоп', variant20: 'Ряженый нюх', variant21: 'Цепкий кушак',
        variant22: 'Юркий, несмотря на шкуру', variant23: 'Ряженая стойкость', variant24: 'Долгая пляска, зоркий глаз',
        variant25: 'Ускользающий притоп', variant26: 'Дикий притоп', variant27: 'Стойкая шкура',
        variant28: 'Притоп наповал', variant29: 'Крепкое кружило', variant30: 'Плясовая мощь',
        variant31: 'Притоп с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и ряженый',
        variant34: 'Плясовая прыть', variant35: 'Быстрый притоп, крепкая шкура'
    },
    // Мехач — весёлый гармонист: мехи, колпак, лады, бубенец.
    enem3: {
        variant1: 'Гармонный кураж', variant2: 'Ладовая хватка', variant3: 'Мехи-таран',
        variant4: 'Голосистый напор', variant5: 'Меткий аккорд', variant6: 'Бешеный аккорд',
        variant7: 'Гармонный норов', variant8: 'Крепкий колпак', variant9: 'Ударный аккорд',
        variant10: 'Живучий наигрыш', variant11: 'Колючий колпак', variant12: 'Аккорд и в темноту',
        variant13: 'Толстые мехи', variant14: 'Неутомимый аккорд', variant15: 'Пружинистый аккорд',
        variant16: 'Звонкий бубенец, зоркий глаз', variant17: 'Гармонная удача', variant18: 'Верный аккорд',
        variant19: 'Молниеносный аккорд', variant20: 'Гармонный нюх', variant21: 'Цепкие лады',
        variant22: 'Юркий, несмотря на мехи', variant23: 'Гармонная стойкость', variant24: 'Долгий наигрыш, зоркий глаз',
        variant25: 'Ускользающий аккорд', variant26: 'Дикий аккорд', variant27: 'Стойкие мехи',
        variant28: 'Аккорд наповал', variant29: 'Крепкий мехач', variant30: 'Голосистая мощь',
        variant31: 'Аккорд с оглядкой', variant32: 'Живучие мехи', variant33: 'Юркий и гармонный',
        variant34: 'Голосистая прыть', variant35: 'Быстрый аккорд, крепкие мехи'
    },
    // Посошник — свадебный дружка: посох, венок, лента, оберег.
    enem4: {
        variant1: 'Обережный кураж', variant2: 'Посошная хватка', variant3: 'Посох-таран',
        variant4: 'Дружкин напор', variant5: 'Меткий взмах', variant6: 'Бешеный взмах',
        variant7: 'Обережный норов', variant8: 'Крепкий венок', variant9: 'Ударный взмах',
        variant10: 'Живучий оберег', variant11: 'Колючая ветка', variant12: 'Взмах и в темноту',
        variant13: 'Толстый посох', variant14: 'Неутомимый взмах', variant15: 'Пружинистый взмах',
        variant16: 'Резная птица, зоркий глаз', variant17: 'Обережная удача', variant18: 'Верный взмах',
        variant19: 'Молниеносный взмах', variant20: 'Обережный нюх', variant21: 'Цепкий посох',
        variant22: 'Юркий, несмотря на посох', variant23: 'Обережная стойкость', variant24: 'Долгий обход, зоркий глаз',
        variant25: 'Ускользающий взмах', variant26: 'Дикий взмах', variant27: 'Стойкий венок',
        variant28: 'Взмах наповал', variant29: 'Крепкий посошник', variant30: 'Дружкина мощь',
        variant31: 'Взмах с оглядкой', variant32: 'Живучий венок', variant33: 'Юркий и обережный',
        variant34: 'Дружкина прыть', variant35: 'Быстрый взмах, крепкий посох'
    },
    // Жезловник — свадебный распорядитель: жезл, кокошник, петух, лента.
    enem5: {
        variant1: 'Повелительный кураж', variant2: 'Кокошная хватка', variant3: 'Жезл-таран',
        variant4: 'Распорядительный напор', variant5: 'Меткий жест', variant6: 'Бешеный жест',
        variant7: 'Повелительный норов', variant8: 'Крепкий кокошник', variant9: 'Ударный жест',
        variant10: 'Живучая свита', variant11: 'Колючий петух', variant12: 'Жест и в темноту',
        variant13: 'Толстый кокошник', variant14: 'Неутомимый жест', variant15: 'Пружинистый жест',
        variant16: 'Резной петух, дикий взгляд', variant17: 'Повелительная удача', variant18: 'Верный жест',
        variant19: 'Молниеносный жест', variant20: 'Повелительный нюх', variant21: 'Цепкий жезл',
        variant22: 'Юркий, несмотря на стать', variant23: 'Повелительная стойкость', variant24: 'Долгий созыв, дикий взгляд',
        variant25: 'Ускользающий жест', variant26: 'Дикий жест', variant27: 'Стойкий кокошник',
        variant28: 'Жест наповал', variant29: 'Крепкий жезловник', variant30: 'Распорядительная мощь',
        variant31: 'Жест с оглядкой', variant32: 'Живучий кокошник', variant33: 'Юркий и повелительный',
        variant34: 'Распорядительная прыть', variant35: 'Быстрый жест, крепкий кокошник'
    }
};
