// Уровень 58 «Скотный двор» — двадцатый уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51-54/56-57).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 285 строк, уровни 1-57 (включая свежую
// историю уровня 57).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl58/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — пятнистый телёнок: солома в шерсти и на макушке, малые рожки-
//   бугорки, крупные когти, приземистая ПРУЖИНИСТАЯ поза — играет, а не
//   охотится, но лапы уже опасные.
// 2.webp — круторогий баран: тяжёлые закрученные рога, косматая белая
//   шерсть, широкая низкая стойка — весь силуэт заточен под ОДНО прямое
//   действие: удар рогами в лоб.
// 3.webp — бодливая коза: длинные откинутые назад рога, реденькая бородка,
//   хитрый прищур и ухмылка — не таранит в лоб как баран, а лукаво метит
//   исподтишка.
// 4.webp — буйный хряк: грязно-бурая щетина, длинные кривые клыки, доска
//   от изгороди застряла на загривке — крушит всё сплошным напролом,
//   вспышками неконтролируемой ярости.
// 5.webp (финал) — чёрный племенной бык: самый крупный силуэт, острые
//   прямые рога, МЕДНОЕ КОЛЬЦО в носу (прямая деталь идеи-документа) —
//   символ порванного контроля: то, что раньше держало его на привязи,
//   теперь висит просто так, пока он крушит двор.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА — реальное поведение каждого животного, не общий шаблон роли:
// телёнок ещё играет и неуклюже прыгает (детская энергия) → баран бьёт
// строго прямо и предсказуемо (лобовой таран) → коза хитрит и финтит,
// прежде чем боднуть (упрямая смекалка) → хряк крушит сплошным напролом
// без разбора (слепая ярость) → бык объединяет мощь и контроль, СОРВАВШИЙСЯ
// с кольца (финал — сила, которую больше никто не держит).
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные клички самих животных):
// Топотун (от «топотать» — детский неуклюжий топот телёнка); Бодалень (от
// «бодать» — прямой таранный удар барана); Бородань (от «борода» — реденькая
// бородка козы, а не словарное «козёл»/«упрямец»); Клычень (от «клык» —
// кривые клыки хряка, а не словарное «хряк»/«кабан»); Кольценос (составное
// изобретённое слово — медное кольцо в носу быка, ключевая деталь идеи-
// документа).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-57: Топотун —
// weave (неуклюжее виляние ещё не окрепших ног) 9%→10%, самый низкий бакет
// роли; Бодалень — straight (лобовой таран без единого финта) 12%→13%,
// самый низкий бакет роли; Бородань — weave (хитрое виляние перед ложным
// выпадом) 12%→13%; Клычень — lateRush (внезапный рывок ярости из ниоткуда)
// 14%→15%; Кольценос — accelerate (неудержимо набирает разгон, сорвавшись с
// кольца) 16%→17%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (см. урок уровня 56,
// закреплённый на уровне 57 — пары проверяются ДО записи файла): Топотун —
// zigzag(4)+zigzag(5): неуклюжий детский топот мечется туда-сюда, во второй
// связке ещё шире и увереннее (пара с нулевой историей для enem1); Бодалень
// — vertical(3)+vertical(4): два прямых лобовых удара подряд с разных точек
// — предсказуемость барана буквально в повторе одной и той же прямой формы
// (пара с нулевой историей для enem2, повтор формы — сознательный приём, как
// у Домового/Одичавшего на уровне 55); Бородань — diagonal(4)+irregular(5):
// подход по диагонали как обманный манёвр, затем непредсказуемый бросок —
// коза хитрит (пара с нулевой историей для enem3); Клычень — arc(4)+
// irregular(5): широкий удар клыками с разворота, затем неуправляемый
// рывок напролом (пара с нулевой историей для enem4); Кольценос — arc(4)+
// arc(6): широкий взмах рогами с одной стороны, затем ещё шире с другой —
// круговой снос всего, что попадается (пара с нулевой историей для enem5;
// длина ограничена 6 звеньями, а не историческим максимумом 7 — раздел
// 13.5 «половина самой длинной цепи» у Милы/Елисея упирается в потолок
// именно на 7-м звене при текущих постоянных статах врагов области, см.
// комментарий уровня 57 в lvlData/areas.js). Формы всех пяти пар
// подтверждены живым классификатором панели ПОСЛЕ записи файла (verify58.js
// + STEP 2), не только ручным расчётом.
let lvlNumber = 58;

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
			// Топотун: CALF_HOP — неуклюжие, но резвые прыжки-топотки на ещё некрепких ногах
			movementStyle: 'weave', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Топотун: CALF_HOP — неуклюжие, но резвые прыжки-топотки на ещё некрепких ногах
		enem2: {
			// Бодалень: RAM_CHARGE — прямой предсказуемый лобовой таран без единого финта
			movementStyle: 'straight', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Бодалень: RAM_CHARGE — прямой предсказуемый лобовой таран без единого финта
		enem3: {
			// Бородань: GOAT_FEINT — хитрое виляние и ложные заходы перед исподтишка-выпадом
			movementStyle: 'weave', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Бородань: GOAT_FEINT — хитрое виляние и ложные заходы перед исподтишка-выпадом
		enem4: {
			// Клычень: BOAR_RAMPAGE — внезапный слепой рывок ярости, крушит всё напролом
			movementStyle: 'lateRush', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Клычень: BOAR_RAMPAGE — внезапный слепой рывок ярости, крушит всё напролом
		enem5: {
			// Кольценос: BULL_UNCHAINED — неудержимо набирает разгон, сорвавшись с кольца контроля
			movementStyle: 'accelerate', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Кольценос: BULL_UNCHAINED — неудержимо набирает разгон, сорвавшись с кольца контроля
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl58/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl58/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl58/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl58/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl58/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Топотун',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/1.webp',
        baseHP: 14708,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Бодалень',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/2.webp',
        baseHP: 36769,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Бородань',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/3.webp',
        baseHP: 65054,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Клычень',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/4.webp',
        baseHP: 104651,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Кольценос',
        image: 'images/enemies/regions/5_dom_dvor/lvl58/5.webp',
        baseHP: 158391,
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
	// ===== Топотун: CALF_HOP — неуклюжие резвые прыжки на ещё некрепких
	// ногах, мечется туда-сюда =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: прыжок сразу в полную прыть, без привычного разгона
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — неуклюжий детский топот мечется туда-сюда,
	// во второй связке ещё шире (zigzag+zigzag), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5

	// ===== Бодалень: RAM_CHARGE — прямой предсказуемый лобовой таран
	// без единого финта =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: таран сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — два прямых лобовых удара подряд с разных
	// точек (vertical+vertical), раздел 13.7 — предсказуемость барана
	// буквально в повторе одной и той же прямой формы.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Бородань: GOAT_FEINT — хитрое виляние и ложные заходы перед
	// исподтишка-выпадом =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: выпад раньше привычного долгого виляния
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — подход по диагонали как обманный манёвр,
	// затем непредсказуемый бросок (diagonal+irregular), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5

	// ===== Клычень: BOAR_RAMPAGE — внезапный слепой рывок ярости, крушит
	// всё напролом =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: рывок разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — широкий удар клыками с разворота, затем
	// неуправляемый рывок напролом (arc+irregular), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5

	// ===== Кольценос: BULL_UNCHAINED — неудержимо набирает разгон,
	// сорвавшись с кольца контроля =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: разгон без единого мгновения замаха
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — широкий взмах рогами с одной стороны, затем
	// ещё шире с другой (arc+arc), раздел 13.7 — самая длинная цепь уровня,
	// но без превышения безопасного потолка 6 звеньев (раздел 13.5).
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //25 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // резвая, но неуклюжая скачка
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — предсказуемые прямые тараны
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — хитрая коза выжидает
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частые внезапные рывки ярости
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Топотун — CALF_HOP
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким прыжком
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: прыжок сразу в полную прыть, без привычного разгона
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: полный проскок через всё поле разом

	// Бодалень — RAM_CHARGE
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных таранов подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной таран с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия таранов по всему полю подряд

	// Бородань — GOAT_FEINT
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним выпадом
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: выпад раньше привычного долгого виляния
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: ложные заходы с обеих сторон разом

	// Клычень — BOAR_RAMPAGE
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним рывком
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: рывок разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: слепой шквал напролом через всё поле

	// Кольценос — BULL_UNCHAINED, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним разгоном
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (6)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: разгон без единого мгновения замаха
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: круговой снос всего двора разом
 ];

// Лорные названия связок временных улучшений — пять разных животных
// одного скотного двора, словарь каждого строго завязан на его реальное
// поведение (правило 12.1): телёнок топочет и прыгает, баран таранит в
// лоб, коза хитрит и виляет, хряк крушит клыками напролом, а бык рвётся
// с кольца на полном разгоне. Полных совпадений фраз между монстрами нет
// (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Топотун — резвый телёнок: солома, топот, прыть, рожки.
    enem1: {
        variant1: 'Соломенный кураж', variant2: 'Телячья хватка', variant3: 'Рожки-таран',
        variant4: 'Резвый напор', variant5: 'Меткий топот', variant6: 'Бешеный топот',
        variant7: 'Телячий норов', variant8: 'Крепкое копытце', variant9: 'Ударный топот',
        variant10: 'Живучая солома', variant11: 'Колючий рожок', variant12: 'Топот и в темноту',
        variant13: 'Толстая солома', variant14: 'Неутомимый топот', variant15: 'Пружинистый топот',
        variant16: 'Соломенный вихор, зоркий глаз', variant17: 'Телячья удача', variant18: 'Верный топот',
        variant19: 'Молниеносный топот', variant20: 'Телячий нюх', variant21: 'Цепкое копытце',
        variant22: 'Юркий, несмотря на возраст', variant23: 'Телячья стойкость', variant24: 'Долгий скок, зоркий глаз',
        variant25: 'Ускользающий топот', variant26: 'Дикий топот', variant27: 'Стойкая солома',
        variant28: 'Топот наповал', variant29: 'Крепкий топотун', variant30: 'Резвая мощь',
        variant31: 'Топот с оглядкой', variant32: 'Живучее копытце', variant33: 'Юркий и телячий',
        variant34: 'Телячья прыть', variant35: 'Быстрый топот, крепкое копытце'
    },
    // Бодалень — круторогий баран: рога, лоб, шерсть, таран.
    enem2: {
        variant1: 'Рогатый кураж', variant2: 'Лобовая хватка', variant3: 'Рога-таран',
        variant4: 'Таранный напор', variant5: 'Меткий удар лбом', variant6: 'Бешеный удар лбом',
        variant7: 'Рогатый норов', variant8: 'Крепкий лоб', variant9: 'Ударный таран',
        variant10: 'Живучая шерсть', variant11: 'Колючий завиток', variant12: 'Таран и в темноту',
        variant13: 'Толстая шерсть', variant14: 'Неутомимый таран', variant15: 'Пружинистый таран',
        variant16: 'Крутой завиток, зоркий глаз', variant17: 'Рогатая удача', variant18: 'Верный таран',
        variant19: 'Молниеносный таран', variant20: 'Рогатый нюх', variant21: 'Цепкий завиток',
        variant22: 'Юркий, несмотря на рога', variant23: 'Рогатая стойкость', variant24: 'Долгий разбег, зоркий глаз',
        variant25: 'Ускользающий таран', variant26: 'Дикий таран', variant27: 'Стойкая шерсть',
        variant28: 'Таран наповал', variant29: 'Крепкий бодалень', variant30: 'Таранная мощь',
        variant31: 'Таран с оглядкой', variant32: 'Живучий лоб', variant33: 'Юркий и рогатый',
        variant34: 'Рогатая прыть', variant35: 'Быстрый таран, крепкий лоб'
    },
    // Бородань — бодливая коза: бородка, хитрость, финт, упрямство.
    enem3: {
        variant1: 'Бородатый кураж', variant2: 'Хитрая хватка', variant3: 'Финт-таран',
        variant4: 'Упрямый напор', variant5: 'Меткий выпад', variant6: 'Бешеный выпад',
        variant7: 'Бородатый норов', variant8: 'Крепкая бородка', variant9: 'Ударный выпад',
        variant10: 'Живучая хитрость', variant11: 'Колючая бородка', variant12: 'Выпад и в темноту',
        variant13: 'Толстая бородка', variant14: 'Неутомимый выпад', variant15: 'Пружинистый выпад',
        variant16: 'Хитрый прищур, зоркий глаз', variant17: 'Бородатая удача', variant18: 'Верный выпад',
        variant19: 'Молниеносный выпад', variant20: 'Бородатый нюх', variant21: 'Цепкая бородёнка',
        variant22: 'Юркий, несмотря на упрямство', variant23: 'Бородатая стойкость', variant24: 'Долгий финт, зоркий глаз',
        variant25: 'Ускользающий выпад', variant26: 'Дикий выпад', variant27: 'Стойкая бородка',
        variant28: 'Выпад наповал', variant29: 'Крепкий бородань', variant30: 'Хитрая мощь',
        variant31: 'Выпад с оглядкой', variant32: 'Живучая бородка', variant33: 'Юркий и бородатый',
        variant34: 'Бородатая прыть', variant35: 'Быстрый выпад, крепкая бородка'
    },
    // Клычень — буйный хряк: клыки, щетина, грязь, ярость.
    enem4: {
        variant1: 'Клыкастый кураж', variant2: 'Щетинистая хватка', variant3: 'Клык-таран',
        variant4: 'Яростный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Клыкастый норов', variant8: 'Крепкая щетина', variant9: 'Ударный рывок',
        variant10: 'Живучая грязь', variant11: 'Колючая щетина', variant12: 'Рывок и в темноту',
        variant13: 'Толстая щетина', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Кривой клык, дикий взгляд', variant17: 'Клыкастая удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Клыкастый нюх', variant21: 'Цепкий клык',
        variant22: 'Юркий, несмотря на тушу', variant23: 'Клыкастая стойкость', variant24: 'Долгий разгон, дикий взгляд',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкая щетина',
        variant28: 'Рывок наповал', variant29: 'Крепкий клычень', variant30: 'Яростная мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая щетина', variant33: 'Юркий и клыкастый',
        variant34: 'Яростная прыть', variant35: 'Быстрый рывок, крепкий клык'
    },
    // Кольценос — чёрный племенной бык: кольцо, рога, разгон, воля.
    enem5: {
        variant1: 'Кольцевой кураж', variant2: 'Медная хватка', variant3: 'Рог-таран',
        variant4: 'Разгонный напор', variant5: 'Меткий снос', variant6: 'Бешеный снос',
        variant7: 'Кольцевой норов', variant8: 'Крепкое кольцо', variant9: 'Ударный снос',
        variant10: 'Живучий разгон', variant11: 'Колючий рог', variant12: 'Снос и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый снос', variant15: 'Пружинистый снос',
        variant16: 'Порванное кольцо, дикий взор', variant17: 'Кольцевая удача', variant18: 'Верный снос',
        variant19: 'Молниеносный снос', variant20: 'Кольцевой нюх', variant21: 'Цепкий рог',
        variant22: 'Юркий, несмотря на массу', variant23: 'Кольцевая стойкость', variant24: 'Долгий замах, раскалённый взор',
        variant25: 'Ускользающий снос', variant26: 'Дикий снос', variant27: 'Стойкая шкура',
        variant28: 'Снос наповал', variant29: 'Крепкий кольценос', variant30: 'Разгонная мощь',
        variant31: 'Снос с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и кольцевой',
        variant34: 'Разгонная прыть', variant35: 'Быстрый снос, крепкое кольцо'
    }
};
