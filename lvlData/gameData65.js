// Уровень 65 «Испорченная ярмарка» — двадцать седьмой и ПОСЛЕДНИЙ уровень
// области V «Беспокойная деревня» (isRegionFinal), ОСОБЫЙ многофазный
// уровень (правило 13.6): один персонаж Чёрт в пяти нарастающих обликах.
//
// План согласован с пользователем 2026-09-14 перед записью файла (см.
// диалог сессии) — обоснование каждого решения ниже и есть тот план.
//
// ИССЛЕДОВАНИЕ ПЕРСОНАЖА (правило 12, AGENTS.md — ядро персонажа берётся из
// реальной традиции, не из шаблона роли): Чёрт в славянском фольклоре — не
// теологический Сатана, а более бытовая фигура: связан с ЯРМАРКАМИ,
// АЗАРТНЫМИ ИГРАМИ, СДЕЛКАМИ и КАБАКАМИ — классический сюжет: подходит к
// человеку с выгодной на вид сделкой/пари, обманом выманивая душу или
// имущество, а не силой. Устойчивый мотив «чёртовы деньги» — расплачивается
// монетами, которые после его ухода превращаются в черепки/угли/сухие
// листья. «Лукавый» — не выдуманный эпитет, а РЕАЛЬНОЕ традиционное
// иносказательное имя чёрта (говорить настоящее имя вслух считалось дурной
// приметой). В отличие от Банника (месть за неуважение), Кикиморы
// (беспорядок пряжи→хаос), Домового (обида хозяина→ярость) и Бабая
// (невидимое→разоблачённое), Чёрт активно и ОБАЯТЕЛЬНО ОБМАНЫВАЕТ — его
// опасность не в первом впечатлении, а в том, что оно ложное.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl65/) — все 5 фаз открыты и
// сверены лично, сквозная деталь всех пяти — кошель с монетами на поясе
// (сохраняется даже в пекле пламени Ф4-Ф5 — неизменное ядро образа):
// 1.webp — спокойная поза, ОДНА рука раскрыта ладонью вверх (жест
//   предложения), другая уже когтистая. Рога целые.
// 2.webp — ОБЕ руки когтистые и тянутся вперёд, один рог со сколом — маска
//   гостеприимства спала.
// 3.webp — на кафтане тлеют мелкие искры-угольки, асимметричная
//   агрессивная стойка (одна рука высоко, другая низко).
// 4.webp — полностью объят пламенем (голова, рука, хвост), широкий
//   агрессивный присед.
// 5.webp (финал) — светящиеся КРАСНЫЕ глаза (впервые), самая большая
//   огненная корона, самая мощная решительная стойка.
// 11-55.webp — круглые медальоны-портреты каждой фазы, та же конвенция,
//   что у Банника/Кикиморы/Домового/Бабая.
//
// СКВОЗНАЯ ТЕМА: ЛОЖНОЕ ГОСТЕПРИИМСТВО → ИСТИННОЕ ПЕКЛО. Прогрессия арта
// буквально показывает, как маска радушного «удачливого дельца с ярмарки»
// сгорает, обнажая настоящую адскую природу — обман, а не эмоция, в основе.
//
// ЭПИТЕТЫ (раздел 12: фаза 1 голая, 2-5 разные ПОНЯТИЯ, не лестница
// интенсивности; финал не повторяет Испарившийся(45)/Кудельная(50)/
// Одичавший(55)/Раскрытый(60)/Обезумевшая/Истинная/Гневный/Разъярённый):
// Чёрт (голая) → Лукавый (подлинное фольклорное иносказание — маска пала)
// → Раскалённый (первые искры на кафтане, и в прямом, и в переносном
// смысле «вспылил») → Полыхающий (полностью объят огнём) → Адский
// (истинная инфернальная природа — простое понятное слово, свежее).
//
// УНИКАЛЬНАЯ МЕХАНИКА — «ОБМАННЫЙ ЖЕСТ»: у других боссов приём Dark Souls
// «одинаковое начало — разный конец» (раздел 1.1, пункт 3) — техника для
// одной-двух комбинаций. У Чёрта это ЦЕНТРАЛЬНЫЙ ПРИНЦИП всего боя: КАЖДАЯ
// атака визуально стартует как нечто безобидное/приглашающее (широкий,
// «дружелюбный» телеграф в рамках честных 480-1050мс), а исход — от
// пустышки до полноценного удара — читается лишь по чуть более поздним
// деталям (скорость, сторона). Честность не нарушается (телеграф соблюдён
// у каждой атаки), но у игрока воспитывается настоящее недоверие — то же
// чувство, что у героев фольклорных быличек рядом с чёртом. Обоснование по
// фазам: Ф1 FALSE_OFFER — спокойные «приглашающие» атаки, знакомство с
// правилом «не верь виду»; Ф2 MASK_DROP — здесь приём «общий префикс,
// разный конец» становится узнаваемым почерком всей фазы, а не одной
// комбинацией; Ф3 SPARK_FLARE — обман отброшен, резкие вспышки жара с
// неожиданных углов; Ф4 BLAZE_RUSH — сплошной агрессивный огненный напор,
// никакой мимикрии; Ф5 HELLFIRE_GAMBLE — последний и самый жестокий обман:
// «монетный дождь», выглядящий как медленные безобидные монетки/угольки,
// а на деле самая опасная атака всего боя.
//
// МЕХАНИКА ЦЕПИ — «монетная дорожка»: рассыпающиеся из кошеля монеты-угли,
// тянущиеся к жертве. Ф1 zigzag(4)+diagonal(4) — монеты раскиданы
// завлекающим зигзагом, затем один катится по диагонали прямо к игроку.
// Ф2 zigzag(5)+vertical(4) — та же раскидка, но длиннее, и ловушка
// захлопывается прямым падением. Ф3 vertical(4)+vertical(5) — монеты (уже
// угли) просто падают вниз дважды подряд, без приманки. Ф4 diagonal(5)+
// vertical(6) — огненный вал по диагонали, затем сокрушительный прямой
// удар. Ф5 vertical(5)+arc(6) — обманчиво простой бросок монетки, за
// которым следует испепеляющая дуга через всё поле (изначально
// планировалась длина 7 для дуги Ф5, но проверка раздела 13.5 — см.
// balance65.js — показала, что при кастомном для финала damageMultiplier
// это превышает безопасный порог для Милы/Елисея; сокращено до 6, как и на
// уровнях 57/60). Все пары форм сверены с полной историей панели (320
// строк, 1-64) и являются нулевыми по точному сочетанию для роли,
// подтверждены живым классификатором ПОСЛЕ записи файла.
//
// ДВИЖЕНИЕ — Чёрт: pause (терпеливая пауза перед «щедрым предложением»);
// Лукавый: drift (незаметно подплывает ближе, будто невзначай);
// Раскалённый: lateRush (внезапная вспышка жара из ниоткуда); Полыхающий:
// accelerate (пламя набирает разгон); Адский: wave (хаотичный дождь из
// монет/угольков волнами).
//
// ФИНАЛ ОБЛАСТИ — ЖЁСТЧЕ ОБЫЧНОГО МНОГОФАЗНОГО УРОВНЯ (по прямому
// требованию «бой не должен быть простым, но должен быть честным»): по
// примеру финалов областей II/IV (уровни 25/40, оба заметно отличались от
// рядовых уровней своей области не только HP) — общий профиль уровня
// умеренно ужесточён относительно стандарта области V (уровни 41-64):
// levelCadence 1.00→0.90, damageMultiplier 1.782→1.95, minWaveDelay
// 2600→2400, minShotDelay 175→160, minTelegraphMs 600→560; третья
// внутренняя фаза жёстче обычного (cadence 0.80→0.74, speed 1.12→1.18,
// damage 1.14→1.20, telegraphMultiplier 0.90→0.85, surpriseChance
// 0.18→0.26, maxActiveAttacks 15→18). Профиль КАЖДОГО из пяти обликов
// (cadence/telegraphMs/speedMultiplier/damageMultiplier/speedVariance)
// оставлен таким же, как на уровнях 45/50/55/60 — это фиксированный шаблон
// по роли для всей области, ужесточение финала идёт только через общий
// профиль и фазы, не через слом ролевого шаблона. Подтверждено расчётом
// (balance65.js): коридор выживаемости остаётся честным (см. итоги ниже).
//
// МНОГОФАЗНЫЕ БОССЫ ОБЛАСТИ (13.1) — healthMultiplier 1.50 на КАЖДОМ из
// пяти обликов, musicMood: 'heroic'. Для enem5 финала региона движок
// САМОСТОЯТЕЛЬНО применяет regionFinalMultiplier=1.12 сверху — вручную в
// gameData ничего не перемножается (см. levelCompletionConfig ниже).
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — художественные боевые
// выкрики о состоянии/угрозе Чёрта прямо сейчас (обман/огонь), не пересказ
// параметров движка и не пейзаж ярмарки (раздел 12).
let lvlNumber = 65;

const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.90,
	damageMultiplier: 1.95,
	minWaveDelay: 2400,
	minShotDelay: 160,
	minTelegraphMs: 560,
	attackChains: true,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.74, speed: 1.18, damage: 1.20, telegraphMultiplier: 0.85, surpriseChance: 0.26, maxActiveAttacks: 18 }
	],
	bosses: {
		enem1: {
			// Чёрт: FALSE_OFFER — спокойные, «приглашающие» на вид атаки, знакомство с правилом «не верь виду»
			movementStyle: 'pause', cadence: 1.03, telegraphMs: 900, speedMultiplier: 0.95, damageMultiplier: 0.92,
			speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Заходи, дружок, не пожалеешь!',
			phaseMessages: { 2: 'Удача сама идёт в руки!', 3: 'Кто откажется от такого счастья?!' }
		}, // Чёрт: FALSE_OFFER — спокойные, «приглашающие» на вид атаки, знакомство с правилом «не верь виду»
		enem2: {
			// Лукавый: MASK_DROP — «одинаковый префикс, разный конец» как узнаваемый почерк всей фазы
			movementStyle: 'drift', cadence: 0.95, telegraphMs: 800, speedMultiplier: 1.02, damageMultiplier: 0.98,
			speedVariance: [0.88, 0.96, 1.04, 1.12, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Личина спала — гляди, что под ней!',
			phaseMessages: { 2: 'Хитрость мою так просто не разгадать!', 3: 'Обманул — и не поперхнулся!' }
		}, // Лукавый: MASK_DROP — «одинаковый префикс, разный конец» как узнаваемый почерк всей фазы
		enem3: {
			// Раскалённый: SPARK_FLARE — обман отброшен, резкие вспышки жара с неожиданных углов
			movementStyle: 'lateRush', cadence: 1.17, telegraphMs: 1050, speedMultiplier: 0.80, damageMultiplier: 1.19,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12], healthMultiplier: 1.50,
			appearMessage: 'Обида жжёт похлеще углей!',
			phaseMessages: { 2: 'Кафтан тлеет — и терпение тоже!', 3: 'Ещё слово — и полыхну!' }
		}, // Раскалённый: SPARK_FLARE — обман отброшен, резкие вспышки жара с неожиданных углов
		enem4: {
			// Полыхающий: BLAZE_RUSH — сплошной агрессивный огненный напор, никакой мимикрии
			movementStyle: 'accelerate', cadence: 0.86, telegraphMs: 680, speedMultiplier: 1.12, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24], healthMultiplier: 1.50,
			appearMessage: 'Гори оно всё синим пламенем!',
			phaseMessages: { 2: 'Пламя вырывается само!', 3: 'Уже не потушишь!' }
		}, // Полыхающий: BLAZE_RUSH — сплошной агрессивный огненный напор, никакой мимикрии
		enem5: {
			// Адский: HELLFIRE_GAMBLE — последний обман: «монетный дождь», выглядящий безобидно, а на деле самая опасная атака
			movementStyle: 'wave', cadence: 0.80, telegraphMs: 1040, speedMultiplier: 1.05, damageMultiplier: 1.12,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20], healthMultiplier: 1.50,
			appearMessage: 'Личины больше нет — вот моё истинное лицо!',
			phaseMessages: { 2: 'Последний куш беру без обмана — силой!', 3: 'Гори, ярмарка, гори дотла!' }
		} // Адский: HELLFIRE_GAMBLE — последний обман: «монетный дождь», выглядящий безобидно, а на деле самая опасная атака
	}
};

const levelCompletionConfig = {
	isRegionFinal: true,
	completionMessage: 'Область «Беспокойная деревня» пройдена!'
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl65/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl65/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl65/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl65/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl65/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/1.webp',
        baseHP: 25260,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Лукавый Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/2.webp',
        baseHP: 63149,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Раскалённый Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/3.webp',
        baseHP: 111726,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '25%',
        deathAnimation: { preset: 'default', durationMs: 1050 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Полыхающий Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/4.webp',
        baseHP: 179732,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '26%',
        deathAnimation: { preset: 'default', durationMs: 1050 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Адский Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/5.webp',
        baseHP: 272027,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '29%',
        deathAnimation: { preset: 'default', durationMs: 1100 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Чёрт: FALSE_OFFER — спокойные, «приглашающие» на вид атаки,
	// широкий дружелюбный телеграф скрывает настоящий удар =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: «подарок» оказывается ударом сразу, без привычной долгой приманки
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — монеты раскиданы завлекающим зигзагом,
	// затем один катится по диагонали прямо к игроку (zigzag+diagonal),
	// раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Лукавый: MASK_DROP — одинаковое начало, но не угадать конец:
	// маска гостеприимства спала =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: обман раскрывается сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — та же завлекающая раскидка, но длиннее, и
	// ловушка захлопывается прямым падением (zigzag+vertical), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //23 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //24 цепь-B звено 4

	// ===== Раскалённый: SPARK_FLARE — обман отброшен, резкие вспышки
	// жара с неожиданных углов =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: вспышка раньше привычного долгого тления
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — монеты (уже угли) просто падают вниз
	// дважды подряд, без приманки (vertical+vertical), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5

	// ===== Полыхающий: BLAZE_RUSH — сплошной агрессивный огненный
	// напор со всех сторон, никакой мимикрии под «предложение» =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: огненный вал разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — огненный вал по диагонали, затем
	// сокрушительный прямой удар (diagonal+vertical), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //20 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //23 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //26 цепь-B звено 6

	// ===== Адский: HELLFIRE_GAMBLE — последний, самый жестокий обман:
	// «монетный дождь», выглядящий безобидно, а на деле убийственный =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: обман без единого мгновения приманки
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — обманчиво простой бросок монетки, за
	// которым следует испепеляющая дуга через всё поле (vertical+arc),
	// раздел 13.7 — финальная кульминация всего боя. Длина дуги
	// подтверждена/скорректирована расчётом раздела 13.5 (см. комментарий
	// в шапке файла).
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //26 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // спокойные редкие «предложения»
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — непрерывное заманивание
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — тление перед вспышкой
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частый агрессивный огненный напор
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4900 }, // собранный финал, чуть плотнее обычного многофазного финала
 ];

 const bossAbilitiesDop = [
	// Чёрт — FALSE_OFFER
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким «сюрпризом»
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: «подарок» оказывается ударом сразу
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: щедрая раздача «подарков» по всему полю разом

	// Лукавый — MASK_DROP
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных «улыбок» подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной обман с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия «дружеских» жестов по всему полю подряд

	// Раскалённый — SPARK_FLARE
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальней вспышкой
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: вспышка раньше привычного долгого тления
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: вспышка с обеих сторон разом

	// Полыхающий — BLAZE_RUSH
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним валом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (6)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: вал разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: сплошной огненный шквал через всё поле

	// Адский — HELLFIRE_GAMBLE, финальный облик, финал области
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним «выигрышем»
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (6)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: обман без единого мгновения приманки
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: последний обманный «дождь» через всю ярмарку разом
 ];

// Лорные названия связок временных улучшений — один и тот же персонаж, но
// словарь ЭСКАЛИРУЕТ вместе с обликом (щедрое предложение → раскрытый
// обман → первые искры → полное пламя → истинное пекло), см. правило
// 12.1. Один и тот же адъектив на одной позиции у нескольких обликов
// допустим (как в gameData1.js) — полных совпадений фраз между обликами
// нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Чёрт — базовый облик: монета, кошель, сделка, ярмарка.
    enem1: {
        variant1: 'Ярмарочный кураж', variant2: 'Кошельная хватка', variant3: 'Монета-таран',
        variant4: 'Сделочный напор', variant5: 'Меткий подарок', variant6: 'Бешеный подарок',
        variant7: 'Ярмарочный норов', variant8: 'Крепкий кошель', variant9: 'Ударный подарок',
        variant10: 'Живучая монета', variant11: 'Колючая монета', variant12: 'Подарок и в темноту',
        variant13: 'Толстый кошель', variant14: 'Неутомимый подарок', variant15: 'Пружинистый подарок',
        variant16: 'Звонкая монета, зоркий глаз', variant17: 'Ярмарочная удача', variant18: 'Верный подарок',
        variant19: 'Молниеносный подарок', variant20: 'Ярмарочный нюх', variant21: 'Цепкий кошель',
        variant22: 'Юркий, несмотря на кафтан', variant23: 'Ярмарочная стойкость', variant24: 'Долгая сделка, зоркий глаз',
        variant25: 'Ускользающий подарок', variant26: 'Дикий подарок', variant27: 'Стойкий кошель',
        variant28: 'Подарок наповал', variant29: 'Крепкий чёрт', variant30: 'Сделочная мощь',
        variant31: 'Подарок с оглядкой', variant32: 'Живучий кошель', variant33: 'Юркий и ярмарочный',
        variant34: 'Ярмарочная прыть', variant35: 'Быстрый подарок, крепкий кошель'
    },
    // Лукавый — обман раскрыт: маска, обман, хитрость, коготь.
    enem2: {
        variant1: 'Лукавый кураж', variant2: 'Когтистая хватка', variant3: 'Обман-таран',
        variant4: 'Хитрый напор', variant5: 'Меткий обман', variant6: 'Бешеный обман',
        variant7: 'Лукавый норов', variant8: 'Крепкая маска', variant9: 'Ударный обман',
        variant10: 'Живучая хитрость', variant11: 'Колючий коготь', variant12: 'Обман и в темноту',
        variant13: 'Толстая маска', variant14: 'Неутомимый обман', variant15: 'Пружинистый обман',
        variant16: 'Сколотый рог, зоркий глаз', variant17: 'Лукавая удача', variant18: 'Верный обман',
        variant19: 'Молниеносный обман', variant20: 'Лукавый нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий, несмотря на маску', variant23: 'Лукавая стойкость', variant24: 'Долгая хитрость, зоркий глаз',
        variant25: 'Ускользающий обман', variant26: 'Дикий обман', variant27: 'Стойкая маска',
        variant28: 'Обман наповал', variant29: 'Крепкий лукавый', variant30: 'Хитрая мощь',
        variant31: 'Обман с оглядкой', variant32: 'Живучий коготь', variant33: 'Юркий и лукавый',
        variant34: 'Лукавая прыть', variant35: 'Быстрый обман, крепкая маска'
    },
    // Раскалённый — искры на кафтане: уголёк, тлен, жар, вспышка.
    enem3: {
        variant1: 'Раскалённый кураж', variant2: 'Угольная хватка', variant3: 'Уголёк-таран',
        variant4: 'Тлеющий напор', variant5: 'Меткая вспышка', variant6: 'Бешеная вспышка',
        variant7: 'Раскалённый норов', variant8: 'Крепкий тлен', variant9: 'Ударная вспышка',
        variant10: 'Живучий жар', variant11: 'Колючий уголёк', variant12: 'Вспышка и в темноту',
        variant13: 'Толстый кафтан', variant14: 'Неутомимая вспышка', variant15: 'Пружинистая вспышка',
        variant16: 'Тлеющий край, зоркий глаз', variant17: 'Раскалённая удача', variant18: 'Верная вспышка',
        variant19: 'Молниеносная вспышка', variant20: 'Раскалённый нюх', variant21: 'Цепкий жар',
        variant22: 'Юркий, несмотря на жар', variant23: 'Раскалённая стойкость', variant24: 'Долгое тление, зоркий глаз',
        variant25: 'Ускользающая вспышка', variant26: 'Дикая вспышка', variant27: 'Стойкий кафтан',
        variant28: 'Вспышка наповал', variant29: 'Крепкий раскалённый', variant30: 'Тлеющая мощь',
        variant31: 'Вспышка с оглядкой', variant32: 'Живучий кафтан', variant33: 'Юркий и раскалённый',
        variant34: 'Раскалённая прыть', variant35: 'Быстрая вспышка, крепкий кафтан'
    },
    // Полыхающий — объят огнём: пламя, зарево, хвост, грива.
    enem4: {
        variant1: 'Пламенный кураж', variant2: 'Огненная хватка', variant3: 'Хвост-таран',
        variant4: 'Полыхающий напор', variant5: 'Меткий вал', variant6: 'Бешеный вал',
        variant7: 'Пламенный норов', variant8: 'Крепкое зарево', variant9: 'Ударный вал',
        variant10: 'Живучее пламя', variant11: 'Колючее пламя', variant12: 'Вал и в темноту',
        variant13: 'Толстая грива', variant14: 'Неутомимый вал', variant15: 'Пружинистый вал',
        variant16: 'Огненный хвост, дикий взгляд', variant17: 'Пламенная удача', variant18: 'Верный вал',
        variant19: 'Молниеносный вал', variant20: 'Пламенный нюх', variant21: 'Цепкое зарево',
        variant22: 'Юркий, несмотря на пламя', variant23: 'Пламенная стойкость', variant24: 'Долгий пожар, дикий взгляд',
        variant25: 'Ускользающий вал', variant26: 'Дикий вал', variant27: 'Стойкая грива',
        variant28: 'Вал наповал', variant29: 'Крепкий полыхающий', variant30: 'Огненная мощь',
        variant31: 'Вал с оглядкой', variant32: 'Живучая грива', variant33: 'Юркий и пламенный',
        variant34: 'Огненная прыть', variant35: 'Быстрый вал, крепкая грива'
    },
    // Адский — истинная природа: пекло, красный глаз, корона огня, рок.
    enem5: {
        variant1: 'Адский кураж', variant2: 'Пекельная хватка', variant3: 'Рог-таран',
        variant4: 'Пекельный напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
        variant7: 'Адский норов', variant8: 'Крепкая корона', variant9: 'Ударный бросок',
        variant10: 'Живучее пекло', variant11: 'Колючий рог', variant12: 'Бросок и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
        variant16: 'Красный глаз, дикий взор', variant17: 'Адская удача', variant18: 'Верный бросок',
        variant19: 'Молниеносный бросок', variant20: 'Адский нюх', variant21: 'Цепкий уголь',
        variant22: 'Юркий, несмотря на массу', variant23: 'Адская стойкость', variant24: 'Долгий пожар, дикий взор',
        variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкая корона',
        variant28: 'Бросок наповал', variant29: 'Крепкий адский', variant30: 'Пекельная мощь',
        variant31: 'Бросок с оглядкой', variant32: 'Живучая корона', variant33: 'Юркий и адский',
        variant34: 'Пекельная прыть', variant35: 'Быстрый бросок, крепкая корона'
    }
};
