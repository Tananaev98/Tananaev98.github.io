// Уровень 52 «Водяная мельница» — двенадцатый уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 255 строк, уровни 1-51.
//
// СКВОЗНАЯ ТЕМА УРОВНЯ (обоснование через реальный механизм мельницы, не
// произвольно): у ВСЕХ пяти боссов в основе архетипа лежит ВРАЩЕНИЕ или
// ПОМОЛ — буквально то, чем занимается мельница. Ковш вращается на видимом
// шарнире, жёрнов размалывает по кругу, финальное колесо — то самое
// вращающееся колесо мельницы в максимальном масштабе. Это не совпадение
// архетипов, а единая механическая логика места, которую видно на каждой
// картинке.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl52/) — все 5 картинок открыты:
// 1.webp — белёсый мешок муки, одной рукой сжимает завязанное горло мешка
//   (будто выдавливает пыль), другой — когтистый выпад. Архетип — облачные
//   всплески из ОДНОЙ фиксированной точки сжатия (роль enem1, знакомство)
//   — сверено: DUST_PUFF новый; отличен от STICKY_CLING Жабоскока (48,
//   несколько РАЗНЕСЁННЫХ по полю точек хвата конечностями) — здесь ОДНА
//   концентрированная точка сжатия, а не разбросанные точки.
// 2.webp — мельничный ковш: широкая зубастая пасть-черпак на видимом
//   вращающемся шарнире-шее. Архетип — быстрые маятниковые взмахи из
//   фиксированной точки поворота (роль enem2, быстрые серии) — сверено:
//   PADDLE_SWING новый.
// 3.webp — ребристый жёрнов: тяжёлый каменный круг с концентрическими
//   бороздами помола. Архетип — долгое накопление («жёрнов набирает ход»),
//   затем ДВА тяжёлых удара подряд с одной точки (полный оборот жёрнова =
//   2 контакта помола) — редкое и тяжёлое (роль enem3) — сверено:
//   GRIND_PULSE новый.
// 4.webp — седой мельничий: мешок муки за спиной, деревянная лопата в
//   руке. Обоснование нервности: не магический хаос, а трудовая спешка —
//   старик спешит успевать подкидывать зерно в темпе жёрнова. Архетип —
//   частые ровные броски лопатой подряд, рабочий темп без пауз (роль
//   enem4) — сверено: SHOVEL_FLURRY новый; отличен от WIND_FLAP Драняка
//   (51, порыв-и-затишье) и MATTED_LASH Свалявшейся (50, хаотичное
//   дёрганье) — здесь ровная, непрерывная трудовая спешка, не порыв и не
//   хаос.
// 5.webp — живое водяное колесо: огромный деревянный обод с лопастями,
//   вода стекает, злое лицо в ступице. Архетип — точки атаки НЕПРЕРЫВНО
//   вращаются по всей окружности поля (не 1-2 точки, как у Пылюка, и не
//   маятник, как у Ковшана, а полный оборот) — естественная кульминация
//   темы вращения всего уровня, тестирует пространственное чутьё игрока по
//   всему полю (роль enem5, финал) — сверено: WHEEL_ROTATION новый.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-51 (все роли
// ≤23% до этого уровня): Пылюк — accelerate (каждое сжатие пылит быстрее
// предыдущего, мука истощается) 10%→13%; Ковшан — lateRush (маятник
// набирает мах и щёлкает) 12%→15.2%; Жерновик — straight (прямое
// неотвратимое давление жёрнова) 12%→15.2%; Замуч — weave (уставшее тело
// раскачивается в спешке) 12%→15.2%; Вертень — wave (стекающая с колеса
// вода колышется в такт вращению) 16%→18%.
//
// ЦЕПИ (13.6/13.7) — форма выбрана ИЗ образа и сверена с полным
// распределением: Пылюк — arc(3)+irregular(5): облако пыли расходится
// дугой, затем оседает хаотично (у enem1 обе были 18%/14% — низкие, ЧИНЯТ
// пограничный vertical 27%, доля падает до 25%); Ковшан —
// diagonal(3)+zigzag(4): маятник качается в одну сторону, затем чаще
// туда-сюда (у enem2 обе были 18% — низкие, распределение становится
// идеально ровным по 20.8% каждая); Жерновик — vertical(3)+zigzag(4):
// жёрнов бьёт по одной оси, затем неровно от биения (у enem3 обе были
// 18% — низкие, ЧИНЯТ пограничный diagonal 27%, доля падает до 25%);
// Замуч — vertical(4)+diagonal(4): лопата бросает по одной линии, затем
// решительно в сторону (у enem4 обе были 18% — низкие, ЧИНЯТ пограничные
// zigzag/irregular по 23%, обе падают до 20.8%); Вертень — arc(3)+
// irregular(6): колесо описывает дугу, затем полный хаотичный оборот на
// кульминации (у enem5 обе были 18% — низкие, ЧИНЯТ пограничные diagonal/
// zigzag по 23%, обе падают до 20.8%).
let lvlNumber = 52;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.753, damageMultiplier: 1.782, minWaveDelay: 4501, minShotDelay: 113, minTelegraphMs: 539,
	phases: [
		{ phase: 1, minHp: 0.687, cadence: 0.972, speed: 1.038, damage: 1, telegraphMultiplier: 1.032, surpriseChance: 0.107, maxActiveAttacks: 29 },
		{ phase: 2, minHp: 0.337, cadence: 0.786, speed: 1.169, damage: 1.12, telegraphMultiplier: 0.874, surpriseChance: 0.207, maxActiveAttacks: 33 },
		{ phase: 3, minHp: 0, cadence: 0.628, speed: 1.284, damage: 1.22, telegraphMultiplier: 0.769, surpriseChance: 0.307, maxActiveAttacks: 37 }
	],
	bosses: {
		enem1: { combatIdentity: "Две порции из горла и разрыв бокового шва", combatTrick: "После двух порций муки из одной точки остаётся боковой выброс. Ошибка — уйти к мешку после первой порции или не проверить шов.", signatureEvery: 3, movementStyle: 'drift', cadence: 1.005, telegraphMs: 943, speedMultiplier: 1.026, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Опрокидывание, короткий слив и обратный край", combatTrick: "Содержимое сливается сгущением после опрокидывания. Пустой край возвращается отдельно. Ошибка — продолжать равномерный маятник вместо короткого слива и обратного ответа.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.994, telegraphMs: 853, speedMultiplier: 1.056, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Два контакта одного ребра перед следующей бороздой", combatTrick: "Тяжёлый камень замирает, затем одно ребро проходит дважды перед сменой борозды. Ошибка — принять первый контакт за конец оборота.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.814, telegraphMs: 1053, speedMultiplier: 1.016, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Рабочий такт со сдвоенной порцией и обратной рукоятью", combatTrick: "После порций муки рабочий такт перебивается сдвоенным ответом и обратным ударом. Ошибка — бить по привычному равномерному счёту и уйти после первой порции.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.954, telegraphMs: 813, speedMultiplier: 1.076, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Разгрузка лопастей по дуге с повтором края", combatTrick: "Лопасти разгружаются последовательно по дуге. Первый край не завершает оборот: после внутренней пары остаётся ещё одна внешняя лопасть. Ошибка — закончить обход на первом краю.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.934, telegraphMs: 983, speedMultiplier: 1.094, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl52/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl52/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl52/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl52/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl52/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Пылюк',
        image: 'images/enemies/regions/5_dom_dvor/lvl52/1.webp',
        baseHP: 13847,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Ковшан',
        image: 'images/enemies/regions/5_dom_dvor/lvl52/2.webp',
        baseHP: 34620,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Жерновик',
        image: 'images/enemies/regions/5_dom_dvor/lvl52/3.webp',
        baseHP: 61245,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Замуч',
        image: 'images/enemies/regions/5_dom_dvor/lvl52/4.webp',
        baseHP: 98479,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Вертень',
        image: 'images/enemies/regions/5_dom_dvor/lvl52/5.webp',
        baseHP: 149140,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 16;
 const bossInterval = 19;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Пылюк =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.53 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.53 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.53 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.27 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.71 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.46 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.21 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.96 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.71 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.53 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.53 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.23 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.23 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.81 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.56 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.31 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.06 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.81 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.56 }, // 52 i

	// ===== Ковшан =====
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.55 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.73 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.55 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.55 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.63 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.38 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.13 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.88 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.55 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.55 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.33 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.83 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.33 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.83 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.73 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.48 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.23 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.98 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.73 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.48 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.23 }, // 53 i

	// ===== Жерновик =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.57 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.58 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.57 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.53 }, // 14 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.57 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 21 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.57 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 28 d
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.57 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 35 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.53 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.28 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.03 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.78 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.53 }, // 40 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.28 }, // 41 f
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.57 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 49 g
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.57 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.47 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.47 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.43 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.43 }, // 56 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 57 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.63 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.38 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.13 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.88 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.63 }, // 62 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.38 }, // 63 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.13 }, // 64 i

	// ===== Замуч =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.53 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.53 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.13 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.57 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.33 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.53 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.53 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.73 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.59 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.53 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.53 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.63 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.59 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.57 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.53 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.53 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.33 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.73 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.59 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.53 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.53 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.73 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.47 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.22 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.97 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.72 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.47 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.59 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.57 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.33 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.53 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.53 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.73 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.73 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.59 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.53 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.53 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.53 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.53 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.63 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.57 }, // 51 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.32 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.07 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.82 }, // 54 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.57 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.32 }, // 56 i

	// ===== Вертень =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.61, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.43, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.61, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.43, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.61, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.43, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.61, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 76, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.61, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.37, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.12, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.87, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.62, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.37, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.12, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.61, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.61, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.13, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.13, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.13, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.73, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.43, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 58 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.18, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 59 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.93, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 60 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.68, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.43, waveAmplitude: 3.73, waveFrequency: 1.87, wavePhase: 0.45 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.18, waveAmplitude: 4.73, waveFrequency: 2.37, wavePhase: 0.9 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.93, waveAmplitude: 2.73, waveFrequency: 1.37, wavePhase: 0 }, // 64 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 178, bossDelayAbDop: 12200, firstWaveDelayMs: 2630 }, // Две порции из горла и разрыв бокового шва
	{ boss: 'enem2', bossDelayAb: 178, bossDelayAbDop: 10901, firstWaveDelayMs: 2630 }, // Опрокидывание, короткий слив и обратный край
	{ boss: 'enem3', bossDelayAb: 179, bossDelayAbDop: 16901, firstWaveDelayMs: 2630 }, // Два контакта одного ребра перед следующей бороздой
	{ boss: 'enem4', bossDelayAb: 187, bossDelayAbDop: 10550, firstWaveDelayMs: 2630 }, // Рабочий такт со сдвоенной порцией и обратной рукоятью
	{ boss: 'enem5', bossDelayAb: 173, bossDelayAbDop: 14701, firstWaveDelayMs: 2630 }, // Разгрузка лопастей по дуге с повтором края
];

 const bossAbilitiesDop = [
	// Пылюк
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [250, 0, 0, 250] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 250, 250, 500, 500] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [500, 250, 0, 0, 500] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [250, 0, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0], openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [0, 0, 250, 0, 500, 500] },
	{ boss: 'enem1', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [0, 250, 250, 250, 250, 500] },
	{ boss: 'enem1', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0, 0] },

	// Ковшан
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 250], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [250, 0, 0, 250] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15, 16], shotGapsMs: [500, 0, 500, 0, 0, 500] },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [500, 250, 500, 250, 500] },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [0, 250, 250, 250, 0] },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 337, shotGapsMs: [0, 0, 0], openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [500, 0, 500, 500, 0, 250] },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [500, 0, 250, 250, 500, 0] },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51, 52, 53], signature: true, isChain: true, minPhase: 3, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0, 0, 0] },

	// Жерновик
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 0, 250, 0, 0, 500], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13, 14], shotGapsMs: [0, 0, 0, 0, 250, 500, 500] },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19, 20, 21], shotGapsMs: [0, 250, 0, 0, 500, 250] },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25, 26, 27, 28], shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [29, 30, 31, 32, 33, 34, 35], shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 39, 40, 41], signature: true, isChain: true, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [0, 0, 250, 250, 250, 500, 0] },
	{ boss: 'enem3', indexAbilities: [50, 51, 52, 53, 54, 55, 56, 57], minPhase: 3, shotGapsMs: [250, 0, 0, 0, 0, 250, 250] },
	{ boss: 'enem3', indexAbilities: [58, 59, 60, 61, 62, 63, 64], signature: true, isChain: true, minPhase: 3, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0, 0, 0] },

	// Замуч
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [250, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [0, 500, 500, 0, 0] },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 250, 0] },
	{ boss: 'enem4', indexAbilities: [17, 18, 19, 20, 21, 22, 23], shotGapsMs: [500, 0, 250, 500, 250, 0] },
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [250, 500, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0], openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39, 40, 41, 42], minPhase: 2, shotGapsMs: [0, 500, 0, 0, 250, 250, 500] },
	{ boss: 'enem4', indexAbilities: [43, 44, 45, 46, 47, 48, 49, 50], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [51, 52, 53, 54, 55, 56], signature: true, isChain: true, minPhase: 3, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0, 0] },

	// Вертень
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [0, 0, 250, 0, 250, 250, 250], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [0, 250, 0, 0, 250, 250, 500] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21, 22], shotGapsMs: [250, 0, 250, 0, 0, 250] },
	{ boss: 'enem5', indexAbilities: [23, 24, 25, 26, 27, 28, 29], shotGapsMs: [250, 0, 0, 250, 250, 500] },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34, 35, 36], shotGapsMs: [500, 0, 0, 250, 250, 0] },
	{ boss: 'enem5', indexAbilities: [37, 38, 39, 40, 41, 42], signature: true, isChain: true, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [500, 250, 250, 500, 250, 0] },
	{ boss: 'enem5', indexAbilities: [50, 51, 52, 53, 54, 55, 56, 57], minPhase: 3, shotGapsMs: [500, 0, 0, 250, 250, 250, 0] },
	{ boss: 'enem5', indexAbilities: [58, 59, 60, 61, 62, 63, 64], signature: true, isChain: true, minPhase: 3, shotDelayMs: 337, shotGapsMs: [0, 0, 0, 0, 0, 0] },

];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Пылюк — мешок муки: пыль, шов, завязка, мука, облако.
    enem1: {
        variant1: 'Пыльный кураж', variant2: 'Завязочная хватка', variant3: 'Горло-таран',
        variant4: 'Мучной напор', variant5: 'Меткий выдох', variant6: 'Бешеный выдох',
        variant7: 'Пылюков норов', variant8: 'Крепкий шов', variant9: 'Ударное облако',
        variant10: 'Живучая завязка', variant11: 'Колючая пыль', variant12: 'Выдох и в темноту',
        variant13: 'Толстая мешковина', variant14: 'Неутомимый выдох', variant15: 'Пружинистое сжатие',
        variant16: 'Острый шов, зоркий глаз', variant17: 'Мучная удача', variant18: 'Верный выдох',
        variant19: 'Молниеносный выдох', variant20: 'Мучной нюх', variant21: 'Цепкая завязка',
        variant22: 'Юркий, несмотря на вес', variant23: 'Мешочная стойкость', variant24: 'Долгий выдох, зоркий глаз',
        variant25: 'Ускользающее облако', variant26: 'Дикий выдох', variant27: 'Стойкий шов',
        variant28: 'Облако наповал', variant29: 'Крепкий пылюк', variant30: 'Мучная мощь',
        variant31: 'Сжатие с оглядкой', variant32: 'Живучий шов', variant33: 'Юркий и пыльный',
        variant34: 'Мешочная прыть', variant35: 'Быстрый выдох, крепкая завязка'
    },
    // Ковшан — мельничный ковш: шарнир, зуб, бортик, замах, бубенец.
    enem2: {
        variant1: 'Ковшовый кураж', variant2: 'Шарнирная хватка', variant3: 'Зуб-таран',
        variant4: 'Маятниковый напор', variant5: 'Меткий взмах', variant6: 'Бешеный взмах',
        variant7: 'Ковшанский норов', variant8: 'Крепкий бортик', variant9: 'Ударный зуб',
        variant10: 'Живучий шарнир', variant11: 'Колючий зуб', variant12: 'Взмах и в темноту',
        variant13: 'Толстый бортик', variant14: 'Неутомимый взмах', variant15: 'Пружинистый взмах',
        variant16: 'Острый зуб, зоркий глаз', variant17: 'Маятниковая удача', variant18: 'Верный взмах',
        variant19: 'Молниеносный взмах', variant20: 'Шарнирный нюх', variant21: 'Цепкий бортик',
        variant22: 'Юркий на своём шарнире', variant23: 'Ковшовая стойкость', variant24: 'Долгий размах, зоркий глаз',
        variant25: 'Ускользающий взмах', variant26: 'Дикий взмах', variant27: 'Стойкий зуб',
        variant28: 'Взмах наповал', variant29: 'Крепкий ковшан', variant30: 'Маятниковая мощь',
        variant31: 'Взмах с оглядкой', variant32: 'Живучий бортик', variant33: 'Юркий и зубастый',
        variant34: 'Ковшовая прыть', variant35: 'Быстрый взмах, крепкий бубенец'
    },
    // Жерновик — жёрнов: борозда, помол, ось, камень, оборот.
    enem3: {
        variant1: 'Жерновой кураж', variant2: 'Бороздовая хватка', variant3: 'Камень-таран',
        variant4: 'Помольный напор', variant5: 'Меткий помол', variant6: 'Бешеный помол',
        variant7: 'Жерновиков норов', variant8: 'Крепкая ось', variant9: 'Ударный оборот',
        variant10: 'Живучая борозда', variant11: 'Колючий камень', variant12: 'Помол и в темноту',
        variant13: 'Толстый камень', variant14: 'Неутомимый помол', variant15: 'Пружинистый оборот',
        variant16: 'Острая борозда, зоркий глаз', variant17: 'Каменная удача', variant18: 'Верный помол',
        variant19: 'Молниеносный помол', variant20: 'Каменный нюх', variant21: 'Цепкая ось',
        variant22: 'Юркий, несмотря на вес камня', variant23: 'Жерновая стойкость', variant24: 'Долгий помол, зоркий глаз',
        variant25: 'Ускользающий помол', variant26: 'Дикий помол', variant27: 'Стойкая ось',
        variant28: 'Помол наповал', variant29: 'Крепкий жерновик', variant30: 'Каменная мощь',
        variant31: 'Помол с оглядкой', variant32: 'Живучий камень', variant33: 'Юркий и каменный',
        variant34: 'Жерновая прыть', variant35: 'Быстрый помол, крепкая ось'
    },
    // Замуч — старый мельничий: лопата, мука, борода, спешка, мешок.
    enem4: {
        variant1: 'Лопатный кураж', variant2: 'Бородатая хватка', variant3: 'Лопата-таран',
        variant4: 'Спешный напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
        variant7: 'Замучный норов', variant8: 'Крепкая лопата', variant9: 'Ударный бросок',
        variant10: 'Живучая борода', variant11: 'Колючая мука', variant12: 'Бросок и в темноту',
        variant13: 'Толстый мешок', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
        variant16: 'Острая лопата, зоркий глаз', variant17: 'Спешная удача', variant18: 'Верный бросок',
        variant19: 'Молниеносный бросок', variant20: 'Спешный нюх', variant21: 'Цепкий мешок',
        variant22: 'Юркий, несмотря на возраст', variant23: 'Мельничья стойкость', variant24: 'Долгая смена, зоркий глаз',
        variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкий мешок',
        variant28: 'Бросок наповал', variant29: 'Крепкий замуч', variant30: 'Спешная мощь',
        variant31: 'Бросок с оглядкой', variant32: 'Живучий мешок', variant33: 'Юркий и мучной',
        variant34: 'Спешная прыть', variant35: 'Быстрый бросок, крепкая лопата'
    },
    // Вертень — водяное колесо: обод, лопасть, вода, мох, оборот.
    enem5: {
        variant1: 'Колёсный кураж', variant2: 'Лопастная хватка', variant3: 'Обод-таран',
        variant4: 'Водяной напор', variant5: 'Меткий оборот', variant6: 'Бешеный оборот',
        variant7: 'Вертеневый норов', variant8: 'Крепкий обод', variant9: 'Ударная лопасть',
        variant10: 'Живучий мох', variant11: 'Колючая лопасть', variant12: 'Оборот и в темноту',
        variant13: 'Толстый обод', variant14: 'Неутомимый оборот', variant15: 'Пружинистая лопасть',
        variant16: 'Острая лопасть, зоркий глаз', variant17: 'Водяная удача', variant18: 'Верный оборот',
        variant19: 'Молниеносный оборот', variant20: 'Водяной нюх', variant21: 'Цепкий обод',
        variant22: 'Юркий, несмотря на массу', variant23: 'Колёсная стойкость', variant24: 'Долгий разгон, зоркий глаз',
        variant25: 'Ускользающий оборот', variant26: 'Дикий оборот', variant27: 'Стойкий мох',
        variant28: 'Оборот наповал', variant29: 'Крепкий вертень', variant30: 'Водяная мощь',
        variant31: 'Оборот с оглядкой', variant32: 'Живучий обод', variant33: 'Юркий и мшистый',
        variant34: 'Колёсная прыть', variant35: 'Быстрый оборот, крепкий обод'
    }
};
