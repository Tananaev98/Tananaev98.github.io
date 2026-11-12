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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.749, damageMultiplier: 1.782, minWaveDelay: 4600, minShotDelay: 109, minTelegraphMs: 542,
	phases: [
		{ phase: 1, minHp: 0.689, cadence: 0.971, speed: 1.039, damage: 1, telegraphMultiplier: 1.035, surpriseChance: 0.109, maxActiveAttacks: 30 },
		{ phase: 2, minHp: 0.339, cadence: 0.794, speed: 1.173, damage: 1.12, telegraphMultiplier: 0.868, surpriseChance: 0.209, maxActiveAttacks: 34 },
		{ phase: 3, minHp: 0, cadence: 0.625, speed: 1.285, damage: 1.22, telegraphMultiplier: 0.768, surpriseChance: 0.309, maxActiveAttacks: 38 }
	],
	bosses: {
		enem1: { combatIdentity: "Прямой замах ещё не закончил инерцию молота", combatTrick: "За читаемым тяжёлым замахом остаются отскоки. Ошибка — атаковать силача после первого удара, пока молот возвращается.", signatureEvery: 3, movementStyle: 'straight', cadence: 1.004, telegraphMs: 946, speedMultiplier: 1.029, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Медленный натяг нити перед повторным уколом", combatTrick: "Медленный натяг не завершает номер: за резкой тягой приходит сгущение рывков и ответная дубинка. Ошибка — уйти после первой тяги.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.996, telegraphMs: 857, speedMultiplier: 1.058, damageMultiplier: 1, speedVariance: [1, 1.0004, 1.0008, 1.0012, 1.0016] },
		enem3: { combatIdentity: "Оставленная гиря меняет завершение перевеса", combatTrick: "Пока одна чаша опускается, на противоположной стороне остаётся гиря. Перевес завершается после обеих чаш. Ошибка — атаковать весы после первой опустившейся чаши.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.818, telegraphMs: 1056, speedMultiplier: 1.019, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Повтор выкрика держит внимание до вставленного товара", combatTrick: "Торговец ускоряет повтор слова, затем вставляет товар с другого края и ещё один выкрик. Ошибка — считать повтор завершением торга и атаковать раньше вставки.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.958, telegraphMs: 816, speedMultiplier: 1.079, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "После печати закончить ряд оглашения и штемпель", combatTrick: "Задержанная печать сопровождает ряд отметок оглашения в нескольких точках. После первых отметок остаётся завершающий штемпель. Ошибка — уйти к распорядителю до конца распоряжения.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.938, telegraphMs: 987, speedMultiplier: 1.093, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 15;
 const bossInterval = 18;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Молотило =====
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.37 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.41 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.63 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.37 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.63 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.47 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.63 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.41 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.77 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.52 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.27 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.02 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.77 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.52 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.63 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.37 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.57 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.63 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.41 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.57 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.87 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.62 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.12 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.87 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.62 }, // 52 i

	// ===== Батожок =====
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.47 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.57 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.47 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.65 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.47 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.65 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.47 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.65 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.47 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.83 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.79 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.75 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.71 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.67 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.63 }, // 34 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.65 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.47 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 41 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.65 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.47 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.47 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.47 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.51 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 48 h
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.93 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.89 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.85 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.81 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.77 }, // 53 i
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.73 }, // 54 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.69 }, // 55 i

	// ===== Гиревик =====
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.67 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.97 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.62 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.67 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.97 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.67 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.97 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.67 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.97 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.67 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.97 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.59 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.34 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.09 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.84 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.59 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.34 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.67 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.97 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.67 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.97 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.97 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.47 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.44 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.94 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.69 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.44 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.19 }, // 62 i

	// ===== Горлопан =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.07 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.87 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.87 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.07 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.69 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.07 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.87 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.69 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.87 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.07 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.69 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.07 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.87 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 32 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.49 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.24 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.99 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.74 }, // 36 f
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.49 }, // 37 f
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.69 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.07 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.87 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.63 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.63 }, // 44 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97 }, // 45 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.69 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.57 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.87 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.07 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.67 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.57 }, // 52 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.97 }, // 53 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.59 }, // 54 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.34 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.09 }, // 56 i
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.84 }, // 57 i
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.59 }, // 58 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.34 }, // 59 i

	// ===== Печатник =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.71 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.77 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.67 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.67 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.71 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.77 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.67 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.67 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.71 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.77 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.27 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.67 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.71 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.77 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.67 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.71 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.77 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.67 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.41 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.16 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.91 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.66 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.41 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.16 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.71 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.77 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.67 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.67 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.71 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.77 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.67 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.67 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.67 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.77 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.47 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.22 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.97 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.72 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.47 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.22 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.97 }, // 67 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 179, bossDelayAbDop: 12700, firstWaveDelayMs: 2650 }, // Прямой замах ещё не закончил инерцию молота
	{ boss: 'enem2', bossDelayAb: 182, bossDelayAbDop: 11201, firstWaveDelayMs: 2650 }, // Медленный натяг нити перед повторным уколом
	{ boss: 'enem3', bossDelayAb: 180, bossDelayAbDop: 17000, firstWaveDelayMs: 2650 }, // Оставленная гиря меняет завершение перевеса
	{ boss: 'enem4', bossDelayAb: 175, bossDelayAbDop: 12300, firstWaveDelayMs: 2650 }, // Повтор выкрика держит внимание до вставленного товара
	{ boss: 'enem5', bossDelayAb: 174, bossDelayAbDop: 16200, firstWaveDelayMs: 2650 }, // После печати закончить ряд оглашения и штемпель
];

 const bossAbilitiesDop = [
	// Молотило
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [250, 0, 0, 500], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 250] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [0, 0, 500, 250, 250] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20], shotGapsMs: [500, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [500, 0, 250, 500, 500] },
	{ boss: 'enem1', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Инерция ярмарочного молота" },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [0, 500, 500, 500, 0, 0] },
	{ boss: 'enem1', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [250, 0, 0, 0, 0, 250] },
	{ boss: 'enem1', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0], label: "Отскок и возврат молота" },

	// Батожок
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 250, 250, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 0, 0] },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 500, 500] },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [500, 0, 0, 500, 250] },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [0, 0, 0, 500, 0] },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Натянутая нить и дубинка" },
	{ boss: 'enem2', indexAbilities: [35, 36, 37, 38, 39, 40, 41], minPhase: 2, shotGapsMs: [0, 250, 0, 500, 500, 0] },
	{ boss: 'enem2', indexAbilities: [42, 43, 44, 45, 46, 47, 48], minPhase: 3, shotGapsMs: [0, 0, 0, 250, 500, 250] },
	{ boss: 'enem2', indexAbilities: [49, 50, 51, 52, 53, 54, 55], signature: true, isChain: true, minPhase: 3, shotDelayMs: 437, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Семь рывков кукольного номера" },

	// Гиревик
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 250, 250, 250, 250, 250], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12], shotGapsMs: [250, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17, 18, 19], shotGapsMs: [0, 500, 0, 250, 500, 0] },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24, 25, 26], shotGapsMs: [500, 500, 0, 250, 250, 0] },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31, 32, 33], shotGapsMs: [500, 0, 0, 500, 250, 500] },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37, 38, 39], signature: true, isChain: true, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Чаши и оставленные гири" },
	{ boss: 'enem3', indexAbilities: [40, 41, 42, 43, 44, 45, 46, 47], minPhase: 2, shotGapsMs: [0, 0, 250, 250, 500, 250, 250] },
	{ boss: 'enem3', indexAbilities: [48, 49, 50, 51, 52, 53, 54, 55], minPhase: 3, shotGapsMs: [0, 500, 0, 500, 250, 250, 0] },
	{ boss: 'enem3', indexAbilities: [56, 57, 58, 59, 60, 61, 62], signature: true, isChain: true, minPhase: 3, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Окончательный перевес чаш" },

	// Горлопан
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 250, 250, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [500, 0, 0, 500, 500, 0] },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [250, 250, 0, 0, 250, 250] },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30, 31, 32], shotGapsMs: [250, 250, 250, 250, 0, 500] },
	{ boss: 'enem4', indexAbilities: [33, 34, 35, 36, 37], signature: true, isChain: true, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Повтор слова и товар" },
	{ boss: 'enem4', indexAbilities: [38, 39, 40, 41, 42, 43, 44, 45], minPhase: 2, shotGapsMs: [500, 0, 0, 500, 500, 0, 0] },
	{ boss: 'enem4', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53], minPhase: 3, shotGapsMs: [500, 0, 0, 250, 250, 500, 0] },
	{ boss: 'enem4', indexAbilities: [54, 55, 56, 57, 58, 59], signature: true, isChain: true, minPhase: 3, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0], label: "Незаконченный ярмарочный торг" },

	// Печатник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [250, 500, 0, 0, 250, 0, 250], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [0, 250, 0, 500, 0, 0, 0] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21, 22], shotGapsMs: [500, 0, 0, 250, 0, 500] },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26, 27, 28, 29], shotGapsMs: [500, 0, 0, 500, 0, 250] },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34, 35, 36], shotGapsMs: [250, 250, 0, 0, 250, 500] },
	{ boss: 'enem5', indexAbilities: [37, 38, 39, 40, 41, 42], signature: true, isChain: true, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Печать и ряд оглашения" },
	{ boss: 'enem5', indexAbilities: [43, 44, 45, 46, 47, 48, 49, 50, 51], minPhase: 2, shotGapsMs: [250, 0, 0, 500, 0, 250, 250, 250] },
	{ boss: 'enem5', indexAbilities: [52, 53, 54, 55, 56, 57, 58, 59, 60], minPhase: 3, shotGapsMs: [500, 250, 0, 250, 500, 0, 0, 250] },
	{ boss: 'enem5', indexAbilities: [61, 62, 63, 64, 65, 66, 67], signature: true, isChain: true, minPhase: 3, shotDelayMs: 343, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Последний штемпель распоряжения" },

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
