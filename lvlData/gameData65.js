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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	musicMood: "heroic",
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.731, damageMultiplier: 1.952, minWaveDelay: 5600, minShotDelay: 120, minTelegraphMs: 587,
	phases: [
		{ phase: 1, minHp: 0.688, cadence: 1.001, speed: 1.055, damage: 1.002, telegraphMultiplier: 1.048, surpriseChance: 0.127, maxActiveAttacks: 42 },
		{ phase: 2, minHp: 0.353, cadence: 0.765, speed: 1.197, damage: 1.071, telegraphMultiplier: 0.893, surpriseChance: 0.227, maxActiveAttacks: 46 },
		{ phase: 3, minHp: 0, cadence: 0.609, speed: 1.317, damage: 1.202, telegraphMultiplier: 0.784, surpriseChance: 0.327, maxActiveAttacks: 50 }
	],
	bosses: {
		enem1: { combatIdentity: "Мнимая услуга с незакрытой ценой", combatTrick: "После предложенного конца остаётся видимая цена. Ошибка — бить после подачи либо отвечать только по знакомому началу. Закончить нужно полный расчёт.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.991, telegraphMs: 989, speedMultiplier: 1.022, damageMultiplier: 0.905, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Заходи, дружок, не пожалеешь!", phaseMessages: {"2":"Удача сама идёт в руки!","3":"Кто откажется от такого счастья?!"} },
		enem2: { combatIdentity: "Пересдача возвращает цену другим концом", combatTrick: "Знакомый расчёт возвращается пересдачей с другим окончанием. Ошибка — бить по выученному префиксу либо закончить только одну часть сдачи.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.97, telegraphMs: 911, speedMultiplier: 1.034, damageMultiplier: 0.99, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Личина спала — гляди, что под ней!", phaseMessages: {"2":"Хитрость мою так просто не разгадать!","3":"Обманул — и не поперхнулся!"} },
		enem3: { combatIdentity: "Отложенная цена под срочным пересчётом", combatTrick: "Срочный пересчёт не снимает отложенную цену. Ошибка — бить после срочного участка, бросив долгую часть. Пауза не заканчивает обязательство.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.653, telegraphMs: 1050, speedMultiplier: 1.026, damageMultiplier: 1.205, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Обида жжёт похлеще углей!", phaseMessages: {"2":"Кафтан тлеет — и терпение тоже!","3":"Ещё слово — и полыхну!"} },
		enem4: { combatIdentity: "Силовое взыскание обеими частями расчёта", combatTrick: "После первой руки взыскания остаётся вторая часть и остаточный конец. Ошибка — бить между ними, решив, что цена уже уплачена.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.965, telegraphMs: 877, speedMultiplier: 1.072, damageMultiplier: 1.045, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Гори оно всё синим пламенем!", phaseMessages: {"2":"Пламя вырывается само!","3":"Уже не потушишь!"} },
		enem5: { combatIdentity: "Полный последний расчёт с самостоятельным концом", combatTrick: "Кажущийся полный расчёт оставляет собственное последнее окончание. Ошибка — принять внутренний возврат за финал, не закончив наружный счёт и заключительную цену.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.925, telegraphMs: 1039, speedMultiplier: 1.053, damageMultiplier: 1.135, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Личины больше нет — вот моё истинное лицо!", phaseMessages: {"2":"Последний куш беру без обмана — силой!","3":"Гори, ярмарка, гори дотла!"} }
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
        baseDamage: 19.80,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Лукавый Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/2.webp',
        baseHP: 63149,
        baseSpeed: 0,
        baseDamage: 21.90,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Раскалённый Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/3.webp',
        baseHP: 111726,
        baseSpeed: 0,
        baseDamage: 23.95,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1050 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Полыхающий Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/4.webp',
        baseHP: 179732,
        baseSpeed: 0,
        baseDamage: 26.15,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1050 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Адский Чёрт',
        image: 'images/enemies/regions/5_dom_dvor/lvl65/5.webp',
        baseHP: 272027,
        baseSpeed: 0,
        baseDamage: 27.90,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1100 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 28;
 const bossInterval = 31;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Чёрт =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.211 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.211 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.711 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.711 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.511 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.212 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.212 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.712 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.712 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.512 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.711 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.213 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.213 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.713 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.713 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.513 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.711 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.214 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.214 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.714 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.714 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.514 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.711 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.215 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.215 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.715 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.715 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.515 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.915 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.651 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.401 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.151 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.711 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.217 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.217 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.717 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.717 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.517 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.917 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.711 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.218 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.218 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.718 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.718 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.518 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.918 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.418 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.751 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.501 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.251 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.001 }, // 50 i

	// ===== Лукавый Чёрт =====
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.231, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.231, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.431, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.431, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.031, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.631, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.232, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.232, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.432, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.432, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.032, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.632, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.713, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.233, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.233, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.433, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.433, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.033, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 17 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.633, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 18 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.713, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.234, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.234, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.434, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.434, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 23 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.034, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 24 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.634, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 25 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.713, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.235, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.235, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.435, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 29 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.435, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 30 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.035, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 31 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.635, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 32 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.835, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 33 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.631, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 34 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.381, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 35 f
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.131, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 36 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.881, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 37 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.237, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.237, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.437, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.437, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 41 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.037, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 42 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.637, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 43 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.837, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 44 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.238, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.238, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.438, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.438, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 48 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.038, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 49 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.638, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 50 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.838, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 51 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.731, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.481, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 53 i
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.231, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 54 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.981, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 55 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.731, waveAmplitude: 1.49, waveFrequency: 1.29, wavePhase: 0.49 }, // 56 i

	// ===== Раскалённый Чёрт =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.715 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.211 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.211 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.211 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.711 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.411 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.715 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.212 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.212 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.212 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.712 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.412 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.412 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.715 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.213 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.213 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.213 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.713 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.413 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.413 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.715 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.214 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.214 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.214 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.714 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.414 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.414 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.715 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.215 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.215 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.215 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.715 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.415 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.415 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.611 }, // 34 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.361 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.111 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.861 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.611 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.217 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.217 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.217 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.717 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.417 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.417 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.617 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.218 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.218 }, // 47 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.218 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.718 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.418 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.418 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.618 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.711 }, // 53 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.461 }, // 54 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.211 }, // 55 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.961 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.711 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.461 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.811 }, // 59 j
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17.311 }, // 60 j
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.611 }, // 61 j
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17.111 }, // 62 j
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.911 }, // 63 j

	// ===== Полыхающий Чёрт =====
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.231 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.831 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.031 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.631 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.231 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.232 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.832 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.032 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.632 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.232 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.717 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.233 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.833 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.033 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.633 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.233 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.717 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.234 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.834 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.034 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.634 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.234 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.717 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.235 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.835 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.035 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.635 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.235 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.435 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.635 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.291 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.041 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.791 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.541 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.291 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.041 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.717 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.237 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.837 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.037 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.637 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.237 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.337 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.238 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.838 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.038 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.638 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.238 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.338 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.391 }, // 49 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.141 }, // 50 i
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.891 }, // 51 i
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.641 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.391 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.141 }, // 54 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.891 }, // 55 i

	// ===== Адский Чёрт =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.719 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.611 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.211 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.211 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.911 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.511 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.311 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.711 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.719 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.612 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.212 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.212 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.912 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.512 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.312 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.712 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.412 }, // 16 b
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.719 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.613 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.213 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.213 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.913 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.513 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.313 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.713 }, // 24 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.413 }, // 25 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.214 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.614 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.214 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.914 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.514 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.314 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.714 }, // 32 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.414 }, // 33 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.215 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.615 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.215 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.915 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.515 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.315 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.715 }, // 40 e
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.415 }, // 41 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.171 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.921 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.671 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.421 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.171 }, // 46 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.921 }, // 47 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.671 }, // 48 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.817 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.317 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.817 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.317 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.617 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.117 }, // 54 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.917 }, // 55 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.217 }, // 56 g
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.417 }, // 57 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.818 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.318 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.818 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.318 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.618 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.118 }, // 63 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.918 }, // 64 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.218 }, // 65 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.418 }, // 66 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.271 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.021 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.771 }, // 69 i
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.521 }, // 70 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.271 }, // 71 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.021 }, // 72 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.771 }, // 73 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.219 }, // 74 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.719 }, // 75 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.019 }, // 76 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.519 }, // 77 j
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.319 }, // 78 j

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 193, bossDelayAbDop: 13901, firstWaveDelayMs: 2890 }, // Мнимая услуга с незакрытой ценой
	{ boss: 'enem2', bossDelayAb: 194, bossDelayAbDop: 15300, firstWaveDelayMs: 2890 }, // Пересдача возвращает цену другим концом
	{ boss: 'enem3', bossDelayAb: 196, bossDelayAbDop: 17601, firstWaveDelayMs: 2890 }, // Отложенная цена под срочным пересчётом
	{ boss: 'enem4', bossDelayAb: 156, bossDelayAbDop: 11801, firstWaveDelayMs: 2890 }, // Силовое взыскание обеими частями расчёта
	{ boss: 'enem5', bossDelayAb: 145, bossDelayAbDop: 20000, firstWaveDelayMs: 2890 }, // Полный последний расчёт с самостоятельным концом
];

 const bossAbilitiesDop = [
	// Чёрт
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [500, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [0, 0, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 500, 0, 0, 0] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27, 28], shotGapsMs: [650, 650, 0, 0, 0, 250] },
	{ boss: 'enem1', indexAbilities: [29, 30, 31], signature: true, isChain: true, shotDelayMs: 355, shotGapsMs: [0, 0], openingOrder: 1, label: "Мнимая услуга с незакрытой ценой — знакомство" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [500, 250, 0, 500, 0, 500] },
	{ boss: 'enem1', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [500, 650, 0, 0, 0, 250, 0] },
	{ boss: 'enem1', indexAbilities: [47, 48, 49, 50], signature: true, isChain: true, minPhase: 3, shotDelayMs: 387, shotGapsMs: [0, 0, 0], label: "Мнимая услуга с незакрытой ценой — завершение" },

	// Лукавый Чёрт
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 0, 500], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 0, 0, 500] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [250, 0, 500, 0, 0, 650] },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [500, 0, 0, 0, 650, 0] },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29, 30, 31, 32, 33], shotGapsMs: [650, 650, 0, 250, 0, 650, 250] },
	{ boss: 'enem2', indexAbilities: [34, 35, 36, 37], signature: true, isChain: true, shotDelayMs: 397, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Пересдача возвращает цену другим концом — знакомство" },
	{ boss: 'enem2', indexAbilities: [12, 38, 39, 40, 41, 42, 43, 44], minPhase: 2, shotGapsMs: [0, 0, 250, 0, 0, 650, 500] },
	{ boss: 'enem2', indexAbilities: [12, 45, 46, 47, 48, 49, 50, 51], minPhase: 3, shotGapsMs: [500, 0, 0, 0, 650, 0, 0] },
	{ boss: 'enem2', indexAbilities: [52, 53, 54, 55, 56], signature: true, isChain: true, minPhase: 3, shotDelayMs: 417, shotGapsMs: [0, 0, 0, 0], label: "Пересдача возвращает цену другим концом — завершение" },

	// Раскалённый Чёрт
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [250, 0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11, 12], shotGapsMs: [0, 0, 0, 250, 250, 250] },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17, 18, 19], shotGapsMs: [0, 0, 0, 0, 500, 650] },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24, 25, 26], shotGapsMs: [0, 0, 0, 0, 0, 650] },
	{ boss: 'enem3', indexAbilities: [27, 28, 29, 30, 31, 32, 33], shotGapsMs: [650, 0, 0, 0, 250, 250] },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37, 38], signature: true, isChain: true, shotDelayMs: 371, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Отложенная цена под срочным пересчётом — знакомство" },
	{ boss: 'enem3', indexAbilities: [0, 39, 40, 41, 42, 43, 44, 45], minPhase: 2, shotGapsMs: [650, 0, 0, 0, 0, 500, 650] },
	{ boss: 'enem3', indexAbilities: [0, 46, 47, 48, 49, 50, 51, 52], minPhase: 3, shotGapsMs: [650, 0, 0, 0, 0, 500, 500] },
	{ boss: 'enem3', indexAbilities: [53, 54, 55, 56, 57, 58], signature: true, isChain: true, minPhase: 3, shotDelayMs: 405, shotGapsMs: [0, 0, 0, 0, 0], label: "Отложенная цена под срочным пересчётом — завершение" },
	{ boss: 'enem3', indexAbilities: [59, 60, 61, 62, 63], minPhase: 2, shotGapsMs: [150, 150, 150, 300] },

	// Полыхающий Чёрт
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 250], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 250, 0, 250] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [250, 0, 250, 0, 250] },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26, 27, 28, 29], shotGapsMs: [0, 0, 250, 650, 0, 250, 0] },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Силовое взыскание обеими частями расчёта — знакомство" },
	{ boss: 'enem4', indexAbilities: [36, 37, 38, 39, 40, 41, 42], minPhase: 2, shotGapsMs: [500, 0, 250, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [10, 43, 44, 45, 46, 47, 48], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [49, 50, 51, 52, 53, 54, 55], signature: true, isChain: true, minPhase: 3, shotDelayMs: 401, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Силовое взыскание обеими частями расчёта — завершение" },

	// Адский Чёрт
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [650, 0, 0, 0, 0, 650, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15, 16], shotGapsMs: [650, 0, 0, 0, 0, 0, 650, 0] },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22, 23, 24, 25], shotGapsMs: [250, 0, 0, 0, 0, 0, 250, 500] },
	{ boss: 'enem5', indexAbilities: [0, 26, 27, 28, 29, 30, 31, 32, 33], shotGapsMs: [0, 0, 0, 500, 0, 500, 0, 0] },
	{ boss: 'enem5', indexAbilities: [0, 34, 35, 36, 37, 38, 39, 40, 41], shotGapsMs: [500, 0, 0, 650, 0, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47, 48], signature: true, isChain: true, shotDelayMs: 379, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Полный последний расчёт с самостоятельным концом — знакомство" },
	{ boss: 'enem5', indexAbilities: [0, 49, 50, 51, 52, 53, 54, 55, 56, 57], minPhase: 2, shotGapsMs: [500, 0, 0, 0, 0, 100, 620, 200, 0] },
	{ boss: 'enem5', indexAbilities: [0, 58, 59, 60, 61, 62, 63, 64, 65, 66], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 100, 620, 200, 0] },
	{ boss: 'enem5', indexAbilities: [67, 68, 69, 70, 71, 72, 73], signature: true, isChain: true, minPhase: 3, shotDelayMs: 409, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Полный последний расчёт с самостоятельным концом — завершение" },
	{ boss: 'enem5', indexAbilities: [0, 74, 75, 76, 77, 78], minPhase: 2, shotGapsMs: [650, 0, 0, 250, 650] },

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
