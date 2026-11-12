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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.737, damageMultiplier: 1.792, minWaveDelay: 5300, minShotDelay: 114, minTelegraphMs: 569,
	phases: [
		{ phase: 1, minHp: 0.7, cadence: 0.96, speed: 1.05, damage: 1.023, telegraphMultiplier: 1.045, surpriseChance: 0.123, maxActiveAttacks: 39 },
		{ phase: 2, minHp: 0.342, cadence: 0.768, speed: 1.191, damage: 1.177, telegraphMultiplier: 0.885, surpriseChance: 0.222, maxActiveAttacks: 43 },
		{ phase: 3, minHp: 0, cadence: 0.614, speed: 1.311, damage: 1.253, telegraphMultiplier: 0.779, surpriseChance: 0.323, maxActiveAttacks: 47 }
	],
	bosses: {
		enem1: { combatIdentity: "Обод прошёл, ступица завершает оборот", combatTrick: "После прохода обода остаётся участок оборота ступицы. Ошибка — бить после прохода, бросив оставшуюся часть. Закончить нужно полный оборот.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.987, telegraphMs: 971, speedMultiplier: 1.034, damageMultiplier: 0.945, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Две дуги и внутренний замыкающий зуб", combatTrick: "После двух дуг хомута остаётся внутренний зуб. Ошибка — бить в заминке или после первого края, не закончив замыкание.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.689, telegraphMs: 893, speedMultiplier: 1.018, damageMultiplier: 0.955, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Два копыта, натяжение упряжи и сброс тяги", combatTrick: "После двух копыт упряжь ещё натянута и разгоняет оставшийся участок. Ошибка — бить после первого следа, не закончив сброс тяги.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.969, telegraphMs: 1033, speedMultiplier: 1.047, damageMultiplier: 1.155, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Фиксация молотком, проход и извлечение коловорота", combatTrick: "После долгой фиксации молотком остаются проходы и извлечение коловорота. Ошибка — бить после стука, бросив инструмент в отверстии.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.952, telegraphMs: 859, speedMultiplier: 1.039, damageMultiplier: 1.055, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Наезд прошёл, груз и оглобля ещё завершают", combatTrick: "Разгон телеги не заканчивается проездом передней части: груз и оглобля ещё идут. Ошибка — бить между ними, бросив остаточный наезд.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.935, telegraphMs: 1021, speedMultiplier: 1.073, damageMultiplier: 1.145, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
        baseDamage: 20.10,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Хомутень',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/2.webp',
        baseHP: 39746,
        baseSpeed: 0,
        baseDamage: 22.15,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Тягуня',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/3.webp',
        baseHP: 70321,
        baseSpeed: 0,
        baseDamage: 23.90,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Коловёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/4.webp',
        baseHP: 113125,
        baseSpeed: 0,
        baseDamage: 25.95,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Телегарь',
        image: 'images/enemies/regions/5_dom_dvor/lvl62/5.webp',
        baseHP: 171216,
        baseSpeed: 0,
        baseDamage: 28.15,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 25;
 const bossInterval = 28;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Катыш =====
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.771 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.239 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.239 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.739 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.739 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.539 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.832 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.832 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.332 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.332 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.132 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.771 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.833 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.833 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.333 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.333 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.133 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.771 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.834 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.834 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.334 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.334 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.134 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.771 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.835 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.835 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.335 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.335 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.135 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.711 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.461 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.211 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.771 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.837 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.837 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.337 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.337 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.137 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.537 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.771 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.838 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.838 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.338 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.338 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.138 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.538 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.811 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.561 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.311 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.061 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.811 }, // 50 i

	// ===== Хомутень =====
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.773 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.851 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.851 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.851 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.351 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.351 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.551 }, // 6 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.773 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.852 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.852 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.852 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.352 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.352 }, // 12 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.552 }, // 13 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.773 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.859 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.859 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.859 }, // 17 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.359 }, // 18 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.359 }, // 19 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.559 }, // 20 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.773 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.854 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.854 }, // 23 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.854 }, // 24 d
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.354 }, // 25 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.354 }, // 26 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.554 }, // 27 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.773 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.855 }, // 29 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.855 }, // 30 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.855 }, // 31 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.355 }, // 32 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.355 }, // 33 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.555 }, // 34 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.755 }, // 35 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.693 }, // 36 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.443 }, // 37 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.193 }, // 38 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.943 }, // 39 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.773 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.857 }, // 41 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.857 }, // 42 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.857 }, // 43 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.357 }, // 44 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.357 }, // 45 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.557 }, // 46 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.757 }, // 47 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.773 }, // 48 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.858 }, // 49 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.858 }, // 50 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.858 }, // 51 h
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.358 }, // 52 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.358 }, // 53 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.558 }, // 54 h
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.758 }, // 55 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.793 }, // 56 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.543 }, // 57 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.293 }, // 58 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.043 }, // 59 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.793 }, // 60 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.543 }, // 61 i

	// ===== Тягуня =====
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.391 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.391 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.191 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.191 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.691 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.691 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.392 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.392 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.192 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.192 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.692 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.692 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.775 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.393 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.393 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.193 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.193 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.693 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.693 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.775 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.394 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.394 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.194 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.194 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.694 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.694 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.775 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.395 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.395 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.195 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.195 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.695 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.695 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.671 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.421 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.171 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.921 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.671 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.775 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.397 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.397 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.197 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.197 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.697 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.697 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.897 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.775 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.398 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.398 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.198 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.198 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20.698 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.698 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 21.898 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.771 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.521 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.271 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.021 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.771 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.521 }, // 59 i

	// ===== Коловёрт =====
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.091 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.091 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.491 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.291 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.791 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.091 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.092 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.092 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.492 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.292 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.792 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.092 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.777 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.093 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.093 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.493 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.293 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.793 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.093 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.777 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.094 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.094 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.494 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.294 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.794 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.094 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.777 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.095 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.095 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.595 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.295 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.795 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.651 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.401 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.151 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.901 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.651 }, // 36 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.777 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.097 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.097 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.497 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.297 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.797 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.097 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.297 }, // 44 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.098 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.098 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.498 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.298 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.798 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.098 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.298 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.751 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.501 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.251 }, // 54 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.001 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.751 }, // 56 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.501 }, // 57 i

	// ===== Телегарь =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.779 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.471 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.471 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.471 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.971 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.471 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.071 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.671 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.779 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.472 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.472 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.472 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.972 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.472 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.072 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.672 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.272 }, // 16 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.572 }, // 17 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.779 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.473 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.473 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.473 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.973 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.473 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.073 }, // 24 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.673 }, // 25 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.273 }, // 26 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.474 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.474 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.474 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.974 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.474 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.074 }, // 32 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.674 }, // 33 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.274 }, // 34 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.475 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.475 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.475 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.975 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.475 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.075 }, // 40 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.675 }, // 41 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.275 }, // 42 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.231 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.981 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.731 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.481 }, // 46 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.231 }, // 47 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.981 }, // 48 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.477 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.477 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.477 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.977 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.477 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.077 }, // 54 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.677 }, // 55 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.478 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.478 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.478 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.978 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.478 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.078 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.678 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.331 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.081 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.831 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.581 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.331 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.081 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.831 }, // 69 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 190, bossDelayAbDop: 13500, firstWaveDelayMs: 2830 }, // Обод прошёл, ступица завершает оборот
	{ boss: 'enem2', bossDelayAb: 189, bossDelayAbDop: 17100, firstWaveDelayMs: 2830 }, // Две дуги и внутренний замыкающий зуб
	{ boss: 'enem3', bossDelayAb: 192, bossDelayAbDop: 15400, firstWaveDelayMs: 2830 }, // Два копыта, натяжение упряжи и сброс тяги
	{ boss: 'enem4', bossDelayAb: 171, bossDelayAbDop: 13700, firstWaveDelayMs: 2830 }, // Фиксация молотком, проход и извлечение коловорота
	{ boss: 'enem5', bossDelayAb: 151, bossDelayAbDop: 16400, firstWaveDelayMs: 2830 }, // Наезд прошёл, груз и оглобля ещё завершают
];

 const bossAbilitiesDop = [
	// Катыш
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 600, 600, 150], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 0, 500] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [650, 0, 650, 0, 650] },
	{ boss: 'enem1', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [650, 0, 0, 500, 0] },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [500, 0, 500, 500, 0] },
	{ boss: 'enem1', indexAbilities: [29, 30, 31], signature: true, isChain: true, shotDelayMs: 349, shotGapsMs: [0, 0], openingOrder: 1, label: "Обод прошёл, ступица завершает оборот — знакомство" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [250, 0, 0, 500, 0, 650] },
	{ boss: 'enem1', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [0, 0, 650, 0, 500, 0] },
	{ boss: 'enem1', indexAbilities: [46, 47, 48, 49, 50], signature: true, isChain: true, minPhase: 3, shotDelayMs: 381, shotGapsMs: [0, 0, 0, 0], label: "Обод прошёл, ступица завершает оборот — завершение" },

	// Хомутень
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [500, 0, 0, 0, 500, 500] },
	{ boss: 'enem2', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [500, 0, 0, 0, 0, 0] },
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 0, 0, 0, 0] },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32, 33, 34, 35], shotGapsMs: [0, 0, 0, 0, 0, 0, 250] },
	{ boss: 'enem2', indexAbilities: [36, 37, 38, 39], signature: true, isChain: true, shotDelayMs: 391, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Две дуги и внутренний замыкающий зуб — знакомство" },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46, 47], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0, 650, 0] },
	{ boss: 'enem2', indexAbilities: [48, 49, 50, 51, 52, 53, 54, 55], minPhase: 3, shotGapsMs: [500, 0, 250, 0, 0, 250, 0] },
	{ boss: 'enem2', indexAbilities: [56, 57, 58, 59, 60, 61], signature: true, isChain: true, minPhase: 3, shotDelayMs: 411, shotGapsMs: [0, 0, 0, 0, 0], label: "Две дуги и внутренний замыкающий зуб — завершение" },

	// Тягуня
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 650, 0, 0, 500], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [500, 650, 0, 0, 250] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [0, 250, 650, 0, 650, 500] },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [250, 650, 250, 0, 500, 500] },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30, 31, 32], shotGapsMs: [500, 0, 650, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [33, 34, 35, 36, 37], signature: true, isChain: true, shotDelayMs: 365, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Два копыта, натяжение упряжи и сброс тяги — знакомство" },
	{ boss: 'enem3', indexAbilities: [38, 39, 40, 41, 42, 43, 44, 45], minPhase: 2, shotGapsMs: [500, 500, 650, 0, 650, 250, 0] },
	{ boss: 'enem3', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53], minPhase: 3, shotGapsMs: [0, 250, 650, 0, 250, 650, 0] },
	{ boss: 'enem3', indexAbilities: [54, 55, 56, 57, 58, 59], signature: true, isChain: true, minPhase: 3, shotDelayMs: 399, shotGapsMs: [0, 0, 0, 0, 0], label: "Два копыта, натяжение упряжи и сброс тяги — завершение" },

	// Коловёрт
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 0, 250, 0, 250], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [250, 0, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [0, 250, 0, 250, 0, 500] },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [500, 650, 0, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30, 31], shotGapsMs: [0, 500, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 355, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Фиксация молотком, проход и извлечение коловорота — знакомство" },
	{ boss: 'enem4', indexAbilities: [37, 38, 39, 40, 41, 42, 43, 44], minPhase: 2, shotGapsMs: [0, 250, 0, 250, 0, 500, 500] },
	{ boss: 'enem4', indexAbilities: [12, 45, 46, 47, 48, 49, 50, 51], minPhase: 3, shotGapsMs: [500, 650, 0, 0, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [52, 53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 395, shotGapsMs: [0, 0, 0, 0, 0], label: "Фиксация молотком, проход и извлечение коловорота — завершение" },

	// Телегарь
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [500, 0, 0, 650, 0, 0, 250], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], shotGapsMs: [250, 0, 0, 650, 0, 0, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22, 23, 24, 25, 26], shotGapsMs: [500, 0, 0, 0, 0, 0, 650, 250] },
	{ boss: 'enem5', indexAbilities: [0, 27, 28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 0, 0, 250, 0, 250, 500, 0] },
	{ boss: 'enem5', indexAbilities: [0, 35, 36, 37, 38, 39, 40, 41, 42], shotGapsMs: [650, 0, 0, 0, 0, 250, 650, 0] },
	{ boss: 'enem5', indexAbilities: [43, 44, 45, 46, 47, 48], signature: true, isChain: true, shotDelayMs: 373, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Наезд прошёл, груз и оглобля ещё завершают — знакомство" },
	{ boss: 'enem5', indexAbilities: [0, 49, 50, 51, 52, 53, 54, 55], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0, 500, 250] },
	{ boss: 'enem5', indexAbilities: [0, 56, 57, 58, 59, 60, 61, 62], minPhase: 3, shotGapsMs: [650, 0, 0, 0, 0, 250, 650] },
	{ boss: 'enem5', indexAbilities: [63, 64, 65, 66, 67, 68, 69], signature: true, isChain: true, minPhase: 3, shotDelayMs: 403, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Наезд прошёл, груз и оглобля ещё завершают — завершение" },

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
