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
			// Кочанище: PEELING_LAYERS — атаки расширяющимися концентрическими слоями
			movementStyle: 'straight', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Кочанище: PEELING_LAYERS — атаки расширяющимися концентрическими слоями
		enem2: {
			// Реписько: ROLL_BOUNCE — быстрые отскоки между немногими точками низко над землёй
			movementStyle: 'drift', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Реписько: ROLL_BOUNCE — быстрые отскоки между немногими точками низко над землёй
		enem3: {
			// Плетень: TENDRIL_COIL_SNAP — усик заметно скручивается, затем один длинный хлёсткий бросок
			movementStyle: 'weave', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Плетень: TENDRIL_COIL_SNAP — усик заметно скручивается, затем один длинный хлёсткий бросок
		enem4: {
			// Драняк: WIND_FLAP — долгое затишье, затем внезапный порыв разом по всем направлениям
			movementStyle: 'wave', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Драняк: WIND_FLAP — долгое затишье, затем внезапный порыв разом по всем направлениям
		enem5: {
			// Грядочник: HOE_AND_SHOWER — рубящий удар тяпкой + направленная поливочная струя
			movementStyle: 'straight', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Грядочник: HOE_AND_SHOWER — рубящий удар тяпкой + направленная поливочная струя
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Кочанище: PEELING_LAYERS — расширяющиеся концентрические слои,
	// как капустные листья, снимаемые один за другим наружу =====
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0  слой 1 (ближний)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1  слой 1
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //2  слой 2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //3  слой 2
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //4  слой 3 (внешний)
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //5  слой 3
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //12 — нежданчик: внешний слой появляется раньше среднего
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — лист разворачивается дугой, затем неровно
	// отгибается зигзагом (arc+zigzag), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Реписько: ROLL_BOUNCE — быстрые отскоки между 2-3 фиксированными
	// точками низко над землёй =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0  точка A
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //1  точка B
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2  точка C
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3  точка A
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4  точка C
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7  точка A, быстрый акцент
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //8  точка C, быстрый акцент
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //9  точка B низ
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //10 точка B
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //12 — нежданчик: отскок сразу в третью точку, минуя среднюю
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — репа катится по прямой вниз, затем
	// отскакивает хаотично (vertical+irregular), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //22 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //23 цепь-B звено 5

	// ===== Плетень: TENDRIL_COIL_SNAP — усик заметно скручивается на месте
	// во время долгого телеграфа, затем один длинный хлёсткий бросок =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //1  та же точка — «скручивание»
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //10 — длинный хлёсткий бросок (после скручивания 0-1)
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: бросок без скручивания, сразу
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — правка 2026-09-16 (снята дубликат-пара с
	// уровня 46). Цепь-A (irregular, 5) — плеть закручивается без явного
	// шаблона. Цепь-B (zigzag, 4) — резкие чёткие броски туда-сюда.
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова, irregular)
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //20 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17 }, //21 цепь-B звено 1 (голова, zigzag)
	{ boss: 'enem3', type: 'enem33', xPos: 5,  yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //22 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //23 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 5,  yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //24 цепь-B звено 4

	// ===== Драняк: WIND_FLAP — долгое затишье, будто ткань без ветра,
	// затем внезапный порыв разом по всем направлениям =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: порыв длится дольше обычного, вторая волна следом
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — порыв ветра сносит фигуру в одну сторону,
	// затем дугой обратно (diagonal+arc), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Грядочник: HOE_AND_SHOWER — резкий рубящий удар тяпкой + серия
	// капель вдоль направления полива =====
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0  удар тяпкой
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1  удар тяпкой
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //2  струя капля 1
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //3  струя капля 2 (та же линия)
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4  струя капля 1
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 38, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //5  струя капля 2
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //13 — нежданчик: тяпка бьёт по центру без привычного полива перед ней
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //15
	// звенья «атакующей цепи» — тяпка бьёт дугой, лейка льёт по прямой
	// линии (arc+diagonal), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //21 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // ровное давление слоями
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4300 }, // самый частый — быстрые отскоки
	{ boss: 'enem3', bossDelayAb: 410, bossDelayAbDop: 6900 }, // самый долгий отдых — закручивание требует времени
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // долгое затишье, но короткий шаг внутри порыва
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Кочанище — PEELING_LAYERS
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [6, 8, 7, 9] },
	{ boss: 'enem1', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, arc)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, zigzag)
	{ boss: 'enem1', indexAbilities: [12, 13, 4, 5] }, // нежданчик: внешний слой появляется раньше среднего
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5] }, // сигнатурная: все три слоя разом наружу

	// Реписько — ROLL_BOUNCE
	{ boss: 'enem2', indexAbilities: [0, 1, 2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8] },
	{ boss: 'enem2', indexAbilities: [9, 10] },
	{ boss: 'enem2', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, vertical)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: отскок сразу в третью точку, минуя среднюю
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 0, 2, 1] }, // сигнатурная: полный тройной отскок туда-сюда

	// Плетень — TENDRIL_COIL_SNAP
	{ boss: 'enem3', indexAbilities: [0, 1, 10] },
	{ boss: 'enem3', indexAbilities: [2, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5, irregular)
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24], isChain: true }, // ← цепь-B (4, zigzag)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: бросок без скручивания, сразу
	{ boss: 'enem3', indexAbilities: [0, 1, 10, 11, 4, 12] }, // сигнатурная: скручивание и бросок с обеих сторон подряд

	// Драняк — WIND_FLAP
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, diagonal)
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, arc)
	{ boss: 'enem4', indexAbilities: [13, 10, 15] }, // нежданчик: порыв длится дольше обычного, вторая волна следом
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: порыв разом по всем направлениям

	// Грядочник — HOE_AND_SHOWER, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [6, 7] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [0, 2, 3] }, // same-start с [0], расходится поливом
	{ boss: 'enem5', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, arc)
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, diagonal)
	{ boss: 'enem5', indexAbilities: [13] }, // нежданчик: тяпка бьёт по центру без привычного полива перед ней
	{ boss: 'enem5', indexAbilities: [0, 2, 3, 1, 4, 5, 14, 15] }, // сигнатурная кульминация: удар тяпкой и полив с обеих сторон разом
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
