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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.733, damageMultiplier: 1.862, minWaveDelay: 5500, minShotDelay: 118, minTelegraphMs: 581,
	phases: [
		{ phase: 1, minHp: 0.69, cadence: 0.959, speed: 1.053, damage: 1.008, telegraphMultiplier: 1.047, surpriseChance: 0.125, maxActiveAttacks: 41 },
		{ phase: 2, minHp: 0.338, cadence: 0.766, speed: 1.195, damage: 1.156, telegraphMultiplier: 0.887, surpriseChance: 0.225, maxActiveAttacks: 45 },
		{ phase: 3, minHp: 0, cadence: 0.611, speed: 1.315, damage: 1.275, telegraphMultiplier: 0.783, surpriseChance: 0.325, maxActiveAttacks: 49 }
	],
	bosses: {
		enem1: { combatIdentity: "Подача дара и сверка незакрытой отметки", combatTrick: "Подача дара не закрывает пункт: остаётся сверка отметки. Ошибка — бить в паузе счёта или после первой подачи. Закончить нужно обе части пункта.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.661, telegraphMs: 983, speedMultiplier: 1.019, damageMultiplier: 0.915, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Поворот шкуры и оставленный тяжёлый притоп", combatTrick: "Поворот шкуры продолжается тяжёлым притопом. Ошибка — бить после поворота либо уйти за шкурой, забыв опорный шаг.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.977, telegraphMs: 905, speedMultiplier: 1.029, damageMultiplier: 1.025, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Расход мехов и сходящаяся складка такта", combatTrick: "После двух долгих краёв мехи ещё сходятся короткой складкой такта. Ошибка — бить на растяжении, не закончив аккорд.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.963, telegraphMs: 1045, speedMultiplier: 1.032, damageMultiplier: 1.185, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Провод древка и ленточное закрытие прохода", combatTrick: "Прямой провод посоха оставляет ленту, закрывающую проход. Ошибка — бить после древка, бросив ленточный конец.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.947, telegraphMs: 871, speedMultiplier: 1.036, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Созыв двух сторон и отдельное отпускание жезла", combatTrick: "После сбора двух сторон остаётся отпускающий жест. Ошибка — бить после первого внутреннего возврата либо бросить последнее отпускание.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.929, telegraphMs: 1033, speedMultiplier: 1.059, damageMultiplier: 1.165, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 27;
 const bossInterval = 30;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Пересчётница =====
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.731 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.131 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.131 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.131 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.331 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.931 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.731 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.832 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.832 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.832 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.332 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.532 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.632 }, // 12 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.731 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.833 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.833 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.833 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.333 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.533 }, // 18 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.633 }, // 19 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.731 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.834 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.834 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.834 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.334 }, // 24 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.534 }, // 25 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.634 }, // 26 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.835 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.835 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.835 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.335 }, // 30 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.535 }, // 31 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.635 }, // 32 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.671 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.421 }, // 34 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.171 }, // 35 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.637 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.917 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.637 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.137 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.337 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.437 }, // 41 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.637 }, // 42 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.838 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.838 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.838 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.338 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.538 }, // 47 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.638 }, // 48 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15.838 }, // 49 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.771 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.521 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.271 }, // 52 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.021 }, // 53 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.771 }, // 54 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.521 }, // 55 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.271 }, // 56 i

	// ===== Кружило =====
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.733 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.731 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.731 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.231 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.231 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.031 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.732 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.732 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.232 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.232 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.032 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.733 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.733 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.733 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.233 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.233 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.033 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.733 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.734 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.734 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.234 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.234 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.034 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.733 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.735 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.735 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.235 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.235 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.035 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.653 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.403 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.153 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.903 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.733 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.737 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.737 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.237 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.237 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.037 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.437 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.738 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.738 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.238 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.238 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.038 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.638 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.753 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.503 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.253 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.003 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.753 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.503 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.253 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.739 }, // 53 j
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.739 }, // 54 j
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.239 }, // 55 j
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.039 }, // 56 j

	// ===== Мехач =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.351, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.351, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.351, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.151, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.651, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.951, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.352, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.352, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.352, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.152, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.652, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.952, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.735, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.353, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.353, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.353, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.153, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.653, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.953, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.735, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.354, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.354, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.354, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.154, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.654, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.954, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.735, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.355, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.355, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.155, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.655, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.455, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.955, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.631, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.381, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.131, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.881, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.735, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.357, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.357, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.357, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.157, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.657, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.957, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.157, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.358, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.358, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.358, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.158, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.658, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.958, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.158, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.731, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 52 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.481, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 53 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.231, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.981, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.731, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.481, waveAmplitude: 1.43, waveFrequency: 1.23, wavePhase: 0.43 }, // 57 i

	// ===== Посошник =====
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.771 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.771 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.271 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.271 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.071 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.772 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.772 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.272 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.272 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.072 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.737 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.773 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.773 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.273 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.273 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.073 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.473 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.737 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.774 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.774 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.274 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.274 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.074 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.737 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.775 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.775 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.275 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.275 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.075 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.611 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.361 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.111 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.861 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.777 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.777 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.277 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.277 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.077 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.477 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.778 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.778 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.278 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.278 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.078 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.478 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.711 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.461 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.211 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.961 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.711 }, // 49 i

	// ===== Жезловник =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.739 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.821 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.321 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.451 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.521 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.621 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.651 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.721 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.739 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.822 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.322 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.452 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.522 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.622 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.022 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.722 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.222 }, // 16 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.739 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.823 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.323 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.453 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.523 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.623 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.023 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.723 }, // 24 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.223 }, // 25 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.824 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.324 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.454 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.524 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.624 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.024 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.724 }, // 32 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.825 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.325 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.455 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.525 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.625 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.025 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.725 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.225 }, // 40 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.191 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.941 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.691 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.441 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.191 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.941 }, // 46 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.827 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.327 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.457 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.527 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.627 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.027 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.727 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.828 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.328 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.458 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.528 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.628 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.028 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.728 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.291 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.041 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.791 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.541 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.291 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.041 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.791 }, // 67 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 192, bossDelayAbDop: 17800, firstWaveDelayMs: 2870 }, // Подача дара и сверка незакрытой отметки
	{ boss: 'enem2', bossDelayAb: 193, bossDelayAbDop: 14000, firstWaveDelayMs: 2870 }, // Поворот шкуры и оставленный тяжёлый притоп
	{ boss: 'enem3', bossDelayAb: 194, bossDelayAbDop: 15300, firstWaveDelayMs: 2870 }, // Расход мехов и сходящаяся складка такта
	{ boss: 'enem4', bossDelayAb: 173, bossDelayAbDop: 14100, firstWaveDelayMs: 2870 }, // Провод древка и ленточное закрытие прохода
	{ boss: 'enem5', bossDelayAb: 148, bossDelayAbDop: 17000, firstWaveDelayMs: 2870 }, // Созыв двух сторон и отдельное отпускание жезла
];

 const bossAbilitiesDop = [
	// Пересчётница
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11, 12], shotGapsMs: [500, 0, 250, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [13, 14, 15, 16, 17, 18, 19], shotGapsMs: [0, 0, 0, 250, 250, 500] },
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24, 25, 26], shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem1', indexAbilities: [0, 27, 28, 29, 30, 31, 32], shotGapsMs: [250, 0, 0, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [33, 34, 35], signature: true, isChain: true, shotDelayMs: 353, shotGapsMs: [0, 0], openingOrder: 1, label: "Подача дара и сверка незакрытой отметки — знакомство" },
	{ boss: 'enem1', indexAbilities: [0, 36, 37, 38, 39, 40, 41, 42], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [0, 43, 44, 45, 46, 47, 48, 49], minPhase: 3, shotGapsMs: [650, 0, 250, 0, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [50, 51, 52, 53, 54, 55, 56], signature: true, isChain: true, minPhase: 3, shotDelayMs: 385, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Подача дара и сверка незакрытой отметки — завершение" },

	// Кружило
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [650, 0, 650, 650, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 0, 500] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [650, 0, 0, 500, 0] },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [650, 0, 0, 250, 650] },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [500, 0, 0, 650, 0] },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 395, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Поворот шкуры и оставленный тяжёлый притоп — знакомство" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [600, 0, 150, 0, 0, 300] },
	{ boss: 'enem2', indexAbilities: [11, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [0, 0, 250, 500, 500, 250] },
	{ boss: 'enem2', indexAbilities: [46, 47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 415, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Поворот шкуры и оставленный тяжёлый притоп — завершение" },
	{ boss: 'enem2', indexAbilities: [53, 54, 55, 56], minPhase: 2, shotGapsMs: [0, 0, 300] },

	// Мехач
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 0, 0, 0, 500], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [650, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [650, 650, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [650, 650, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30, 31, 32], shotGapsMs: [650, 0, 0, 0, 650, 650] },
	{ boss: 'enem3', indexAbilities: [33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 369, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Расход мехов и сходящаяся складка такта — знакомство" },
	{ boss: 'enem3', indexAbilities: [37, 38, 39, 40, 41, 42, 43, 44], minPhase: 2, shotGapsMs: [650, 650, 0, 250, 0, 650, 250] },
	{ boss: 'enem3', indexAbilities: [12, 45, 46, 47, 48, 49, 50, 51], minPhase: 3, shotGapsMs: [650, 650, 0, 0, 0, 500, 0] },
	{ boss: 'enem3', indexAbilities: [52, 53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 403, shotGapsMs: [0, 0, 0, 0, 0], label: "Расход мехов и сходящаяся складка такта — завершение" },

	// Посошник
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 300, 600, 150] },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [500, 0, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [650, 250, 0, 250, 0] },
	{ boss: 'enem4', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 359, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Провод древка и ленточное закрытие прохода — знакомство" },
	{ boss: 'enem4', indexAbilities: [10, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [650, 0, 0, 0, 250, 650] },
	{ boss: 'enem4', indexAbilities: [10, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [500, 0, 0, 0, 250, 0] },
	{ boss: 'enem4', indexAbilities: [45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 399, shotGapsMs: [0, 0, 0, 0], label: "Провод древка и ленточное закрытие прохода — завершение" },

	// Жезловник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [650, 0, 0, 0, 0, 250, 650], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15, 16], shotGapsMs: [650, 0, 0, 0, 0, 0, 650, 0] },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22, 23, 24, 25], shotGapsMs: [0, 0, 0, 0, 0, 0, 650, 0] },
	{ boss: 'enem5', indexAbilities: [0, 26, 27, 28, 29, 30, 31, 32], shotGapsMs: [650, 0, 0, 0, 0, 250, 650] },
	{ boss: 'enem5', indexAbilities: [0, 33, 34, 35, 36, 37, 38, 39, 40], shotGapsMs: [500, 0, 0, 0, 0, 250, 650, 0] },
	{ boss: 'enem5', indexAbilities: [41, 42, 43, 44, 45, 46], signature: true, isChain: true, shotDelayMs: 377, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Созыв двух сторон и отдельное отпускание жезла — знакомство" },
	{ boss: 'enem5', indexAbilities: [0, 47, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [650, 0, 0, 0, 0, 250, 650] },
	{ boss: 'enem5', indexAbilities: [0, 54, 55, 56, 57, 58, 59, 60], minPhase: 3, shotGapsMs: [500, 0, 0, 0, 0, 250, 650] },
	{ boss: 'enem5', indexAbilities: [61, 62, 63, 64, 65, 66, 67], signature: true, isChain: true, minPhase: 3, shotDelayMs: 407, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Созыв двух сторон и отдельное отпускание жезла — завершение" },

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
