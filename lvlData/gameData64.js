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
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.039,
	damageMultiplier: 1.862,
	minWaveDelay: 2885,
	minShotDelay: 183,
	minTelegraphMs: 596,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.575, cadence: 1.042, speed: 0.941, damage: 1.008, telegraphMultiplier: 1.05, surpriseChance: 0.0765, maxActiveAttacks: 12 },
		{ phase: 2, minHp: 0.255, cadence: 0.936, speed: 1.085, damage: 1.156, telegraphMultiplier: 0.997, surpriseChance: 0.1185, maxActiveAttacks: 15 },
		{ phase: 3, minHp: 0.00, cadence: 0.777, speed: 1.165, damage: 1.275, telegraphMultiplier: 0.874, surpriseChance: 0.169, maxActiveAttacks: 18 }
	],
	bosses: {
		enem1: { combatIdentity: "Лишняя отметка в списке", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4,
			// Пересчётница: TALLY_COUNT — счёт останавливается на каждой отметке списка
			movementStyle: 'pause', cadence: 1.070, telegraphMs: 960, speedMultiplier: 0.935, damageMultiplier: 0.915,
			speedVariance: [0.82, 0.89, 0.96, 1.03, 1.10]
		}, // Пересчётница: TALLY_COUNT — счёт останавливается на каждой отметке списка
		enem2: { combatIdentity: "Поворот пляски", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4,
			// Кружило: BEAR_DANCE — буквальное кружение пляски, тяжёлое и ритмичное
			movementStyle: 'weave', cadence: 0.965, telegraphMs: 705, speedMultiplier: 1.065, damageMultiplier: 1.025,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Кружило: BEAR_DANCE — буквальное кружение пляски, тяжёлое и ритмичное
		enem3: { combatIdentity: "Мехи вдыхают и выдыхают", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4,
			// Мехач: BELLOWS_SQUEEZE — мехи гармони набирают сжатие перед нотой
			movementStyle: 'accelerate', cadence: 1.185, telegraphMs: 1035, speedMultiplier: 0.770, damageMultiplier: 1.185,
			speedVariance: [0.90, 1.00, 1.10, 1.20, 1.30]
		}, // Мехач: BELLOWS_SQUEEZE — мехи гармони набирают сжатие перед нотой
		enem4: { combatIdentity: "Посох указывает другую полосу", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4,
			// Посошник: WARD_STRIKE — формальный, ритуально-прямой удар посохом
			movementStyle: 'straight', cadence: 0.845, telegraphMs: 725, speedMultiplier: 1.110, damageMultiplier: 1.000,
			speedVariance: [0.89, 0.99, 1.09, 1.19, 1.29]
		}, // Посошник: WARD_STRIKE — формальный, ритуально-прямой удар посохом
		enem5: { combatIdentity: "Жезл обрывает процессию", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4,
			// Жезловник: COMMAND_SWING — внезапный повелительный взмах жезлом
			movementStyle: 'lateRush', cadence: 0.880, telegraphMs: 945, speedMultiplier: 1.020, damageMultiplier: 1.165,
			speedVariance: [0.82, 0.93, 1.04, 1.15, 1.26]
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
        baseDamage: 20.05,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Кружило',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/2.webp',
        baseHP: 41303,
        baseSpeed: 0,
        baseDamage: 21.95,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Мехач',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/3.webp',
        baseHP: 73075,
        baseSpeed: 0,
        baseDamage: 24.15,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Посошник',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/4.webp',
        baseHP: 117556,
        baseSpeed: 0,
        baseDamage: 26.05,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Жезловник',
        image: 'images/enemies/regions/5_dom_dvor/lvl64/5.webp',
        baseHP: 177922,
        baseSpeed: 0,
        baseDamage: 28.05,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 3;
 const bossInterval = 4;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Пересчётница: TALLY_COUNT — счёт останавливается на каждой
	// отметке списка, деловито и без спешки =====
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //0 — нежданчик: отметка сразу без привычной долгой сверки
	{ boss: 'enem1', type: 'enem11', xPos: 67, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 }, //1 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 31, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, //2 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //3 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //4 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 53, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //5 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //6 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 53, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //7 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 28, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //8 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 41, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //10 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //11 — средняя атака
	// звенья «атакующей цепи» — резкие зигзагом отметки по списку, затем
	// твёрдая прямая черта окончательного счёта (zigzag+vertical),
	// раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //12 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //13 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //14 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //15 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //17 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //18 цепь-B звено 3

	// ===== Кружило: BEAR_DANCE — тяжёлый притоп на месте, затем кружащий
	// зигзаг пляски =====
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //0 — нежданчик: притоп сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 63, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 }, //1 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, //2 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 39, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 27, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //4 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 81, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //5 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 56, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //6 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 47, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 61, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21 }, //8 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 41, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 23 }, //9 — быстрая атака
	// звенья «атакующей цепи» — тяжёлый притоп на месте, затем кружащий
	// зигзаг пляски (vertical+zigzag), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //10 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //11 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //12 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //13 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //14 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //15 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //16 цепь-B звено 4

	// ===== Мехач: BELLOWS_SQUEEZE — широкое дугообразное растяжение
	// мехов, затем прямой диагональный аккорд =====
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //0 — нежданчик: аккорд раньше привычного долгого растяжения мехов
	{ boss: 'enem3', type: 'enem33', xPos: 93, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21 }, //1 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19 }, //2 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //3 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //4 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //5 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 53, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //6 — средняя нижняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 }, //7 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// звенья «атакующей цепи» — широкое дугообразное растяжение мехов,
	// затем прямой диагональный аккорд (arc+diagonal), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //10 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //11 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //12 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //13 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //14 цепь-B звено 3

	// ===== Посошник: WARD_STRIKE — ритуальный обережный взмах посохом в
	// одну сторону, затем в другую, как обведение защитного круга =====
	{ boss: 'enem4', type: 'enem44', xPos: 38, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 11,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //4 — нежданчик: удар разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21 }, //6 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //7 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //8 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //9 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 33, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //10 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //11 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 47, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //12 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 83, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 }, //14 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //15 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, //16 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// звенья «атакующей цепи» — обережный взмах посохом в одну сторону,
	// затем в другую (arc+arc), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //18 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //19 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //20 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //24 цепь-B звено 4

	// ===== Жезловник: COMMAND_SWING — повелительный созывающий жест всем
	// гостям сразу, затем один решительный удар жезлом =====
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //0
	{ boss: 'enem5', type: 'enem55', xPos: 28, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //3 — нежданчик: удар жезлом без единого мгновения созыва
	{ boss: 'enem5', type: 'enem55', xPos: 43, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 41, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //5 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 61, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //6 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //7 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //9 — средняя нижняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21 }, //10 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 29, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //11 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 81, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //12 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //14 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //15 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //16 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 39, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //17 — быстрая атака
	// звенья «атакующей цепи» — повелительный созывающий жест зигзагом
	// всем гостям сразу, затем один решительный удар жезлом по диагонали
	// (zigzag+diagonal), раздел 13.7 — финальная кульминация, самая длинная
	// цепь уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //18 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //19 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //20 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //21 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //22 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //23 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //24 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //25 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //26 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //27 цепь-B звено 6

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 16,yPos: 12,customHP: 1,customDamage: 20.05,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 30,yPos: 20,customHP: 1,customDamage: 20.05,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 78,yPos: 6,customHP: 1,customDamage: 20.05,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 16,yPos: 40,customHP: 1,customDamage: 20.05,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 16,yPos: 8,customHP: 1,customDamage: 20.05,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 88,yPos: 12,customHP: 1,customDamage: 20.05,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 12,customHP: 1,customDamage: 21.95,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 66,yPos: 20,customHP: 1,customDamage: 21.95,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 40,yPos: 6,customHP: 1,customDamage: 21.95,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 40,customHP: 1,customDamage: 21.95,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 84,yPos: 8,customHP: 1,customDamage: 21.95,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 18,yPos: 12,customHP: 1,customDamage: 21.95,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 12,customHP: 1,customDamage: 24.15,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 36,yPos: 20,customHP: 1,customDamage: 24.15,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 70,yPos: 6,customHP: 1,customDamage: 24.15,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 40,customHP: 1,customDamage: 24.15,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 8,customHP: 1,customDamage: 24.15,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 86,yPos: 12,customHP: 1,customDamage: 24.15,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 82,yPos: 12,customHP: 1,customDamage: 26.05,customSpeed: 16},
    {boss: "enem4",type: "enem44",xPos: 62,yPos: 20,customHP: 1,customDamage: 26.05,customSpeed: 14},
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 6,customHP: 1,customDamage: 26.05,customSpeed: 21},
    {boss: "enem4",type: "enem44",xPos: 82,yPos: 40,customHP: 1,customDamage: 26.05,customSpeed: 7},
    {boss: "enem4",type: "enem44",xPos: 82,yPos: 8,customHP: 1,customDamage: 26.05,customSpeed: 20},
    {boss: "enem4",type: "enem44",xPos: 48,yPos: 12,customHP: 1,customDamage: 26.05,customSpeed: 18},
    {boss: "enem5",type: "enem55",xPos: 20,yPos: 12,customHP: 1,customDamage: 28.05,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 48,yPos: 20,customHP: 1,customDamage: 28.05,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 86,yPos: 6,customHP: 1,customDamage: 28.05,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 20,yPos: 40,customHP: 1,customDamage: 28.05,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 20,yPos: 8,customHP: 1,customDamage: 28.05,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 48,yPos: 12,customHP: 1,customDamage: 28.05,customSpeed: 18}
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 303, bossDelayAbDop: 4973, firstWaveDelayMs: 2387 }, // деловитый ровный счёт
	{ boss: 'enem2', bossDelayAb: 218, bossDelayAbDop: 4588, firstWaveDelayMs: 2202 }, // самый частый — непрерывная пляска
	{ boss: 'enem3', bossDelayAb: 407, bossDelayAbDop: 6035, firstWaveDelayMs: 2400 }, // самый долгий отдых — растянутые мехи
	{ boss: 'enem4', bossDelayAb: 202, bossDelayAbDop: 4341, firstWaveDelayMs: 2084 }, // частые формальные удары посохом
	{ boss: 'enem5', bossDelayAb: 281, bossDelayAbDop: 4441, firstWaveDelayMs: 2132 }, // собранный финал
 ];

 const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0],openingOrder: 0},
    {boss: "enem1",indexAbilities: [1]},
    {boss: "enem1",indexAbilities: [2]},
    {boss: "enem1",indexAbilities: [10,8,3]},
    {boss: "enem1",indexAbilities: [19,23,20],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Лишняя отметка в списке — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [19,23,21],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Лишняя отметка в списке — иной конец"},
    {boss: "enem1",indexAbilities: [24,21,24,20],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Лишняя отметка в списке — завершение"},
    {boss: "enem1",indexAbilities: [12,13,14,15],isChain: true},
    {boss: "enem1",indexAbilities: [16,17,18],isChain: true},
    {boss: "enem2",indexAbilities: [0],openingOrder: 0},
    {boss: "enem2",indexAbilities: [1]},
    {boss: "enem2",indexAbilities: [2,3,6,7]},
    {boss: "enem2",indexAbilities: [5,4,9]},
    {boss: "enem2",indexAbilities: [7,8]},
    {boss: "enem2",indexAbilities: [17,18,19],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Поворот пляски — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [17,18,21],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Поворот пляски — иной конец"},
    {boss: "enem2",indexAbilities: [22,19,18,21],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Поворот пляски — завершение"},
    {boss: "enem2",indexAbilities: [10,11,12],isChain: true},
    {boss: "enem2",indexAbilities: [13,14,15,16],isChain: true},
    {boss: "enem3",indexAbilities: [0],openingOrder: 0},
    {boss: "enem3",indexAbilities: [7]},
    {boss: "enem3",indexAbilities: [8]},
    {boss: "enem3",indexAbilities: [2,5]},
    {boss: "enem3",indexAbilities: [15,19,17,20],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Мехи вдыхают и выдыхают — знакомство",openingOrder: 1,shotGapsMs: [360,900,360]},
    {boss: "enem3",indexAbilities: [15,19,20],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Мехи вдыхают и выдыхают — иной конец",shotGapsMs: [360,900,360]},
    {boss: "enem3",indexAbilities: [17,20,15,19],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Мехи вдыхают и выдыхают — завершение",shotGapsMs: [360,900,360]},
    {boss: "enem3",indexAbilities: [9,10,11],isChain: true},
    {boss: "enem3",indexAbilities: [12,13,14],isChain: true},
    {boss: "enem4",indexAbilities: [4,5]},
    {boss: "enem4",indexAbilities: [0,1,3,2]},
    {boss: "enem4",indexAbilities: [16],openingOrder: 0},
    {boss: "enem4",indexAbilities: [13]},
    {boss: "enem4",indexAbilities: [9,12,7]},
    {boss: "enem4",indexAbilities: [6,8]},
    {boss: "enem4",indexAbilities: [15,11]},
    {boss: "enem4",indexAbilities: [7,14,10]},
    {boss: "enem4",indexAbilities: [25,26,30],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Посох указывает другую полосу — знакомство",openingOrder: 1},
    {boss: "enem4",indexAbilities: [25,26,29],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Посох указывает другую полосу — иной конец"},
    {boss: "enem4",indexAbilities: [27,30,26,29],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Посох указывает другую полосу — завершение"},
    {boss: "enem4",indexAbilities: [17,18,19,20],isChain: true},
    {boss: "enem4",indexAbilities: [21,22,23,24],isChain: true},
    {boss: "enem5",indexAbilities: [0,1,2,4]},
    {boss: "enem5",indexAbilities: [3],openingOrder: 0},
    {boss: "enem5",indexAbilities: [11]},
    {boss: "enem5",indexAbilities: [15,14]},
    {boss: "enem5",indexAbilities: [5,9]},
    {boss: "enem5",indexAbilities: [13,6,7]},
    {boss: "enem5",indexAbilities: [8,16]},
    {boss: "enem5",indexAbilities: [17,10]},
    {boss: "enem5",indexAbilities: [28,30,33],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Жезл обрывает процессию — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [28,30,29],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Жезл обрывает процессию — иной конец"},
    {boss: "enem5",indexAbilities: [32,30,33,29],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Жезл обрывает процессию — завершение"},
    {boss: "enem5",indexAbilities: [18,19,20,21],isChain: true},
    {boss: "enem5",indexAbilities: [22,23,24,25,26,27],isChain: true}
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
