// Уровень 53 «Деревенская ярмарка» — тринадцатый уровень области V,
// обычный (пять разных монстров, как 41-44/46-49/51-52).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 260 строк, уровни 1-52.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl53/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — бочкотелый силач с расшитой рубахой и огромным ярмарочным
//   молотом (игра «на силу»). Архетип — сама суть этой ярмарочной игры:
//   один чётко телеграфированный тяжёлый замах сверху, предельно читаемый
//   (роль enem1, знакомство) — сверено: STRONGMAN_SWING новый.
// 2.webp — деревянная кукла-петрушка на верёвках: резкая, дёрганая поза,
//   маленькая дубинка. Обоснование скорости роли: марионетка не движется
//   плавно — её ДЁРГАЮТ за нити от точки к точке рывками. Архетип —
//   быстрые дискретные «прыжки» между позициями без плавного перехода
//   (роль enem2, быстрые серии) — сверено: MARIONETTE_JERK новый.
// 3.webp — медные весы: две чаши на цепях, ножки — гири. Архетип — весы
//   МЕДЛЕННО клонятся то в одну, то в другую сторону (одна чаша идёт вниз
//   — атака, другая вверх), и лишь изредка резко ПЕРЕВЕШИВАЮТ обеими
//   чашами разом — редкое и тяжёлое, прямо то, чем физически является
//   весы (роль enem3) — сверено: SCALE_TIP новый.
// 4.webp — крикливый торговец: широко раскрытый кричащий рот, охапка
//   товаров. Архетип — непрерывный частый залп одиночных выкриков-ударов
//   почти без пауз, буквально «крикливый» без остановки (роль enem4,
//   нервный) — сверено: HAWKER_BARRAGE новый; отличен от SHOVEL_FLURRY
//   Замуча (52, размеренный рабочий темп) плотностью и отсутствием ритма
//   вообще — это не труд, а несмолкающий крик.
// 5.webp — ярмарочный голова: гигантская восковая печать в одной руке,
//   церемониальный посох с колокольцем в другой. Архетип — чередует
//   тяжёлый штемпель-удар печатью с «оглашением» посохом, разом
//   поднимающим несколько точек по всему полю (власть распорядителя,
//   объявляющего указ сразу всем) (роль enem5, финал) — сверено: SEAL_AND_
//   DECREE новый, отличен от HOOK_AND_ROPE Багорыча (48, два дальних
//   одиночных инструмента) и HOE_AND_SHOWER Грядочника (51, рубящий удар +
//   направленная линия) — здесь печать даёт ОДИН тяжёлый штемпель, а посох
//   даёт МАССОВОЕ одновременное оглашение по нескольким точкам разом, а не
//   направленную линию или второй одиночный удар.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-52 (все роли
// ≤21% до этого уровня): Молотило — straight (прямой мощный замах) 15%→17%;
// Батожок — lateRush (рывок нити марионетки) 13%→15%; Гиревик — drift
// (весы плавно клонятся) 13%→15%; Горлопан — accelerate (крик учащается)
// 13%→15%; Печатник — pause (властная пауза перед печатью и оглашением)
// 15%→17%.
//
// ЦЕПИ (13.6/13.7) — форма выбрана ИЗ образа и сверена с полным
// распределением: Молотило — zigzag(4)+irregular(5): замах раскачивается
// зигзагом, доигрывая инерцию, затем хаотичный отскок (у enem1 обе были
// 17% — самые низкие, ЧИНЯТ пограничный vertical 25%, доля падает до
// 23.1%); Батожок — irregular(5)+vertical(3): дёрганые рывки нитей вразнобой,
// затем прямой укол дубинкой (у enem2 irregular было 17% — самое низкое,
// vertical 21% — среднее, распределение остаётся ровным); Гиревик —
// arc(3)+irregular(5): чаша уходит вниз дугой, затем полный хаотичный
// перевес (у enem3 обе были 17% — самые низкие, ЧИНЯТ пограничный diagonal
// 25%, доля падает до 23.1%); Горлопан — arc(3)+diagonal(4): выкрик летит
// дугой, затем решительно в одну сторону (у enem4 arc было 17% — самое
// низкое, diagonal 21% — среднее, распределение остаётся ровным);
// Печатник — vertical(4)+zigzag(4): штемпель бьёт прямо вниз, оглашение
// раскидывает зигзагом по обе стороны (у enem5 vertical было 17% — самое
// низкое, распределение остаётся ровным).
let lvlNumber = 53;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
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
		enem1: { combatIdentity: "Замах силача", combatTrick: "короткий первый заход продолжается более быстрым довеском с прежнего края", signatureEvery: 4,
			// Молотило: STRONGMAN_SWING — один чётко телеграфированный тяжёлый замах сверху
			movementStyle: 'straight', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Молотило: STRONGMAN_SWING — один чётко телеграфированный тяжёлый замах сверху
		enem2: { combatIdentity: "Сломанный шаг куклы", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4,
			// Батожок: MARIONETTE_JERK — быстрые дискретные «прыжки» между позициями
			movementStyle: 'lateRush', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Батожок: MARIONETTE_JERK — быстрые дискретные «прыжки» между позициями
		enem3: { combatIdentity: "Весы меняют перевес", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4,
			// Гиревик: SCALE_TIP — весы медленно клонятся то в одну, то в другую сторону
			movementStyle: 'drift', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Гиревик: SCALE_TIP — весы медленно клонятся то в одну, то в другую сторону
		enem4: { combatIdentity: "Выкрик с ответом", combatTrick: "две короткие группы разделены паузой; вторая группа меняет сторону", signatureEvery: 4,
			// Горлопан: HAWKER_BARRAGE — непрерывный частый залп одиночных выкриков-ударов
			movementStyle: 'accelerate', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Горлопан: HAWKER_BARRAGE — непрерывный частый залп одиночных выкриков-ударов
		enem5: { combatIdentity: "Печать прерывает оглашение", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4,
			// Печатник: SEAL_AND_DECREE — тяжёлый штемпель печатью + массовое оглашение посохом
			movementStyle: 'pause', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Печатник: SEAL_AND_DECREE — тяжёлый штемпель печатью + массовое оглашение посохом
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl53/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl53/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl53/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl53/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl53/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Молотило',
        image: 'images/enemies/regions/5_dom_dvor/lvl53/1.webp',
        baseHP: 14231,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Батожок',
        image: 'images/enemies/regions/5_dom_dvor/lvl53/2.webp',
        baseHP: 35583,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Гиревик',
        image: 'images/enemies/regions/5_dom_dvor/lvl53/3.webp',
        baseHP: 62950,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Горлопан',
        image: 'images/enemies/regions/5_dom_dvor/lvl53/4.webp',
        baseHP: 101211,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Печатник',
        image: 'images/enemies/regions/5_dom_dvor/lvl53/5.webp',
        baseHP: 153287,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
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
	// ===== Молотило: STRONGMAN_SWING — один чётко телеграфированный
	// тяжёлый замах сверху, предельно читаемый =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: второй замах сразу следом без обычной большой паузы
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — правка 2026-09-16 (снята дубликат-пара с
	// уровня 47). Обе цепи — irregular: замах теряет счёт собственной
	// инерции, мотается без единого шаблона в обоих заходах.
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem1', type: 'enem11', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7 },  //20 цепь-A звено 5
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //21 цепь-B звено 1 (голова, irregular)
	{ boss: 'enem1', type: 'enem11', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //24 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5

	// ===== Батожок: MARIONETTE_JERK — быстрые дискретные «прыжки» между
	// позициями без плавного перехода, как кукла на нитях =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: прыжок сразу через всё поле по диагонали
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — правка 2026-09-16 (снята дубликат-пара с
	// уровня 46). Цепь-A (irregular, 5) не тронута. Цепь-B теперь тоже
	// irregular (6) — второй заход дёргается так же непредсказуемо, вместо
	// прямого укола дубинкой.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //21 цепь-B звено 1 (голова, irregular)
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //24 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5

	// ===== Гиревик: SCALE_TIP — весы медленно клонятся то в одну, то в
	// другую сторону, изредка резко перевешивают обеими чашами разом =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //2
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //13 — нежданчик: перевес раньше привычного долгого клонения
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — правка 2026-09-16 (снята дубликат-пара с
	// уровня 44). Обе цепи теперь irregular — весы клонятся то в одну, то в
	// другую сторону без предсказуемого нарастания, полный хаотичный перевес
	// в обоих заходах.
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem3', type: 'enem33', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 39, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 63, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //20 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, //21 цепь-B звено 1 (голова, irregular)
	{ boss: 'enem3', type: 'enem33', xPos: 54, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //24 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5

	// ===== Горлопан: HAWKER_BARRAGE — непрерывный частый залп одиночных
	// выкриков-ударов почти без пауз =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: двойной выкрик с одной стороны без чередования
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — выкрик летит дугой, затем решительно в одну
	// сторону (arc+diagonal), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Печатник: SEAL_AND_DECREE — тяжёлый штемпель печатью + массовое
	// оглашение посохом по нескольким точкам разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0  штемпель
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //1  штемпель
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2  оглашение
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //3  оглашение
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //4  оглашение
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //13 — нежданчик: штемпель бьёт без привычной властной паузы
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //15
	// звенья «атакующей цепи» — штемпель бьёт прямо вниз, оглашение
	// раскидывает зигзагом по обе стороны (vertical+zigzag), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 24,yPos: 12,customHP: 1,customDamage: 20,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 32,yPos: 20,customHP: 1,customDamage: 20,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 80,yPos: 6,customHP: 1,customDamage: 20,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 24,yPos: 40,customHP: 1,customDamage: 20,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 24,yPos: 8,customHP: 1,customDamage: 20,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 68,yPos: 12,customHP: 1,customDamage: 20,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 86,yPos: 12,customHP: 1,customDamage: 22,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 74,yPos: 20,customHP: 1,customDamage: 22,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 16,yPos: 6,customHP: 1,customDamage: 22,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 86,yPos: 40,customHP: 1,customDamage: 22,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 86,yPos: 8,customHP: 1,customDamage: 22,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 28,yPos: 12,customHP: 1,customDamage: 22,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 18,yPos: 12,customHP: 1,customDamage: 24,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 34,yPos: 20,customHP: 1,customDamage: 24,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 82,yPos: 6,customHP: 1,customDamage: 24,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 18,yPos: 40,customHP: 1,customDamage: 24,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 18,yPos: 8,customHP: 1,customDamage: 24,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 64,yPos: 12,customHP: 1,customDamage: 24,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 12,customHP: 1,customDamage: 26,customSpeed: 16},
    {boss: "enem4",type: "enem44",xPos: 26,yPos: 20,customHP: 1,customDamage: 26,customSpeed: 14},
    {boss: "enem4",type: "enem44",xPos: 76,yPos: 6,customHP: 1,customDamage: 26,customSpeed: 21},
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 40,customHP: 1,customDamage: 26,customSpeed: 7},
    {boss: "enem4",type: "enem44",xPos: 14,yPos: 8,customHP: 1,customDamage: 26,customSpeed: 20},
    {boss: "enem4",type: "enem44",xPos: 88,yPos: 12,customHP: 1,customDamage: 26,customSpeed: 18},
    {boss: "enem5",type: "enem55",xPos: 22,yPos: 12,customHP: 1,customDamage: 28,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 50,yPos: 20,customHP: 1,customDamage: 28,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 84,yPos: 6,customHP: 1,customDamage: 28,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 22,yPos: 40,customHP: 1,customDamage: 28,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 22,yPos: 8,customHP: 1,customDamage: 28,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 50,yPos: 12,customHP: 1,customDamage: 28,customSpeed: 18}
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 320, bossDelayAbDop: 5900, firstWaveDelayMs: 2400 }, // размеренный силовой замах
	{ boss: 'enem2', bossDelayAb: 215, bossDelayAbDop: 4100, firstWaveDelayMs: 1968 }, // самый частый — дёрганые прыжки
	{ boss: 'enem3', bossDelayAb: 420, bossDelayAbDop: 7000, firstWaveDelayMs: 2400 }, // самый долгий отдых — медленное клонение
	{ boss: 'enem4', bossDelayAb: 175, bossDelayAbDop: 3200, firstWaveDelayMs: 1536 }, // непрерывный крик без пауз
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 5150, firstWaveDelayMs: 2400 }, // собранный финал
 ];

 const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0],openingOrder: 0},
    {boss: "enem1",indexAbilities: [1]},
    {boss: "enem1",indexAbilities: [2]},
    {boss: "enem1",indexAbilities: [3,4]},
    {boss: "enem1",indexAbilities: [5,6]},
    {boss: "enem1",indexAbilities: [29,30,26],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Замах силача — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [29,30,28],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Замах силача — иной конец"},
    {boss: "enem1",indexAbilities: [31,27,31,28,26],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Замах силача — завершение"},
    {boss: "enem1",indexAbilities: [16,17,18,19,20],isChain: true},
    {boss: "enem1",indexAbilities: [21,22,23,24,25],isChain: true},
    {boss: "enem2",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem2",indexAbilities: [2,3]},
    {boss: "enem2",indexAbilities: [4,5]},
    {boss: "enem2",indexAbilities: [6,7]},
    {boss: "enem2",indexAbilities: [8,9,14,15]},
    {boss: "enem2",indexAbilities: [26,30,27],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Сломанный шаг куклы — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [26,30,28],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Сломанный шаг куклы — иной конец"},
    {boss: "enem2",indexAbilities: [31,28,31,27],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Сломанный шаг куклы — завершение"},
    {boss: "enem2",indexAbilities: [16,17,18,19,20],isChain: true},
    {boss: "enem2",indexAbilities: [21,22,23,24,25],isChain: true},
    {boss: "enem3",indexAbilities: [0,1,2]},
    {boss: "enem3",indexAbilities: [3,4],openingOrder: 0},
    {boss: "enem3",indexAbilities: [5,6]},
    {boss: "enem3",indexAbilities: [7,8]},
    {boss: "enem3",indexAbilities: [9,10]},
    {boss: "enem3",indexAbilities: [26,28,27,31],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Весы меняют перевес — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [26,28,30],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Весы меняют перевес — иной конец"},
    {boss: "enem3",indexAbilities: [27,31,26,28],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Весы меняют перевес — завершение"},
    {boss: "enem3",indexAbilities: [16,17,18,19,20],isChain: true},
    {boss: "enem3",indexAbilities: [21,22,23,24,25],isChain: true},
    {boss: "enem4",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem4",indexAbilities: [2,3]},
    {boss: "enem4",indexAbilities: [4,5]},
    {boss: "enem4",indexAbilities: [8,9]},
    {boss: "enem4",indexAbilities: [6,7,11,12]},
    {boss: "enem4",indexAbilities: [23,27,25,28],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Выкрик с ответом — знакомство",openingOrder: 1,shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [23,27,28],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Выкрик с ответом — иной конец",shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [25,28,23,27],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Выкрик с ответом — завершение",shotGapsMs: [360,900,360]},
    {boss: "enem4",indexAbilities: [16,17,18],isChain: true},
    {boss: "enem4",indexAbilities: [19,20,21,22],isChain: true},
    {boss: "enem5",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem5",indexAbilities: [2,3,4]},
    {boss: "enem5",indexAbilities: [5,6]},
    {boss: "enem5",indexAbilities: [7,8]},
    {boss: "enem5",indexAbilities: [11,12]},
    {boss: "enem5",indexAbilities: [24,26,29],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Печать прерывает оглашение — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [24,26,25],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Печать прерывает оглашение — иной конец"},
    {boss: "enem5",indexAbilities: [28,26,29,25],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Печать прерывает оглашение — завершение"},
    {boss: "enem5",indexAbilities: [16,17,18,19],isChain: true},
    {boss: "enem5",indexAbilities: [20,21,22,23],isChain: true}
];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Молотило — ярмарочный силач: молот, бочка, замах, мозоль, рубаха.
    enem1: {
        variant1: 'Силовой кураж', variant2: 'Бочковая хватка', variant3: 'Молот-таран',
        variant4: 'Замашистый напор', variant5: 'Меткий замах', variant6: 'Бешеный замах',
        variant7: 'Молотилов норов', variant8: 'Крепкая бочка', variant9: 'Ударный замах',
        variant10: 'Живучая рубаха', variant11: 'Колючая мозоль', variant12: 'Замах и в темноту',
        variant13: 'Толстая бочка', variant14: 'Неутомимый замах', variant15: 'Пружинистый замах',
        variant16: 'Острый молот, зоркий глаз', variant17: 'Силовая удача', variant18: 'Верный замах',
        variant19: 'Молниеносный замах', variant20: 'Силовой нюх', variant21: 'Цепкая мозоль',
        variant22: 'Юркий для своего роста', variant23: 'Бочковая стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий замах', variant26: 'Дикий замах', variant27: 'Стойкая рубаха',
        variant28: 'Замах наповал', variant29: 'Крепкое молотило', variant30: 'Силовая мощь',
        variant31: 'Замах с оглядкой', variant32: 'Живучая бочка', variant33: 'Юркий и силовой',
        variant34: 'Бочковая прыть', variant35: 'Быстрый замах, крепкий молот'
    },
    // Батожок — кукла-петрушка: нить, дубинка, бубенец, дёрганье, колпак.
    enem2: {
        variant1: 'Кукольный кураж', variant2: 'Нитяная хватка', variant3: 'Дубинка-таран',
        variant4: 'Дёрганый напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Батожков норов', variant8: 'Крепкий колпак', variant9: 'Ударный рывок',
        variant10: 'Живучая нить', variant11: 'Колючий бубенец', variant12: 'Рывок и в темноту',
        variant13: 'Толстая нить', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Острый нос, зоркий глаз', variant17: 'Кукольная удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Кукольный нюх', variant21: 'Цепкий бубенец',
        variant22: 'Юркий на своих нитях', variant23: 'Кукольная стойкость', variant24: 'Долгий рывок, зоркий глаз',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкий колпак',
        variant28: 'Рывок наповал', variant29: 'Крепкий батожок', variant30: 'Дёрганая мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучий колпак', variant33: 'Юркий и дёрганый',
        variant34: 'Кукольная прыть', variant35: 'Быстрый рывок, крепкая нить'
    },
    // Гиревик — медные весы: чаша, гиря, клонение, медь, перевес.
    enem3: {
        variant1: 'Весовой кураж', variant2: 'Гиревая хватка', variant3: 'Чаша-таран',
        variant4: 'Клонящийся напор', variant5: 'Меткий перевес', variant6: 'Бешеный перевес',
        variant7: 'Гиревиков норов', variant8: 'Крепкая цепь', variant9: 'Ударная чаша',
        variant10: 'Живучая гиря', variant11: 'Колючая чаша', variant12: 'Перевес и в темноту',
        variant13: 'Толстая медь', variant14: 'Неутомимый перевес', variant15: 'Пружинистый перевес',
        variant16: 'Острая гиря, зоркий глаз', variant17: 'Медная удача', variant18: 'Верный перевес',
        variant19: 'Молниеносный перевес', variant20: 'Медный нюх', variant21: 'Цепкая чаша',
        variant22: 'Юркий, несмотря на вес гирь', variant23: 'Весовая стойкость', variant24: 'Долгое клонение, зоркий глаз',
        variant25: 'Ускользающий перевес', variant26: 'Дикий перевес', variant27: 'Стойкая цепь',
        variant28: 'Перевес наповал', variant29: 'Крепкий гиревик', variant30: 'Медная мощь',
        variant31: 'Перевес с оглядкой', variant32: 'Живучая цепь', variant33: 'Юркий и медный',
        variant34: 'Весовая прыть', variant35: 'Быстрый перевес, крепкая гиря'
    },
    // Горлопан — крикливый торговец: крик, товар, охапка, бубенец, глотка.
    enem4: {
        variant1: 'Крикливый кураж', variant2: 'Охапочная хватка', variant3: 'Глотка-таран',
        variant4: 'Зазывный напор', variant5: 'Меткий выкрик', variant6: 'Бешеный выкрик',
        variant7: 'Горлопанский норов', variant8: 'Крепкая охапка', variant9: 'Ударный выкрик',
        variant10: 'Живучая глотка', variant11: 'Колючий товар', variant12: 'Выкрик и в темноту',
        variant13: 'Толстая охапка', variant14: 'Неутомимый выкрик', variant15: 'Пружинистый выкрик',
        variant16: 'Острый товар, зоркий глаз', variant17: 'Зазывная удача', variant18: 'Верный выкрик',
        variant19: 'Молниеносный выкрик', variant20: 'Зазывный нюх', variant21: 'Цепкий товар',
        variant22: 'Юркий, несмотря на охапку', variant23: 'Крикливая стойкость', variant24: 'Долгий зов, зоркий глаз',
        variant25: 'Ускользающий выкрик', variant26: 'Дикий выкрик', variant27: 'Стойкая охапка',
        variant28: 'Выкрик наповал', variant29: 'Крепкий горлопан', variant30: 'Зазывная мощь',
        variant31: 'Выкрик с оглядкой', variant32: 'Живучая охапка', variant33: 'Юркий и крикливый',
        variant34: 'Зазывная прыть', variant35: 'Быстрый выкрик, крепкая глотка'
    },
    // Печатник — ярмарочный голова: печать, воск, посох, указ, ключи.
    enem5: {
        variant1: 'Указной кураж', variant2: 'Печатная хватка', variant3: 'Штемпель-таран',
        variant4: 'Восковой напор', variant5: 'Меткий штемпель', variant6: 'Бешеный штемпель',
        variant7: 'Печатников норов', variant8: 'Крепкий посох', variant9: 'Ударный штемпель',
        variant10: 'Живучий воск', variant11: 'Колючая печать', variant12: 'Штемпель и в темноту',
        variant13: 'Толстый воск', variant14: 'Неутомимый штемпель', variant15: 'Пружинистый штемпель',
        variant16: 'Острая печать, зоркий глаз', variant17: 'Указная удача', variant18: 'Верный штемпель',
        variant19: 'Молниеносный штемпель', variant20: 'Восковой нюх', variant21: 'Цепкий посох',
        variant22: 'Юркий, несмотря на власть', variant23: 'Указная стойкость', variant24: 'Долгий указ, зоркий глаз',
        variant25: 'Ускользающий штемпель', variant26: 'Дикий штемпель', variant27: 'Стойкий посох',
        variant28: 'Штемпель наповал', variant29: 'Крепкий печатник', variant30: 'Восковая мощь',
        variant31: 'Штемпель с оглядкой', variant32: 'Живучий посох', variant33: 'Юркий и восковой',
        variant34: 'Указная прыть', variant35: 'Быстрый штемпель, крепкий воск'
    }
};
