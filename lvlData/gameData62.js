// Уровень 62 «Тележный сарай» — двадцать четвёртый уровень области V,
// обычный (пять разных монстров, как 41-44/46-49/51-54/56-59/61).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-13 по
// admin-boss-pattern-panel.html, 305 строк, уровни 1-61 (включая свежую
// историю уровня 61).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl62/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — деревянное колесо с железным ободом, с обода каплет чёрная
//   смазка/дёготь, злое резное лицо в ступице — суть в КАЧЕНИИ, колесо
//   вращается и виляет на ходу.
// 2.webp — овальный железный хомут с деревянными зубьями-колышками по
//   внутреннему краю (как зубы в открытой пасти), металлическая маска-лицо
//   снизу — суть в ЗАЖИМЕ/СМЫКАНИИ, хомут закрывается как капкан.
// 3.webp — гривастая лошадиная голова на грузном теле в кожаной упряжи с
//   колокольчиком, оскаленные зубы, копыта — суть в ТЯГЕ, тяжеловоз тянет
//   через силу, а не бьёт изящно.
// 4.webp — бородатая фигура из досок и стружек, молоток в одной руке,
//   спиральный коловорот на поясе в другой — суть в ЛОВКОСТИ и смене
//   инструмента, а не грубой силе.
// 5.webp (финал) — гружёная телега с мешками и бочками сверху, огромная
//   клыкастая пасть спереди, колёса и оглобли действуют как ноги — суть в
//   НЕУПРАВЛЯЕМОМ РАЗГОНЕ, самая тяжёлая и неостановимая угроза.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА — реальная функция каждой детали тележного сарая, не общий шаблон
// роли: колесо катится и виляет → хомут зажимает и смыкается зубьями →
// тяжеловоз тянет через силу → тележник ловко меняет инструмент → готовая
// телега срывается с места неуправляемым разгоном. Прогрессия от ОТДЕЛЬНЫХ
// ДЕТАЛЕЙ повозки к ЦЕЛОЙ ожившей телеге — тот же приём эскалации
// «части→целое», что и на уровне 61 (иглы/пяльцы→вышитый зверь), но здесь
// про механизм телеги, а не про ткань, так что образ и ощущение разные.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные названия предметов):
// Катыш (от «катить» — суть колеса, не словарное «колесо»); Хомутень (от
// «хомут» — суть зажима, не словарное «хомут» напрямую); Тягуня (от
// «тянуть»/«тяга» — суть тяжеловоза, не словарное «кобыла»); Коловёрт
// (образовано от «коловорот» — инструмент тележника, переиначено под имя,
// не буквальное название инструмента); Телегарь (от «телега» — суть
// ожившей повозки, не словарное «телега»/«возница»).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-61: Катыш —
// drift (ровное непрерывное качение, а не рывки) 16%→17%; Хомутень — pause
// (зажим выжидает и резко смыкается) 13%→14%; Тягуня — accelerate
// (тяжеловоз набирает тяговое усилие постепенно) 13%→14%, низкий бакет
// роли; Коловёрт — weave (ловкое увёртывающееся движение мастера) 13%→14%,
// самый низкий бакет роли; Телегарь — lateRush (неуправляемый разгон
// срывается внезапно) 18%→19%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (метод закреплён на
// уровнях 57-61 — пары проверяются ДО записи файла): Катыш — arc(3)+
// arc(4): колесо катится дугой в одну сторону, затем дугой в другую —
// буквальное виляние колеса на ходу (пара с нулевой историей для enem1,
// повтор формы оправдан симметричной природой качения); Хомутень —
// zigzag(4)+arc(4): зубья хомута щёлкают неровно, затем один решительный
// смыкающий взмах (пара с нулевой историей для enem2); Тягуня —
// diagonal(3)+zigzag(4): равномерная тяга по прямой, затем спотыкающийся
// зигзаг под тяжестью груза (пара с нулевой историей для enem3); Коловёрт
// — zigzag(4)+diagonal(3): ловкий увёртывающийся зигзаг молотком, затем
// решительный укол коловоротом по диагонали (пара с нулевой историей для
// enem4); Телегарь — arc(4)+zigzag(6): широкий вильнувший занос телеги,
// затем судорожная тряска на колдобинах — самая длинная цепь уровня,
// ограничена 6 звеньями по разделу 13.5. Формы всех пяти пар подтверждены
// живым классификатором панели ПОСЛЕ записи файла (verify62.js + STEP 2),
// не только ручным расчётом.
let lvlNumber = 62;

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
			// Катыш: WHEEL_ROLL — ровное непрерывное качение, виляет на ходу
			movementStyle: 'drift', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Катыш: WHEEL_ROLL — ровное непрерывное качение, виляет на ходу
		enem2: {
			// Хомутень: COLLAR_CLAMP — зубья выжидают и резко смыкаются, как капкан
			movementStyle: 'pause', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Хомутень: COLLAR_CLAMP — зубья выжидают и резко смыкаются, как капкан
		enem3: {
			// Тягуня: HAUL_STRAIN — тяжеловоз тянет через силу, набирая усилие
			movementStyle: 'accelerate', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Тягуня: HAUL_STRAIN — тяжеловоз тянет через силу, набирая усилие
		enem4: {
			// Коловёрт: TOOL_SWITCH — ловкая смена инструмента, увёртывается на ходу
			movementStyle: 'weave', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Коловёрт: TOOL_SWITCH — ловкая смена инструмента, увёртывается на ходу
		enem5: {
			// Телегарь: RUNAWAY_CART — неуправляемый разгон срывается внезапно
			movementStyle: 'lateRush', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Телегарь: RUNAWAY_CART — неуправляемый разгон срывается внезапно
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl62/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl62/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl62/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl62/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl62/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Катыш',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/1.webp',
        baseHP: 15899,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '20%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Хомутень',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/2.webp',
        baseHP: 39746,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '22%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Тягуня',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/3.webp',
        baseHP: 70321,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '25%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Коловёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/4.webp',
        baseHP: 113125,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Телегарь',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/5.webp',
        baseHP: 171216,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '28%',
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
	// ===== Катыш: WHEEL_ROLL — ровное непрерывное качение, виляет на
	// ходу из стороны в сторону =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: колесо катится сразу быстро, без привычного разгона
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — колесо катится дугой в одну сторону, затем
	// дугой в другую (arc+arc), раздел 13.7 — буквальное виляние на ходу.
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Хомутень: COLLAR_CLAMP — зубья выжидают и резко смыкаются,
	// как капкан на шею =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: зажим смыкается сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — зубья хомута щёлкают неровно, затем один
	// решительный смыкающий взмах (zigzag+arc), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Тягуня: HAUL_STRAIN — тяжеловоз тянет через силу, набирая
	// тяговое усилие постепенно =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: рывок раньше привычного долгого натяжения постромков
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — равномерная тяга по прямой, затем
	// спотыкающийся зигзаг под тяжестью груза (diagonal+zigzag), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Коловёрт: TOOL_SWITCH — ловкая смена инструмента, увёртывается
	// на ходу между молотком и коловоротом =====
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
	// звенья «атакующей цепи» — ловкий увёртывающийся зигзаг молотком,
	// затем решительный укол коловоротом по диагонали (zigzag+diagonal),
	// раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //22 цепь-B звено 3

	// ===== Телегарь: RUNAWAY_CART — неуправляемый разгон, широкий занос
	// и судорожная тряска на колдобинах =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: разгон без единого мгновения подготовки
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — широкий вильнувший занос телеги, затем
	// судорожная тряска на колдобинах (arc+zigzag), раздел 13.7 — самая
	// длинная цепь уровня, ограничена 6 звеньями (раздел 13.5).
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //25 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // ровное неспешное качение
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — выжидающий зажим
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — тяжёлая натужная тяга
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частая ловкая смена инструмента
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Катыш — WHEEL_ROLL
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким наездом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: колесо катится сразу быстро, без привычного разгона
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: полный прокат через всё поле разом

	// Хомутень — COLLAR_CLAMP
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных смыканий подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойное смыкание с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия зажимов по всему полю подряд

	// Тягуня — HAUL_STRAIN
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним рывком
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: рывок раньше привычного долгого натяжения постромков
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: тяга с обеих сторон разом

	// Коловёрт — TOOL_SWITCH
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: удар разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: непрерывная работа обоих инструментов через всё поле

	// Телегарь — RUNAWAY_CART, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним рывком
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (6, максимум уровня)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: разгон без единого мгновения подготовки
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: неуправляемый разгон через весь двор разом
 ];

// Лорные названия связок временных улучшений — пять разных деталей одного
// тележного сарая, словарь каждого строго завязан на его реальный предмет
// и его конкретное действие (правило 12.1): колесо катится и смазано,
// хомут зажимает зубьями, тяжеловоз тянет упряжью, тележник ловко меняет
// инструмент, а телега мчится гружёным разгоном. Полных совпадений фраз
// между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Катыш — смазанное колесо: спица, обод, дёготь, качение.
    enem1: {
        variant1: 'Смазанный кураж', variant2: 'Ободная хватка', variant3: 'Спица-таран',
        variant4: 'Катящийся напор', variant5: 'Меткий наезд', variant6: 'Бешеный наезд',
        variant7: 'Смазанный норов', variant8: 'Крепкий обод', variant9: 'Ударный наезд',
        variant10: 'Живучая спица', variant11: 'Колючая спица', variant12: 'Наезд и в темноту',
        variant13: 'Толстый обод', variant14: 'Неутомимый наезд', variant15: 'Пружинистый наезд',
        variant16: 'Дёгтярный след, зоркий глаз', variant17: 'Смазанная удача', variant18: 'Верный наезд',
        variant19: 'Молниеносный наезд', variant20: 'Смазанный нюх', variant21: 'Цепкий обод',
        variant22: 'Юркий, несмотря на вес', variant23: 'Смазанная стойкость', variant24: 'Долгий прокат, зоркий глаз',
        variant25: 'Ускользающий наезд', variant26: 'Дикий наезд', variant27: 'Стойкий обод',
        variant28: 'Наезд наповал', variant29: 'Крепкий катыш', variant30: 'Катящаяся мощь',
        variant31: 'Наезд с оглядкой', variant32: 'Живучий обод', variant33: 'Юркий и смазанный',
        variant34: 'Катящаяся прыть', variant35: 'Быстрый наезд, крепкий обод'
    },
    // Хомутень — железный хомут: зуб, зажим, овал, металл.
    enem2: {
        variant1: 'Зубчатый кураж', variant2: 'Овальная хватка', variant3: 'Зажим-таран',
        variant4: 'Смыкающий напор', variant5: 'Меткий зажим', variant6: 'Бешеный зажим',
        variant7: 'Зубчатый норов', variant8: 'Крепкий обруч', variant9: 'Ударный зажим',
        variant10: 'Живучий зуб', variant11: 'Колючий зуб', variant12: 'Зажим и в темноту',
        variant13: 'Толстый обруч', variant14: 'Неутомимый зажим', variant15: 'Пружинистый зажим',
        variant16: 'Стальная хватка, зоркий глаз', variant17: 'Зубчатая удача', variant18: 'Верный зажим',
        variant19: 'Молниеносный зажим', variant20: 'Зубчатый нюх', variant21: 'Цепкий зуб',
        variant22: 'Юркий, несмотря на овал', variant23: 'Зубчатая стойкость', variant24: 'Долгое смыкание, зоркий глаз',
        variant25: 'Ускользающий зажим', variant26: 'Дикий зажим', variant27: 'Стойкий обруч',
        variant28: 'Зажим наповал', variant29: 'Крепкий хомутень', variant30: 'Смыкающая мощь',
        variant31: 'Зажим с оглядкой', variant32: 'Живучий обруч', variant33: 'Юркий и зубчатый',
        variant34: 'Зубчатая прыть', variant35: 'Быстрый зажим, крепкий обруч'
    },
    // Тягуня — тяговая кобыла: упряжь, копыто, бубенец, натуга.
    enem3: {
        variant1: 'Тяговый кураж', variant2: 'Упряжная хватка', variant3: 'Копыто-таран',
        variant4: 'Натужный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Тяговый норов', variant8: 'Крепкая упряжь', variant9: 'Ударный рывок',
        variant10: 'Живучий бубенец', variant11: 'Колючая подкова', variant12: 'Рывок и в темноту',
        variant13: 'Толстая упряжь', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Звонкий бубенец, зоркий глаз', variant17: 'Тяговая удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Тяговый нюх', variant21: 'Цепкое копыто',
        variant22: 'Юркая, несмотря на упряжь', variant23: 'Тяговая стойкость', variant24: 'Долгая натуга, зоркий глаз',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкая упряжь',
        variant28: 'Рывок наповал', variant29: 'Крепкая тягуня', variant30: 'Натужная мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая упряжь', variant33: 'Юркая и тяговая',
        variant34: 'Тяговая прыть', variant35: 'Быстрый рывок, крепкая упряжь'
    },
    // Коловёрт — ловкий тележник: молоток, стружка, коловорот, борода.
    enem4: {
        variant1: 'Мастеровой кураж', variant2: 'Стружечная хватка', variant3: 'Молоток-таран',
        variant4: 'Ловкий напор', variant5: 'Меткий удар', variant6: 'Бешеный удар',
        variant7: 'Мастеровой норов', variant8: 'Крепкая борода', variant9: 'Ударный замах',
        variant10: 'Живучая стружка', variant11: 'Колючая стружка', variant12: 'Удар и в темноту',
        variant13: 'Толстый молоток', variant14: 'Неутомимый удар', variant15: 'Пружинистый удар',
        variant16: 'Спиральный бур, зоркий глаз', variant17: 'Мастеровая удача', variant18: 'Верный удар',
        variant19: 'Молниеносный удар', variant20: 'Мастеровой нюх', variant21: 'Цепкий коловорот',
        variant22: 'Юркий, несмотря на инструмент', variant23: 'Мастеровая стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий удар', variant26: 'Дикий удар', variant27: 'Стойкий молоток',
        variant28: 'Удар наповал', variant29: 'Крепкий коловёрт', variant30: 'Ловкая мощь',
        variant31: 'Удар с оглядкой', variant32: 'Живучий молоток', variant33: 'Юркий и мастеровой',
        variant34: 'Мастеровая прыть', variant35: 'Быстрый удар, крепкий молоток'
    },
    // Телегарь — ожившая повозка: груз, мешок, пасть, оглобля.
    enem5: {
        variant1: 'Гружёный кураж', variant2: 'Мешковая хватка', variant3: 'Оглобля-таран',
        variant4: 'Разгонный напор', variant5: 'Меткий снос', variant6: 'Бешеный снос',
        variant7: 'Гружёный норов', variant8: 'Крепкий борт', variant9: 'Ударный снос',
        variant10: 'Живучий груз', variant11: 'Колючая щепа', variant12: 'Снос и в темноту',
        variant13: 'Толстый борт', variant14: 'Неутомимый снос', variant15: 'Пружинистый снос',
        variant16: 'Клыкастая пасть, дикий взгляд', variant17: 'Гружёная удача', variant18: 'Верный снос',
        variant19: 'Молниеносный снос', variant20: 'Гружёный нюх', variant21: 'Цепкая оглобля',
        variant22: 'Юркий, несмотря на груз', variant23: 'Гружёная стойкость', variant24: 'Долгий разгон, дикий взгляд',
        variant25: 'Ускользающий снос', variant26: 'Дикий снос', variant27: 'Стойкий борт',
        variant28: 'Снос наповал', variant29: 'Крепкий телегарь', variant30: 'Разгонная мощь',
        variant31: 'Снос с оглядкой', variant32: 'Живучий борт', variant33: 'Юркий и гружёный',
        variant34: 'Разгонная прыть', variant35: 'Быстрый снос, крепкий борт'
    }
};
