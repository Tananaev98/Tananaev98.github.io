// Уровень 51 «Огород» — одиннадцатый уровень области V, обычный (пять
// разных монстров, как 41-44/46-49).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 250 строк, уровни 1-50, обе таблицы
// распределения плюс колонка «Архетип» по всем пяти ролям целиком.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl51/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — толстый кочан с рваными листьями-капюшоном, кольца среза на
//   макушке, ОБЕ когтистые лапы подняты симметрично. Архетип — атаки
//   появляются расширяющимися концентрическими «слоями», как капустные
//   листья, снимаемые один за другим наружу (роль enem1, знакомство) —
//   сверено: PEELING_LAYERS новый, ни один архетип enem1 не завязан на
//   концентрическое расширение слоями.
// 2.webp — жёлтая репа: круглое тяжёлое тело, низкий присед, когти вперёд.
//   Обоснование скорости для роли «быстрые серии»: именно КРУГЛАЯ форма
//   даёт неожиданную быстроту — набрав инерцию, репа катится и отскакивает
//   между немногими точками намного резче, чем можно ожидать от тяжёлого
//   тела. Архетип — быстрые отскоки между 2-3 фиксированными точками низко
//   над землёй (роль enem2) — сверено: ROLL_BOUNCE новый.
// 3.webp — огуречная плеть с закручивающимися усиками, длинные плетевидные
//   конечности. Архетип — усик заметно СКРУЧИВАЕТСЯ (несколько импульсов
//   из одной точки во время затяжного телеграфа), затем один длинный
//   хлёсткий бросок — редкий и тяжёлый (роль enem3) — сверено: TENDRIL_
//   COIL_SNAP новый; отличен от Плескуна (48, CHAIN_WHIP_REACH — там нет
//   фазы видимого закручивания, только далёкий бросок с фиксированного
//   якоря) — здесь именно НАКОПЛЕНИЕ энергии в скручивании видно ДО броска.
// 4.webp — пугало: рыхлая соломенная фигура, драная рубаха, грабли в руке.
//   Архетип — большую часть времени висит почти безвольно (как ткань без
//   ветра), затем ВНЕЗАПНЫЙ порыв — все конечности разом дёргаются в
//   короткой вспышке (роль enem4, нервный) — сверено: WIND_FLAP новый,
//   отличается от MATTED_LASH Свалявшейся (50, непрерывное хаотичное
//   дёрганье без пауз) тем, что здесь именно ПОРЫВИСТОСТЬ — долгое затишье,
//   затем короткий взрыв активности сразу по всем направлениям, как
//   реальный порыв ветра, а не постоянный хаос.
// 5.webp — хозяин грядок: тяпка в одной руке (рубящий инструмент), лейка с
//   льющейся водой в другой. Архетип — чередует один резкий рубящий удар
//   тяпкой с направленной «поливочной струёй» — несколькими каплями подряд
//   вдоль одной линии, как реальный полив грядки (роль enem5, финал) —
//   сверено: HOE_AND_SHOWER новый, отличен от Багорыча (48, HOOK_AND_ROPE —
//   там оба инструмента дают ОДИНОЧНЫЕ дальние атаки) — здесь поливочная
//   струя даёт СЕРИЮ капель вдоль направления, а не один снаряд, и отличен
//   от Урожаища (47, фоновый пассивный дождь) — струя лейки прицельная и
//   активная, не фоновая.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-50 (все роли
// ≤25% до этого уровня): Кочанище — straight (прямое симметричное давление)
// 14%→15.9%; Реписько — drift (неконтролируемая инерция качения) 10%→13.6%;
// Плетень — weave (сама плеть извивается перед броском) 12%→13.6%;
// Драняк — wave (обвисшая ткань колышется, потом рывок) 12%→13.6%;
// Грядочник — straight (прямой уверенный подход хозяина) 16%→18.2%.
//
// ЦЕПИ (13.6/13.7) — форма выбрана ИЗ образа и сверена с полным
// распределением: Кочанище — arc(3)+zigzag(4): лист разворачивается дугой,
// затем неровно отгибается зигзагом (у enem1 обе были по 15% — самые
// низкие, ЧИНЯТ уже пограничный vertical 30%, доля падает до 27.3% —
// впервые под порогом); Реписько — vertical(3)+irregular(5): репа катится
// по прямой вниз, затем отскакивает хаотично (у enem2 vertical было 20%,
// irregular 15% — самое низкое, ЧИНЯТ пограничный arc 25%, доля падает до
// 22.7%); Плетень — vertical(4)+irregular(5): плеть закручивается почти на
// месте, затем хаотичный бросок (у enem3 обе были по 15% — самые низкие,
// ЧИНЯТ уже пограничный diagonal 30%, доля падает до 27.3% — впервые под
// порогом); Драняк — diagonal(3)+arc(4): порыв ветра сносит фигуру в одну
// сторону, затем дугой обратно (у enem4 обе были по 15% — самые низкие,
// ЧИНЯТ пограничные zigzag/irregular по 25%, обе падают до 22.7%);
// Грядочник — arc(3)+diagonal(4): тяпка бьёт дугой, лейка льёт по прямой
// линии (у enem5 arc было 15% — самое низкое, diagonal 20% — среднее, ЧИНЯТ
// пограничный zigzag 25%, доля падает до 22.7%).
let lvlNumber = 51;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.758, damageMultiplier: 1.782, minWaveDelay: 4401, minShotDelay: 117, minTelegraphMs: 538,
	phases: [
		{ phase: 1, minHp: 0.686, cadence: 0.973, speed: 1.035, damage: 1, telegraphMultiplier: 1.033, surpriseChance: 0.105, maxActiveAttacks: 28 },
		{ phase: 2, minHp: 0.336, cadence: 0.788, speed: 1.167, damage: 1.12, telegraphMultiplier: 0.873, surpriseChance: 0.205, maxActiveAttacks: 32 },
		{ phase: 3, minHp: 0, cadence: 0.629, speed: 1.276, damage: 1.22, telegraphMultiplier: 0.773, surpriseChance: 0.305, maxActiveAttacks: 36 }
	],
	bosses: {
		enem1: { combatIdentity: "Внешний лист переживает внутренний слой", combatTrick: "Наружный лист летит дольше внутреннего. После первого снятого слоя остаётся ещё одно отгибание. Ошибка — атаковать кочан по порядку появления листьев, не проверив оставшийся слой.", signatureEvery: 3, movementStyle: 'wave', cadence: 1.006, telegraphMs: 941, speedMultiplier: 1.023, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Отскок возвращается к знакомой точке", combatTrick: "Тяжёлая репа резко доводит заход и возвращается к одной из нескольких прежних точек. Ошибка — уйти после первого возврата, пока следующий заход ещё идёт.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.991, telegraphMs: 848, speedMultiplier: 1.053, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Импульсы усика предшествуют длинному броску", combatTrick: "Усик собирает несколько извивающихся импульсов у одной точки, затем плеть проходит другую грядку и возвращает конец. Ошибка — бить плеть между импульсами, не дождавшись броска.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.809, telegraphMs: 1052, speedMultiplier: 1.013, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Порыв оставляет обратный разлёт ткани", combatTrick: "Ткань коротко взрывается порывом, но после первой пачки остаётся обратный разлёт. Ошибка — считать затишье концом ветра или уйти после правой пары.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.951, telegraphMs: 810, speedMultiplier: 1.074, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Тяпка вклинивается в направленный полив", combatTrick: "Несколько капель проходят одну грядку подряд, а рубящий удар заставляет покинуть эту линию и вернуться к оставшейся воде. Ошибка — уйти после тяпки, не закончив полив.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.931, telegraphMs: 980, speedMultiplier: 1.106, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl51/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl51/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl51/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl51/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl51/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Кочанище',
        image: 'images/enemies/regions/5_dom_dvor/lvl51/1.webp',
        baseHP: 13471,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '35%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Реписько',
        image: 'images/enemies/regions/5_dom_dvor/lvl51/2.webp',
        baseHP: 33678,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '35%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Плетень',
        image: 'images/enemies/regions/5_dom_dvor/lvl51/3.webp',
        baseHP: 59565,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '35%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Драняк',
        image: 'images/enemies/regions/5_dom_dvor/lvl51/4.webp',
        baseHP: 95761,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '35%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Грядочник',
        image: 'images/enemies/regions/5_dom_dvor/lvl51/5.webp',
        baseHP: 145009,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '40%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 14;
 const bossInterval = 17;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Кочанище =====
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.29, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.43, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.43, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.43, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.57, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.32, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.07, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.82, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.43, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.43, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.19, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.19, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.19, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.42, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.17, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.92, waveAmplitude: 2.41, waveFrequency: 1.19, wavePhase: 0 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.67, waveAmplitude: 3.41, waveFrequency: 1.69, wavePhase: 0.35 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.42, waveAmplitude: 4.41, waveFrequency: 2.19, wavePhase: 0.8 }, // 52 i

	// ===== Реписько =====
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.45 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.45 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.45 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.45 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.2 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.95 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.7 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.45 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.45 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.45 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.29 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.29 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.79 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.55 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.3 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.05 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.8 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.55 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.3 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.05 }, // 53 i

	// ===== Плетень =====
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.59, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.47, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.49, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.24, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.99, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.74, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79, waveAmplitude: 2.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 3.67, waveFrequency: 3.01, wavePhase: 1 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 1.67, waveFrequency: 2.01, wavePhase: 0 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 2.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 3.67, waveFrequency: 3.01, wavePhase: 1 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 1.67, waveFrequency: 2.01, wavePhase: 0 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.47, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 44 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.39, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.39, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.59, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 52 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.34, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 53 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.09, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.84, waveAmplitude: 3.67, waveFrequency: 2.01, wavePhase: 0 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.59, waveAmplitude: 4.67, waveFrequency: 2.51, wavePhase: 0.5 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.34, waveAmplitude: 5.67, waveFrequency: 3.01, wavePhase: 1 }, // 57 i

	// ===== Драняк =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.49 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.49 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.49 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.49 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.41 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.16 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.91 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.49 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.49 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.57 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.59 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.51 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.26 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.01 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.76 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.51 }, // 49 i

	// ===== Грядочник =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.51 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.89 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.79 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.19 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.59 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.89 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.59 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.39 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.51 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.81 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.21 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.61 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.61 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.51 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.69 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.83 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.23 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.69 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.63 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.63 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.19 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.51 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.69 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.85 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.25 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.59 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.65 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.09 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.15 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.51 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.87 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.27 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.67 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.67 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.59 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.33 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.08 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.83 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.58 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.33 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.08 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.51 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.59 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.89 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.29 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.89 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.69 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.39 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.99 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.91 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.31 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.79 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.71 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.29 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.89 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.43 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.18 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.93 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.68 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.43 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.18 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.93 }, // 67 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 177, bossDelayAbDop: 12300, firstWaveDelayMs: 2610 }, // Внешний лист переживает внутренний слой
	{ boss: 'enem2', bossDelayAb: 180, bossDelayAbDop: 11100, firstWaveDelayMs: 2610 }, // Отскок возвращается к знакомой точке
	{ boss: 'enem3', bossDelayAb: 177, bossDelayAbDop: 16900, firstWaveDelayMs: 2610 }, // Импульсы усика предшествуют длинному броску
	{ boss: 'enem4', bossDelayAb: 176, bossDelayAbDop: 9999, firstWaveDelayMs: 2610 }, // Порыв оставляет обратный разлёт ткани
	{ boss: 'enem5', bossDelayAb: 176, bossDelayAbDop: 15501, firstWaveDelayMs: 2610 }, // Тяпка вклинивается в направленный полив
];

 const bossAbilitiesDop = [
	// Кочанище
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 200, 200, 200, 0], openingOrder: 0, label: "Внешний лист остался за внутренним" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [250, 250, 0, 250], label: "Снятый слой открывает новый край" },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [500, 0, 0, 500, 0], label: "Наружная складка держит правый край" },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [500, 500, 0, 0, 0], label: "Внешний слой возвращается к срезу" },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [500, 0, 500, 0, 500], label: "Внутренний край ещё не снят" },
	{ boss: 'enem1', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 331, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь отгибающегося листа" },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [0, 250, 0, 0, 0, 250], label: "Второй наружный слой за раскрытым листом" },
	{ boss: 'enem1', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [500, 0, 0, 0, 250, 250], label: "Последний лист отгибается обратно" },
	{ boss: 'enem1', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 331, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь раскрытой кочерыги" },

	// Реписько
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 250, 250], openingOrder: 0, label: "Первый отскок вернулся на старую точку" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 250, 250], label: "Отскок не закончился у левого края" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 500, 0, 0], label: "Земля осталась за первым возвратом" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [500, 250, 500, 500, 250], label: "Правый заход возвращает левый отскок" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [250, 250, 0, 0, 500], label: "Репа ещё раз возвращается к середине" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 331, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь повторных отскоков" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [500, 0, 0, 500, 500, 250], label: "Новый заход после старого отскока" },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [500, 250, 500, 0, 500, 0], label: "Возврат с правой парой отскоков" },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51, 52, 53], signature: true, isChain: true, minPhase: 3, shotDelayMs: 331, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь неостановленной репы" },

	// Плетень
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 250, 0, 0, 250, 250], openingOrder: 0, label: "Три импульса перед длинным броском" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [200, 0, 0, 200, 200, 200], label: "Правый конец держит скрученный усик" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19], shotGapsMs: [0, 200, 200, 200, 400], label: "Плеть возвращается после усика" },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24, 25], shotGapsMs: [200, 0, 0, 0, 0], label: "Усик не отпускает обратный конец" },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30, 31, 32, 33], shotGapsMs: [250, 250, 250, 500, 0, 250, 250], label: "Прицепленный усик переживает бросок" },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37], signature: true, isChain: true, shotDelayMs: 331, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь скручивающегося усика" },
	{ boss: 'enem3', indexAbilities: [38, 39, 40, 41, 42, 43], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 200], label: "После правого броска остаётся левый усик" },
	{ boss: 'enem3', indexAbilities: [44, 45, 46, 47, 48, 49, 50, 51], minPhase: 3, shotGapsMs: [0, 250, 0, 500, 500, 0, 0], label: "Длинный усик возвращает последнюю грядку" },
	{ boss: 'enem3', indexAbilities: [52, 53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 331, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь обратного усика" },

	// Драняк
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Ткань возвращается после порыва" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [400, 400, 200, 400], label: "После затишья возвращается правый лоскут" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 500, 250, 0, 0], label: "Оторванный лоскут остался в порыве" },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [500, 500, 500, 0, 0], label: "Порыв не закончился левой складкой" },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [0, 500, 500, 250, 0], label: "Новый разлёт после первой складки" },
	{ boss: 'enem4', indexAbilities: [28, 29, 30], signature: true, isChain: true, shotDelayMs: 389, shotGapsMs: [0, 0], openingOrder: 1, label: "Цепь первого порыва" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [250, 0, 250, 250, 250, 500], label: "Порыв оставляет ещё один возврат" },
	{ boss: 'enem4', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [0, 0, 250, 250, 250, 500], label: "Последний лоскут за правой парой" },
	{ boss: 'enem4', indexAbilities: [45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 331, shotGapsMs: [0, 0, 0, 0], label: "Цепь обратного ветра" },

	// Грядочник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [500, 0, 0, 0, 250, 250, 500], openingOrder: 0, label: "Тяпка прерывает полив одной грядки" },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [500, 250, 0, 0, 250, 0, 500], label: "Левая грядка ещё не полита" },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21, 22, 23], shotGapsMs: [500, 0, 250, 250, 0, 0, 500], label: "Капли переживают вторую тяпку" },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29, 30, 31], shotGapsMs: [500, 250, 0, 250, 0, 600, 0], label: "Направленный полив за рубящим возвратом" },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39], shotGapsMs: [500, 250, 250, 0, 0, 0, 500], label: "Лейка не закончилась после первого руба" },
	{ boss: 'enem5', indexAbilities: [40, 41, 42, 43, 44, 45], signature: true, isChain: true, shotDelayMs: 331, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь поливочной струи" },
	{ boss: 'enem5', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [500, 0, 0, 250, 0, 600, 0], label: "Тяпка вернулась к недополитому ряду" },
	{ boss: 'enem5', indexAbilities: [0, 54, 55, 56, 57, 58, 59, 60], minPhase: 3, shotGapsMs: [500, 0, 0, 250, 0, 600, 0], label: "Хозяин замыкает две части полива" },
	{ boss: 'enem5', indexAbilities: [61, 62, 63, 64, 65, 66, 67], signature: true, isChain: true, minPhase: 3, shotDelayMs: 397, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь последней грядки" },

];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Кочанище — кочан капусты: лист, кочерыжка, слой, срез, жилка.
    enem1: {
        variant1: 'Кочанный кураж', variant2: 'Листовая хватка', variant3: 'Кочерыжка-таран',
        variant4: 'Слоистый напор', variant5: 'Меткий лист', variant6: 'Бешеный лист',
        variant7: 'Кочанищный норов', variant8: 'Крепкий срез', variant9: 'Ударный лист',
        variant10: 'Живучая жилка', variant11: 'Колючий лист', variant12: 'Лист и в темноту',
        variant13: 'Толстый лист', variant14: 'Неутомимый лист', variant15: 'Пружинистый лист',
        variant16: 'Острая жилка, зоркий глаз', variant17: 'Слоистая удача', variant18: 'Верный лист',
        variant19: 'Молниеносный лист', variant20: 'Слоистый нюх', variant21: 'Цепкая жилка',
        variant22: 'Юркий для своего кочана', variant23: 'Кочанная стойкость', variant24: 'Долгий слой, зоркий глаз',
        variant25: 'Ускользающий лист', variant26: 'Дикий лист', variant27: 'Стойкий срез',
        variant28: 'Лист наповал', variant29: 'Крепкий кочан', variant30: 'Слоистая мощь',
        variant31: 'Лист с оглядкой', variant32: 'Живучий срез', variant33: 'Юркий и слоистый',
        variant34: 'Кочанная прыть', variant35: 'Быстрый лист, крепкая жилка'
    },
    // Реписько — репа: земля, корень, круглый бок, ботва, отскок.
    enem2: {
        variant1: 'Репный кураж', variant2: 'Корневая хватка', variant3: 'Бок-таран',
        variant4: 'Земляной напор', variant5: 'Меткий отскок', variant6: 'Бешеный отскок',
        variant7: 'Реписьковый норов', variant8: 'Крепкий бок', variant9: 'Ударный отскок',
        variant10: 'Живучий корень', variant11: 'Колючая ботва', variant12: 'Отскок и в темноту',
        variant13: 'Толстый бок', variant14: 'Неутомимый отскок', variant15: 'Пружинистый отскок',
        variant16: 'Острый корень, зоркий глаз', variant17: 'Земляная удача', variant18: 'Верный отскок',
        variant19: 'Молниеносный отскок', variant20: 'Земляной нюх', variant21: 'Цепкий корень',
        variant22: 'Юркий, несмотря на вес', variant23: 'Репная стойкость', variant24: 'Долгий разгон, зоркий глаз',
        variant25: 'Ускользающий отскок', variant26: 'Дикий отскок', variant27: 'Стойкая ботва',
        variant28: 'Отскок наповал', variant29: 'Крепкое реписько', variant30: 'Земляная мощь',
        variant31: 'Отскок с оглядкой', variant32: 'Живучая ботва', variant33: 'Юркий и круглый',
        variant34: 'Репная прыть', variant35: 'Быстрый отскок, крепкий бок'
    },
    // Плетень — огуречная плеть: усик, стебель, колючка, завиток, хлыст.
    enem3: {
        variant1: 'Плетёный кураж', variant2: 'Усиковая хватка', variant3: 'Стебель-таран',
        variant4: 'Вьющийся напор', variant5: 'Меткий хлыст', variant6: 'Бешеный хлыст',
        variant7: 'Плетнёвый норов', variant8: 'Крепкий стебель', variant9: 'Ударный завиток',
        variant10: 'Живучий усик', variant11: 'Колючий стебель', variant12: 'Хлыст и в темноту',
        variant13: 'Толстый стебель', variant14: 'Неутомимый хлыст', variant15: 'Пружинистый завиток',
        variant16: 'Острая колючка, зоркий глаз', variant17: 'Вьющаяся удача', variant18: 'Верный хлыст',
        variant19: 'Молниеносный хлыст', variant20: 'Вьющийся нюх', variant21: 'Цепкий усик',
        variant22: 'Юркий, несмотря на длину', variant23: 'Плетнёвая стойкость', variant24: 'Долгое скручивание, зоркий глаз',
        variant25: 'Ускользающий хлыст', variant26: 'Дикий хлыст', variant27: 'Стойкий стебель',
        variant28: 'Хлыст наповал', variant29: 'Крепкий плетень', variant30: 'Вьющаяся мощь',
        variant31: 'Завиток с оглядкой', variant32: 'Живучий стебель', variant33: 'Юркий и вьющийся',
        variant34: 'Плетнёвая прыть', variant35: 'Быстрый хлыст, крепкий усик'
    },
    // Драняк — пугало: солома, дыра, ветер, ткань, рубаха.
    enem4: {
        variant1: 'Соломенный кураж', variant2: 'Дырявая хватка', variant3: 'Грабли-таран',
        variant4: 'Ветреный напор', variant5: 'Меткий порыв', variant6: 'Бешеный порыв',
        variant7: 'Дрянячий норов', variant8: 'Крепкая солома', variant9: 'Ударный порыв',
        variant10: 'Живучая дыра', variant11: 'Колючая солома', variant12: 'Порыв и в темноту',
        variant13: 'Толстая ткань', variant14: 'Неутомимый порыв', variant15: 'Пружинистый порыв',
        variant16: 'Острые грабли, зоркий глаз', variant17: 'Ветреная удача', variant18: 'Верный порыв',
        variant19: 'Молниеносный порыв', variant20: 'Ветреный нюх', variant21: 'Цепкая солома',
        variant22: 'Юркий, несмотря на дыры', variant23: 'Соломенная стойкость', variant24: 'Долгое затишье, зоркий глаз',
        variant25: 'Ускользающий порыв', variant26: 'Дикий порыв', variant27: 'Стойкая ткань',
        variant28: 'Порыв наповал', variant29: 'Крепкий драняк', variant30: 'Ветреная мощь',
        variant31: 'Порыв с оглядкой', variant32: 'Живучая ткань', variant33: 'Юркий и рваный',
        variant34: 'Соломенная прыть', variant35: 'Быстрый порыв, крепкая солома'
    },
    // Грядочник — хозяин грядок: тяпка, лейка, земля, урожай, полив.
    enem5: {
        variant1: 'Грядочный кураж', variant2: 'Лейковая хватка', variant3: 'Тяпка-таран',
        variant4: 'Поливочный напор', variant5: 'Меткий взмах', variant6: 'Бешеный взмах',
        variant7: 'Грядочников норов', variant8: 'Крепкая тяпка', variant9: 'Ударная струя',
        variant10: 'Живучая лейка', variant11: 'Колючая тяпка', variant12: 'Взмах и в темноту',
        variant13: 'Толстый черенок', variant14: 'Неутомимый взмах', variant15: 'Пружинистый взмах',
        variant16: 'Острая тяпка, зоркий глаз', variant17: 'Поливочная удача', variant18: 'Верный взмах',
        variant19: 'Молниеносный взмах', variant20: 'Урожайный нюх', variant21: 'Цепкая лейка',
        variant22: 'Юркий, несмотря на инвентарь', variant23: 'Грядочная стойкость', variant24: 'Долгий полив, зоркий глаз',
        variant25: 'Ускользающий взмах', variant26: 'Дикий взмах', variant27: 'Стойкий черенок',
        variant28: 'Взмах наповал', variant29: 'Крепкий грядочник', variant30: 'Поливочная мощь',
        variant31: 'Взмах с оглядкой', variant32: 'Живучий черенок', variant33: 'Юркий и грядочный',
        variant34: 'Грядочная прыть', variant35: 'Быстрый взмах, крепкая лейка'
    }
};
