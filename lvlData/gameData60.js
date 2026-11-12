// Уровень 60 «Ночные страхи детской» — двадцать второй уровень области V,
// ОСОБЫЙ многофазный уровень (правило 13.6): один персонаж Бабай в пяти
// нарастающих обликах, не пять разных монстров.
//
// План согласован с пользователем 2026-09-13 перед записью файла (см.
// диалог сессии) — обоснование каждого решения ниже и есть тот план.
// Финальный эпитет заменён с «Изобличённый» на «Раскрытый» по прямой
// просьбе пользователя (более понятное русское слово, та же суть —
// вынужден драться полностью на свету).
//
// ИССЛЕДОВАНИЕ ПЕРСОНАЖА (правило 12, AGENTS.md — ядро персонажа берётся из
// реальной традиции, не из шаблона роли): Бабай — славяно-тюркский образ
// пугала для детей (от тюркского «babay» — старик), в отличие от Домового/
// Кикиморы/Банника у него НЕТ никакой хозяйственной или защитной функции —
// он существует только как внешняя угроза, которой пугают не спящих детей
// («спи, а то бабайка заберёт»). Канонические черты: приходит только в
// темноте, живёт под кроватью/в углу/за печью — там, куда не смотрят;
// уносит непослушных детей в МЕШКЕ (прямо подтверждено каноном самой игры —
// на уровне 139 есть эхо-босс «Обезумевший Бабай (тащит бездонный
// мешок)»); у него нет фиксированного облика — сама неопределённость и
// есть суть страха. Это даёт психологическое ядро, которого не было ни у
// одного из трёх предыдущих многофазных боссов области: Банник — месть за
// неуважение к бане; Кикимора — беспорядок пряжи, срывающийся в хаос;
// Домовой — обида хозяина, ломающая порядок. Бабай — это ужас перед
// НЕВИДИМЫМ, а не оскорблённая забота или бытовой хаос.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl60/) — все 5 фаз открыты и
// сверены лично, сквозная деталь всех пяти — маленький красный плетёный
// шнурок-амулет под ртом и тёмная лохматая грива-капюшон:
// 1.webp — спокойная симметричная поза, руки раскрыты навстречу, лица нет
//   вообще (ни глаз, ни намёка) — только пасть в шерсти. Полностью
//   безликий, ещё прячется.
// 2.webp — та же поза, но на плече появляется МЕШОК, стянутый верёвкой —
//   впервые видна цель: не просто пугать, а забрать.
// 3.webp — поза стала асимметричной: одна рука высоко занесена когтями,
//   другая тянется низко — охотничья стойка, не симметричный жест Ф1-Ф2.
// 4.webp — присел на четвереньки, грива взметнулась как ветром, впервые
//   видны светящиеся глаза и красные шрамы-царапины на теле — стал
//   буквальным хищником.
// 5.webp (финал) — самый массивный силуэт, больше всего шрамов, одна рука
//   выброшена вперёд в огромном доминирующем хвате, вторая — оборонительно
//   у плеча, пасть раскрыта в безмолвном рёве.
// 11-55.webp — круглые медальоны-портреты каждой фазы, та же конвенция,
//   что у Банника/Кикиморы/Домового.
//
// СКВОЗНАЯ ТЕМА: НЕВИДИМОЕ → УВИДЕННОЕ. Прогрессия арта подсказывает арку:
// чем больше боец сопротивляется, тем сильнее Бабай вынужден выходить из
// тени — и именно в момент полного разоблачения он опаснее всего. Это
// прямая противоположность его фольклорной природе (сила — в невидимости),
// и поэтому финал — не триумф ярости (как у Домового), а его полное
// обнажение: органически другая эмоциональная окраска.
//
// ЭПИТЕТЫ (раздел 12: фаза 1 голая, 2-5 разные ПОНЯТИЯ, не лестница
// интенсивности; финал не повторяет уже занятые Испарившийся/Кудельная/
// Одичавший/Обезумевшая/Истинная/Гневный/Разъярённый/Щучья Ведьма):
// Бабай (голая) → Загребущий (жадная хватка — мешок появился, намерение
// забрать) → Ловчий (охотник — асимметричная стойка, начинает выслеживать)
// → Звероватый (стал зверем — светящиеся глаза, четвероногая стойка) →
// Раскрытый (финал — вынужден драться полностью на свету; ключевое слово
// всей темы, ни разу не использовано, и понятнее «изобличённого»).
//
// МЕХАНИКА ЦЕПИ — «нащупывающая рука в темноте»: у Бабая своего инструмента
// обихода нет (он ничего не строит, не убирает) — зато есть сам акт
// слепого нащупывания во тьме, который со временем становится всё более
// уверенным. Цепь = его рука/мешок, шарящие по полу в поисках жертвы:
// Ф1 Бабай — короткий несмелый тычок и отдёрг: vertical(3)+arc(3),
// минимальная длина всего боя. Ф2 Загребущий — мешок опускается и тащится
// по полу: arc(4)+diagonal(4), первый настоящий захват. Ф3 Ловчий —
// неровное выслеживание, затем бросок: irregular(5)+arc(4). Ф4 Звероватый
// — прямой хищный бросок, срывающийся в неконтролируемый рывок:
// diagonal(4)+irregular(5). Ф5 Раскрытый — самая длинная и дикая:
// судорожный зигзаг со всех сторон разом, затем один огромный завершающий
// взмах: zigzag(4)+arc(6). Все пять пар форм сверены с полной историей
// панели (295 строк, 1-59) ДО записи файла и являются НУЛЕВЫМИ — ни одна
// не повторяет уже использованную пару той же роли (урок уровней 56-58).
// Формы всех пяти пар дополнительно подтверждены живым классификатором
// панели ПОСЛЕ записи файла (verify60.js + STEP 2), не только ручным
// расчётом — ручная прикидка формы неоднократно расходилась с реальной
// (уровни 50/55/56).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-59 и не
// повторяет узор той же роли у Банника(45)/Кикиморы(50)/Домового(55):
// Бабай — lateRush (несмелый рывок наружу и тут же назад в тень) 12%→13%;
// Загребущий — drift (мешок не рвётся — тащится ровно и неотвратимо)
// 10%→11%, самый низкий бакет роли; Ловчий — weave (неровное, крадущееся
// выслеживание) 14%→15%; Звероватый — accelerate (хищник копит рывок перед
// прыжком) 14%→15%; Раскрытый — wave (загнанный зверь мечется во все
// стороны разом) 15%→16%.
//
// МНОГОФАЗНЫЕ БОССЫ ОБЛАСТИ (13.1) — healthMultiplier 1.50 на КАЖДОМ из
// пяти обликов, musicMood: 'heroic' — единственно допустимое.
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — да, пишутся: персонаж-в-
// обликах, единственный тип, для которого эти поля предусмотрены. Каждая
// фраза — боевой выкрик Бабая о его состоянии/угрозе ПРЯМО СЕЙЧАС, не
// патчноут и не описание комнаты.
let lvlNumber = 60;

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
	levelCadence: 0.756, damageMultiplier: 1.782, minWaveDelay: 5100, minShotDelay: 110, minTelegraphMs: 557,
	phases: [
		{ phase: 1, minHp: 0.698, cadence: 1, speed: 1.051, damage: 1, telegraphMultiplier: 1.043, surpriseChance: 0.118, maxActiveAttacks: 37 },
		{ phase: 2, minHp: 0.349, cadence: 0.799, speed: 1.187, damage: 1.07, telegraphMultiplier: 0.883, surpriseChance: 0.218, maxActiveAttacks: 41 },
		{ phase: 3, minHp: 0, cadence: 0.635, speed: 1.297, damage: 1.14, telegraphMultiplier: 0.777, surpriseChance: 0.318, maxActiveAttacks: 45 }
	],
	bosses: {
		enem1: { combatIdentity: "Длинная тень после пробующего хвата", combatTrick: "Видимая длинная угроза остаётся, пока пробующий хват уже прошёл. Ошибка — бить после короткого тычка и бросить оставленный край. Невидимых ударов нет.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 1.03, telegraphMs: 963, speedMultiplier: 1.042, damageMultiplier: 0.92, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Не спишь — накличешь беду!", phaseMessages: {"2":"Подкрадываюсь ближе с каждым вздохом!","3":"Ещё чуть-чуть — и не увернёшься!"} },
		enem2: { combatIdentity: "Сгребание мешком и стягивание горловины", combatTrick: "Мешок собирает обе части, а горловина стягивается после видимого сгребания. Ошибка — принять первую собранную группу за конец, не закончив мешок и оставленный край.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.969, telegraphMs: 881, speedMultiplier: 1.046, damageMultiplier: 0.98, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Мешок не бывает пустым долго!", phaseMessages: {"2":"Загребущие руки не знают отказа!","3":"Уже почти держу за шиворот!"} },
		enem3: { combatIdentity: "Задержанный след перекрывается обходным хватом", combatTrick: "Задержанный след остаётся под обходным хватом. Ошибка — бить в заминке либо уйти вслед за первой целью, не закончив оба участка одного хвата.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.828, telegraphMs: 1083, speedMultiplier: 1.018, damageMultiplier: 1.19, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Кто ищет меня — сам становится добычей!", phaseMessages: {"2":"Хватка ловчего не разжимается!","3":"Загнан в угол — теперь ты моя дичь!"} },
		enem4: { combatIdentity: "Низкий перехват перед прямым рывком", combatTrick: "Низкий перехват подбирает оставленную часть перед рывком. Ошибка — уйти после первой быстрой группы, не закончив низкий хват. Бабай сохраняет свой образ, не превращается в обычного зверя.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.966, telegraphMs: 851, speedMultiplier: 1.088, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "От зверя внутри меня не спрячешься!", phaseMessages: {"2":"Рык вырывается сам собой!","3":"Кровь чувствую — не остановлюсь!"} },
		enem5: { combatIdentity: "Полный двуручный захват с самостоятельным последним концом", combatTrick: "Полный захват обеими руками доводит оставленные края до отдельного последнего конца. Ошибка — принять первую половину захвата за безопасный финал. Раскрытость не ослабляет Бабая; все угрозы видимы и отбиваемы.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.95, telegraphMs: 1013, speedMultiplier: 1.086, damageMultiplier: 1.12, speedVariance: [1, 1.004, 1.008, 1.012, 1.016], healthMultiplier: 1.5, appearMessage: "Увидели меня — теперь спасайся сам!", phaseMessages: {"2":"Прятаться больше негде — только рвать!","3":"Меня видно — но поздно вам от этого!"} }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl60/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl60/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl60/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl60/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl60/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Бабай',
        image: 'images/enemies/regions/5_dom_dvor/lvl60/1.webp',
        baseHP: 22941,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Загребущий Бабай',
        image: 'images/enemies/regions/5_dom_dvor/lvl60/2.webp',
        baseHP: 57353,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Ловчий Бабай',
        image: 'images/enemies/regions/5_dom_dvor/lvl60/3.webp',
        baseHP: 101471,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1050 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Звероватый Бабай',
        image: 'images/enemies/regions/5_dom_dvor/lvl60/4.webp',
        baseHP: 163237,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1050 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Раскрытый Бабай',
        image: 'images/enemies/regions/5_dom_dvor/lvl60/5.webp',
        baseHP: 247061,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1100 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 23;
 const bossInterval = 26;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Бабай =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.431 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.431 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.431 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.931 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.631 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.73 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.73 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.73 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.93 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.81 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.73 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.73 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.73 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.93 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.81 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.73 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.73 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.73 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.93 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.81 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.231 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.73 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.73 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.93 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.87 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.62 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.81 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.73 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.73 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.73 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.93 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.13 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.81 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.73 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.73 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.73 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.23 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.93 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.13 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.97 }, // 45 i
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.72 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.47 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.22 }, // 48 i

	// ===== Загребущий Бабай =====
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.701 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.701 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.701 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.701 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.201 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.201 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.97 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.97 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.97 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.97 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.83 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.97 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.97 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.97 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.97 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 17 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 18 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.83 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.97 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.97 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.97 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.97 }, // 23 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 24 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 25 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.83 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.97 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.97 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.97 }, // 29 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.97 }, // 30 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 31 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 32 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.49 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.24 }, // 34 f
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.99 }, // 35 f
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.74 }, // 36 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.83 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.97 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.97 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.97 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.97 }, // 41 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.47 }, // 42 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.47 }, // 43 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.67 }, // 44 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.83 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.973 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.973 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.973 }, // 48 h
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.973 }, // 49 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17.473 }, // 50 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.473 }, // 51 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.673 }, // 52 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.59 }, // 53 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.34 }, // 54 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.09 }, // 55 i
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.84 }, // 56 i
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.59 }, // 57 i

	// ===== Ловчий Бабай =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.85 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.73 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.731 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.23 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.23 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.85 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.73 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.732 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.23 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.23 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.85 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.73 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.23 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.23 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.85 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.73 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.734 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.23 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.23 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.85 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.739 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.739 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.739 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.239 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.239 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.439 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.639 }, // 35 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.839 }, // 36 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.57 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.32 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.07 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.82 }, // 40 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.57 }, // 41 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.85 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.479 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.737 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.73 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.23 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.23 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.133 }, // 49 g
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.85 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.73 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.73 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.738 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.23 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.23 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.43 }, // 56 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.63 }, // 57 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.42 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.92 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.67 }, // 62 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.42 }, // 63 i

	// ===== Звероватый Бабай =====
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.211 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.411 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.911 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.411 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.111 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.212 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.412 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.912 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.412 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.112 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.87 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.213 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.413 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.913 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.413 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.113 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.87 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.214 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.414 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.914 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.414 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.114 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.87 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.215 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.415 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.915 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.415 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.115 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.296 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.046 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.796 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.546 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.296 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.046 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.87 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.217 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.417 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.917 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.417 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.117 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.317 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.87 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.218 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.418 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.918 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.418 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.118 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.318 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.399 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.149 }, // 49 i
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.899 }, // 50 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.649 }, // 51 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.399 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.149 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.899 }, // 54 i

	// ===== Раскрытый Бабай =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.89 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.691 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.691 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.691 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.191 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.691 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.191 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.091 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.89 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.692 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.692 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.692 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.192 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.692 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.192 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.892 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.092 }, // 16 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.89 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.693 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.693 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.693 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.193 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.693 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.193 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.893 }, // 24 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.093 }, // 25 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.89 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.69 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.69 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.69 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.19 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.69 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 32 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.89 }, // 33 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.09 }, // 34 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.89 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.695 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.695 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.695 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.195 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.695 }, // 40 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.195 }, // 41 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.895 }, // 42 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.095 }, // 43 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.096 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.846 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.596 }, // 46 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.346 }, // 47 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.096 }, // 48 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.846 }, // 49 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.596 }, // 50 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.89 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.697 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.697 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.697 }, // 54 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.197 }, // 55 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.697 }, // 56 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.197 }, // 57 g
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.897 }, // 58 g
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.097 }, // 59 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.297 }, // 60 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.698 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.698 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.698 }, // 63 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.198 }, // 64 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.698 }, // 65 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.198 }, // 66 h
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.898 }, // 67 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.098 }, // 68 h
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.298 }, // 69 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.199 }, // 70 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.949 }, // 71 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.699 }, // 72 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.449 }, // 73 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.199 }, // 74 i
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.949 }, // 75 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.699 }, // 76 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 188, bossDelayAbDop: 13200, firstWaveDelayMs: 2790 }, // Длинная тень после пробующего хвата
	{ boss: 'enem2', bossDelayAb: 187, bossDelayAbDop: 15500, firstWaveDelayMs: 2790 }, // Сгребание мешком и стягивание горловины
	{ boss: 'enem3', bossDelayAb: 189, bossDelayAbDop: 17700, firstWaveDelayMs: 2790 }, // Задержанный след перекрывается обходным хватом
	{ boss: 'enem4', bossDelayAb: 157, bossDelayAbDop: 12100, firstWaveDelayMs: 2790 }, // Низкий перехват перед прямым рывком
	{ boss: 'enem5', bossDelayAb: 142, bossDelayAbDop: 16901, firstWaveDelayMs: 2790 }, // Полный двуручный захват с самостоятельным последним концом
];

 const bossAbilitiesDop = [
	// Бабай
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 250, 250] },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 0, 250, 250] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [500, 0, 0, 250, 250] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [250, 0, 0, 500, 250] },
	{ boss: 'enem1', indexAbilities: [28, 29, 30], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [0, 0], openingOrder: 1, label: "Длинная тень после пробующего хвата — знакомство" },
	{ boss: 'enem1', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [250, 0, 250, 250, 250, 0] },
	{ boss: 'enem1', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [500, 0, 250, 250, 500, 0] },
	{ boss: 'enem1', indexAbilities: [45, 46, 47, 48], signature: true, isChain: true, minPhase: 3, shotDelayMs: 387, shotGapsMs: [0, 0, 0], label: "Длинная тень после пробующего хвата — завершение" },

	// Загребущий Бабай
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [500, 350, 0, 350, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [500, 250, 0, 0, 0] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [700, 500, 700, 0, 700, 0] },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [250, 250, 700, 0, 700, 0] },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29, 30, 31, 32], shotGapsMs: [500, 0, 700, 0, 500, 500] },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 367, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Сгребание мешком и стягивание горловины — знакомство" },
	{ boss: 'enem2', indexAbilities: [37, 38, 39, 40, 41, 42, 43, 44], minPhase: 2, shotGapsMs: [500, 0, 700, 0, 250, 500, 0] },
	{ boss: 'enem2', indexAbilities: [45, 46, 47, 48, 49, 50, 51, 52], minPhase: 3, shotGapsMs: [500, 0, 700, 0, 0, 0, 700] },
	{ boss: 'enem2', indexAbilities: [53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 399, shotGapsMs: [0, 0, 0, 0], label: "Сгребание мешком и стягивание горловины — завершение" },

	// Ловчий Бабай
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [300, 0, 150, 0, 300, 450], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [150, 150, 150, 0, 150, 150] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [300, 0, 150, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [450, 0, 0, 0, 300, 0] },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34, 35, 36], shotGapsMs: [0, 250, 250, 0, 250, 250, 0, 500] },
	{ boss: 'enem3', indexAbilities: [37, 38, 39, 40, 41], signature: true, isChain: true, shotDelayMs: 411, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Задержанный след перекрывается обходным хватом — знакомство" },
	{ boss: 'enem3', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [450, 450, 450, 0, 150, 150, 300] },
	{ boss: 'enem3', indexAbilities: [50, 51, 52, 53, 54, 55, 56, 57], minPhase: 3, shotGapsMs: [300, 300, 0, 0, 450, 150, 450] },
	{ boss: 'enem3', indexAbilities: [58, 59, 60, 61, 62, 63], signature: true, isChain: true, minPhase: 3, shotDelayMs: 423, shotGapsMs: [0, 0, 0, 0, 0], label: "Задержанный след перекрывается обходным хватом — завершение" },

	// Звероватый Бабай
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 500, 0, 0] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 0, 500, 0, 700] },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 250, 250, 500] },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 373, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Низкий перехват перед прямым рывком — знакомство" },
	{ boss: 'enem4', indexAbilities: [34, 35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [0, 0, 500, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [350, 0, 650, 0, 350, 0] },
	{ boss: 'enem4', indexAbilities: [48, 49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 397, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Низкий перехват перед прямым рывком — завершение" },

	// Раскрытый Бабай
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [700, 0, 700, 0, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15, 16], shotGapsMs: [300, 0, 450, 0, 0, 600, 0, 0] },
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22, 23, 24, 25], shotGapsMs: [0, 700, 0, 700, 0, 0, 0, 250] },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31, 32, 33, 34], shotGapsMs: [450, 0, 450, 150, 0, 450, 0, 450] },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40, 41, 42, 43], shotGapsMs: [500, 500, 0, 500, 0, 0, 0, 0] },
	{ boss: 'enem5', indexAbilities: [44, 45, 46, 47, 48, 49, 50], signature: true, isChain: true, shotDelayMs: 383, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Полный двуручный захват с самостоятельным последним концом — знакомство" },
	{ boss: 'enem5', indexAbilities: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 620, 100, 0, 0, 0] },
	{ boss: 'enem5', indexAbilities: [0, 61, 62, 63, 64, 65, 66, 67, 68, 69], minPhase: 3, shotGapsMs: [500, 0, 0, 0, 620, 100, 0, 0, 0] },
	{ boss: 'enem5', indexAbilities: [70, 71, 72, 73, 74, 75, 76], signature: true, isChain: true, minPhase: 3, shotDelayMs: 407, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Полный двуручный захват с самостоятельным последним концом — завершение" },

];

// Лорные названия связок временных улучшений — один и тот же персонаж, но
// словарь ЭСКАЛИРУЕТ вместе с обликом (тьма/несмелость → жадный мешок →
// охота → зверь → полное разоблачение на свету), см. правило 12.1. Один и
// тот же адъектив на одной позиции у нескольких обликов допустим (как в
// gameData1.js) — полных совпадений фраз между обликами нет (проверено
// программно).
const UPGRADE_VARIANT_NAMES = {
    // Бабай — базовый облик: тьма, тень, несмелость, край поля зрения.
    enem1: {
        variant1: 'Тёмный кураж', variant2: 'Теневая хватка', variant3: 'Тычок-таран',
        variant4: 'Незримый напор', variant5: 'Меткий тычок', variant6: 'Бешеный тычок',
        variant7: 'Тёмный норов', variant8: 'Крепкая тень', variant9: 'Ударный тычок',
        variant10: 'Живучая тьма', variant11: 'Колючий мрак', variant12: 'Тычок и в темноту',
        variant13: 'Толстая тень', variant14: 'Неутомимый тычок', variant15: 'Пружинистый тычок',
        variant16: 'Незримый край, зоркий глаз', variant17: 'Тёмная удача', variant18: 'Верный тычок',
        variant19: 'Молниеносный тычок', variant20: 'Тёмный нюх', variant21: 'Цепкий мрак',
        variant22: 'Юркий, несмотря на тьму', variant23: 'Тёмная стойкость', variant24: 'Долгий морок, зоркий глаз',
        variant25: 'Ускользающий тычок', variant26: 'Дикий тычок', variant27: 'Стойкая тень',
        variant28: 'Тычок наповал', variant29: 'Крепкий бабай', variant30: 'Незримая мощь',
        variant31: 'Тычок с оглядкой', variant32: 'Живучий мрак', variant33: 'Юркий и тёмный',
        variant34: 'Тёмная прыть', variant35: 'Быстрый тычок, крепкая тень'
    },
    // Загребущий — мешок: хватка, верёвка, жадность, добыча.
    enem2: {
        variant1: 'Жадный кураж', variant2: 'Верёвочная хватка', variant3: 'Мешок-таран',
        variant4: 'Загребущий напор', variant5: 'Меткий захват', variant6: 'Бешеный захват',
        variant7: 'Жадный норов', variant8: 'Крепкая верёвка', variant9: 'Ударный захват',
        variant10: 'Живучая добыча', variant11: 'Колючая верёвка', variant12: 'Захват и в темноту',
        variant13: 'Толстый мешок', variant14: 'Неутомимый захват', variant15: 'Пружинистый захват',
        variant16: 'Бездонный мешок, зоркий глаз', variant17: 'Жадная удача', variant18: 'Верный захват',
        variant19: 'Молниеносный захват', variant20: 'Жадный нюх', variant21: 'Цепкая верёвка',
        variant22: 'Юркий, несмотря на мешок', variant23: 'Жадная стойкость', variant24: 'Долгий волок, зоркий глаз',
        variant25: 'Ускользающий захват', variant26: 'Дикий захват', variant27: 'Стойкий мешок',
        variant28: 'Захват наповал', variant29: 'Крепкий загребущий', variant30: 'Загребущая мощь',
        variant31: 'Захват с оглядкой', variant32: 'Живучий мешок', variant33: 'Юркий и жадный',
        variant34: 'Жадная прыть', variant35: 'Быстрый захват, крепкий мешок'
    },
    // Ловчий — охотник: выслеживание, засада, коготь, добыча.
    enem3: {
        variant1: 'Ловчий кураж', variant2: 'Охотничья хватка', variant3: 'Коготь-таран',
        variant4: 'Выслеживающий напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
        variant7: 'Ловчий норов', variant8: 'Крепкая засада', variant9: 'Ударный бросок',
        variant10: 'Живучий след', variant11: 'Колючий коготь', variant12: 'Бросок и в темноту',
        variant13: 'Толстая засада', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
        variant16: 'Хищный прищур, зоркий глаз', variant17: 'Ловчая удача', variant18: 'Верный бросок',
        variant19: 'Молниеносный бросок', variant20: 'Ловчий нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий, несмотря на засаду', variant23: 'Ловчая стойкость', variant24: 'Долгое выслеживание, зоркий глаз',
        variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкая засада',
        variant28: 'Бросок наповал', variant29: 'Крепкий ловчий', variant30: 'Выслеживающая мощь',
        variant31: 'Бросок с оглядкой', variant32: 'Живучий коготь', variant33: 'Юркий и ловчий',
        variant34: 'Ловчая прыть', variant35: 'Быстрый бросок, крепкая засада'
    },
    // Звероватый — хищник: клык, рык, шрам, светящийся глаз.
    enem4: {
        variant1: 'Звериный кураж', variant2: 'Клыкастая хватка', variant3: 'Клык-таран',
        variant4: 'Хищный напор', variant5: 'Меткий рывок', variant6: 'Бешеный рывок',
        variant7: 'Звериный норов', variant8: 'Крепкий шрам', variant9: 'Ударный рывок',
        variant10: 'Живучий рык', variant11: 'Колючий шрам', variant12: 'Рывок и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый рывок', variant15: 'Пружинистый рывок',
        variant16: 'Светящийся глаз, дикий взгляд', variant17: 'Звериная удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Звериный нюх', variant21: 'Цепкий клык',
        variant22: 'Юркий, несмотря на тушу', variant23: 'Звериная стойкость', variant24: 'Долгий рык, дикий взгляд',
        variant25: 'Ускользающий рывок', variant26: 'Дикий рывок', variant27: 'Стойкая шкура',
        variant28: 'Рывок наповал', variant29: 'Крепкий звероватый', variant30: 'Хищная мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и звериный',
        variant34: 'Хищная прыть', variant35: 'Быстрый рывок, крепкий клык'
    },
    // Раскрытый — финал: свет, разоблачение, отчаяние, последний бой.
    enem5: {
        variant1: 'Отчаянный кураж', variant2: 'Загнанная хватка', variant3: 'Лапа-таран',
        variant4: 'Загнанный напор', variant5: 'Меткий лунж', variant6: 'Бешеный лунж',
        variant7: 'Отчаянный норов', variant8: 'Крепкая грива', variant9: 'Ударный лунж',
        variant10: 'Живучая ярость', variant11: 'Колючая царапина', variant12: 'Лунж и в темноту',
        variant13: 'Толстая грива', variant14: 'Неутомимый лунж', variant15: 'Пружинистый лунж',
        variant16: 'Раскрытый взгляд, дикий взор', variant17: 'Отчаянная удача', variant18: 'Верный лунж',
        variant19: 'Молниеносный лунж', variant20: 'Отчаянный нюх', variant21: 'Цепкая лапа',
        variant22: 'Юркий, несмотря на массу', variant23: 'Отчаянная стойкость', variant24: 'Долгий загон, дикий взор',
        variant25: 'Ускользающий лунж', variant26: 'Дикий лунж', variant27: 'Стойкая грива',
        variant28: 'Лунж наповал', variant29: 'Крепкий раскрытый', variant30: 'Загнанная мощь',
        variant31: 'Лунж с оглядкой', variant32: 'Живучая грива', variant33: 'Юркий и отчаянный',
        variant34: 'Отчаянная прыть', variant35: 'Быстрый лунж, крепкая шкура'
    }
};
