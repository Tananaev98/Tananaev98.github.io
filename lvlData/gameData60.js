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
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 1.782,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	attackChains: true,
	musicMood: 'heroic',
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.76, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: {
			// Бабай: SHADOW_TEST — несмелый одиночный тычок из тьмы и тут же отдёрг назад
			movementStyle: 'lateRush', cadence: 1.03, telegraphMs: 900, speedMultiplier: 0.95, damageMultiplier: 0.92,
			speedVariance: [0.80, 0.90, 1.00, 1.10, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Не спишь — накличешь беду!',
			phaseMessages: { 2: 'Подкрадываюсь ближе с каждым вздохом!', 3: 'Ещё чуть-чуть — и не увернёшься!' }
		}, // Бабай: SHADOW_TEST — несмелый одиночный тычок из тьмы и тут же отдёрг назад
		enem2: {
			// Загребущий: SACK_DRAG — мешок опускается и тащится по полу ровно, без рывков
			movementStyle: 'drift', cadence: 0.95, telegraphMs: 800, speedMultiplier: 1.02, damageMultiplier: 0.98,
			speedVariance: [0.88, 0.96, 1.04, 1.12, 1.18], healthMultiplier: 1.50,
			appearMessage: 'Мешок не бывает пустым долго!',
			phaseMessages: { 2: 'Загребущие руки не знают отказа!', 3: 'Уже почти держу за шиворот!' }
		}, // Загребущий: SACK_DRAG — мешок опускается и тащится по полу ровно, без рывков
		enem3: {
			// Ловчий: UNEVEN_STALK — неровное крадущееся выслеживание, асимметричный бросок
			movementStyle: 'weave', cadence: 1.17, telegraphMs: 1050, speedMultiplier: 0.80, damageMultiplier: 1.19,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12], healthMultiplier: 1.50,
			appearMessage: 'Кто ищет меня — сам становится добычей!',
			phaseMessages: { 2: 'Хватка ловчего не разжимается!', 3: 'Загнан в угол — теперь ты моя дичь!' }
		}, // Ловчий: UNEVEN_STALK — неровное крадущееся выслеживание, асимметричный бросок
		enem4: {
			// Звероватый: FERAL_POUNCE — хищник копит рывок перед прыжком, бьёт прямо и напролом
			movementStyle: 'accelerate', cadence: 0.86, telegraphMs: 680, speedMultiplier: 1.12, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24], healthMultiplier: 1.50,
			appearMessage: 'От зверя внутри меня не спрячешься!',
			phaseMessages: { 2: 'Рык вырывается сам собой!', 3: 'Кровь чувствую — не остановлюсь!' }
		}, // Звероватый: FERAL_POUNCE — хищник копит рывок перед прыжком, бьёт прямо и напролом
		enem5: {
			// Раскрытый: CORNERED_LUNGE — загнанный зверь мечется во все стороны разом
			movementStyle: 'wave', cadence: 0.80, telegraphMs: 1040, speedMultiplier: 1.05, damageMultiplier: 1.12,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20], healthMultiplier: 1.50,
			appearMessage: 'Увидели меня — теперь спасайся сам!',
			phaseMessages: { 2: 'Прятаться больше негде — только рвать!', 3: 'Меня видно — но поздно вам от этого!' }
		} // Раскрытый: CORNERED_LUNGE — загнанный зверь мечется во все стороны разом
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
        size: '24%',
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
        size: '25%',
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
        size: '26%',
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
        size: '27%',
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
	// ===== Бабай: SHADOW_TEST — несмелые одиночные тычки из тьмы с самых
	// краёв поля и тут же отдёргивание назад, минимальное обязательство =====
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: тычок сразу без привычного долгого отдёргивания
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — короткий несмелый тычок и отдёрг
	// (vertical+arc), раздел 13.7 — минимальная длина всего боя.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //21 цепь-B звено 3

	// ===== Загребущий: SACK_DRAG — мешок опускается и тащится по полу
	// ровно, без рывков, всё увереннее =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 2 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 2 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: мешок падает сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — мешок опускается и тащится по полу
	// (arc+diagonal), раздел 13.7 — первый настоящий захват.
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Ловчий: UNEVEN_STALK — неровное крадущееся выслеживание,
	// одна сторона высоко, другая низко, затем асимметричный бросок =====
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: бросок раньше привычного долгого выслеживания
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — неровное выслеживание, затем бросок
	// (irregular+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7 },  //20 цепь-A звено 5
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //24 цепь-B звено 4

	// ===== Звероватый: FERAL_POUNCE — хищник копит рывок перед прыжком,
	// бьёт прямо и напролом, затем срывается в неконтролируемый рывок =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: прыжок разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — прямой хищный бросок, срывающийся в
	// неконтролируемый рывок (diagonal+irregular), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //24 цепь-B звено 5

	// ===== Раскрытый: CORNERED_LUNGE — загнанный зверь мечется во все
	// стороны разом, затем один огромный завершающий взмах =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: рывок без единого мгновения подготовки
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — судорожный зигзаг со всех сторон разом,
	// затем один огромный завершающий взмах (zigzag+arc), раздел 13.7 —
	// финальная кульминация, самая длинная цепь всего боя.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //25 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 320, bossDelayAbDop: 5900 }, // несмелые редкие тычки
	{ boss: 'enem2', bossDelayAb: 230, bossDelayAbDop: 4300 }, // ровное неотвратимое давление
	{ boss: 'enem3', bossDelayAb: 420, bossDelayAbDop: 7000 }, // самый долгий отдых — терпеливое выслеживание
	{ boss: 'enem4', bossDelayAb: 190, bossDelayAbDop: 3400 }, // частые внезапные хищные рывки
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5000 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Бабай — SHADOW_TEST
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким тычком
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: тычок сразу без привычного долгого отдёргивания
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: тычки со всех краёв разом

	// Загребущий — SACK_DRAG
	{ boss: 'enem2', indexAbilities: [0, 1, 2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6] },
	{ boss: 'enem2', indexAbilities: [7, 8] },
	{ boss: 'enem2', indexAbilities: [9, 10] },
	{ boss: 'enem2', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним захватом
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [14] }, // нежданчик: мешок падает раньше привычного долгого подтягивания
	{ boss: 'enem2', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: захват с обеих сторон разом

	// Ловчий — UNEVEN_STALK
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [2, 3] },
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [10, 11] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним броском
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem3', indexAbilities: [13, 14] }, // нежданчик: бросок разом с обеих сторон без привычного разброса
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: асимметричный шквал через всё поле

	// Звероватый — FERAL_POUNCE
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним прыжком
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: прыжок разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: слепой шквал прыжков напролом

	// Раскрытый — CORNERED_LUNGE, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним рывком
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь-B (6, максимум боя)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: рывок без единого мгновения подготовки
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: загнанный зверь мечется через весь двор разом
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
