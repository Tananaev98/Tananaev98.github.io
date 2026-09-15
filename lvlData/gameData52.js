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
			// Пылюк: DUST_PUFF — облачные всплески из одной фиксированной точки сжатия
			movementStyle: 'accelerate', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Пылюк: DUST_PUFF — облачные всплески из одной фиксированной точки сжатия
		enem2: {
			// Ковшан: PADDLE_SWING — быстрые маятниковые взмахи из точки поворота
			movementStyle: 'lateRush', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Ковшан: PADDLE_SWING — быстрые маятниковые взмахи из точки поворота
		enem3: {
			// Жерновик: GRIND_PULSE — долгое накопление хода, затем два тяжёлых удара подряд с одной точки
			movementStyle: 'straight', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Жерновик: GRIND_PULSE — долгое накопление хода, затем два тяжёлых удара подряд с одной точки
		enem4: {
			// Замуч: SHOVEL_FLURRY — частые ровные броски лопатой подряд, рабочий темп без пауз
			movementStyle: 'weave', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Замуч: SHOVEL_FLURRY — частые ровные броски лопатой подряд, рабочий темп без пауз
		enem5: {
			// Вертень: WHEEL_ROTATION — точки атаки непрерывно вращаются по всей окружности поля
			movementStyle: 'wave', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Вертень: WHEEL_ROTATION — точки атаки непрерывно вращаются по всей окружности поля
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
        size: '23%',
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
        size: '23%',
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
        size: '25%',
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
        size: '24%',
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
	// ===== Пылюк: DUST_PUFF — облачные всплески из одной фиксированной
	// точки сжатия горла мешка =====
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0  точка сжатия
	{ boss: 'enem1', type: 'enem11', xPos: 48, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1  та же точка
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //2  та же точка, шире
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 51, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //10 точка сжатия
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 47, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: тройной залп из одной точки подряд
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — облако пыли расходится дугой, затем оседает
	// хаотично (arc+irregular), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //22 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //23 цепь-B звено 5

	// ===== Ковшан: PADDLE_SWING — быстрые маятниковые взмахи из
	// фиксированной точки поворота-шарнира =====
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0  шарнир — влево
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1  маятник влево
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2  шарнир — вправо
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //3  маятник вправо
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: маятник в обе стороны почти разом
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — маятник качается в одну сторону, затем чаще
	// туда-сюда (diagonal+zigzag), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Жерновик: GRIND_PULSE — долгое накопление хода, затем два
	// тяжёлых удара подряд с одной точки =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1  та же точка, второй контакт помола
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3  та же точка, второй контакт
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: пульс раньше привычного долгого накопления
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — жёрнов бьёт по одной оси, затем неровно от
	// биения (vertical+zigzag), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Замуч: SHOVEL_FLURRY — частые ровные броски лопатой подряд,
	// рабочий темп без пауз =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: двойной бросок с одной стороны без чередования
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — лопата бросает по одной линии, затем
	// решительно в сторону (vertical+diagonal), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Вертень: WHEEL_ROTATION — точки атаки непрерывно вращаются по
	// всей окружности поля =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0  12 часов
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //1  3 часа
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //2  6 часов
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //3  9 часов
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: колесо вдруг делает полный оборот на пике скорости
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — колесо описывает дугу, затем полный
	// хаотичный оборот на кульминации (arc+irregular), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //22 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //23 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //24 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 315, bossDelayAbDop: 5800 }, // ровное сжатие мешка
	{ boss: 'enem2', bossDelayAb: 225, bossDelayAbDop: 4400 }, // самый частый — быстрый маятник
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6950 }, // самый долгий отдых — накопление хода
	{ boss: 'enem4', bossDelayAb: 190, bossDelayAbDop: 3400 }, // рабочая спешка без пауз
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Пылюк — DUST_PUFF
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [10, 13] },
	{ boss: 'enem1', indexAbilities: [4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 8, 7, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, arc)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem1', indexAbilities: [13, 10, 1] }, // нежданчик: тройной залп из одной точки подряд
	{ boss: 'enem1', indexAbilities: [0, 2, 10, 1, 3, 13] }, // сигнатурная: полное сжатие мешка на пределе

	// Ковшан — PADDLE_SWING
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 6] },
	{ boss: 'enem2', indexAbilities: [5, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, diagonal)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, zigzag)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: маятник в обе стороны почти разом
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 6, 7] }, // сигнатурная: полный размах маятника с обеих сторон

	// Жерновик — GRIND_PULSE
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [4, 5] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [0, 1, 8] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, vertical)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, zigzag)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: пульс раньше привычного долгого накопления
	{ boss: 'enem3', indexAbilities: [0, 1, 10, 2, 3, 11] }, // сигнатурная: двойной удар с обеих сторон подряд

	// Замуч — SHOVEL_FLURRY
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [6, 7, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, vertical)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4, diagonal)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: двойной бросок с одной стороны без чередования
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: непрерывный шквал бросков по всему полю

	// Вертень — WHEEL_ROTATION, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [6, 7] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [10, 11] },
	{ boss: 'enem5', indexAbilities: [8, 9] },
	{ boss: 'enem5', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, arc)
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (6, irregular)
	{ boss: 'enem5', indexAbilities: [12] }, // нежданчик: колесо вдруг делает полный оборот на пике скорости
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 6, 7, 13, 14] }, // сигнатурная кульминация: полный оборот колеса разом по всему полю
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
